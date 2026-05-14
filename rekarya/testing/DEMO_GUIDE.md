# Demo Guide - ReKarya

Dokumen ini digunakan sebagai panduan demo final aplikasi ReKarya.

## Tujuan Demo

Menunjukkan bahwa ReKarya dapat menghubungkan produk tugas akhir Mahasiswa dengan kebutuhan digital UMKM melalui katalog, verifikasi admin, ReKarya Match, request demo, kerja sama, penawaran, transaksi, pendampingan, ulasan, dan laporan sistem.

## Akun Demo

### Admin

Email: admin@rekarya.com  
Password: admin123  

### Mahasiswa

Email: mahasiswa@rekarya.com  
Password: mahasiswa123  

### UMKM

Email: umkm@rekarya.com  
Password: umkm123  

Catatan: Akun dapat disesuaikan dengan seed database backend dan hasil testing auth.

## Data Produk Demo

Nama produk: Sistem Katalog dan Pemesanan Online UMKM  
Kategori: Penjualan  
Masalah utama: Penjualan Belum Online  
Target UMKM: Kuliner  
Fitur utama: Katalog digital, Sistem pemesanan, Pencatatan transaksi  
Teknologi: Web App  
Estimasi durasi pelatihan: 7 hari  
Metode pendampingan: Online  
Harga: Rp 200.000  

## Data Kebutuhan UMKM Demo

Keyword bidang usaha: Kuliner  
Masalah utama: Penjualan Belum Online  
Detail masalah: Belum memiliki website atau toko digital, belum berjualan secara online, dan kesulitan mengelola pesanan pelanggan secara digital.  
Range harga: Rp 200.000 - Rp 250.000  
Estimasi durasi pelatihan: 7 hari  
Metode pendampingan: Online  

## Alur Demo Final

| No | Aktor | Aksi | Hasil yang Diharapkan | Status |
|---|---|---|---|---|
| 1 | Admin | Login | Admin masuk dashboard | Belum frontend |
| 2 | Mahasiswa | Register | Akun Mahasiswa berhasil dibuat | Selesai di API |
| 3 | Mahasiswa | Login | Login Mahasiswa berhasil | Selesai di API |
| 4 | Mahasiswa | Isi profil | Profil tersimpan | Belum |
| 5 | Mahasiswa | Upload produk tugas akhir | Produk status PENDING | Belum |
| 6 | Admin | Buka verifikasi produk | Produk pending tampil | Belum dites penuh |
| 7 | Admin | Approve produk | Produk status APPROVED | Belum |
| 8 | Public/Login | Buka katalog | Produk approved tampil | Belum |
| 9 | UMKM | Register | Akun UMKM berhasil dibuat | Selesai di API |
| 10 | UMKM | Login | Login UMKM berhasil | Selesai di API |
| 11 | UMKM | Isi profil usaha | Profil usaha tersimpan | Belum |
| 12 | UMKM | Buka Cari Solusi | Form cari solusi tampil | Belum |
| 13 | UMKM | Isi kebutuhan usaha | Rekomendasi tampil | Belum |
| 14 | UMKM | Lihat ReKarya Match | Match Score dan alasan tampil | Belum |
| 15 | UMKM | Buka detail produk | Detail produk tampil | Belum |
| 16 | UMKM | Request demo | Request demo terkirim | Belum |
| 17 | Mahasiswa | Setujui request demo | Status demo APPROVED | Belum |
| 18 | UMKM | Ajukan kerja sama | Pengajuan kerja sama terkirim | Belum |
| 19 | Mahasiswa | Setujui kerja sama | Status kerja sama APPROVED | Belum |
| 20 | Mahasiswa | Kirim penawaran | Penawaran terkirim | Belum |
| 21 | UMKM | Setujui penawaran | Status penawaran APPROVED | Belum |
| 22 | UMKM | Buat transaksi | Transaksi terbentuk | Belum |
| 23 | Admin | Monitoring transaksi | Transaksi tampil di admin | Belum |
| 24 | Mahasiswa | Update progress pendampingan | Progress tersimpan | Belum |
| 25 | UMKM | Tandai pendampingan selesai | Status pendampingan DONE | Belum |
| 26 | UMKM | Beri ulasan | Rating dan komentar tersimpan | Belum |
| 27 | Admin | Lihat laporan sistem | Laporan sistem tampil | Belum |

## Hal yang Harus Dicek Sebelum Presentasi

1. Backend berhasil berjalan.
2. Frontend berhasil berjalan.
3. Database PostgreSQL aktif.
4. Prisma migration sudah dijalankan.
5. Seed admin sudah dibuat.
6. Login semua role berhasil.
7. Upload file berjalan.
8. Produk approved tampil di katalog.
9. Produk pending dan rejected tidak tampil di katalog.
10. ReKarya Match menampilkan score.
11. Request demo berjalan.
12. Kerja sama berjalan.
13. Penawaran berjalan.
14. Transaksi berjalan.
15. Pendampingan berjalan.
16. Ulasan berjalan.
17. Dashboard admin menampilkan monitoring dan laporan.
18. Tampilan aman di mobile dan desktop.

## Catatan Kesiapan Demo Saat Ini

Tanggal pengecekan: 14 Mei 2026

| Area | Status | Catatan |
|---|---|---|
| Backend | Bisa running | Server backend bisa dijalankan |
| Frontend | Bisa running default awal | Frontend Next.js bisa dijalankan, tetapi masih default awal |
| Database | Siap untuk tahap awal | Prisma validate, generate, dan migration berhasil |
| Seed admin | Siap | Seed admin berhasil dan user admin ada di database |
| Auth API | Siap | Register, login, JWT, auth me, change password, dan role middleware berhasil |
| Auth Frontend | Belum siap demo | Halaman login/register frontend belum dites |
| Katalog | Belum siap demo | Halaman dan endpoint katalog belum dites penuh |
| ReKarya Match | Belum siap demo | Endpoint dan halaman belum terlihat |
| Dashboard role | Belum siap demo | Dashboard Mahasiswa, UMKM, Admin belum dites dari frontend |
| Admin dashboard endpoint | Belum tersedia | GET /api/admin/dashboard masih 404, perlu dikerjakan pada checkpoint admin |

Kesimpulan: backend, database, seed admin, dan auth API sudah siap untuk tahap awal. Namun demo final belum bisa dijalankan penuh sampai frontend auth, produk, admin verification, ReKarya Match, dan dashboard role selesai.

## Catatan Demo

Jika waktu presentasi terbatas, prioritaskan alur berikut:

1. Login Admin.
2. Login Mahasiswa.
3. Upload produk.
4. Approve produk oleh Admin.
5. Login UMKM.
6. Cari solusi.
7. Tampilkan ReKarya Match.
8. Request demo.
9. Ajukan kerja sama.
10. Tampilkan monitoring Admin.

## Risiko Demo

| Risiko | Solusi |
|---|---|
| Backend gagal jalan | Siapkan screenshot hasil testing |
| Database kosong | Jalankan migration dan seed sebelum demo |
| Auth gagal | Gunakan akun yang sudah dites di Postman |
| Upload file error | Siapkan file kecil JPG/PNG |
| Login frontend belum siap | Tunjukkan bukti API login dari Postman sementara |
| ReKarya Match tidak muncul | Pastikan produk sudah APPROVED |
| Endpoint admin dashboard belum ada | Gunakan endpoint admin lain yang sudah tersedia untuk validasi role sementara |
| Tampilan mobile rusak | Demo utama di desktop |