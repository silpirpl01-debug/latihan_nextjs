"use client";

import { useState } from "react";
import { rupiah, type Event } from "@/data/data/events";
import KartuEvent from "./kartuEvent";
import KontrolKatalog from "./Kontrolkatalog";

export default function KatalogInteraktif({
  events,
}: {
  events: Event[];
}) {
  const [cari, setCari] = useState("");
  const [kategori, setKategori] = useState("Semua");
  const [urut, setUrut] = useState("tanggal");
  const [jumlahTampil, setJumlahTampil] = useState(4);
  const [hanyaTersedia, setHanyaTersedia] = useState(false);
  const [hargaMaksimal, setHargaMaksimal] = useState("");

  const daftarKategori = [
    "Semua",
    ...new Set(events.map((e) => e.kategori)),
  ];

  // Fungsi perubahan kontrol
  const ubahCari = (nilai: string) => {
    setCari(nilai);
    setJumlahTampil(4);
  };

  const ubahKategori = (nilai: string) => {
    setKategori(nilai);
    setJumlahTampil(4);
  };

  const ubahUrut = (nilai: string) => {
    setUrut(nilai);
    setJumlahTampil(4);
  };

  const ubahKetersediaan = (nilai: boolean) => {
    setHanyaTersedia(nilai);
    setJumlahTampil(4);
  };

  const ubahHargaMaksimal = (nilai: string) => {
    setHargaMaksimal(nilai);
    setJumlahTampil(4);
  };

  // Filter event
  const hasil = events.filter((e) => {
    const cocokCari = e.judul
      .toLowerCase()
      .includes(cari.toLowerCase());

    const cocokKategori =
      kategori === "Semua" || e.kategori === kategori;

    const cocokTiket =
      !hanyaTersedia || e.kuota > e.terisi;

    const cocokHarga =
      hargaMaksimal === "" ||
      e.harga <= Number(hargaMaksimal);

    return (
      cocokCari &&
      cocokKategori &&
      cocokTiket &&
      cocokHarga
    );
  });

  // Pengurutan event
  const tersusun = [...hasil].sort((a, b) => {
    if (urut === "murah") return a.harga - b.harga;
    if (urut === "mahal") return b.harga - a.harga;
    if (urut === "nama") return a.judul.localeCompare(b.judul);
    return a.tanggal.localeCompare(b.tanggal);
  });

  // Menghitung total harga
  const totalHarga = tersusun.reduce(
    (total, e) => total + e.harga,
    0
  );

  // Menghitung total sisa tiket
  const totalSisaTiket = tersusun.reduce(
    (total, e) => total + (e.kuota - e.terisi),
    0
  );

  // Menghitung rata-rata harga
  const rataRataHarga =
    tersusun.length > 0
      ? Math.round(totalHarga / tersusun.length)
      : null;

  // Menampilkan kartu sesuai jumlah
  const eventDitampilkan = tersusun.slice(0, jumlahTampil);

  return (
    <div>
      {/* Komponen Kontrol Katalog */}
      <KontrolKatalog
        cari={cari}
        onCariChange={ubahCari}
        kategori={kategori}
        daftarKategori={daftarKategori}
        onKategoriChange={ubahKategori}
        urut={urut}
        onUrutChange={ubahUrut}
        hanyaTersedia={hanyaTersedia}
        onHanyaTersediaChange={ubahKetersediaan}
        hargaMaksimal={hargaMaksimal}
        onHargaMaksimalChange={ubahHargaMaksimal}
      />

      {/* Jumlah Event */}
      <p className="mb-3 text-sm text-slate-500">
        {tersusun.length} event ditemukan
      </p>

      {/* Statistik Katalog */}
      <p className="mb-4 rounded-lg bg-slate-100 p-3 text-sm text-slate-700">
        Rata-rata harga{" "}
        <span className="font-semibold">
          {rataRataHarga === null
            ? "-"
            : rupiah(rataRataHarga)}
        </span>
        . Total sisa tiket{" "}
        <span className="font-semibold">
          {totalSisaTiket}
        </span>
        .
      </p>

      {/* Daftar Event */}
      {tersusun.length === 0 ? (
        <p className="text-slate-500">
          Tidak ada event yang cocok.
        </p>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {eventDitampilkan.map((e) => (
              <KartuEvent key={e.id} event={e} />
            ))}
          </div>

          {/* Tombol Tampilkan Lagi */}
          {jumlahTampil < tersusun.length && (
            <div className="mt-6 text-center">
              <button
                onClick={() =>
                  setJumlahTampil((jumlah) => jumlah + 4)
                }
                className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
              >
                Tampilkan lagi (
                {Math.min(4, tersusun.length - jumlahTampil)} lagi)
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}