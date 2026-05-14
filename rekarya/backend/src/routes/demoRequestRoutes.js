const express = require("express");
const {
  createDemoRequest,
  getMyDemoRequests,
  updateDemoRequestStatus,
} = require("../controllers/demoRequestController");
const { authMiddleware, roleMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  roleMiddleware("UMKM"),
  createDemoRequest
);

router.get(
  "/my",
  authMiddleware,
  roleMiddleware("UMKM", "MAHASISWA"),
  getMyDemoRequests
);

router.put(
  "/:id/status",
  authMiddleware,
  roleMiddleware("MAHASISWA"),
  updateDemoRequestStatus
);

module.exports = router;