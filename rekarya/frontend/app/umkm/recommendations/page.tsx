import Link from 'next/link';

export default function UmkmRecommendationsPage() {
  const recommendations = [
    {
      id: 1,
      title: 'Sistem Kasir UMKM',
      price: 'Rp 250.000',
      matchScore: 92,
      matchLabel: 'Sangat Cocok',
      reasons: [
        'Sesuai dengan masalah utama usaha',
        'Harga sesuai budget',
        'Pendampingan tersedia secara online',
      ],
    },
    {
      id: 2,
      title: 'Aplikasi Inventori',
      price: 'Rp 200.000',
      matchScore: 84,
      matchLabel: 'Sangat Cocok',
      reasons: [
        'Fitur produk sesuai kebutuhan',
        'Durasi implementasi sesuai',
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Rekomendasi ReKarya Match
          </h1>
          <p className="mt-2 text-gray-600">
            Produk yang paling sesuai dengan kebutuhan usaha Anda.
          </p>
        </div>

        <div className="grid gap-6">
          {recommendations.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl bg-white p-6 shadow-sm"
            >
              <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900">
                    {item.title}
                  </h2>
                  <p className="mt-1 text-gray-600">{item.price}</p>
                </div>

                <div className="rounded-xl bg-green-50 px-4 py-3 text-center">
                  <p className="text-sm text-gray-500">Match Score</p>
                  <p className="text-2xl font-bold text-green-600">
                    {item.matchScore}%
                  </p>
                  <p className="text-sm font-medium text-green-700">
                    {item.matchLabel}
                  </p>
                </div>
              </div>

              <div className="mb-4">
                <h3 className="mb-2 font-semibold text-gray-900">
                  Alasan Rekomendasi
                </h3>

                <ul className="list-disc space-y-1 pl-5 text-gray-600">
                  {item.reasons.map((reason, index) => (
                    <li key={index}>{reason}</li>
                  ))}
                </ul>
              </div>

              <Link
                href={`/products/${item.id}`}
                className="inline-block rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
              >
                Lihat Detail Produk
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}