import React, { useState } from "react";
import { useParkingContext, Vehicle } from "../context";

const initalVehicleObj = {
  plateNumber: "",
  type: null,
};

const VehicleEntry = () => {
  const { parkingSpots, setParkingSpots } = useParkingContext();
  const [vehicle, setVehicle] = useState<Vehicle>(initalVehicleObj);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setVehicle({ ...vehicle, [name]: value });
  };

  const handleVehicleEnter = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const {type , plateNumber} = vehicle
    if (!type || !plateNumber) return;
    const availableSpot = parkingSpots.find((spot) => !spot.isOccupied);
    if (!availableSpot) {
      alert("Parking is Full..!");
      return;
    }

    availableSpot.isOccupied = true;
    availableSpot.vehicle = {...vehicle, plateNumber: plateNumber.toUpperCase()};

    setParkingSpots(
      parkingSpots.map((spot) =>
        spot.id === availableSpot.id ? availableSpot : spot
      )
    );
    setVehicle(initalVehicleObj);
  };

  return (
    <div>
      <h3 className="heading">Vehicle Entry : </h3>
      <div>
        <form onSubmit={handleVehicleEnter}>
          <div>
            <label>
              <input
              className="vehicle-input"
                placeholder="Enter Vehicle Number..."
                value={vehicle.plateNumber}
                name="plateNumber"
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div>
            <label>
              <select className="vehicle-input" value={vehicle.type || ""} name="type" onChange={handleChange} required>
                <option>Select Vehicle Type</option>
                <option value="Bike">Bike</option>
                <option value="Car">Car</option>
                <option value="Truck">Truck</option>
              </select>
            </label>
          </div>
          <div>
            <button type="submit" className="vehicle-entry-btn">Enter</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VehicleEntry;
