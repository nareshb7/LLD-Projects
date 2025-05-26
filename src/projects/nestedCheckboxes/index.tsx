import React, { useState } from "react";
import { CheckboxModal, nestedCheckboxData } from "./mockData";
import "./style.css";
import { BsArrowDown, BsArrowUp } from "react-icons/bs";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";

export interface RenderCheckboxProps {
  checkbox: CheckboxModal;
  onCheckboxClick: (isChecked: boolean, box: CheckboxModal) => void;
  onExpandClick: (selected: CheckboxModal) => void;
}

const RenderCheckbox = ({
  checkbox,
  onCheckboxClick,
  onExpandClick,
}: RenderCheckboxProps) => {
  return (
    <div className="checkbox-wrapper">
      <div className="checkbox-content">
        <div>
          <input
            type="checkbox"
            checked={checkbox.isChecked}
            onChange={(e) => onCheckboxClick(e.target.checked, checkbox)}
          />
          <span
            className="checkbox-title"
            onClick={() => onExpandClick(checkbox)}
          >
            {checkbox.title}
          </span>
        </div>
        {checkbox.children.length > 0 && (
          <div
            className="accordion-icon"
            onClick={() => onExpandClick(checkbox)}
          >
            {" "}
            {checkbox.isExpanded ? (
              <span className="arrow-down">
                <BiChevronDown />
              </span>
            ) : (
              <span className="arrow-up">
                <BiChevronUp />
              </span>
            )}{" "}
          </div>
        )}
      </div>
      {checkbox.children.length > 0 && checkbox.isExpanded && (
        <div className="nested-children">
          {checkbox.children.map((children) => {
            return (
              <RenderCheckbox
                key={children.id}
                checkbox={children}
                onCheckboxClick={onCheckboxClick}
                onExpandClick={onExpandClick}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

const NestedCheckbox = () => {
  const [checkboxData, setCheckboxData] =
    useState<CheckboxModal>(nestedCheckboxData);

  // Method 1 (Optimized)
  const handleCheckboxClick = (
    isChecked: boolean,
    selectedCheckbox: CheckboxModal
  ) => {
    const updateChildren = (checkbox: CheckboxModal, checked: boolean) => {
      checkbox.isChecked = checked;
      checkbox.children.forEach((child) => updateChildren(child, checked));
    };

    const updateParents = (parent?: CheckboxModal) => {
      if (!parent) return;

      parent.isChecked = parent.children.every((child) => child.isChecked);
      updateParents(findParent(checkboxData, parent.parentId));
    };

    const findParent = (
      checkbox: CheckboxModal,
      parentId: number
    ): CheckboxModal | undefined => {
      if (checkbox.id === parentId) return checkbox;
      for (let child of checkbox.children) {
        const found = findParent(child, parentId);
        if (found) return found;
      }
    };

    const updateTree = (checkbox: CheckboxModal): CheckboxModal => {
      if (checkbox.id === selectedCheckbox.id) {
        checkbox.isChecked = isChecked;
        checkbox.children.forEach((child) => updateChildren(child, isChecked));
      } else {
        checkbox.children = checkbox.children.map(updateTree);
      }
      return checkbox;
    };

    setCheckboxData((prevData) => {
      const newData = { ...updateTree(prevData) };
      updateParents(findParent(newData, selectedCheckbox.parentId));
      newData.isChecked = newData.children.every((child) => child.isChecked);
      return newData;
    });
  };

  // Method 2
  // const handleCheckboxClick = (
  //   isChecked: boolean,
  //   selectedCheckbox: CheckboxModal
  // ) => {
  //   const copyData = { ...checkboxData };
  //   const checkChildren = (checkbox: CheckboxModal) => {
  //     checkbox.isChecked = isChecked;
  //     checkbox.children.map(checkChildren);
  //     return checkbox;
  //   };

  //   if (selectedCheckbox.parentId === -1) {
  //     copyData.isChecked = isChecked;
  //     copyData.children.map(checkChildren);
  //     setCheckboxData(copyData);
  //   } else {
  //     const updateChildren = (checkbox: CheckboxModal) => {
  //       if (checkbox.id === selectedCheckbox.id) {
  //         checkbox.isChecked = isChecked;
  //         checkbox.children.map(checkChildren);
  //       } else {
  //         checkbox.children.map((child) => updateChildren(child));
  //       }
  //       return checkbox;
  //     };

  //     updateChildren(copyData);
  //     const updateParentCheckBoxes = (checkBox: CheckboxModal, parent?: CheckboxModal) => {

  //         checkBox.children.forEach((child) =>updateParentCheckBoxes(child, checkBox));
  //       const isAllSelected =
  //         checkBox.children.length > 0
  //           ? checkBox.children.every((cb) => cb.isChecked)
  //           : checkBox.isChecked;
  //       checkBox.isChecked = isAllSelected;
  //     };
  //     updateParentCheckBoxes(copyData);
  //     setCheckboxData(copyData);
  //   }
  // };

  const handleExpandClick = (selectedBox: CheckboxModal) => {
    const copiedData = { ...checkboxData };
    const checkExpand = (
      checkbox: CheckboxModal,
      selectedBox: CheckboxModal
    ) => {
      if (checkbox.id === selectedBox.id) {
        checkbox.isExpanded = !checkbox.isExpanded;
      } else {
        checkbox.children.forEach((child) => checkExpand(child, selectedBox));
      }
    };
    checkExpand(copiedData, selectedBox);
    setCheckboxData(copiedData);
  };

  const getSelectedCheckBoxes = () => {
    let checked: CheckboxModal[] = [];

    const check = (data: CheckboxModal) => {
      if (data.isChecked && data.children.length == 0) {
        checked.push(data);
      } else if (data.children.length > 0) {
        data.children.forEach(check);
      }
    };
    check(checkboxData);
    return checked;
  };

  return (
    <div className="nested-checkbox-wrapper">
      <RenderCheckbox
        checkbox={checkboxData}
        onCheckboxClick={handleCheckboxClick}
        onExpandClick={handleExpandClick}
      />
      <div>
        <h3 style={{ color: "#aaa" }}>Selected Checkboxes :</h3>
        {getSelectedCheckBoxes().map((cb) => (
          <div key={cb.id}>Box: {cb.title}</div>
        ))}
      </div>
    </div>
  );
};

export default NestedCheckbox;
