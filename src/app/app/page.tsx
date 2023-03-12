import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "~/src/server/session";

export default async function AppPage(props: any) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/");
  }

  return (
    <div className="h-full grid place-items-center">
      <Link
        href="/app/projects/create"
        className="py-2 px-4 bg-emerald-600 rounded-lg hover:bg-emerald-800 transition-all"
      >
        Create a project
      </Link>
    </div>
  );
}
