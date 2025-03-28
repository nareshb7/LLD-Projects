import React, { useState } from "react";
import { useParkingContext } from "../context";
import { Ticket } from "../context/types";
import TicketDetails from "./TicketDetails";

const ParkingTickets = () => {
  const { tickets } = useParkingContext();
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const handleTicketSelect = (selected: Ticket) => {
    if (selected.id === selectedTicket?.id) {
      setSelectedTicket(null);
    } else {
      setSelectedTicket(selected);
    }
  };
  return (
    <div className="parking-tickets">
      <h3 className="heading">Active Tickets</h3>

      {tickets.length > 0 ? (
        <div>
          {tickets.map((ticket, i) => (
            <div key={ticket.id} className="ticket-list accordion-item border">
              <div className="accordion-header">
                <button
                  className="cursor-pointer accordion-button collapsed"
                  onClick={() => handleTicketSelect(ticket)}
                >
                  {i + 1}. {ticket.id}- {ticket.spot}
                </button>
              </div>
              {selectedTicket?.id === ticket.id && (
                <TicketDetails ticket={selectedTicket} />
              )}
            </div>
          ))}
        </div>
      ) : (
        <h6>No Active Tickets</h6>
      )}
    </div>
  );
};

export interface TicketDetailsProps {
  ticket: Ticket;
}

export default ParkingTickets;
