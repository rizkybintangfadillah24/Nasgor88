const reviews = [
  {
    from: "Kuliner Makmur",
    rating: 5,
    comment: "Produk sangat membantu digitalisasi usaha kami.",
  },
  {
    from: "Batik Nusantara",
    rating: 4,
    comment: "Kolaborasi berjalan baik dan responsif.",
  },
];

export default function MahasiswaReviewsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Ulasan</h2>
        <p className="text-gray-500">
          Penilaian dan komentar dari UMKM.
        </p>
      </div>

      <div className="grid gap-6">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800">
                {review.from}
              </h3>
              <span className="text-yellow-500 font-semibold">
                {"⭐".repeat(review.rating)}
              </span>
            </div>

            <p className="mt-3 text-gray-600">
              {review.comment}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}