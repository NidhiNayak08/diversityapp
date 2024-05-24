import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Upload } from "lucide-react";

const AnalysisClient = () => {
  return (
    <div className="flex items-center justify-between">
      <Heading title="Job Statistics" description="" />
      <Button variant="default" className="">
        <Upload  className="h-4 w-4 mr-2 "/>
        Add Export
      </Button>
    </div>
  );
};

export default AnalysisClient;
