# Testing Checklist - ReKarya

Checklist ini digunakan untuk memastikan seluruh fitur ReKarya berjalan sesuai dokumen final project.

## 1. Auth

| No | Test Case | Langkah Testing | Hasil yang Diharapkan | Status | Catatan |
|---|---|---|---|---|---|
| 1 | Register Mahasiswa API | Kirim request register dengan role Mahasiswa | Akun Mahasiswa berhasil dibuat | Selesai | PASS checkpoint 5 |
| 2 | Register UMKM API | Kirim request register dengan role UMKM | Akun UMKM berhasil dibuat | Selesai | PASS checkpoint 5 |
| 3 | Register Admin public | Kirim request register dengan role ADMIN | Sistem menolak role ADMIN | Selesai | PASS checkpoint 5 |
| 4 | Register email duplikat | Kirim register dengan email yang sudah dipakai | Sistem menolak register | Selesai | PASS checkpoint 5 |
| 5 | Login Mahasiswa API | Login memakai akun Mahasiswa | Login berhasil dan token muncul | Selesai | PASS checkpoint 5 |
| 6 | Login UMKM API | Login memakai akun UMKM | Login berhasil dan token muncul | Selesai | PASS checkpoint 5 |
| 7 | Login Admin API | Login memakai akun Admin seed | Login berhasil dan token muncul | Selesai | PASS checkpoint 5 |
| 8 | Login password salah API | Masukkan password salah | Sistem menampilkan pesan error | Selesai | PASS checkpoint 5 |
| 9 | Akses tanpa token | Buka endpoint /auth/me tanpa token | Sistem menolak akses | Selesai | PASS checkpoint 5 |
| 10 | Akses token valid | Buka endpoint /auth/me dengan token valid | Data user aktif tampil | Selesai | PASS checkpoint 5 |
| 11 | Akses token invalid | Buka endpoint /auth/me dengan token salah | Sistem menolak akses | Selesai | PASS checkpoint 5 |
| 12 | Change password | Ubah password dari akun login | Password berhasil berubah | Selesai | PASS checkpoint 5 |
| 13 | Login password lama | Login memakai password lama setelah change password | Sistem menolak login | Selesai | PASS checkpoint 5 |
| 14 | Login password baru | Login memakai password baru setelah change password | Login berhasil | Selesai | PASS checkpoint 5 |
| 15 | Middleware role Admin | Mahasiswa mencoba akses endpoint Admin | Sistem menolak akses | Selesai | PASS checkpoint 5 |
| 16 | Middleware role Mahasiswa | UMKM mencoba akses endpoint Mahasiswa | Sistem menolak akses | Selesai | PASS checkpoint 5 dan 7 |
| 17 | Middleware role UMKM | Mahasiswa mencoba akses endpoint UMKM | Sistem menolak akses | Selesai | PASS checkpoint 5 dan 7 |
| 18 | Login Mahasiswa frontend | Login dari halaman /login | Login berhasil dan redirect sesuai role | Selesai | PASS checkpoint 6 |
| 19 | Login UMKM frontend | Login dari halaman /login | Login berhasil dan redirect sesuai role | Selesai | PASS checkpoint 6 |
| 20 | Login Admin frontend | Login dari halaman /login | Login berhasil dan redirect sesuai role | Selesai | PASS checkpoint 6 |
| 21 | Register Mahasiswa frontend | Register dari halaman /register | Register berhasil dan redirect ke login | Selesai | PASS checkpoint 6 |
| 22 | Register UMKM frontend | Register dari halaman /register | Register berhasil dan redirect ke login | Selesai | PASS checkpoint 6 |

## 2. Mahasiswa

