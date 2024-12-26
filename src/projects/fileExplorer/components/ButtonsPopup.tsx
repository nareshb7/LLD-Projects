import React, { forwardRef } from "react";

export interface ButtonsPopupProps {
    show: boolean;
    onAddNew: (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
      isFolder: boolean
    ) => void;
    handleRename: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    handleDelete: () => void;
    isFolder: boolean;
  }
  
  export const ButtonsPopup = forwardRef<HTMLDivElement, ButtonsPopupProps>(
    ({ show, isFolder, onAddNew, handleRename, handleDelete }, ref) => {
      return (
        <div
          className="btns-section"
          ref={ref}
          style={{ display: !show ? "none" : "flex" }}
        >
          {isFolder && (
            <>
              <button onClick={(e) => onAddNew(e, true)}>New Folder</button>
              <button onClick={(e) => onAddNew(e, false)}>New File</button>
            </>
          )}
          <button onClick={handleRename}>Rename</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      );
    }
  );