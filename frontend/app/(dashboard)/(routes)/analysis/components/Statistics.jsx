"use client";
import React, { useEffect, useState } from "react";
import Papa from "papaparse";

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
    <div className="grid grid-cols-2 grid-rows-2 ">
      <div className="bg-slate-900">
        <h3 className="text-lg font-semibold mb-2">Total Employees</h3>
        <p>{stats.total}</p>
      </div>
      <div className="bg-slate-400">
        <h3 className="text-lg font-semibold mb-2">Female Employees</h3>
        <p>{stats.female}</p>
      </div>
      <div className="bg-white">
        <h3 className="text-lg font-semibold mb-2">Male Employees</h3>
        <p>{stats.male}</p>
      </div>
      <div className="bg-white">
        <h3 className="text-lg font-semibold mb-2">Disability Count</h3>
        <p>{stats.disability}</p>
      </div>
    </div>
  );
};

export default Statistics;
