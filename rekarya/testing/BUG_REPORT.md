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
| BUG-CP6-001 | 14 Mei 2026 | Public | Login/Register Frontend | Frontend login dan register awalnya mengarah ke localhost:3000/auth, bukan backend localhost:5000/api/auth | Submit login/register dari frontend | Request mengarah ke backend /api/auth | Request 404 ke localhost:3000/auth | High | Closed | Frontend | Sudah diperbaiki dengan base URL backend |
| BUG-CP6-002 | 14 Mei 2026 | Public | Register Frontend | Payload register frontend awalnya belum mengirim confirmPassword | Submit register dari frontend | Backend menerima username, email, password, confirmPassword, role | Backend mengembalikan "Semua field wajib diisi" | High | Closed | Frontend | Sudah diperbaiki dengan menambahkan confirmPassword pada payload |

## Finding Struktur Awal

| ID | Tanggal | Area | Temuan | Dampak | Severity | Status | PIC | Catatan |
|---|---|---|---|---|---|---|---|---|
| FIND-001 | 14 Mei 2026 | Backend | Backend sudah bisa running default awal | Setup awal backend bisa dijalankan | Info | Closed | Backend | Tidak termasuk bug |
| FIND-002 | 14 Mei 2026 | Frontend | Frontend sudah bisa running default awal | Setup awal frontend bisa dijalankan | Info | Closed | Frontend | Tidak termasuk bug |
| FIND-003 | 14 Mei 2026 | Backend | Struktur src backend mulai dilengkapi | Backend sudah memiliki config, controllers, middleware, routes, dan utils | Info | Closed | Backend | Struktur sudah berkembang setelah update backend |
| FIND-004 | 14 Mei 2026 | Backend | Folder upload sudah digunakan untuk profile upload | Upload file profile berhasil divalidasi | Info | Closed | Backend/Testing | Selesai pada Checkpoint 7 |
| FIND-005 | 14 Mei 2026 | Backend | prisma/seed.js tersedia dan seed admin berhasil | Akun admin demo sudah tersedia di database lokal | Info | Closed | Backend | Selesai pada Checkpoint 4 |
| FIND-006 | 14 Mei 2026 | Backend | schema.prisma berhasil divalidasi | Model database dapat digunakan oleh Prisma | Info | Closed | Backend | Prisma validate berhasil |
| FIND-007 | 14 Mei 2026 | Frontend | Struktur frontend memakai app, bukan src/app | Tidak sesuai struktur final dokumen | Medium | Open | Frontend | Perlu konfirmasi apakah akan dipindah ke src/app |
| FIND-008 | 14 Mei 2026 | Frontend | Folder components dan types belum terlihat | Struktur frontend belum sepenuhnya sesuai dokumen | Medium | Open | Frontend | Perlu dilengkapi pada checkpoint lanjutan |
| FIND-009 | 14 Mei 2026 | Frontend | Halaman login dan register sudah tersedia | Auth frontend sudah bisa dites | Info | Closed | Frontend | Selesai pada Checkpoint 6 |

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

## Finding Checkpoint 6 - Landing dan Auth Pages

| ID | Tanggal | Area | Temuan | Dampak | Severity | Status | PIC | Catatan |
|---|---|---|---|---|---|---|---|---|
| FIND-CP6-001 | 14 Mei 2026 | Frontend | Frontend running berhasil | Halaman frontend bisa diakses | Info | Closed | Frontend | PASS |
| FIND-CP6-002 | 14 Mei 2026 | Frontend Landing | Landing page tampil | User dapat melihat halaman awal ReKarya | Info | Closed | Frontend | PASS |
| FIND-CP6-003 | 14 Mei 2026 | Frontend Landing | Navbar, hero, produk, tren UMKM, alur, manfaat, dan footer tampil | Landing sesuai checkpoint 6 | Info | Closed | Frontend | PASS |
| FIND-CP6-004 | 14 Mei 2026 | Frontend Auth | Login page tampil | User dapat membuka halaman login | Info | Closed | Frontend | PASS |
| FIND-CP6-005 | 14 Mei 2026 | Frontend Auth | Register page tampil | User dapat membuka halaman register | Info | Closed | Frontend | PASS |
| FIND-CP6-006 | 14 Mei 2026 | Frontend Auth | Login frontend berhasil mengarah ke backend /api/auth/login | Login frontend bisa terhubung ke backend | Info | Closed | Frontend | PASS |
| FIND-CP6-007 | 14 Mei 2026 | Frontend Auth | Register frontend berhasil mengarah ke backend /api/auth/register | Register frontend bisa terhubung ke backend | Info | Closed | Frontend | PASS |
| FIND-CP6-008 | 14 Mei 2026 | Frontend Auth | Register Mahasiswa dari frontend berhasil | Akun Mahasiswa bisa dibuat dari UI | Info | Closed | Frontend | PASS |
| FIND-CP6-009 | 14 Mei 2026 | Frontend Auth | Register UMKM dari frontend berhasil | Akun UMKM bisa dibuat dari UI | Info | Closed | Frontend | PASS |
| FIND-CP6-010 | 14 Mei 2026 | Frontend Auth | Login Mahasiswa dari frontend berhasil | Mahasiswa bisa login dari UI | Info | Closed | Frontend | PASS |
| FIND-CP6-011 | 14 Mei 2026 | Frontend Auth | Login UMKM dari frontend berhasil | UMKM bisa login dari UI | Info | Closed | Frontend | PASS |
| FIND-CP6-012 | 14 Mei 2026 | Frontend Auth | Login Admin dari frontend berhasil | Admin bisa login dari UI | Info | Closed | Frontend | PASS |
| FIND-CP6-013 | 14 Mei 2026 | Frontend Auth | Redirect role berhasil | User diarahkan sesuai role | Info | Closed | Frontend | PASS |
| FIND-CP6-014 | 14 Mei 2026 | Frontend Auth | Error handling login dan register berjalan | User mendapat pesan error saat input salah | Info | Closed | Frontend | PASS |
| FIND-CP6-015 | 14 Mei 2026 | Frontend Auth | Token tersimpan setelah login | Sesi login bisa digunakan untuk fitur berikutnya | Info | Closed | Frontend | PASS |
| FIND-CP6-016 | 14 Mei 2026 | Frontend Responsif | Landing, login, dan register responsif | Tampilan aman pada mobile/tablet/desktop | Info | Closed | Frontend | PASS |

