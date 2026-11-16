import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import ModalDialog from "react-bootstrap/ModalDialog";
import Draggable from "react-draggable";

import "./ModalButton.css";

import fsList from "../../../../../assets/fonts/fs.json";

import axios from "axios";
import EspacementConfig from "../../../compoments/Espacement/EspacementConfig";
import ColorConfig from "../../../compoments/Color/ColorConfig";
import BorderConfig from "../../../compoments/Border/BorderConfig";
import IconConfig from "../../../compoments/Icon/IconConfig";
import TextStylingComponent from "../../../compoments/TextStyling/TextStylingComponent";
import ArrondisConfigAccordion from "../../../compoments/Arrondis/ArrondisConfig";
import OmbreConfig from "../../../compoments/Ombre/OmbreConfig";
class DraggableModalDialog extends React.Component {
  render() {
    return (
      <Draggable handle=".handleDrag">
        <ModalDialog {...this.props} />
      </Draggable>
    );
  }
}
export default function ModalButton(props) {
  // const [showStylesIconsList, setShowStylesIconsList] = useState(false);
  const [showStylesList, setShowStylesList] = useState(false);
  // const [selectedIcon, setSelectedIcon] = useState(
  //   props.editor.getSelected().getAttributes()["data-icon"]
  //     ? props.editor.getSelected().getAttributes()["data-icon"]
  //     : "fa fa-user"
  // );
  const [pages, setPages] = useState([]);
  // const [selectedFont, setSelectedFont] = useState({});
  const [isGlobalStyle, setIsGlobalStyle] = useState(
    props.editor.getSelected().getAttributes()["data-isglobalstyling"]
      ? props.editor.getSelected().getAttributes()["data-isglobalstyling"]
      : "true"
  );
  const [size, setSize] = useState(
    props.editor.getSelected().getAttributes()["data-size"]
      ? JSON.parse(props.editor.getSelected().getAttributes()["data-size"])
      : {
          desktop: props.editor.getSelected().getAttributes()[
            "data-width-desktop"
          ]
            ? JSON.parse(
                props.editor.getSelected().getAttributes()["data-width-desktop"]
              )
            : "301",
          tablet: props.editor.getSelected().getAttributes()[
            "data-width-tablet"
          ]
            ? JSON.parse(
                props.editor.getSelected().getAttributes()["data-width-tablet"]
              )
            : "301",
          mobile: props.editor.getSelected().getAttributes()[
            "data-width-mobile"
          ]
            ? JSON.parse(
                props.editor.getSelected().getAttributes()["data-width-mobile"]
              )
            : "301",
        }
  );
  const [configBtnText, setConfigBtnText] = useState({
    font: props.editor.getSelected().getAttributes()["data-text-font"]
      ? props.editor.getSelected().getAttributes()["data-text-font"]
      : "",
    variant: props.editor.getSelected().getAttributes()["data-text-variant"]
      ? props.editor.getSelected().getAttributes()["data-text-variant"]
      : "normal",
    color: props.editor.getSelected().getAttributes()["data-text-color"]
      ? props.editor.getSelected().getAttributes()["data-text-color"]
      : "normal",
    align: props.editor.getSelected().getAttributes()["data-text-align"]
      ? props.editor.getSelected().getAttributes()["data-text-align"]
      : "center",
    size: props.editor.getSelected().getAttributes()["data-text-size"]
      ? JSON.parse(props.editor.getSelected().getAttributes()["data-text-size"])
      : { desktop: "16", tablet: "16", mobile: "16" },
  });
  const [configRaduis, setConfigRaduis] = useState({
    arrondis: props.editor.getSelected().getAttributes()["data-raduis"]
      ? JSON.parse(props.editor.getSelected().getAttributes()["data-raduis"])
      : {
          topLeft: "auto",
          topRight: "auto",
          bottomLeft: "auto",
          bottomRight: "auto",
        },
  });
  const [position, setPosition] = useState(
    props.editor.getSelected().getAttributes()["data-position"]
      ? props.editor.getSelected().getAttributes()["data-position"]
      : "start"
  );
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
   const [configBorderHover, setConfigBorderHover] = useState({
    typeborder: props.editor.getSelected().getAttributes()["data-borderhover-type"]
      ? props.editor.getSelected().getAttributes()["data-borderhover-type"]
      : "all",
    size: props.editor.getSelected().getAttributes()["data-borderhover-size"]
      ? JSON.parse(
          props.editor.getSelected().getAttributes()["data-borderhover-size"]
        )
      : {
          all: "1",
          top: "1",
          left: "1",
          right: "1",
          bottom: "1",
        },

    style: props.editor.getSelected().getAttributes()["data-borderhover-style"]
      ? props.editor.getSelected().getAttributes()["data-border-style"]
      : "solid",

    color: props.editor.getSelected().getAttributes()["data-borderhover-color"]
      ? props.editor.getSelected().getAttributes()["data-borderhover-color"]
      : "#eee",
  });

  const [Icon, setIcon] = useState(
    props.editor.getSelected().getAttributes()["data-icon"] &&
      props.editor.getSelected().getAttributes()["data-icon"].indexOf("{") > -1
      ? JSON.parse(props.editor.getSelected().getAttributes()["data-icon"])
      : {
          type: "icon",
          icon: props.editor.getSelected().getAttributes()["data-icon"]
            ? props.editor.getSelected().getAttributes()["data-icon"]
            : "fas fa-user",
          unicode: props.editor.getSelected().getAttributes()[
            "data-icon-unicode"
          ]
            ? props.editor.getSelected().getAttributes()["data-icon-unicode"]
            : "\f007",
          size: 30,
          color: "#000",
        }
  );

  const [icons, setIcons] = useState([{}]);
  const [configEspacement, setConfigEspacement] = useState({
    padding: props.editor.getSelected().getAttributes()["data-btn-padding"]
      ? JSON.parse(
          props.editor.getSelected().getAttributes()["data-btn-padding"]
        )
      : {
          top: "15",
          left: "15",
          right: "15",
          bottom: "15",
        },
    margin: props.editor.getSelected().getAttributes()["data-btn-margin"]
      ? JSON.parse(
          props.editor.getSelected().getAttributes()["data-btn-margin"]
        )
      : {
          top: "0",
          left: "0",
          right: "0",
          bottom: "0",
        },
  });
  useEffect(() => {}, [configEspacement]);
  // const [fonts, setFonts] = useState([{}]);
  // const [fontSize, setFontSize] = useState({
  //   desktop: "16",
  //   tablet: "16",
  //   mobile: "16",
  // });
  // const filtre = (value) => {
  //   let filtred;
  //   if (value != "") {
  //     filtred = Object.values(icons).filter((item) =>
  //       item.name.toLowerCase().match(value.toLowerCase())
  //     );

  //     setIcons(filtred);
  //   } else {
  //     setIcons(fsList);
  //   }
  // };
  useEffect(() => {}, [icons, size]);

  // const [height, setHeight] = useState({
  //   desktop: props.editor.getSelected().getAttributes()["data-height-desktop"]
  //     ? props.editor.getSelected().getAttributes()["data-height-desktop"]
  //     : "55",
  //   tablet: props.editor.getSelected().getAttributes()["data-height-tablet"]
  //     ? props.editor.getSelected().getAttributes()["data-height-tablet"]
  //     : "55",
  //   mobile: props.editor.getSelected().getAttributes()["data-height-mobile"]
  //     ? props.editor.getSelected().getAttributes()["data-height-mobile"]
  //     : "55",
  // });
  // const [width, setWidth] = useState({
  //   desktop: props.editor.getSelected().getAttributes()["data-width-desktop"]
  //     ? props.editor.getSelected().getAttributes()["data-width-desktop"]
  //     : "250",
  //   tablet: props.editor.getSelected().getAttributes()["data-width-tablet"]
  //     ? props.editor.getSelected().getAttributes()["data-width-tablet"]
  //     : "250",
  //   mobile: props.editor.getSelected().getAttributes()["data-width-mobile"]
  //     ? props.editor.getSelected().getAttributes()["data-width-mobile"]
  //     : "250",
  // });
  // const [fontVariant, setFontVariant] = useState(
  //   props.editor.getSelected().getAttributes()["data-variant"]
  //     ? props.editor.getSelected().getAttributes()["data-variant"]
  //     : "500"
  // );

  // const [styleGlobal, setStyleGlobal] = useState();
  // const [model, setModel] = useState(
  //   props.editor.getSelected().getAttributes()["data-model"]
  //     ? props.editor.getSelected().getAttributes()["data-model"]
  //     : "modelOne"
  // );
  const [style, setStyle] = useState(
    props.editor.getSelected().getAttributes()["data-style"]
      ? props.editor.getSelected().getAttributes()["data-style"]
      : "styleOne"
  );

  const [selectedType, setSelectedType] = useState("page");
  const [selectedTel, setSelectedTel] = useState("#");
  const [selectedPage, setSelectedPage] = useState("#");
  const [selectedPopup, setSelectedPopup] = useState("#");

  // const [bordure, setBordure] = useState(
  //   props.editor.getSelected().getAttributes()["data-bordure-width"]
  //     ? props.editor.getSelected().getAttributes()["data-bordure-width"]
  //     : "0"
  // );
  const [selectedUrl, setSelectedUrl] = useState("#");
  const [popups, setPopups] = useState([]);
  const [text, setText] = useState(
    props.editor.getSelected().getAttributes()["data-value"]
  );

  const [show, setShow] = useState(true);

  const rgbtoJson = (rgbString) => {
    var s = rgbString;
    s = s.replace("rgb(", "");
    s = s.replace(")", "");
    let c = s.split(",");
    return { r: c[0], g: c[1], b: c[2], a: c[3] };
  };
  const [isActivePalette, setActivepalette] = useState(false);
  const [isActivePalette2, setActivepalette2] = useState(false);
  // const [isActivePalette3, setActivepalette3] = useState(false);
  // const [isActivePalette4, setActivepalette4] = useState(false);
  // const [isActivePalette5, setActivepalette5] = useState(false);
  // const [isActivePalette6, setActivepalette6] = useState(false);
  const [blockPickerColor, setBlockPickerColor] = useState({
    rgbTxt: props.editor.getSelected().getAttributes()["data-color"]
      ? props.editor.getSelected().getAttributes()["data-color"]
      : "#00000000",
    rgb: rgbtoJson(
      props.editor.getSelected().getAttributes()["data-color"]
        ? props.editor.getSelected().getAttributes()["data-color"]
        : "#00000000"
    ),
  });
  // const handleCloseColor = () => {
  //   setActivepalette(false);
  // };
  // const getPrimaryColor = () => {
  //   if (isActivePalette === true) {
  //     setActivepalette(false);
  //   } else {
  //     setActivepalette(true);
  //   }
  // };
  // const changeColor = (color) => {
  //   setBlockPickerColor({
  //     rgbTxt:
  //       "rgb(" +
  //       color.rgb.r +
  //       ", " +
  //       color.rgb.g +
  //       ", " +
  //       color.rgb.b +
  //       "," +
  //       color.rgb.a +
  //       ")",
  //     rgb: color.rgb,
  //   });
  // };
  const [blockPickerColor2, setBlockPickerColor2] = useState({
    rgbTxt: props.editor.getSelected().getAttributes()["data-bg"]
      ? props.editor.getSelected().getAttributes()["data-bg"]
      : "#fff",
    rgb: rgbtoJson(
      props.editor.getSelected().getAttributes()["data-bg"]
        ? props.editor.getSelected().getAttributes()["data-bg"]
        : "#fff"
    ),
  });
  // const handleCloseColor2 = () => {
  //   setActivepalette2(false);
  // };
  // const getPrimaryColor2 = () => {
  //   if (isActivePalette2 === true) {
  //     setActivepalette2(false);
  //   } else {
  //     setActivepalette2(true);
  //   }
  // };

  const [blockPickerColor3, setBlockPickerColor3] = useState({
    rgbTxt: props.editor.getSelected().getAttributes()["data-color-hover"]
      ? props.editor.getSelected().getAttributes()["data-color-hover"]
      : "#000",
    rgb: rgbtoJson(
      props.editor.getSelected().getAttributes()["data-color-hover"]
        ? props.editor.getSelected().getAttributes()["data-color-hover"]
        : "#000"
    ),
  });

  const [blockPickerColor4, setBlockPickerColor4] = useState({
    rgbTxt: props.editor.getSelected().getAttributes()["data-bg-survol"]
      ? props.editor.getSelected().getAttributes()["data-bg-survol"]
      : "#fff",
    rgb: rgbtoJson(
      props.editor.getSelected().getAttributes()["data-bg-survol"]
        ? props.editor.getSelected().getAttributes()["data-bg-survol"]
        : "#fff"
    ),
  });

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
  const [isActiveOmbre, setIsActiveOmbre] = useState(
    props.editor.getSelected().getAttributes()["data-ombre-isActive"]
      ? props.editor.getSelected().getAttributes()["data-ombre-isActive"]
      : false
  );
  const [shadow, setShadow] = useState({
    type: props.editor.getSelected().getAttributes()["data-ombre-type"]
      ? props.editor.getSelected().getAttributes()["data-ombre-type"]
      : "",
    size: props.editor.getSelected().getAttributes()["data-ombre-size"]
      ? props.editor.getSelected().getAttributes()["data-ombre-size"]
      : "",
  });
  const changeArrandisConfig = (e) => {
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-raduis"] = JSON.stringify(e.arrondis);
    cmp.setAttributes(attr);
    setConfigRaduis(e);
    let r = props.editor.Css.getRule(`#${attr.id}`);
    let css = [];
    if (r) css = r.attributes.style;

    css["border-top-left-radius"] = e.arrondis.topLeft + "px";
    css["border-top-right-radius"] = e.arrondis.topRight + "px";
    css["border-bottom-left-radius"] = e.arrondis.bottomLeft + "px";
    css["border-bottom-right-radius"] = e.arrondis.bottomRight + "px";
    props.editor.Css.setRule(`#${attr.id}`, css);
    props.editor.setStyle(props.editor.getCss());
    cmp.view.render();
  };
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

  const changeEspacementConfig = (e) => {
    // console.log(e.margin.top == "");
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-btn-padding"] = JSON.stringify(e.padding);
    attr["data-btn-margin"] = JSON.stringify(e.margin);

    cmp.setAttributes(attr);
    let r = props.editor.Css.getRule(`#${attr.id}`);
    let css = [];
    if (r) css = r.attributes.style;

    css["padding-top"] = e.padding.top + "px";
    css["padding-bottom"] = e.padding.bottom + "px";
    css["padding-right"] = e.padding.right + "px";
    css["padding-left"] = e.padding.left + "px";
    css["margin-top"] = e.margin.top == "" ? "auto" : e.margin.top + "px";
    css["margin-bottom"] =
      e.margin.bottom == "" ? "auto" : e.margin.bottom + "px";
    css["margin-right"] = e.margin.right == "" ? "auto" : e.margin.right + "%";
    css["margin-left"] = e.margin.left == "" ? "auto" : e.margin.left + "%";
    props.editor.Css.setRule(`#${attr.id}`, css);
    setConfigEspacement(e);
    props.editor.setStyle(props.editor.getCss());
    cmp.view.render();
  };

  const handleClose = () => {
    setShow(false);
  };
  // const handleCloseStylesIconsList = () => {
  //   setShowStylesIconsList(false);
  // };
  const handleCloseStylesList = () => {
    setShowStylesList(false);
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
    }
    if (
      !attr["data-isglobalstyling"] ||
      attr["data-isglobalstyling"] == "true"
    ) {
      let r = props.editor.Css.getRule(`#${attr.id}`);
      let css = [];
      if (r) css = r.attributes.style;

      css["position"] = "relative";
      css["display"] = "flex";
      css["align-items"] = "center";
      css["justify-content"] = "center";
      if (!attr["data-size"] && !attr["data-size-desktop"]) {
        css["width"] = "300px";
      }
      let pos = attr["data-position"] ? attr["data-position"] : "start";
      switch (pos) {
        case "start":
          css["margin-left"] = "0%";
          css["margin-right"] = "auto";
          break;
        case "center":
          css["margin-left"] = "auto";
          css["margin-right"] = "auto";
          break;
        case "end":
          css["margin-left"] = "auto";
          css["margin-right"] = "0%";
          break;

        default:
          break;
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
    attr["data-value"] = text;
    cmp.setAttributes(attr);
    cmp.components(text);
  }, [text]);
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

  const changebg = (color) => {
    setBlockPickerColor2(color);
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-bg"] = color.rgbTxt;
    cmp.setAttributes(attr);
    let r = props.editor.Css.getRule(`#${attr.id}`);
    let css = [];
    if (r) css = r.attributes.style;
    if (css) {
      css["background"] = color.rgbTxt;
    }
    props.editor.Css.setRule(`#${attr.id}`, css);
    props.editor.setStyle(props.editor.getCss());
    cmp.view.render();
  };
  const changebgsurvol = (color) => {
    setBlockPickerColor4(color);
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-bg-survol"] = color.rgbTxt;
    cmp.setAttributes(attr);
    let r = props.editor.Css.getRule(`#${attr.id}:hover`);
    let css = [];
    if (r) css = r.attributes.style;
    if (css) {
      css["background"] = color.rgbTxt;
    }
    props.editor.Css.setRule(`#${attr.id}:hover`, css);
    props.editor.setStyle(props.editor.getCss());
    cmp.view.render();
  };
  const changetxtsurvol = (color) => {
    setBlockPickerColor3(color);
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-color-hover"] = color.rgbTxt;
    cmp.setAttributes(attr);
    let r = props.editor.Css.getRule(`#${attr.id}:hover`);
    let css = [];
    if (r) css = r.attributes.style;
    if (css) {
      css["color"] = color.rgbTxt;
    }
    props.editor.Css.setRule(`#${attr.id}:hover`, css);
    props.editor.setStyle(props.editor.getCss());
    cmp.view.render();
  };

  const changeTextConfig = (e) => {
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-text-font"] = e.font;
    attr["data-text-variant"] = e.variant;
    attr["data-text-size"] = JSON.stringify(e.size);
    attr["data-text-color"] = e.color;
    attr["data-text-align"] = e.align;
    cmp.setAttributes(attr);

    let r = props.editor.Css.getRule(`#${attr.id}`);
    let css = [];
    if (r) css = r.attributes.style;
    css["font-family"] = e.font;
    css["color"] = e.color;
    css["justify-content"] =
      e.align == "left" ? "start" : e.align == "center" ? "center" : "end";
    css["font-weight"] = e.variant;
    css["font-size"] = e.size.desktop + "px";
    css["line-height"] = e.size.desktop + "px";

    let rmobile = props.editor.Css.getRule(`#${attr.id}`, {
      atRuleType: "media",
      atRuleParams: "(max-width: 767px)",
    });
    // console.log(rmobile);
    let cssmobile = [];
    if (rmobile) cssmobile = rmobile.attributes.style;
    cssmobile["font-size"] = `${e.size.mobile}px`;
    cssmobile["line-height"] = `${e.size.mobile}px`;

    let rtablet = props.editor.Css.getRule(`#${attr.id}`, {
      atRuleType: "media",
      atRuleParams: "(min-width: 768px) and (max-width: 991px)",
    });

    let csstablet = [];
    if (rtablet) csstablet = rtablet.attributes.style;
    csstablet["font-size"] = `${e.size.tablet}px`;
    csstablet["line-height"] = `${e.size.tablet}px`;

    props.editor.Css.setRule(`#${attr.id}`, csstablet, {
      atRuleType: "media",
      atRuleParams: "(min-width:768px) and (max-width:991px)",
    });
    props.editor.Css.setRule(`#${attr.id}`, cssmobile, {
      atRuleType: "media",
      atRuleParams: "(max-width:767px)",
    });

    props.editor.Css.setRule(`#${attr.id}`, css);
    props.editor.setStyle(props.editor.getCss());
    cmp.view.render();
    setConfigBtnText(e);
  };
  const changePosition = (pos) => {
    let device = props.editor.Devices.getSelected().id;
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();

    setPosition(pos);
    let r = null;
    if (device != "mobile2") {
      attr["data-position"] = pos;

      r = props.editor.Css.getRule(`#${attr.id}`);
    } else {
      attr["data-position-mobile"] = pos;
      r = props.editor.Css.getRule(`#${attr.id}`, {
        atRuleType: "media",
        atRuleParams: "(max-width: 767px)",
      });
    }
    cmp.setAttributes(attr);
    let css = [];
    if (r) css = r.attributes.style;
    switch (pos) {
      case "start":
        css["margin-left"] = "0%";
        css["margin-right"] = "auto";
        break;
      case "center":
        css["margin-left"] = "auto";
        css["margin-right"] = "auto";
        break;
      case "end":
        css["margin-left"] = "auto";
        css["margin-right"] = "0%";
        break;

      default:
        css["margin-left"] = "0%";
        css["margin-right"] = "auto";
        break;
    }

    if (device == "mobile2") {
      props.editor.Css.setRule(`#${attr.id}`, css, {
        atRuleType: "media",
        atRuleParams: "(max-width:767px)",
      });
    } else {
      props.editor.Css.setRule(`#${attr.id}`, css);
    }

    props.editor.setStyle(props.editor.getCss());
    cmp.view.render();
  };
  const changeIcon = (e) => {
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    props.editor.Css.remove(`#${attr.id}:before`);
    props.editor.Css.remove(`#${attr.id}::before`);

    attr["data-icon"] = JSON.stringify(e);

    cmp.setAttributes(attr);
    let r = props.editor.Css.getRule(`#${attr.id}:before`);
    let css = {};
    if (r) css = r.attributes.style;
    delete css["content"];
    delete css["background-image"];
    delete css["background"];
    delete css["background-size"];
    delete css["background-repeat"];
    delete css["background-position"];
    delete css["font-size"];
    delete css["color"];
    if (attr["data-style"] == "styleFour") {
      if (e.type == "icon") {
        console.log(e.unicode);
        css["content"] = `'\\${e.unicode.substring(1)}'`;
        css["font-family"] = "FontAwesome";
        css["color"] = e.color;
        css["font-size"] = e.size + "px";
        css["background-image"] = "none";
        css["width"] = "auto";
        css["height"] = "auto";
      } else if (e.type == "image") {
        css["content"] = `' '`;
        css["background"] = "url(" + e.icon + ")";
        css["background-size"] = e.size + "px";
        css["width"] = e.size + "px";
        css["height"] = e.size + "px";
        css["background-repeat"] = "no-repeat";
        css["background-position"] = "center";
      }
    } else {
      css["content"] = "none";
    }
    props.editor.Css.setRule(`#${attr.id}:before`, css);

    props.editor.setStyle(props.editor.getCss());
  };

  const changeBorder = (e) => {
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-border-size"] = JSON.stringify(e.size);
    attr["data-border-style"] = e.style;
    attr["data-border-color"] = e.color;
    attr["data-border-type"] = e.typeborder;

    cmp.setAttributes(attr);
    let r = props.editor.Css.getRule(`#${attr.id}`);
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
    props.editor.Css.setRule(`#${attr.id}`, css);
    setConfigBorder(e);
    props.editor.setStyle(props.editor.getCss());
    cmp.view.render();
  }; 
   const changeBorderHover = (e) => {
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-borderhover-size"] = JSON.stringify(e.size);
    attr["data-borderhover-style"] = e.style;
    attr["data-borderhover-color"] = e.color;
    attr["data-borderhover-type"] = e.typeborder;

    cmp.setAttributes(attr);
    let r = props.editor.Css.getRule(`#${attr.id}:hover`);
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
    props.editor.Css.setRule(`#${attr.id}:hover`, css);
    setConfigBorderHover(e);
    props.editor.setStyle(props.editor.getCss());
    cmp.view.render();
  };
  const changeIsGlobalSync = (value) => {
    let cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-isglobalstyling"] = value;
    setIsGlobalStyle(value);
    cmp.setAttributes(attr);
    if (value == "false") {
      let r = props.editor.Css.getRule(`#${attr.id}`);
      props.editor.Css.remove(r);
    } else {
      let r = props.editor.Css.getRule(`#${attr.id}`);
      let css = [];
      if (r) css = r.attributes.style;

      css["position"] = "relative";
      css["display"] = "flex";
      css["align-items"] = "center";
      css["justify-content"] = "center";
      if (!attr["data-size"]) {
        css["width"] = "250px";
      }

      props.editor.Css.setRule(`#${attr.id}`, css);
      props.editor.setStyle(props.editor.getCss());
    }
  };
  const changeSize = (device, value) => {
    let cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    let s = { ...size };
    s[device] = value;
    setSize(s);
    attr["data-size"] = JSON.stringify(s);
    cmp.setAttributes(attr);
    let r = props.editor.Css.getRule(`#${attr.id}`);
    let css = {};
    if (r) css = r.attributes.style;
    css["width"] = s.desktop + "px";
    props.editor.Css.setRule(`#${attr.id}`, css);

    let r_tablet = props.editor.Css.getRule(`#${attr.id}`, {
      atRuleType: "media",
      atRuleParams: "(min-width: 768px) and (max-width: 991px)",
    });
    let cssTablet = {};
    if (r_tablet) cssTablet = r_tablet.attributes.style;
    cssTablet["width"] = s.tablet + "px";
    props.editor.Css.remove(r_tablet);
    props.editor.Css.setRule(`#${attr.id}`, cssTablet, {
      atRuleType: "media",
      atRuleParams: "(min-width:768px) and (max-width:991px)",
    });

    let r_Mobile = props.editor.Css.getRule(`#${attr.id}`, {
      atRuleType: "media",
      atRuleParams: "(max-width: 767px)",
    });

    let cssMobile = {};
    if (r_Mobile) cssMobile = r_Mobile.attributes.style;

    cssMobile["width"] = s.mobile + "px";

    props.editor.Css.remove(r_Mobile);
    props.editor.Css.setRule(`#${attr.id}`, cssMobile, {
      atRuleType: "media",
      atRuleParams: "(max-width: 767px)",
    });

    props.editor.setStyle(props.editor.getCss());
    cmp.view.render();
  };
  const changeStyle = (st) => {
    setStyle(st);
    let cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-style"] = st;
    cmp.setAttributes(attr);
    let classes = cmp.getClasses().filter((c) => c.indexOf("style") == -1);
    classes.push(st);
    cmp.setClass(classes);
    let r = props.editor.Css.getRule(`#${attr.id}::before`);
    let css = {};
    if (r) css = r.attributes.style;
    if (st != "styleFour") {
      css["content"] = "none";
    } else if (st == "styleFour") {
      css["font-family"] = "Font Awesome 5 Free";
      css["content"] = attr["data-icon"]
        ? JSON.parse(attr["data-icon"]).unicode
        : "\f007";
      css["display"] = "inline-block";
    }
    props.editor.Css.setRule(`#${attr.id}:before`, css);
    props.editor.setStyle(props.editor.getCss());
  };

  return (
    <Modal
      dialogAs={DraggableModalDialog}
      show={show}
      backdrop="static"
      onHide={handleClose}
      centered
      id="ModalButton"
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
            class="tab-pane fade "
            id="nav-contenu"
            role="tabpanel"
            aria-labelledby="nav-contenu-tab"
            tabindex="0"
          >
            <span className="title-popups">Contenu du boutton</span>
            <div class="setting rounded-2" id="contenu">
              <div class="mb-3">
                <label className="d-block">Texte du bouton</label>

                <input
                  type="text"
                  value={text}
                  placeholder="Text du boutton"
                  className="form-control "
                  onChange={(e) => setText(e.target.value)}
                />
              </div>
              <div className="mb-2">
                <div class="form-check me-3">
                  <input
                    class="form-check-input typebtn"
                    type="radio"
                    name="typeBtn"
                    id="typePage"
                    value="page"
                    checked={selectedType == "page"}
                    onChange={(e) => setSelectedType(e.target.value)}
                  />
                  <label class="form-check-label" for="typePage">
                    Pages
                  </label>
                </div>
                <div className={selectedType != "page" ? "d-none" : "d-block"}>
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
                    class="form-check-input typebtn"
                    type="radio"
                    name="typeBtn"
                    id="typePopup"
                    value="popup"
                    checked={selectedType == "popup"}
                    onChange={(e) => setSelectedType(e.target.value)}
                  />
                  <label class="form-check-label" for="typePopup">
                    Popups
                  </label>
                </div>
                <div className={selectedType != "popup" ? "d-none" : "d-block"}>
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
                    class="form-check-input "
                    type="radio"
                    checked={selectedType == "url"}
                    name="typeBtn"
                    id="typeUrl"
                    value="url"
                    onChange={(e) => setSelectedType(e.target.value)}
                  />
                  <label class="form-check-label" for="typeUrl">
                    Url - {selectedType == "url" ? "checked" : "no"}
                  </label>
                </div>
                <div className={selectedType != "url" ? "d-none" : "d-block"}>
                  <input
                    onChange={(e) => setSelectedUrl(e.target.value)}
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
                    onChange={(e) => setSelectedType(e.target.value)}
                  />
                  <label class="form-check-label" for="typeTel">
                    ClickToCall
                  </label>
                </div>
                <div className={selectedType != "tel" ? "d-none" : "d-block"}>
                  <input
                    onChange={(e) => setSelectedTel(e.target.value)}
                    type="text"
                    value={selectedTel}
                    name="tel"
                    placeholder="555 555 555"
                    className="form-control"
                  />
                </div>
              </div>
            </div>
          </div>

          <div
            class="tab-pane fade show active"
            id="nav-desgine"
            role="tabpanel"
            aria-labelledby="nav-desgine-tab"
            tabindex="0"
          >
            <span className="title-popups">Style du boutton</span>

            <div class="setting models rounded-2" id="Button">
              <span className="setting-title">STYLE DU BOUTON</span>
              <div className=" d-flex justify-content-between align-items-center mb-3 mt-3 ombreConfig">
                <label className="form-check-label w-75" htmlFor="isglobal">
                  Personaliser le style du boutton
                </label>
                <div className="form-check form-switch w-25 justify-content-end p-0">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={"isglobal"}
                    name={"isglobal"}
                    checked={isGlobalStyle == "true"}
                    onChange={(e) => {
                      changeIsGlobalSync(e.target.checked.toString());
                    }}
                  />
                </div>
              </div>
              <div className={isGlobalStyle == "true" ? "d-block" : "d-none"}>
                <div
                  className="d-flex justify-content-center align-items-center mb-4 mt-4 border-top border-top setting-title"
                  onClick={(e) => setShowStylesList(true)}
                >
                  <a
                    href="#"
                    className={
                      style == "styleOne"
                        ? "btn border rounded-pill ps-5 pe-5  active"
                        : "d-none "
                    }
                  >
                    Button
                  </a>
                  <a
                    href="#"
                    className={
                      style == "styleTwo"
                        ? "btn border rounded ps-5 pe-5  active"
                        : "d-none "
                    }
                  >
                    Button
                  </a>
                  <a
                    href="#"
                    className={
                      style == "styleThree"
                        ? "btn border rounded-0 ps-5 pe-5  active"
                        : "d-none "
                    }
                  >
                    Button
                  </a>
                  <a
                    href="#"
                    className={
                      style == "styleFour"
                        ? "btn border rounded ps-5 pe-5  active"
                        : "d-none "
                    }
                  >
                    <i class="fas fa-star"></i> Button
                  </a>
                  <i class="fas fa-angle-right"></i>
                </div>
                <ul class="nav nav-tabs mb-3" id="myTab" role="tablist">
                  <li class="nav-item" role="presentation">
                    <button
                      class="nav-link active"
                      id="Stylelien-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#Stylelien"
                      type="button"
                      role="tab"
                      aria-controls="Stylelien"
                      aria-selected="true"
                    >
                      Style du boutton
                    </button>
                  </li>
                  <li class="nav-item" role="presentation">
                    <button
                      class="nav-link"
                      id="textlien-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#textlien"
                      type="button"
                      role="tab"
                      aria-controls="textlien"
                      aria-selected="false"
                    >
                      Texte du boutton
                    </button>
                  </li>
                </ul>
                <div class="tab-content mb-3" id="myTabContent">
                  <div
                    className="tab-pane fade show active "
                    id="Stylelien"
                    role="tabpanel"
                    aria-labelledby="Stylelien-tab"
                  >
                    <div className="d-flex justify-content-between align-items-center  mb-3">
                      <label for="customRange2" class="form-label">
                        Largeur
                      </label>

                      <div className="d-flex justify-content-between align-items-center">
                        <i class="fas fa-desktop me-1"></i>
                        <div class="input-with-label-pixel me-2">
                          <span class="pixel-label">px</span>
                          <input
                            min="10"
                            max="1200"
                            class="form-control form-control-sm input-small-pixel"
                            type="number"
                            value={size.desktop}
                            onChange={(e) =>
                              changeSize("desktop", e.target.value)
                            }
                          />
                        </div>
                        <i class="fas fa-tablet me-1"></i>
                        <div class="input-with-label-pixel me-2">
                          <span class="pixel-label">px</span>
                          <input
                            min="10"
                            max="1200"
                            class="form-control form-control-sm input-small-pixel"
                            type="number"
                            value={size.tablet}
                            onChange={(e) =>
                              changeSize("tablet", e.target.value)
                            }
                          />
                        </div>
                        <i class="fas fa-tablet me-1"></i>
                        <div class="input-with-label-pixel me-2">
                          <span class="pixel-label">px</span>
                          <input
                            min="10"
                            max="1200"
                            class="form-control form-control-sm input-small-pixel"
                            type="number"
                            value={size.mobile}
                            onChange={(e) =>
                              changeSize("mobile", e.target.value)
                            }
                          />
                        </div>
                      </div>
                    </div>

                    <div className="d-flex justify-content-between align-content-center mb-3">
                      <span>Position de menu </span>
                      <div className="seperators d-flex justify-content-around align-items-center">
                        <div class="form-check">
                          <input
                            onChange={(e) => changePosition(e.target.value)}
                            checked={position == "start"}
                            className="RadioInput"
                            type="radio"
                            value="start"
                            name="position"
                            id="start"
                          />
                          <label class="RadioLabel" for="start">
                            <i class="fas fa-long-arrow-alt-left"></i>
                          </label>
                        </div>
                        <div class="form-check">
                          <input
                            onChange={(e) => changePosition(e.target.value)}
                            checked={position == "center"}
                            className="RadioInput"
                            type="radio"
                            value="center"
                            name="position"
                            id="center"
                          />
                          <label class="RadioLabel" for="center">
                            <i class="fas fa-arrows-alt-h"></i>
                          </label>
                        </div>
                        <div class="form-check">
                          <input
                            onChange={(e) => changePosition(e.target.value)}
                            checked={position == "end"}
                            className="RadioInput"
                            type="radio"
                            value="end"
                            name="position"
                            id="end"
                          />
                          <label class="RadioLabel" for="end">
                            <i class="fas fa-long-arrow-alt-right"></i>
                          </label>
                        </div>
                      </div>
                    </div>
                    <ColorConfig
                      key={"btnbg"}
                      label="Arrière-plan du boutton "
                      config={blockPickerColor2}
                      setConfig={changebg}
                    />
                    <ColorConfig
                      key={"btnbgsurvol"}
                      label="Arrière-plan du boutton au survol"
                      config={blockPickerColor4}
                      setConfig={changebgsurvol}
                    />



<ul class="nav nav-tabs mb-3" id="myTab" role="tablist">
                  <li class="nav-item" role="presentation">
                    <button
                      class="nav-link active"
                      id="Styleborder-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#Styleborder"
                      type="button"
                      role="tab"
                      aria-controls="Styleborder"
                      aria-selected="true"
                    >
                      Style du bordure
                    </button>
                  </li>
                  <li class="nav-item" role="presentation">
                    <button
                      class="nav-link"
                      id="hoverborder-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#hoverborder"
                      type="button"
                      role="tab"
                      aria-controls="hoverborder"
                      aria-selected="false"
                    >
                      Survol  du bordure
                    </button>
                  </li>
                </ul>

 <div class="tab-content mb-3" id="myTabContent">
                  <div
                    className="tab-pane fade show active "
                    id="Styleborder"
                    role="tabpanel"
                    aria-labelledby="Styleborder-tab"
                  >
    <BorderConfig
                      key={"bordertitle"}
                      for={"bordertitle"}
                      editor={props.editor}
                      siteId={props.siteId}
                      config={configBorder}
                      setConfig={changeBorder}
                    />
</div>
<div
                    className="tab-pane fade show active "
                    id="hoverborder"
                    role="tabpanel"
                    aria-labelledby="hoverborder-tab"
                  >
     <BorderConfig
                      key={"borderhover"}
                      for={"borderhover"}
                      editor={props.editor}
                      siteId={props.siteId}
                      config={configBorderHover}
                      setConfig={changeBorderHover}
                    />
</div>
</div>










                
                  
                    <OmbreConfig
                      title="Ombre du boutton"
                      config={{
                        isActiveOmbre: isActiveOmbre,
                        shadow: shadow,
                        OmbrePickerColor: OmbrePickerColor,
                      }}
                      setConfig={setOmbreConfig}
                    />
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <div class="panelTitle">Arrondis </div>
                      <ArrondisConfigAccordion
                        editor={props.editor}
                        siteId={props.siteId}
                        config={configRaduis}
                        setConfig={changeArrandisConfig}
                      />
                    </div>

                    <div
                      className={style == "styleFour" ? "d-block" : "d-none"}
                    >
                      <IconConfig
                        key={"btnIcon"}
                        label=" Changer l'icon du boutton"
                        siteId={props.siteId}
                        config={Icon}
                        setConfig={changeIcon}
                      />
                    </div>

                    <div className=" mb-3">
                      <div>Espacement du boutton</div>
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
                  <div
                    className="tab-pane fade  mb-3"
                    id="textlien"
                    role="tabpanel"
                    aria-labelledby="textlien-tab"
                  >
                    <TextStylingComponent
                      key={"btntext"}
                      for={"btntext"}
                      editor={props.editor}
                      siteId={props.siteId}
                      config={configBtnText}
                      setConfig={changeTextConfig}
                    />
                    <ColorConfig
                      key={"btntxthover"}
                      label="Couleur du texte au passage de la souris"
                      config={blockPickerColor3}
                      setConfig={changetxtsurvol}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={showStylesList ? "d-block models-list" : "d-none"}>
          <div class="text-end mb-3">
            <button
              type="button"
              onClick={handleCloseStylesList}
              class="btn-close"
              aria-label="Close"
            ></button>
            <span className="title-popups">Style du boutton</span>
            <div className="models">
              <div className="d-flex justify-content-around align-items-center flex-wrap gap-3 mt-3">
                <a
                  href="#"
                  onClick={(e) => changeStyle("styleOne")}
                  className={
                    style == "styleOne"
                      ? "btn border rounded-pill ps-5 pe-5  active"
                      : "btn border rounded-pill ps-5 pe-5  "
                  }
                >
                  Button
                </a>
                <a
                  href="#"
                  onClick={(e) => changeStyle("styleTwo")}
                  className={
                    style == "styleTwo"
                      ? "btn border rounded ps-5 pe-5  active"
                      : "btn border rounded ps-5 pe-5  "
                  }
                >
                  Button
                </a>
                <a
                  href="#"
                  onClick={(e) => changeStyle("styleThree")}
                  className={
                    style == "styleThree"
                      ? "btn border rounded-0 ps-5 pe-5  active"
                      : "btn border rounded-0 ps-5 pe-5  "
                  }
                >
                  Button
                </a>
                <a
                  href="#"
                  onClick={(e) => changeStyle("styleFour")}
                  className={
                    style == "styleFour"
                      ? "btn border rounded ps-5 pe-5  active"
                      : "btn border rounded ps-5 pe-5  "
                  }
                >
                  <i class="fas fa-star"></i> Button
                </a>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
