import React, { useEffect, useState } from "react";
import { Modal, ModalDialog } from "react-bootstrap";
import "./ModalIcon.css";
import Draggable from "react-draggable";
import fsList from "../../../../../assets/fonts/fs.json";
import editor from "../../../../../redux/features/editor";
import axios from "axios";

class DraggableModalDialog extends React.Component {
  render() {
    return (
      <Draggable handle=".handleDrag">
        <ModalDialog {...this.props} />
      </Draggable>
    );
  }
}
export default function ModalIcon(props) {
  const [show, setShow] = useState(true);
  const [icons, setIcons] = useState([]);
  const [filter, setFilter] = useState([]);

  const filtre = (value) => {
    setFilter(value);
    let filtred;
    if (value != "") {
      filtred = Object.values(icons).filter((item) =>
        item.name.toLowerCase().match(value.toLowerCase())
      );

      setIcons(filtred);
    } else {
      filtred = icons;
      setIcons(fsList);
    }
  };
  //lien de l'image
  const handleCloseTypeLien = () => {
    setShowTypeLien(false);
  };
    const [ShowTypeLien, setShowTypeLien] = useState(false);
  const [selectedType, setSelectedType] = useState(
    props.editor.getSelected().getAttributes()["data-type-lien"]
      ? props.editor.getSelected().getAttributes()["data-type-lien"]
      : ""
  );
  const [selectedTel, setSelectedTel] = useState("#");
  const [selectedPage, setSelectedPage] = useState("#");
  const [selectedPopup, setSelectedPopup] = useState("#");
  const [selectedUrl, setSelectedUrl] = useState("#");
  const [popups, setPopups] = useState([]);
  const [pages, setPages] = useState([]);

  const changeHrefLink = (selectedType, link) => {
    setSelectedType(selectedType);
    let cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    let rules = props.editor.Css.getRule(`#${attr.id}`);
    let rule = {};
    if (rules) {
      rule = rules.attributes.style;
    }
    attr["data-type-lien"] = selectedType;
    let hrefAttr = [];
    switch (selectedType) {
      case "page":
        attr["href"] = link;
        attr["target"] = "_self";
        hrefAttr["href"] = link;
        hrefAttr["target"] = "_self";
        delete attr["data-bs-toggle"];
        delete hrefAttr["data-bs-toggle"];
        setSelectedPage(link);
        break;
      case "popup":
        attr["data-href"] = "#" + link;
        attr["data-target"] = "_self";
        attr["data-bs-toggle"] = "modal";
        hrefAttr["href"] = "#" + link;
        hrefAttr["target"] = "_self";
        hrefAttr["data-bs-toggle"] = "modal";
        setSelectedPopup(link);
        break;
      case "url":
        attr["data-href"] = link;
        attr["data-target"] = "_blank";
        delete attr["data-bs-toggle"];
        hrefAttr["href"] = link;
        hrefAttr["target"] = "_blank";
        delete hrefAttr["data-bs-toggle"];
        setSelectedUrl(link);
        break;
      case "tel":
        attr["data-href"] = "tel:" + link;
        attr["data-target"] = "_self";
        delete attr["data-bs-toggle"];
        hrefAttr["href"] = "tel:" + link;
        hrefAttr["target"] = "_self";
        delete hrefAttr["data-bs-toggle"];
        setSelectedTel(link);
        break;
    }
    cmp.setAttributes(attr);
    let parent = cmp.parent();
    if (parent.getEl().tagName == "A") {
      parent.setAttributes(hrefAttr);
    } else {
      let imgHTML = cmp.toHTML();
      let hrefCmp = cmp.replaceWith(
        `<a class="iconLink" data-gjs-draggable=".gjs-cell,.gjs-row div,.container,main,footer,header" data-type-droppabel="true"  href="#" data-gjs-droppable="true" >${imgHTML}</a>`
      );
      hrefCmp.setAttributes(hrefAttr);

      props.editor.Css.setRule(`#${attr.id}`, rule);
      let css = props.editor.getCss();
      props.editor.setStyle(css);
      let img = props.editor.getWrapper().find(`#${attr.id}`);
      if (img) {
        props.editor.select(img);
      }
    }
  };
  const deleteLien = () => {
    let cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    let imgHTML = cmp.toHTML();
    let rules = props.editor.Css.getRule(`#${attr.id}`);
    let rule = {};
    if (rules) {
      rule = rules.attributes.style;
    }
    let parent = cmp.parent();
    if (parent.getEl().tagName == "A") {
      parent.replaceWith(imgHTML);
    }
    props.editor.Css.setRule(`#${attr.id}`, rule);
    let css = props.editor.getCss();
    props.editor.setStyle(css);
    let img = props.editor.getWrapper().find(`#${attr.id}`);
    if (img) {
      props.editor.select(img);
    }
    setSelectedType("");
  };
  useEffect(() => {}, [
    selectedType,
    selectedPage,
    selectedPopup,
    selectedUrl,
    selectedTel,
  ]);

  // end lien de l'image
  const handleClose = () => {
    setShow(false);
  };
  useEffect(() => {
    setIcons(fsList);
  }, []);
  useEffect(() => {}, [icons]);

  const setIcon = (e) => {
    let list = e.classList;

    const cmp = props.editor.getSelected();
    cmp.setClass(["icon-gjs", list[0], list[1]]);
    setShow(false);
  };

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL + "/pages/getAll/" + props.siteId)
      .then((res) => {
        setPages(res.data.data);
      });
    axios
      .get(process.env.REACT_APP_API_URL + "/popups/getAll/" + props.siteId)
      .then((res) => {
        setPopups(res.data.data);
      });

    let cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    setSelectedType(attr["data-type"]);
    switch (attr["data-type"]) {
      case "page":
        setSelectedPage(attr["href"]);

        break;
      case "popup":
        setSelectedPopup(attr["href"].replace("#", ""));

        break;
      case "url":
        setSelectedUrl(attr["href"]);

        break;
      case "tel":
        setSelectedTel(attr["href"] ? attr["href"].replace("tel:", "") : "");
        break;
    }
    if (
      !attr["data-isglobalstyling"] ||
      attr["data-isglobalstyling"] == "true"
    ) {
      let r = props.editor.Css.getRule(`#${attr.id}`);
      let css = [];
      if (r) css = r.attributes.style;

      // css["position"] = "relative";
      // css["display"] = "flex";
      // css["align-items"] = "center";
      // css["justify-content"] = "center";
      if (!attr["data-size"]) {
        css["width"] = "auto";
      }

      props.editor.Css.setRule(`#${attr.id}`, css);
      props.editor.setStyle(props.editor.getCss());
      cmp.view.render();
    } else if (attr["data-isglobalstyling"] == "false") {
      props.editor.Css.remove(`#${attr.id}`);
    }
  }, []);

  useEffect(() => {
    let cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-type"] = selectedType;
    switch (selectedType) {
      case "page":
        attr["href"] = selectedPage;
        attr["target"] = "_self";
        delete attr["data-bs-toggle"];
        break;
      case "popup":
        attr["href"] = "#" + selectedPopup;
        attr["target"] = "_self";
        attr["data-bs-toggle"] = "modal";
        break;
      case "url":
        attr["href"] = selectedUrl;
        attr["target"] = "_blank";
        delete attr["data-bs-toggle"];
        break;
      case "tel":
        attr["href"] = "tel:" + selectedTel;
        attr["target"] = "_self";
        delete attr["data-bs-toggle"];
        break;

      default:
        break;
    }

    cmp.setAttributes(attr);
  }, [selectedType, selectedPage, selectedPopup, selectedTel, selectedUrl]);
  useEffect(() => {
    let cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-type"] = selectedType;
    switch (selectedType) {
      case "page":
        attr["href"] = selectedPage;
        attr["target"] = "_self";
        delete attr["data-bs-toggle"];
        break;
      case "popup":
        attr["href"] = "#" + selectedPopup;
        attr["target"] = "_self";
        attr["data-bs-toggle"] = "modal";
        break;
      case "url":
        attr["href"] = selectedUrl;
        attr["target"] = "_blank";
        delete attr["data-bs-toggle"];
        break;
      case "tel":
        attr["href"] = "tel:" + selectedTel;
        attr["target"] = "_self";
        delete attr["data-bs-toggle"];
        break;
    }
    cmp.setAttributes(attr);
  }, [selectedType]);
  return (
    <div id="modalIcon">
      <Modal
        dialogAs={DraggableModalDialog}
        show={show}
        onHide={handleClose}
        id="ModalIcon"
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
       <Modal.Header className="handleDrag">
          <Modal.Title>
            <nav>
              <div class="nav nav-tabs" id="nav-tab" role="tablist">
                <button
                  className="nav-link tt active"
                  id="nav-contenu-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-contenu"
                  type="button"
                  role="tab"
                  aria-controls="nav-contenu"
                  aria-selected="true"
                >
                  Choisir icon
                </button>
                <button
                  className="nav-link tt"
                  id="nav-desgine-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-desgine"
                  type="button"
                  role="tab"
                  aria-controls="nav-desgine"
                  aria-selected="false"
                >
                    Lien  icon
                </button>
              </div>
            </nav>
          </Modal.Title>
          <div className="btns-action">
            <button
              type="button"
              className="btn-closes"
              aria-label="Close"
              onClick={handleClose}
            >
              {" "}
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
        </Modal.Header>
        <Modal.Body>
    
        <div class="tab-content" id="nav-tabContent">
	         <div
              class="tab-pane fade show active"
              id="nav-contenu"
              role="tabpanel"
              aria-labelledby="nav-contenu-tab"
              tabindex="0"
            >        <div class="form-group mb-3">
            <input
              class="form-control icp icp-auto"
              type="text"
              value={filter}
              onChange={(e) => filtre(e.target.value)}
              placeholder="Chercher votre icon ici..."
            />
          </div>
          <div className="d-flex justify-content-center align-items-center flex-wrap iconList">
            {Object.values(icons)?.map((icon) => {
              return (
                <i
                  onClick={(e) => setIcon(e.target)}
                  className={icon.type + " fa-" + icon.name + " icon"}
                ></i>
              );
            })}
          </div>
        </div>

	         <div
              class="tab-pane fade"
              id="nav-desgine"
              role="tabpanel"
              aria-labelledby="nav-desgine-tab"
              tabindex="0"
            >   <div
                  className="d-flex justify-content-between align-items-center mb-4 mt-4  p-2 setting-title"
               
                >
                  Lien de l'image 
                  <span
                  className={selectedType == "" ? "d-none" : "d-block supplien"}
                  onClick={(e) => deleteLien(e)}
                >
                  {" "}
                  Supprimer lien
                </span>
                </div>
                <div className="models">
              <div
                className="justify-content-around align-items-center flex-wrap gap-3 m-3"
                id="modallien"
              >
                <div className="mb-2">
                  <div class="form-check me-3">
                    <input
                      class="form-check-input typebtn"
                      type="radio"
                      name="typeBtn"
                      id="typePage"
                      value="page"
                      checked={selectedType == "page"}
                      onChange={(e) => changeHrefLink("page", selectedPage)}
                    />
                    <label class="form-check-label" for="typePage">
                      Pages
                    </label>
                  </div>
                  <div
                    className={selectedType != "page" ? "d-none" : "d-block"}
                  >
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      value={selectedPage}
                      onChange={(e) => changeHrefLink("page", e.target.value)}
                    >
                      <option value="#">Vide</option>
                      {pages.map((p) => {
                        return <option value={p.url}>{p.title}</option>;
                      })}
                    </select>
                  </div>
                </div>

                <div className="mb-2">
                  <div class="form-check me-3">
                    <input
                      class="form-check-input typebtn"
                      type="radio"
                      name="typeBtn"
                      id="typePopup"
                      value="popup"
                      checked={selectedType == "popup"}
                      onChange={(e) => changeHrefLink("popup", selectedPopup)}
                    />
                    <label class="form-check-label" for="typePopup">
                      Popups
                    </label>
                  </div>
                  <div
                    className={selectedType != "popup" ? "d-none" : "d-block"}
                  >
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      value={selectedPopup}
                      onChange={(e) => changeHrefLink("popup", e.target.value)}
                    >
                      <option value="#">Vide</option>
                      {popups.map((p) => {
                        return <option value={p.ref}>{p.title}</option>;
                      })}
                    </select>
                  </div>
                </div>
                <div className="mb-2">
                  <div class="form-check">
                    <input
                      class="form-check-input typebtn"
                      type="radio"
                      checked={selectedType == "url"}
                      name="typeBtn"
                      id="typeUrl"
                      value="url"
                      onChange={(e) => changeHrefLink("url", selectedUrl)}
                    />
                    <label class="form-check-label" for="typeUrl">
                      Url - {selectedType == "url" ? "checked" : "no"}
                    </label>
                  </div>
                  <div className={selectedType != "url" ? "d-none" : "d-block"}>
                    <input
                      onChange={(e) => changeHrefLink("url", e.target.value)}
                      type="text"
                      value={selectedUrl}
                      name="lien"
                      placeholder="https://"
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="mb-2">
                  <div class="form-check">
                    <input
                      class="form-check-input typebtn"
                      type="radio"
                      name="typeBtn"
                      checked={selectedType == "tel"}
                      id="typeTel"
                      value="tel"
                      onChange={(e) => changeHrefLink("tel", selectedTel)}
                    />
                    <label class="form-check-label" for="typeTel">
                      ClickToCall
                    </label>
                  </div>
                  <div className={selectedType != "tel" ? "d-none" : "d-block"}>
                    <input
                      onChange={(e) => changeHrefLink("tel", e.target.value)}
                      type="text"
                      value={selectedTel}
                      name="tel"
                      placeholder="555 555 555"
                      className="form-control"
                    />
                  </div>
                </div>
              </div>
           
               
             
				
				
				 <div className={ShowTypeLien ? "d-block models-list" : "d-none"}>
            <div className="text-end">
              <button
                type="button"
                onClick={handleCloseTypeLien}
                class="text-end btn-close"
                aria-label="Close"
              ></button>
            </div>
            <span className="title-popups">Type de lien</span>
         
          </div> </div>
	        </div> 
     
      </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
