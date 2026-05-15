"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { apiRequest, setToken } from "../../lib/api";

type Role = "MAHASISWA" | "UMKM";

type RegisterResponse = {
  success: boolean;
  message: string;
  data: {
    user: {
      id: number;
      username: string;
      email: string;
      role: Role;
      verificationStatus: "PENDING" | "APPROVED" | "REJECTED";
    };
    token: string;
  };
};

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function RegisterPage() {
  const router = useRouter();

  const [role, setRole] = useState<Role>("MAHASISWA");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const redirectByRole = (selectedRole: Role) => {
    if (selectedRole === "MAHASISWA") {
      router.push("/mahasiswa/dashboard");
      return;
    }

    router.push("/umkm/dashboard");
  };

  const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");

    if (!username.trim()) {
      setErrorMessage("Username wajib diisi.");
      return;
    }

    if (!email.trim()) {
      setErrorMessage("Email wajib diisi.");
      return;
    }

    if (!password.trim()) {
      setErrorMessage("Password wajib diisi.");
      return;
    }

    if (password.length < 6) {
      setErrorMessage("Password minimal 6 karakter.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Password dan konfirmasi password tidak sama.");
      return;
    }

    setIsLoading(true);
    setLoadingText("Mendaftarkan akun...");

    try {
      const result = await apiRequest<RegisterResponse>("/auth/register", {
        method: "POST",
        body: {
          username,
          email,
          password,
          confirmPassword,
          role,
        },
      });

      setToken(result.data.token);
      localStorage.setItem("rekarya_user", JSON.stringify(result.data.user));

      setLoadingText("Akun berhasil dibuat. Menyiapkan dashboard...");
      await sleep(3000);

      redirectByRole(result.data.user.role);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Register gagal. Coba lagi."
      );
      setLoadingText("");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <style jsx global>{`
        input::placeholder {
          color: #64748b;
          opacity: 1;
        }

        select option {
          background: #0f172a;
          color: #ffffff;
        }

        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus {
          -webkit-text-fill-color: #ffffff;
          -webkit-box-shadow: 0 0 0px 1000px rgba(15, 23, 42, 0.96) inset;
          transition: background-color 9999s ease-in-out 0s;
        }

        @keyframes rekarya-spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes rekarya-pulse {
          0%,
          100% {
            opacity: 0.55;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>

      <main className="min-h-screen bg-[#060A18] px-6 py-10 text-white">
        {isLoading && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 9999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(2,6,23,0.72)",
              backdropFilter: "blur(10px)",
            }}
          >
            <div
              style={{
                width: "360px",
                maxWidth: "calc(100vw - 32px)",
                borderRadius: "24px",
                border: "1px solid rgba(52,211,153,0.24)",
                background:
                  "linear-gradient(180deg, rgba(15,23,42,0.98), rgba(6,12,28,0.98))",
                boxShadow: "0 24px 70px rgba(0,0,0,0.45)",
                padding: "28px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  margin: "0 auto",
                  borderRadius: "999px",
                  border: "4px solid rgba(52,211,153,0.18)",
                  borderTopColor: "#34d399",
                  animation: "rekarya-spin 0.9s linear infinite",
                }}
              />

              <h3
                style={{
                  marginTop: "20px",
                  fontSize: "20px",
                  fontWeight: 900,
                  color: "#ffffff",
                }}
              >
                Mohon tunggu
              </h3>

              <p
                style={{
                  marginTop: "8px",
                  fontSize: "14px",
                  lineHeight: 1.7,
                  color: "#cbd5e1",
                  animation: "rekarya-pulse 1.4s ease-in-out infinite",
                }}
              >
                {loadingText || "Memproses register..."}
              </p>
            </div>
          </div>
        )}

        <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl items-center justify-center">
          <div className="grid w-full overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] shadow-2xl shadow-emerald-950/30 lg:grid-cols-2">
            <section className="p-8 md:p-12">
              <Link
                href="/"
                className="mb-8 inline-flex text-sm font-semibold text-emerald-300 hover:text-emerald-200"
              >
                ← Kembali ke Home
              </Link>

              <div>
                <p className="text-sm font-bold uppercase tracking-[0.25em] text-emerald-300">
                  Register
                </p>

                <h2 className="mt-3 text-3xl font-black">
                  Buat Akun ReKarya
                </h2>

                <p className="mt-3 text-sm leading-6 text-slate-400">
                  Pilih role Mahasiswa atau UMKM. Admin tidak melakukan register
                  dari halaman umum.
                </p>
              </div>

              {errorMessage && (
                <div className="mt-6 rounded-2xl border border-red-400/30 bg-red-500/10 p-4 text-sm font-semibold leading-6 text-red-200">
                  {errorMessage}
                </div>
              )}

              <form onSubmit={handleRegister} className="mt-8 space-y-5">
                <div>
                  <label className="text-sm font-semibold text-slate-300">
                    Pilih Role
                  </label>

                  <select
                    value={role}
                    onChange={(event) => setRole(event.target.value as Role)}
                    disabled={isLoading}
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none transition focus:border-emerald-400 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    <option value="MAHASISWA">Mahasiswa</option>
                    <option value="UMKM">UMKM</option>
                  </select>

                  <p className="mt-2 text-xs leading-5 text-slate-500">
                    Pilih Mahasiswa jika ingin mengunggah produk tugas akhir,
                    atau UMKM jika ingin mencari solusi digital.
                  </p>
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-300">
                    Username
                  </label>

                  <input
                    type="text"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    placeholder="contoh: mahasiswa"
                    autoComplete="username"
                    disabled={isLoading}
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-400 disabled:cursor-not-allowed disabled:opacity-70"
                    required
                  />

                  <p className="mt-2 text-xs leading-5 text-slate-500">
                    Gunakan username sederhana tanpa spasi agar mudah dikenali.
                  </p>
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-300">
                    Email
                  </label>

                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="contoh: mahasiswa@gmail.com"
                    autoComplete="email"
                    disabled={isLoading}
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-400 disabled:cursor-not-allowed disabled:opacity-70"
                    required
                  />

                  <p className="mt-2 text-xs leading-5 text-slate-500">
                    Masukkan email aktif yang akan dipakai untuk login.
                  </p>
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-300">
                    Password
                  </label>

                  <input
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Minimal 6 karakter"
                    autoComplete="new-password"
                    disabled={isLoading}
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-400 disabled:cursor-not-allowed disabled:opacity-70"
                    required
                    minLength={6}
                  />

                  <p className="mt-2 text-xs leading-5 text-slate-500">
                    Gunakan minimal 6 karakter. Lebih aman jika memakai huruf
                    besar, huruf kecil, dan angka.
                  </p>
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-300">
                    Konfirmasi Password
                  </label>

                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(event) =>
                      setConfirmPassword(event.target.value)
                    }
                    placeholder="Ulangi password yang sama"
                    autoComplete="new-password"
                    disabled={isLoading}
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-400 disabled:cursor-not-allowed disabled:opacity-70"
                    required
                    minLength={6}
                  />

                  <p className="mt-2 text-xs leading-5 text-slate-500">
                    Pastikan konfirmasi password sama dengan password utama.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex w-full items-center justify-center gap-3 rounded-2xl bg-emerald-400 px-5 py-3 font-black text-slate-950 transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isLoading && (
                    <span
                      style={{
                        width: "18px",
                        height: "18px",
                        borderRadius: "999px",
                        border: "3px solid rgba(2,6,23,0.25)",
                        borderTopColor: "#020617",
                        animation: "rekarya-spin 0.8s linear infinite",
                      }}
                    />
                  )}

                  {isLoading ? "Memproses..." : "Register"}
                </button>
              </form>

              <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm text-slate-400">
                Sudah punya akun?{" "}
                <Link
                  href="/login"
                  className="font-bold text-emerald-300 hover:text-emerald-200"
                >
                  Login di sini
                </Link>
              </div>
            </section>

            <section className="relative hidden bg-emerald-400 p-10 text-slate-950 lg:block">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.55),transparent_35%)]" />

              <div className="relative flex h-full flex-col justify-between">
                <Link href="/" className="text-3xl font-black">
                  ReKarya
                </Link>

                <div>
                  <p className="text-sm font-black uppercase tracking-[0.25em]">
                    Multi Role Platform
                  </p>

                  <h1 className="mt-4 text-5xl font-black leading-tight">
                    Mulai sebagai Mahasiswa atau UMKM.
                  </h1>

                  <p className="mt-6 text-base leading-7 text-slate-800">
                    Mahasiswa dapat mengunggah produk tugas akhir. UMKM dapat
                    mencari solusi digital sesuai kebutuhan usaha.
                  </p>
                </div>

                <p className="text-sm font-semibold">
                  Admin dibuat lewat seed/database, bukan register umum.
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}