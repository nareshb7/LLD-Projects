import React from "react";
import { getVehicle } from "./ParkingLot";
import { Ticket, VehicleType } from "../context/types";
import { FaBarcode } from "react-icons/fa6";
import { getDurationInHrs, getPayment } from "./utils";

export interface ParkingExitTicketProps {
  ticket: Ticket;
}

const ParkingExitTicket = ({ ticket }: ParkingExitTicketProps) => {
  return (
    <div className="generated-ticket m-2 border-dotted p-2">
      <div className="d-flex header-section flex-column text-center">
        <div className="fs-1">{getVehicle(ticket.vehicle?.type || null)}</div>
        <h3>N Parking Service</h3>
        <div className="border-dotted"></div>
      </div>
      <div className="ticket-body d-flex flex-column ms-3 text-start gap-1 my-2">
        <span className="text-center fw-semibold">
          DATE: {new Date().toLocaleDateString()}
        </span>
        <p className="m-0">
          <span className="d-inline-block park-date">FROM</span>
          <span>: {ticket.entryTime}</span>
        </p>
        <p className="m-0">
          <span className="d-inline-block park-date">TO</span>
          <span>: {new Date().toLocaleString()}</span>
        </p>
        <p className="m-0">
          <span className="d-inline-block park-date">DURATION</span>
          <span>: {getDurationInHrs(ticket)} Hrs.</span>
        </p>
        <h4 className="text-center">
          Paid: {ticket.amount || getPayment(ticket)}
        </h4>
      </div>
      <div className="border-dotted"></div>
      <div className="d-flex flex-column text-center my-2">
        <span>THANK YOU AND SAFE DRIVE</span>
        <span className="fs-1">
          <FaBarcode />
        </span>
      </div>
    </div>
  );
};

export const ParkingEntryTicket = ({ ticket }: ParkingExitTicketProps) => {
  return (
    <div className="generated-ticket m-2 border p-2">
      <div className="d-flex header-section flex-column text-center">
        <div className="fs-1">{getVehicle(ticket?.vehicle?.type || null)}</div>
        <h3>N Parking Service</h3>
        <div className="border"></div>
      </div>
      <div className="ticket-body d-flex flex-column ms-3 text-start gap-1 my-2">
        <span className="text-center fw-semibold">
          DATE: {new Date().toLocaleDateString()}
        </span>
        <p className="m-0">
          <span className="d-inline-block park-date">Ticket ID</span>
          <span>: {ticket.id}</span>
        </p>
        <p className="m-0">
          <span className="d-inline-block park-date">Vehicle Number</span>
          <span>: {ticket?.vehicle?.plateNumber}</span>
        </p>
        <p className="m-0">
          <span className="d-inline-block park-date">Entry Time</span>
          <span>: {ticket.entryTime}</span>
        </p>
        <h4 className="text-center">
        SLOT: {ticket.spot}
        </h4>
      </div>
      <div className="border"></div>
      <div className="d-flex flex-column text-center my-2">
        <span>PARK AT OWNERS RISK</span>
        <span className="fs-1">
          <FaBarcode />
        </span>
      </div>
    </div>
  );
};
export default ParkingExitTicket;
