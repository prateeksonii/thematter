"use client";

import { useRouter } from "next/navigation";
import { FormEventHandler, useState, useTransition } from "react";
import { toast } from "react-hot-toast";
import Spinner from "../common/Spinner";

export default function CreateProjectForm() {
  const router = useRouter();
  const [isMutating, setIsMutating] = useState(false);
  const [, startTransition] = useTransition();
  const [errors, setErrors] = useState<{ title?: string }>({});

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    setIsMutating(true);
    const formData = new FormData(event.currentTarget);
    try {
      const res = await fetch("/api/projects", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.get("title"),
          description: formData.get("description") ?? null,
        }),
      });
      const json = await res.json();
      console.log(json);

      if (res.status !== 201) throw new Error(JSON.stringify(json.error));

      startTransition(() => {
        router.push(`/app/projects/${json.project.id}`);
      });
    } catch (err) {
      const error = err as any as Error;
      const errorObj = JSON.parse(error.message);

      toast.error(errorObj.message);

      setErrors(errorObj.errors);
    } finally {
      setIsMutating(false);
    }
  };

  return (
    <form
      method="post"
      className="w-[400px] flex flex-col gap-3"
      onSubmit={handleSubmit}
    >
      <label
        htmlFor="title"
        className="flex flex-col gap-1 group transition-all"
      >
        <span className=" group-focus-within:text-emerald-400">
          Title<span className="text-red-400">*</span>
        </span>
        <input
          name="title"
          className="bg-neutral-700 p-2 rounded-md border-none outline-none"
        />
        {errors?.title && <div className="text-red-400">{errors.title}</div>}
      </label>
      <label htmlFor="description" className="flex flex-col gap-1 group">
        <span className=" group-focus-within:text-emerald-400">
          Description
        </span>
        <textarea
          name="description"
          className="bg-neutral-700 p-2 rounded-md border-none outline-none"
        />
      </label>
      <button
        type="submit"
        disabled={isMutating}
        className="bg-emerald-600 disabled:bg-emerald-900 rounded-md p-2 mt-2 flex items-center justify-center transition-all"
      >
        {isMutating ? (
          <>
            <Spinner />
            Creating
          </>
        ) : (
          "Create"
        )}
      </button>
    </form>
  );
}
