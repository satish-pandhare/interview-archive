import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const tags = await db.tag.findMany();

    return NextResponse.json(tags);
  } catch (error) {
    console.error("[TAGS_GET]", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { name } = await request.json();
    const tag = await db.tag.create({
      data: {
        name,
      },
    });

    return NextResponse.json(tag, { status: 201 });
  } catch (error) {
    console.error("[TAGS_POST]", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
