import VehicleEntry from "./VehicleEntry";
import ParkingTickets from "./ParkingTickets";
import ParkingLot from "./ParkingLot";
import VehicleSearch from "./VehicleSearch";
import { VehicleType } from "../context/types";
import ProjectDetails from "./ProjectDetails";
import PaymentPage from "./PaymentPage";
import PaymentSuccess from "./PaymentSuccess";
import React from "react";

export enum TabTypes {
  VEHICLE_ENTRY_FORM = "VEHICLE_ENTRY_FORM",
  PARKING_TICKETS = "PARKING_TICKETS",
  PARKING_LOT = "PARKING_LOT",
  SEARCH_VEHICLE = "SEARCH_VEHICLE",
  INFO_PAGE = "INFO_PAGE",
  PAYMENT_PAGE = "PAYMENT_PAGE",
  PAYMENT_SUCCESS = "PAYMENT_SUCCESS",
}

export interface Tab {
  id: number;
  title: string;
  name: TabTypes;
}

export const tabs: Tab[] = [
  {
    id: 1,
    title: "Vehicle Entry Form",
    name: TabTypes.VEHICLE_ENTRY_FORM,
  },
  {
    id: 2,
    title: "Parking Tickets",
    name: TabTypes.PARKING_TICKETS,
  },
  { title: "Parking Lot", id: 3, name: TabTypes.PARKING_LOT },
  {
    id: 4,
    title: "Search Vehicle",
    name: TabTypes.SEARCH_VEHICLE,
  },
  {
    id: 5,
    title: "Info",
    name: TabTypes.INFO_PAGE,
  },
];

export const TabsCompoent: { [key in TabTypes]: () => React.JSX.Element } = {
  VEHICLE_ENTRY_FORM: VehicleEntry,
  PARKING_TICKETS: ParkingTickets,
  PARKING_LOT: ParkingLot,
  SEARCH_VEHICLE: VehicleSearch,
  INFO_PAGE: ProjectDetails,
  PAYMENT_PAGE: PaymentPage,
  PAYMENT_SUCCESS: PaymentSuccess,
};

export const hourlyAmount = {
  [VehicleType.BIKE]: 30,
  [VehicleType.AUTO]: 40,
  [VehicleType.CAR]: 50,
  [VehicleType.TRUCK]: 65,
};
