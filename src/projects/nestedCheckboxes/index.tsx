import React, { useState } from "react";
import { CheckboxModal, nestedCheckboxData } from "./mockData";
import "./style.css";

export interface RenderCheckboxProps {
  checkbox: CheckboxModal;
  onCheckboxClick: (isChecked: boolean, box: CheckboxModal) => void;
}

const RenderCheckbox = ({ checkbox, onCheckboxClick }: RenderCheckboxProps) => {
  return (
    <div className="checkbox-wrapper">
      <div className="checkbox-content">
        <label>
          <input
            type="checkbox"
            checked={checkbox.isChecked}
            onChange={(e) => onCheckboxClick(e.target.checked, checkbox)}
          />
          <span className="checkbox-title">{checkbox.title}</span>
        </label>
        {/* <div className="accordion-icon"> ^ </div> */}
      </div>
      {checkbox.children.length > 0 && (
        <div className="nested-children">
          {checkbox.children.map((children) => {
            return (
              <RenderCheckbox
                checkbox={children}
                onCheckboxClick={onCheckboxClick}
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
  return (
    <div className="nested-checkbox-wrapper">
      <RenderCheckbox
        checkbox={checkboxData}
        onCheckboxClick={handleCheckboxClick}
      />
    </div>
  );
};

export default NestedCheckbox;
