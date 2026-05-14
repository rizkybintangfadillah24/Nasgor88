export default function MahasiswaProfilePage() {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
        <h2 className="mb-2 text-2xl font-bold text-gray-800">
          Profil Mahasiswa
        </h2>
        <p className="mb-8 text-gray-500">
          Lengkapi data diri agar dapat diverifikasi admin.
        </p>

        <form className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Nama Lengkap
            </label>
            <input
              type="text"
              defaultValue="Mahasiswa Demo"
              className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              NIM
            </label>
            <input
              type="text"
              defaultValue="2210112345"
              className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Program Studi
            </label>
            <input
              type="text"
              defaultValue="Teknik Informatika"
              className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Universitas
            </label>
            <input
              type="text"
              defaultValue="Universitas Demo"
              className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Bio Singkat
            </label>
            <textarea
              rows={4}
              defaultValue="Mahasiswa yang fokus mengembangkan solusi digital untuk UMKM."
              className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <div className="md:col-span-2">
            <button
              type="button"
              className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Simpan Profil
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}