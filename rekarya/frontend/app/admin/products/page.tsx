export default function PendingProductsPage() {
  const pendingProducts = [
    {
      id: 1,
      title: 'Sistem Kasir UMKM',
      author: 'Budi Santoso',
      status: 'PENDING',
    },
    {
      id: 2,
      title: 'Aplikasi Inventori',
      author: 'Siti Rahma',
      status: 'PENDING',
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Produk Pending Review
          </h1>
          <p className="mt-2 text-gray-600">
            Verifikasi produk sebelum dipublikasikan.
          </p>
        </div>

        <div className="grid gap-6">
          {pendingProducts.map((product) => (
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
                    Oleh: {product.author}
                  </p>
                </div>

                <div className="flex gap-3">
                  <button className="rounded-lg bg-green-600 px-4 py-2 font-semibold text-white hover:bg-green-700">
                    Approve
                  </button>

                  <button className="rounded-lg bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700">
                    Reject
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}