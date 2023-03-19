import { Task } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "~/src/pages/api/auth/[...nextauth]";
import { prisma } from "~/src/server/db";
import { TaskError } from "~/src/types/dto/errors";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      {
        ok: false,
        error: {
          message: "Unauthorized",
        },
      },
      {
        status: 401,
      }
    );
  }

  const data = (await request.json()) as Partial<Task>;
  console.log(data);

  const errors: TaskError = {};

  if (!data.title) {
    errors.title = "Title is required";
  }

  if (!data.projectId) {
    errors.projectId = "Project is required";
  }

  if (errors.title) {
    return NextResponse.json(
      {
        ok: false,
        error: {
          message: "Validation failed",
          errors,
        },
      },
      {
        status: 400,
      }
    );
  }

  const userId = session.user.id;

  const existingTask = await prisma.task.findFirst({
    where: {
      title: data.title,
    },
  });

  if (existingTask) {
    return NextResponse.json(
      {
        ok: false,
        error: {
          message: "Task with same name already exists",
        },
      },
      {
        status: 409,
      }
    );
  }

  const task = await prisma.task.create({
    data: {
      title: data.title!,
      description: data.description,
      projectId: data.projectId!,
      userId,
    },
  });

  return NextResponse.json(
    {
      ok: true,
      task,
    },
    {
      status: 201,
    }
  );
}
