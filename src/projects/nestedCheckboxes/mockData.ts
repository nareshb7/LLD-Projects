export interface CheckboxModal {
  id: number;
  title: string;
  isChecked: boolean;
  parentId: number;
  isExpanded: boolean;
  children: CheckboxModal[];
}

export const nestedCheckboxData: CheckboxModal = {
  id: 1,
  title: "Main - 1",
  isChecked: false,
  parentId: -1,
  isExpanded: false,
  children: [
    {
      id: 2,
      title: "1- 1",
      isChecked: false,
      parentId: 1,
      isExpanded: false,
      children: [
        {
          id: 4,
          title: "1 - 1 - 1",
          isChecked: false,
          parentId: 2,
          isExpanded: false,
          children: [
            {
              id: 6,
              title: "1 - 1 - 1 - 1",
              isChecked: false,
              parentId: 4,
              isExpanded: false,
              children: [],
            },
            {
              id: 7,
              title: "1 - 1 - 1 - 2",
              isChecked: false,
              parentId: 4,
              isExpanded: false,
              children: [],
            },
          ],
        },
        {
          id: 5,
          title: "1 - 1 - 2",
          isChecked: false,
          parentId: 2,
          isExpanded: false,
          children: [
            {
              id: 8,
              title: "1 - 1 - 2 - 1",
              isChecked: false,
              parentId: 5,
              isExpanded: false,
              children: [],
            },
            {
              id: 9,
              title: "1 - 1 - 2 - 2",
              isChecked: false,
              parentId: 5,
              isExpanded: false,
              children: [],
            },
          ],
        },
      ],
    },
    {
      id: 3,
      title: "1- 2",
      isChecked: false,
      parentId: 1,
      isExpanded: false,
      children: [
        {
          id: 10,
          title: "1 - 2 - 1",
          isChecked: false,
          parentId: 3,
          isExpanded: false,
          children: [
            {
              id: 12,
              title: "1 - 2 - 1 - 1",
              isChecked: false,
              parentId: 10,
              isExpanded: false,
              children: [],
            },
            {
              id: 13,
              title: "1 - 2 - 1 - 2",
              isChecked: false,
              parentId: 10,
              isExpanded: false,
              children: [],
            },
          ],
        },
        {
          id: 11,
          title: "1 - 2 - 2",
          isChecked: false,
          parentId: 3,
          isExpanded: false,
          children: [
            {
              id: 14,
              title: "1 - 2 - 2 - 1",
              isChecked: false,
              parentId: 11,
              isExpanded: false,
              children: [],
            },
            {
              id: 15,
              title: "1 - 2 - 2 - 2",
              isChecked: false,
              parentId: 11,
              isExpanded: false,
              children: [],
            },
          ],
        },
      ],
    },
  ],
};
