export default function UmkmCollaborationsPage() {
  const collaborations = [
    {
      id: 1,
      productTitle: 'Sistem Kasir UMKM',
      studentName: 'Budi Santoso',
      status: 'In Progress',
      lastUpdate: '14 Mei 2026',
    },
    {
      id: 2,
      productTitle: 'Aplikasi Inventori',
      studentName: 'Siti Rahma',
      status: 'Completed',
      lastUpdate: '10 Mei 2026',
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">
          Kolaborasi Saya
        </h1>

        <p className="mb-6 text-gray-600">
          Daftar kerja sama antara UMKM dan mahasiswa.
        </p>

        <div className="grid gap-6">
          {collaborations.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl bg-white p-6 shadow-sm"
            >
              <h2 className="text-2xl font-semibold text-gray-900">
                {item.productTitle}
              </h2>

              <p className="mt-2 text-gray-600">
                Mahasiswa: {item.studentName}
              </p>

              <p className="mt-1 text-gray-600">
                Update Terakhir: {item.lastUpdate}
              </p>

              <span className="mt-4 inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}