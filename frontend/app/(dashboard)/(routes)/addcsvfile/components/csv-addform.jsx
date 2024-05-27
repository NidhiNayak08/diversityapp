"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Papa from "papaparse";
import { Separator } from "@/components/ui/separator";
import Heading from "@/components/ui/heading";
import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
  TableCaption,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area"; // Importing ScrollArea
import { Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";

const formSchema = z.object({
  file: z
    .any()
    .refine(
      (file) => file && file.length === 1 && file[0].type === "text/csv",
      {
        message: "Please upload a valid CSV file",
      }
    ),
});

const CSVform = () => {
  const router = useRouter();
  const [csvData, setCsvData] = useState([]);
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      file: null,
    },
  });

  const handleSubmit = (values) => {
    const file = values.file[0];

    Papa.parse(file, {
      header: true,
      complete: (result) => {
        setCsvData(result.data);
        setSelectedColumns(Object.keys(result.data[0] || {})); // Initialize selected columns with all columns
        console.log(result.data);
      },
      error: (error) => {
        console.log("Error parsing CSV file:", error);
      },
    });
  };

  const handleColumnChange = (column) => {
    setSelectedColumns((prev) =>
      prev.includes(column)
        ? prev.filter((col) => col !== column)
        : [...prev, column]
    );
  };

  const handleFilterData = () => {
    const filtered = csvData.map((row) =>
      Object.fromEntries(
        Object.entries(row).filter(([key]) => selectedColumns.includes(key))
      )
    );
    setFilteredData(filtered);
  };

  const handledataPost = async () => {
    try {
      setLoading(true);
      if (filteredData) {
        await axios.post(`/api/csvupload/`, filteredData);
      }
      router.refresh();
      router.push(`/analysis`);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center mt-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="max-width-md w-full flex flex-col gap-4"
          >
            <div className="flex items-center">
              <FormField
                control={form.control}
                name="file"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Add CSV File</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept=".csv"
                          onChange={(e) => field.onChange(e.target.files)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </div>
            <Button type="submit" className="w-20 mb-6">
              Submit
            </Button>
          </form>
        </Form>
      </div>

      {csvData.length > 0 && (
        <>
          <Separator />
          <div className="mt-4 w-full">
            <Heading title="Select Columns" description="" />
            <ScrollArea className="h-64 w-full border rounded p-4 mt-6">
              <div className="grid grid-cols-2 gap-4">
                {Object.keys(csvData[0]).map((column) => (
                  <label key={column} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedColumns.includes(column)}
                      onChange={() => handleColumnChange(column)}
                    />
                    <span>{column}</span>
                  </label>
                ))}
              </div>
            </ScrollArea>

            <Button onClick={handleFilterData} className="mt-4 mb-6">
              Filter Data
            </Button>
          </div>
        </>
      )}

      <Separator />

      {/* {filteredData.length > 0 && console.log(`filterd data : ${filteredData}`)} */}
      {filteredData.length > 0 && (
        <div className="mt-6 w-full overflow-auto">
          <div className="flex justify-between">
            <Heading title="Filtered Data" description="" />
            <Button
              onClick={handledataPost}
              className="flex items-center justify-center"
            >
              <Upload className="h-4 w-4 mr-2" />
              Post Data
            </Button>
          </div>
          <Table className="min-w-full mt-4">
            <TableCaption>
              A list of filtered data from the CSV file.
            </TableCaption>
            <TableHeader>
              <TableRow>
                {selectedColumns.map((column) => (
                  <TableHead key={column}>{column}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {selectedColumns.map((column) => (
                    <TableCell key={column}>{row[column]}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </>
  );
};

export default CSVform;
