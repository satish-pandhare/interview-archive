import { currentUser } from "@/lib/current-user";
import { v4 as uuidv4 } from "uuid";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const user = await currentUser();

    if (!user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { name, imageUrl } = await request.json();

    const group = await db.group.create({
      data: {
        userId: user.id,
        name,
        imageUrl,
        inviteCode: uuidv4(),
        members: {
          create: {
            userId: user.id,
            role: "ADMIN",
          },
        },
      },
    });

    return NextResponse.json(group, { status: 201 });
  } catch (error) {
    console.error("[GROUP_POST] Error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function GET() {
  try {
    const user = await currentUser();

    if (!user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const groups = await db.group.findMany({
      where: {
        members: {
          some: {
            userId: user.id,
          },
        },
      },
      include: {
        members: true,
      },
    });

    return NextResponse.json(groups, { status: 200 });
  } catch (error) {
    console.error("[GROUP_GET] Error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
