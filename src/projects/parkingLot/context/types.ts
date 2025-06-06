import { NotificationSeverity } from "../../../hooks/useToastNotification";
import { TabTypes } from "../components/config";

export enum VehicleType {
  CAR = "Car",
  BIKE = "Bike",
  TRUCK = "Truck",
  AUTO = "Auto",
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
  type: VehicleType;
}

export interface Ticket {
  vehicle: Vehicle | null;
  id: string;
  entryTime: string | null;
  spot: string;
  amount?: string | null;
  isPaid?: boolean;
}

export interface ParkingContextInterface {
  parkingSpots: ParkingSpot[][];
  setParkingSpots: React.Dispatch<React.SetStateAction<ParkingSpot[][]>>;
  tickets: Ticket[];
  setTickets: React.Dispatch<React.SetStateAction<Ticket[]>>;
  activeTab: TabTypes;
  setActiveTab: React.Dispatch<React.SetStateAction<TabTypes>>;
  showNotification: (message: string, severity?: NotificationSeverity) => void;
  collectedAmount: number;
  setCollectedAmount: React.Dispatch<React.SetStateAction<number>>;
  removingVehicleTicket: Ticket | null;
  setRemovingVehicleTicket: React.Dispatch<React.SetStateAction<Ticket | null>>;
}
