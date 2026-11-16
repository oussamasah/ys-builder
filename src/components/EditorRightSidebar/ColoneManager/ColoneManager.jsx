import React, { useEffect, useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import iconClose from "../../../assets/imgEditorSidebar/iconClose.png";
import expand from "../../../assets/imgEditorBlocks/grid1.svg";
import "./ColoneManager.css";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import { SketchPicker } from "react-color";
import { useDispatch, useSelector } from "react-redux";

import Border from "../../border/border";
import {
  setStyleElement,
  removeStyle,
  removeCustomStyle,
} from "../../../redux/features/editor";
import BorderColonne from "./border/BorderColonne";
import CoinColonne from "./CoinColonne/CoinColonne";
import OmbreColonne from "./OmbreColonne/OmbreColonne";
import EspacementColonne from "./EspacementColonne/EspacementColonne";
import MediaLibrarys from "../../MediaLibrarys/MediaLibrarys";
export default function ColoneManager(props) {
  let { siteId, pageId } = useParams();
  const [show, setShow] = useState(false);
  const [isActivePalette, setActivepalette] = useState(false);
  const [ConfigBg, setConfigBg] = useState({
    position: "center",
    size: "auto",
    repeat: "no-repeat",
  });
  const [BackroundImage, setBackroundImage] = useState(false);
  const [BackroundColor, setBackroundColor] = useState(false);
  const [CustomLargeur, setCustomLarg] = useState(false);
  const [largeur, setLargeur] = useState();
  const dispatch = useDispatch();
  const storeStyle = useSelector((state) => state.editor.value);
  useEffect(() => {
    if (show) {
      props.editor().getSelected().setStyle(storeStyle.div);

      /* if (storeStyle["div:hover"]) {
        let it = storeStyle["div:hover"];
        let hover = "{";
        Object.keys(it).map((key) => {
          hover += key + ":" + it[key] + ";";
        });
        hover += "}";
        const css = props.editor().Css;
        let elId = props.editor().getSelected().getId();
        let sti = `#${elId}:hover${JSON.stringify(
          storeStyle["div:hover"]
        ).replaceAll('"', "")}`;
        console.log("====================>", hover);
        css.addRules(`#${elId}:hover${hover}`);
      }*/
    }
  }, [storeStyle]);
  const [image, setImage] = useState(null);
  const [blockPickerColor, setBlockPickerColor] = useState({});
  const getEditor = () => {
    return props.editor();
  };
  const handleCloseFond = () => {
    setActivepalette(false);
  };
  const rgbtoJson = (rgbString) => {
    var s = rgbString;
    s = s.replace("rgb(", "");
    s = s.replace(")", "");
    let c = s.split(",");
    return { r: c[0], g: c[1], b: c[2], a: c[3] };
  };
  const changeColor = (color) => {
    setImage(null);
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
    dispatch(
      setStyleElement({
        div: {
          "background-color":
            "rgb(" +
            color.rgb.r +
            ", " +
            color.rgb.g +
            ", " +
            color.rgb.b +
            "," +
            color.rgb.a +
            ")",
        },
      })
    );
    dispatch(
      removeCustomStyle({
        div: {
          "background-image": ``,
        },
      })
    );
  };

  const handleClose = () => setShow(false);
  const changeImage = (value) => {
    setImage(process.env.REACT_APP_MEDIA_URL + value);
    dispatch(
      setStyleElement({
        div: {
          "background-image": `url(${process.env.REACT_APP_MEDIA_URL + value})`,
          "background-size": ConfigBg.size,
          "background-position": ConfigBg.position,
          "background-repeat": ConfigBg.repeat,
        },
      })
    );
    dispatch(
      removeCustomStyle({
        div: {
          "background-color": ``,
        },
      })
    );
  };
  const changeLargeur = (value) => {
    setLargeur(value);
    dispatch(
      setStyleElement({
        div: {
          width: value + "%",
        },
      })
    );
  };
  const changeConfigBg = (prop, value) => {
    switch (prop) {
      case "size":
        setConfigBg({ ...ConfigBg, size: value });
        dispatch(
          setStyleElement({
            div: {
              "background-size": value,
            },
          })
        );
        break;
      case "position":
        setConfigBg({ ...ConfigBg, position: value });
        dispatch(
          setStyleElement({
            div: {
              "background-position": value,
            },
          })
        );
        break;
      case "repeat":
        setConfigBg({ ...ConfigBg, repeat: value });
        dispatch(
          setStyleElement({
            div: {
              "background-repeat": value,
            },
          })
        );
        break;

      default:
        break;
    }
  };
  const setCustomLargeur = (value) => {
    setCustomLarg(value);
    if (!value) {
      dispatch(
        removeCustomStyle({
          div: {
            width: value + "%",
          },
        })
      );
    }
  };
  const changeFond = (value, checked) => {
    switch (value) {
      case "image":
        if (checked === true) {
          setBackroundImage(true);
          setBackroundColor(false);
        } else {
          setBackroundImage(false);
        }
        break;
      case "color":
        if (checked === true) {
          setBackroundColor(true);
          setBackroundImage(false);
        } else {
          setBackroundColor(false);
        }
        break;
      default:
        break;
    }
  };
  const getPrimaryColor = () => {
    if (isActivePalette === true) {
      setActivepalette(false);
    } else {
      setActivepalette(true);
    }
  };

  useEffect(() => {
    if (props.editor()) {
      props.editor().on("component:selected", (component) => {
        const domElement = component.getEl();

        if (
          domElement.tagName == "DIV" &&
          domElement.dataset.gjsType != "wrapper"
        ) {
          dispatch(removeStyle({}));
          dispatch(setStyleElement({ div: component.getStyle() }));
          let s = component.getStyle();

          if (
            typeof s["background-color"] !== "undefined" &&
            s["background-color"] !== "initial"
          ) {
            changeFond("color", true);

            setBlockPickerColor({
              rgbTxt: s["background-color"],
              rgb: rgbtoJson(s["background-color"]),
            });
          }
          if (
            typeof s["background-image"] !== "undefined" &&
            s["background-image"] !== "initial"
          ) {

            setImage(
              s["background-image"].substring(
                s["background-image"].indexOf("http"),
                s["background-image"].indexOf("webp") + 4
              )
            );

            let pos;
            if (
              s["background-position-x"] == "center" &&
              s["background-position-y"] == "top"
            ) {
              pos = "top";
            }
            if (
              s["background-position-x"] == "center" &&
              s["background-position-y"] == "bottom"
            ) {
              pos = "bottom";
            }
            if (
              s["background-position-x"] == "left" &&
              s["background-position-y"] == "center"
            ) {
              pos = "left";
            }
            if (
              s["background-position-x"] == "right" &&
              s["background-position-y"] == "center"
            ) {
              pos = "right";
            }
            if (
              s["background-position-x"] == "center" &&
              s["background-position-y"] == "center"
            ) {
              pos = "center";
            }
            if (typeof s["background-position"] !== "undefined") {
              pos = s["background-position"];
            }

            let rep;

            if (
              s["background-repeat-x"] == "repeat" &&
              s["background-repeat-y"] == "repeat"
            ) {
              rep = "repeat";
            }
            if (
              s["background-repeat-x"] == "no-repeat" &&
              s["background-repeat-y"] == "no-repeat"
            ) {
              rep = "no-repeat";
            }
            if (
              s["background-repeat-x"] == "repeat" &&
              s["background-repeat-y"] == "no-repeat"
            ) {
              rep = "repeat-x";
            }
            if (
              s["background-repeat-x"] == "no-repeat" &&
              s["background-repeat-y"] == "repeat"
            ) {
              rep = "repeat-y";
            }

            if (typeof s["background-repeat"] !== "undefined") {
              rep = s["background-repeat"];
            }
            setConfigBg({
              size: s["background-size"],
              position: pos,
              repeat: rep,
            });
            changeFond("image", true);
          }

          if (typeof s["width"] !== "undefined") {
            setCustomLarg(true);
            setLargeur(s["width"].replace("%", ""));
          } else {
            setCustomLarg(false);
            setLargeur(null);
          }
          setShow(true);
        } else {
          setShow(false);
        }
      });
    }
  }, [props.editor()]);
  return (
    <div>
      <Offcanvas
        show={show}
        onHide={handleClose}
        placement={"end"}
        className="offcanvas offcanvas-end "
        id="offcanvasImg"
        aria-labelledby="offcanvasRightLabel"
      >
        <div className="offcanvas-header">
          <div
            className="close"
            onClick={(e) => handleClose()}
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          >
            <img src={iconClose} alt="close" />
          </div>
        </div>
        <div className="offcanvas-body text-light" id="Colone">
          <div className="d-flex justify-content-start align-items-center mb-3">
            <img src={expand} className="d-block imgtitle" />
            <span className="  ms-3 mt-1">Paramétre colonne</span>
          </div>

          <div className="scroll">
            <div className="d-block mt-3">
              <span className="titleAcc">
                Gestion de la largeur de la colonne
              </span>
            </div>
            <div className="d-flex justify-content-between align-items-center mt-3">
              <div>
                <span className="titleAcc">Largeur du bloc fixe</span>
              </div>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={CustomLargeur}
                  onChange={(e) => setCustomLargeur(e.target.checked)}
                />
              </div>
            </div>
            <div
              className={
                CustomLargeur
                  ? "d-flex justify-content-between align-items-center mt-3"
                  : "d-none"
              }
            >
              <div>
                <span className="titleAcc"> Largeur en ( %) </span>
              </div>
              <div className="rangeSize me-2 d-flex align-items-center">
                <input
                  type="range"
                  min="10"
                  max="100"
                  step={5}
                  value={largeur}
                  onChange={(e) => changeLargeur(e.target.value)}
                  className="rangeInput me-2"
                />
                <div className="input-with-label-pixel">
                  <span className="pixel-label"> %</span>
                  <input
                    min="10"
                    max="100"
                    step={5}
                    className="form-control form-control-sm input-small-pixel"
                    type="number"
                    value={largeur}
                    onChange={(e) => changeLargeur(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-between align-items-center mt-3">
              <div>
                <span className="titleAcc">Couleur du fond </span>
              </div>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="color-Checkbox"
                  checked={BackroundColor}
                  onChange={(e) => changeFond("color", e.target.checked)}
                />
              </div>
            </div>
            <div
              className={
                BackroundColor
                  ? "d-flex justify-content-between align-items-center mb-3 mt-3"
                  : "d-none"
              }
            >
              <div className="panelTitle">
                <span className="titleAcc"> Couleur </span>
              </div>
              <div className="inputColor  ms-1 ">
                <div
                  className="colorPreview"
                  onClick={(e) => getPrimaryColor()}
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
                      onClick={(e) => handleCloseFond()}
                    />
                    <SketchPicker
                      color={blockPickerColor.rgb}
                      onChangeComplete={(color) => changeColor(color)}
                    />
                  </div>
                ) : null}
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center mt-3">
              <div>
                <span className="titleAcc">Ajoutez une image </span>
              </div>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="image-Checkbox"
                  checked={BackroundImage}
                  onChange={(e) => changeFond("image", e.target.checked)}
                />
              </div>
            </div>
            <div className={BackroundImage ? "d-block mt-3" : "d-none"}>
              <div className="ModalChabgeImg">
                <div className="ModShowImg pt-3">
                  <img src={image} alt="" className=" img d-block" />
                  <span className="d-block titleimg mt-1">
                    {image != null ? image.replace(/^.*[\\\/]/, "") : ""}
                  </span>
                </div>
                <div className="footerDrop">
                  <MediaLibrarys
                    from={"colonne"}
                    siteId={siteId}
                    changeImage={changeImage}
                  />
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center mt-3">
                <div>
                  <span className="titleAcc">Background size</span>
                </div>
                <select
                  class="form-select w-50"
                  aria-label="Default select example"
                  value={ConfigBg.size}
                  onChange={(e) => changeConfigBg("size", e.target.value)}
                >
                  <option value="auto" selected={ConfigBg.size == "auto"}>
                    Auto
                  </option>
                  <option value="cover" selected={ConfigBg.size == "cover"}>
                    Cover
                  </option>
                  <option value="contain" selected={ConfigBg.size == "contain"}>
                    Contain
                  </option>
                </select>
              </div>
              <div className="d-flex justify-content-between align-items-center mt-3">
                <div>
                  <span className="titleAcc">Background position</span>
                </div>
                <select
                  class="form-select w-50"
                  aria-label="Default select example"
                  value={ConfigBg.position}
                  onChange={(e) => changeConfigBg("position", e.target.value)}
                >
                  <option value="center" selected={ConfigBg.position == "auto"}>
                    Center
                  </option>
                  <option value="top" selected={ConfigBg.position == "top"}>
                    Top
                  </option>
                  <option
                    value="bottom"
                    selected={ConfigBg.position == "bottom"}
                  >
                    Bottom
                  </option>
                  <option value="left" selected={ConfigBg.position == "left"}>
                    Left
                  </option>
                  <option value="right" selected={ConfigBg.position == "right"}>
                    Right
                  </option>
                </select>
              </div>
              <div className="d-flex justify-content-between align-items-center mt-3">
                <div>
                  <span className="titleAcc">Background repeat</span>
                </div>
                <select
                  class="form-select w-50"
                  aria-label="Default select example"
                  value={ConfigBg.repeat}
                  onChange={(e) => changeConfigBg("repeat", e.target.value)}
                >
                  <option
                    value="no-repeat"
                    selected={ConfigBg.repeat == "no-repeat"}
                  >
                    No repeat
                  </option>
                  <option value="repeat" selected={ConfigBg.repeat == "repeat"}>
                    repeat
                  </option>
                  <option
                    value="repeat-x"
                    selected={ConfigBg.repeat == "repeat-x"}
                  >
                    Repeat X
                  </option>
                  <option
                    value="repeat-y"
                    selected={ConfigBg.repeat == "repeat-y"}
                  >
                    Repeat Y
                  </option>
                </select>
              </div>
            </div>
            <BorderColonne editor={getEditor} />
            <CoinColonne editor={getEditor} />
            <OmbreColonne editor={getEditor} />
            <EspacementColonne editor={getEditor} />
            {/*               <div className="d-flex justify-content-between align-items-center mt-3">
                <div>
                  <span className="titleAcc">Ajoutez une vidéo </span>
                </div>
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="video-Checkbox"
                    checked={ColoneParam.BackroundVideo}
                    onChange={(e) => changeFond("video", e.target.checked)}
                  />
                </div>
              </div>
              <div
                className={
                  ColoneParam.BackroundVideo ? "d-block mt-3" : "d-none"
                }
              >
                <div className="mb-3">
                  <span className="titleAcc">url vidéo </span>
                  <input
                    type="url"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                  />
                </div>
              </div> */}
          </div>
        </div>
      </Offcanvas>
    </div>
  );
}
