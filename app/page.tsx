import Link from "next/link";

export default function Beranda() {
  const events = [
    { id: 1, nama: "Workshop Coding" },
    { id: 2, nama: "Lomba Desain" },
    { id: 3, nama: "Festival Musik" },
  ];

  return (
    <section className="py-12 text-center">
      <h1 className="text-4xl font-bold">
        Temukan event seru di sekolahmu
      </h1>

      <p className="mt-3 text-slate-600">
        Workshop, lomba, musik, dan bazar. Pesan tiketnya di sini.
      </p>

      <div className="mt-6">
        {events.map((e) => (
          <div key={e.id}>
            <p>{e.nama}</p>
          </div>
        ))}
      </div>

      <Link
        href="/event"
        className="mt-6 inline-block rounded-lg bg-green-600 px-5 py-2.5 font-medium text-white hover:bg-green-700"
      >
        Lihat semua event
      </Link>
    </section>
  );
}