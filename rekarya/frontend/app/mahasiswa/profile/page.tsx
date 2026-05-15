"use client";

import { useEffect, useState } from "react";
import type { ChangeEvent, CSSProperties } from "react";

type ProfileForm = {
  namaLengkap: string;
  email: string;
  noKontak: string;
  noRekening: string;
  kampus: string;
  jurusan: string;
  programStudi: string;
  lulusanTahun: string;
  deskripsiSingkat: string;
  passwordLama: string;
  passwordBaru: string;
  ulangiPasswordBaru: string;
};

type ProfileFiles = {
  photo: File | null;
  studentCard: File | null;
  identityCard: File | null;
};


type AlertType = "success" | "error" | "warning" | "info";

type AlertState = {
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

const disabledInputStyle: CSSProperties = {
  ...inputStyle,
  cursor: "not-allowed",
  opacity: 0.75,
};

const textareaStyle: CSSProperties = {
  ...inputStyle,
  minHeight: "140px",
  resize: "vertical",
  lineHeight: 1.6,
};

export default function MahasiswaProfilePage() {
  const [form, setForm] = useState<ProfileForm>({
    namaLengkap: "",
    email: "",
    noKontak: "",
    noRekening: "",
    kampus: "",
    jurusan: "",
    programStudi: "",
    lulusanTahun: "",
    deskripsiSingkat: "",
    passwordLama: "",
    passwordBaru: "",
    ulangiPasswordBaru: "",
  });

  const [files, setFiles] = useState<ProfileFiles>({
    photo: null,
    studentCard: null,
    identityCard: null,
  });

  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isSavingPassword, setIsSavingPassword] = useState(false);
  const [profileMessage, setProfileMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [actionAlert, setActionAlert] = useState<AlertState | null>(null);

  const showActionAlert = (
    type: AlertType,
    title: string,
    message: string,
  ) => {
    setActionAlert({ type, title, message });

    window.setTimeout(() => {
      setActionAlert(null);
    }, 3500);
  };

  const showProfileMessage = (
    message: string,
    type: AlertType = "info",
    title = "Informasi Profil",
  ) => {
    setProfileMessage(message);
    showActionAlert(type, title, message);
  };

  const showPasswordMessage = (
    message: string,
    type: AlertType = "info",
    title = "Informasi Akun",
  ) => {
    setPasswordMessage(message);
    showActionAlert(type, title, message);
  };

  const handleChange = (key: keyof ProfileForm, value: string) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleFileChange = (
    key: keyof ProfileFiles,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = event.target.files?.[0] || null;

    setFiles((prev) => ({
      ...prev,
      [key]: selectedFile,
    }));
  };

  const fetchProfile = async () => {
    try {
      const token = getAuthToken();

      if (!token) {
        setProfileMessage("Token tidak ditemukan. Silakan login ulang.");
        setIsLoadingProfile(false);
        return;
      }

      const response = await fetch(`${API_BASE_URL}/mahasiswa/profile`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        setProfileMessage(result.message || "Gagal mengambil profil.");
        setIsLoadingProfile(false);
        return;
      }

      const profile = result.data;

      setForm((prev) => ({
        ...prev,
        namaLengkap: profile.fullName || "",
        email: profile.user?.email || "",
        noKontak: profile.phone || "",
        noRekening: profile.bankAccount || "",
        kampus: profile.campus || "",
        jurusan: profile.major || "",
        programStudi: profile.studyProgram || "",
        lulusanTahun: profile.educationStatus || "",
        deskripsiSingkat: profile.bio || "",
      }));
    } catch (error) {
      setProfileMessage("Gagal terhubung ke backend profil.");
    } finally {
      setIsLoadingProfile(false);
    }
  };

  const handleSaveProfile = async () => {
    try {
      setIsSavingProfile(true);
      setProfileMessage("");

      const token = getAuthToken();

      if (!token) {
        showProfileMessage("Token tidak ditemukan. Silakan login ulang.", "error", "Akses ditolak");
        return;
      }

      const formData = new FormData();

      formData.append("fullName", form.namaLengkap);
      formData.append("phone", form.noKontak);
      formData.append("bankAccount", form.noRekening);
      formData.append("campus", form.kampus);
      formData.append("major", form.jurusan);
      formData.append("studyProgram", form.programStudi);
      formData.append("educationStatus", form.lulusanTahun);
      formData.append("bio", form.deskripsiSingkat);

      if (files.photo) {
        formData.append("photo", files.photo);
      }

      if (files.studentCard) {
        formData.append("studentCard", files.studentCard);
      }

      if (files.identityCard) {
        formData.append("identityCard", files.identityCard);
      }

      const response = await fetch(`${API_BASE_URL}/mahasiswa/profile`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        showProfileMessage(result.message || "Gagal menyimpan profil.", "error", "Profil gagal disimpan");
        return;
      }

      showProfileMessage("Profil berhasil diperbarui.", "success", "Profil berhasil");
      await fetchProfile();
    } catch (error) {
      showProfileMessage("Gagal terhubung ke backend saat menyimpan profil.", "error", "Koneksi gagal");
    } finally {
      setIsSavingProfile(false);
    }
  };

  const handleSavePassword = async () => {
    try {
      setIsSavingPassword(true);
      setPasswordMessage("");

      const token = getAuthToken();

      if (!token) {
        showPasswordMessage("Token tidak ditemukan. Silakan login ulang.", "error", "Akses ditolak");
        return;
      }

      if (!form.passwordLama || !form.passwordBaru || !form.ulangiPasswordBaru) {
        showPasswordMessage("Semua field password wajib diisi.", "warning", "Data belum lengkap");
        return;
      }

      if (form.passwordBaru !== form.ulangiPasswordBaru) {
        showPasswordMessage("Password baru dan konfirmasi password tidak sama.", "warning", "Konfirmasi tidak cocok");
        return;
      }

      const response = await fetch(`${API_BASE_URL}/auth/change-password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          oldPassword: form.passwordLama,
          newPassword: form.passwordBaru,
          confirmNewPassword: form.ulangiPasswordBaru,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        showPasswordMessage(result.message || "Gagal mengubah password.", "error", "Password gagal diubah");
        return;
      }

      showPasswordMessage("Password berhasil diubah.", "success", "Password berhasil");

      setForm((prev) => ({
        ...prev,
        passwordLama: "",
        passwordBaru: "",
        ulangiPasswordBaru: "",
      }));
    } catch (error) {
      showPasswordMessage("Gagal terhubung ke backend saat mengubah password.", "error", "Koneksi gagal");
    } finally {
      setIsSavingPassword(false);
    }
  };

  useEffect(() => {
    fetchProfile();
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

        input[type="file"] {
          color: #cbd5e1;
        }

        input[type="file"]::file-selector-button {
          border: none;
          border-radius: 10px;
          background: #10b981;
          color: #04130f;
          font-weight: 800;
          padding: 8px 12px;
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
            Profil Mahasiswa
          </div>

          <h1
            style={{
              marginTop: "18px",
              fontSize: "32px",
              fontWeight: 900,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              color: "#ffffff",
            }}
          >
            Kelola Data Diri
          </h1>

          <p
            style={{
              marginTop: "14px",
              maxWidth: "760px",
              fontSize: "15px",
              lineHeight: 1.8,
              color: "#cbd5e1",
            }}
          >
            Lengkapi seluruh data diri untuk proses verifikasi admin dan
            meningkatkan kredibilitas profil mahasiswa.
          </p>
        </section>

        <section
          style={{
            ...cardStyle,
            padding: "18px 22px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
          }}
        >
          <div>
            <p
              style={{
                fontSize: "13px",
                fontWeight: 900,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#6ee7b7",
              }}
            >
              Status Verifikasi
            </p>

            <p
              style={{
                marginTop: "8px",
                fontSize: "15px",
                color: "#cbd5e1",
              }}
            >
              {isLoadingProfile
                ? "Mengambil data profil..."
                : "Lengkapi data dan dokumen agar profil dapat diverifikasi admin."}
            </p>
          </div>

          <div
            style={{
              padding: "12px 16px",
              borderRadius: "14px",
              border: "1px solid rgba(52,211,153,0.24)",
              background: "rgba(16,185,129,0.10)",
              color: "#6ee7b7",
              fontSize: "14px",
              fontWeight: 900,
              whiteSpace: "nowrap",
            }}
          >
            Pending Verifikasi
          </div>
        </section>

        {profileMessage && <MessageBox message={profileMessage} />}

        <section
          style={{
            ...cardStyle,
            padding: "26px",
          }}
        >
          <SectionHeading
            title="Data Diri"
            subtitle="Informasi utama mahasiswa."
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "18px 16px",
              marginTop: "18px",
            }}
          >
            <InputField
              label="Nama Lengkap"
              placeholder="Nama lengkap sesuai KTP/KTM"
              value={form.namaLengkap}
              onChange={(val) => handleChange("namaLengkap", val)}
            />

            <InputField
              label="Email"
              placeholder="Email akun mahasiswa"
              value={form.email}
              onChange={() => {}}
              disabled
            />

            <InputField
              label="No. Kontak"
              placeholder="0812345678"
              value={form.noKontak}
              onChange={(val) => handleChange("noKontak", val)}
            />

            <InputField
              label="No. Rekening"
              placeholder="BNI - XXXXXXXX"
              value={form.noRekening}
              onChange={(val) => handleChange("noRekening", val)}
            />
          </div>

          <div style={{ marginTop: "28px" }}>
            <SectionHeading
              title="Data Akademik"
              subtitle="Informasi kampus dan program studi."
              small
            />
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "18px 16px",
              marginTop: "18px",
            }}
          >
            <InputField
              label="Kampus"
              placeholder="Politeknik Negeri Malang"
              value={form.kampus}
              onChange={(val) => handleChange("kampus", val)}
            />

            <InputField
              label="Jurusan"
              placeholder="Teknologi Informasi"
              value={form.jurusan}
              onChange={(val) => handleChange("jurusan", val)}
            />

            <InputField
              label="Program Studi"
              placeholder="D IV Teknologi Rekayasa Internet"
              value={form.programStudi}
              onChange={(val) => handleChange("programStudi", val)}
            />

            <InputField
              label="Lulusan Tahun / Masih Kuliah"
              placeholder="Semester 4"
              value={form.lulusanTahun}
              onChange={(val) => handleChange("lulusanTahun", val)}
            />
          </div>

          <div style={{ marginTop: "28px" }}>
            <SectionHeading
              title="Deskripsi Profil"
              subtitle="Jelaskan keahlian dan fokus pengembangan Anda."
              small
            />
          </div>

          <div style={{ marginTop: "18px" }}>
            <label style={labelStyle}>Deskripsi Singkat</label>
            <textarea
              style={textareaStyle}
              placeholder="Saya seorang mahasiswa yang fokus pada pengembangan solusi digital untuk UMKM."
              value={form.deskripsiSingkat}
              onChange={(e) =>
                handleChange("deskripsiSingkat", e.target.value)
              }
            />
          </div>

          <div style={{ marginTop: "28px" }}>
            <SectionHeading
              title="Upload Dokumen"
              subtitle="Dokumen wajib untuk proses verifikasi."
              small
            />
          </div>

          <div
            style={{
              marginTop: "18px",
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "16px",
            }}
          >
            <UploadField
              title="Foto Profil"
              description="Foto wajib terlihat jelas agar profil lebih meyakinkan."
              file={files.photo}
              onChange={(event) => handleFileChange("photo", event)}
            />

            <UploadField
              title="KTM / Surat Aktif Kuliah"
              description="Dokumen harus terlihat jelas untuk validasi status mahasiswa."
              file={files.studentCard}
              onChange={(event) => handleFileChange("studentCard", event)}
            />

            <UploadField
              title="KTP"
              description="KTP harus terbaca dengan jelas untuk verifikasi identitas."
              file={files.identityCard}
              onChange={(event) => handleFileChange("identityCard", event)}
            />
          </div>

          <div
            style={{
              marginTop: "24px",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <button
              type="button"
              onClick={handleSaveProfile}
              disabled={isSavingProfile}
              style={{
                padding: "14px 22px",
                borderRadius: "14px",
                border: "none",
                background: isSavingProfile ? "#065f46" : "#10b981",
                color: "#04130f",
                fontSize: "14px",
                fontWeight: 900,
                cursor: isSavingProfile ? "not-allowed" : "pointer",
                boxShadow: "0 10px 24px rgba(16,185,129,0.24)",
              }}
            >
              {isSavingProfile ? "Menyimpan..." : "Simpan Profil"}
            </button>
          </div>
        </section>

        <section
          style={{
            ...cardStyle,
            padding: "26px",
          }}
        >
          <SectionHeading title="Akun" subtitle="Ubah password akun Anda." />

          {passwordMessage && <MessageBox message={passwordMessage} />}

          <div
            style={{
              marginTop: "18px",
              borderRadius: "20px",
              border: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(255,255,255,0.03)",
              padding: "20px",
            }}
          >
            <h3
              style={{
                fontSize: "22px",
                fontWeight: 900,
                color: "#ffffff",
              }}
            >
              Ubah Password
            </h3>

            <p
              style={{
                marginTop: "6px",
                fontSize: "14px",
                lineHeight: 1.7,
                color: "#94a3b8",
              }}
            >
              Gunakan password yang kuat dan mudah Anda ingat.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: "16px",
                marginTop: "20px",
              }}
            >
              <InputField
                label="Password Lama"
                type="password"
                placeholder="Masukkan password lama"
                value={form.passwordLama}
                onChange={(val) => handleChange("passwordLama", val)}
              />

              <InputField
                label="Password Baru"
                type="password"
                placeholder="Masukkan password baru"
                value={form.passwordBaru}
                onChange={(val) => handleChange("passwordBaru", val)}
              />

              <InputField
                label="Ulangi Password Baru"
                type="password"
                placeholder="Konfirmasi password baru"
                value={form.ulangiPasswordBaru}
                onChange={(val) => handleChange("ulangiPasswordBaru", val)}
              />
            </div>

            <div
              style={{
                marginTop: "22px",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <button
                type="button"
                onClick={handleSavePassword}
                disabled={isSavingPassword}
                style={{
                  padding: "14px 22px",
                  borderRadius: "14px",
                  border: "1px solid rgba(52,211,153,0.24)",
                  background: "rgba(16,185,129,0.12)",
                  color: "#6ee7b7",
                  fontSize: "14px",
                  fontWeight: 900,
                  cursor: isSavingPassword ? "not-allowed" : "pointer",
                }}
              >
                {isSavingPassword ? "Menyimpan..." : "Simpan Password"}
              </button>
            </div>
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
          fontSize: small ? "26px" : "34px",
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
  disabled = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
}) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>

      <input
        type={type}
        style={disabled ? disabledInputStyle : inputStyle}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

function UploadField({
  title,
  description,
  file,
  onChange,
}: {
  title: string;
  description: string;
  file: File | null;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div
      style={{
        borderRadius: "18px",
        border: "1.5px dashed rgba(52,211,153,0.30)",
        background:
          "linear-gradient(180deg, rgba(16,185,129,0.08) 0%, rgba(255,255,255,0.03) 100%)",
        padding: "18px",
      }}
    >
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          padding: "6px 10px",
          borderRadius: "999px",
          background: "rgba(16,185,129,0.12)",
          border: "1px solid rgba(52,211,153,0.22)",
          color: "#6ee7b7",
          fontSize: "11px",
          fontWeight: 900,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        Upload Dokumen
      </div>

      <h4
        style={{
          marginTop: "14px",
          fontSize: "18px",
          fontWeight: 900,
          color: "#ffffff",
        }}
      >
        {title}
      </h4>

      <p
        style={{
          marginTop: "8px",
          fontSize: "13px",
          lineHeight: 1.7,
          color: "#94a3b8",
        }}
      >
        {description}
      </p>

      <div
        style={{
          marginTop: "16px",
          padding: "14px",
          borderRadius: "14px",
          border: "1px solid rgba(255,255,255,0.10)",
          background: "rgba(255,255,255,0.04)",
        }}
      >
        <label
          style={{
            display: "block",
            fontSize: "13px",
            fontWeight: 700,
            color: "#cbd5e1",
            marginBottom: "10px",
          }}
        >
          Pilih file
        </label>

        <input
          type="file"
          accept=".jpg,.jpeg,.png,.pdf"
          onChange={onChange}
          style={{
            width: "100%",
            color: "#cbd5e1",
            fontSize: "13px",
          }}
        />

        {file && (
          <p
            style={{
              marginTop: "10px",
              fontSize: "12px",
              color: "#6ee7b7",
              fontWeight: 800,
            }}
          >
            File dipilih: {file.name}
          </p>
        )}
      </div>
    </div>
  );
}

function MessageBox({ message }: { message: string }) {
  const isSuccess =
    message.toLowerCase().includes("berhasil") ||
    message.toLowerCase().includes("diperbarui") ||
    message.toLowerCase().includes("diubah");

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
  alert: AlertState | null;
  onClose: () => void;
}) {
  if (!alert) return null;

  const styleMap: Record<
    AlertType,
    {
      border: string;
      background: string;
      color: string;
      icon: string;
    }
  > = {
    success: {
      border: "1px solid rgba(52,211,153,0.35)",
      background:
        "linear-gradient(135deg, rgba(6,78,59,0.98), rgba(16,185,129,0.22))",
      color: "#6ee7b7",
      icon: "✓",
    },
    error: {
      border: "1px solid rgba(248,113,113,0.38)",
      background:
        "linear-gradient(135deg, rgba(127,29,29,0.98), rgba(239,68,68,0.20))",
      color: "#fecaca",
      icon: "!",
    },
    warning: {
      border: "1px solid rgba(251,191,36,0.38)",
      background:
        "linear-gradient(135deg, rgba(113,63,18,0.98), rgba(251,191,36,0.20))",
      color: "#fde68a",
      icon: "!",
    },
    info: {
      border: "1px solid rgba(96,165,250,0.38)",
      background:
        "linear-gradient(135deg, rgba(30,58,138,0.98), rgba(59,130,246,0.20))",
      color: "#bfdbfe",
      icon: "i",
    },
  };

  const activeStyle = styleMap[alert.type];

  return (
    <div
      style={{
        position: "fixed",
        top: "22px",
        right: "22px",
        width: "370px",
        maxWidth: "calc(100vw - 32px)",
        zIndex: 9999,
        borderRadius: "18px",
        border: activeStyle.border,
        background: activeStyle.background,
        boxShadow: "0 24px 70px rgba(0,0,0,0.45)",
        padding: "16px",
        color: "#ffffff",
        backdropFilter: "blur(16px)",
      }}
    >
      <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
        <div
          style={{
            width: "34px",
            height: "34px",
            borderRadius: "999px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(255,255,255,0.12)",
            color: activeStyle.color,
            fontSize: "18px",
            fontWeight: 900,
            flexShrink: 0,
          }}
        >
          {activeStyle.icon}
        </div>

        <div style={{ flex: 1 }}>
          <p
            style={{
              margin: 0,
              fontSize: "15px",
              fontWeight: 900,
              color: activeStyle.color,
            }}
          >
            {alert.title}
          </p>

          <p
            style={{
              margin: "6px 0 0",
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
            width: "28px",
            height: "28px",
            borderRadius: "999px",
            border: "none",
            background: "rgba(255,255,255,0.12)",
            color: "#ffffff",
            fontSize: "16px",
            fontWeight: 900,
            cursor: "pointer",
          }}
        >
          ×
        </button>
      </div>
    </div>
  );
}
