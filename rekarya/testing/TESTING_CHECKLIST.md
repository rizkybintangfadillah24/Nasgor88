# Testing Checklist - ReKarya

Checklist ini digunakan untuk memastikan seluruh fitur ReKarya berjalan sesuai dokumen final project.

## 1. Auth

| No | Test Case | Langkah Testing | Hasil yang Diharapkan | Status | Catatan |
|---|---|---|---|---|---|
| 1 | Register Mahasiswa | Isi form register dengan role Mahasiswa | Akun Mahasiswa berhasil dibuat | Belum |  |
| 2 | Register UMKM | Isi form register dengan role UMKM | Akun UMKM berhasil dibuat | Belum |  |
| 3 | Login Mahasiswa | Login memakai akun Mahasiswa | Redirect ke dashboard Mahasiswa | Belum |  |
| 4 | Login UMKM | Login memakai akun UMKM | Redirect ke dashboard UMKM | Belum |  |
| 5 | Login Admin | Login memakai akun Admin | Redirect ke dashboard Admin | Belum |  |
| 6 | Login password salah | Masukkan password salah | Sistem menampilkan pesan error | Belum |  |
| 7 | Akses tanpa token | Buka dashboard tanpa login | Sistem menolak akses | Belum |  |
| 8 | Akses beda role | Mahasiswa membuka halaman Admin | Sistem menolak akses | Belum |  |
| 9 | Endpoint auth me | Panggil endpoint /auth/me dengan token valid | Data user aktif tampil | Belum |  |
| 10 | Change password | Ubah password dari akun login | Password berhasil berubah | Belum |  |

## 2. Mahasiswa

| No | Test Case | Langkah Testing | Hasil yang Diharapkan | Status | Catatan |
|---|---|---|---|---|---|
| 1 | Dashboard Mahasiswa | Login sebagai Mahasiswa | Dashboard Mahasiswa tampil | Belum |  |
| 2 | Update profil | Isi data profil Mahasiswa | Data profil tersimpan | Belum |  |
| 3 | Upload foto profil | Upload file JPG/PNG | Foto tersimpan | Belum |  |
| 4 | Upload KTM/surat aktif kuliah | Upload JPG/PNG/PDF | File tersimpan | Belum |  |
| 5 | Upload KTP | Upload JPG/PNG/PDF | File tersimpan | Belum |  |
| 6 | Upload produk | Isi form produk dan upload screenshot | Produk berhasil dibuat | Belum |  |
| 7 | Status produk baru | Cek produk setelah upload | Status produk PENDING | Belum |  |
| 8 | Edit produk sendiri | Edit data produk milik sendiri | Produk berhasil diperbarui | Belum |  |
| 9 | Hapus produk sendiri | Hapus produk milik sendiri | Produk berhasil dihapus | Belum |  |
| 10 | Lihat kerja sama | Buka menu kerja sama | List kerja sama tampil | Belum |  |
| 11 | Setujui kerja sama | Klik setujui pada pengajuan | Status menjadi APPROVED | Belum |  |
| 12 | Tolak kerja sama | Klik tolak pada pengajuan | Status menjadi REJECTED | Belum |  |
| 13 | Kirim penawaran | Buat penawaran untuk UMKM | Penawaran berhasil dikirim | Belum |  |
| 14 | Lihat transaksi | Buka menu transaksi | Data transaksi tampil | Belum |  |
| 15 | Update pendampingan | Isi progress dan catatan | Progress tersimpan | Belum |  |
| 16 | Lihat ulasan | Buka menu ulasan | Rating dan komentar tampil | Belum |  |

## 3. UMKM

| No | Test Case | Langkah Testing | Hasil yang Diharapkan | Status | Catatan |
|---|---|---|---|---|---|
| 1 | Dashboard UMKM | Login sebagai UMKM | Dashboard UMKM tampil | Belum |  |
| 2 | Update profil UMKM | Isi data usaha | Data usaha tersimpan | Belum |  |
| 3 | Cari solusi | Isi form cari solusi | List rekomendasi tampil | Belum |  |
| 4 | ReKarya Match score | Cek hasil rekomendasi | Match Score tampil | Belum |  |
| 5 | Label kecocokan | Cek label rekomendasi | Label sesuai score | Belum |  |
| 6 | Alasan rekomendasi | Cek detail rekomendasi | Alasan rekomendasi tampil | Belum |  |
| 7 | Detail produk | Klik detail produk | Detail produk tampil | Belum |  |
| 8 | Request demo | Kirim request demo | Request berhasil dibuat | Belum |  |
| 9 | Ajukan kerja sama | Klik ajukan kerja sama | Pengajuan berhasil dibuat | Belum |  |
| 10 | Lihat status kerja sama | Buka menu kerja sama | Status kerja sama tampil | Belum |  |
| 11 | Lihat penawaran | Buka menu penawaran | Penawaran dari Mahasiswa tampil | Belum |  |
| 12 | Setujui penawaran | Klik setujui penawaran | Status menjadi APPROVED | Belum |  |
| 13 | Tolak penawaran | Klik tolak penawaran | Status menjadi REJECTED | Belum |  |
| 14 | Lihat transaksi | Buka menu transaksi | Data transaksi tampil | Belum |  |
| 15 | Lihat pendampingan | Buka menu pendampingan | Progress pendampingan tampil | Belum |  |
| 16 | Tandai selesai | Klik tandai selesai | Status pendampingan DONE | Belum |  |
| 17 | Kirim ulasan | Isi rating dan komentar | Ulasan berhasil tersimpan | Belum |  |

## 4. Admin

