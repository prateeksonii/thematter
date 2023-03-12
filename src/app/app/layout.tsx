import Image from "next/image";
import Toaster from "../components/common/Toaster";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="h-screen p-4 grid grid-cols-[80px_auto] gap-4">
        <div className="h-full bg-neutral-800 rounded-xl flex flex-col items-center shadow">
          <div className="pt-2"></div>
          <div className="h-14 w-14 rounded-full bg-neutral-900 grid place-items-center">
            <Image src="/logo.png" alt="logo" height={50} width={50} />
          </div>
        </div>
        <div>{children}</div>
      </div>
      <Toaster position="top-right" />
    </>
  );
}
