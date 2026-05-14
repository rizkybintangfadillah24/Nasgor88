const express = require("express");
const {
  getMyMentoring,
  createMentoring,
  updateMentoring,
  completeMentoring,
} = require("../controllers/mentoringController");
const { authMiddleware, roleMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

router.get(
  "/my",
  authMiddleware,
  roleMiddleware("MAHASISWA", "UMKM"),
  getMyMentoring
);

router.post(
  "/",
  authMiddleware,
  roleMiddleware("MAHASISWA"),
  createMentoring
);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("MAHASISWA"),
  updateMentoring
);

router.put(
  "/:id/complete",
  authMiddleware,
  roleMiddleware("UMKM"),
  completeMentoring
);

module.exports = router;