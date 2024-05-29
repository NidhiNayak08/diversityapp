"use client";

import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const [data, setData] = useState([]);
  const [selectedAttribute, setSelectedAttribute] = useState("gender");
  const [chartData, setChartData] = useState({});

  //to setData into data state by fetching employee data
  useEffect(() => {
    fetch("/api/employees")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      const attributeCounts = data.reduce((acc, employee) => {
        const key = employee[selectedAttribute];
        acc[key] = acc[key] ? acc[key] + 1 : 1;
        return acc;
      }, {});

      const labels = Object.keys(attributeCounts);
      const counts = Object.values(attributeCounts);

      setChartData({
        labels,
        datasets: [
          {
            label: `Count of ${selectedAttribute}`,
            data: counts,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      });
    }
  }, [data, selectedAttribute]);

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    aspectRatio: 1,
  };

  //set aselectedAttribute to whatvr user enters
  const handleChange = (event) => {
    setSelectedAttribute(event.target.value);
  };

  return (
    <div>
      <select onChange={handleChange} value={selectedAttribute}>
        <option value="gender">Gender</option>
        <option value="disability">Disability</option>
        <option value="job">Job</option>
      </select>
      {chartData && chartData.labels && <Pie data={chartData} />}
    </div>
  );
};

export default PieChart;
