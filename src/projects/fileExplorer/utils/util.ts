import { FolderInterface } from "../config";

export const sortFoldersAndFiles = (children: FolderInterface[]) => {
    return children.sort((a, b) => {
      // Folders should come first
      if (a.isFolder && !b.isFolder) return -1;
      if (!a.isFolder && b.isFolder) return 1;
  
      // If both are folders or both are files, sort alphabetically by name
      return a.name.localeCompare(b.name);
    });
  };