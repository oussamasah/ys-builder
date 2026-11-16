import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import ModalDialog from "react-bootstrap/ModalDialog";
import Draggable from "react-draggable";
import "./ModalLien.css";
// import Select from "react-select";
// import { SketchPicker } from "react-color";
import axios from "axios";
import TextStylingComponent from "../../../compoments/TextStyling/TextStylingComponent";
import ColorConfig from "../../../compoments/Color/ColorConfig";
import EspacementConfig from "../../../compoments/Espacement/EspacementConfig";
class DraggableModalDialog extends React.Component {
  render() {
    return (
      <Draggable handle=".handleDrag">
        <ModalDialog {...this.props} />
      </Draggable>
    );
  }
}
export default function ModalLien(props) {
  const [showStylesList, setShowStylesList] = useState(false);
  const [pages, setPages] = useState([]);
  const [selectedType, setSelectedType] = useState("page");
  const [selectedPage, setSelectedPage] = useState("#");
  const [selectedTel, setSelectedTel] = useState("#");
  const [selectedAnchor, setSelectedAnchor] = useState("#");
  const [selectedPopup, setSelectedPopup] = useState("#");
  const [selectedUrl, setSelectedUrl] = useState("#");
  const [popups, setPopups] = useState([]);
  const [text, setText] = useState(
    props.editor.getSelected().getAttributes()["data-value"]
  );
  const [show, setShow] = useState(true);
  const handleClose = () => {
    setShow(false);
  };
  const handleCloseStylesList = () => {
    setShowStylesList(false);
  };
  const rgbtoJson = (rgbString) => {
    var s = rgbString;
    s = s.replace("rgb(", "");
    s = s.replace(")", "");
    let c = s.split(",");
    return { r: c[0], g: c[1], b: c[2], a: c[3] };
  };
  const [configColorLink, setConfigColorLink] = useState({
    rgbTxt: props.editor.getSelected().getAttributes()["data-color-link"]
      ? props.editor.getSelected().getAttributes()["data-color-link"]
      : "#fff",
    rgb: rgbtoJson(
      props.editor.getSelected().getAttributes()["data-color-link"]
        ? props.editor.getSelected().getAttributes()["data-color-link"]
        : "#fff"
    ),
  });
  const [configColorHoverLink, setConfigColorHoverLink] = useState({
    rgbTxt: props.editor.getSelected().getAttributes()["data-hover-link"]
      ? props.editor.getSelected().getAttributes()["data-hover-link"]
      : "#fff",
    rgb: rgbtoJson(
      props.editor.getSelected().getAttributes()["data-hover-link"]
        ? props.editor.getSelected().getAttributes()["data-hover-link"]
        : "#fff"
    ),
  });
  const changecolorLink = (e) => {
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-color-link"] = e.rgbTxt;

    cmp.setAttributes(attr);
    let r = props.editor.Css.getRule(`#${attr.id},#${attr.id} a`);
    let css = [];
    if (r) css = r.attributes.style;
    css["color"] = e.rgbTxt;
    props.editor.Css.remove(r);
    props.editor.Css.setRule(`#${attr.id},#${attr.id} a`, css);
    setConfigColorLink(e);
    props.editor.setStyle(props.editor.getCss());
    cmp.view.render();
  };
  const [configEspacementlink, setConfigEspacementlink] = useState({
    padding: props.editor.getSelected().getAttributes()["data-link-padding"]
      ? JSON.parse(
          props.editor.getSelected().getAttributes()["data-link-padding"]
        )
      : {
          top: "5",
          left: "5",
          right: "5",
          bottom: "5",
        },
    margin: props.editor.getSelected().getAttributes()["data-link-margin"]
      ? JSON.parse(props.editor.getSelected().getAttributes()["data-link-margin"])
      : {
          top: "0",
          left: "0",
          right: "0",
          bottom: "0",
        },
  });

  const changeEspacementlink = (e) => {
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-link-padding"] = JSON.stringify(e.padding);
    attr["data-link-margin"] = JSON.stringify(e.margin);

    cmp.setAttributes(attr);
    let r = props.editor.Css.getRule(
      `#${attr.id}.gjs-lien`
    );
    let css = [];
    if (r) css = r.attributes.style;

    css["padding-top"] = e.padding.top + "px";
    css["padding-bottom"] = e.padding.bottom + "px";
    css["padding-right"] = e.padding.right + "px";
    css["padding-left"] = e.padding.left + "px";
    css["margin-top"] = e.margin.top + "px";
    css["margin-bottom"] = e.margin.bottom + "px";
    css["margin-right"] = e.margin.right + "px";
    css["margin-left"] = e.margin.left + "px";

    props.editor.Css.remove(r);
    props.editor.Css.setRule(
      `#${attr.id}.gjs-lien`,
      css
    );
    setConfigEspacementlink(e);

    props.editor.Css.remove(r);
    props.editor.Css.setRule(`#${attr.id}.gjs-lien`, css);
    setConfigEspacementlink(e);
    props.editor.setStyle(props.editor.getCss());
    cmp.view.render();
  };
  const changecolorHoverLink = (e) => {
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-hover-link"] = e.rgbTxt;

    cmp.setAttributes(attr);
    let r = props.editor.Css.getRule(`#${attr.id}:hover,#${attr.id} a:hover`);
    let css = [];
    if (r) css = r.attributes.style;
    css["color"] = e.rgbTxt;
    props.editor.Css.remove(r);
    props.editor.Css.setRule(`#${attr.id}:hover,#${attr.id} a:hover`, css);
    setConfigColorHoverLink(e);
    props.editor.setStyle(props.editor.getCss());
    cmp.view.render();
  };
  const [posAlignlink, setPosAliglink] = useState({
    align: props.editor.getSelected().getAttributes()["data-position-lien"]
      ? props.editor.getSelected().getAttributes()["data-position-lien"]
      : "inline",
  });
  const changePostionLink = (position) => {
    let cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    let device = props.editor.Devices.getSelected().id;

    if (device == "mobile2") {
      let r = props.editor.Css.getRule(`#${attr.id}.gjs-lien`, {
        atRuleType: "media",
        atRuleParams: "(max-width:767px)",
      });
      let css = [];
      if (r) css = r.attributes.style;
      css["display"] = position;
      props.editor.Css.setRule(`#${attr.id}.gjs-lien`, css, {
        atRuleType: "media",
        atRuleParams: "(max-width:767px)",
      });
    } else {
      let r = props.editor.Css.getRule(`#${attr.id}.gjs-lien`);
      let css = [];
      if (r) css = r.attributes.style;
      css["display"] = position;

      props.editor.Css.setRule(`#${attr.id}.gjs-lien`, css);
    }

    attr["data-position-lien"] = position;
    cmp.setAttributes(attr);

    setPosAliglink({ align: position });
    props.editor.setStyle(props.editor.getCss());
  };
  const SelectFontStyles = {
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        fontFamily: data.value,
        cursor: "pointer",
        /* color: selectedOption.font.value != data.value ? "#353535" : "white",
         backgroundColor:
          selectedOption.font.value == data.value
            ? "#353535"
            : isFocused
            ? "gey"
            : "white", */
      };
    },
    container: (provided, state) => ({
      ...provided,
      width: "180px",
    }),
    control: (provided, state) => ({
      ...provided,
      background: "#fff",
      borderColor: "#ced4da",
      minHeight: "30px",
      height: "30px",
      borderRadius: "10px",
      width: "100%",
      boxShadow: state.isFocused ? null : null,
    }),

    valueContainer: (provided, state) => ({
      ...provided,
      height: "30px",
      padding: "0 6px",
    }),

    input: (provided, state) => ({
      ...provided,
      margin: "0px",
    }),
    indicatorSeparator: (state) => ({
      display: "none",
    }),
    indicatorsContainer: (provided, state) => ({
      ...provided,
      height: "30px",
    }),
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
    setText(attr["data-value"]);
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
      case "anchor":
        setSelectedAnchor(attr["href"] ? attr["href"].replace("#", "") : "");

        break;
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
        attr["href"] = "tel:" + selectedTel.replaceAll("tel:","");
        attr["target"] = "_self";
        delete attr["data-bs-toggle"];
        break;
      case "anchor":
        attr["href"] = "#" + selectedAnchor.replaceAll("#","");
        attr["target"] = "_self";
        delete attr["data-bs-toggle"];
        break;

      default:
        break;
    }

    cmp.setAttributes(attr);
  }, [selectedType, selectedPage, selectedPopup, selectedTel, selectedUrl,selectedAnchor]);

  useEffect(() => {
    let cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-value"] = text;
    cmp.setAttributes(attr);
    cmp.components(text);
  }, [text]);

  return (
    <Modal
      dialogAs={DraggableModalDialog}
      show={show}
      backdrop="static"
      onHide={handleClose}
      centered
      id="ModalLien"
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
                Contenu lien
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
                Design lien
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
          >
            <div class="setting models" id="contenu">
              <div class="accordion" id="accordionPages">
                <div class="accordion-item">
                  <h2 class="accordion-header" id="headingOne">
                    <button
                      className="accordion-button text-center"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#contenutab"
                      aria-expanded="true"
                      aria-controls="contenutab"
                    >
                      Contenu lien
                    </button>
                  </h2>
                  <div class="tab-content" id="nav-tabContent">
                    <div
                      id="contenutab"
                      class="accordion-collapse collapse show"
                      aria-labelledby="headingOne"
                      data-bs-parent="#accordionPages"
                    >
                      <div class="accordion-body pt-2">
                        <div class="d-flex justify-content-center align-align-items-center mb-3">
                          <label className="w-50">Texte du lien</label>

                          <input
                            type="text"
                            value={text}
                            className="form-control w-50"
                            placeholder="Saisir Texte "
                            onChange={(e) => setText(e.target.value)}
                          />
                        </div>
                        <div className="mb-2">
                          <div class="form-check me-3">
                            <input
                              class="form-check-input"
                              type="radio"
                              name="typelink"
                              id="typePage"
                              value="page"
                              checked={selectedType == "page"}
                              onChange={(e) => setSelectedType(e.target.value)}
                            />
                            <label class="form-check-label" for="typePage">
                              Pages
                            </label>
                          </div>
                          <div
                            className={
                              selectedType != "page" ? "d-none" : "d-block"
                            }
                          >
                            <select
                              className="form-select"
                              aria-label="Default select example"
                              value={selectedPage}
                              onChange={(e) => setSelectedPage(e.target.value)}
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
                              class="form-check-input"
                              type="radio"
                              name="typelink"
                              id="typePopup"
                              value="popup"
                              checked={selectedType == "popup"}
                              onChange={(e) => setSelectedType(e.target.value)}
                            />
                            <label class="form-check-label" for="typePopup">
                              Popups
                            </label>
                          </div>
                          <div
                            className={
                              selectedType != "popup" ? "d-none" : "d-block"
                            }
                          >
                            <select
                              className="form-select"
                              aria-label="Default select example"
                              value={selectedPopup}
                              onChange={(e) => setSelectedPopup(e.target.value)}
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
                              class="form-check-input"
                              type="radio"
                              name="typelink"
                              checked={selectedType == "url"}
                              id="typeUrl"
                              value="url"
                              onChange={(e) => setSelectedType(e.target.value)}
                            />
                            <label class="form-check-label" for="typeUrl">
                              Url
                            </label>
                          </div>
                          <div
                            className={
                              selectedType != "url" ? "d-none" : "d-block"
                            }
                          >
                            <input
                              onChange={(e) => setSelectedUrl(e.target.value)}
                              type="url"
                              value={selectedUrl}
                              placeholder="https://"
                              className="form-control"
                            />
                          </div>
                        </div>
                        <div className="mb-2">
                          <div class="form-check">
                            <input
                              class="form-check-input typelink"
                              type="radio"
                              name="typelink"
                              checked={selectedType == "tel"}
                              id="typeClicktoCall"
                              value="tel"
                              onChange={(e) => setSelectedType(e.target.value)}
                            />
                            <label
                              class="form-check-label"
                              for="typeClicktoCall"
                            >
                              ClickToCall
                            </label>
                          </div>
                          <div
                            className={
                              selectedType != "tel" ? "d-none" : "d-block"
                            }
                          >
                            <input
                              onChange={(e) => setSelectedTel(e.target.value)}
                              type="text"
                              value={selectedTel}
                              placeholder="555 555 555"
                              className="form-control"
                            />
                          </div>
                        </div>
                        <div className="mb-2">
                          <div class="form-check">
                            <input
                              class="form-check-input typelink"
                              type="radio"
                              name="typeAnchor"
                              checked={selectedType == "anchor"}
                              id="typeAnchor"
                              value="anchor"
                              onChange={(e) => setSelectedType(e.target.value)}
                            />
                            <label
                              class="form-check-label"
                              for="typeAnchor"
                            >
                              Anchor
                            </label>
                          </div>
                          <div
                            className={
                              selectedType != "anchor" ? "d-none" : "d-block"
                            }
                          >
                            <input
                              onChange={(e) => setSelectedAnchor(e.target.value)}
                              type="text"
                              value={selectedAnchor}
                              placeholder="#id_section"
                              className="form-control"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="tab-pane fade"
            id="nav-desgine"
            role="tabpanel"
            aria-labelledby="nav-desgine-tab"
            tabindex="0"
          >
            <div className="d-flex justify-content-between align-items-center mb-2 p-2">
              <div className="blockTitle">Couleur lien</div>
              <ColorConfig
                key={"colorlink"}
                for={"colorlink"}
                editor={props.editor}
                siteId={props.siteId}
                config={configColorLink}
                setConfig={changecolorLink}
              />
            </div>
            <div className="d-flex justify-content-between align-items-center mb-2 p-2">
              <div className="blockTitle">Survol lien</div>
              <ColorConfig
                key={"colorlinkhv"}
                for={"colorlinkhv"}
                editor={props.editor}
                siteId={props.siteId}
                config={configColorHoverLink}
                setConfig={changecolorHoverLink}
              />
            </div>
            <div className="d-flex justify-content-between align-items-center mb-2 p-2">
                    <span>Orientation du lien</span>
                    <div className="panelContnet d-flex align-items-center">
                      <div className="radio-btns-group">
                        <input
                          type="radio"
                          name="inline"
                          id="inline"
                          checked={posAlignlink.align == "inline"}
                          value="inline"
                          className="RadioInput"
                          onChange={(e) => changePostionLink(e.target.value)}
                        />
                        <label htmlFor="inline" className="RadioLabel">
                        <i class="fa-solid fa-left-right"></i>
                        </label>
                        <input
                          type="radio"
                          name="block"
                          id="block"
                          checked={posAlignlink.align == "block"}
                          value="block"
                          className="RadioInput"
                          onChange={(e) => changePostionLink(e.target.value)}
                        />
                        <label htmlFor="block" className="RadioLabel">
                        <i class="fa-solid fa-arrows-up-down"></i>
                        </label>
                      </div>
                    </div>
              </div>
                <div className="d-flex justify-content-between align-items-center mb-2 p-2">
              <div className="blockTitle">Survol lien</div>
              <ColorConfig
                key={"colorlinkhv"}
                for={"colorlinkhv"}
                editor={props.editor}
                siteId={props.siteId}
                config={configColorHoverLink}
                setConfig={changecolorHoverLink}
              />
            </div> 
             <div className="d-block mb-2 p-2">
              <div className="blockTitle">Espacement lien</div>
              <EspacementConfig
                                  key={"eslink"}
                                  for={"eslink"}
                                  editor={props.editor}
                                  siteId={props.siteId}
                                  config={configEspacementlink}
                                  setConfig={changeEspacementlink}
                                />
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
