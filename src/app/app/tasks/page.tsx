import { Status } from "@prisma/client";
import Link from "next/link";
import { HiPlus } from "react-icons/hi2";
import { fetchTasks } from "~/src/server/tasks";

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
        <ul className="grid grid-cols-4 gap-8">
          {tasks.map((task) => (
            <li key={task.id} className="p-4 bg-neutral-800 rounded-md">
              <h2 className="font-bold text-2xl">{task.title}</h2>
              <div className="text-sm flex items-center justify-between">
                <span>{task.status}</span>
                <span>{task.priority}</span>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="flex-1 grid place-items-center h-full text-lg">
          No tasks at the moment
        </p>
      )}
    </div>
  );
}
