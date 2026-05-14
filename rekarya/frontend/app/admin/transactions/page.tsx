const transactions = [
  {
    code: "TRX-001",
    user: "UMKM Demo",
    amount: "Rp2.500.000",
    status: "Paid",
  },
  {
    code: "TRX-002",
    user: "UMKM Maju Jaya",
    amount: "Rp1.750.000",
    status: "Pending",
  },
  {
    code: "TRX-003",
    user: "UMKM Sejahtera",
    amount: "Rp3.200.000",
    status: "Paid",
  },
];

export default function AdminTransactionsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Transaksi</h2>
        <p className="text-gray-500">
          Monitor seluruh transaksi yang terjadi.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                Kode
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                Pengguna
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
            {transactions.map((transaction, index) => (
              <tr key={index} className="border-t border-gray-100">
                <td className="px-6 py-4 font-medium text-gray-800">
                  {transaction.code}
                </td>
                <td className="px-6 py-4 text-gray-600">
                  {transaction.user}
                </td>
                <td className="px-6 py-4 text-gray-600">
                  {transaction.amount}
                </td>
                <td
                  className={`px-6 py-4 font-medium ${
                    transaction.status === "Paid"
                      ? "text-green-600"
                      : "text-yellow-600"
                  }`}
                >
                  {transaction.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}