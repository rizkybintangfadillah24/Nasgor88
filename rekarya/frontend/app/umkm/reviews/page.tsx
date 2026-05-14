const reviews = [
  {
    product: "Sistem POS UMKM",
    mahasiswa: "Mahasiswa Demo",
    rating: 5,
    comment:
      "Produk sangat membantu operasional usaha dan pendampingannya sangat baik.",
  },
  {
    product: "Website Toko Online",
    mahasiswa: "Mahasiswa Demo",
    rating: 4,
    comment:
      "Implementasi berjalan lancar dan fitur sesuai kebutuhan usaha.",
  },
];

export default function UmkmReviewsPage() {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-800">Ulasan</h2>
        <p className="mt-2 text-gray-500">
          Berikan penilaian dan komentar terhadap produk yang telah digunakan.
        </p>

        <div className="mt-8 grid gap-6">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="rounded-2xl border border-gray-100 p-6"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {review.product}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Mahasiswa: {review.mahasiswa}
                  </p>
                </div>

                <span className="text-xl">
                  {"⭐".repeat(review.rating)}
                </span>
              </div>

              <p className="mt-4 text-gray-600">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}