| No | Test Case | Langkah Testing | Hasil yang Diharapkan | Status | Catatan |
|---|---|---|---|---|---|
| 1 | Dashboard Mahasiswa | Login sebagai Mahasiswa | Dashboard Mahasiswa tampil | Belum | Masuk checkpoint dashboard mahasiswa |
| 2 | GET profil Mahasiswa | GET /mahasiswa/profile dengan token Mahasiswa | Data profil Mahasiswa tampil | Selesai | PASS checkpoint 7 |
| 3 | Update profil Mahasiswa tanpa file | PUT /mahasiswa/profile form-data text | Data profil tersimpan | Selesai | PASS checkpoint 7 |
| 4 | Upload foto profil | Upload file JPG/PNG pada field photo | Foto tersimpan | Selesai | PASS checkpoint 7 |
| 5 | Upload KTM/surat aktif kuliah | Upload JPG/PNG/PDF pada field studentCard | File tersimpan | Selesai | PASS checkpoint 7 |
| 6 | Upload KTP | Upload JPG/PNG/PDF pada field identityCard | File tersimpan | Selesai | PASS checkpoint 7 |
| 7 | Path file profil | Cek database MahasiswaProfile | Path file tersimpan, bukan binary | Selesai | PASS checkpoint 7 |
| 8 | Upload produk | Isi form produk dan upload screenshot | Produk berhasil dibuat | Belum | Menunggu testing produk |
| 9 | Status produk baru | Cek produk setelah upload | Status produk PENDING | Belum | Database model sudah siap, menunggu testing endpoint produk |
| 10 | Edit produk sendiri | Edit data produk milik sendiri | Produk berhasil diperbarui | Belum | Menunggu testing endpoint |
| 11 | Hapus produk sendiri | Hapus produk milik sendiri | Produk berhasil dihapus | Belum | Menunggu testing endpoint |
| 12 | Lihat kerja sama | Buka menu kerja sama | List kerja sama tampil | Belum | Menunggu endpoint dan halaman |
| 13 | Setujui kerja sama | Klik setujui pada pengajuan | Status menjadi APPROVED | Belum | Menunggu endpoint |
| 14 | Tolak kerja sama | Klik tolak pada pengajuan | Status menjadi REJECTED | Belum | Menunggu endpoint |
| 15 | Kirim penawaran | Buat penawaran untuk UMKM | Penawaran berhasil dikirim | Belum | Menunggu endpoint |
| 16 | Lihat transaksi | Buka menu transaksi | Data transaksi tampil | Belum | Menunggu endpoint |
| 17 | Update pendampingan | Isi progress dan catatan | Progress tersimpan | Belum | Menunggu endpoint |
| 18 | Lihat ulasan | Buka menu ulasan | Rating dan komentar tampil | Belum | Menunggu endpoint |

## 3. UMKM

| No | Test Case | Langkah Testing | Hasil yang Diharapkan | Status | Catatan |
|---|---|---|---|---|---|
| 1 | Dashboard UMKM | Login sebagai UMKM | Dashboard UMKM tampil | Belum | Masuk checkpoint dashboard UMKM |
| 2 | GET profil UMKM | GET /umkm/profile dengan token UMKM | Data profil UMKM tampil | Selesai | PASS checkpoint 7 |
| 3 | Update profil UMKM | PUT /umkm/profile dengan JSON profile usaha | Data usaha tersimpan | Selesai | PASS checkpoint 7 |
| 4 | Role protection UMKM | Mahasiswa akses /umkm/profile | Ditolak | Selesai | PASS checkpoint 7 |
| 5 | Cari solusi | Isi form cari solusi | List rekomendasi tampil | Belum | Menunggu ReKarya Match |
| 6 | ReKarya Match score | Cek hasil rekomendasi | Match Score tampil | Belum | Menunggu endpoint |
| 7 | Label kecocokan | Cek label rekomendasi | Label sesuai score | Belum | Menunggu endpoint |
| 8 | Alasan rekomendasi | Cek detail rekomendasi | Alasan rekomendasi tampil | Belum | Menunggu endpoint |
| 9 | Detail produk | Klik detail produk | Detail produk tampil | Belum | Menunggu halaman dan endpoint |
| 10 | Request demo | Kirim request demo | Request berhasil dibuat | Belum | Menunggu endpoint |
| 11 | Ajukan kerja sama | Klik ajukan kerja sama | Pengajuan berhasil dibuat | Belum | Menunggu endpoint |
| 12 | Lihat status kerja sama | Buka menu kerja sama | Status kerja sama tampil | Belum | Menunggu halaman dan endpoint |
| 13 | Lihat penawaran | Buka menu penawaran | Penawaran dari Mahasiswa tampil | Belum | Menunggu halaman dan endpoint |
| 14 | Setujui penawaran | Klik setujui penawaran | Status menjadi APPROVED | Belum | Menunggu endpoint |
| 15 | Tolak penawaran | Klik tolak penawaran | Status menjadi REJECTED | Belum | Menunggu endpoint |
| 16 | Lihat transaksi | Buka menu transaksi | Data transaksi tampil | Belum | Menunggu endpoint |
| 17 | Lihat pendampingan | Buka menu pendampingan | Progress pendampingan tampil | Belum | Menunggu endpoint |
| 18 | Tandai selesai | Klik tandai selesai | Status pendampingan DONE | Belum | Menunggu endpoint |
| 19 | Kirim ulasan | Isi rating dan komentar | Ulasan berhasil tersimpan | Belum | Menunggu endpoint |

