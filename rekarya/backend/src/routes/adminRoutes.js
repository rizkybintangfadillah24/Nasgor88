const express = require("express");
const {
  getPendingProducts,
  verifyProduct,
  updateTransactionStatus,
} = require("../controllers/adminController");
const { authMiddleware, roleMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

router.get(
  "/products/pending",
  authMiddleware,
  roleMiddleware("ADMIN"),
  getPendingProducts
);

router.put(
  "/products/:id/verify",
  authMiddleware,
  roleMiddleware("ADMIN"),
  verifyProduct
);

router.put(
  "/transactions/:id/status",
  authMiddleware,
  roleMiddleware("ADMIN"),
  updateTransactionStatus
);

module.exports = router;