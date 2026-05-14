const express = require("express");
const {
  createOffer,
  getMyOffers,
  updateOfferStatus,
} = require("../controllers/offerController");
const { authMiddleware, roleMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  roleMiddleware("MAHASISWA"),
  createOffer
);

router.get(
  "/my",
  authMiddleware,
  roleMiddleware("MAHASISWA", "UMKM"),
  getMyOffers
);

router.put(
  "/:id/status",
  authMiddleware,
  roleMiddleware("UMKM"),
  updateOfferStatus
);

module.exports = router;