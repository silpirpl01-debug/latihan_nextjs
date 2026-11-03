import { events } from "@/data/data/events";

export async function GET() {
    return Response.json(events);
}