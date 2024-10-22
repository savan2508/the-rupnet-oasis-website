import { getCabin } from "@/app/_lib/data-service";
import { Reservation } from "@/app/_components/Reservation";
import { Suspense } from "react";
import Spinner from "@/app/_components/Spinner";
import { Cabin } from "@/app/_components/Cabin";

export async function generateMetadata({ params }) {
  const cabin = await getCabin(params.cabinid);
  const { name, description } = cabin;

  return {
    title: `Cabin ${name}`,
    description: description,
  };
}

export default async function Page({ params }) {
  const cabin = await getCabin(params.cabinid);

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <Cabin cabin={cabin} />
      <div>
        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
