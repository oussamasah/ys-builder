import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./BorderColonne.css";
import { useDispatch, useSelector } from "react-redux";
import { setStyleElement } from "../../../../redux/features/editor";
import { useParams } from "react-router-dom";
import { SketchPicker } from "react-color";
import axios from "axios";
export default function BorderColonne(props) {
  let { siteId, pageId } = useParams();
  const dispatch = useDispatch();

  const storeStyle = useSelector((state) => state.editor.value);
  useEffect(() => {}, [storeStyle]);
  const [type, setType] = useState("all");

  const [size, setSize] = useState({
    all: "0px",
    top: "0px",
    left: "0px",
    right: "0px",
    bottom: "0px",
  });
  const [borderstyle, setBorderStyle] = useState({
    all: "solid",
    top: "solid",
    left: "solid",
    right: "solid",
    bottom: "solid",
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
      rgbTxt: "",
      rgb: {
        r: 51,
        g: 51,
        b: 51,
        a: 1,
      },
    },
    top: {
      rgbTxt: "",
      rgb: {
        r: 51,
        g: 51,
        b: 51,
        a: 1,
      },
    },
    bottom: {
      rgbTxt: "",
      rgb: {
        r: 51,
        g: 51,
        b: 51,
        a: 1,
      },
    },
    left: {
      rgbTxt: "",
      rgb: {
        r: 51,
        g: 51,
        b: 51,
        a: 1,
      },
    },
    right: {
      rgbTxt: "",
      rgb: {
        r: 51,
        g: 51,
        b: 51,
        a: 1,
      },
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
  const changeType = (value) => {
    setType(value);
    switch (value) {
      case "all":
        dispatch(
          setStyleElement({
            div: {
              "border-top-width": size.all,
              "border-right-width": size.all,
              "border-left-width": size.all,
              "border-bottom-width": size.all,
              "border-top-style": borderstyle.all,
              "border-left-style": borderstyle.all,
              "border-right-style": borderstyle.all,
              "border-bottom-style": borderstyle.all,
              "border-top-color": blockPickerColor.all.rgbTxt,
              "border-left-color": blockPickerColor.all.rgbTxt,
              "border-right-color": blockPickerColor.all.rgbTxt,
              "border-bottom-color": blockPickerColor.all.rgbTxt,
            },
          })
        );

        break;
      case "top":
        dispatch(
          setStyleElement({
            div: {
              "border-top-width": size.top,
              "border-top-style": borderstyle.top,
              "border-top-color": blockPickerColor.top.rgbTxt,
            },
          })
        );

        break;
      case "bottom":
        dispatch(
          setStyleElement({
            div: {
              "border-bottom-width": size.bottom,
              "border-bottom-style": borderstyle.bottom,
              "border-bottom-color": blockPickerColor.bottom.rgbTxt,
            },
          })
        );
      case "left":
        dispatch(
          setStyleElement({
            div: {
              "border-left-width": size.left,
              "border-left-style": borderstyle.left,
              "border-left-color": blockPickerColor.left.rgbTxt,
            },
          })
        );
        break;
      case "right":
        dispatch(
          setStyleElement({
            div: {
              "border-right-width": size.right,
              "border-right-style": borderstyle.right,
              "border-right-color": blockPickerColor.right.rgbTxt,
            },
          })
        );
        break;
      default:
        break;
    }
  };
  const chnangeSize = (sizeValue) => {
    let el = props.element;
    sizeValue = sizeValue == 0 ? "" : sizeValue + "px";

    switch (type) {
      case "all":
        setSize({ ...size, all: sizeValue });
        dispatch(
          setStyleElement({
            div: {
              "border-top-width": sizeValue,
              "border-right-width": sizeValue,
              "border-left-width": sizeValue,
              "border-bottom-width": sizeValue,
              "border-top-style": borderstyle.all,
              "border-right-style": borderstyle.all,
              "border-left-style": borderstyle.all,
              "border-bottom-style": borderstyle.all,
            },
          })
        );

        break;
      case "top":
        setSize({ ...size, top: sizeValue });
        dispatch(
          setStyleElement({
            div: {
              "border-top-width": sizeValue,
            },
          })
        );
        break;
      case "left":
        setSize({ ...size, left: sizeValue });

        dispatch(
          setStyleElement({
            div: {
              "border-left-width": sizeValue,
            },
          })
        );
        break;
      case "right":
        setSize({ ...size, right: sizeValue });
        dispatch(
          setStyleElement({
            div: {
              "border-right-width": sizeValue,
            },
          })
        );
        break;
      case "bottom":
        setSize({ ...size, bottom: sizeValue });
        dispatch(
          setStyleElement({
            div: {
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
          setStyleElement({
            div: {
              "border-top-style": styleValue,
              "border-left-style": styleValue,
              "border-right-style": styleValue,
              "border-bottom-style": styleValue,
            },
          })
        );
        break;
      case "top":
        setBorderStyle({ ...borderstyle, top: styleValue });

        dispatch(
          setStyleElement({
            div: {
              "border-top-style": styleValue,
            },
          })
        );
        break;
      case "left":
        setBorderStyle({ ...borderstyle, left: styleValue });

        dispatch(
          setStyleElement({
            div: {
              "border-left-style": styleValue,
            },
          })
        );
        break;
      case "right":
        setBorderStyle({ ...borderstyle, right: styleValue });

        dispatch(
          setStyleElement({
            div: {
              "border-right-style": styleValue,
            },
          })
        );
        break;
      case "bottom":
        setBorderStyle({ ...borderstyle, bottom: styleValue });

        dispatch(
          setStyleElement({
            div: {
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
          setStyleElement({
            div: {
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
          setStyleElement({
            div: {
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
          setStyleElement({
            div: {
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
          setStyleElement({
            div: {
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
          setStyleElement({
            div: {
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
  useEffect(() => {
    const cmp = props.editor().getSelected();
    const style = cmp.getStyle();

    setSize({
      all:
        typeof style["border-top-width"] !== "undefined"
          ? style["border-top-width"]
          : "0px",
      top:
        typeof style["border-top-width"] !== "undefined"
          ? style["border-top-width"]
          : "0px",
      left:
        typeof style["border-left-width"] !== "undefined"
          ? style["border-left-width"]
          : "0px",
      right:
        typeof style["border-right-width"] !== "undefined"
          ? style["border-right-width"]
          : "0px",
      bottom:
        typeof style["border-bottom-width"] !== "undefined"
          ? style["border-bottom-width"]
          : "0px",
    });
    setBorderStyle({
      all:
        typeof style["border-top-style"] !== "undefined"
          ? style["border-top-style"]
          : "solid",
      top:
        typeof style["border-top-style"] !== "undefined"
          ? style["border-top-style"]
          : "solid",
      left:
        typeof style["border-left-style"] !== "undefined"
          ? style["border-left-style"]
          : "solid",
      right:
        typeof style["border-right-style"] !== "undefined"
          ? style["border-right-style"]
          : "solid",
      bottom:
        typeof style["border-bottom-style"] !== "undefined"
          ? style["border-bottom-style"]
          : "solid",
    });
    let clrall =
      typeof style["border-top-color"] !== "undefined"
        ? style["border-top-color"].substring(
            style["border-top-color"].indexOf("rgb"),
            style["border-top-color"].indexOf(")") + 1
          )
        : "";
    let clrtop =
      typeof style["border-top-color"] !== "undefined"
        ? style["border-top-color"].substring(
            style["border-top-color"].indexOf("rgb"),
            style["border-top-color"].indexOf(")") + 1
          )
        : "";
    let clrbottom =
      typeof style["border-bottom-color"] !== "undefined"
        ? style["border-bottom-color"].substring(
            style["border-bottom-color"].indexOf("rgb"),
            style["border-bottom-color"].indexOf(")") + 1
          )
        : "";
    let clrleft =
      typeof style["border-left-color"] !== "undefined"
        ? style["border-left-color"].substring(
            style["border-left-color"].indexOf("rgb"),
            style["border-left-color"].indexOf(")") + 1
          )
        : "";
    let clrright =
      typeof style["border-right-color"] !== "undefined"
        ? style["border-right-color"].substring(
            style["border-right-color"].indexOf("rgb"),
            style["border-right-color"].indexOf(")") + 1
          )
        : "";

    setBlockPickerColor({
      all: { rgbTxt: clrall, rgb: rgbtoJson(clrall) },
      top: { rgbTxt: clrtop, rgb: rgbtoJson(clrtop) },
      bottom: { rgbTxt: clrbottom, rgb: rgbtoJson(clrbottom) },
      left: { rgbTxt: clrleft, rgb: rgbtoJson(clrleft) },
      right: { rgbTxt: clrright, rgb: rgbtoJson(clrright) },
    });
  }, [props.editor()]);
  return (
    <div id="BorderColone">
      <div className="d-flex justify-content-start align-items-center mt-4 mb-3">
        <div className="d-flex typeBorder">
          <input
            type="radio"
            name={"typeborder-"}
            id={"all-"}
            checked={type == "all" ? "checked" : false}
            onChange={(e) => changeType(e.target.value)}
            value="all"
            className="RadioInput"
          />
          <label htmlFor={"all-"} className="RadioLabel me-1">
            <div className="btntype alltype">
              <i className="fal fa-border-outer"></i>
            </div>
          </label>

          <label
            htmlFor={"top-"}
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
            name={"typeborder-"}
            id={"top-"}
            checked={type == "top" ? "checked" : false}
            onChange={(e) => changeType(e.target.value)}
            value="top"
            className="RadioInput"
          />
          <label htmlFor={"top-"} className="RadioLabel me-1">
            <div className="btntype seperatetype">
              <i className="fal fa-border-top"></i>
            </div>
          </label>
          <input
            type="radio"
            name={"typeborder-"}
            id={"bottom-"}
            checked={type == "bottom" ? "checked" : false}
            onChange={(e) => changeType(e.target.value)}
            value="bottom"
            className="RadioInput"
          />
          <label htmlFor={"bottom-"} className="RadioLabel me-1">
            <div className="btntype seperatetype">
              <i className="fal fa-border-bottom"></i>
            </div>
          </label>
          <input
            type="radio"
            name={"typeborder-"}
            id={"left-"}
            checked={type == "left" ? "checked" : false}
            onChange={(e) => changeType(e.target.value)}
            value="left"
            className="RadioInput"
          />
          <label htmlFor={"left-"} className="RadioLabel me-1">
            <div className="btntype seperatetype">
              <i className="fal fa-border-left"></i>
            </div>
          </label>
          <input
            type="radio"
            name={"typeborder-"}
            id={"right-"}
            checked={type == "right" ? "checked" : false}
            onChange={(e) => changeType(e.target.value)}
            value="right"
            className="RadioInput"
          />
          <label htmlFor={"right-"} className="RadioLabel me-1">
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
            name={"range-"}
            id={"range-"}
            className="rangeInput me-2"
            value={size[type] == "" ? 0 : size[type].replace("px", "")}
            onChange={(e) => chnangeSize(e.target.value)}
          />
          <div className="input-with-label-pixel">
            <span className="pixel-label">px</span>
            <input
              min="0"
              max="10"
              id={"range-"}
              name={"range-"}
              className="form-control form-control-sm input-small-pixel"
              type="number"
              value={size[type] == "" ? 0 : size[type].replace("px", "")}
              onChange={(e) => chnangeSize(e.target.value)}
            />
          </div>
        </div>
        <div className="borderType">
          <select
            defaultValue={type == "all" ? borderstyle.all : borderstyle[type]}
            id={"style"}
            name={"style"}
            className="form-select form-select-sm borderSelect"
            aria-label="Default select example"
            onChange={(e) => chnangeStyle(e.target.value)}
          >
            <option value="solid" checked={borderstyle[type] == "solid"}>
              ______________
            </option>
            <option value="dashed" checked={borderstyle[type] == "dashed"}>
              ---------------
            </option>
            <option value="dotted" checked={borderstyle[type] == "dotted"}>
              ............................
            </option>
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
