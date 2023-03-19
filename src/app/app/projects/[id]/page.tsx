import ProjectSelectContainer from "~/src/app/components/projects/ProjectSelectContainer";
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
      {/* @ts-expect-error Server Component */}
      <ProjectSelectContainer currentId={project.id} />
      <div className="p-2"></div>
      <small>Project</small>
      <h1 className="text-4xl">{project.title}</h1>
      {project.description ? (
        <p className="bg-neutral-800 p-4 mt-2 rounded-md">
          {project.description}
        </p>
      ) : (
        <p className="text-neutral-300">No description present</p>
      )}
    </div>
  );
}
