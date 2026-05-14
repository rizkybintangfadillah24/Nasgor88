const problemStats = [
  {
    problem: "Penjualan Belum Online",
    count: 24,
  },
  {
    problem: "Pencatatan Keuangan Manual",
    count: 18,
  },
  {
    problem: "Pemasaran Digital Lemah",
    count: 15,
  },
  {
    problem: "Stok Tidak Tertata",
    count: 11,
  },
];

export default function AdminStatisticsProblemsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">
          Statistik Masalah UMKM
        </h2>
        <p className="text-gray-500">
          Analisis masalah yang paling sering ditemukan.
        </p>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="space-y-4">
          {problemStats.map((item, index) => (
            <div key={index}>
              <div className="mb-1 flex justify-between text-sm font-medium text-gray-700">
                <span>{item.problem}</span>
                <span>{item.count} UMKM</span>
              </div>

              <div className="h-3 rounded-full bg-gray-200">
                <div
                  className="h-3 rounded-full bg-blue-600"
                  style={{ width: `${item.count * 3}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}