const express = require("express");
const {
  getDashboard,
  getPendingUsers,
  verifyUser,
  getPendingProducts,
  getAdminProductDetail,
  verifyProduct,
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getActivities,
  getAdminTransactions,
  updateTransactionStatus,
  getAdminMentoring,
  getProblemStatistics,
  getReports,
} = require("../controllers/adminController");
const { authMiddleware, roleMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

router.use(authMiddleware, roleMiddleware("ADMIN"));

router.get("/dashboard", getDashboard);

router.get("/users/pending", getPendingUsers);
router.put("/users/:id/verify", verifyUser);

router.get("/products/pending", getPendingProducts);
router.get("/products/:id", getAdminProductDetail);
router.put("/products/:id/verify", verifyProduct);

router.get("/categories", getCategories);
router.post("/categories", createCategory);
router.put("/categories/:id", updateCategory);
router.delete("/categories/:id", deleteCategory);

router.get("/activities", getActivities);

router.get("/transactions", getAdminTransactions);
router.put("/transactions/:id/status", updateTransactionStatus);

router.get("/mentoring", getAdminMentoring);

router.get("/statistics/problems", getProblemStatistics);

router.get("/reports", getReports);

module.exports = router;