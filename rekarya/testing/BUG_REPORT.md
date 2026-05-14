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
| BUG-001 | - | - | - | Belum ada bug fitur yang dites | - | - | - | - | - | - | Belum masuk testing fitur |

## Finding Struktur Awal

| ID | Tanggal | Area | Temuan | Dampak | Severity | Status | PIC | Catatan |
|---|---|---|---|---|---|---|---|---|
| FIND-001 | 14 Mei 2026 | Backend | Backend sudah bisa running default awal | Setup awal backend bisa dijalankan | Info | Closed | Backend | Tidak termasuk bug |
| FIND-002 | 14 Mei 2026 | Frontend | Frontend sudah bisa running default awal | Setup awal frontend bisa dijalankan | Info | Closed | Frontend | Tidak termasuk bug |
| FIND-003 | 14 Mei 2026 | Backend | Struktur src backend belum lengkap | Backend belum siap untuk pembagian controller, route, middleware, service, dan utils | Medium | Open | Backend | Perlu folder config, controllers, middleware, routes, services, utils |
| FIND-004 | 14 Mei 2026 | Backend | Folder uploads belum terlihat | Upload file Multer belum bisa divalidasi | Medium | Open | Backend | Perlu uploads/profiles, uploads/documents, uploads/products |
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

## Bug Detail

### BUG-001

Tanggal: -  
Role: -  
Halaman/Fitur: -  
Severity: -  
Status: -  
PIC: -  

#### Deskripsi Bug

Belum ada bug fitur yang dicatat karena project masih berada di tahap setup awal backend dan frontend.

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

Finding yang masih open bukan berarti aplikasi error, tetapi menjadi catatan bahwa struktur dan fitur ReKarya belum lengkap untuk dilakukan testing fitur berikutnya.