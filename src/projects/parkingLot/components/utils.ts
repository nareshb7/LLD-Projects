import { ParkingSpot, Ticket, Vehicle, VehicleType } from "../context/types";
import { hourlyAmount } from "./config";

export const findVehicleSlot = (
  slotId: string,
  data: ParkingSpot[][]
): ParkingSpot | undefined => {
  for (const level of data) {
    const vehicleSlot = level.find((spot) => spot.id == slotId);
    if (vehicleSlot) {
      return vehicleSlot;
    }
  }
  return undefined;
};

export const removeVehicleFromParking = (
  slotId: string,
  data: ParkingSpot[][]
) => {
  for (const level of data) {
    const vehicleSlot = level.find((slot) => slot.id === slotId);
    if (vehicleSlot) {
      vehicleSlot.isOccupied = false;
      vehicleSlot.vehicle = null;
      return data;
    }
  }
  return data;
};

export const findEmptySlot = (
  data: ParkingSpot[][],
  vehicleType: VehicleType = VehicleType.BIKE
): ParkingSpot | undefined => {
  for (const level of data) {
    if (vehicleType === level[0].type) {
      const emptySlot = level.find((slot) => !slot.isOccupied);
      if (emptySlot) {
        return emptySlot;
      }
    }
  }

  return undefined;
};

export const parkVehicleIntoSlot = (
  slotId: string,
  vehicle: Vehicle,
  data: ParkingSpot[][]
) => {
  for (const level of data) {
    if (vehicle.type === level[0].type) {
      const vehicleSlot = level.find((slot) => slot.id === slotId);
      if (vehicleSlot) {
        vehicleSlot.isOccupied = true;
        vehicleSlot.vehicle = vehicle;
        return true;
      }
    }
  }
  return false;
};

export const getDurationInHrs = (ticket: Ticket) => {
  const currentTime = new Date().getTime();
  const entryTime = new Date(ticket.entryTime || "").getTime();
  return +((currentTime - entryTime) / (1000 * 60 * 60)).toFixed(2);
};

export const getPayment = (ticket: Ticket) => {
  const duration = getDurationInHrs(ticket);
  const perHour = hourlyAmount[ticket?.vehicle?.type || ""];

  return (duration * perHour).toFixed(2);
};
