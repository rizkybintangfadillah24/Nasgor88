# Testing Checklist - ReKarya

Checklist ini digunakan untuk memastikan seluruh fitur ReKarya berjalan sesuai dokumen final project.

## 1. Auth

| No | Test Case | Langkah Testing | Hasil yang Diharapkan | Status | Catatan |
|---|---|---|---|---|---|
| 1 | Register Mahasiswa | Kirim request register dengan role Mahasiswa | Akun Mahasiswa berhasil dibuat | Selesai | PASS |
| 2 | Register UMKM | Kirim request register dengan role UMKM | Akun UMKM berhasil dibuat | Selesai | PASS |
| 3 | Register Admin public | Kirim request register dengan role ADMIN | Sistem menolak role ADMIN | Selesai | PASS |
| 4 | Register email duplikat | Kirim register dengan email yang sudah dipakai | Sistem menolak register | Selesai | PASS |
| 5 | Login Mahasiswa | Login memakai akun Mahasiswa | Login berhasil dan token muncul | Selesai | PASS |
| 6 | Login UMKM | Login memakai akun UMKM | Login berhasil dan token muncul | Selesai | PASS |
| 7 | Login Admin | Login memakai akun Admin seed | Login berhasil dan token muncul | Selesai | PASS |
| 8 | Login password salah | Masukkan password salah | Sistem menampilkan pesan error | Selesai | PASS |
| 9 | Akses tanpa token | Buka endpoint /auth/me tanpa token | Sistem menolak akses | Selesai | PASS |
| 10 | Akses token valid | Buka endpoint /auth/me dengan token valid | Data user aktif tampil | Selesai | PASS |
| 11 | Akses token invalid | Buka endpoint /auth/me dengan token salah | Sistem menolak akses | Selesai | PASS |
| 12 | Change password | Ubah password dari akun login | Password berhasil berubah | Selesai | PASS |
| 13 | Login password lama | Login memakai password lama setelah change password | Sistem menolak login | Selesai | PASS |
| 14 | Login password baru | Login memakai password baru setelah change password | Login berhasil | Selesai | PASS |
| 15 | Middleware role Admin | Mahasiswa mencoba akses endpoint Admin | Sistem menolak akses | Selesai | PASS |
| 16 | Middleware role Mahasiswa | UMKM mencoba akses endpoint Mahasiswa | Sistem menolak akses | Selesai | PASS |
| 17 | Middleware role UMKM | Mahasiswa mencoba akses endpoint UMKM | Sistem menolak akses | Selesai | PASS |

## 2. Mahasiswa

