const express = require("express");
const {
  getRecommendations,
  getProductMatchDetail,
} = require("../controllers/matchController");
const { authMiddleware, roleMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
  "/recommendations",
  authMiddleware,
  roleMiddleware("UMKM"),
  getRecommendations
);

router.get(
  "/products/:productId",
  authMiddleware,
  roleMiddleware("UMKM"),
  getProductMatchDetail
);

module.exports = router;