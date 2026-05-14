const express = require("express");
const {
  getMahasiswaProfile,
  updateMahasiswaProfile,
} = require("../controllers/mahasiswaProfileController");
const { authMiddleware, roleMiddleware } = require("../middleware/authMiddleware");
const { uploadProfile } = require("../middleware/uploadMiddleware");

const router = express.Router();

router.get(
  "/profile",
  authMiddleware,
  roleMiddleware("MAHASISWA"),
  getMahasiswaProfile
);

router.put(
  "/profile",
  authMiddleware,
  roleMiddleware("MAHASISWA"),
  uploadProfile.fields([
    { name: "photo", maxCount: 1 },
    { name: "studentCard", maxCount: 1 },
    { name: "identityCard", maxCount: 1 },
  ]),
  updateMahasiswaProfile
);

module.exports = router;