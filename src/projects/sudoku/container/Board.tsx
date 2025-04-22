import React, { useState } from "react";
const emptyBoard = new Array(9).fill(0).map(() => Array(9).fill(0));
export interface BoardProps {
  board: number[][];
  selected: number[];
  onFocus: (rowIndex: number, colIndex: number) => void;
  onChange: (rowIndex: number, colIndex: number, value: number) => void;
}

const Board = ({ board, selected, onFocus, onChange }: BoardProps) => {
  const [sRow, sCol] = selected || [];
  return (
    <div>
      {board.map((row, rowIndex) => {
        console.log("row::", rowIndex, rowIndex % 3 == 0);
        return (
          <div
            style={{
              borderTop: rowIndex % 3 == 0 ? "1px solid #888" : "",
              width: "fit-content",
              textAlign: "center",
            }}
            id={`${rowIndex}`}
            key={rowIndex}
          >
            {row.map((col, colIndex) => (
              <input
                key={colIndex}
                value={col == 0 ? "" : col}
                id={`${colIndex}`}
                className="input-box"
                style={{
                  backgroundColor:
                    rowIndex === sRow && colIndex == sCol ? "#ddd" : "",

                  borderLeft: colIndex % 3 == 0 ? "2px solid #888" : "",
                }}
                onChange={(e) =>
                  onChange(rowIndex, colIndex, parseInt(e.target.value))
                }
                onFocus={() => onFocus(rowIndex, colIndex)}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default Board;
