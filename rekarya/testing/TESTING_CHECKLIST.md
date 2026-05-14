# Testing Checklist - ReKarya

Checklist ini digunakan untuk memastikan seluruh fitur ReKarya berjalan sesuai dokumen final project.

## 1. Auth

| No | Test Case | Langkah Testing | Hasil yang Diharapkan | Status | Catatan |
|---|---|---|---|---|---|
| 1 | Register Mahasiswa | Isi form register dengan role Mahasiswa | Akun Mahasiswa berhasil dibuat | Belum | Menunggu halaman dan endpoint |
| 2 | Register UMKM | Isi form register dengan role UMKM | Akun UMKM berhasil dibuat | Belum | Menunggu halaman dan endpoint |
| 3 | Login Mahasiswa | Login memakai akun Mahasiswa | Redirect ke dashboard Mahasiswa | Belum | Menunggu halaman dan endpoint |
| 4 | Login UMKM | Login memakai akun UMKM | Redirect ke dashboard UMKM | Belum | Menunggu halaman dan endpoint |
| 5 | Login Admin | Login memakai akun Admin | Redirect ke dashboard Admin | Belum | Menunggu seed admin dan endpoint |
| 6 | Login password salah | Masukkan password salah | Sistem menampilkan pesan error | Belum | Menunggu endpoint auth |
| 7 | Akses tanpa token | Buka dashboard tanpa login | Sistem menolak akses | Belum | Menunggu middleware auth |
| 8 | Akses beda role | Mahasiswa membuka halaman Admin | Sistem menolak akses | Belum | Menunggu middleware role |
| 9 | Endpoint auth me | Panggil endpoint /auth/me dengan token valid | Data user aktif tampil | Belum | Menunggu endpoint |
| 10 | Change password | Ubah password dari akun login | Password berhasil berubah | Belum | Menunggu endpoint |

## 2. Mahasiswa

| No | Test Case | Langkah Testing | Hasil yang Diharapkan | Status | Catatan |
|---|---|---|---|---|---|
| 1 | Dashboard Mahasiswa | Login sebagai Mahasiswa | Dashboard Mahasiswa tampil | Belum | Menunggu halaman |
| 2 | Update profil | Isi data profil Mahasiswa | Data profil tersimpan | Belum | Menunggu endpoint dan halaman |
| 3 | Upload foto profil | Upload file JPG/PNG | Foto tersimpan | Belum | Menunggu Multer |
| 4 | Upload KTM/surat aktif kuliah | Upload JPG/PNG/PDF | File tersimpan | Belum | Menunggu Multer |
| 5 | Upload KTP | Upload JPG/PNG/PDF | File tersimpan | Belum | Menunggu Multer |
| 6 | Upload produk | Isi form produk dan upload screenshot | Produk berhasil dibuat | Belum | Menunggu endpoint dan halaman |
| 7 | Status produk baru | Cek produk setelah upload | Status produk PENDING | Belum | Menunggu database model |
| 8 | Edit produk sendiri | Edit data produk milik sendiri | Produk berhasil diperbarui | Belum | Menunggu endpoint |
| 9 | Hapus produk sendiri | Hapus produk milik sendiri | Produk berhasil dihapus | Belum | Menunggu endpoint |
| 10 | Lihat kerja sama | Buka menu kerja sama | List kerja sama tampil | Belum | Menunggu endpoint dan halaman |
| 11 | Setujui kerja sama | Klik setujui pada pengajuan | Status menjadi APPROVED | Belum | Menunggu endpoint |
| 12 | Tolak kerja sama | Klik tolak pada pengajuan | Status menjadi REJECTED | Belum | Menunggu endpoint |
| 13 | Kirim penawaran | Buat penawaran untuk UMKM | Penawaran berhasil dikirim | Belum | Menunggu endpoint |
| 14 | Lihat transaksi | Buka menu transaksi | Data transaksi tampil | Belum | Menunggu endpoint |
| 15 | Update pendampingan | Isi progress dan catatan | Progress tersimpan | Belum | Menunggu endpoint |
| 16 | Lihat ulasan | Buka menu ulasan | Rating dan komentar tampil | Belum | Menunggu endpoint |

## 3. UMKM

