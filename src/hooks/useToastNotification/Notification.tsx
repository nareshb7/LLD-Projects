import React from "react";
import { NotificationType } from ".";
import {
  AiOutlineCheckCircle,
  AiOutlineClose,
  AiOutlineCloseCircle,
  AiOutlineInfoCircle,
  AiOutlineWarning,
} from "react-icons/ai";
import "./styles.css";

export interface NotificationProps extends NotificationType {
  onClose: (id?: number) => void;
  index: number;
}
interface NotificationStyle extends React.CSSProperties {
  "--animation-duration"?: string;
}

const iconsStyles = {marginRight: "10px"}

const icons = {
  danger: <AiOutlineCloseCircle  style={iconsStyles} />,
  warning: <AiOutlineWarning style={iconsStyles} />,
  info: <AiOutlineInfoCircle style={iconsStyles} />,
  success: <AiOutlineCheckCircle style={iconsStyles} />,
};


const Notification = ({ severity, message, onClose, duration,id }: NotificationProps) => {
  const style: NotificationStyle = {
    "--animation-duration": `${duration/1000}s`,
  };
  
  return (
    <div className={`notification ${severity}`} style={style}>
      {icons[severity]}
      {message}
      <AiOutlineClose className="close-icon" onClick={() => onClose(id)} />
    </div>
  );
};

export default Notification;
