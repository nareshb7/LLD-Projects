import React from "react";
import Board from "./container/Board";
import { convertSecondsToHours, levels } from "./helper";
import useSudoku, { MISTAKES_LIMT } from "./hook";
import "./style.css";
import SudokuProvider from "./context";

const Sudoku = () => {
  const {
    board,
    selectedLevel,
    lastValue,
    timer,
    currentSelected,
    mistakesCount,
    handleChange,
    handleFocus,
    handleCheck,
    handleRemove,
    handleReset,
    handleNewGame,
    handleLevelChange,
  } = useSudoku();
  return (
    <div className="sudoku-wrapper mx-auto my-2 ">
      <h3>Sudoku Puzzle</h3>
      <h5>Time: {convertSecondsToHours(timer)}</h5>
      <div className="my-2  mx-auto d-flex justify-content-evenly text-center">
        <select
          className="form-select w-50"
          onChange={handleLevelChange}
          value={(selectedLevel || "") as string}
        >
          <option value="">Select Level</option>
          {Object.keys(levels).map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
        {selectedLevel && (
          <div className="fw-bold w-50">
            {" "}
            Chances left : {MISTAKES_LIMT - mistakesCount}
          </div>
        )}
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

      <div className="mt-2 d-flex gap-2 text-center justify-content-evenly">
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

export const SudokuMain = () => {
  return (
    <SudokuProvider>
      <Sudoku />
    </SudokuProvider>
  );
};

export default SudokuMain;
