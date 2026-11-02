import Link from "next/link";
import { rupiah, type Event } from "@/data/data/events";

export default function KartuEvent({ event }: { event: Event }) {
  const sisa = event.kuota - event.terisi;

  return (
    <div className="rounded-xl border bg-white p-4 shadow-sm">
      <span className="rounded-lg bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-700">
        {event.kategori}
      </span>

      <h3 className="mt-2 text-lg font-semibold">
        {event.judul}
      </h3>

      <p className="text-sm text-slate-500">
        {event.tanggal} · {event.lokasi}
      </p>

      <p className="mt-2 font-medium">
        {rupiah(event.harga)}
      </p>

      <p className="mt-2 text-sm font-semibold text-green-700">
        {sisa === 0 ? "Tiket habis" : `Sisa ${sisa} tiket`}
      </p>

      <Link
        href={`/event/${event.id}`}
        className="mt-3 inline-block rounded bg-blue-600 px-3 py-1.5 text-sm text-white hover:bg-blue-700"
      >
        Lihat detail
      </Link>
    </div>
  );
}