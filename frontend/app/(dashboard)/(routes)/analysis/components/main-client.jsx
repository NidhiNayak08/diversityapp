import { Button } from "@/components/ui/button";
import DataTable from "@/components/ui/data-table";
import Heading from "@/components/ui/heading";
import { Upload } from "lucide-react";
import Statistics from "./Statistics";
import { columns } from "./columns";

const AnalysisClient = () => {
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title="Job Statistics" description="" />
        <Button variant="default" className="">
          <Upload className="h-4 w-4 mr-2 " />
          Add Export
        </Button>
      </div>
    </>
  );
};

export default AnalysisClient;
