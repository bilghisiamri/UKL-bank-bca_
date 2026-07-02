"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const RegisterPage = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    nama_nasabah: "",
    gender: "Laki-laki",
    alamat: "",
    telepon: "",
    username: "",
    password: "",
  });

  const [foto, setFoto] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFoto(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password.length < 6) {
      alert("Password harus minimal 6 karakter.");
      return;
    }

    setIsSubmitting(true);
    const url = "https://learn.smktelkom-mlg.sch.id/ukl_paket1/api/register"; // ✅ URL sudah benar
    const form = new FormData();

    form.append("nama_nasabah", formData.nama_nasabah);
    form.append("gender", formData.gender);
    form.append("alamat", formData.alamat);
    form.append("telepon", formData.telepon);
    form.append("username", formData.username);
    form.append("password", formData.password);
    if (foto) form.append("foto", foto);

    try {
      const response = await fetch(url, {
        method: "POST",
        body: form,
      });

      const data = await response.json();

      if (data.status === true) {
        alert(data.message);
        setTimeout(() => router.replace("/login"), 1500);
      } else {
        alert(data.message || "Terjadi kesalahan.");
      }
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan saat mengirim data.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-900 to-blue-900 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md px-8 py-10 relative">
        <div className="flex flex-col items-center">
          <Image
            alt="logo"
            width={100}
            height={100}
            src="/40392.webp"
            className="h-auto mb-4"
          />
          <h1 className="text-2xl font-bold text-gray-800 mb-1 uppercase text-center">
            Bank Central Asia
          </h1>
          <p className="text-sm text-gray-500 mb-6 text-center">
            Form Registrasi Nasabah Baru
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="nama_nasabah"
            placeholder="Nama Nasabah"
            value={formData.nama_nasabah}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="text"
            name="alamat"
            placeholder="Alamat"
            value={formData.alamat}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="tel"
            name="telepon"
            placeholder="Telepon"
            value={formData.telepon}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          >
            <option value="Laki-laki">Laki-laki</option>
            <option value="Perempuan">Perempuan</option>
          </select>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleFotoChange}
            className="w-full file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-900 file:text-white file:cursor-pointer hover:file:bg-blue-600"
            required
          />

          {foto && (
            <div className="flex justify-center">
              <img
                src={URL.createObjectURL(foto)}
                alt="Preview Foto"
                className="w-24 h-24 object-cover rounded-full border mt-2"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-900 hover:bg-blue-900 text-white font-semibold py-2 rounded-lg transition-all duration-300 disabled:opacity-50"
          >
            {isSubmitting ? "Loading..." : "Register"}
          </button>
        </form>

        <div className="absolute bottom-2 left-0 w-full text-center text-xs text-gray-400">
          &copy; 2024 SMK Telkom Malang
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
