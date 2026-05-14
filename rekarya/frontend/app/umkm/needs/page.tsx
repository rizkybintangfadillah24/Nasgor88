const needs = [
  {
    title: "Website Toko Online",
    priority: "Tinggi",
    status: "Aktif",
  },
  {
    title: "Sistem POS",
    priority: "Sedang",
    status: "Aktif",
  },
  {
    title: "Dashboard Keuangan",
    priority: "Rendah",
    status: "Draft",
  },
];

export default function UmkmNeedsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Kebutuhan Usaha
          </h2>
          <p className="text-gray-500">
            Kelola kebutuhan digital yang akan dipublikasikan.
          </p>
        </div>

        <button className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700 transition">
          + Tambah Kebutuhan
        </button>
      </div>

      <div className="grid gap-6">
        {needs.map((item, index) => (
          <div
            key={index}
            className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
          >
            <h3 className="text-lg font-semibold text-gray-800">
              {item.title}
            </h3>

            <div className="mt-3 flex flex-wrap gap-3">
              <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-600">
                Prioritas: {item.priority}
              </span>

              <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-600">
                Status: {item.status}
              </span>
            </div>

            <button className="mt-4 text-blue-600 font-medium hover:underline">
              Edit Kebutuhan
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}