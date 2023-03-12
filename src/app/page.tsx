import Link from "next/link";
import Balancer from "react-wrap-balancer";
import { getSession } from "../server/session";
import { redirect } from "next/navigation";
import SignIn from "./components/SignIn";

export default async function Home() {
  const session = await getSession();

  if (session) {
    redirect("/app");
  }

  return (
    <main className="mx-auto container">
      <div className="min-h-screen grid grid-cols-2 place-items-center">
        <div>
          <h1 className="text-6xl font-light">
            <Balancer>The best way to track your projects</Balancer>
          </h1>
          <div className="py-12 flex items-center gap-x-4">
            <SignIn />
            <Link
              href="/learn-more"
              className="border-2 border-neutral-100 text-neutral-100 py-4 px-8 text-lg font-bold rounded-full"
            >
              Learn more
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
