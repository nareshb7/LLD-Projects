import VehicleEntry from "./VehicleEntry";
import ParkingTickets from "./ParkingTickets";
import ParkingLot from "./ParkingLot";
import VehicleSearch from "./VehicleSearch";

export enum TabTypes {
  VEHICLE_ENTRY_FORM = "VEHICLE_ENTRY_FORM",
  PARKING_TICKETS = "PARKING_TICKETS",
  PARKING_LOT = "PARKING_LOT",
  SEARCH_VEHICLE = "SEARCH_VEHICLE",
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
];

export const TabsCompoent: { [key in TabTypes]: () => JSX.Element } = {
  VEHICLE_ENTRY_FORM: VehicleEntry,
  PARKING_TICKETS: ParkingTickets,
  PARKING_LOT: ParkingLot,
  SEARCH_VEHICLE: VehicleSearch,
};
