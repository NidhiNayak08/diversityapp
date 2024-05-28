"use client"

import React from "react";
import Heading from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  return (
    <div className="flex-col m-8">
      <div className="flex justify-between">
        <Heading title="Add Employee" description={""} />
        <Button className="" onClick={() => router.push(`/addemployee/new`)}>
          <Plus className="h-4 w-4 mr-2" />
          Add New
        </Button>
      </div>
    </div>
  );
};

export default page;
