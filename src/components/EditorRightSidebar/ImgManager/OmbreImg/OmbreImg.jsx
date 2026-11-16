import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setStyleElement } from "../../../../redux/features/editor";
import "./OmbreImg.css";
import { SketchPicker } from "react-color";

export default function OmbreImg(props) {
  let { siteId, pageId } = useParams();
  const dispatch = useDispatch();
  const storeStyle = useSelector((state) => state.editor.value.btn);
  useEffect(() => {}, [storeStyle]);
  const rgbtoJson = (rgbString) => {
    var s = rgbString;
    s = s.replace("rgb(", "");
    s = s.replace(")", "");
    let c = s.split(",");
    return { r: c[0], g: c[1], b: c[2], a: c[3] };
  };

  const [shadow, setShadow] = useState({
    type: "",
    size: "",
  });

  const [isActive, setIsActive] = useState(false);
  const [isActivePalette, setActivepalette] = useState(false);
  const [blockPickerColor, setBlockPickerColor] = useState({
    rgbTxt: "",
    rgb: {
      r: 51,
      g: 51,
      b: 51,
      a: 1,
    },
  });
  const handleClose = () => {
    setActivepalette(false);
  };
  const getPrimaryColor = () => {
    if (isActivePalette === true) {
      setActivepalette(false);
    } else {
      setActivepalette(true);
    }
  };

  const changeType = (type) => {
    setShadow({ ...shadow, type: type });
  };
  const changeActiveOmbre = () => {
    setIsActive(!isActive);

    dispatch(
      setStyleElement({
        img: {
          "box-shadow": "none",
        },
      })
    );
  };
  useEffect(() => {}, [isActivePalette]);
  useEffect(() => {
    dispatch(
      setStyleElement({
        img: {
          "box-shadow":
            shadow.type +
            " " +
            shadow.size +
            " " +
            shadow.size +
            " " +
            shadow.size +
            " " +
            blockPickerColor.rgbTxt,
        },
      })
    );
  }, [shadow, blockPickerColor]);
  useEffect(() => {
    const cmp = props.editor().getSelected();
    let elStyle = cmp.getStyle();
    if (typeof elStyle["box-shadow"] !== "undefined") {
      let bs = elStyle["box-shadow"];
      if (bs == "none") {
        setIsActive(false);
      } else {
        setIsActive(true);
        let color = bs.substring(bs.indexOf("rgb"), bs.indexOf(")") + 1);
        setBlockPickerColor({ rgbTxt: color, rgb: rgbtoJson(color) });
        let size = bs
          .substring(bs.indexOf("px") - 2, bs.indexOf("px") + 2)
          .replace(" ", "");
        let type = "";
        if (bs.indexOf("inset") > -1) {
          type = "inset";
        }
        setShadow({ size: size, type: type });
      }
    }
  }, [props.editor()]);

  return (
    <div id="OmbreImg">
      <div className=" d-flex justify-content-between align-items-center mb-3 mt-3">
        <label className="form-check-label" htmlFor="isActiveShadow">
          {props.title}
        </label>
        <div className="form-check form-switch me-5 p-0">
          <input
            className="form-check-input"
            type="checkbox"
            id={"isActiveShadow-" + props.element}
            name={"isActiveShadow-" + props.element}
            value={isActive}
            checked={isActive == true}
            onChange={(e) => {
              changeActiveOmbre(e);
            }}
          />
        </div>
      </div>
      <div
        className={
          isActive
            ? "d-flex justify-content-start align-items-center mb-3 mt-2"
            : "d-none"
        }
      >
        <div className="d-flex typeOmbre">
          <input
            type="radio"
            name={"typeombre-" + props.element}
            id={"external-" + props.element}
            checked={shadow.type == "" ? "checked" : false}
            onChange={(e) => changeType(e.target.value)}
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
            onChange={(e) => changeType(e.target.value)}
            value="inset"
            className="RadioInput"
          />
          <label htmlFor={"internal-" + props.element} className="RadioLabel">
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
              <div className="sketch-cover" onClick={(e) => handleClose()} />
              <SketchPicker
                color={blockPickerColor.rgb}
                onChangeComplete={(color) =>
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
                  })
                }
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
