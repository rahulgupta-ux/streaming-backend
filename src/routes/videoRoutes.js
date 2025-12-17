const express = require("express");
const router = express.Router();
const { addVideo, getVideos, getVideoById } = require("../controllers/videoController");
const authMiddleware = require("../middleware/authMiddleware");

// Public
router.get("/", getVideos);
router.get("/:id", getVideoById);

// Protected (admin for now)
router.post("/", authMiddleware, addVideo);

module.exports = router;
