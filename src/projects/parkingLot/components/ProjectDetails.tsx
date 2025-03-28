import React from "react";

export interface ProjectDetailsConfig {
  id: number;
  title: string;
  description: string;
}

const config: ProjectDetailsConfig[] = [
  {
    id: 1,
    title: "Entry form added",
    description:
      "Needs to enter vehicle number and type to enter into parking based on that we will assign parking slot and price",
  },
  {
    id: 2,
    title: "Parking Ticket",
    description: "You can see here active parking tickets with vehicle info by clicking on ticket number",
  },
  {
    id: 3,
    title: "Parking Lot",
    description:
      "In this we have created a list of parking slot with parked vehicle in multi level, each level is assigned to the each type vehicle instead of storing all vehicles one by one",
  },
  {
    id: 4,
    title: "Vehicle Search",
    description:
      "We can search the vehicle based on vehicle number, for suppose if u want to check the bike is parked or not in parking lot we can check here, it will show all the details in table view",
  },
];

const ProjectDetails = () => {
  return (
    <div>
      <ul className="list-group">
        {config.map((info) => (
          <li className="list-group-item" key={info.id}>
            <h4>
              {info.id}. {info.title}:
            </h4>
            <p>{info.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectDetails;
