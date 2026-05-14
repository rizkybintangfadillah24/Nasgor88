const stats = [
  {
    title: "Total Pengguna",
    value: "128",
    description: "Mahasiswa, UMKM, dan admin terdaftar.",
  },
  {
    title: "Produk Pending",
    value: "14",
    description: "Menunggu proses verifikasi.",
  },
  {
    title: "Kerja Sama Aktif",
    value: "23",
    description: "Kolaborasi yang sedang berjalan.",
  },
  {
    title: "Transaksi Bulan Ini",
    value: "Rp12.500.000",
    description: "Total transaksi yang tercatat.",
  },
];

const activities = [
  "Admin menyetujui produk 'Sistem POS UMKM'.",
  "Pengguna baru mendaftar sebagai UMKM.",
  "Laporan bulanan berhasil dihasilkan.",
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
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