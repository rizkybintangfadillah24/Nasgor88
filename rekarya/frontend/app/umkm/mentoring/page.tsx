const mentoringList = [
  {
    product: "Sistem POS UMKM",
    mahasiswa: "Mahasiswa Demo",
    schedule: "20 Mei 2026, 10:00 WIB",
    progress: "75%",
    status: "ONGOING",
  },
  {
    product: "Website Toko Online",
    mahasiswa: "Mahasiswa Demo",
    schedule: "22 Mei 2026, 14:00 WIB",
    progress: "100%",
    status: "DONE",
  },
];

function getStatusBadge(status: string) {
  if (status === "DONE") {
    return (
      <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
        Sudah Selesai
      </span>
    );
  }

  return (
    <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
      Sedang Berjalan
    </span>
  );
}

export default function UmkmMentoringPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Pendampingan</h2>
        <p className="text-gray-500">
          Pantau progres implementasi dan jadwal pendampingan.
        </p>
      </div>

      <div className="grid gap-6">
        {mentoringList.map((item, index) => (
          <div
            key={index}
            className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {item.product}
                </h3>
                <p className="mt-1 text-gray-600">
                  Mahasiswa:{" "}
                  <span className="font-medium">{item.mahasiswa}</span>
                </p>
              </div>

              {getStatusBadge(item.status)}
            </div>

            <div className="mt-4 space-y-1 text-sm text-gray-600">
              <p>Jadwal: {item.schedule}</p>
              <p>Progress Implementasi: {item.progress}</p>
            </div>

            {item.status !== "DONE" && (
              <button className="mt-4 rounded-xl bg-blue-600 px-5 py-2.5 font-semibold text-white hover:bg-blue-700 transition">
                Tandai Selesai
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}