| No | Test Case | Langkah Testing | Hasil yang Diharapkan | Status | Catatan |
|---|---|---|---|---|---|
| 1 | Dashboard UMKM | Login sebagai UMKM | Dashboard UMKM tampil | Belum | Menunggu halaman |
| 2 | Update profil UMKM | Isi data usaha | Data usaha tersimpan | Belum | Menunggu endpoint dan halaman |
| 3 | Cari solusi | Isi form cari solusi | List rekomendasi tampil | Belum | Menunggu ReKarya Match |
| 4 | ReKarya Match score | Cek hasil rekomendasi | Match Score tampil | Belum | Menunggu endpoint |
| 5 | Label kecocokan | Cek label rekomendasi | Label sesuai score | Belum | Menunggu endpoint |
| 6 | Alasan rekomendasi | Cek detail rekomendasi | Alasan rekomendasi tampil | Belum | Menunggu endpoint |
| 7 | Detail produk | Klik detail produk | Detail produk tampil | Belum | Menunggu halaman dan endpoint |
| 8 | Request demo | Kirim request demo | Request berhasil dibuat | Belum | Menunggu endpoint |
| 9 | Ajukan kerja sama | Klik ajukan kerja sama | Pengajuan berhasil dibuat | Belum | Menunggu endpoint |
| 10 | Lihat status kerja sama | Buka menu kerja sama | Status kerja sama tampil | Belum | Menunggu halaman dan endpoint |
| 11 | Lihat penawaran | Buka menu penawaran | Penawaran dari Mahasiswa tampil | Belum | Menunggu halaman dan endpoint |
| 12 | Setujui penawaran | Klik setujui penawaran | Status menjadi APPROVED | Belum | Menunggu endpoint |
| 13 | Tolak penawaran | Klik tolak penawaran | Status menjadi REJECTED | Belum | Menunggu endpoint |
| 14 | Lihat transaksi | Buka menu transaksi | Data transaksi tampil | Belum | Menunggu endpoint |
| 15 | Lihat pendampingan | Buka menu pendampingan | Progress pendampingan tampil | Belum | Menunggu endpoint |
| 16 | Tandai selesai | Klik tandai selesai | Status pendampingan DONE | Belum | Menunggu endpoint |
| 17 | Kirim ulasan | Isi rating dan komentar | Ulasan berhasil tersimpan | Belum | Menunggu endpoint |

## 4. Admin

| No | Test Case | Langkah Testing | Hasil yang Diharapkan | Status | Catatan |
|---|---|---|---|---|---|
| 1 | Dashboard Admin | Login sebagai Admin | Dashboard Admin tampil | Belum | Menunggu seed dan halaman |
| 2 | Verifikasi akun | Buka akun pending | Akun bisa disetujui/ditolak | Belum | Menunggu endpoint |
| 3 | Lihat produk pending | Buka menu produk pending | Produk pending tampil | Belum | Menunggu endpoint |
| 4 | Approve produk | Setujui produk Mahasiswa | Status menjadi APPROVED | Belum | Menunggu endpoint |
| 5 | Reject produk | Tolak produk Mahasiswa | Status menjadi REJECTED | Belum | Menunggu endpoint |
| 6 | Produk approved di katalog | Cek katalog setelah approve | Produk tampil di katalog | Belum | Menunggu katalog |
| 7 | Produk pending tidak tampil | Cek katalog sebelum approve | Produk tidak tampil | Belum | Menunggu katalog |
| 8 | Produk rejected tidak tampil | Cek katalog setelah reject | Produk tidak tampil | Belum | Menunggu katalog |
| 9 | Kelola kategori | Tambah/edit/hapus kategori | Kategori berhasil dikelola | Belum | Menunggu endpoint |
| 10 | Monitoring aktivitas | Buka menu aktivitas | Data aktivitas tampil | Belum | Menunggu endpoint |
| 11 | Monitoring transaksi | Buka menu transaksi | Data transaksi tampil | Belum | Menunggu endpoint |
| 12 | Update status pembayaran | Ubah status pembayaran | Status berhasil berubah | Belum | Menunggu endpoint |
| 13 | Monitoring pendampingan | Buka menu pendampingan | Data pendampingan tampil | Belum | Menunggu endpoint |
| 14 | Statistik masalah UMKM | Buka statistik masalah | Data statistik tampil | Belum | Menunggu endpoint |
| 15 | Laporan sistem | Buka laporan sistem | Ringkasan laporan tampil | Belum | Menunggu endpoint |

