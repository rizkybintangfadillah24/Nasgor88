import Link from "next/link";

const products = [
  {
    id: "1",
    title: "Sistem POS UMKM",
    category: "Penjualan",
    status: "APPROVED",
  },
  {
    id: "2",
    title: "Website Toko Online",
    category: "E-Commerce",
    status: "PENDING",
  },
  {
    id: "3",
    title: "Dashboard Keuangan",
    category: "Keuangan",
    status: "APPROVED",
  },
];

function getStatusBadge(status: string) {
  if (status === "APPROVED") {
    return (
      <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
        APPROVED
      </span>
    );
  }

  if (status === "PENDING") {
    return (
      <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
        PENDING
      </span>
    );
  }

  return (
    <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
      REJECTED
    </span>
  );
}

export default function MahasiswaProductsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Produk Saya</h2>
          <p className="text-gray-500">
            Kelola produk tugas akhir yang telah diunggah.
          </p>
        </div>

        <Link
          href="/mahasiswa/products/create"
          className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
        >
          + Tambah Produk
        </Link>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                Judul Produk
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                Kategori
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                Status
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                Aksi
              </th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="border-t border-gray-100"
              >
                <td className="px-6 py-4 font-medium text-gray-800">
                  {product.title}
                </td>
                <td className="px-6 py-4 text-gray-600">
                  {product.category}
                </td>
                <td className="px-6 py-4">
                  {getStatusBadge(product.status)}
                </td>
                <td className="px-6 py-4">
                  <button
                    type="button"
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}