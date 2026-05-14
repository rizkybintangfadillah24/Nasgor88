const express = require("express");
const {
  getPendingProducts,
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

router.put(
  "/products/:id/verify",
  authMiddleware,
  roleMiddleware("ADMIN"),
  verifyProduct
);

module.exports = router;