import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./templateSidebar.css";
import Etoile from "../../assets/imgTemplate/Etoile.svg";
import EtoileLight from "../../assets/imgTemplate/EtoileLight.svg";
export default function TemplateSidebar() {
  const navigate = useNavigate();
  const couleur = [
    { id: 0, color: "#14AEB4" },
    { id: 1, color: "#0E42BA" },
    { id: 2, color: "#149917" },
    { id: 3, color: "#353535" },
    { id: 4, color: "#F6C344" },
    { id: 5, color: "#B5B5B5" },
  ];

  return (
    <div className="tmpSidebar">
      <div className="titreSidebar">
        <span>MODÈLES DE SITES</span>
      </div>
      <div className="Modelssites">
        <div className="Models">
          <ul>
            <li>
              <span>Tous les modèles</span>
            </li>
            <li>
              <span className="text-muted">Modèles enregistrés</span>
            </li>
            <li>
              <span className="text-muted">Modèles Studio</span>
            </li>
          </ul>
        </div>
        <div className="borders"></div>
        <div className="actiSidebar">
          <span>ACTIVITÉS</span>
          <ul>
            <li>
              <span>
                {" "}
                <img src={Etoile} /> Avocats
              </span>
            </li>
            <li>
              <span>
                <img src={EtoileLight} /> Ostéopathes
              </span>
            </li>
            <li>
              <span>
                {" "}
                <img src={EtoileLight} />
                Garage
              </span>
            </li>
            <li>
              <span>
                <img src={EtoileLight} /> Salon de beauté
              </span>
            </li>
            <li>
              <span>
                <img src={EtoileLight} /> Couvreur
              </span>
            </li>
            <li className="voirPlus">
              {" "}
              <span>+ Voir plus</span>
            </li>
          </ul>
        </div>
        <div className="actiSidebar">
          <span>COULEURS</span>
        </div>

        <div className="ListColeur">
          {couleur.map((col, i) => (
            <span key={i} style={{ backgroundColor: col.color }}>
              <span className="ListColeur-1"></span>
            </span>
          ))}
        </div>
      </div>
      {/* <button onClick={() => navigate(-1)}>
        <i
          className="fa-solid fa-arrow-turn-down-left iconArrow"
          color="#617379"
          size="1x"
        ></i>
      </button>
      <input type="text" placeholder="Recherche un modèle" name="searchModel" /> */}
    </div>
  );
}
