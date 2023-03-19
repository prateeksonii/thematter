import { prisma } from "~/src/server/db";
import { Status } from "@prisma/client";
import Link from "next/link";
import { HiPlus } from "react-icons/hi2";

const fetchTasks = async (status: Status) => {
  return prisma.task.findMany({
    where: {
      status,
    },
  });
};

export default async function TasksPage() {
  const tasks = await fetchTasks(Status.TODO);

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl">Tasks</h1>
        <Link
          href="/app/tasks/create"
          className="py-2 px-4 flex items-center gap-1 bg-emerald-600 rounded-lg hover:bg-emerald-800 transition-all"
        >
          Create new <HiPlus />
        </Link>
      </div>
      {tasks.length > 0 ? (
        <div>tasks</div>
      ) : (
        <p className="flex-1 grid place-items-center h-full text-lg">
          No tasks at the moment
        </p>
      )}
    </div>
  );
}
