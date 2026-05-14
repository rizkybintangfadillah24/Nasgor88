interface ProductDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductDetailPage(
  props: ProductDetailPageProps
) {
  const { id } = await props.params;

  const product = {
    id,
    title: 'Sistem Kasir UMKM',
    description:
      'Aplikasi kasir digital untuk membantu UMKM mengelola transaksi, stok, dan laporan penjualan.',
    technology: 'Next.js, Express.js, PostgreSQL',
    price: 'Rp 250.000',
    matchScore: 92,
    author: 'Budi Santoso',
    demoUrl: 'https://demo.rekarya.id',
    repositoryUrl: 'https://github.com/example/rekarya-product',
  };

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-5xl rounded-2xl bg-white p-8 shadow-sm">
        <div className="mb-6">
          <p className="mb-2 text-sm text-gray-500">Product ID: {id}</p>

          <h1 className="text-3xl font-bold text-gray-900">
            {product.title}
          </h1>

          <p className="mt-2 text-gray-600">
            Oleh: {product.author}
          </p>
        </div>

        <div className="mb-6 grid gap-6 md:grid-cols-2">
          <div className="rounded-xl bg-blue-50 p-4">
            <p className="text-sm text-gray-500">Harga</p>
            <p className="mt-1 text-2xl font-bold text-blue-600">
              {product.price}
            </p>
          </div>

          <div className="rounded-xl bg-green-50 p-4">
            <p className="text-sm text-gray-500">Match Score</p>
            <p className="mt-1 text-2xl font-bold text-green-600">
              {product.matchScore}%
            </p>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="mb-2 text-xl font-semibold text-gray-900">
            Deskripsi
          </h2>
          <p className="text-gray-600">{product.description}</p>
        </div>

        <div className="mb-6">
          <h2 className="mb-2 text-xl font-semibold text-gray-900">
            Teknologi
          </h2>
          <p className="text-gray-600">{product.technology}</p>
        </div>

        <div className="flex flex-wrap gap-4">
          <a
            href={product.demoUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Lihat Demo
          </a>

          <a
            href={product.repositoryUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border border-gray-300 px-5 py-3 font-semibold text-gray-700 hover:bg-gray-50"
          >
            Lihat Repository
          </a>
        </div>
      </div>
    </main>
  );
}