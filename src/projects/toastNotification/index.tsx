import React, { useState } from "react";
import useToastNotification, {
  NotificationPosition,
  NotificationSeverity,
} from "../../hooks/useToastNotification";
import { notificationsConfig, positionConfig } from "./config";

const ToastNotification = () => {
  const [postion, setPostion] = useState<NotificationPosition>("bottom-left");
  const { triggerNotification, NotificationComponent } =
    useToastNotification(postion);

  const handleClick = (type: NotificationSeverity) => {
    triggerNotification({
      severity: type,
      message: `New ${type} Notification`,
      duration: 5000,
    });
  };

  const hadnlePositionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPostion(value as NotificationPosition);
  };
  return (
    <div className="w-50 m-auto">
      {NotificationComponent}

      <div>
        {notificationsConfig.map(({ label, type }) => (
          <button
            key={type}
            className={`m-2 btn btn-${type}`}
            onClick={() => handleClick(type)}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="fw-bold">
        <label className="">Select Notification Position:
        <select className="form-select" onChange={hadnlePositionChange}>
          <option className="form-control" value="">
            Select Notification Position
          </option>
          {positionConfig.map(({ label, value }) => (
            <option className="form-control" value={value} key={value}>
              {label}
            </option>
          ))}
        </select>

        </label>
      </div>
    </div>
  );
};

export default ToastNotification;
