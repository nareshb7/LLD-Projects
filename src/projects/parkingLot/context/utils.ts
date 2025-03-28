import { VehicleType } from "./types";
const types = [VehicleType.BIKE, VehicleType.CAR, VehicleType.TRUCK];

export const getInitialSlots = (levels: number) => {
  return Array(levels)
    .fill(0)
    .map((_, levelIdx) =>
      Array(10)
        .fill(0)
        .map((_, i) => ({
          vehicle: null,
          isOccupied: false,
          id: `L${levelIdx}-A${i + 1}`,
          level: levelIdx,
          type: types[levelIdx % types.length],
        }))
    );
};
