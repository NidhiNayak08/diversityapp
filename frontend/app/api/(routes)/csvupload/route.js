import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const { userId } = auth();
    const { data } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!Array.isArray(data) || data.length === 0) {
      return new NextResponse("Invalid data format", { status: 400 });
    }

    const mappedData = data.map((employee) => ({
      name: employee.Name || "",
      surname: employee.Surname || "",
      dob: employee["Date of Birth"]
        ? new Date(employee["Date of Birth"])
        : new Date(),
      gender: employee.Gender || "",
      phone: employee["Mobile Number"] || "",
      email: employee.Email || "",
      disability: employee.Disability || "",
      nationality: employee.Nationality || "",
    }));

    console.log("Mapped Employees Data: ", JSON.stringify(mappedData));

    const result = await prisma.employee.createMany({
      data: mappedData,
      skipDuplicates: true,
    });

    return NextResponse.json({
      message: "Employees added successfully",
      result,
    });
  } catch (error) {
    console.error("[CSV_UPLOAD_POST]", error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // The .code property can be accessed in a PrismaClientKnownRequestError instance
      console.error(
        "Prisma Client Known Request Error: ",
        error.code,
        error.message
      );
    } else if (error instanceof Prisma.PrismaClientValidationError) {
      console.error("Prisma Client Validation Error: ", error.message);
    } else {
      console.error("Unexpected Error: ", error);
    }

    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
