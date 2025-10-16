import { currentUser } from "@/lib/current-user";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json("Login Please", { status: 401 });
    }

    const { title, link, content, tags, companyId, groupId, roleId } =
      await request.json();

    const createdQuestion = await db.question.create({
      data: {
        title,
        content,
        link,
        groupId,
        createdById: user.id,
        roleId,
        tags: tags?.length
          ? {
              connect: tags.map((tagId: string) => ({ id: tagId })),
            }
          : undefined,
        companyId,
      },
      include: {
        tags: true,
        createdBy: true,
      },
    });

    return NextResponse.json(createdQuestion, { status: 201 });
  } catch (error) {
    console.error("[QUESTIONS_POST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const tags = searchParams.get("tags")?.split(",").filter(Boolean) || [];
    const companies =
      searchParams.get("companies")?.split(",").filter(Boolean) || [];
    const groups = searchParams.get("groups")?.split(",").filter(Boolean) || [];
    const roles = searchParams.get("roles")?.split(",").filter(Boolean) || [];

    const user = await currentUser();
    const whereClause: Record<string, unknown> = {};

    if (tags.length > 0) {
      whereClause.tags = {
        some: {
          name: {
            in: tags,
          },
        },
      };
    }

    if (roles.length > 0) {
      whereClause.role = {
        name: {
          in: roles,
        },
      };
    }

    if (companies.length > 0) {
      whereClause.Company = {
        name: {
          in: companies,
        },
      };
    }

    if (!user) {
      whereClause.groupId = null;
    } else if (groups.length > 0) {
      whereClause.AND = [
        {
          group: {
            name: {
              in: groups,
            },
          },
        },
        {
          group: {
            members: {
              some: {
                userId: user.id,
              },
            },
          },
        },
      ];
    } else {
      whereClause.OR = [
        { groupId: null },
        {
          group: {
            members: {
              some: {
                userId: user.id,
              },
            },
          },
        },
      ];
    }

    const questions = await db.question.findMany({
      where: whereClause,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        tags: {
          select: {
            id: true,
            name: true,
          },
        },
        Company: {
          select: {
            id: true,
            name: true,
          },
        },
        createdBy: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });

    return NextResponse.json(questions, { status: 200 });
  } catch (error) {
    console.error("[QUESTIONS_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
