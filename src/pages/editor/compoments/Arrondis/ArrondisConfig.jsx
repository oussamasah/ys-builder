import React, { useEffect } from "react";
import { useState } from "react";

import "./ArrondisConfig.css";

function ArrondisConfigAccordion(props) {
  const [arrondis, setArrondis] = useState(props.config.arrondis);
  useEffect(() => {
    props.setConfig({ arrondis: arrondis });
  }, [arrondis]);
  return (
    <div id="Arrondis" className="d-block ">
      <div className="d-flex align-items-center">
        <div className="input-with-label-pixel">
        
          <input
            type="number"
            min="0"
            step="1"
            value={arrondis.topLeft}
            onChange={(e) => {
              setArrondis({ ...arrondis, topLeft: e.target.value });
            }}
            className="radius-input d-block"
          />
        </div>
        <div className="input-with-label-pixel">
        
          <input
            type="number"
            min="0"
            step="1"
            value={arrondis.topRight}
            onChange={(e) => {
              setArrondis({ ...arrondis, topRight: e.target.value });
            }}
            className="radius-input d-block"
          />
        </div>
        <div className="input-with-label-pixel">
         
          <input
            type="number"
            min="0"
            step="1"
            value={arrondis.bottomLeft}
            onChange={(e) => {
              setArrondis({ ...arrondis, bottomLeft: e.target.value });
            }}
            className="radius-input d-block"
          />
        </div>
        <div className="input-with-label-pixel">
          <input
            type="number"
            min="0"
            step="1"
            onChange={(e) => {
              setArrondis({ ...arrondis, bottomRight: e.target.value });
            }}
            value={arrondis.bottomRight}
            className="radius-input d-block"
          />
        </div>
      </div>
    </div>
  );
}

export default ArrondisConfigAccordion;
