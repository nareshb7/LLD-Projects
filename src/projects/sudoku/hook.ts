import { useState } from "react";
import { generateBoard, isSudokuValid, resetCurrentPuzzle } from "./helper";
import { useSudokuContext } from "./context";
import { Level } from "./types";

let timeOut;
export const MISTAKES_LIMT = 3;
const genBoard = generateBoard("HARD");
const useSudoku = () => {
  const { toastNotification } = useSudokuContext();
  const [board, setBoard] = useState(genBoard);
  const [selectedLevel, setSelectedLevel] = useState<Level | null>(null);
  const [lastValue, setLastValue] = useState<number | null>(null);
  const [timer, setTimer] = useState(0);
  const [currentSelected, setCurrentSelected] = useState<number[] | null>(null);
  const [mistakesCount, setMistakeCount] = useState(0);

  const startTimer = () => {
    clearTimeout(timeOut);
    setTimer(0);
    timeOut = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);
  };

  const clearTimer = () => {
    clearInterval(timeOut);
    setTimer(0);
  };
  const handleChange = (row: number, col: number, value: string) => {
    const num = parseInt(value[value.length - 1]) || 0;
    if (isNaN(num)) return;

    const newBoard = board.map((row) => [...row]);

    newBoard[row][col].value = num;
    setBoard(newBoard);
    setLastValue(num);
    if (newBoard[row][col].defaultValue !== num) {
      const newMistakeCount = mistakesCount + 1;
      let message = `This is wrong value you have only ${
        MISTAKES_LIMT - newMistakeCount
      } chances left`;
      if (newMistakeCount == MISTAKES_LIMT) {
        message = "Game is over, 0 Chances left";
        setMistakeCount(0);
        handleReset();
        setSelectedLevel(null);
        setCurrentSelected(null);
        setLastValue(null);
      } else {
        setMistakeCount(newMistakeCount);
      }
      toastNotification(message, "danger");

      return;
    }
    if (isSudokuValid(newBoard)) {
      const message = `Welldone, You have completed the Sudoku Puzzle`;
      toastNotification(message, "success");
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
    mistakesCount,
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
