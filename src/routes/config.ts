import React from "react";
import FileExplorer from "../projects/fileExplorer";
import NestedCheckbox from "../projects/nestedCheckboxes";
import NestedCommentsWrapper from "../projects/nestedComments";
import VehicleParking from "../projects/parkingLot";
import PaymentSuccess from "../projects/parkingLot/components/PaymentSuccess";
import ProgressBar from "../projects/progressBar";
import SearchBar from "../projects/searchBar";
import Sudoku from "../projects/sudoku";
import TextToSpeech from "../projects/textToSpeech";
import ToastNotification from "../projects/toastNotification";
// Implement lazy loading

export interface Project {
  id: number;
  name: string;
  path: string;
  Component: () => React.JSX.Element;
  children?: any;
}

export const projectsConfig: Project[] = [
  {
    id: 1,
    name: "Toast Notification",
    path: "toast-notification",
    Component: ToastNotification,
  },
  {
    id: 2,
    name: "File Explorer",
    path: "file-explorer",
    Component: FileExplorer,
  },
  {
    id: 3,
    name: "Nested Checkboxes",
    path: "nested-checkboxes",
    Component: NestedCheckbox,
  },
  {
    id: 4,
    name: "Progress Bar",
    path: "progress-bar",
    Component: ProgressBar,
  },
  {
    id: 5,
    name: "Search Bar",
    path: "search-bar",
    Component: SearchBar,
  },
  {
    id: 6,
    name: "Parking Lot",
    path: "parking-lot",
    Component: VehicleParking,
    children: [
      {
        id: 1,
        name: "Payment Success",
        path: "payment-success",
        Component: PaymentSuccess,
      },
    ],
  },
  {
    id: 7,
    name: "Sudoku",
    path: "sudkou",
    Component: Sudoku,
  },
  {
    id: 8,
    name: "Nested Comments",
    path: "nested-comments",
    Component: NestedCommentsWrapper,
  },
  {
    id: 9,
    name: "Text to Speech",
    path: "text-speech",
    Component: TextToSpeech,
  },
];
