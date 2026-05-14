const express = require("express");
const {
  getPendingProducts,
  getAdminProductDetail,
  verifyProduct,
} = require("../controllers/adminController");
const { authMiddleware, roleMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

router.get(
  "/products/pending",
  authMiddleware,
  roleMiddleware("ADMIN"),
  getPendingProducts
);

router.get(
  "/products/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  getAdminProductDetail
);

router.put(
  "/products/:id/verify",
  authMiddleware,
  roleMiddleware("ADMIN"),
  verifyProduct
);

module.exports = router;