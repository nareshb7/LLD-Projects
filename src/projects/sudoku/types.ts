import { NotificationSeverity } from "../../hooks/useToastNotification";

export interface Cell {
  defaultValue: number;
  value: number;
  show: boolean;
  isDefaultValue: boolean;
}

export type Level = "EASY" | "MEDIUM" | "HARD";

export interface SudokuContextInterface {
  toastNotification: (message: string, severity?: NotificationSeverity) => void;
}

export interface SudokuProviderProps {
  children: React.JSX.Element;
}
