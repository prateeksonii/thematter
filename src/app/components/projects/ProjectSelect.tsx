"use client";

import { Project } from "@prisma/client";
import { useRouter } from "next/navigation";
import { ChangeEventHandler, useState, useTransition } from "react";

export default function ProjectSelect({
  projects,
  currentId,
}: {
  projects: Project[];
  currentId: string;
}) {
  const router = useRouter();
  const [, startTransition] = useTransition();

  const handleChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    startTransition(() => {
      router.push(`/app/projects/${event.target.value}`);
    });
  };
  return (
    <select
      className="bg-neutral-800 rounded-lg w-max min-w-[400px]"
      onChange={handleChange}
      value={currentId}
    >
      {projects.map((project) => (
        <option key={project.id} value={project.id}>
          {project.title}
        </option>
      ))}
    </select>
  );
}
