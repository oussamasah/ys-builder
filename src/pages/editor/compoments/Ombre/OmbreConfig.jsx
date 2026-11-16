import React, { useEffect, useState } from 'react'
import { SketchPicker } from 'react-color';
import "./OmbreConfig.css"
export default function OmbreConfig(props) {
 
    const rgbtoJson = (rgbString) => {
      var s = rgbString;
      s = s.replace("rgb(", "");
      s = s.replace(")", "");
      let c = s.split(",");
      return { r: c[0], g: c[1], b: c[2], a: c[3] };
    };
    // const [style, setStyle] = useState(storeSite.site.styleglobal[props.element]);
    const [shadow, setShadow] = useState({  type:props.config.shadow.type, size: props.config.shadow.size });
    const [isActive, setIsActive] = useState(props.config.isActiveOmbre);
    const [isActivePalette, setActivepalette] = useState(false);
    const [blockPickerColor, setBlockPickerColor] = useState(props.config.OmbrePickerColor);
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
    const changeColor= (color) => {
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
    const changeType = (type) => {
      setShadow({ ...shadow, type: type });
    };
    const changeActiveOmbre = () => {
      setIsActive(!isActive);
  
    };
    useEffect(() => {}, [isActivePalette]);
    useEffect(() => {
//  console.log("++++++++++++++",blockPickerColor)
    props.setConfig(isActive,shadow,blockPickerColor)
    }, [shadow, blockPickerColor,isActive]);
  
    return (
      <div id="ombreConfig">
        <div className=" d-flex justify-content-between align-items-center mb-3 mt-3 ombreConfig">
          <label className="form-check-label" htmlFor="isActiveShadow">
            {props.title}
          </label>
          <div className="form-check form-switch  p-0">
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
                  onChangeComplete={(color) => changeColor(color)}
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
