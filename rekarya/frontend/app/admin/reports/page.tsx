const reports = [
  "Laporan Pengguna",
  "Laporan Produk",
  "Laporan Transaksi",
  "Laporan Pendampingan",
  "Laporan Statistik Masalah",
];

export default function AdminReportsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Laporan</h2>
        <p className="text-gray-500">
          Generate dan unduh berbagai laporan sistem.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {reports.map((report, index) => (
          <div
            key={index}
            className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
          >
            <h3 className="font-semibold text-gray-800">{report}</h3>

            <button className="mt-4 rounded-xl bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700 transition">
              Generate PDF
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}