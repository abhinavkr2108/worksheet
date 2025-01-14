"use client";
import React, { useRef, useState } from "react";
import { HotTable } from "@handsontable/react-wrapper";
import {
  HyperFormula,
  FunctionPlugin,
  FunctionArgumentType,
  SimpleRangeValue,
  CellError,
  ErrorType,
} from "hyperformula";
import "handsontable/dist/handsontable.full.min.css";
import { registerAllModules } from "handsontable/registry";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

registerAllModules();

// Custom plugin class for HyperFormula
class MyCustomPlugin extends FunctionPlugin {
  // TRIM: Removes leading and trailing whitespace
  trim(ast: any, state: any) {
    return this.runFunction(ast.args, state, this.metadata("TRIM"), (text) => {
      if (typeof text !== "string") {
        return new CellError(
          "VALUE" as ErrorType,
          "The argument must be a string."
        );
      }
      return text.trim();
    });
  }

  // UPPER: Converts text to uppercase
  upper(ast: any, state: any) {
    return this.runFunction(ast.args, state, this.metadata("UPPER"), (text) => {
      if (typeof text !== "string") {
        return new CellError(
          "VALUE" as ErrorType,
          "The argument must be a string."
        );
      }
      return text.toUpperCase();
    });
  }

  // LOWER: Converts text to lowercase
  lower(ast: any, state: any) {
    return this.runFunction(ast.args, state, this.metadata("LOWER"), (text) => {
      if (typeof text !== "string") {
        return new CellError(
          "VALUE" as ErrorType,
          "The argument must be a string."
        );
      }
      return text.toLowerCase();
    });
  }

  // REMOVE_DUPLICATES: Removes duplicate rows
  removeDuplicates(ast: any, state: any) {
    return this.runFunction(
      ast.args,
      state,
      this.metadata("REMOVE_DUPLICATES"),
      (range) => {
        if (!(range instanceof SimpleRangeValue)) {
          return new CellError(
            "VALUE" as ErrorType,
            "The argument must be a range."
          );
        }
        const uniqueRows = Array.from(
          new Set(range.data.map((row) => JSON.stringify(row)))
        ).map((row) => JSON.parse(row));
        return SimpleRangeValue.onlyValues(uniqueRows);
      }
    );
  }

  // FIND_AND_REPLACE: Finds and replaces text in a range
  // FIND_AND_REPLACE: Finds and replaces text in a range
  findAndReplace(ast: any, state: any) {
    return this.runFunction(
      ast.args,
      state,
      this.metadata("FIND_AND_REPLACE"),
      (range, findText, replaceText) => {
        if (!(range instanceof SimpleRangeValue)) {
          return new CellError(
            "VALUE" as ErrorType,
            "The first argument must be a range."
          );
        }

        if (typeof findText !== "string" || typeof replaceText !== "string") {
          return new CellError(
            "VALUE" as ErrorType,
            "Find and replace text must be strings."
          );
        }

        try {
          // Access the data directly from SimpleRangeValue
          const replacedData = range.data.map((row) =>
            row.map((cell) => {
              // Handle null, undefined, and non-string values
              if (
                cell === null ||
                cell === undefined ||
                typeof cell !== "string"
              ) {
                return cell;
              }
              // Safely handle string replacement
              try {
                return cell.replace(new RegExp(findText, "g"), replaceText);
              } catch (e) {
                // If RegExp creation fails, do literal string replacement
                return cell.split(findText).join(replaceText);
              }
            })
          );

          return new SimpleRangeValue(replacedData);
        } catch (error) {
          return new CellError(
            "VALUE" as ErrorType,
            "Error processing range values."
          );
        }
      }
    );
  }
}

// Add implemented functions metadata
MyCustomPlugin.implementedFunctions = {
  TRIM: {
    method: "trim",
    parameters: [{ argumentType: FunctionArgumentType.STRING }],
  },
  UPPER: {
    method: "upper",
    parameters: [{ argumentType: FunctionArgumentType.STRING }],
  },
  LOWER: {
    method: "lower",
    parameters: [{ argumentType: FunctionArgumentType.STRING }],
  },
  REMOVE_DUPLICATES: {
    method: "removeDuplicates",
    parameters: [{ argumentType: FunctionArgumentType.RANGE }],
  },
  FIND_AND_REPLACE: {
    method: "findAndReplace",
    parameters: [
      { argumentType: FunctionArgumentType.RANGE },
      { argumentType: FunctionArgumentType.STRING },
      { argumentType: FunctionArgumentType.STRING },
    ],
  },
};

// Register the custom plugin with HyperFormula
HyperFormula.registerFunctionPlugin(MyCustomPlugin);

// Create a HyperFormula instance
const hyperFormulaInstance = HyperFormula.buildEmpty({
  licenseKey: "internal-use-in-handsontable",
});

interface SpreadsheetProps {
  docId: string;
  name: string;
}
export default function Spreadsheet({ docId, name }: SpreadsheetProps) {
  console.log("docId:", docId);
  const [data, setData] = useState<any[][]>([]);
  const hotTableRef = useRef<any>(null);
  const cellData = Array.from({ length: 500 }, () =>
    Array.from({ length: 500 }, () => "")
  );

  React.useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const response = await axios.get(`/api/get?docId=${docId}`);
        if (response.data) {
          const initialData = Array.from({ length: 500 }, () =>
            Array.from({ length: 500 }, () => "")
          );
          response.data.forEach((cell: any) => {
            initialData[cell.row][cell.column] = cell.value;
          });
          setData(initialData);
        }
      } catch (error) {
        console.error("Error fetching initial data:", error);
      }
    };

    fetchInitialData();
  }, [docId]);

  const handleSave = async () => {
    if (!hotTableRef.current) return;
    const hotInstance = hotTableRef.current.hotInstance;
    if (!hotInstance) return;

    const cells = [];
    for (let row = 0; row < 500; row++) {
      for (let col = 0; col < 500; col++) {
        const value = hotInstance.getDataAtCell(row, col);
        if (value !== null && value !== undefined && value !== "") {
          cells.push({ row, column: col, value });
        }
      }
    }

    try {
      await axios.post("/api/save", {
        cells,
        docId,
      });
      toast.success("Data saved successfully");
    } catch (error) {
      console.error("Error saving data:", error);
      toast.error("Error saving data");
    }
  };

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <div className="w-full border-b h-10 bg-slate-100 flex items-center justify-between px-4 py-5">
        <h1 className="font-bold text-xl">{name}</h1>
        <Button onClick={handleSave}>Save</Button>
      </div>
      <HotTable
        ref={hotTableRef}
        data={data}
        formulas={{
          engine: hyperFormulaInstance,
        }}
        mergeCells={true}
        trimRows={true}
        colHeaders={true}
        rowHeaders={true}
        manualColumnMove={true}
        width="100%"
        height="100%"
        licenseKey="non-commercial-and-evaluation"
        stretchH="all"
        autoRowSize={false}
        autoColumnSize={false}
        manualRowResize={true}
        manualColumnResize={true}
        contextMenu={true}
        dropdownMenu={true}
        filters={true}
        persistentState={true}
      />
    </div>
  );
}
