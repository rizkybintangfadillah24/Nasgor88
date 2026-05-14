const express = require("express");
const {
  createTransaction,
  getMyTransactions,
} = require("../controllers/transactionController");
const { authMiddleware, roleMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  roleMiddleware("UMKM"),
  createTransaction
);

router.get(
  "/my",
  authMiddleware,
  roleMiddleware("MAHASISWA", "UMKM"),
  getMyTransactions
);

module.exports = router;