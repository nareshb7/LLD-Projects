import { useState } from "react";
import {
  generateBoard,
  isSudokuValid,
  Level,
  resetCurrentPuzzle,
} from "./helper";

let timeOut;

const genBoard = generateBoard("HARD");
const useSudoku = () => {
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
  return {
    board,
    selectedLevel,
    lastValue,
    timer,
    currentSelected,
    handleChange,
    handleFocus,
    handleCheck,
    handleRemove,
    handleReset,
    handleNewGame,
    handleLevelChange,
  };
};

export default useSudoku;
