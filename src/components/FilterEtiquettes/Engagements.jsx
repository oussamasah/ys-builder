import React, { useState } from "react";
import "./FilterEtiquettes.css";
export default function Engagements() {
  const [engagements, setEngagements] = useState([
    { name: "12 mois", checked: false },
    { name: "24 mois", checked: false },
    { name: "36 mois", checked: false },
    { name: "48 mois", checked: false },
  ]);

  const EngagementsClick = (event) => {
    // engagements(event.target.value);
  };

  return (
    <div className="bodys  Ag">
      <ul>
        {engagements.map((item, i) => (
          <div
            key={i}
            className="checkbox checkbox-circle checkbox-color-scheme"
          >
            <input
              type="checkbox"
              value={item.name}
              onChange={EngagementsClick}
            />
            <span className="cr"> {item.name} </span>
          </div>
        ))}
      </ul>
    </div>
  );
}
