import React, { createContext, useContext } from "react";
import useToastNotification, {
  NotificationSeverity,
} from "../../hooks/useToastNotification";
import { SudokuContextInterface, SudokuProviderProps } from "./types";

export const SudokuContext = createContext<SudokuContextInterface | null>(null);

const SudokuProvider = ({ children }: SudokuProviderProps) => {
  const { triggerNotification, NotificationComponent } =
    useToastNotification("top-right");
  const toastNotification = (
    message: string,
    severity: NotificationSeverity = "info"
  ) => {
    triggerNotification({
      severity,
      message,
      duration: 5000,
    });
  };
  return (
    <SudokuContext.Provider value={{ toastNotification }}>
      {NotificationComponent}
      {children}
    </SudokuContext.Provider>
  );
};

export const useSudokuContext = () =>
  useContext(SudokuContext) as SudokuContextInterface;

export default SudokuProvider;
