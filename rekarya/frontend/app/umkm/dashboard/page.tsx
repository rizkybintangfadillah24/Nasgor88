const stats = [
  {
    title: "Kebutuhan Aktif",
    value: "4",
    description: "Kebutuhan digital yang sedang dipublikasikan.",
  },
  {
    title: "Produk Tersimpan",
    value: "12",
    description: "Produk mahasiswa yang disimpan ke shortlist.",
  },
  {
    title: "Kerja Sama Aktif",
    value: "3",
    description: "Kolaborasi yang sedang berjalan.",
  },
  {
    title: "Transaksi Pending",
    value: "1",
    description: "Pembayaran yang menunggu konfirmasi.",
  },
];

const needs = [
  "Website Toko Online",
  "Sistem POS",
  "Dashboard Keuangan",
  "Pemasaran Digital",
];

const activities = [
  "Mengajukan kebutuhan 'Website Toko Online'.",
  "Menyetujui kerja sama dengan Mahasiswa Demo.",
  "Menjadwalkan sesi mentoring produk.",
];

export default function UmkmDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Statistik */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Ringkasan Dashboard
        </h2>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.title}
              className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100"
            >
              <p className="text-gray-500">{stat.title}</p>
              <h3 className="mt-2 text-4xl font-bold text-blue-600">
                {stat.value}
              </h3>
              <p className="mt-3 text-sm text-gray-600">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Kebutuhan Usaha */}
      <section className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800">
          Kebutuhan Digital Prioritas
        </h2>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {needs.map((need) => (
            <div
              key={need}
              className="rounded-xl bg-blue-50 px-4 py-3 text-blue-700 font-medium"
            >
              {need}
            </div>
          ))}
        </div>
      </section>

      {/* Aktivitas */}
      <section className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800">
          Aktivitas Terbaru
        </h2>

        <div className="mt-6 space-y-3">
          {activities.map((activity, index) => (
            <div
              key={index}
              className="rounded-xl bg-gray-50 px-4 py-3 text-gray-700"
            >
              {activity}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}