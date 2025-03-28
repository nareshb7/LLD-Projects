import React from "react";
import { TicketDetailsProps } from "./ParkingTickets";
import { getDurationInHrs, getPayment } from "./utils";
import { BsCurrencyRupee } from "react-icons/bs";

const TicketDetails = ({ ticket }: TicketDetailsProps) => {
  return (
    <div className="accordion-body my-2 text-center" style={{fontFamily: "math"}}>
      <table cellPadding={4} cellSpacing={2}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Vehicle Number</td>
            <td>{ticket.vehicle?.plateNumber}</td>
          </tr>
          <tr>
            <td>Vehicle Type</td>
            <td>{ticket.vehicle?.type}</td>
          </tr>
          <tr>
            <td>Entry Time</td>
            <td>{ticket.entryTime}</td>
          </tr>
          <tr>
            <td>Duration</td>
            <td>{getDurationInHrs(ticket)}Hrs</td>
          </tr>
          <tr>
            <td>Payment</td>
            <td>
              <BsCurrencyRupee />
              {getPayment(ticket)}/-{" "}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TicketDetails;
