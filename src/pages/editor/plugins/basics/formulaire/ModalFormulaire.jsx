import React, { useEffect, useState } from "react";
import { Collapse, Modal, ModalDialog } from "react-bootstrap";
import Draggable from "react-draggable";
import Nestable from "react-nestable";
import "./ModalFormulaire.css";
import { v4 as uuidv4 } from "uuid";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import FormModelOne from "../../../../../assets/ModelFrom/formone.jpg";
import FormModelTwo from "../../../../../assets/ModelFrom/formtow.jpg";
import FormModelThree from "../../../../../assets/ModelFrom/formthree.jpg";
import FormModelFour from "../../../../../assets/ModelFrom/formfour.jpg";
import TextStylingComponent from "../../../compoments/TextStyling/TextStylingComponent";
import BorderConfig from "../../../compoments/Border/BorderConfig";
import ColorConfig from "../../../compoments/Color/ColorConfig";
import ArrondisConfig from "../../../compoments/Arrondis/ArrondisConfig";

import EspacementConfig from "../../../compoments/Espacement/EspacementConfig";
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
export default function ModalFormulaire(props) {
  const [show, setShow] = useState(true);
  const [activeBorder, setActiveBorder] = useState(
    props.editor.getSelected().getAttributes()["data-activeborder"]
      ? props.editor.getSelected().getAttributes()["data-activeborder"]
      : "false"
  );
  const [activeSizeInput, setActiveSizeInput] = useState(
    props.editor.getSelected().getAttributes()["data-activesizeinput"]
      ? props.editor.getSelected().getAttributes()["data-activesizeinput"]
      : "false"
  );
  const [selectedItem, setSelectedItem] = useState("");
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [hasCustomClass, setHasCustomClass] = useState(false);

  const [items, setItems] = useState([]);

  const [form, setForm] = useState({
    id: props.editor.getSelected().getAttributes().id
      ? props.editor.getSelected().getAttributes().id
      : "form-" + uuidv4(),
    title: props.editor.getSelected().getAttributes()["name"]
      ? props.editor.getSelected().getAttributes()["name"]
      : "Formulaire du contact",
    captcha: props.editor.getSelected().getAttributes()["data-captcha"]
      ? props.editor.getSelected().getAttributes()["data-captcha"]
      : "true",
    dest: props.editor.getSelected().getAttributes()["data-destinataire"]
      ? props.editor.getSelected().getAttributes()["data-destinataire"]
      : "",
    publisite: props.editor.getSelected().getAttributes()["data-publisite"]
      ? props.editor.getSelected().getAttributes()["data-publisite"]
      : "",
    specific: props.editor.getSelected().getAttributes()["data-specific"]
      ? props.editor.getSelected().getAttributes()["data-specific"]
      : "false",
      idform: props.editor.getSelected().getAttributes()["data-idform"]
      ? props.editor.getSelected().getAttributes()["data-idform"]
      : "",
    submit: props.editor.getSelected().getAttributes()["data-submit"]
      ? props.editor.getSelected().getAttributes()["data-submit"]
      : "Envoyer",
  });
  const [sizeBtn, setSizeBtn] = useState(
    props.editor.getSelected().getAttributes()["data-width-btn"]
      ? JSON.parse(props.editor.getSelected().getAttributes()["data-width-btn"])
      : {
          desktop: "250",
          tablet: "250",
          mobile: "250",
        }
  );

  const [ConfigSizeEtiquette, setConfigSizeEtiquette] = useState({
    font: props.editor.getSelected().getAttributes()["data-et-font"]
      ? props.editor.getSelected().getAttributes()["data-et-font"]
      : "Arial",
    size: props.editor.getSelected().getAttributes()["data-et-size"]
      ? JSON.parse(props.editor.getSelected().getAttributes()["data-et-size"])
      : { desktop: "16", tablet: "16", mobile: "16" },
    line: props.editor.getSelected().getAttributes()["data-et-line"]
      ? JSON.parse(props.editor.getSelected().getAttributes()["data-et-line"])
      : { desktop: "16", tablet: "16", mobile: "16" },
    variant: props.editor.getSelected().getAttributes()["data-et-variant"]
      ? props.editor.getSelected().getAttributes()["data-et-variant"]
      : "500",
    align: props.editor.getSelected().getAttributes()["data-et-align"]
      ? props.editor.getSelected().getAttributes()["data-et-align"]
      : "left",
    color: props.editor.getSelected().getAttributes()["data-et-color"]
      ? props.editor.getSelected().getAttributes()["data-et-color"]
      : "#000",
  });
  // const [ConfigsizeTitle, setConfigsizeTitle] = useState({
  //   size: props.editor.getSelected().getAttributes()["data-title-size"]
  //     ? JSON.parse(
  //         props.editor.getSelected().getAttributes()["data-title-size"]
  //       )
  //     : { desktop: "16", tablet: "16", mobile: "16" },
  //     line: props.editor.getSelected().getAttributes()["data-title-line"]
  //     ? JSON.parse(
  //         props.editor.getSelected().getAttributes()["data-title-line"]
  //       )
  //     : { desktop: "16", tablet: "16", mobile: "16" },
  //   variant: props.editor.getSelected().getAttributes()["data-title-variant"]
  //     ? props.editor.getSelected().getAttributes()["data-title-variant"]
  //     : "500",
  //   align: props.editor.getSelected().getAttributes()["data-title-align"]
  //     ? props.editor.getSelected().getAttributes()["data-title-align"]
  //     : "left",
  //   color: props.editor.getSelected().getAttributes()["data-title-color"]
  //     ? props.editor.getSelected().getAttributes()["data-title-color"]
  //     : "#000",
  // });
  const [ConfigsizeTextBtn, setConfigsizeTextBtn] = useState({
    font: props.editor.getSelected().getAttributes()["data-btn-fonttext"]
      ? props.editor.getSelected().getAttributes()["data-btn-fonttext"]
      : "Arial",
    size: props.editor.getSelected().getAttributes()["data-btn-sizetext"]
      ? JSON.parse(
          props.editor.getSelected().getAttributes()["data-btn-sizetext"]
        )
      : { desktop: "16", tablet: "16", mobile: "16" },
    line: props.editor.getSelected().getAttributes()["data-btn-linetext"]
      ? JSON.parse(
          props.editor.getSelected().getAttributes()["data-btn-linetext"]
        )
      : { desktop: "16", tablet: "16", mobile: "16" },
    variant: props.editor.getSelected().getAttributes()["data-btn-varianttext"]
      ? props.editor.getSelected().getAttributes()["data-btn-varianttext"]
      : "500",
    align: props.editor.getSelected().getAttributes()["data-btn-aligntext"]
      ? props.editor.getSelected().getAttributes()["data-btn-aligntext"]
      : "left",
    color: props.editor.getSelected().getAttributes()["data-btn-colortext"]
      ? props.editor.getSelected().getAttributes()["data-btn-colortext"]
      : "#000",
  });
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
  const [configBorderButton, setConfigBorderButton] = useState({
    typeborder: props.editor.getSelected().getAttributes()["data-border-typebn"]
      ? props.editor.getSelected().getAttributes()["data-borderbn-typebn"]
      : "all",
    size: props.editor.getSelected().getAttributes()["data-border-sizebn"]
      ? JSON.parse(
          props.editor.getSelected().getAttributes()["data-border-sizebn"]
        )
      : {
          all: "1",
          top: "1",
          left: "1",
          right: "1",
          bottom: "1",
        },

    style: props.editor.getSelected().getAttributes()["data-border-stylebn"]
      ? props.editor.getSelected().getAttributes()["data-border-stylebn"]
      : "solid",

    color: props.editor.getSelected().getAttributes()["data-border-colorbn"]
      ? props.editor.getSelected().getAttributes()["data-border-colorbn"]
      : "#eee",
  });
  const [configRdButton, setConfigRdButton] = useState({
    arrondis: props.editor.getSelected().getAttributes()["data-border-sizebnrd"]
      ? JSON.parse(
          props.editor.getSelected().getAttributes()["data-border-sizebnrd"]
        )
      : {
          topLeft: "1",
          topRight: "1",
          bottomLeft: "1",
          bottomRight: "1",
        },
  });
  const [configRdChamp, setConfigRdChamp] = useState({
    arrondis: props.editor.getSelected().getAttributes()["data-border-sizechrd"]
      ? JSON.parse(
          props.editor.getSelected().getAttributes()["data-border-sizechrd"]
        )
      : {
          topLeft: "1",
          topRight: "1",
          bottomLeft: "1",
          bottomRight: "1",
        },
  });
  const [posAlignBtn, setPosAlignBtn] = useState({
    align: props.editor.getSelected().getAttributes()["data-pos-btn"]
      ? props.editor.getSelected().getAttributes()["data-pos-btn"]
      : "start",
  });
  const rgbtoJson = (rgbString) => {
    var s = rgbString;
    s = s.replace("rgb(", "");
    s = s.replace(")", "");
    let c = s.split(",");
    return { r: c[0], g: c[1], b: c[2], a: c[3] };
  };

  const [configBgInput, setConfigBgInput] = useState({
    rgbTxt: props.editor.getSelected().getAttributes()["data-input-bg"]
      ? props.editor.getSelected().getAttributes()["data-input-bg"]
      : "#fff",
    rgb: rgbtoJson(
      props.editor.getSelected().getAttributes()["data-input-bg"]
        ? props.editor.getSelected().getAttributes()["data-input-bg"]
        : "#fff"
    ),
  });
  const [configSaisiInput, setConfigSaisiInput] = useState({
    rgbTxt: props.editor.getSelected().getAttributes()["data-input-sa"]
      ? props.editor.getSelected().getAttributes()["data-input-sa"]
      : "#fff",
    rgb: rgbtoJson(
      props.editor.getSelected().getAttributes()["data-input-sa"]
        ? props.editor.getSelected().getAttributes()["data-input-sa"]
        : "#fff"
    ),
  });

  const [configSelectInput, setConfigSelectInput] = useState({
    rgbTxt: props.editor.getSelected().getAttributes()["data-input-selectcolor"]
      ? props.editor.getSelected().getAttributes()["data-input-selectcolor"]
      : "#fff",
    rgb: rgbtoJson(
      props.editor.getSelected().getAttributes()["data-input-selectcolor"]
        ? props.editor.getSelected().getAttributes()["data-input-selectcolor"]
        : "#fff"
    ),
  });
  const [configSelectInputBg, setConfigSelectInputBg] = useState({
    rgbTxt: props.editor.getSelected().getAttributes()["data-input-selectbg"]
      ? props.editor.getSelected().getAttributes()["data-input-selectbg"]
      : "#fff",
    rgb: rgbtoJson(
      props.editor.getSelected().getAttributes()["data-input-selectbg"]
        ? props.editor.getSelected().getAttributes()["data-input-selectbg"]
        : "#fff"
    ),
  });
  const [configBgButton, setConfigBgButton] = useState({
    rgbTxt: props.editor.getSelected().getAttributes()["data-btn-bg"]
      ? props.editor.getSelected().getAttributes()["data-btn-bg"]
      : "#198754",
    rgb: rgbtoJson(
      props.editor.getSelected().getAttributes()["data-btn-bg"]
        ? props.editor.getSelected().getAttributes()["data-btn-bg"]
        : "#198754"
    ),
  });
  const [configBgButtonhover, setConfigBgButtonhover] = useState({
    rgbTxt: props.editor.getSelected().getAttributes()["data-btn-bgh"]
      ? props.editor.getSelected().getAttributes()["data-btn-bgh"]
      : "#000",
    rgb: rgbtoJson(
      props.editor.getSelected().getAttributes()["data-btn-bgh"]
        ? props.editor.getSelected().getAttributes()["data-btn-bgh"]
        : "#000"
    ),
  });
  const [configBgButtontexthover, setConfigBgButtonTexthover] = useState({
    rgbTxt: props.editor.getSelected().getAttributes()["data-btn-text-hover"]
      ? props.editor.getSelected().getAttributes()["data-btn-text-hover"]
      : "#000",
    rgb: rgbtoJson(
      props.editor.getSelected().getAttributes()["data-btn-text-hover"]
        ? props.editor.getSelected().getAttributes()["data-btn-text-hover"]
        : "#000"
    ),
  });
  const [configEspacementChamps, setConfigEspacementChamps] = useState({
    padding: props.editor.getSelected().getAttributes()["data-ch-padding"]
      ? JSON.parse(
          props.editor.getSelected().getAttributes()["data-ch-padding"]
        )
      : {
          top: "5",
          left: "5",
          right: "5",
          bottom: "5",
        },
    margin: props.editor.getSelected().getAttributes()["data-ch-margin"]
      ? JSON.parse(props.editor.getSelected().getAttributes()["data-ch-margin"])
      : {
          top: "0",
          left: "0",
          right: "0",
          bottom: "0",
        },
  });
  const [configEspacementpl, setConfigEspacementpl] = useState({
    padding: props.editor.getSelected().getAttributes()["data-pl-padding"]
      ? JSON.parse(
          props.editor.getSelected().getAttributes()["data-pl-padding"]
        )
      : {
          top: "0",
          left: "0",
          right: "0",
          bottom: "0",
        },
    margin: props.editor.getSelected().getAttributes()["data-pl-margin"]
      ? JSON.parse(props.editor.getSelected().getAttributes()["data-pl-margin"])
      : {
          top: "0",
          left: "0",
          right: "0",
          bottom: "0",
        },
  });
  const [configEspacementBtn, setConfigEspacementBtn] = useState({
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
  // const changetitleConfig = (e) => {
  //   const cmp = props.editor.getSelected();
  //   let attr = cmp.getAttributes();
  //   attr["data-title-variant"] = e.variant;
  //   attr["data-title-size"] = JSON.stringify(e.size);
  //   attr["data-title-line"] = JSON.stringify(e.line);
  //   attr["data-title-color"] = e.color;
  //   attr["data-title-align"] = e.align;

  //   cmp.setAttributes(attr);
  //   let r = props.editor.Css.getRule(`#${attr.id} h3`);
  //   let css = [];
  //   if (r) css = r.attributes.style;

  //     css["color"]= e.color;
  //     css["font-family"]= e.font;
  //     css["color"]= e.color;
  //     css["text-align"]= e.align;
  //     css["font-weight"]= e.variant;
  //     css["font-size"]= e.size.desktop + "px";
  //     css["line-height"]= e.line.desktop + "px";
  //     props.editor.Css.remove(r)
  //     props.editor.Css.setRule(
  //       `#${attr.id} h3`,
  //     css)
  //   props.editor.Css.setRule(
  //     `#${attr.id} h3`,
  //     {
  //       "font-size": `${e.size.tablet}px`,
  //       "line-height": `${e.size.tablet}px`,
  //     },
  //     {
  //       atRuleType: "media",
  //       atRuleParams: "(min-width: 768px) and (max-width:991px)",
  //     }
  //   );
  //   props.editor.Css.setRule(
  //     `#${attr.id} h3`,
  //     {
  //       "font-size": `${e.size.mobile}px`,
  //       "line-height": `${e.size.mobile}px`,
  //     },
  //     {
  //       atRuleType: "media",
  //       atRuleParams: "(max-width:767px)",
  //     }
  //   );
  //   setConfigsizeTitle(e);
  // };

  const changeEtiquetteConfig = (e) => {
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-et-font"] = e.font;
    attr["data-et-variant"] = e.variant;
    attr["data-et-size"] = JSON.stringify(e.size);
    attr["data-et-line"] = JSON.stringify(e.line);
    attr["data-et-color"] = e.color;
    attr["data-et-align"] = e.align;
    cmp.setAttributes(attr);

    let r = props.editor.Css.getRule(
      `#${attr.id} .form-label,#${attr.id} .form-check-label,#${attr.id} label ,#${attr.id} label.hidelabel`
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
      `#${attr.id} .form-label,#${attr.id} .form-check-label,#${attr.id} label ,#${attr.id} label.hidelabel`,
      css
    );

    let r_tablet = props.editor.Css.getRule(
      `#${attr.id} .form-label,#${attr.id} .form-check-label,#${attr.id} label ,#${attr.id} label.hidelabel`,
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
      `#${attr.id} .form-label,#${attr.id} .form-check-label,#${attr.id} label ,#${attr.id} label.hidelabel`,
      {
        atRuleType: "media",
        atRuleParams: "(min-width:768px) and (max-width:991px)",
      }
    );
    props.editor.Css.setRule(
      `#${attr.id} .form-label,#${attr.id} .form-check-label,#${attr.id} label ,#${attr.id} label.hidelabel`,
      cssTablet,
      {
        atRuleType: "media",
        atRuleParams: "(min-width:768px) and (max-width:991px)",
      }
    );

    let r_Mobile = props.editor.Css.getRule(
      `#${attr.id} .form-label,#${attr.id} .form-check-label,#${attr.id} label ,#${attr.id} label.hidelabel`,
      {
        atRuleType: "media",
        atRuleParams: "(max-width: 767px)",
      }
    );
    console.log("first");
    let cssMobile = {};
    if (r_Mobile) cssMobile = r_Mobile.attributes.style;

    cssMobile["font-size"] = `${e.size.mobile}px`;
    cssMobile["line-height"] = `${e.line.mobile}px`;

    props.editor.Css.remove(r_Mobile);
    props.editor.Css.remove(
      `#${attr.id} .form-label,#${attr.id} .form-check-label,#${attr.id} label ,#${attr.id} label.hidelabel`,
      {
        atRuleType: "media",
        atRuleParams: "(max-width:767px)",
      }
    );
    props.editor.Css.setRule(
      `#${attr.id} .form-label,#${attr.id} .form-check-label,#${attr.id} label ,#${attr.id} label.hidelabel`,
      cssMobile,
      {
        atRuleType: "media",
        atRuleParams: "(max-width:767px)",
      }
    );
    setConfigSizeEtiquette(e);
    props.editor.setStyle(props.editor.getCss());
  };

  const changetextBtnConfig = (e) => {
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();

    attr["data-btn-fonttext"] = e.font;
    attr["data-btn-varianttext"] = e.variant;
    attr["data-btn-sizetext"] = JSON.stringify(e.size);
    attr["data-btn-colortext"] = e.color;
    attr["data-btn-aligntext"] = e.align;
    cmp.setAttributes(attr);

    let r = props.editor.Css.getRule(`#${attr.id} [type="submit"]`);
    let css = {};
    if (r) css = r.attributes.style;
    css["font-family"] = e.font;
    css["color"] = e.color;
    css["text-align"] = e.align;
    css["font-weight"] = e.variant;
    css["font-size"] = e.size.desktop + "px";
    css["line-height"] = e.line.desktop + "px";
    props.editor.Css.setRule(`#${attr.id} [type="submit"]`, css);

    let r_tablet = props.editor.Css.getRule(`#${attr.id} [type="submit"]`, {
      atRuleType: "media",
      atRuleParams: "(min-width: 768px) and (max-width: 991px)",
    });
    let cssTablet = {};
    if (r_tablet) cssTablet = r_tablet.attributes.style;
    cssTablet["font-size"] = e.size.tablet + "px";
    cssTablet["line-height"] = e.line.tablet + "px";
    props.editor.Css.remove(r_tablet);
    props.editor.Css.remove(`#${attr.id} [type="submit"]`, {
      atRuleType: "media",
      atRuleParams: "(min-width:768px) and (max-width:991px)",
    });
    props.editor.Css.setRule(`#${attr.id} [type="submit"]`, cssTablet, {
      atRuleType: "media",
      atRuleParams: "(min-width:768px) and (max-width:991px)",
    });

    let r_Mobile = props.editor.Css.getRule(`#${attr.id} [type="submit"]`, {
      atRuleType: "media",
      atRuleParams: "(max-width: 767px)",
    });
    console.log("first");
    let cssMobile = {};
    if (r_Mobile) cssMobile = r_Mobile.attributes.style;

    cssMobile["font-size"] = `${e.size.mobile}px`;
    cssMobile["line-height"] = `${e.line.mobile}px`;

    props.editor.Css.remove(r_Mobile);
    props.editor.Css.remove(`#${attr.id} [type="submit"]`, {
      atRuleType: "media",
      atRuleParams: "(max-width:767px)",
    });
    props.editor.Css.setRule(`#${attr.id} [type="submit"]`, cssMobile, {
      atRuleType: "media",
      atRuleParams: "(max-width:767px)",
    });
    setConfigsizeTextBtn(e);
    props.editor.setStyle(props.editor.getCss());
  };

  const changeRaduisButton = (e) => {
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-border-sizebnrd"] = JSON.stringify(e.arrondis);
    cmp.setAttributes(attr);
    let r = props.editor.Css.getRule(`#${attr.id} [type="submit"]`);
    let css = [];
    if (r) css = r.attributes.style;

    css["border-top-left-radius"] = e.arrondis.topLeft + "px";
    css["border-top-right-radius"] = e.arrondis.topRight + "px";
    css["border-bottom-left-radius"] = e.arrondis.bottomLeft + "px";
    css["border-bottom-right-radius"] = e.arrondis.bottomRight + "px";
    props.editor.Css.remove(r);
    props.editor.Css.setRule(`#${attr.id} [type="submit"]`, css);
    setConfigRdButton(e);

    css["border-top-left-radius"] = e.arrondis.topLeft + "px";
    css["border-top-right-radius"] = e.arrondis.topRight + "px";
    css["border-bottom-left-radius"] = e.arrondis.bottomLeft + "px";
    css["border-bottom-right-radius"] = e.arrondis.bottomRight + "px";
    props.editor.Css.remove(r);
    props.editor.Css.setRule(`#${attr.id} [type="submit"]`, css);
    setConfigRdButton(e);
    props.editor.setStyle(props.editor.getCss());
    cmp.view.render();
  };
  // const changePostionBtn = (position) => {
  //   let cmp = props.editor.getSelected();
  //   let attr = cmp.getAttributes();

  //   attr["data-pos-btn"] = position;
  //   cmp.setAttributes(attr);
  //   props.editor.Css.setRule(`#${attr.id} .btnforms`, {
  //     display: "flex",
  //     "justify-content": position,
  //   });

  //   setPosAlignBtn({ align: position });
  // };

  const changePostionBtn = (position) => {
    let cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    let device = props.editor.Devices.getSelected().id;
    if (device == "mobile2") {
      let r = props.editor.Css.getRule(
        `#${attr.id} .btnforms,#${attr.id}.${selectedItem} .btnforms`,
        {
          atRuleType: "media",
          atRuleParams: "(max-width:767px)",
        }
      );
      let css = [];
      if (r) css = r.attributes.style;
      css["justify-content"] = position;
      css["display"] = "flex";
      props.editor.Css.setRule(
        `#${attr.id} .btnforms,#${attr.id}.${selectedItem} .btnforms`,
        css,
        {
          atRuleType: "media",
          atRuleParams: "(max-width:767px)",
        }
      );
    } else {
      let r = props.editor.Css.getRule(
        `#${attr.id} .btnforms,#${attr.id}.${selectedItem} .btnforms`
      );
      let css = [];
      if (r) css = r.attributes.style;
      css["display"] = "flex";
      css["justify-content"] = position;
      props.editor.Css.setRule(
        `#${attr.id} .btnforms,#${attr.id}.${selectedItem} .btnforms`,
        css
      );
    }

    attr["data-pos-btn"] = position;
    cmp.setAttributes(attr);

    setPosAlignBtn({ align: position });
    props.editor.setStyle(props.editor.getCss());
  };
  const changedestination = (dest) => {
    let cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();

    attr["data-destination"] = dest;
    setForm({ ...form, dest: dest });
    cmp.setAttributes(attr);
  };
  const changePublisite = (site) => {
    let cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();

    attr["data-publisite"] = site;
    setForm({ ...form, publisite: site });
    cmp.setAttributes(attr);
  };
  const changeIDform = (id) => {
    let cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();

    attr["data-idform"] = id;
    setForm({ ...form, idform: id });
    cmp.setAttributes(attr);
  };
  const changeSpecific = (value) => {
    let cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();

    attr["data-specific"] = value;
    setForm({ ...form, specific: value });
    cmp.setAttributes(attr);
  };
  // const changeEspacemetTitre = (e) => {
  //   const cmp = props.editor.getSelected();
  //   let attr = cmp.getAttributes();
  //   attr["data-title-padding"] = JSON.stringify(e.padding);
  //   attr["data-title-margin"] = JSON.stringify(e.margin);

  //   cmp.setAttributes(attr);
  //   let r = props.editor.Css.getRule(`#${attr.id} h3`);
  //   let css = [];
  //   if (r) css = r.attributes.style;
  //     css["padding-top"] = e.padding.top + "px";
  //     css["padding-bottom"] = e.padding.bottom + "px";
  //     css["padding-right"] = e.padding.right + "px";
  //     css["padding-left"] = e.padding.left + "px";
  //     css["margin-top"] = e.margin.top + "px";
  //     css["margin-bottom"] = e.margin.bottom + "px";
  //     css["margin-right"] = e.margin.right + "px";
  //     css["margin-left"] = e.margin.left + "px";

  //     setConfigEspacementTitre(e);

  //     props.editor.Css.remove(r);
  //     props.editor.Css.setRule(
  //       `#${attr.id} h3`,
  //       css
  //     );

  //   let cssStyles = props.editor.getCss();
  //   props.editor.setStyle(cssStyles);
  //   cmp.view.render();
  // };
  const changeEspacementChamps = (e) => {
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-ch-padding"] = JSON.stringify(e.padding);
    attr["data-ch-margin"] = JSON.stringify(e.margin);

    cmp.setAttributes(attr);
    let r = props.editor.Css.getRule(
      `#${attr.id} .iputs,#${attr.id} .textarias, #${attr.id} .form-check-label`
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
      `#${attr.id} .iputs,#${attr.id} .textarias, #${attr.id} .form-check-label`,
      css
    );
    setConfigEspacementChamps(e);

    props.editor.Css.remove(r);
    props.editor.Css.setRule(`#${attr.id} .iputs,#${attr.id} .textarias`, css);
    setConfigEspacementChamps(e);
    props.editor.setStyle(props.editor.getCss());
    cmp.view.render();
  };

  const changeEspacementplaceholder = (e) => {
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-pl-padding"] = JSON.stringify(e.padding);
    attr["data-pl-margin"] = JSON.stringify(e.margin);

    cmp.setAttributes(attr);
    let r = props.editor.Css.getRule(
      `#${attr.id} input::placeholder,#${attr.id} textarea::placeholder`
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
      `#${attr.id} input::placeholder,#${attr.id} textarea::placeholder`,
      css
    );
    setConfigEspacementpl(e);

    props.editor.Css.remove(r);
    props.editor.Css.setRule(
      `#${attr.id} input::placeholder,#${attr.id} textarea::placeholder`,
      css
    );
    setConfigEspacementpl(e);
    props.editor.setStyle(props.editor.getCss());
    cmp.view.render();
  };
  const changeEspacementBtn = (e) => {
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-btn-padding"] = JSON.stringify(e.padding);
    attr["data-btn-margin"] = JSON.stringify(e.margin);

    cmp.setAttributes(attr);
    let r = props.editor.Css.getRule(`#${attr.id} [type="submit"]`);
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
    props.editor.Css.setRule(`#${attr.id} [type="submit"]`, css);
    setConfigEspacementBtn(e);

    let cssStyles = props.editor.getCss();
    props.editor.setStyle(cssStyles);
    cmp.view.render();
  };
  const changeRaduisChamp = (e) => {
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-border-sizechrd"] = JSON.stringify(e.arrondis);
    cmp.setAttributes(attr);
    let r = props.editor.Css.getRule(
      `#${attr.id} .form-control,#${attr.id}.${selectedItem} .form-control,#${attr.id} .form-check-input[type=checkbox],#${attr.id} .form-select`
    );
    let css = [];
    if (r) css = r.attributes.style;

    css["border-top-left-radius"] = e.arrondis.topLeft + "px";
    css["border-top-right-radius"] = e.arrondis.topRight + "px";
    css["border-bottom-left-radius"] = e.arrondis.bottomLeft + "px";
    css["border-bottom-right-radius"] = e.arrondis.bottomRight + "px";
    props.editor.Css.remove(r);
    props.editor.Css.setRule(
      `#${attr.id} .form-control,#${attr.id}.${selectedItem} .form-control,#${attr.id} .form-check-input[type=checkbox],#${attr.id} .form-select`,
      css
    );
    setConfigRdChamp(e);

    let cssStyles = props.editor.getCss();
    props.editor.setStyle(cssStyles);
    cmp.view.render();
  };

  const changeBorderButton = (e) => {
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-border-sizebn"] = JSON.stringify(e.size);
    attr["data-border-stylebn"] = e.style;
    attr["data-border-colorbn"] = e.color;
    attr["data-border-typebn"] = e.typeborder;

    cmp.setAttributes(attr);
    let r = props.editor.Css.getRule(`#${attr.id} [type="submit"]`);
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
    props.editor.Css.setRule(`#${attr.id} [type="submit"]`, css);
    setConfigBorderButton(e);
    props.editor.setStyle(props.editor.getCss());
    cmp.view.render();
  };

  const changeSize = (device, value) => {
    let cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    let s = { ...sizeBtn };
    s[device] = value;
    setSizeBtn(s);
    attr["data-width-btn"] = JSON.stringify(s);
    cmp.setAttributes(attr);
    let r = props.editor.Css.getRule(`#${attr.id} [type="submit"]`);
    let css = {};
    if (r) css = r.attributes.style;
    css["width"] = s.desktop + "px";
    props.editor.Css.setRule(`#${attr.id} [type="submit"]`, css);

    let r_tablet = props.editor.Css.getRule(`#${attr.id} [type="submit"]`, {
      atRuleType: "media",
      atRuleParams: "(min-width: 768px) and (max-width:991px)",
    });
    let cssTablet = {};
    if (r_tablet) css = r_tablet.attributes.style;
    cssTablet["width"] = s.tablet + "px";

    let r_Mobile = props.editor.Css.getRule(`#${attr.id} [type="submit"]`, {
      atRuleType: "media",
      atRuleParams: "(max-width: 767px)",
    });

    let cssMobile = {};
    if (r_Mobile) css = r_Mobile.attributes.style;

    cssMobile["width"] = s.mobile + "px";
    props.editor.Css.setRule(`#${attr.id} [type="submit"]`, cssTablet, {
      atRuleType: "media",
      atRuleParams: "(min-width: 768px) and (max-width:991px)",
    });
    props.editor.Css.setRule(`#${attr.id} [type="submit"]`, cssMobile, {
      atRuleType: "media",
      atRuleParams: "(max-width: 767px)",
    });

    let cssStyles = props.editor.getCss();
    props.editor.setStyle(cssStyles);
  };

  const changeBorder = (e) => {
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-border-size"] = JSON.stringify(e.size);
    attr["data-border-style"] = e.style;
    attr["data-border-color"] = e.color;
    attr["data-border-type"] = e.typeborder;

    cmp.setAttributes(attr);
    let r = props.editor.Css.getRule(
      `#${attr.id} .form-control,#${attr.id} .form-select`
    );
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
    props.editor.Css.setRule(
      `#${attr.id} .form-control,#${attr.id} .form-select`,
      css
    );
    setConfigBorder(e);
    props.editor.setStyle(props.editor.getCss());
    cmp.view.render();
  };
  const changeBackgroundIput = (e) => {
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-input-bg"] = e.rgbTxt;

    cmp.setAttributes(attr);
    let r = props.editor.Css.getRule(
      `#${attr.id} input.form-control,#${attr.id} textarea.form-control`
    );
    let css = [];
    if (r) css = r.attributes.style;
    css["background"] = e.rgbTxt;
    props.editor.Css.remove(r);
    props.editor.Css.setRule(
      `#${attr.id} input.form-control,#${attr.id} textarea.form-control`,
      css
    );
    setConfigBgInput(e);
    props.editor.setStyle(props.editor.getCss());
    cmp.view.render();
  };
  const changeSaisiIput = (e) => {
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-input-sa"] = e.rgbTxt;
    cmp.setAttributes(attr);
    let r = props.editor.Css.getRule(
      `#${attr.id} div input.form-control ,#${attr.id} div textarea.form-control,#${attr.id}.${selectedItem} .form-control::placeholder,#${attr.id} input[type=file],#${attr.id} .form-select`
    );
    let css = [];
    if (r) css = r.attributes.style;
    css["color"] = e.rgbTxt;
    props.editor.Css.setRule(
      `#${attr.id} div input.form-control ,#${attr.id} div textarea.form-control,#${attr.id}.${selectedItem} .form-control::placeholder,#${attr.id} input[type=file],#${attr.id} .form-select`,
      css
    );
    setConfigSaisiInput(e);
    props.editor.setStyle(props.editor.getCss());
    cmp.view.render();
  };

  const changeSelectInput = (e) => {
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-input-selectcolor"] = e.rgbTxt;
    cmp.setAttributes(attr);
    let r = props.editor.Css.getRule(`#${attr.id} .form-select option`);
    let css = [];
    if (r) css = r.attributes.style;
    css["color"] = e.rgbTxt;
    props.editor.Css.setRule(`#${attr.id}  .form-select option`, css);
    setConfigSelectInput(e);
    props.editor.setStyle(props.editor.getCss());
    cmp.view.render();
  };
  const changeSelectInputBg = (e) => {
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-input-selectbg"] = e.rgbTxt;
    cmp.setAttributes(attr);
    let r = props.editor.Css.getRule(`#${attr.id} .form-select`);
    let css = [];
    if (r) css = r.attributes.style;
    css["background"] = e.rgbTxt;
    props.editor.Css.setRule(`#${attr.id}  .form-select`, css);
    setConfigSelectInputBg(e);
    props.editor.setStyle(props.editor.getCss());
    cmp.view.render();
  };
  const changeBackgroundBtn = (e) => {
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-btn-bg"] = e.rgbTxt;

    cmp.setAttributes(attr);
    let r = props.editor.Css.getRule(`#${attr.id} [type="submit"]`);
    let css = [];
    if (r) css = r.attributes.style;
    css["background"] = e.rgbTxt;

    props.editor.Css.remove(r);
    props.editor.Css.setRule(`#${attr.id} [type="submit"]`, css);
    setConfigBgButton(e);
    props.editor.setStyle(props.editor.getCss());
    cmp.view.render();
  };
  const changeBackgroundBtnHover = (e) => {
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-btn-bgh"] = e.rgbTxt;

    cmp.setAttributes(attr);
    let r = props.editor.Css.getRule(`#${attr.id} [type=submit]:hover`);
    let css = [];
    if (r) css = r.attributes.style;
    css["background"] = e.rgbTxt;
    props.editor.Css.remove(r);
    props.editor.Css.setRule(`#${attr.id}   [type=submit]:hover`, css);
    setConfigBgButtonhover(e);
    props.editor.setStyle(props.editor.getCss());
    cmp.view.render();
  };
  const changeBackgroundBtnTextHover = (e) => {
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-btn-text-hover"] = e.rgbTxt;

    cmp.setAttributes(attr);
    let r = props.editor.Css.getRule(`#${attr.id} [type=submit]:hover`);
    let css = [];
    if (r) css = r.attributes.style;
    css["color"] = e.rgbTxt;
    props.editor.Css.remove(r);
    props.editor.Css.setRule(`#${attr.id} [type=submit]:hover`, css);
    setConfigBgButtonTexthover(e);
    props.editor.setStyle(props.editor.getCss());
    cmp.view.render();
  };
  const changeModel = (key) => {
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    let classes = cmp.getClasses().filter((x) => x.indexOf("Model") == -1);
    switch (key) {
      case "FormModelOne":
      case "FormModelTwo":
      case "FormModelThree":
      case "FormModelFour":
        items.activelabel = "true";
        classes.push(key);
        cmp.setClass(classes);
        break;
      default:
        key = "FormModelOne";
        break;
    }

    cmp.setClass(classes);
    setSelectedItem(key);
    let r = props.editor.Css.getRule(`#${attr.id} .form-control`);
    props.editor.Css.remove(r);
    props.editor.setStyle(props.editor.getCss());
    cmp.view.render();
  };
  const handleAddItemClick = () => {
    const newItem = {
      id: "input-" + uuidv4(),
      title: `Title or question ${items.length + 1}`,
      type: "texte",
      placeholder: "Contenu du item",
      options: [],
      required: "false",
      activelabel: "true",
      activeInputP: "false",
      size: "100",
      position: "false",
    };

    setItems([...items, newItem]); // Use setItems to update the state
  };
  const updateItemOptions = (itemId, updatedOptions) => {
    const updatedItems = [...items];
    const itemIndex = updatedItems.findIndex((i) => i.id === itemId);
    updatedItems[itemIndex].options = updatedOptions;
    setItems(updatedItems);
  };

  const [Options, setOptions] = useState([]);
  const handleAddOptions = () => {
    const updatedItems = [...items];
    // Find the index of the item to update
    const itemIndex = updatedItems.findIndex((i) => i.id === selectedItemId);
    const newOption = {
      id: "input-" + uuidv4(),
      value: "option",
      label: "label " + updatedItems[itemIndex].options.length,
    };
    updatedItems[itemIndex].options.push(newOption);
    // Set the updated array back into the state
    setItems(updatedItems);
  };
  const handleItemClickOption = (itemId) => {
    setSelectedOption(itemId === selectedOption ? null : itemId);
  };
  const handleRemoveOptions = (itemId) => {
    const updatedItems = [...items];
    // Find the index of the item to update
    const itemIndex = updatedItems.findIndex((i) => i.id === selectedItemId);
    // Update the title property of the specific item
    let opts = updatedItems[itemIndex].options.filter(
      (opt) => opt.id !== itemId
    );
    updatedItems[itemIndex].options = opts;
    // Set the updated array back into the state
    setItems(updatedItems);
  };
  const handleItemClicks = (itemId) => {
    setSelectedItemId(itemId === selectedItemId ? null : itemId);
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleRemoveItemClick = (itemId) => {
    const updatedItems = items.filter((item) => item.id !== itemId);
    setItems(updatedItems);
  };

  useEffect(() => {
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    let modelKey = cmp.getClasses().filter((x) => x.indexOf("Model") > -1)[0];

    setItems(
      attr["data-items"]
        ? JSON.parse(attr["data-items"])
        : [
            {
              id: "input-" + uuidv4(),
              title: `Nom`,
              type: "texte",
              placeholder: "Nom",
              options: [],
              required: "false",
              activelabel: "true",
              activeInputP: "false",
              size: "100",
              position: "false",
            },
            {
              id: "input-" + uuidv4(),
              title: `Prénom`,
              type: "texte",
              placeholder: "Prénom",
              options: [],
              required: "false",
              activelabel: "true",
              activeInputP: "false",
              size: "100",
              position: "false",
            },
            {
              id: "input-" + uuidv4(),
              title: `Téléphone`,
              type: "number",
              placeholder: "Téléphone",
              options: [],
              required: "false",
              activelabel: "true",
              activeInputP: "false",
              size: "100",
              position: "false",
            },
            {
              id: "input-" + uuidv4(),
              title: `Email`,
              type: "email",
              placeholder: "Email",
              options: [],
              required: "false",
              activelabel: "true",
              activeInputP: "false",
              size: "100",
              position: "false",
            },
            {
              id: "input-" + uuidv4(),
              title: `Message`,
              type: "textarea",
              placeholder: "Message",
              options: [],
              required: "false",
              activelabel: "true",
              activeInputP: "false",
              size: "100",
              position: "false",
            },
          ]
    );
    props.editor.setStyle(props.editor.getCss());
    cmp.view.render();
    setSelectedItem(modelKey);
    if (attr["data-activeborder"] == "false") {
      changeModel(modelKey);
    }
  }, []);
  useEffect(() => {
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-activeborder"] = activeBorder;
    attr["data-activesizeinput"] = activeSizeInput;
    cmp.setAttributes(attr);
  }, [activeBorder, activeSizeInput]);

  useEffect(() => {
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();

    let tabsNavsHtml = ``;
    items.map((item, i) => {
      switch (item.type) {
        case "texte":
        case "numero":
        case "email":
        case "date":
        case "file":
          tabsNavsHtml += `
          <div class="${
            item.activeInputP === "true" ? "d-inline-block  iputs" : " iputs"
          }" style="${
            activeSizeInput === "true" ? `width: ${item.size}%` : ""
          }">
              <label for="input-${item.id}" class=${
            item.activelabel == "false" ? "hidelabel" : "form-label"
          }>
              ${item.title}</label>
              <input type="${
                item.type
              }" class="form-control mb-1  me-2"   name="${
            item.title
          }" placeholder="${item.title}" id="input-${item.id}" ${
            item.required == "true" ? "required" : ""
          } />
            </div>`;
          break;
        case "hidden":
          tabsNavsHtml += `
          <div class="${
            item.activeInputP === "true" ? "d-inline-block  iputs" : " iputs"
          }" style="${
            activeSizeInput === "true" ? `width: ${item.size}%` : ""
          }">
            
              <input type="hidden" class="form-control mb-1  me-2"   name="${
                item.title
              }" placeholder="${item.title}" id="input-${item.id}" ${
            item.required == "true" ? "required" : ""
          } />
            </div>`;
          break;
        case "checkbox":
          tabsNavsHtml += `<div class="${
            item.activeInputP == "true" ? "d-inline-block iputs" : "iputs"
          }" > 
          <div class="${
            item.position == "true"
              ? "input-group d-block"
              : "input-group d-flex"
          }">`;
          item.options.map((opt) => {
            tabsNavsHtml += `
            <div class=" form-check">
              <input class="form-check-input" type="checkbox"  value="${
                opt.label
              }"  name="${opt.label}" id="input-${opt.id}" ${
              item.required == "true" ? "required" : ""
            } />
              <label class="form-check-label"  for="input-${opt.id}">
                ${opt.label}
              </label>
            </div>  
           `;
          });
          tabsNavsHtml += `</div></div>`;
          break;
        case "radio":
          tabsNavsHtml += `<div class="${
            item.activeInputP == "true" ? "d-inline-block  iputs" : "iputs "
          }"> 
           <div class="${
             item.position == "true"
               ? "input-group d-block "
               : "input-group d-flex "
           }">`;
          item.options.map((opt) => {
            tabsNavsHtml += `
                <div  class="d-flex me-2 form-check align-items-center">
                  <input class="form-check-input  me-2" type="radio" value="${
                    opt.label
                  }"  name="${opt.label}" id="input-${opt.id}" ${
              item.required == "true" ? "required" : ""
            } />
                  <label  class="form-check-label" for="input-${opt.id}">
                    ${opt.label}
                  </label>
                </div>`;
          });
          tabsNavsHtml += `</div></div>`;

          break;

        case "select":
          tabsNavsHtml += `<div class="${
            item.activeInputP == "true" ? "d-inline-block  iputs" : "iputs "
          }"> 
          <label for="input-${item.id}" class=${
            item.activelabel == "false" ? "hidelabel" : "form-label"
          }>
              ${item.title}</label>
          <select class="form-select" aria-label="Default select example">
          <option class="special"  selected disabled>${item.title}</option>`;
          item.options.map((opt) => {
            tabsNavsHtml += `
            <option  class="special" name="${opt.value}" value="${opt.value}" >  ${opt.label}</option>`;
          });
          tabsNavsHtml += `</select> </div>`;
          break;
        case "textarea":
          tabsNavsHtml += `
          <div class="${
            item.activeInputP == "true"
              ? "d-inline-block iputs mb-3"
              : " textarias  mb-3"
          }"> 
            <label for="input-${item.id}" class=${
            item.activelabel == "false" ? "hidelabel" : "form-label"
          }>${item.title}</label>
            
              <textarea style="height:100px"class="form-control" name="${
                item.title
              }"placeholder="${item.title}" id="input-${item.id}" ${
            item.required == "true" ? "required" : ""
          }></textarea>

            </div>`;
          break;
        default:
          tabsNavsHtml += `
          <div class="${
            item.activeInputP == "true" ? "d-inline-block  iputs" : " iputs "
          }"> 
              <label for="exampleFormControlInput1"   class="form-label">${
                item.title
              }</label>
              <input type="${item.type}" class="form-control mt-3"  name="${
            item.title
          }" placeholder="${item.title}" id="input-${item.id}"${
            item.required == "true" ? "required" : ""
          } />
            </div>`;
      }
    });
    if (form.captcha != "false") {
      tabsNavsHtml += `<div class="mt-2 mb-2 g-recaptcha captcha-${form.id}" id="captcha-${form.id}"  data-sitekey="${process.env.REACT_APP_GOOGLE_CAPTCHA_KEY}"></div>`;
    }
    tabsNavsHtml += `<div class="btnforms"><input type="submit"  id="submit-${form.id}" class="btn btn-success"  value="${form.submit}" /></div>`;
    attr["data-title"] = form.title;
    attr["name"] = form.title;
    attr["data-site"] = props.siteId;
    attr["data-destinataire"] = form.dest;
    attr["data-submit"] = form.submit;
    attr["data-captcha"] = form.captcha;
    attr["data-items"] = JSON.stringify(items);
    cmp.components(tabsNavsHtml);

    cmp.setAttributes(attr);
    props.editor.setStyle(props.editor.getCss());
    cmp.view.render();
  }, [items, form]);

  return (
    <div id="modalgallery">
      <Modal
        dialogAs={DraggableModalDialog}
        show={show}
        backdrop="static"
        onHide={handleClose}
        id="ModalFormulaire"
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
                <button
                  className="nav-link tt"
                  id="nav-destinataire-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-destinataire"
                  type="button"
                  role="tab"
                  aria-controls="nav-destinataire"
                  aria-selected="false"
                >
                  Destinataire & Webhook
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
              <span className="title-popups">Contenu Formulaire</span>

              <div className="structmodals">
                <div class="mb-3 p-3">
                  <label for={"title-" + form.id} class="form-label">
                    Titre du formulaire
                  </label>
                  <input
                    onChange={(e) => {
                      setForm({ ...form, title: e.target.value });
                    }}
                    type="text"
                    class="form-control"
                    id={"title-" + form.id}
                    value={form.title || "Formulaire du contact"}
                    placeholder={form.title}
                  />
                </div>
                <div class="mb-3 p-3">
                  <label for={"submit-" + form.id} class="form-label">
                    Text du boutton
                  </label>
                  <input
                    onChange={(e) => {
                      setForm({ ...form, submit: e.target.value });
                    }}
                    type="text"
                    class="form-control"
                    id={"submit-" + form.id}
                    placeholder={form.submit}
                    value={form.submit || "Envoyer"}
                  />
                </div>
                <div class="form-check form-switch mb-3 p-3">
                  <label class="form-check-label" for={"captcha-" + form.id}>
                    Activer le captcha
                  </label>
                  <input
                    class="form-check-input"
                    checked={form.captcha == "true"}
                    type="checkbox"
                    role="switch"
                    id={"captcha-" + form.id}
                    onChange={(e) =>
                      setForm({ ...form, captcha: e.target.checked.toString() })
                    }
                  />
                </div>
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
                            <div>
                              <div className="  mb-3 p-3">
                                <div
                                  className="closeopation"
                                  onClick={() => handleItemClicks(item.id)}
                                >
                                  <i class="fa-regular fa-circle-xmark"></i>
                                </div>
                                <label className="d-block">Type de champ</label>
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
                                  <option value="texte">Texte</option>{" "}
                                  <option value="hidden">Hidden</option>{" "}
                                  <option value="radio">Buttons radio</option>{" "}
                                  <option value="checkbox">
                                    Cases à cocher
                                  </option>{" "}
                                  <option value="select">Select</option>{" "}
                                  <option value="date">Date</option>
                                  <option value="email">E-mail</option>
                                  <option value="numero">Numéro</option>
                                  <option value="file">File</option>
                                  <option value="textarea">Texte libre</option>
                                </select>
                              </div>

                              <div className="p-1">
                                {[
                                  "texte",
                                  "hidden",
                                  "numero",
                                  "email",
                                  "textarea",
                                  "file",
                                ].includes(item.type) ? (
                                  <>
                                    <div className="form-check form-switch p-3">
                                      <label
                                        class="form-check-label"
                                        for={item.id}
                                      >
                                        {item.activelabel == "true" ? (
                                          <span>
                                            {" "}
                                            <i class="fa-thin fa-eye"></i>{" "}
                                            Etiquette{" "}
                                          </span>
                                        ) : (
                                          <span>
                                            {" "}
                                            <i class="fa-solid fa-eye-slash"></i>{" "}
                                            Etiquette{" "}
                                          </span>
                                        )}
                                      </label>
                                      <input
                                        className={`form-check-input ${
                                          item.activelabel ? "active" : ""
                                        }`}
                                        type="checkbox"
                                        checked={item.activelabel == "true"}
                                        onChange={(e) => {
                                          // Clone the items array
                                          const updatedItems = [...items];
                                          // Find the index of the item to update
                                          const itemIndex =
                                            updatedItems.findIndex(
                                              (i) => i.id === item.id
                                            );
                                          // Update the title property of the specific item
                                          updatedItems[itemIndex].activelabel =
                                            e.target.checked.toString();
                                          // Set the updated array back into the state
                                          setItems(updatedItems);
                                        }}
                                      />
                                    </div>
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
                                          const itemIndex =
                                            updatedItems.findIndex(
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
                                    <label className=" mt-2 p-2  ">
                                      Espace réserver
                                    </label>
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
                                          const itemIndex =
                                            updatedItems.findIndex(
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
                                    <div className="form-check form-switch p-3">
                                      <label
                                        class="form-check-label"
                                        for={item.required}
                                      >
                                        Champ obligatoire
                                      </label>

                                      <input
                                        className={`form-check-input ${
                                          item.required ? "active" : ""
                                        }`}
                                        type="checkbox"
                                        checked={item.required == "true"}
                                        onChange={(e) => {
                                          // Clone the items array
                                          const updatedItems = [...items];
                                          // Find the index of the item to update
                                          const itemIndex =
                                            updatedItems.findIndex(
                                              (i) => i.id === item.id
                                            );
                                          // Update the title property of the specific item
                                          updatedItems[itemIndex].required =
                                            e.target.checked.toString();
                                          // Set the updated array back into the state
                                          setItems(updatedItems);
                                        }}
                                      />
                                    </div>
                                    <div class="form-check form-switch mb-3 p-3">
                                      <label
                                        class="form-check-label"
                                        for={activeBorder}
                                      >
                                        <i class="fas fa-desktop me-1"></i>{" "}
                                        <i class="fas fa-tablet me-1"></i>{" "}
                                        Activer taille champs
                                      </label>
                                      <input
                                        class="form-check-input"
                                        checked={activeSizeInput == "true"}
                                        type="checkbox"
                                        role="switch"
                                        onChange={(e) =>
                                          setActiveSizeInput(
                                            e.target.checked.toString()
                                          )
                                        }
                                      />
                                    </div>
                                    {selectedItem != null ? (
                                      <div className=" p-3 ">
                                        {activeSizeInput == "true" ? (
                                          <>
                                            <div className="d-flex justify-content-between  align-items-center  ">
                                              <div className="panelTitle  ">
                                                Taille du champ
                                              </div>
                                              <input
                                                type="range"
                                                min="0"
                                                max="100"
                                                step="1"
                                                className="rangeInput me-2"
                                                value={item.size}
                                                onChange={(e) => {
                                                  // Clone the items array
                                                  const updatedItems = [
                                                    ...items,
                                                  ];
                                                  // Find the index of the item to update
                                                  const itemIndex =
                                                    updatedItems.findIndex(
                                                      (i) => i.id === item.id
                                                    );
                                                  // Update the title property of the specific item
                                                  updatedItems[itemIndex].size =
                                                    e.target.value;
                                                  // Set the updated array back into the state
                                                  setItems(updatedItems);
                                                }}
                                              />
                                              <div className="input-with-label-pixel">
                                                <span className="pixel-label">
                                                  {" "}
                                                  %
                                                </span>
                                                <input
                                                  min="0"
                                                  max="100"
                                                  className="form-control form-control-sm input-small-pixel"
                                                  type="number"
                                                  value={item.size}
                                                  onChange={(e) => {
                                                    // Clone the items array
                                                    const updatedItems = [
                                                      ...items,
                                                    ];
                                                    // Find the index of the item to update
                                                    const itemIndex =
                                                      updatedItems.findIndex(
                                                        (i) => i.id === item.id
                                                      );
                                                    // Update the title property of the specific item
                                                    updatedItems[
                                                      itemIndex
                                                    ].size = e.target.value;
                                                    // Set the updated array back into the state
                                                    setItems(updatedItems);
                                                  }}
                                                />
                                              </div>
                                            </div>

                                            <div className="form-check form-switch  mt-2 p-1 ">
                                              <label
                                                class="form-check-label"
                                                for={item.id}
                                              >
                                                {item.activeInputP == "true" ? (
                                                  <span>
                                                    {" "}
                                                    <i class="fa-solid fa-arrows-left-right-to-line"></i>{" "}
                                                    Deux champs meme ligne{" "}
                                                  </span>
                                                ) : (
                                                  <span>
                                                    {" "}
                                                    <i class="fa-solid fa-arrows-turn-right"></i>{" "}
                                                    Seul champ dans une ligne{" "}
                                                  </span>
                                                )}
                                              </label>
                                              <input
                                                className={`form-check-input ${
                                                  item.activeInputP
                                                    ? "active"
                                                    : ""
                                                }`}
                                                type="checkbox"
                                                checked={
                                                  item.activeInputP == "true"
                                                }
                                                onChange={(e) => {
                                                  // Clone the items array
                                                  const updatedItems = [
                                                    ...items,
                                                  ];
                                                  // Find the index of the item to update
                                                  const itemIndex =
                                                    updatedItems.findIndex(
                                                      (i) => i.id === item.id
                                                    );
                                                  // Update the title property of the specific item
                                                  updatedItems[
                                                    itemIndex
                                                  ].activeInputP =
                                                    e.target.checked.toString();
                                                  // Set the updated array back into the state
                                                  setItems(updatedItems);
                                                }}
                                              />
                                            </div>
                                          </>
                                        ) : (
                                          ""
                                        )}
                                      </div>
                                    ) : (
                                      ""
                                    )}
                                  </>
                                ) : ["date"].includes(item.type) ? (
                                  <>
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
                                          const itemIndex =
                                            updatedItems.findIndex(
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
                                    <div className="form-check form-switch p-3">
                                      <label
                                        class="form-check-label"
                                        for={item.id}
                                      >
                                        {item.activelabel == "true" ? (
                                          <i class="fa-thin fa-eye"></i>
                                        ) : (
                                          <i class="fa-solid fa-eye-slash"></i>
                                        )}
                                      </label>
                                      <input
                                        className={`form-check-input ${
                                          item.activelabel ? "active" : ""
                                        }`}
                                        type="checkbox"
                                        checked={item.activelabel == "true"}
                                        onChange={(e) => {
                                          // Clone the items array
                                          const updatedItems = [...items];
                                          // Find the index of the item to update
                                          const itemIndex =
                                            updatedItems.findIndex(
                                              (i) => i.id === item.id
                                            );
                                          // Update the title property of the specific item
                                          updatedItems[itemIndex].activelabel =
                                            e.target.checked.toString();
                                          // Set the updated array back into the state
                                          setItems(updatedItems);
                                        }}
                                      />
                                    </div>
                                    <div className="d-flex justify-content-between  align-items-center p-3 ">
                                      <div className="panelTitle  ">
                                        Taille du champ
                                      </div>
                                      <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        step="1"
                                        className="rangeInput me-2"
                                        value={item.size}
                                        onChange={(e) => {
                                          // Clone the items array
                                          const updatedItems = [...items];
                                          // Find the index of the item to update
                                          const itemIndex =
                                            updatedItems.findIndex(
                                              (i) => i.id === item.id
                                            );
                                          // Update the title property of the specific item
                                          updatedItems[itemIndex].size =
                                            e.target.value;
                                          // Set the updated array back into the state
                                          setItems(updatedItems);
                                        }}
                                      />
                                      <div className="input-with-label-pixel">
                                        <span className="pixel-label"> %</span>
                                        <input
                                          min="0"
                                          max="100"
                                          className="form-control form-control-sm input-small-pixel"
                                          type="number"
                                          value={item.size}
                                          onChange={(e) => {
                                            // Clone the items array
                                            const updatedItems = [...items];
                                            // Find the index of the item to update
                                            const itemIndex =
                                              updatedItems.findIndex(
                                                (i) => i.id === item.id
                                              );
                                            // Update the title property of the specific item
                                            updatedItems[itemIndex].size =
                                              e.target.value;
                                            // Set the updated array back into the state
                                            setItems(updatedItems);
                                          }}
                                        />
                                      </div>
                                    </div>
                                    <div className="form-check form-switch p-3">
                                      <label
                                        class="form-check-label"
                                        for={item.id}
                                      >
                                        {item.activeInputP == "true" ? (
                                          <span>
                                            {" "}
                                            <i class="fa-solid fa-arrows-left-right-to-line"></i>{" "}
                                            Deux champs meme ligne{" "}
                                          </span>
                                        ) : (
                                          <span>
                                            {" "}
                                            <i class="fa-solid fa-arrows-turn-right"></i>{" "}
                                            Seul champ dans une ligne{" "}
                                          </span>
                                        )}
                                      </label>
                                      <input
                                        className={`form-check-input ${
                                          item.activeInputP ? "active" : ""
                                        }`}
                                        type="checkbox"
                                        checked={item.activeInputP == "true"}
                                        onChange={(e) => {
                                          // Clone the items array
                                          const updatedItems = [...items];
                                          // Find the index of the item to update
                                          const itemIndex =
                                            updatedItems.findIndex(
                                              (i) => i.id === item.id
                                            );
                                          // Update the title property of the specific item
                                          updatedItems[itemIndex].activeInputP =
                                            e.target.checked.toString();
                                          // Set the updated array back into the state
                                          setItems(updatedItems);
                                        }}
                                      />
                                    </div>
                                  </>
                                ) : (
                                  <div className="optionform">
                                    <Nestable
                                      className={
                                        item.options.length == "0"
                                          ? "d-none"
                                          : "d-block"
                                      }
                                      maxDepth={1}
                                      items={item.options}
                                      renderItem={({ item }) => (
                                        <div className="contentaccordion ">
                                          <div
                                            className={
                                              selectedOption == item.id
                                                ? "itemlaction active"
                                                : "itemlaction "
                                            }
                                            onClick={() =>
                                              handleItemClickOption(item.id)
                                            }
                                            idProp={"_id"}
                                            disebled={hasCustomClass}
                                          >
                                            <div>
                                              <span>{item.label}</span>
                                            </div>
                                            <div>
                                              <button
                                                onClick={() =>
                                                  handleRemoveOptions(item.id)
                                                }
                                              >
                                                <i class="fa-sharp fa-solid fa-xmark"></i>
                                              </button>
                                            </div>
                                          </div>
                                        </div>
                                      )}
                                      onChange={({ Options }) =>
                                        setOptions(Options)
                                      }
                                    />
                                    <div
                                      className={
                                        selectedOption != null
                                          ? "additem active"
                                          : "additem"
                                      }
                                    >
                                      <button
                                        onClick={(e) => handleAddOptions()}
                                      >
                                        {" "}
                                        <i class="fa-solid fa-plus"></i> Ajouter
                                        une option
                                      </button>
                                      {item.type == "radio" ||
                                      item.type == "checkbox" ? (
                                        <>
                                          <div className="form-check form-switch mb-3 p-3">
                                            <label className="form-check-label">
                                              Orientation
                                            </label>

                                            {item.position == "true" ? (
                                              <label
                                                className=" btnspostion"
                                                for={item.id}
                                              >
                                                Vertical
                                              </label>
                                            ) : (
                                              <label
                                                className=" btnspostion"
                                                for={item.id}
                                              >
                                                Horizontal
                                              </label>
                                            )}

                                            <input
                                              className="form-check-input "
                                              checked={item.position == "true"}
                                              type="checkbox"
                                              role="switch"
                                              id={item.id}
                                              onChange={(e) => {
                                                // Clone the items array
                                                const updatedItems = [...items];
                                                // Find the index of the item to update
                                                const itemIndex =
                                                  updatedItems.findIndex(
                                                    (i) => i.id === item.id
                                                  );
                                                // Update the title property of the specific item
                                                updatedItems[
                                                  itemIndex
                                                ].position =
                                                  e.target.checked.toString();
                                                // Set the updated array back into the state
                                                setItems(updatedItems);
                                              }}
                                            />
                                          </div>
                                          <div className="d-flex justify-content-between  align-items-center p-3 ">
                                            <div className="panelTitle  ">
                                              Taille du champ
                                            </div>
                                            <input
                                              type="range"
                                              min="0"
                                              max="100"
                                              step="1"
                                              className="rangeInput me-2"
                                              value={item.size}
                                              onChange={(e) => {
                                                // Clone the items array
                                                const updatedItems = [...items];
                                                // Find the index of the item to update
                                                const itemIndex =
                                                  updatedItems.findIndex(
                                                    (i) => i.id === item.id
                                                  );
                                                // Update the title property of the specific item
                                                updatedItems[itemIndex].size =
                                                  e.target.value;
                                                // Set the updated array back into the state
                                                setItems(updatedItems);
                                              }}
                                            />
                                            <div className="input-with-label-pixel">
                                              <span className="pixel-label">
                                                {" "}
                                                %
                                              </span>
                                              <input
                                                min="0"
                                                max="100"
                                                className="form-control form-control-sm input-small-pixel"
                                                type="number"
                                                value={item.size}
                                                onChange={(e) => {
                                                  // Clone the items array
                                                  const updatedItems = [
                                                    ...items,
                                                  ];
                                                  // Find the index of the item to update
                                                  const itemIndex =
                                                    updatedItems.findIndex(
                                                      (i) => i.id === item.id
                                                    );
                                                  // Update the title property of the specific item
                                                  updatedItems[itemIndex].size =
                                                    e.target.value;
                                                  // Set the updated array back into the state
                                                  setItems(updatedItems);
                                                }}
                                              />
                                            </div>
                                          </div>
                                          <div className="form-check form-switch p-3">
                                            <label
                                              class="form-check-label"
                                              for={item.id}
                                            >
                                              {item.activeInputP == "true" ? (
                                                <span>
                                                  {" "}
                                                  <i class="fa-solid fa-arrows-left-right-to-line"></i>{" "}
                                                  Deux champs meme ligne{" "}
                                                </span>
                                              ) : (
                                                <span>
                                                  {" "}
                                                  <i class="fa-solid fa-arrows-turn-right"></i>{" "}
                                                  Seul champ dans une ligne{" "}
                                                </span>
                                              )}
                                            </label>
                                            <input
                                              className={`form-check-input ${
                                                item.activeInputP
                                                  ? "active"
                                                  : ""
                                              }`}
                                              type="checkbox"
                                              checked={
                                                item.activeInputP == "true"
                                              }
                                              onChange={(e) => {
                                                // Clone the items array
                                                const updatedItems = [...items];
                                                // Find the index of the item to update
                                                const itemIndex =
                                                  updatedItems.findIndex(
                                                    (i) => i.id === item.id
                                                  );
                                                // Update the title property of the specific item
                                                updatedItems[
                                                  itemIndex
                                                ].activeInputP =
                                                  e.target.checked.toString();
                                                // Set the updated array back into the state
                                                setItems(updatedItems);
                                              }}
                                            />
                                          </div>
                                        </>
                                      ) : (
                                        <>
                                          {" "}
                                          <div className="form-check form-switch p-3">
                                            <label
                                              class="form-check-label"
                                              for={item.id}
                                            >
                                              {item.activelabel == "true" ? (
                                                <span>
                                                  {" "}
                                                  <i class="fa-thin fa-eye"></i>{" "}
                                                  Etiquette{" "}
                                                </span>
                                              ) : (
                                                <span>
                                                  {" "}
                                                  <i class="fa-solid fa-eye-slash"></i>{" "}
                                                  Etiquette{" "}
                                                </span>
                                              )}
                                            </label>
                                            <input
                                              className={`form-check-input ${
                                                item.activelabel ? "active" : ""
                                              }`}
                                              type="checkbox"
                                              checked={
                                                item.activelabel == "true"
                                              }
                                              onChange={(e) => {
                                                // Clone the items array
                                                const updatedItems = [...items];
                                                // Find the index of the item to update
                                                const itemIndex =
                                                  updatedItems.findIndex(
                                                    (i) => i.id === item.id
                                                  );
                                                // Update the title property of the specific item
                                                updatedItems[
                                                  itemIndex
                                                ].activelabel =
                                                  e.target.checked.toString();
                                                // Set the updated array back into the state
                                                setItems(updatedItems);
                                              }}
                                            />
                                          </div>
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
                                                const itemIndex =
                                                  updatedItems.findIndex(
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
                                        </>
                                      )}
                                      {item.options.map((opt) => {
                                        return (
                                          <div key={opt.id}>
                                            {selectedOption === opt.id && (
                                              <div>
                                                <label className="mt-2 p-2">
                                                  Titre
                                                </label>
                                                <div className="p-2 mr-2 input-group input-group-sm">
                                                  <input
                                                    className="form-control"
                                                    type="text"
                                                    placeholder={opt.value}
                                                    value={opt.label}
                                                    onChange={(e) => {
                                                      const updatedOptions = [
                                                        ...item.options,
                                                      ];
                                                      const optionIndex =
                                                        updatedOptions.findIndex(
                                                          (o) => o.id === opt.id
                                                        );
                                                      updatedOptions[
                                                        optionIndex
                                                      ].label = e.target.value;
                                                      updateItemOptions(
                                                        item.id,
                                                        updatedOptions
                                                      );
                                                    }}
                                                  />
                                                </div>
                                              </div>
                                            )}
                                          </div>
                                        );
                                      })}
                                    </div>
                                  </div>
                                )}
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
              <span className="title-popups"> Design Formulaire</span>
              <nav id="navbar-example2" class="navbar bg-light px-3 mb-3">
                <ul class="nav nav-pills">
                  {/* <li class="nav-item">
                    <a class="nav-link" href="#scrollspyHeading2">
                      Titres
                    </a>
                  </li> */}
                  <li class="nav-item">
                    <a class="nav-link" href="#scrollspyHeading3">
                      Champs
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#scrollspyHeading4">
                      Buttons
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
                  <span className="titre mt-4 mb-4 ">Mise en page</span>
                  <div className="d-flex justify-content-center align-items-center mb-3">
                    <div className="panelContnet">
                      <div className="btn-group dropend">
                        <img
                          src={
                            selectedItem === "FormModelOne"
                              ? FormModelOne
                              : selectedItem === "FormModelTwo"
                              ? FormModelTwo
                              : selectedItem === "FormModelThree"
                              ? FormModelThree
                              : selectedItem === "FormModelFour"
                              ? FormModelFour
                              : FormModelThree
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
                            onClick={(e) => changeModel("FormModelOne")}
                            className={
                              selectedItem === "FormModelOne"
                                ? "selecterd mb-3 imgstype"
                                : "mb-3 imgstype"
                            }
                          >
                            <img src={FormModelOne} alt={FormModelOne} />
                          </div>
                          <div
                            onClick={(e) => changeModel("FormModelTwo")}
                            className={
                              selectedItem === "FormModelTwo"
                                ? "selecterd mb-3 imgstype"
                                : "mb-3 imgstype"
                            }
                          >
                            <img src={FormModelTwo} alt={FormModelTwo} />
                          </div>
                          <div
                            onClick={(e) => changeModel("FormModelThree")}
                            className={
                              selectedItem === "FormModelThree"
                                ? "selecterd mb-3 imgstype"
                                : "mb-3 imgstype"
                            }
                          >
                            <img src={FormModelThree} alt={FormModelThree} />
                          </div>
                          <div
                            onClick={(e) => changeModel("FormModelFour")}
                            className={
                              selectedItem === "FormModelFour"
                                ? "selecterd mb-3 imgstype"
                                : "mb-3 imgstype"
                            }
                          >
                            <img src={FormModelFour} alt={FormModelFour} />
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
                      {/* <div class="accordion-item" id="scrollspyHeading2">
                        <h2 class="accordion-header" id="headingOne">
                          <button
                            class="accordion-button"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseOne"
                            aria-expanded="true"
                            aria-controls="collapseOne"
                          >
                            Design titres
                          </button>
                        </h2>
                        <div
                          id="collapseOne"
                          class="accordion-collapse collapse"
                          aria-labelledby="headingOne"
                          data-bs-parent="#accordionExample"
                        >
                          <div class="accordion-body">
                            <ul
                              class="nav nav-tabs mt-3 mb-3"
                              id="pills-tab"
                              role="tablist"
                            >
                              <li class="nav-item" role="presentation">
                                <button
                                  class="nav-link active"
                                  id="pills-home-tab"
                                  data-bs-toggle="pill"
                                  data-bs-target="#pills-home"
                                  type="button"
                                  role="tab"
                                  aria-controls="pills-home"
                                  aria-selected="true"
                                >
                                  Styles
                                </button>
                              </li>
                              <li class="nav-item" role="presentation">
                                <button
                                  class="nav-link"
                                  id="pills-profile-tab"
                                  data-bs-toggle="pill"
                                  data-bs-target="#pills-profile"
                                  type="button"
                                  role="tab"
                                  aria-controls="pills-profile"
                                  aria-selected="false"
                                >
                                  Espacement
                                </button>
                              </li>
                            </ul>
                            <div class="tab-content" id="pills-tabContent">
                              <div
                                class="tab-pane fade show active"
                                id="pills-home"
                                role="tabpanel"
                                aria-labelledby="pills-home-tab"
                              >
                                <div className="mt-3 mb-3">
                                  <TextStylingComponent
                                    key={"texte"}
                                    for={"texte"}
                                    editor={props.editor}
                                    siteId={props.siteId}
                                    config={ConfigsizeTitle}
                                    setConfig={changetitleConfig}
                                  />
                                </div>
                              </div>
                              <div
                                class="tab-pane fade"
                                id="pills-profile"
                                role="tabpanel"
                                aria-labelledby="pills-profile-tab"
                              >
                                <EspacementConfig
                                  key={"estitle"}
                                  for={"esstitle"}
                                  editor={props.editor}
                                  siteId={props.siteId}
                                  config={configEspacementTitre}
                                  setConfig={changeEspacemetTitre}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div> */}
                      <div class="accordion-item" id="scrollspyHeading3">
                        <h2 class="accordion-header" id="headingTow">
                          <button
                            class="accordion-button"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseTow"
                            aria-expanded="true"
                            aria-controls="collapseTow"
                          >
                            Design champs
                          </button>
                        </h2>
                        <div
                          id="collapseTow"
                          class="accordion-collapse collapse show"
                          aria-labelledby="headingTow"
                          data-bs-parent="#accordionExample"
                        >
                          <div class="accordion-body">
                            <ul
                              class="nav nav-tabs mt-3 mb-3"
                              id="pills-tab"
                              role="tablist"
                            >
                              <li class="nav-item" role="presentation">
                                <button
                                  class="nav-link active"
                                  id="pills-champs-tab"
                                  data-bs-toggle="pill"
                                  data-bs-target="#pills-champs"
                                  type="button"
                                  role="tab"
                                  aria-controls="pills-champs"
                                  aria-selected="true"
                                >
                                  Champs
                                </button>
                              </li>
                              <li class="nav-item" role="presentation">
                                <button
                                  class="nav-link"
                                  id="pills-et-ch-tab"
                                  data-bs-toggle="pill"
                                  data-bs-target="#pills-et-ch"
                                  type="button"
                                  role="tab"
                                  aria-controls="pills-et-ch"
                                  aria-selected="false"
                                >
                                  Etiquette
                                </button>
                              </li>
                              <li class="nav-item" role="presentation">
                                <button
                                  class="nav-link"
                                  id="pills-es-ch-tab"
                                  data-bs-toggle="pill"
                                  data-bs-target="#pills-es-ch"
                                  type="button"
                                  role="tab"
                                  aria-controls="pills-es-ch"
                                  aria-selected="false"
                                >
                                  Espacement
                                </button>
                              </li>
                            </ul>
                            <div class="tab-content" id="pills-tabContent">
                              <div
                                class="tab-pane fade show active"
                                id="pills-champs"
                                role="tabpanel"
                                aria-labelledby="pills-champs-tab"
                              >
                                <div class="form-check form-switch mb-3 p-2">
                                  <label
                                    class="form-check-label"
                                    for={activeBorder}
                                  >
                                    Activer border
                                  </label>
                                  <input
                                    class="form-check-input"
                                    checked={activeBorder == "true"}
                                    type="checkbox"
                                    role="switch"
                                    onChange={(e) =>
                                      setActiveBorder(
                                        e.target.checked.toString()
                                      )
                                    }
                                  />
                                </div>
                                {activeBorder == "true" ? (
                                  <div className="mt-3 mb-3">
                                    <BorderConfig
                                      key={"champ"}
                                      for={"champ"}
                                      editor={props.editor}
                                      siteId={props.siteId}
                                      config={configBorder}
                                      setConfig={changeBorder}
                                    />
                                  </div>
                                ) : (
                                  ""
                                )}

                                <div className="d-flex justify-content-between align-items-center mb-2">
                                  <div className="blockTitle m-2">
                                    Arrondis en px
                                  </div>
                                  <ArrondisConfig
                                    key={"champrd"}
                                    for={"champrd"}
                                    editor={props.editor}
                                    siteId={props.siteId}
                                    config={configRdChamp}
                                    setConfig={changeRaduisChamp}
                                  />
                                </div>
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                  <div className="blockTitle m-2">
                                    Arriére du champ
                                  </div>
                                  <ColorConfig
                                    key={"input"}
                                    for={"input"}
                                    editor={props.editor}
                                    siteId={props.siteId}
                                    config={configBgInput}
                                    setConfig={changeBackgroundIput}
                                  />
                                </div>
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                  <div className="blockTitle m-2">
                                    Couleur du Saisie
                                  </div>
                                  <ColorConfig
                                    key={"saisiechamps"}
                                    for={"saisiechamps"}
                                    editor={props.editor}
                                    siteId={props.siteId}
                                    config={configSaisiInput}
                                    setConfig={changeSaisiIput}
                                  />
                                </div>

                                <div className="d-flex justify-content-between align-items-center mb-2">
                                  <div className="blockTitle m-2">
                                    Couleur du champ select
                                  </div>
                                  <ColorConfig
                                    key={"champselect"}
                                    for={"champselect"}
                                    editor={props.editor}
                                    siteId={props.siteId}
                                    config={configSelectInput}
                                    setConfig={changeSelectInput}
                                  />
                                </div>
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                  <div className="blockTitle m-2">
                                    Font du Champ select
                                  </div>
                                  <ColorConfig
                                    key={"selectbg"}
                                    for={"selectbg"}
                                    editor={props.editor}
                                    siteId={props.siteId}
                                    config={configSelectInputBg}
                                    setConfig={changeSelectInputBg}
                                  />
                                </div>
                                <div id="placeEs" className="mt-3 mb-3">
                                  <div className="blockTitle m-2">
                                    {" "}
                                    Espacement placeholder
                                  </div>
                                  <EspacementConfig
                                    key={"eschpl"}
                                    for={"eschpl"}
                                    editor={props.editor}
                                    siteId={props.siteId}
                                    config={configEspacementpl}
                                    setConfig={changeEspacementplaceholder}
                                  />
                                </div>
                              </div>
                              <div
                                class="tab-pane fade"
                                id="pills-et-ch"
                                role="tabpanel"
                                aria-labelledby="pills-et-ch-tab"
                              >
                                <div className="mt-3 mb-3">
                                  <TextStylingComponent
                                    key={"etiquette"}
                                    for={"etiquette"}
                                    editor={props.editor}
                                    siteId={props.siteId}
                                    config={ConfigSizeEtiquette}
                                    setConfig={changeEtiquetteConfig}
                                  />
                                </div>
                              </div>
                              <div
                                class="tab-pane fade"
                                id="pills-es-ch"
                                role="tabpanel"
                                aria-labelledby="pills-es-ch-tab"
                              >
                                <EspacementConfig
                                  key={"esch"}
                                  for={"essch"}
                                  editor={props.editor}
                                  siteId={props.siteId}
                                  config={configEspacementChamps}
                                  setConfig={changeEspacementChamps}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="accordion-item" id="scrollspyHeading4">
                        <h2 class="accordion-header" id="headingthree">
                          <button
                            class="accordion-button"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapsethree"
                            aria-expanded="true"
                            aria-controls="collapsethree"
                          >
                            Design du buttons
                          </button>
                        </h2>
                        <div
                          id="collapsethree"
                          class="accordion-collapse collapse"
                          aria-labelledby="headingthree"
                          data-bs-parent="#accordionExample"
                        >
                          <div class="accordion-body">
                            <ul
                              class="nav nav-tabs mt-3 mb-3"
                              id="myTab"
                              role="tablist"
                            >
                              <li class="nav-item" role="presentation">
                                <button
                                  class="nav-link active"
                                  id="Stylelien-tab"
                                  data-bs-toggle="tab"
                                  data-bs-target="#Stylelien-tab-pane"
                                  type="button"
                                  role="tab"
                                  aria-controls="Stylelien"
                                  aria-selected="true"
                                >
                                  Design
                                </button>
                              </li>
                              <li class="nav-item" role="presentation">
                                <button
                                  class="nav-link"
                                  id="textlien-tab"
                                  data-bs-toggle="tab"
                                  data-bs-target="#textlien-tab-pane"
                                  type="button"
                                  role="tab"
                                  aria-controls="textlien"
                                  aria-selected="false"
                                >
                                  Texte
                                </button>
                              </li>
                              <li class="nav-item" role="presentation">
                                <button
                                  class="nav-link"
                                  id="hoverbtn-tab"
                                  data-bs-toggle="tab"
                                  data-bs-target="#hoverbtn-tab-pane"
                                  type="button"
                                  role="tab"
                                  aria-controls="hoverbtn"
                                  aria-selected="false"
                                >
                                  Survol
                                </button>
                              </li>
                              <li class="nav-item" role="presentation">
                                <button
                                  class="nav-link"
                                  id="textlienes-tab"
                                  data-bs-toggle="tab"
                                  data-bs-target="#textlienes-tab-pane"
                                  type="button"
                                  role="tab"
                                  aria-controls="textlienes"
                                  aria-selected="false"
                                >
                                  Espacement
                                </button>
                              </li>
                            </ul>
                            <div class="tab-content " id="myTabContent">
                              <div
                                class="tab-pane fade show active"
                                id="Stylelien-tab-pane"
                                role="tabpanel"
                                aria-labelledby="Stylelien-tab"
                                tabindex="0"
                              >
                                <BorderConfig
                                  key={"submit"}
                                  for={"submit"}
                                  editor={props.editor}
                                  siteId={props.siteId}
                                  config={configBorderButton}
                                  setConfig={changeBorderButton}
                                />
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                  <div className="blockTitle m-2">
                                    Arriére du button
                                  </div>
                                  <ColorConfig
                                    key={"btn"}
                                    for={"btn"}
                                    editor={props.editor}
                                    siteId={props.siteId}
                                    config={configBgButton}
                                    setConfig={changeBackgroundBtn}
                                  />
                                </div>

                                <div className="d-flex justify-content-between align-items-center mb-2">
                                  <div className="blockTitle m-2">Arrondis</div>
                                  <ArrondisConfig
                                    key={"submitrd"}
                                    for={"submitrd"}
                                    editor={props.editor}
                                    siteId={props.siteId}
                                    config={configRdButton}
                                    setConfig={changeRaduisButton}
                                  />
                                </div>
                                <div className="d-flex justify-content-between align-items-center  mb-3">
                                  <div className="blockTitle m-2">Largeur</div>

                                  <div className="d-flex justify-content-between align-items-center">
                                    <i class="fas fa-desktop me-1"></i>
                                    <div class="input-with-label-pixel me-2">
                                      <span class="pixel-label">px</span>
                                      <input
                                        min="10"
                                        max="1200"
                                        class="form-control form-control-sm input-small-pixel"
                                        type="number"
                                        value={sizeBtn.desktop}
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
                                        value={sizeBtn.tablet}
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
                                        value={sizeBtn.mobile}
                                        onChange={(e) =>
                                          changeSize("mobile", e.target.value)
                                        }
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                  <div className="panelTitle m-2">
                                    Orientation du button
                                  </div>
                                  <div className="panelContnet d-flex align-items-center">
                                    <div className="radio-btns-group">
                                      <input
                                        type="radio"
                                        name="start"
                                        id="start"
                                        checked={posAlignBtn.align == "start"}
                                        value="start"
                                        className="RadioInput"
                                        onChange={(e) =>
                                          changePostionBtn(e.target.value)
                                        }
                                      />
                                      <label
                                        htmlFor="start"
                                        className="RadioLabel"
                                      >
                                        <i class="fa-solid fa-arrow-left"></i>
                                      </label>
                                      <input
                                        type="radio"
                                        name="center"
                                        id="center"
                                        checked={posAlignBtn.align == "center"}
                                        value="center"
                                        className="RadioInput"
                                        onChange={(e) =>
                                          changePostionBtn(e.target.value)
                                        }
                                      />
                                      <label
                                        htmlFor="center"
                                        className="RadioLabel"
                                      >
                                        <i class="fa-solid fa-arrow-up"></i>
                                      </label>
                                      <input
                                        type="radio"
                                        name="end"
                                        id="end"
                                        checked={posAlignBtn.align == "end"}
                                        value="end"
                                        className="RadioInput"
                                        onChange={(e) =>
                                          changePostionBtn(e.target.value)
                                        }
                                      />
                                      <label
                                        htmlFor="end"
                                        className="RadioLabel"
                                      >
                                        <i class="fa-solid fa-arrow-right"></i>
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div
                                class="tab-pane fade "
                                id="hoverbtn-tab-pane"
                                role="tabpanel"
                                aria-labelledby="hoverbtn-tab"
                                tabindex="0"
                              >
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                  <div className="blockTitle m-2">
                                    Survol du button
                                  </div>
                                  <ColorConfig
                                    key={"btnhover"}
                                    for={"btnhover"}
                                    editor={props.editor}
                                    siteId={props.siteId}
                                    config={configBgButtonhover}
                                    setConfig={changeBackgroundBtnHover}
                                  />
                                </div>

                                <div className="d-flex justify-content-between align-items-center mb-2">
                                  <div className="blockTitle m-2">
                                    Survol du texte
                                  </div>
                                  <ColorConfig
                                    key={"btntexthover"}
                                    for={"btntexthover"}
                                    editor={props.editor}
                                    siteId={props.siteId}
                                    config={configBgButtontexthover}
                                    setConfig={changeBackgroundBtnTextHover}
                                  />
                                </div>
                              </div>
                              <div
                                class="tab-pane fade "
                                id="textlien-tab-pane"
                                role="tabpanel"
                                aria-labelledby="textlien-tab"
                                tabindex="0"
                              >
                                <TextStylingComponent
                                  key={"textesubmit"}
                                  for={"textesubmit"}
                                  editor={props.editor}
                                  siteId={props.siteId}
                                  config={ConfigsizeTextBtn}
                                  setConfig={changetextBtnConfig}
                                />
                              </div>
                              <div
                                class="tab-pane fade "
                                id="textlienes-tab-pane"
                                role="tabpanel"
                                aria-labelledby="textlienes-tab"
                                tabindex="0"
                              >
                                <EspacementConfig
                                  key={"essubmit"}
                                  for={"essubmit"}
                                  editor={props.editor}
                                  siteId={props.siteId}
                                  config={configEspacementBtn}
                                  setConfig={changeEspacementBtn}
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
            </div>
            <div
              class="tab-pane fade"
              id="nav-destinataire"
              role="tabpanel"
              aria-labelledby="nav-destinataire-tab"
              tabindex="0"
            >
              <span className="title-popups">Envoi du Formulaire</span>
              <div class="mb-3 p-3">
                <div className="structmodals">
                  <label for={"title-" + form.id} class="form-label">
                    Email destinataire
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder={form.dest}
                    value={form.dest}
                    onChange={(e) => {
                      changedestination(e.target.value);
                    }}
                  />
                </div>
              </div>{" "}
              <span className="title-popups">Webhook BBoard</span>
              <div class="mb-3 p-3">
                <label for={"title-" + form.id} class="form-label">
                  ID Publisite
                </label>
                <input
                  type="text"
                  class="form-control"
                  placeholder={form.publisite}
                  value={form.publisite}
                  onChange={(e) => {
                    changePublisite(e.target.value);
                  }}
                />
              </div>
              <div class="mb-3">
                <div className="form-check">
                  <input
                    type="checkbox"
                    class=""
                    name={"specific-" + form.id}
                    id={"specific-" + form.id}
                    checked={form.specific == "true"}
                    onChange={(e) => {
                      changeSpecific(e.target.checked.toString());
                    }}
                  />
                  <label for={"specific-" + form.id} class="form-label">
                    Formulaire spécifique
                  </label>
                </div>
                <div className="form-check">
                  {form.specific == "true" && (
                    <>
                      <label
                        htmlFor={`idform-${form.id}`}
                        className="form-label"
                      >
                        ID Form
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder={form.idform}
                        value={form.idform}
                        onChange={(e) => {
                          changeIDform(e.target.value);
                        }}
                      />
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
