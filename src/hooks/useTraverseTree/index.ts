// import { FolderInterface } from "../../projects/fileExplorer/config";

import { FolderInterface } from "../../projects/fileExplorer/config";

const useTraverseTree = () => {
  const insertNode = (
    tree: FolderInterface,
    folderId: number,
    name: string,
    isFolder: boolean
  ): FolderInterface => {
    if (!folderId) {
      return {
        id: new Date().getTime(),
        name,
        isFolder,
        children: [],
      };
    }
    // Base case: If the current node matches the target folderId
    if (tree.id === folderId && tree.isFolder) {
      return {
        ...tree,
        children: [
          {
            id: new Date().getTime(),
            name,
            isFolder,
            children: [],
          },
          ...tree.children,
        ],
      };
    }

    // Recursive DFS traversal
    for (let i = 0; i < tree.children.length; i++) {
      const updatedChild = insertNode(
        tree.children[i],
        folderId,
        name,
        isFolder
      );
      if (updatedChild !== tree.children[i]) {
        return {
          ...tree,
          children: [
            ...tree.children.slice(0, i),
            updatedChild,
            ...tree.children.slice(i + 1),
          ],
        };
      }
    }

    return tree; // Return unchanged tree if folderId is not found
  };

  const renameNode = (
    tree: FolderInterface,
    folderId: number,
    newName: string
  ): FolderInterface => {
    // Base case: If the current node matches the target folderId
    if (tree.id === folderId) {
      return { ...tree, name: newName };
    }

    // Recursive DFS traversal
    for (let i = 0; i < tree.children.length; i++) {
      const updatedChild = renameNode(tree.children[i], folderId, newName);
      if (updatedChild !== tree.children[i]) {
        return {
          ...tree,
          children: [
            ...tree.children.slice(0, i),
            updatedChild,
            ...tree.children.slice(i + 1),
          ],
        };
      }
    }

    return tree; // Return unchanged tree if folderId is not found
  };

  const deleteNode = (
    tree: FolderInterface,
    folderId: number
  ): FolderInterface | undefined => {
    // Base case: If the current node matches the target folderId
    if (tree.id === folderId) {
      return undefined; // Remove this node
    }

    // Recursive DFS traversal with filtering
    const updatedChildren: FolderInterface[] = [];
    for (let i = 0; i < tree.children.length; i++) {
      const updatedChild = deleteNode(tree.children[i], folderId);
      if (updatedChild) {
        updatedChildren.push(updatedChild);
      }
    }

    return { ...tree, children: updatedChildren }; // Return updated tree
  };

  return { insertNode, renameNode, deleteNode };
};

export default useTraverseTree;

// const useTraverseTree = () => {
//   const insertNode = (
//     tree: FolderInterface,
//     folderId: number,
//     name: string,
//     isFolder: boolean
//   ) => {
//     if (tree.id === folderId && tree.isFolder) {
//       tree.children.unshift({
//         id: new Date().getTime(),
//         name,
//         isFolder,
//         children: [],
//       });
//       return tree;
//     }

//     // let latestNode =[]
//     let latestNode = tree.children.map((ob) => {
//       return insertNode(ob, folderId, name, isFolder);
//     });
//     return { ...tree, children: latestNode };
//   };

//   const renameNode =(tree: FolderInterface, folderId: number, newName:string) => {
//         if (tree.id === folderId) {
//             tree.name = newName
//             return tree
//         }
//         const latestNode = tree.children.map((ob) => renameNode(ob, folderId, newName))
//         return {...tree, children: latestNode}
//   }

//   const deleteNode =(tree: FolderInterface, folderId: number) => {
//     if (tree.id === folderId) {
//         return undefined
//     }
//     const latestNode = tree.children.map(ob => deleteNode(ob, folderId)).filter(Boolean)
//     return {...tree, children: latestNode}
//   }
//   return { insertNode, renameNode, deleteNode };
// };

// export default useTraverseTree;
