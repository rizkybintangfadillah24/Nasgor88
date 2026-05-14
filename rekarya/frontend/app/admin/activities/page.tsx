const activities = [
  {
    time: "10 menit lalu",
    description: "Admin menyetujui produk 'Sistem POS UMKM'.",
  },
  {
    time: "30 menit lalu",
    description: "UMKM Baru mendaftar di platform.",
  },
  {
    time: "1 jam lalu",
    description: "Laporan bulanan berhasil dibuat.",
  },
  {
    time: "2 jam lalu",
    description: "Mahasiswa mengunggah produk baru.",
  },
];

export default function AdminActivitiesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">
          Aktivitas Platform
        </h2>
        <p className="text-gray-500">
          Pantau seluruh aktivitas penting dalam sistem.
        </p>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div
              key={index}
              className="rounded-xl bg-gray-50 p-4"
            >
              <p className="text-sm text-gray-500">{activity.time}</p>
              <p className="mt-1 text-gray-800">
                {activity.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}