| No | Test Case | Langkah Testing | Hasil yang Diharapkan | Status | Catatan |
|---|---|---|---|---|---|
| 1 | Dashboard Mahasiswa | Login sebagai Mahasiswa | Dashboard Mahasiswa tampil | Belum | Menunggu halaman frontend |
| 2 | Update profil | Isi data profil Mahasiswa | Data profil tersimpan | Belum | Masuk checkpoint profile |
| 3 | Upload foto profil | Upload file JPG/PNG | Foto tersimpan | Belum | Menunggu testing Multer |
| 4 | Upload KTM/surat aktif kuliah | Upload JPG/PNG/PDF | File tersimpan | Belum | Menunggu testing Multer |
| 5 | Upload KTP | Upload JPG/PNG/PDF | File tersimpan | Belum | Menunggu testing Multer |
| 6 | Upload produk | Isi form produk dan upload screenshot | Produk berhasil dibuat | Belum | Menunggu testing produk |
| 7 | Status produk baru | Cek produk setelah upload | Status produk PENDING | Belum | Database model sudah siap, menunggu testing endpoint produk |
| 8 | Edit produk sendiri | Edit data produk milik sendiri | Produk berhasil diperbarui | Belum | Menunggu testing endpoint |
| 9 | Hapus produk sendiri | Hapus produk milik sendiri | Produk berhasil dihapus | Belum | Menunggu testing endpoint |
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
| 1 | Dashboard UMKM | Login sebagai UMKM | Dashboard UMKM tampil | Belum | Menunggu halaman frontend |
| 2 | Update profil UMKM | Isi data usaha | Data usaha tersimpan | Belum | Masuk checkpoint profile |
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
| 1 | Login Admin API | Login sebagai Admin seed | Login berhasil dan token muncul | Selesai | PASS checkpoint 5 |
| 2 | Dashboard Admin | Login sebagai Admin dari frontend | Dashboard Admin tampil | Belum | Menunggu halaman frontend dan endpoint dashboard |
| 3 | Verifikasi akun | Buka akun pending | Akun bisa disetujui/ditolak | Belum | Menunggu endpoint |
| 4 | Lihat produk pending | Akses endpoint admin produk pending dengan token admin | Produk pending bisa diakses admin | Selesai untuk role middleware | PASS sebagai test role |
| 5 | Approve produk | Setujui produk Mahasiswa | Status menjadi APPROVED | Belum | Menunggu testing produk |
| 6 | Reject produk | Tolak produk Mahasiswa | Status menjadi REJECTED | Belum | Menunggu testing produk |
| 7 | Produk approved di katalog | Cek katalog setelah approve | Produk tampil di katalog | Belum | Menunggu katalog |
| 8 | Produk pending tidak tampil | Cek katalog sebelum approve | Produk tidak tampil | Belum | Menunggu katalog |
| 9 | Produk rejected tidak tampil | Cek katalog setelah reject | Produk tidak tampil | Belum | Menunggu katalog |
| 10 | Kelola kategori | Tambah/edit/hapus kategori | Kategori berhasil dikelola | Belum | Menunggu endpoint |
| 11 | Monitoring aktivitas | Buka menu aktivitas | Data aktivitas tampil | Belum | Menunggu endpoint |
| 12 | Monitoring transaksi | Buka menu transaksi | Data transaksi tampil | Belum | Menunggu endpoint |
| 13 | Update status pembayaran | Ubah status pembayaran | Status berhasil berubah | Belum | Menunggu endpoint |
| 14 | Monitoring pendampingan | Buka menu pendampingan | Data pendampingan tampil | Belum | Menunggu endpoint |
| 15 | Statistik masalah UMKM | Buka statistik masalah | Data statistik tampil | Belum | Menunggu endpoint |
| 16 | Laporan sistem | Buka laporan sistem | Ringkasan laporan tampil | Belum | Menunggu endpoint |

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
| 1 | Upload foto profil JPG | Upload file JPG | Berhasil | Belum | Menunggu testing Multer |
| 2 | Upload foto profil PNG | Upload file PNG | Berhasil | Belum | Menunggu testing Multer |
| 3 | Upload KTP PDF | Upload file PDF | Berhasil | Belum | Menunggu testing Multer |
| 4 | Upload KTM PDF | Upload file PDF | Berhasil | Belum | Menunggu testing Multer |
| 5 | Upload screenshot produk JPG | Upload screenshot JPG | Berhasil | Belum | Menunggu testing produk |
| 6 | Upload file lebih dari 2 MB | Upload file besar | Ditolak | Belum | Menunggu validasi upload |
| 7 | Upload format tidak valid | Upload file selain format izin | Ditolak | Belum | Menunggu validasi upload |
| 8 | Path file tersimpan | Cek database | Path file tersimpan, bukan binary | Belum | Menunggu endpoint upload |

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
| 3 | Backend | Prisma tersedia | Folder prisma dan schema.prisma ada | Ada | Selesai | Schema sudah bisa divalidasi |
| 4 | Backend | Server utama tersedia | src/server.js ada | Ada | Selesai | Server dasar tersedia |
| 5 | Backend | Backend bisa running | Backend berjalan tanpa error awal | Bisa running | Selesai | Running backend berhasil |
| 6 | Backend | Folder config tersedia | src/config ada | Ada | Selesai | Ada prisma config |
| 7 | Backend | Folder controllers tersedia | src/controllers ada | Ada | Selesai | Controller auth, admin, profile, product tersedia |
| 8 | Backend | Folder middleware tersedia | src/middleware ada | Ada | Selesai | Auth dan upload middleware tersedia |
| 9 | Backend | Folder routes tersedia | src/routes ada | Ada | Selesai | Routes auth, admin, profile, product tersedia |
| 10 | Backend | Folder services tersedia | src/services ada | Belum terlihat | Belum | Tidak menjadi blocker checkpoint 5 |
| 11 | Backend | Folder utils tersedia | src/utils ada | Ada | Selesai | Response utility tersedia |
| 12 | Backend | Folder uploads tersedia | src/uploads ada | Belum dites | Belum | Perlu untuk Multer |
| 13 | Backend | Seed admin tersedia | prisma/seed.js ada dan bisa dijalankan | Ada dan berhasil | Selesai | Admin seed berhasil |
| 14 | Frontend | Folder frontend tersedia | Folder frontend ada | Ada | Selesai | Sesuai setup awal |
| 15 | Frontend | Next config tersedia | next.config.ts ada | Ada | Selesai | Sesuai |
| 16 | Frontend | TypeScript config tersedia | tsconfig.json ada | Ada | Selesai | Sesuai |
| 17 | Frontend | App Router tersedia | app atau src/app ada | app ada | Selesai | App Router tersedia |
| 18 | Frontend | Frontend bisa running | Frontend berjalan tanpa error awal | Bisa running | Selesai | Running masih default awal |
| 19 | Frontend | Folder src tersedia | frontend/src ada | Belum terlihat | Belum | Dokumen final meminta src/app |
| 20 | Frontend | Folder components tersedia | components ada | Belum terlihat | Belum | Perlu untuk komponen UI |
| 21 | Frontend | Folder lib tersedia | lib ada | Belum terlihat | Belum | Perlu untuk API/helper |
| 22 | Frontend | Folder types tersedia | types ada | Belum terlihat | Belum | Perlu untuk TypeScript type |

