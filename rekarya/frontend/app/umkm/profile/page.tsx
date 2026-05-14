'use client';

import { FormEvent, useState } from 'react';

export default function UmkmProfilePage() {
  const [form, setForm] = useState({
    businessName: '',
    businessType: '',
    location: '',
    description: '',
  });

  function updateField(name: string, value: string) {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    alert('Profil UMKM berhasil disimpan (simulasi).');
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow-sm">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">
          Profil UMKM
        </h1>

        <p className="mb-6 text-gray-600">
          Lengkapi profil usaha Anda.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Nama Usaha"
            value={form.businessName}
            onChange={(e) =>
              updateField('businessName', e.target.value)
            }
            required
            className="w-full rounded-lg border px-4 py-3"
          />

          <input
            type="text"
            placeholder="Jenis Usaha"
            value={form.businessType}
            onChange={(e) =>
              updateField('businessType', e.target.value)
            }
            required
            className="w-full rounded-lg border px-4 py-3"
          />

          <input
            type="text"
            placeholder="Lokasi"
            value={form.location}
            onChange={(e) =>
              updateField('location', e.target.value)
            }
            className="w-full rounded-lg border px-4 py-3"
          />

          <textarea
            placeholder="Deskripsi Usaha"
            value={form.description}
            onChange={(e) =>
              updateField('description', e.target.value)
            }
            rows={4}
            className="w-full rounded-lg border px-4 py-3"
          />

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Simpan Profil
          </button>
        </form>
      </div>
    </main>
  );
}