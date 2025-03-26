import React from "react";
import { FaCar, FaTruck } from "react-icons/fa";
import { RiEBikeFill } from "react-icons/ri";
import { useParkingContext, VehicleType } from "../context";

const vehicleIcons = {
  [VehicleType.BIKE]: <RiEBikeFill />,
  [VehicleType.CAR]: <FaCar />,
  [VehicleType.TRUCK]: <FaTruck />,
};
const getVehicle = (type: VehicleType | null) => {
  return type ? vehicleIcons[type] : null;
};

const ParkingLot = () => {
  const { parkingSpots, setParkingSpots } = useParkingContext();

  const handleExit = (spotId: string) => {
    const parkingSpot = parkingSpots.find((spot) => spot.id == spotId);

    if (parkingSpot) {
      parkingSpot.isOccupied = false;
      parkingSpot.vehicle = null;
      setParkingSpots(
        parkingSpots.map((spot) =>
          spot.id === parkingSpot.id ? parkingSpot : spot
        )
      );
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
              Spot: Level{spot.level}-{spot.id}
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
