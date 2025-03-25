import React, { createContext, useContext, useState } from "react";
import { ParkingProviderProps } from "../types";

const ParkingContext = createContext(null);

const ParkingProvider = ({ children }: ParkingProviderProps) => {
  const [parkingSpots, setParkingSpots] = useState([]);
  return (
    <ParkingContext.Provider value={null}>{children}</ParkingContext.Provider>
  );
};

export const useParkingContext = () => useContext(ParkingContext);

export default ParkingProvider;
