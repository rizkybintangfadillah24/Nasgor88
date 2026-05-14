import Link from 'next/link';

export default function MahasiswaDashboardPage() {
  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Dashboard Mahasiswa
            </h1>
            <p className="mt-2 text-gray-600">
              Kelola produk tugas akhir Anda.
            </p>
          </div>

          <Link
            href="/mahasiswa/products/create"
            className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Upload Produk
          </Link>
        </div>

        <div className="mb-8 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">Total Produk</p>
            <p className="mt-2 text-3xl font-bold text-gray-900">0</p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">Produk Disetujui</p>
            <p className="mt-2 text-3xl font-bold text-green-600">0</p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">Menunggu Verifikasi</p>
            <p className="mt-2 text-3xl font-bold text-yellow-600">0</p>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">
            Aksi Cepat
          </h2>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/mahasiswa/products"
              className="rounded-lg border border-gray-300 px-5 py-3 font-medium text-gray-700 hover:bg-gray-50"
            >
              Lihat Produk Saya
            </Link>

            <Link
              href="/mahasiswa/products/create"
              className="rounded-lg border border-gray-300 px-5 py-3 font-medium text-gray-700 hover:bg-gray-50"
            >
              Tambah Produk Baru
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}