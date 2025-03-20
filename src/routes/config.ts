import FileExplorer from "../projects/fileExplorer";
import NestedCheckbox from "../projects/nestedCheckboxes";
import ProgressBar from "../projects/progressBar";
import SearchBar from "../projects/searchBar";
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
  },
  {
    id: 3,
    name: "Nested Checkboxes",
    path:'nested-checkboxes',
    Component: NestedCheckbox
  },
  {
    id: 4,
    name: "Progress Bar",
    path:'progress-bar',
    Component: ProgressBar
  },
  {
    id: 5,
    name: "Search Bar",
    path:'search-bar',
    Component: SearchBar
  }
];
