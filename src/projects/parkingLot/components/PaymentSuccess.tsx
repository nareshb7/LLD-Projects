import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useParkingContext } from "../context";
import { Ticket } from "../context/types";
import { TabTypes } from "./config";
import Modal from "./Modal";
import ParkingExitTicket from "./ParkingTicket";
import { getPayment, removeVehicleFromParking } from "./utils";

const PaymentSuccess = () => {
  const {
    removingVehicleTicket,
    setRemovingVehicleTicket,
    setTickets,
    setParkingSpots,
    setActiveTab,
  } = useParkingContext();
  const params = new URLSearchParams(useLocation().search);
  const reference = params.get("reference");
  const [isPaid, setIsPaid] = useState(true);

  const handleModalClose = () => {
    setIsPaid(false);
    setRemovingVehicleTicket({} as Ticket);
    setActiveTab(TabTypes.PARKING_LOT);
    setRemovingVehicleTicket({} as Ticket);
    setTickets((prev) =>
      prev.filter((ticket) => ticket.id !== removingVehicleTicket?.id)
    );
    setParkingSpots((prev) => [
      ...removeVehicleFromParking(removingVehicleTicket?.spot || "", prev),
    ]);
  };

  useEffect(() => {
    const ticket = sessionStorage.getItem("removing_ticket");
    if (ticket) {
      setRemovingVehicleTicket(JSON.parse(ticket));
      sessionStorage.removeItem("removing_ticket");
      window.history.replaceState(null, "", "/LLD-Projects/parking-lot/");
    }
  }, []);

  return (
    <div>
      <h3 className="text-center">Payment Success</h3>
      <div>
        <p>
          <strong>Reference Id : {reference}</strong>
        </p>
        <p>
          Paid Amount:{" "}
          {removingVehicleTicket && getPayment(removingVehicleTicket as Ticket)}
        </p>
      </div>
      {removingVehicleTicket && (
        <Modal
          show={isPaid}
          onClose={handleModalClose}
          onSave={handleModalClose}
          saveButtonName="Print"
        >
          <ParkingExitTicket ticket={removingVehicleTicket as Ticket} />
        </Modal>
      )}
    </div>
  );
};

export default PaymentSuccess;
