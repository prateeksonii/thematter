import CreateProjectForm from "~/src/app/components/forms/CreateProjectForm";

export default function ProjectCreatePage() {
  return (
    <div className="mx-auto w-max flex flex-col gap-8 items-center justify-center h-full">
      <h1 className="text-4xl w-max">Create a new project</h1>
      <CreateProjectForm />
    </div>
  );
}
