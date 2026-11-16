import React, { useEffect, useState } from "react";
// import ReactDOM from "react-dom";
import "./border.css";
import { useDispatch, useSelector } from "react-redux";
import {
  updateIndependanteStyle,
  updateStyle,
} from "../../redux/features/site";
import { useParams } from "react-router-dom";
import { SketchPicker } from "react-color";
// import axios from "axios";
export default function Border(props) {
  // let { siteId, pageId } = useParams();
  const dispatch = useDispatch();
  const storeSite = useSelector((state) => state.site.value);
  useEffect(() => {}, [storeSite]);
  const [type, setType] = useState("all");

  const [size, setSize] = useState({
    all: storeSite.site.styleglobal[props.element]["border-width"],
    top: storeSite.site.styleglobal[props.element]["border-top-width"],
    left: storeSite.site.styleglobal[props.element]["border-left-width"],
    right: storeSite.site.styleglobal[props.element]["border-right-width"],
    bottom: storeSite.site.styleglobal[props.element]["border-bottom-width"],
  });
  const [borderstyle, setBorderStyle] = useState({
    all: storeSite.site.styleglobal[props.element]["border-style"],
    top: storeSite.site.styleglobal[props.element]["border-top-style"],
    left: storeSite.site.styleglobal[props.element]["border-left-style"],
    right: storeSite.site.styleglobal[props.element]["border-right-style"],
    bottom: storeSite.site.styleglobal[props.element]["border-bottom-style"],
  });

  const [isActivePalette, setActivepalette] = useState(false);

  const rgbtoJson = (rgbString) => {
    var s = rgbString;
    s = s.replace("rgb(", "");
    s = s.replace(")", "");
    let c = s.split(",");
    return { r: c[0], g: c[1], b: c[2], a: c[3] };
  };
  const [blockPickerColor, setBlockPickerColor] = useState({
    all: {
      rgbTxt: storeSite.site.styleglobal[props.element]["border-color"],
      rgb: rgbtoJson(storeSite.site.styleglobal[props.element]["border-color"]),
    },
    top: {
      rgbTxt: storeSite.site.styleglobal[props.element]["border-top-color"],
      rgb: rgbtoJson(
        storeSite.site.styleglobal[props.element]["border-top-color"]
      ),
    },
    bottom: {
      rgbTxt: storeSite.site.styleglobal[props.element]["border-bottom-color"],
      rgb: rgbtoJson(
        storeSite.site.styleglobal[props.element]["border-bottom-color"]
      ),
    },
    left: {
      rgbTxt: storeSite.site.styleglobal[props.element]["border-left-color"],
      rgb: rgbtoJson(
        storeSite.site.styleglobal[props.element]["border-left-color"]
      ),
    },
    right: {
      rgbTxt: storeSite.site.styleglobal[props.element]["border-right-color"],
      rgb: rgbtoJson(
        storeSite.site.styleglobal[props.element]["border-right-color"]
      ),
    },
  });

  const getPrimaryColor = () => {
    if (isActivePalette === true) {
      setActivepalette(false);
    } else {
      setActivepalette(true);
    }
  };
  const handleClose = () => {
    setActivepalette(false);
  };
  const chnangeSize = (sizeValue) => {
    let el = props.element;
    sizeValue = sizeValue + "px";

    switch (type) {
      case "all":
        setSize({ ...size, all: sizeValue });
        dispatch(
          updateIndependanteStyle({
            [el]: {
              "border-width": sizeValue,
              "border-top-width": "",
              "border-left-width": "",
              "border-right-width": "",
              "border-bottom-width": "",
            },
          })
        );
        break;
      case "top":
        setSize({ ...size, top: sizeValue });
        dispatch(
          updateIndependanteStyle({
            [el]: {
              "border-top-width": sizeValue,
            },
          })
        );
        break;
      case "left":
        setSize({ ...size, left: sizeValue });

        dispatch(
          updateIndependanteStyle({
            [el]: {
              "border-left-width": sizeValue,
            },
          })
        );
        break;
      case "right":
        setSize({ ...size, right: sizeValue });
        dispatch(
          updateIndependanteStyle({
            [el]: {
              "border-right-width": sizeValue,
            },
          })
        );
        break;
      case "bottom":
        setSize({ ...size, bottom: sizeValue });
        dispatch(
          updateIndependanteStyle({
            [el]: {
              "border-bottom-width": sizeValue,
            },
          })
        );
        break;
      default:
        break;
    }
  };
  const chnangeStyle = (styleValue) => {
    let el = props.element;
    switch (type) {
      case "all":
        setBorderStyle({ ...borderstyle, all: styleValue });

        dispatch(
          updateIndependanteStyle({
            [el]: {
              "border-style": styleValue,
              "border-top-style": "",
              "border-left-style": "",
              "border-right-style": "",
              "border-bottom-style": "",
            },
          })
        );
        break;
      case "top":
        setBorderStyle({ ...borderstyle, top: styleValue });

        dispatch(
          updateIndependanteStyle({
            [el]: {
              "border-top-style": styleValue,
            },
          })
        );
        break;
      case "left":
        setBorderStyle({ ...borderstyle, left: styleValue });

        dispatch(
          updateIndependanteStyle({
            [el]: {
              "border-left-style": styleValue,
            },
          })
        );
        break;
      case "right":
        setBorderStyle({ ...borderstyle, right: styleValue });

        dispatch(
          updateIndependanteStyle({
            [el]: {
              "border-right-style": styleValue,
            },
          })
        );
        break;
      case "bottom":
        setBorderStyle({ ...borderstyle, bottom: styleValue });

        dispatch(
          updateIndependanteStyle({
            [el]: {
              "border-bottom-style": styleValue,
            },
          })
        );
        break;
      default:
        break;
    }
  };
  const changeColor = (color) => {
    let el = props.element;
    switch (type) {
      case "all":
        setBlockPickerColor({
          ...blockPickerColor,
          all: {
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
          },
        });

        dispatch(
          updateIndependanteStyle({
            [el]: {
              "border-color":
                "rgb(" +
                color.rgb.r +
                ", " +
                color.rgb.g +
                ", " +
                color.rgb.b +
                "," +
                color.rgb.a +
                ")",
              "border-top-color": "",
              "border-left-color": "",
              "border-right-color": "",
              "border-bottom-color": "",
            },
          })
        );
        break;
      case "bottom":
        setBlockPickerColor({
          ...blockPickerColor,
          bottom: {
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
          },
        });

        dispatch(
          updateIndependanteStyle({
            [el]: {
              "border-bottom-color":
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
        break;
      case "top":
        setBlockPickerColor({
          ...blockPickerColor,
          top: {
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
          },
        });

        dispatch(
          updateIndependanteStyle({
            [el]: {
              "border-top-color":
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
        break;
      case "left":
        setBlockPickerColor({
          ...blockPickerColor,
          left: {
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
          },
        });

        dispatch(
          updateIndependanteStyle({
            [el]: {
              "border-left-color":
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
        break;
      case "right":
        setBlockPickerColor({
          ...blockPickerColor,
          right: {
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
          },
        });

        dispatch(
          updateIndependanteStyle({
            [el]: {
              "border-right-color":
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
        break;

      default:
        break;
    }
  };

  return (
    <div id="border">
      <div className="d-flex justify-content-start align-items-center mt-4 mb-3">
        <div className="d-flex typeBorder">
          <input
            type="radio"
            name={"typeborder-" + props.element}
            id={"all-" + props.element}
            checked={type == "all" ? "checked" : false}
            onChange={(e) => setType(e.target.value)}
            value="all"
            className="RadioInput"
          />
          <label htmlFor={"all-" + props.element} className="RadioLabel me-1">
            <div className="btntype alltype">
              <i className="fal fa-border-outer"></i>
            </div>
          </label>

          <label
            htmlFor={"top-" + props.element}
            className={
              type == "all" ? "RadioLabel me-1" : "RadioLabel me-1 active"
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
            type != "all"
              ? "d-flex align-items-center  ms-2 typeBorder"
              : "d-none"
          }
        >
          <input
            type="radio"
            name={"typeborder-" + props.element}
            id={"top-" + props.element}
            checked={type == "top" ? "checked" : false}
            onChange={(e) => setType(e.target.value)}
            value="top"
            className="RadioInput"
          />
          <label htmlFor={"top-" + props.element} className="RadioLabel me-1">
            <div className="btntype seperatetype">
              <i className="fal fa-border-top"></i>
            </div>
          </label>
          <input
            type="radio"
            name={"typeborder-" + props.element}
            id={"bottom-" + props.element}
            checked={type == "bottom" ? "checked" : false}
            onChange={(e) => setType(e.target.value)}
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
            checked={type == "left" ? "checked" : false}
            onChange={(e) => setType(e.target.value)}
            value="left"
            className="RadioInput"
          />
          <label htmlFor={"left-" + props.element} className="RadioLabel me-1">
            <div className="btntype seperatetype">
              <i className="fal fa-border-left"></i>
            </div>
          </label>
          <input
            type="radio"
            name={"typeborder-" + props.element}
            id={"right-" + props.element}
            checked={type == "right" ? "checked" : false}
            onChange={(e) => setType(e.target.value)}
            value="right"
            className="RadioInput"
          />
          <label htmlFor={"right-" + props.element} className="RadioLabel me-1">
            <div className="btntype seperatetype">
              <i className="fal fa-border-right"></i>
            </div>
          </label>
          <div className="blockTitle ms-2">
            {type == "top"
              ? "Supérieur"
              : type == "bottom"
              ? "Inférieur"
              : type == "left"
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
            value={size[type] == "" ? 0 : size[type].replace("px", "")}
            onChange={(e) => chnangeSize(e.target.value)}
          />
          <div className="input-with-label-pixel">
            <span className="pixel-label">px</span>
            <input
              min="0"
              max="10"
              id={"range-" + props.element}
              name={"range-" + props.element}
              className="form-control form-control-sm input-small-pixel"
              type="number"
              value={size[type] == "" ? 0 : size[type].replace("px", "")}
              onChange={(e) => chnangeSize(e.target.value)}
            />
          </div>
        </div>
        <div className="borderType">
          <select
            defaultValue={
              type == "all"
                ? storeSite.site.styleglobal[props.element]["border-style"]
                : storeSite.site.styleglobal[props.element][
                    "border-" + type + "-style"
                  ]
            }
            id={"style-" + props.element}
            name={"style-" + props.element}
            className="form-select form-select-sm borderSelect"
            aria-label="Default select example"
            onChange={(e) => chnangeStyle(e.target.value)}
          >
            <option value="solid">______________</option>
            <option value="dashed">---------------</option>
            <option value="dotted">............................</option>
          </select>
        </div>
        <div className="inputColor  ms-1 me-5">
          <div className="colorPreview" onClick={getPrimaryColor}>
            <span
              className="color-value"
              style={{
                background: blockPickerColor[type].rgbTxt,
              }}
            ></span>
          </div>

          {isActivePalette ? (
            <div className="sketch-popeover">
              <div className="sketch-cover" onClick={(e) => handleClose()} />
              <SketchPicker
                color={
                  type == "all"
                    ? blockPickerColor.all.rgb
                    : blockPickerColor[type].rgb
                }
                onChangeComplete={(color) => changeColor(color)}
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
