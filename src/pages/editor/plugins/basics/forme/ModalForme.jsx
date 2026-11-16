import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal, ModalDialog } from "react-bootstrap";
import { fromBlob } from "image-resize-compress";
import Draggable from "react-draggable";
import EspacementConfig from "../../../compoments/Espacement/EspacementConfig";
import star from "../../../../../assets/Formesvg/067bd928715f05207c3e1e92af7605a7.svg";
import modelforme from "../../../../../assets/Formesvg/modelforme.png";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-hot-toast";
import "./ModalForme.css";
import TextStylingComponent from "../../../compoments/TextStyling/TextStylingComponent";
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
export default function ModalForme(props) {
  const [isActiveSync, setIsActiveSync] = useState(
    props.editor.getSelected().getAttributes()["data-sync"]
      ? props.editor.getSelected().getAttributes()["data-sync"]
      : "true"
  );
  const [posAlignText, setPosAlignText] = useState({
    align: props.editor.getSelected().getAttributes()["data-position-icon"]
      ? props.editor.getSelected().getAttributes()["data-position-icon"]
      : "center",
  });
  const [configtitre, setConfigTitre] = useState({
    font: props.editor.getSelected().getAttributes()["data-titre-font"]
      ? props.editor.getSelected().getAttributes()["data-titre-font"]
      : "",
    variant: props.editor.getSelected().getAttributes()["data-titre-variant"]
      ? props.editor.getSelected().getAttributes()["data-titre-variant"]
      : "normal",
    color: props.editor.getSelected().getAttributes()["data-titre-color"]
      ? props.editor.getSelected().getAttributes()["data-titre-color"]
      : "#fff",
    align: props.editor.getSelected().getAttributes()["data-titre-align"]
      ? props.editor.getSelected().getAttributes()["data-titre-align"]
      : "left",
    size: props.editor.getSelected().getAttributes()["data-titre-size"]
      ? JSON.parse(
          props.editor.getSelected().getAttributes()["data-titre-size"]
        )
      : { desktop: "14", tablet: "14", mobile: "14" },
  });

  const [configDesc, setConfigDesc] = useState({
    font: props.editor.getSelected().getAttributes()["data-description-font"]
      ? props.editor.getSelected().getAttributes()["data-description-font"]
      : "",
    variant: props.editor.getSelected().getAttributes()[
      "data-description-variant"
    ]
      ? props.editor.getSelected().getAttributes()["data-description-variant"]
      : "normal",
    color: props.editor.getSelected().getAttributes()["data-description-color"]
      ? props.editor.getSelected().getAttributes()["data-description-color"]
      : "#fff",
    align: props.editor.getSelected().getAttributes()["data-description-align"]
      ? props.editor.getSelected().getAttributes()["data-description-align"]
      : "left",
    size: props.editor.getSelected().getAttributes()["data-description-size"]
      ? JSON.parse(
          props.editor.getSelected().getAttributes()["data-description-size"]
        )
      : { desktop: "14", tablet: "14", mobile: "14" },
  });

  const changeSubOngletConfig = (e) => {
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-titre-font"] = e.font;
    attr["data-titre-variant"] = e.variant;
    attr["data-titre-size"] = JSON.stringify(e.size);
    attr["data-titre-color"] = e.color;
    attr["data-titre-align"] = e.align;
    cmp.setAttributes(attr);
    let r = props.editor.Css.getRule(`#${attr.id} .content span`);
    let css = [];
    if (r) css = r.attributes.style;
    css["height"] = "auto";
    css["width"] = "auto";
    css["font-family"] = e.font;
    css["color"] = e.color;
    css["text-align"] = e.align;
    css["font-weight"] = e.variant;
    css["font-size"] = e.size.desktop + "px";
    css["line-height"] = e.size.desktop + "px";
    props.editor.Css.setRule(`#${attr.id} .content span`, css);
    props.editor.Css.setRule(
      `#${attr.id} .content span`,
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
      `#${attr.id} .content span`,
      {
        "font-size": `${e.size.mobile}px`,
        "line-height": `${e.size.mobile}px`,
      },
      {
        atRuleType: "media",
        atRuleParams: "(max-width:767px)",
      }
    );
    let cssStyles = props.editor.getCss();
    props.editor.setStyle(cssStyles);
    setConfigTitre(e);
  };

  const changePostionText = (position) => {
    let cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();

    attr["data-position-text"] = position;
    cmp.setAttributes(attr);
    let r = props.editor.Css.getRule(`#${attr.id} .content`);
    let css = [];
    if (r) css = r.attributes.style;
    switch (position) {
      case "center":
        css["align-items"] = position;
        css["justify-content"] = "center";
        break;
      case "start":
        css["align-items"] = position;
        css["justify-content"] = "center";
        break;
      case "end":
        css["align-items"] = position;
        css["justify-content"] = "center";
        break;
      case "top-left":
        css["justify-content"] = "start";
        css["align-items"] = "start";
        break;
      case "top":
        css["justify-content"] = "start";
        css["align-items"] = "center";
        break;
      case "top-right":
        css["justify-content"] = "start";
        css["align-items"] = "end";
        break;
      case "bottom-left":
        css["justify-content"] = "end";
        css["align-items"] = "start";
        break;
      case "bottom":
        css["justify-content"] = "end";
        css["align-items"] = "center";
        break;
      case "bottom-right":
        css["justify-content"] = "end";
        css["align-items"] = "end";
        break;

      default:
        break;
    }

    props.editor.Css.setRule(`#${attr.id} .content`, css);
    setPosAlignText({ align: position });
    let cssStyles = props.editor.getCss();
    props.editor.setStyle(cssStyles);
    cmp.view.render();
  };

  const changeSubOngletConfigDesc = (e) => {
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-description-font"] = e.font;
    attr["data-description-variant"] = e.variant;
    attr["data-description-size"] = JSON.stringify(e.size);
    attr["data-description-color"] = e.color;
    attr["data-description-align"] = e.align;
    cmp.setAttributes(attr);
    let r = props.editor.Css.getRule(`#${attr.id} .content p`);
    let css = [];
    if (r) css = r.attributes.style;
    css["height"] = "auto";
    css["width"] = "auto";
    css["font-family"] = e.font;
    css["color"] = e.color;
    css["text-align"] = e.align;
    css["font-weight"] = e.variant;
    css["font-size"] = e.size.desktop + "px";
    css["line-height"] = e.size.desktop + "px";
    props.editor.Css.setRule(`#${attr.id} .content p`, css);
    props.editor.Css.setRule(
      `#${attr.id} .content p`,
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
      `#${attr.id} .content p`,
      {
        "font-size": `${e.size.mobile}px`,
        "line-height": `${e.size.mobile}px`,
      },
      {
        atRuleType: "media",
        atRuleParams: "(max-width:767px)",
      }
    );
    let cssStyles = props.editor.getCss();
    props.editor.setStyle(cssStyles);
    setConfigDesc(e);
  };
  const [showStylesList, setShowStylesList] = useState(false);

  const [selectedType, setSelectedType] = useState(
    props.editor.getSelected().getAttributes()["data-type-url"]
      ? props.editor.getSelected().getAttributes()["data-type-url"]
      : 500
  );
  const [formeWidth, setFormeWidth] = useState(
    props.editor.getSelected().getAttributes()["data-forme-width"]
      ? props.editor.getSelected().getAttributes()["data-forme-width"]
      : 300
  );
  const [formeHauteur, setFormeHauteur] = useState(
    props.editor.getSelected().getAttributes()["data-forme-height"]
      ? props.editor.getSelected().getAttributes()["data-forme-height"]
      : 300
  );
  const [text, setText] = useState(
    props.editor.getSelected().getAttributes()["data-text"]
      ? props.editor.getSelected().getAttributes()["data-text"]
      : ""
  );

  const [link, setLink] = useState(null);
  const [description, setDescription] = useState(
    props.editor.getSelected().getAttributes()["data-description"]
      ? props.editor.getSelected().getAttributes()["data-description"]
      : ""
  );
  const [selectedTel, setSelectedTel] = useState("#");
  const [selectedPage, setSelectedPage] = useState("#");
  const [selectedPopup, setSelectedPopup] = useState("#");
  const [selectedUrl, setSelectedUrl] = useState("#");
  const [popups, setPopups] = useState([]);
  const [pages, setPages] = useState([]);
  const handleBlob = async (blobFile) => {
    // quality value for webp and jpeg formats.
    const quality = 80;
    // output width. 0 will keep its original width and 'auto' will calculate its scale from height.
    const width = 0;
    // output height. 0 will keep its original height and 'auto' will calculate its scale from width.
    const height = 0;
    // file format: png, jpeg, bmp, gif, webp. If null, original format will be used.
    const format = "webp";

    return await fromBlob(blobFile, quality, width, height, format).then(
      (blob) => {
        return blob;
      }
    );
  };
  const changeHrefLink = (selectedType, link) => {
    setSelectedType(selectedType);
    let cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-type-url"] = selectedType;
    cmp.setAttributes(attr);
    if (cmp) {
      const childElement = cmp.find("A");
      if (childElement.length > 0) {
        // Get the attributes of the first matching child element
        let hrefAttr = childElement[0].getAttributes();
   
        switch (selectedType) {
          case "page":
            attr["data-href"] = link;
            hrefAttr["href"] = link;
            hrefAttr["target"] = "_self";
            delete hrefAttr["data-bs-toggle"];
            setSelectedPage(link);
            break;
          case "popup":
            attr["data-href"] = "#" + link;
            hrefAttr["href"] = "#" + link;
            hrefAttr["target"] = "_self";
            hrefAttr["data-bs-toggle"] = "modal";
            setSelectedPopup(link);

            break;
          case "url":
            attr["data-href"] = link;
            hrefAttr["href"] = link;
            hrefAttr["target"] = "_blank";
            delete hrefAttr["data-bs-toggle"];
            setSelectedUrl(link);
            break;
          case "tel":
            attr["data-href"] = "tel:" + link;
            hrefAttr["href"] = "tel:" + link;
            hrefAttr["target"] = "_self";
            delete hrefAttr["data-bs-toggle"];
            setSelectedTel(link);

            break;
        }

        cmp.setAttributes(attr);
        childElement[0].setAttributes(hrefAttr);
      } else {
        console.log("Child element not found.");
      }
    } else {
      console.log("No component selected.");
    }
  };
  const deleteLien = () => {
    let cmp = props.editor.getSelected();
    const childElement = cmp.find("A"); // Replace with the class name of your child element

    if (childElement.length > 0) {
      // Get the attributes of the first matching child element
      const attributes = childElement[0].getAttributes();
      attributes["href"] = "#";
      attributes["data-url-forme"] = "";
      childElement[0].setAttributes(attributes);
    }
    setSelectedType("");
    setSelectedPage("");
  };

  const [hoveredButton, setHoveredButton] = useState(null);
  const [urlimage, setUrlimage] = useState(
    props.editor.getSelected().getAttributes()["data-image"]
      ? props.editor.getSelected().getAttributes()["data-image"]
      : process.env.REACT_APP_MEDIA_URL + "assets/forme-background.webp"
  );

  const [show, setShow] = useState(true);
  const rgbtoJson = (rgbString) => {
    var s = rgbString;
    s = s.replace("rgb(", "");
    s = s.replace(")", "");
    let c = s.split(",");
    return { r: c[0], g: c[1], b: c[2], a: c[3] };
  };
  const [blockPickerColor, setBlockPickerColor] = useState({
    rgbTxt: props.editor.getSelected().getAttributes()["data-forme-color"]
      ? props.editor.getSelected().getAttributes()["data-forme-color"]
      : "#000",
    rgb: rgbtoJson(
      props.editor.getSelected().getAttributes()["data-forme-color"]
        ? props.editor.getSelected().getAttributes()["data-forme-color"]
        : "#000"
    ),
  });
  const [blockPickerColor2, setBlockPickerColor2] = useState({
    rgbTxt: props.editor.getSelected().getAttributes()[
      "data-forme-color-calque"
    ]
      ? props.editor.getSelected().getAttributes()["data-forme-color-calque"]
      : "#0000",
    rgb: rgbtoJson(
      props.editor.getSelected().getAttributes()["data-forme-color-calque"]
        ? props.editor.getSelected().getAttributes()["data-forme-color-calque"]
        : "#0000"
    ),
  });
  const changeColor = (color) => {
    setBlockPickerColor(color);
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-forme-color"] = color.rgbTxt;
    cmp.setAttributes(attr);
  };

  const changeColor2 = (color) => {
    setBlockPickerColor2(color);
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-forme-color-calque"] = color.rgbTxt;
    cmp.setAttributes(attr);
  };

  const [configEspacementItem, setConfigEspacementItem] = useState({
    padding: props.editor.getSelected().getAttributes()["data-item-padding"]
      ? JSON.parse(
          props.editor.getSelected().getAttributes()["data-item-padding"]
        )
      : {
          top: "0",
          left: "0",
          right: "0",
          bottom: "0",
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
  const [ShowTypeLien, setShowTypeLien] = useState(false);

  const handleCloseTypeLien = () => {
    setShowTypeLien(false);
  };
  const changeEspacementConfigItem = (e) => {
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-forme-padding"] = JSON.stringify(e.padding);
    attr["data-forme-margin"] = JSON.stringify(e.margin);

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
    setConfigEspacementItem(e);
    let cssStyles = props.editor.getCss();
    props.editor.setStyle(cssStyles);
    cmp.view.render();
  };

  const [selectedItem, setSelectedItem] = useState(
    props.editor.getSelected().getAttributes()["data-forme-selected"]
      ? props.editor.getSelected().getAttributes()["data-forme-selected"]
      : "star"
  );
  const animation = [
    { name: "aucun", value: "Aucun" },
    { name: "scale", value: "Scale" },
    { name: "rotation", value: "Rotation" },
    { name: "leftright", value: "Gauche droite" },
    { name: "flip", value: "Flip" },
    { name: "zoomout", value: "Agrandir" },
  ];

  const handleMouseEnter = (index) => {
    setHoveredButton(index);
  };

  const handleMouseLeave = () => {
    setHoveredButton(null);
  };

  const handleClose = () => {
    setShow(false);
  };

  useEffect(() => {
    GetPage();
    getMedia();
    let cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    setSelectedType(attr["data-type-url"]);


    switch (attr["data-type-url"]) {
      case "page":
        setSelectedPage(attr["data-href"]);

        break;
      case "popup":
        setSelectedPopup(attr["data-href"].replace("#", ""));

        break;
      case "url":
        setSelectedUrl(attr["data-href"]);

        break;
      case "tel":
        setSelectedTel(attr["data-href"]? attr["data-href"].replace("tel:", "") : "");

        break;
    }
  }, []);

  const GetPage = async () => {
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
  };

  const [Visibilite, setVisibilite] = useState(
    props.editor.getSelected().getAttributes()["data-forme"]
      ? props.editor.getSelected().getAttributes()["data-forme"]
      : "forme1"
  );

  const handleCloseStylesList = () => {
    setShowStylesList(false);
  };
  const [showUploadMedia, setShowUploadMedia] = useState(false);
  const [media, setMedia] = useState([]);
  const [selected, setSelected] = useState(null);
  const DeleteImg = async (item) => {
    if (selected != null && item.src == selected.src) setSelected(null);
    await axios
      .delete(process.env.REACT_APP_API_URL + "/medias/delete/" + item._id)
      .then((response) => {
        setMedia(response.data.data);
      });
  };
  const getMedia = async () => {
    await axios
      .get(process.env.REACT_APP_API_URL + "/medias/getmedia/" + props.siteId)
      .then((response) => {
        setMedia(response.data.data);
      });
  };
  useEffect(() => {
    let newHTML = "";
    let cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-forme"] = Visibilite;
    cmp.setAttributes(attr);
    if (isActiveSync == "true") {
      setFormeHauteur(formeWidth);
    }
    switch (Visibilite) {
      case "forme1":
        newHTML = `
        <a class="forme-link" href="${
          selectedPage ? selectedPage : "#"
        }" title="${text ? text : "forme"}">
          ${
            text || description
              ? `<div class="content"><span>${text}</span><p>${description}</p></div>`
              : ""
          }
          <svg class="svg">
          <clipPath id="my-clip-path-${
            attr.id
          }" clipPathUnits="objectBoundingBox"><path d="M0.5,0 L1,1 H0"></path></clipPath>
        </svg>
    <div class="clipped">
    <div class="color-overlay"></div>
    </div>
        <style>
        #${attr.id} .color-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          clip-path: url(#my-clip-path-${attr.id});
          background-color: ${blockPickerColor2.rgbTxt}
        }
        #${attr.id} .svg {
          position: absolute;
          width: 0;
          height: 0;
        }
        #${attr.id} .clipped {
          width: ${formeWidth + "px"};
          height: ${formeHauteur + "px"} ;        
          ${
            selectedItem == "modelforme"
              ? "background:url(" + urlimage + ");"
              : "background:" + blockPickerColor.rgbTxt + ";"
          }
          background-size: cover;
          -webkit-clip-path: url(#my-clip-path-${attr.id});
          clip-path: url(#my-clip-path-${attr.id});
        }
        </style>
      </a>
  
  
      `;

        break;
      case "forme2":
        newHTML = `
        <a class="forme-link" href="${link ? link : "#"}" title="${
          text ? text : "forme2"
        }">
          ${
            text || description
              ? `<div class="content"><span>${text}</span><p>${description}</p></div>`
              : ""
          }
          <svg class="svg">
          <clipPath id="my-clip-path-${
            attr.id
          }" clipPathUnits="objectBoundingBox"><path d="M0.5,0.846 L0.191,1,0.235,0.643 L0,0.382 L0.336,0.315 L0.5,0 L0.664,0.315,1,0.382,0.765,0.643,0.809,1"></path></clipPath>
        </svg>
        
        <div class="clipped"><div class="color-overlay"></div></div>
      </a>
      <style>
      #${attr.id} .color-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        clip-path: url(#my-clip-path-${attr.id});
        background-color: ${blockPickerColor2.rgbTxt}
      }
      #${attr.id} .svg {
        position: absolute;
        width: 0;
        height: 0;
      }
      #${attr.id} .clipped {
        width: ${formeWidth + "px"};
        height: ${formeHauteur + "px"} ;        
        ${
          selectedItem == "modelforme"
            ? "background:url(" + urlimage + ");"
            : "background:" + blockPickerColor.rgbTxt + ";"
        }
        background-size: cover;
        -webkit-clip-path: url(#my-clip-path-${attr.id});
        clip-path: url(#my-clip-path-${attr.id});
      }
      </style>
  
      `;

        break;
      case "forme3":
        newHTML = `
        <a class="forme-link" href="${link ? link : "#"}" title="${
          text ? text : "forme"
        }">
          ${
            text || description
              ? `<div class="content"><span>${text}</span><p>${description}</p></div>`
              : ""
          }
          <svg class="svg">
          <clipPath id="my-clip-path-${
            attr.id
          }" clipPathUnits="objectBoundingBox"><path d="M0.5,0 L0.854,0.146 L1,0.5 L0.854,0.854 L0.5,1,0.146,0.854,0,0.5,0.146,0.146"></path></clipPath>
        </svg>
        
        <div class="clipped"><div class="color-overlay"></div></div>
      </a>
      <style>
      #${attr.id} .color-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: ${blockPickerColor2.rgbTxt}  ";"
        clip-path: url(#my-clip-path-${attr.id});
      }
      #${attr.id} .svg {
        position: absolute;
        width: 0;
        height: 0;
      }
      #${attr.id} .clipped {
        width: ${formeWidth + "px"};
        height: ${formeHauteur + "px"} ;        
        ${
          selectedItem == "modelforme"
            ? "background:url(" + urlimage + ");"
            : "background:" + blockPickerColor.rgbTxt + ";"
        }
        background-size: cover;
        -webkit-clip-path: url(#my-clip-path-${attr.id});
        clip-path: url(#my-clip-path-${attr.id});
      }
      </style>
  
      `;

        break;
      case "forme4":
        newHTML = `
        <a class="forme-link" href="${link ? link : "#"}" title="${
          text ? text : "forme"
        }">
          ${
            text || description
              ? `<div class="content"><span>${text}</span><p>${description}</p></div>`
              : ""
          }
          <svg class="svg">
          <clipPath id="my-clip-path-${
            attr.id
          }" clipPathUnits="objectBoundingBox"><path d="M0.5,0.768 L0.366,1 L0.366,0.732,0.134,0.866 L0.268,0.634 L0,0.634 L0.232,0.5,0,0.366 L0.268,0.366,0.134,0.134 L0.366,0.268 L0.366,0 L0.5,0.232,0.634,0 L0.634,0.268,0.866,0.134 L0.732,0.366 L1,0.366 L0.768,0.5 L1,0.634,0.732,0.634,0.866,0.866 L0.634,0.732 L0.634,1"></path></clipPath>
        </svg>
        
        <div class="clipped"><div class="color-overlay"></div></div>
      </a>
      <style>
      #${attr.id} .color-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: ${blockPickerColor2.rgbTxt}  ";"
        clip-path: url(#my-clip-path-${attr.id});
      }
      #${attr.id} .svg {
        position: absolute;
        width: 0;
        height: 0;
      }
      #${attr.id} .clipped {
        width: ${formeWidth + "px"};
        height: ${formeHauteur + "px"} ;        
        ${
          selectedItem == "modelforme"
            ? "background:url(" + urlimage + ");"
            : "background:" + blockPickerColor.rgbTxt + ";"
        }
        background-size: cover;
        -webkit-clip-path: url(#my-clip-path-${attr.id});
        clip-path: url(#my-clip-path-${attr.id});
      }
      </style>
  
      `;

        break;
      case "forme5":
        newHTML = `
        <a class="forme-link" href="${link ? link : "#"}" title="${
          text ? text : "forme"
        }">
          ${
            text || description
              ? `<div class="content"><span>${text}</span><p>${description}</p></div>`
              : ""
          }
          <svg class="svg">
          <clipPath id="my-clip-path-${
            attr.id
          }" clipPathUnits="objectBoundingBox"><path d="M0.417,0 V0 C0.647,0,0.833,0.17,0.833,0.379 S0.647,0.759,0.417,0.759 C0.395,0.759,0.373,0.757,0.352,0.754 C0.262,0.854,0.159,0.872,0.056,0.875 V0.85 C0.111,0.82,0.156,0.764,0.156,0.7 C0.156,0.691,0.156,0.683,0.155,0.674 C0.06,0.605,0,0.498,0,0.379 C0,0.17,0.187,0,0.417,0 M0.865,0.85 C0.865,0.905,0.896,0.953,0.944,0.979 V1 C0.855,0.998,0.773,0.982,0.695,0.896 C0.677,0.899,0.658,0.9,0.639,0.9 C0.556,0.9,0.48,0.875,0.419,0.833 C0.544,0.832,0.663,0.787,0.753,0.705 C0.798,0.664,0.834,0.616,0.859,0.561 C0.886,0.504,0.899,0.443,0.899,0.379 C0.899,0.369,0.899,0.359,0.898,0.349 C0.961,0.407,1,0.487,1,0.575 C1,0.677,0.948,0.768,0.866,0.828 C0.865,0.835,0.865,0.843,0.865,0.85"></path></clipPath>
        </svg>
        
        <div class="clipped"><div class="color-overlay"></div></div>
      </a>
      <style>
      #${attr.id} .color-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: ${blockPickerColor2.rgbTxt}  ";"
        clip-path: url(#my-clip-path-${attr.id});
      }
      #${attr.id} .svg {
        position: absolute;
        width: 0;
        height: 0;
      }
      #${attr.id} .clipped {
        width: ${formeWidth + "px"};
        height: ${formeHauteur + "px"} ;        
        ${
          selectedItem == "modelforme"
            ? "background:url(" + urlimage + ");"
            : "background:" + blockPickerColor.rgbTxt + ";"
        }
        background-size: cover;
        -webkit-clip-path: url(#my-clip-path-${attr.id});
        clip-path: url(#my-clip-path-${attr.id});
      }
      </style>
  
      `;

        break;

      case "forme6":
        newHTML = `
        <a class="forme-link" href="${link ? link : "#"}" title="${
          text ? text : "forme"
        }">
          ${
            text || description
              ? `<div class="content"><span>${text}</span><p>${description}</p></div>`
              : ""
          }
          <svg class="svg">
          <clipPath id="my-clip-path-${
            attr.id
          }" clipPathUnits="objectBoundingBox"><path d="M0.375,0 L0,0.5 H0.375 L0.125,1,1,0.375 H0.5 L0.875,0"></path></clipPath>
        </svg>
        
        <div class="clipped"><div class="color-overlay"></div></div>
      </a>
      <style>
      #${attr.id} .color-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: ${blockPickerColor2.rgbTxt}  ";"
        clip-path: url(#my-clip-path-${attr.id});
      }
      #${attr.id} .svg {
        position: absolute;
        width: 0;
        height: 0;
      }
      #${attr.id} .clipped {
        width: ${formeWidth + "px"};
        height: ${formeHauteur + "px"} ;        
        ${
          selectedItem == "modelforme"
            ? "background:url(" + urlimage + ");"
            : "background:" + blockPickerColor.rgbTxt + ";"
        }
        background-size: cover;
        -webkit-clip-path: url(#my-clip-path-${attr.id});
        clip-path: url(#my-clip-path-${attr.id});
      }
      </style>
  
      `;

        break;
      case "forme7":
        newHTML = `
        <a class="forme-link" href="${link ? link : "#"}" title="${
          text ? text : "forme"
        }">
          ${
            text || description
              ? `<div class="content"><span>${text}</span><p>${description}</p></div>`
              : ""
          }
          <svg class="svg">
          <clipPath id="my-clip-path-${
            attr.id
          }" clipPathUnits="objectBoundingBox"><path d="M0.987,0.131 C0.879,0.049,0.712,0,0.541,0 C0.33,0,0.158,0.074,0.069,0.202 C0.027,0.263,0.004,0.334,0,0.415 C-0.003,0.487,0.009,0.566,0.036,0.651 C0.129,0.373,0.388,0.156,0.687,0.156 C0.687,0.156,0.407,0.229,0.231,0.457 C0.231,0.457,0.229,0.46,0.225,0.465 C0.189,0.513,0.159,0.566,0.136,0.627 C0.097,0.72,0.061,0.847,0.061,1 H0.186 C0.186,1,0.167,0.881,0.2,0.743 C0.254,0.751,0.303,0.754,0.347,0.754 C0.462,0.754,0.544,0.729,0.605,0.676 C0.659,0.628,0.689,0.564,0.721,0.496 C0.769,0.392,0.824,0.274,0.984,0.183 C0.993,0.178,0.999,0.168,0.999,0.158 S0.995,0.137,0.987,0.131"></path></clipPath>
        </svg>
        
        <div class="clipped"><div class="color-overlay"></div></div>
      </a>
      <style>
      #${attr.id} .color-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: ${blockPickerColor2.rgbTxt}  ";"
        clip-path: url(#my-clip-path-${attr.id});
      }
      #${attr.id} .svg {
        position: absolute;
        width: 0;
        height: 0;
      }
      #${attr.id} .clipped {
        width: ${formeWidth + "px"};
        height: ${formeHauteur + "px"} ;        
        ${
          selectedItem == "modelforme"
            ? "background:url(" + urlimage + ");"
            : "background:" + blockPickerColor.rgbTxt + ";"
        }
        background-size: cover;
        -webkit-clip-path: url(#my-clip-path-${attr.id});
        clip-path: url(#my-clip-path-${attr.id});
      }
      </style>
  
      `;

        break;
      case "forme8":
        newHTML = `
        <a class="forme-link" href="${link ? link : "#"}" title="${
          text ? text : "forme"
        }">
          ${
            text || description
              ? `<div class="content"><span>${text}</span><p>${description}</p></div>`
              : ""
          }
          <svg class="svg">
          <clipPath id="my-clip-path-${
            attr.id
          }" clipPathUnits="objectBoundingBox"><path d="M0,0 C0.007,0.297,0.014,0.465,0.021,0.502 C0.028,0.543,0.034,0.73,0.133,0.73 C0.232,0.73,0.275,0.673,0.254,0.51 S0.224,0.279,0.324,0.279 C0.425,0.279,0.386,0.474,0.377,0.513 C0.35,0.627,0.324,0.852,0.436,0.871 C0.548,0.889,0.564,0.768,0.567,0.682 C0.57,0.597,0.535,0.322,0.628,0.322 C0.726,0.322,0.75,0.461,0.717,0.576 C0.646,0.817,0.684,1,0.826,1 C0.926,1,0.979,0.839,0.985,0.516 L1,0 H0"></path></clipPath>
          </svg>
        
        <div class="clipped"><div class="color-overlay"></div></div>
      </a>
      <style>
      #${attr.id} .color-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        clip-path: url(#my-clip-path-${attr.id});
        background-color: ${blockPickerColor2.rgbTxt}
      }
      #${attr.id} .svg {
        position: absolute;
        width: 0;
        height: 0;
      }
      #${attr.id} .clipped {
        width: ${formeWidth + "px"};
        height: ${formeHauteur + "px"} ;        
        ${
          selectedItem == "modelforme"
            ? "background:url(" + urlimage + ");"
            : "background:" + blockPickerColor.rgbTxt + ";"
        }
        background-size: cover;
        -webkit-clip-path: url(#my-clip-path-${attr.id});
        clip-path: url(#my-clip-path-${attr.id});
      }
      </style>
  
      `;

        break;
      case "forme9":
        newHTML = `
        <a class="forme-link" href="${link ? link : "#"}" title="${
          text ? text : "forme"
        }">
          ${
            text || description
              ? `<div class="content"><span>${text}</span><p>${description}</p></div>`
              : ""
          }
          <svg class="svg">
          <clipPath id="my-clip-path-${
            attr.id
          }" clipPathUnits="objectBoundingBox"><path d="M0,0 C1,0,1,1,0,1"></path></clipPath>
        </svg>
        
        <div class="clipped"><div class="color-overlay"></div></div>
        
       
      </a>
      <style>
      #${attr.id} .color-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: ${blockPickerColor2.rgbTxt}  ";"
        clip-path: url(#my-clip-path-${attr.id});
      }
      #${attr.id} .svg {
        position: absolute;
        width: 0;
        height: 0;
      }
      #${attr.id} .clipped {
        width: ${formeWidth + "px"};
        height: ${formeHauteur + "px"} ;        
        ${
          selectedItem == "modelforme"
            ? "background:url(" + urlimage + ");"
            : "background:" + blockPickerColor.rgbTxt + ";"
        }
        background-size: cover;
        -webkit-clip-path: url(#my-clip-path-${attr.id});
        clip-path: url(#my-clip-path-${attr.id});
      }
      </style>
  
      `;

        break;
      case "forme10":
        newHTML = `
        <a class="forme-link" href="${link ? link : "#"}" title="${
          text ? text : "forme"
        }">
          ${
            text || description
              ? `<div class="content"><span>${text}</span><p>${description}</p></div>`
              : ""
          }
          <svg class="svg">
          <clipPath id="my-clip-path-${
            attr.id
          }" clipPathUnits="objectBoundingBox"><path d="M0,0 C1,0,1,1,0,1"></path></clipPath>
        </svg>
        
        <div class="clipped"><div class="color-overlay"></div></div>
  
      </a>
      <style>
      #${attr.id} .color-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: ${blockPickerColor2.rgbTxt} ";"
        clip-path: url(#my-clip-path-${attr.id});
      }
      #${attr.id} .svg {
        position: absolute;
        width: 0;
        height: 0;
      }
      #${attr.id} .clipped {
        width: ${formeWidth + "px"};
        height: ${formeHauteur + "px"} ;        
        ${
          selectedItem == "modelforme"
            ? "background:url(" + urlimage + ");"
            : "background:" + blockPickerColor.rgbTxt + ";"
        }
        background-size: cover;
        -webkit-clip-path: url(#my-clip-path-${attr.id});
        clip-path: url(#my-clip-path-${attr.id});
      }
      </style>
  
      `;

        break;
      case "forme11":
        newHTML = `
          <a class="forme-link" href="${
            selectedPage ? selectedPage : "#"
          }" title="${text ? text : "forme"}">
            ${
              text || description
                ? `<div class="content"><span>${text}</span><p>${description}</p></div>`
                : ""
            }
            <svg class="svg">
            <clipPath id="my-clip-path-${
              attr.id
            }" clipPathUnits="objectBoundingBox"><path d="M1,0.636 l-0.5,-0.428,-0.5,0.428 v-0.174 l0.5,-0.428,0.5,0.428 M0.875,0.62 v0.413 h-0.25 v-0.276 h-0.25 v0.276 h-0.25 v-0.413 l0.375,-0.31"></path></clipPath>
          </svg>
          
          <div class="clipped"><div class="color-overlay"></div></div>
          <style>
          #${attr.id} .color-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: ${blockPickerColor2.rgbTxt}";"
            clip-path: url(#my-clip-path-${attr.id});
          }
          #${attr.id} .svg {
            position: absolute;
            width: 0;
            height: 0;
          }
          #${attr.id} .clipped {
            width: ${formeWidth + "px"};
            height: ${formeHauteur + "px"} ;        
            ${
              selectedItem == "modelforme"
                ? "background:url(" + urlimage + ");"
                : "background:" + blockPickerColor.rgbTxt + ";"
            }
            background-size: cover;
            -webkit-clip-path: url(#my-clip-path-${attr.id});
            clip-path: url(#my-clip-path-${attr.id});
          }
          </style>
        </a>
        `;

        break;

      default:
        break;
    }

    cmp.components(newHTML);
    cmp.view.render();
    let rules = props.editor.Css.getRule(`#${attr.id}`);
    let rule = {};
    if (rules) {
      rule = rules.attributes.style;
    }
    rule["width"] = formeWidth + "px";
    rule["height"] = formeHauteur + "px";
    props.editor.Css.setRule(`#${attr.id}`, rule);

    attr["data-forme-selected"] = selectedItem;
    attr["data-text"] = text;
    attr["data-description"] = description;
    attr["data-image"] = urlimage;
    attr["data-forme-width"] = formeWidth;
    attr["data-forme-height"] = formeHauteur;

    let css = props.editor.getCss();
    props.editor.setStyle(css);
    cmp.setAttributes(attr);
  }, [
    Visibilite,
    text,
    description,
    selectedItem,
    urlimage,
    formeWidth,
    formeHauteur,
    blockPickerColor,
    blockPickerColor2,
  ]);

  const UploadMedia = async (data) => {
    toast.loading("Téléchargement en cours");
    let formData = new FormData();

    await Promise.all(
      Object.values(data).map(async (element) => {
        const file = await handleBlob(element);

        formData.append("files[]", file);
      })
    );

    await axios
      .post(
        process.env.REACT_APP_API_URL + "/medias/upload/" + props.siteId,
        formData
      )
      .then((response) => {
        toast.dismiss();
        setMedia(response.data.data);
        toast.success(response.data.message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
        });
      })
      .catch((error) => {
        toast.dismiss();
        toast.error(error.response.data.message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
        });
      });
  };
  const [selectedanimation, setSelectedanimation] = useState(
    props.editor.getSelected().getAttributes()["data-animation"]
      ? props.editor.getSelected().getAttributes()["data-animation"]
      : "none"
  );
  useEffect(() => {
    //  const cmp = props.editor.getSelected();
    // let attr = cmp.getAttributes();
    // attr["class"] = attr["class"] + '' + selectedanimation;
    // cmp.setAttributes(attr);

    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-animation"] = selectedanimation;
    cmp.setAttributes(attr);
    let listclasses = cmp
      .getClasses()
      .filter((c) => c.indexOf("annimation") == -1);
    listclasses.push("annimation-" + selectedanimation);
    cmp.setClass(listclasses);
  }, [selectedanimation]);

  return (
    <div id="modalforme">
      <Modal
        dialogAs={DraggableModalDialog}
        show={show}
        onHide={handleClose}
        id="ModalWidgetforme"
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
              <span className="title-popups">Contenu de la forme</span>
              <div className="listForme m-3">
                <span className="d-block text-bold mt-3 p-3">
                  Choisir la forme
                </span>
                <div>
                  <div className="d-flex justify-content-center align-align-items-center flex-wrap list_svg forme">
                    <input
                      type="radio"
                      value="forme1"
                      name="model"
                      checked={Visibilite == "forme1"}
                      onChange={(e) => setVisibilite(e.target.value)}
                      id="forme1"
                    />

                    <label className="" htmlFor="forme1">
                      <svg viewBox="0 0 563 563">
                        <path d="M281.5 0L563 563H0z"></path>
                      </svg>
                    </label>

                    <input
                      type="radio"
                      value="forme2"
                      name="model"
                      checked={Visibilite == "forme2"}
                      onChange={(e) => setVisibilite(e.target.value)}
                      id="forme2"
                    />

                    <label className="" htmlFor="forme2">
                      <svg viewBox="0 0 552.56396484375 525.51904296875">
                        <path d="M276.5 444.707l-170.752 80.812 24.093-187.367L.218 200.731l185.642-34.987L276.5 0l90.64 165.744 185.642 34.987-129.623 137.421 24.093 187.367z"></path>
                      </svg>
                    </label>
                    <input
                      type="radio"
                      value="forme3"
                      name="model"
                      checked={Visibilite == "forme3"}
                      onChange={(e) => setVisibilite(e.target.value)}
                      id="forme3"
                    />

                    <label className="" htmlFor="forme3">
                      <svg viewBox="0 0 538 538">
                        <path d="M269 0l190.212 78.788L538 269l-78.788 190.212L269 538 78.788 459.212 0 269 78.788 78.788z"></path>
                      </svg>
                    </label>
                    <input
                      type="radio"
                      value="forme4"
                      name="model"
                      checked={Visibilite == "forme4"}
                      onChange={(e) => setVisibilite(e.target.value)}
                      id="forme4"
                    />

                    <label className="" htmlFor="forme4">
                      <svg viewBox="0 0 762.115966796875 762.115966796875">
                        <path d="M381.5 585.822L279.396 762.558l-.057-204.11-176.793 102.006L204.552 483.66l-204.11-.057L177.178 381.5.442 279.396l204.11-.057-102.006-176.793L279.34 204.552l.057-204.11L381.5 177.178 483.604.442l.057 204.11 176.793-102.006L558.448 279.34l204.11.057L585.822 381.5l176.736 102.104-204.11.057 102.006 176.793L483.66 558.448l-.057 204.11z"></path>
                      </svg>
                    </label>

                    <input
                      type="radio"
                      value="forme5"
                      name="model"
                      checked={Visibilite == "forme5"}
                      onChange={(e) => setVisibilite(e.target.value)}
                      id="forme5"
                    />

                    <label className="" htmlFor="forme5">
                      <svg viewBox="0 0 36 32">
                        <path d="M15 0v0c8.284 0 15 5.435 15 12.139s-6.716 12.139-15 12.139c-0.796 0-1.576-0.051-2.339-0.147-3.222 3.209-6.943 3.785-10.661 3.869v-0.785c2.008-0.98 3.625-2.765 3.625-4.804 0-0.285-0.022-0.564-0.063-0.837-3.392-2.225-5.562-5.625-5.562-9.434 0-6.704 6.716-12.139 15-12.139zM31.125 27.209c0 1.748 1.135 3.278 2.875 4.118v0.673c-3.223-0.072-6.181-0.566-8.973-3.316-0.661 0.083-1.337 0.126-2.027 0.126-2.983 0-5.732-0.805-7.925-2.157 4.521-0.016 8.789-1.464 12.026-4.084 1.631-1.32 2.919-2.87 3.825-4.605 0.961-1.84 1.449-3.799 1.449-5.825 0-0.326-0.014-0.651-0.039-0.974 2.268 1.873 3.664 4.426 3.664 7.24 0 3.265-1.88 6.179-4.82 8.086-0.036 0.234-0.055 0.474-0.055 0.718z"></path>
                      </svg>
                    </label>
                    <input
                      type="radio"
                      value="forme6"
                      name="model"
                      checked={Visibilite == "forme6"}
                      onChange={(e) => setVisibilite(e.target.value)}
                      id="forme6"
                    />

                    <label className="" htmlFor="forme6">
                      <svg viewBox="0 0 32 32">
                        <path d="M12 0l-12 16h12l-8 16 28-20h-16l12-12z"></path>
                      </svg>
                    </label>
                    {/* separatation */}

                    <input
                      type="radio"
                      value="forme7"
                      name="model"
                      checked={Visibilite == "forme7"}
                      onChange={(e) => setVisibilite(e.target.value)}
                      id="forme7"
                    />

                    <label className="" htmlFor="forme7">
                      <svg viewBox="0 0 31.952877044677734 31.98499870300293">
                        <path d="M31.604 4.203c-3.461-2.623-8.787-4.189-14.247-4.189-6.754 0-12.257 2.358-15.099 6.469-1.335 1.931-2.073 4.217-2.194 6.796-0.108 2.296 0.278 4.835 1.146 7.567 2.965-8.887 11.244-15.847 20.79-15.847 0 0-8.932 2.351-14.548 9.631-0.003 0.004-0.078 0.097-0.207 0.272-1.128 1.509-2.111 3.224-2.846 5.166-1.246 2.963-2.4 7.030-2.4 11.931h4c0 0-0.607-3.819 0.449-8.212 1.747 0.236 3.308 0.353 4.714 0.353 3.677 0 6.293-0.796 8.231-2.504 1.736-1.531 2.694-3.587 3.707-5.764 1.548-3.325 3.302-7.094 8.395-10.005 0.292-0.167 0.48-0.468 0.502-0.804s-0.126-0.659-0.394-0.862z"></path>
                      </svg>
                    </label>
                    {/* separatation */}

                    <input
                      type="radio"
                      value="forme8"
                      name="model"
                      checked={Visibilite == "forme8"}
                      onChange={(e) => setVisibilite(e.target.value)}
                      id="forme8"
                    />

                    <label className="" htmlFor="forme8">
                      <svg viewBox="0 0 580.5780029296875 457.23797607421875">
                        <path d="M0 0c4.255 136.009 8.278 212.553 12.07 229.633 4.147 18.678 7.825 103.926 65.305 103.926 57.48 0 82.23-25.727 69.855-100.141s-17.414-105.914 41.024-105.914c58.437 0 35.827 89.276 30.43 107.129-15.67 51.827-30.43 154.945 34.535 163.484 64.965 8.54 73.97-46.797 75.738-86.5 1.717-38.571-18.478-164.61 35.828-164.61 56.871 0 70.925 63.998 51.457 116.333-41.035 110.316-19.335 193.898 63.137 193.898 58.195 0 88.983-73.722 92.363-221.168L580.578 0H0z"></path>
                      </svg>
                    </label>
                    {/* <input
                      type="radio"
                      value="forme9"
                      name="model"
                      checked={Visibilite == "forme9"}
                      onChange={(e) => setVisibilite(e.target.value)}
                      id="forme9"
                    />

                    <label className="" htmlFor="forme9">
                      <svg class="svg">
                        <clipPath
                          id="my-clip-path"
                          clipPathUnits="objectBoundingBox"
                        >
                          <path d="M0,0 C1,0,1,1,0,1"></path>
                        </clipPath>
                      </svg>
                    </label> */}
                    <input
                      type="radio"
                      value="forme10"
                      name="model"
                      checked={Visibilite == "forme10"}
                      onChange={(e) => setVisibilite(e.target.value)}
                      id="forme10"
                    />

                    <label className="" htmlFor="forme10">
                      <svg viewBox="0 0 97.5 130">
                        <path d="M 0 0 C 130,0 130,130 0,130"></path>
                      </svg>
                    </label>
                    <input
                      type="radio"
                      value="forme11"
                      name="model"
                      checked={Visibilite == "forme11"}
                      onChange={(e) => setVisibilite(e.target.value)}
                      id="forme11"
                    />

                    <label className="" htmlFor="forme11">
                      <svg viewBox="0 0 32 29.033000946044922">
                        <path d="M32 18.451l-16-12.42-16 12.42v-5.064l16-12.42 16 12.42zM28 18v12h-8v-8h-8v8h-8v-12l12-9z"></path>
                      </svg>
                    </label>
                  </div>
                </div>
                <div
                  className="d-flex justify-content-between align-items-center mb-4 mt-4  setting-title"
                  onClick={(e) => setShowTypeLien(true)}
                >
                  Lien de l'image <i class="fas fa-angle-right"></i>
                </div>
                <small
                  className={selectedType == "" ? "d-none" : "d-block supplien"}
                  onClick={(e) => deleteLien(e)}
                >
                  {" "}
                  Supprimer lien
                </small>

                <div>
                  <div class="mb-3">
                    <label className="d-block mb-3">Titre</label>

                    <input
                      type="text"
                      value={text}
                      placeholder="Titre"
                      className="form-control "
                      onChange={(e) => setText(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <div class="mb-3">
                    <label className="d-block mb-3">Description</label>

                    <textarea
                      type="texterea"
                      value={description}
                      placeholder="Description"
                      className="form-control "
                      onChange={(e) => setDescription(e.target.value)}
                    />
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
              <span className="title-popups">Design des formes</span>
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
                  <span id="scrollspyHeading1" className="titre mt-4 mb-4 ">
                    Mise en page
                  </span>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div
                      className="btn-group dropend formeSelected"
                      onClick={(e) => setShowStylesList(true)}
                    >
                      {selectedItem == "star" ? (
                        <img
                          src={star}
                          className="img svgForme  ms-3 me-3 rounded-0"
                        />
                      ) : (
                        <img
                          src={modelforme}
                          className="img svgForme  ms-3 me-3 rounded-0"
                        />
                      )}

                      <i
                        className="dropdown-toggle m-3"
                        aria-expanded="false"
                      ></i>
                    </div>
                  </div>
                  <div>
                    <i class="far fa-phone-laptop"></i>
                    <span>
                      La modification s'applique aux ordinateurs et tablettes
                    </span>
                  </div>

                  <div className="firstdivplus">
                    <div className=" d-flex justify-content-between align-items-center mb-3 mt-3">
                      <label
                        className="form-check-label"
                        htmlFor="isActiveShadow"
                      >
                        Synchronisation largeur et hauteur
                      </label>
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id={"isActiveSync"}
                          name={"isActiveSync"}
                          checked={isActiveSync == "true"}
                          onChange={(e) => {
                            setIsActiveSync(e.target.checked.toString());
                          }}
                        />
                      </div>
                    </div>
                    <div className="d-flex align-items-center  ms-2 typeBorder">
                      <div className="titleSize me-3">Largeur</div>
                      <div className="rangeSize me-2 d-flex align-items-center mb-2">
                        <input
                          type="range"
                          min="0"
                          max="1000"
                          step="1"
                          name={"range-" + props.element}
                          id={"range-" + props.element}
                          className="rangeInput me-2"
                          value={formeWidth}
                          onChange={(e) => setFormeWidth(e.target.value)}
                        />
                        <div className="input-with-label-pixel">
                          <span className="pixel-label">px</span>
                          <input
                            min="0"
                            max="100"
                            id={"range-" + props.element}
                            name={"range-" + props.element}
                            className="form-control form-control-sm input-small-pixel"
                            type="number"
                            value={formeWidth}
                            onChange={(e) => setFormeWidth(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    <div
                      className={
                        isActiveSync == "true"
                          ? "d-none"
                          : "d-flex align-items-center  ms-2 typeBorder"
                      }
                    >
                      <div className="titleSize me-3">Hauteur</div>
                      <div className="rangeSize me-2 d-flex align-items-center">
                        <input
                          type="range"
                          min="0"
                          max="1000"
                          step="1"
                          name={"range-" + props.element}
                          id={"range-" + props.element}
                          className="rangeInput me-2"
                          value={formeHauteur}
                          onChange={(e) => setFormeHauteur(e.target.value)}
                        />
                        <div className="input-with-label-pixel">
                          <span className="pixel-label">px</span>
                          <input
                            min="0"
                            max="1000"
                            id={"range-" + props.element}
                            name={"range-" + props.element}
                            className="form-control form-control-sm input-small-pixel"
                            type="number"
                            value={formeHauteur}
                            onChange={(e) => setFormeHauteur(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="firstdivplus">
                    <nav>
                      <div
                        class="nav nav-tabs tab-forme"
                        id="nav-tab"
                        role="tablist"
                      >
                        <button
                          className="nav-link tt active"
                          id="nav-couleur-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#nav-couleur"
                          type="button"
                          role="tab"
                          aria-controls="nav-couleur"
                          aria-selected="true"
                        >
                          Couleur
                        </button>
                        <button
                          className="nav-link tt"
                          id="nav-image-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#nav-image"
                          type="button"
                          role="tab"
                          aria-controls="nav-image"
                          aria-selected="false"
                        >
                          Image
                        </button>
                      </div>
                    </nav>
                    <div class="tab-content mt-5" id="nav-tabContent">
                      <div
                        class="tab-pane fade show active"
                        id="nav-couleur"
                        role="tabpanel"
                        aria-labelledby="nav-couleur-tab"
                        tabindex="0"
                      >
                        <ColorConfig
                          key={"forme"}
                          label="Arrière-plan de l'entête"
                          config={blockPickerColor}
                          setConfig={changeColor}
                        />
                      </div>
                      <div
                        class="tab-pane fade show"
                        id="nav-image"
                        role="tabpanel"
                        aria-labelledby="nav-image-tab"
                        tabindex="0"
                      >
                        <div
                          className="config"
                          style={{ background: `url(${urlimage})` }}
                        >
                          <button
                            className="cadreImage"
                            onClick={(e) => setShowUploadMedia(true)}
                          >
                            <i class="fa-solid fa-plus"></i>
                            <span className="textCadre">Choisi un image</span>
                          </button>
                        </div>
                        <div className="mt-5">
                          <ColorConfig
                            key={"forme"}
                            label="Couleur calque de l'image"
                            config={blockPickerColor2}
                            setConfig={changeColor2}
                          />{" "}
                        </div>
                      </div>
                    </div>
                  </div>
                  {text.length > 0 ? (
                    <div class="setting models">
                      <div class="accordion" id="accordiontitre">
                        <div class="accordion-item">
                          <h2 class="accordion-header" id="headingTwo">
                            <button
                              className="accordion-button collapsed text-center"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#titreTab"
                              aria-expanded="false"
                              aria-controls="titreTab"
                            >
                              Titre
                            </button>
                          </h2>
                          <div
                            id="titreTab"
                            class="accordion-collapse collapse"
                            aria-labelledby="headingTwo"
                            data-bs-parent="#accordiontitre"
                          >
                            <div class="accordion-body">
                              <TextStylingComponent
                                key={"formetitle"}
                                for={"formetitle"}
                                editor={props.editor}
                                siteId={props.siteId}
                                config={configtitre}
                                setConfig={changeSubOngletConfig}
                              />
                              <div className="justify-content-between align-items-center d-flex">
                                <span>Orientation des texts</span>

                                <div className="panelContnet forme-text">
                                  <div className="radio-btns-group d-flex align-items-center">
                                    <input
                                      type="radio"
                                      name="top-left"
                                      id="top-left"
                                      checked={posAlignText.align == "top-left"}
                                      value="top-left"
                                      className="RadioInput"
                                      onChange={(e) =>
                                        changePostionText(e.target.value)
                                      }
                                    />
                                    <label
                                      htmlFor="top-left"
                                      className="RadioLabel"
                                    >
                                      <i class="fa-solid fa-up-left"></i>
                                    </label>
                                    <input
                                      type="radio"
                                      name="top"
                                      id="top"
                                      checked={posAlignText.align == "top"}
                                      value="top"
                                      className="RadioInput"
                                      onChange={(e) =>
                                        changePostionText(e.target.value)
                                      }
                                    />
                                    <label htmlFor="top" className="RadioLabel">
                                      <i class="fa-solid fa-arrow-up"></i>
                                    </label>
                                    <input
                                      type="radio"
                                      name="top-right"
                                      id="top-right"
                                      checked={
                                        posAlignText.align == "top-right"
                                      }
                                      value="top-right"
                                      className="RadioInput"
                                      onChange={(e) =>
                                        changePostionText(e.target.value)
                                      }
                                    />
                                    <label
                                      htmlFor="top-right"
                                      className="RadioLabel"
                                    >
                                      <i class="fa-solid fa-up-right"></i>
                                    </label>
                                  </div>
                                  <div className="radio-btns-group d-flex align-items-center">
                                    <input
                                      type="radio"
                                      name="start"
                                      id="start"
                                      checked={posAlignText.align == "start"}
                                      value="start"
                                      className="RadioInput"
                                      onChange={(e) =>
                                        changePostionText(e.target.value)
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
                                      checked={posAlignText.align == "center"}
                                      value="center"
                                      className="RadioInput"
                                      onChange={(e) =>
                                        changePostionText(e.target.value)
                                      }
                                    />
                                    <label
                                      htmlFor="center"
                                      className="RadioLabel"
                                    >
                                      <i class="fa-solid fa-circle-dot"></i>
                                    </label>
                                    <input
                                      type="radio"
                                      name="end"
                                      id="end"
                                      checked={posAlignText.align == "end"}
                                      value="end"
                                      className="RadioInput"
                                      onChange={(e) =>
                                        changePostionText(e.target.value)
                                      }
                                    />
                                    <label htmlFor="end" className="RadioLabel">
                                      <i class="fa-solid fa-arrow-right"></i>
                                    </label>
                                  </div>
                                  <div className="radio-btns-group d-flex align-items-center">
                                    <input
                                      type="radio"
                                      name="bottom-left"
                                      id="bottom-left"
                                      checked={
                                        posAlignText.align == "bottom-left"
                                      }
                                      value="bottom-left"
                                      className="RadioInput"
                                      onChange={(e) =>
                                        changePostionText(e.target.value)
                                      }
                                    />
                                    <label
                                      htmlFor="bottom-left"
                                      className="RadioLabel"
                                    >
                                      <i class="fa-solid fa-down-left"></i>
                                    </label>
                                    <input
                                      type="radio"
                                      name="bottom"
                                      id="bottom"
                                      checked={posAlignText.align == "bottom"}
                                      value="bottom"
                                      className="RadioInput"
                                      onChange={(e) =>
                                        changePostionText(e.target.value)
                                      }
                                    />
                                    <label
                                      htmlFor="bottom"
                                      className="RadioLabel"
                                    >
                                      <i class="fa-solid fa-arrow-down"></i>
                                    </label>
                                    <input
                                      type="radio"
                                      name="bottom-right"
                                      id="bottom-right"
                                      checked={
                                        posAlignText.align == "bottom-right"
                                      }
                                      value="bottom-right"
                                      className="RadioInput"
                                      onChange={(e) =>
                                        changePostionText(e.target.value)
                                      }
                                    />
                                    <label
                                      htmlFor="bottom-right"
                                      className="RadioLabel"
                                    >
                                      <i class="fa-solid fa-down-right"></i>
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : null}
                  {description.length > 0 ? (
                    <div class="setting models">
                      <div class="accordion" id="accordionDesc">
                        <div class="accordion-item">
                          <h2 class="accordion-header" id="headingTwo">
                            <button
                              className="accordion-button collapsed text-center"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#Description"
                              aria-expanded="false"
                              aria-controls="titreTab"
                            >
                              Description
                            </button>
                          </h2>
                          <div
                            id="Description"
                            class="accordion-collapse collapse"
                            aria-labelledby="headingTwo"
                            data-bs-parent="#accordionDesc"
                          >
                            <div class="accordion-body">
                              <TextStylingComponent
                                key={"formedescription"}
                                for={"formedescription"}
                                editor={props.editor}
                                siteId={props.siteId}
                                config={configDesc}
                                setConfig={changeSubOngletConfigDesc}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : null}
                  <div className="firstdivplus">
                    <span id="scrollspyHeading3" className="titre  mt-4 mb-4">
                      Animation
                    </span>
                    <div className="d-flex  justify-content-md-center align-items-center mb-3">
                      <div className="panelContnet">
                        <div className="btnanimations forme_animation">
                          {animation.map((ani, i) => (
                            <button
                              key={i}
                              type="button"
                              id={
                                selectedanimation == ani.name
                                  ? "active"
                                  : "test"
                              }
                              className={
                                hoveredButton === i
                                  ? `${ani.name} btn btn-light`
                                  : "btn btn-light"
                              }
                              value={ani.value}
                              onClick={(e) => setSelectedanimation(ani.name)}
                              onMouseEnter={() => handleMouseEnter(i)}
                              onMouseLeave={handleMouseLeave}
                            >
                              {ani.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="firstdivplus">
                    <span id="scrollspyHeading4" className="titre  mt-4 mb-4">
                      Espacement forme
                    </span>
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
            </div>
          </div>
          <div className={showStylesList ? "d-block models-list" : "d-none"}>
            <div class="mb-3">
              <div className="text-end">
                <button
                  type="button"
                  onClick={handleCloseStylesList}
                  class="btn-close"
                  aria-label="Close"
                ></button>
              </div>
              <span className="title-popups">Sélectionner la mise en page</span>
              <div className="models">
                <div className="justify-content-around align-items-center flex-wrap gap-3 mt-3 text-center">
                  <div
                    className={
                      selectedItem == "star"
                        ? "list_forme active"
                        : "list_forme"
                    }
                    onClick={(e) => {
                      setSelectedItem("star");
                      // selectMiseEnforme("simple");
                    }}
                  >
                    <img src={star} className="img ms-3 me-3 rounded-0" />
                  </div>
                  <div
                    className={
                      selectedItem == "modelforme"
                        ? "list_forme active"
                        : "list_forme"
                    }
                    onClick={(e) => {
                      setSelectedItem("modelforme");
                      // selectMiseEnforme("forme_image");
                    }}
                  >
                    <img src={modelforme} className="img ms-3 me-3 rounded-0" />
                  </div>
                </div>
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
                      Url 
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
            </div>
          </div>
          <div className={showUploadMedia ? "d-block models-list" : "d-none"}>
            <div className="text-end">
              <button
                type="button"
                onClick={(e) => setShowUploadMedia(false)}
                class="btn-close"
                aria-label="Close"
              ></button>
            </div>

            <div class="mb-3">
              <span className="d-block text-bold mb-3 text-center mt-3">
                Bibliotheque d'images ( {media ? media.length : 0} )
              </span>
              {media && media.length > 0 ? (
                <div className="d-flex justify-content-around align-align-items-center flex-wrap biblio_image">
                  {media.map((file) => {
                    return (
                      <div
                        className="position-relative gallery-item mb-3"
                        key={file._id}
                        style={{ background: `url(${file.src}?v=${uuidv4()})` }}
                        onClick={(e) => setUrlimage(file.src)}
                      >
                        <i
                          class="fal fa-trash-alt"
                          onClick={(e) => DeleteImg(file)}
                        ></i>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="">Aucune image disponible</p>
              )}
            </div>
            <label className="file-upload">
              <input
                type="file"
                name="files[]"
                onChange={(e) => UploadMedia(e.target.files)}
                multiple
              />
              <span>
                <i class="fa-solid fa-plus"></i> Télécharger
              </span>
            </label>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
