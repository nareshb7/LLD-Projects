export interface Project {
    id: number;
  name: string;
  path: string;
}

export const projectsConfig: Project[] = [
  {
    id: 1,
    name: "Toast Notification",
    path: "toast-notification",
  },
];
