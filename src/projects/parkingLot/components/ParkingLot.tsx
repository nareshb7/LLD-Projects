import React, { useState } from "react";
import { FaCar, FaTruck } from "react-icons/fa";
import { RiEBikeFill } from "react-icons/ri";
import { useParkingContext } from "../context/";
import { findVehicleSlot, getPayment, removeVehicleFromParking } from "./utils";
import { ParkingSpot, Ticket, VehicleType } from "../context/types";
import Modal from "./Modal";
import TicketDetails from "./TicketDetails";
import { TabTypes } from "./config";

const vehicleIcons = {
  [VehicleType.BIKE]: <RiEBikeFill />,
  [VehicleType.CAR]: <FaCar />,
  [VehicleType.TRUCK]: <FaTruck />,
};
export const getVehicle = (type: VehicleType | null) => {
  return type ? vehicleIcons[type] : null;
};

const ParkingLot = () => {
  const {
    parkingSpots,
    removingVehicleTicket,
    tickets,
    setActiveTab,
    setRemovingVehicleTicket,
  } = useParkingContext();

  const handleExit = (spotId: string) => {
    const ticket = tickets.find((ticket) => ticket.spot == spotId);
    if (ticket) setRemovingVehicleTicket(ticket);
  };

  const handleExitCancel = () => {
    setRemovingVehicleTicket(null);
  };
  const handleExitConfirm = () => {
    // setTickets((prev) =>
    //   prev.filter((tkt) => tkt.spot !== removingVehicleTicket?.id || "")
    // );
    // setParkingSpots((prev) => [
    //   ...removeVehicleFromParking(removingVehicleTicket?.id || "", prev),
    // ]);
    setActiveTab(TabTypes.PAYMENT_PAGE);
  };
  return (
    <>
      <h3 className="heading">Parking Lot:</h3>
      <div className="multi-level-parking-lot">
        {parkingSpots.map((level, i) => {
          return (
            <div key={i}>
              <h3 className="heading">
                Level {i}: {getVehicle(level[0].type)}
              </h3>
              <div className="parking-lot">
                {level.map((spot) => (
                  <div
                    className={`parking-spot ${spot.type} ${
                      spot.isOccupied ? "active-spot" : ""
                    }`}
                    key={spot.id}
                  >
                    <div>Spot: {spot.id}</div>
                    {spot.isOccupied ? (
                      <div className="vehicle-details">
                        <span className="vehicle-icon">
                          {getVehicle(spot.vehicle?.type || null)}
                        </span>{" "}
                        {spot.vehicle?.plateNumber}
                        <div className="text-center">
                          <button
                            className="exit-button"
                            onClick={() => handleExit(spot.id)}
                          >
                            Checkout
                          </button>
                        </div>
                      </div>
                    ) : (
                      "Empty"
                    )}{" "}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <div>
        <Modal
          show={Boolean(removingVehicleTicket?.id)}
          onClose={handleExitCancel}
          onSave={handleExitConfirm}
          title="Vehicle Details"
          saveButtonName="Proceed to Payment"
        >
          {removingVehicleTicket?.id ? (
            <TicketDetails ticket={removingVehicleTicket as Ticket} />
          ) : (
            <></>
          )}
        </Modal>
      </div>
    </>
  );
};

export default ParkingLot;
