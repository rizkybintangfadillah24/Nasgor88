const express = require("express");
const {
  getApprovedProducts,
  getProductDetail,
  createProduct,
  getMyProducts,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const { authMiddleware, roleMiddleware } = require("../middleware/authMiddleware");
const { uploadProduct } = require("../middleware/uploadMiddleware");

const router = express.Router();

router.get("/", getApprovedProducts);

router.get(
  "/my",
  authMiddleware,
  roleMiddleware("MAHASISWA"),
  getMyProducts
);

router.get(
  "/:id",
  authMiddleware,
  getProductDetail
);

router.post(
  "/",
  authMiddleware,
  roleMiddleware("MAHASISWA"),
  uploadProduct.single("screenshot"),
  createProduct
);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("MAHASISWA"),
  uploadProduct.single("screenshot"),
  updateProduct
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("MAHASISWA"),
  deleteProduct
);

module.exports = router;