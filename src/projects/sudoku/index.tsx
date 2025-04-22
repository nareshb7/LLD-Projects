import React, { useState } from "react";
import Board from "./container/Board";
import "./style.css";

const emptyBoard = new Array(9).fill(0).map(() => Array(9).fill(0));

const Sudoku = () => {
  const [board, setBoard] = useState(emptyBoard);
  const [currentSelected, setCurrentSelected] = useState<number[] | null>(null);
  const handleChange = (row: number, col: number, value: number) => {
    console.log("row::", row, col, value);
    const newBoard = board.map((row) => [...row]);
    newBoard[row][col] = value;
    setBoard(newBoard);
  };
  const handleRemove = () => {
    console.log("current:::", currentSelected);
    if (currentSelected) {
      const [row, col] = currentSelected;
      handleChange(row, col, 0);
      setCurrentSelected(null);
    }
  };
  return (
    <div className="sudoku-wrapper">
      <h3>Sudoku</h3>
      <Board
        selected={currentSelected as number[]}
        board={board}
        onChange={handleChange}
        onFocus={(row, col) => setCurrentSelected([row, col])}
      />
      <div className="mt-2 d-flex gap-2">
        <button className="btn btn-info">Check</button>
        <button className="btn btn-danger" onClick={handleRemove}>
          Remove
        </button>
      </div>
    </div>
  );
};

export default Sudoku;
