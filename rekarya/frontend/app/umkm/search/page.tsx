'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function UmkmSearchPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    businessType: '',
    mainProblem: '',
    budget: '',
    implementationTime: '',
  });

  function updateField(name: string, value: string) {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    alert('Pencarian rekomendasi dimulai (simulasi).');

    router.push('/umkm/recommendations');
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow-sm">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">
          Cari Solusi Digital
        </h1>

        <p className="mb-6 text-gray-600">
          Isi kebutuhan usaha Anda untuk mendapatkan rekomendasi terbaik.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Jenis Usaha"
            value={form.businessType}
            onChange={(e) => updateField('businessType', e.target.value)}
            required
            className="w-full rounded-lg border px-4 py-3"
          />

          <textarea
            placeholder="Masalah Utama Usaha"
            value={form.mainProblem}
            onChange={(e) => updateField('mainProblem', e.target.value)}
            rows={4}
            required
            className="w-full rounded-lg border px-4 py-3"
          />

          <input
            type="text"
            placeholder="Budget"
            value={form.budget}
            onChange={(e) => updateField('budget', e.target.value)}
            className="w-full rounded-lg border px-4 py-3"
          />

          <input
            type="text"
            placeholder="Waktu Implementasi"
            value={form.implementationTime}
            onChange={(e) =>
              updateField('implementationTime', e.target.value)
            }
            className="w-full rounded-lg border px-4 py-3"
          />

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Cari Rekomendasi
          </button>
        </form>
      </div>
    </main>
  );
}