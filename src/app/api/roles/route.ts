import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const roles = await db.role.findMany();

    return NextResponse.json(roles);
  } catch (error) {
    console.error("[ROLES_GET]", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { name } = await request.json();
    const role = await db.role.create({
      data: {
        name,
      },
    });

    return NextResponse.json(role, { status: 201 });
  } catch (error) {
    console.error("[ROLES_POST]", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
