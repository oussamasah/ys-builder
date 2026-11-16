import React, { useState } from "react";
import Cellules from "../celluleglobal/Cellules";
import "./Layout.css";
import iconClose from "../../../../assets/imgEditorSidebar/iconClose.png";
import ContenuGL from "../ContenuGL/ContenuGL";
import TiltesSites from "../TiltesSites/TiltesSites";
import Btnglobal from "../Btnglobal/Btnglobal";

import ImageGlobal from "../ImageGlobal/ImageGlobal";
export default function Layout(props) {
  const [selectedTab, setSelectedTab] = useState(null);
  const closeParamsTab = () => {
    setSelectedTab(null);
    document.getElementById("designList").classList.add("active");
  };
  const getEditor = () => {
    return props.editor();
  };
  const CloseTab = () => {
    props.close();
  };
  const changeParms = (param) => {
    switch (param) {
      case "text":
        var el = (
          <div className="textParms">
            <div className="d-block " onClick={(e) => closeParamsTab()}>
              <div className="close ">
                <img src={iconClose} alt="close" />
              </div>
            </div>
            <div className="titleDesign ">
              <span>GESTION GLOBALE DES CONTENUS</span>
            </div>
            <ContenuGL editor={getEditor} />
          </div>
        );
        document.getElementById("designList").classList.remove("active");
        setSelectedTab(el);
        break;
      case "titres":
        var el = (
          <div className="textParms">
            <div className="d-block  " onClick={(e) => closeParamsTab()}>
              <div className="close ">
                <img src={iconClose} alt="close" />
              </div>
            </div>

            <div className="titleDesign ">
              <span>GESTION GLOBALE DES TITRES</span>
            </div>
            <TiltesSites editor={getEditor} />
          </div>
        );
        document.getElementById("designList").classList.remove("active");
        setSelectedTab(el);
        break;

      case "btn":
        var el = (
          <div className="textParms">
            <div className="d-block   " onClick={(e) => closeParamsTab()}>
              <div className="close ">
                <img src={iconClose} alt="close" />
              </div>
            </div>
            <div className="titleDesign ">
              <span>GESTION GLOBALE DES BOUTONS</span>
            </div>
            <Btnglobal editor={getEditor} />
          </div>
        );
        document.getElementById("designList").classList.remove("active");
        setSelectedTab(el);
        break;
      case "img":
        var el = (
          <div className="textParms">
            <div className="d-block   " onClick={(e) => closeParamsTab()}>
              <div className="close ">
                <img src={iconClose} alt="close" />
              </div>
            </div>
            <div className="titleDesign ">
              <span>GESTION GLOBALES DES IMAGES</span>
            </div>
            <ImageGlobal editor={getEditor} />
          </div>
        );
        document.getElementById("designList").classList.remove("active");
        setSelectedTab(el);
        break;
      case "cellules":
        var el = (
          <div className="textParms">
            <div className="d-block " onClick={(e) => closeParamsTab()}>
              <div className="close ">
                <img src={iconClose} alt="close" />
              </div>
            </div>
            <div className="titleDesign ">
              <span>Gestion des cellules</span>
            </div>
            <Cellules editor={getEditor} />
          </div>
        );
        document.getElementById("designList").classList.remove("active");
        setSelectedTab(el);
        break;

      default:
        break;
    }
  };
  return (
    <div className="DesignLayout ">
      <div className="designList active" id="designList">
        <div className="close" onClick={(e) => CloseTab()}>
          <img src={iconClose} alt="close" />
        </div>
        <div className="titleDesign">
          <span>DESIGN GÉNÉRAL</span>
        </div>

        <ul className="itemDesign">
          <li
            className="param-list-item  d-flex justify-content-between align-items-center border-bottom  "
            onClick={(e) => changeParms("text")}
          >
            <span>Gestion globale des contenus</span>
            <i className="fa fa-chevron-right" aria-hidden="true"></i>
          </li>
          <li
            className="param-list-item  d-flex justify-content-between align-items-center border-bottom  "
            onClick={(e) => changeParms("titres")}
          >
            <span>Gestion globale des titres</span>
            <i className="fa fa-chevron-right" aria-hidden="true"></i>
          </li>
          <li
            className="param-list-item  d-flex justify-content-between align-items-center border-bottom "
            onClick={(e) => changeParms("btn")}
          >
            <span>Gestion globale des boutons</span>
            <i className="fa fa-chevron-right" aria-hidden="true"></i>
          </li>

          <li
            className="param-list-item  d-flex justify-content-between align-items-center border-bottom "
            onClick={(e) => changeParms("img")}
          >
            <span>Gestion gloable des images</span>
            <i className="fa fa-chevron-right" aria-hidden="true"></i>
          </li>
          <li
            className="param-list-item d-flex justify-content-between align-items-center border-bottom "
            onClick={(e) => changeParms("cellules")}
          >
            <span>Gestion globale des cellules</span>
            <i className="fa fa-chevron-right" aria-hidden="true"></i>
          </li>
        </ul>
      </div>
      {selectedTab}
    </div>
  );
}
