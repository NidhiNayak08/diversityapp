import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Upload } from "lucide-react";

const ClientCsvUpload = () => {
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title="Add CSV File" description="" />
      </div>
      <Separator/>
    </>
  );
};

export default ClientCsvUpload;
