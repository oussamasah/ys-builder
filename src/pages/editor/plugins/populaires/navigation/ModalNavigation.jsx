import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import ModalDialog from "react-bootstrap/ModalDialog";
import Draggable from "react-draggable";
import "./ModalNavigation.css";
import TextStylingComponent from "../../../compoments/TextStyling/TextStylingComponent";
import ColorConfig from "../../../compoments/Color/ColorConfig";
import EspacementConfig from "../../../compoments/Espacement/EspacementConfig";
import ArrondisConfig from "../../../compoments/Arrondis/ArrondisConfig";
class DraggableModalDialog extends React.Component {
  render() {
    return (
      <Draggable handle=".handleDrag">
        <ModalDialog {...this.props} />
      </Draggable>
    );
  }
}
export default function ModalNavigation(props) {
  const [configNav, setConfigNav] = useState({
    font: "",
    variant: "normal",
    color: "#ffffff",
    align: "left",
    size: { desktop: "16", tablet: "16", mobile: "16" },
  });

  const [configSubNav, setConfigSubNav] = useState({
    font: "",
    variant: "normal",
    color: "#ffffff",
    align: "left",
    size: { desktop: "14", tablet: "14", mobile: "14" },
  });
  const [seperator, setSeperator] = useState(
    props.editor.getSelected().getAttributes()["data-seperator"]
      ? props.editor.getSelected().getAttributes()["data-seperator"]
      : ""
  );
  const [logoWidth, setLogoWidth] = useState(
    props.editor.getSelected().getAttributes()["data-logo-width"]
      ? props.editor.getSelected().getAttributes()["data-logo-width"]
      : "200px"
  );
  const [WidthSousMenu, setWidthSousMenu] = useState(
    props.editor.getSelected().getAttributes()["data-width-sousmenu"]
      ? props.editor.getSelected().getAttributes()["data-width-sousmenu"]
      : "auto"
  );
  const [align, setAlign] = useState(
    props.editor.getSelected().getAttributes()["data-align"]
      ? props.editor.getSelected().getAttributes()["data-align"]
      : "start"
  );
  const [show, setShow] = useState(true);
  const [showStylesList, setShowStylesList] = useState(false);
  const [orientation, setOrientation] = useState("horizontal");
  const [style, setStyle] = useState();
  const [configEspacement, setConfigEspacement] = useState({
    padding: props.editor.getSelected().getAttributes()["data-padding"]
      ? JSON.parse(props.editor.getSelected().getAttributes()["data-padding"])
      : {
          top: "15",
          left: "15",
          right: "15",
          bottom: "15",
        },
    margin: props.editor.getSelected().getAttributes()["data-margin"]
      ? JSON.parse(props.editor.getSelected().getAttributes()["data-margin"])
      : {
          top: "0",
          left: "0",
          right: "0",
          bottom: "0",
        },
  });
  const [configEspacementSubmenu, setConfigEspacementSubmenu] = useState({
    padding: props.editor.getSelected().getAttributes()["data-padding-submenu"]
      ? JSON.parse(
          props.editor.getSelected().getAttributes()["data-padding-submenu"]
        )
      : {
          top: "15",
          left: "15",
          right: "15",
          bottom: "15",
        },
    margin: props.editor.getSelected().getAttributes()["data-margin-submenu"]
      ? JSON.parse(
          props.editor.getSelected().getAttributes()["data-margin-submenu"]
        )
      : {
          top: "0",
          left: "0",
          right: "0",
          bottom: "0",
        },
  });
  const [configRaduis, setConfigRaduis] = useState({
    arrondis: props.editor.getSelected().getAttributes()["data-raduis"]
      ? JSON.parse(props.editor.getSelected().getAttributes()["data-raduis"])
      : {
          topLeft: "0",
          topRight: "0",
          bottomLeft: "0",
          bottomRight: "0",
        },
  });
  const [isActivePalette, setActivepalette] = useState(false);
  const rgbtoJson = (rgbString) => {
    var s = rgbString;
    s = s.replace("rgb(", "");
    s = s.replace(")", "");
    let c = s.split(",");
    return { r: c[0], g: c[1], b: c[2], a: c[3] };
  };
  const [BgPickerColor, setBgPickerColor] = useState({
    rgbTxt: props.editor.getSelected().getAttributes()["data-bg"]
      ? props.editor.getSelected().getAttributes()["data-bg"]
      : "rgb(0 0 0 / 0%)",
    rgb: rgbtoJson(
      props.editor.getSelected().getAttributes()["data-bg"]
        ? props.editor.getSelected().getAttributes()["data-bg"]
        : "rgb(0 0 0 / 0%)"
    ),
  });
  const [BgSubPickerColor, setBgSubPickerColor] = useState({
    rgbTxt: props.editor.getSelected().getAttributes()["data-bg-submenu"]
      ? props.editor.getSelected().getAttributes()["data-bg-submenu"]
      : "#eeeeee",
    rgb: rgbtoJson(
      props.editor.getSelected().getAttributes()["data-bg-submenu"]
        ? props.editor.getSelected().getAttributes()["data-bg-submenu"]
        : "#eeeeee"
    ),
  });
  const [SurvolTextPickerColor, setSurvolTextPickerColor] = useState({
    rgbTxt: props.editor.getSelected().getAttributes()["data-survol-text"]
      ? props.editor.getSelected().getAttributes()["data-survol-text"]
      : "#ffffff",
    rgb: rgbtoJson(
      props.editor.getSelected().getAttributes()["data-survol-text"]
        ? props.editor.getSelected().getAttributes()["data-survol-text"]
        : "#ffffff"
    ),
  });
  const [SurvolSubTextPickerColor, setSurvolSubTextPickerColor] = useState({
    rgbTxt: props.editor.getSelected().getAttributes()[
      "data-survol-submenu-text"
    ]
      ? props.editor.getSelected().getAttributes()["data-survol-submenu-text"]
      : "#ffffff",
    rgb: rgbtoJson(
      props.editor.getSelected().getAttributes()["data-survol-submenu-text"]
        ? props.editor.getSelected().getAttributes()["data-survol-submenu-text"]
        : "#ffffff"
    ),
  });
  const [SurvolBgPickerColor, setSurvolBgPickerColor] = useState({
    rgbTxt: props.editor.getSelected().getAttributes()["data-survol-bg"]
      ? props.editor.getSelected().getAttributes()["data-survol-bg"]
      : "#000000",
    rgb: rgbtoJson(
      props.editor.getSelected().getAttributes()["data-survol-bg"]
        ? props.editor.getSelected().getAttributes()["data-survol-bg"]
        : "#000000"
    ),
  });
  const [SurvolSubBgPickerColor, setSurvolSubBgPickerColor] = useState({
    rgbTxt: props.editor.getSelected().getAttributes()["data-survol-submenu-bg"]
      ? props.editor.getSelected().getAttributes()["data-survol-submenu-bg"]
      : "#000000",
    rgb: rgbtoJson(
      props.editor.getSelected().getAttributes()["data-survol-submenu-bg"]
        ? props.editor.getSelected().getAttributes()["data-survol-submenu-bg"]
        : "#000000"
    ),
  });
  const [SurvolSubEffetPickerColor, setSurvolSubEffetPickerColor] = useState({
    rgbTxt: props.editor.getSelected().getAttributes()[
      "data-survol-submenu-effet"
    ]
      ? props.editor.getSelected().getAttributes()["data-survol-submenu-effet"]
      : "#000000",
    rgb: rgbtoJson(
      props.editor.getSelected().getAttributes()["data-survol-submenu-effet"]
        ? props.editor.getSelected().getAttributes()[
            "data-survol-submenu-effet"
          ]
        : "#000000"
    ),
  });
  const [seperatorPickerColor, setSeparatorPickerColor] = useState({
    rgbTxt: props.editor.getSelected().getAttributes()["data-seperator-color"]
      ? props.editor.getSelected().getAttributes()["data-seperator-color"]
      : "#000",
    rgb: rgbtoJson(
      props.editor.getSelected().getAttributes()["data-seperator-color"]
        ? props.editor.getSelected().getAttributes()["data-seperator-color"]
        : "#000"
    ),
  });

  const style_list = [
    "default-effect",
    "stroke-effect",
    "fill-effect",
    "bordred-effect",
    "circle-effect",
    "catched-effect",
    "shift-effect",
  ];

  const handleCloseStylesList = () => {
    setShowStylesList(false);
  };
  const handleClose = () => {
    setShow(false);
  };
  const [fontVariant, setFontVariant] = useState(
    props.editor.getSelected().getAttributes()["data-style-survol"]
      ? props.editor.getSelected().getAttributes()["data-style-survol"]
      : "500"
  );
  const changeVariant = (value) => {
    let cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-style-survol"] = value;
    setFontVariant(value);
    cmp.setAttributes(attr);
    let r = props.editor.Css.getRule(`#${attr.id} ul li a:hover`);
    let css = [];
    if (r) css = r.attributes.style;
    if (css) {
      css["font-weight"] = value;
    }
    props.editor.Css.setRule(`#${attr.id} ul li a:hover`, css);
    props.editor.setStyle(props.editor.getCss());
  };
  useEffect(() => {
    let id = props.component.getAttributes().ccid;
    let cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    let effect = cmp.getClasses().filter((c) => c.indexOf("effect") > -1);
    setStyle(effect[0]);
    let size = attr["data-size"]
      ? JSON.parse(attr["data-size"])
      : { desktop: "14", tablet: "14", mobile: "14" };
    let sizesubmenu = attr["data-submenu-size"]
      ? JSON.parse(attr["data-submenu-size"])
      : { desktop: "14", tablet: "14", mobile: "14" };

    const config = {
      font: attr["data-font"] ? attr["data-font"] : "unset",
      variant: attr["data-variant"] ? attr["data-variant"] : "normal",
      color: attr["data-color"] ? attr["data-color"] : "#000000",
      align: attr["data-align"] ? attr["data-align"] : "left",
      size: size,
    };
    const configSub = {
      font: attr["data-submenu-font"] ? attr["data-submenu-font"] : "unset",
      variant: attr["data-submenu-variant"]
        ? attr["data-submenu-variant"]
        : "normal",
      color: attr["data-submenu-color"]
        ? attr["data-submenu-color"]
        : "#000000",
      align: attr["data-submenu-align"] ? attr["data-submenu-align"] : "left",
      size: sizesubmenu,
    };
    setOrientation(attr["data-model"]);
    setConfigNav(config);
    setConfigSubNav(configSub);
  }, []);
  useEffect(() => {
    let cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-style"] = style;
    attr["data-model"] = orientation;
    attr["data-seperator"] = seperator;
    attr["data-align"] = align;
    attr["data-logo-width"] = logoWidth;

    cmp.setAttributes(attr);
    let r2 = props.editor.Css.getRule(`#${attr.id} .logo-gjs img`);
    let css2 = [];
    if (r2) css2 = r2.attributes.style;
    if (css2) {
      css2["width"] = logoWidth + "px";
      props.editor.Css.setRule(`#${attr.id} .logo-gjs img`, css2);
    } else {
      props.editor.Css.setRule(`#${attr.id} .logo-gjs img`, {
        width: logoWidth + "px",
      });
    }
    let r = props.editor.Css.getRule(`#${attr.id}`);
    let css = [];
    if (r) css = r.attributes.style;
    if (css) {
      css["display"] = "flex!important";
      css["justify-content"] = align + "!important";
      props.editor.Css.setRule(`#${attr.id}`, css);
    } else {
      props.editor.Css.setRule(`#${attr.id}`, {
        display: "flex!important",
        "justify-content": align + "!important",
      });
    }
    let classlist = cmp
      .getClasses()
      .filter((c) => c.indexOf("effect") == -1 && c.indexOf("seperator") == -1);
    classlist.push(style);
    classlist.push(seperator ? seperator : "");

    cmp.setClass(classlist);
    props.editor.setStyle(props.editor.getCss());
    cmp.view.render();
  }, [style, orientation, seperator, align, logoWidth]);

  const changeSurvolText = (color) => {
    setSurvolTextPickerColor(color);
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-survol-text"] = color.rgbTxt;

    let r = props.editor.Css.getRule(`#${attr.id} ul li a:hover`);
    let r2 = props.editor.Css.getRule(`#${attr.id} ul li a.active`);
    let cssHover = [];
    let cssActive = [];
    if (r) cssHover = r.attributes.style;
    if (r2) cssActive = r2.attributes.style;
    if (cssHover) {
      cssHover["color"] = color.rgbTxt;
    }
    if (cssActive) {
      cssActive["color"] = color.rgbTxt;
    }
    props.editor.Css.setRule(`#${attr.id} ul li a:hover`, cssHover);
    props.editor.Css.setRule(`#${attr.id} ul li a.active`, cssActive);
    cmp.setAttributes(attr);
    cmp.view.render();
    props.editor.setStyle(props.editor.getCss());
  };
  const changeSurvolSubText = (color) => {
    setSurvolSubTextPickerColor(color);
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-survol-submenu-text"] = color.rgbTxt;

    let r = props.editor.Css.getRule(`#${attr.id} ul.dropdown-menu li a:hover`);
    let r2 = props.editor.Css.getRule(
      `#${attr.id} ul.dropdown-menu li a.active`
    );
    let cssHover = [];
    let cssActive = [];
    if (r) cssHover = r.attributes.style;
    if (r2) cssActive = r2.attributes.style;
    if (cssHover) {
      cssHover["color"] = color.rgbTxt;
    }
    if (cssActive) {
      cssActive["color"] = color.rgbTxt;
    }
    props.editor.Css.setRule(
      `#${attr.id} ul.dropdown-menu li a:hover`,
      cssHover
    );
    props.editor.Css.setRule(
      `#${attr.id} ul.dropdown-menu li a.active`,
      cssActive
    );
    cmp.setAttributes(attr);
    cmp.view.render();
    props.editor.setStyle(props.editor.getCss());
  };
  const changeArrandisConfig = (e) => {
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-raduis"] = JSON.stringify(e.arrondis);
    cmp.setAttributes(attr);
    setConfigRaduis(e);
    let r = props.editor.Css.getRule(`#${attr.id} ul li a`);
    let css = null;
    if (r) css = r.attributes.style;
    if (css) {
      css["border-top-left-radius"] = e.arrondis.topLeft + "px";
      css["border-top-right-radius"] = e.arrondis.topRight + "px";
      css["border-bottom-left-radius"] = e.arrondis.bottomLeft + "px";
      css["border-bottom-right-radius"] = e.arrondis.bottomRight + "px";
      props.editor.Css.setRule(`#${attr.id} ul li a`, css);
    } else {
      props.editor.Css.setRule(`#${attr.id} ul li a`, {
        "border-top-left-radius": e.arrondis.topLeft + "px",
        "border-top-right-radius": e.arrondis.topRight + "px",
        "border-bottom-left-radius": e.arrondis.bottomLeft + "px",
        "border-bottom-right-radius": e.arrondis.bottomRight + "px",
      });
    }

    cmp.view.render();
    props.editor.setStyle(props.editor.getCss());
  };
  const changeWidth = (value) => {
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-width-sousmenu"] = value;
    cmp.setAttributes(attr);
    setWidthSousMenu(value);
    let r = props.editor.Css.getRule(`#${attr.id} ul.dropdown-menu`);
    let css = null;
    if (r) css = r.attributes.style;
    if (css) {
      css["width"] = value + "px";
    }
    props.editor.Css.setRule(`#${attr.id} ul.dropdown-menu`, css, {
      atRuleType: "media",
      atRuleParams: "(min-width: 992px)",
    });

    cmp.view.render();
    props.editor.setStyle(props.editor.getCss());
  };
  const changeSurvolBg = (color) => {
    setSurvolBgPickerColor(color);
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-survol-bg"] = color.rgbTxt;

    let r = props.editor.Css.getRule(`#${attr.id} ul li a:hover::after`);
    let r2 = props.editor.Css.getRule(`#${attr.id} ul li a.hover::before`);
    let r3 = props.editor.Css.getRule(`#${attr.id} ul li a.active::before`);
    let r4 = props.editor.Css.getRule(`#${attr.id} ul li a.active::after`);
    console.log("rule", r);
    let cssHover = [];
    let cssActive = [];
    if (r) cssHover = r.attributes.style;
    if (r2) cssActive = r2.attributes.style;
    if (cssHover) {
      cssHover["background"] = color.rgbTxt;
    }
    if (cssActive) {
      cssActive["background"] = color.rgbTxt;
    }
    props.editor.Css.remove(r);
    props.editor.Css.remove(r2);
    props.editor.Css.remove(r3);
    props.editor.Css.remove(r4);

    props.editor.Css.setRule(`#${attr.id} ul li a:hover:after`, cssHover);
    props.editor.Css.setRule(`#${attr.id} ul li a:hover:before`, cssHover);
    props.editor.Css.setRule(`#${attr.id} ul li a.active:after`, cssActive);
    props.editor.Css.setRule(`#${attr.id} ul li a.active:before`, cssActive);
    cmp.setAttributes(attr);
    cmp.view.render();
    props.editor.setStyle(props.editor.getCss());
  };

  const changeSurvolSubEffet = (color) => {
    setSurvolSubEffetPickerColor(color);
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-survol-submenu-effet"] = color.rgbTxt;

    let r = props.editor.Css.getRule(
      `#${attr.id} ul.dropdown-menu li a:hover::after`
    );
    let r2 = props.editor.Css.getRule(
      `#${attr.id} ul.dropdown-menu li a.active::after`
    );
    let r3 = props.editor.Css.getRule(
      `#${attr.id} ul.dropdown-menu li a.hover::before`
    );
    let r4 = props.editor.Css.getRule(
      `#${attr.id} ul.dropdown-menu li a.active::before`
    );
    let cssHover = [];
    let cssActive = [];
    if (r) cssHover = r.attributes.style;
    if (r2) cssActive = r2.attributes.style;
    if (cssHover) {
      cssHover["background"] = color.rgbTxt;
    }
    if (cssActive) {
      cssActive["background"] = color.rgbTxt;
    }
    props.editor.Css.remove(r);
    props.editor.Css.remove(r2);
    props.editor.Css.remove(r3);
    props.editor.Css.remove(r4);
    props.editor.Css.setRule(
      `#${attr.id} ul.dropdown-menu li a:hover:after`,
      cssHover
    );

    props.editor.Css.setRule(
      `#${attr.id} ul.dropdown-menu li a:hover:before`,
      cssHover
    );

    props.editor.Css.setRule(
      `#${attr.id} ul.dropdown-menu li a.active:after`,
      cssActive
    );

    props.editor.Css.setRule(
      `#${attr.id} ul.dropdown-menu li a.active:before`,
      cssActive
    );
    cmp.setAttributes(attr);
    cmp.view.render();
    props.editor.setStyle(props.editor.getCss());
  };
  const changeSurvolSubBg = (color) => {
    setSurvolSubBgPickerColor(color);
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-survol-submenu-bg"] = color.rgbTxt;

    let r = props.editor.Css.getRule(
      `#${attr.id} ul.dropdown-menu li a:hover::`
    );
    let r2 = props.editor.Css.getRule(
      `#${attr.id} ul.dropdown-menu li a.active::`
    );
    let cssHover = [];
    let cssActive = [];
    if (r) cssHover = r.attributes.style;
    if (r2) cssActive = r2.attributes.style;
    if (cssHover) {
      cssHover["background"] = color.rgbTxt;
    }
    if (cssActive) {
      cssActive["background"] = color.rgbTxt;
    }
    props.editor.Css.remove(r);
    props.editor.Css.remove(r2);
    props.editor.Css.setRule(
      `#${attr.id} ul.dropdown-menu li a:hover`,
      cssHover
    );
    props.editor.Css.setRule(
      `#${attr.id} ul.dropdown-menu li a.active`,
      cssActive
    );
    cmp.setAttributes(attr);
    cmp.view.render();
    props.editor.setStyle(props.editor.getCss());
  };

  const changeBg = (color) => {
    setBgPickerColor(color);
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-bg"] = color.rgbTxt;

    let r = props.editor.Css.getRule(`#${attr.id}`);
    let css = null;
    if (r) css = r.attributes.style;
    if (css) {
      css["background"] = color.rgbTxt;
      props.editor.Css.setRule(`#${attr.id}`, css);
    } else {
      props.editor.Css.setRule(`#${attr.id}`, { background: color.rgbTxt });
    }

    cmp.setAttributes(attr);
    cmp.view.render();
    props.editor.setStyle(props.editor.getCss());
  };
  const changeBgSub = (color) => {
    setBgSubPickerColor(color);
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-bg-submenu"] = color.rgbTxt;

    let r = props.editor.Css.getRule(`#${attr.id} ul.dropdown-menu`);
    let css = null;
    if (r) css = r.attributes.style;
    if (css) {
      css["background"] = color.rgbTxt;
      props.editor.Css.setRule(`#${attr.id} ul.dropdown-menu`, css);
    } else {
      props.editor.Css.setRule(`#${attr.id} ul.dropdown-menu`, {
        background: color.rgbTxt,
      });
    }

    cmp.setAttributes(attr);
    cmp.view.render();
    props.editor.setStyle(props.editor.getCss());
  };
  const changeSeperator = (color) => {
    setSeparatorPickerColor(color);
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-seperator-color"] = color.rgbTxt;

    let r = props.editor.Css.getRule(`#${attr.id} ul li:before`);
    let css = null;
    if (r) css = r.attributes.style;
    if (css) {
      css["color"] = color.rgbTxt;
      props.editor.Css.setRule(`#${attr.id} ul li:before`, css);
    } else {
      props.editor.Css.setRule(`#${attr.id} ul li:before`, {
        color: color.rgbTxt,
      });
    }

    cmp.setAttributes(attr);
    cmp.view.render();
    props.editor.setStyle(props.editor.getCss());
  };

  const changeEspacementConfig = (e) => {
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-padding"] = JSON.stringify(e.padding);
    attr["data-margin"] = JSON.stringify(e.margin);

    cmp.setAttributes(attr);
    let r = props.editor.Css.getRule(`#${attr.id} ul li a`);
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
      props.editor.Css.setRule(`#${attr.id} ul li a`, css);
    } else {
      props.editor.Css.setRule(`#${attr.id} ul li a`, {
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
    setConfigEspacement(e);
    cmp.view.render();
    props.editor.setStyle(props.editor.getCss());
  };
  const changeEspacementConfigSubmenu = (e) => {
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-padding-submenu"] = JSON.stringify(e.padding);
    attr["data-margin-submenu"] = JSON.stringify(e.margin);

    cmp.setAttributes(attr);
    let r = props.editor.Css.getRule(`#${attr.id} ul.dropdown-menu li a`);
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
      props.editor.Css.setRule(`#${attr.id} ul.dropdown-menu li a`, css);
    } else {
      props.editor.Css.setRule(`#${attr.id} ul.dropdown-menu li a`, {
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
    setConfigEspacementSubmenu(e);
    cmp.view.render();
    props.editor.setStyle(props.editor.getCss());
  };

  const changeOngletConfig = (e) => {
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-font"] = e.font;
    attr["data-variant"] = e.variant;
    attr["data-size"] = JSON.stringify(e.size);
    attr["data-color"] = e.color;
    attr["data-align"] = e.align;
    cmp.setAttributes(attr);
    let r = props.editor.Css.getRule(`#${attr.id} ul li a`);
    let css = [];
    if (r) css = r.attributes.style;
    css["font-family"] = e.font;
    css["color"] = e.color;
    css["text-align"] = e.align;
    css["font-weight"] = e.variant;
    css["font-size"] = e.size.desktop + "px";
    css["line-height"] = e.size.desktop + "px";

    props.editor.Css.setRule(`#${attr.id} ul li a`, css);
    props.editor.Css.setRule(
      `#${attr.id} ul li a`,
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
      `#${attr.id} ul li a`,
      {
        "font-size": `${e.size.mobile}px`,
        "line-height": `${e.size.mobile}px`,
      },
      {
        atRuleType: "media",
        atRuleParams: "(max-width:767px)",
      }
    );
    cmp.view.render();
    props.editor.setStyle(props.editor.getCss());
    setConfigNav(e);
  };
  const changeSubOngletConfig = (e) => {
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-submenu-font"] = e.font;
    attr["data-submenu-variant"] = e.variant;
    attr["data-submenu-size"] = JSON.stringify(e.size);
    attr["data-submenu-color"] = e.color;
    attr["data-submenu-align"] = e.align;
    cmp.setAttributes(attr);
    let r = props.editor.Css.getRule(`#${attr.id} ul.dropdown-menu li a`);
    let css = [];
    if (r) css = r.attributes.style;
    css["font-family"] = e.font;
    css["color"] = e.color;
    css["text-align"] = e.align;
    css["font-weight"] = e.variant;
    css["font-size"] = e.size.desktop + "px";
    css["line-height"] = e.size.desktop + "px";

    props.editor.Css.setRule(`#${attr.id} ul.dropdown-menu li a`, css);
    props.editor.Css.setRule(
      `#${attr.id} ul.dropdown-menu li a`,
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
      `#${attr.id} ul.dropdown-menu li a`,
      {
        "font-size": `${e.size.mobile}px`,
        "line-height": `${e.size.mobile}px`,
      },
      {
        atRuleType: "media",
        atRuleParams: "(max-width:767px)",
      }
    );
    cmp.view.render();
    props.editor.setStyle(props.editor.getCss());
    setConfigSubNav(e);
  };

  return (
    <Modal
      dialogAs={DraggableModalDialog}
      show={show}
      backdrop="static"
      onHide={handleClose}
      centered
      id="ModalNavigation"
    >
      <Modal.Header closeButton className="handleDrag">
        <Modal.Title>Design de l'êntete</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <nav id="navbar-example2" class="navbar bg-light px-3 mb-3">
          <ul class="nav nav-pills">
            <li class="nav-item">
              <a class="nav-link" href="#miseenpage">
                Mise en page
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#pages">
                Pages
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#sousmenu">
                Sous-menu
              </a>
            </li>
          </ul>
        </nav>
        <div
          data-bs-spy="scroll"
          data-bs-target="#navbar-example2"
          data-bs-root-margin="0px 0px -40%"
          data-bs-smooth-scroll="true"
          class="scrollspy-example bg-light p-3 rounded-2"
          tabindex="0"
        >
          <span id="miseenpage" className="setting-title mb-2">
            Mise en page
          </span>
          <div class="setting models">
            <div className="d-flex justify-content-between align-items-center">
              <span class="d-block w-50">Orientation</span>
              <select
                value={orientation}
                onChange={(e) => setOrientation(e.target.value)}
                className="form-select w-50"
                aria-label="Default select example"
              >
                <option value="horizontal">Horizontal </option>
                <option value="horizontalwithlogo">Horizontal avec logo</option>
                <option value="vertical">Vertical</option>
              </select>
            </div>
          </div>
          <div class="setting models">
            <div className="d-flex justify-content-between align-items-center">
              <div
                className="models-button"
                onClick={(e) => setShowStylesList(true)}
              >
                <nav className={style}>
                  <ul className="list-unstyled d-flex justify-content-between align-align-items-center">
                    <li className="nav-item">
                      <a className="active" href="#">
                        Accueil
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="#">Services</a>
                    </li>
                    <li className="nav-item">
                      <a href="#">A propos</a>
                    </li>
                    <li className="nav-item">
                      <a href="#">Contact</a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
          <span id="pages" className="d-block setting-title mt-2 mb-2">
            Pages
          </span>
          <div class="setting models">
            <div class="accordion" id="accordionPages">
              <div class="accordion-item">
                <h2 class="accordion-header" id="headingOne">
                  <button
                    className="accordion-button collapsed text-center"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#pagesTab"
                    aria-expanded="false"
                    aria-controls="pagesTab"
                  >
                    Toutes les pages
                  </button>
                </h2>
                <div
                  id="pagesTab"
                  class="accordion-collapse collapse"
                  aria-labelledby="headingOne"
                  data-bs-parent="#accordionPages"
                >
                  <div class="accordion-body">
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
                          Style de lien
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
                          aria-controls="Stylelien"
                          aria-selected="false"
                        >
                          Texte du lien
                        </button>
                      </li>
                    </ul>
                    <div class="tab-content" id="myTabContent">
                      <div
                        className="tab-pane fade show active mb-3"
                        id="Stylelien"
                        role="tabpanel"
                        aria-labelledby="Stylelien-tab"
                      >
                        <ColorConfig
                          label="Couleur d'arrière-plan du cadre"
                          config={BgPickerColor}
                          setConfig={changeBg}
                        />
                        <div className="d-flex justify-content-between align-content-center mb-3">
                          <span>Position de menu </span>
                          <div className="seperators d-flex justify-content-around align-items-center">
                            <div class="form-check">
                              <input
                                onChange={(e) => setAlign(e.target.value)}
                                checked={align == "start"}
                                className="RadioInput"
                                type="radio"
                                value="start"
                                name="align"
                                id="start"
                              />
                              <label class="RadioLabel" for="start">
                                <i class="fas fa-long-arrow-alt-left"></i>
                              </label>
                            </div>
                            <div class="form-check">
                              <input
                                onChange={(e) => setAlign(e.target.value)}
                                checked={align == "center"}
                                className="RadioInput"
                                type="radio"
                                value="center"
                                name="align"
                                id="center"
                              />
                              <label class="RadioLabel" for="center">
                                <i class="fas fa-arrows-alt-h"></i>
                              </label>
                            </div>
                            <div class="form-check">
                              <input
                                onChange={(e) => setAlign(e.target.value)}
                                checked={align == "end"}
                                className="RadioInput"
                                type="radio"
                                value="end"
                                name="align"
                                id="end"
                              />
                              <label class="RadioLabel" for="end">
                                <i class="fas fa-long-arrow-alt-right"></i>
                              </label>
                            </div>
                          </div>
                        </div>
                        <div
                          className={
                            orientation == "horizontalwithlogo"
                              ? "d-flex justify-content-between align-items-center  mb-3"
                              : "d-none"
                          }
                        >
                          <label for="customRange2" class="form-label">
                            Largeur de logo
                          </label>

                          <div className="d-flex justify-content-between align-items-center">
                            <input
                              type="range"
                              min="50"
                              max="400"
                              step="1"
                              className="rangeInput me-2"
                              value={logoWidth}
                              onChange={(e) => setLogoWidth(e.target.value)}
                            />
                            <div class="input-with-label-pixel me-2">
                              <span class="pixel-label">px</span>
                              <input
                                min="50"
                                max="400"
                                class="form-control form-control-sm input-small-pixel"
                                type="number"
                                value={logoWidth}
                                onChange={(e) => setLogoWidth(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="d-flex justify-content-between align-content-center mb-3">
                          <span>Style de séparateur</span>
                          <div className="seperators d-flex justify-content-around align-items-center">
                            <div class="form-check">
                              <input
                                onChange={(e) => setSeperator("")}
                                checked={seperator == ""}
                                className="RadioInput"
                                type="radio"
                                value="seperator"
                                name="separtor"
                                id="seperator"
                              />
                              <label class=" RadioLabel" for="seperator">
                                none
                              </label>
                            </div>
                            <div class="form-check">
                              <input
                                onChange={(e) => setSeperator(e.target.value)}
                                checked={seperator == "seperatorOne"}
                                className="RadioInput"
                                type="radio"
                                value="seperatorOne"
                                name="separtor"
                                id="seperatorOne"
                              />
                              <label class=" RadioLabel" for="seperatorOne">
                                |
                              </label>
                            </div>
                            <div class="form-check">
                              <input
                                onChange={(e) => setSeperator(e.target.value)}
                                checked={seperator == "seperatorTwo"}
                                className="RadioInput"
                                type="radio"
                                value="seperatorTwo"
                                name="separtor"
                                id="seperatorTwo"
                              />
                              <label class="RadioLabel" for="seperatorTwo">
                                /
                              </label>
                            </div>
                            <div class="form-check">
                              <input
                                onChange={(e) => setSeperator(e.target.value)}
                                checked={seperator == "seperatorThree"}
                                className="RadioInput"
                                type="radio"
                                value="seperatorThree"
                                name="separtor"
                                id="seperatorThree"
                              />
                              <label class=" RadioLabel" for="seperatorThree">
                                :
                              </label>
                            </div>
                            <div class="form-check">
                              <input
                                onChange={(e) => setSeperator(e.target.value)}
                                checked={seperator == "seperatorFour"}
                                className="RadioInput"
                                type="radio"
                                value="seperatorFour"
                                name="separtor"
                                id="seperatorFour"
                              />
                              <label class=" RadioLabel" for="seperatorFour">
                                .
                              </label>
                            </div>
                          </div>
                        </div>
                        <ColorConfig
                          label="Couleur du separateur"
                          config={seperatorPickerColor}
                          setConfig={changeSeperator}
                        />
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <div class="panelTitle">Arrondis </div>
                          <ArrondisConfig
                            editor={props.editor}
                            siteId={props.siteId}
                            config={configRaduis}
                            setConfig={changeArrandisConfig}
                          />
                        </div>
                        <div className="mb-3">
                          <span>Espacement</span>
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
                        class="tab-pane fade"
                        id="textlien"
                        role="tabpanel"
                        aria-labelledby="textlien-tab"
                      >
                        <TextStylingComponent
                          key={"Nav"}
                          for={"Nav"}
                          editor={props.editor}
                          siteId={props.siteId}
                          config={configNav}
                          setConfig={changeOngletConfig}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="setting models">
            <div class="accordion" id="accordionPages">
              <div class="accordion-item">
                <h2 class="accordion-header" id="headingTwo">
                  <button
                    className="accordion-button collapsed text-center"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#survolTab"
                    aria-expanded="false"
                    aria-controls="survolTab"
                  >
                    Style du page sélectionnée et survol
                  </button>
                </h2>
                <div
                  id="survolTab"
                  class="accordion-collapse collapse"
                  aria-labelledby="headingTwo"
                  data-bs-parent="#accordionPages"
                >
                  <div class="accordion-body">
                    <ColorConfig
                      label="Couleur du text au survol"
                      config={SurvolTextPickerColor}
                      setConfig={changeSurvolText}
                    />

                    <ColorConfig
                      key="bg"
                      label="Background au survol"
                      config={SurvolBgPickerColor}
                      setConfig={changeSurvolBg}
                    />

                    <div className="d-flex justify-content-between align-items-center mb-3 Epaisseur">
                      <div className="w-75">Epaisseur de la police</div>

                      <select
                        value={fontVariant}
                        onChange={(e) => changeVariant(e.target.value)}
                        className="form-select w-25"
                        aria-label="Default select example"
                      >
                        <option value="100">light </option>
                        <option value="500">Normal </option>
                        <option value="900">Gras</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <span id="sousmenu" className="d-block setting-title mt-2 mb-2">
            Sous-menu
          </span>
          <div class="setting models">
            <div class="accordion" id="accordionSubmenu">
              <div class="accordion-item">
                <h2 class="accordion-header" id="headingTwo">
                  <button
                    className="accordion-button collapsed text-center"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#submenuTab"
                    aria-expanded="false"
                    aria-controls="submenuTab"
                  >
                    Style du sous-menu
                  </button>
                </h2>
                <div
                  id="submenuTab"
                  class="accordion-collapse collapse"
                  aria-labelledby="headingTwo"
                  data-bs-parent="#accordionSubmenu"
                >
                  <div class="accordion-body">
                    <ul class="nav nav-tabs mb-3" id="myTab" role="tablist">
                      <li class="nav-item" role="presentation">
                        <button
                          class="nav-link active"
                          id="Stylesublien-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#Stylesublien"
                          type="button"
                          role="tab"
                          aria-controls="Stylesublien"
                          aria-selected="true"
                        >
                          Style de lien
                        </button>
                      </li>
                      <li class="nav-item" role="presentation">
                        <button
                          class="nav-link"
                          id="textsublien-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#textsublien"
                          type="button"
                          role="tab"
                          aria-controls="Stylesublien"
                          aria-selected="false"
                        >
                          Texte du lien
                        </button>
                      </li>
                    </ul>
                    <div class="tab-content" id="myTabContent">
                      <div
                        className="tab-pane fade show active mb-3"
                        id="Stylesublien"
                        role="tabpanel"
                        aria-labelledby="Stylesublien-tab"
                      >
                        <div className="d-flex justify-content-between align-items-center  mb-3">
                          <label for="customRange2" class="form-label">
                            Largeur de sous menu version desktop
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
                                value={WidthSousMenu}
                                onChange={(e) => changeWidth(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                        <ColorConfig
                          label="Couleur d'arrière-plan du soumenu"
                          config={BgSubPickerColor}
                          setConfig={changeBgSub}
                        />

                        <div className="mb-3">
                          <span>Espacement</span>
                          <EspacementConfig
                            key={"submenu"}
                            for={"submenu"}
                            editor={props.editor}
                            siteId={props.siteId}
                            config={configEspacementSubmenu}
                            setConfig={changeEspacementConfigSubmenu}
                          />
                        </div>
                      </div>
                      <div
                        class="tab-pane fade"
                        id="textsublien"
                        role="tabpanel"
                        aria-labelledby="textsublien-tab"
                      >
                        <TextStylingComponent
                          key={"SubNav"}
                          for={"SubNav"}
                          editor={props.editor}
                          siteId={props.siteId}
                          config={configSubNav}
                          setConfig={changeSubOngletConfig}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="setting models">
            <div class="accordion" id="accordionSubmenu">
              <div class="accordion-item">
                <h2 class="accordion-header" id="headingTwo">
                  <button
                    className="accordion-button collapsed text-center"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#survolSubTab"
                    aria-expanded="false"
                    aria-controls="survolSubTab"
                  >
                    Style du sous-menu sélectionnée et survol
                  </button>
                </h2>
                <div
                  id="survolSubTab"
                  class="accordion-collapse collapse"
                  aria-labelledby="headingTwo"
                  data-bs-parent="#accordionSubmenu"
                >
                  <div class="accordion-body">
                    <ColorConfig
                      label="Couleur du text au survol de sous-menu"
                      config={SurvolSubTextPickerColor}
                      setConfig={changeSurvolSubText}
                    />
                    <ColorConfig
                      label="Background au survol de sous-menu"
                      config={SurvolSubBgPickerColor}
                      setConfig={changeSurvolSubBg}
                    />
                    <ColorConfig
                      label="Effet au survol de sous-menu"
                      config={SurvolSubEffetPickerColor}
                      setConfig={changeSurvolSubEffet}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={showStylesList ? "models-list p-3 d-block" : "d-none"}>
          <div class="text-end mb-3">
            <button
              type="button"
              onClick={handleCloseStylesList}
              class="btn-close"
              aria-label="Close"
            ></button>
          </div>
          {style_list.map((style) => {
            return (
              <div
                className="models-button mb-2"
                onClick={(e) => setStyle(style)}
              >
                <nav className={style}>
                  <ul className="list-unstyled d-flex justify-content-between align-align-items-center">
                    <li className="nav-item">
                      <a className="active" href="#">
                        Accueil
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="#">Services</a>
                    </li>
                    <li className="nav-item">
                      <a href="#">A propos</a>
                    </li>
                    <li className="nav-item">
                      <a href="#">Contact</a>
                    </li>
                  </ul>
                </nav>
              </div>
            );
          })}
        </div>
      </Modal.Body>
    </Modal>
  );
}
