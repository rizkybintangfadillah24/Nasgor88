# CHECKLIST TESTING — ReKarya

## Status Keterangan

- [ ] Belum dites
- [x] Berhasil
- [!] Bermasalah

---

## 1. Auth

| No | Test Case | Role | Status | Catatan |
|---|---|---|---|---|
| 1 | Register mahasiswa berhasil | Mahasiswa | [ ] |  |
| 2 | Register UMKM berhasil | UMKM | [ ] |  |
| 3 | Login mahasiswa berhasil | Mahasiswa | [ ] |  |
| 4 | Login UMKM berhasil | UMKM | [ ] |  |
| 5 | Login admin berhasil | Admin | [ ] |  |
| 6 | Token JWT tersimpan setelah login | Semua | [ ] |  |
| 7 | Endpoint `/api/auth/me` berhasil mengambil user aktif | Semua | [ ] |  |
| 8 | User tanpa token tidak bisa akses endpoint protected | Semua | [ ] |  |
| 9 | Role salah tidak bisa akses endpoint role lain | Semua | [ ] |  |

---

## 2. Profil Mahasiswa

| No | Test Case | Status | Catatan |
|---|---|---|---|
| 1 | Mahasiswa bisa melihat profil | [ ] |  |
| 2 | Mahasiswa bisa update data profil | [ ] |  |
| 3 | Mahasiswa bisa upload foto profil | [ ] |  |
| 4 | Mahasiswa bisa upload KTM / surat aktif kuliah | [ ] |  |
| 5 | Mahasiswa bisa upload KTP | [ ] |  |
| 6 | Path file tersimpan di database | [ ] |  |
| 7 | File tersimpan di folder uploads | [ ] |  |
| 8 | File selain format yang diizinkan ditolak | [ ] |  |
| 9 | File lebih dari 2 MB ditolak | [ ] |  |

---

## 3. Profil UMKM

| No | Test Case | Status | Catatan |
|---|---|---|---|
| 1 | UMKM bisa melihat profil usaha | [ ] |  |
| 2 | UMKM bisa update nama pemilik usaha | [ ] |  |
| 3 | UMKM bisa update nama usaha | [ ] |  |
| 4 | UMKM bisa mengisi masalah utama usaha | [ ] |  |
| 5 | UMKM bisa mengisi kebutuhan spesifik | [ ] |  |
| 6 | UMKM bisa mengisi budget minimal dan maksimal | [ ] |  |
| 7 | UMKM bisa mengisi target durasi implementasi | [ ] |  |
| 8 | UMKM bisa mengisi preferensi pendampingan | [ ] |  |

---

## 4. Produk Tugas Akhir

| No | Test Case | Status | Catatan |
|---|---|---|---|
| 1 | Mahasiswa bisa upload produk tugas akhir | [ ] |  |
| 2 | Produk baru otomatis berstatus PENDING | [ ] |  |
| 3 | Mahasiswa bisa melihat produk miliknya sendiri | [ ] |  |
| 4 | Mahasiswa bisa edit produk sendiri | [ ] |  |
| 5 | Mahasiswa bisa hapus produk sendiri | [ ] |  |
| 6 | Mahasiswa tidak bisa edit produk milik mahasiswa lain | [ ] |  |
| 7 | Produk PENDING tidak tampil di katalog | [ ] |  |
| 8 | Produk APPROVED tampil di katalog | [ ] |  |
| 9 | Produk APPROVED bisa dilihat detailnya | [ ] |  |
| 10 | Upload screenshot produk berhasil | [ ] |  |

---

## 5. Admin Verifikasi Produk

| No | Test Case | Status | Catatan |
|---|---|---|---|
| 1 | Admin bisa login | [ ] |  |
| 2 | Admin bisa melihat produk pending | [ ] |  |
| 3 | Admin bisa approve produk | [ ] |  |
| 4 | Admin bisa reject produk | [ ] |  |
| 5 | Produk APPROVED tampil di katalog | [ ] |  |
| 6 | Produk REJECTED tidak tampil di katalog | [ ] |  |
| 7 | User non-admin tidak bisa akses endpoint admin | [ ] |  |

---

## 6. ReKarya Match

