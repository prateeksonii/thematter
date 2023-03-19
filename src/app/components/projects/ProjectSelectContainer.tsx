import Link from "next/link";
import { prisma } from "~/src/server/db";
import { getCurrentUser } from "~/src/server/session";
import ProjectSelect from "./ProjectSelect";

const fetchProjects = async () => {
  const user = await getCurrentUser();
  return prisma.project.findMany({
    where: {
      userId: user?.id,
    },
    orderBy: {
      lastUpdatedAt: "desc",
    },
  });
};

export default async function ProjectSelectContainer({
  currentId,
}: {
  currentId: string;
}) {
  const projects = await fetchProjects();

  return (
    <div className="flex flex-col gap-1">
      <label className="w-full text-xs">Current project</label>
      <div className="flex items-center gap-2">
        <ProjectSelect projects={projects} currentId={currentId} />
        <Link
          href="/app/projects/create"
          className="py-2 px-4 bg-emerald-600 rounded-lg hover:bg-emerald-800 transition-all h-max"
        >
          Create new
        </Link>
      </div>
    </div>
  );
}
