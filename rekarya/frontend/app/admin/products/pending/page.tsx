const pendingProducts = [
  {
    id: 1,
    title: "Sistem POS UMKM",
    author: "Mahasiswa Demo",
    category: "Penjualan",
  },
  {
    id: 2,
    title: "Website Toko Online",
    author: "Mahasiswa Demo",
    category: "E-Commerce",
  },
];

export default function AdminProductsPendingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">
          Produk Pending
        </h2>
        <p className="text-gray-500">
          Verifikasi produk yang menunggu persetujuan.
        </p>
      </div>

      <div className="grid gap-6">
        {pendingProducts.map((product) => (
          <div
            key={product.id}
            className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
          >
            <h3 className="text-lg font-semibold text-gray-800">
              {product.title}
            </h3>

            <p className="mt-2 text-gray-600">
              Mahasiswa:{" "}
              <span className="font-medium">{product.author}</span>
            </p>

            <p className="mt-1 text-gray-600">
              Kategori:{" "}
              <span className="font-medium">{product.category}</span>
            </p>

            <div className="mt-4 flex gap-3">
              <button className="rounded-xl bg-green-600 px-4 py-2 font-semibold text-white hover:bg-green-700 transition">
                Approve
              </button>

              <button className="rounded-xl bg-red-500 px-4 py-2 font-semibold text-white hover:bg-red-600 transition">
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}