## 4. Admin

| No | Test Case | Langkah Testing | Hasil yang Diharapkan | Status | Catatan |
|---|---|---|---|---|---|
| 1 | Login Admin API | Login sebagai Admin seed | Login berhasil dan token muncul | Selesai | PASS checkpoint 5 |
| 2 | Login Admin frontend | Login dari halaman /login | Redirect ke /admin/dashboard | Selesai | PASS checkpoint 6 |
| 3 | Dashboard Admin | Login sebagai Admin dari frontend | Dashboard Admin tampil | Belum | Menunggu dashboard admin penuh |
| 4 | Verifikasi akun | Buka akun pending | Akun bisa disetujui/ditolak | Belum | Menunggu endpoint |
| 5 | Lihat produk pending | Akses endpoint admin produk pending dengan token admin | Produk pending bisa diakses admin | Selesai untuk role middleware | PASS sebagai test role |
| 6 | Approve produk | Setujui produk Mahasiswa | Status menjadi APPROVED | Belum | Menunggu testing produk |
| 7 | Reject produk | Tolak produk Mahasiswa | Status menjadi REJECTED | Belum | Menunggu testing produk |
| 8 | Produk approved di katalog | Cek katalog setelah approve | Produk tampil di katalog | Belum | Menunggu katalog |
| 9 | Produk pending tidak tampil | Cek katalog sebelum approve | Produk tidak tampil | Belum | Menunggu katalog |
| 10 | Produk rejected tidak tampil | Cek katalog setelah reject | Produk tidak tampil | Belum | Menunggu katalog |
| 11 | Kelola kategori | Tambah/edit/hapus kategori | Kategori berhasil dikelola | Belum | Menunggu endpoint |
| 12 | Monitoring aktivitas | Buka menu aktivitas | Data aktivitas tampil | Belum | Menunggu endpoint |
| 13 | Monitoring transaksi | Buka menu transaksi | Data transaksi tampil | Belum | Menunggu endpoint |
| 14 | Update status pembayaran | Ubah status pembayaran | Status berhasil berubah | Belum | Menunggu endpoint |
| 15 | Monitoring pendampingan | Buka menu pendampingan | Data pendampingan tampil | Belum | Menunggu endpoint |
| 16 | Statistik masalah UMKM | Buka statistik masalah | Data statistik tampil | Belum | Menunggu endpoint |
| 17 | Laporan sistem | Buka laporan sistem | Ringkasan laporan tampil | Belum | Menunggu endpoint |

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
| 1 | Upload foto profil JPG | Upload file JPG pada field photo | Berhasil | Selesai | PASS checkpoint 7 |
| 2 | Upload foto profil PNG | Upload file PNG pada field photo | Berhasil | Selesai | PASS checkpoint 7 jika file PNG sudah dicoba |
| 3 | Upload KTP PDF/JPG/PNG | Upload file pada field identityCard | Berhasil | Selesai | PASS checkpoint 7 |
| 4 | Upload KTM PDF/JPG/PNG | Upload file pada field studentCard | Berhasil | Selesai | PASS checkpoint 7 |
| 5 | Path file tersimpan | Cek database MahasiswaProfile | Path file tersimpan, bukan binary | Selesai | PASS checkpoint 7 |
| 6 | File tersimpan di folder upload | Cek folder upload backend | File tersimpan | Selesai | PASS checkpoint 7 |
| 7 | Upload screenshot produk JPG | Upload screenshot JPG | Belum | Menunggu testing produk |
| 8 | Upload file lebih dari 2 MB | Upload file besar | Belum | Perlu dites jika validasi ukuran sudah tersedia |
| 9 | Upload format tidak valid | Upload file selain format izin | Belum | Perlu dites jika validasi format sudah tersedia |

