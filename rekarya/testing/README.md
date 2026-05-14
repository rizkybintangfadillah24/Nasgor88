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
9. File .env lokal tidak boleh di-push ke GitHub.
10. File .env.local frontend tidak boleh di-push ke GitHub.

## Dokumen Testing

| File | Fungsi |
|---|---|
| TESTING_CHECKLIST.md | Checklist pengujian semua fitur |
| BUG_REPORT.md | Catatan bug, finding, dan status perbaikannya |
| DEMO_GUIDE.md | Panduan alur demo final |

## Status Testing

| Area | Status |
|---|---|
| Backend running awal | Selesai |
| Frontend running awal | Selesai |
| Database schema | Selesai |
| Prisma validate | Selesai |
| Prisma generate | Selesai |
| Migration database | Selesai |
| Seed admin | Selesai |
| Auth API | Selesai |
| Register Mahasiswa API | Selesai |
| Register UMKM API | Selesai |
| Login Mahasiswa API | Selesai |
| Login UMKM API | Selesai |
| Login Admin API | Selesai |
| JWT token | Selesai |
| Auth me | Selesai |
| Change password | Selesai |
| Middleware role | Selesai |
| Landing page frontend | Selesai |
| Login frontend | Selesai |
| Register frontend | Selesai |
| Redirect role frontend | Selesai |
| Responsivitas checkpoint 6 | Selesai |
| Profile Mahasiswa API | Selesai |
| Upload file profil Mahasiswa | Selesai |
| Profile UMKM API | Selesai |
| Role protection profile | Selesai |
| Upload File | Selesai untuk profile Mahasiswa |
| Mahasiswa dashboard | Belum dites penuh |
| UMKM dashboard | Belum dites penuh |
| Admin dashboard | Belum dites penuh |
| Produk | Belum dites |
| ReKarya Match | Belum dites |
| Demo Final | Belum dites penuh |

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
| prisma/schema.prisma | Ada | Sudah bisa divalidasi |
| prisma/seed.js | Ada dan berhasil dijalankan | Sesuai checkpoint 4 |
| src/server.js | Ada | Server dasar tersedia |
| Backend running | Bisa running | Sesuai checkpoint awal |
| DATABASE_URL | Sudah terbaca dari .env lokal | Sesuai kebutuhan Prisma |
| Prisma validate | Berhasil | Checkpoint 4 pass |
| Prisma generate | Berhasil | Checkpoint 4 pass |
| Prisma migration | Berhasil | Checkpoint 4 pass |
| Seed admin | Berhasil | Checkpoint 4 pass |
| Admin di database | Ada | Checkpoint 4 pass |
| Auth routes | Ada | Checkpoint 5 pass |
| Auth controller | Ada | Checkpoint 5 pass |
| Auth middleware | Ada | Checkpoint 5 pass |
| Role middleware | Ada | Checkpoint 5 pass |
| Admin route untuk role test | Ada melalui /admin/products/pending | Checkpoint 5 pass |
| Mahasiswa route untuk role test | Ada melalui /mahasiswa/profile | Checkpoint 5 dan 7 pass |
| UMKM route untuk role test | Ada melalui /umkm/profile | Checkpoint 5 dan 7 pass |
| Profile Mahasiswa API | Berhasil dites | Checkpoint 7 pass |
| Upload file profil Mahasiswa | Berhasil dites | Checkpoint 7 pass |
| Profile UMKM API | Berhasil dites | Checkpoint 7 pass |
| Path file upload | Tersimpan di database | Checkpoint 7 pass |
| File upload | Tersimpan di folder upload | Checkpoint 7 pass |
| src/config | Ada | Mulai sesuai struktur backend |
| src/controllers | Ada | Mulai sesuai struktur backend |
| src/middleware | Ada | Mulai sesuai struktur backend |
| src/routes | Ada | Mulai sesuai struktur backend |
| src/utils | Ada | Mulai sesuai struktur backend |
| src/uploads / uploads | Sudah digunakan untuk upload profile | Checkpoint 7 pass |

### Frontend

