import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useParkingContext } from "../context";
import { tabs, TabTypes } from "./config";

const Tabs = () => {
  const { activeTab, setActiveTab } = useParkingContext();
  const params = new URLSearchParams(useLocation().search);
  const reference = params.get("reference");

  const handleTabClick = (selectedTab: TabTypes) => {
    setActiveTab(selectedTab);
  };

  useEffect(() => {
    if (reference) {
      setActiveTab(TabTypes.PAYMENT_SUCCESS);
    }
  }, []);

  return (
    <div className="d-flex gap-2 m-2">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => handleTabClick(tab.name)}
          className={`btn btn-primary ${
            activeTab === tab.name ? "active" : ""
          }`}
        >
          {tab.title}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
