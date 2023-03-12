import { Project } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "~/src/pages/api/auth/[...nextauth]";
import { prisma } from "~/src/server/db";

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

  const data = (await request.json()) as Partial<Project>;

  const errors: { title?: string } = {};

  if (!data.title) {
    errors.title = "Title is required";
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

  const existingProject = await prisma.project.findFirst({
    where: {
      title: data.title,
    },
  });

  if (existingProject) {
    return NextResponse.json(
      {
        ok: false,
        error: {
          message: "Project with same name already exists",
        },
      },
      {
        status: 409,
      }
    );
  }

  const project = await prisma.project.create({
    data: {
      title: data.title!,
      description: data.description,
      userId,
    },
  });

  return NextResponse.json(
    {
      ok: true,
      project,
    },
    {
      status: 201,
    }
  );
}
