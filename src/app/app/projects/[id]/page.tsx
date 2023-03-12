import { prisma } from "~/src/server/db";

const fetchProject = async (projectId: string) => {
  const project = await prisma.project.findFirst({
    where: {
      id: projectId,
    },
  });

  return project;
};

export default async function ProjectPage({
  params,
}: {
  params: { id: string };
}) {
  const project = await fetchProject(params.id);

  if (!project) {
    return <div>Invalid project selected</div>;
  }

  return (
    <div>
      <h1 className="text-4xl">{project.title}</h1>
    </div>
  );
}
