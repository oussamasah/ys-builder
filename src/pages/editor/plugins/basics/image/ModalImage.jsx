import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { fromBlob } from "image-resize-compress";
import ModalDialog from "react-bootstrap/ModalDialog";
import Draggable from "react-draggable";
import axios from "axios";
import { SketchPicker } from "react-color";
import { toast } from "react-hot-toast";
import "./ModalImage.css";
import { v4 as uuidv4 } from "uuid";
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

export default function ModalImage(props) {
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
  useEffect(() => {}, [configEspacement]);
  const changeEspacementConfig = (e) => {
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-padding"] = JSON.stringify(e.padding);
    attr["data-margin"] = JSON.stringify(e.margin);

    cmp.setAttributes(attr);
    let r = props.editor.Css.getRule(`#${attr.id}`);
    let css = null;
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
    } else {
      props.editor.Css.setRule(`#${attr.id}`, {
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
  const [currentImage, seCurrentImage] = useState();
  const [media, setMedia] = useState([]);
  const [selected, setSelected] = useState(null);

  //alt image
  const [text, setText] = useState(
    props.editor.getSelected().getAttributes()["alt"]
      ? props.editor.getSelected().getAttributes()["alt"]
      : ""
  );
  useEffect(() => {
    let cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr.alt = text;
    cmp.setAttributes(attr);
  }, [text]);

  //lien de l'image
  const [selectedType, setSelectedType] = useState(
    props.editor.getSelected().getAttributes()["data-type-lien"]
      ? props.editor.getSelected().getAttributes()["data-type-lien"]
      : ""
  );
  const [selectedTel, setSelectedTel] = useState("#");
  const [selectedPage, setSelectedPage] = useState("#");
  const [selectedPopup, setSelectedPopup] = useState("#");
  const [selectedUrl, setSelectedUrl] = useState("#");
  const [popups, setPopups] = useState([]);
  const [pages, setPages] = useState([]);

  const changeHrefLink = (selectedType, link) => {
    setSelectedType(selectedType);
    let cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    let rules = props.editor.Css.getRule(`#${attr.id}`);
    let rule = {};
    if (rules) {
      rule = rules.attributes.style;
    }
    attr["data-type-lien"] = selectedType;
    let hrefAttr = [];
    switch (selectedType) {
      case "page":
        attr["data-href"] = link;
        attr["target"] = "_self";
        hrefAttr["href"] = link;
        hrefAttr["target"] = "_self";
        delete attr["data-bs-toggle"];
        delete hrefAttr["data-bs-toggle"];
        setSelectedPage(link);
        break;
      case "popup":
        attr["data-href"] = "#" + link;
        attr["data-target"] = "_self";
        attr["data-bs-toggle"] = "modal";
        hrefAttr["href"] = "#" + link;
        hrefAttr["target"] = "_self";
        hrefAttr["data-bs-toggle"] = "modal";
        setSelectedPopup(link);
        break;
      case "url":
        attr["data-href"] = link;
        attr["data-target"] = "_blank";
        delete attr["data-bs-toggle"];
        hrefAttr["href"] = link;
        hrefAttr["target"] = "_blank";
        delete hrefAttr["data-bs-toggle"];
        setSelectedUrl(link);
        break;
      case "tel":
        attr["data-href"] = "tel:" + link;
        attr["data-target"] = "_self";
        delete attr["data-bs-toggle"];
        hrefAttr["href"] = "tel:" + link;
        hrefAttr["target"] = "_self";
        delete hrefAttr["data-bs-toggle"];
        setSelectedTel(link);
        break;
    }
    cmp.setAttributes(attr);
    let parent = cmp.parent();
    if (parent.getEl().tagName == "A") {
      parent.setAttributes(hrefAttr);
    } else {
      let imgHTML = cmp.toHTML();
      let hrefCmp = cmp.replaceWith(
        `<a data-gjs-draggable=".gjs-cell,.gjs-row div,.container,main,footer,header" data-type-droppabel="true"  href="#" data-gjs-droppable="true" >${imgHTML}</a>`
      );
      hrefCmp.setAttributes(hrefAttr);

      props.editor.Css.setRule(`#${attr.id}`, rule);
      let css = props.editor.getCss();
      props.editor.setStyle(css);
      let img = props.editor.getWrapper().find(`#${attr.id}`);
      if (img) {
        props.editor.select(img);
      }
    }
  };
  const deleteLien = () => {
    let cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    let imgHTML = cmp.toHTML();
    let rules = props.editor.Css.getRule(`#${attr.id}`);
    let rule = {};
    if (rules) {
      rule = rules.attributes.style;
    }
    let parent = cmp.parent();
    if (parent.getEl().tagName == "A") {
      parent.replaceWith(imgHTML);
    }
    props.editor.Css.setRule(`#${attr.id}`, rule);
    let css = props.editor.getCss();
    props.editor.setStyle(css);
    let img = props.editor.getWrapper().find(`#${attr.id}`);
    if (img) {
      props.editor.select(img);
    }
    setSelectedType("");
  };
  useEffect(() => {}, [
    selectedType,
    selectedPage,
    selectedPopup,
    selectedUrl,
    selectedTel,
  ]);

  // end lien de l'image

  // mise en page
  const [style, setStyle] = useState(
    props.editor.getSelected().getAttributes()["data-style-image"]
      ? props.editor.getSelected().getAttributes()["data-style-image"]
      : ""
  );
  const [stylePreview, setStylePreview] = useState(
    props.editor.getSelected().getAttributes()["data-style-image"]
      ? props.editor.getSelected().getAttributes()["data-style-image"]
      : ""
  );
  useEffect(() => {
    let cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-style-image"] = style;
    cmp.setAttributes(attr);

    let rules = props.editor.Css.getRule(`#${attr.id}`);
    let rule = {};
    if (rules) {
      rule = rules.attributes.style;
    }
    if (style == "styleOne" && !attr["data-coins-arrondis"]) {
      // rule["border-radius"] = "50%";
      // props.editor.Css.setRule(`#${attr.id}`, rule);
      cmp.setClass(["img", "rounded-pill"]);
      setStylePreview("border rounded-pill");
    } else if (style == "styleTwo" && !attr["data-coins-arrondis"]) {
      // rule["border-radius"] = "10px";
      // props.editor.Css.setRule(`#${attr.id}`, rule);
      cmp.setClass(["img", "rounded"]);
      setStylePreview("border rounded");
    } else if (style == "styleThree" && !attr["data-coins-arrondis"]) {
      // rule["border-radius"] = "0%";
      // props.editor.Css.setRule(`#${attr.id}`, rule);
      cmp.setClass(["img"]);
      setStylePreview("border");
    }
    let css = props.editor.getCss();
    props.editor.setStyle(css);
  }, [style]);

  //end mise en page

  //bordure
  const [size, setSize] = useState(
    props.editor.getSelected().getAttributes()["data-border-size"]
      ? props.editor.getSelected().getAttributes()["data-border-size"]
      : 0
  );

  const [type, setType] = useState("");
  const [typeBordure, setTypeBordure] = useState(
    props.editor.getSelected().getAttributes()["data-border-type"]
      ? props.editor.getSelected().getAttributes()["data-border-type"]
      : "all"
  );
  const [styleBordure, setStyleBordure] = useState("solid");
  //end bordure

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
  const options = [
    { id: "none", name: "none" },
    { id: "fade-up", name: "Fade up" },
    { id: "fade-down", name: "Fade down" },
    { id: "fade-right", name: "Fade right" },
    { id: "fade-left", name: "Fade left" },
    { id: "fade-up-left", name: "Fade up left" },
    { id: "fade-down-right", name: "Fade down right" },
    { id: "fade-down-left", name: "Fade down left" },
    { id: "flip-left", name: "Flip left" },
    { id: "flip-right", name: "Flip right" },
    { id: "flip-up", name: "Flip up" },
    { id: "flip-down", name: "Flip down" },
    { id: "zoom-in", name: "Zoom in" },
    { id: "zoom-in-up", name: "Zoom in up" },
    { id: "zoom-in-down", name: "Zoom in down" },
    { id: "zoom-in-left", name: "Zoom in left" },
    { id: "zoom-in-tight", name: "Zoom in right" },
    { id: "zoom-out", name: "Zoom out" },
    { id: "zoom-out-up", name: "Zoom out up" },
    { id: "zoom-out-down", name: "Zoom out down" },
    { id: "zoom-out-left", name: "Zoom out left" },
  ];

  const [selectedanimation, setSelectedanimation] = useState(
    props.editor.getSelected().getAttributes()["data-aos"]
      ? props.editor.getSelected().getAttributes()["data-aos"]
      : ""
  );
  const [shadow, setShadow] = useState({
    type: props.editor.getSelected().getAttributes()["data-ombre-type"]
      ? props.editor.getSelected().getAttributes()["data-ombre-type"]
      : "",
    size: props.editor.getSelected().getAttributes()["data-ombre-size"]
      ? props.editor.getSelected().getAttributes()["data-ombre-size"]
      : "0",
  });
  const [sizeArr, setSizeArr] = useState(
    props.editor.getSelected().getAttributes()["data-coins-arrondis"]
      ? JSON.parse(
          props.editor.getSelected().getAttributes()["data-coins-arrondis"]
        )
      : { all: 0, topLeft: 0, topRight: 0, bottomLeft: 0, bottomRight: 0 }
  );

  const changeStyleArr = (sizeValue, typeChanged) => {
    let cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    if (typeChanged != "all") {
      setTypeArr("indiv");
    } else {
      setTypeArr(typeChanged);
    }
    let rules = props.editor.Css.getRule(`#${attr.id}`);
    let rule = {};
    if (rules) {
      rule = rules.attributes.style;
    }

    setSizeArr({ ...sizeArr, all: sizeValue });
    switch (typeChanged) {
      case "all":
        setSizeArr({ ...sizeArr, all: sizeValue });

        rule["border-radius"] = sizeValue + "%!important";

        break;
      case "top-left":
        setSizeArr({ ...sizeArr, topLeft: sizeValue });
        rule["border-top-left-radius"] = sizeValue + "%!important";
        rule["border-top-right-radius"] = sizeArr.topRight + "%!important";
        rule["border-bottom-left-radius"] = sizeArr.bottomLeft + "%!important";
        rule["border-bottom-right-radius"] =
          sizeArr.bottomRight + "%!important";
        break;
      case "top-right":
        setSizeArr({ ...sizeArr, topRight: sizeValue });
        rule["border-top-left-radius"] = sizeArr.topLeft + "%!important";
        rule["border-top-right-radius"] = sizeValue + "%!important";
        rule["border-bottom-left-radius"] = sizeArr.bottomLeft + "%!important";
        rule["border-bottom-right-radius"] =
          sizeArr.bottomRight + "%!important";
        break;
      case "bottom-left":
        setSizeArr({ ...sizeArr, bottomLeft: sizeValue });

        rule["border-top-left-radius"] = sizeArr.topLeft + "%!important";
        rule["border-top-right-radius"] = sizeArr.topRight + "%!important";
        rule["border-bottom-left-radius"] = sizeValue + "%!important";
        rule["border-bottom-right-radius"] =
          sizeArr.bottomRight + "%!important";
        break;
      case "bottom-right":
        setSizeArr({ ...sizeArr, bottomRight: sizeValue });

        rule["border-top-left-radius"] = sizeArr.topLeft + "%!important";
        rule["border-top-right-radius"] = sizeArr.topRight + "%!important";
        rule["border-bottom-left-radius"] = sizeArr.bottomLeft + "%!important";
        rule["border-bottom-right-radius"] = sizeValue + "%!important";
        break;
      default:
        break;
    }
    props.editor.Css.setRule(`#${attr.id}`, rule);
    let css = props.editor.getCss();
    props.editor.setStyle(css);

    attr["data-coins-arrondis"] = JSON.stringify(sizeArr);
    attr["data-type-arrondis"] = typeArr;
    cmp.setAttributes(attr);
  };

  const getPrimaryColor = () => {
    if (isActivePalette === true) {
      setActivepalette(false);
    } else {
      setActivepalette(true);
    }
  };
  const handleCloseColor = () => {
    setActivepalette(false);
  };
  const [isActivePalette, setActivepalette] = useState(false);

  const [typeArr, setTypeArr] = useState(
    props.editor.getSelected().getAttributes()["data-type-arrondis"]
      ? props.editor.getSelected().getAttributes()["data-type-arrondis"]
      : 0
  );

  const [isActive, setIsActive] = useState(
    props.editor.getSelected().getAttributes()["data-ombre"]
      ? props.editor.getSelected().getAttributes()["data-ombre"]
      : "false"
  );
  const [isActiveWidth, setIsActiveWidth] = useState(
    props.editor.getSelected().getAttributes()["data-width"]
      ? props.editor.getSelected().getAttributes()["data-width"]
      : "true"
  );
  const [imageWidth, setImageWidth] = useState(
    props.editor.getSelected().getAttributes()["data-image-width"]
      ? JSON.parse(
          props.editor.getSelected().getAttributes()["data-image-width"]
        )
      : {
          desktop: "200px",
          tablet: "200px",
          mobile: "200px",
        }
  );

  const [showStylesList, setShowStylesList] = useState(false);
  const [showUploadMedia, setShowUploadMedia] = useState(false);
  const [ShowTypeLien, setShowTypeLien] = useState(false);

  const [show, setShow] = useState(true);

  const rgbtoJson = (rgbString) => {
    var s = rgbString;
    s = s.replace("rgb(", "");
    s = s.replace(")", "");
    let c = s.split(",");
    return { r: c[0], g: c[1], b: c[2], a: c[3] };
  };

  const [blockPickerColor, setBlockPickerColor] = useState({
    rgbTxt: props.editor.getSelected().getAttributes()["data-border-color"]
      ? props.editor.getSelected().getAttributes()["data-border-color"]
      : "#000",
    rgb: rgbtoJson(
      props.editor.getSelected().getAttributes()["data-border-color"]
        ? props.editor.getSelected().getAttributes()["data-border-color"]
        : "#000"
    ),
  });
  const [isActivePalette2, setActivepalette2] = useState(false);
  const [blockPickerColor2, setBlockPickerColor2] = useState({
    rgbTxt: props.editor.getSelected().getAttributes()["data-ombre-color"]
      ? props.editor.getSelected().getAttributes()["data-ombre-color"]
      : "#000",
    rgb: rgbtoJson(
      props.editor.getSelected().getAttributes()["data-ombre-color"]
        ? props.editor.getSelected().getAttributes()["data-ombre-color"]
        : "#000"
    ),
  });
  const getPrimaryColor2 = () => {
    if (isActivePalette2 === true) {
      setActivepalette2(false);
    } else {
      setActivepalette2(true);
    }
  };
  const deleteArrondis = () => {
    let cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    delete attr["data-coins-arrondis"];
    delete attr["data-type-arrondis"];
    setSizeArr({
      all: 0,
      topLeft: 0,
      topRight: 0,
      bottomLeft: 0,
      bottomRight: 0,
    });
    setTypeArr("all");
    let rules = props.editor.Css.getRule(`#${attr.id}`);
    let rule = {};
    if (rules) {
      rule = rules.attributes.style;
    }
    delete rule["border-radius"];
    delete rule["border-top-left-radius"];
    delete rule["border-top-right-radius"];
    delete rule["border-bottom-left-radius"];
    delete rule["border-bottom-right-radius"];
    props.editor.Css.setRule(`#${attr.id}`, rule);
    let css = props.editor.getCss();
    props.editor.setStyle(css);
    cmp.setAttributes(attr);
  };
  const handleCloseColor2 = () => {
    setActivepalette2(false);
  };
  const [posAlignimg, setPosAlignBtn] = useState({
    align:
      props.editor.Devices.getSelected().id == "mobile2"
        ? props.editor.getSelected().getAttributes()["data-position-img-mobile"]
          ? props.editor.getSelected().getAttributes()[
              "data-position-img-mobile"
            ]
          : "left"
        : props.editor.getSelected().getAttributes()["data-position-img"]
        ? props.editor.getSelected().getAttributes()["data-position-img"]
        : "left",
  });
  const changePostionImg = (position) => {
    console.log(position);
    let cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    let device = props.editor.Devices.getSelected().id;

    if (device == "mobile2") {
      attr["data-position-img-mobile"] = position;
      let r = props.editor.Css.getRule(`#${attr.id}`, {
        atRuleType: "media",
        atRuleParams: "(max-width:767px)",
      });
      let css = [];
      if (r) css = r.attributes.style;
      if (position == "none") {
        css["margin-left"] = "auto!important";
        css["margin-right"] = "auto!important";
        css["float"] = position;
      } else {
        css["float"] = position;
      }

      props.editor.Css.remove(r);
      props.editor.Css.setRule(`#${attr.id}`, css, {
        atRuleType: "media",
        atRuleParams: "(max-width:767px)",
      });
    } else {
      attr["data-position-img"] = position;
      let r = props.editor.Css.getRule(`#${attr.id}`);
      let css = [];
      if (r) css = r.attributes.style;
      if (position == "none") {
        css["margin-left"] = "auto!important";
        css["margin-right"] = "auto!important";
        css["float"] = position;
        css["display"] = "block";
      } else {
        css["float"] = position;
      }
      props.editor.Css.remove(r);
      props.editor.Css.setRule(`#${attr.id}`, css);
    }
    cmp.setAttributes(attr);
    setPosAlignBtn({ align: position });
  };
  useEffect(() => {
    let cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-width"] = `${isActiveWidth}`;
    attr["data-image-width"] = JSON.stringify(imageWidth);
    let rules = props.editor.Css.getRule(`#${attr.id}`);
    let r_tablet = props.editor.Css.getRule(`#${attr.id}`, {
      atRuleType: "media",
      atRuleParams: "(min-width: 768px) and (max-width: 991px)",
    });
    let cssTablet = {};
    if (r_tablet) cssTablet = r_tablet.attributes.style;
    props.editor.Css.remove(r_tablet);
    props.editor.Css.remove(`#${attr.id}`, {
      atRuleType: "media",
      atRuleParams: "(min-width:768px) and (max-width:991px)",
    });

    let r_Mobile = props.editor.Css.getRule(`#${attr.id}`, {
      atRuleType: "media",
      atRuleParams: "(max-width: 767px)",
    });
    let cssMobile = {};
    if (r_Mobile) cssMobile = r_Mobile.attributes.style;
    props.editor.Css.remove(r_Mobile);
    props.editor.Css.remove(`#${attr.id}`, {
      atRuleType: "media",
      atRuleParams: "(max-width:767px)",
    });


    let rule = {};
    if (rules) {
      rule = rules.attributes.style;
    }
    if (isActiveWidth == "true") {
      rule["width"] = "100%";
      props.editor.Css.setRule(
        `#${attr.id}`,
        {
          width: `100%`,
        },
        {
          atRuleType: "media",
          atRuleParams: "(max-width:767px)",
        }
      );
      props.editor.Css.setRule(
        `#${attr.id}`,
        {
          width: `100%`,
        },
        {
          atRuleType: "media",
          atRuleParams: "(min-width: 768px) and (max-width:991px)",
        }
      );
      props.editor.Css.setRule(
        `#${attr.id}`,
        {
          width: `100%`,
        },
        {
          atRuleType: "media",
          atRuleParams: "(min-width:992px)",
        }
      );
    } else {
      rule["width"] = imageWidth.desktop;
      cssMobile["width"] = imageWidth.mobile;
      cssTablet["width"] = imageWidth.tablet;
      props.editor.Css.setRule(
        `#${attr.id}`, cssMobile,{
          atRuleType: "media",
          atRuleParams: "(max-width:767px)",
        }
      );
      props.editor.Css.setRule(
        `#${attr.id}`, cssTablet, {
          atRuleType: "media",
          atRuleParams: "(min-width:768px) and (max-width:991px)",
        }
      );
      props.editor.Css.setRule(
        `#${attr.id}`,
        rule
      );
    }

    props.editor.Css.setRule(`#${attr.id}`, rule);
    let css = props.editor.getCss();
    props.editor.setStyle(css);
    cmp.setAttributes(attr);
  }, [imageWidth, isActiveWidth]);

  useEffect(() => {
    let cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-border-type"] = typeBordure;
    attr["data-border-size"] = size;
    attr["data-border-style"] = styleBordure;
    attr["data-border-color"] = blockPickerColor.rgbTxt;
    cmp.setAttributes(attr);
    let rules = props.editor.Css.getRule(`#${attr.id}`);
    let rule = {};
    if (rules) {
      rule = rules.attributes.style;
    }

    switch (typeBordure) {
      case "all":
        rule["border"] =
          size + "px" + " " + styleBordure + " " + blockPickerColor.rgbTxt;
        props.editor.Css.setRule(`#${attr.id}`, rule);
        break;
      case "top":
        rule["border-top"] =
          size + "px" + " " + styleBordure + " " + blockPickerColor.rgbTxt;
        props.editor.Css.setRule(`#${attr.id}`, rule);
        break;
      case "bottom":
        rule["border-bottom"] =
          size + "px" + " " + styleBordure + " " + blockPickerColor.rgbTxt;
        props.editor.Css.setRule(`#${attr.id}`, rule);
        break;
      case "left":
        rule["border-left"] =
          size + "px" + " " + styleBordure + " " + blockPickerColor.rgbTxt;
        props.editor.Css.setRule(`#${attr.id}`, rule);
        break;
      case "right":
        rule["border-right"] =
          size + "px" + " " + styleBordure + " " + blockPickerColor.rgbTxt;
        props.editor.Css.setRule(`#${attr.id}`, rule);
        break;
      default:
        break;
    }
    let css = props.editor.getCss();
    props.editor.setStyle(css);
  }, [typeBordure, size, styleBordure, blockPickerColor]);

  const handleClose = () => {
    setShow(false);
  };
  const handleCloseStylesList = () => {
    setShowStylesList(false);
  };

  const handleCloseTypeLien = () => {
    setShowTypeLien(false);
  };

  useEffect(() => {
    let cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-ombre"] = `${isActive}`;
    attr["data-ombre-color"] = blockPickerColor2.rgbTxt;
    attr["data-ombre-size"] = shadow.size;
    attr["data-ombre-type"] = shadow.type;

    let rules = props.editor.Css.getRule(`#${attr.id}`);
    let rule = {};
    if (rules) {
      rule = rules.attributes.style;
    }
    if (isActive == "false") {
      rule["box-shadow"] = "none";
      props.editor.Css.setRule(`#${attr.id}`, rule);
    } else {
      rule["box-shadow"] =
        shadow.type +
        " " +
        shadow.size +
        " " +
        shadow.size +
        " " +
        shadow.size +
        " " +
        blockPickerColor2.rgbTxt;
      props.editor.Css.setRule(`#${attr.id}`, rule);
    }
    let css = props.editor.getCss();
    props.editor.setStyle(css);
    cmp.setAttributes(attr);
  }, [isActive, shadow, blockPickerColor2]);

  useEffect(() => {
    let cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-aos"] = selectedanimation;
    cmp.setAttributes(attr);
  }, [selectedanimation]);
  const setImage = (link) => {
    let cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["src"] = link;
    cmp.setAttributes(attr);
    seCurrentImage(link);
  };

  useEffect(() => {
    let cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();

    setBlockPickerColor2({
      rgbTxt: attr["data-ombre-color"],
      rgb: rgbtoJson(attr["data-ombre-color"]),
    });
    setShadow({ size: attr["data-ombre-size"], type: attr["data-ombre-type"] });
    seCurrentImage(attr.src);
    getMedia();
    GetPage();
    switch (attr["data-type-lien"]) {
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

  const changeTypeOm = (value) => {
    setShadow({ ...shadow, type: value });
  };
  const changeTypeArr = (value) => {
    setTypeArr(value);
    let cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-type-arrondis"] = value;
    cmp.setAttributes(attr);
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
  };

  return (
    <>
      <Modal
        dialogAs={DraggableModalDialog}
        show={show}
        backdrop="static"
        onHide={handleClose}
        centered
        id="ModalImage"
      >
        <Modal.Header className="handleDrag">
          <Modal.Title>
            <nav>
              <div class="nav nav-tabs" id="nav-tab" role="tablist">
                <button
                  className="nav-link tt"
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
              <span className="title-popups">Contenu D'image</span>
              <div class="configimage rounded-2" id="contenu">
                <div
                  className="config"
                  style={{ background: `url(${currentImage})` }}
                >
                  <button
                    className="cadreImage"
                    onClick={(e) => setShowUploadMedia(true)}
                  >
                    <i class="fa-solid fa-plus"></i>
                    <span className="textCadre">Choisi un image</span>
                  </button>
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
                <div class="mb-3">
                  <label className="d-block mb-3">Alt  l'image</label>

                  <input
                    type="text"
                    value={text}
                    placeholder="Alt d'image"
                    className="form-control "
                    onChange={(e) => setText(e.target.value)}
                  />
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
              <span className="title-popups">Style D'image</span>
              <div class="setting models rounded-2" id="Button">
                <span className="setting-title">Mise en page</span>
                <div
                  className="justify-content-between align-items-center mb-4 mt-4 setting-title"
                  onClick={(e) => setShowStylesList(true)}
                >
                  <img
                    class="imgTitreWidget"
                    draggable="true"
                    src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIHZpZXdCb3g9IjAgMCAyNCAyNCIgc3R5bGU9ImZpbGw6IHJnYmEoMCwwLDAsMC4xNSk7IHRyYW5zZm9ybTogc2NhbGUoMC43NSkiPgogICAgICAgIDxwYXRoIGQ9Ik04LjUgMTMuNWwyLjUgMyAzLjUtNC41IDQuNSA2SDVtMTYgMVY1YTIgMiAwIDAgMC0yLTJINWMtMS4xIDAtMiAuOS0yIDJ2MTRjMCAxLjEuOSAyIDIgMmgxNGMxLjEgMCAyLS45IDItMnoiPjwvcGF0aD4KICAgICAgPC9zdmc+"
                    className={stylePreview}
                  />
                </div>
                <div>
                  <i class="far fa-phone-laptop"></i>
                  <span>
                    La modification s'applique aux ordinateurs et tablettes
                  </span>
                </div>

                <div class="tab-content mb-3">
                  <div id="widthConfig">
                    <div className=" d-flex justify-content-between align-items-center mb-3 mt-3">
                      <label
                        className="form-check-label"
                        htmlFor="isActiveShadow"
                      >
                        Pleine largeur
                      </label>
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id={"isActiveWidth"}
                          name={"isActiveWidth"}
                          checked={isActiveWidth == "true"}
                          onChange={(e) => {
                            setIsActiveWidth(e.target.checked.toString());
                          }}
                        />
                      </div>
                    </div>

                    <div
                      className={
                        isActiveWidth != "true"
                          ? "d-flex align-items-center  ms-2 typeBorder"
                          : "d-none"
                      }
                    >
                      <div className="titleSize me-3">Largeur</div>
                      <div className="d-flex justify-content-between align-items-center">
                        <i class="fas fa-desktop me-1"></i>
                        <div class="input-with-label-pixel me-2">
                          <input
                            min="10"
                            max="1200"
                            class="form-control form-control-sm input-small-pixel"
                            type="text"
                            value={imageWidth.desktop}
                            onChange={(e) => {
                              setImageWidth((prevImageWidth) => ({
                                ...prevImageWidth, // Spread the previous state
                                ["desktop"]: e.target.value, // Update the specific property based on the device
                              }));
                            }}
                          />
                        </div>
                        <i class="fas fa-tablet me-1"></i>
                        <div class="input-with-label-pixel me-2">
                          <input
                            min="10"
                            max="1200"
                            class="form-control form-control-sm input-small-pixel"
                            type="text"
                            value={imageWidth.tablet}
                            onChange={(e) => {
                              setImageWidth((prevImageWidth) => ({
                                ...prevImageWidth, // Spread the previous state
                                ["tablet"]: e.target.value, // Update the specific property based on the device
                              }));
                            }}
                          />
                        </div>
                        <i class="fas fa-tablet me-1"></i>
                        <div class="input-with-label-pixel me-2">
                          <input
                            min="10"
                            max="1200"
                            class="form-control form-control-sm input-small-pixel"
                            type="text"
                            value={imageWidth.mobile}
                            onChange={(e) => {
                              setImageWidth((prevImageWidth) => ({
                                ...prevImageWidth, // Spread the previous state
                                ["mobile"]: e.target.value, // Update the specific property based on the device
                              }));
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <div id="border">
                        <div className="d-flex justify-content-between align-items-center mt-4 mb-3">
                          <div className="d-flex typeBorder">
                            <input
                              type="radio"
                              name={"typeborder-" + props.element}
                              id={"all-" + props.element}
                              checked={typeBordure == "all" ? "checked" : false}
                              onChange={(e) => setTypeBordure(e.target.value)}
                              value="all"
                              className="RadioInput"
                            />
                            <label
                              htmlFor={"all-" + props.element}
                              className="RadioLabel me-1"
                            >
                              <div className="btntype alltype">
                                <i className="fal fa-border-outer"></i>
                              </div>
                            </label>

                            <label
                              htmlFor={"top-" + props.element}
                              className={
                                typeBordure == "all"
                                  ? "RadioLabel me-1"
                                  : "RadioLabel me-1 active"
                              }
                            >
                              <div className="btntype alltype">
                                <i className="fal fa-border-none"></i>
                              </div>
                            </label>
                          </div>
                          <div className="blockTitle ms-2">Bordure</div>
                          <div
                            className={
                              typeBordure != "all"
                                ? "d-flex align-items-center  ms-2 typeBorder"
                                : "d-none"
                            }
                          >
                            <input
                              type="radio"
                              name={"typeborder-" + props.element}
                              id={"top-" + props.element}
                              checked={typeBordure == "top" ? "checked" : false}
                              onChange={(e) => setTypeBordure(e.target.value)}
                              value="top"
                              className="RadioInput"
                            />
                            <label
                              htmlFor={"top-" + props.element}
                              className="RadioLabel me-1"
                            >
                              <div className="btntype seperatetype">
                                <i className="fal fa-border-top"></i>
                              </div>
                            </label>
                            <input
                              type="radio"
                              name={"typeborder-" + props.element}
                              id={"bottom-" + props.element}
                              checked={
                                typeBordure == "bottom" ? "checked" : false
                              }
                              onChange={(e) => setTypeBordure(e.target.value)}
                              value="bottom"
                              className="RadioInput"
                            />
                            <label
                              htmlFor={"bottom-" + props.element}
                              className="RadioLabel me-1"
                            >
                              <div className="btntype seperatetype">
                                <i className="fal fa-border-bottom"></i>
                              </div>
                            </label>
                            <input
                              type="radio"
                              name={"typeborder-" + props.element}
                              id={"left-" + props.element}
                              checked={
                                typeBordure == "left" ? "checked" : false
                              }
                              onChange={(e) => setTypeBordure(e.target.value)}
                              value="left"
                              className="RadioInput"
                            />
                            <label
                              htmlFor={"left-" + props.element}
                              className="RadioLabel me-1"
                            >
                              <div className="btntype seperatetype">
                                <i className="fal fa-border-left"></i>
                              </div>
                            </label>
                            <input
                              type="radio"
                              name={"typeborder-" + props.element}
                              id={"right-" + props.element}
                              checked={
                                typeBordure == "right" ? "checked" : false
                              }
                              onChange={(e) => setTypeBordure(e.target.value)}
                              value="right"
                              className="RadioInput"
                            />
                            <label
                              htmlFor={"right-" + props.element}
                              className="RadioLabel me-1"
                            >
                              <div className="btntype seperatetype">
                                <i className="fal fa-border-right"></i>
                              </div>
                            </label>
                            <div className="blockTitle ms-2">
                              {type == "top"
                                ? "Supérieur"
                                : typeBordure == "bottom"
                                ? "Inférieur"
                                : typeBordure == "left"
                                ? "Gauche"
                                : "Droit"}
                            </div>
                          </div>
                        </div>

                        <div className="bordersize d-flex align-items-center">
                          <div className="rangeSize me-2 d-flex align-items-center">
                            <input
                              type="range"
                              min="0"
                              max="10"
                              step="1"
                              name={"range-" + props.element}
                              id={"range-" + props.element}
                              className="rangeInput me-2"
                              value={size}
                              onChange={(e) => setSize(e.target.value)}
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
                                value={size}
                                onChange={(e) => setSize(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="borderType">
                            <select
                              defaultValue={type == "all"}
                              id={"style-" + props.element}
                              name={"style-" + props.element}
                              className="form-select form-select-sm borderSelect"
                              aria-label="Default select example"
                              onChange={(e) => setStyleBordure(e.target.value)}
                            >
                              <option value="solid">______________</option>
                              <option value="dashed">---------------</option>
                              <option value="dotted">
                                ............................
                              </option>
                            </select>
                          </div>
                          <div className="inputColor  ms-1">
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
                    <div id="coins">
                      <div className="d-flex justify-content-between align-items-center mt-4 mb-3">
                        <div className="d-flex typeBorder">
                          <input
                            type="radio"
                            name={"typeborder"}
                            id={"all"}
                            checked={typeArr == "all" ? "checked" : false}
                            onChange={(e) => changeTypeArr(e.target.value)}
                            value="all"
                            className="RadioInput"
                          />
                          <label htmlFor={"all"} className="RadioLabel me-1">
                            <div className="btntype alltype">
                              <i className="fal fa-border-outer"></i>
                            </div>
                          </label>
                          <input
                            type="radio"
                            name={"typeborder"}
                            id={"indiv"}
                            checked={typeArr == "indiv" ? "checked" : false}
                            onChange={(e) => changeTypeArr(e.target.value)}
                            value="indiv"
                            className="RadioInput"
                          />
                          <label
                            htmlFor={"indiv"}
                            className={"RadioLabel me-1"}
                          >
                            <div className="btntype alltype">
                              <i className="fal fa-border-none"></i>
                            </div>
                          </label>
                        </div>

                        <div className="blockTitle ms-2 me-2">
                          Coins arrondis
                        </div>
                        <div className="d-flex align-items-center">
                          <input
                            type="number"
                            name={"radius-all"}
                            onChange={(e) =>
                              changeStyleArr(e.target.value, "all")
                            }
                            value={sizeArr.all}
                            min="0"
                            step="1"
                            className={
                              typeArr == "all"
                                ? "radius-input d-block text-center"
                                : "d-none"
                            }
                          />
                        </div>
                        <div className="d-flex align-items-center">
                          <input
                            type="number"
                            name={"radius-top"}
                            min="0"
                            step="1"
                            onChange={(e) =>
                              changeStyleArr(e.target.value, "top-left")
                            }
                            value={sizeArr.topLeft}
                            className={
                              typeArr == "indiv"
                                ? "radius-input d-block"
                                : "d-none"
                            }
                          />
                          <input
                            type="number"
                            name={"radius-bottom"}
                            min="0"
                            step="1"
                            onChange={(e) =>
                              changeStyleArr(e.target.value, "top-right")
                            }
                            value={sizeArr.topRight}
                            className={
                              typeArr == "indiv"
                                ? "radius-input d-block"
                                : "d-none"
                            }
                          />

                          <input
                            type="number"
                            name={"radius-left"}
                            min="0"
                            step="1"
                            onChange={(e) =>
                              changeStyleArr(e.target.value, "bottom-left")
                            }
                            value={sizeArr.bottomLeft}
                            className={
                              typeArr == "indiv"
                                ? "radius-input d-block"
                                : "d-none"
                            }
                          />
                          <input
                            type="number"
                            name={"radius-right"}
                            min="0"
                            step="1"
                            onChange={(e) =>
                              changeStyleArr(e.target.value, "bottom-right")
                            }
                            value={sizeArr.bottomRight}
                            className={
                              typeArr == "indiv"
                                ? "radius-input d-block"
                                : "d-none"
                            }
                          />
                        </div>
                        <div className="d-flex align-items-center">
                          <small
                            className="supplien"
                            onClick={(e) => {
                              deleteArrondis();
                            }}
                          >
                            Supprimer arrondis
                          </small>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <div className="panelTitle m-2">
                        Orientation du L'image
                      </div>
                      <div className="panelContnet d-flex align-items-center">
                        <div className="radio-btns-group">
                          <input
                            type="radio"
                            name="start"
                            id="start"
                            checked={posAlignimg.align == "left"}
                            value="left"
                            className="RadioInput"
                            onChange={(e) => changePostionImg(e.target.value)}
                          />
                          <label htmlFor="start" className="RadioLabel">
                            <i class="fa-solid fa-arrow-left"></i>
                          </label>
                          <input
                            type="radio"
                            name="center"
                            id="center"
                            checked={posAlignimg.align == "none"}
                            value="none"
                            className="RadioInput"
                            onChange={(e) => changePostionImg(e.target.value)}
                          />
                          <label htmlFor="center" className="RadioLabel">
                            <i class="fas fa-arrows-alt-h"></i>
                          </label>
                          <input
                            type="radio"
                            name="end"
                            id="end"
                            checked={posAlignimg.align == "right"}
                            value="right"
                            className="RadioInput"
                            onChange={(e) => changePostionImg(e.target.value)}
                          />
                          <label htmlFor="end" className="RadioLabel">
                            <i class="fa-solid fa-arrow-right"></i>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div id="OmbreConfig">
                      <div className=" d-flex justify-content-between align-items-center mb-3 mt-3">
                        <label
                          className="form-check-label"
                          htmlFor="isActiveShadow"
                        >
                          Ombre d'image
                        </label>
                        <div className="form-check form-switch">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id={"isActiveShadow-" + props.element}
                            name={"isActiveShadow-" + props.element}
                            value={isActive}
                            checked={isActive == "true"}
                            onChange={(e) => {
                              setIsActive(e.target.checked.toString());
                            }}
                          />
                        </div>
                      </div>
                      <div
                        className={
                          isActive == "true"
                            ? "d-flex justify-content-between align-items-center mb-3 mt-2"
                            : "d-none"
                        }
                      >
                        <div className="d-flex typeOmbre">
                          <input
                            type="radio"
                            name={"typeombre-" + props.element}
                            id={"external-" + props.element}
                            checked={shadow.type == "" ? "checked" : false}
                            onChange={(e) => changeTypeOm(e.target.value)}
                            value=""
                            className="RadioInput"
                          />
                          <label
                            htmlFor={"external-" + props.element}
                            className="RadioLabel me-1"
                          >
                            <div className="btntype outsettype"></div>
                          </label>
                          <input
                            type="radio"
                            name={"typeombre-" + props.element}
                            id={"internal-" + props.element}
                            checked={shadow.type == "inset" ? "checked" : false}
                            onChange={(e) => changeTypeOm(e.target.value)}
                            value="inset"
                            className="RadioInput"
                          />
                          <label
                            htmlFor={"internal-" + props.element}
                            className="RadioLabel"
                          >
                            <div className="btntype insettype"></div>
                          </label>
                        </div>
                        <div className="shadowsize d-flex align-items-center ms-4">
                          <div className="titleSize me-3">Distance</div>
                          <div className="rangeSize me-2 d-flex align-items-center">
                            <input
                              type="range"
                              min="0"
                              max="10"
                              step="1"
                              className="rangeInput me-2"
                              value={shadow.size.replace("px", "")}
                              onChange={(e) =>
                                setShadow({
                                  ...shadow,
                                  size: e.target.value + "px",
                                })
                              }
                            />
                            <div className="input-with-label-pixel">
                              <span className="pixel-label">px</span>
                              <input
                                min="0"
                                max="10"
                                className="form-control form-control-sm input-small-pixel"
                                type="number"
                                value={shadow.size.replace("px", "")}
                                onChange={(e) =>
                                  setShadow({
                                    ...shadow,
                                    size: e.target.value + "px",
                                  })
                                }
                              />
                            </div>
                          </div>
                        </div>
                        <div className="inputColor  ">
                          <div
                            className="colorPreview"
                            onClick={getPrimaryColor2}
                          >
                            <span
                              className="color-value"
                              style={{
                                background: blockPickerColor2.rgbTxt,
                              }}
                            ></span>
                          </div>

                          {isActivePalette2 ? (
                            <div className="sketch-popeover">
                              <div
                                className="sketch-cover"
                                onClick={(e) => handleCloseColor2()}
                              />
                              <SketchPicker
                                color={blockPickerColor2.rgb}
                                onChangeComplete={(color) =>
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
                                  })
                                }
                              />
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>

                    <div id="widthConfig">
                      <div className=" d-flex justify-content-between align-items-center mb-3 mt-3">
                        <label
                          className="form-check-label"
                          htmlFor="isActiveShadow"
                        >
                          Animation
                        </label>

                        <div className="form-check form-switch">
                          <div className="borderType">
                            <select
                              defaultValue={selectedanimation}
                              id={"style-animation"}
                              name={"style-animation"}
                              className="form-select form-select-sm borderSelect"
                              aria-label="Default select example"
                              onChange={(e) =>
                                setSelectedanimation(e.target.value)
                              }
                            >
                              {options.map((option, index) => (
                                <option key={index} value={option.id}>
                                  {option.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div id="EspacementImg" className="d-block  mt-5">
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
                      Url - {selectedType == "url" ? "checked" : "no"}
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
                  <img
                    class="imgTitreWidget"
                    draggable="true"
                    src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIHZpZXdCb3g9IjAgMCAyNCAyNCIgc3R5bGU9ImZpbGw6IHJnYmEoMCwwLDAsMC4xNSk7IHRyYW5zZm9ybTogc2NhbGUoMC43NSkiPgogICAgICAgIDxwYXRoIGQ9Ik04LjUgMTMuNWwyLjUgMyAzLjUtNC41IDQuNSA2SDVtMTYgMVY1YTIgMiAwIDAgMC0yLTJINWMtMS4xIDAtMiAuOS0yIDJ2MTRjMCAxLjEuOSAyIDIgMmgxNGMxLjEgMCAyLS45IDItMnoiPjwvcGF0aD4KICAgICAgPC9zdmc+"
                    onClick={(e) => setStyle("styleThree")}
                    className={
                      style == "styleThree" ? "border active" : "border"
                    }
                  />
                  <br />
                  <img
                    class="imgTitreWidget"
                    draggable="true"
                    src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIHZpZXdCb3g9IjAgMCAyNCAyNCIgc3R5bGU9ImZpbGw6IHJnYmEoMCwwLDAsMC4xNSk7IHRyYW5zZm9ybTogc2NhbGUoMC43NSkiPgogICAgICAgIDxwYXRoIGQ9Ik04LjUgMTMuNWwyLjUgMyAzLjUtNC41IDQuNSA2SDVtMTYgMVY1YTIgMiAwIDAgMC0yLTJINWMtMS4xIDAtMiAuOS0yIDJ2MTRjMCAxLjEuOSAyIDIgMmgxNGMxLjEgMCAyLS45IDItMnoiPjwvcGF0aD4KICAgICAgPC9zdmc+"
                    onClick={(e) => setStyle("styleTwo")}
                    className={
                      style == "styleTwo"
                        ? "border rounded active"
                        : "border rounded "
                    }
                  />
                  <br />

                  <img
                    class="imgTitreWidget d-block"
                    draggable="true"
                    src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIHZpZXdCb3g9IjAgMCAyNCAyNCIgc3R5bGU9ImZpbGw6IHJnYmEoMCwwLDAsMC4xNSk7IHRyYW5zZm9ybTogc2NhbGUoMC43NSkiPgogICAgICAgIDxwYXRoIGQ9Ik04LjUgMTMuNWwyLjUgMyAzLjUtNC41IDQuNSA2SDVtMTYgMVY1YTIgMiAwIDAgMC0yLTJINWMtMS4xIDAtMiAuOS0yIDJ2MTRjMCAxLjEuOSAyIDIgMmgxNGMxLjEgMCAyLS45IDItMnoiPjwvcGF0aD4KICAgICAgPC9zdmc+"
                    onClick={(e) => setStyle("styleOne")}
                    className={
                      style == "styleOne"
                        ? "border rounded-pill active"
                        : "border rounded-pill "
                    }
                  />
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
                        onClick={(e) => setImage(file.src)}
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
                <p className="text-center">Aucune image disponible</p>
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
    </>
  );
}
