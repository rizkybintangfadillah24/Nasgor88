import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <section className="mx-auto flex min-h-screen max-w-7xl items-center px-6 py-20">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <p className="mb-4 inline-block rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
              Platform Kolaborasi Mahasiswa & UMKM
            </p>

            <h1 className="mb-6 text-5xl font-bold leading-tight text-gray-900">
              ReKarya
            </h1>

            <p className="mb-4 text-xl font-semibold text-gray-700">
              Temukan Solusi Digital untuk UMKM dari Produk Tugas Akhir
              Mahasiswa.
            </p>

            <p className="mb-8 text-gray-600">
              ReKarya menghubungkan inovasi mahasiswa dengan kebutuhan nyata
              UMKM melalui sistem rekomendasi cerdas ReKarya Match.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/register"
                className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
              >
                Daftar Sekarang
              </Link>

              <Link
                href="/login"
                className="rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700 hover:bg-gray-50"
              >
                Login
              </Link>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-xl">
            <div className="grid gap-4">
              <div className="rounded-xl bg-blue-50 p-4">
                <h3 className="font-semibold text-blue-700">Mahasiswa</h3>
                <p className="text-sm text-gray-600">
                  Upload produk tugas akhir dan tawarkan solusi digital.
                </p>
              </div>

              <div className="rounded-xl bg-green-50 p-4">
                <h3 className="font-semibold text-green-700">UMKM</h3>
                <p className="text-sm text-gray-600">
                  Temukan rekomendasi produk yang sesuai kebutuhan usaha.
                </p>
              </div>

              <div className="rounded-xl bg-purple-50 p-4">
                <h3 className="font-semibold text-purple-700">Admin</h3>
                <p className="text-sm text-gray-600">
                  Verifikasi produk sebelum tampil di katalog.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}