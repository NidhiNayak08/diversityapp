"use client";

import React, { useState } from "react";
import PieChart from "./PieChart";
import BarChart from "./BarChart";

const ChartContainer = () => {
  const [selectedAttribute, setSelectedAttribute] = useState("gender");
  const [chartType, setChartType] = useState("pie");

  const handleAttributeChange = (event) => {
    setSelectedAttribute(event.target.value);
  };

  const handleChartTypeChange = (event) => {
    setChartType(event.target.value);
  };

  return (
    <div>
      <div>
        <label htmlFor="attribute-select">Select Attribute:</label>
        <select
          id="attribute-select"
          onChange={handleAttributeChange}
          value={selectedAttribute}
        >
          <option value="gender">Gender</option>
          <option value="disability">Disability</option>
          <option value="job">Job</option>
        </select>

        <label htmlFor="chart-type-select">Select Chart Type:</label>
        <select
          id="chart-type-select"
          onChange={handleChartTypeChange}
          value={chartType}
        >
          <option value="pie">Pie Chart</option>
          <option value="bar">Bar Chart</option>
        </select>
      </div>

      {chartType === "pie" ? (
        <PieChart selectedAttribute={selectedAttribute} />
      ) : (
        <BarChart selectedAttribute={selectedAttribute} />
      )}
    </div>
  );
};

export default ChartContainer;
