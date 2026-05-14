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
| Auth | Belum dites |
| Mahasiswa | Belum dites |
| UMKM | Belum dites |
| Admin | Belum dites |
| ReKarya Match | Belum dites |
| Upload File | Belum dites |
| Responsivitas | Belum dites |
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
| src/config | Belum terlihat | Perlu dicek pada checkpoint berikutnya |
| src/controllers | Belum terlihat | Perlu dicek pada checkpoint berikutnya |
| src/middleware | Belum terlihat | Perlu dicek pada checkpoint berikutnya |
| src/routes | Belum terlihat | Perlu dicek pada checkpoint berikutnya |
| src/services | Belum terlihat | Perlu dicek pada checkpoint berikutnya |
| src/utils | Belum terlihat | Perlu dicek pada checkpoint berikutnya |
| src/uploads | Belum terlihat | Perlu dicek pada checkpoint upload file |

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

## Kesimpulan Pengecekan Awal

Backend dan frontend sudah bisa running sebagai project default awal.

Checkpoint 4 backend juga sudah lolos testing karena Prisma validate, Prisma generate, migration, seed admin, dan pengecekan admin di database berhasil.

Status saat ini:

| Checkpoint | Status Testing | Catatan |
|---|---|---|
| Checkpoint 1 Testing | Selesai | Struktur awal dan dokumen testing sudah dibuat |
| Checkpoint 2 Backend | Selesai untuk setup awal | Backend bisa running |
| Checkpoint 3 Frontend | Selesai untuk setup awal | Frontend bisa running |
| Checkpoint 4 Database | PASS | Schema Prisma, migration, dan seed admin berhasil |
| Checkpoint 5 Auth API | Belum dites | Menunggu endpoint auth dari backend |
| Checkpoint 6 Landing dan Auth Pages | Belum dites | Menunggu landing, login, dan register dari frontend |

## Catatan

Dokumen ini akan diperbarui setiap ada fitur yang selesai dibuat oleh backend dan frontend.