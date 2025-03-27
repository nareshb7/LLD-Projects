import VehicleEntry from "./VehicleEntry";
import ParkingTickets from "./ParkingTickets";
import ParkingLot from "./ParkingLot";
import VehicleSearch from "./VehicleSearch";

export const tabs = [
  {
    id: 1,
    title: "Vehicle Entry Form",
    name: "VEHICLE_ENTRY_FORM",
  },
  {
    id: 2,
    title: "Parking Tickets",
    name: "PARKING_TICKETS",
  },
  { title: "Parking Lot", id: 3, name: "PARKING_LOT" },
  {
    id: 4,
    title: "Search Vehicle",
    name: "SEARCH_VEHICLE",
  },
];

export const TabsCompoent = {
  VEHICLE_ENTRY_FORM: VehicleEntry,
  PARKING_TICKETS: ParkingTickets,
  PARKING_LOT: ParkingLot,
  SEARCH_VEHICLE: VehicleSearch,
};
