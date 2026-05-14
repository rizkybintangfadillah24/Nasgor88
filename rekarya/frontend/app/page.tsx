import Link from "next/link";

const problems = [
  "Pemasaran Digital Lemah",
  "Penjualan Belum Online",
  "Pencatatan Keuangan Manual",
  "Stok Tidak Tertata",
  "Operasional Tidak Efisien",
  "Analisis Berbasis Data",
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <h1 className="text-2xl font-bold text-blue-600">ReKarya</h1>

          <nav className="hidden gap-6 md:flex">
            <a href="#home" className="hover:text-blue-600">
              Home
            </a>
            <a href="#produk" className="hover:text-blue-600">
              Produk
            </a>
            <a href="#tren" className="hover:text-blue-600">
              Trend UMKM
            </a>
            <a href="#alur" className="hover:text-blue-600">
              Alur
            </a>
            <a href="#manfaat" className="hover:text-blue-600">
              Manfaat
            </a>
          </nav>

          <div className="flex gap-3">
            <Link
              href="/register"
              className="rounded-lg border px-4 py-2 font-medium hover:bg-gray-50"
            >
              Register
            </Link>
            <Link
              href="/login"
              className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
            >
              Login
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section
        id="home"
        className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white"
      >
        <div className="mx-auto max-w-7xl px-6 py-24 text-center">
          <h2 className="mb-6 text-5xl font-bold">ReKarya</h2>

          <p className="mb-4 text-2xl font-semibold">
            Menghubungkan Produk Tugas Akhir Mahasiswa dengan Kebutuhan Digital
            UMKM
          </p>

          <p className="mx-auto mb-8 max-w-3xl text-lg text-blue-100">
            Platform yang membantu UMKM menemukan solusi digital dari produk
            tugas akhir mahasiswa melalui katalog terverifikasi dan sistem
            rekomendasi ReKarya Match.
          </p>

          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/login"
              className="rounded-lg bg-white px-6 py-3 font-semibold text-blue-700"
            >
              Login Mahasiswa
            </Link>

            <Link
              href="/register"
              className="rounded-lg border border-white px-6 py-3 font-semibold text-white"
            >
              Cari Solusi UMKM
            </Link>
          </div>
        </div>
      </section>

      {/* Tentang ReKarya */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <h3 className="mb-6 text-3xl font-bold">Tentang ReKarya</h3>

        <p className="text-lg leading-8 text-gray-600">
          ReKarya adalah platform yang mempertemukan produk tugas akhir
          mahasiswa dengan kebutuhan digital UMKM. Mahasiswa dapat mengunggah
          produk tugas akhir, UMKM dapat mencari solusi berdasarkan kebutuhan
          usaha, dan admin memverifikasi produk agar katalog tetap terkurasi.
        </p>
      </section>

      {/* Produk Mahasiswa */}
      <section id="produk" className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h3 className="mb-10 text-3xl font-bold">Produk Mahasiswa</h3>

          <div className="grid gap-6 md:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="rounded-2xl border bg-white p-6 shadow-sm"
              >
                <h4 className="mb-2 text-xl font-semibold">
                  Sistem Penjualan Digital
                </h4>

                <p className="mb-3 text-gray-600">
                  Solusi digital untuk membantu UMKM mengelola penjualan online.
                </p>

                <span className="mb-4 inline-block rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">
                  Penjualan
                </span>

                <div>
                  <Link
                    href="/products"
                    className="font-medium text-blue-600 hover:underline"
                  >
                    Lihat Detail
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tren Masalah UMKM */}
      <section id="tren" className="mx-auto max-w-7xl px-6 py-20">
        <h3 className="mb-10 text-3xl font-bold">Tren Masalah UMKM</h3>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {problems.map((problem) => (
            <div key={problem} className="rounded-xl border p-4 font-medium">
              {problem}
            </div>
          ))}
        </div>
      </section>

      {/* Alur Penggunaan */}
      <section id="alur" className="bg-blue-50 py-20">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h3 className="mb-10 text-3xl font-bold">Alur Penggunaan</h3>

          <p className="text-xl font-semibold text-blue-700">
            Mahasiswa Upload → Admin Verifikasi → UMKM Cari → Kerja Sama
          </p>
        </div>
      </section>

      {/* Manfaat */}
      <section id="manfaat" className="mx-auto max-w-7xl px-6 py-20">
        <h3 className="mb-10 text-3xl font-bold">Manfaat</h3>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border p-6">
            <h4 className="mb-3 text-xl font-semibold">Untuk Mahasiswa</h4>
            <p className="text-gray-600">
              Produk tugas akhir dapat terimplementasi dan memberikan dampak
              nyata.
            </p>
          </div>

          <div className="rounded-2xl border p-6">
            <h4 className="mb-3 text-xl font-semibold">Untuk UMKM</h4>
            <p className="text-gray-600">
              Mendapat solusi digital yang sesuai dengan kebutuhan usaha.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-8 text-white">
        <div className="mx-auto max-w-7xl px-6 text-center text-sm text-gray-300">
          © 2026 ReKarya. All rights reserved.
        </div>
      </footer>
    </main>
  );
}