const categories = [
  "E-Commerce",
  "Penjualan",
  "Keuangan",
  "Pemasaran Digital",
  "Manajemen Inventori",
  "Customer Relationship Management",
];

export default function AdminCategoriesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Kategori Produk</h2>
        <p className="text-gray-500">
          Kelola kategori produk tugas akhir yang tersedia.
        </p>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="grid gap-4 md:grid-cols-2">
          {categories.map((category, index) => (
            <div
              key={index}
              className="rounded-xl bg-gray-50 px-4 py-3 text-gray-700"
            >
              {category}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}