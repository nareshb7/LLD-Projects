import React from "react";
import { useParkingContext } from "../context";
import { tabs } from "./config";

const Tabs = () => {
  const { setActiveTab } = useParkingContext();

  const handleTabClick = (selectedTab: string) => {
    setActiveTab(selectedTab);
  };
  return (
    <div className="d-flex gap-2 m-2">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => handleTabClick(tab.name)}
          className="btn btn-primary"
        >
          {tab.title}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
