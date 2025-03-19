import React, { useEffect, useState } from "react";
import "./style.css";

interface BarProps {
  progress: number;
}

const Bar = ({ progress }: BarProps) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setValue(progress);
    }, 100);
  }, []);
  return (
    <div className="outer-box">
      <div
        className="inner-box"
        style={{
          transform: `translateX(-${100 - value}%)`,
          color: progress > 5 ? "#fff" : "#000",
        }}
      >
        {value}%
      </div>
    </div>
  );
};

const ProgressBar = () => {
  const bars = [1, 10, 30, 50, 70, 100];
  return (
    <div className="progress-bar">
      <h3>Progress Bar</h3>
      {bars.map((bar) => (
        <Bar key={bar} progress={bar} />
      ))}
    </div>
  );
};

export default ProgressBar;