## 5. ReKarya Match

| No | Test Case | Langkah Testing | Hasil yang Diharapkan | Status | Catatan |
|---|---|---|---|---|---|
| 1 | Produk approved masuk rekomendasi | Cari solusi dengan produk approved | Produk tampil di rekomendasi | Belum | Menunggu product approval dan endpoint match |
| 2 | Produk pending tidak masuk rekomendasi | Cari solusi saat produk masih pending | Produk tidak tampil | Belum | Menunggu endpoint match |
| 3 | Produk rejected tidak masuk rekomendasi | Cari solusi dengan produk rejected | Produk tidak tampil | Belum | Menunggu endpoint match |
| 4 | Kecocokan masalah utama | Masukkan masalah yang sama dengan produk | Score bertambah besar | Belum | Menunggu logic scoring |
| 5 | Kecocokan fitur | Masukkan fitur yang cocok | Score bertambah | Belum | Menunggu logic scoring |
| 6 | Kesesuaian budget | Masukkan budget sesuai harga | Score bertambah | Belum | Menunggu logic scoring |
| 7 | Kecocokan durasi | Masukkan durasi sesuai produk | Score bertambah | Belum | Menunggu logic scoring |
| 8 | Kecocokan pendampingan | Masukkan metode sesuai produk | Score bertambah | Belum | Menunggu logic scoring |
| 9 | Score 80-100 | Buat data yang sangat cocok | Label Sangat Cocok | Belum | Menunggu logic scoring |
| 10 | Score 60-79 | Buat data cukup cocok | Label Cocok | Belum | Menunggu logic scoring |
| 11 | Score 40-59 | Buat data sebagian cocok | Label Cukup Sesuai | Belum | Menunggu logic scoring |
| 12 | Score di bawah 40 | Buat data tidak cocok | Label Kurang Sesuai | Belum | Menunggu logic scoring |

## 6. Upload File

| No | Test Case | Langkah Testing | Hasil yang Diharapkan | Status | Catatan |
|---|---|---|---|---|---|
| 1 | Upload foto profil JPG | Upload file JPG | Berhasil | Belum | Menunggu Multer |
| 2 | Upload foto profil PNG | Upload file PNG | Berhasil | Belum | Menunggu Multer |
| 3 | Upload KTP PDF | Upload file PDF | Berhasil | Belum | Menunggu Multer |
| 4 | Upload KTM PDF | Upload file PDF | Berhasil | Belum | Menunggu Multer |
| 5 | Upload screenshot produk JPG | Upload screenshot JPG | Berhasil | Belum | Menunggu Multer |
| 6 | Upload file lebih dari 2 MB | Upload file besar | Ditolak | Belum | Menunggu validasi upload |
| 7 | Upload format tidak valid | Upload file selain format izin | Ditolak | Belum | Menunggu validasi upload |
| 8 | Path file tersimpan | Cek database | Path file tersimpan, bukan binary | Belum | Menunggu database model |

## 7. Responsivitas

| No | Halaman | Ukuran Layar | Hasil yang Diharapkan | Status | Catatan |
|---|---|---|---|---|---|
| 1 | Landing Page | Mobile | Tampilan tidak rusak | Belum | Landing masih default |
| 2 | Login | Mobile | Form rapi | Belum | Halaman belum ada |
| 3 | Register | Mobile | Form rapi | Belum | Halaman belum ada |
| 4 | Dashboard Mahasiswa | Mobile | Menu dan card rapi | Belum | Halaman belum ada |
| 5 | Dashboard UMKM | Mobile | Menu dan card rapi | Belum | Halaman belum ada |
| 6 | Dashboard Admin | Desktop | Tabel rapi | Belum | Halaman belum ada |
| 7 | Katalog Produk | Mobile | Card produk rapi | Belum | Halaman belum ada |
| 8 | Detail Produk | Mobile | Informasi tidak melebar | Belum | Halaman belum ada |
| 9 | Tabel Admin | Mobile/Desktop | Bisa scroll horizontal | Belum | Halaman belum ada |

