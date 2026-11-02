import Link from "next/link";
import { events } from "@/data/data/events";
import KartuEvent from "@/components/components/kartuEvent";

export default function Katalog() {
  return (
    <div>
      <Link
        href="/event"
        className="text-sm text-blue-600 hover:underline"
      >
        ← Kembali ke katalog
      </Link>

      <h1 className="mb-4 mt-4 text-2xl font-bold">
        Katalog Event
      </h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((e) => (
          <KartuEvent key={e.id} event={e} />
        ))}
      </div>
    </div>
  );
}