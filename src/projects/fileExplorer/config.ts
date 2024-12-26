export interface FolderInterface {
  id: number;
  name: string;
  isFolder: boolean;
  children: FolderInterface[];
}

export const explorer: FolderInterface = {
  id: 1,
  name: "Root",
  isFolder: true,
  children: [
    {
      id: 2,
      name: "Folder 1 -0",
      isFolder: true,
      children: [],
    },
    {
      id: 3,
      name: "Folder 1-1",
      isFolder: true,
      children: [
        {
          id: 4,
          name: "Folder 2 -0",
          isFolder: true,
          children: [],
        },
        {
          id: 5,
          name: "Folder 2-1",
          isFolder: true,
          children: [],
        },
        {
          id: 6,
          name: "File 1-3",
          isFolder: false,
          children: [],
        },
        {
          id: 7,
          name: "File 1-3",
          isFolder: false,
          children: [],
        },
        {
          id: 8,
          name: "File 1-3",
          isFolder: false,
          children: [],
        },
      ],
    },
    {
      id: 9,
      name: "File 1-3",
      isFolder: false,
      children: [],
    },
    {
      id: 10,
      name: "File 1-3",
      isFolder: false,
      children: [],
    },
    {
      id:11,
      name: "File 1-3",
      isFolder: false,
      children: [],
    },
  ],
};
