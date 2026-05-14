const mentoringSessions = [
  {
    mentor: "Budi Santoso",
    topic: "Strategi Go-To-Market",
    schedule: "15 Mei 2026, 14:00 WIB",
  },
  {
    mentor: "Siti Rahma",
    topic: "Optimasi UI/UX Produk",
    schedule: "18 Mei 2026, 10:00 WIB",
  },
];

export default function MahasiswaMentoringPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Pendampingan</h2>
        <p className="text-gray-500">
          Jadwal sesi mentoring dan pendampingan produk.
        </p>
      </div>

      <div className="grid gap-6">
        {mentoringSessions.map((session, index) => (
          <div
            key={index}
            className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
          >
            <h3 className="text-lg font-semibold text-gray-800">
              {session.topic}
            </h3>
            <p className="mt-2 text-gray-600">
              Mentor: <span className="font-medium">{session.mentor}</span>
            </p>
            <p className="mt-1 text-sm text-blue-600">
              Jadwal: {session.schedule}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}