const collaborations = [
  {
    umkm: "Kuliner Makmur",
    product: "Sistem POS UMKM",
    status: "Menunggu Konfirmasi",
  },
  {
    umkm: "Batik Nusantara",
    product: "Website Toko Online",
    status: "Sedang Berjalan",
  },
];

export default function MahasiswaCollaborationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Kerja Sama</h2>
        <p className="text-gray-500">
          Daftar pengajuan dan proyek kerja sama dengan UMKM.
        </p>
      </div>

      <div className="grid gap-6">
        {collaborations.map((item, index) => (
          <div
            key={index}
            className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
          >
            <h3 className="text-lg font-semibold text-gray-800">
              {item.umkm}
            </h3>
            <p className="mt-2 text-gray-600">
              Produk: <span className="font-medium">{item.product}</span>
            </p>
            <p className="mt-1 text-sm text-blue-600 font-medium">
              Status: {item.status}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}