import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const {
      name,
      surname,
      dob,
      email,
      gender,
      job,
      phone,
      nationality,
      disability,
    } = body;

    console.log(`Body data: ${body}`);

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!name) {
      return new NextResponse("name is required", { status: 400 });
    }
    if (!surname) {
      return new NextResponse("surname is required", { status: 400 });
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
    if (!phone) {
      return new NextResponse("phone is required", { status: 400 });
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
        name: name,
        surname: surname,
        dob: dob,
        job: job,
        gender: gender,
        phone: phone,
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

export async function GET(req, { params }) {
  try {
    if (!params.employeeId) {
      return new NextResponse("Employee id is required", { status: 400 });
    }

    const employee = await prisma.employee.findMany({});

    return NextResponse.json(employee);
  } catch (error) {
    console.log("[EMPLOYEE_GET]", error);
    return new NextResponse("Internal Server", { status: 500 });
  }
}
