import React from "react";
import ParkingProvider from "./context";

const VehicleParking = () => {
  return (
    <ParkingProvider>
      <h2>Parking Lot</h2>
    </ParkingProvider>
  );
};

export default VehicleParking;
