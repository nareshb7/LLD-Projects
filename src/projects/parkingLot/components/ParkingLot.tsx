import React from "react";
import { FaCar, FaTruck } from "react-icons/fa";
import { RiEBikeFill } from "react-icons/ri";
import { Ticket, useParkingContext, VehicleType } from "../context";

const vehicleIcons = {
  [VehicleType.BIKE]: <RiEBikeFill />,
  [VehicleType.CAR]: <FaCar />,
  [VehicleType.TRUCK]: <FaTruck />,
};
const getVehicle = (type: VehicleType | null) => {
  return type ? vehicleIcons[type] : null;
};

export const getPayment = (ticket: Ticket) => {
  const currentTime = new Date().getTime();
  const entryTime = new Date(ticket.entryTime || "").getTime();
  const duration = (currentTime - entryTime) / (1000 * 60 * 60);

  return (duration * hourlyAmount).toFixed(2);
};

export const hourlyAmount = 50;

const ParkingLot = () => {
  const { parkingSpots, setParkingSpots, setTickets, tickets } =
    useParkingContext();

  const handleExit = (spotId: string) => {
    const parkingSpot = parkingSpots.find((spot) => spot.id == spotId);
    const ticket = tickets.find((ticket) => ticket.spot == spotId);

    if (parkingSpot && ticket) {
      let cnfrm = window.confirm(`Your payment is Rs: ${getPayment(ticket)}/-`);
      if (cnfrm) {
        setTickets((prev) => prev.filter((tkt) => tkt.spot !== spotId));
        parkingSpot.isOccupied = false;
        parkingSpot.vehicle = null;
        setParkingSpots(
          parkingSpots.map((spot) =>
            spot.id === parkingSpot.id ? parkingSpot : spot
          )
        );
      }
    }
  };
  return (
    <>
      <h3 className="heading">Parking Lot:</h3>
      <div className="parking-lot">
        {parkingSpots.map((spot) => (
          <div
            className={`parking-spot ${spot.isOccupied ? "active-spot" : ""}`}
            key={spot.id}
          >
            <div>
              Spot: L{spot.level}-{spot.id}
            </div>
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
                    Exit
                  </button>
                </div>
              </div>
            ) : (
              "Empty"
            )}{" "}
          </div>
        ))}
      </div>
    </>
  );
};

export default ParkingLot;