## Finding Checkpoint 7 - Profile dan Upload File API

| ID | Tanggal | Area | Temuan | Dampak | Severity | Status | PIC | Catatan |
|---|---|---|---|---|---|---|---|---|
| FIND-CP7-001 | 14 Mei 2026 | Auth | Login Mahasiswa CP7 berhasil | Token Mahasiswa tersedia untuk test profile | Info | Closed | Backend | PASS |
| FIND-CP7-002 | 14 Mei 2026 | Auth | Login UMKM CP7 berhasil | Token UMKM tersedia untuk test profile | Info | Closed | Backend | PASS |
| FIND-CP7-003 | 14 Mei 2026 | Mahasiswa Profile | GET profile Mahasiswa berhasil | Data profile Mahasiswa dapat diambil | Info | Closed | Backend | PASS |
| FIND-CP7-004 | 14 Mei 2026 | Mahasiswa Profile | PUT profile Mahasiswa tanpa file berhasil | Data text profile Mahasiswa tersimpan | Info | Closed | Backend | PASS |
| FIND-CP7-005 | 14 Mei 2026 | Mahasiswa Profile | PUT profile Mahasiswa dengan file berhasil | Data profile dan file Mahasiswa tersimpan | Info | Closed | Backend | PASS |
| FIND-CP7-006 | 14 Mei 2026 | Upload File | Upload photo berhasil | Foto profile Mahasiswa tersimpan | Info | Closed | Backend | PASS |
| FIND-CP7-007 | 14 Mei 2026 | Upload File | Upload studentCard berhasil | File KTM/surat aktif Mahasiswa tersimpan | Info | Closed | Backend | PASS |
| FIND-CP7-008 | 14 Mei 2026 | Upload File | Upload identityCard berhasil | File KTP Mahasiswa tersimpan | Info | Closed | Backend | PASS |
| FIND-CP7-009 | 14 Mei 2026 | Upload File | File upload tersimpan di folder upload | File fisik tersedia di folder backend | Info | Closed | Backend | PASS |
| FIND-CP7-010 | 14 Mei 2026 | Database | Path file tersimpan di database | Database menyimpan path file, bukan binary | Info | Closed | Backend | PASS |
| FIND-CP7-011 | 14 Mei 2026 | Role Protection | UMKM ditolak saat akses profile Mahasiswa | Data profile Mahasiswa terlindungi | Info | Closed | Backend | PASS |
| FIND-CP7-012 | 14 Mei 2026 | UMKM Profile | GET profile UMKM berhasil | Data profile UMKM dapat diambil | Info | Closed | Backend | PASS |
| FIND-CP7-013 | 14 Mei 2026 | UMKM Profile | PUT profile UMKM berhasil | Data usaha UMKM tersimpan | Info | Closed | Backend | PASS |
| FIND-CP7-014 | 14 Mei 2026 | Role Protection | Mahasiswa ditolak saat akses profile UMKM | Data profile UMKM terlindungi | Info | Closed | Backend | PASS |
| FIND-CP7-015 | 14 Mei 2026 | Auth Protection | Endpoint profile tanpa token ditolak | Endpoint profile terlindungi auth middleware | Info | Closed | Backend | PASS |
| FIND-CP7-016 | 14 Mei 2026 | Checkpoint 7 | Profile dan upload file API selesai dites | Backend siap lanjut checkpoint berikutnya | Info | Closed | Backend/Testing | PASS |

## Bug Detail

### BUG-CP6-001

Tanggal: 14 Mei 2026  
Role: Public  
Halaman/Fitur: Login/Register Frontend  
Severity: High  
Status: Closed  
PIC: Frontend  

#### Deskripsi Bug

Frontend login dan register awalnya mengirim request ke endpoint frontend:

```text
http://localhost:3000/auth/login
http://localhost:3000/auth/register