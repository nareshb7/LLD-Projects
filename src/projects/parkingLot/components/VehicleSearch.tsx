import React, { useState } from "react";
import { useParkingContext } from "../context";
import { Ticket } from "../context/types";
import { getPayment } from "./utils";
import TicketDetails from "./TicketDetails";

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
      setSelectedTicket({} as Ticket)
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
      {selectedTicket.id && <div >
            <TicketDetails ticket={selectedTicket} />
        </div>}
    </div>
  );
};

export default VehicleSearch;
