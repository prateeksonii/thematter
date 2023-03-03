"use client";

import Link from "next/link";
import Balancer from "react-wrap-balancer";
import { signIn } from "next-auth/react";

export default function Home() {
  return (
    <main className="mx-auto container">
      <div className="min-h-screen grid grid-cols-2 place-items-center">
        <div>
          <h1 className="text-6xl font-light">
            <Balancer>The best way to track your projects</Balancer>
          </h1>
          <div className="py-12 flex items-center gap-x-4">
            <button
              onClick={() =>
                signIn("github", {
                  callbackUrl: "/app",
                })
              }
              className="bg-neutral-100 text-neutral-900 py-4 px-8 text-lg font-bold rounded-full"
            >
              Sign in with Github
            </button>
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
