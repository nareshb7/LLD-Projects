import { NotificationSeverity } from "../../../hooks/useToastNotification";

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
  type: VehicleType,
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
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  showNotification: (message: string, severity?: NotificationSeverity) => void;
  collectedAmount: number;
  setCollectedAmount: React.Dispatch<React.SetStateAction<number>>;
  removingVehicleTicket: Ticket | null;
  setRemovingVehicleTicket: React.Dispatch<React.SetStateAction<Ticket | null>>;
}