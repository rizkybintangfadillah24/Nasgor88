export default function UmkmSearchPage() {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-800">Cari Produk</h2>
        <p className="mt-2 text-gray-500">
          Temukan solusi digital dari produk tugas akhir mahasiswa melalui
          ReKarya Match.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Keyword Bidang Usaha
            </label>
            <input
              type="text"
              placeholder="Contoh: Kuliner"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Masalah Utama
            </label>
            <select className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500">
              <option>Pemasaran Digital Lemah</option>
              <option>Penjualan Belum Online</option>
              <option>Pencatatan Keuangan Manual</option>
              <option>Stok Tidak Tertata</option>
              <option>Operasional Tidak Efisien</option>
              <option>Analisis Berbasis Data</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Budget Minimum
            </label>
            <input
              type="number"
              placeholder="200000"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Budget Maksimum
            </label>
            <input
              type="number"
              placeholder="250000"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <button className="mt-8 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 transition">
          Cari Solusi
        </button>
      </div>
    </div>
  );
}