import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const data = await auth.api.getSession({
      headers: await headers(),
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error("[SESSION_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