## 7. Responsivitas

| No | Halaman | Ukuran Layar | Hasil yang Diharapkan | Status | Catatan |
|---|---|---|---|---|---|
| 1 | Landing Page | Mobile | Tampilan tidak rusak | Selesai | PASS checkpoint 6 |
| 2 | Login | Mobile | Form rapi | Selesai | PASS checkpoint 6 |
| 3 | Register | Mobile | Form rapi | Selesai | PASS checkpoint 6 |
| 4 | Dashboard Mahasiswa | Mobile | Menu dan card rapi | Belum | Menunggu dashboard mahasiswa |
| 5 | Dashboard UMKM | Mobile | Menu dan card rapi | Belum | Menunggu dashboard UMKM |
| 6 | Dashboard Admin | Desktop | Tabel rapi | Belum | Menunggu dashboard admin |
| 7 | Katalog Produk | Mobile | Card produk rapi | Belum | Menunggu katalog |
| 8 | Detail Produk | Mobile | Informasi tidak melebar | Belum | Menunggu detail produk |
| 9 | Tabel Admin | Mobile/Desktop | Bisa scroll horizontal | Belum | Menunggu halaman admin |

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
| 10 | Backend | Folder services tersedia | src/services ada | Belum terlihat | Belum | Tidak menjadi blocker checkpoint 5, 6, dan 7 |
| 11 | Backend | Folder utils tersedia | src/utils ada | Ada | Selesai | Response utility tersedia |
| 12 | Backend | Folder uploads tersedia | Folder upload ada dan digunakan | Ada/berjalan | Selesai | PASS checkpoint 7 |
| 13 | Backend | Seed admin tersedia | prisma/seed.js ada dan bisa dijalankan | Ada dan berhasil | Selesai | Admin seed berhasil |
| 14 | Frontend | Folder frontend tersedia | Folder frontend ada | Ada | Selesai | Sesuai setup awal |
| 15 | Frontend | Next config tersedia | next.config.ts ada | Ada | Selesai | Sesuai |
| 16 | Frontend | TypeScript config tersedia | tsconfig.json ada | Ada | Selesai | Sesuai |
| 17 | Frontend | App Router tersedia | app atau src/app ada | app ada | Selesai | App Router tersedia |
| 18 | Frontend | Frontend bisa running | Frontend berjalan tanpa error awal | Bisa running | Selesai | Running frontend berhasil |
| 19 | Frontend | Landing page tersedia | Halaman / tampil sesuai ReKarya | Ada dan dites | Selesai | PASS checkpoint 6 |
| 20 | Frontend | Login page tersedia | Halaman /login tersedia | Ada dan dites | Selesai | PASS checkpoint 6 |
| 21 | Frontend | Register page tersedia | Halaman /register tersedia | Ada dan dites | Selesai | PASS checkpoint 6 |
| 22 | Frontend | Folder src tersedia | frontend/src ada | Belum terlihat | Belum | Dokumen final meminta src/app |
| 23 | Frontend | Folder components tersedia | components ada | Belum terlihat | Belum | Perlu untuk komponen UI |
| 24 | Frontend | Folder lib tersedia | lib ada | Ada jika api helper digunakan | Perlu dicek | Digunakan untuk base API frontend |
| 25 | Frontend | Folder types tersedia | types ada | Belum terlihat | Belum | Perlu untuk TypeScript type |

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
| 20 | Checkpoint 5 | Status akhir checkpoint | Semua target auth utama berhasil | PASS | Selesai | Siap lanjut checkpoint 6 |

## 11. Checklist Checkpoint 6 - Landing dan Auth Pages

