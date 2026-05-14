'use client';

import { FormEvent, useState } from 'react';

export default function CreateProductPage() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    technology: '',
    demoUrl: '',
    repositoryUrl: '',
  });

  function updateField(name: string, value: string) {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    alert('Produk berhasil disimpan (simulasi).');

    setForm({
      title: '',
      description: '',
      technology: '',
      demoUrl: '',
      repositoryUrl: '',
    });
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow-sm">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">
          Upload Produk
        </h1>

        <p className="mb-6 text-gray-600">
          Tambahkan produk tugas akhir Anda.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Judul Produk"
            value={form.title}
            onChange={(e) => updateField('title', e.target.value)}
            required
            className="w-full rounded-lg border px-4 py-3"
          />

          <textarea
            placeholder="Deskripsi Produk"
            value={form.description}
            onChange={(e) => updateField('description', e.target.value)}
            required
            rows={5}
            className="w-full rounded-lg border px-4 py-3"
          />

          <input
            type="text"
            placeholder="Teknologi (contoh: Next.js, Express.js)"
            value={form.technology}
            onChange={(e) => updateField('technology', e.target.value)}
            required
            className="w-full rounded-lg border px-4 py-3"
          />

          <input
            type="url"
            placeholder="Demo URL"
            value={form.demoUrl}
            onChange={(e) => updateField('demoUrl', e.target.value)}
            className="w-full rounded-lg border px-4 py-3"
          />

          <input
            type="url"
            placeholder="Repository URL"
            value={form.repositoryUrl}
            onChange={(e) =>
              updateField('repositoryUrl', e.target.value)
            }
            className="w-full rounded-lg border px-4 py-3"
          />

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Simpan Produk
          </button>
        </form>
      </div>
    </main>
  );
}