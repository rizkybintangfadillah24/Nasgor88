const express = require("express");
const {
  getUmkmProfile,
  updateUmkmProfile,
} = require("../controllers/umkmProfileController");
const { authMiddleware, roleMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

router.get(
  "/profile",
  authMiddleware,
  roleMiddleware("UMKM"),
  getUmkmProfile
);

router.put(
  "/profile",
  authMiddleware,
  roleMiddleware("UMKM"),
  updateUmkmProfile
);

module.exports = router;