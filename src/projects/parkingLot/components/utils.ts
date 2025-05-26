import { ParkingSpot, Ticket, Vehicle, VehicleType } from "../context/types";
import { hourlyAmount } from "./config";
import { SERVER_URL } from "./ParkingLot";
import axios from "axios";

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
  const perHour = hourlyAmount[ticket?.vehicle?.type || "Bike"];

  return (duration * perHour).toFixed(2);
};

export const processPayment = async (ticket: Ticket) => {
  const amount = getPayment(ticket as Ticket);
  const receipt = ticket?.vehicle?.plateNumber + " | " + ticket?.entryTime;

  const { data } = await axios.post(SERVER_URL + "/api/v1/process-payment", {
    amount,
    receipt,
  });
  const { order, key } = data;

  console.log("removingVeh::", order, key);

  // Open Razorpay Checkout
  const options = {
    key, // Replace with your Razorpay key_id
    amount: amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    currency: "INR",
    name: "N Parking Service",
    description: "Test Transaction",
    order_id: order.id, // This is the order_id created in the backend
    callback_url: "http://localhost:1111/api/v1/payment-success", // Your success URL

    prefill: {
      name: "Naresh Baleboina",
      email: "nareshbjava7@gmail.com",
      contact: "9010586402",
    },
    theme: {
      color: "#F37254",
    },
  };

  const rzp = new Razorpay(options);
  rzp.open();
};
