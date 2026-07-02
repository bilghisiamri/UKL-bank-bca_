"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const LoginPage = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password.length < 6) {
      alert("Password harus minimal 6 karakter.");
      return;
    }

    setIsSubmitting(true);

    const url = "https://learn.smktelkom-mlg.sch.id/ukl1/api/login";
    const form = new FormData();
    form.append("username", formData.username);
    form.append("password", formData.password);

    try {
      const response = await fetch(url, {
        method: "POST",
        body: form,
      });

      const data = await response.json();

      if (data.status === true) {
        alert(data.message);
        setTimeout(() => router.replace("/profile"), 1500);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan saat login.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[url('/image/background.jpg')] bg-cover bg-center flex flex-col md:flex-row items-center justify-center px-50 py-15">
      <div className="flex-1 text-left md:mr-12">
        <h1 className="text-5xl font-extrabold text-[#075B5E] mb-4">
          Hello, Welcome to
        </h1>
        <h1 className="text-6xl font-extrabold text-[#075B5E] mb-6">
          Bank Syariah Indonesia!
        </h1>
        <p className="text-base text-gray-600">
          Selamat datang di layanan digital kami. Gabung sekarang untuk merasakan
          kemudahan transaksi perbankan yang aman, nyaman, dan sesuai prinsip syariah.
        </p>
      </div>

      <div className="flex-10/12 max-w-lg w-full border-2 bg-white rounded-3xl shadow-lg p-15 mt-9 md:mt-0">
        <div className="flex flex-col items-center mb-5">
          <Image
            alt="logo"
            width={100}
            height={100}
            src="/image/logo bank bsi.jpg"
          />
        </div>

        <h1 className="text-2xl font-extrabold text-[#235f61] text-center mb-1">
          Bank Syariah Indonesia
        </h1>
        <h2 className="text-base font-light text-[#6e6e6e] text-center mb-6">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {[{ name: "username", placeholder: "Username", type: "text" },
            { name: "password", placeholder: "Password", type: "password" }
          ].map(({ name, placeholder, type }) => (
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

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#007C70] hover:bg-[#00564F] text-white font-semibold py-3 rounded-2xl mt-5 transition duration-300 disabled:opacity-50"
          >
            {isSubmitting ? "Loading..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
