import React, { useEffect, useState } from "react";
import { SketchPicker } from "react-color";

export default function ColorConfig(props) {
  const rgbtoJson = (rgbString) => {
    var s = rgbString;
    s = s.replace("rgb(", "");
    s = s.replace(")", "");
    let c = s.split(",");
    return { r: c[0], g: c[1], b: c[2], a: c[3] };
  };

  const [isActivePalette, setActivepalette] = useState(false);
  const [blockPickerColor, setBlockPickerColor] = useState({
    rgbTxt: props.config.rgbTxt,
    rgb: rgbtoJson(props.config.rgbTxt),
  });

  useEffect(() => {
    setBlockPickerColor({
      rgbTxt: props.config.rgbTxt,
      rgb: rgbtoJson(props.config.rgbTxt),
    });
  }, [props]);

  const handleCloseColor = () => {
    setActivepalette(false);
  };

  const getPrimaryColor = () => {
    if (isActivePalette === true) {
      setActivepalette(false);
    } else {
      setActivepalette(true);
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
    props.setConfig({
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
    <div
      id={props.configKey}
      className="d-flex justify-content-between align-items-center mb-3 ColorConfig"
    >
      <span>{props.label}</span>
      <div className="inputColor d-flex justify-content-end  ms-1 ">
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
              onClick={(e) => handleCloseColor()}
            />
            <SketchPicker
              key={props.configKey}
              color={blockPickerColor.rgb}
              onChangeComplete={(color) => changeColor(color)}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}
