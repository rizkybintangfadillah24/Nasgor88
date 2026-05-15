const summaryCards = [
  {
    title: "Jumlah Produk",
    value: "-",
    description: "Total produk tugas akhir yang sudah diunggah.",
    label: "Produk",
  },
  {
    title: "Status Produk",
    value: "Pending: - Approved: -",
    description: "Status produk yang menunggu atau sudah disetujui admin.",
    label: "Verifikasi",
  },
  {
    title: "Pengajuan Baru",
    value: "-",
    description: "Pengajuan kerja sama baru dari UMKM.",
    label: "Kerja Sama",
  },
  {
    title: "Status Data Diri",
    value: "Pending",
    description: "Status verifikasi profil mahasiswa oleh admin.",
    label: "Akun",
  },
];

const trends = [
  "Pemasaran Digital Lemah",
  "Penjualan Belum Online",
  "Pencatatan Keuangan Manual",
  "Stok Tidak Tertata",
  "Operasional Tidak Efisien",
  "Analisis Berbasis Data",
];

export default function MahasiswaDashboardPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          borderRadius: "28px",
          border: "1px solid rgba(52, 211, 153, 0.22)",
          background:
            "radial-gradient(circle at top right, rgba(16,185,129,0.20), transparent 35%), linear-gradient(135deg, #070B19 0%, #0B1226 60%, #06251f 100%)",
          padding: "34px",
          color: "#ffffff",
          boxShadow: "0 18px 40px rgba(0, 0, 0, 0.24)",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            borderRadius: "999px",
            border: "1px solid rgba(52, 211, 153, 0.35)",
            background: "rgba(16, 185, 129, 0.12)",
            padding: "9px 16px",
            fontSize: "12px",
            fontWeight: 900,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#6ee7b7",
          }}
        >
          Dashboard Mahasiswa
        </div>

        <h1
          style={{
            marginTop: "22px",
            maxWidth: "820px",
            fontSize: "44px",
            lineHeight: 1.05,
            fontWeight: 900,
            letterSpacing: "-0.04em",
            color: "#ffffff",
          }}
        >
          Dashboard Ringkasan
        </h1>

        <p
          style={{
            marginTop: "18px",
            maxWidth: "780px",
            fontSize: "15px",
            lineHeight: 1.8,
            color: "#cbd5e1",
          }}
        >
          Pantau jumlah produk, status produk, pengajuan kerja sama baru,
          status data diri, tren kebutuhan UMKM, dan notifikasi aktivitas
          terbaru pada akun.
        </p>

        <div
          style={{
            marginTop: "28px",
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: "14px",
          }}
        >
          <HeroInfo title="Fokus Utama" value="Produk Tugas Akhir" />
          <HeroInfo title="Alur" value="Upload → Verifikasi → Kerja Sama" />
          <HeroInfo title="Status Akun" value="Menunggu Verifikasi" active />
        </div>
      </section>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
          gap: "18px",
        }}
      >
        {summaryCards.map((card) => (
          <div
            key={card.title}
            style={{
              borderRadius: "22px",
              border: "1px solid rgba(255, 255, 255, 0.10)",
              background:
                "linear-gradient(180deg, rgba(15, 23, 42, 0.96) 0%, rgba(8, 13, 29, 0.98) 100%)",
              padding: "22px",
              boxShadow: "0 12px 30px rgba(0, 0, 0, 0.22)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                gap: "12px",
              }}
            >
              <p
                style={{
                  fontSize: "14px",
                  fontWeight: 900,
                  color: "#cbd5e1",
                }}
              >
                {card.title}
              </p>

              <span
                style={{
                  borderRadius: "999px",
                  background: "rgba(16, 185, 129, 0.13)",
                  border: "1px solid rgba(52, 211, 153, 0.22)",
                  padding: "5px 10px",
                  fontSize: "11px",
                  fontWeight: 900,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "#6ee7b7",
                }}
              >
                {card.label}
              </span>
            </div>

            <h2
              style={{
                marginTop: "18px",
                fontSize: card.value.length > 12 ? "22px" : "34px",
                lineHeight: 1.1,
                fontWeight: 900,
                color: "#ffffff",
              }}
            >
              {card.value}
            </h2>

            <p
              style={{
                marginTop: "12px",
                fontSize: "13px",
                lineHeight: 1.7,
                color: "#94a3b8",
              }}
            >
              {card.description}
            </p>

            <div
              style={{
                marginTop: "18px",
                height: "6px",
                borderRadius: "999px",
                background: "rgba(255, 255, 255, 0.08)",
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
        ))}
      </section>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "1.15fr 0.85fr",
          gap: "18px",
        }}
      >
        <div
          style={{
            borderRadius: "22px",
            border: "1px solid rgba(255, 255, 255, 0.10)",
            background:
              "linear-gradient(180deg, rgba(15, 23, 42, 0.96) 0%, rgba(8, 13, 29, 0.98) 100%)",
            padding: "24px",
            boxShadow: "0 12px 30px rgba(0, 0, 0, 0.22)",
          }}
        >
          <p
            style={{
              fontSize: "13px",
              fontWeight: 900,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#6ee7b7",
            }}
          >
            Tren UMKM
          </p>

          <h2
            style={{
              marginTop: "10px",
              fontSize: "24px",
              fontWeight: 900,
              color: "#ffffff",
            }}
          >
            Tren Kebutuhan UMKM
          </h2>

          <p
            style={{
              marginTop: "8px",
              fontSize: "14px",
              lineHeight: 1.7,
              color: "#94a3b8",
            }}
          >
            Top ranking masalah utama UMKM yang menjadi acuan pengembangan
            produk tugas akhir.
          </p>

          <div
            style={{
              marginTop: "20px",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "12px",
            }}
          >
            {trends.map((trend, index) => (
              <div
                key={trend}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "12px",
                  borderRadius: "16px",
                  border: "1px solid rgba(255, 255, 255, 0.10)",
                  background: "rgba(255, 255, 255, 0.045)",
                  padding: "14px 16px",
                }}
              >
                <span
                  style={{
                    fontSize: "14px",
                    fontWeight: 800,
                    color: "#e2e8f0",
                  }}
                >
                  {trend}
                </span>

                <span
                  style={{
                    borderRadius: "999px",
                    background: "rgba(16, 185, 129, 0.15)",
                    padding: "5px 10px",
                    fontSize: "12px",
                    fontWeight: 900,
                    color: "#6ee7b7",
                  }}
                >
                  #{index + 1}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            borderRadius: "22px",
            border: "1px solid rgba(255, 255, 255, 0.10)",
            background:
              "linear-gradient(180deg, rgba(15, 23, 42, 0.96) 0%, rgba(8, 13, 29, 0.98) 100%)",
            padding: "24px",
            boxShadow: "0 12px 30px rgba(0, 0, 0, 0.22)",
          }}
        >
          <p
            style={{
              fontSize: "13px",
              fontWeight: 900,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#6ee7b7",
            }}
          >
            Aktivitas
          </p>

          <h2
            style={{
              marginTop: "10px",
              fontSize: "24px",
              fontWeight: 900,
              color: "#ffffff",
            }}
          >
            Notifikasi
          </h2>

          <p
            style={{
              marginTop: "8px",
              fontSize: "14px",
              lineHeight: 1.7,
              color: "#94a3b8",
            }}
          >
            Menampilkan informasi aktivitas terbaru pada akun mahasiswa.
          </p>

          <div
            style={{
              marginTop: "20px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            <NotificationCard
              title="Belum ada notifikasi terbaru."
              text="Aktivitas seperti pengajuan kerja sama, update status produk, dan verifikasi akun akan tampil di sini."
            />

            <NotificationCard
              title="Lengkapi data diri"
              text="Pastikan profil dan dokumen verifikasi lengkap agar admin dapat menyetujui akun."
              emerald
            />

            <div
              style={{
                borderRadius: "16px",
                border: "1px solid rgba(52, 211, 153, 0.18)",
                background: "#060A18",
                padding: "16px",
              }}
            >
              <p
                style={{
                  fontSize: "14px",
                  fontWeight: 900,
                  color: "#ffffff",
                }}
              >
                Rekomendasi berikutnya
              </p>
              <p
                style={{
                  marginTop: "6px",
                  fontSize: "14px",
                  lineHeight: 1.7,
                  color: "#94a3b8",
                }}
              >
                Upload produk tugas akhir agar dapat masuk proses verifikasi dan
                tampil di katalog setelah approved.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function HeroInfo({
  title,
  value,
  active = false,
}: {
  title: string;
  value: string;
  active?: boolean;
}) {
  return (
    <div
      style={{
        borderRadius: "18px",
        border: active
          ? "1px solid rgba(52, 211, 153, 0.35)"
          : "1px solid rgba(255,255,255,0.10)",
        background: active
          ? "rgba(16, 185, 129, 0.12)"
          : "rgba(255,255,255,0.06)",
        padding: "16px",
      }}
    >
      <p
        style={{
          fontSize: "11px",
          fontWeight: 900,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: active ? "#6ee7b7" : "#94a3b8",
        }}
      >
        {title}
      </p>
      <p
        style={{
          marginTop: "8px",
          fontSize: "15px",
          fontWeight: 900,
          color: "#ffffff",
        }}
      >
        {value}
      </p>
    </div>
  );
}

function NotificationCard({
  title,
  text,
  emerald = false,
}: {
  title: string;
  text: string;
  emerald?: boolean;
}) {
  return (
    <div
      style={{
        borderRadius: "16px",
        border: emerald
          ? "1px solid rgba(52, 211, 153, 0.22)"
          : "1px solid rgba(255, 255, 255, 0.10)",
        background: emerald
          ? "rgba(16, 185, 129, 0.12)"
          : "rgba(255, 255, 255, 0.045)",
        padding: "16px",
      }}
    >
      <p
        style={{
          fontSize: "14px",
          fontWeight: 900,
          color: emerald ? "#6ee7b7" : "#ffffff",
        }}
      >
        {title}
      </p>
      <p
        style={{
          marginTop: "6px",
          fontSize: "14px",
          lineHeight: 1.7,
          color: emerald ? "#a7f3d0" : "#94a3b8",
        }}
      >
        {text}
      </p>
    </div>
  );
}