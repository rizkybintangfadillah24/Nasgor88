const reviewItems: {
  umkm: string;
  product: string;
  rating: number;
  comment: string;
  date: string;
}[] = [];

const cardStyle: React.CSSProperties = {
  borderRadius: "24px",
  border: "1px solid rgba(255,255,255,0.08)",
  background:
    "linear-gradient(180deg, rgba(15,23,42,0.96) 0%, rgba(8,13,29,0.98) 100%)",
  boxShadow: "0 16px 40px rgba(0,0,0,0.24)",
};

const labelStyle: React.CSSProperties = {
  fontSize: "12px",
  fontWeight: 900,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "#94a3b8",
};

export default function MahasiswaReviewsPage() {
  const totalReviews = reviewItems.length;
  const averageRating =
    totalReviews === 0
      ? "-"
      : (
          reviewItems.reduce((total, item) => total + item.rating, 0) /
          totalReviews
        ).toFixed(1);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "22px",
      }}
    >
      <section
        style={{
          ...cardStyle,
          overflow: "hidden",
          padding: "30px",
          background:
            "radial-gradient(circle at top right, rgba(16,185,129,0.18), transparent 30%), linear-gradient(135deg, #070B19 0%, #0B1226 60%, #06251f 100%)",
          border: "1px solid rgba(52,211,153,0.18)",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            padding: "8px 14px",
            borderRadius: "999px",
            border: "1px solid rgba(52,211,153,0.30)",
            background: "rgba(16,185,129,0.10)",
            color: "#6ee7b7",
            fontSize: "12px",
            fontWeight: 900,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
          }}
        >
          Ulasan
        </div>

        <h1
          style={{
            marginTop: "18px",
            fontSize: "34px",
            fontWeight: 900,
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            color: "#ffffff",
          }}
        >
          Rating dan Komentar UMKM
        </h1>

        <p
          style={{
            marginTop: "14px",
            maxWidth: "820px",
            fontSize: "15px",
            lineHeight: 1.8,
            color: "#cbd5e1",
          }}
        >
          Lihat penilaian, rating, dan komentar dari UMKM terhadap produk tugas
          akhir serta proses kerja sama yang sudah selesai.
        </p>
      </section>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "18px",
        }}
      >
        <SummaryCard
          title="Total Ulasan"
          value={String(totalReviews)}
          description="Jumlah ulasan yang diterima dari UMKM."
        />

        <SummaryCard
          title="Rata-rata Rating"
          value={averageRating}
          description="Nilai rata-rata dari seluruh rating UMKM."
        />

        <SummaryCard
          title="Status"
          value={totalReviews === 0 ? "Belum Ada" : "Tersedia"}
          description="Ulasan akan tampil setelah kerja sama selesai."
        />
      </section>

      <section
        style={{
          ...cardStyle,
          padding: "26px",
        }}
      >
        <SectionHeading
          title="Daftar Ulasan"
          subtitle="Menampilkan rating dan komentar yang diberikan UMKM."
        />

        <div
          style={{
            marginTop: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          {reviewItems.length === 0 && (
            <EmptyState
              title="Belum ada ulasan dari UMKM."
              description="Rating dan komentar akan muncul setelah UMKM menyelesaikan kerja sama dan memberikan penilaian terhadap produk mahasiswa."
            />
          )}

          {reviewItems.map((item) => (
            <div
              key={`${item.umkm}-${item.product}`}
              style={{
                borderRadius: "20px",
                border: "1px solid rgba(255,255,255,0.08)",
                background: "rgba(255,255,255,0.035)",
                padding: "20px",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 0.7fr",
                  gap: "18px",
                  alignItems: "start",
                }}
              >
                <InfoBlock label="Nama UMKM" value={item.umkm} />
                <InfoBlock label="Nama Produk" value={item.product} />
                <InfoBlock
                  label="Rating"
                  value={`${item.rating}/5`}
                  emerald
                />
              </div>

              <div
                style={{
                  marginTop: "18px",
                  borderRadius: "16px",
                  border: "1px solid rgba(255,255,255,0.08)",
                  background: "rgba(255,255,255,0.035)",
                  padding: "16px",
                }}
              >
                <p style={labelStyle}>Komentar</p>
                <p
                  style={{
                    marginTop: "8px",
                    fontSize: "14px",
                    lineHeight: 1.8,
                    color: "#cbd5e1",
                  }}
                >
                  {item.comment}
                </p>
              </div>

              <p
                style={{
                  marginTop: "14px",
                  fontSize: "12px",
                  color: "#64748b",
                }}
              >
                Diberikan pada {item.date}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function SectionHeading({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div>
      <h2
        style={{
          fontSize: "30px",
          fontWeight: 900,
          lineHeight: 1.1,
          letterSpacing: "-0.02em",
          color: "#ffffff",
        }}
      >
        {title}
      </h2>

      <p
        style={{
          marginTop: "8px",
          fontSize: "14px",
          lineHeight: 1.7,
          color: "#94a3b8",
        }}
      >
        {subtitle}
      </p>
    </div>
  );
}

function SummaryCard({
  title,
  value,
  description,
}: {
  title: string;
  value: string;
  description: string;
}) {
  return (
    <div
      style={{
        borderRadius: "22px",
        border: "1px solid rgba(255,255,255,0.08)",
        background:
          "linear-gradient(180deg, rgba(15,23,42,0.96) 0%, rgba(8,13,29,0.98) 100%)",
        padding: "22px",
        boxShadow: "0 12px 30px rgba(0,0,0,0.22)",
      }}
    >
      <p
        style={{
          fontSize: "13px",
          fontWeight: 900,
          color: "#94a3b8",
        }}
      >
        {title}
      </p>

      <h3
        style={{
          marginTop: "16px",
          fontSize: "32px",
          fontWeight: 900,
          color: "#ffffff",
        }}
      >
        {value}
      </h3>

      <p
        style={{
          marginTop: "10px",
          fontSize: "13px",
          lineHeight: 1.7,
          color: "#94a3b8",
        }}
      >
        {description}
      </p>

      <div
        style={{
          marginTop: "18px",
          height: "6px",
          borderRadius: "999px",
          background: "rgba(255,255,255,0.08)",
        }}
      >
        <div
          style={{
            height: "6px",
            width: "38%",
            borderRadius: "999px",
            background: "#10b981",
          }}
        />
      </div>
    </div>
  );
}

function InfoBlock({
  label,
  value,
  emerald = false,
}: {
  label: string;
  value: string;
  emerald?: boolean;
}) {
  return (
    <div>
      <p style={labelStyle}>{label}</p>

      <h3
        style={{
          marginTop: "8px",
          fontSize: "17px",
          fontWeight: 900,
          color: emerald ? "#6ee7b7" : "#ffffff",
        }}
      >
        {value}
      </h3>
    </div>
  );
}

function EmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div
      style={{
        borderRadius: "20px",
        border: "1px dashed rgba(52,211,153,0.28)",
        background: "rgba(16,185,129,0.06)",
        padding: "24px",
      }}
    >
      <p
        style={{
          fontSize: "16px",
          fontWeight: 900,
          color: "#ffffff",
        }}
      >
        {title}
      </p>

      <p
        style={{
          marginTop: "8px",
          maxWidth: "760px",
          fontSize: "14px",
          lineHeight: 1.7,
          color: "#94a3b8",
        }}
      >
        {description}
      </p>
    </div>
  );
}