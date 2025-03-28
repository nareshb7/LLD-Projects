import React, { useState } from "react";
import { Ticket, useParkingContext } from "../context";
import { getPayment } from "./ParkingLot";

const VehicleSearch = () => {
  const { tickets, showNotification } = useParkingContext();
  const [vehicleNo, setVehicleNo] = useState("");
  const [selectedTicket, setSelectedTicket] = useState<Ticket>({} as Ticket);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setVehicleNo(value);
  };

  const handleSearch = () => {
    const ticket  = tickets.find(ticket => ticket.vehicle?.plateNumber.toLowerCase() === vehicleNo.toLowerCase());
    if (ticket) {
        setSelectedTicket(ticket);
    } else {
      showNotification("Data not found", "warning")
    }

  };
  return (
    <div>
      <div>
        <input
          value={vehicleNo}
          className="form-control"
          onChange={handleChange}
          placeholder="Enter vehicle number...!"
        />
        <button onClick={handleSearch} className="btn btn-secondary mt-2">Search</button>
      </div>
      {selectedTicket.id && <div>
            <h3>Vehicle No: {selectedTicket.vehicle?.plateNumber}</h3>
            <h3>Vehicle Type: {selectedTicket.vehicle?.type}</h3>
            <h3>Parking Slot: {selectedTicket.spot}</h3>
            <h3>Entry Time: {selectedTicket.entryTime}</h3>
            <h3>Parking Amount: Rs: {getPayment(selectedTicket)}/-</h3>
        </div>}
    </div>
  );
};

export default VehicleSearch;
