const express = require("express");
const {
  createReview,
  getReviewsByProduct,
  getMyReviews,
} = require("../controllers/reviewController");
const { authMiddleware, roleMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  roleMiddleware("UMKM"),
  createReview
);

router.get(
  "/product/:productId",
  authMiddleware,
  getReviewsByProduct
);

router.get(
  "/my",
  authMiddleware,
  roleMiddleware("MAHASISWA"),
  getMyReviews
);

module.exports = router;