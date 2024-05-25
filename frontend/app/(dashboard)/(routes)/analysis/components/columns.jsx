"use client";

import { createColumnHelper } from "@tanstack/react-table";
import PropTypes from "prop-types";

const columnHelper = createColumnHelper();

// Define prop types for your data
const DataPropTypes = {
  Name: PropTypes.string.isRequired,
  Division: PropTypes.string.isRequired,
  Gender: PropTypes.string.isRequired,
  Email: PropTypes.string | undefined,
};

const columns = [
  columnHelper.accessor("Name", {
    header: "Name",
  }),
  columnHelper.accessor("Gender", {
    header: "Gender",
  }),
  columnHelper.accessor("Email", {
    header: "Email",
  }),
  columnHelper.accessor("Division", {
    header: "Department",
  }),
];

export { columns, DataPropTypes };
