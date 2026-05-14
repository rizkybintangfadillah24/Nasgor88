// lib/dummy-data.ts

/* =========================================================
   DATA PRODUK MAHASISWA
========================================================= */
export const studentProducts = [
  {
    id: 1,
    title: "Sistem POS UMKM",
    category: "Penjualan",
    status: "APPROVED",
  },
  {
    id: 2,
    title: "Website Toko Online",
    category: "E-Commerce",
    status: "PENDING",
  },
  {
    id: 3,
    title: "Dashboard Keuangan",
    category: "Keuangan",
    status: "APPROVED",
  },
];

/* =========================================================
   STATISTIK DASHBOARD MAHASISWA
   (Otomatis sinkron dengan studentProducts)
========================================================= */
export const dashboardStats = {
  totalProducts: studentProducts.length,
  pendingProducts: studentProducts.filter(
    (product) => product.status === "PENDING"
  ).length,
  approvedProducts: studentProducts.filter(
    (product) => product.status === "APPROVED"
  ).length,
  collaborations: 2,
  profileStatus: "Pending",
};

/* =========================================================
   PROFIL MAHASISWA
========================================================= */
export const mahasiswaProfile = {
  nama: "Maulana R",
  email: "mahasiswa@rekarya.com",
  phone: "081234567890",
  rekening: "BNI - 1234567890",

  nim: "2210112345",
  kampus: "Politeknik Negeri Malang",
  jurusan: "Teknologi Informasi",
  prodi: "D-III Manajemen Informatika",
  semester: "Semester 4",

  bio: "Saya seorang web developer yang fokus mengembangkan solusi digital untuk UMKM, khususnya pada sistem informasi, website, dan aplikasi berbasis web.",

  statusVerifikasi: "Pending",
};

/* =========================================================
   DATA KERJA SAMA MAHASISWA
========================================================= */
export const studentCollaborations = [
  {
    id: 1,
    umkm: "Kuliner Makmur",
    product: "Sistem POS UMKM",
    status: "Menunggu Konfirmasi",
  },
  {
    id: 2,
    umkm: "Batik Nusantara",
    product: "Website Toko Online",
    status: "Sedang Berjalan",
  },
];

/* =========================================================
   DATA TRANSAKSI MAHASISWA
========================================================= */
export const studentTransactions = [
  {
    invoice: "INV-001",
    amount: "Rp2.500.000",
    status: "Paid",
  },
  {
    invoice: "INV-002",
    amount: "Rp1.000.000",
    status: "Pending",
  },
];

/* =========================================================
   DATA MENTORING / PENDAMPINGAN
========================================================= */
export const studentMentoringSessions = [
  {
    title: "Strategi Go-To-Market",
    mentor: "Budi Santoso",
    schedule: "15 Mei 2026, 14:00 WIB",
  },
  {
    title: "Optimasi UI/UX Produk",
    mentor: "Siti Rahma",
    schedule: "18 Mei 2026, 10:00 WIB",
  },
];

/* =========================================================
   DATA ULASAN DARI UMKM
========================================================= */
export const studentReviews = [
  {
    umkm: "Kuliner Makmur",
    rating: 5,
    comment: "Produk sangat membantu digitalisasi usaha kami.",
  },
  {
    umkm: "Batik Nusantara",
    rating: 4,
    comment: "Kolaborasi berjalan baik dan responsif.",
  },
];