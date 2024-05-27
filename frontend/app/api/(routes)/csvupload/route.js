import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export async function POST(req) {
  try {
    const { userId } = auth();
    const body = await req.json();

    console.log(`Body data: ${body}`);

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    return NextResponse.json("OK");
  } catch (error) {
    console.log("[CSV_POST]", error);
    return new NextResponse("Internal Server", { status: 500 });
  }
}
