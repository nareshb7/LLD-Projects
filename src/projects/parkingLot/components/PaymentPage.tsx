import React, { useState } from "react";
import { useParkingContext } from "../context";
import { TabTypes } from "./config";
import { Ticket } from "../context/types";
import Modal from "./Modal";
import ParkingExitTicket from "./ParkingTicket";
import { getPayment, removeVehicleFromParking } from "./utils";

const PaymentPage = () => {
  const {
    removingVehicleTicket,
    setRemovingVehicleTicket,
    setActiveTab,
    setTickets,
    setParkingSpots,
  } = useParkingContext();
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isPaid, setIsPaid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPaymentMethod(e.target.value);
  };
  const handleModalClose = () => {
    setIsPaid(false);
    setRemovingVehicleTicket({} as Ticket);
    setActiveTab(TabTypes.PARKING_LOT);
  };

  const handlePay = () => {
    setIsLoading(true);
    const updatedTicket = {
      ...removingVehicleTicket,
      amount: getPayment(removingVehicleTicket as Ticket),
      isPaid: true,
    };
    setTimeout(() => {
      setIsPaid(true);
      setRemovingVehicleTicket({ ...(updatedTicket as Ticket) });
      setTickets((prev) =>
        prev.filter((ticket) => ticket.id !== updatedTicket.id)
      );
      setParkingSpots((prev) => [
        ...removeVehicleFromParking(updatedTicket.spot || "", prev),
      ]);
      setIsLoading(false);
    }, 2000);
  };
  return (
    <div>
      <h3 className="heading">PaymentPage:</h3>

      <div>
        <label className="form-label">Select Payment Method:</label>
        <select
          className="form-control col-md-6"
          onChange={handleChange}
          value={paymentMethod}
        >
          <option value="">Select Payment Method</option>
          <option value="CASH">CASH</option>
          <option value="UPI">UPI</option>
          <option value="CARD">CARD</option>
        </select>
        <button
          disabled={isLoading}
          className="mt-1 btn btn-primary"
          onClick={handlePay}
        >
          {isLoading ? "In Progress..." : isPaid ? "Paid" : "Pay"}
        </button>
      </div>

      <Modal
        show={isPaid}
        onClose={handleModalClose}
        onSave={handleModalClose}
        saveButtonName="Print"
      >
        <ParkingExitTicket ticket={removingVehicleTicket as Ticket} />
      </Modal>
    </div>
  );
};

export default PaymentPage;
