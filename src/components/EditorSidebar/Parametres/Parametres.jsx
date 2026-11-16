import React, { useEffect, useState } from "react";
import "./Parametres.css";
import iconClose from "../../../assets/imgEditorSidebar/iconClose.png";
import Informations from "./Informations/Informations";
import Seo from "./Seo/Seo";
import Analytics from "./Analytics/Analytics";
import HtmlEnTete from "./HtmlEnTete/HtmlEnTete";
import Redirection from "./Redirection/Redirection";
import ExportZip from "./ExportZip/ExportZip";
import BackUp from "./BackUp/BackUp";
import ImgEntreprise from "./ImgEntreprise/ImgEntreprise";
import Domain from "./Domaine/Domain";
// import RetourForm from "./RetourForm/RetourForm";
import DocumentEntreprise from "./DocumentEntreprise/DocumentEntreprise";
import HasPermission from "../../../pages/Authentification/AuthGard/HasPermission";


function Parametres(props) {
  const [tab, setTab] = useState();
  const OpenTab = (value) => {
    let btns = document.querySelectorAll(".SidebarParametre .tab-pane ");
    let btn = null;
    document.getElementById("SubParametre").classList.remove("active");
    document.getElementById("tabContant").classList.remove("d-none");

    switch (value) {
      case "v-pills-rimages":
        setTab( <div
          className="tab-pane fade"
          id="v-pills-rimages"
          role="tabpanel"
          aria-labelledby="v-pills-rimages-tab"
        ><div className="textParms">
        <div className="d-block " onClick={(e) => CloseTab()}>
          <div className="close ">
            <img src={iconClose} alt="close" />
          </div>
        </div>
        <div className="titleDesign">
          <span> RÉPERTOIRE IMAGES</span>
          <ImgEntreprise editor={getEditor}  close={CloseTab} />
        </div>
      </div></div>)

        Object.keys(btns).map((key) => {
          btns[key].classList.remove("active");
        });
        btn = document.getElementById("v-pills-rimages-tab");
        btn.classList.add("active");
        break;
        case "v-pills-rfichiers":
          setTab(  <div
            className="tab-pane fade"
            id="v-pills-rfichiers"
            role="tabpanel"
            aria-labelledby="v-pills-rfichiers-tab"
          >
            <div className="textParms">
              <div className="d-block " onClick={(e) => CloseTab()}>
                <div className="close ">
                  <img src={iconClose} alt="close" />
                </div>
              </div>
              <div className="titleDesign">
                <span> RÉPERTOIRE FICHIERS</span>
                <DocumentEntreprise editor={getEditor}  close={CloseTab}/>
              </div>
            </div>
          </div>)
  
          Object.keys(btns).map((key) => {
            btns[key].classList.remove("active");
          });
          btn = document.getElementById("v-pills-rfichiers-tab");
          btn.classList.add("active");
          break;
          case "v-pills-infentreprises":
            setTab(        <div
              className="tab-pane fade"
              id="v-pills-infentreprises"
              role="tabpanel"
              aria-labelledby="v-pills-infentreprises-tab"
            >
              <div className="textParms">
                <div className="d-block " onClick={(e) => CloseTab()}>
                  <div className="close ">
                    <img src={iconClose} alt="close" />
                  </div>
                </div>
                <div className="titleDesign text-start p-3">
                  <span className="mb-3">INFORMATIONS DE L'ENTREPRISE</span>
                  <Informations editor={getEditor}  close={CloseTab}/>
                </div>
              </div>
            </div>)
    
            Object.keys(btns).map((key) => {
              btns[key].classList.remove("active");
            });
            btn = document.getElementById("v-pills-infentreprises-tab");
            btn.classList.add("active");
            break;

            case "v-pills-domain":
              setTab(   <div
                className="tab-pane fade"
                id="v-pills-domain"
                role="tabpanel"
                aria-labelledby="v-pills-domain-tab"
              >
                <div className="textParms">
                  <div className="d-block " onClick={(e) => CloseTab()}>
                    <div className="close ">
                      <img src={iconClose} alt="close" />
                    </div>
                  </div>
                  <div className="titleDesign text-start p-3">
                  <span> DOMAINE DU SITE</span>
                    <Domain editor={getEditor}  close={CloseTab}/>
                  </div>
                </div>
              </div>)
      
              Object.keys(btns).map((key) => {
                btns[key].classList.remove("active");
              });
              btn = document.getElementById("v-pills-domain-tab");
              btn.classList.add("active");
              break;
              case "v-pills-seo":
                setTab(      <div
                  className="tab-pane fade"
                  id="v-pills-seo"
                  role="tabpanel"
                  aria-labelledby="v-pills-seo-tab"
                >
                  <div className="textParms">
                    <div className="d-block " onClick={(e) => CloseTab()}>
                      <div className="close ">
                        <img src={iconClose} alt="close" />
                      </div>
                    </div>
                    <div className="titleDesign text-start p-3">
                      <span className="mb-3">SEO</span>
                      <Seo editor={getEditor}  close={CloseTab}/>
                    </div>
                  </div>
                </div>)
        
                Object.keys(btns).map((key) => {
                  btns[key].classList.remove("active");
                });
                btn = document.getElementById("v-pills-seo-tab");
                btn.classList.add("active");
                break;

                case "v-pills-analytics":
                  setTab(          <div
                    className="tab-pane fade"
                    id="v-pills-analytics"
                    role="tabpanel"
                    aria-labelledby="v-pills-analytics-tab"
                  >
                    <div className="textParms">
                      <div className="d-block " onClick={(e) => CloseTab()}>
                        <div className="close ">
                          <img src={iconClose} alt="close" />
                        </div>
                      </div>
                      <div className="titleDesign text-start p-3">
                        <span className="mb-3">GOOGLE ANALYTICS</span>
                        <Analytics editor={getEditor}  close={CloseTab} />
                      </div>
                    </div>
                  </div>)
          
                  Object.keys(btns).map((key) => {
                    btns[key].classList.remove("active");
                  });
                  btn = document.getElementById("v-pills-analytics-tab");
                  btn.classList.add("active");
                  break;
                  
                case "v-pills-html":
                  setTab(   <div
                    className="tab-pane fade"
                    id="v-pills-html"
                    role="tabpanel"
                    aria-labelledby="v-pills-html-tab"
                  >
                    <div className="textParms">
                      <div className="d-block " onClick={(e) => CloseTab()}>
                        <div className="close ">
                          <img src={iconClose} alt="close" />
                        </div>
                      </div>
                      <div className="titleDesign text-start p-3">
                        <span className="mb-3">HTML DE L'EN-TÊTE</span>
                        <HtmlEnTete editor={getEditor}   close={CloseTab}/>
                      </div>
                    </div>
                  </div> )
          
                  Object.keys(btns).map((key) => {
                    btns[key].classList.remove("active");
                  });
                  btn = document.getElementById("v-pills-html-tab");
                  btn.classList.add("active");
                  break;
                  case "v-pills-redirection":
                  setTab(   <div
                    className="tab-pane fade"
                    id="v-pills-redirection"
                    role="tabpanel"
                    aria-labelledby="v-pills-redirection-tab"
                  >
                    <div className="textParms">
                      <div className="d-block " onClick={(e) => CloseTab()}>
                        <div className="close ">
                          <img src={iconClose} alt="close" />
                        </div>
                      </div>
                      <div className="titleDesign text-start p-3">
                        <span className="mb-3">REDIRECTION D'URL</span>
                        <Redirection editor={getEditor} close={CloseTab} />
                      </div>
                    </div>
                  </div> )
          
                  Object.keys(btns).map((key) => {
                    btns[key].classList.remove("active");
                  });
                  btn = document.getElementById("v-pills-redirection-tab");
                  btn.classList.add("active");
                  break;
                  case "v-pills-export":
                    setTab(  <div
                      className="tab-pane fade"
                      id="v-pills-export"
                      role="tabpanel"
                      aria-labelledby="v-pills-export-tab"
                    >
                      <div className="textParms">
                        <div className="d-block " onClick={(e) => CloseTab()}>
                          <div className="close ">
                            <img src={iconClose} alt="close" />
                          </div>
                        </div>
                        <div className="titleDesign text-start p-3">
                          <span className="mb-3">EXPORTATION DU SITE</span>
                          <ExportZip editor={getEditor}  close={CloseTab} />
                        </div>
                      </div></div>)
            
                    Object.keys(btns).map((key) => {
                      btns[key].classList.remove("active");
                    });
                    btn = document.getElementById("v-pills-export-tab");
                    btn.classList.add("active");
                    break;
                    case "v-pills-save":
                      setTab(   <div
                        className="tab-pane fade"
                        id="v-pills-save"
                        role="tabpanel"
                        aria-labelledby="v-pills-save-tab"
                      >
                        <div className="textParms">
                          <div className="d-block " onClick={(e) => CloseTab()}>
                            <div className="close ">
                              <img src={iconClose} alt="close" />
                            </div>
                          </div>
                          <div className="titleDesign text-start p-3">
                            <span className="mb-3">SAUVEGARDES</span>
                            <BackUp editor={getEditor} close={CloseTab}/>
                          </div>
                        </div>
                      </div>)
              
                      Object.keys(btns).map((key) => {
                        btns[key].classList.remove("active");
                      });
                      btn = document.getElementById("v-pills-save-tab");
                      btn.classList.add("active");
                      break;
      default:
        break;
    }
  };
   
  const CloseTab = () => {
    setTab(null);
    let btns = document.querySelectorAll(".SidebarParametre .tab-pane");
    Object.keys(btns).map((key) => {
      btns[key].classList.remove("active");
    });
  };

  
  const getEditor = () => {
    return props.editor();
  };
  return (
    <div className="AllSeting">
      <div className="SidebarParametre d-flex align-items-start">
        <div
          className="nav flex-column nav-pills"
          id="v-pills-tab"
          role="tablist"
          aria-orientation="vertical"
        >
          <div className="Folder">
            <div className="borderFolder">
            <HasPermission  permission={["bibliotheque"]} >
              <button
                className="nav-link EditorWidgets  "
                id="v-pills-rimages-tab"
                data-bs-toggle="pill"
                data-bs-target="#v-pills-rimages"
                type="button"
                onClick={(e) => {CloseTab();OpenTab("v-pills-rimages")}}
              >
                <span>RÉPERTOIRE IMAGES 
                </span>
              </button>
              </HasPermission>
              <HasPermission  permission={["bibliotheque"]} >
              <button
                className="nav-link EditorWidgets "
                id="v-pills-rfichiers-tab"
                data-bs-toggle="pill"
                data-bs-target="#v-pills-rfichiers"
                type="button"
                onClick={(e) => {CloseTab();OpenTab("v-pills-rfichiers")}}
              >
                <span>RÉPERTOIRE FICHIERS </span>
              </button>
              </HasPermission>

            </div>
          </div>
          <div className="Setting">
            <div className="borderSetting">
            <HasPermission  permission={["modifier_le_site"]} >
              <button
                className="nav-link EditorWidgets "
                id="v-pills-infentreprises-tab"
                data-bs-toggle="pill"
                data-bs-target="#v-pills-infentreprises"
                type="button"
                onClick={(e) => {CloseTab();OpenTab("v-pills-infentreprises")}}
              >
                <span>INFORMATIONS DE L'ENTREPRISE</span>
              </button>
              </HasPermission>
              <HasPermission  permission={["domaine_personnalise"]} >
              <button
                className="nav-link EditorWidgets "
                id="v-pills-domain-tab"
                data-bs-toggle="pill"
                data-bs-target="#v-pills-domain"
                type="button"
                onClick={(e) => {CloseTab();OpenTab("v-pills-domain")}}
              >
                <span>DOMAINE DU SITE</span>
              </button>
              </HasPermission>
              <HasPermission  permission={["indexation_de_site"]} >
              <button
                className="nav-link EditorWidgets "
                id="v-pills-seo-tab"
                data-bs-toggle="pill"
                data-bs-target="#v-pills-seo"
                type="button"
                onClick={(e) => {CloseTab();OpenTab("v-pills-seo")}}
              >
                <span>SEO</span>
              </button>
              </HasPermission>
              <HasPermission  permission={["google_analytics"]} >
              <button
                className="nav-link EditorWidgets "
                id="v-pills-analytics-tab"
                data-bs-toggle="pill"
                data-bs-target="#v-pills-analytics"
                type="button"
                onClick={(e) => {CloseTab();OpenTab("v-pills-analytics")}}
              >
                <span>GOOGLE ANALYTICS</span>
              </button>
              </HasPermission>
              <HasPermission  permission={["modifier_le_site"]} >
              <button
                className="nav-link EditorWidgets "
                id="v-pills-html-tab"
                data-bs-toggle="pill"
                data-bs-target="#v-pills-html"
                type="button"
                onClick={(e) => {CloseTab();OpenTab("v-pills-html")}}
              >
                <span>HTML DE L'EN-TÊTE</span>
              </button> 
              </HasPermission>
              <HasPermission  permission={["redirections"]} >
              <button
                className="nav-link EditorWidgets"
                id="v-pills-redirection-tab"
                data-bs-toggle="pill"
                data-bs-target="#v-pills-redirection"
                type="button"
                onClick={(e) => {CloseTab();OpenTab("v-pills-redirection")}}
              >
                <span>REDIRECTION D'URL</span>
              </button>    
              </HasPermission>
              <HasPermission  permission={["exportation_de_site"]} >
                 <button
                className="nav-link EditorWidgets "
                id="v-pills-export-tab"
                data-bs-toggle="pill"
                data-bs-target="#v-pills-export"
                type="button"
                onClick={(e) => {CloseTab();OpenTab("v-pills-export")}}
              >
                <span>EXPORTATION DU SITE</span>
              </button>  
              </HasPermission>    
              <HasPermission  permission={["sauvegarde"]} >
                    <button
                className="nav-link EditorWidgets "
                id="v-pills-save-tab"
                data-bs-toggle="pill"
                data-bs-target="#v-pills-save"
                type="button"
                onClick={(e) => {CloseTab();OpenTab("v-pills-save")}}
              >
                <span>SAUVEGARDES</span>
              </button>
              </HasPermission>
              <button
                className="nav-link EditorWidgets disabled "
                id="v-pills-textentreprises-tab"
                data-bs-toggle="pill"
                data-bs-target="#v-pills-textentreprises"
                type="button"
                onClick={(e) => {CloseTab();OpenTab("v-pills-textentreprises")}}
              >
                <span>TEXTE DE L’ENTREPRISE <sup className="encours"> <i class="fa-solid fa-wrench" ></i></sup></span>
              </button>

              <button
                className="nav-link EditorWidgets disabled "
                id="v-pills-imgentreprises-tab"
                data-bs-toggle="pill"
                data-bs-target="#v-pills-imgentreprises"
                type="button"
              
                onClick={(e) => {CloseTab();OpenTab("v-pills-imgentreprises")}}
              >
                <span> IMAGES DE L’ENTREPRISE <sup className="encours">
                <i class="fa-solid fa-wrench" ></i>
                </sup></span>
              </button>
            </div>
          </div>
        </div>
        <div id="SubParametre" className={tab != null ? "tabContant" : "d-none"} >
        {tab}
      </div>
       {/* <div className="tab-content " id="SubParametre">
          <div
            className="tab-pane fade"
            id="v-pills-rimages"
            role="tabpanel"
            aria-labelledby="v-pills-rimages-tab"
          >
            <div className="textParms">
              <div className="d-block " onClick={(e) => CloseTab()}>
                <div className="close ">
                  <img src={iconClose} alt="close" />
                </div>
              </div>
              <div className="titleDesign">
                <span> RÉPERTOIRE IMAGES</span>
                <ImgEntreprise editor={getEditor} />
              </div>
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="v-pills-domain"
            role="tabpanel"
            aria-labelledby="v-pills-domain-tab"
          >
            <div className="textParms">
              <div className="d-block " onClick={(e) => CloseTab()}>
                <div className="close ">
                  <img src={iconClose} alt="close" />
                </div>
              </div>
              <div className="titleDesign text-start p-3">
              <span> DOMAINE DU SITE</span>
                <Domain/>
              </div>
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="v-pills-rfichiers"
            role="tabpanel"
            aria-labelledby="v-pills-rfichiers-tab"
          >
            <div className="textParms">
              <div className="d-block " onClick={(e) => CloseTab()}>
                <div className="close ">
                  <img src={iconClose} alt="close" />
                </div>
              </div>
              <div className="titleDesign">
                <span> RÉPERTOIRE FICHIERS</span>
                <DocumentEntreprise/>
              </div>
            </div>
          </div>
    
          <div
            className="tab-pane fade"
            id="v-pills-infentreprises"
            role="tabpanel"
            aria-labelledby="v-pills-infentreprises-tab"
          >
            <div className="textParms">
              <div className="d-block " onClick={(e) => CloseTab()}>
                <div className="close ">
                  <img src={iconClose} alt="close" />
                </div>
              </div>
              <div className="titleDesign text-start p-3">
                <span className="mb-3">INFORMATIONS DE L'ENTREPRISE</span>
                <Informations editor={getEditor} />
              </div>
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="v-pills-seo"
            role="tabpanel"
            aria-labelledby="v-pills-seo-tab"
          >
            <div className="textParms">
              <div className="d-block " onClick={(e) => CloseTab()}>
                <div className="close ">
                  <img src={iconClose} alt="close" />
                </div>
              </div>
              <div className="titleDesign text-start p-3">
                <span className="mb-3">SEO</span>
                <Seo editor={getEditor} />
              </div>
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="v-pills-analytics"
            role="tabpanel"
            aria-labelledby="v-pills-analytics-tab"
          >
            <div className="textParms">
              <div className="d-block " onClick={(e) => CloseTab()}>
                <div className="close ">
                  <img src={iconClose} alt="close" />
                </div>
              </div>
              <div className="titleDesign text-start p-3">
                <span className="mb-3">GOOGLE ANALYTICS</span>
                <Analytics editor={getEditor} />
              </div>
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="v-pills-html"
            role="tabpanel"
            aria-labelledby="v-pills-html-tab"
          >
            <div className="textParms">
              <div className="d-block " onClick={(e) => CloseTab()}>
                <div className="close ">
                  <img src={iconClose} alt="close" />
                </div>
              </div>
              <div className="titleDesign text-start p-3">
                <span className="mb-3">HTML DE L'EN-TÊTE</span>
                <HtmlEnTete editor={getEditor} />
              </div>
            </div>
          </div> 
             <div
            className="tab-pane fade"
            id="v-pills-redirection"
            role="tabpanel"
            aria-labelledby="v-pills-redirection-tab"
          >
            <div className="textParms">
              <div className="d-block " onClick={(e) => CloseTab()}>
                <div className="close ">
                  <img src={iconClose} alt="close" />
                </div>
              </div>
              <div className="titleDesign text-start p-3">
                <span className="mb-3">REDIRECTION D'URL</span>
                <Redirection editor={getEditor} />
              </div>
            </div>
          </div>      
             <div
            className="tab-pane fade"
            id="v-pills-export"
            role="tabpanel"
            aria-labelledby="v-pills-export-tab"
          >
            <div className="textParms">
              <div className="d-block " onClick={(e) => CloseTab()}>
                <div className="close ">
                  <img src={iconClose} alt="close" />
                </div>
              </div>
              <div className="titleDesign text-start p-3">
                <span className="mb-3">EXPORTATION DU SITE</span>
                <ExportZip editor={getEditor} />
              </div>
            </div>
          </div>   
             <div
            className="tab-pane fade"
            id="v-pills-save"
            role="tabpanel"
            aria-labelledby="v-pills-save-tab"
          >
            <div className="textParms">
              <div className="d-block " onClick={(e) => CloseTab()}>
                <div className="close ">
                  <img src={iconClose} alt="close" />
                </div>
              </div>
              <div className="titleDesign text-start p-3">
                <span className="mb-3">SAUVEGARDES</span>
                <BackUp editor={getEditor} />
              </div>
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="v-pills-textentreprises"
            role="tabpanel"
            aria-labelledby="v-pills-textentreprises-tab"
          >
            <div className="textParms">
              <div className="d-block " onClick={(e) => CloseTab()}>
                <div className="close ">
                  <img src={iconClose} alt="close" />
                </div>
              </div>
              <div className="titleDesign">
                <span>TEXTE DE L’ENTREPRISE</span>
              </div>
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="v-pills-imgentreprises"
            role="tabpanel"
            aria-labelledby="v-pills-imgentreprises-tab"
          >
            <div className="textParms">
              <div className="d-block " onClick={(e) => CloseTab()}>
                <div className="close ">
                  <img src={iconClose} alt="close" />
                </div>
              </div>
              <div className="titleDesign">
                <span>IMAGES DE L’ENTREPRISE</span>
               
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default Parametres;
