import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const companies = await db.company.findMany();

    return NextResponse.json(companies);
  } catch (error) {
    console.error("[COMPANIES_GET]", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { name, logoUrl } = await request.json();
    const company = await db.company.create({
      data: {
        name,
        logoUrl,
      },
    });

    return NextResponse.json(company, { status: 201 });
  } catch (error) {
    console.error("[COMPANIES_POST]", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