## 9. Checklist Checkpoint 4 - Database Schema dan Admin Seed

| No | Area | Test Case | Hasil yang Diharapkan | Hasil Cek Saat Ini | Status | Catatan |
|---|---|---|---|---|---|---|
| 1 | Database | File .env lokal backend | DATABASE_URL tersedia dan terbaca | Berhasil | Selesai | .env tidak boleh di-push |
| 2 | Database | Prisma validate | Schema valid | Berhasil | Selesai | Error DATABASE_URL sudah selesai |
| 3 | Database | Prisma generate | Prisma Client berhasil dibuat | Berhasil | Selesai | Prisma Client generated |
| 4 | Database | Migration | Migration berhasil jalan | Berhasil | Selesai | Database berhasil sinkron |
| 5 | Database | Folder migrations | Folder migrations tersedia | Ada | Selesai | Hasil migration tersedia |
| 6 | Database | Seed admin | Seed admin berhasil dijalankan | Berhasil | Selesai | Akun admin dibuat |
| 7 | Database | Admin di database | User role ADMIN tersedia | Ada | Selesai | Dicek lewat Prisma Studio |
| 8 | Database | Password admin | Password tidak plain text | Hash | Selesai | Sesuai keamanan dasar |
| 9 | Database | Status checkpoint 4 | Semua target checkpoint 4 selesai | PASS | Selesai | Siap lanjut checkpoint 5 |

## 10. Checklist Checkpoint 5 - Authentication API

