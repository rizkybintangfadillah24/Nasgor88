import Link from 'next/link';

export default function AdminDashboardPage() {
  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Dashboard Admin
            </h1>
            <p className="mt-2 text-gray-600">
              Kelola verifikasi produk yang diunggah mahasiswa.
            </p>
          </div>

          <Link
            href="/admin/products/pending"
            className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Review Produk
          </Link>
        </div>

        <div className="mb-8 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">Produk Pending</p>
            <p className="mt-2 text-3xl font-bold text-yellow-600">0</p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">Produk Disetujui</p>
            <p className="mt-2 text-3xl font-bold text-green-600">0</p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">Produk Ditolak</p>
            <p className="mt-2 text-3xl font-bold text-red-600">0</p>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">
            Aksi Cepat
          </h2>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/admin/products/pending"
              className="rounded-lg border border-gray-300 px-5 py-3 font-medium text-gray-700 hover:bg-gray-50"
            >
              Lihat Produk Pending
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}