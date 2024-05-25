"use client";


import DataTable from "@/components/ui/data-table";
import AnalysisClient from "./components/main-client";
import Statistics from "./components/Statistics";
import { columns } from "./components/columns";
import Heading from "@/components/ui/heading";


const Analysispage = () => {
  
  return (
    <div className="flex-col m-8">
      <div className="flex-1 space-y-4 pt">
        <AnalysisClient />
      </div>
      <Statistics />
      <div className="mt-8">
        <Heading title="Employee Details" description="" />
        <DataTable searchKey="name" columns={columns} data={""} />
      </div>
    </div>
  );
};

export default Analysispage;
