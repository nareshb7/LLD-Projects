import { NotificationSeverity } from "../../hooks/useToastNotification";

export interface DropdownOption {
    label: string;
    value: string;
}

export interface NotificationConfig {
    label: string;
    type: NotificationSeverity;
}


export const notificationsConfig: NotificationConfig[] =[
    {
        type: "danger",
        label: "Show Error"
    },
    {
        type: "warning",
        label: "Show Warning"
    },
    {
        type: "success",
        label: "Show Succes"
    },
    {
        type: "info",
        label: "Show Info"
    },
]

export const positionConfig: DropdownOption[] =[
    {
        label: "Top Left",
        value:"top-left"
    },
    {
        label: "Top Right",
        value:"top-right"
    },
    {
        label: "Bottom Left",
        value:"bottom-left"
    },
    {
        label: "Bottom Right",
        value:"bottom-right"
    },
]