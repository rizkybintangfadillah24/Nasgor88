import { redirect } from "next/navigation";

export default function MahasiswaPage() {
  // Saat user membuka /mahasiswa
  // otomatis diarahkan ke dashboard
  redirect("/mahasiswa/dashboard");
}