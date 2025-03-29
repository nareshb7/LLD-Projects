import React from "react";
import { hourlyAmount } from "./config";
import { BsCurrencyRupee } from "react-icons/bs";

const FareDetails = () => {
  return (
    <div className="font-monospace fw-1 text-center m-2 p-2">
      <table cellPadding={4} cellSpacing={2}>
        <thead>
          <tr>
            <th>Vehicle Type</th>
            <th>Amount (per hour)</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(hourlyAmount).map(([type, amount]) => (
            <tr key={type}>
              <td>{type}</td>
              <td>
                <BsCurrencyRupee />
                {amount} /-
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FareDetails;
