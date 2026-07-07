//TODO: make sure the beds & baths are >= or ==

const express = require("express");
const router = express.Router();
const pool = require("../cp");

//validate requests
function isNonNegativeNumber(value) {
    return value !== undefined && value !== "" && !isNaN(Number(value)) && Number(value) >= 0;
}

function isPositiveInteger(value) {
    return (
        value !== undefined &&
        value !== "" &&
        Number.isInteger(Number(value)) &&
        Number(value) > 0
    );
}

function isNonNegativeInteger(value) {
    return (
        value !== undefined &&
        value !== "" &&
        Number.isInteger(Number(value)) &&
        Number(value) >= 0
    );
}

router.get("/", async (req, res) => {
    try {
        const { city, zipcode, minPrice, maxPrice, beds, baths, offset, limit } = req.query;

        if (limit !== undefined && !isPositiveInteger(limit)) {
            return res.status(400).json({
                error: "limit must be a positive integer",
            });
        }
        if (offset !== undefined && !isNonNegativeInteger(offset)) {
            return res.status(400).json({
                error: "offset must be a non-negative integer",
            });
        }
        if (minPrice !== undefined && !isNonNegativeNumber(minPrice)) {
            return res.status(400).json({
                error: "minPrice must be a non-negative number",
            });
        }
        if (maxPrice !== undefined && !isNonNegativeNumber(maxPrice)) {
            return res.status(400).json({
                error: "maxPrice must be a non-negative number",
            });
        }
        if (
            minPrice !== undefined &&
            maxPrice !== undefined &&
            Number(minPrice) > Number(maxPrice)
        ) {
            return res.status(400).json({
                error: "minPrice cannot be greater than maxPrice",
            });
        }
    
        if (beds !== undefined && !isNonNegativeInteger(beds)) {
            return res.status(400).json({
                error: "beds must be a non-negative integer",
            });
        }
    
        if (baths !== undefined && !isNonNegativeNumber(baths)) {
            return res.status(400).json({
                error: "baths must be a non-negative number",
            });
        }
    
        if (zipcode !== undefined && !/^\d{5}$/.test(zipcode)) {
            return res.status(400).json({
                error: "zipcode must be a 5-digit number",
            });
        }

        const pageLimit = limit !== undefined ? Number(limit) : 20;
        const pageOffset = offset !== undefined ? Number(offset) : 0;
        const conditions = [];
        const values = [];
        // const [rows] = await pool.query(
        //     "SELECT * FROM rets_property LIMIT ? OFFSET ?",
        //     [limit, offset]
        // );
        if (city) {
            conditions.push("L_City = ?");
            values.push(city);
        }

        if (zipcode) {
            conditions.push("L_Zip = ?");
            values.push(zipcode);
        }

        if (minPrice) {
            conditions.push("L_SystemPrice >= ?");
            values.push(minPrice);
        }
        
        if (maxPrice) {
            conditions.push("L_SystemPrice <= ?");
            values.push(maxPrice);
        }

        if (beds) {
            conditions.push("L_Keyword2 = ?");
            values.push(beds);
        }

        if (baths) {
            conditions.push("LM_Dec_3 = ?");
            values.push(baths);
        }


        let sql = `
            SELECT
                L_ListingID AS ListingKey,
                L_DisplayId AS DisplayId,
                L_Address AS UnparsedAddress,
                L_Zip AS PostalCode,
                L_City AS City,
                L_State AS StateOrProvince,
                L_Class AS PropertyType,
                L_Type_ AS PropertySubType,
                L_Keyword2 AS BedroomsTotal,
                LM_Dec_3 AS BathroomsTotalInteger,
                L_SystemPrice AS ListPrice,
                LM_Int2_3 AS LivingArea,
                L_Status AS MlsStatus,
                L_Remarks AS PublicRemarks,
                L_Photos AS Images,
                PhotoCount AS PhotosCount
            FROM rets_property
        `;

        if (conditions.length > 0) {
            sql += " WHERE " + conditions.join(" AND ");
        }
        sql += " LIMIT ? OFFSET ?";
        values.push(pageLimit, pageOffset);

        //query
        const [rows] = await pool.query(sql, values);
        
        res.status(200).json({
            data: rows,
            limit: pageLimit,
            offset: pageOffset,
            count: rows.length,
            filters: {
                city,
                zipcode,
                minPrice,
                maxPrice,
                beds,
                baths,
            },
        });

    } catch (error){
        console.error("Error fetching properties:", error.message);
        res.status(500).json({
            error: "Failed to fetch properties",
        });
    }
});
module.exports = router;

//16: Before adding indexes, key = NULL, rows = 36866; After adding indexes, key = the new added "idx_rets_property_price", rows = 8128