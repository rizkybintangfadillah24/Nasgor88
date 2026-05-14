const multer = require("multer");
const path = require("path");
const fs = require("fs");

const ensureDirectoryExists = (directoryPath) => {
  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath, { recursive: true });
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath = path.join(__dirname, "../uploads/documents");

    if (file.fieldname === "photo") {
      uploadPath = path.join(__dirname, "../uploads/profiles");
    }

    if (file.fieldname === "studentCard" || file.fieldname === "identityCard") {
      uploadPath = path.join(__dirname, "../uploads/documents");
    }

    ensureDirectoryExists(uploadPath);
    cb(null, uploadPath);
  },

  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExtension = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${fileExtension}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedImageTypes = ["image/jpeg", "image/jpg", "image/png"];
  const allowedDocumentTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "application/pdf",
  ];

  if (file.fieldname === "photo") {
    if (allowedImageTypes.includes(file.mimetype)) {
      return cb(null, true);
    }

    return cb(new Error("Foto profil hanya boleh JPG, JPEG, atau PNG"), false);
  }

  if (file.fieldname === "studentCard" || file.fieldname === "identityCard") {
    if (allowedDocumentTypes.includes(file.mimetype)) {
      return cb(null, true);
    }

    return cb(new Error("Dokumen hanya boleh JPG, JPEG, PNG, atau PDF"), false);
  }

  return cb(new Error("Field file tidak valid"), false);
};

const uploadProfile = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
});

module.exports = {
  uploadProfile,
};