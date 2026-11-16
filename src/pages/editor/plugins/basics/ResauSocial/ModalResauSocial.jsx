import axios from "axios";
import { fromBlob } from "image-resize-compress";
import React, { useEffect, useState } from "react";
import { Modal, ModalDialog } from "react-bootstrap";
import { Models } from "./ModelJsonSocial";
import Draggable from "react-draggable";
import EspacementConfigSocial from "../../../compoments/Espacement/EspacementConfig";
import TextStylingComponent from "../../../compoments/TextStyling/TextStylingComponent";
import "./ModalResauSocial.css";
import ColorConfig from "../../../compoments/Color/ColorConfig";
import ArrondisConfigAccordion from "../../../compoments/Arrondis/ArrondisConfig";
class DraggableModalDialog extends React.Component {
  render() {
    return (
      <Draggable handle=".handleDrag">
        <ModalDialog {...this.props} />
      </Draggable>
    );
  }
}
export default function ModalResauSocial(props) {
  const [hoveredButton, setHoveredButton] = useState(null);
  const [social, setSocial] = useState([]);
  const [show, setShow] = useState(true);
  const [shownotice, setShownotice] = useState(false);
  const [items, setItems] = useState([]);
  const [configEspacementItem, setConfigEspacementItem] = useState({
    padding: props.editor.getSelected().getAttributes()["data-item-padding"]
      ? JSON.parse(
          props.editor.getSelected().getAttributes()["data-item-padding"]
        )
      : {
          top: "10",
          left: "10",
          right: "10",
          bottom: "10",
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

  const [configRdIcons, setConfigRdIcons] = useState({
    arrondis: props.editor.getSelected().getAttributes()["data-icon-raduis"]
      ? JSON.parse(
          props.editor.getSelected().getAttributes()["data-icon-raduis"]
        )
      : {
          topLeft: "50",
          topRight: "50",
          bottomLeft: "50",
          bottomRight: "50",
        },
  });
  const [posAlignIcon, setPosAligIcon] = useState({
    align: props.editor.getSelected().getAttributes()["data-position-icon"]
      ? props.editor.getSelected().getAttributes()["data-position-icon"]
      : "center",
  });
  const changePostionIcon = (position) => {
    let cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    let device = props.editor.Devices.getSelected().id;

    if (device == "mobile2") {
      let r = props.editor.Css.getRule(`#${attr.id}.social-gjs`, {
        atRuleType: "media",
        atRuleParams: "(max-width:767px)",
      });
      let css = [];
      if (r) css = r.attributes.style;
      css["justify-content"] = position;
      props.editor.Css.setRule(`#${attr.id}.social-gjs`, css, {
        atRuleType: "media",
        atRuleParams: "(max-width:767px)",
      });
    } else {
      let r = props.editor.Css.getRule(`#${attr.id}.social-gjs`);
      let css = [];
      if (r) css = r.attributes.style;
      css["display"] = "flex";
      css["justify-content"] = position;
      props.editor.Css.setRule(`#${attr.id}.social-gjs`, css);
    }

    attr["data-position-icon"] = position;
    cmp.setAttributes(attr);

    setPosAligIcon({ align: position });
    props.editor.setStyle(props.editor.getCss());
  };

  const changeRaduisChamp = (e) => {
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-icon-raduis"] = JSON.stringify(e.arrondis);
    cmp.setAttributes(attr);
    let r = props.editor.Css.getRule(
      `#${attr.id}.social-gjs a svg, #${attr.id}.social-gjs a svg .bgcolor`
    );
    let css = [];
    if (r) css = r.attributes.style;

    css["border-top-left-radius"] = e.arrondis.topLeft + "px";
    css["border-top-right-radius"] = e.arrondis.topRight + "px";
    css["border-bottom-left-radius"] = e.arrondis.bottomLeft + "px";
    css["border-bottom-right-radius"] = e.arrondis.bottomRight + "px";
    props.editor.Css.remove(r);
    props.editor.Css.setRule(
      `#${attr.id}.social-gjs a svg, #${attr.id}.social-gjs a svg .bgcolor`,
      css
    );
    setConfigRdIcons(e);
    props.editor.setStyle(props.editor.getCss());
    cmp.view.render();
  };

  const changeEspacementConfigItem = (e) => {
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-item-padding"] = JSON.stringify(e.padding);
    attr["data-item-margin"] = JSON.stringify(e.margin);

    cmp.setAttributes(attr);
    let r = props.editor.Css.getRule(`#${attr.id}.social-gjs a`);
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
    props.editor.Css.setRule(`#${attr.id}.social-gjs a`, css);
    setConfigEspacementItem(e);
    props.editor.setStyle(props.editor.getCss());
    cmp.view.render();
  };
  const [config, setConfig] = useState({
    espacement: "2",
    animation: "aucun",
  });
  const rgbtoJson = (rgbString) => {
    var s = rgbString;
    s = s.replace("rgb(", "");
    s = s.replace(")", "");
    let c = s.split(",");
    return { r: c[0], g: c[1], b: c[2], a: c[3] };
  };
  const [configBgSocial, setConfigBgSocial] = useState({
    rgbTxt: props.editor.getSelected().getAttributes()["data-social-bg"]
      ? props.editor.getSelected().getAttributes()["data-social-bg"]
      : "#fff",
    rgb: rgbtoJson(
      props.editor.getSelected().getAttributes()["data-social-bg"]
        ? props.editor.getSelected().getAttributes()["data-social-bg"]
        : "#fff"
    ),
  });
  const [configBgSocialplus, setConfigBgSocialplus] = useState({
    rgbTxt: props.editor.getSelected().getAttributes()["data-socialplus-bg"]
      ? props.editor.getSelected().getAttributes()["data-socialplus-bg"]
      : "#fff",
    rgb: rgbtoJson(
      props.editor.getSelected().getAttributes()["data-socialplus-bg"]
        ? props.editor.getSelected().getAttributes()["data-socialplus-bg"]
        : "#fff"
    ),
  });
  const [configBgSocialplush, setConfigBgSocialplush] = useState({
    rgbTxt: props.editor.getSelected().getAttributes()["data-socialplus-bgh"]
      ? props.editor.getSelected().getAttributes()["data-socialplus-bgh"]
      : "#fff",
    rgb: rgbtoJson(
      props.editor.getSelected().getAttributes()["data-socialplus-bgh"]
        ? props.editor.getSelected().getAttributes()["data-socialplus-bgh"]
        : "#fff"
    ),
  });
  const [configColorSocialhover, setConfigColorSocialhover] = useState({
    rgbTxt: props.editor.getSelected().getAttributes()["data-social-colorh"]
      ? props.editor.getSelected().getAttributes()["data-social-colorh"]
      : "#000",
    rgb: rgbtoJson(
      props.editor.getSelected().getAttributes()["data-social-colorh"]
        ? props.editor.getSelected().getAttributes()["data-social-colorh"]
        : "#000"
    ),
  });
  const [configicon, setConfigicon] = useState({
    size: props.editor.getSelected().getAttributes()["data-icon-size"]
      ? JSON.parse(props.editor.getSelected().getAttributes()["data-icon-size"])
      : { desktop: "30", tablet: "16", mobile: "16" },
    color: props.editor.getSelected().getAttributes()["data-icon-color"]
      ? props.editor.getSelected().getAttributes()["data-icon-color"]
      : "#000",
  });
  const changeiconConfig = (e) => {
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-icon-variant"] = e.variant;
    attr["data-icon-size"] = JSON.stringify(e.size);
    attr["data-icon-color"] = e.color;
    attr["data-icon-align"] = e.align;

    cmp.setAttributes(attr);
    let r = props.editor.Css.getRule(
      `#${attr.id}.social-gjs a svg, #${attr.id}.social-gjs a svg .colors`
    );
    let css = [];
    if (r) css = r.attributes.style;

    css["fill"] = e.color;
    // css["font-family"] = e.font;
    //css["text-align"] = e.align;
    //css["font-weight"] = e.variant;
    css["min-width"] = e.size.desktop + "px";
    //css["line-height"] = e.size.desktop + "px";
    props.editor.Css.remove(r);
    props.editor.Css.setRule(
      `#${attr.id}.social-gjs a svg, #${attr.id}.social-gjs a svg .colors`,
      css
    );
    props.editor.Css.setRule(
      `#${attr.id}.social-gjs a svg, #${attr.id}.social-gjs a svg .colors`,
      {
        "min-width": `${e.size.tablet}px`,
      },
      {
        atRuleType: "media",
        atRuleParams: "(min-width: 768px) and (max-width:991px)",
      }
    );
    props.editor.Css.setRule(
      `#${attr.id}.social-gjs a svg, #${attr.id}.social-gjs a svg .colors`,
      {
        "min-width": `${e.size.mobile}px`,
      },
      {
        atRuleType: "media",
        atRuleParams: "(max-width:767px)",
      }
    );
    setConfigicon(e);
  };

  const changeBackgroundSocialplus = (e) => {
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-socialplus-bg"] = e.rgbTxt;

    cmp.setAttributes(attr);
    let r = props.editor.Css.getRule(
      `#${attr.id}.social-gjs a svg .bgcolor, #${attr.id}.social-gjs svg`
    );
    let css = [];
    if (r) css = r.attributes.style;
    css["fill"] = e.rgbTxt;
    css["background"] = e.rgbTxt;

    props.editor.Css.remove(r);
    props.editor.Css.setRule(
      `#${attr.id}.social-gjs a svg .bgcolor, #${attr.id}.social-gjs svg`,
      css
    );
    setConfigBgSocialplus(e);
    props.editor.setStyle(props.editor.getCss());
    cmp.view.render();
  };
  const changeBackgroundSocialplush = (e) => {
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-socialplus-bgh"] = e.rgbTxt;

    cmp.setAttributes(attr);
    let r = props.editor.Css.getRule(
      `#${attr.id}.social-gjs a svg .bgcolor:hover, #${attr.id}.social-gjs svg:hover`
    );
    let css = [];
    if (r) css = r.attributes.style;
    css["fill"] = e.rgbTxt;
    css["background"] = e.rgbTxt;

    props.editor.Css.remove(r);
    props.editor.Css.setRule(
      `#${attr.id}.social-gjs a svg:hover .bgcolor, #${attr.id}.social-gjs svg:hover`,
      css
    );
    setConfigBgSocialplush(e);
    props.editor.setStyle(props.editor.getCss());
    cmp.view.render();
  };
  const changeColorSocialHover = (e) => {
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-social-colorh"] = e.rgbTxt;

    cmp.setAttributes(attr);
    let r = props.editor.Css.getRule(
      `#${attr.id}.social-gjs a svg:hover, #${attr.id}.social-gjs a svg .colors:hover`
    );
    let css = [];
    if (r) css = r.attributes.style;
    css["fill"] = e.rgbTxt;
    props.editor.Css.remove(r);
    props.editor.Css.setRule(
      `#${attr.id}.social-gjs a svg:hover, #${attr.id}.social-gjs a svg .colors:hover`,
      css
    );
    setConfigColorSocialhover(e);
    props.editor.setStyle(props.editor.getCss());
    cmp.view.render();
  };

  const [selected, setSelected] = useState();
  const [selectedItem, setSelectedItem] = useState("");
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
  const formats = (key) => {
    let h = props.editor.getSelected();
    let classList = h.getClasses().filter((x) => x.indexOf("model") == -1);
    classList.push(key);
    h.setClass(classList);
    let attr = h.getAttributes();
    attr["data-model"] = Models[key].thumbnail;
    attr["data-model-key"] = key;
    h.setAttributes(attr);
    handleItemClick(Models[key]);
    let itemss = [...items];

    setItems(itemss);
  };
  const addItem = async (file) => {
    let s = items;
    const x = items.filter((x) => x.name == file.name);
    if (x.length == 0) {
      setItems([...items, file]);
      s.push(file);
    }
  };

  const removeItem = async (file) => {
    let n = items;
    const objWithIdIndex = n.findIndex((x) => x.name == file.name);

    if (objWithIdIndex > -1) {
      delete n[objWithIdIndex];
      var filtered = n.filter(function (el) {
        return el != null;
      });

      setItems(filtered);
    }
  };

  const getSocial = () => {
    let sosials = [];
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    console.log(attr);
    let usedItems = attr["data-items"].split(",");
    let usedItemsconfig = attr["data-config"].split(",");
    axios
      .get(process.env.REACT_APP_API_URL + "/sites/get/" + props.siteId)
      .then((res) => {
        const siteData = res.data.data.site;
        const dataSocial = siteData.social;
        if (dataSocial) {
          sosials = [
            {
              name: "facebook",
              value: "fab fa-facebook-f",
              url: dataSocial.facebook
                ? dataSocial.facebook
                : "www.facebook.com",
            },
            {
              name: "instagram",
              value: "fab fa-instagram",
              url: dataSocial.instagram
                ? dataSocial.instagram
                : "www.instagram.com",
            },
            {
              name: "linkedin",
              value: "fab fa-linkedin-in linkdin",
              url: dataSocial.linkedin ? dataSocial.linkedin : "",
            },
            {
              name: "whatsapp",
              value: "fab fa-whatsapp whatsapp",
              url: dataSocial.whatsapp ? siteData.social.whatsapp : "",
            },
            {
              name: "pinterest",
              value: "fab fa-pinterest pin",
              url: dataSocial.pinterest ? dataSocial.pinterest : "",
            },
            {
              name: "twitter",
              value: "fab fa-twitter tw",
              url: dataSocial.twitter ? dataSocial.twitter : "",
            },
            {
              name: "vimeo",
              value: "fab fa-vimeo-v vi",
              url: dataSocial.vimeo ? dataSocial.vimeo : "",
            },
            {
              name: "snapchat",
              value: "fab fa-snapchat snap",
              url: dataSocial.snapchat ? dataSocial.snapchat : "",
            },
            {
              name: "rss",
              value: "fas fa-rss rss",
              url: dataSocial.rss ? dataSocial.rss : "",
            },
            {
              name: "youtube",
              value: "fab fa-youtube youtube",
              url: dataSocial.youtube ? dataSocial.youtube : "",
            },
          ];
        } else {
          sosials = [
            {
              name: "facebook",
              value: "fab fa-facebook-f",
              url: "www.facebook.com",
            },
            {
              name: "instagram",
              value: "fab fa-instagram",
              url: "www.instagram.com",
            },
            {
              name: "linkedin",
              value: "fab fa-linkedin-in",
              url: "#",
            },
            {
              name: "whatsapp",
              value: "fab fa-whatsapp whatsapp",
              url: "#",
            },
            {
              name: "pinterest",
              value: "fab fa-pinterest pin",
              url: "#",
            },
            {
              name: "twitter",
              value: "fab fa-twitter tw",
              url: "#",
            },
            {
              name: "snapchat",
              value: "fab fa-snapchat snap",
              url: "#",
            },
            {
              name: "rss",
              value: "fas fa-rss rss",
              url: "#",
            },
            {
              name: "youtube",
              value: "fab fa-youtube youtube",
              url: "#",
            },
          ];
        }

        let originalUsedItems = sosials.filter((i) =>
          usedItems.includes(i.name)
        );
        let cmp = props.editor.getSelected().components();
        cmp.forEach((element) => {
          let attr = element.getAttributes();
          attr["href"] = sosials[attr["title"]];
          element.setAttributes(attr);
        });

        setSocial(sosials);
        setItems(originalUsedItems);
        setSelectedItem(
          Models[props.editor.getSelected().getAttributes()["data-model-key"]]
        );

        let conf = {
          espacement: usedItemsconfig[0],
          animation: usedItemsconfig[1],
        };
        setConfig(conf);
      });
  };
  useEffect(() => {
    getSocial();
  }, []);

  useEffect(() => {}, [social]);
  useEffect(() => {}, [selectedItem]);
  useEffect(() => {}, [configEspacementItem]);
  useEffect(() => {}, [configicon]);
  useEffect(() => {
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    let html = ``;

    items.map((item) => {
      html += Models[attr["data-model-key"]].items[item.name];
    });
    cmp.components(html);
    props.editor.setStyle(props.editor.getCss());
    cmp.view.render();
    let names = items.map((x) => {
      return x.name;
    });

    attr["data-items"] = names.toString();
    cmp.setAttributes(attr);
    let childs = props.editor.getSelected().components();

    childs.models.forEach((element) => {
      let s = social.filter((x) => x.name == element.getAttributes().title);

      let attr = element.getAttributes();
      attr["href"] = s[0]?.url;
      element.setAttributes(attr);
    });
    props.editor.setStyle(props.editor.getCss());
    cmp.view.render();
  }, [items]);

  useEffect(() => {
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-config"] = config.espacement + "," + config.animation;

    let listclasses = cmp
      .getClasses()
      .filter((c) => c.indexOf("annimation") == -1);
    listclasses.push("annimation-" + config.animation);

    cmp.setAttributes(attr);
    let cmpSvg = cmp.find("svg");
    let r = props.editor.Css.getRule(
      `#${attr.id}.social-gjs svg, #${attr.id} svg`
    );
    let css = [];
    if (r) css = r.attributes.style;
    css["padding"] = `${config.espacement}px`;
    css["width"] = `${config.espacement * 4}px`;

    props.editor.Css.setRule(
      `#${attr.id}.social-gjs svg, #${attr.id} svg`,
      css
    );
    props.editor.setStyle(props.editor.getCss());
    // const configs = {
    //   size: attr["data-icon-size"]
    //     ? JSON.parse(attr["data-icon-size"])
    //     : { desktop: "16", tablet: "16", mobile: "16" },

    //   color: attr["data-icon-color"] ? attr["data-icon-color"] : "#000000",
    // };
    // setConfigicon(configs);
    // props.editor.Css.setRule(`#${attr.id} svg`, { width: `${config.size}px`});
    cmp.setClass(listclasses);
  }, [config]);
  return (
    <div id="modalgallery">
      <Modal
        dialogAs={DraggableModalDialog}
        show={show}
        onHide={handleClose}
        id="ModalAddSocial"
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
              <span className="title-popups">
                Contenu Icônes des réseaux sociaux
              </span>
              <div className="listReseau">
                <span className="d-block text-bold mt-3 p-3">
                  Choisir vos réseaux ( {social ? social.length : 0} )
                </span>
                <div>
                  <div className="d-flex justify-content-center align-align-items-center flex-wrap biblio_list">
                    {/* {JSON.stringify(social)} */}
                    {social.map((file) => {
                      return (
                        <div
                          className="position-relative gallery-item"
                          key={file.name}
                        >
                          {file.url == "#" || file.url == "" ? (
                            <div className="disabled grids">
                              <i className={file.value}></i>
                            </div>
                          ) : (
                            <div
                              className="grids"
                              onClick={(e) => addItem(file)}
                            >
                              <i className={file.value}></i>
                            </div>
                          )}

                          <i
                            className={
                              selected != null && file.name == selected.name
                                ? "fal fa-check-circle"
                                : "d-none"
                            }
                          ></i>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <span className="d-block text-bold mb-3 p-3">
                    Réseau sociaux sélectionné ( {items ? items.length : 0} )
                  </span>

                  <div className=" gallery_list" id="selecteditem">
                    {items.map((file) => {
                      return (
                        <div className="gallery-item">
                          <div className="position-relative ">
                            <div className="grids ">
                              <i
                                className={file.value}
                                onClick={(e) => setSelected(file)}
                              ></i>
                            </div>

                            <i
                              class="fal fa-trash-alt"
                              onClick={(e) => removeItem(file)}
                            ></i>
                          </div>
                          <input
                            className="form-control"
                            placeholder="https://"
                            type="text"
                            value={file.url}
                          />
                        </div>
                      );
                    })}
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
              <span className="title-popups">
                Design des icônes des réseaux sociaux
              </span>
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
                  <li class="nav-item">
                    <a class="nav-link" href="#scrollspyHeading4">
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
                  <span id="scrollspyHeading1" className="titre mt-4 mb-4 ">
                    Mise en page du <b>({selectedItem.nom})</b>
                  </span>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div className="panelTitle ">Fromat icônes </div>
                    <div className="panelContnet">
                      <div
                        className="btn-group dropend"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <img
                          src={selectedItem?.thumbnail}
                          className="img imgReseau  ms-3 me-3 rounded-0 "
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
                          <div className="list">
                            {Object.keys(Models).map((f, i) => {
                              return (
                                <>
                                  <sup
                                    className={
                                      Models[f].thumbnail ==
                                      selectedItem?.thumbnail
                                        ? "selecterd "
                                        : ""
                                    }
                                  >
                                    <b>{i}</b>
                                  </sup>
                                  <li
                                    className={
                                      Models[f].thumbnail ==
                                      selectedItem?.thumbnail
                                        ? "selecterd mb-1"
                                        : "mb-1"
                                    }
                                    onClick={(e) => formats(f)}
                                  >
                                    <img
                                      src={Models[f].thumbnail}
                                      className="img imgReseau  ms-3 me-3 rounded-0"
                                    />
                                  </li>
                                </>
                              );
                            })}
                          </div>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="scrolly">
                  <div className="firstdivplus">
                    <span id="scrollspyHeading2" className="titre   mb-3">
                      Style
                    </span>

                    <div className="firstdivplus configsSocials">
                      <TextStylingComponent
                        key={"icon"}
                        for={"icon"}
                        editor={props.editor}
                        siteId={props.siteId}
                        config={configicon}
                        setConfig={changeiconConfig}
                      />
                    </div>
                  </div>

                  <div className=" mb-3">
                    <div className="justify-content-between d-flex  m-3">
                      <span>Survol icon</span>
                      <div className="me-2">
                        <ColorConfig
                          key={"colorsocial"}
                          for={"colorsocial"}
                          editor={props.editor}
                          siteId={props.siteId}
                          config={configColorSocialhover}
                          setConfig={changeColorSocialHover}
                        />
                      </div>
                    </div>
                    <div className="justify-content-between d-flex  m-3">
                      <span>Arriére du l'icon</span>
                      <div className="me-2">
                        <ColorConfig
                          key={"bgsocialplus"}
                          for={"bgsocialplus"}
                          editor={props.editor}
                          siteId={props.siteId}
                          config={configBgSocialplus}
                          setConfig={changeBackgroundSocialplus}
                        />
                      </div>
                    </div>

                    <div className="justify-content-between d-flex  m-3">
                      <span>Arriére survol</span>
                      <div className="me-2">
                        <ColorConfig
                          key={"bgsocialplushover"}
                          for={"bgsocialplushover"}
                          editor={props.editor}
                          siteId={props.siteId}
                          config={configBgSocialplush}
                          setConfig={changeBackgroundSocialplush}
                        />
                      </div>
                    </div>

                    <div className="justify-content-between d-flex  m-3 raduiss">
                      <span>Arrondis en px</span>

                      <ArrondisConfigAccordion
                        key={"arrondisicon"}
                        for={"arrondisicon"}
                        editor={props.editor}
                        siteId={props.siteId}
                        config={configRdIcons}
                        setConfig={changeRaduisChamp}
                      />
                    </div>
                  </div>

                  <div className="d-flex justify-content-between align-items-center m-3">
                    <div className="panelTitle  ">
                      Espace interne du l'icône{" "}
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="50"
                      step="1"
                      className="rangeInput me-2"
                      value={config.espacement}
                      onChange={(e) =>
                        setConfig({ ...config, espacement: e.target.value })
                      }
                    />
                    <div className="input-with-label-pixel">
                      <span className="pixel-label"> px</span>
                      <input
                        min="0"
                        max="50"
                        className="form-control form-control-sm input-small-pixel"
                        type="number"
                        value={config.espacement}
                        onChange={(e) =>
                          setConfig({ ...config, espacement: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="justify-content-between d-flex  m-3">
                    <span>Orientation des icons</span>
                    <div className="panelContnet d-flex align-items-center">
                      <div className="radio-btns-group">
                        <input
                          type="radio"
                          name="start"
                          id="start"
                          checked={posAlignIcon.align == "start"}
                          value="start"
                          className="RadioInput"
                          onChange={(e) => changePostionIcon(e.target.value)}
                        />
                        <label htmlFor="start" className="RadioLabel">
                          <i class="fa-solid fa-arrow-left"></i>
                        </label>
                        <input
                          type="radio"
                          name="center"
                          id="center"
                          checked={posAlignIcon.align == "center"}
                          value="center"
                          className="RadioInput"
                          onChange={(e) => changePostionIcon(e.target.value)}
                        />
                        <label htmlFor="center" className="RadioLabel">
                          <i class="fa-solid fa-arrow-up"></i>
                        </label>
                        <input
                          type="radio"
                          name="end"
                          id="end"
                          checked={posAlignIcon.align == "end"}
                          value="end"
                          className="RadioInput"
                          onChange={(e) => changePostionIcon(e.target.value)}
                        />
                        <label htmlFor="end" className="RadioLabel">
                          <i class="fa-solid fa-arrow-right"></i>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="firstdivplus">
                    <span id="scrollspyHeading3" className="titre  mt-4 mb-4">
                      Animation
                    </span>
                    <div className="d-flex  justify-content-md-center align-items-center mb-3">
                      <div className="panelContnet">
                        <div className="btnanimations">
                          {animation.map((ani, i) => (
                            <button
                              key={i}
                              type="button"
                              className={
                                hoveredButton === i
                                  ? `${ani.name} btn btn-light`
                                  : "btn btn-light"
                              }
                              value={ani.value}
                              onClick={(e) =>
                                setConfig({ ...config, animation: ani.name })
                              }
                              onMouseEnter={() => handleMouseEnter(i)}
                              onMouseLeave={handleMouseLeave}
                            >
                              {ani.value}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="firstdivplus">
                    <span id="scrollspyHeading4" className="titre  mt-4 mb-4">
                      Espacement entre les icônes
                    </span>
                    <EspacementConfigSocial
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
            sociaux à votre site est l'un des meilleurs moyens d'atteindre vôtre
            audience et de gagner des visiteurs, tant sur le plan local que sur
            le plan international. Vous pouvez choisir parmi une sélection
            d'icônes des réseaux sociaux existants ou importer vos propres
            icônes personnalisées.<br></br>
            <b>NB :</b> pour change couleur des icons il faut ajouter le modèle
            <u> numéro 5 </u>
          </span>
          <span className="aide">
            Pour ajouter des icônes de réseaux sociaux :
          </span>
          <ul className="listaide">
            <li>
              {" "}
              <span className="liss me-2"> 1 </span>{" "}
              <span>
                Il faut remplir les champs à partir de paramétres général de
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
              <span> Et puis sur social</span>{" "}
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
                Chosir une differents animation (scale,rotation,gauche ddroite){" "}
              </span>{" "}
            </li>
          </ul>
        </Modal.Body>
      </Modal>
    </div>
  );
}
