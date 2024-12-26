import React, { useEffect, useRef, useState } from "react";
import useOutsideClick from "../../hooks/useOutsideClick";
import useTraverseTree from "../../hooks/useTraverseTree";
import { explorer, FolderInterface } from "./config";
import Folder from "./Folder";
import "./style.css";

const FileExplorer = () => {
  const [explorerData, setExplorerData] = useState(explorer);
  const ref = useRef(null);
  const [showPopup, setShowPopup] = useState<number | null>(null);
  const { insertNode, deleteNode, renameNode } = useTraverseTree();

  useOutsideClick(ref.current as unknown as HTMLElement, () =>
    setShowPopup(null)
  );

  const updateData = (latestData: FolderInterface) => {
    setExplorerData({ ...latestData });
    localStorage.setItem("folders", JSON.stringify(latestData));
  };

  const onAddNew = (folderId: number, name:string, isFolder: boolean) => {
    const latestData = insertNode(explorerData, folderId, name, isFolder);
    updateData(latestData);
  };

  const onDelete = (folderId: number) => {
    const latestData = deleteNode(explorerData, folderId);

    if (latestData) {
      updateData(latestData  || {} as FolderInterface);
    }
  };

  const onRename = (folderId: number, newName: string) => {
    const latestData = renameNode(explorerData, folderId, newName);
    updateData(latestData);
  };

  useEffect(() => {
    const prevData = localStorage.getItem("folders");
    if (prevData) {
      const data = JSON.parse(prevData);
      setExplorerData(data);
    }
  }, []);

  return (
    <div>
      <h3>FileExplorer</h3>

      <Folder
        ref={ref}
        explorer={explorerData}
        setShowPopup={setShowPopup}
        showPopup={showPopup}
        handleAddNew={onAddNew}
        onDelete={onDelete}
        onRename={onRename}
      />
    </div>
  );
};

export default FileExplorer;
