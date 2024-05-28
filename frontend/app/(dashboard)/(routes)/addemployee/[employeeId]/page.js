import React from "react";
import AddEmployeeForm from "./components/addemployeeForm";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const Employeepage = async ({ params }) => {
  const { employeeId } = params;

  let employee = null;

  if (employeeId !== "new") {
    employee = await prisma.employee.findFirst({
      where: {
        id: employeeId,
      },
    });
  }

  return (
    <div className="flex-col m-8">
      <div className="">
       
        <AddEmployeeForm initialdata={employee} />
      </div>
    </div>
  );
};

export default Employeepage;
