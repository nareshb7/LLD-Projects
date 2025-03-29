import React, { useState } from "react";
import { BsCurrencyRupee } from "react-icons/bs";
import { useParkingContext } from "../context";
import { Ticket, Vehicle } from "../context/types";
import { hourlyAmount } from "./config";
import Modal from "./Modal";
import { ParkingEntryTicket } from "./ParkingTicket";
import { findEmptySlot, parkVehicleIntoSlot } from "./utils";
import FareDetails from "./FareDetails";

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
    showNotification,
  } = useParkingContext();
  const [vehicle, setVehicle] = useState<Vehicle>(initalVehicleObj);
  const [isVehicleParked, setIsVehicleParked] = useState(false);
  const [latestParkingTicket, setLatestParkingTIcket] = useState<Ticket | null>(
    null
  );

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
      setIsVehicleParked(true);
      setLatestParkingTIcket(ticket);
    }
  };

  const handleEntryTicketModalClose = () => {
    setIsVehicleParked(false);
    setLatestParkingTIcket({} as Ticket);
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
                  {
                    Object.keys(hourlyAmount).map(type => <option key={type} value={type}>{type}</option>)
                  }
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
      <FareDetails />
      {isVehicleParked && (
        <Modal
          show={isVehicleParked}
          onClose={handleEntryTicketModalClose}
          showFooter={false}
        >
          <ParkingEntryTicket ticket={latestParkingTicket as Ticket} />
        </Modal>
      )}
    </div>
  );
};

export default VehicleEntry;
