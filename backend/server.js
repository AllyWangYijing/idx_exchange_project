require("dotenv").config();

const express = require("express");
const cors = require("cors");
const pool = require("./cp");
const app = express();
app.use(cors());
app.use(express.json());
const propertiesRouter = require("./route/properties");
const PORT = process.env.PORT || 5000;

app.get("/api/health", async (req, res) => {
  try {
    await pool.query("SELECT 1");
    res.status(200).json({
      status: "ok",
      database: "connected",
    });
  } catch (error) {
    console.error("Database connection failed:", error.message);
    res.status(500).json({
      status: "error",
      database: "disconnected",
    });
  }
});

app.use("/api/properties", propertiesRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});