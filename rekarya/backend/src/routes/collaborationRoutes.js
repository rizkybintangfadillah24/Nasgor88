const express = require("express");
const {
  createCollaboration,
  getMyCollaborations,
  updateCollaborationStatus,
} = require("../controllers/collaborationController");
const { authMiddleware, roleMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  roleMiddleware("UMKM"),
  createCollaboration
);

router.get(
  "/my",
  authMiddleware,
  roleMiddleware("MAHASISWA", "UMKM"),
  getMyCollaborations
);

router.put(
  "/:id/status",
  authMiddleware,
  roleMiddleware("MAHASISWA"),
  updateCollaborationStatus
);

module.exports = router;