| Komponen | Hasil Cek | Status |
|---|---|---|
| Folder frontend | Ada | Sesuai awal |
| package.json | Ada | Sesuai awal |
| package-lock.json | Ada | Sesuai awal |
| node_modules | Ada | Dependency sudah pernah di-install |
| app | Ada | App Router tersedia |
| Frontend running | Bisa running | Sesuai checkpoint awal |
| Landing page | Ada dan berhasil dites | Checkpoint 6 pass |
| Login page | Ada dan berhasil dites | Checkpoint 6 pass |
| Register page | Ada dan berhasil dites | Checkpoint 6 pass |
| Login frontend ke backend | Berhasil | Checkpoint 6 pass |
| Register frontend ke backend | Berhasil | Checkpoint 6 pass |
| Redirect role | Berhasil | Checkpoint 6 pass |
| Responsif halaman auth | Berhasil | Checkpoint 6 pass |
| src/app | Belum terlihat | Belum sesuai struktur final dokumen |
| public | Ada | Sesuai awal |
| next.config.ts | Ada | Sesuai awal |
| tsconfig.json | Ada | Sesuai awal |
| eslint.config.mjs | Ada | Sesuai awal |
| postcss.config.mjs | Ada | Sesuai awal |
| components | Belum terlihat | Belum sesuai struktur final |
| lib | Ada jika digunakan untuk API helper | Perlu dicek lagi pada checkpoint lanjutan |
| types | Belum terlihat | Belum sesuai struktur final |

## Catatan Checkpoint 4 - Database Schema dan Admin Seed

Tanggal pengecekan: 14 Mei 2026  
Area: Backend  
Checkpoint: 4  
Target checkpoint: Schema Prisma, migration, dan seed admin  

| Item Testing | Hasil | Status |
|---|---|---|
| File .env lokal tersedia | DATABASE_URL sudah terbaca | Selesai |
| Prisma validate | Berhasil | Selesai |
| Prisma generate | Berhasil | Selesai |
| Migration database | Berhasil | Selesai |
| Seed admin | Berhasil | Selesai |
| Admin di database | Ada | Selesai |
| Password admin | Tersimpan sebagai hash | Selesai |

## Catatan Checkpoint 5 - Authentication API

Tanggal pengecekan: 14 Mei 2026  
Area: Backend  
Checkpoint: 5  
Target checkpoint: Register, login, JWT, auth middleware, role middleware, auth me, dan change password  

| Item Testing | Hasil | Status |
|---|---|---|
| Backend running | Berhasil | Selesai |
| Register Mahasiswa | Berhasil | Selesai |
| Register UMKM | Berhasil | Selesai |
| Register Admin dari public | Ditolak | Selesai |
| Register email duplikat | Ditolak | Selesai |
| Login Mahasiswa | Berhasil dan token muncul | Selesai |
| Login UMKM | Berhasil dan token muncul | Selesai |
| Login Admin | Berhasil dan token muncul | Selesai |
| Login password salah | Ditolak | Selesai |
| Auth me tanpa token | Ditolak | Selesai |
| Auth me token valid | Berhasil | Selesai |
| Auth me token invalid | Ditolak | Selesai |
| Change password | Berhasil | Selesai |
| Login password lama setelah change password | Ditolak | Selesai |
| Login password baru setelah change password | Berhasil | Selesai |
| Middleware role Admin | Berhasil dites melalui /admin/products/pending | Selesai |
| Middleware role Mahasiswa | Berhasil dites melalui /mahasiswa/profile atau /products/my | Selesai |
| Middleware role UMKM | Berhasil dites melalui /umkm/profile | Selesai |
| Endpoint /admin/dashboard | Belum tersedia | Dicatat sebagai finding, bukan blocker checkpoint 5 |

## Catatan Checkpoint 6 - Landing dan Auth Pages

Tanggal pengecekan: 14 Mei 2026  
Area: Frontend  
Checkpoint: 6  
Target checkpoint: Landing page, login page, register page, integrasi auth frontend, dan redirect role  

