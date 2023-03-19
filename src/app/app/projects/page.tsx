import Link from "next/link";
import { redirect } from "next/navigation";
import { fetchLastProject } from "~/src/server/projects";
import { getSession } from "~/src/server/session";

export default async function AppPage(props: any) {
  const session = await getSession();

  if (!session) {
    redirect("/");
  }

  const project = await fetchLastProject();

  if (project) {
    redirect(`/app/projects/${project.id}`);
  }

  return (
    <>
      <div className="h-full grid place-items-center">
        <Link
          href="/app/projects/create"
          className="py-2 px-4 bg-emerald-600 rounded-lg hover:bg-emerald-800 transition-all"
        >
          Create a project
        </Link>
      </div>
    </>
  );
}
