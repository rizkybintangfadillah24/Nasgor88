const users = [
  {
    name: "Mahasiswa Demo",
    email: "mahasiswa@rekarya.com",
    role: "Mahasiswa",
    status: "Aktif",
  },
  {
    name: "UMKM Demo",
    email: "umkm@rekarya.com",
    role: "UMKM",
    status: "Aktif",
  },
  {
    name: "Administrator",
    email: "admin@rekarya.com",
    role: "Admin",
    status: "Aktif",
  },
];

export default function AdminUsersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">
          Manajemen Pengguna
        </h2>
        <p className="text-gray-500">
          Kelola akun mahasiswa, UMKM, dan administrator.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                Nama
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                Email
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                Role
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index} className="border-t border-gray-100">
                <td className="px-6 py-4 font-medium text-gray-800">
                  {user.name}
                </td>
                <td className="px-6 py-4 text-gray-600">
                  {user.email}
                </td>
                <td className="px-6 py-4 text-gray-600">
                  {user.role}
                </td>
                <td className="px-6 py-4 font-medium text-green-600">
                  {user.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}