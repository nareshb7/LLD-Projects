import React, { useState } from "react";
import { useParkingContext } from "../context";
import { hourlyAmount, TabTypes } from "./config";
import { findEmptySlot, parkVehicleIntoSlot } from "./utils";
import { Ticket, Vehicle, VehicleType } from "../context/types";
import { getVehicle } from "./ParkingLot";
import { BiBarcode } from "react-icons/bi";
import { FaBarcode } from "react-icons/fa6";
import { ParkingEntryTicket } from "./ParkingTicket";

const initalVehicleObj = {
  plateNumber: "",
  type: null,
};
let initialTicketId = 0;

const generateTicketId = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const prevId = localStorage.getItem("prevTicketID");
  const ticketId = prevId ? JSON.parse(prevId) : initialTicketId;
  localStorage.setItem("prevTicketID", JSON.stringify(ticketId + 1));
  return `${year}${month <= 9 ? "0" + month : month}${
    day <= 9 ? "0" + day : day
  }${ticketId}`;
};

const VehicleEntry = () => {
  const {
    parkingSpots,
    tickets,
    setParkingSpots,
    setTickets,
    setActiveTab,
    showNotification,
  } = useParkingContext();
  const [vehicle, setVehicle] = useState<Vehicle>(initalVehicleObj);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setVehicle({ ...vehicle, [name]: value });
  };

  const generateTicket = (vehicle: Vehicle, spot: string): Ticket => {
    return {
      vehicle,
      id: generateTicketId(),
      entryTime: new Date().toLocaleString(),
      spot,
    };
  };

  const handleVehicleEnter = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { type, plateNumber } = vehicle;
    if (!type || !plateNumber.trim() || plateNumber.trim().length < 9) {
      showNotification("Check entered vehicle details..!", "warning");
      return;
    }
    const availableSpot = findEmptySlot(parkingSpots, type);
    const isExistedVehicle = tickets.find(
      (ticket) =>
        ticket.vehicle?.plateNumber.toLowerCase() === plateNumber.toLowerCase()
    );
    if (isExistedVehicle) {
      showNotification(
        "Vehicle is already in parking, Please verify vehicle number again.",
        "warning"
      );
      return;
    }
    if (!availableSpot) {
      setVehicle(initalVehicleObj);
      showNotification(`Parking is Full for ${type}'s`, "warning");
      return;
    }
    const updatedVehicle = {
      ...vehicle,
      plateNumber: plateNumber.trim().toUpperCase(),
    };
    const ticket = generateTicket(updatedVehicle, availableSpot.id);

    const isVehicleParked = parkVehicleIntoSlot(
      availableSpot.id,
      updatedVehicle,
      parkingSpots
    );
    if (isVehicleParked) {
      setParkingSpots([...parkingSpots]);
      setVehicle(initalVehicleObj);
      showNotification(
        `Slot is assigned: ${ticket.spot}\nTicket ID: ${ticket.id}`,
        "success"
      );
      setTickets((prev) => [...prev, ticket]);
      // setActiveTab(TabTypes.PARKING_LOT);
    }
  };

  return (
    <div className="d-flex">
      <div>
        <h3 className="heading">Vehicle Entry : </h3>
        <div className="d-flex">
          <form onSubmit={handleVehicleEnter}>
            <div>
              <label>
                <input
                  className="vehicle-input form-control"
                  placeholder="Enter Vehicle Number..."
                  value={vehicle.plateNumber}
                  name="plateNumber"
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
            <div>
              <label>
                <select
                  className="vehicle-input form-control"
                  value={vehicle.type || ""}
                  name="type"
                  onChange={handleChange}
                  required
                >
                  <option>Select Vehicle Type</option>
                  <option value="Bike">Bike</option>
                  <option value="Car">Car</option>
                  <option value="Truck">Truck</option>
                </select>
              </label>
            </div>
            <div>
              <button type="submit" className="btn btn-primary">
                Enter
              </button>
            </div>
          </form>
        </div>
      </div>
      {tickets[0] && <ParkingEntryTicket ticket={tickets[0]} />}
    </div>
  );
};

export default VehicleEntry;
