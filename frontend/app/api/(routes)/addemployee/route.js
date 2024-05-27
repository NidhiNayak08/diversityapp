import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const {
      firstname,
      lastname,
      dob,
      email,
      gender,
      job,
      mobile,
      nationality,
      disability,
    } = body;

    console.log(`Body data: ${body}`);

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!firstname) {
      return new NextResponse("firstname is required", { status: 400 });
    }
    if (!lastname) {
      return new NextResponse("lastname is required", { status: 400 });
    }
    if (!dob) {
      return new NextResponse("dob is required", { status: 400 });
    }
    if (!gender) {
      return new NextResponse("gender is required", { status: 400 });
    }
    if (!job) {
      return new NextResponse("job is required", { status: 400 });
    }
    if (!mobile) {
      return new NextResponse("mobile is required", { status: 400 });
    }
    if (!nationality) {
      return new NextResponse("nationality is required", { status: 400 });
    }
    if (!disability) {
      return new NextResponse("disability is required", { status: 400 });
    }
    if (!email) {
      return new NextResponse("email is required", { status: 400 });
    }

    const employee = await prisma.employee.create({
      data: {
        name: firstname,
        surname: lastname,
        dob: dob,
        gender: gender,
        phone: mobile,
        email: email,
        disability: disability,
        nationality: nationality,
      },
    });

    return NextResponse.json(employee);
  } catch (error) {
    console.log("[EMPLOYEE_POST]", error);
    return new NextResponse("Internal Server", { status: 500 });
  }
}
