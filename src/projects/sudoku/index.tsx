import React, { useState } from "react";
import Board from "./container/Board";
import "./style.css";
import {
  convertSecondsToHours,
  generateBoard,
  isSudokuValid,
  Level,
  levels,
  resetCurrentPuzzle,
} from "./helper";

let timeOut;

const genBoard = generateBoard("HARD");
const Sudoku = () => {
  const [board, setBoard] = useState(genBoard);
  const [selectedLevel, setSelectedLevel] = useState<Level | null>(null);
  const [lastValue, setLastValue] = useState<number | null>(null);
  const [timer, setTimer] = useState(0);
  const [currentSelected, setCurrentSelected] = useState<number[] | null>(null);

  const startTimer = () => {
    clearTimeout(timeOut);
    setTimer(0);
    timeOut = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);
  };

  const clearTimer = () => {
    clearInterval(timeOut);
  };
  const handleChange = (row: number, col: number, value: string) => {
    console.log("val::", value);
    const num = parseInt(value[value.length - 1]) || 0;
    if (isNaN(num)) return;

    const newBoard = board.map((row) => [...row]);
    newBoard[row][col].value = num;
    setBoard(newBoard);
    setLastValue(num);
    if (isSudokuValid(newBoard)) {
      const message = `Welldone, You have completed the Sudoku Puzzle`;
      alert(message);
    }
  };
  const handleRemove = () => {
    if (currentSelected) {
      const [row, col] = currentSelected;
      handleChange(row, col, "0");
      // setCurrentSelected(null);
    }
  };
  const handleLevelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as Level;
    setSelectedLevel(value);
    if (value) {
      setBoard(generateBoard(value));
      startTimer();
    }
  };

  const handleReset = () => {
    const updatedBoard = resetCurrentPuzzle(board);
    setBoard(updatedBoard);
    clearTimer();
  };

  const handleNewGame = () => {
    const newBoard = generateBoard(selectedLevel as Level);
    console.log("board:new", newBoard);
    setBoard(newBoard);
    startTimer();
  };

  const handleCheck = () => {
    if (currentSelected) {
      const [row, col] = currentSelected;
      handleChange(row, col, `${board[row][col].defaultValue}`);
      // setCurrentSelected(null);
    }
  };

  const handleFocus = (row: number, col: number) => {
    setCurrentSelected([row, col]);
    setLastValue(board[row][col].value || null);
  };
  return (
    <div className="sudoku-wrapper mx-auto my-2 ">
      <h3>Sudoku Puzzle</h3>
      <h5>Time: {convertSecondsToHours(timer)}</h5>
      <div className="my-2 w-50">
        <select
          className="form-select form-control"
          onChange={handleLevelChange}
          value={selectedLevel as string}
        >
          <option value="">Select Level</option>
          {Object.keys(levels).map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
      </div>
      {selectedLevel && (
        <Board
          selected={currentSelected as number[]}
          board={board}
          onChange={handleChange}
          onFocus={handleFocus}
          lastValue={lastValue}
        />
      )}

      <div className="mt-2 d-flex gap-2 text-center">
        <button className="btn btn-info" onClick={handleCheck}>
          Check
        </button>
        <button className="btn btn-secondary" onClick={handleRemove}>
          Remove
        </button>
        <button className="btn btn-danger" onClick={handleReset}>
          Reset
        </button>
        <button className="btn btn-primary" onClick={handleNewGame}>
          New Game
        </button>
      </div>
    </div>
  );
};

export default Sudoku;
