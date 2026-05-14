# Bug Report - ReKarya

Dokumen ini digunakan untuk mencatat semua bug, finding, dan catatan hasil testing selama proses development ReKarya.

## Format Status Bug

| Status | Keterangan |
|---|---|
| Open | Bug baru ditemukan dan belum diperbaiki |
| In Progress | Bug sedang diperbaiki |
| Fixed | Bug sudah diperbaiki |
| Retest | Bug perlu dites ulang |
| Closed | Bug sudah selesai dan aman |

## Format Severity

| Severity | Keterangan |
|---|---|
| Critical | Fitur utama tidak bisa dipakai sama sekali |
| High | Fitur penting error, tetapi masih ada jalan lain |
| Medium | Fitur berjalan tetapi hasil tidak sesuai |
| Low | Masalah kecil pada tampilan atau teks |
| Info | Catatan pengecekan awal, bukan bug fitur |

## Daftar Bug

| ID | Tanggal | Role | Halaman/Fitur | Deskripsi Bug | Langkah Reproduksi | Expected Result | Actual Result | Severity | Status | PIC | Catatan |
|---|---|---|---|---|---|---|---|---|---|---|---|
| BUG-001 | - | - | - | Belum ada bug fitur yang dites | - | - | - | - | - | - | Belum ada bug utama yang perlu dicatat |

## Finding Struktur Awal

| ID | Tanggal | Area | Temuan | Dampak | Severity | Status | PIC | Catatan |
|---|---|---|---|---|---|---|---|---|
| FIND-001 | 14 Mei 2026 | Backend | Backend sudah bisa running default awal | Setup awal backend bisa dijalankan | Info | Closed | Backend | Tidak termasuk bug |
| FIND-002 | 14 Mei 2026 | Frontend | Frontend sudah bisa running default awal | Setup awal frontend bisa dijalankan | Info | Closed | Frontend | Tidak termasuk bug |
| FIND-003 | 14 Mei 2026 | Backend | Struktur src backend mulai dilengkapi | Backend sudah memiliki config, controllers, middleware, routes, dan utils | Info | Closed | Backend | Struktur sudah berkembang setelah update backend |
| FIND-004 | 14 Mei 2026 | Backend | Folder uploads belum dites penuh | Upload file Multer belum divalidasi penuh | Medium | Open | Backend/Testing | Perlu dites pada checkpoint upload file |
| FIND-005 | 14 Mei 2026 | Backend | prisma/seed.js tersedia dan seed admin berhasil | Akun admin demo sudah tersedia di database lokal | Info | Closed | Backend | Selesai pada Checkpoint 4 |
| FIND-006 | 14 Mei 2026 | Backend | schema.prisma berhasil divalidasi | Model database dapat digunakan oleh Prisma | Info | Closed | Backend | Prisma validate berhasil |
| FIND-007 | 14 Mei 2026 | Frontend | Struktur frontend memakai app, bukan src/app | Tidak sesuai struktur final dokumen | Medium | Open | Frontend | Perlu konfirmasi apakah akan dipindah ke src/app |
| FIND-008 | 14 Mei 2026 | Frontend | Folder components, lib, dan types belum terlihat | Struktur frontend belum siap untuk pengembangan rapi | Medium | Open | Frontend | Perlu dilengkapi |
| FIND-009 | 14 Mei 2026 | Frontend | Halaman login dan register belum terlihat | Auth frontend belum bisa dites | High | Open | Frontend | Menunggu checkpoint landing dan auth pages |

## Finding Checkpoint 4 - Database Schema dan Admin Seed

| ID | Tanggal | Area | Temuan | Dampak | Severity | Status | PIC | Catatan |
|---|---|---|---|---|---|---|---|---|
| FIND-CP4-001 | 14 Mei 2026 | Backend Database | DATABASE_URL awalnya belum terbaca | Prisma validate sempat gagal karena .env lokal belum tersedia | Medium | Closed | Backend/Testing | Sudah selesai setelah .env lokal dibuat |
| FIND-CP4-002 | 14 Mei 2026 | Backend Database | Prisma validate berhasil | Schema Prisma valid | Info | Closed | Backend | PASS |
| FIND-CP4-003 | 14 Mei 2026 | Backend Database | Prisma generate berhasil | Prisma Client berhasil dibuat | Info | Closed | Backend | PASS |
| FIND-CP4-004 | 14 Mei 2026 | Backend Database | Migration berhasil | Database berhasil sinkron dengan schema | Info | Closed | Backend | PASS |
| FIND-CP4-005 | 14 Mei 2026 | Backend Database | Seed admin berhasil | Akun admin tersedia untuk login admin | Info | Closed | Backend | PASS |
| FIND-CP4-006 | 14 Mei 2026 | Backend Database | Admin ada di database | Role ADMIN tersedia dan password berbentuk hash | Info | Closed | Backend | PASS |

## Finding Checkpoint 5 - Authentication API

