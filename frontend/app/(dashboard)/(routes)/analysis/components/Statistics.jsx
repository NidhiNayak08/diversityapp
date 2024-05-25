"use client";
import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import { Icon, TrendingDown, TrendingUp } from "lucide-react";
import Trends from "./trends";

const Statistics = () => {
  const [data, setData] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    female: 0,
    male: 0,
    disability: 0,
  });

  // Load CSV data when the component mounts
  useEffect(() => {
    Papa.parse("/DDataset.csv", {
      download: true,
      header: true,
      complete: (results) => {
        const employees = results.data;
        // console.log("CSV Data:", results.data);
        setData(employees);
        calculateStats(employees);
      },
    });
  }, []);

  // Function to calculate statistics
  const calculateStats = (employees) => {
    const total = employees.length;

    // Filter out the employees with valid Gender and Disability fields
    const filteredData = employees.filter(
      (item) =>
        item && item.Gender !== undefined && item.Disability !== undefined
    );

    // Calculate statistics based on filtered data
    const female = filteredData.filter(
      (item) => item.Gender && item.Gender.toLowerCase() === "female"
    ).length;
    const male = filteredData.filter(
      (item) => item.Gender && item.Gender.toLowerCase() === "male"
    ).length;
    const disability = filteredData.filter(
      (item) => item.Disability && item.Disability.toLowerCase() === "yes"
    ).length;

    console.log(
      "Total:",
      total,
      "Female:",
      female,
      "Male:",
      male,
      "Disability:",
      disability
    );

    setStats({ total, female, male, disability });

    console.log(
      "Total:",
      total,
      "Female:",
      female,
      "Male:",
      male,
      "Disability:",
      disability
    );

    setStats({ total, female, male, disability });

    console.log(
      "Total:",
      total,
      "Female:",
      female,
      "Male:",
      male,
      "Disability:",
      disability
    );

    setStats({ total, female, male, disability });
  };

  return (
    <div className="flex justify-center border-2 border-slate-200 mt-6 rounded-lg">
      <div className="grid grid-cols-2 grid-rows-2 w-[40vw] flex-[40%] border-r-2 border-slate-200 p-4">
        <Trends
          Heading="Total Employees"
          Count={stats.total}
          border={"border-r-2"}
        />
        <Trends Heading="Female Employee" Count={stats.female} border={""} />
        <Trends
          Heading="Male Employee"
          Count={stats.male}
          border={"border-r-2 border-t-2"}
        />
        <Trends
          Heading="Disability Employees"
          Count={stats.disability}
          border={"border-t-2"}
        />
      </div>

      <div className="flex-[60%]">
        
      </div>
    </div>
  );
};

export default Statistics;
