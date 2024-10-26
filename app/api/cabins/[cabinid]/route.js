import { getBookedDatesByCabinId, getCabin } from "@/app/_lib/data-service";

export async function GET(req, { params }) {
  const { cabinid } = params;

  try {
    const [cabin, bookedDates] = await Promise.all([
      getCabin(cabinid),
      getBookedDatesByCabinId(cabinid),
    ]);

    return Response.json({ cabin, bookedDates });
  } catch (error) {
    return new Response("Error fetching cabin data", { status: 500 });
  }
}