| No | Area | Test Case | Hasil yang Diharapkan | Hasil Cek Saat Ini | Status | Catatan |
|---|---|---|---|---|---|---|
| 1 | Auth API | Register Mahasiswa | Akun Mahasiswa berhasil dibuat | Berhasil | Selesai | PASS |
| 2 | Auth API | Register UMKM | Akun UMKM berhasil dibuat | Berhasil | Selesai | PASS |
| 3 | Auth API | Register Admin public | Sistem menolak role ADMIN | Ditolak | Selesai | PASS |
| 4 | Auth API | Register email duplikat | Sistem menolak email/username duplikat | Ditolak | Selesai | PASS |
| 5 | Auth API | Login Mahasiswa | Login berhasil dan token muncul | Berhasil | Selesai | PASS |
| 6 | Auth API | Login UMKM | Login berhasil dan token muncul | Berhasil | Selesai | PASS |
| 7 | Auth API | Login Admin | Login berhasil dan token muncul | Berhasil | Selesai | PASS |
| 8 | Auth API | Login password salah | Sistem menolak login | Ditolak | Selesai | PASS |
| 9 | Auth API | Auth me tanpa token | Sistem menolak akses | Ditolak | Selesai | PASS |
| 10 | Auth API | Auth me token valid | Data user aktif tampil | Berhasil | Selesai | PASS |
| 11 | Auth API | Auth me token invalid | Sistem menolak akses | Ditolak | Selesai | PASS |
| 12 | Auth API | Change password | Password berhasil diubah | Berhasil | Selesai | PASS |
| 13 | Auth API | Login password lama | Sistem menolak login dengan password lama | Ditolak | Selesai | PASS |
| 14 | Auth API | Login password baru | Sistem menerima login dengan password baru | Berhasil | Selesai | PASS |
| 15 | Middleware Role | Mahasiswa akses endpoint Admin | Sistem menolak akses | Ditolak | Selesai | PASS |
| 16 | Middleware Role | UMKM akses endpoint Mahasiswa | Sistem menolak akses | Ditolak | Selesai | PASS |
| 17 | Middleware Role | Mahasiswa akses endpoint UMKM | Sistem menolak akses | Ditolak | Selesai | PASS |
| 18 | Middleware Role | Admin akses endpoint Admin | Sistem menerima akses | Berhasil | Selesai | PASS |
| 19 | Route Check | GET /admin/dashboard | Endpoint belum tersedia | 404 Not Found | Dicatat | Finding, bukan blocker checkpoint 5 |
| 20 | Checkpoint 5 | Status akhir checkpoint | Semua target auth utama berhasil | PASS | Selesai | Siap lanjut checkpoint berikutnya |

## 11. Status Akhir Testing Saat Ini

| Area | Status Akhir |
|---|---|
| Backend running awal | Selesai |
| Frontend running awal | Selesai |
| Checkpoint 4 Database | PASS |
| Checkpoint 5 Authentication API | PASS |
| Auth | Selesai untuk backend API |
| Mahasiswa | Belum selesai penuh |
| UMKM | Belum selesai penuh |
| Admin | Belum selesai penuh |
| ReKarya Match | Belum selesai |
| Upload File | Belum selesai |
| Responsivitas | Belum selesai |
| Demo Final | Belum selesai penuh |

## 12. Kesimpulan Testing Sementara

Backend dan frontend sudah berhasil running sebagai project default awal.

Checkpoint 4 backend sudah dinyatakan PASS karena schema Prisma valid, Prisma generate berhasil, migration berhasil, seed admin berhasil, dan admin sudah ada di database.

Checkpoint 5 backend juga dinyatakan PASS karena register, login, JWT token, auth me, change password, dan middleware role berhasil dites sesuai hasil yang diharapkan.

Keputusan testing saat ini:

| Area | Keputusan |
|---|---|
| Backend | Boleh lanjut ke checkpoint berikutnya, yaitu profile/upload file atau product sesuai urutan tim |
| Frontend | Tetap menunggu landing page, login, register, dan struktur sesuai dokumen |
| Testing | Melanjutkan pencatatan checkpoint dan menunggu fitur berikutnya siap dites |