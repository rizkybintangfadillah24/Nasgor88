const collaborations = [
  {
    product: "Sistem POS UMKM",
    mahasiswa: "Mahasiswa Demo",
    status: "Disetujui",
    price: "Rp2.500.000",
  },
  {
    product: "Website Toko Online",
    mahasiswa: "Mahasiswa Demo",
    status: "Menunggu",
    price: "Rp1.500.000",
  },
];

export default function UmkmCollaborationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Kerja Sama</h2>
        <p className="text-gray-500">
          Pantau status pengajuan kerja sama dengan mahasiswa.
        </p>
      </div>

      <div className="grid gap-6">
        {collaborations.map((item, index) => (
          <div
            key={index}
            className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
          >
            <h3 className="text-lg font-semibold text-gray-800">
              {item.product}
            </h3>

            <p className="mt-2 text-gray-600">
              Mahasiswa:{" "}
              <span className="font-medium">{item.mahasiswa}</span>
            </p>

            <p className="mt-1 text-gray-600">
              Harga: <span className="font-medium">{item.price}</span>
            </p>

            <span className="mt-4 inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}