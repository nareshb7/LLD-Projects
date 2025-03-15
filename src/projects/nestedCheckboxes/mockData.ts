export interface CheckboxModal {
  id: number;
  title: string;
  isChecked: boolean;
  parentId: number;
  children: CheckboxModal[];
}

export const nestedCheckboxData: CheckboxModal = {
  id: 1,
  title: "Main - 1",
  isChecked: false,
  parentId: -1,
  children: [
    {
      id: 2,
      title: "Nested 1- 1",
      isChecked: false,
      parentId: 1,
      children: [
        {
          id: 4,
          title: "Nested 1 - 1 - 1",
          isChecked: false,
          parentId: 2,
          children: [
            {
              id: 6,
              title: "Nested 1 - 1 - 1 - 1",
              isChecked: false,
              parentId: 4,
              children: [],
            },
            {
              id: 7,
              title: "Nested 1 - 1 - 1 - 2",
              isChecked: false,
              parentId: 4,
              children: [],
            },
          ],
        },
        {
          id: 5,
          title: "Nested 1 - 1 - 2",
          isChecked: false,
          parentId: 2,
          children: [
            {
              id: 8,
              title: "Nested 1 - 1 - 2 - 1",
              isChecked: false,
              parentId: 5,
              children: [],
            },
            {
              id: 9,
              title: "Nested 1 - 1 - 2 - 2",
              isChecked: false,
              parentId: 5,
              children: [],
            },
          ],
        },
      ],
    },
    {
      id: 3,
      title: "Nested 1- 2",
      isChecked: false,
      parentId: 1,
      children: [
        {
          id: 10,
          title: "Nested 1 - 2 - 1",
          isChecked: false,
          parentId: 3,
          children: [
            {
              id: 12,
              title: "Nested 1 - 2 - 1 - 1",
              isChecked: false,
              parentId: 10,
              children: [],
            },
            {
              id: 13,
              title: "Nested 1 - 2 - 1 - 2",
              isChecked: false,
              parentId: 10,
              children: [],
            },
          ],
        },
        {
          id: 11,
          title: "Nested 1 - 2 - 2",
          isChecked: false,
          parentId: 3,
          children: [
            {
              id: 14,
              title: "Nested 1 - 2 - 2 - 1",
              isChecked: false,
              parentId: 11,
              children: [],
            },
            {
              id: 15,
              title: "Nested 1 - 2 - 2 - 2",
              isChecked: false,
              parentId: 11,
              children: [],
            },
          ],
        },
      ],
    },
  ],
};
