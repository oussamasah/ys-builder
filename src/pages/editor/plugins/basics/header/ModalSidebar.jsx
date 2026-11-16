import React, { useEffect, useState } from "react";
import ModalDialog from "react-bootstrap/ModalDialog";
import Draggable from "react-draggable";
import { Modal } from "react-bootstrap";
import ColorConfig from "../../../compoments/Color/ColorConfig";
import { models } from "./SidebarModels";
import modelOne from "../../../../../assets/imgEditorBlocks/SidebarModelOne.png";
import modelTwo from "../../../../../assets/imgEditorBlocks/SidebarModelTwo.png";
import modelThree from "../../../../../assets/imgEditorBlocks/SidebarModelThree.png";

import "./ModalHeader.css";
class DraggableModalDialog extends React.Component {
  render() {
    return (
      <Draggable handle=".handleDrag">
        <ModalDialog {...this.props} />
      </Draggable>
    );
  }
}
export default function ModalSidebar(props) {
  const [show, setShow] = useState(true);
  const [showModels, setShowModels] = useState(false);
  const [model, setModel] = useState(
    props.editor
      .getSelected()
      .getClasses()
      .filter((x) => x.indexOf("SidebarModel") > -1)[0]
  );
  const handleClose = () => {
    setShow(false);
  };
  const handleCloseModels = () => {
    setShowModels(false);
  };
  const [align, setAlign] = useState(
    props.editor.getSelected().getAttributes()["data-align-close"]
      ? props.editor.getSelected().getAttributes()["data-align-close"]
      : "end"
  );
  const rgbtoJson = (rgbString) => {
    var s = rgbString;
    s = s.replace("rgb(", "");
    s = s.replace(")", "");
    let c = s.split(",");
    return { r: c[0], g: c[1], b: c[2], a: c[3] };
  };
  const [sizeClose, setSizeClose] = useState(
    props.editor.getSelected().getAttributes()["data-close-size"]
      ? props.editor.getSelected().getAttributes()["data-close-size"]
      : "35"
  );
  const [blockPickerColor, setBlockPickerColor] = useState({
    rgbTxt: props.editor.getSelected().getAttributes()["data-bg"]
      ? props.editor.getSelected().getAttributes()["data-bg"]
      : "#fff",
    rgb: rgbtoJson(
      props.editor.getSelected().getAttributes()["data-bg"]
        ? props.editor.getSelected().getAttributes()["data-bg"]
        : "#fff"
    ),
  });
  const [blockPickerColorClose, setBlockPickerColorClose] = useState({
    rgbTxt: props.editor.getSelected().getAttributes()["data-close-color"]
      ? props.editor.getSelected().getAttributes()["data-close-color"]
      : "#fff",
    rgb: rgbtoJson(
      props.editor.getSelected().getAttributes()["data-close-color"]
        ? props.editor.getSelected().getAttributes()["data-close-color"]
        : "#fff"
    ),
  });
  const changeColor = (color) => {
    setBlockPickerColor(color);
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-bg"] = color.rgbTxt;

    let r = props.editor.Css.getRule(`#${attr.id}`);
    let css = {};
    if (r) css = r.attributes.style;

    css["background"] = color.rgbTxt;

    cmp.setAttributes(attr);
    props.editor.Css.setRule(`#${attr.id}`, css);
    props.editor.setStyle(props.editor.getCss());

    let cls = cmp.getClasses();
    cls.push("active");
    cmp.setClass(cls);
  };
  const changeColorClose = (color) => {
    setBlockPickerColorClose(color);
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-close-color"] = color.rgbTxt;

    let r = props.editor.Css.getRule(`#${attr.id} .sidebar-menu-close i`);
    let css = {};
    if (r) css = r.attributes.style;

    css["color"] = color.rgbTxt;

    cmp.setAttributes(attr);
    props.editor.Css.setRule(`#${attr.id} .sidebar-menu-close i`, css);
    props.editor.setStyle(props.editor.getCss());

    let cls = cmp.getClasses();
    cls.push("active");
    cmp.setClass(cls);
  };
  const changeAlignClose = (pos) => {
    setAlign(pos);
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-align-close"] = pos;
    cmp.setAttributes(attr);
    let r = props.editor.Css.getRule(`#${attr.id} .sidebar-menu-close`);
    let css = [];
    if (r) css = r.attributes.style;
    if (css) {
      css["display"] = "inline-block";
      css["float"] = pos;
      props.editor.Css.setRule(`#${attr.id} .sidebar-menu-close`, css);
      props.editor.setStyle(props.editor.getCss());
    }
  };
  const changeSizeClose = (size) => {
    setSizeClose(size);
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-close-size"] = size;
    cmp.setAttributes(attr);
    let r = props.editor.Css.getRule(`#${attr.id} .sidebar-menu-close i`);
    let css = [];
    if (r) css = r.attributes.style;
    if (css) {
      css["font-size"] = size + "px";
    }
    props.editor.Css.setRule(`#${attr.id} .sidebar-menu-close i`, css);
    props.editor.setStyle(props.editor.getCss());
    cmp.view.render();
    let cls = cmp.getClasses();
    cls.push("active");
    cmp.setClass(cls);
  };

  const changeStyle = (key) => {
    const cmp = props.editor.getSelected();
    let classes = cmp
      .getClasses()
      .filter((x) => x.indexOf("Model") == -1 && x.indexOf("Annimation") == -1);
    classes.push(key);
    classes.push(
      key == "SidebarModelOne"
        ? "AnnimationRightToLeft"
        : "AnnimationToptoBottom"
    );

    cmp.setClass(classes);
    setModel(key);
    cmp.components(models[key]);
    props.editor.select(cmp);

    cmp.view.render();
    props.editor.setStyle(props.editor.getCss());
    let cls = cmp.getClasses();
    cls.push("active");
    cmp.setClass(cls);
  };
  useEffect(() => {
    console.log(model);
  }, [model]);
  useEffect(() => {
    let cmp = props.editor.getSelected();
    let cls = cmp.getClasses();
    cls.push("active");
    cmp.setClass(cls);
  }, []);

  return (
    <Modal
      dialogAs={DraggableModalDialog}
      show={show}
      backdrop="static"
      onHide={handleClose}
      centered
      id="modalHeader"
    >
      <Modal.Header className="handleDrag">
        <Modal.Title>
          <nav>
            <div class="nav nav-tabs" id="nav-tab" role="tablist">
              <button
                className="nav-link tt "
                id="nav-contenu-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-contenu"
                type="button"
                role="tab"
                aria-controls="nav-contenu"
                aria-selected="true"
              >
                Contenu
              </button>
              <button
                className="nav-link tt active"
                id="nav-desgine-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-desgine"
                type="button"
                role="tab"
                aria-controls="nav-desgine"
                aria-selected="false"
              >
                Design
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
          ></div>
          <div
            class="tab-pane fade active show"
            id="nav-desgine"
            role="tabpanel"
            aria-labelledby="nav-contenu-tab"
            tabindex="0"
          >
            <span className="title-popups">Design Contenu Sidebar</span>
            <nav id="navbar-example2" class="navbar bg-light px-3 mb-3">
              <ul class="nav nav-pills">
                <li class="nav-item">
                  <a class="nav-link" href="#scrollspyHeading1">
                    Mise en page
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#scrollspyHeading2">
                    Style
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#scrollspyHeading3">
                    Animations
                  </a>
                </li>
              </ul>
            </nav>
            <div
              data-bs-spy="scroll"
              data-bs-target="#navbar-example2"
              data-bs-root-margin="0px 0px -40%"
              data-bs-smooth-scroll="true"
              class="scrollspy-example bg-light  rounded-2"
              tabindex="0"
            >
              <div className="firstdiv">
                <span id="scrollspyHeading1" className="titre mt-1 mb-1 ">
                  Mise en page
                </span>
                <div className="d-flex justify-content-center align-items-center mb-3">
                  <div className="panelContnet dropend">
                    <div
                      className="btn-group"
                      onClick={(e) => setShowModels(true)}
                    >
                      {model == "SidebarModelOne" ? (
                        <img src={modelOne} className="selectedModel" />
                      ) : model == "SidebarModelTwo" ? (
                        <img src={modelTwo} className="selectedModel" />
                      ) : model == "SidebarModelThree" ? (
                        <img src={modelThree} className="selectedModel" />
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="firstdiv">
                <div class="accordion" id="accordionExample">
                  <div class="accordion-item">
                    <h2 class="accordion-header" id="headingOne">
                      <button
                        class="accordion-button active show"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseOne"
                        aria-expanded="true"
                        aria-controls="collapseOne"
                      >
                        <span
                          id="scrollspyHeading2"
                          className="titre mt-1 mb-1 "
                        >
                          Style
                        </span>
                      </button>
                    </h2>
                    <div
                      id="collapseOne"
                      class="accordion-collapse collapse show"
                      aria-labelledby="headingOne"
                      data-bs-parent="#accordionExample"
                    >
                      <div class="accordion-body">
                        <ColorConfig
                          key="sidebarbg"
                          label="background Color"
                          config={blockPickerColor}
                          setConfig={changeColor}
                        />

                        <ColorConfig
                          key="sidebarclose"
                          label="Couleur du boutton fermer"
                          config={blockPickerColorClose}
                          setConfig={changeColorClose}
                        />
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <span>Taille du boutton fermer</span>
                          <div className="d-flex justify-content-between align-items-center mb-3">
                            <input
                              type="range"
                              min="10"
                              max="300"
                              class="rangeInput me-2"
                              value={sizeClose}
                              onChange={(e) => changeSizeClose(e.target.value)}
                            />
                            <div class="input-with-label-pixel">
                              <span class="pixel-label">px</span>
                              <input
                                min="10"
                                max="300"
                                value={sizeClose}
                                onChange={(e) =>
                                  changeSizeClose(e.target.value)
                                }
                                class="form-control form-control-sm input-small-pixel"
                                type="number"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="d-flex justify-content-between align-content-center mb-3">
                          <span>Position du bouton fermer </span>
                          <div className="seperators d-flex justify-content-around align-items-center">
                            <div class="form-check">
                              <input
                                onChange={(e) =>
                                  changeAlignClose(e.target.value)
                                }
                                checked={align == "left"}
                                className="RadioInput"
                                type="radio"
                                value="left"
                                name="align"
                                id="left"
                              />
                              <label class="RadioLabel" for="left">
                                <i class="fas fa-long-arrow-alt-left"></i>
                              </label>
                            </div>

                            <div class="form-check">
                              <input
                                onChange={(e) =>
                                  changeAlignClose(e.target.value)
                                }
                                checked={align == "right"}
                                className="RadioInput"
                                type="radio"
                                value="right"
                                name="align"
                                id="right"
                              />
                              <label class="RadioLabel" for="right">
                                <i class="fas fa-long-arrow-alt-right"></i>
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={showModels ? "models-list p-3 d-block" : "d-none"}>
          <div class="text-end mb-3">
            <button
              type="button"
              onClick={handleCloseModels}
              class="btn-close"
              aria-label="Close"
            ></button>
          </div>
          <div className="preview-options pt-3 pb-3">
            <span class="titredropdown m-3">Sélectionner la mise en page</span>
            <div onClick={(e) => changeStyle("SidebarModelOne")}>
              <img src={modelOne} className="modelPreview" />
            </div>
            <div onClick={(e) => changeStyle("SidebarModelTwo")}>
              <img src={modelTwo} className="modelPreview" />
            </div>
            <div onClick={(e) => changeStyle("SidebarModelThree")}>
              <img src={modelThree} className="modelPreview" />
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
