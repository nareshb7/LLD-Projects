import React from "react";
import Tabs from "./components/Tabs";
import { TabsCompoent } from "./components/config";
import ParkingProvider, { useParkingContext } from "./context";
import "./style.css";

const SelectedComponent = () => {
  const { activeTab } = useParkingContext();
  const Component = TabsCompoent[activeTab];

  return <Component />;
};

const VehicleParking = () => {
  return (
    <ParkingProvider>
      <div className="parking-lot-wrapper ">
        <Tabs />

        <div className="m-2">
          <SelectedComponent />
        </div>
      </div>
    </ParkingProvider>
  );
};

export default VehicleParking;
