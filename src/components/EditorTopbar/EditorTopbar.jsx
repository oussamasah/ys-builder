import React, { useEffect, useState } from "react";
import "./EditorTopbar.css";
import logo from "../../assets/imgEditor/EditorLogo.svg";

import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { Navigate, useNavigate, useParams } from "react-router-dom/dist";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";
// import { setcurrentSite, removecurrentSite } from "../../redux/features/site";
// import { setStyleElement } from "../../redux/features/editor";
// import ace from "ace-builds";
import "ace-builds/webpack-resolver";
import AceEditor from "react-ace";

import "brace/mode/html";
import "brace/mode/css";
import "brace/theme/monokai";
import HasPermission from "../../pages/Authentification/AuthGard/HasPermission";
// import prettify from "@liquify/prettify";

export default function EditorTopbar(props) {
  let { siteId, type, pageId } = useParams();
  const [htmlContent, setHtmlContent] = useState();
  const [cssContent, setCssContent] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const storeSite = useSelector((state) => state.site.value);
  const storeUser = useSelector((state) => state.user.value);
  const storeClient = useSelector((state) => state.client.value);
  const [show, setShow] = useState(false);
  const [showPub, setshowPub] = useState(false);
  const [showRePub, setshowRePub] = useState(false);
  const [modalClose, setModalCloser] = useState(false);
  const [isDivided, setIsDivided] = useState(false);
  const [pages, setPages] = useState([]);
  const [sites, setSites] = useState([]);
   useEffect((props) => {
    axios
     .get(process.env.REACT_APP_API_URL + "/sites/get/" + siteId)
       .then((response) => {
         setSites(response.data.data);
       });
   }, []);
  const handleSingleClose = () => {
    setShow(false);
  };
  const [showCode, setShowCode] = useState(false);
  const onHideCode = () => {
    setShowCode(false);
  };

  const handleSingleClosePub = () => {
    setshowPub(false);
  };
  const handleSinglePub = () => {
    setshowPub(true);
  };
  const handleSingleCloseRebup = () => {
    setshowRePub(false);
  };
  const handleSingleRebup = () => {
    setshowRePub(true);
  };
  const handleClosed = () => {
    setModalCloser(false);
  };
  const [optionsState, setoptionsState] = useState();
  const refreshEditor = () => {
    let html = props.editor().getHtml();
    let css = props.editor().getCss();
    props.editor().setComponents(html);
    props.editor().setStyle(css);
  };
  const getPages = () => {
    setPages(storeSite.pages);
  };
  useEffect(() => {}, [show]);
  const changePage = (page) => {
    setoptionsState(page);
   
    storeClient.length > 0 ? window.location.href = "/editorclient/" + storeSite.site._id + "/page/":window.location.href ="/editor/" + storeSite.site._id + "/page/" + page;
 
  };
  useEffect(() => {
    setPages(storeSite.pages);
  }, [storeSite]);
  // useEffect(() => {}, [pages]);
  useEffect(() => {
    setoptionsState(pageId);
  }, [pageId]);

  const  SourceCode =  () => {
    let header = "";
    let footer = "";
    let content = "";
    let types = "pages";
    if (type == "popup") {
      types = "popups";
    }
    axios
      .get(process.env.REACT_APP_API_URL + "/" + types + "/get/" + pageId)
      .then(async (response) => {
        let html;

        if (type == "page") {
          header = response.data.data.Page.SiteSchema.header;
          footer = response.data.data.Page.SiteSchema.footer;
          content = response.data.data.Page.content;
          html = header.html + content.html + footer.html;
        } else {
          html = response.data.data.content.html;
        }

        setHtmlContent(html);
        let css;
        if (type == "page") {
          css = header.css + content.css + footer.css;
        } else {
          css = response.data.data.content.css;
        }

        setCssContent(css);
      });
  }
  // useEffect(() => {

  // }, [showCode]);

  const setDevice = async (device) => {
    props.editor().store();

    let site = await axios.get(
      process.env.REACT_APP_API_URL + "/sites/get/" + siteId
    );
    const showSidbar = document.getElementById("showSidbar");

    const deviceManager = props.editor().Devices;
    Array.from(document.querySelectorAll(".devices .boutton")).forEach(
      function (el) {
        el.classList.remove("active");
      }
    );

    let elbtn = null;
    switch (device) {
      case "mobile":
        showSidbar.classList.add("active");
        props.perview(false);
        deviceManager.select("mobile2");
        elbtn = document.getElementsByClassName("mobile");
        elbtn[0].classList.add("active");
        let mobileHeader = site.data.data.site?.headerMobile;
        if (mobileHeader) {
          let cmpHeader = props.editor().getWrapper().components().models[0];
          // console.log(cmpHeader);
          cmpHeader.replaceWith(
            mobileHeader.html + " <style>" + mobileHeader.css + "</style>"
          );
          cmpHeader.view.render();
        }

        let htmlm = props.editor().getHtml();
        let cssm = props.editor().getCss();
        setTimeout(() => {
          props.editor().setComponents(htmlm);
          props.editor().setStyle(cssm);
          props.editor().UndoManager.clear();
        }, 500);

        break;
      case "tablet":
        showSidbar.classList.add("active");
        props.perview(false);
        deviceManager.select("tablet2");
        elbtn = document.getElementsByClassName("tablet");
        elbtn[0].classList.add("active");
        let sync = site.data.data.site?.syncHeader;

        if (sync == false) {
          let tabletHeader = site.data.data.site?.headerTablet;

          if (tabletHeader) {
            let cmpHeader = props.editor().getWrapper().find("header")[0];

            cmpHeader.replaceWith(
              tabletHeader.html + " <style>" + tabletHeader.css + "</style>"
            );
            cmpHeader.view.render();
          }
        } else {
          let desktopHeader = site.data.data.site?.header;
          let cmpHeader = props.editor().getWrapper().components().models[0];

          cmpHeader.replaceWith(
            desktopHeader.html + " <style>" + desktopHeader.css + "</style>"
          );
          cmpHeader.view.render();
        }

        let htmlt = props.editor().getHtml();
        let csst = props.editor().getCss();
        setTimeout(() => {
          props.editor().setComponents(htmlt);
          props.editor().setStyle(csst);
          props.editor().UndoManager.clear();
        }, 500);
        break;
      case "desktop":
        showSidbar.classList.add("active");
        props.perview(false);
        deviceManager.select("desktop");
        elbtn = document.getElementsByClassName("desktop");
        elbtn[0].classList.add("active");

        let desktopHeader = site.data.data.site?.header;
        let cmpHeader = props.editor().getWrapper().find("header")[0];
      
        cmpHeader.replaceWith(
          desktopHeader.html + " <style>" + desktopHeader.css + "</style>"
        );
        cmpHeader.view.render();
        let htmld = props.editor().getHtml();
        let cssd = props.editor().getCss();

        setTimeout(() => {
          props.editor().setComponents(htmld);
          props.editor().setStyle(cssd);
          props.editor().UndoManager.clear();
        }, 500);

        break;
      case "all":
        showSidbar.classList.remove("active");
        props.perview(true);
        elbtn = document.getElementsByClassName("all");
        elbtn[0].classList.add("active");
        break;
      default:
        deviceManager.select("desktop");
        break;
    }
  };
  const editEditor = () => {
    setShowCode(true);
    SourceCode()
  };
  const savePage = () => {
    toast.loading("Sauveguarde en cours...");
    props.editor().setComponents(htmlContent);
    props.editor().setStyle(cssContent);
    setShowCode(false);
    try {
      props.editor().store();
      toast.dismiss();
      toast.success("Sauveguarde est terminé");
    } catch (error) {
      toast.dismiss();

      toast.error("Sauveguarde est échoué");
    }
  };
  useEffect(() => {}, [cssContent, htmlContent]);

  const divideEditor = () => {
    const el = document.getElementsByClassName("divide");
    setIsDivided(!isDivided);
    if (isDivided) {
      props.editor().runCommand("sw-visibility");
      el[0].classList.add("active");
    } else {
      props.editor().stopCommand("sw-visibility");
      el[0].classList.remove("active");
    }
  };
  const codeEditor = () => {
    props.editor().runCommand("export-template");
  };
  const undoEditor = () => {
    props.editor().runCommand("core:undo");
  };
  const redoEditor = () => {
    props.editor().runCommand("core:redo");
  };

  const clearEditor = () => {
    /*  props.editor().runCommand("core:canvas-clear"); */
    props.editor().setStyle("");
    let wrapper = props.editor().getWrapper();
    let header = wrapper.find("header");
    let main = wrapper.find("main");
    let footer = wrapper.find("footer");
    if (header && header.length > 0) {
      header[0].components("");
    }
    if (main && main.length > 0) {
      main[0].components("");
    }
    if (footer && footer.length > 0) {
      footer[0].components("");
    }
    let content = props.editor().getWrapper();
    content.view.render();
  };
  const previewEditor = () => {
    props.editor().runCommand("core:preview");
  };
  const saveEditor = () => {
    toast.loading("Sauveguarde en cours...");
    setTimeout(() => {
      const el = document.getElementById("storeIcon");
      el.classList.remove("fa-cloud-upload");
      el.classList.add("fa-spinner-third", "annim-rotate");
      try {
        props.editor().store();
        setTimeout(() => {
          el.classList.remove("fa-spinner-third", "annim-rotate");
          el.classList.add("fa-cloud-upload", "green");
        }, 2000);
        setTimeout(() => {
          el.classList.remove("green");
          toast.dismiss();
          toast.success("Sauveguarde est terminé");
        }, 3000);
      } catch (error) {
        toast.dismiss();

        toast.error("Sauveguarde est échoué");
      }
    }, 1000);
  };
  const Publier = () => {};

  const Republier = async () => {
    try {
      await axios
        .post(process.env.REACT_APP_API_URL + "/sites/republier/" + siteId, {})
        .then(async (response) => {
          toast.success(response.data.message, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        })
        .catch(function (error) {
          toast.error("Page non crée", {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
    } catch (e) {
      toast.error("Page non crée!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  useEffect(() => {}, [isDivided]);

  return (
    <div id="EditorTopbar">
      <div className=" d-flex h-100">
        <div className="">
          <div className="d-flex">
            <div className="logo">
              <a
                href="#"
                onClick={(e) => setModalCloser(true)}
                title="YellowSmith"
              >
                <img src={logo} alt="YellowSmith" />
              </a>
            </div>
            <div className="pageChooser border-right">
              <div className="d-flex justify-content-between align-items-center">
                <div className="siteName">
                  <a
                    href="#"
                    onClick={(e) => setModalCloser(true)}
                    alt="Home"
                    className="homeLink"
                  >
                    <i className="fas fa-home-alt"></i>
                  </a>
                  - {storeSite?.site?.nom.toUpperCase()}
                </div>
                <div className="SelectPage">
                  <div className="styled-select" onClick={(e) => getPages(e)}>
                    <select
                      className="form-select selectMenu  "
                      onChange={(e) => {
                        changePage(e.target.value);
                      }}
                    >
                      {pages?.map((option) => (
                        <>
                          <option
                            key={option._id + Math.random()}
                            value={option._id}
                            // selected={option._id}
                            selected={optionsState === option._id}
                          >
                            {option.title}
                          </option>

                          <>
                            {option.children?.map((child1) => (
                              <>
                                <option
                                  key={child1._id + Math.random()}
                                  value={child1._id}
                                  selected={optionsState === child1._id}
                                  className="d-block Submenu"
                                >
                                  → {child1.title}
                                </option>
                                {child1.children?.map((child2) => (
                                  <option
                                    key={child2._id + Math.random()}
                                    value={child2._id}
                                    selected={optionsState === child2._id}
                                  >
                                    ―→ {child2.title}
                                  </option>
                                ))}
                              </>
                            ))}
                          </>
                        </>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex  justify-content-between w-100 divicess">
          <div>
            <div className="devices">
              {/*               <div
                className="all boutton"
                onClick={(e) => {
                  setDevice("all");
                }}
              >
                <a
                  href="javascript:void(0)"
                  title="Affichage sur tous les appareils"
                >
                  <i className="fal fa-phone-laptop"></i>
                </a>
              </div> */}
              <div
                className="desktop boutton"
                onClick={(e) => {
                  setDevice("desktop");
                }}
              >
                <a
                  href="javascript:void(0)"
                  title="Afficher/Modifier sur ordinatuer"
                >
                  <i className="fal fa-desktop"></i>
                </a>
              </div>
              <div
                className="tablet boutton"
                onClick={(e) => {
                  setDevice("tablet");
                }}
              >
                <a
                  href="javascript:void(0)"
                  title="Afficher/Modifier sur tablette"
                >
                  <i className="fal fa-tablet"></i>
                </a>
              </div>
              <div
                className="mobile boutton"
                onClick={(e) => {
                  setDevice("mobile");
                }}
              >
                <a
                  href="javascript:void(0)"
                  title="Afficher/Modifier sur mobile"
                >
                  <i className="fal fa-mobile"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-end align-items-center actions-btns">
            <div className="publier me-5">
              <div>
                {sites?.site?.etat == "Actif" ? (
                        <HasPermission  permission={["republier"]} >
                  <button
                    type="button"
                    class="btn"
                    onClick={(e) => handleSingleRebup()}
                  >
                    {" "}
                    Republier
                  </button>
                  </HasPermission>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div
              className="refresh me-3"
              onClick={(e) => {
                refreshEditor();
              }}
            >
              <a href="javascript:void(0)" title="Refrechir l'editeur">
                <i class="fas fa-sync-alt"></i>
              </a>
            </div>
            <HasPermission  permission={["mode_developpeur"]} >
            <div
              className="edit me-3"
              onClick={(e) => {
                editEditor();
              }}
            >
              <a href="javascript:void(0)" title="Editer la code source">
                <i className="fal fa-edit"></i>
              </a>
            </div>
            </HasPermission>
            <div
              className="divide me-3"
              onClick={(e) => {
                divideEditor();
              }}
            >
              <a href="javascript:void(0)" title="Grille">
                <i className="fal fa-th"></i>
              </a>
            </div>
            <div
              className="preview me-3"
              /* onClick={(e) => {
                previewEditor();
              }}*/
            >
              <a
                href={"/previewclient/" + siteId}
                target="_blank"
                title="Aperçu"
              >
                <i id="storeIcon" className="fal fa-eye"></i>
              </a>
            </div>
            <HasPermission  permission={["modification_de_contenu","modifier_le_site"]} >
            <div
              className={type != "popup" ? "clear me-3 " : "d-none"}
              onClick={(e) => {
                setShow(true);
              }}
            >
              <a href="javascript:void(0)" title="Vider la page">
                <i id="storeIcon" className="fal fa-trash"></i>
              </a>
            </div>
            </HasPermission>
            <HasPermission  permission={["modification_de_contenu","modifier_le_site"]} >
            <div
              className="save me-3"
              onClick={(e) => {
                saveEditor();
              }}
            >
              <a
                href="javascript:void(0)"
                title="Enregistrer les modifications"
              >
                <i id="storeIcon" className="fal fa-cloud-upload"></i>
              </a>
            </div>
            </HasPermission>
            <HasPermission  permission={["modification_de_contenu","modifier_le_site"]} >
            <div
              className="undo me-3"
              onClick={(e) => {
                undoEditor();
              }}
            >
              <a href="javascript:void(0)" title="Annuler">
                <i className="fal fa-undo-alt"></i>
              </a>
            </div>
            </HasPermission>
            <HasPermission  permission={["modification_de_contenu","modifier_le_site"]} >
            <div
              className="rendo me-3"
              onClick={(e) => {
                redoEditor();
              }}
            >
              <a href="javascript:void(0)" title="Rétablir">
                <i className="fal fa-redo-alt"></i>
              </a>
            </div>
            </HasPermission>
            <div
              className="code me-3"
              onClick={(e) => {
                codeEditor();
              }}
            >
              <a href="javascript:void(0)" title=" Visualiser le code">
                <i className="fal fa-code"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
      <Modal
        show={show}
        onHide={handleSingleClose}
        backdrop="static"
        keyboard={false}
        className="modalDelete"
        size="md"
        id="addPageModal"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className="add_page_modal_header">
          <div className="titre_popup_page">
            <div className="modal_header_add_page ">
              <div className="titre_popup_add_page">
                Supprimer le contenu du la page
              </div>

              <i
                className="fa-solid fa-xmark closeSideBar"
                onClick={handleSingleClose}
              ></i>
            </div>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="add_page_modal_content ">
            <div className="addPageOptions">
              <div className="add_Page_Options_title">
                Vous êtes sur de supprimer le contenu du cette page!
                <br />
                Cette action ne peut pas être annulée si vous quitterez la page.
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-rounded  btn-outline-secondary"
            onClick={(e) => handleSingleClose()}
          >
            Non
          </button>
          <button
            className="btn  btn-rounded btn btn-outline-secondary delete"
            onClick={(e) => [clearEditor(), handleSingleClose()]}
          >
            Oui, supprimer le contenu
          </button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={modalClose}
        onHide={handleClosed}
        backdrop="static"
        keyboard={false}
        className="modalDelete"
        size="md"
        id="addPageModal"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className="add_page_modal_header">
          <div className="titre_popup_page">
            <div className="modal_header_add_page ">
              <div className="titre_popup_add_page">
                Annuler les modifications{" "}
              </div>

              <i
                className="fa-solid fa-xmark closeSideBar"
                onClick={handleClosed}
              ></i>
            </div>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="add_page_modal_content ">
            <div className="addPageOptions">
              <div className="add_Page_Options_title">
                Les <b>modifications</b> apportées ne seront pas enregistrées.
                <br />
                Quitter quand même ?
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-rounded  btn-outline-secondary"
            onClick={(e) => handleClosed()}
          >
            Non
          </button>
    
          <button
            className="btn  btn-rounded btn btn-outline-secondary delete"
            onClick={(e) =>Object.keys(storeClient).length > 0 ? navigate("/accueil"):navigate("/sites")}
          >
            Oui
          </button>
        </Modal.Footer>
      </Modal>
      {/* MODAL  PUBLIER  LE SITE  */}
      <Modal
        show={showPub}
        onHide={handleSingleClosePub}
        backdrop="static"
        keyboard={false}
        className="modalDelete pub"
        size="md"
        id="publier"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className="add_page_modal_header">
          <div className="titre_popup_page">
            <div className="modal_header_add_page ">
              <div className="titre_popup_add_page">Publier le site</div>

              <i
                className="fa-solid fa-xmark closeSideBar"
                onClick={handleSingleClosePub}
              ></i>
            </div>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="add_page_modal_content ">
            <div className="addPageOptions">
              <div className="add_Page_Options_title">
                Publiez votre site pour en faire profiter le monde entier
                <br></br>
                <b>Remarque : </b> si vous éditez le site, nous devons avoir
                directement une sauvegarde dans les paramètres du site.
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-rounded  btn-outline-secondary"
            onClick={(e) => handleSingleClosePub()}
          >
            Annuler
          </button>
          <HasPermission  permission={["publier"]} >
          <button
            className="btn  btn-rounded btn btn-outline-secondary publier"
            onClick={(e) => [handleSingleClosePub(), Publier()]}
          >
            Publier
          </button>
          </HasPermission>
        </Modal.Footer>
      </Modal>

      {/* MODAL  REBULIER  LE SITE  */}
      <Modal
        show={showRePub}
        onHide={handleSingleCloseRebup}
        backdrop="static"
        keyboard={false}
        className="modalDelete pub"
        size="md"
        id="publier"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className="add_page_modal_header">
          <div className="titre_popup_page">
            <div className="modal_header_add_page ">
              <div className="titre_popup_add_page">Republier le site</div>

              <i
                className="fa-solid fa-xmark closeSideBar"
                onClick={handleSingleCloseRebup}
              ></i>
            </div>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="add_page_modal_content ">
            <div className="addPageOptions">
              <div className="add_Page_Options_title">
                Republiez votre site pour en faire profiter le monde entier.
                <br></br>
                <b>Remarque : </b> si vous éditez le site, nous devons avoir
                directement une sauvegarde dans les paramètres du site.
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-rounded  btn-outline-secondary"
            onClick={(e) => handleSingleCloseRebup()}
          >
            Annuler
          </button>
          <button
            className="btn  btn-rounded btn btn-outline-secondary publier "
            onClick={(e) => [handleSingleCloseRebup(), Republier()]}
          >
            Republier
          </button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={showCode}
        onHide={onHideCode}
        backdrop="static"
        keyboard={false}
        className="modalDelete pub"
        size="fullscreen"
        id="editCode"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className="add_page_modal_header">
          <div className="titre_popup_page">
            <div className="modal_header_add_page ">
              <div className="titre_popup_add_page">Editer le Code</div>

              <i
                className="fa-solid fa-xmark closeSideBar"
                onClick={onHideCode}
              ></i>
            </div>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex justify-content-between align-items-center gap-1">
            <div className="aceEditor d-block">
              <AceEditor
                placeholder="Ecrire votre html/javascript code..."
                mode="html"
                theme="monokai"
                name="htmlCode"
                width={"100%"}
                height={"80vh"}
                onChange={setHtmlContent}
                fontSize={14}
                showPrintMargin={false}
                showGutter={true}
                highlightActiveLine={true}
                value={htmlContent}
                editorProps={{ $blockScrolling: true }}
                setOptions={{
                  enableBasicAutocompletion: true,
                  enableLiveAutocompletion: true,
                  enableSnippets: true,
                  showLineNumbers: true,
                  tabSize: 2,
                  useWorker: false,
                }}
              />
            </div>
            <div className="aceEditor d-block">
              <AceEditor
                placeholder="Ecrire votre html/javascript code..."
                mode="css"
                theme="monokai"
                name="cssCode"
                width={"100%"}
                height={"80vh"}
                onChange={setCssContent}
                fontSize={14}
                showPrintMargin={false}
                showGutter={true}
                highlightActiveLine={true}
                value={cssContent}
                editorProps={{ $blockScrolling: true }}
                setOptions={{
                  enableBasicAutocompletion: true,
                  enableLiveAutocompletion: true,
                  enableSnippets: true,
                  showLineNumbers: true,
                  tabSize: 2,
                  useWorker: false,
                }}
              />
            </div>
          </div>
          <div className="text-center">
          <HasPermission  permission={["mode_developpeur"]} >
            <button
              className="btn btn-success mt-1"
              onClick={(e) => savePage()}
            >
              Enregistrer
            </button>
            </HasPermission>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-rounded  btn-outline-secondary"
            onClick={(e) => onHideCode()}
          >
            fermer
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
