import { auth } from "@/app/_lib/auth";

export const metadata = {
  title: "Account",
  description: "Account page",
};

export default async function Page() {
  const session = await auth();

  return (
    <>
      <h1 className="font-semibold text-2xl text-accent-400 mb-7">Account</h1>
      <h2 className="font-medium text-lg text-accent-300 mb-4">
        Welcome, {session?.user?.name}
      </h2>
    </>
  );
}
