import React, { useEffect, useState, PropTypes, useRef } from "react";
import axios from "axios";
import ReactDOM from "react-dom";
import { Modal, ModalDialog } from "react-bootstrap";
import Draggable from "react-draggable";
import Nestable from "react-nestable";
import "./ModalTab.css";
import { v4 as uuidv4 } from "uuid";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import TextStylingComponent from "../../../compoments/TextStyling/TextStylingComponent";
import { SketchPicker } from "react-color";
import EspacementConfig from "../../../compoments/Espacement/EspacementConfig";
import modelTwo from "../../../../../assets/imgEditorBlocks//tab-model-1.jpg";
import modelOne from "../../../../../assets/imgEditorBlocks/tab-model-2.jpg";
import modelThree from "../../../../../assets/imgEditorBlocks/tab-model-3.jpg";

class DraggableModalDialog extends React.Component {
  render() {
    return (
      <Draggable handle=".handleDrag">
        <ModalDialog {...this.props} />
      </Draggable>
    );
  }
}
export default function ModalTab(props) {
  const [config, setConfig] = useState({
    size: "",
    annimation: "",
    espacement: "",
  });

  const [show, setShow] = useState(true);
  const [shownotice, setShownotice] = useState(false);
  const [selected, setSelected] = useState();
  const [selectedItem, setSelectedItem] = useState("");
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [hasCustomClass, setHasCustomClass] = useState(false);
  const [configDesc, setConfigDesc] = useState({
    font: "",
    variant: "normal",
    color: "#ffffff",
    align: "left",
    size: { desktop: "16", tablet: "16", mobile: "16" },
  });
  const [configEspacement, setConfigEspacement] = useState({
    padding: props.editor.getSelected().getAttributes()["data-desc-padding"]
      ? JSON.parse(
          props.editor.getSelected().getAttributes()["data-desc-padding"]
        )
      : {
          top: "15",
          left: "15",
          right: "15",
          bottom: "15",
        },
    margin: props.editor.getSelected().getAttributes()["data-desc-margin"]
      ? JSON.parse(
          props.editor.getSelected().getAttributes()["data-desc-margin"]
        )
      : {
          top: "0",
          left: "0",
          right: "0",
          bottom: "0",
        },
  });
  const [configOnglet, setConfigOnglet] = useState({
    font: "",
    variant: "normal",
    color: "#ffffff",
    align: "left",
    size: { desktop: "16", tablet: "16", mobile: "16" },
  });
  const [isActivePalette, setActivepalette] = useState(false);

  const rgbtoJson = (rgbString) => {
    var s = rgbString;
    s = s.replace("rgb(", "");
    s = s.replace(")", "");
    let c = s.split(",");
    return { r: c[0], g: c[1], b: c[2], a: c[3] };
  };
  const [blockPickerColor, setBlockPickerColor] = useState({
    rgbTxt: props.editor.getSelected().getAttributes()["data-bg-color"]
      ? props.editor.getSelected().getAttributes()["data-bg-color"]
      : "#00000000",
    rgb: rgbtoJson(
      props.editor.getSelected().getAttributes()["data-bg-color"]
        ? props.editor.getSelected().getAttributes()["data-bg-color"]
        : "#00000000"
    ),
  });
  const handleCloseColor = () => {
    setActivepalette(false);
  };
  const getPrimaryColor = () => {
    if (isActivePalette === true) {
      setActivepalette(false);
    } else {
      setActivepalette(true);
    }
  };
  const changeColor = (color) => {
    setBlockPickerColor({
      rgbTxt:
        "rgb(" +
        color.rgb.r +
        ", " +
        color.rgb.g +
        ", " +
        color.rgb.b +
        "," +
        color.rgb.a +
        ")",
      rgb: color.rgb,
    });
    let cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-bg-color"] =
      "rgb(" +
      color.rgb.r +
      ", " +
      color.rgb.g +
      ", " +
      color.rgb.b +
      "," +
      color.rgb.a +
      ")";
    cmp.setAttributes(attr);
    let rule = props.editor.Css.setRule(`#${attr.id} > ul > li > button`, {
      background:
        "rgb(" +
        color.rgb.r +
        ", " +
        color.rgb.g +
        ", " +
        color.rgb.b +
        "," +
        color.rgb.a +
        ")",
    });
  };
  const [isActivePalette2, setActivepalette2] = useState(false);

  const [blockPickerColor2, setBlockPickerColor2] = useState({
    rgbTxt: props.editor.getSelected().getAttributes()["data-bg"]
      ? props.editor.getSelected().getAttributes()["data-bg"]
      : "#00000000",
    rgb: rgbtoJson(
      props.editor.getSelected().getAttributes()["data-bg"]
        ? props.editor.getSelected().getAttributes()["data-bg"]
        : "#00000000"
    ),
  });
  const handleCloseColor2 = () => {
    setActivepalette2(false);
  };
  const getPrimaryColor2 = () => {
    if (isActivePalette2 === true) {
      setActivepalette2(false);
    } else {
      setActivepalette2(true);
    }
  };
  const changeColor2 = (color) => {
    setBlockPickerColor2({
      rgbTxt:
        "rgb(" +
        color.rgb.r +
        ", " +
        color.rgb.g +
        ", " +
        color.rgb.b +
        "," +
        color.rgb.a +
        ")",
      rgb: color.rgb,
    });
    let cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-bg"] =
      "rgb(" +
      color.rgb.r +
      ", " +
      color.rgb.g +
      ", " +
      color.rgb.b +
      "," +
      color.rgb.a +
      ")";
    cmp.setAttributes(attr);
    let rule = props.editor.Css.setRule(
      `#${attr.id} > ul > li > button::hover,#${attr.id} > ul > li > button.active`,
      {
        background:
          "rgb(" +
          color.rgb.r +
          ", " +
          color.rgb.g +
          ", " +
          color.rgb.b +
          "," +
          color.rgb.a +
          ")",
      }
    );
  };
  const [isActivePalette3, setActivepalette3] = useState(false);

  const [blockPickerColor3, setBlockPickerColor3] = useState({
    rgbTxt: props.editor.getSelected().getAttributes()["data-color-survol"]
      ? props.editor.getSelected().getAttributes()["data-color-survol"]
      : "#00000000",
    rgb: rgbtoJson(
      props.editor.getSelected().getAttributes()["data-color-survol"]
        ? props.editor.getSelected().getAttributes()["data-color-survol"]
        : "#00000000"
    ),
  });
  const handleCloseColor3 = () => {
    setActivepalette3(false);
  };
  const getPrimaryColor3 = () => {
    if (isActivePalette2 === true) {
      setActivepalette3(false);
    } else {
      setActivepalette3(true);
    }
  };
  const changeColor3 = (color) => {
    setBlockPickerColor3({
      rgbTxt:
        "rgb(" +
        color.rgb.r +
        ", " +
        color.rgb.g +
        ", " +
        color.rgb.b +
        "," +
        color.rgb.a +
        ")",
      rgb: color.rgb,
    });
    let cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-color-survol"] =
      "rgb(" +
      color.rgb.r +
      ", " +
      color.rgb.g +
      ", " +
      color.rgb.b +
      "," +
      color.rgb.a +
      ")";
    cmp.setAttributes(attr);
    let rule = props.editor.Css.setRule(
      `#${attr.id} > ul > li > button:hover > * , #${attr.id} > ul > li > button.active > *`,
      {
        color:
          "rgb(" +
          color.rgb.r +
          ", " +
          color.rgb.g +
          ", " +
          color.rgb.b +
          "," +
          color.rgb.a +
          ")",
      }
    );
  };
  const [isActivePalette4, setActivepalette4] = useState(false);

  const [blockPickerColor4, setBlockPickerColor4] = useState({
    rgbTxt: props.editor.getSelected().getAttributes()["data-bg-survol"]
      ? props.editor.getSelected().getAttributes()["data-bg-survol"]
      : "#00000000",
    rgb: rgbtoJson(
      props.editor.getSelected().getAttributes()["data-bg-survol"]
        ? props.editor.getSelected().getAttributes()["data-bg-survol"]
        : "#00000000"
    ),
  });
  const handleCloseColor4 = () => {
    setActivepalette4(false);
  };
  const getPrimaryColor4 = () => {
    if (isActivePalette4 === true) {
      setActivepalette4(false);
    } else {
      setActivepalette4(true);
    }
  };
  const changeColor4 = (color) => {
    setBlockPickerColor4({
      rgbTxt:
        "rgb(" +
        color.rgb.r +
        ", " +
        color.rgb.g +
        ", " +
        color.rgb.b +
        "," +
        color.rgb.a +
        ")",
      rgb: color.rgb,
    });
    let cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-bg-survol"] =
      "rgb(" +
      color.rgb.r +
      ", " +
      color.rgb.g +
      ", " +
      color.rgb.b +
      "," +
      color.rgb.a +
      ")";
    cmp.setAttributes(attr);
    let rule = props.editor.Css.setRule(
      `#${attr.id} > ul > li > button:hover , #${attr.id} > ul > li > button.active `,
      {
        background:
          "rgb(" +
          color.rgb.r +
          ", " +
          color.rgb.g +
          ", " +
          color.rgb.b +
          "," +
          color.rgb.a +
          ")",
      }
    );
  };
  const [isActivePalette5, setActivepalette5] = useState(false);

  const [blockPickerColor5, setBlockPickerColor5] = useState({
    rgbTxt: props.editor.getSelected().getAttributes()["data-bg-desc"]
      ? props.editor.getSelected().getAttributes()["data-bg-desc"]
      : "#00000000",
    rgb: rgbtoJson(
      props.editor.getSelected().getAttributes()["data-bg-desc"]
        ? props.editor.getSelected().getAttributes()["data-bg-desc"]
        : "#00000000"
    ),
  });
  const handleCloseColor5 = () => {
    setActivepalette5(false);
  };
  const getPrimaryColor5 = () => {
    if (isActivePalette5 === true) {
      setActivepalette5(false);
    } else {
      setActivepalette5(true);
    }
  };
  const changeColor5 = (color) => {
    setBlockPickerColor5({
      rgbTxt:
        "rgb(" +
        color.rgb.r +
        ", " +
        color.rgb.g +
        ", " +
        color.rgb.b +
        "," +
        color.rgb.a +
        ")",
      rgb: color.rgb,
    });
    let cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-bg-desc"] =
      "rgb(" +
      color.rgb.r +
      ", " +
      color.rgb.g +
      ", " +
      color.rgb.b +
      "," +
      color.rgb.a +
      ")";
    cmp.setAttributes(attr);
    let r = props.editor.Css.getRule(`#${attr.id} .tab-content`);
    let css = null;
    if (r) css = r.attributes.style;
    if (css) {
      css["background"] =
        "rgb(" +
        color.rgb.r +
        ", " +
        color.rgb.g +
        ", " +
        color.rgb.b +
        "," +
        color.rgb.a +
        ")";
      props.editor.Css.setRule(`#${attr.id} .tab-content`, css);
    } else {
      props.editor.Css.setRule(`#${attr.id} .tab-content`, {
        background:
          "rgb(" +
          color.rgb.r +
          ", " +
          color.rgb.g +
          ", " +
          color.rgb.b +
          "," +
          color.rgb.a +
          ")",
      });
    }
    props.editor.setStyle(props.editor.getCss());
    cmp.view.render();
  };

  // Function to toggle the class
  const toggleCustomClass = () => {
    setHasCustomClass(!hasCustomClass); // Toggle the state value
  };

  const [items, setItems] = useState([
    {
      id: "tab-" + uuidv4(),
      title: `Title or question 1`,
      type: "h3",
      description: "Contenu du item one",
      isActive: false,
      textbtn: "Text du boutton",
      linkbtn: "#",
    },
    {
      id: "tab-" + uuidv4(),
      title: `Title or question 2`,
      type: "h3",
      description: "Contenu du item two",
      isActive: false,
      textbtn: "Text du boutton",
      linkbtn: "#",
    },
    {
      id: "tab-" + uuidv4(),
      title: `Title or question 3`,
      type: "h3",
      description: "Contenu du item thre",
      isActive: false,
      textbtn: "Text du boutton",
      linkbtn: "#",
    },
  ]);

  const [model, setModel] = useState("");

  const handleAddItemClick = () => {
    const newItem = {
      id: "tab-" + uuidv4(),
      title: `Title or question ${items.length + 1}`,
      type: "H3",
      description: "Contenu du item",
      isActive: false,
    };

    setItems([...items, newItem]); // Use setItems to update the state
  };

  const handleItemClicks = (itemId) => {
    setSelectedItemId(itemId === selectedItemId ? null : itemId);
    toggleCustomClass();
  };

  const handleopenNotice = () => {
    setShownotice(true);
  };
  const handleClose = () => {
    setShow(false);
  };
  const handleCloseNotice = () => {
    setShownotice(false);
  };
  const handleItemClick = (item) => {
    setSelectedItem(item);
  };
  const changeStyle = (key) => {
    const cmp = props.editor.getSelected();
    let classes = cmp.getClasses().filter((x) => x.indexOf("Model") == -1);
    classes.push(key);
    cmp.setClass(classes);
    setModel(key);
  };

  const handleRemoveItemClick = (itemId) => {
    const updatedItems = items.filter((item) => item.id !== itemId);
    setItems(updatedItems);
  };
  const changeOngletConfig = (e) => {
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-onglet-font"] = e.font;
    attr["data-onglet-variant"] = e.variant;
    attr["data-onglet-size"] = JSON.stringify(e.size);
    attr["data-onglet-color"] = e.color;
    attr["data-onglet-align"] = e.align;
    cmp.setAttributes(attr);
    props.editor.Css.setRule(`#${attr.id} > ul > li > button > *`, {
      "font-family": e.font,
      color: e.color,
      "text-align": e.align,
      "font-weight": e.variant,
      "font-size": e.size.desktop + "px",
      "line-height": e.size.desktop + "px",
    });
    props.editor.Css.setRule(
      `#${attr.id} > ul > li > button > *`,
      {
        "font-size": `${e.size.tablet}px`,
        "line-height": `${e.size.tablet}px`,
      },
      {
        atRuleType: "media",
        atRuleParams: "(min-width: 768px) and (max-width:991px)",
      }
    );
    props.editor.Css.setRule(
      `#${attr.id} > ul > li > button > *`,
      {
        "font-size": `${e.size.mobile}px`,
        "line-height": `${e.size.mobile}px`,
      },
      {
        atRuleType: "media",
        atRuleParams: "(max-width:767px)",
      }
    );
    setConfigOnglet(e);
  };
  const changeDescConfig = (e) => {
    // console.log(e);

    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-desc-font"] = e.font;
    attr["data-desc-variant"] = e.variant;
    attr["data-desc-size"] = JSON.stringify(e.size);
    attr["data-desc-color"] = e.color;
    attr["data-desc-align"] = e.align;
    cmp.setAttributes(attr);
    props.editor.Css.setRule(`#${attr.id} .tab-pane`, {
      "font-family": e.font,
      color: e.color,
      "text-align": e.align,
      "font-weight": e.variant,
      "font-size": e.size.desktop + "px",
      "line-height": e.size.desktop + "px",
    });
    props.editor.Css.setRule(
      `#${attr.id} .tab-pane`,
      {
        "font-size": `${e.size.tablet}px`,
        "line-height": `${e.size.tablet}px`,
      },
      {
        atRuleType: "media",
        atRuleParams: "(min-width: 768px) and (max-width:991px)",
      }
    );
    props.editor.Css.setRule(
      `#${attr.id} .tab-pane`,
      {
        "font-size": `${e.size.mobile}px`,
        "line-height": `${e.size.mobile}px`,
      },
      {
        atRuleType: "media",
        atRuleParams: "(max-width:767px)",
      }
    );
    setConfigDesc(e);
  };

  useEffect(() => {
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    let modelKey = cmp.getClasses().filter((x) => x.indexOf("TabModel") > -1);
    setModel(modelKey);
    const config = {
      font: attr["data-onglet-font"] ? attr["data-onglet-font"] : "",
      variant: attr["data-onglet-variant"]
        ? attr["data-onglet-variant"]
        : "normal",
      size: attr["data-onglet-size"]
        ? JSON.parse(attr["data-onglet-size"])
        : { desktop: "16", tablet: "16", mobile: "16" },

      color: attr["data-onglet-color"] ? attr["data-onglet-color"] : "#000000",
      align: attr["data-onglet-align"] ? attr["data-onglet-align"] : "left",
    };
    setConfigOnglet(config);
    const config2 = {
      font: attr["data-desc-font"] ? attr["data-desc-font"] : "",
      variant: attr["data-desc-variant"] ? attr["data-desc-variant"] : "normal",
      size: attr["data-desc-size"]
        ? JSON.parse(attr["data-desc-size"])
        : { desktop: "16", tablet: "16", mobile: "16" },

      color: attr["data-desc-color"] ? attr["data-desc-color"] : "#000000",
      align: attr["data-desc-align"] ? attr["data-desc-align"] : "left",
    };

    setConfigDesc(config2);
    setItems(
      attr["data-items"]
        ? JSON.parse(attr["data-items"])
        : [
            {
              id: "tab-" + uuidv4(),
              title: `Title or question 1`,
              type: "h3",
              description: "Contenu du item one",
              isActive: false,
              textbtn: "Text du boutton",
              linkbtn: "#",
            },
            {
              id: "tab-" + uuidv4(),
              title: `Title or question 2`,
              type: "h3",
              description: "Contenu du item two",
              isActive: false,
              textbtn: "Text du boutton",
              linkbtn: "#",
            },
            {
              id: "tab-" + uuidv4(),
              title: `Title or question 3`,
              type: "h3",
              description: "Contenu du item thre",
              isActive: false,
              textbtn: "Text du boutton",
              linkbtn: "#",
            },
          ]
    );
  }, []);
  useEffect(() => {
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    let tabNavs = cmp.find(".nav-tabs")[0];
    let tabContainer = cmp.find(".tab-content")[0];
    let tabsContentHtml = ``;
    let tabsNavsHtml = ``;

    items.map((item, i) => {
      tabsNavsHtml += `<li class="nav-item" role="presentation">
      <button class="nav-link ${i == 0 ? "active" : ""}" id="${
        item.id
      }-tab" data-bs-toggle="tab" data-bs-target="#${
        item.id
      }" type="button" role="tab" aria-controls="${
        item.id
      }" aria-selected="true"><${item.type}>${item.title}</${
        item.type
      }></button>
    </li>`;
      tabsContentHtml += `<div class="tab-pane fade ${
        i == 0 ? "show active" : ""
      }" id="${item.id}" role="tabpanel" aria-labelledby="${item.id}-tab">${
        item.description
      }${
        item.isActive
          ? ` <a data-gjs-draggable=".gjs-cell,.gjs-row div,.container,main,footer,header" data-type-droppabel="true"  href="${item.linkbtn}" class="gjs-lien" data-gjs-droppable="true" >${item.textbtn}</a>`
          : ""
      }</div>`;
    });

    if (tabNavs) {
      tabNavs.components(tabsNavsHtml);
    }
    if (tabContainer) {
      tabContainer.components(tabsContentHtml);
    }

    attr["data-items"] = JSON.stringify(items);
    cmp.setAttributes(attr);
    cmp.view.render();
    props.editor.setStyle(props.editor.getCss());
  }, [items]);
  useEffect(() => {}, [configOnglet, configDesc, configEspacement]);
  const changeEspacementConfig = (e) => {
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-desc-padding"] = JSON.stringify(e.padding);
    attr["data-desc-margin"] = JSON.stringify(e.margin);

    cmp.setAttributes(attr);
    let r = props.editor.Css.getRule(`#${attr.id} .tab-content`);
    let css = null;
    if (r) css = r.attributes.style;
    if (css) {
      css["padding-top"] = e.padding.top + "px";
      css["padding-bottom"] = e.padding.bottom + "px";
      css["padding-right"] = e.padding.right + "px";
      css["padding-left"] = e.padding.left + "px";
      css["margin-top"] = e.margin.top + "px";
      css["margin-bottom"] = e.margin.bottom + "px";
      css["margin-right"] = e.margin.right + "px";
      css["margin-left"] = e.margin.left + "px";
      props.editor.Css.setRule(`#${attr.id} .tab-content`, css);
      setConfigEspacement(e);
    } else {
      props.editor.Css.setRule(`#${attr.id} .tab-content`, {
        "padding-top": e.padding.top + "px",
        "padding-bottom": e.padding.bottom + "px",
        "padding-right": e.padding.right + "px",
        "padding-left": e.padding.left + "px",
        "margin-top": e.margin.top + "px",
        "margin-bottom": e.margin.bottom + "px",
        "margin-right": e.margin.right + "px",
        "margin-left": e.margin.left + "px",
      });
    }
    props.editor.setStyle(props.editor.getCss());
    cmp.view.render();
  };
  return (
    <div id="modalgallery">
      <Modal
        dialogAs={DraggableModalDialog}
        show={show}
        backdrop="static"
        onHide={handleClose}
        id="ModalTab"
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
                  Contenu
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
              onClick={handleopenNotice}
            >
              {" "}
              <i class="fa-solid fa-info"></i>
            </button>
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
            >
              <span className="title-popups">Contenu Accordéon</span>

              <div className="structmodals">
                <div
                  className={
                    selectedItemId != null ? "itemdrag active" : "itemdrag"
                  }
                >
                  <label className="  p-3 ">Elements</label>
                  {items && items.length > 0 && (
                    <Nestable
                      maxDepth={1}
                      items={items}
                      renderItem={({ item }) => (
                        <div className="contentaccordion">
                          <div
                            className={
                              selectedItemId == item.id
                                ? "itemlaction active"
                                : "itemlaction "
                            }
                            onClick={() => handleItemClicks(item.id)}
                            idProp={"_id"}
                            disebled={hasCustomClass}
                          >
                            <div>
                              <span>{item.title}</span>
                            </div>
                            <div>
                              <button
                                onClick={() => handleRemoveItemClick(item.id)}
                              >
                                <i class="fa-sharp fa-solid fa-xmark"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                      onChange={({ items }) => setItems(items)}
                    />
                  )}
                  <div
                    className={
                      selectedItemId != null ? "additem active" : "additem"
                    }
                  >
                    <button onClick={(e) => handleAddItemClick()}>
                      {" "}
                      <i class="fa-solid fa-plus"></i> Ajouter un élément
                    </button>
                  </div>
                </div>

                <div
                  className={
                    selectedItemId != null
                      ? "details active pt-3 pb-3"
                      : "details"
                  }
                >
                  {items.map((item) => {
                    return (
                      <>
                        {selectedItemId === item.id && (
                          <div>
                            <label className=" mt-2 p-2  ">Titre</label>
                            <div class=" p-2 mr-2  input-group input-group-sm ">
                              <input
                                class="form-control"
                                type="text"
                                placeholder={item.title}
                                value={item.title}
                                onChange={(e) => {
                                  // Clone the items array
                                  const updatedItems = [...items];
                                  // Find the index of the item to update
                                  const itemIndex = updatedItems.findIndex(
                                    (i) => i.id === item.id
                                  );
                                  // Update the title property of the specific item
                                  updatedItems[itemIndex].title =
                                    e.target.value;
                                  // Set the updated array back into the state
                                  setItems(updatedItems);
                                }}
                              />
                            </div>
                            <div>
                              <div className="  mb-3 p-3">
                                <label className="d-block">
                                  Type d'en-tête de titre
                                </label>
                                <select
                                  defaultValue={item.type}
                                  value={item.type}
                                  class="form-select "
                                  aria-label="Default select example"
                                  onChange={(e) => {
                                    // Clone the items array
                                    const updatedItems = [...items];
                                    // Find the index of the item to update
                                    const itemIndex = updatedItems.findIndex(
                                      (i) => i.id === item.id
                                    );
                                    // Update the title property of the specific item
                                    updatedItems[itemIndex].type =
                                      e.target.value;
                                    // Set the updated array back into the state
                                    setItems(updatedItems);
                                  }}
                                >
                                  <option value="h2">H2</option>{" "}
                                  <option value="h3">H3</option>{" "}
                                  <option value="h4">H4</option>{" "}
                                  <option value="h5">H5</option>
                                </select>
                              </div>
                              <label className="mt-2 p-2  ">Description</label>
                              <div className="   p-1">
                                <CKEditor
                                  editor={ClassicEditor}
                                  data={item.description}
                                  onChange={(event, editor) => {
                                    const data = editor.getData();
                                    const updatedItems = [...items];
                                    // Find the index of the item to update
                                    const itemIndex = updatedItems.findIndex(
                                      (i) => i.id === item.id
                                    );
                                    // Update the title property of the specific item
                                    updatedItems[itemIndex].description = data;
                                    // Set the updated array back into the state
                                    setItems(updatedItems);
                                  }}
                                />
                              </div>
                              <div className="form-check form-switch  p-3">
                                <label className="form-check-label">
                                  Afficher le bouton
                                </label>
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  value={item.isActive}
                                  checked={item.isActive == true}
                                  onChange={(e) => {
                                    const updatedItems = [...items];
                                    // Find the index of the item to update
                                    const itemIndex = updatedItems.findIndex(
                                      (i) => i.id === item.id
                                    );
                                    // Update the title property of the specific item
                                    updatedItems[itemIndex].isActive =
                                      e.target.checked;
                                    // Set the updated array back into the state
                                    setItems(updatedItems);
                                  }}
                                />
                              </div>
                              <div
                                className={item.isActive ? "d-block" : "d-none"}
                              >
                                <label>Text du lien</label>
                                <input
                                  className="form-control"
                                  value={item.textbtn}
                                  onChange={(e) => {
                                    const updatedItems = [...items];
                                    // Find the index of the item to update
                                    const itemIndex = updatedItems.findIndex(
                                      (i) => i.id === item.id
                                    );
                                    // Update the title property of the specific item
                                    updatedItems[itemIndex].textbtn =
                                      e.target.value;
                                    // Set the updated array back into the state
                                    setItems(updatedItems);
                                  }}
                                ></input>
                                <label>Lien du boutton</label>
                                <input
                                  className="form-control"
                                  value={item.linkbtn}
                                  onChange={(e) => {
                                    const updatedItems = [...items];
                                    // Find the index of the item to update
                                    const itemIndex = updatedItems.findIndex(
                                      (i) => i.id === item.id
                                    );
                                    // Update the title property of the specific item
                                    updatedItems[itemIndex].linkbtn =
                                      e.target.value;
                                    // Set the updated array back into the state
                                    setItems(updatedItems);
                                  }}
                                ></input>
                              </div>
                            </div>
                          </div>
                        )}
                      </>
                    );
                  })}
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
              <span className="title-popups">Design Contenu Accordéon</span>
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
                        className="btn-group dropdown-toggle"
                        data-bs-toggle="dropdown"
                      >
                        {model == "TabModelOne" ? (
                          <img src={modelOne} className="selectedModel" />
                        ) : model == "TabModelTwo" ? (
                          <img src={modelTwo} className="selectedModel" />
                        ) : model == "TabModelThree" ? (
                          <img src={modelThree} className="selectedModel" />
                        ) : (
                          ""
                        )}

                        <i aria-expanded="false"></i>
                        <ul className="dropdown-menu preview-options pt-3 pb-3">
                          <span class="titredropdown m-3">
                            Sélectionner la mise en page
                          </span>
                          <div onClick={(e) => changeStyle("TabModelOne")}>
                            <img src={modelOne} className="modelPreview" />
                          </div>
                          <div onClick={(e) => changeStyle("TabModelTwo")}>
                            <img src={modelTwo} className="modelPreview" />
                          </div>
                          <div onClick={(e) => changeStyle("TabModelThree")}>
                            <img src={modelThree} className="modelPreview" />
                          </div>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="scrolly">
                  <div className="firstdivplus">
                    <span id="scrollspyHeading2" className="titre  mt-1 mb-1">
                      Style
                    </span>
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
                            Tous les anglets
                          </button>
                        </h2>
                        <div
                          id="collapseOne"
                          class="accordion-collapse collapse"
                          aria-labelledby="headingOne"
                          data-bs-parent="#accordionExample"
                        >
                          <div class="accordion-body">
                            <TextStylingComponent
                              key={"onglet"}
                              for={"onglet"}
                              editor={props.editor}
                              siteId={props.siteId}
                              config={configOnglet}
                              setConfig={changeOngletConfig}
                            />
                            <div className="d-flex justify-content-between align-items-center mb-3">
                              <span>Couleur d'arrière-plan</span>
                              <div className="inputColor d-flex justify-content-end  ms-1 ">
                                <div
                                  className="colorPreview"
                                  onClick={getPrimaryColor}
                                >
                                  <span
                                    className="color-value"
                                    style={{
                                      background: blockPickerColor.rgbTxt,
                                    }}
                                  ></span>
                                </div>
                                {isActivePalette ? (
                                  <div className="sketch-popeover">
                                    <div
                                      className="sketch-cover"
                                      onClick={(e) => handleCloseColor()}
                                    />
                                    <SketchPicker
                                      color={blockPickerColor.rgb}
                                      onChangeComplete={(color) =>
                                        changeColor(color)
                                      }
                                    />
                                  </div>
                                ) : null}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="accordion-item">
                        <h2 class="accordion-header" id="headingTwo">
                          <button
                            class="accordion-button"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseTwo"
                            aria-expanded="true"
                            aria-controls="collapseOne"
                          >
                            Tous les anglets survol
                          </button>
                        </h2>
                        <div
                          id="collapseTwo"
                          class="accordion-collapse collapse"
                          aria-labelledby="headingOne"
                          data-bs-parent="#accordionExample"
                        >
                          <div class="accordion-body">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                              <span>Couleur du text au survol</span>
                              <div className="inputColor d-flex justify-content-end  ms-1 ">
                                <div
                                  className="colorPreview"
                                  onClick={getPrimaryColor3}
                                >
                                  <span
                                    className="color-value"
                                    style={{
                                      background: blockPickerColor3.rgbTxt,
                                    }}
                                  ></span>
                                </div>
                                {isActivePalette3 ? (
                                  <div className="sketch-popeover">
                                    <div
                                      className="sketch-cover"
                                      onClick={(e) => handleCloseColor3()}
                                    />
                                    <SketchPicker
                                      color={blockPickerColor3.rgb}
                                      onChangeComplete={(color) =>
                                        changeColor3(color)
                                      }
                                    />
                                  </div>
                                ) : null}
                              </div>
                            </div>
                            <div className="d-flex justify-content-between align-items-center mb-3">
                              <span>Couleur du fond au survol</span>
                              <div className="inputColor d-flex justify-content-end  ms-1 ">
                                <div
                                  className="colorPreview"
                                  onClick={getPrimaryColor4}
                                >
                                  <span
                                    className="color-value"
                                    style={{
                                      background: blockPickerColor4.rgbTxt,
                                    }}
                                  ></span>
                                </div>
                                {isActivePalette4 ? (
                                  <div className="sketch-popeover">
                                    <div
                                      className="sketch-cover"
                                      onClick={(e) => handleCloseColor4()}
                                    />
                                    <SketchPicker
                                      color={blockPickerColor4.rgb}
                                      onChangeComplete={(color) =>
                                        changeColor4(color)
                                      }
                                    />
                                  </div>
                                ) : null}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="accordion-item">
                        <h2 class="accordion-header" id="headingThree">
                          <button
                            class="accordion-button"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseThree"
                            aria-expanded="true"
                            aria-controls="collapseOne"
                          >
                            Style de description
                          </button>
                        </h2>
                        <div
                          id="collapseThree"
                          class="accordion-collapse collapse"
                          aria-labelledby="headingThree"
                          data-bs-parent="#accordionExample"
                        >
                          <div class="accordion-body">
                            <TextStylingComponent
                              key={"desc"}
                              for={"desc"}
                              editor={props.editor}
                              siteId={props.siteId}
                              config={configDesc}
                              setConfig={changeDescConfig}
                            />
                            <div className="d-flex justify-content-between align-items-center mb-3">
                              <span>Couleur d'arrière-plan</span>
                              <div className="inputColor d-flex justify-content-end  ms-1 ">
                                <div
                                  className="colorPreview"
                                  onClick={getPrimaryColor5}
                                >
                                  <span
                                    className="color-value"
                                    style={{
                                      background: blockPickerColor5.rgbTxt,
                                    }}
                                  ></span>
                                </div>
                                {isActivePalette5 ? (
                                  <div className="sketch-popeover">
                                    <div
                                      className="sketch-cover"
                                      onClick={(e) => handleCloseColor5()}
                                    />
                                    <SketchPicker
                                      color={blockPickerColor5.rgb}
                                      onChangeComplete={(color) =>
                                        changeColor5(color)
                                      }
                                    />
                                  </div>
                                ) : null}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="accordion-item">
                        <h2 class="accordion-header" id="headingFour">
                          <button
                            class="accordion-button"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseFour"
                            aria-expanded="true"
                            aria-controls="collapseOne"
                          >
                            Espacement
                          </button>
                        </h2>
                        <div
                          id="collapseFour"
                          class="accordion-collapse collapse"
                          aria-labelledby="headingFour"
                          data-bs-parent="#accordionExample"
                        >
                          <div class="accordion-body">
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
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        show={shownotice}
        onHide={handleCloseNotice}
        id="ModalAddSocial"
        className="notice"
        size="xs"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title></Modal.Title>

          <button
            type="button"
            className="btn-closes"
            aria-label="Close"
            onClick={handleCloseNotice}
          >
            {" "}
            <i class="fa-solid fa-xmark"></i>
          </button>
        </Modal.Header>
        <Modal.Body>
          <span className="noticetext">
            {" "}
            <b>Icônes</b>
          </span>
          <span className="aide">
            Le widget Icônes de réseaux sociaux permet d'ajouter des liens vers
            vos profils de réseaux sociaux comme Facebook, Twitter, Pinterest,
            WhatsApp, Google My Business, et plus encore. L'ajout de liens
            sociaux à votre site est l'un des meilleurs moyens d'atteindre votre
            audience et de gagner des visiteurs, tant sur le plan local que sur
            le plan international. Vous pouvez choisir parmi une sélection
            d'icônes des réseaux sociaux existants ou importer vos propres
            icônes personnalisées.
          </span>
          <span className="aide">
            Pour ajouter des icônes de réseaux sociaux :
          </span>
          <ul className="listaide">
            <li>
              {" "}
              <span className="liss me-2"> 1 </span>{" "}
              <span>
                Il faut remplir les champs a partir de paramatres général de
                l'entreprise{" "}
              </span>
            </li>
            <li>
              {" "}
              <span className="liss me-2"> 2 </span>{" "}
              <span>
                Au niveau du sidbar a gauche cliqué sur <b> widgets</b>{" "}
              </span>
            </li>
            <li>
              {" "}
              <span className="liss me-2"> 3 </span>{" "}
              <span> Et puis sur accordion</span>{" "}
            </li>
            <li>
              {" "}
              <span className="liss me-2"> 4 </span>{" "}
              <span> Glissé sur une colonne ... </span>{" "}
            </li>
          </ul>

          <span className="aide">Pour modifier le désigne:</span>
          <ul className="listaide">
            <li>
              {" "}
              <span className="liss me-2"> 1 </span>{" "}
              <span>Il faut choisir le mise en page </span>
            </li>
            <li>
              {" "}
              <span className="liss me-2"> 2 </span>{" "}
              <span>
                Changé la taille et l'espacement entre les icônes & à partir du
                style.{" "}
              </span>
            </li>
            <li>
              {" "}
              <span className="liss me-2"> 3 </span>{" "}
              <span>
                {" "}
                Chosir une differents animation (scale,rotation,gauche
                droite...){" "}
              </span>{" "}
            </li>
          </ul>
        </Modal.Body>
      </Modal>
    </div>
  );
}