## 8. Checklist Struktur dan Running Project

| No | Area | Test Case | Hasil yang Diharapkan | Hasil Cek Saat Ini | Status | Catatan |
|---|---|---|---|---|---|---|
| 1 | Backend | Folder backend tersedia | Folder backend ada | Ada | Selesai | Sesuai setup awal |
| 2 | Backend | File package.json tersedia | package.json ada | Ada | Selesai | Perlu cek dependency detail jika ada perubahan |
| 3 | Backend | Prisma tersedia | Folder prisma dan schema.prisma ada | Ada | Selesai | Perlu cek isi model |
| 4 | Backend | Server utama tersedia | src/server.js ada | Ada | Selesai | Server dasar tersedia |
| 5 | Backend | Backend bisa running | Backend berjalan tanpa error awal | Bisa running | Selesai | Running masih default awal |
| 6 | Backend | Folder config tersedia | src/config ada | Belum terlihat | Belum | Perlu dilengkapi backend |
| 7 | Backend | Folder controllers tersedia | src/controllers ada | Belum terlihat | Belum | Perlu dilengkapi backend |
| 8 | Backend | Folder middleware tersedia | src/middleware ada | Belum terlihat | Belum | Perlu dilengkapi backend |
| 9 | Backend | Folder routes tersedia | src/routes ada | Belum terlihat | Belum | Perlu dilengkapi backend |
| 10 | Backend | Folder services tersedia | src/services ada | Belum terlihat | Belum | Perlu dilengkapi backend |
| 11 | Backend | Folder utils tersedia | src/utils ada | Belum terlihat | Belum | Perlu dilengkapi backend |
| 12 | Backend | Folder uploads tersedia | src/uploads ada | Belum terlihat | Belum | Perlu untuk Multer |
| 13 | Backend | Seed admin tersedia | prisma/seed.js ada | Belum terlihat | Belum | Perlu untuk login admin |
| 14 | Frontend | Folder frontend tersedia | Folder frontend ada | Ada | Selesai | Sesuai setup awal |
| 15 | Frontend | Next config tersedia | next.config.ts ada | Ada | Selesai | Sesuai |
| 16 | Frontend | TypeScript config tersedia | tsconfig.json ada | Ada | Selesai | Sesuai |
| 17 | Frontend | App Router tersedia | app atau src/app ada | app ada | Selesai | App Router tersedia |
| 18 | Frontend | Frontend bisa running | Frontend berjalan tanpa error awal | Bisa running | Selesai | Running masih default awal |
| 19 | Frontend | Folder src tersedia | frontend/src ada | Belum terlihat | Belum | Dokumen final meminta src/app |
| 20 | Frontend | Folder components tersedia | components ada | Belum terlihat | Belum | Perlu untuk komponen UI |
| 21 | Frontend | Folder lib tersedia | lib ada | Belum terlihat | Belum | Perlu untuk API/helper |
| 22 | Frontend | Folder types tersedia | types ada | Belum terlihat | Belum | Perlu untuk TypeScript type |

## 9. Status Akhir Testing Saat Ini

| Area | Status Akhir |
|---|---|
| Backend running awal | Selesai |
| Frontend running awal | Selesai |
| Auth | Belum selesai |
| Mahasiswa | Belum selesai |
| UMKM | Belum selesai |
| Admin | Belum selesai |
| ReKarya Match | Belum selesai |
| Upload File | Belum selesai |
| Responsivitas | Belum selesai |
| Demo Final | Belum selesai |

## 10. Kesimpulan Testing Sementara

Backend dan frontend sudah berhasil running sebagai project default awal.

Namun testing fitur belum dapat dilakukan penuh karena halaman, endpoint, schema database, seed admin, dan fitur utama ReKarya belum lengkap.

Keputusan testing saat ini:

| Area | Keputusan |
|---|---|
| Backend | Boleh lanjut ke struktur folder, schema Prisma, seed admin, dan auth |
| Frontend | Boleh lanjut ke landing page, login, register, dan struktur src/app sesuai dokumen |
| Testing | Melanjutkan pencatatan checkpoint dan menunggu fitur siap dites |