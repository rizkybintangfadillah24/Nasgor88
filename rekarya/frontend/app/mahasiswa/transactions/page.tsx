const transactions = [
  {
    invoice: "INV-001",
    amount: "Rp2.500.000",
    status: "Paid",
  },
  {
    invoice: "INV-002",
    amount: "Rp1.000.000",
    status: "Pending",
  },
];

export default function MahasiswaTransactionsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Transaksi</h2>
        <p className="text-gray-500">
          Riwayat pembayaran dan transaksi kerja sama.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                Invoice
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
            {transactions.map((item) => (
              <tr key={item.invoice} className="border-t border-gray-100">
                <td className="px-6 py-4 font-medium text-gray-800">
                  {item.invoice}
                </td>
                <td className="px-6 py-4 text-gray-600">
                  {item.amount}
                </td>
                <td className="px-6 py-4 text-blue-600 font-medium">
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