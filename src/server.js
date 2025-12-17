require("dotenv").config();
const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const videoRoutes = require("./routes/videoRoutes");
const pool = require("./models/db");

const app = express();

app.use(cors());
app.use(express.json());

// Health check
app.get("/ping", (req, res) => {
  res.json({ message: "Backend is running successfully" });
});

// DB test (Postgres-safe)
app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT 1");
    res.json({ success: true, rows: result.rows });
  } catch (err) {
    console.error("DB test error:", err);
    res.status(500).json({ error: "DB connection failed" });
  }
});

// Routes
app.use("/auth", authRoutes);
app.use("/videos", videoRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
