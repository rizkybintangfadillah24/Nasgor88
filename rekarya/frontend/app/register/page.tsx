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

export default function RegisterPage() {
  const router = useRouter();

  const [role, setRole] = useState<Role>("MAHASISWA");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");

    if (password !== confirmPassword) {
      setErrorMessage("Password dan konfirmasi password tidak sama.");
      return;
    }

    setIsLoading(true);

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

      if (result.data.user.role === "MAHASISWA") {
        router.push("/mahasiswa/dashboard");
        return;
      }

      router.push("/umkm/dashboard");
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Register gagal. Coba lagi."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#060A18] px-6 py-10 text-white">
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
              <h2 className="mt-3 text-3xl font-black">Buat Akun ReKarya</h2>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                Pilih role Mahasiswa atau UMKM. Admin tidak melakukan register
                dari halaman umum.
              </p>
            </div>

            {errorMessage && (
              <div className="mt-6 rounded-2xl border border-red-400/30 bg-red-500/10 p-4 text-sm text-red-200">
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
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-sm outline-none transition focus:border-emerald-400"
                >
                  <option value="MAHASISWA">Mahasiswa</option>
                  <option value="UMKM">UMKM</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-300">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  placeholder="maulana"
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm outline-none transition placeholder:text-slate-500 focus:border-emerald-400"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-300">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="maulana@gmail.com"
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm outline-none transition placeholder:text-slate-500 focus:border-emerald-400"
                  required
                />
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
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm outline-none transition placeholder:text-slate-500 focus:border-emerald-400"
                  required
                  minLength={6}
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-300">
                  Konfirmasi Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  placeholder="Ulangi password"
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm outline-none transition placeholder:text-slate-500 focus:border-emerald-400"
                  required
                  minLength={6}
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-2xl bg-emerald-400 px-5 py-3 font-black text-slate-950 transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-60"
              >
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
  );
}