| No | Area | Test Case | Hasil yang Diharapkan | Hasil Cek Saat Ini | Status | Catatan |
|---|---|---|---|---|---|---|
| 1 | Frontend | Frontend running | Frontend berjalan tanpa error | Berhasil | Selesai | PASS |
| 2 | Landing | Halaman / | Landing page tampil | Berhasil | Selesai | PASS |
| 3 | Landing | Navbar | Logo dan menu tampil | Berhasil | Selesai | PASS |
| 4 | Landing | Hero section | Judul, deskripsi, dan tombol tampil | Berhasil | Selesai | PASS |
| 5 | Landing | Section produk | Card/list produk tampil | Berhasil | Selesai | PASS |
| 6 | Landing | Tren UMKM | Tren masalah UMKM tampil | Berhasil | Selesai | PASS |
| 7 | Landing | Alur penggunaan | Alur penggunaan tampil | Berhasil | Selesai | PASS |
| 8 | Landing | Manfaat | Manfaat Mahasiswa dan UMKM tampil | Berhasil | Selesai | PASS |
| 9 | Landing | Footer | Footer tampil | Berhasil | Selesai | PASS |
| 10 | Auth Frontend | Halaman /login | Form login tampil | Berhasil | Selesai | PASS |
| 11 | Auth Frontend | Halaman /register | Form register tampil | Berhasil | Selesai | PASS |
| 12 | Auth Frontend | Endpoint login | Mengarah ke http://localhost:5000/api/auth/login | Berhasil | Selesai | Sebelumnya salah ke localhost:3000, sudah diperbaiki |
| 13 | Auth Frontend | Endpoint register | Mengarah ke http://localhost:5000/api/auth/register | Berhasil | Selesai | Sebelumnya salah ke localhost:3000, sudah diperbaiki |
| 14 | Auth Frontend | Payload register | Mengirim username, email, password, confirmPassword, role | Berhasil | Selesai | Sebelumnya confirmPassword belum terkirim, sudah diperbaiki |
| 15 | Auth Frontend | Register Mahasiswa | Akun Mahasiswa berhasil dibuat dari frontend | Berhasil | Selesai | PASS |
| 16 | Auth Frontend | Register UMKM | Akun UMKM berhasil dibuat dari frontend | Berhasil | Selesai | PASS |
| 17 | Auth Frontend | Login Mahasiswa | Login berhasil dari frontend | Berhasil | Selesai | PASS |
| 18 | Auth Frontend | Login UMKM | Login berhasil dari frontend | Berhasil | Selesai | PASS |
| 19 | Auth Frontend | Login Admin | Login berhasil dari frontend | Berhasil | Selesai | PASS |
| 20 | Auth Frontend | Redirect Mahasiswa | Mengarah ke /mahasiswa/dashboard | Berhasil | Selesai | PASS |
| 21 | Auth Frontend | Redirect UMKM | Mengarah ke /umkm/dashboard | Berhasil | Selesai | PASS |
| 22 | Auth Frontend | Redirect Admin | Mengarah ke /admin/dashboard | Berhasil | Selesai | PASS |
| 23 | Auth Frontend | Login error handling | Password salah ditolak dan pesan error tampil | Berhasil | Selesai | PASS |
| 24 | Auth Frontend | Register validation | Field kosong/password beda/duplikat ditangani | Berhasil | Selesai | PASS |
| 25 | Auth Frontend | Token tersimpan | Token tersimpan setelah login | Berhasil | Selesai | PASS |
| 26 | Responsif | Landing mobile/tablet/desktop | Tampilan aman | Berhasil | Selesai | PASS |
| 27 | Responsif | Login mobile/tablet/desktop | Tampilan aman | Berhasil | Selesai | PASS |
| 28 | Responsif | Register mobile/tablet/desktop | Tampilan aman | Berhasil | Selesai | PASS |
| 29 | Checkpoint 6 | Status akhir checkpoint | Semua target checkpoint 6 selesai | PASS | Selesai | Siap lanjut checkpoint berikutnya |

## 12. Checklist Checkpoint 7 - Profile dan Upload File API

