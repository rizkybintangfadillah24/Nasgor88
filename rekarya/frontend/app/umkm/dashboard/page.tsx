import Link from 'next/link';

export default function UmkmDashboardPage() {
  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Dashboard UMKM
            </h1>
            <p className="mt-2 text-gray-600">
              Temukan solusi digital yang sesuai dengan kebutuhan usaha Anda.
            </p>
          </div>

          <Link
            href="/umkm/recommendations"
            className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Lihat Rekomendasi
          </Link>
        </div>

        <div className="mb-8 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">Profil Kebutuhan</p>
            <p className="mt-2 text-3xl font-bold text-blue-600">1</p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">Rekomendasi Tersedia</p>
            <p className="mt-2 text-3xl font-bold text-green-600">5</p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">Kecocokan Tertinggi</p>
            <p className="mt-2 text-3xl font-bold text-purple-600">92%</p>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">
            Ringkasan
          </h2>

          <p className="text-gray-600">
            Sistem telah menganalisis kebutuhan usaha Anda dan menyiapkan
            rekomendasi produk digital terbaik dari karya mahasiswa.
          </p>
        </div>
      </div>
    </main>
  );
}