| No | Test Case | Langkah Testing | Hasil yang Diharapkan | Status | Catatan |
|---|---|---|---|---|---|
| 1 | Dashboard Admin | Login sebagai Admin | Dashboard Admin tampil | Belum |  |
| 2 | Verifikasi akun | Buka akun pending | Akun bisa disetujui/ditolak | Belum |  |
| 3 | Lihat produk pending | Buka menu produk pending | Produk pending tampil | Belum |  |
| 4 | Approve produk | Setujui produk Mahasiswa | Status menjadi APPROVED | Belum |  |
| 5 | Reject produk | Tolak produk Mahasiswa | Status menjadi REJECTED | Belum |  |
| 6 | Produk approved di katalog | Cek katalog setelah approve | Produk tampil di katalog | Belum |  |
| 7 | Produk pending tidak tampil | Cek katalog sebelum approve | Produk tidak tampil | Belum |  |
| 8 | Produk rejected tidak tampil | Cek katalog setelah reject | Produk tidak tampil | Belum |  |
| 9 | Kelola kategori | Tambah/edit/hapus kategori | Kategori berhasil dikelola | Belum |  |
| 10 | Monitoring aktivitas | Buka menu aktivitas | Data aktivitas tampil | Belum |  |
| 11 | Monitoring transaksi | Buka menu transaksi | Data transaksi tampil | Belum |  |
| 12 | Update status pembayaran | Ubah status pembayaran | Status berhasil berubah | Belum |  |
| 13 | Monitoring pendampingan | Buka menu pendampingan | Data pendampingan tampil | Belum |  |
| 14 | Statistik masalah UMKM | Buka statistik masalah | Data statistik tampil | Belum |  |
| 15 | Laporan sistem | Buka laporan sistem | Ringkasan laporan tampil | Belum |  |

## 5. ReKarya Match

| No | Test Case | Langkah Testing | Hasil yang Diharapkan | Status | Catatan |
|---|---|---|---|---|---|
| 1 | Produk approved masuk rekomendasi | Cari solusi dengan produk approved | Produk tampil di rekomendasi | Belum |  |
| 2 | Produk pending tidak masuk rekomendasi | Cari solusi saat produk masih pending | Produk tidak tampil | Belum |  |
| 3 | Produk rejected tidak masuk rekomendasi | Cari solusi dengan produk rejected | Produk tidak tampil | Belum |  |
| 4 | Kecocokan masalah utama | Masukkan masalah yang sama dengan produk | Score bertambah besar | Belum |  |
| 5 | Kecocokan fitur | Masukkan fitur yang cocok | Score bertambah | Belum |  |
| 6 | Kesesuaian budget | Masukkan budget sesuai harga | Score bertambah | Belum |  |
| 7 | Kecocokan durasi | Masukkan durasi sesuai produk | Score bertambah | Belum |  |
| 8 | Kecocokan pendampingan | Masukkan metode sesuai produk | Score bertambah | Belum |  |
| 9 | Score 80-100 | Buat data yang sangat cocok | Label Sangat Cocok | Belum |  |
| 10 | Score 60-79 | Buat data cukup cocok | Label Cocok | Belum |  |
| 11 | Score 40-59 | Buat data sebagian cocok | Label Cukup Sesuai | Belum |  |
| 12 | Score di bawah 40 | Buat data tidak cocok | Label Kurang Sesuai | Belum |  |

## 6. Upload File

| No | Test Case | Langkah Testing | Hasil yang Diharapkan | Status | Catatan |
|---|---|---|---|---|---|
| 1 | Upload foto profil JPG | Upload file JPG | Berhasil | Belum |  |
| 2 | Upload foto profil PNG | Upload file PNG | Berhasil | Belum |  |
| 3 | Upload KTP PDF | Upload file PDF | Berhasil | Belum |  |
| 4 | Upload KTM PDF | Upload file PDF | Berhasil | Belum |  |
| 5 | Upload screenshot produk JPG | Upload screenshot JPG | Berhasil | Belum |  |
| 6 | Upload file lebih dari 2 MB | Upload file besar | Ditolak | Belum |  |
| 7 | Upload format tidak valid | Upload file selain format izin | Ditolak | Belum |  |
| 8 | Path file tersimpan | Cek database | Path file tersimpan, bukan binary | Belum |  |

## 7. Responsivitas

| No | Halaman | Ukuran Layar | Hasil yang Diharapkan | Status | Catatan |
|---|---|---|---|---|---|
| 1 | Landing Page | Mobile | Tampilan tidak rusak | Belum |  |
| 2 | Login | Mobile | Form rapi | Belum |  |
| 3 | Register | Mobile | Form rapi | Belum |  |
| 4 | Dashboard Mahasiswa | Mobile | Menu dan card rapi | Belum |  |
| 5 | Dashboard UMKM | Mobile | Menu dan card rapi | Belum |  |
| 6 | Dashboard Admin | Desktop | Tabel rapi | Belum |  |
| 7 | Katalog Produk | Mobile | Card produk rapi | Belum |  |
| 8 | Detail Produk | Mobile | Informasi tidak melebar | Belum |  |
| 9 | Tabel Admin | Mobile/Desktop | Bisa scroll horizontal | Belum |  |

## 8. Status Akhir Testing

| Area | Status Akhir |
|---|---|
| Auth | Belum selesai |
| Mahasiswa | Belum selesai |
| UMKM | Belum selesai |
| Admin | Belum selesai |
| ReKarya Match | Belum selesai |
| Upload File | Belum selesai |
| Responsivitas | Belum selesai |
| Demo Final | Belum selesai |