import Link from "next/link";

const products = [
  {
    title: "Aplikasi Web Kasir UMKM",
    category: "Keuangan",
    description:
      "Membantu UMKM mencatat transaksi, mengelola stok, dan melihat laporan penjualan secara lebih rapi.",
  },
  {
    title: "Katalog Digital Produk Lokal",
    category: "Pemasaran",
    description:
      "Membantu usaha kecil menampilkan produk secara online agar lebih mudah ditemukan oleh pelanggan.",
  },
  {
    title: "Sistem Pemesanan Online",
    category: "Penjualan",
    description:
      "Membantu UMKM menerima pesanan digital, mengelola order, dan mempercepat proses pelayanan.",
  },
  {
    title: "Dashboard Analisis Penjualan",
    category: "Analisis Data",
    description:
      "Membantu pemilik usaha melihat tren penjualan, produk terlaris, dan performa usaha melalui tampilan dashboard sederhana.",
  },
  {
    title: "Aplikasi Manajemen Stok",
    category: "Operasional",
    description:
      "Membantu UMKM memantau stok barang, mencatat barang masuk dan keluar, serta mengurangi risiko stok habis tanpa terpantau.",
  },
  {
    title: "Sistem Pencatatan Keuangan UMKM",
    category: "Keuangan",
    description:
      "Membantu pelaku usaha mencatat pemasukan, pengeluaran, laba, dan laporan keuangan harian secara lebih terstruktur.",
  },
  {
    title: "Website Company Profile UMKM",
    category: "Pemasaran",
    description:
      "Membantu UMKM menampilkan profil usaha, produk unggulan, kontak, lokasi, dan informasi bisnis secara profesional.",
  },
  {
    title: "Aplikasi Reservasi Jasa Online",
    category: "Jasa",
    description:
      "Membantu usaha jasa menerima pemesanan jadwal, mencatat pelanggan, dan mengelola layanan secara digital.",
  },
  {
    title: "Sistem Monitoring Produksi",
    category: "Operasional",
    description:
      "Membantu UMKM memantau proses produksi, status pengerjaan, dan catatan kendala agar operasional lebih terkontrol.",
  },
];

const problems = [
  "Pemasaran Digital Lemah",
  "Penjualan Belum Online",
  "Pencatatan Keuangan Manual",
  "Stok Tidak Tertata",
  "Operasional Tidak Efisien",
  "Analisis Berbasis Data",
];

const flows = [
  {
    title: "Mahasiswa Upload",
    description:
      "Mahasiswa mengunggah produk tugas akhir yang memiliki potensi menjadi solusi digital untuk UMKM.",
  },
  {
    title: "Admin Verifikasi",
    description:
      "Admin memeriksa kelayakan produk agar katalog tetap terkurasi, relevan, dan terpercaya.",
  },
  {
    title: "UMKM Cari Solusi",
    description:
      "UMKM menemukan solusi berdasarkan masalah usaha, kebutuhan digital, budget, dan metode pendampingan.",
  },
  {
    title: "Kerja Sama",
    description:
      "UMKM dan mahasiswa melanjutkan proses demo, penawaran, transaksi, implementasi, dan pendampingan.",
  },
];