| ID | Tanggal | Area | Temuan | Dampak | Severity | Status | PIC | Catatan |
|---|---|---|---|---|---|---|---|---|
| FIND-CP5-001 | 14 Mei 2026 | Auth API | Request register awal memakai field name dan tidak memakai confirmPassword | Register gagal dengan pesan semua field wajib diisi | Info | Closed | Testing | Sudah diperbaiki pada request Postman dengan field username dan confirmPassword |
| FIND-CP5-002 | 14 Mei 2026 | Auth API | Register Mahasiswa berhasil | Akun Mahasiswa bisa dibuat | Info | Closed | Backend | PASS |
| FIND-CP5-003 | 14 Mei 2026 | Auth API | Register UMKM berhasil | Akun UMKM bisa dibuat | Info | Closed | Backend | PASS |
| FIND-CP5-004 | 14 Mei 2026 | Auth API | Register Admin public ditolak | Admin tidak bisa dibuat dari register umum | Info | Closed | Backend | PASS |
| FIND-CP5-005 | 14 Mei 2026 | Auth API | Register email atau username duplikat ditolak | Data user lebih aman dari duplikasi | Info | Closed | Backend | PASS |
| FIND-CP5-006 | 14 Mei 2026 | Auth API | Login Mahasiswa berhasil | Token Mahasiswa muncul | Info | Closed | Backend | PASS |
| FIND-CP5-007 | 14 Mei 2026 | Auth API | Login UMKM berhasil | Token UMKM muncul | Info | Closed | Backend | PASS |
| FIND-CP5-008 | 14 Mei 2026 | Auth API | Login Admin berhasil | Token Admin muncul | Info | Closed | Backend | PASS |
| FIND-CP5-009 | 14 Mei 2026 | Auth API | Login password salah ditolak | Login lebih aman | Info | Closed | Backend | PASS |
| FIND-CP5-010 | 14 Mei 2026 | Auth API | Auth me tanpa token ditolak | Endpoint terlindungi auth middleware | Info | Closed | Backend | PASS |
| FIND-CP5-011 | 14 Mei 2026 | Auth API | Auth me token valid berhasil | Data user aktif bisa diambil | Info | Closed | Backend | PASS |
| FIND-CP5-012 | 14 Mei 2026 | Auth API | Auth me token invalid ditolak | Token salah tidak diterima | Info | Closed | Backend | PASS |
| FIND-CP5-013 | 14 Mei 2026 | Auth API | Change password berhasil | Password user bisa diubah | Info | Closed | Backend | PASS |
| FIND-CP5-014 | 14 Mei 2026 | Auth API | Login password lama setelah change password ditolak | Password lama tidak berlaku | Info | Closed | Backend | PASS |
| FIND-CP5-015 | 14 Mei 2026 | Auth API | Login password baru berhasil | Password baru aktif | Info | Closed | Backend | PASS |
| FIND-CP5-016 | 14 Mei 2026 | Middleware Role | Mahasiswa ditolak saat akses endpoint Admin | Role middleware berjalan | Info | Closed | Backend | PASS |
| FIND-CP5-017 | 14 Mei 2026 | Middleware Role | UMKM ditolak saat akses endpoint Mahasiswa | Role middleware berjalan | Info | Closed | Backend | PASS |
| FIND-CP5-018 | 14 Mei 2026 | Middleware Role | Mahasiswa ditolak saat akses endpoint UMKM | Role middleware berjalan | Info | Closed | Backend | PASS |
| FIND-CP5-019 | 14 Mei 2026 | Middleware Role | Admin berhasil akses endpoint Admin | Role middleware menerima role yang benar | Info | Closed | Backend | PASS |
| FIND-CP5-020 | 14 Mei 2026 | Admin Route | GET /api/admin/dashboard belum tersedia | Endpoint tersebut tidak bisa dipakai untuk test role | Low | Open | Backend | Test role diganti memakai GET /api/admin/products/pending |

## Bug Detail

### BUG-001

Tanggal: -  
Role: -  
Halaman/Fitur: -  
Severity: -  
Status: -  
PIC: -  

#### Deskripsi Bug

Belum ada bug utama yang dicatat karena hasil testing checkpoint 4 dan checkpoint 5 sudah sesuai harapan.

#### Langkah Reproduksi

Belum ada.

#### Expected Result

Belum ada.

#### Actual Result

Belum ada.

#### Bukti

Belum ada.

#### Catatan Perbaikan

Belum ada.

#### Hasil Retest

Belum ada.

## Catatan Testing

Backend dan frontend sudah bisa running sebagai project default awal.

Checkpoint 4 sudah PASS karena schema Prisma valid, Prisma generate berhasil, migration berhasil, seed admin berhasil, dan admin tersedia di database.

Checkpoint 5 sudah PASS karena register, login, JWT, auth me, change password, dan middleware role berhasil dites.

Finding yang masih open bukan berarti checkpoint 5 gagal. Finding open hanya mencatat fitur atau endpoint yang belum masuk target checkpoint tersebut, seperti endpoint admin dashboard.