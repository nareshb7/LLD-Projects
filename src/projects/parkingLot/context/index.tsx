import React, { createContext, useContext, useState } from "react";
import { ParkingProviderProps } from "../types";

export enum VehicleType {
  CAR = "Car",
  BIKE = "Bike",
  TRUCK = "Truck",
}

export interface Vehicle {
  plateNumber: string;
  type: VehicleType | null;
}

export interface ParkingSpot {
  vehicle: Vehicle | null;
  id: string;
  level: number;
  isOccupied: boolean;
}

export interface ParkingContextInterface {
  parkingSpots: ParkingSpot[];
  setParkingSpots: React.Dispatch<React.SetStateAction<ParkingSpot[]>>;
}

const ParkingContext = createContext<ParkingContextInterface | null>(null);

const initialSpots: ParkingSpot[] = new Array(10)
  .fill(0)
  .map((_, i) => ({ vehicle: null, isOccupied: false, id: `A${i}`, level: 1 }));

const ParkingProvider = ({ children }: ParkingProviderProps) => {
  const [parkingSpots, setParkingSpots] = useState<ParkingSpot[]>(initialSpots);
  const [tickets, setTickets] = useState([])
  return (
    <ParkingContext.Provider value={{ setParkingSpots, parkingSpots }}>
      {children}
    </ParkingContext.Provider>
  );
};

export const useParkingContext = () =>
  useContext(ParkingContext) as ParkingContextInterface;

export default ParkingProvider;
