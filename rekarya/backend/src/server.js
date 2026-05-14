const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const mahasiswaProfileRoutes = require("./routes/mahasiswaProfileRoutes");
const umkmProfileRoutes = require("./routes/umkmProfileRoutes");
const productRoutes = require("./routes/productRoutes");
const adminRoutes = require("./routes/adminRoutes");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "ReKarya Backend API berjalan",
    data: {
      service: "ReKarya Backend",
      version: "1.0.0",
    },
  });
});

app.get("/api/health", (req, res) => {
  return res.json({
    success: true,
    message: "Server backend aktif",
    data: {
      status: "OK",
    },
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/mahasiswa", mahasiswaProfileRoutes);
app.use("/api/umkm", umkmProfileRoutes);
app.use("/api/products", productRoutes);
app.use("/api/admin", adminRoutes);

app.use((err, req, res, next) => {
  if (err) {
    return res.status(400).json({
      success: false,
      message: err.message || "Terjadi kesalahan",
      errors: [err.message],
    });
  }

  next();
});

app.use((req, res) => {
  return res.status(404).json({
    success: false,
    message: "Endpoint tidak ditemukan",
    errors: [],
  });
});

app.listen(PORT, () => {
  console.log(`ReKarya Backend berjalan di http://localhost:${PORT}`);
});