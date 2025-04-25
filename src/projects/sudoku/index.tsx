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
    isGamePaused,
    handleChange,
    handleFocus,
    handleCheck,
    handleRemove,
    handleReset,
    handleNewGame,
    handleLevelChange,
    handleGamePause,
  } = useSudoku();
  return (
    <div className="sudoku-wrapper mx-auto my-2 col-12 col-sm-6 col-lg-4 px-1">
      <h3>Sudoku Puzzle</h3>
      <h5>Time: {convertSecondsToHours(timer)}</h5>
      <div className="my-2  mx-auto d-flex justify-content-evenly text-center">
        <select
          className="form-select w-50"
          onChange={handleLevelChange}
          value={(selectedLevel || "") as string}
          disabled={isGamePaused}
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
          isBoardDisabled={isGamePaused}
        />
      )}

      <div className="mt-2 d-flex gap-2 text-center justify-content-evenly">
        <button
          className="btn btn-info"
          disabled={isGamePaused}
          onClick={handleCheck}
        >
          Check
        </button>
        <button
          className="btn btn-secondary"
          disabled={isGamePaused}
          onClick={handleRemove}
        >
          Remove
        </button>
        <button
          className="btn btn-danger"
          disabled={isGamePaused}
          onClick={handleReset}
        >
          Reset
        </button>
        <button
          className="btn btn-primary"
          disabled={isGamePaused}
          onClick={handleNewGame}
        >
          New Game
        </button>
        <button
          className="btn btn-warning"
          disabled={!selectedLevel}
          onClick={handleGamePause}
        >
          {isGamePaused ? "Resume" : "Pause"}
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