| No | Area | Test Case | Hasil yang Diharapkan | Hasil Cek Saat Ini | Status | Catatan |
|---|---|---|---|---|---|---|
| 1 | Auth | Login Mahasiswa CP7 | Token Mahasiswa berhasil didapatkan | Berhasil | Selesai | PASS |
| 2 | Auth | Login UMKM CP7 | Token UMKM berhasil didapatkan | Berhasil | Selesai | PASS |
| 3 | Mahasiswa Profile | GET /mahasiswa/profile | Data profil Mahasiswa tampil | Berhasil | Selesai | PASS |
| 4 | Mahasiswa Profile | PUT /mahasiswa/profile tanpa file | Data profil Mahasiswa tersimpan | Berhasil | Selesai | PASS |
| 5 | Mahasiswa Profile | PUT /mahasiswa/profile dengan file | Data profil dan file tersimpan | Berhasil | Selesai | PASS |
| 6 | Upload File | Upload photo | File photo tersimpan | Berhasil | Selesai | PASS |
| 7 | Upload File | Upload studentCard | File studentCard tersimpan | Berhasil | Selesai | PASS |
| 8 | Upload File | Upload identityCard | File identityCard tersimpan | Berhasil | Selesai | PASS |
| 9 | Upload File | Cek folder upload | File hasil upload tersedia | Berhasil | Selesai | PASS |
| 10 | Database | Cek path file di MahasiswaProfile | Path file tersimpan, bukan binary | Berhasil | Selesai | PASS |
| 11 | Role Protection | UMKM akses /mahasiswa/profile | Sistem menolak akses | Ditolak | Selesai | PASS |
| 12 | UMKM Profile | GET /umkm/profile | Data profil UMKM tampil | Berhasil | Selesai | PASS |
| 13 | UMKM Profile | PUT /umkm/profile | Data usaha UMKM tersimpan | Berhasil | Selesai | PASS |
| 14 | Role Protection | Mahasiswa akses /umkm/profile | Sistem menolak akses | Ditolak | Selesai | PASS |
| 15 | Auth Protection | Profile endpoint tanpa token | Sistem menolak akses | Ditolak | Selesai | PASS |
| 16 | Checkpoint 7 | Status akhir checkpoint | Semua target checkpoint 7 selesai | PASS | Selesai | Siap lanjut checkpoint berikutnya |

## 13. Status Akhir Testing Saat Ini

| Area | Status Akhir |
|---|---|
| Backend running awal | Selesai |
| Frontend running awal | Selesai |
| Checkpoint 4 Database | PASS |
| Checkpoint 5 Authentication API | PASS |
| Checkpoint 6 Landing dan Auth Pages | PASS |
| Checkpoint 7 Profile dan Upload File API | PASS |
| Auth | Selesai untuk backend API dan frontend auth |
| Profile Mahasiswa | Selesai untuk backend API |
| Upload File Profile | Selesai untuk backend API |
| Profile UMKM | Selesai untuk backend API |
| Mahasiswa dashboard | Belum selesai penuh |
| UMKM dashboard | Belum selesai penuh |
| Admin dashboard | Belum selesai penuh |
| Produk | Belum selesai |
| ReKarya Match | Belum selesai |
| Responsivitas landing/auth | Selesai |
| Demo Final | Belum selesai penuh |

## 14. Kesimpulan Testing Sementara

Backend dan frontend sudah berhasil running.

Checkpoint 4 backend sudah dinyatakan PASS karena schema Prisma valid, Prisma generate berhasil, migration berhasil, seed admin berhasil, dan admin sudah ada di database.

Checkpoint 5 backend dinyatakan PASS karena register, login, JWT token, auth me, change password, dan middleware role berhasil dites sesuai hasil yang diharapkan.

Checkpoint 6 frontend dinyatakan PASS karena landing page, login page, register page, integrasi backend auth, redirect role, validasi form, token, dan responsivitas halaman awal berhasil dites.

Checkpoint 7 backend dinyatakan PASS karena profile Mahasiswa, upload file Mahasiswa, profile UMKM, penyimpanan path file, role protection, dan auth protection berhasil dites.

Keputusan testing saat ini:

| Area | Keputusan |
|---|---|
| Backend | Boleh lanjut ke checkpoint product dan verification API |
| Frontend | Boleh lanjut ke dashboard Mahasiswa atau halaman sesuai checkpoint berikutnya |
| Testing | Melanjutkan pencatatan checkpoint dan menunggu fitur berikutnya siap dites |