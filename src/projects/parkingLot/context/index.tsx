import React, { createContext, useContext, useEffect, useState } from "react";
import { ParkingProviderProps } from "../types";
import useToastNotification, {
  NotificationSeverity,
} from "../../../hooks/useToastNotification";
import { ParkingContextInterface, ParkingSpot, Ticket } from "./types";
import { getInitialSlots } from "./utils";
import { TabTypes } from "../components/config";

const ParkingContext = createContext<ParkingContextInterface | null>(null);

const ParkingProvider = ({ children }: ParkingProviderProps) => {
  const { triggerNotification, NotificationComponent } =
    useToastNotification("top-right");
  const [parkingSpots, setParkingSpots] = useState<ParkingSpot[][]>(
    getInitialSlots(5)
  );
  const [collectedAmount, setCollectedAmount] = useState<number>(0);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [activeTab, setActiveTab] = useState<TabTypes>(
    TabTypes.VEHICLE_ENTRY_FORM
  );
  const [removingVehicleTicket, setRemovingVehicleTicket] =
    useState<Ticket | null>(null);

  const showNotification = (
    message: string,
    severity: NotificationSeverity = "info"
  ) => {
    triggerNotification({
      severity,
      message,
      duration: 5000,
    });
  };

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
      value={{
        parkingSpots,
        tickets,
        activeTab,
        collectedAmount,
        removingVehicleTicket,
        setActiveTab,
        setParkingSpots,
        setTickets,
        showNotification,
        setCollectedAmount,
        setRemovingVehicleTicket,
      }}
    >
      {NotificationComponent}
      {children}
    </ParkingContext.Provider>
  );
};

export const useParkingContext = () =>
  useContext(ParkingContext) as ParkingContextInterface;

export default ParkingProvider;
