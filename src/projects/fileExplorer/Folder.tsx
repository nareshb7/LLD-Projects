import React, { forwardRef, useRef, useState } from "react";
import { FolderName } from "./components/FolderName";
import { FolderInterface } from "./config";
import { sortFoldersAndFiles } from "./utils/util";

export interface FolderProps {
  explorer: FolderInterface;
  showPopup: number | null;
  setShowPopup: React.Dispatch<React.SetStateAction<number | null>>;
  handleAddNew: (folderId: number, name: string, isFolder: boolean) => void;
  onDelete: (folderId: number) => void;
  onRename: (folderId: number, newName: string) => void;
}

const Folder = forwardRef<HTMLDivElement, FolderProps>(({
  explorer,
  showPopup,
  setShowPopup,
  handleAddNew,
  onDelete,
  onRename,
}, ref) => {
  const popupRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: true,
  });
  const [isNameUpdating, setIsNameUpdating] = useState(false);

  const onAddNew = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value;
    if (e.keyCode == 13 && value) {
      handleAddNew(explorer.id, value, showInput.isFolder);
      setShowInput({ ...showInput, visible: false });
    }
  };

  const handleNewFolder = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    isFolder: boolean
  ) => {
    e.stopPropagation();
    setShowPopup(null);
    setIsExpanded(true);
    setShowInput({ ...showInput, visible: true, isFolder });
  };

  const handleRename = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setShowPopup(null);
    setIsNameUpdating(true);
  };

  const onNameChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value;
    if (e.keyCode == 13 && value) {
      setIsNameUpdating(false);

      onRename(explorer.id, value);
    }
  };

  const handleDelete = () => {
    setShowPopup(null);
    onDelete(explorer.id);
  };

  const handleRightClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
    
    if (ref) {
      if (typeof ref === "function") {
        ref(popupRef.current); // Handle callback refs
      } else {
        (ref as React.MutableRefObject<HTMLDivElement | null>).current =
          popupRef.current; // Handle MutableRefObject
      }
    }
    
    setShowPopup(explorer.id);
  };

  if (explorer.isFolder) {
    return (
      <div style={{ marginTop: 5 }}>
        <FolderName
          ref={popupRef}
          id={explorer.id}
          setIsExpanded={setIsExpanded}
          showPopup={showPopup}
          name={explorer.name}
          isFolder={explorer.isFolder}
          handleDelete={handleDelete}
          handleNewFolder={handleNewFolder}
          handleRename={handleRename}
          handleRightClick={handleRightClick}
          isNameUpdating={isNameUpdating}
          onNameChange={onNameChange}
        />
        <div
          style={{ display: isExpanded ? "block" : "none", paddingLeft: 25 }}
        >
          {showInput.visible && (
            <div className="input-conatiner">
              <span>{showInput.isFolder ? "📁" : "📄"} </span>
              <input
                autoFocus
                onBlur={() => setShowInput({ ...showInput, visible: false })}
                onKeyDown={onAddNew}
              />
            </div>
          )}
          {sortFoldersAndFiles(explorer.children).map((exp) => {
            return (
              <Folder
              ref={ref}
              showPopup={showPopup}
                explorer={exp}
                key={exp.id}
                setShowPopup={setShowPopup}
                handleAddNew={handleAddNew}
                onDelete={onDelete}
                onRename={onRename}
              />
            );
          })}
        </div>
      </div>
    );
  } else {
    return (
      <FolderName
        ref={popupRef}
        id={explorer.id}
        showPopup={showPopup}
        name={explorer.name}
        isFolder={explorer.isFolder}
        setIsExpanded={setIsExpanded}
        handleDelete={handleDelete}
        handleNewFolder={handleNewFolder}
        handleRename={handleRename}
        handleRightClick={handleRightClick}
        isNameUpdating={isNameUpdating}
        onNameChange={onNameChange}
      />
    );
  }
});

export default Folder;
