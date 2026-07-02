"use client";

import React, { useEffect, useState } from "react";
import { Matkul } from "@/types/matkul";

export default function Page() {
  const [matkuls, setMatkuls] = useState<Matkul[]>([]);
  const [selected, setSelected] = useState<Matkul[]>([]);

  const BASE_URL = "https://learn.smktelkom-mlg.sch.id/ukl1/api";

  useEffect(() => {
    fetch(`${BASE_URL}/getmatkul`)
      .then((res) => res.json())
      .then((data) => {
        setMatkuls(data.data);
      })
      .catch((err) => {
        alert("Gagal mengambil data matkul");
        console.error(err);
      });
  }, []);

  const toggleSelect = (matkul: Matkul) => {
    const exists = selected.some((m) => m.id === matkul.id);
    if (exists) {
      setSelected(selected.filter((m) => m.id !== matkul.id));
    } else {
      setSelected([...selected, matkul]);
    }
  };

  const handleSubmit = () => {
    fetch(`${BASE_URL}/selectmatkul`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ list_matkul: selected }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message || "Berhasil mengirim data");
      })
      .catch((err) => {
        alert("Terjadi kesalahan saat mengirim data");
        console.error(err);
      });
  };

  return (
    <div className="min-h-screen bg-[#AF3E3E] py-12 px-4">
      <div className="max-w-4xl mx-auto bg-[#EAEBD0] shadow-2xl rounded-3xl p-10">
        <h1 className="text-4xl font-extrabold mb-10 text-center text-[#000000] tracking-wide">
          Daftar Mata Kuliah
        </h1>

        <table className="min-w-full text-sm border border-[#CD5656] rounded-2xl overflow-hidden">
          <thead className="bg-[#CD5656] text-[#000000] uppercase font-extrabold text-[13px] tracking-wider">
            <tr>
              <th className="px-4 py-3 text-left border-b border-[#AF3E3E]">ID</th>
              <th className="px-4 py-3 text-left border-b border-[#AF3E3E]">Mata Kuliah</th>
              <th className="px-4 py-3 text-left border-b border-[#AF3E3E]">SKS</th>
              <th className="px-4 py-3 text-center border-b border-[#AF3E3E]">Pilih</th>
            </tr>
          </thead>
          <tbody>
            {matkuls.map((matkul) => (
              <tr
                key={matkul.id}
                className="transition duration-300 ease-in-out hover:bg-[#DA6C6C] hover:scale-[1.02] hover:shadow-lg cursor-pointer"
              >
                <td className="px-4 py-3 border-b border-[#AF3E3E]">{matkul.id}</td>
                <td className="px-4 py-3 border-b border-[#AF3E3E]">{matkul.nama_matkul}</td>
                <td className="px-4 py-3 border-b border-[#AF3E3E]">{matkul.sks}</td>
                <td className="px-4 py-3 text-center border-b border-[#AF3E3E]">
                  <input
                    type="checkbox"
                    checked={selected.some((m) => m.id === matkul.id)}
                    onChange={() => toggleSelect(matkul)}
                    className="w-5 h-5 text-[#000000] focus:ring-[#000000] border-gray-300 rounded-xl cursor-pointer"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="text-center mt-10">
          <button
            onClick={handleSubmit}
            className="bg-[#000000] hover:bg-[#CD5656] text-white font-bold px-8 py-3 rounded-3xl shadow-md transition duration-300 ease-in-out hover:scale-105"
          >
            Simpan yang Terpilih
          </button>
        </div>

        {selected.length > 0 && (
          <div className="mt-10 bg-[#DA6C6C] p-6 rounded-2xl hover:shadow-2xl">
            <h2 className="text-xl font-semibold text-[#000000] mb-3">
              Mata Kuliah Terpilih:
            </h2>
            <ul className="list-disc list-inside text-[#000000] space-y-1">
              {selected.map((matkul) => (
                <li key={matkul.id}>
                  {matkul.nama_matkul} ({matkul.sks} SKS)
                </li>
              ))}
            </ul>
            <p className="mt-3 font-medium text-[#000000]">
              Total SKS: {selected.reduce((total, m) => total + m.sks, 0)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}