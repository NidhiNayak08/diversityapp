"use client";

import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(BarElement, Tooltip, Legend, CategoryScale, LinearScale);

const BarChart = ({ selectedAttribute }) => {
  const [data, setData] = useState([]);
  const [chartData, setChartData] = useState({});

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
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          },
        ],
      });
    }
  }, [data, selectedAttribute]);

  const options = {
    maintainAspectRatio: false,
    responsive: true,
  };

  return (
    <div className="h-{900px} w-{600px}">
      {chartData && chartData.labels && (
        <Bar data={chartData} options={options} />
      )}
    </div>
  );
};

export default BarChart;
