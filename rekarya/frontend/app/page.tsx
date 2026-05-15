import Link from "next/link";

const products = [
  {
    title: "Aplikasi Web Kasir UMKM",
    category: "Keuangan",
    description:
      "Membantu UMKM mencatat transaksi, stok, dan laporan penjualan secara sederhana.",
  },
  {
    title: "Katalog Digital Produk Lokal",
    category: "Pemasaran",
    description:
      "Membantu usaha kecil menampilkan produk secara online agar mudah ditemukan pelanggan.",
  },
  {
    title: "Sistem Pemesanan Online",
    category: "Penjualan",
    description:
      "Membantu UMKM menerima pesanan digital dan mengelola order dengan lebih rapi.",
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
    description: "Mahasiswa mengunggah produk tugas akhir ke platform.",
  },
  {
    title: "Admin Verifikasi",
    description: "Admin memeriksa dan menyetujui produk yang layak tampil.",
  },
  {
    title: "UMKM Cari Solusi",
    description: "UMKM mencari solusi digital sesuai kebutuhan usaha.",
  },
  {
    title: "Kerja Sama",
    description: "UMKM dan mahasiswa melanjutkan proses implementasi.",
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
            <a href="#home" className="hover:text-emerald-300">
              Home
            </a>
            <a href="#produk" className="hover:text-emerald-300">
              Produk
            </a>
            <a href="#trend" className="hover:text-emerald-300">
              Trend UMKM
            </a>
            <a href="#alur" className="hover:text-emerald-300">
              Alur
            </a>
            <a href="#manfaat" className="hover:text-emerald-300">
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

            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-400">
              Platform yang membantu UMKM menemukan solusi digital dari produk
              tugas akhir mahasiswa melalui katalog terverifikasi dan sistem
              rekomendasi ReKarya Match.
            </p>

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
            <div className="rounded-[1.5rem] bg-slate-950/80 p-6">
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-slate-400">ReKarya Match</p>
                  <h2 className="mt-1 text-2xl font-black">
                    Rekomendasi Solusi
                  </h2>
                </div>
                <span className="rounded-full bg-emerald-400 px-4 py-2 text-sm font-black text-slate-950">
                  86%
                </span>
              </div>

              <div className="space-y-4">
                {[
                  "Sesuai dengan masalah utama usaha",
                  "Fitur kasir dan laporan penjualan cocok",
                  "Harga sesuai dengan budget UMKM",
                  "Pendampingan tersedia secara online",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/10 bg-white/[0.05] p-4 text-sm text-slate-300"
                  >
                    {item}
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4">
                <p className="text-sm font-semibold text-emerald-200">
                  Label Kecocokan
                </p>
                <p className="mt-1 text-xl font-black text-white">
                  Sangat Cocok
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="tentang" className="px-6 py-20">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 md:p-12">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-emerald-300">
            Deskripsi Platform
          </p>
          <h2 className="mt-4 max-w-3xl text-3xl font-black md:text-5xl">
            Satu platform untuk mempertemukan karya mahasiswa dan kebutuhan
            digital UMKM.
          </h2>
          <p className="mt-6 max-w-4xl text-base leading-8 text-slate-400">
            ReKarya mempertemukan produk tugas akhir mahasiswa dengan kebutuhan
            digital UMKM. Mahasiswa dapat mengunggah produk tugas akhir, UMKM
            dapat mencari solusi berdasarkan kebutuhan usaha, dan admin
            memverifikasi produk agar katalog tetap terkurasi.
          </p>
        </div>
      </section>

      <section id="produk" className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-emerald-300">
                Produk Mahasiswa
              </p>
              <h2 className="mt-3 text-3xl font-black md:text-5xl">
                Produk Tugas Akhir Terkurasi
              </h2>
              <p className="mt-4 max-w-2xl text-slate-400">
                Produk yang tampil adalah contoh tampilan katalog. Nantinya
                produk asli akan diambil dari backend dan hanya status approved
                yang muncul.
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {products.map((product) => (
              <article
                key={product.title}
                className="group rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6 transition hover:-translate-y-1 hover:border-emerald-400/40 hover:bg-white/[0.07]"
              >
                <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-bold text-emerald-300">
                  {product.category}
                </span>
                <h3 className="mt-5 text-xl font-black">{product.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">
                  {product.description}
                </p>
                <Link
                  href="/register"
                  className="mt-6 inline-flex rounded-full border border-white/15 px-5 py-2 text-sm font-bold transition hover:border-emerald-400/60 hover:bg-white/10"
                >
                  Detail
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="trend" className="bg-white px-6 py-20 text-slate-950">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-emerald-700">
            Trend UMKM
          </p>
          <h2 className="mt-3 max-w-3xl text-3xl font-black md:text-5xl">
            Masalah digital yang sering dihadapi UMKM.
          </h2>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {problems.map((problem, index) => (
              <div
                key={problem}
                className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm"
              >
                <p className="text-sm font-black text-emerald-700">
                  #{index + 1}
                </p>
                <h3 className="mt-2 font-bold">{problem}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="alur" className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-emerald-300">
            Alur Penggunaan
          </p>
          <h2 className="mt-3 max-w-3xl text-3xl font-black md:text-5xl">
            Mahasiswa Upload → Admin Verifikasi → UMKM Cari → Kerja Sama
          </h2>

          <div className="mt-10 grid gap-5 md:grid-cols-4">
            {flows.map((flow, index) => (
              <div
                key={flow.title}
                className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-400 font-black text-slate-950">
                  {index + 1}
                </div>
                <h3 className="font-black">{flow.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">
                  {flow.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="manfaat" className="px-6 pb-24">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-emerald-300">
            Manfaat
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-8">
              <h3 className="text-2xl font-black">Untuk Mahasiswa</h3>
              <p className="mt-4 leading-7 text-slate-400">
                Produk tugas akhir bisa terimplementasi dan memiliki peluang
                digunakan untuk menyelesaikan kebutuhan nyata pelaku UMKM.
              </p>
            </div>

            <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-8">
              <h3 className="text-2xl font-black">Untuk UMKM</h3>
              <p className="mt-4 leading-7 text-slate-400">
                UMKM mendapat solusi digital yang sesuai kebutuhan, lebih
                terarah, dan sudah melalui proses verifikasi platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 px-6 py-8 text-sm text-slate-400">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 md:flex-row md:items-center">
          <p>© 2026 ReKarya. Platform kolaborasi mahasiswa dan UMKM.</p>
          <div className="flex gap-5">
            <span>Kontak</span>
            <span>Info Platform</span>
          </div>
        </div>
      </footer>
    </main>
  );
}