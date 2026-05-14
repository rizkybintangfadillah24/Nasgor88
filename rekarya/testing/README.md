# Testing Documentation - ReKarya

Dokumen ini digunakan oleh tim Testing untuk memastikan aplikasi ReKarya berjalan sesuai dokumen final project.

## Identitas Project

Nama aplikasi: ReKarya  
Jenis aplikasi: Web Application  
Backend: Express.js  
Frontend: Next.js  
ORM: Prisma  
Database: PostgreSQL  
Auth: JWT  
Upload file: Multer  
Role: Mahasiswa, UMKM, Admin  

## Fokus Testing

Testing berfokus pada:

1. Kesesuaian fitur dengan dokumen.
2. Validasi role Mahasiswa, UMKM, dan Admin.
3. Validasi alur frontend dan backend.
4. Validasi endpoint API.
5. Validasi upload file.
6. Validasi ReKarya Match.
7. Validasi dashboard setiap role.
8. Validasi responsivitas tampilan.
9. Validasi flow demo final.
10. Pencatatan bug dan hasil perbaikan.

## Aturan Testing

1. Testing tidak mengubah kode backend tanpa koordinasi dengan backend.
2. Testing tidak mengubah kode frontend tanpa koordinasi dengan frontend.
3. Testing mencatat semua bug di file BUG_REPORT.md.
4. Testing menggunakan checklist di TESTING_CHECKLIST.md.
5. Testing memastikan flow demo sesuai DEMO_GUIDE.md.
6. Testing wajib melakukan git pull sebelum menambahkan dokumen baru.
7. Testing hanya push saat gilirannya.
8. Testing tidak melakukan force push.

## Dokumen Testing

| File | Fungsi |
|---|---|
| TESTING_CHECKLIST.md | Checklist pengujian semua fitur |
| BUG_REPORT.md | Catatan bug, finding, dan status perbaikannya |
| DEMO_GUIDE.md | Panduan alur demo final |

## Status Testing

| Area | Status |
|---|---|
| Backend running awal | Bisa running |
| Frontend running awal | Bisa running |
| Auth | Belum dites |
| Mahasiswa | Belum dites |
| UMKM | Belum dites |
| Admin | Belum dites |
| ReKarya Match | Belum dites |
| Upload File | Belum dites |
| Responsivitas | Belum dites |
| Demo Final | Belum dites |

## Catatan Pengecekan Struktur Awal

Tanggal pengecekan: 14 Mei 2026  
Pengecek: Testing  
Branch: main  

### Backend

| Komponen | Hasil Cek | Status |
|---|---|---|
| Folder backend | Ada | Sesuai awal |
| package.json | Ada | Sesuai awal |
| package-lock.json | Ada | Sesuai awal |
| node_modules | Ada | Dependency sudah pernah di-install |
| prisma/schema.prisma | Ada | Perlu dicek isi model ReKarya |
| prisma/seed.js | Belum terlihat | Belum sesuai kebutuhan seed admin |
| src/server.js | Ada | Server dasar tersedia |
| Backend running | Bisa running | Sesuai checkpoint awal |
| src/config | Belum terlihat | Belum sesuai struktur final |
| src/controllers | Belum terlihat | Belum sesuai struktur final |
| src/middleware | Belum terlihat | Belum sesuai struktur final |
| src/routes | Belum terlihat | Belum sesuai struktur final |
| src/services | Belum terlihat | Belum sesuai struktur final |
| src/utils | Belum terlihat | Belum sesuai struktur final |
| src/uploads | Belum terlihat | Belum sesuai kebutuhan upload file |

### Frontend

| Komponen | Hasil Cek | Status |
|---|---|---|
| Folder frontend | Ada | Sesuai awal |
| package.json | Ada | Sesuai awal |
| package-lock.json | Ada | Sesuai awal |
| node_modules | Ada | Dependency sudah pernah di-install |
| app | Ada | App Router tersedia |
| Frontend running | Bisa running | Sesuai checkpoint awal |
| src/app | Belum terlihat | Belum sesuai struktur final dokumen |
| public | Ada | Sesuai awal |
| next.config.ts | Ada | Sesuai awal |
| tsconfig.json | Ada | Sesuai awal |
| eslint.config.mjs | Ada | Sesuai awal |
| postcss.config.mjs | Ada | Sesuai awal |
| components | Belum terlihat | Belum sesuai struktur final |
| lib | Belum terlihat | Belum sesuai struktur final |
| types | Belum terlihat | Belum sesuai struktur final |

## Kesimpulan Pengecekan Awal

Backend dan frontend sudah bisa running sebagai project default awal.

Namun testing fitur aplikasi ReKarya belum bisa dilakukan penuh karena fitur utama belum terlihat lengkap, seperti auth, schema database, seed admin, katalog produk, dashboard role, ReKarya Match, transaksi, pendampingan, ulasan, dan monitoring admin.

Status saat ini:

| Checkpoint | Status Testing | Catatan |
|---|---|---|
| Checkpoint 1 Testing | Selesai | Struktur awal dan dokumen testing sudah dibuat |
| Checkpoint 2 Backend | Sebagian besar sesuai setup awal | Backend bisa running, tetapi struktur folder final belum lengkap |
| Checkpoint 3 Frontend | Sebagian besar sesuai setup awal | Frontend bisa running, tetapi masih default dan belum memakai src/app |
| Checkpoint 4 Database | Belum bisa dites penuh | Perlu cek schema.prisma dan seed admin |
| Checkpoint 5 Auth API | Belum bisa dites | Endpoint auth belum terlihat dari struktur |
| Checkpoint 6 Landing dan Auth Pages | Belum bisa dites | Landing masih default, login/register belum terlihat |

## Catatan

Dokumen ini akan diperbarui setiap ada fitur yang selesai dibuat oleh backend dan frontend.