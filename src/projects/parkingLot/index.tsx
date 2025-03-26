import React from "react";
import ParkingProvider from "./context";
import ParkingLot from "./components/ParkingLot";
import "./style.css"
import VehicleEntry from "./components/VehicleEntry";

const VehicleParking = () => {
  return (
    <ParkingProvider>
      <div className="parking-lot-wrapper">
        <VehicleEntry />
        <ParkingLot />
      </div>
    </ParkingProvider>
  );
};

export default VehicleParking;
