import Link from 'next/link';

export default function MahasiswaProductsPage() {
  const products = [
    {
      id: 1,
      title: 'Sistem Kasir UMKM',
      status: 'APPROVED',
      technology: 'Next.js, Express.js',
    },
    {
      id: 2,
      title: 'Aplikasi Inventori',
      status: 'PENDING',
      technology: 'React, PostgreSQL',
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Produk Saya
            </h1>
            <p className="mt-2 text-gray-600">
              Daftar produk tugas akhir yang telah Anda upload.
            </p>
          </div>

          <Link
            href="/mahasiswa/products/create"
            className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Tambah Produk
          </Link>
        </div>

        <div className="grid gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="rounded-2xl bg-white p-6 shadow-sm"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {product.title}
                  </h2>
                  <p className="mt-1 text-gray-600">
                    {product.technology}
                  </p>
                </div>

                <span
                  className={`rounded-full px-4 py-2 text-sm font-semibold ${
                    product.status === 'APPROVED'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}
                >
                  {product.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}