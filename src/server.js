const express = require("express");
const authRoutes = require("./routes/authRoutes");
const cors = require("cors");
require("dotenv").config();
console.log("ENV CHECK:", process.env.DB_HOST, process.env.DB_USER);

const app = express();
app.use(cors());
app.use(express.json());

// Test API route
app.get("/ping", (req, res) => {
    res.json({ message: "Backend is running successfully" });
});

const pool = require("./models/db");

app.get("/test-db", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT 1");
    res.json({ success: true, rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "DB connection failed", details: err.message });
  }
});


// Start server
const PORT = process.env.PORT || 5000;
app.use("/auth", authRoutes);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
