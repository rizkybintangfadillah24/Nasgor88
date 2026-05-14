const mentoringRequests = [
  {
    title: "Pendampingan Implementasi POS",
    requester: "UMKM Demo",
    mentor: "Mahasiswa Demo",
    status: "Berlangsung",
  },
  {
    title: "Optimasi Website Toko Online",
    requester: "UMKM Maju Jaya",
    mentor: "Mahasiswa Informatika",
    status: "Menunggu Jadwal",
  },
  {
    title: "Digital Marketing Dasar",
    requester: "UMKM Sejahtera",
    mentor: "Mahasiswa Bisnis Digital",
    status: "Selesai",
  },
];

export default function AdminMentoringPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">
          Pendampingan
        </h2>
        <p className="text-gray-500">
          Monitor seluruh aktivitas mentoring dan konsultasi.
        </p>
      </div>

      <div className="grid gap-6">
        {mentoringRequests.map((item, index) => (
          <div
            key={index}
            className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
          >
            <h3 className="text-lg font-semibold text-gray-800">
              {item.title}
            </h3>

            <p className="mt-2 text-gray-600">
              UMKM: <span className="font-medium">{item.requester}</span>
            </p>

            <p className="mt-1 text-gray-600">
              Mentor: <span className="font-medium">{item.mentor}</span>
            </p>

            <p className="mt-1 text-gray-600">
              Status:{" "}
              <span className="font-semibold text-blue-600">
                {item.status}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}