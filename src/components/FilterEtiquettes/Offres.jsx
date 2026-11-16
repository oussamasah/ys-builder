import React, { useState } from "react";
import "./FilterEtiquettes.css";
export default function Offres() {
  const [offre, setOffre] = useState([
    { name: "Pack Start", checked: false },
    { name: "Pack Fast", checked: false },
    { name: "Pack Up", checked: false },
    { name: "Pack Shop", checked: false },
  ]);

  const OffreClick = (event) => {
    // offre(event.target.value);
  };

  return (
    <div className="bodys  Ag">
      <ul>
        {offre.map((item, i) => (
          <div
            key={i}
            className="checkbox checkbox-circle checkbox-color-scheme"
          >
            <input type="checkbox" value={item.name} onChange={OffreClick} />
            <span className="cr"> {item.name} </span>
          </div>
        ))}
      </ul>
    </div>
  );
}
