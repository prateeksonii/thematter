"use client";

import { signIn } from "next-auth/react";

export default function SignIn() {
  return (
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
  );
}
