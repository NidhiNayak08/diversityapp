import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Trash, Upload } from "lucide-react";
import CSVform from "./csv-addform";

const ClientCsvUpload = () => {
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title="Add CSV File" description="" />
        {/* <div className="flex space-x-4">
          <Button className="flex items-center justify-center">
            <Upload className="h-4 w-4 mr-2" />
            AddFile
          </Button>
          <Button
            variant="destructive"
            className="flex items-center justify-center"
          >
            <Trash className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div> */}
      </div>
      <Separator />

      <CSVform/>
    </>
  );
};

export default ClientCsvUpload;
