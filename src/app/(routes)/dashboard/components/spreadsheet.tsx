"use client";
import React from "react";
import { HotTable } from "@handsontable/react-wrapper";
import "handsontable/dist/handsontable.full.min.css";
import { registerAllModules } from "handsontable/registry";

registerAllModules();
const Spreadsheet = () => {
  const data = Array.from({ length: 500 }, () =>
    Array.from({ length: 500 }, () => "")
  );

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <HotTable
        data={data}
        colHeaders={true} // Enable column headers
        rowHeaders={true}
        manualColumnMove={true} // Enable row headers
        width="100%"
        height="100%"
        licenseKey="non-commercial-and-evaluation" // Add your license key if you have one
        stretchH="all" // Stretch columns to fit the width
        // Stretch rows to fit the height
        autoRowSize={false} // Disable auto row sizing for better performance
        autoColumnSize={false} // Disable auto column sizing for better performance
        manualRowResize={true} // Allow manual row resizing
        manualColumnResize={true} // Allow manual column resizing
        contextMenu={true} // Enable context menu
        dropdownMenu={true} // Enable dropdown menu
        filters={true} // Enable filters
        persistentState={true} // Save state (e.g., column widths, row heights)
      />
    </div>
  );
};

export default Spreadsheet;
