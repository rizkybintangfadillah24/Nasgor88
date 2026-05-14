
---

## Path: `rekarya/testing/DEMO_GUIDE.md`

```md
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

## Akun Testing Checkpoint

### Mahasiswa Checkpoint 6

Email: mahasiswa_cp6_fix@rekarya.com  
Password: mahasiswa123  

### UMKM Checkpoint 6

Email: umkm_cp6_fix@rekarya.com  
Password: umkm123  

### Mahasiswa Checkpoint 7

Email: mahasiswa_cp7@rekarya.com  
Password: mahasiswa123  

### UMKM Checkpoint 7

Email: umkm_cp7@rekarya.com  
Password: umkm123  

Catatan: Akun testing dapat berbeda sesuai data yang dibuat saat testing. Gunakan akun yang sudah berhasil login dari frontend atau Postman.

## Data Profil Mahasiswa Demo

Nama lengkap: Mahasiswa Checkpoint 7  
No kontak: 081234567890  
No rekening: 1234567890  
Kampus: Polinema  
Jurusan: Teknologi Informasi  
Program Studi: Teknologi Rekayasa Internet  
Status pendidikan: Masih Kuliah  
Bio: Mahasiswa testing ReKarya checkpoint 7  

File profile yang disiapkan:

| Field | Jenis File |
|---|---|
| photo | JPG/PNG |
| studentCard | JPG/PNG/PDF |
| identityCard | JPG/PNG/PDF |

## Data Profil UMKM Demo

Nama pemilik: Pemilik UMKM CP7  
Nama usaha: Warung Digital CP7  
Jenis usaha: Kuliner  
Deskripsi: UMKM kuliner yang ingin mulai menggunakan sistem digital.  
Alamat: Malang  
No kontak: 081298765432  
Masalah utama: Penjualan Belum Online  
Kebutuhan spesifik: Belum memiliki website, belum punya katalog online, dan masih mencatat pesanan secara manual.  
Budget minimum: 200000  
Budget maksimum: 250000  
Target durasi: 7 hari  
Preferensi pendampingan: Online  

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
| 1 | Admin | Login | Admin masuk dashboard | Selesai untuk login frontend |
| 2 | Mahasiswa | Register | Akun Mahasiswa berhasil dibuat | Selesai di API dan frontend |
| 3 | Mahasiswa | Login | Login Mahasiswa berhasil | Selesai di API dan frontend |
| 4 | Mahasiswa | Isi profil | Profil tersimpan | Selesai di API |
| 5 | Mahasiswa | Upload foto, KTM/surat aktif, dan KTP | File tersimpan dan path masuk database | Selesai di API |
| 6 | Mahasiswa | Upload produk tugas akhir | Produk status PENDING | Belum |
| 7 | Admin | Buka verifikasi produk | Produk pending tampil | Belum dites penuh |
| 8 | Admin | Approve produk | Produk status APPROVED | Belum |
| 9 | Public/Login | Buka katalog | Produk approved tampil | Belum |
| 10 | UMKM | Register | Akun UMKM berhasil dibuat | Selesai di API dan frontend |
| 11 | UMKM | Login | Login UMKM berhasil | Selesai di API dan frontend |
| 12 | UMKM | Isi profil usaha | Profil usaha tersimpan | Selesai di API |
| 13 | UMKM | Buka Cari Solusi | Form cari solusi tampil | Belum |
| 14 | UMKM | Isi kebutuhan usaha | Rekomendasi tampil | Belum |
| 15 | UMKM | Lihat ReKarya Match | Match Score dan alasan tampil | Belum |
| 16 | UMKM | Buka detail produk | Detail produk tampil | Belum |
| 17 | UMKM | Request demo | Request demo terkirim | Belum |
| 18 | Mahasiswa | Setujui request demo | Status demo APPROVED | Belum |
| 19 | UMKM | Ajukan kerja sama | Pengajuan kerja sama terkirim | Belum |
| 20 | Mahasiswa | Setujui kerja sama | Status kerja sama APPROVED | Belum |
| 21 | Mahasiswa | Kirim penawaran | Penawaran terkirim | Belum |
| 22 | UMKM | Setujui penawaran | Status penawaran APPROVED | Belum |
| 23 | UMKM | Buat transaksi | Transaksi terbentuk | Belum |
| 24 | Admin | Monitoring transaksi | Transaksi tampil di admin | Belum |
| 25 | Mahasiswa | Update progress pendampingan | Progress tersimpan | Belum |
| 26 | UMKM | Tandai pendampingan selesai | Status pendampingan DONE | Belum |
| 27 | UMKM | Beri ulasan | Rating dan komentar tersimpan | Belum |
| 28 | Admin | Lihat laporan sistem | Laporan sistem tampil | Belum |

## Hal yang Harus Dicek Sebelum Presentasi

1. Backend berhasil berjalan.
2. Frontend berhasil berjalan.
3. Database PostgreSQL aktif.
4. Prisma migration sudah dijalankan.
5. Seed admin sudah dibuat.
6. Login semua role berhasil.
7. Register Mahasiswa dan UMKM berhasil.
8. Profile Mahasiswa berhasil diisi.
9. Upload foto profil, KTM/surat aktif, dan KTP berhasil.
10. Profile UMKM berhasil diisi.
11. Upload file berjalan dan path file tersimpan di database.
12. Produk approved tampil di katalog.
13. Produk pending dan rejected tidak tampil di katalog.
14. ReKarya Match menampilkan score.
15. Request demo berjalan.
16. Kerja sama berjalan.
17. Penawaran berjalan.
18. Transaksi berjalan.
19. Pendampingan berjalan.
20. Ulasan berjalan.
21. Dashboard admin menampilkan monitoring dan laporan.
22. Tampilan aman di mobile dan desktop.

## Catatan Kesiapan Demo Saat Ini

Tanggal pengecekan: 14 Mei 2026

| Area | Status | Catatan |
|---|---|---|
| Backend | Bisa running | Server backend bisa dijalankan |
| Frontend | Bisa running | Frontend Next.js bisa dijalankan |
| Database | Siap untuk tahap awal | Prisma validate, generate, dan migration berhasil |
| Seed admin | Siap | Seed admin berhasil dan user admin ada di database |
| Auth API | Siap | Register, login, JWT, auth me, change password, dan role middleware berhasil |
| Auth Frontend | Siap | Login/register frontend berhasil terhubung ke backend |
| Landing Page | Siap | Landing page tampil dan responsif |
| Redirect Role | Siap | Mahasiswa, UMKM, dan Admin diarahkan sesuai role |
| Profile Mahasiswa API | Siap | GET dan PUT profile berhasil |
| Upload File Profile | Siap | Upload photo, studentCard, identityCard berhasil |
| Profile UMKM API | Siap | GET dan PUT profile UMKM berhasil |
| Role Protection Profile | Siap | Akses beda role ditolak |
| Katalog | Belum siap demo | Halaman dan endpoint katalog belum dites penuh |
| Produk | Belum siap demo | Upload produk dan verifikasi belum dites penuh |
| ReKarya Match | Belum siap demo | Endpoint dan halaman belum terlihat |
| Dashboard role | Belum siap demo penuh | Redirect sudah berjalan, isi dashboard belum dites penuh |
| Admin dashboard endpoint | Belum tersedia | GET /api/admin/dashboard masih 404, perlu dikerjakan pada checkpoint admin |

Kesimpulan: backend, database, seed admin, auth API, landing page, login frontend, register frontend, redirect role, profile Mahasiswa, upload file profile, dan profile UMKM sudah siap untuk tahap awal. Namun demo final belum bisa dijalankan penuh sampai produk, admin verification, ReKarya Match, dan dashboard role selesai.

## Catatan Demo

Jika waktu presentasi terbatas, prioritaskan alur berikut:

1. Login Admin.
2. Login Mahasiswa.
3. Isi profil Mahasiswa.
4. Upload file profil Mahasiswa.
5. Upload produk.
6. Approve produk oleh Admin.
7. Login UMKM.
8. Isi profil UMKM.
9. Cari solusi.
10. Tampilkan ReKarya Match.
11. Request demo.
12. Ajukan kerja sama.
13. Tampilkan monitoring Admin.

## Risiko Demo

| Risiko | Solusi |
|---|---|
| Backend gagal jalan | Siapkan screenshot hasil testing |
| Database kosong | Jalankan migration dan seed sebelum demo |
| Auth gagal | Gunakan akun yang sudah dites di Postman dan frontend |
| Register frontend gagal | Pastikan endpoint mengarah ke localhost:5000/api/auth/register dan payload mengirim confirmPassword |
| Login frontend gagal | Pastikan endpoint mengarah ke localhost:5000/api/auth/login dan password akun benar |
| Upload file error | Siapkan file kecil JPG/PNG/PDF sesuai field |
| File terlalu besar | Gunakan file di bawah 2 MB |
| ReKarya Match tidak muncul | Pastikan produk sudah APPROVED |
| Endpoint admin dashboard belum ada | Gunakan endpoint admin lain yang sudah tersedia untuk validasi role sementara |
| Tampilan mobile rusak | Demo utama di desktop |