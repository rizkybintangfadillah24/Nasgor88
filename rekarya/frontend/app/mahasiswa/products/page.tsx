"use client";

import { useEffect, useState } from "react";
import type { ChangeEvent, CSSProperties } from "react";

type ProductForm = {
  title: string;
  category: string;
  description: string;
  problem: string;
  targetUmkm: string;
  mainFeature: string;
  detailFeature: string;
  technology: string;
  trainingDuration: string;
  mentoringMethod: string;
  price: string;
};

type ProductItem = {
  id: number | string;
  title: string;
  category: string;
  description?: string;
  mainProblem?: string;
  problemDetail?: string;
  targetBusiness?: string;
  mainFeatures?: string;
  featureDetail?: string;
  technology?: string;
  trainingDuration?: number | string;
  mentoringMethod?: string;
  price: number | string;
  status: string;
};

type AlertType = "success" | "error" | "warning" | "info";

type ToastState = {
  type: AlertType;
  title: string;
  message: string;
};

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";

const getAuthToken = () => {
  if (typeof window === "undefined") return null;

  return (
    localStorage.getItem("rekarya_token") ||
    localStorage.getItem("token") ||
    localStorage.getItem("accessToken")
  );
};

const cardStyle: CSSProperties = {
  borderRadius: "24px",
  border: "1px solid rgba(255,255,255,0.08)",
  background:
    "linear-gradient(180deg, rgba(15,23,42,0.96) 0%, rgba(8,13,29,0.98) 100%)",
  boxShadow: "0 16px 40px rgba(0,0,0,0.24)",
};

const labelStyle: CSSProperties = {
  display: "block",
  marginBottom: "8px",
  fontSize: "13px",
  fontWeight: 800,
  color: "#cbd5e1",
};

const inputStyle: CSSProperties = {
  width: "100%",
  padding: "14px 16px",
  borderRadius: "14px",
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(255,255,255,0.04)",
  color: "#ffffff",
  fontSize: "14px",
  outline: "none",
  boxSizing: "border-box",
};

const textareaStyle: CSSProperties = {
  ...inputStyle,
  minHeight: "120px",
  resize: "vertical",
  lineHeight: 1.6,
};

const selectStyle: CSSProperties = {
  ...inputStyle,
};

const formatPrice = (price: number | string) => {
  const numericPrice = Number(price);

  if (Number.isNaN(numericPrice)) {
    return String(price);
  }

  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(numericPrice);
};

const getStatusLabel = (status: string) => {
  if (status === "APPROVED") return "Approved";
  if (status === "REJECTED") return "Rejected";
  if (status === "PENDING") return "Pending";
  return status;
};

