"use client";

import DataTable from "@/components/ui/data-table";
import AnalysisClient from "./components/main-client";
import Statistics from "./components/Statistics";
import { columns } from "./components/columns";
import Heading from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Plus, Upload } from "lucide-react";

const Analysispage = () => {
  return (
    <div className="flex-col m-8">
      <div className="flex-1 space-y-4 pt">
        <AnalysisClient />
      </div>
      <Statistics />
      <div className="mt-8">
        <div className="flex items-center justify-between">
          <Heading title="Employee Details" description="" />
          <div className="space-x-4 ">
            <Button variant="default" className="">
              <Plus className="h-4 w-4 mr-1"/>
              Add Employee
            </Button>
            <Button variant="default" className="">
              <Upload className="h-4 w-4 mr-2 " />
              Import Data
            </Button>
          </div>
        </div>
        <DataTable searchKey="name" columns={columns} data={""} />
      </div>
    </div>
  );
};

export default Analysispage;
