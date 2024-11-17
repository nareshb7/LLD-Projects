import React, { useCallback, useState } from "react";
import Notification from "./Notification";

export type NotificationSeverity = "danger" | "warning" | "success" | "info";

export interface NotificationType {
  message: string;
  severity: NotificationSeverity;
  duration: number;
  id?: number;
}

export type NotificationPosition =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";

const useToastNotification = (position: NotificationPosition) => {
  const [notficationsList, setNotficationsList] = useState<NotificationType[]>(
    []
  );
  const [notification, setNotification] = useState<NotificationType | null>(
    null
  );

  let timer;

  // useCallback won't recreate the fn again
  const triggerNotification = useCallback(
    (notificationProps: NotificationType) => {
        // clearTimeout(timer);
        const id = Math.random()
      setNotficationsList((prev) => [
        ...prev,
        { ...notificationProps, id },
      ]);

      //   setNotification(notificationProps);

        timer = setTimeout(
          () => setNotficationsList(nList => nList.filter((v, i) => v.id !== id)),
          notificationProps.duration
        );
    },
    []
  );
  const handleClose = (id: number = -1) => {
    if (id !== -1) {
      setNotficationsList((prev) => prev.filter((n) => n.id !== id));
    }
  };
  const stackkPosition = position.includes("bottom") ? "bottom" : "top";
  const slidePostion = position.includes('left') ? "left": "right"

  const NotificationComponent = notficationsList.length
    ? notficationsList.map((notification, i) => (
        <div
          key={notification.id}
          className={`${position} slidein-${slidePostion}`}
          style={{ [stackkPosition]: `${(i + 1) * 60}px` }}
        >
          <Notification {...notification} onClose={handleClose} index={i} />
        </div>
      ))
    : null;

  console.log("notify::", notficationsList);

  return {
    NotificationComponent,
    triggerNotification,
  };
};

export default useToastNotification;
