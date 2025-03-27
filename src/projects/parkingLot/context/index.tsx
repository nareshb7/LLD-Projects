import React, { createContext, useContext, useEffect, useState } from "react";
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

export interface Ticket {
  vehicle: Vehicle | null;
  id: string;
  entryTime: string | null;
  spot: string;
}

export interface ParkingContextInterface {
  parkingSpots: ParkingSpot[];
  setParkingSpots: React.Dispatch<React.SetStateAction<ParkingSpot[]>>;
  tickets: Ticket[];
  setTickets: React.Dispatch<React.SetStateAction<Ticket[]>>;
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

const ParkingContext = createContext<ParkingContextInterface | null>(null);
export let ticketId =0;

const initialSpots: ParkingSpot[] = new Array(10)
  .fill(0)
  .map((_, i) => ({ vehicle: null, isOccupied: false, id: `A${i}`, level: 1 }));

const ParkingProvider = ({ children }: ParkingProviderProps) => {
  const [parkingSpots, setParkingSpots] = useState<ParkingSpot[]>(initialSpots);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [activeTab, setActiveTab] = useState("VEHICLE_ENTRY_FORM");

  useEffect(() => {
    const prevTickets = localStorage.getItem("parking-tickets");
    const prevVehicles = localStorage.getItem("parking-vehicles");
    if (prevTickets) {
      setTickets(JSON.parse(prevTickets));
    }
    if (prevVehicles) {
      setParkingSpots(JSON.parse(prevVehicles));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("parking-tickets", JSON.stringify(tickets));
    localStorage.setItem("parking-vehicles", JSON.stringify(parkingSpots));
  }, [tickets, parkingSpots]);
  return (
    <ParkingContext.Provider
      value={{ parkingSpots, tickets,activeTab,setActiveTab, setParkingSpots, setTickets }}
    >
      {children}
    </ParkingContext.Provider>
  );
};

export const useParkingContext = () =>
  useContext(ParkingContext) as ParkingContextInterface;

export default ParkingProvider;
