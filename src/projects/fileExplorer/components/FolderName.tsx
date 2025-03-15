import React, { forwardRef } from "react";
import { ButtonsPopup } from "./ButtonsPopup";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";

export interface FolderNameProps {
  isNameUpdating: boolean;
  showPopup: number | null;
  name: string;
  isFolder: boolean;
  id: number;
  handleRightClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onNameChange: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleDelete: () => void;
  handleRename: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  handleNewFolder: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    isFolder: boolean
  ) => void;
  setIsExpanded: (value: React.SetStateAction<boolean>) => void;
  isExpanded: boolean;
  hasChild: boolean;
}

export const FolderName = forwardRef<HTMLDivElement, FolderNameProps>(
  (
    {
      isNameUpdating,
      showPopup,
      name,
      isFolder,
      id,
      isExpanded,
      hasChild,
      handleRightClick,
      onNameChange,
      handleDelete,
      handleRename,
      handleNewFolder,
      setIsExpanded,
    },
    ref
  ) => {
    return (
      <div
        className={`${isFolder ? "folder" : "file"} ${
          showPopup === id ? "selected" : ""
        }`}
        onContextMenu={handleRightClick}
        onClick={isFolder ? () => setIsExpanded((prev) => !prev) : undefined}
      >
        <span className="folder-name" title={name}>
          {isFolder ? "📂" : "📄"}{" "}
          {isNameUpdating ? (
            <input defaultValue={name} onKeyDown={onNameChange} autoFocus />
          ) : (
            name
          )}
        </span>
        {hasChild && <div>{isExpanded ?  <BiChevronDown /> : <BiChevronUp />}</div>}
        <ButtonsPopup
          isFolder={isFolder}
          show={showPopup === id}
          ref={ref}
          handleDelete={handleDelete}
          handleRename={handleRename}
          onAddNew={handleNewFolder}
        />{" "}
      </div>
    );
  }
);
