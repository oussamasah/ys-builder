import React, { useEffect, useState } from "react";
import axios from "axios";
// import ReactDOM from "react-dom";
import { Modal, ModalDialog } from "react-bootstrap";
import Draggable from "react-draggable";
// import Nestable from "react-nestable";
import "./ModalCatgegory.css";
import { v4 as uuidv4 } from "uuid";
// import { CKEditor } from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import TextStylingComponent from "../../../compoments/TextStyling/TextStylingComponent";
import { SketchPicker } from "react-color";
import EspacementConfig from "../../../compoments/Espacement/EspacementConfig";
import modelTwo from "../../../../../assets/imgEditorBlocks//tab-model-1.jpg";
import modelOne from "../../../../../assets/imgEditorBlocks/tab-model-2.jpg";
import modelThree from "../../../../../assets/imgEditorBlocks/tab-model-3.jpg";
import ColorConfig from "../../../compoments/Color/ColorConfig";
import ArrondisConfigAccordion from "../../../compoments/Arrondis/ArrondisConfig";
import BorderConfig from "../../../compoments/Border/BorderConfig";
import toast from "react-hot-toast";

class DraggableModalDialog extends React.Component {
  render() {
    return (
      <Draggable handle=".handleDrag">
        <ModalDialog {...this.props} />
      </Draggable>
    );
  }
}
export default function ModalCatgegory(props) {
  // const [config, setConfig] = useState({
  //   size: "",
  //   annimation: "",
  //   espacement: "",
  // });
  const [configBorderCat, setConfigBorderCat] = useState({
    typeborder: props.editor.getSelected().getAttributes()[
      "data-border-typecat"
    ]
      ? props.editor.getSelected().getAttributes()["data-borderbn-typecat"]
      : "all",
    size: props.editor.getSelected().getAttributes()["data-border-sizecat"]
      ? JSON.parse(
          props.editor.getSelected().getAttributes()["data-border-sizecat"]
        )
      : {
          all: "1",
          top: "1",
          left: "1",
          right: "1",
          bottom: "1",
        },

    style: props.editor.getSelected().getAttributes()["data-border-stylecat"]
      ? props.editor.getSelected().getAttributes()["data-border-stylecat"]
      : "solid",

    color: props.editor.getSelected().getAttributes()["data-border-colorcat"]
      ? props.editor.getSelected().getAttributes()["data-border-colorcat"]
      : "#eee",
  });
  const [configRdCat, setConfigRdCat] = useState({
    arrondis: props.editor.getSelected().getAttributes()["data-raduis-btns"]
      ? JSON.parse(
          props.editor.getSelected().getAttributes()["data-raduis-btns"]
        )
      : {
          topLeft: "1",
          topRight: "1",
          bottomLeft: "1",
          bottomRight: "1",
        },
  });
  const [show, setShow] = useState(true);
  const [shownotice, setShownotice] = useState(false);
  // const [selected, setSelected] = useState();
  const [paginationPosition, setPaginationPosition] = useState(props.editor.getSelected().getAttributes()["data-pos-pagination"])
  const rgbtoJson = (rgbString) => {
    var s = rgbString;
    s = s.replace("rgb(", "");
    s = s.replace(")", "");
    let c = s.split(",");
    return { r: c[0], g: c[1], b: c[2], a: c[3] };
  };
  const [configBgCat, setConfigBgCat] = useState({
    rgbTxt: props.editor.getSelected().getAttributes()["data-cat-bg"]
      ? props.editor.getSelected().getAttributes()["data-cat-bg"]
      : "#fff",
    rgb: rgbtoJson(
      props.editor.getSelected().getAttributes()["data-cat-bg"]
        ? props.editor.getSelected().getAttributes()["data-cat-bg"]
        : "#fff"
    ),
  });
const [configBgPagination, setConfigBgPagination] = useState({
  rgbTxt: props.editor.getSelected().getAttributes()["data-bg-pagination"]
    ? props.editor.getSelected().getAttributes()["data-bg-pagination"]
    : "#fff",
  rgb: rgbtoJson(
    props.editor.getSelected().getAttributes()["data-bg-pagination"]
      ? props.editor.getSelected().getAttributes()["data-bg-pagination"]
      : "#fff"
  ),
});
const [activeBorder, setActiveBorder] = useState(
  props.editor.getSelected().getAttributes()["data-activeborder"]
    ? props.editor.getSelected().getAttributes()["data-activeborder"]
    : "false"
);

const [activeBorderCat, setActiveBorderCat] = useState(
  props.editor.getSelected().getAttributes()["data-activebordercat"]
    ? props.editor.getSelected().getAttributes()["data-activebordercat"]
    : "false"
);
const changeBackgroundCat = (e) => {
  const cmp = props.editor.getSelected();
  let attr = cmp.getAttributes();
  attr["data-cat-bg"] = e.rgbTxt;

  cmp.setAttributes(attr);
  let r = props.editor.Css.getRule(
    `#${attr.id} .item-content .category`
  );
  let css = [];
  if (r) css = r.attributes.style;
  css["background"] = e.rgbTxt;
  props.editor.Css.remove(r);
  props.editor.Css.setRule(
    `#${attr.id} .item-content .category`,
    css
  );
  setConfigBgCat(e);
  props.editor.setStyle(props.editor.getCss());
  //cmp.view.render();
};
const changeRaduisCat = (e) => {
  const cmp = props.editor.getSelected();
  let attr = cmp.getAttributes();
  attr["data-raduis-btns"] = JSON.stringify(e.arrondis);
  cmp.setAttributes(attr);
  let r = props.editor.Css.getRule(
    `#${attr.id}  .item-content .category`
  );
  let css = [];
  if (r) css = r.attributes.style;

  css["border-top-left-radius"] = e.arrondis.topLeft + "px";
  css["border-top-right-radius"] = e.arrondis.topRight + "px";
  css["border-bottom-left-radius"] = e.arrondis.bottomLeft + "px";
  css["border-bottom-right-radius"] = e.arrondis.bottomRight + "px";
  props.editor.Css.remove(r);
  props.editor.Css.setRule(
    `#${attr.id}  .item-content .category`,
    css
  );
  setConfigRdCat(e);

  let cssStyles = props.editor.getCss();
  props.editor.setStyle(cssStyles);
  //cmp.view.render();
};
const changeBorderCat = (e) => {
  const cmp = props.editor.getSelected();
  let attr = cmp.getAttributes();
  attr["data-border-sizecat"] = JSON.stringify(e.size);
  attr["data-border-stylecat"] = e.style;
  attr["data-border-colorcat"] = e.color;
  attr["data-border-typecat"] = e.typeborder;

  cmp.setAttributes(attr);
  let r = props.editor.Css.getRule(
    `#${attr.id}  .item-content .category`
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
  props.editor.Css.remove(r);
  props.editor.Css.setRule(
    `#${attr.id}  .item-content .category`,
    css
  );
  setConfigBorderCat(e);
  props.editor.setStyle(props.editor.getCss());
  //cmp.view.render();
};
useEffect(() => {
  const cmp = props.editor.getSelected();
  let attr = cmp.getAttributes();
  attr["data-activeborder"] = activeBorder;

  cmp.setAttributes(attr);
}, [
  activeBorder,

]);
const [configEspacementTitle, setConfigEspacementTitle] = useState({
  padding: props.editor.getSelected().getAttributes()["data-title-padding"]
    ? JSON.parse(
        props.editor.getSelected().getAttributes()["data-title-padding"]
      )
    : {
        top: "5",
        left: "5",
        right: "5",
        bottom: "5",
      },
  margin: props.editor.getSelected().getAttributes()["data-title-margin"]
    ? JSON.parse(
        props.editor.getSelected().getAttributes()["data-title-margin"]
      )
    : {
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
      },
});
const [configTxtPagination, setConfigTxtPagination] = useState({
  rgbTxt: props.editor.getSelected().getAttributes()["data-txt-pagination"]
    ? props.editor.getSelected().getAttributes()["data-txt-pagination"]
    : "#fff",
  rgb: rgbtoJson(
    props.editor.getSelected().getAttributes()["data-txt-pagination"]
      ? props.editor.getSelected().getAttributes()["data-txt-pagination"]
      : "#fff"
  ),
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
  const [ConfigSizeTitle, setConfigSizeTitle] = useState({
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

  const changeTypoTitleConfig = (e) => {
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
      `#${attr.id}  .item-content .titleblog`
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
      `#${attr.id}  .item-content .titleblog`,
      css
    );

    let r_tablet = props.editor.Css.getRule(
      `#${attr.id}  .item-content .titleblog`,
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
      `#${attr.id}  .item-content .titleblog`,
      {
        atRuleType: "media",
        atRuleParams: "(min-width:768px) and (max-width:991px)",
      }
    );
    props.editor.Css.setRule(
      `#${attr.id}  .item-content .titleblog`,
      cssTablet,
      {
        atRuleType: "media",
        atRuleParams: "(min-width:768px) and (max-width:991px)",
      }
    );

    let r_Mobile = props.editor.Css.getRule(
      `#${attr.id}  .item-content .titleblog`,
      {
        atRuleType: "media",
        atRuleParams: "(max-width: 767px)",
      }
    );
    let cssMobile = {};
    if (r_Mobile) cssMobile = r_Mobile.attributes.style;

    cssMobile["font-size"] = `${e.size.mobile}px`;
    cssMobile["line-height"] = `${e.line.mobile}px`;

    props.editor.Css.remove(r_Mobile);
    props.editor.Css.remove(
      `#${attr.id}  .item-content .titleblog`,
      {
        atRuleType: "media",
        atRuleParams: "(max-width:767px)",
      }
    );
    props.editor.Css.setRule(
      `#${attr.id} .item-content .titleblog`,
      cssMobile,
      {
        atRuleType: "media",
        atRuleParams: "(max-width:767px)",
      }
    );
    setConfigSizeTitle(e);
    props.editor.setStyle(props.editor.getCss());
  };
  const [configRdPagintaion, setConfigRdPagination] = useState({
    arrondis: props.editor.getSelected().getAttributes()["data-radius-pagination"]
      ? JSON.parse(
          props.editor.getSelected().getAttributes()["data-radius-pagination"]
        )
      : {
          topLeft: "1",
          topRight: "1",
          bottomLeft: "1",
          bottomRight: "1",
        },
  });
  const [configBorderButton, setConfigBorderButton] = useState({
    typeborder: props.editor.getSelected().getAttributes()[
      "data-borderbtn-type"
    ]
      ? props.editor.getSelected().getAttributes()["data-borderbtn-type"]
      : "all",
    size: props.editor.getSelected().getAttributes()["data-borderbtn-size"]
      ? JSON.parse(
          props.editor.getSelected().getAttributes()["data-borderbtn-size"]
        )
      : {
          all: "1",
          top: "1",
          left: "1",
          right: "1",
          bottom: "1",
        },

    style: props.editor.getSelected().getAttributes()["data-borderbtn-style"]
      ? props.editor.getSelected().getAttributes()["data-borderbtn-style"]
      : "solid",

    color: props.editor.getSelected().getAttributes()["data-borderbtn-color"]
      ? props.editor.getSelected().getAttributes()["data-borderbtn-color"]
      : "#eee",
  });
  const [configBgButton, setConfigBgButton] = useState({
    rgbTxt: props.editor.getSelected().getAttributes()["data-btn-bg"]
      ? props.editor.getSelected().getAttributes()["data-btn-bg"]
      : "#198754",
    rgb: rgbtoJson(
      props.editor.getSelected().getAttributes()["data-btn-bg"]
        ? props.editor.getSelected().getAttributes()["data-btn-bg"]
        : "#198754"
    ),})


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

    const changetextBtnConfig = (e) => {
      const cmp = props.editor.getSelected();
      let attr = cmp.getAttributes();
  
      attr["data-btn-fonttext"] = e.font;
      attr["data-btn-varianttext"] = e.variant;
      attr["data-btn-sizetext"] = JSON.stringify(e.size);
      attr["data-btn-colortext"] = e.color;
      attr["data-btn-aligntext"] = e.align;
      cmp.setAttributes(attr);
  
      let r = props.editor.Css.getRule(
        `#${attr.id} .item-content .savoirplus`
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
          `#${attr.id} .item-content .savoirplus`,
        css
      );
  
      let r_tablet = props.editor.Css.getRule(
          `#${attr.id} .item-content .savoirplus`,
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
          `#${attr.id} .item-content .savoirplus`,
        {
          atRuleType: "media",
          atRuleParams: "(min-width:768px) and (max-width:991px)",
        }
      );
      props.editor.Css.setRule(
          `#${attr.id} .item-content .savoirplus`,
        cssTablet,
        {
          atRuleType: "media",
          atRuleParams: "(min-width:768px) and (max-width:991px)",
        }
      );
  
      let r_Mobile = props.editor.Css.getRule(
          `#${attr.id} .item-content .savoirplus`,
        {
          atRuleType: "media",
          atRuleParams: "(max-width: 767px)",
        }
      );
  
      let cssMobile = {};
      if (r_Mobile) cssMobile = r_Mobile.attributes.style;
  
      cssMobile["font-size"] = `${e.size.mobile}px`;
      cssMobile["line-height"] = `${e.line.mobile}px`;
  
      props.editor.Css.remove(r_Mobile);
      props.editor.Css.remove(
        `#${attr.id} .item-content .savoirplus`,
        {
          atRuleType: "media",
          atRuleParams: "(max-width:767px)",
        }
      );
      props.editor.Css.setRule(
        `#${attr.id} .item-content .savoirplus`,
        cssMobile,
        {
          atRuleType: "media",
          atRuleParams: "(max-width:767px)",
        }
      );
      setConfigsizeTextBtn(e);
      props.editor.setStyle(props.editor.getCss());
    };
  const changeBorderButton = (e) => {
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-borderbtn-size"] = JSON.stringify(e.size);
    attr["data-borderbtn-style"] = e.style;
    attr["data-borderbtn-color"] = e.color;
    attr["data-borderbtn-type"] = e.typeborder;

    cmp.setAttributes(attr);
    let r = props.editor.Css.getRule(
        `#${attr.id} .item-content .savoirplus`,
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
    props.editor.Css.remove(r);
    props.editor.Css.setRule(
      `#${attr.id} .item-content .savoirplus`,
      css
    );
    setConfigBorderButton(e);
    props.editor.setStyle(props.editor.getCss());
    //cmp.view.render();
  };

  const changeBackgroundBtn = (e) => {
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-btn-bg"] = e.rgbTxt;

    cmp.setAttributes(attr);
    let r = props.editor.Css.getRule(
       `#${attr.id} .item-content .savoirplus`,
    );
    let css = [];
    if (r) css = r.attributes.style;
    css["background"] = e.rgbTxt;

    props.editor.Css.remove(r);
    props.editor.Css.setRule(
       `#${attr.id} .item-content .savoirplus`,
      css
    );
    setConfigBgButton(e);
    props.editor.setStyle(props.editor.getCss());
    //cmp.view.render();
  };
  const [configEspacementCat, setConfigEspacementCat] = useState({
    padding: props.editor.getSelected().getAttributes()["data-cat-padding"]
      ? JSON.parse(
          props.editor.getSelected().getAttributes()["data-cat-padding"]
        )
      : {
          top: "15",
          left: "15",
          right: "15",
          bottom: "15",
        },
    margin: props.editor.getSelected().getAttributes()["data-cat-margin"]
      ? JSON.parse(
          props.editor.getSelected().getAttributes()["data-cat-margin"]
        )
      : {
          top: "0",
          left: "0",
          right: "0",
          bottom: "0",
        },
  });
  const changeEspacementCat = (e) => {
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-cat-padding"] = JSON.stringify(e.padding);
    attr["data-cat-margin"] = JSON.stringify(e.margin);

    cmp.setAttributes(attr);
    let r = props.editor.Css.getRule(
      `#${attr.id} .item-content .category`
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
      `#${attr.id} .item-content .category`,
      css
    );
    setConfigEspacementCat(e);

    let cssStyles = props.editor.getCss();
    props.editor.setStyle(cssStyles);
    //cmp.view.render();
  };
  const [configTextCat, setConfigTextCat] = useState({
    font: props.editor.getSelected().getAttributes()["data-cat-font"]
      ? props.editor.getSelected().getAttributes()["data-cat-font"]
      : "Arial",
    size: props.editor.getSelected().getAttributes()["data-cat-size"]
      ? JSON.parse(props.editor.getSelected().getAttributes()["data-cat-size"])
      : { desktop: "16", tablet: "16", mobile: "16" },
    line: props.editor.getSelected().getAttributes()["data-cat-line"]
      ? JSON.parse(props.editor.getSelected().getAttributes()["data-cat-line"])
      : { desktop: "16", tablet: "16", mobile: "16" },
    variant: props.editor.getSelected().getAttributes()["data-cat-variant"]
      ? props.editor.getSelected().getAttributes()["data-cat-variant"]
      : "500",
    align: props.editor.getSelected().getAttributes()["data-cat-align"]
      ? props.editor.getSelected().getAttributes()["data-cat-align"]
      : "left",
    color: props.editor.getSelected().getAttributes()["data-cat-color"]
      ? props.editor.getSelected().getAttributes()["data-cat-color"]
      : "#000",
  });



  const changeTextCatConfig = (e) => {
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-cat-font"] = e.font;
    attr["data-cat-variant"] = e.variant;
    attr["data-cat-size"] = JSON.stringify(e.size);
    attr["data-cat-line"] = JSON.stringify(e.line);
    attr["data-cat-color"] = e.color;
    attr["data-cat-align"] = e.align;
    cmp.setAttributes(attr);

    let r = props.editor.Css.getRule(
      `#${attr.id} .item-content .category`
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
      `#${attr.id} .item-content .category`,
      css
    );

    let r_tablet = props.editor.Css.getRule(
      `#${attr.id} .item-content .category`,
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
      `#${attr.id} .item-content .category`,
      {
        atRuleType: "media",
        atRuleParams: "(min-width:768px) and (max-width:991px)",
      }
    );
    props.editor.Css.setRule(
      `#${attr.id} .item-content .category`,
      cssTablet,
      {
        atRuleType: "media",
        atRuleParams: "(min-width:768px) and (max-width:991px)",
      }
    );

    let r_Mobile = props.editor.Css.getRule(
      `#${attr.id} .item-content .category`,
      {
        atRuleType: "media",
        atRuleParams: "(max-width: 767px)",
      }
    );
    let cssMobile = {};
    if (r_Mobile) cssMobile = r_Mobile.attributes.style;

    cssMobile["font-size"] = `${e.size.mobile}px`;
    cssMobile["line-height"] = `${e.line.mobile}px`;

    props.editor.Css.remove(r_Mobile);
    props.editor.Css.remove(
      `#${attr.id} .item-content .category`,
      {
        atRuleType: "media",
        atRuleParams: "(max-width:767px)",
      }
    );
    props.editor.Css.setRule(
      `#${attr.id} .item-content .category`,
      cssMobile,
      {
        atRuleType: "media",
        atRuleParams: "(max-width:767px)",
      }
    );
    
    setConfigTextCat(e);
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
    let r = props.editor.Css.getRule(
      `#${attr.id}  .item-content .titleblog`
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
      `#${attr.id}  .item-content .titleblog`,
      css
    );
    setConfigBorder(e);
    props.editor.setStyle(props.editor.getCss());
    //cmp.view.render();
  };



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


  const changeEspacementBtn = (e) => {
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-btn-padding"] = JSON.stringify(e.padding);
    attr["data-btn-margin"] = JSON.stringify(e.margin);

    cmp.setAttributes(attr);
    let r = props.editor.Css.getRule(
      `#${attr.id} .item-content .savoirplus`,
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
      `#${attr.id} .item-content .savoirplus`,
      css
    );
    setConfigEspacementBtn(e);

    let cssStyles = props.editor.getCss();
    props.editor.setStyle(cssStyles);
    //cmp.view.render();
  };

  const changeEspacementTitle = (e) => {
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-title-padding"] = JSON.stringify(e.padding);
    attr["data-title-margin"] = JSON.stringify(e.margin);

    cmp.setAttributes(attr);
    let r = props.editor.Css.getRule(
      `#${attr.id}  .item-content .titleblog`
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
      `#${attr.id}  .item-content .titleblog`,
      css
    );
    setConfigEspacementTitle(e);

    props.editor.Css.remove(r);
    props.editor.Css.setRule(
      `#${attr.id}  .item-content .titleblog`,
      css
    );
    setConfigEspacementTitle(e);
    props.editor.setStyle(props.editor.getCss());
    //cmp.view.render();
  };
  const changeRaduisPagination = (e) => {
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-radius-pagination"] = JSON.stringify(e.arrondis);
    cmp.setAttributes(attr);
    let r = props.editor.Css.getRule(
      `#${attr.id} .pagination li`
    );
    let css = [];
    if (r) css = r.attributes.style;

    css["border-top-left-radius"] = e.arrondis.topLeft + "px";
    css["border-top-right-radius"] = e.arrondis.topRight + "px";
    css["border-bottom-left-radius"] = e.arrondis.bottomLeft + "px";
    css["border-bottom-right-radius"] = e.arrondis.bottomRight + "px";
    props.editor.Css.remove(r);
    props.editor.Css.setRule(
      `#${attr.id} .pagination li`,
      css
    );
    setConfigRdPagination(e);

    css["border-top-left-radius"] = e.arrondis.topLeft + "px";
    css["border-top-right-radius"] = e.arrondis.topRight + "px";
    css["border-bottom-left-radius"] = e.arrondis.bottomLeft + "px";
    css["border-bottom-right-radius"] = e.arrondis.bottomRight + "px";
    props.editor.Css.remove(r);
    props.editor.Css.setRule(
      `#${attr.id} .pagination li`,
      css
    );
    setConfigRdPagination(e);
    props.editor.setStyle(props.editor.getCss());
    //cmp.view.render();
  };
  const changeBackgroundPagination = (e) => {
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-bg-pagination"] = e.rgbTxt;

    cmp.setAttributes(attr);
    let r = props.editor.Css.getRule(
      `#${attr.id} .pagination li`
    );
    let css = [];
    if (r) css = r.attributes.style;
    css["background"] = e.rgbTxt;
    props.editor.Css.remove(r);
    props.editor.Css.setRule(
      `#${attr.id} .pagination li`,
      css
    );
    setConfigBgPagination(e);
    props.editor.setStyle(props.editor.getCss());
    //cmp.view.render();
  };
  const changeTextPagination = (e) => {
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-txt-pagination"] = e.rgbTxt;

    cmp.setAttributes(attr);
    let r = props.editor.Css.getRule(
      `#${attr.id} .pagination li`
    );
    let css = [];
    if (r) css = r.attributes.style;
    css["color"] = e.rgbTxt;
    props.editor.Css.remove(r);
    props.editor.Css.setRule(
      `#${attr.id} .pagination li`,
      css
    );
    setConfigTxtPagination(e);
    props.editor.setStyle(props.editor.getCss());
    //cmp.view.render();
  };


  const changePostionBtnPagination = (position) => {
    let cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    let device = props.editor.Devices.getSelected().id;
    if (device == "mobile2") {
      let r = props.editor.Css.getRule(
        `#${attr.id} .pagination`,
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
        `#${attr.id} .pagination`,
        css,
        {
          atRuleType: "media",
          atRuleParams: "(max-width:767px)",
        }
      );
    } else {
      let r = props.editor.Css.getRule(
        `#${attr.id} .pagination`
      );
      let css = [];
      if (r) css = r.attributes.style;
      css["display"] = "flex";
      css["justify-content"] = position;
      props.editor.Css.setRule(
        `#${attr.id} .pagination`,
        css
      );
    }

    attr["data-pos-pagination"] = position;
    cmp.setAttributes(attr);
    setPaginationPosition(position)

    props.editor.setStyle(props.editor.getCss());
  };


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
    let rule = props.editor.Css.setRule(`#${attr.id}  ul > li > button`, {
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
  // const changeColor2 = (color) => {
  //   setBlockPickerColor2({
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
  //   let cmp = props.editor.getSelected();
  //   let attr = cmp.getAttributes();
  //   attr["data-bg"] =
  //     "rgb(" +
  //     color.rgb.r +
  //     ", " +
  //     color.rgb.g +
  //     ", " +
  //     color.rgb.b +
  //     "," +
  //     color.rgb.a +
  //     ")";
  //   cmp.setAttributes(attr);
  //   let rule = props.editor.Css.setRule(
  //     `#${attr.id}  ul > li > button::hover,#${attr.id}  ul > li > button.active`,
  //     {
  //       background:
  //         "rgb(" +
  //         color.rgb.r +
  //         ", " +
  //         color.rgb.g +
  //         ", " +
  //         color.rgb.b +
  //         "," +
  //         color.rgb.a +
  //         ")",
  //     }
  //   );
  // };
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
      `#${attr.id}  ul > li > button:hover > * , #${attr.id}  ul > li > button.active > *`,
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
      `#${attr.id}  ul > li > button:hover , #${attr.id}  ul > li > button.active `,
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
  const [params, setParams] = useState({nbr:5,postBtnTxt:"Lire plus",postBtn:true,postDate:true,postCategory:true,postThumb:true,carrousel:true,category:"tous"});
  const [CategorieList , setCategorieList] = useState([])
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
  const changeParams = (type,value)=>{

    let newParams = {...params}
    newParams[type]=value
    setParams(newParams)
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-params"]=JSON.stringify(newParams)
    cmp.setAttributes(attr)
    cmp.view.render()
   
}
const getCategories = async (e) => {
  await axios
    .get(
      process.env.REACT_APP_API_URL + "/blogcategories/getbysite/" + props.siteId
    )
    .then((response) => {
      //console.log(response.data.data);
      setCategorieList(response.data.data);
      toast.dismiss();
      toast.success(response.data.message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
      // getSites();
      // setshowEdit(false);
    })
    .catch((error) => {
      toast.dismiss();
      toast.error(
        error.response.data.message
          ? error.response.data.message
          : error.message,
        {
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
        }
      );
    });
};
useEffect(() => {

}, [CategorieList])

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
    let r = props.editor.Css.getRule(`#${attr.id} .article`);
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
      props.editor.Css.setRule(`#${attr.id} .article`, css);
    } else {
      props.editor.Css.setRule(`#${attr.id} .article`, {
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
  const [posAlignBtn, setPosAlignBtn] = useState(props.editor.getSelected().getAttributes()["data-pos-btn"]
      ? props.editor.getSelected().getAttributes()["data-pos-btn"]
      : "start",
  );

  const [model, setModel] = useState(props.editor.getSelected().getAttributes()['data-model']);
  const [configBgTitle, setConfigBgTitle] = useState({
    rgbTxt: props.editor.getSelected().getAttributes()["data-title-bg"]
      ? props.editor.getSelected().getAttributes()["data-title-bg"]
      : "#fff",
    rgb: rgbtoJson(
      props.editor.getSelected().getAttributes()["data-title-bg"]
        ? props.editor.getSelected().getAttributes()["data-title-bg"]
        : "#fff"
    ),
  });
  const changeBackgroundTitle = (e) => {
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-title-bg"] = e.rgbTxt;

    cmp.setAttributes(attr);
    let r = props.editor.Css.getRule(
      `#${attr.id}  .item-content .titleblog`
    );
    let css = [];
    if (r) css = r.attributes.style;
    css["background"] = e.rgbTxt;
    props.editor.Css.remove(r);
    props.editor.Css.setRule(
      `#${attr.id}  .item-content .titleblog`,
      css
    );
    setConfigBgTitle(e);
    props.editor.setStyle(props.editor.getCss());
    //cmp.view.render();
  };


  // const handleItemClicks = (itemId) => {
  //   setSelectedItemId(itemId === selectedItemId ? null : itemId);
  //   toggleCustomClass();
  // };

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
    let attr = cmp.getAttributes()
    let classes = cmp.getClasses().filter((x) => x.indexOf("Model") == -1);
    classes.push(key);
    cmp.setClass(classes);
    setModel(key);
    attr["data-model"]=key;
    cmp.setAttributes(attr)
    cmp.view.render()
 
  };






  const changePostionBtn = (position) => {

    let cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    let device = props.editor.Devices.getSelected().id;
    if (device == "mobile2") {
      let r = props.editor.Css.getRule(
        `#${attr.id} .item-content .bouttonContainer`,
        {
          atRuleType: "media",
          atRuleParams: "(max-width:767px)",
        }
      );
      let css = [];
      if (r) css = r.attributes.style;
  
      css["display"] = "flex";
      css["justify-content"] = position;
      props.editor.Css.setRule(
        `#${attr.id} .item-content .bouttonContainer`,
        css,
        {
          atRuleType: "media",
          atRuleParams: "(max-width:767px)",
        }
      );
    } else {
      let r = props.editor.Css.getRule(
        `#${attr.id} .item-content .bouttonContainer`
      );
      let css = [];
      if (r) css = r.attributes.style;
      css["display"] = "flex";
      css["justify-content"] = position;
      props.editor.Css.setRule(
        `#${attr.id} .item-content .bouttonContainer`,
        css
      );
    }

    attr["data-pos-btn"] = position;
    cmp.setAttributes(attr);

    setPosAlignBtn(position );
    props.editor.setStyle(props.editor.getCss());
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
    props.editor.Css.setRule(`#${attr.id}  ul > li > button > *`, {
      "font-family": e.font,
      color: e.color,
      "text-align": e.align,
      "font-weight": e.variant,
      "font-size": e.size.desktop + "px",
      "line-height": e.size.desktop + "px",
    });
    props.editor.Css.setRule(
      `#${attr.id}  ul > li > button > *`,
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
      `#${attr.id}  ul > li > button > *`,
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
  const changeBackgroundBtnHover = (e) => {
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-btn-bgh"] = e.rgbTxt;

    cmp.setAttributes(attr);
    let r = props.editor.Css.getRule(
     `#${attr.id} .item-content .savoirplus:hover`
    );
    let css = [];
    if (r) css = r.attributes.style;
    css["background"] = e.rgbTxt;
    props.editor.Css.remove(r);
    props.editor.Css.setRule(
      `#${attr.id} .item-content .savoirplus:hover`,
      css
    );
    setConfigBgButtonhover(e);
    props.editor.setStyle(props.editor.getCss());
    //cmp.view.render();
  };

  const [sizeBtn, setSizeBtn] = useState(
    props.editor.getSelected().getAttributes()["data-width-btn"]
      ? JSON.parse(props.editor.getSelected().getAttributes()["data-width-btn"])
      : {
          desktop: "250",
          tablet: "250",
          mobile: "250",
        }
  );
  const changeSize = (device, value) => {
    let cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    let s = { ...sizeBtn };
    s[device] = value;
    setSizeBtn(s);
    attr["data-width-btn"] = JSON.stringify(s);
    cmp.setAttributes(attr);
    let r = props.editor.Css.getRule(
       `#${attr.id} .item-content .savoirplus`,
    );
    let css = {};
    if (r) css = r.attributes.style;
    css["width"] = s.desktop + "px";
    props.editor.Css.setRule(
       `#${attr.id} .item-content .savoirplus`,
      css
    );

    let r_tablet = props.editor.Css.getRule(
       `#${attr.id} .item-content .savoirplus`,
      {
        atRuleType: "media",
        atRuleParams: "(min-width: 768px) and (max-width:991px)",
      }
    );
    let cssTablet = {};
    if (r_tablet) css = r_tablet.attributes.style;
    cssTablet["width"] = s.tablet + "px";

    let r_Mobile = props.editor.Css.getRule(
       `#${attr.id} .item-content .savoirplus`,
      {
        atRuleType: "media",
        atRuleParams: "(max-width: 767px)",
      }
    );

    let cssMobile = {};
    if (r_Mobile) css = r_Mobile.attributes.style;

    cssMobile["width"] = s.mobile + "px";
    props.editor.Css.setRule(
       `#${attr.id} .item-content .savoirplus`,
      cssTablet,
      {
        atRuleType: "media",
        atRuleParams: "(min-width: 768px) and (max-width:991px)",
      }
    );
    props.editor.Css.setRule(
       `#${attr.id} .item-content .savoirplus`,
      cssMobile,
      {
        atRuleType: "media",
        atRuleParams: "(max-width: 767px)",
      }
    );

    let cssStyles = props.editor.getCss();
    props.editor.setStyle(cssStyles);
  };


  
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
  const changeRaduisButton = (e) => {
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-border-sizebnrd"] = JSON.stringify(e.arrondis);
    cmp.setAttributes(attr);
    let r = props.editor.Css.getRule(
       `#${attr.id} .item-content .savoirplus`,
    );
    let css = [];
    if (r) css = r.attributes.style;

    css["border-top-left-radius"] = e.arrondis.topLeft + "px";
    css["border-top-right-radius"] = e.arrondis.topRight + "px";
    css["border-bottom-left-radius"] = e.arrondis.bottomLeft + "px";
    css["border-bottom-right-radius"] = e.arrondis.bottomRight + "px";
    props.editor.Css.remove(r);
    props.editor.Css.setRule(
       `#${attr.id} .item-content .savoirplus`,
      css
    );
    setConfigRdButton(e);

    css["border-top-left-radius"] = e.arrondis.topLeft + "px";
    css["border-top-right-radius"] = e.arrondis.topRight + "px";
    css["border-bottom-left-radius"] = e.arrondis.bottomLeft + "px";
    css["border-bottom-right-radius"] = e.arrondis.bottomRight + "px";
    props.editor.Css.remove(r);
    props.editor.Css.setRule(
       `#${attr.id} .item-content .savoirplus`,
      css
    );
    setConfigRdButton(e);
    props.editor.setStyle(props.editor.getCss());
    //cmp.view.render();
  };

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
  const changeBackgroundBtnTextHover = (e) => {
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-btn-text-hover"] = e.rgbTxt;

    cmp.setAttributes(attr);
    let r = props.editor.Css.getRule(
      `#${attr.id} .item-content .savoirplus:hover`
    );
    let css = [];
    if (r) css = r.attributes.style;
    css["color"] = e.rgbTxt;
    props.editor.Css.remove(r);
    props.editor.Css.setRule( `#${attr.id} .item-content .savoirplus:hover`, css);
    setConfigBgButtonTexthover(e);
    props.editor.setStyle(props.editor.getCss());
    //cmp.view.render();
  };
  const [configBorderButtonHover, setConfigBorderButtonHover] = useState({
    typeborder: props.editor.getSelected().getAttributes()[
      "data-borderbtnhover-type"
    ]
      ? props.editor.getSelected().getAttributes()["data-borderbtnhover-type"]
      : "all",
    size: props.editor.getSelected().getAttributes()["data-borderbtnhover-size"]
      ? JSON.parse(
          props.editor.getSelected().getAttributes()["data-borderbtnhover-size"]
        )
      : {
          all: "1",
          top: "1",
          left: "1",
          right: "1",
          bottom: "1",
        },

    style: props.editor.getSelected().getAttributes()[
      "data-borderbtnhover-style"
    ]
      ? props.editor.getSelected().getAttributes()["data-borderbtnhover-style"]
      : "solid",

    color: props.editor.getSelected().getAttributes()[
      "data-borderbtnhover-color"
    ]
      ? props.editor.getSelected().getAttributes()["data-borderbtnhover-color"]
      : "#eee",
  });
  const changeBorderButtonHover = (e) => {
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-borderbtn-size"] = JSON.stringify(e.size);
    attr["data-borderbtn-style"] = e.style;
    attr["data-borderbtn-color"] = e.color;
    attr["data-borderbtn-type"] = e.typeborder;

    cmp.setAttributes(attr);
    let r = props.editor.Css.getRule(
       `#${attr.id} .item-content .savoirplus:hover`
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
    props.editor.Css.remove(r);
    props.editor.Css.setRule(
      `#${attr.id} .item-content .savoirplus:hover`,
      css
    );
    setConfigBorderButtonHover(e);
    props.editor.setStyle(props.editor.getCss());
    //cmp.view.render();
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
    props.editor.Css.setRule(`#${attr.id} .item-content p`, {
      "font-family": e.font,
      color: e.color,
      "text-align": e.align,
      "font-weight": e.variant,
      "font-size": e.size.desktop + "px",
      "line-height": e.size.desktop + "px",
    });
    props.editor.Css.setRule(
      `#${attr.id} .item-content p`,
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
      `#${attr.id} .item-content p`,
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
    setParams(JSON.parse(attr["data-params"]));
    getCategories()
  }, []);
  useEffect(() => {

  }, [params])
  const [configRdTitle, setConfigRdTitle] = useState({
    arrondis: props.editor.getSelected().getAttributes()["data-raduis-title"]
      ? JSON.parse(
          props.editor.getSelected().getAttributes()["data-raduis-title"]
        )
      : {
          topLeft: "1",
          topRight: "1",
          bottomLeft: "1",
          bottomRight: "1",
        },
  });
  const changeRaduisTitle = (e) => {
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-raduis-title"] = JSON.stringify(e.arrondis);
    cmp.setAttributes(attr);
    let r = props.editor.Css.getRule(
      `#${attr.id}  .item-content .titleblog`
    );
    let css = [];
    if (r) css = r.attributes.style;

    css["border-top-left-radius"] = e.arrondis.topLeft + "px";
    css["border-top-right-radius"] = e.arrondis.topRight + "px";
    css["border-bottom-left-radius"] = e.arrondis.bottomLeft + "px";
    css["border-bottom-right-radius"] = e.arrondis.bottomRight + "px";
    props.editor.Css.remove(r);
    props.editor.Css.setRule(
      `#${attr.id}  .item-content .titleblog`,
      css
    );
    setConfigRdTitle(e);

    let cssStyles = props.editor.getCss();
    props.editor.setStyle(cssStyles);
    //cmp.view.render();
  };

  useEffect(() => {}, [configOnglet, configDesc, configEspacement]);
  const changeEspacementConfig = (e) => {
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-desc-padding"] = JSON.stringify(e.padding);
    attr["data-desc-margin"] = JSON.stringify(e.margin);

    cmp.setAttributes(attr);
    let r = props.editor.Css.getRule(`#${attr.id} .article`);
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
      props.editor.Css.setRule(`#${attr.id} .article`, css);
      setConfigEspacement(e);
    } else {
      props.editor.Css.setRule(`#${attr.id} .article`, {
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
              <span className="title-popups">Contenu</span>

              <div className="structmodal">
               
                

                <div class="mb-3 p-3">
                  <label class="article-label">
                    Nombre de post à afficher
                  </label>
                  <input
                    onChange={(e) => {
                      changeParams("nbr", e.target.value)
                  
                    }}
                    type="number"
                    max={20}
                    min={3}
                    class="form-control"
                    value={params.nbr || 5}
                  />
                </div>
                <div class="mb-3 p-3">
                  <label class="article-label">
                    Text du lien
                  </label>
                  <input
                    onChange={(e) => {
                      changeParams("postBtnTxt", e.target.value)
                    
                    }}
                    type="text"
                  
                    class="form-control"
                    value={params.postBtnTxt || "En savoir plus"}
                  />
                </div>

  
                <div className="form-check form-switch mb-3 p-3">
                  <label
                    className="form-check-label"
                    htmlFor={`titlebtnplus`}
                  >
                    Afficher le lien
                     </label>
                  <input
                    onChange={(e) => {
                      changeParams("postBtn", e.target.checked.toString())

                    }}
                    checked={params.postBtn == "true"}
                    type="checkbox"
                    role="switch"
                    className="form-check-input"

                    id={"titlebtnplus" }
            
                    

                  />
             
                </div>
                <div className="form-check form-switch mb-3 p-3">
                  <label
                    className="form-check-label"
                    htmlFor={`imageblog`}
                  >
                    Afficher l'image
                  </label>
                  <input
                    className="form-check-input"
                    checked={params.postThumb == "true"}
                    type="checkbox"
                    role="switch"
                    id={`imageblog`}
                    onChange={(e) =>
                      changeParams("postThumb", e.target.checked.toString())

                    }
                  />
                </div>

                <div class="form-check form-switch mb-3 p-3">
                  <label class="form-check-label" for={"catblog"}>
                    Afficher catégorie du blog
                  </label>
                  <input
                    class="form-check-input"
                    checked={params.postCategory == "true"}
                    type="checkbox"
                    role="switch"
                    id={"catblog"}
                    onChange={(e) =>
                      changeParams("postCategory", e.target.checked.toString())
                    }
                  />
                </div>
                <div class="form-check form-switch mb-3 p-3">
                  <label
                    class="form-check-label"
                    for={"dateblog"}
                  >
                    Afficher date 
                  </label>
                  <input
                    class="form-check-input"
                    checked={params.postDate == "true"}
                    type="checkbox"
                    role="switch"
                    id={"dateblog"}
                    onChange={(e) =>
                      changeParams("postDate", e.target.checked.toString())
                    }
                  />
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
              <span className="title-popups">Design Contenu</span>
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
                        <h2 class="accordion-header" id="pagination">
                          <button
                            class="accordion-button"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#pagintion"
                            aria-expanded="true"
                            aria-controls="collapseOne"
                          >
                            Pagination
                          </button>
                        </h2>
                        <div
                          id="pagintion"
                          class="accordion-collapse collapse"
                          aria-labelledby="headingOne"
                          data-bs-parent="#accordionExample"
                        >
                          <div class="accordion-body">
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
                                        checked={paginationPosition == "start"}
                                        value="start"
                                        className="RadioInput"
                                        onChange={(e) =>
                                          changePostionBtnPagination(e.target.value)
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
                                        checked={paginationPosition == "center"}
                                        value="center"
                                        className="RadioInput"
                                        onChange={(e) =>
                                          changePostionBtnPagination(e.target.value)
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
                                        checked={paginationPosition == "end"}
                                        value="end"
                                        className="RadioInput"
                                        onChange={(e) =>
                                          changePostionBtnPagination(e.target.value)
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
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                  <div className="blockTitle m-2">
                                    Arriére du pagination
                                  </div>
                                  <ColorConfig
                                    key={"paginationbg"}
                                    for={"paginationbg"}
                                    editor={props.editor}
                                    siteId={props.siteId}
                                    config={configBgPagination}
                                    setConfig={changeBackgroundPagination}
                                  />
                                </div>
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                  <div className="blockTitle m-2">
                                    Couleur du pagination
                                  </div>
                                  <ColorConfig
                                    key={"txtPagination"}
                                    for={"txtPagination"}
                                    editor={props.editor}
                                    siteId={props.siteId}
                                    config={configTxtPagination}
                                    setConfig={changeTextPagination}
                                  />
                                </div>
                                
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                  <div className="blockTitle m-2">Arrondis</div>
                                  <ArrondisConfigAccordion
                                    key={"radiuspagination"}
                                    for={"radiuspagination"}
                                    editor={props.editor}
                                    siteId={props.siteId}
                                    config={configRdPagintaion}
                                    setConfig={changeRaduisPagination}
                                  />
                                </div>
                          </div>
                        </div>
                      </div>




                      <div class="accordion-item" id="scrollspyHeading3">
                        <h2 class="accordion-header" id="headingThree">
                          <button
                            class="accordion-button"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseThree"
                            aria-expanded="true"
                            aria-controls="collapseThree"
                          >
                            Design catégorie
                          </button>
                        </h2>
                        <div
                          id="collapseThree"
                          class="accordion-collapse collapse "
                          aria-labelledby="headingThree"
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
                                  id="pills-stcat-tab"
                                  data-bs-toggle="pill"
                                  data-bs-target="#pills-stcat"
                                  type="button"
                                  role="tab"
                                  aria-controls="pills-stcat"
                                  aria-selected="true"
                                >
                                  Style
                                </button>
                              </li>
                              <li class="nav-item" role="presentation">
                                <button
                                  class="nav-link"
                                  id="pills-cat-text-tab"
                                  data-bs-toggle="pill"
                                  data-bs-target="#pills-cat-text"
                                  type="button"
                                  role="tab"
                                  aria-controls="pills-cat-text"
                                  aria-selected="false"
                                >
                                  Text
                                </button>
                              </li>
                              <li class="nav-item" role="presentation">
                                <button
                                  class="nav-link"
                                  id="pills-es-cat-tab"
                                  data-bs-toggle="pill"
                                  data-bs-target="#pills-es-cat"
                                  type="button"
                                  role="tab"
                                  aria-controls="pills-es-cat"
                                  aria-selected="false"
                                >
                                  Espacement
                                </button>
                              </li>
                            </ul>
                            <div class="tab-content" id="pills-tabContent">
                              <div
                                class="tab-pane fade show active"
                                id="pills-stcat"
                                role="tabpanel"
                                aria-labelledby="pills-stcat-tab"
                              >
                                <div class="form-check article-switch mb-3 p-2">
                                  <label
                                    class="form-check-label"
                                    for={activeBorderCat}
                                  >
                                    Activer border
                                  </label>
                                  <input
                                    class="form-check-input"
                                    checked={activeBorderCat == "true"}
                                    type="checkbox"
                                    role="switch"
                                    onChange={(e) =>
                                      setActiveBorderCat(
                                        e.target.checked.toString()
                                      )
                                    }
                                  />
                                </div>
                                {activeBorderCat == "true" ? (
                                  <div className="mt-3 mb-3">
                                    <BorderConfig
                                      key={"catborder"}
                                      for={"catborder"}
                                      editor={props.editor}
                                      siteId={props.siteId}
                                      config={configBorderCat}
                                      setConfig={changeBorderCat}
                                    />
                                  </div>
                                ) : (
                                  ""
                                )}

                                <div className="d-flex justify-content-between align-items-center mb-2">
                                  <div className="blockTitle m-2">
                                    Arrondis en px
                                  </div>
                                  <ArrondisConfigAccordion
                                    key={"rdCat"}
                                    for={"rdCat"}
                                    editor={props.editor}
                                    siteId={props.siteId}
                                    config={configRdCat}
                                    setConfig={changeRaduisCat}
                                  />
                                </div>
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                  <div className="blockTitle m-2">
                                    Arriére du champ
                                  </div>
                                  <ColorConfig
                                    key={"bgCat"}
                                    for={"bgCat"}
                                    editor={props.editor}
                                    siteId={props.siteId}
                                    config={configBgCat}
                                    setConfig={changeBackgroundCat}
                                  />
                                </div>
                              </div>
                              <div
                                class="tab-pane fade"
                                id="pills-cat-text"
                                role="tabpanel"
                                aria-labelledby="pills-cat-text-tab"
                              >
                                <div className="mt-3 mb-3">
                                  <TextStylingComponent
                                    key={"textcat"}
                                    for={"textcat"}
                                    editor={props.editor}
                                    siteId={props.siteId}
                                    config={configTextCat}
                                    setConfig={changeTextCatConfig}
                                  />
                                </div>
                              </div>
                              <div
                                class="tab-pane fade"
                                id="pills-es-cat"
                                role="tabpanel"
                                aria-labelledby="pills-es-cat-tab"
                              >
                                <EspacementConfig
                                  key={"escat"}
                                  for={"escat"}
                                  editor={props.editor}
                                  siteId={props.siteId}
                                  config={configEspacementCat}
                                  setConfig={changeEspacementCat}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>













                      <div class="accordion-item" id="scrollspyHeading6">
                        <h2 class="accordion-header" id="headingsex">
                          <button
                            class="accordion-button"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapsesex"
                            aria-expanded="true"
                            aria-controls="collapsesex"
                          >
                            Design du buttons savoir plus
                          </button>
                        </h2>
                        <div
                          id="collapsesex"
                          class="accordion-collapse collapse"
                          aria-labelledby="headingsex"
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
                                  key={"savoirplus"}
                                  for={"savoirplus"}
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
                                    key={"colorsavoirplus"}
                                    for={"colorsavoirplus"}
                                    editor={props.editor}
                                    siteId={props.siteId}
                                    config={configBgButton}
                                    setConfig={changeBackgroundBtn}
                                  />
                                </div>

                                <div className="d-flex justify-content-between align-items-center mb-2">
                                  <div className="blockTitle m-2">Arrondis</div>
                                  <ArrondisConfigAccordion
                                    key={"savoirplusrd"}
                                    for={"savoirplusrd"}
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
                                        name="btnalign"
                                        id="starts"
                                        checked={posAlignBtn == "start"}
                                        value="start"
                                        className="RadioInput"
                                        onChange={(e) =>
                                          changePostionBtn(e.target.value)
                                        }
                                      />
                                      <label
                                        htmlFor="starts"
                                        className="RadioLabel"
                                      >
                                        <i class="fa-solid fa-arrow-left"></i>
                                      </label>
                                      <input
                                        type="radio"
                                        name="btnalign"
                                        id="centers"
                                        checked={posAlignBtn == "center"}
                                        value="center"
                                        className="RadioInput"
                                        onChange={(e) =>
                                          changePostionBtn(e.target.value)
                                        }
                                      />
                                      <label
                                        htmlFor="centers"
                                        className="RadioLabel"
                                      >
                                        <i class="fa-solid fa-arrow-up"></i>
                                      </label>
                                      <input
                                        type="radio"
                                        name="btnalign"
                                        id="ends"
                                        checked={posAlignBtn == "end"}
                                        value="end"
                                        className="RadioInput"
                                        onChange={(e) =>
                                          changePostionBtn(e.target.value)
                                        }
                                      />
                                      <label
                                        htmlFor="ends"
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
                                <BorderConfig
                                  key={"savoirplushover"}
                                  for={"savoirplushover"}
                                  editor={props.editor}
                                  siteId={props.siteId}
                                  config={configBorderButtonHover}
                                  setConfig={changeBorderButtonHover}
                                />
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





                      <div class="accordion-item" id="scrollspyHeading2">
                        <h2 class="accordion-header" id="headingTow">
                          <button
                            class="accordion-button"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseTow"
                            aria-expanded="true"
                            aria-controls="collapseTow"
                          >
                            Design titre
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
                                  Style
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
                                  Text
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
                                <div class="form-check article-switch mb-3 p-2">
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
                                      key={"titleblog"}
                                      for={"titleblog"}
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
                                  <ArrondisConfigAccordion
                                    key={"radiuistitle"}
                                    for={"radiuistitle"}
                                    editor={props.editor}
                                    siteId={props.siteId}
                                    config={configRdTitle}
                                    setConfig={changeRaduisTitle}
                                  />
                                </div>
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                  <div className="blockTitle m-2">
                                    Arriére du champ
                                  </div>
                                  <ColorConfig
                                    key={"bgtitle"}
                                    for={"bgtitle"}
                                    editor={props.editor}
                                    siteId={props.siteId}
                                    config={configBgTitle}
                                    setConfig={changeBackgroundTitle}
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
                                    key={"typotitle"}
                                    for={"typotitle"}
                                    editor={props.editor}
                                    siteId={props.siteId}
                                    config={ConfigSizeTitle}
                                    setConfig={changeTypoTitleConfig}
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
                                  key={"espacementtitle"}
                                  for={"espacementtitle"}
                                  editor={props.editor}
                                  siteId={props.siteId}
                                  config={configEspacementTitle}
                                  setConfig={changeEspacementTitle}
                                />
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