export default function MahasiswaProductsPage() {
  const [form, setForm] = useState<ProductForm>({
    title: "",
    category: "",
    description: "",
    problem: "",
    targetUmkm: "",
    mainFeature: "",
    detailFeature: "",
    technology: "",
    trainingDuration: "",
    mentoringMethod: "",
    price: "",
  });

  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [fileInputKey, setFileInputKey] = useState(0);
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [actionAlert, setActionAlert] = useState<ToastState | null>(null);

  const showToast = (
    type: AlertType,
    title: string,
    toastMessage: string
  ) => {
    setActionAlert({ type, title, message: toastMessage });

    window.setTimeout(() => {
      setActionAlert(null);
    }, 3500);
  };

  const showMessage = (
    text: string,
    type: AlertType = "info",
    title = "Informasi Produk"
  ) => {
    setMessage(text);
    showToast(type, title, text);
  };

  const handleChange = (key: keyof ProductForm, value: string) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleScreenshotChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setScreenshot(selectedFile);
  };

  const validateProductForm = () => {
    if (!form.title.trim()) return "Judul produk wajib diisi.";
    if (!form.category) return "Kategori produk wajib dipilih.";
    if (!form.problem) return "Masalah utama wajib dipilih.";
    if (!form.targetUmkm) return "Target UMKM wajib dipilih.";
    if (!form.mainFeature) return "Fitur utama wajib dipilih.";
    if (!form.technology) return "Teknologi wajib dipilih.";
    if (!form.trainingDuration)
      return "Estimasi durasi pelatihan wajib dipilih.";
    if (!form.mentoringMethod) return "Metode pendampingan wajib dipilih.";
    if (!form.price.trim()) return "Harga wajib diisi.";
    if (!form.description.trim()) return "Deskripsi produk wajib diisi.";
    if (!form.detailFeature.trim()) return "Detail fitur wajib diisi.";

    const numericPrice = Number(form.price);

    if (Number.isNaN(numericPrice) || numericPrice <= 0) {
      return "Harga harus berupa angka lebih dari 0.";
    }

    return "";
  };

  const resetForm = () => {
    setForm({
      title: "",
      category: "",
      description: "",
      problem: "",
      targetUmkm: "",
      mainFeature: "",
      detailFeature: "",
      technology: "",
      trainingDuration: "",
      mentoringMethod: "",
      price: "",
    });

    setScreenshot(null);
    setFileInputKey((prev) => prev + 1);
  };

  const fetchMyProducts = async (showSuccessToast = false) => {
    try {
      setIsLoadingProducts(true);

      const token = getAuthToken();

      if (!token) {
        showMessage(
          "Token tidak ditemukan. Silakan login ulang.",
          "error",
          "Akses ditolak"
        );
        return;
      }

      const response = await fetch(`${API_BASE_URL}/products/my`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        showMessage(
          result.message || "Gagal mengambil data produk.",
          "error",
          "Gagal memuat produk"
        );
        return;
      }

      setProducts(result.data || []);

      if (showSuccessToast) {
        showMessage(
          "Data produk berhasil diperbarui.",
          "success",
          "Produk diperbarui"
        );
      }
    } catch (error) {
      showMessage(
        "Gagal terhubung ke backend saat mengambil produk.",
        "error",
        "Koneksi gagal"
      );
    } finally {
      setIsLoadingProducts(false);
    }
  };

  const handleUploadProduct = async () => {
    try {
      setIsUploading(true);
      setMessage("");

      const validationMessage = validateProductForm();

      if (validationMessage) {
        showMessage(validationMessage, "warning", "Data belum lengkap");
        return;
      }

      const token = getAuthToken();

      if (!token) {
        showMessage(
          "Token tidak ditemukan. Silakan login ulang.",
          "error",
          "Akses ditolak"
        );
        return;
      }

      const durationNumber = form.trainingDuration.replace(/\D/g, "");

      const formData = new FormData();

      formData.append("title", form.title);
      formData.append("category", form.category);
      formData.append("description", form.description);
      formData.append("mainProblem", form.problem);
      formData.append("problemDetail", form.problem);
      formData.append("targetBusiness", form.targetUmkm);
      formData.append("mainFeatures", form.mainFeature);
      formData.append("featureDetail", form.detailFeature);
      formData.append("technology", form.technology);
      formData.append("trainingDuration", durationNumber);
      formData.append("mentoringMethod", form.mentoringMethod);
      formData.append("price", form.price);

      if (screenshot) {
        formData.append("screenshot", screenshot);
      }

      const response = await fetch(`${API_BASE_URL}/products`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        showMessage(
          result.message || "Gagal upload produk.",
          "error",
          "Upload gagal"
        );
        return;
      }

      showMessage(
        result.message ||
          "Produk berhasil diupload dan menunggu verifikasi admin.",
        "success",
        "Upload berhasil"
      );

      resetForm();
      await fetchMyProducts(false);
    } catch (error) {
      showMessage(
        "Gagal terhubung ke backend saat upload produk.",
        "error",
        "Koneksi gagal"
      );
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteProduct = async (productId: number | string) => {
    const confirmDelete = confirm("Yakin ingin menghapus produk ini?");

    if (!confirmDelete) return;

    try {
      const token = getAuthToken();

      if (!token) {
        showMessage(
          "Token tidak ditemukan. Silakan login ulang.",
          "error",
          "Akses ditolak"
        );
        return;
      }

      const response = await fetch(`${API_BASE_URL}/products/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        showMessage(
          result.message || "Gagal menghapus produk.",
          "error",
          "Hapus gagal"
        );
        return;
      }

      showMessage("Produk berhasil dihapus.", "success", "Produk dihapus");
      await fetchMyProducts(false);
    } catch (error) {
      showMessage(
        "Gagal terhubung ke backend saat menghapus produk.",
        "error",
        "Koneksi gagal"
      );
    }
  };

  useEffect(() => {
    fetchMyProducts(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <ToastAlert alert={actionAlert} onClose={() => setActionAlert(null)} />

      <style jsx global>{`
        input::placeholder,
        textarea::placeholder {
          color: #64748b;
          opacity: 1;
        }

        select option {
          background: #0f172a;
          color: #ffffff;
        }

        input[type="file"] {
          color: #cbd5e1;
        }

        input[type="file"]::file-selector-button {
          border: none;
          border-radius: 10px;
          background: #10b981;
          color: #04130f;
          font-weight: 900;
          padding: 9px 13px;
          margin-right: 12px;
          cursor: pointer;
        }
      `}</style>

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
            Produk Mahasiswa
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
            Kelola Produk Tugas Akhir
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
            Upload produk tugas akhir, lengkapi informasi solusi digital, atur
            harga, metode pendampingan, screenshot produk, lalu pantau status
            verifikasi dari admin.
          </p>
        </section>

        {message && <MessageBox message={message} />}

        <section
          style={{
            ...cardStyle,
            padding: "26px",
          }}
        >
          <SectionHeading
            title="Upload Produk"
            subtitle="Masukkan data produk tugas akhir sesuai kebutuhan katalog ReKarya."
          />

          <div
            style={{
              marginTop: "22px",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "18px 16px",
            }}
          >
            <InputField
              label="Judul Produk"
              placeholder="Contoh: Inventoriku"
              value={form.title}
              onChange={(val) => handleChange("title", val)}
            />

            <SelectField
              label="Kategori Produk"
              value={form.category}
              onChange={(val) => handleChange("category", val)}
              options={[
                "Pilih kategori produk",
                "Penjualan",
                "Operasional",
                "Keuangan",
                "Pemasaran",
              ]}
            />

            <SelectField
              label="Masalah Utama yang Diselesaikan"
              value={form.problem}
              onChange={(val) => handleChange("problem", val)}
              options={[
                "Pilih masalah utama UMKM",
                "Pemasaran Digital Lemah",
                "Penjualan Belum Online",
                "Pencatatan Keuangan Manual",
                "Stok Tidak Tertata",
                "Operasional Tidak Efisien",
                "Analisis Berbasis Data",
              ]}
            />

            <SelectField
              label="Target UMKM"
              value={form.targetUmkm}
              onChange={(val) => handleChange("targetUmkm", val)}
              options={[
                "Pilih target UMKM",
                "Kuliner",
                "Retail Toko",
                "Jasa",
                "Fashion",
                "Pertanian",
                "UMKM",
              ]}
            />

            <SelectField
              label="Fitur Utama"
              value={form.mainFeature}
              onChange={(val) => handleChange("mainFeature", val)}
              options={[
                "Pilih fitur utama",
                "Manajemen Stok",
                "Laporan Penjualan",
                "Dashboard Analisis",
                "Pemesanan Online",
                "Katalog Digital",
              ]}
            />

            <SelectField
              label="Teknologi yang Digunakan"
              value={form.technology}
              onChange={(val) => handleChange("technology", val)}
              options={[
                "Pilih teknologi",
                "Web App",
                "Mobile App",
                "IoT",
                "AI / Machine Learning",
              ]}
            />

            <SelectField
              label="Estimasi Durasi Pelatihan"
              value={form.trainingDuration}
              onChange={(val) => handleChange("trainingDuration", val)}
              options={[
                "Pilih durasi pelatihan",
                "7 Hari",
                "10 Hari",
                "14 Hari",
              ]}
            />

            <SelectField
              label="Metode Pendampingan Pelatihan"
              value={form.mentoringMethod}
              onChange={(val) => handleChange("mentoringMethod", val)}
              options={[
                "Pilih metode pendampingan",
                "Online",
                "Offline",
                "Hybrid",
              ]}
            />

            <InputField
              label="Harga"
              placeholder="Contoh: 250000"
              value={form.price}
              onChange={(val) => handleChange("price", val)}
            />
          </div>

          <div style={{ marginTop: "18px" }}>
            <label style={labelStyle}>Deskripsi Produk</label>
            <textarea
              style={textareaStyle}
              placeholder="Jelaskan produk tugas akhir, manfaat produk, dan masalah UMKM yang ingin diselesaikan."
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </div>

          <div style={{ marginTop: "18px" }}>
            <label style={labelStyle}>Detail Fitur</label>
            <textarea
              style={textareaStyle}
              placeholder="Masukkan rincian fitur dari produk, misalnya dashboard, laporan transaksi, manajemen data, login, dan fitur pendukung lainnya."
              value={form.detailFeature}
              onChange={(e) => handleChange("detailFeature", e.target.value)}
            />
          </div>

          <div style={{ marginTop: "26px" }}>
            <SectionHeading
              title="Screenshot Produk"
              subtitle="Upload poster atau tampilan produk yang akan muncul pada katalog web."
              small
            />
          </div>

          <UploadScreenshotBox
            key={fileInputKey}
            screenshot={screenshot}
            onChange={handleScreenshotChange}
          />

          <div
            style={{
              marginTop: "26px",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <button
              type="button"
              onClick={handleUploadProduct}
              disabled={isUploading}
              style={{
                padding: "14px 24px",
                borderRadius: "14px",
                border: "none",
                background: isUploading ? "#065f46" : "#10b981",
                color: "#04130f",
                fontSize: "14px",
                fontWeight: 900,
                cursor: isUploading ? "not-allowed" : "pointer",
                boxShadow: "0 10px 24px rgba(16,185,129,0.24)",
              }}
            >
              {isUploading ? "Mengupload..." : "Upload Produk"}
            </button>
          </div>
        </section>

        <section
          style={{
            ...cardStyle,
            padding: "26px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: "16px",
            }}
          >
            <SectionHeading
              title="Kelola Produk"
              subtitle="Lihat, hapus, dan cek status produk yang sudah diunggah."
            />

            <button
              type="button"
              onClick={() => fetchMyProducts(true)}
              style={{
                padding: "12px 16px",
                borderRadius: "14px",
                border: "1px solid rgba(52,211,153,0.24)",
                background: "rgba(16,185,129,0.10)",
                color: "#6ee7b7",
                fontSize: "13px",
                fontWeight: 900,
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              Refresh Produk
            </button>
          </div>

          <div
            style={{
              marginTop: "20px",
              borderRadius: "20px",
              border: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(255,255,255,0.03)",
              padding: "20px",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1.4fr 1fr 1fr 0.8fr",
                gap: "14px",
                paddingBottom: "14px",
                borderBottom: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <TableHead text="Nama Produk" />
              <TableHead text="Kategori" />
              <TableHead text="Status" />
              <TableHead text="Aksi" />
            </div>

            {isLoadingProducts ? (
              <EmptyState
                title="Mengambil data produk..."
                description="Mohon tunggu, sistem sedang mengambil produk milik mahasiswa dari backend."
              />
            ) : products.length === 0 ? (
              <EmptyState
                title="Belum ada produk yang diunggah."
                description="Produk yang berhasil diunggah akan tampil di sini beserta status pending atau approved dari admin."
              />
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {products.map((product) => (
                  <div
                    key={product.id}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1.4fr 1fr 1fr 0.8fr",
                      gap: "14px",
                      alignItems: "center",
                      padding: "16px 0",
                      borderBottom: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    <div>
                      <p
                        style={{
                          fontSize: "14px",
                          fontWeight: 900,
                          color: "#ffffff",
                        }}
                      >
                        {product.title}
                      </p>

                      <p
                        style={{
                          marginTop: "5px",
                          fontSize: "12px",
                          color: "#94a3b8",
                        }}
                      >
                        {formatPrice(product.price)}
                      </p>
                    </div>

                    <p
                      style={{
                        fontSize: "13px",
                        color: "#cbd5e1",
                        fontWeight: 800,
                      }}
                    >
                      {product.category}
                    </p>

                    <StatusBadge
                      text={getStatusLabel(product.status)}
                      active={product.status === "APPROVED"}
                      rejected={product.status === "REJECTED"}
                    />

                    <div
                      style={{
                        display: "flex",
                        gap: "8px",
                        flexWrap: "wrap",
                      }}
                    >
                      <button
                        type="button"
                        onClick={() =>
                          showMessage(
                            `Status produk "${product.title}" adalah ${getStatusLabel(
                              product.status
                            )}.`,
                            "info",
                            "Status produk"
                          )
                        }
                        style={{
                          padding: "8px 10px",
                          borderRadius: "10px",
                          border: "1px solid rgba(255,255,255,0.12)",
                          background: "rgba(255,255,255,0.04)",
                          color: "#cbd5e1",
                          fontSize: "12px",
                          fontWeight: 800,
                          cursor: "pointer",
                        }}
                      >
                        Status
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeleteProduct(product.id)}
                        style={{
                          padding: "8px 10px",
                          borderRadius: "10px",
                          border: "1px solid rgba(248,113,113,0.28)",
                          background: "rgba(239,68,68,0.10)",
                          color: "#fecaca",
                          fontSize: "12px",
                          fontWeight: 800,
                          cursor: "pointer",
                        }}
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
}

function SectionHeading({
  title,
  subtitle,
  small = false,
}: {
  title: string;
  subtitle: string;
  small?: boolean;
}) {
  return (
    <div>
      <h2
        style={{
          fontSize: small ? "24px" : "34px",
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
          marginTop: "6px",
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

function InputField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      <input
        type={type}
        style={inputStyle}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      <select
        style={{
          ...selectStyle,
          color: value ? "#ffffff" : "#94a3b8",
        }}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((option, index) => (
          <option key={option} value={index === 0 ? "" : option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

function UploadScreenshotBox({
  screenshot,
  onChange,
}: {
  screenshot: File | null;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div
      style={{
        marginTop: "18px",
        borderRadius: "22px",
        border: "1.5px dashed rgba(52,211,153,0.38)",
        background:
          "linear-gradient(180deg, rgba(16,185,129,0.10) 0%, rgba(255,255,255,0.035) 100%)",
        padding: "22px",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.1fr 0.9fr",
          gap: "22px",
          alignItems: "center",
        }}
      >
        <div>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "7px 12px",
              borderRadius: "999px",
              background: "rgba(16,185,129,0.12)",
              border: "1px solid rgba(52,211,153,0.24)",
              color: "#6ee7b7",
              fontSize: "11px",
              fontWeight: 900,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Area Upload Screenshot
          </div>

          <h3
            style={{
              marginTop: "14px",
              fontSize: "22px",
              fontWeight: 900,
              color: "#ffffff",
            }}
          >
            Upload Screenshot Produk
          </h3>

          <p
            style={{
              marginTop: "8px",
              maxWidth: "640px",
              fontSize: "14px",
              lineHeight: 1.8,
              color: "#94a3b8",
            }}
          >
            Kolom ini khusus untuk mengunggah poster atau tampilan produk. File
            ini akan membantu UMKM memahami bentuk produk sebelum mengajukan
            kerja sama.
          </p>

          <div
            style={{
              marginTop: "14px",
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
            }}
          >
            <FormatBadge text="JPG" />
            <FormatBadge text="JPEG" />
            <FormatBadge text="PNG" />
          </div>
        </div>

        <div
          style={{
            borderRadius: "18px",
            border: "1px solid rgba(255,255,255,0.12)",
            background: "rgba(255,255,255,0.05)",
            padding: "18px",
          }}
        >
          <label
            style={{
              display: "block",
              marginBottom: "10px",
              fontSize: "13px",
              fontWeight: 800,
              color: "#cbd5e1",
            }}
          >
            Pilih file screenshot produk
          </label>

          <input
            type="file"
            accept=".jpg,.jpeg,.png"
            onChange={onChange}
            style={{
              width: "100%",
              color: "#cbd5e1",
              fontSize: "13px",
            }}
          />

          {screenshot && (
            <p
              style={{
                marginTop: "10px",
                fontSize: "12px",
                fontWeight: 800,
                color: "#6ee7b7",
              }}
            >
              File dipilih: {screenshot.name}
            </p>
          )}

          <p
            style={{
              marginTop: "12px",
              fontSize: "12px",
              lineHeight: 1.6,
              color: "#64748b",
            }}
          >
            Pastikan screenshot terlihat jelas, tidak blur, dan mewakili fitur
            utama produk.
          </p>
        </div>
      </div>
    </div>
  );
}

function FormatBadge({ text }: { text: string }) {
  return (
    <span
      style={{
        borderRadius: "999px",
        border: "1px solid rgba(52,211,153,0.24)",
        background: "rgba(16,185,129,0.10)",
        padding: "6px 10px",
        fontSize: "11px",
        fontWeight: 900,
        color: "#6ee7b7",
      }}
    >
      {text}
    </span>
  );
}

function StatusBadge({
  text,
  active = false,
  rejected = false,
}: {
  text: string;
  active?: boolean;
  rejected?: boolean;
}) {
  const border = rejected
    ? "1px solid rgba(248,113,113,0.28)"
    : active
    ? "1px solid rgba(52,211,153,0.28)"
    : "1px solid rgba(251,191,36,0.28)";

  const background = rejected
    ? "rgba(239,68,68,0.10)"
    : active
    ? "rgba(16,185,129,0.12)"
    : "rgba(251,191,36,0.10)";

  const color = rejected ? "#fecaca" : active ? "#6ee7b7" : "#fbbf24";

  return (
    <span
      style={{
        width: "fit-content",
        borderRadius: "999px",
        border,
        background,
        padding: "7px 12px",
        fontSize: "12px",
        fontWeight: 900,
        color,
      }}
    >
      {text}
    </span>
  );
}

function TableHead({ text }: { text: string }) {
  return (
    <p
      style={{
        fontSize: "12px",
        fontWeight: 900,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: "#6ee7b7",
      }}
    >
      {text}
    </p>
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
        padding: "28px",
        textAlign: "center",
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
          fontSize: "14px",
          lineHeight: 1.7,
          color: "#94a3b8",
        }}
      >
        {description}
      </p>

      <div
        style={{
          marginTop: "18px",
          display: "inline-flex",
          gap: "10px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <StatusBadge text="Pending" />
        <StatusBadge text="Approved" active />
      </div>
    </div>
  );
}

function MessageBox({ message }: { message: string }) {
  const isSuccess =
    message.toLowerCase().includes("berhasil") ||
    message.toLowerCase().includes("diupload") ||
    message.toLowerCase().includes("menunggu verifikasi") ||
    message.toLowerCase().includes("diperbarui") ||
    message.toLowerCase().includes("dihapus");

  return (
    <div
      style={{
        borderRadius: "16px",
        border: isSuccess
          ? "1px solid rgba(52,211,153,0.24)"
          : "1px solid rgba(248,113,113,0.35)",
        background: isSuccess
          ? "rgba(16,185,129,0.10)"
          : "rgba(239,68,68,0.10)",
        padding: "14px 16px",
        color: isSuccess ? "#6ee7b7" : "#fecaca",
        fontSize: "14px",
        fontWeight: 800,
      }}
    >
      {message}
    </div>
  );
}

function ToastAlert({
  alert,
  onClose,
}: {
  alert: ToastState | null;
  onClose: () => void;
}) {
  if (!alert) return null;

  const styleMap: Record<
    AlertType,
    {
      border: string;
      background: string;
      titleColor: string;
      icon: string;
    }
  > = {
    success: {
      border: "1px solid rgba(52,211,153,0.35)",
      background:
        "linear-gradient(135deg, rgba(6,78,59,0.98), rgba(16,185,129,0.20))",
      titleColor: "#6ee7b7",
      icon: "✓",
    },
    error: {
      border: "1px solid rgba(248,113,113,0.35)",
      background:
        "linear-gradient(135deg, rgba(127,29,29,0.98), rgba(239,68,68,0.20))",
      titleColor: "#fecaca",
      icon: "!",
    },
    warning: {
      border: "1px solid rgba(251,191,36,0.35)",
      background:
        "linear-gradient(135deg, rgba(113,63,18,0.98), rgba(251,191,36,0.20))",
      titleColor: "#fde68a",
      icon: "!",
    },
    info: {
      border: "1px solid rgba(96,165,250,0.35)",
      background:
        "linear-gradient(135deg, rgba(30,58,138,0.98), rgba(59,130,246,0.20))",
      titleColor: "#bfdbfe",
      icon: "i",
    },
  };

  const selected = styleMap[alert.type];

  return (
    <div
      style={{
        position: "fixed",
        top: "24px",
        right: "24px",
        width: "370px",
        maxWidth: "calc(100vw - 32px)",
        zIndex: 9999,
        borderRadius: "18px",
        border: selected.border,
        background: selected.background,
        boxShadow: "0 24px 70px rgba(0,0,0,0.45)",
        padding: "16px",
        color: "#ffffff",
        backdropFilter: "blur(16px)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "12px",
        }}
      >
        <div
          style={{
            width: "34px",
            height: "34px",
            borderRadius: "999px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(255,255,255,0.12)",
            color: selected.titleColor,
            fontSize: "18px",
            fontWeight: 900,
            flexShrink: 0,
          }}
        >
          {selected.icon}
        </div>

        <div style={{ flex: 1 }}>
          <h4
            style={{
              margin: 0,
              fontSize: "15px",
              fontWeight: 900,
              color: selected.titleColor,
            }}
          >
            {alert.title}
          </h4>

          <p
            style={{
              marginTop: "6px",
              marginBottom: 0,
              fontSize: "13px",
              lineHeight: 1.6,
              color: "#e2e8f0",
            }}
          >
            {alert.message}
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          style={{
            border: "none",
            background: "rgba(255,255,255,0.10)",
            color: "#ffffff",
            width: "28px",
            height: "28px",
            borderRadius: "999px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: 900,
            lineHeight: 1,
          }}
        >
          ×
        </button>
      </div>
    </div>
  );
}
