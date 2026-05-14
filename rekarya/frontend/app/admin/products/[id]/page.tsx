type ProductDetailPageProps = {
  params: {
    id: string;
  };
};

export default function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">
          Detail Produk #{params.id}
        </h2>
        <p className="text-gray-500">
          Informasi lengkap produk yang diajukan.
        </p>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <h3 className="text-xl font-semibold text-gray-800">
          Sistem POS UMKM
        </h3>

        <p className="mt-4 text-gray-600">
          Produk ini membantu UMKM mengelola penjualan, stok,
          dan laporan keuangan secara digital.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div>
            <p className="text-sm text-gray-500">Mahasiswa</p>
            <p className="font-medium text-gray-800">
              Mahasiswa Demo
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Kategori</p>
            <p className="font-medium text-gray-800">Penjualan</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Status</p>
            <p className="font-semibold text-yellow-600">Pending</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Versi</p>
            <p className="font-medium text-gray-800">v1.0</p>
          </div>
        </div>

        <div className="mt-8 flex gap-3">
          <button className="rounded-xl bg-green-600 px-4 py-2 font-semibold text-white hover:bg-green-700 transition">
            Approve
          </button>

          <button className="rounded-xl bg-red-500 px-4 py-2 font-semibold text-white hover:bg-red-600 transition">
            Reject
          </button>
        </div>
      </div>
    </div>
  );
}