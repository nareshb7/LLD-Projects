import FileExplorer from "../projects/fileExplorer";
import ToastNotification from "../projects/toastNotification";

export interface Project {
    id: number;
  name: string;
  path: string;
  Component: () => JSX.Element
}

export const projectsConfig: Project[] = [
  {
    id: 1,
    name: "Toast Notification",
    path: "toast-notification",
    Component: ToastNotification
  },
  {
    id: 2,
    name: "File Explorer",
    path:'file-explorer',
    Component: FileExplorer
  }
];
