import React, { useEffect, useState } from "react";
import { Collapse, Modal, ModalDialog } from "react-bootstrap";
import Draggable from "react-draggable";
import Nestable from "react-nestable";
import "./ModalAccordion.css";
import { v4 as uuidv4 } from "uuid";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import TextStylingComponent from "../../../compoments/TextStyling/TextStylingComponent";
import { SketchPicker } from "react-color";
import AccordionModelOne from "../../../../../assets/Typeaccordion/modelaccordionone.jpg";
import AccordionModelTwo from "../../../../../assets/Typeaccordion/modelaccordiontow.jpg";
import AccordionModelThree from "../../../../../assets/Typeaccordion/modelaccordionthree.jpg";
import AccordionModelFour from "../../../../../assets/Typeaccordion/modelaccordionfour.jpg";
import fsList from "../../../../../assets/fonts/fs.json";
import ArrondisConfigAccordion from "../../../compoments/Arrondis/ArrondisConfig";
import EspacementConfig from "../../../compoments/Espacement/EspacementConfig";
import BorderConfig from "../../../compoments/Border/BorderConfig";
import ColorConfig from "../../../compoments/Color/ColorConfig";

class DraggableModalDialog extends React.Component {
  render() {
    return (
      <Draggable handle=".handleDrag">
        <ModalDialog {...this.props} />
      </Draggable>
    );
  }
}
export default function ModalAccordion(props) {
  const [show, setShow] = useState(true);
  const [icons, setIcons] = useState([{}]);
  const [selectedItem, setSelectedItem] = useState("");
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [hasCustomClass, setHasCustomClass] = useState(false);
  const [isActive, setIsActive] = useState(
    props.editor.getSelected().getAttributes()["data-el-style"]
      ? props.editor.getSelected().getAttributes()["data-el-style"]
      : false // Set a default value, such as "solid"
  );
  const [configDesc, setConfigDesc] = useState({
    font: "",
    variant: "normal",
    color: "#000",
    align: "left",
    size: { desktop: "unset", tablet: "unset", mobile: "unset" },
    line: { desktop: "unset", tablet: "unset", mobile: "unset" },
  });
  const handleCloseStylesIconsList = () => {
    setShowStylesIconsList(false);
  };

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
  const [configEspacementItem, setConfigEspacementItem] = useState({
    padding: props.editor.getSelected().getAttributes()["data-item-padding"]
      ? JSON.parse(
          props.editor.getSelected().getAttributes()["data-item-padding"]
        )
      : {
          top: "15",
          left: "15",
          right: "15",
          bottom: "15",
        },
    margin: props.editor.getSelected().getAttributes()["data-item-margin"]
      ? JSON.parse(
          props.editor.getSelected().getAttributes()["data-item-margin"]
        )
      : {
          top: "0",
          left: "0",
          right: "0",
          bottom: "0",
        },
  });
  const [configAccordionRaduisIcon, setConfigAccordionRaduisIcon] = useState({
    arrondis: props.editor.getSelected().getAttributes()["data-icon-raduis"]
      ? JSON.parse(
          props.editor.getSelected().getAttributes()["data-icon-raduis"]
        )
      : {
          topLeft: "0",
          topRight: "0",
          bottomLeft: "0",
          bottomRight: "0",
        },
  });
  const [configAccordionRaduis, setConfigAccordionRaduis] = useState({
    arrondis: props.editor.getSelected().getAttributes()["data-ongle-raduis"]
      ? JSON.parse(
          props.editor.getSelected().getAttributes()["data-ongle-raduis"]
        )
      : {
          topLeft: "0",
          topRight: "0",
          bottomLeft: "0",
          bottomRight: "0",
        },
  });
  const [showStylesIconsList, setShowStylesIconsList] = useState(false);

  const filtre = (value) => {
    let filtred;
    if (value != "") {
      filtred = Object.values(icons).filter((item) =>
        item.name.toLowerCase().match(value.toLowerCase())
      );

      setIcons(filtred);
    } else {
      setIcons(fsList);
    }
  };
  const [configBorder, setConfigBorder] = useState({
    typeborder: props.editor.getSelected().getAttributes()["data-border-type"]
      ? props.editor.getSelected().getAttributes()["data-border-type"]
      : "all",
    size: props.editor.getSelected().getAttributes()["data-border-size"]
      ? JSON.parse(
          props.editor.getSelected().getAttributes()["data-border-size"]
        )
      : {
          all: "1",
          top: "1",
          left: "1",
          right: "1",
          bottom: "1",
        },

    style: props.editor.getSelected().getAttributes()["data-border-style"]
      ? props.editor.getSelected().getAttributes()["data-border-style"]
      : "solid",

    color: props.editor.getSelected().getAttributes()["data-border-color"]
      ? props.editor.getSelected().getAttributes()["data-border-color"]
      : "#eee",
  }); 
  
  const [configBorderItem, setConfigBorderItem] = useState({
    typeborder: props.editor.getSelected().getAttributes()["data-border-typeitem"]
      ? props.editor.getSelected().getAttributes()["data-border-typeitem"]
      : "all",
    size: props.editor.getSelected().getAttributes()["data-border-sizeitem"]
      ? JSON.parse(
          props.editor.getSelected().getAttributes()["data-border-sizeitem"]
        )
      : {
          all: "0",
          top: "0",
          left: "0",
          right: "0",
          bottom: "0",
        },

    style: props.editor.getSelected().getAttributes()["data-border-style"]
      ? props.editor.getSelected().getAttributes()["data-border-style"]
      : "solid",

    color: props.editor.getSelected().getAttributes()["data-border-color"]
      ? props.editor.getSelected().getAttributes()["data-border-color"]
      : "#eee",
  });

  const [espacementIcon, setEspacementIcon] = useState({
    espacement: props.editor.getSelected().getAttributes()["data-espa-icon"]
      ? props.editor.getSelected().getAttributes()["data-espa-icon"]
      : 0,
  });
  const [espacementIconPaddings, setEspacementIconPaddings] = useState({
    espacementP: props.editor.getSelected().getAttributes()[
      "data-paddings-icon"
    ]
      ? props.editor.getSelected().getAttributes()["data-paddings-icon"]
      : 0,
  });
  const [SizeIcon, setSizeIcon] = useState({
    size: props.editor.getSelected().getAttributes()["data-size-icon"]
      ? props.editor.getSelected().getAttributes()["data-size-icon"]
      : 0,
  });
  const [posAlignTitre, setPosAlignTitre] = useState({
    align: props.editor.getSelected().getAttributes()["data-pos-btn"]
      ? props.editor.getSelected().getAttributes()["data-pos-btn"]
      : "row-reverse",
  });

  const [configOnglet, setConfigOnglet] = useState({
    font: "",
    variant: "normal",
    color: "#000",
    size: { desktop: "unset", tablet: "unset", mobile: "unset" },
    line: { desktop: "unset", tablet: "unset", mobile: "unset" },
  });
  const [selectedIcon, setSelectedIcon] = useState(
    props.editor.getSelected().getAttributes()["data-icon"]
      ? props.editor.getSelected().getAttributes()["data-icon"]
      : "fa fa-user"
  );

  const rgbtoJson = (rgbString) => {
    var s = rgbString;
    s = s.replace("rgb(", "");
    s = s.replace(")", "");
    let c = s.split(",");
    return { r: c[0], g: c[1], b: c[2], a: c[3] };
  };
  const [configBgHeader, setConfigBgHeader] = useState({
    rgbTxt: props.editor.getSelected().getAttributes()["data-header-bg"]
      ? props.editor.getSelected().getAttributes()["data-header-bg"]
      : "#fff",
    rgb: rgbtoJson(
      props.editor.getSelected().getAttributes()["data-header-bg"]
        ? props.editor.getSelected().getAttributes()["data-header-bg"]
        : "#fff"
    ),
  });
  const changeBgHeader = (e) => {
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-header-bg"] = e.rgbTxt;

    cmp.setAttributes(attr);
    let r = props.editor.Css.getRule(
      `#${attr.id} .accordionss .accordion-header >button`
    );
    let css = [];
    if (r) css = r.attributes.style;
    css["background"] = e.rgbTxt;
    props.editor.Css.remove(r);
    props.editor.Css.setRule(
      `#${attr.id} .accordionss .accordion-header >button`,
      css
    );
    setConfigBgHeader(e);
    props.editor.setStyle(props.editor.getCss());
    cmp.view.render();
  };
  const [isActivePaletteIcon, setActivepaletteIcon] = useState(false);

  const [blockPickerColorIcon, setBlockPickerColorIcon] = useState({
    rgbTxt: props.editor.getSelected().getAttributes()["data-color-icon"]
      ? props.editor.getSelected().getAttributes()["data-color-icon"]
      : "#00000000",
    rgb: rgbtoJson(
      props.editor.getSelected().getAttributes()["data-color-icon"]
        ? props.editor.getSelected().getAttributes()["data-color-icon"]
        : "#00000000"
    ),
  });
  const handleCloseColorIcon = () => {
    setActivepaletteIcon(false);
  };
  const getPrimaryColorIcon = () => {
    if (isActivePaletteIcon === true) {
      setActivepaletteIcon(false);
    } else {
      setActivepaletteIcon(true);
    }
  };

  const changeColorIcon = (color) => {
    setBlockPickerColorIcon({
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
    attr["data-color-icon"] =
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
      `#${attr.id} .accordion-button .iconAccordion:before,#${attr.id} .accordion-button .iconAccordion:before,
          #${attr.id} .accordion-button.collapsed .iconAccordion:before,#${attr.id} .accordion-button.collapsed .iconAccordion:before`,
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

  const [isActivePaletteBgIcon, setActivepaletteBgIcon] = useState(false);

  const [blockPickerColorBgIcon, setBlockPickerColorBgIcon] = useState({
    rgbTxt: props.editor.getSelected().getAttributes()["data-bg-icon"]
      ? props.editor.getSelected().getAttributes()["data-bg-icon"]
      : "#00000000",
    rgb: rgbtoJson(
      props.editor.getSelected().getAttributes()["data-bg-icon"]
        ? props.editor.getSelected().getAttributes()["data-bg-icon"]
        : "#00000000"
    ),
  });
  const handleCloseColorBgIcon = () => {
    setActivepaletteBgIcon(false);
  };
  const getPrimaryColorBgIcon = () => {
    if (isActivePaletteBgIcon === true) {
      setActivepaletteBgIcon(false);
    } else {
      setActivepaletteBgIcon(true);
    }
  };
  const Activefirstelement = () => {
    setIsActive(!isActive);
  };
  const changeColorBgIcon = (color) => {
    setBlockPickerColorBgIcon({
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
    attr["data-bg-icon"] =
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
      `#${attr.id} .accordion-button .iconAccordion:before`,
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

  const [configHoverTitle, setConfigHoverTitle] = useState({
    rgbTxt: props.editor.getSelected().getAttributes()["data-title-bg"]
      ? props.editor.getSelected().getAttributes()["data-title-bg"]
      : "#fff",
    rgb: rgbtoJson(
      props.editor.getSelected().getAttributes()["data-title-bg"]
        ? props.editor.getSelected().getAttributes()["data-title-bg"]
        : "#fff"
    ),
  });
  const [configHoverTitleColapsed, setConfigHoverTitleColapsed] = useState({
    rgbTxt: props.editor.getSelected().getAttributes()["data-titlec-bg"]
      ? props.editor.getSelected().getAttributes()["data-titlec-bg"]
      : "#000",
    rgb: rgbtoJson(
      props.editor.getSelected().getAttributes()["data-title-bg"]
        ? props.editor.getSelected().getAttributes()["data-title-bg"]
        : "#000"
    ),
  });

  // const changeBgHeaderColapsed = (e) => {
  //   const cmp = props.editor.getSelected();
  //   let attr = cmp.getAttributes();
  //   attr["data-titlec-bg"] = e.rgbTxt;

  //   cmp.setAttributes(attr);
  //   let r = props.editor.Css.getRule(
  //     `#${attr.id}  .accordionss .accordion-header > button:hover, #${attr.id}  .accordionss .accordion-header >button.collapsed`
  //   );
  //   let css = [];
  //   if (r) css = r.attributes.style;
  //   css["background"] = e.rgbTxt;
  //   props.editor.Css.setRule(
  //     `#${attr.id}  .accordionss .accordion-header > button:hover, #${attr.id}  .accordionss .accordion-header >button.collapsed`,
  //     css
  //   );
  //   setConfigHoverTitleColapsed(e);
  //   let cssStyles = props.editor.getCss();
  //   props.editor.setStyle(cssStyles);
  // };
  // const changeHoverTitle = (e) => {
  //   const cmp = props.editor.getSelected();
  //   let attr = cmp.getAttributes();
  //   attr["data-titlec-bg"] = e.rgbTxt;

  //   cmp.setAttributes(attr);
  //   let r = props.editor.Css.getRule(
  //     `#${attr.id}  .accordionss .accordion-header > button:hover, #${attr.id}  .accordionss .accordion-header >button.collapsed`
  //   );
  //   let css = [];
  //   if (r) css = r.attributes.style;
  //   css["color"] = e.rgbTxt;
  //   props.editor.Css.setRule(
  //     `#${attr.id}  .accordionss .accordion-header > button:hover, #${attr.id}  .accordionss .accordion-header >button.collapsed`,
  //     css
  //   );
  //   setConfigHoverTitleColapsed(e);
  //   let cssStyles = props.editor.getCss();
  //   props.editor.setStyle(cssStyles);
  // };

  const [configHoverBtn, setConfigHoverHoverBtn] = useState({
    rgbTxt: props.editor.getSelected().getAttributes()["data-btn-bg"]
      ? props.editor.getSelected().getAttributes()["data-btn-bg"]
      : "#eee",
    rgb: rgbtoJson(
      props.editor.getSelected().getAttributes()["data-btn-bg"]
        ? props.editor.getSelected().getAttributes()["data-btn-bg"]
        : "#eee"
    ),
  });
  const [configHoverBtnActive, setConfigHoverBtnActive] = useState({
    rgbTxt: props.editor.getSelected().getAttributes()["data-btn-bg-active"]
      ? props.editor.getSelected().getAttributes()["data-btn-bg-active"]
      : "#000",
    rgb: rgbtoJson(
      props.editor.getSelected().getAttributes()["data-btn-bg-active"]
        ? props.editor.getSelected().getAttributes()["data-btn-bg-active"]
        : "#000"
    ),
  });
  const changeHoverBtnActive = (e) => {
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-btn-bg-active"] = e.rgbTxt;

    cmp.setAttributes(attr);
    let r = props.editor.Css.getRule(
      `#${attr.id}  .accordionss .accordion-header >button:hover`
    );
    let css = [];
    if (r) css = r.attributes.style;
    css["background"] = e.rgbTxt;
    props.editor.Css.setRule(
      `#${attr.id}  .accordionss .accordion-header >button:hover`,
      css
    );
    setConfigHoverBtnActive(e);
    props.editor.setStyle(props.editor.getCss());
    cmp.view.render();
  };
  const changeHoverBtn = (e) => {
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-btn-bg"] = e.rgbTxt;

    cmp.setAttributes(attr);
    let r = props.editor.Css.getRule(
      `#${attr.id}  .accordionss .accordion-header > button:hover`
    );
    let css = [];
    if (r) css = r.attributes.style;
    css["background"] = e.rgbTxt;
    props.editor.Css.setRule(
      `#${attr.id}  .accordionss .accordion-header > button:hover`,
      css
    );
    setConfigHoverHoverBtn(e);
    props.editor.setStyle(props.editor.getCss());
    cmp.view.render();
  };
  const [configBgDescription, setConfigBgDescription] = useState({
    rgbTxt: props.editor.getSelected().getAttributes()["data-desc-bg"]
      ? props.editor.getSelected().getAttributes()["data-desc-bg"]
      : "#fff",
    rgb: rgbtoJson(
      props.editor.getSelected().getAttributes()["data-desc-bg"]
        ? props.editor.getSelected().getAttributes()["data-desc-bg"]
        : "#fff"
    ),
  });
  const changeBgDescription = (e) => {
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-desc-bg"] = e.rgbTxt;

    cmp.setAttributes(attr);
    let r = props.editor.Css.getRule(`#${attr.id} .accordion-body`);
    let css = [];
    if (r) css = r.attributes.style;
    css["background"] = e.rgbTxt;
    props.editor.Css.setRule(`#${attr.id} .accordion-body`, css);
    setConfigBgDescription(e);
    props.editor.setStyle(props.editor.getCss());
    cmp.view.render();
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

  const [items, setItems] = useState([]);
  const handleAddItemClick = () => {
    const newItem = {
      id: "tab-" + uuidv4(),
      title: `Title or question ${items.length + 1}`,
      type: "h3",
      description: "Contenu du item",
    };

    setItems([...items, newItem]); // Use setItems to update the state
  };

  const handleItemClicks = (itemId) => {
    setSelectedItemId(itemId === selectedItemId ? null : itemId);
  };
  const handleClose = () => {
    setShow(false);
  };

  const changeStyle = (key) => {
    const cmp = props.editor.getSelected();
    let classes = cmp.getClasses().filter((x) => x.indexOf("Model") == -1);
    switch (key) {
      case "AccordionModelOne":
      case "AccordionModelTwo":
      case "AccordionModelThree":
      case "AccordionModelFour":
        classes.push(key);
        cmp.setClass(classes);
        break;
      default:
        key = "AccordionModelThree";
        break;
    }

    cmp.setClass(classes);
    setSelectedItem(key);
  };

  const handleRemoveItemClick = (itemId) => {
    const updatedItems = items.filter((item) => item.id !== itemId);
    setItems(updatedItems);
  };
  const changePostionIcon = (position) => {
    let cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();

    attr["data-pos-btn"] = position;
    cmp.setAttributes(attr);
    props.editor.Css.setRule(
      `#${attr.id}.${selectedItem} .accordion-button
          `,
      {
        "flex-direction": position,
      }
    );

    setPosAlignTitre({ align: position });
  };

  const setIconButton = (unicode, c) => {
    let cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();

    if (unicode != false) {
      attr["data-icon"] = c;
      attr["data-icon-unicode"] = unicode;
      cmp.setAttributes(attr);
      props.editor.Css.setRule(
        `#${attr.id} .accordion-button .iconAccordion:before,
      #${attr.id} .accordion-button .iconAccordion:before`,
        {
          "font-family": "Font Awesome 5 Free",
          "font-weight": "900",
          content: `"${unicode}"`,
          display: "block",
        }
      );
    } else {
      props.editor.Css
        .remove(`#${attr.id} .accordion-button .iconAccordion:before,
      #${attr.id} .accordion-button .iconAccordion:before`);
      props.editor.Css
        .remove(`#${attr.id} .accordion-button .iconAccordion:before,
      #${attr.id} .accordion-button .iconAccordion:before`);
    }
  };


  const [isActivePaletteColorBorder, setActivepaletteColorBorder] =
    useState(false);
  const handleCloseColorBorder = () => {
    setActivepaletteColorBorder(false);
  };
  const getPrimaryColorBorder = () => {
    if (isActivePaletteColorBorder === true) {
      setActivepaletteColorBorder(false);
    } else {
      setActivepaletteColorBorder(true);
    }
  };

  const changeBorderHeader = (e) => {
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-border-size"] = JSON.stringify(e.size);
    attr["data-border-style"] = e.style;
    attr["data-border-color"] = e.color;
    attr["data-border-type"] = e.typeborder;

    cmp.setAttributes(attr);
    let r = props.editor.Css.getRule(`#${attr.id} .accordion-button`);
    let css = [];
    if (r) css = r.attributes.style;
    switch (e.typeborder) {
      case "all":
        css["border"] = e.size.all + "px" + " " + e.style + " " + e.color;

        break;
      case "top":
        css["border-top"] = e.size.top + "px" + " " + e.style + " " + e.color;

        break;
      case "bottom":
        css["border-bottom"] =
          e.size.bottom + "px" + " " + e.style + " " + e.color;
        break;
      case "left":
        css["border-left"] = e.size.left + "px" + " " + e.style + " " + e.color;
        break;
      case "right":
        css["border-right"] =
          e.size.right + "px" + " " + e.style + " " + e.color;

        break;
      default:
        break;
    }
    props.editor.Css.remove(r);
    props.editor.Css.setRule(`#${attr.id} .accordion-button`, css);
    setConfigBorder(e);
    props.editor.setStyle(props.editor.getCss());
    cmp.view.render();
  };  
  
  const changeBordertem = (e) => {
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-border-sizeitem"] = JSON.stringify(e.size);
    attr["data-border-styleitem"] = e.style;
    attr["data-border-coloritem"] = e.color;
    attr["data-border-typeitem"] = e.typeborder;

    cmp.setAttributes(attr);
    let r = props.editor.Css.getRule(`#${attr.id} .accordion-item`);
    let css = [];
    if (r) css = r.attributes.style;
    switch (e.typeborder) {
      case "all":
        css["border"] = e.size.all + "px" + " " + e.style + " " + e.color;

        break;
      case "top":
        css["border-top"] = e.size.top + "px" + " " + e.style + " " + e.color;

        break;
      case "bottom":
        css["border-bottom"] =
          e.size.bottom + "px" + " " + e.style + " " + e.color;
        break;
      case "left":
        css["border-left"] = e.size.left + "px" + " " + e.style + " " + e.color;
        break;
      case "right":
        css["border-right"] =
          e.size.right + "px" + " " + e.style + " " + e.color;

        break;
      default:
        break;
    }
    props.editor.Css.remove(r);
    props.editor.Css.setRule(`#${attr.id} .accordion-item`, css);
    setConfigBorderItem(e);
    props.editor.setStyle(props.editor.getCss());
    cmp.view.render();
  };

  const changeEspaceIcon = (es) => {
    let cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();

    attr["data-espa-icon"] = es;
    cmp.setAttributes(attr);

    props.editor.Css.setRule(`#${attr.id} .accordion-button .iconAccordion`, {
      margin: `0px ${es}px`,
    });
    setEspacementIcon({ espacement: es });
  };
  const changeEspaceIconPadding = (es) => {
    let cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();

    attr["data-paddings-icon"] = es;
    cmp.setAttributes(attr);

    props.editor.Css.setRule(`#${attr.id} .accordion-button .iconAccordion`, {
      padding: "0",
      display: "flex",
      "justify-content": "center",
      " align-items": "center",
      width: `${es}px`,
      height: `${es}px`,
    });
    setEspacementIconPaddings({ espacementP: es });
  };

  const changeSizeIcon = (es) => {
    let cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();

    attr["data-size-icon"] = es;

    cmp.setAttributes(attr);
    let r = props.editor.Css.getRule(
      `#${attr.id} .accordion-button .iconAccordion:before`
    );
    let css = [];
    if (r) css = r.attributes.style;
    css["font-size"] = es + "px";
    props.editor.Css.setRule(
      `#${attr.id} .accordion-button .iconAccordion:before`,
      css
    );
    setSizeIcon({ size: es });
    props.editor.setStyle(props.editor.getCss());
    cmp.view.render();
  };
  const changeOngletConfig = (e) => {
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-onglet-font"] = e.font;
    attr["data-onglet-variant"] = e.variant;
    attr["data-onglet-size"] = JSON.stringify(e.size);
    attr["data-onglet-line"] = JSON.stringify(e.line);
    attr["data-onglet-color"] = e.color;
    cmp.setAttributes(attr);

    let r = props.editor.Css.getRule(
      `#${attr.id} .accordionss .accordion-header > button,#${attr.id} .accordionss .accordion-header > button:not(.collapsed)`
    );
    let css = {};
    if (r) css = r.attributes.style;
    css["font-family"] = e.font;
    css["color"] = e.color;
    css["text-align"] = e.align;
    css["font-weight"] = e.variant;
    css["font-size"] = e.size.desktop + "px";
    css["line-height"] = e.line.desktop + "px";
    props.editor.Css.setRule(
      `#${attr.id} .accordionss .accordion-header > button,#${attr.id} .accordionss .accordion-header > button:not(.collapsed)`,
      css
    );

    let r_tablet = props.editor.Css.getRule(
      `#${attr.id} .accordionss .accordion-header > button,#${attr.id} .accordionss .accordion-header > button:not(.collapsed)`,
      {
        atRuleType: "media",
        atRuleParams: "(min-width: 768px) and (max-width: 991px)",
      }
    );
    let cssTablet = {};
    if (r_tablet) cssTablet = r_tablet.attributes.style;
    cssTablet["font-size"] = e.size.tablet + "px";
    cssTablet["line-height"] = e.line.tablet + "px";
    props.editor.Css.remove(r_tablet);
    props.editor.Css.remove(
      `#${attr.id} .accordionss .accordion-header > button,#${attr.id} .accordionss .accordion-header > button:not(.collapsed)`,
      {
        atRuleType: "media",
        atRuleParams: "(min-width:768px) and (max-width:991px)",
      }
    );
    props.editor.Css.setRule(
      `#${attr.id} .accordionss .accordion-header > button,#${attr.id} .accordionss .accordion-header > button:not(.collapsed)`,
      cssTablet,
      {
        atRuleType: "media",
        atRuleParams: "(min-width:768px) and (max-width:991px)",
      }
    );

    let r_Mobile = props.editor.Css.getRule(
      `#${attr.id} .accordionss .accordion-header > button,#${attr.id} .accordionss .accordion-header > button:not(.collapsed)`,
      {
        atRuleType: "media",
        atRuleParams: "(max-width: 67px)",
      }
    );

    let cssMobile = {};
    if (r_Mobile) cssMobile = r_Mobile.attributes.style;

    cssMobile["font-size"] = `${e.size.mobile}px`;
    cssMobile["line-height"] = `${e.line.mobile}px`;

    props.editor.Css.remove(r_Mobile);
    props.editor.Css.remove(
      `#${attr.id} .accordionss .accordion-header > button,#${attr.id} .accordionss .accordion-header > button:not(.collapsed)`,
      {
        atRuleType: "media",
        atRuleParams: "(max-width:767px)",
      }
    );
    props.editor.Css.setRule(
      `#${attr.id} .accordionss .accordion-header > button,#${attr.id} .accordionss .accordion-header > button:not(.collapsed)`,
      cssMobile,
      {
        atRuleType: "media",
        atRuleParams: "(max-width:767px)",
      }
    );
    setConfigOnglet(e);
    setIcons(fsList);
    setSelectedIcon(attr["data-icon"] ? attr["data-icon"] : "fa fa-angle");
    props.editor.setStyle(props.editor.getCss());
  };

  const changeDescConfig = (e) => {
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-desc-font"] = e.font;
    attr["data-desc-variant"] = e.variant;
    attr["data-desc-size"] = JSON.stringify(e.size);
    attr["data-desc-line"] = JSON.stringify(e.line);
    attr["data-desc-color"] = e.color;
    attr["data-desc-align"] = e.align;
    cmp.setAttributes(attr);

    let r = props.editor.Css.getRule(`#${attr.id} .accordion-body`);
    let css = {};
    if (r) css = r.attributes.style;
    css["font-family"] = e.font;
    css["color"] = e.color;
    css["text-align"] = e.align;
    css["font-weight"] = e.variant;
    css["font-size"] = e.size.desktop + "px";
    css["line-height"] = e.line.desktop + "px";
    props.editor.Css.setRule(`#${attr.id} .accordion-body`, css);

    let r_tablet = props.editor.Css.getRule(`#${attr.id} .accordion-body`, {
      atRuleType: "media",
      atRuleParams: "(min-width: 768px) and (max-width: 991px)",
    });
    let cssTablet = {};
    if (r_tablet) cssTablet = r_tablet.attributes.style;
    cssTablet["font-size"] = e.size.tablet + "px";
    cssTablet["line-height"] = e.line.tablet + "px";
    props.editor.Css.remove(r_tablet);
    props.editor.Css.remove(`#${attr.id} .accordion-body`, {
      atRuleType: "media",
      atRuleParams: "(min-width:768px) and (max-width:991px)",
    });
    props.editor.Css.setRule(`#${attr.id} .accordion-body`, cssTablet, {
      atRuleType: "media",
      atRuleParams: "(min-width:768px) and (max-width:991px)",
    });

    let r_Mobile = props.editor.Css.getRule(`#${attr.id} .accordion-body`, {
      atRuleType: "media",
      atRuleParams: "(max-width: 67px)",
    });
    let cssMobile = {};
    if (r_Mobile) cssMobile = r_Mobile.attributes.style;

    cssMobile["font-size"] = `${e.size.mobile}px`;
    cssMobile["line-height"] = `${e.line.mobile}px`;

    props.editor.Css.remove(r_Mobile);
    props.editor.Css.remove(`#${attr.id} .accordion-body`, {
      atRuleType: "media",
      atRuleParams: "(max-width:767px)",
    });
    props.editor.Css.setRule(`#${attr.id} .accordion-body`, cssMobile, {
      atRuleType: "media",
      atRuleParams: "(max-width:767px)",
    });

    setConfigDesc(e);
    props.editor.setStyle(props.editor.getCss());
    cmp.view.render();
  };

  const changeEspacementConfig = (e) => {
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-desc-padding"] = JSON.stringify(e.padding);
    attr["data-desc-margin"] = JSON.stringify(e.margin);

    cmp.setAttributes(attr);
    let r = props.editor.Css.getRule(`#${attr.id}`);
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
    props.editor.Css.setRule(`#${attr.id}`, css);
    setConfigEspacement(e);
    props.editor.setStyle(props.editor.getCss());
    cmp.view.render();
  };
  const changeEspacementConfigItem = (e) => {
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-item-padding"] = JSON.stringify(e.padding);
    attr["data-item-margin"] = JSON.stringify(e.margin);

    cmp.setAttributes(attr);

    let r = props.editor.Css.getRule(`#${attr.id} .accordion-item`);
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
    props.editor.Css.setRule(`#${attr.id} .accordion-item`, css);
    setConfigEspacementItem(e);
    props.editor.setStyle(props.editor.getCss());
    cmp.view.render();
  };
  const changeArrandistitleConfig = (e) => {
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-ongle-raduis"] = JSON.stringify(e.arrondis);
    cmp.setAttributes(attr);

    let r = props.editor.Css.getRule(`#${attr.id} .accordion-button`);
    let css = [];
    if (r) css = r.attributes.style;
    css["border-top-left-radius"] = e.arrondis.topLeft + "px";
    css["border-top-right-radius"] = e.arrondis.topRight + "px";
    css["border-bottom-left-radius"] = e.arrondis.bottomLeft + "px";
    css["border-bottom-right-radius"] = e.arrondis.bottomRight + "px";
    props.editor.Css.remove(r);
    props.editor.Css.setRule(`#${attr.id} .accordion-button`, css);
    setConfigAccordionRaduis(e);
    props.editor.setStyle(props.editor.getCss());
    cmp.view.render();
  };
  const changeArrandisConfigIcon = (e) => {
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-icon-raduis"] = JSON.stringify(e.arrondis);
    cmp.setAttributes(attr);
    let r = props.editor.Css
      .getRule(`#${attr.id} .accordion-button .iconAccordion,#${attr.id} .accordion-button .iconAccordion,
    #${attr.id} .accordion-button.collapsed .iconAccordion,#${attr.id} .accordion-button.collapsed .iconAccordion`);
    let css = [];
    if (r) css = r.attributes.style;
    css["border-top-left-radius"] = e.arrondis.topLeft + "px";
    css["border-top-right-radius"] = e.arrondis.topRight + "px";
    css["border-bottom-left-radius"] = e.arrondis.bottomLeft + "px";
    css["border-bottom-right-radius"] = e.arrondis.bottomRight + "px";
    props.editor.Css.remove(r);
    props.editor.Css.setRule(
      `#${attr.id} .accordion-button .iconAccordion,#${attr.id} .accordion-button .iconAccordion,
      #${attr.id} .accordion-button.collapsed .iconAccordion,#${attr.id} .accordion-button.collapsed .iconAccordion`,
      css
    );
    setConfigAccordionRaduisIcon(e);
    props.editor.setStyle(props.editor.getCss());
    cmp.view.render();
  };

  useEffect(() => {
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    let modelKey = cmp.getClasses().filter((x) => x.indexOf("Model") > -1);
    setSelectedItem(modelKey);
    const config = {
      font: attr["data-onglet-font"] ? attr["data-onglet-font"] : "",
      variant: attr["data-onglet-variant"]
        ? attr["data-onglet-variant"]
        : "normal",
      size: attr["data-onglet-size"]
        ? JSON.parse(attr["data-onglet-size"])
        : { desktop: "16", tablet: "16", mobile: "16" },
      line: attr["data-onglet-line"]
        ? JSON.parse(attr["data-onglet-line"])
        : { desktop: "16", tablet: "16", mobile: "16" },
      color: attr["data-onglet-color"] ? attr["data-onglet-color"] : "#000000",
      type: attr["data-bordure-style"] ? attr["data-bordure-style"] : "solid",
      typeof: attr["data-bordure-size"] ? attr["data-bordure-size"] : 0,
    };
    setConfigOnglet(config);

    const config2 = {
      font: attr["data-desc-font"] ? attr["data-desc-font"] : "",
      variant: attr["data-desc-variant"] ? attr["data-desc-variant"] : "normal",
      size: attr["data-desc-size"]
        ? JSON.parse(attr["data-desc-size"])
        : { desktop: "16", tablet: "16", mobile: "16" },
      line: attr["data-desc-line"]
        ? JSON.parse(attr["data-desc-line"])
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
            },
            {
              id: "tab-" + uuidv4(),
              title: `Title or question 2`,
              type: "h3",
              description: "Contenu du item two",
            },
            {
              id: "tab-" + uuidv4(),
              title: `Title or question 3`,
              type: "h3",
              description: "Contenu du item thre",
            },
          ]
    );
  }, []);
  useEffect(() => {
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    let tabNavs = cmp.find(".accordionss")[0];
    let tabsNavsHtml = ``;
    items.map((item, i) => {
      const isShowClass = !isActive && i === 0 ? "show" : "";
      tabsNavsHtml += `
      <div  class="accordion-item">
      <${item.type} class="accordion-header" id="${item.id}-tab">
      <button class="accordion-button" id="${item.id}-tab" data-bs-toggle="collapse" data-bs-target="#${item.id}" type="button"  aria-controls="${item.id}" aria-selected="true">
      <div class="iconAccordion "></div>
      ${item.title}</button>
      </${item.type}>
      <div id="${item.id}"class="accordion-collapse collapse  ${isShowClass}" aria-labelledby="${item.id}-tab" data-bs-parent="#${attr.id}">
      <div class="accordion-body">
       <p> ${item.description}</p>
      </div>
       </div>
       </div>`;
    });

    if (tabNavs) {
      tabNavs.components(tabsNavsHtml);
    }

    attr["data-items"] = JSON.stringify(items);
    attr["data-el-style"] = isActive;
    cmp.setAttributes(attr);
    cmp.view.render();
    props.editor.setStyle(props.editor.getCss());
  }, [items, isActive]);
  useEffect(() => {}, [
    configOnglet,
    configDesc,
    configEspacement,
    configEspacementItem,
  ]);
  useEffect(() => {
    setIcons(fsList);
  }, []);
  useEffect(() => {}, [icons]);
  useEffect(() => {}, [configAccordionRaduis, configAccordionRaduisIcon]);
  useEffect(() => {}, [selectedItem]);
  useEffect(() => {}, [icons, selectedIcon]);
  useEffect(() => {}, [isActive]);

  return (
    <div id="modalgallery">
      <Modal
        dialogAs={DraggableModalDialog}
        show={show}
        backdrop="static"
        onHide={handleClose}
        id="ModalAccordion"
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
                  Desgin
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
            >
              <span className="title-popups">Contenu Accordéon</span>

              <div className="structmodals">
                <div
                  className={
                    selectedItemId != null ? "itemdrag active" : "itemdrag"
                  }
                >
                  <label className="  p-3 ">
                    Elements
                    <sup>
                      <b>({items.length})</b>
                    </sup>
                  </label>
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
                  <div className="form-check form-switch p-3">
                    {!isActive ? (
                      <label className="form-check-label">
                        Montrer le premier élément développé
                      </label>
                    ) : (
                      <label className="form-check-label">
                        Ne montrer qu'un élément développé
                      </label>
                    )}

                    <input
                      className={`form-check-input ${isActive ? "active" : ""}`}
                      type="checkbox"
                      checked={!isActive}
                      onChange={Activefirstelement}
                    />
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
                              <div className="p-1">
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
              <span className="title-popups">Design Accordéon</span>
              <nav id="navbar-example2" class="navbar bg-light px-3 mb-3">
                <ul class="nav nav-pills">
                  <li class="nav-item">
                    <a class="nav-link" href="#scrollspyHeading2">
                      Titres
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#scrollspyHeading3">
                      Survol
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#scrollspyHeading4">
                      Description
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#scrollspyHeading5">
                      Icons
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#scrollspyHeading1">
                      Espacement
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
                  <span className="titre mt-2 mb-2 ">Mise en page</span>
                  <div className="d-flex justify-content-center align-items-center mb-3">
                    <div className="panelContnet">
                      <div className="btn-group dropend">
                        <img
                          src={
                            selectedItem === "AccordionModelOne"
                              ? AccordionModelOne
                              : selectedItem === "AccordionModelTwo"
                              ? AccordionModelTwo
                              : selectedItem === "AccordionModelThree"
                              ? AccordionModelThree
                              : selectedItem === "AccordionModelFour"
                              ? AccordionModelFour
                              : AccordionModelThree
                          }
                          className="img imgReseau  ms-3 me-3 rounded-0 "
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        />
                        <i
                          className="dropdown-toggle m-3"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        ></i>
                        <ul className="dropdown-menu preview-options pt-3 pb-3">
                          <span class="titredropdown m-3">
                            Sélectionner la mise en page
                          </span>
                          <div
                            onClick={(e) => changeStyle("AccordionModelOne")}
                            className={
                              selectedItem === "AccordionModelOne"
                                ? "selecterd mb-3 imgstype"
                                : "mb-3 imgstype"
                            }
                          >
                            <img
                              src={AccordionModelOne}
                              alt={AccordionModelOne}
                            />
                          </div>
                          <div
                            onClick={(e) => changeStyle("AccordionModelTwo")}
                            className={
                              selectedItem === "AccordionModelTwo"
                                ? "selecterd mb-3 imgstype"
                                : "mb-3 imgstype"
                            }
                          >
                            <img
                              src={AccordionModelTwo}
                              alt={AccordionModelOne}
                            />
                          </div>
                          <div
                            onClick={(e) => changeStyle("AccordionModelThree")}
                            className={
                              selectedItem === "AccordionModelThree"
                                ? "selecterd mb-3 imgstype"
                                : "mb-3 imgstype"
                            }
                          >
                            <img
                              src={AccordionModelThree}
                              alt={AccordionModelOne}
                            />
                          </div>
                          <div
                            onClick={(e) => changeStyle("AccordionModelFour")}
                            className={
                              selectedItem === "AccordionModelFour"
                                ? "selecterd mb-3 imgstype"
                                : "mb-3 imgstype"
                            }
                          >
                            <img
                              src={AccordionModelFour}
                              alt={AccordionModelFour}
                            />
                          </div>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="scrolly">
                  <div className="firstdivplus">
                    <span className="titre  mt-4 mb-4">Style</span>

                    <div class="accordion" id="accordionExample">
                      <div class="accordion-item" id="scrollspyHeading2">
                        <h2 class="accordion-header" id="headingOne">
                          <button
                            class="accordion-button"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseOne"
                            aria-expanded="true"
                            aria-controls="collapseOne"
                          >
                            Styles titres
                          </button>
                        </h2>
                        <div
                          id="collapseOne"
                          class="accordion-collapse collapse show"
                          aria-labelledby="headingOne"
                          data-bs-parent="#accordionExample"
                        >
                          <div class="accordion-body alignementtext">
                            <TextStylingComponent
                              key={"onglet"}
                              for={"onglet"}
                              editor={props.editor}
                              siteId={props.siteId}
                              config={configOnglet}
                              setConfig={changeOngletConfig}
                            />
                            <div className="mt-3 mb-3">
                              <BorderConfig
                                key={"bordertitle"}
                                for={"bordertitle"}
                                editor={props.editor}
                                siteId={props.siteId}
                                config={configBorder}
                                setConfig={changeBorderHeader}
                              />
                            </div>
                            <div className="d-flex justify-content-between align-items-center mb-2">
                              <div className="blockTitle m-2">
                                Couleur d'arrière-plan
                              </div>
                              <ColorConfig
                                key={"headeracoordion"}
                                for={"headeracoordion"}
                                editor={props.editor}
                                siteId={props.siteId}
                                config={configBgHeader}
                                setConfig={changeBgHeader}
                              />
                            </div>
                            <div className="d-flex justify-content-between align-items-center mb-3">
                              <div className="panelTitle">
                                Orientation des elements
                              </div>
                              <div className="panelContnet d-flex align-items-center">
                                <div className="radio-btns-group">
                                  <input
                                    type="radio"
                                    name="row"
                                    id="row"
                                    checked={posAlignTitre.align == "row"}
                                    value="row"
                                    className="RadioInput"
                                    onChange={(e) =>
                                      changePostionIcon(e.target.value)
                                    }
                                  />
                                  <label htmlFor="row" className="RadioLabel">
                                    <i class="fa-solid fa-arrow-left"></i>
                                  </label>
                                  <input
                                    type="radio"
                                    name="row-reverse"
                                    id="row-reverse"
                                    checked={
                                      posAlignTitre.align == "row-reverse"
                                    }
                                    value="row-reverse"
                                    className="RadioInput"
                                    onChange={(e) =>
                                      changePostionIcon(e.target.value)
                                    }
                                  />
                                  <label
                                    htmlFor="row-reverse"
                                    className="RadioLabel"
                                  >
                                    <i class="fa-solid fa-arrow-right"></i>
                                  </label>
                                </div>
                              </div>
                            </div>
                            <div className="d-flex justify-content-between align-items-center mb-2">
                              <div class="panelTitle">Arrondis de titre</div>
                              <ArrondisConfigAccordion
                                editor={props.editor}
                                siteId={props.siteId}
                                config={configAccordionRaduis}
                                setConfig={changeArrandistitleConfig}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* <div class="accordion-item" id="scrollspyHeading3">
                        <h2 class="accordion-header" id="headingTwo">
                          <button
                            class="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseTwo"
                            aria-expanded="true"
                            aria-controls="collapseTwo"
                          >
                            Styles titres survol
                          </button>
                        </h2>
                        <div
                          id="collapseTwo"
                          class="accordion-collapse collapse show"
                          aria-labelledby="headingTwo"
                          data-bs-parent="#accordionExample"
                        >
                          <div class="accordion-body">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                              <span>Couleur Survol titre active</span>
                              <ColorConfig
                                key={"hovertitle"}
                                for={"hovertitle"}
                                editor={props.editor}
                                siteId={props.siteId}
                                config={configHoverTitle}
                                setConfig={changeHoverTitle}
                              />
                            </div>
                            <div className="d-flex justify-content-between align-items-center mb-3">
                              <span>Couleur Survol titre</span>
                              <ColorConfig
                                key={"hovertitlec"}
                                for={"hovertitlec"}
                                editor={props.editor}
                                siteId={props.siteId}
                                config={configHoverTitleColapsed}
                                setConfig={changeBgHeaderColapsed}
                              />
                            </div>
                            <div className="d-flex justify-content-between align-items-center mb-3">
                              <span>Couleur du fond active</span>
                              <ColorConfig
                                key={"hoverbtn-header"}
                                for={"hoverbtn"}
                                editor={props.editor}
                                siteId={props.siteId}
                                config={configHoverBtnActive}
                                setConfig={changeHoverBtnActive}
                              />
                            </div>
                            <div className="d-flex justify-content-between align-items-center mb-3">
                              <span>Couleur du fond au survol</span>
                              <ColorConfig
                                key={"hoverbtn-header"}
                                for={"hoverbtn"}
                                editor={props.editor}
                                siteId={props.siteId}
                                config={configHoverBtn}
                                setConfig={changeHoverBtn}
                              />
                            </div>
                          </div>
                        </div>
                      </div> */}

                      <div class="accordion-item" id="scrollspyHeading4">
                        <h2 class="accordion-header" id="headingthree">
                          <button
                            class="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapsethree"
                            aria-expanded="true"
                            aria-controls="collapsethree"
                          >
                            Style de description
                          </button>
                        </h2>
                        <div
                          id="collapsethree"
                          class="accordion-collapse collapse show"
                          aria-labelledby="headingthree"
                          data-bs-parent="#accordionExample"
                        >
                          <div class="accordion-body">
                            <TextStylingComponent
                              key={"description"}
                              for={"description"}
                              editor={props.editor}
                              siteId={props.siteId}
                              config={configDesc}
                              setConfig={changeDescConfig}
                            />

                            <div className="d-flex justify-content-between align-items-center mb-3">
                              <span>Couleur d'arrière-plan</span>
                              <ColorConfig
                                key={"hoverbtn-header"}
                                for={"hoverbtn"}
                                editor={props.editor}
                                siteId={props.siteId}
                                config={configBgDescription}
                                setConfig={changeBgDescription}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="accordion-item" id="scrollspyHeading5">
                        <h2 class="accordion-header" id="headingfour">
                          <button
                            class="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapsefour"
                            aria-expanded="true"
                            aria-controls="collapsefour"
                          >
                            Style des icons
                          </button>
                        </h2>
                        <div
                          id="collapsefour"
                          class="accordion-collapse collapse show"
                          aria-labelledby="headingfour"
                          data-bs-parent="#accordionExample"
                        >
                          <div class="accordion-body">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                              <span>Couleur icon</span>
                              <div className="inputColor d-flex justify-content-end  ms-1 ">
                                <div
                                  className="colorPreview"
                                  onClick={getPrimaryColorIcon}
                                >
                                  <span
                                    className="color-value"
                                    style={{
                                      background: blockPickerColorIcon.rgbTxt,
                                    }}
                                  ></span>
                                </div>
                                {isActivePaletteIcon ? (
                                  <div className="sketch-popeover">
                                    <div
                                      className="sketch-cover"
                                      onClick={(e) => handleCloseColorIcon()}
                                    />
                                    <SketchPicker
                                      color={blockPickerColorIcon.rgb}
                                      onChangeComplete={(color) =>
                                        changeColorIcon(color)
                                      }
                                    />
                                  </div>
                                ) : null}
                              </div>
                            </div>
                            <div className="d-flex justify-content-between align-items-center mb-3">
                              <span> Arrière-plan de icon</span>
                              <div className="inputColor d-flex justify-content-end  ms-1 ">
                                <div
                                  className="colorPreview"
                                  onClick={getPrimaryColorBgIcon}
                                >
                                  <span
                                    className="color-value"
                                    style={{
                                      background: blockPickerColorBgIcon.rgbTxt,
                                    }}
                                  ></span>
                                </div>
                                {isActivePaletteBgIcon ? (
                                  <div className="sketch-popeover">
                                    <div
                                      className="sketch-cover"
                                      onClick={(e) => handleCloseColorBgIcon()}
                                    />
                                    <SketchPicker
                                      color={blockPickerColorBgIcon.rgb}
                                      onChangeComplete={(color) =>
                                        changeColorBgIcon(color)
                                      }
                                    />
                                  </div>
                                ) : null}
                              </div>
                            </div>
                            <div className="d-flex justify-content-between align-items-center mb-3">
                              <span className="d-block">Choisir l'icône</span>
                              <div
                                onClick={(e) => setShowStylesIconsList(true)}
                              >
                                <div
                                  className={selectedIcon + " iconPreview"}
                                ></div>
                              </div>
                            </div>
                            <div
                              className={
                                showStylesIconsList
                                  ? "d-block icon-list"
                                  : "d-none"
                              }
                            >
                              <div class="text-end mb-3">
                                <button
                                  type="button"
                                  onClick={handleCloseStylesIconsList}
                                  class="btn-close"
                                  aria-label="Close"
                                ></button>
                                <span className="title-popups">
                                  Choisir l'icône
                                </span>
                                <div class="form-group mb-3">
                                  <input
                                    class="form-control icp icp-auto"
                                    type="text"
                                    onChange={(e) => filtre(e.target.value)}
                                    placeholder="Chercher votre icon ici..."
                                  />
                                </div>
                                <div className="iconsList">
                                  <div className="d-flex justify-content-around align-items-center flex-wrap gap-3 mt-3">
                                    {Object.values(icons)?.map((icon) => {
                                      return (
                                        <i
                                          onClick={(e) => {
                                            setIconButton(
                                              icon.unicode,
                                              icon.type + " fa-" + icon.name
                                            );
                                            setSelectedIcon(
                                              icon.type + " fa-" + icon.name
                                            );
                                          }}
                                          className={
                                            icon.type +
                                            " fa-" +
                                            icon.name +
                                            " icon"
                                          }
                                        ></i>
                                      );
                                    })}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="d-flex justify-content-between align-items-center mb-2">
                              <div class="panelTitle">Arrondis d'icon</div>
                              <ArrondisConfigAccordion
                                editor={props.editor}
                                siteId={props.siteId}
                                config={configAccordionRaduisIcon}
                                setConfig={changeArrandisConfigIcon}
                              />
                            </div>
                            <div className="d-flex justify-content-between align-items-center mb-3">
                              <div className="panelTitle  ">
                                Espacement entre les elements{" "}
                              </div>
                              <input
                                type="range"
                                min="0"
                                max="50"
                                step="1"
                                className="rangeInput me-2"
                                value={espacementIcon.espacement}
                                onChange={(e) =>
                                  changeEspaceIcon(e.target.value)
                                }
                              />
                              <div className="input-with-label-pixel">
                                <span className="pixel-label"> px</span>
                                <input
                                  min="0"
                                  max="50"
                                  className="form-control form-control-sm input-small-pixel"
                                  type="number"
                                  value={espacementIcon.espacement}
                                  onChange={(e) =>
                                    changeEspaceIcon(e.target.value)
                                  }
                                />
                              </div>
                            </div>
                            <div className="d-flex justify-content-between align-items-center mb-3">
                              <div className="panelTitle  ">
                                Taille du icon{" "}
                              </div>
                              <input
                                type="range"
                                min="0"
                                max="100"
                                step="1"
                                className="rangeInput me-2"
                                value={SizeIcon.size}
                                onChange={(e) => changeSizeIcon(e.target.value)}
                              />
                              <div className="input-with-label-pixel">
                                <span className="pixel-label"> px</span>
                                <input
                                  min="0"
                                  max="100"
                                  className="form-control form-control-sm input-small-pixel"
                                  type="number"
                                  value={SizeIcon.size}
                                  onChange={(e) =>
                                    changeSizeIcon(e.target.value)
                                  }
                                />
                              </div>
                            </div>
                            <div className="d-flex justify-content-between align-items-center mb-3">
                              <div className="panelTitle  ">
                                Taille du fond icon{" "}
                              </div>
                              <input
                                type="range"
                                min="0"
                                max="50"
                                step="1"
                                className="rangeInput me-2"
                                value={espacementIconPaddings.espacementP}
                                onChange={(e) =>
                                  changeEspaceIconPadding(e.target.value)
                                }
                              />
                              <div className="input-with-label-pixel">
                                <span className="pixel-label"> px</span>
                                <input
                                  min="0"
                                  max="50"
                                  className="form-control form-control-sm input-small-pixel"
                                  type="number"
                                  value={espacementIconPaddings.espacementP}
                                  onChange={(e) =>
                                    changeEspaceIconPadding(e.target.value)
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="accordion-item" id="scrollspyHeading1">
                        <h2 class="accordion-header" id="headingfive">
                          <button
                            class="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapsefive"
                            aria-expanded="true"
                            aria-controls="collapsefive"
                          >
                            Espacements entre les angles
                          </button>
                        </h2>
                        <div
                          id="collapsefive"
                          class="accordion-collapse collapse show"
                          aria-labelledby="headingfive"
                          data-bs-parent="#accordionExample"
                        >
                          <div class="accordion-body">
                      
                            <EspacementConfig
                              key={"item"}
                              for={"item"}
                              editor={props.editor}
                              siteId={props.siteId}
                              config={configEspacementItem}
                              setConfig={changeEspacementConfigItem}
                            />
                          </div>
                        </div>
                      </div>
                      <div class="accordion-item">
                        <h2 class="accordion-header" id="headingseven">
                          <button
                            class="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseseven"
                            aria-expanded="true"
                            aria-controls="collapseseven"
                          >
                            Espacements section
                          </button>
                        </h2>
                        <div
                          id="collapseseven"
                          class="accordion-collapse collapse show"
                          aria-labelledby="headingseven"
                          data-bs-parent="#accordionExample"
                        >
                          <div class="accordion-body">
                          <div className="mt-3 mb-3">
                              <BorderConfig
                                key={"borderitem"}
                                for={"borderitem"}
                                editor={props.editor}
                                siteId={props.siteId}
                                config={configBorderItem}
                                setConfig={changeBordertem}
                              />
                            </div>
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
    </div>
  );
}
