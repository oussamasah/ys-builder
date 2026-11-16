import React, { useEffect, useState } from "react";
import ModalDialog from "react-bootstrap/ModalDialog";
import Draggable from "react-draggable";
import { Modal } from "react-bootstrap";
import ColorConfig from "../../../compoments/Color/ColorConfig";
import OmbreConfig from "../../../compoments/Ombre/OmbreConfig";
import { models } from "./HeaderModels";
import { modelsMobiles } from "./HeaderMobileModels";
import modelOne from "../../../../../assets/imgEditorBlocks/HeaderModelOne.png";
import modelTwo from "../../../../../assets/imgEditorBlocks/HeaderModelTwo.png";
import modelThree from "../../../../../assets/imgEditorBlocks/SidebarModelOne.png";
import modelOneMobile from "../../../../../assets/imgEditorBlocks/ModelHeaderMObileOne.png";
import modelTwoMobile from "../../../../../assets/imgEditorBlocks/ModelHeaderMobileTwo.png";
import modelThreeMobile from "../../../../../assets/imgEditorBlocks/ModelHeaderMObileThree.png";
import { v4 as uuidv4 } from "uuid";
import "./ModalHeader.css";
import IconConfig from "../../../compoments/Icon/IconConfig";
import axios from "axios";
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
export default function ModalHeader(props) {
  const [show, setShow] = useState(true);
  const [tabletSetting, setTabletSetting] = useState("true");

  const [showModels, setShowModels] = useState(false);
  const [sizeLogo, setSizeLogo] = useState(
    props.editor.getSelected().getAttributes()["data-logo-size"]
      ? props.editor.getSelected().getAttributes()["data-logo-size"]
      : "100"
  );
  const [sizeLogoFixed, setSizeLogoFixed] = useState(
    props.editor.getSelected().getAttributes()["data-logo-fixed-size"]
      ? props.editor.getSelected().getAttributes()["data-logo-fixed-size"]
      : "100"
  );
  const [configEspacement, setConfigEspacement] = useState({
    padding: props.editor.getSelected().getAttributes()["data-header-padding"]
      ? JSON.parse(
          props.editor.getSelected().getAttributes()["data-header-padding"]
        )
      : {
          top: "15",
          left: "15",
          right: "15",
          bottom: "15",
        },
    margin: props.editor.getSelected().getAttributes()["data-header-margin"]
      ? JSON.parse(
          props.editor.getSelected().getAttributes()["data-header-margin"]
        )
      : {
          top: "0",
          left: "0",
          right: "0",
          bottom: "0",
        },
  });
  const [configEspacementFixed, setConfigEspacementFixed] = useState({
    padding: props.editor.getSelected().getAttributes()[
      "data-header-fixed-padding"
    ]
      ? JSON.parse(
          props.editor.getSelected().getAttributes()[
            "data-header-fixed-padding"
          ]
        )
      : {
          top: "15",
          left: "15",
          right: "15",
          bottom: "15",
        },
    margin: props.editor.getSelected().getAttributes()[
      "data-header-fixed-margin"
    ]
      ? JSON.parse(
          props.editor.getSelected().getAttributes()["data-header-fixed-margin"]
        )
      : {
          top: "0",
          left: "0",
          right: "0",
          bottom: "0",
        },
  });
  const [Icon, setIcon] = useState(
    props.editor.getSelected().getAttributes()["data-icon"]
      ? JSON.parse(props.editor.getSelected().getAttributes()["data-icon"])
      : {
          type: "icon",
          icon: "fas fa-align-right",
          unicode: "\f038",
          size: 30,
          color: "#000",
        }
  );

  const [model, setModel] = useState(
    props.editor
      .getSelected()
      .getClasses()
      .filter((x) => x.indexOf("HeaderModel") > -1)[0]
  );
  const handleClose = () => {
    const cmp = props.editor.getSelected();
    cmp.removeClass("sticky");
    setShow(false);
  };
  const handleCloseModels = () => {
    setShowModels(false);
  };
  const [menufixed, setMenuFixed] = useState(
    props.editor.getSelected().getAttributes()["data-menu-fixed"]
      ? props.editor.getSelected().getAttributes()["data-menu-fixed"]
      : "false"
  );
  const [fixed, setFixed] = useState(
    props.editor.getSelected().getAttributes()["data-fixed"]
      ? props.editor.getSelected().getAttributes()["data-fixed"]
      : "false"
  );

  const rgbtoJson = (rgbString) => {
    var s = rgbString;
    s = s.replace("rgb(", "");
    s = s.replace(")", "");
    let c = s.split(",");
    return { r: c[0], g: c[1], b: c[2], a: c[3] };
  };
  const [isActiveOmbre, setIsActiveOmbre] = useState(
    props.editor.getSelected().getAttributes()["data-ombre-isActive"]
      ? props.editor.getSelected().getAttributes()["data-ombre-isActive"]
      : false
  );
  const [OmbrePickerColor, setOmbrePickerColor] = useState({
    rgbTxt: props.editor.getSelected().getAttributes()["data-ombre-color"]
      ? props.editor.getSelected().getAttributes()["data-ombre-color"]
      : "#00000000",
    rgb: rgbtoJson(
      props.editor.getSelected().getAttributes()["data-ombre-color"]
        ? props.editor.getSelected().getAttributes()["data-ombre-color"]
        : "#00000000"
    ),
  });

  const [shadow, setShadow] = useState({
    type: props.editor.getSelected().getAttributes()["data-ombre-type"]
      ? props.editor.getSelected().getAttributes()["data-ombre-type"]
      : "",
    size: props.editor.getSelected().getAttributes()["data-ombre-size"]
      ? props.editor.getSelected().getAttributes()["data-ombre-size"]
      : "",
  });
  const setOmbreConfig = (isActive, configShadow, color) => {
    console.log("+++++2+++++++++", OmbrePickerColor);
    setOmbrePickerColor(color);
    setIsActiveOmbre(isActive);
    setShadow(shadow);
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-ombre-isActive"] = isActive;
    attr["data-ombre-color"] = color.rgbTxt;
    attr["data-ombre-type"] = configShadow.type;
    attr["data-ombre-size"] = configShadow.size;
    // console.log(configShadow.type);
    let r = props.editor.Css.getRule(`#${attr.id}`);
    let css = [];
    if (r) css = r.attributes.style;
    if (css) {
      if (isActive) {
        css["box-shadow"] =
          configShadow.type +
          " " +
          configShadow.size +
          " " +
          configShadow.size +
          " " +
          configShadow.size +
          " " +
          color.rgbTxt;
      } else {
        css["box-shadow"] = "none";
      }
    }
    props.editor.Css.setRule(`#${attr.id}`, css);
    cmp.setAttributes(attr);
    props.editor.setStyle(props.editor.getCss());
  };

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
  const [blockPickerColorFixed, setBlockPickerColorFixed] = useState({
    rgbTxt: props.editor.getSelected().getAttributes()["data-bg-fixed"]
      ? props.editor.getSelected().getAttributes()["data-bg-fixed"]
      : "#fff",
    rgb: rgbtoJson(
      props.editor.getSelected().getAttributes()["data-bg-fixed"]
        ? props.editor.getSelected().getAttributes()["data-bg-fixed"]
        : "#fff"
    ),
  });
  const changeEspacementConfig = (e) => {
    // console.log(e.margin.top == "");
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-header-padding"] = JSON.stringify(e.padding);
    attr["data-header-margin"] = JSON.stringify(e.margin);

    cmp.setAttributes(attr);
    let r = props.editor.Css.getRule(`#${attr.id}`);
    let css = [];
    if (r) css = r.attributes.style;
    if (css) {
      css["padding-top"] = e.padding.top + "px";
      css["padding-bottom"] = e.padding.bottom + "px";
      css["padding-right"] = e.padding.right + "px";
      css["padding-left"] = e.padding.left + "px";
      css["margin-top"] = e.margin.top == "" ? "auto" : e.margin.top + "px";
      css["margin-bottom"] =
        e.margin.bottom == "" ? "auto" : e.margin.bottom + "px";
      css["margin-right"] =
        e.margin.right == "" ? "auto" : e.margin.right + "px";
      css["margin-left"] = e.margin.left == "" ? "auto" : e.margin.left + "px";
      props.editor.Css.setRule(`#${attr.id}`, css);
      setConfigEspacement(e);
    }
    props.editor.setStyle(props.editor.getCss());
  };
  const changeEspacementConfigFixed = (e) => {
    // console.log(e.margin.top == "");
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-header-fixed-padding"] = JSON.stringify(e.padding);
    attr["data-header-fixed-margin"] = JSON.stringify(e.margin);

    cmp.setAttributes(attr);
    let r = props.editor.Css.getRule(`#${attr.id}.sticky`);
    let css = [];
    if (r) css = r.attributes.style;
    if (css) {
      css["padding-top"] = e.padding.top + "px";
      css["padding-bottom"] = e.padding.bottom + "px";
      css["padding-right"] = e.padding.right + "px";
      css["padding-left"] = e.padding.left + "px";
      css["margin-top"] = e.margin.top == "" ? "auto" : e.margin.top + "px";
      css["margin-bottom"] =
        e.margin.bottom == "" ? "auto" : e.margin.bottom + "px";
      css["margin-right"] =
        e.margin.right == "" ? "auto" : e.margin.right + "px";
      css["margin-left"] = e.margin.left == "" ? "auto" : e.margin.left + "px";
      props.editor.Css.setRule(`#${attr.id}.sticky`, css);
      setConfigEspacementFixed(e);
    }
    props.editor.setStyle(props.editor.getCss());
  };
  const changeFixed = async (checked) => {
    setFixed(checked);
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-fixed"] = checked;
    cmp.setAttributes(attr);

    let r = props.editor.Css.getRule(`#${attr.id}`);
    let css = [];
    if (r) css = r.attributes.style;
    if (css) {
      if (checked == "true") {
        css["position"] = "fixed";
        css["width"] = "100%";
        css["z-index"] = "999";
      } else {
        css["position"] = "relative";
        css["width"] = "100%";
      }
    }
    props.editor.Css.setRule(`#${attr.id}`, css);

    props.editor.setStyle(props.editor.getCss());
  };
  const changeMenuFixed = async (checked) => {
    setMenuFixed(checked);
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-menu-fixed"] = checked;
    cmp.setAttributes(attr);

    let r1 = props.editor.Css.getRule(
      `header.sticky section:not(:has(.gjs-navigation))`
    );
    let r = props.editor.Css.getRule(
      `header.sticky .gjs-cell:not(:has(.gjs-navigation))`
    );
    let css = [];
    if (r) css = r.attributes.style;
    if (css) {
      if (checked == "true") {
        css["display"] = "none";
        props.editor.Css.setRule(
          `header.sticky .gjs-cell:not(:has(.gjs-navigation))`,
          css
        );
        props.editor.Css.setRule(
          `header.sticky section:not(:has(.gjs-navigation))`,
          css
        );
      } else {
        props.editor.Css.remove(
          `header.sticky .gjs-cell:not(:has(.gjs-navigation))`
        );
        props.editor.Css.remove(r);
        props.editor.Css.remove(
          `header.sticky section:not(:has(.gjs-navigation))`
        );
        props.editor.Css.remove(r1);
      }
    }
    props.editor.setStyle(props.editor.getCss());
  };
  const changeIcon = (e) => {
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-icon"] = JSON.stringify(e);
    setIcon(e);
    cmp.setAttributes(attr);

    let openBtn = props.editor.getWrapper().find(".sidebar-menu-toggle")[0];
    // console.log("openBtn", openBtn);
    if (openBtn) {
      // console.log("first", e.size);
      if (e.type == "icon") {
        let iconCls = [];
        if (e.icon == "") {
          iconCls[0] = "fas";
          iconCls[1] = "fa-align-right";
          e.icon = "fas fa-align-right";
        } else {
          iconCls = e.icon.split(" ");
        }

        openBtn.components(
          `<i id="icon-${uuidv4()}" class="${iconCls[0]} ${iconCls[1]}" ></i>`
        );
        let icn = openBtn.components();
        if (icn && icn.models.length > 0) {
          let icnc = icn.models[0];
          // console.log(`#${icnc.getAttributes().id}`);
          let r = props.editor.Css.getRule(`#${icnc.getAttributes().id}`);
          let css = {};
          if (r) css = r.attributes.style;
          css["font-size"] = e.size + "px";
          css["color"] = e.color;
          props.editor.Css.setRule(`#${icnc.getAttributes().id}`, css);
          // console.log(`#${icnc.getAttributes().id} => `, css);
        }
      } else {
        openBtn.components(
          `<img id="img-${uuidv4()}" class="img" src="${e.icon}"/>`
        );
        let img = openBtn.components();
        if (img && img.models.length > 0) {
          let imgc = img.models[0];
          // console.log(`#${imgc.getAttributes().id}`);
          let r = props.editor.Css.getRule(`#${imgc.getAttributes().id}`);
          let css = {};
          if (r) css = r.attributes.style;
          css["width"] = e.size + "px";
          props.editor.Css.setRule(`#${imgc.getAttributes().id}`, css);
          // console.log(`#${imgc.getAttributes().id} => `, css);
        }
      }
    }
    props.editor.setStyle(props.editor.getCss());
  };
  const changeColor = (color) => {
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-bg"] = color.rgbTxt;
    cmp.setAttributes(attr);
    let r = props.editor.Css.getRule(`#${attr.id}`);
    let css = [];
    if (r) css = r.attributes.style;
    css["background"] = color.rgbTxt;
    props.editor.Css.setRule(`#${attr.id}`, css);
    props.editor.setStyle(props.editor.getCss());
    setBlockPickerColor(color);
  };

  const changeLogoSize = (size) => {
    setSizeLogo(size);
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-logo-size"] = size;
    cmp.setAttributes(attr);
    let r = props.editor.Css.getRule(`#${attr.id} .logo-img`);
    let css = [];
    if (r) css = r.attributes.style;
    if (css) {
      css["width"] = size + "px";
      css["height"] = "auto";
    }
    props.editor.Css.setRule(`#${attr.id} .logo-img`, css);
    props.editor.setStyle(props.editor.getCss());
  };
  const changeLogoSizeFixed = (size) => {
    setSizeLogoFixed(size);
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-logo-fixed-size"] = size;
    cmp.setAttributes(attr);
    let r = props.editor.Css.getRule(`#${attr.id}.sticky .logo-img`);
    let css = [];
    if (r) css = r.attributes.style;
    if (css) {
      css["width"] = size + "px";
      css["height"] = "auto";
    }
    props.editor.Css.setRule(`#${attr.id}.sticky .logo-img`, css);
    props.editor.setStyle(props.editor.getCss());
  };

  const changeColorFixed = (color) => {
    setBlockPickerColorFixed(color);
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-bg-fixed"] = color.rgbTxt;
    cmp.setAttributes(attr);
    let r = props.editor.Css.getRule(`#${attr.id}.sticky`);
    let css = [];
    if (r) css = r.attributes.style;
    if (css) {
      css["background"] = color.rgbTxt;
    }
    props.editor.Css.setRule(`#${attr.id}.sticky`, css);
    props.editor.setStyle(props.editor.getCss());
  };

  const changeStyle = (key) => {
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();

    let classes = cmp.getClasses().filter((x) => x.indexOf("Model") == -1);
    classes.push(key);

    // console.log("------------------", classes);
    setModel(key);
    cmp.components(models[key]);
    props.editor.select(cmp);
    if (key == "HeaderModelThree") {
      attr["data-icon"] = JSON.stringify(Icon);
    }
    cmp.setAttributes(attr);
    cmp.setClass(classes);
  };

  const changeStyleMobile = (key) => {
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();

    let classes = cmp.getClasses().filter((x) => x.indexOf("Model") == -1);
    classes.push(key);

    // console.log("------------------", classes);
    setModel(key);
    cmp.components(modelsMobiles[key]);
    props.editor.select(cmp);

    attr["data-icon"] = JSON.stringify(Icon);

    cmp.setAttributes(attr);
    cmp.setClass(classes);
  };

  const changeHeaderSync = async (checked) => {
    await axios
      .post(
        process.env.REACT_APP_API_URL +
          "/sites/updatesyncheader/" +
          props.siteId,
        {
          syncHeader: checked,
        }
      )
      .then((response) => {
        console.log(response.data);
        setTabletSetting(response.data.data.syncHeader.toString());
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {}, [model, tabletSetting]);
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL + "/sites/get/" + props.siteId)
      .then((response) => {
        setTabletSetting(response.data.data.site.syncHeader.toString());
      });

    const cmp = props.editor.getSelected();
    cmp.addClass("sticky");
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
            <span className="title-popups">Design Contenu Header</span>
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
                    Header Fixe
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
                <div
                  className={
                    props.editor.Devices.getSelected().id == "desktop"
                      ? "tabletSetting d-block"
                      : "d-none"
                  }
                >
                  <div className=" d-flex justify-content-between align-items-center mb-3 mt-3 ombreConfig">
                    <label
                      className="form-check-label w-75"
                      htmlFor="isActivetablet"
                    >
                      Synchroniser l'en-tête de la tablette avec celui de
                      l'ordinateur.
                    </label>
                    <div className="form-check form-switch w-25 justify-content-end p-0">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={"isActivetablet"}
                        name={"isActivetablet"}
                        checked={tabletSetting == "true"}
                        onChange={(e) => {
                          changeHeaderSync(e.target.checked.toString());
                        }}
                      />
                    </div>
                  </div>
                </div>

                <span id="scrollspyHeading1" className="titre mt-1 mb-1 ">
                  Mise en page
                </span>
                <div className="d-flex justify-content-center align-items-center mb-3">
                  <div className="panelContnet dropend">
                    <div
                      className={
                        props.editor.Devices.getSelected().id != "mobile2"
                          ? "btn-group d-block"
                          : "d-none"
                      }
                      onClick={(e) => setShowModels(true)}
                    >
                      {model == "HeaderModelOne" ? (
                        <img src={modelOne} className="selectedModel" />
                      ) : model == "HeaderModelTwo" ? (
                        <img src={modelTwo} className="selectedModel" />
                      ) : model == "HeaderModelThree" ? (
                        <img src={modelThree} className="selectedModel" />
                      ) : (
                        ""
                      )}
                    </div>
                    <div
                      className={
                        props.editor.Devices.getSelected().id == "mobile2"
                          ? "btn-group d-block"
                          : "d-none"
                      }
                      onClick={(e) => setShowModels(true)}
                    >
                      {model == "HeaderModelOne" ? (
                        <img src={modelOneMobile} className="selectedModel" />
                      ) : model == "HeaderModelTwo" ? (
                        <img src={modelTwoMobile} className="selectedModel" />
                      ) : model == "HeaderModelThree" ? (
                        <img src={modelThreeMobile} className="selectedModel" />
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
                        class="accordion-button"
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
                      class="accordion-collapse collapse show active"
                      aria-labelledby="headingOne"
                      data-bs-parent="#accordionExample"
                    >
                      <div class="accordion-body">
                        <ColorConfig
                          key={"header"}
                          label="Arrière-plan de l'entête"
                          config={blockPickerColor}
                          setConfig={changeColor}
                        />
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <span>Taille du logo</span>
                          <div className="d-flex justify-content-between align-items-center mb-3">
                            <input
                              type="range"
                              min="10"
                              max="300"
                              class="rangeInput me-2"
                              value={sizeLogo}
                              onChange={(e) => changeLogoSize(e.target.value)}
                            />
                            <div class="input-with-label-pixel">
                              <span class="pixel-label">px</span>
                              <input
                                min="10"
                                max="300"
                                value={sizeLogo}
                                onChange={(e) => changeLogoSize(e.target.value)}
                                class="form-control form-control-sm input-small-pixel"
                                type="number"
                              />
                            </div>
                          </div>
                        </div>
                        <div
                          class={
                            (model &&
                              props.editor.Devices.getSelected().id !=
                                "mobile2" &&
                              model == "HeaderModelThree") ||
                            props.editor.Devices.getSelected().id == "mobile2"
                              ? "d-block"
                              : "d-none"
                          }
                        >
                          <IconConfig
                            key={
                              "headerModel" +
                              props.editor.Devices.getSelected().id
                            }
                            label=" Changer l'icon de l'ouverture du menu"
                            siteId={props.siteId}
                            config={Icon}
                            setConfig={changeIcon}
                          />
                        </div>

                        <OmbreConfig
                          title="Ombre de l'entête"
                          config={{
                            isActiveOmbre: isActiveOmbre,
                            shadow: shadow,
                            OmbrePickerColor: OmbrePickerColor,
                          }}
                          setConfig={setOmbreConfig}
                        />

                        <div>Espacement de l'entête</div>
                        <EspacementConfig
                          key={"desc"}
                          for={"desc"}
                          editor={props.editor}
                          siteId={props.siteId}
                          config={configEspacement}
                          setConfig={changeEspacementConfig}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="firstdiv" id="scrollspyHeading3">
                <div class="accordion d-block" id="accordionExample">
                  <div class="accordion-item">
                    <h2 class="accordion-header" id="headingOne">
                      <button
                        class="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapsetwo"
                        aria-expanded="true"
                        aria-controls="collapsetwo"
                      >
                        <span
                          id="scrollspyHeading2"
                          className="titre mt-1 mb-1 "
                        >
                          Superposer l'entête
                        </span>
                      </button>
                    </h2>
                    <div
                      id="collapsetwo"
                      class="accordion-collapse collapse show active"
                      aria-labelledby="headingOne"
                      data-bs-parent="#accordionExample"
                    >
                      <div class="accordion-body">
                        <div className=" d-flex justify-content-between align-items-center mb-3 mt-3 ombreConfig">
                          <label
                            className="form-check-label w-75"
                            htmlFor="isActivetablet"
                          >
                            Superposer le header
                          </label>
                          <div className="form-check form-switch w-25 justify-content-end p-0">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id={"isActivetablet"}
                              name={"isActivetablet"}
                              checked={fixed == "true"}
                              onChange={(e) => {
                                changeFixed(e.target.checked.toString());
                              }}
                            />
                          </div>
                        </div>

                        <div
                          className={
                            model != "HeaderModelThree"
                              ? " d-flex justify-content-between align-items-center mb-3 mt-3 ombreConfig"
                              : "d-none"
                          }
                        >
                          <label
                            className="form-check-label w-75"
                            htmlFor="isActivetabletmenu"
                          >
                            Afficher que le menu
                          </label>
                          <div className="form-check form-switch w-25 justify-content-end p-0">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id={"isActivetabletmenu"}
                              name={"isActivetabletmenu"}
                              checked={menufixed == "true"}
                              onChange={(e) => {
                                changeMenuFixed(e.target.checked.toString());
                              }}
                            />
                          </div>
                        </div>
                        <ColorConfig
                          key={"headerfixed"}
                          label="Arrière-plan de l'entête superposer"
                          config={blockPickerColorFixed}
                          setConfig={changeColorFixed}
                        />
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <span>Taille du logo fixed</span>
                          <div className="d-flex justify-content-between align-items-center mb-3">
                            <input
                              type="range"
                              min="10"
                              max="300"
                              class="rangeInput me-2"
                              value={sizeLogoFixed}
                              onChange={(e) =>
                                changeLogoSizeFixed(e.target.value)
                              }
                            />
                            <div class="input-with-label-pixel">
                              <span class="pixel-label">px</span>
                              <input
                                min="10"
                                max="300"
                                value={sizeLogoFixed}
                                onChange={(e) =>
                                  changeLogoSizeFixed(e.target.value)
                                }
                                class="form-control form-control-sm input-small-pixel"
                                type="number"
                              />
                            </div>
                          </div>
                        </div>
                        <div>Espacement de l'entête superposer</div>
                        <EspacementConfig
                          key={"header-fixed"}
                          for={"header-fixed"}
                          editor={props.editor}
                          siteId={props.siteId}
                          config={configEspacementFixed}
                          setConfig={changeEspacementConfigFixed}
                        />
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

          <div
            className={
              props.editor.Devices.getSelected().id != "mobile2"
                ? "preview-options pt-3 pb-3 d-block"
                : "d-none"
            }
          >
            <span class="titredropdown m-3">Sélectionner la mise en page</span>
            <div onClick={(e) => changeStyle("HeaderModelOne")}>
              <img src={modelOne} className="modelPreview" />
            </div>
            <div onClick={(e) => changeStyle("HeaderModelTwo")}>
              <img src={modelTwo} className="modelPreview" />
            </div>
            <div onClick={(e) => changeStyle("HeaderModelThree")}>
              <img src={modelThree} className="modelPreview" />
            </div>
          </div>
          <div
            className={
              props.editor.Devices.getSelected().id == "mobile2"
                ? "preview-options pt-3 pb-3 d-block"
                : "d-none"
            }
          >
            <span class="titredropdown m-3">Sélectionner la mise en page</span>
            <div onClick={(e) => changeStyleMobile("HeaderModelOne")}>
              <img src={modelOneMobile} className="modelPreview" />
            </div>
            {/*             <div onClick={(e) => changeStyleMobile("HeaderModelTwo")}>
              <img src={modelTwoMobile} className="modelPreview" />
            </div>
            <div onClick={(e) => changeStyleMobile("HeaderModelThree")}>
              <img src={modelThreeMobile} className="modelPreview" />
            </div> */}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
