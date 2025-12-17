const pool = require("../models/db");

// ADD VIDEO (admin / internal use)
exports.addVideo = async (req, res) => {
  try {
    const { title, description, thumbnail_url, hls_url, duration } = req.body;

    if (!title || !hls_url) {
      return res.status(400).json({ message: "Title and video URL required" });
    }

    await pool.query(
      `INSERT INTO videos 
       (title, description, thumbnail_url, hls_url, duration)
       VALUES ($1, $2, $3, $4, $5)`,
      [title, description, thumbnail_url, hls_url, duration]
    );

    res.json({ message: "Video added successfully" });
  } catch (err) {
    console.error("Add video error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// GET ALL VIDEOS
exports.getVideos = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, title, thumbnail_url, duration FROM videos ORDER BY created_at DESC"
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Get videos error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// GET SINGLE VIDEO
exports.getVideoById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "SELECT * FROM videos WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Video not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Get video error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
