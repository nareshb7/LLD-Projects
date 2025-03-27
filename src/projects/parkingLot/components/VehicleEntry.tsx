import React, { useState } from "react";
import { Ticket, useParkingContext, Vehicle } from "../context";
import { hourlyAmount } from "./ParkingLot";

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
  localStorage.setItem("prevTicketID", JSON.stringify(ticketId+1));
  return `${year}${month <= 9 ? "0" + month : month}${
    day <= 9 ? "0" + day : day
  }${ticketId}`;
};

const VehicleEntry = () => {
  const { parkingSpots, setParkingSpots, setTickets } = useParkingContext();
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
    if (!type || !plateNumber) return;
    const availableSpot = parkingSpots.find((spot) => !spot.isOccupied);
    if (!availableSpot) {
      alert("Parking is Full..!");
      return;
    }
    const updatedVehicle = {
      ...vehicle,
      plateNumber: plateNumber.toUpperCase(),
    };
    availableSpot.isOccupied = true;
    availableSpot.vehicle = updatedVehicle;
    const ticket = generateTicket(updatedVehicle, availableSpot.id);
    setTickets((prev) => [...prev, ticket]);
    setParkingSpots(
      parkingSpots.map((spot) =>
        spot.id === availableSpot.id ? availableSpot : spot
      )
    );
    setVehicle(initalVehicleObj);
  };

  return (
    <div>
      <h3 className="heading">Vehicle Entry : </h3>
      <h5>Per hour : Rs.{hourlyAmount}/-</h5>
      <div>
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
  );
};

export default VehicleEntry;
