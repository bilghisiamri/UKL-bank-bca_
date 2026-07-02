"use client";

import { useState, useEffect, FormEvent } from "react";
import Image from "next/image";

interface ProfileData {
  nama: string;
  alamat: string;
  gender: string;
  telepon: string;
  foto: string;
  fotoFile: File | null;
}

const UpdateProfile = () => {
  const [formData, setFormData] = useState<ProfileData>({
    nama: "",
    alamat: "",
    gender: "",
    telepon: "",
    foto: "",
    fotoFile: null,
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("https://learn.smktelkom-mlg.sch.id/ukl1/api/profile");
        const data = await res.json();

        if (res.ok && data.status && data.data) {
          const profile = data.data;
          setFormData((prev) => ({
            ...prev,
            nama: profile.nama_pelanggan || "",
            alamat: profile.alamat || "",
            gender: profile.gender || "",
            telepon: profile.telepon || "",
            foto: profile.foto || "",
          }));
        } else {
          alert("Gagal memuat profil.");
        }
      } catch (error) {
        console.error("Error saat mengambil profile:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, files } = e.target as HTMLInputElement;

    if (name === "foto" && files && files[0]) {
      const file = files[0];
      setFormData({
        ...formData,
        foto: URL.createObjectURL(file),
        fotoFile: file,
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const payload = new URLSearchParams();
      payload.append("nama_pelanggan", formData.nama);
      payload.append("alamat", formData.alamat);
      payload.append("gender", formData.gender);
      payload.append("telepon", formData.telepon);

      const res = await fetch("https://learn.smktelkom-mlg.sch.id/ukl1/api/update/1", {
        method: "PUT",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: payload.toString(),
      });

      const data = await res.json();

      if (res.ok && data.status) {
        alert("Profil berhasil diupdate!");
      } else {
        alert("Gagal update: " + (data.message || "Terjadi kesalahan"));
      }
    } catch (error) {
      console.error("Error saat mengirim data:", error);
      alert("Terjadi kesalahan saat mengirim data.");
    }
  };

  return (
    <div className="min-h-screen bg-[url('/image/background.jpg')] bg-cover bg-center flex flex-col md:flex-row items-center justify-center px-50 py-15">
      <div className="flex-1 text-left md:mr-12 mb-10 md:mb-0">
        <h1 className="text-6xl font-extrabold text-[#075B5E] mb-3 leading-tight">
          Update Profil Anda
        </h1>
        <p className="text-base text-gray-600 leading-relaxed">
          Perbarui informasi akun Anda agar tetap aman dan terkini. Rasakan kemudahan dan kenyamanan bertransaksi di Bank Syariah Indonesia.
        </p>
      </div>

      <div className="flex-10/12 max-w-lg w-full border-2 bg-white rounded-3xl shadow-lg p-15 mt-9 md:mt-0">
        <div className="flex flex-col items-center mb-5">
          <Image alt="logo" width={100} height={100} src="/image/logo bank bsi.jpg" />
        </div>
        
        <h1 className="text-2xl font-extrabold text-[#235f61] text-center mb-5">
          Bank Syariah Indonesia
        </h1>

        <div className="flex justify-center mb-5">
          {formData.foto ? (
            <img
              src={formData.foto}
              alt="Foto Profil"
              className="w-28 h-28 object-cover rounded-full border-4 border-[#007C70] shadow-md"
            />
          ) : (
            <div className="w-28 h-28 flex items-center justify-center rounded-full border-4 border-dashed border-gray-300 text-[#007C70]">
              No Photo
            </div>
          )}
        </div>
        <div>
          <h2 className="text-base font-light text-[#6e6e6e] text-center mb-6">
           Formulir Update Profil
        </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="nama"
            placeholder="Nama Pelanggan"
            value={formData.nama}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#80D8C3]"
            required
          />

          <input
            type="text"
            name="alamat"
            placeholder="Alamat"
            value={formData.alamat}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#80D8C3]"
            required
          />

          <input
            type="text"
            name="telepon"
            placeholder="Telepon"
            value={formData.telepon}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#80D8C3]"
            required
          />

          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#80D8C3]"
            required
          >
            <option value="Pilih Gender">Pilih Gender</option>
            <option value="Laki-laki">Laki-laki</option>
            <option value="Perempuan">Perempuan</option>
          </select>

          <input
            type="file"
            name="foto"
            accept="image/*"
            onChange={handleChange}
            className="block w-full text-sm text-[#383838] file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-[#FFD66B] file:text-white hover:file:bg-[#FB9E3A]"
          />

          <button
            type="submit"
            className="w-full bg-[#007C70] hover:bg-[#00564F] text-white font-semibold py-3 rounded-2xl transition duration-300"
          >
            Simpan Perubahan
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;