import React, { useState } from "react";
import "./FilterEtiquettes.css";
export default function Agences() {
  const [agence, setAgence] = useState([
    { name: "Aix en provence", checked: false },
    { name: "Bordeaux", checked: false },
    { name: "Agence matrimoniale", checked: false },
    { name: "Caen", checked: true },
    { name: "Lille", checked: false },
    { name: "Paris", checked: false },
    { name: "Paris 2", checked: false },
    { name: "Paris 3", checked: false },
  ]);

  const AgenceClick = (event) => {
    agence(event.target.value);
  };

  return (
    <div className="bodys  Ag">
      <ul>
        {agence.map((item, i) => (
          <div
            key={i}
            className="checkbox checkbox-circle checkbox-color-scheme"
          >
            <input type="checkbox" value={item.name} onChange={AgenceClick} />
            <span className="cr"> {item.name} </span>
          </div>
        ))}
      </ul>
    </div>
  );
}
