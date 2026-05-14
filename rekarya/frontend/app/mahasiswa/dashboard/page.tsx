const summaryCards = [
  {
    title: "Total Produk",
    value: "5",
    description: "Produk tugas akhir yang telah diunggah.",
  },
  {
    title: "Pending",
    value: "2",
    description: "Produk menunggu verifikasi admin.",
  },
  {
    title: "Approved",
    value: "3",
    description: "Produk telah disetujui dan tampil di katalog.",
  },
  {
    title: "Kerja Sama Baru",
    value: "1",
    description: "Pengajuan kerja sama baru dari UMKM.",
  },
  {
    title: "Status Data Diri",
    value: "Pending",
    description: "Profil mahasiswa belum diverifikasi admin.",
  },
];

const latestActivities = [
  "Produk 'Sistem POS UMKM' sedang menunggu verifikasi admin.",
  "UMKM Kuliner Makmur mengajukan kerja sama.",
  "Request demo baru dijadwalkan untuk besok.",
];

const trendProblems = [
  "Pemasaran Digital Lemah",
  "Penjualan Belum Online",
  "Pencatatan Keuangan Manual",
  "Stok Tidak Tertata",
];

export default function MahasiswaDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Summary Cards */}
      <section>
        <h2 className="mb-4 text-xl font-bold text-gray-800">
          Ringkasan Dashboard
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {summaryCards.map((card) => (
            <div
              key={card.title}
              className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100"
            >
              <p className="text-sm font-medium text-gray-500">
                {card.title}
              </p>
              <p className="mt-2 text-3xl font-bold text-blue-600">
                {card.value}
              </p>
              <p className="mt-2 text-sm text-gray-500">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Trend Kebutuhan UMKM */}
      <section className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
        <h2 className="mb-4 text-xl font-bold text-gray-800">
          Tren Kebutuhan UMKM
        </h2>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {trendProblems.map((problem) => (
            <div
              key={problem}
              className="rounded-lg bg-blue-50 px-4 py-3 text-blue-700 font-medium"
            >
              {problem}
            </div>
          ))}
        </div>
      </section>

      {/* Aktivitas Terbaru */}
      <section className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
        <h2 className="mb-4 text-xl font-bold text-gray-800">
          Notifikasi Aktivitas Terbaru
        </h2>

        <ul className="space-y-3">
          {latestActivities.map((activity, index) => (
            <li
              key={index}
              className="rounded-lg border border-gray-100 bg-gray-50 px-4 py-3 text-gray-700"
            >
              {activity}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}