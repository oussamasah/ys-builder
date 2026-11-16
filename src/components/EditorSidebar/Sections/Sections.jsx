import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import iconClose from "../../../assets/imgEditorSidebar/iconClose.png";
import Autres from "./Autres/Autres";
import BlocText from "./BlocText/BlocText";
import Breadcrumb from "./Breadcrumb/Breadcrumb";
import Contact from "./Contact/Contact";
import Entetepage from "./Entetepage/Entetepage";
import Faq from "./Faq/Faq";
import Galerie from "./Galerie/Galerie";
import Menutarif from "./Menutarif/Menutarif";
import Onglet from "./Onglet/Onglet";
import Piedpage from "./Piedpage/Piedpage";
import "./Sections.css";
import Slider from "./Slider/Slider";
import Social from "./Social/Social";
import TemplateVide from "./TemplateVide/TemplateVide";
import TextImg from "./TextImg/TextImg";
import Historique from "./Historique/Historique";
function Sections(props) {
  const getEditor = () => {
    return props.editor();
  };
  const [sectionTab, setSectionTab] = useState();
  const OpenTabSub = (tab) => {
    let widgetContainer = document.getElementById("widgetsPanel");

    switch (tab) {

      case "historique":
        setSectionTab(
          <>
            <div
              className="tab-pane fade show"
              id="v-pills-vide"
              role="tabpanel"
              aria-labelledby="v-pills-vide-tab"
            >
              <div className="textParms">
                <div className="d-block " onClick={(e) => CloseTabSub()}>
                  <div className="close ">
                    <img src={iconClose} alt="close" />
                  </div>
                </div>
                <div className="titleDesign">
                  <span>Historique</span>
                </div>
              </div>
              <Historique editor={getEditor} close={CloseTab} />
            </div>
          </>
        );
        break;

      case "vide":
        setSectionTab(
          <>
            <div
              className="tab-pane fade show"
              id="v-pills-vide"
              role="tabpanel"
              aria-labelledby="v-pills-vide-tab"
            >
              <div className="textParms">
                <div className="d-block " onClick={(e) => CloseTabSub()}>
                  <div className="close ">
                    <img src={iconClose} alt="close" />
                  </div>
                </div>
                <div className="titleDesign">
                  <span>TEMPLATE VIDE</span>
                </div>
              </div>
              <TemplateVide editor={getEditor} close={CloseTab} />
            </div>
          </>
        );
        break;
      case "slider":
        setSectionTab(
          <>
            <div
              className="tab-pane fade show"
              id="v-pills-sidebar"
              role="tabpanel"
              aria-labelledby="v-pills-sidebar-tab"
            >
              <div className="close " onClick={(e) => CloseTabSub()}>
                <img src={iconClose} alt="close" />
              </div>
              <div className="titleDesign">
                <span>SLIDERS</span>
              </div>
              <Slider editor={getEditor} close={CloseTab} />
            </div>
          </>
        );
        break;
      case "text":
        setSectionTab(
          <>
            <div
              className="tab-pane fade show"
              id="v-pills-b-text"
              role="tabpanel"
              aria-labelledby="v-pills-b-text-tab"
            >
              <div className="close " onClick={(e) => CloseTabSub()}>
                <img src={iconClose} alt="close" />
              </div>
              <div className="titleDesign">
                <span> BLOCS DE TEXTE</span>
              </div>
              <BlocText editor={getEditor} close={CloseTab} />
            </div>
          </>
        );
        break;
      case "textimage":
        setSectionTab(
          <>
            <div
              className="tab-pane fade show"
              id="v-pills-b-image"
              role="tabpanel"
              aria-labelledby="v-pills-b-image-tab"
            >
              <div className="close " onClick={(e) => CloseTabSub()}>
                <img src={iconClose} alt="close" />
              </div>
              <div className="titleDesign">
                <span>TEXTE ET IMAGE</span>
              </div>
              <TextImg editor={getEditor} close={CloseTab} />
            </div>
          </>
        );
        break;
      case "onglets":
        setSectionTab(
          <>
            <div
              className="tab-pane fade show"
              id="v-pills-b-onglets"
              role="tabpanel"
              aria-labelledby="v-pills-b-onglets-tab"
            >
              <div className="close " onClick={(e) => CloseTabSub()}>
                <img src={iconClose} alt="close" />
              </div>
              <div className="titleDesign">
                <span> ONGLETS</span>
              </div>
              <Onglet editor={getEditor} close={CloseTab} />
            </div>
          </>
        );
        break;

      case "menu":
        setSectionTab(
          <>
            <div
              className="tab-pane fade show"
              id="v-pills-b-tarifs"
              role="tabpanel"
              aria-labelledby="v-pills-b-tarifs-tab"
            >
              <div className="close " onClick={(e) => CloseTabSub()}>
                <img src={iconClose} alt="close" />
              </div>
              <div className="titleDesign">
                <span> MENU ET TARIFS</span>
              </div>
              <Menutarif editor={getEditor} close={CloseTab} />
            </div>
          </>
        );
        break;
      case "galerie":
        setSectionTab(
          <>
            <div
              className="tab-pane fade show"
              id="v-pills-b-galerie"
              role="tabpanel"
              aria-labelledby="v-pills-b-galerie-tab"
            >
              <div className="close " onClick={(e) => CloseTabSub()}>
                <img src={iconClose} alt="close" />
              </div>
              <div className="titleDesign">
                <span> GALERIE</span>
              </div>
              <Galerie editor={getEditor} close={CloseTab} />
            </div>
          </>
        );
        break;
      case "faq":
        setSectionTab(
          <>
            <div
              className="tab-pane fade show"
              id="v-pills-b-faq"
              role="tabpanel"
              aria-labelledby="v-pills-b-faq-tab"
            >
              <div className="close " onClick={(e) => CloseTabSub()}>
                <img src={iconClose} alt="close" />
              </div>
              <div className="titleDesign">
                <span> FAQ</span>
              </div>
              <Faq editor={getEditor} close={CloseTab} />
            </div>
          </>
        );
        break;
      case "contact":
        setSectionTab(
          <>
            <div
              className="tab-pane fade show"
              id="v-pills-b-contact"
              role="tabpanel"
              aria-labelledby="v-pills-b-contact-tab"
            >
              <div className="close " onClick={(e) => CloseTabSub()}>
                <img src={iconClose} alt="close" />
              </div>
              <div className="titleDesign">
                <span> CONTACT</span>
              </div>
              <Contact editor={getEditor} close={CloseTab} />
            </div>
          </>
        );
        break;
      case "entete":
        setSectionTab(
          <>
            <div
              className="tab-pane fade show"
              id="v-pills-b-entete"
              role="tabpanel"
              aria-labelledby="v-pills-b-entete-tab"
            >
              <div className="close " onClick={(e) => CloseTabSub()}>
                <img src={iconClose} alt="close" />
              </div>
              <div className="titleDesign">
                <span> ENTÊTE DE PAGE</span>
              </div>
              <Entetepage editor={getEditor} close={CloseTab} />
            </div>
          </>
        );
        break;
      case "pied":
        setSectionTab(
          <>
            <div
              className="tab-pane fade show"
              id="v-pills-b-piedpage"
              role="tabpanel"
              aria-labelledby="v-pills-b-piedpage-tab"
            >
              <div className="close " onClick={(e) => CloseTabSub()}>
                <img src={iconClose} alt="close" />
              </div>
              <div className="titleDesign">
                <span> PIED DE PAGE</span>
              </div>
              <Piedpage editor={getEditor} close={CloseTab} />
            </div>
          </>
        );
        break;

      case "autres":
        setSectionTab(
          <>
            <div
              className="tab-pane fade show"
              id="v-pills-b-autres"
              role="tabpanel"
              aria-labelledby="v-pills-b-autres-tab"
            >
              <div className="close " onClick={(e) => CloseTabSub()}>
                <img src={iconClose} alt="close" />
              </div>
              <div className="titleDesign">
                <span> AUTRES</span>
              </div>
              <Autres editor={getEditor} close={CloseTab} />
            </div>
          </>
        );
        break; 
        case "breadcrumb":
        setSectionTab(
          <>
            <div
              className="tab-pane fade show"
              id="v-pills-b-autres"
              role="tabpanel"
              aria-labelledby="v-pills-b-autres-tab"
            >
              <div className="close " onClick={(e) => CloseTabSub()}>
                <img src={iconClose} alt="close" />
              </div>
              <div className="titleDesign">
                <span> Fil d'ariane</span>
              </div>
              <Breadcrumb editor={getEditor} close={CloseTab} />
            </div>
          </>
        );
        break;     
         case "socialType":
        setSectionTab(
          <>
            <div
              className="tab-pane fade show"
              id="v-pills-b-autres"
              role="tabpanel"
              aria-labelledby="v-pills-b-autres-tab"
            >
              <div className="close " onClick={(e) => CloseTabSub()}>
                <img src={iconClose} alt="close" />
              </div>
              <div className="titleDesign">
                <span> Réseaux sociaux</span>
              </div>
              <Social editor={getEditor} close={CloseTab} />
            </div>
          </>
        );
        break;

      default:
        setSectionTab("");
        break;
    }
  };
  useEffect(() => {
/*     setTimeout(() => {
      const list = document.getElementsByClassName("gjs-block");
      for (let i = 0; i < list.length; i++) {
        list[i].ondblclick = (event) => {
          const block = list[i].getElementsByClassName("sectionBlocks")[0];

          const ref = block.dataset.ref;
          const type = block.dataset.type;
          if (type == "section") {
            if (window.confirm("Vous êtes sure du supprimer ce block")) {
              axios
                .delete(process.env.REACT_APP_API_URL + "/sections/" + ref)
                .then((response) => {
                  window.location.reload();
                });
            }
          } else if (type == "model") {
            if (window.confirm("Vous êtes sure du supprimer ce model")) {
              axios
                .delete(process.env.REACT_APP_API_URL + "/models/delete/" + ref)
                .then((response) => {
                  window.location.reload();
                });
            }
          }
        };
      }
    }, 1000); */
  }, [sectionTab]);

  const CloseTab = () => {
    props.close();
  };
  const CloseTabSub = () => {
    setSectionTab(null);
    const els = document.getElementById("SubtabSideBar");
    els.classList.remove("active");
    const panes = document.querySelectorAll(".SidebarSection .tab-pane ");
    Object.keys(panes).map((key) => {
      panes[key].classList.remove("active");
    });
    const btns = document.querySelectorAll(".SidebarSection button.nav-link ");
    Object.keys(btns).map((key) => {
      btns[key].classList.remove("active");
    });
  };

  return (
    <div className="SidebarSection d-flex align-items-start">
      <div
        className="nav flex-column nav-pills"
        id="v-pills-tab"
        role="tablist"
        aria-orientation="vertical"
      >
        <button
          className="nav-link EditorWidgets "
          onClick={(e) => OpenTabSub("historique")}
        >
          <span>Historique</span>
        </button>
        <button
          className="nav-link EditorWidgets "
          onClick={(e) => OpenTabSub("vide")}
        >
          <span>VIDE</span>
        </button>

        <button
          className="nav-link EditorWidgets"
          onClick={(e) => OpenTabSub("slider")}
        >
          <span>SLIDER</span>
        </button>
        <button
          className="nav-link EditorWidgets"
          onClick={(e) => OpenTabSub("text")}
        >
          <span>BLOCS DE TEXTE</span>
        </button>
        <button
          className="nav-link EditorWidgets"
          onClick={(e) => OpenTabSub("textimage")}
        >
          <span>TEXTE ET IMAGE</span>
        </button>
        <button
          className="nav-link EditorWidgets"
          onClick={(e) => OpenTabSub("onglets")}
        >
          <span>ONGLETS</span>
        </button>
        <button
          className="nav-link EditorWidgets"
          onClick={(e) => OpenTabSub("menu")}
        >
          <span>MENU ET TARIFS</span>
        </button>
        <button
          className="nav-link EditorWidgets"
          onClick={(e) => OpenTabSub("galerie")}
        >
          <span>GALERIE</span>
        </button>
        <button
          className="nav-link EditorWidgets"
          onClick={(e) => OpenTabSub("faq")}
        >
          <span>FAQ</span>
        </button>
        <button
          className="nav-link EditorWidgets"
          onClick={(e) => OpenTabSub("contact")}
        >
          <span>CONTACT</span>
        </button>
        <button
          className="nav-link EditorWidgets"
          onClick={(e) => OpenTabSub("entete")}
        >
          <span>ENTÊTE DE PAGE</span>
        </button>
        <button
          className="nav-link EditorWidgets"
          onClick={(e) => OpenTabSub("pied")}
        >
          <span>PIED DE PAGE</span>
        </button>
        <button
          className="nav-link EditorWidgets"
          onClick={(e) => OpenTabSub("breadcrumb")}
        >
          <span>FIL D'ARAIANE</span>
        </button>  
        <button
          className="nav-link EditorWidgets"
          onClick={(e) => OpenTabSub("socialType")}
        >
          <span>RESEAUX SOCIAUX</span>
        </button>
        <button
          className="nav-link EditorWidgets"
          onClick={(e) => OpenTabSub("autres")}
        >
          <span>AUTRES</span>
        </button>
   
      </div>
      <div className="tab-content " id="SubtabSideBar">
        {sectionTab}
      </div>
    </div>
  );
}

export default Sections;
