import React from "react";
import AddEmplyeepage from "./components/addemployeeForm";
import Heading from "@/components/ui/heading";

const page = () => {
  return (
    <div className="flex-col m-8">
      <div className="">
        <Heading title="Add Employee" description={""} />
        <AddEmplyeepage />
      </div>
    </div>
  );
};

export default page;
