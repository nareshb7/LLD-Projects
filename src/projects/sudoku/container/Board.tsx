import React, { useState } from "react";
import { Cell } from "../types";
import CellComp from "./Cell";

export interface BoardProps {
  board: Cell[][];
  selected: number[];
  lastValue: number | null;
  onFocus: (rowIndex: number, colIndex: number) => void;
  onChange: (rowIndex: number, colIndex: number, value: string) => void;
}

const Board = ({
  board,
  selected,
  lastValue,
  onFocus,
  onChange,
}: BoardProps) => {
  const [sRow, sCol] = selected || [];
  return (
    <div className="text-center m-4">
      {board.map((row, rowIndex) => {
        return (
          <div
            className="d-flex"
            style={{
              borderTop:
                rowIndex % 3 === 0 ? "2px solid #333" : "1px solid #ccc",
              width: "fit-content",
              margin: "0 auto",
            }}
            key={rowIndex}
          >
            {row.map((col, colIndex) => {
              const isSelected = rowIndex === sRow && colIndex === sCol;
              const isRowHighlight = rowIndex === sRow;
              const isColHighlight = colIndex === sCol;
              return (
                <CellComp
                  disabled={col.isDefaultValue}
                  key={colIndex}
                  value={`${
                    col.isDefaultValue
                      ? col.defaultValue
                      : col.value === 0
                      ? ""
                      : col.value
                  }`}
                  className={`${
                    col.isDefaultValue
                      ? ""
                      : isSelected
                      ? "bg-secondary text-white "
                      : isRowHighlight || isColHighlight
                      ? "bg-light fw-bold"
                      : ""
                  } ${lastValue === col.value && "fw-bold text-primary"}`}
                  style={{
                    cursor: col.isDefaultValue ? "not-allowed" : "pointer",
                    borderLeft:
                      colIndex % 3 === 0 ? "2px solid #333" : "1px solid #ccc",
                    borderRight:
                      colIndex === 8 ? "2px solid #333" : "1px solid #ccc",
                    borderBottom:
                      rowIndex === 8 ? "2px solid #333" : "1px solid #ccc",
                    backgroundColor: col.isDefaultValue
                      ? undefined
                      : isSelected
                      ? "#aaa"
                      : isRowHighlight || isColHighlight
                      ? "#f0f0f0"
                      : "",
                  }}
                  onChange={(value) =>
                    !col.isDefaultValue && onChange(rowIndex, colIndex, value)
                  }
                  onFocus={() => onFocus(rowIndex, colIndex)}
                />
              );
            })}
          </div>
        );
      })}
      <div className="d-flex gap-2 mt-2 mx-auto">
        {Array(9)
          .fill(0)
          .map((_, i) => (
            <button
              key={i}
              className="btn btn-light"
              style={{ width: 40, height: 40 }}
              onClick={() => onChange(sRow, sCol, `${i + 1}`)}
            >
              {i + 1}
            </button>
          ))}
      </div>
    </div>
  );
};

export default Board;