| No | Test Case | Status | Catatan |
|---|---|---|---|
| 1 | UMKM bisa mencari rekomendasi produk | [ ] |  |
| 2 | Hanya produk APPROVED yang masuk rekomendasi | [ ] |  |
| 3 | Produk PENDING tidak masuk rekomendasi | [ ] |  |
| 4 | Match Score muncul | [ ] |  |
| 5 | Label kecocokan muncul | [ ] |  |
| 6 | Alasan rekomendasi muncul | [ ] |  |
| 7 | Score 80-100 tampil sebagai Sangat Cocok | [ ] |  |
| 8 | Score 60-79 tampil sebagai Cocok | [ ] |  |
| 9 | Score 40-59 tampil sebagai Cukup Sesuai | [ ] |  |
| 10 | Score di bawah 40 tampil sebagai Kurang Sesuai | [ ] |  |

---

## 7. Kerja Sama

| No | Test Case | Status | Catatan |
|---|---|---|---|
| 1 | UMKM bisa mengajukan kerja sama | [ ] |  |
| 2 | Status kerja sama awal WAITING | [ ] |  |
| 3 | Mahasiswa bisa melihat pengajuan kerja sama | [ ] |  |
| 4 | Mahasiswa bisa approve kerja sama | [ ] |  |
| 5 | Mahasiswa bisa reject kerja sama | [ ] |  |
| 6 | UMKM bisa melihat status kerja sama | [ ] |  |

---

## 8. Transaksi

| No | Test Case | Status | Catatan |
|---|---|---|---|
| 1 | UMKM bisa membuat transaksi setelah kerja sama disetujui | [ ] |  |
| 2 | Status transaksi awal UNPAID | [ ] |  |
| 3 | Admin bisa update status transaksi menjadi REVIEW | [ ] |  |
| 4 | Admin bisa update status transaksi menjadi PAID | [ ] |  |
| 5 | Mahasiswa bisa melihat transaksi miliknya | [ ] |  |
| 6 | UMKM bisa melihat transaksi miliknya | [ ] |  |

---

## 9. Pendampingan

| No | Test Case | Status | Catatan |
|---|---|---|---|
| 1 | Mahasiswa bisa membuat jadwal/progress pendampingan | [ ] |  |
| 2 | Mahasiswa bisa update progress pendampingan | [ ] |  |
| 3 | UMKM bisa melihat pendampingan | [ ] |  |
| 4 | UMKM bisa menandai pendampingan selesai | [ ] |  |

---

## 10. Ulasan

| No | Test Case | Status | Catatan |
|---|---|---|---|
| 1 | UMKM bisa memberi rating | [ ] |  |
| 2 | UMKM bisa memberi komentar | [ ] |  |
| 3 | Rating hanya 1 sampai 5 | [ ] |  |
| 4 | Ulasan produk bisa dilihat | [ ] |  |
| 5 | Mahasiswa bisa melihat ulasan untuk produknya | [ ] |  |

---

## 11. Flow Demo Final

| No | Flow | Status | Catatan |
|---|---|---|---|
| 1 | Admin login | [ ] |  |
| 2 | Mahasiswa register | [ ] |  |
| 3 | Mahasiswa login | [ ] |  |
| 4 | Mahasiswa isi profil | [ ] |  |
| 5 | Mahasiswa upload produk | [ ] |  |
| 6 | Produk masuk status PENDING | [ ] |  |
| 7 | Admin approve produk | [ ] |  |
| 8 | Produk berubah menjadi APPROVED | [ ] |  |
| 9 | UMKM register | [ ] |  |
| 10 | UMKM login | [ ] |  |
| 11 | UMKM isi profil usaha | [ ] |  |
| 12 | UMKM cari solusi | [ ] |  |
| 13 | ReKarya Match menampilkan rekomendasi | [ ] |  |
| 14 | Match Score dan alasan rekomendasi tampil | [ ] |  |
| 15 | UMKM membuka detail produk | [ ] |  |
| 16 | UMKM mengajukan kerja sama | [ ] |  |
| 17 | Mahasiswa approve kerja sama | [ ] |  |
| 18 | Transaksi dibuat | [ ] |  |
| 19 | Mahasiswa mengisi progress pendampingan | [ ] |  |
| 20 | UMKM memberi ulasan | [ ] |  |