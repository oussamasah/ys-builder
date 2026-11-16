import React from "react";
import { useState } from "react";
import "./shadow.css";
import ReactDOM from "react-dom";
import { SketchPicker } from "react-color";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateStyle } from "../../redux/features/site";
import axios from "axios";
export default function Shadow(props) {
  let { siteId, pageId } = useParams();
  const dispatch = useDispatch();
  const storeSite = useSelector((state) => state.site.value);
  const [isActive, setActive] = useState(false);
  const [isActivePaletteShadow, setActivepaletteShadow] = useState(false);
  const [type, setType] = useState("");
  const [position, setPosition] = useState("0px 0px");
  const [style, setStyle] = useState(storeSite.site.styleglobal[props.element]);
  const [size, setSize] = useState("5");
  const [blockPickerColor, setBlockPickerColor] = useState({
    rgbTxt: "rgb(120, 120, 120,0.55)",
    rgb: {
      r: 120,
      g: 120,
      b: 120,
      a: 0.55,
    },
  });

  const getPrimaryColorShdow = () => {
    var el = document.getElementById("colorpickerOverlayShadow");
    if (isActivePaletteShadow == true) {
      setActivepaletteShadow(false);
      el.classList.remove("active");
    } else {
      setActivepaletteShadow(true);
      el.classList.add("active");
    }
  };

  const closeColorPicker = (e) => {
    e.target.classList.remove("active");
    setActivepaletteShadow(false);
    var overlays = document.getElementsByClassName("colorpickerOverlayShadow");
    var sketchs = document.getElementsByClassName("sketch-picker");

    Object.keys(sketchs).map((key) => {
      var sketchpicker = ReactDOM.findDOMNode(sketchs[key]);
      sketchpicker.classList.remove("active");
    });
    Object.keys(overlays).map((key) => {
      var overlay = ReactDOM.findDOMNode(overlays[key]);
      overlay.classList.remove("active");
    });
  };
  const rgbtoJson = (rgbString) => {
    var s = rgbString;
    s = s.replace("rgb(", "");
    s = s.replace(")", "");
    let c = s.split(",");
    return { r: c[0], g: c[1], b: c[2], a: c[3] };
  };
  const changeShadowColor = (color) => {
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
    setStyle({
      ...style,
      "box-shadow":
        type +
        " " +
        position +
        " " +
        size +
        "px " +
        size +
        "px " +
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
  const changeActiveOmbre = (e) => {
    if (isActive) {
      setActive(false);
      setStyle({
        ...style,
        "box-shadow": "none",
      });
    } else {
      setActive(true);
      setStyle({
        ...style,
        "box-shadow":
          type +
          " " +
          position +
          " " +
          size +
          "px " +
          size +
          "px " +
          blockPickerColor.rgbTxt,
      });
    }
  };
  useEffect(() => {
    let params =
      storeSite.site.styleglobal[props.element]["box-shadow"].split(" ");

    if (params[0] == "none") {
      setActive(false);
    } else {
      setActive(true);
      setType(params[0]);
      setPosition(params[1] + " " + params[2]);
      setSize(params[3].replace("px", ""));
      const color = storeSite.site.styleglobal[props.element][
        "box-shadow"
      ].substring(
        storeSite.site.styleglobal[props.element]["box-shadow"].indexOf("rgb")
      );

      setBlockPickerColor({ rgbTxt: color, rgb: rgbtoJson(color) });
    }
  }, []);
  const saveStyle = async () => {
    dispatch(updateStyle({ btn: style }));

    await axios
      .post(process.env.REACT_APP_API_URL + "/sites/styleglobal/" + siteId, {
        styleglobal: {
          [props.element]: style,
        },
      })
      .then((response) => {
        const previewText = document.getElementById("preview");
        if (props.element.indexOf("hover") == -1) {
          Object.assign(previewText.style, style);
        }
        //props.editor().render();
      })
      .catch((error) => {
       // console.log(error);
      });
  };
  useEffect(() => {
    saveStyle();
  }, [style]);
  useEffect(() => {
    if (isActive === true) {
      setStyle({
        ...style,
        "box-shadow":
          type +
          " " +
          position +
          " " +
          size +
          "px " +
          size +
          "px " +
          blockPickerColor.rgbTxt,
      });
    } else {
      setStyle({
        ...style,
        "box-shadow": "none",
      });
    }
  }, [size, type, position, blockPickerColor]);

  return (
    <div>
      <div className=" d-flex justify-content-between align-items-center mb-3 mt-5">
        <label className="form-check-label" htmlFor="isActiveShadow">
          {props.title}
        </label>
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            id="isActiveShadow"
            value={isActive}
            checked={isActive == true}
            onChange={(e) => {
              changeActiveOmbre(e);
            }}
          />
        </div>
      </div>
      <div
        className={isActive ? "shadowParametres active" : "shadowParametres"}
      >
        <div className=" d-flex align-items-center justify-content-between  mb-3">
          <span className="d-block">Taille d'ombre :</span>

          <div className="d-flex align-items-centertypeShadow">
            <input
              type="range"
              className="d-inline me-2"
              id="shadowSize"
              min="0"
              max="5"
              step="1"
              value={size}
              onChange={(e) => setSize(e.target.value)}
            />
            <label htmlFor="shadowSize">{size + "px"}</label>
          </div>
        </div>

        <div className=" d-flex align-items-center justify-content-between mb-3">
          <span className="d-block">Couleur de l'ombre :</span>
          <div className="inputColor  ">
            <div
              className="colorPreview"
              id="previewsHADOW"
              onClick={(e) => [getPrimaryColorShdow()]}
              style={{
                background: blockPickerColor.rgbTxt,
              }}
            ></div>

            <div className="colorValue">
              <SketchPicker
                id="sketchShadow"
                className={isActivePaletteShadow ? "new active" : "new "}
                color={blockPickerColor.rgb}
                onChange={(color) => changeShadowColor(color)}
              />
            </div>
          </div>
          <div
            className="colorpickerOverlayShadow"
            id="colorpickerOverlayShadow"
            onClick={(e) => {
              closeColorPicker(e);
            }}
          ></div>
        </div>
        <div className=" d-flex align-items-center justify-content-between  mb-3">
          <span className="d-block">Type d'ombre :</span>
          <div className="typeShadow">
            <input
              type="radio"
              className="btn-check typeOmbre"
              name="options"
              id="option1"
              value="inset"
              checked={type == "inset"}
              onChange={(e) => setType(e.target.value)}
            />
            <label className="btn  shadow-type me-2" htmlFor="option1">
              Intérieur
            </label>

            <input
              type="radio"
              className="btn-check typeOmbre"
              name="options"
              id="option2"
              value=""
              checked={type == ""}
              onChange={(e) => setType(e.target.value)}
            />
            <label className="btn shadow-type" htmlFor="option2">
              Exterieur
            </label>
          </div>
        </div>

        <div className=" d-flex align-items-center justify-content-between">
          <span className="d-block">Position :</span>
          <div className="positinShadow">
            <div className="d-flex">
              <div className="leftButtonsShadow">
                <div
                  className={
                    position == "-5px -5px"
                      ? "directionBtn TopLeftShadow active"
                      : "directionBtn TopLeftShadow"
                  }
                  onClick={(e) => setPosition("-5px -5px")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-arrow-up-left"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2 2.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1H3.707l10.147 10.146a.5.5 0 0 1-.708.708L3 3.707V8.5a.5.5 0 0 1-1 0v-6z"
                    />
                  </svg>
                </div>
                <div
                  className={
                    position == "-5px 0px"
                      ? "directionBtn CenterLeftShadow active"
                      : "directionBtn CenterLeftShadow"
                  }
                  onClick={(e) => setPosition("-5px 0px")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-arrow-left"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                    />
                  </svg>
                </div>
                <div
                  className={
                    position == "-5px 5px"
                      ? "directionBtn BottomLeftShadow active"
                      : "directionBtn BottomLeftShadow"
                  }
                  onClick={(e) => setPosition("-5px 5px")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-arrow-down-left"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2 13.5a.5.5 0 0 0 .5.5h6a.5.5 0 0 0 0-1H3.707L13.854 2.854a.5.5 0 0 0-.708-.708L3 12.293V7.5a.5.5 0 0 0-1 0v6z"
                    />
                  </svg>
                </div>
              </div>
              <div className="CenterButtonsShadow">
                <div
                  className={
                    position == "0px -5px"
                      ? "directionBtn CenterTopShadow active"
                      : "directionBtn CenterTopShadow"
                  }
                  onClick={(e) => setPosition("0px -5px")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-arrow-up"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"
                    />
                  </svg>
                </div>
                <div
                  className={
                    position == "0px 0px"
                      ? "directionBtn CenterCenterShadow active"
                      : "directionBtn CenterCenterShadow"
                  }
                  onClick={(e) => setPosition("0px 0px")}
                >
                  <i className="fa-solid fa-circle"></i>
                </div>
                <div
                  className={
                    position == "0px 5px"
                      ? "directionBtn CenterBottomShadow active"
                      : "directionBtn CenterBottomShadow "
                  }
                  onClick={(e) => setPosition("0px 5px")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-arrow-down"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"
                    />
                  </svg>
                </div>
              </div>
              <div className="RightButtonsShadow">
                <div
                  className={
                    position == "5px -5px"
                      ? "directionBtn RightTopShadow active"
                      : "directionBtn RightTopShadow "
                  }
                  onClick={(e) => setPosition("5px -5px")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-arrow-up-right"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M14 2.5a.5.5 0 0 0-.5-.5h-6a.5.5 0 0 0 0 1h4.793L2.146 13.146a.5.5 0 0 0 .708.708L13 3.707V8.5a.5.5 0 0 0 1 0v-6z"
                    />
                  </svg>
                </div>
                <div
                  className={
                    position == "5px 0px"
                      ? "directionBtn RightRightShadow active"
                      : "directionBtn RightRightShadow "
                  }
                  onClick={(e) => setPosition("5px 0px")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-arrow-right"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                    />
                  </svg>
                </div>
                <div
                  className={
                    +(position == "5px 5px")
                      ? "directionBtn RightBottomShadow active"
                      : "directionBtn RightBottomShadow"
                  }
                  onClick={(e) => setPosition("5px 5px")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-arrow-down-right"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M14 13.5a.5.5 0 0 1-.5.5h-6a.5.5 0 0 1 0-1h4.793L2.146 2.854a.5.5 0 1 1 .708-.708L13 12.293V7.5a.5.5 0 0 1 1 0v6z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
