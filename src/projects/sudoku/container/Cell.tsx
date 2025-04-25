import React, { CSSProperties } from "react";

export interface BoardCellProps {
  disabled?: boolean;
  value: string;
  className: string;
  style: CSSProperties;
  readOnly?: boolean;
  onChange: (value: string) => void;
  onFocus: () => void;
}

const CellComp = ({
  disabled = false,
  value,
  className,
  style,
  readOnly,
  onChange,
  onFocus,
}: BoardCellProps) => {
  return (
    <input
      disabled={disabled}
      readOnly={disabled}
      autoComplete="off"
      value={value.trim()}
      className={`form-control text-center m-0 p-2 ${className}`}
      max={1}
      style={{
        width: "45px",
        height: "45px",
        fontSize: "1.2rem",
        borderRadius: 0,
        ...style,
        borderTop: "none",
        outline: "none",
        boxShadow: "none",
      }}
      onChange={(e) => onChange(e.target.value)}
      onFocus={onFocus}
    />
  );
};

export default CellComp;
