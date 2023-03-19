import { prisma } from "./db";
import { getCurrentUser } from "./session";

export const fetchLastProject = async () => {
  const user = await getCurrentUser();
  return prisma.project.findFirst({
    where: {
      userId: user?.id,
    },
    orderBy: {
      lastUpdatedAt: "desc",
    },
  });
};

export const fetchProject = async (projectId: string) => {
  const project = await prisma.project.findFirst({
    where: {
      id: projectId,
    },
  });

  return project;
};

export const fetchProjects = async () => {
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