const benefits = [
  {
    title: "Untuk Mahasiswa",
    description:
      "Produk tugas akhir tidak berhenti sebagai proyek akademik, tetapi memiliki peluang digunakan langsung oleh pelaku usaha.",
  },
  {
    title: "Untuk UMKM",
    description:
      "UMKM mendapat akses solusi digital yang lebih terarah, relevan, dan sesuai dengan kebutuhan operasional usaha.",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#060A18] text-white">
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#060A18]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-2xl font-black tracking-tight">
            Re<span className="text-emerald-400">Karya</span>
          </Link>

          <div className="hidden items-center gap-7 text-sm text-slate-300 md:flex">
            <a href="#home" className="transition hover:text-emerald-300">
              Home
            </a>
            <a href="#produk" className="transition hover:text-emerald-300">
              Produk
            </a>
            <a href="#trend" className="transition hover:text-emerald-300">
              Trend UMKM
            </a>
            <a href="#alur" className="transition hover:text-emerald-300">
              Alur
            </a>
            <a href="#manfaat" className="transition hover:text-emerald-300">
              Manfaat
            </a>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/register"
              className="rounded-full border border-white/15 px-5 py-2 text-sm font-semibold text-white transition hover:border-emerald-400/60 hover:bg-white/10"
            >
              Register
            </Link>

            <Link
              href="/login"
              className="rounded-full bg-emerald-400 px-5 py-2 text-sm font-bold text-slate-950 transition hover:bg-emerald-300"
            >
              Login
            </Link>
          </div>
        </div>
      </nav>

      <section
        id="home"
        className="relative overflow-hidden px-6 pb-24 pt-20 md:pb-32 md:pt-28"
      >
        <div className="absolute left-0 top-20 h-96 w-96 rounded-full bg-emerald-500/20 blur-3xl" />
        <div className="absolute right-0 top-32 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <div className="mb-6 inline-flex rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm font-medium text-emerald-200">
              Platform hilirisasi produk tugas akhir mahasiswa
            </div>

            <h1 className="max-w-3xl text-5xl font-black tracking-tight md:text-7xl">
              ReKarya
            </h1>

            <p className="mt-6 max-w-2xl text-xl font-semibold leading-8 text-slate-100">
              Menghubungkan Produk Tugas Akhir Mahasiswa dengan Kebutuhan
              Digital UMKM.
            </p>

            <div
              className="mt-6 max-w-3xl space-y-4 text-base leading-8 text-slate-400"
              style={{
                textAlign: "justify",
                textJustify: "inter-word",
              }}
            >
              <p
                style={{
                  textAlign: "justify",
                  textJustify: "inter-word",
                  textAlignLast: "left",
                }}
              >
                ReKarya adalah platform digital yang dirancang untuk
                menjembatani karya inovatif mahasiswa dengan kebutuhan nyata
                pelaku UMKM. Melalui ReKarya, produk tugas akhir mahasiswa
                tidak berhenti sebagai dokumen akademik atau proyek kampus
                semata, tetapi memiliki peluang untuk digunakan, diuji, dan
                diterapkan langsung dalam dunia usaha.
              </p>

              <p
                style={{
                  textAlign: "justify",
                  textJustify: "inter-word",
                  textAlignLast: "left",
                }}
              >
                Platform ini membantu mahasiswa memperkenalkan solusi digital
                yang mereka bangun, mulai dari aplikasi penjualan, sistem
                pencatatan keuangan, katalog digital, manajemen stok, dashboard
                analisis, hingga berbagai teknologi lain yang dapat mendukung
                transformasi UMKM.
              </p>

              <p
                style={{
                  textAlign: "justify",
                  textJustify: "inter-word",
                  textAlignLast: "left",
                }}
              >
                Bagi UMKM, ReKarya hadir sebagai ruang pencarian solusi yang
                lebih terarah. Pelaku usaha dapat menemukan produk digital yang
                sesuai dengan masalah utama mereka, seperti penjualan yang belum
                online, pencatatan keuangan manual, stok barang yang belum
                tertata, pemasaran digital yang belum optimal, hingga kebutuhan
                analisis usaha berbasis data.
              </p>
            </div>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/login"
                className="rounded-full bg-emerald-400 px-7 py-3 text-center font-bold text-slate-950 transition hover:bg-emerald-300"
              >
                Login Mahasiswa
              </Link>

              <Link
                href="/register"
                className="rounded-full border border-white/15 px-7 py-3 text-center font-bold text-white transition hover:border-emerald-400/60 hover:bg-white/10"
              >
                Cari Solusi UMKM
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-4 shadow-2xl shadow-emerald-950/30">
            <div className="rounded-[1.5rem] bg-[#080D1F] p-6 md:p-8">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-emerald-300">
                    Alur Kolaborasi
                  </p>

                  <h2 className="mt-2 text-3xl font-black">
                    Dari karya kampus menjadi solusi usaha.
                  </h2>
                </div>

                <div className="hidden rounded-full bg-emerald-400 px-4 py-2 text-sm font-black text-slate-950 md:block">
                  ReKarya
                </div>
              </div>

              <div className="mt-8 space-y-4">
                {[
                  "Mahasiswa mengunggah produk tugas akhir",
                  "Admin memverifikasi kelayakan produk",
                  "UMKM mencari solusi sesuai masalah usaha",
                  "Sistem membantu menampilkan produk yang relevan",
                  "Kolaborasi berlanjut ke demo, kerja sama, dan pendampingan",
                ].map((item, index) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-400 text-sm font-black text-slate-950">
                        {index + 1}
                      </div>

                      <p className="pt-1 text-sm font-semibold leading-6 text-slate-200">
                        {item}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-5">
                <p className="text-sm font-black uppercase tracking-[0.18em] text-emerald-300">
                  Fokus Platform
                </p>

                <p className="mt-3 text-lg font-black text-white">
                  Katalog produk terverifikasi, pencarian solusi UMKM, dan
                  kolaborasi implementasi.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="deskripsi"
        className="border-y border-white/10 bg-white/[0.03] px-6 py-20"
      >
        <div className="mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <p className="text-sm font-black uppercase tracking-[0.25em] text-emerald-300">
              Deskripsi Platform
            </p>

            <h2 className="mt-4 text-4xl font-black tracking-tight md:text-5xl">
              Ruang temu antara inovasi mahasiswa dan kebutuhan digital UMKM.
            </h2>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            <div className="rounded-[1.5rem] border border-white/10 bg-[#0B1022] p-6">
              <h3 className="text-xl font-black text-white">
                Karya mahasiswa lebih berdampak
              </h3>

              <p className="mt-4 text-sm leading-7 text-slate-400">
                Mahasiswa dapat mengunggah produk tugas akhir yang berpotensi
                membantu proses digitalisasi UMKM. Produk yang masuk ke katalog
                menjadi bukti bahwa karya akademik dapat memiliki nilai guna
                secara nyata.
              </p>
            </div>

            <div className="rounded-[1.5rem] border border-white/10 bg-[#0B1022] p-6">
              <h3 className="text-xl font-black text-white">
                UMKM menemukan solusi lebih tepat
              </h3>

              <p className="mt-4 text-sm leading-7 text-slate-400">
                UMKM dapat mencari produk berdasarkan masalah usaha, kategori
                kebutuhan, fitur, biaya, durasi pelatihan, dan metode
                pendampingan yang sesuai dengan kondisi usaha mereka.
              </p>
            </div>

            <div className="rounded-[1.5rem] border border-white/10 bg-[#0B1022] p-6">
              <h3 className="text-xl font-black text-white">
                Admin menjaga kualitas katalog
              </h3>

              <p className="mt-4 text-sm leading-7 text-slate-400">
                Setiap produk yang diunggah akan melalui proses verifikasi
                sehingga katalog ReKarya tetap terkurasi, kredibel, dan layak
                digunakan sebagai referensi solusi digital bagi UMKM.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="produk" className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.25em] text-emerald-300">
                Produk Mahasiswa
              </p>

              <h2 className="mt-4 text-4xl font-black tracking-tight">
                Contoh produk tugas akhir.
              </h2>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400">
                Produk yang tampil pada katalog utama adalah produk yang sudah
                diverifikasi oleh admin dan layak dilihat oleh UMKM.
              </p>
            </div>

            <Link
              href="/register"
              className="w-fit rounded-full border border-white/15 px-5 py-3 text-sm font-bold text-white transition hover:border-emerald-400/60 hover:bg-white/10"
            >
              Lihat Katalog
            </Link>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {products.map((product) => (
              <div
                key={product.title}
                className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-6 transition hover:border-emerald-400/40 hover:bg-white/[0.06]"
              >
                <div className="mb-5 inline-flex rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-bold text-emerald-300">
                  {product.category}
                </div>

                <h3 className="text-xl font-black text-white">
                  {product.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-slate-400">
                  {product.description}
                </p>

                <Link
                  href="/register"
                  className="mt-6 inline-flex rounded-full bg-emerald-400 px-5 py-2 text-sm font-bold text-slate-950 transition hover:bg-emerald-300"
                >
                  Detail Produk
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="trend"
        className="border-y border-white/10 bg-white/[0.03] px-6 py-20"
      >
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-[0.25em] text-emerald-300">
            Tren Masalah UMKM
          </p>

          <h2 className="mt-4 text-4xl font-black tracking-tight">
            Masalah digital yang paling sering membutuhkan solusi.
          </h2>

          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-400">
            Kategori masalah ini menjadi acuan awal agar produk mahasiswa dapat
            diarahkan ke kebutuhan UMKM yang lebih spesifik dan mudah dipahami.
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {problems.map((problem, index) => (
              <div
                key={problem}
                className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#0B1022] p-5"
              >
                <p className="font-bold text-white">{problem}</p>

                <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-black text-emerald-300">
                  #{index + 1}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="alur" className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-[0.25em] text-emerald-300">
            Alur Penggunaan
          </p>

          <h2 className="mt-4 text-4xl font-black tracking-tight">
            Dari upload produk sampai kerja sama.
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-4">
            {flows.map((flow, index) => (
              <div
                key={flow.title}
                className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-6"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-400 text-lg font-black text-slate-950">
                  {index + 1}
                </div>

                <h3 className="text-lg font-black text-white">{flow.title}</h3>

                <p className="mt-4 text-sm leading-7 text-slate-400">
                  {flow.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="manfaat"
        className="border-y border-white/10 bg-white/[0.03] px-6 py-20"
      >
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-[0.25em] text-emerald-300">
            Manfaat
          </p>

          <h2 className="mt-4 text-4xl font-black tracking-tight">
            Kolaborasi yang saling menguatkan.
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="rounded-[1.5rem] border border-white/10 bg-[#0B1022] p-7"
              >
                <h3 className="text-2xl font-black text-white">
                  {benefit.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-slate-400">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="px-6 py-10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 border-t border-white/10 pt-8 md:flex-row md:items-center">
          <div>
            <Link href="/" className="text-2xl font-black tracking-tight">
              Re<span className="text-emerald-400">Karya</span>
            </Link>

            <p className="mt-3 text-sm text-slate-500">
              Platform penghubung produk tugas akhir mahasiswa dengan kebutuhan
              digital UMKM.
            </p>
          </div>

          <div className="text-sm text-slate-500">
            © 2026 ReKarya. Web Application Hackathon Project.
          </div>
        </div>
      </footer>
    </main>
  );
}