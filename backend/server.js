require("dotenv").config();

const express = require("express");
const cors = require("cors");
const pool = require("./cp");
const app = express();
app.use(cors());
app.use(express.json());
const propertiesRouter = require("./route/properties");
const PORT = process.env.PORT || 5000;


//------------------------request logging midware---------------------------

app.use((req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(
      `${new Date().toISOString()} ${req.method} ${req.originalUrl} ${res.statusCode} ${duration}ms`
    );
  });

  next();
});

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
//----properties-----
app.use("/api/properties", propertiesRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

