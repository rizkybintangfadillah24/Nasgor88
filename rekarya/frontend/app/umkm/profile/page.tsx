export default function UmkmProfilePage() {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-800">Profil UMKM</h2>
        <p className="mt-2 text-gray-500">
          Lengkapi informasi usaha agar rekomendasi produk lebih akurat.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Nama Usaha
            </label>
            <input
              type="text"
              defaultValue="UMKM Demo"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Bidang Usaha
            </label>
            <input
              type="text"
              defaultValue="Kuliner"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Nama Pemilik
            </label>
            <input
              type="text"
              defaultValue="Bapak Ahmad"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Nomor WhatsApp
            </label>
            <input
              type="text"
              defaultValue="081234567890"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="mt-6">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Deskripsi Usaha
          </label>
          <textarea
            rows={5}
            defaultValue="Usaha kuliner yang membutuhkan solusi digital untuk penjualan dan operasional."
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        <button className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 transition">
          Simpan Profil
        </button>
      </div>
    </div>
  );
}