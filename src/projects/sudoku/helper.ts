import { Cell, Level } from "./types";

export const SIZE = 9;

const createEmptyBoard = (): Cell[][] => {
  return Array.from({ length: SIZE }, () =>
    Array.from(
      { length: SIZE },
      (): Cell => ({
        defaultValue: 0,
        show: true,
        value: 0,
        isDefaultValue: true,
      })
    )
  );
};

const isSafe = (board: Cell[][], row: number, col: number, num: number) => {
  for (let x = 0; x < SIZE; x++) {
    if (board[row][x].value == num || board[x][col].value == num) {
      return false;
    }
  }

  const startRow = row - (row % 3);
  const startCol = col - (col % 3);
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i + startRow][j + startCol].value === num) {
        return false;
      }
    }
  }
  return true;
};
const shuffle = (arr: number[]) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // Ensures j is in [0, i]
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

// const shuffle = (arr: number[]) => {
//   for (let i = 0; i < SIZE; i++) {
//     let j = Math.floor(Math.random() * i+1);
//     console.log("number::", i, j);
//     [arr[i], arr[j]] = [arr[j], arr[i]];
//   }
//   return arr;
// };

const solveBoard = (board: Cell[][]) => {
  for (let row = 0; row < SIZE; row++) {
    for (let col = 0; col < SIZE; col++) {
      if (board[row][col].value == 0) {
        const numbers = shuffle([...new Array(SIZE).keys()].map((n) => n + 1));
        // console.log("number:::", numbers);
        for (const num of numbers) {
          if (isSafe(board, row, col, num)) {
            board[row][col].value = num;
            board[row][col].defaultValue = num;
            if (solveBoard(board)) return true;
            board[row][col].value = 0;
            board[row][col].defaultValue = 0;
          }
        }
        return false;
      }
    }
  }

  return true;
};

// After creating board based on level we are removing cells value
const removeCells = (board: Cell[][], cellsCount: number) => {
  let count = 0;
  while (count < cellsCount) {
    let row = Math.floor(Math.random() * SIZE);
    let col = Math.floor(Math.random() * SIZE);

    if (board[row][col].value != 0) {
      board[row][col].value = 0;
      board[row][col].show = false;
      board[row][col].isDefaultValue = false;
      count++;
    }
  }
};

export const resetCurrentPuzzle = (board: Cell[][]) => {
  return board.map((row) =>
    row.map((col) => ({ ...col, value: col.isDefaultValue ? col.value : 0 }))
  );
};

export const isSudokuValid = (board: Cell[][]) => {
  for (let row = 0; row < SIZE; row++) {
    for (let col = 0; col < SIZE; col++) {
      if (board[row][col].value !== board[row][col].defaultValue) {
        return false;
      }
    }
  }
  return true;
};

export const levels = {
  EASY: 35,
  MEDIUM: 45,
  HARD: 60,
};

export const generateBoard = (level: Level) => {
  const board = createEmptyBoard();
  solveBoard(board);
  removeCells(board, levels[level] || 30);
  return board;
};

export const convertSecondsToHours = (time: number) => {
  const minutes = Math.floor(time / 60);
  let hours = Math.floor(minutes / 60);
  let remainingMinutes = minutes % 60;
  let seconds = time % 60;

  const pad = (n: number) => String(n).padStart(2, "0");

  if (hours > 0)
    return `${pad(hours)}:${pad(remainingMinutes)}:${pad(seconds)}`;

  return `${pad(remainingMinutes)}:${pad(seconds)}`;
};