| Item Testing | Hasil | Status |
|---|---|---|
| Frontend running | Berhasil | Selesai |
| Landing page | Berhasil tampil | Selesai |
| Navbar landing | Berhasil tampil | Selesai |
| Hero section | Berhasil tampil | Selesai |
| Section produk | Berhasil tampil | Selesai |
| Section tren UMKM | Berhasil tampil | Selesai |
| Section alur penggunaan | Berhasil tampil | Selesai |
| Section manfaat | Berhasil tampil | Selesai |
| Footer | Berhasil tampil | Selesai |
| Login page | Berhasil tampil | Selesai |
| Register page | Berhasil tampil | Selesai |
| Endpoint login frontend | Sudah mengarah ke backend /api/auth/login | Selesai |
| Endpoint register frontend | Sudah mengarah ke backend /api/auth/register | Selesai |
| Register Mahasiswa dari frontend | Berhasil | Selesai |
| Register UMKM dari frontend | Berhasil | Selesai |
| Login Mahasiswa dari frontend | Berhasil | Selesai |
| Login UMKM dari frontend | Berhasil | Selesai |
| Login Admin dari frontend | Berhasil | Selesai |
| Token setelah login | Tersimpan | Selesai |
| Redirect Mahasiswa | Mengarah ke /mahasiswa/dashboard | Selesai |
| Redirect UMKM | Mengarah ke /umkm/dashboard | Selesai |
| Redirect Admin | Mengarah ke /admin/dashboard | Selesai |
| Error handling login | Berjalan | Selesai |
| Validasi register | Berjalan | Selesai |
| Responsif halaman / | Aman | Selesai |
| Responsif halaman /login | Aman | Selesai |
| Responsif halaman /register | Aman | Selesai |

## Catatan Checkpoint 7 - Profile dan Upload File API

Tanggal pengecekan: 14 Mei 2026  
Area: Backend  
Checkpoint: 7  
Target checkpoint: Profile Mahasiswa, upload file Mahasiswa, Profile UMKM, role protection, dan path file upload  

| Item Testing | Hasil | Status |
|---|---|---|
| Login Mahasiswa CP7 untuk token | Berhasil | Selesai |
| Login UMKM CP7 untuk token | Berhasil | Selesai |
| GET profile Mahasiswa | Berhasil | Selesai |
| PUT profile Mahasiswa tanpa file | Berhasil | Selesai |
| PUT profile Mahasiswa dengan file | Berhasil | Selesai |
| Upload photo Mahasiswa | Berhasil | Selesai |
| Upload studentCard Mahasiswa | Berhasil | Selesai |
| Upload identityCard Mahasiswa | Berhasil | Selesai |
| File upload tersimpan di folder upload | Berhasil | Selesai |
| Path file tersimpan di database | Berhasil | Selesai |
| Database menyimpan path, bukan binary | Berhasil | Selesai |
| UMKM akses profile Mahasiswa | Ditolak | Selesai |
| GET profile UMKM | Berhasil | Selesai |
| PUT profile UMKM | Berhasil | Selesai |
| Mahasiswa akses profile UMKM | Ditolak | Selesai |
| Endpoint profile tanpa token | Ditolak | Selesai |
| Checkpoint 7 | PASS | Selesai |

## Kesimpulan Pengecekan Awal

Backend dan frontend sudah bisa running.

Checkpoint 4 backend sudah lolos testing karena Prisma validate, Prisma generate, migration, seed admin, dan pengecekan admin di database berhasil.

Checkpoint 5 backend juga sudah lolos testing karena register, login, JWT, auth me, change password, dan middleware role berjalan sesuai hasil pengujian.

Checkpoint 6 frontend sudah lolos testing karena landing page, login page, register page, integrasi auth frontend, redirect role, dan responsivitas halaman awal berhasil.

Checkpoint 7 backend sudah lolos testing karena profile Mahasiswa, upload file Mahasiswa, profile UMKM, role protection, dan penyimpanan path file berhasil.

Status saat ini:

| Checkpoint | Status Testing | Catatan |
|---|---|---|
| Checkpoint 1 Testing | Selesai | Struktur awal dan dokumen testing sudah dibuat |
| Checkpoint 2 Backend | Selesai untuk setup awal | Backend bisa running |
| Checkpoint 3 Frontend | Selesai untuk setup awal | Frontend bisa running |
| Checkpoint 4 Database | PASS | Schema Prisma, migration, dan seed admin berhasil |
| Checkpoint 5 Auth API | PASS | Register, login, JWT, auth me, change password, dan middleware role berhasil |
| Checkpoint 6 Landing dan Auth Pages | PASS | Landing, login, register, integrasi backend, redirect role, dan responsif berhasil |
| Checkpoint 7 Profile dan Upload File API | PASS | Profile Mahasiswa, upload file, profile UMKM, dan role protection berhasil |
| Checkpoint 8 Dashboard Mahasiswa | Belum dites | Menunggu frontend dashboard Mahasiswa |
| Checkpoint 9 Product dan Verification API | Belum dites penuh | Menunggu testing produk dan verifikasi admin |

## Catatan

Dokumen ini akan diperbarui setiap ada fitur yang selesai dibuat oleh backend dan frontend.