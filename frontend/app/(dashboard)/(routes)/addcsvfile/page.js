
import AddCSV from "./components/csv-addform";
import ClientCsvUpload from "./components/client-main";

const AddFilepage = () => {
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
            <ClientCsvUpload/>
      </div>
    </div>
  );
}

export default AddFilepage;
