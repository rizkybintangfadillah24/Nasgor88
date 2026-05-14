const transactions = [
  {
    product: "Sistem POS UMKM",
    amount: "Rp2.500.000",
    status: "Sudah",
  },
  {
    product: "Website Toko Online",
    amount: "Rp1.500.000",
    status: "Belum",
  },
];

export default function UmkmTransactionsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Transaksi</h2>
        <p className="text-gray-500">
          Riwayat pembayaran dan status transaksi.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                Produk
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                Nominal
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((item, index) => (
              <tr key={index} className="border-t border-gray-100">
                <td className="px-6 py-4 font-medium text-gray-800">
                  {item.product}
                </td>
                <td className="px-6 py-4 text-gray-600">
                  {item.amount}
                </td>
                <td className="px-6 py-4 font-medium text-blue-600">
                  {item.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}