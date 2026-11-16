import React, { useEffect, useState } from "react";
// import * as ReactDOM from "react-dom";
import { SketchPicker } from "react-color";
import "./Btnglobal.css";
import { useDispatch, useSelector } from "react-redux";
import {
  updateIndependanteStyle,
  
} from "../../../../redux/features/site";
import { useParams } from "react-router-dom";
import axios from "axios";
import Ombre from "../../ombre/ombre";
import Border from "../../../border/border";
import Espacement from "../../../Espacement/Espacement";
import Btntext from "./btnText/Btntext";
function Btnglobal(props) {
  let { siteId } = useParams();
  const dispatch = useDispatch();
  const storeSite = useSelector((state) => state.site.value);
  const saveSyle = async () => {
    await axios
      .post(process.env.REACT_APP_API_URL + "/sites/styleglobal/" + siteId, {
        styleglobal: {
          btn: storeSite.site.styleglobal.btn,
          "btn:hover": storeSite.site.styleglobal["btn:hover"],
          "btn:mobile": storeSite.site.styleglobal["btn:mobile"],
        },
      })
      .then((response) => {
        let head = props.editor().Canvas.getDocument().head;

        props.editor().Canvas.getDocument().head.replaceWith(head);
        const previewText = document.querySelectorAll(".preview");

        var styleCss = document.createElement("style");

        let sbtn = "";
        Object.keys(storeSite.site.styleglobal.btn).forEach(function (
          key,
          index
        ) {
          sbtn += key + ":" + storeSite.site.styleglobal.btn[key] + ";";
        });
        var cssBtn = "button.preview{" + sbtn + "}";
        styleCss.appendChild(document.createTextNode(cssBtn));

        let s = "";
        Object.keys(storeSite.site.styleglobal["btn:hover"]).forEach(function (
          key,
          index
        ) {
          s += key + ":" + storeSite.site.styleglobal["btn:hover"][key] + ";";
        });
        var cssHover = "button.preview:hover{" + s + "}";
        styleCss.appendChild(document.createTextNode(cssHover));
        Object.keys(previewText).map((key) => {
          if (previewText[key].querySelector("style") != null) {
            previewText[key].querySelector("style").remove();
          }
          previewText[key].appendChild(styleCss);
        });
      })
      .catch((error) => {
        // console.log(error);
      });
  };
  useEffect(() => {
    saveSyle();
  }, [storeSite]);
  const rgbtoJson = (rgbString) => {
    var s = rgbString;
    s = s.replace("rgb(", "");
    s = s.replace(")", "");
    let c = s.split(",");
    return { r: c[0], g: c[1], b: c[2], a: c[3] };
  };
  const [blockPickerColor, setBlockPickerColor] = useState({
    rgbTxt: storeSite.site.styleglobal.btn.background,
    rgb: rgbtoJson(storeSite.site.styleglobal.btn.background),
  });
  const [blockPickerColor2, setBlockPickerColor2] = useState({
    rgbTxt: storeSite.site.styleglobal["btn:hover"].background,
    rgb: rgbtoJson(storeSite.site.styleglobal["btn:hover"].background),
  });
  const [isActivePalette, setActivepalette] = useState(false);
  const [isActivePalette2, setActivepalette2] = useState(false);
  const [isOmbre, setisOmbre] = useState(false);

  const getEditor = () => {
    return props.editor();
  };
  const handleClose = () => {
    setActivepalette(false);
    setActivepalette2(false);
  };
  const getPrimaryColor = () => {
    if (isActivePalette === true) {
      setActivepalette(false);
    } else {
      setActivepalette(true);
    }
  };
  const getPrimaryColor2 = () => {
    if (isActivePalette2 === true) {
      setActivepalette2(false);
    } else {
      setActivepalette2(true);
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
    dispatch(
      updateIndependanteStyle({
        btn: {
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
        },
      })
    );
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
    dispatch(
      updateIndependanteStyle({
        ["btn:hover"]: {
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
        },
      })
    );
  };
  const changeForm = (type) => {
    switch (type) {
      case "square":
        dispatch(
          updateIndependanteStyle({
            btn: {
              "border-radius": "0px",
            },
          })
        );
        break;
      case "rounded":
        dispatch(
          updateIndependanteStyle({
            btn: {
              "border-radius": "7px",
            },
          })
        );
        break;
      case "pill":
        dispatch(
          updateIndependanteStyle({
            btn: {
              "border-radius": "50px",
            },
          })
        );
        break;
      default:
        break;
    }
  };

  return (
    <div id="btnGL" className="ps-3 pe-3 pt-3">
      <nav>
        <div className="nav nav-tabs" id="nav-tab" role="tablist">
          <button
            className="nav-link active"
            id="nav-format-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-format"
            type="button"
            role="tab"
            aria-controls="nav-format"
            aria-selected="true"
          >
            Format
          </button>
          <button
            className="nav-link"
            id="nav-text-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-text"
            type="button"
            role="tab"
            aria-controls="nav-text"
            aria-selected="false"
          >
            Texte
          </button>
        </div>
      </nav>
      <div className="tab-content" id="nav-tabContent">
        <div
          className="tab-pane fade show active"
          id="nav-format"
          role="tabpanel"
          aria-labelledby="nav-format-tab"
        >
          <div className="previewTitle mb-5 mt-3">Aperçu</div>
          <div className="preview-block">
            <button className="btn preview">Bouton</button>

            <div className="btn-group dropend">
              <i
                className="dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              ></i>
              <ul className="dropdown-menu preview-options">
                <li className="mb-3">
                  <button
                    className="btn border pt-2 pb-2 ps-5 pe-5 ms-3 me-3 rounded-0"
                    onClick={(e) => {
                      changeForm("square");
                    }}
                  >
                    Bouton
                  </button>
                </li>
                <li className="mb-3">
                  <button
                    className="btn border pt-2 pb-2 ps-5 pe-5 ms-3 me-3 rounded-3"
                    onClick={(e) => {
                      changeForm("rounded");
                    }}
                  >
                    Bouton
                  </button>
                </li>
                <li>
                  <button
                    className="btn border pt-2 pb-2 ps-5 pe-5 ms-3 me-3 rounded-pill"
                    onClick={(e) => {
                      changeForm("pill");
                    }}
                  >
                    Bouton
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="btn_manager ">
            <div className="d-flex justify-content-between align-items-center mb-3 ">
              <div className="panelTitle">Couleur du fond </div>
              <div className="inputColor  ms-1 me-5">
                <div className="colorPreview" onClick={getPrimaryColor}>
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
                      onClick={(e) => handleClose()}
                    />
                    <SketchPicker
                      color={blockPickerColor.rgb}
                      onChangeComplete={(color) => changeColor(color)}
                    />
                  </div>
                ) : null}
              </div>
            </div>

            <Ombre
              title={"Gestion d'ombre"}
              element={"btn"}
              editor={getEditor}
              style={storeSite}
            />

            <Border element={"btn"} editor={getEditor} />

            <hr className="mt-4" />
            <div className="d-flex justify-content-between align-items-center mb-3 mt-4">
              <div className="panelTitle">Couleur du survol </div>
              <div className="inputColor  ms-1 me-5">
                <div
                  className="colorPreview"
                  onClick={(e) => getPrimaryColor2()}
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
                      onClick={(e) => handleClose()}
                    />
                    <SketchPicker
                      color={blockPickerColor2.rgb}
                      onChangeComplete={(color) => changeColor2(color)}
                    />
                  </div>
                ) : null}
              </div>
            </div>
            <Ombre
              title={"Gestion d'ombre au survol"}
              element={"btn:hover"}
              editor={getEditor}
            />
            <Border element={"btn:hover"} editor={getEditor} />
            <Espacement element={"btn"} />
          </div>
        </div>
        <div
          className="tab-pane fade"
          id="nav-text"
          role="tabpanel"
          aria-labelledby="nav-text-tab"
        >
          <div className="previewTitle mb-5 mt-3">Aperçu</div>
          <div className="preview-block">
            <button className="btn preview">Boutton</button>
          </div>

          <div className="btn_manager ">
            <Btntext element={"btn"} editor={getEditor} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Btnglobal;
