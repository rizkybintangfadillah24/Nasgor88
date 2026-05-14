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
| FIND-005 | 14 Mei 2026 | Backend | prisma/seed.js belum terlihat | Akun admin demo belum bisa dipastikan | High | Open | Backend | Perlu seed admin |
| FIND-006 | 14 Mei 2026 | Backend | Isi schema.prisma belum dicek detail | Model database ReKarya belum bisa dipastikan | High | Open | Backend | Perlu cek model User, Product, Category, Transaction, dan lainnya |
| FIND-007 | 14 Mei 2026 | Frontend | Struktur frontend memakai app, bukan src/app | Tidak sesuai struktur final dokumen | Medium | Open | Frontend | Perlu konfirmasi apakah akan dipindah ke src/app |
| FIND-008 | 14 Mei 2026 | Frontend | Folder components, lib, dan types belum terlihat | Struktur frontend belum siap untuk pengembangan rapi | Medium | Open | Frontend | Perlu dilengkapi |
| FIND-009 | 14 Mei 2026 | Frontend | Halaman login dan register belum terlihat | Auth frontend belum bisa dites | High | Open | Frontend | Menunggu checkpoint landing dan auth pages |

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

Finding yang masih open bukan berarti aplikasi error, tetapi menjadi catatan bahwa struktur dan fitur ReKarya belum lengkap untuk dilakukan testing fitur.