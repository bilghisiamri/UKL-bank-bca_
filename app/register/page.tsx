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
    const url = "https://learn.smktelkom-mlg.sch.id/ukl1/api/register";
    const form = new FormData();

    for (const key in formData) {
      form.append(key, formData[key as keyof typeof formData]);
    }

    if (foto) form.append("foto", foto);

    try {
      const response = await fetch(url, {
        method: "POST",
        body: form,
      });

      const contentType = response.headers.get("content-type");

      if (contentType?.includes("application/json")) {
        const data = await response.json();

        if (data.status === true) {
          alert(data.message);
          setTimeout(() => router.replace("/login"), 1500);
        } else {
          alert(data.message || "Terjadi kesalahan.");
        }
      } else {
        const errorText = await response.text();
        console.error("\u274C Bukan JSON:", errorText);
        alert("Kesalahan server. Cek console.");
      }
    } catch (error) {
      console.error("\u274C Error:", error);
      alert("Terjadi kesalahan saat mengirim data.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[url('/image/background.jpg')] bg-cover bg-center flex flex-col md:flex-row items-center justify-center px-50 py-15">
      <div className="flex-1 text-left md:mr-12">
        <div className="flex items-center mb-4">
        </div>
        <h1 className="text-6xl font-extrabold text-[#075B5E] mb-4">
          Formulir Pendaftaran</h1> 
          <h1 className="text-6xl font-extrabold text-[#075B5E] mb-4">
            Nasabah Baru</h1>
        <p className="text-base text-gray-600">
          Isi data diri Anda untuk membuat akun dan mulai gunakan layanan perbankan
        </p >
        <p className="text-base text-gray-600"> 
          syariah secara online. Aman, mudah, dan praktis!</p>
      </div>
      

      <div className="flex-10/12 max-w-lg w-full border-2 bg-white rounded-3xl shadow-lg p-15 mt-9 md:mt-0">
      <div className="flex flex-col items-center mb-5">
                <Image
                  alt="logo"
                  width={100}
                  height={100}
                  src="/image/logo bank bsi.jpg"
                  className=""
                />
      </div>
      <div>
        <h1 className="text-2xl font-extrabold text-[#235f61] text-center mb-1">Bank Syariah Indonesia</h1>
      </div>
        <h2 className="text-base font-light text-[#6e6e6e] text-center mb-6">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {[{ name: "nama_nasabah", placeholder: "Nama Nasabah" },
            { name: "alamat", placeholder: "Alamat" },
            { name: "telepon", placeholder: "Telepon", type: "tel" },
            { name: "username", placeholder: "Username" },
            { name: "password", placeholder: "Password", type: "password" },
          ].map(({ name, placeholder, type = "text" }) => (
            <input
              key={name}
              type={type}
              name={name}
              placeholder={placeholder}
              value={formData[name as keyof typeof formData]}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-[#80D8C3]"
              required
            />
          ))}

          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl px-5 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#80D8C3]"
            required
          >
            <option value="Laki-laki">Laki-Laki</option>
            <option value="Perempuan">Perempuan</option>
          </select>

          <input
            type="file"
            accept="image/*"
            onChange={handleFotoChange}
            className="w-full file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-[#FFD66B] file:text-white file:cursor-pointer hover:file:bg-[#FB9E3A]"
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
            className="w-full bg-[#007C70] hover:bg-[#00564F] text-white font-semibold py-3 rounded-2xl mt-5 transition duration-300 disabled:opacity-50"
          >
            {isSubmitting ? "Mendaftarkan..." : "Daftar Sekarang"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
