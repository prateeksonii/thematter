import CreateTaskForm from "~/src/app/components/forms/CreateTaskForm";
import { fetchProjects } from "~/src/server/projects";

export default async function TaskCreatePage() {
  const projects = await fetchProjects();
  return (
    <div className="mx-auto w-max flex flex-col gap-8 items-center justify-center h-full">
      <h1 className="text-4xl w-max">Create a new task</h1>
      <CreateTaskForm projects={projects} data-superjson />
    </div>
  );
}
