import React from "react";
import { useParkingContext } from "../context";
import { hourlyAmount } from "./ParkingLot";

const ParkingTickets = () => {
  const { tickets } = useParkingContext();
  console.log("tickets::::", tickets);
  return (
    <div className="parking-tickets">
      <h3 className="heading">Active Tickets</h3>

      {tickets.length > 0 ? (
        <div>
          {tickets.map((ticket, i) => (
            <div key={ticket.id} className="ticket-list">
              {i+1}. {ticket.id}- {ticket.spot}
            </div>
          ))}
        </div>
      ) : (
        <h6>No Active Tickets</h6>
      )}
    </div>
  );
};

export default ParkingTickets;
