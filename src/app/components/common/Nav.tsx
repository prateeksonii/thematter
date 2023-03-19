"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiFolder, HiPuzzlePiece } from "react-icons/hi2";

export default function Nav() {
  const pathname = usePathname();
  console.log(pathname?.startsWith("/app/projects"));

  return (
    <nav className="h-full bg-neutral-800 rounded-xl flex flex-col items-center shadow">
      <div className="pt-2"></div>
      <div className="h-14 w-14 rounded-full bg-neutral-900 grid place-items-center">
        <Image src="/logo.png" alt="logo" height={50} width={50} />
      </div>
      <div className="pt-4 flex flex-col gap-2">
        <Link
          href="/app/projects"
          className={`w-14 h-14 grid place-items-center bg-neutral-900 rounded-full ${
            pathname?.startsWith("/app/projects") ? "!bg-emerald-600" : ""
          }`}
          title="Projects"
        >
          <HiFolder />
        </Link>
        <Link
          href="/app/tasks"
          className={`w-14 h-14 grid place-items-center bg-neutral-900 rounded-full ${
            pathname?.startsWith("/app/tasks") ? "!bg-emerald-600" : ""
          }`}
        >
          <HiPuzzlePiece />
        </Link>
      </div>
    </nav>
  );
}
