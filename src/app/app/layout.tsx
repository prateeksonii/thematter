import Nav from "../components/common/Nav";
import Toaster from "../components/common/Toaster";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="h-screen p-4 grid grid-cols-[80px_auto] gap-4">
        <Nav />
        <div>{children}</div>
      </div>
      <Toaster position="top-right" />
    </>
  );
}
