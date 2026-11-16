import React, { useState } from "react";
import "./FilterEtiquettes.css";
export default function Financement() {
  const [financement, setFinancement] = useState([
    { name: "Autoporté", checked: false },
    { name: "Locam", checked: false },
    { name: "Leasecom", checked: false },
    { name: "Grenke", checked: false },
  ]);

  const FinancementClick = (event) => {
    financement(event.target.value);
  };

  return (
    <div className="bodys  Ag">
      <ul>
        {financement.map((item, i) => (
          <div
            key={i}
            className="checkbox checkbox-circle checkbox-color-scheme"
          >
            <input
              type="checkbox"
              value={item.name}
              onChange={FinancementClick}
            />
            <span className="cr"> {item.name} </span>
          </div>
        ))}
      </ul>
    </div>
  );
}
