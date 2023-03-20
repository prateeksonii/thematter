import { Status } from "@prisma/client";
import { prisma } from "./db";
import { getCurrentUser } from "./session";

export const fetchTasks = async (status: Status) => {
  const user = await getCurrentUser();

  return prisma.task.findMany({
    where: {
      userId: user?.id,
      status,
    },
  });
};
