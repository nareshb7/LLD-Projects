import React, { useState } from "react";
import { FaCar, FaTruck } from "react-icons/fa";
import { MdElectricRickshaw } from "react-icons/md";
import { RiEBikeFill } from "react-icons/ri";
import { useParkingContext } from "../context/";
import { Ticket, VehicleType } from "../context/types";
import Modal from "./Modal";
import TicketDetails from "./TicketDetails";
import { TabTypes } from "./config";
import { getPayment, processPayment } from "./utils";
import axios from "axios";

export const SERVER_URL = "http://localhost:1111";

const vehicleIcons = {
  [VehicleType.BIKE]: <RiEBikeFill />,
  [VehicleType.CAR]: <FaCar />,
  [VehicleType.TRUCK]: <FaTruck />,
  [VehicleType.AUTO]: <MdElectricRickshaw />,
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
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleExit = (spotId: string) => {
    const ticket = tickets.find((ticket) => ticket.spot == spotId);
    if (ticket) setRemovingVehicleTicket(ticket);
  };

  const handleExitCancel = () => {
    setRemovingVehicleTicket(null);
  };
  const isRazorpayConnected = false;
  const handleExitConfirm = async () => {
    if (!isRazorpayConnected) {
      setActiveTab(TabTypes.PAYMENT_PAGE);
      return;
    }
    try {
      setIsLoading(true);
      sessionStorage.setItem(
        "removing_ticket",
        JSON.stringify(removingVehicleTicket)
      );
      await processPayment(removingVehicleTicket as Ticket);
      setIsLoading(false);
    } catch (err: any) {
      sessionStorage.removeItem("removing_ticket");
      setErrorMessage(err?.response?.data?.err?.error?.description);
      setIsLoading(false);
      setRemovingVehicleTicket({} as Ticket);
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
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
          isLoading={isLoading}
          showFooter={!Boolean(errorMessage)}
        >
          {errorMessage ? (
            <p className="text-center text-danger">{errorMessage}</p>
          ) : removingVehicleTicket?.id ? (
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
