import React, { useEffect, useState } from "react";
import "./BorderConfig.css";
import { SketchPicker } from "react-color";

export default function BorderConfig(props) {
  const [typeborder, settype] = useState(props.config.typeborder);
  const [size, setsize] = useState(props.config.size);
  const [style, setstyle] = useState(props.config.style);
 
  const [isActivePalette, setActivepalette] = useState(false);
  const getPrimaryColor = () => {
    if (isActivePalette === true) {
      setActivepalette(false);
    } else {
      setActivepalette(true);
    }
  };
  const rgbtoJson = (rgbString) => {
    var s = rgbString;
    s = s.replace("rgb(", "");
    s = s.replace(")", "");
    let c = s.split(",");
    return { r: c[0], g: c[1], b: c[2], a: c[3] };
  };
  const [blockPickerColor, setBlockPickerColor] = useState({
    rgbTxt: props.config.color,
    rgb: rgbtoJson(props.config.color),
  });
  const handleClose = () => {
    setActivepalette(false);
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

  useEffect(() => {

    props.setConfig({
        typeborder: typeborder,
        size: size,
        style: style,
        color: blockPickerColor.rgbTxt,
     
    });
  }, [typeborder, size, style, blockPickerColor]);

  return (
    <>
    <div className="d-flex justify-content-between align-items-center mb-2">
      <div className="blockTitle m-2">Bordure</div>
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex type">
          <input
            type="radio"
            name={"type-"+props.for}
            id={"all-"+props.for}
            checked={typeborder === "all"}
            onChange={() => settype("all")}
            value="all"
            className="RadioInput"
          />
          <label htmlFor={"all-"+props.for} className="RadioLabel me-1">
            <div className="btntype alltype">
              <i className="fal fa-border-outer"></i>
            </div>
          </label>

          <input
            type="radio"
            name={"type-"+props.for}
            id={"top-"+props.for}
            checked={typeborder !== "all"}
            onChange={() => settype("top")}
            value="top"
            className="RadioInput"
          />
          <label htmlFor={"top-"+props.for} className="RadioLabel">
            <div className="btntype alltype">
              <i className="fal fa-border-none"></i>
            </div>
          </label>
        </div>

        {typeborder === "all" ? (
          <div className="d-flex justify-content-between align-items-center">
            <div className="rangeSize d-flex justify-content-end align-items-center">
              <input
                type="range"
                min="0"
                max="100"
                step="1"
                className="rangeInput me-2"
                value={size.all}
                onChange={(e) =>
                  setsize({
                    ...size,
                    all: e.target.value,
                  })
                }
              />
              <div className="input-with-label-pixel">
                <span className="pixel-label">px</span>
                <input
                  min="0"
                  max="100"
                  className="form-control form-control-sm input-small-pixel"
                  type="number"
                  value={size.all}
                  onChange={(e) =>
                    setsize({
                      ...size,
                      all: e.target.value ,
                    })
                  }
                />
              </div>
        
            </div>
          </div>
        ) : (
          <div className="d-flex align-items-center ms-2 type">
            <input
              type="radio"
              name="typeindiv"
              id="topindiv"
              checked={typeborder === "top"}
              onChange={() => settype("top")}
              value="top"
              className="RadioInput"
            />
            <label htmlFor="topindiv" className="RadioLabel me-1">
              <div className="btntype seperatetype">
                <i className="fal fa-border-top"></i>
              </div>
            </label>
            <input
              type="radio"
              name="typeindiv"
              id="bottom"
              checked={typeborder === "bottom"}
              onChange={() => settype("bottom")}
              value="bottom"
              className="RadioInput"
            />
            <label htmlFor="bottom" className="RadioLabel me-1">
              <div className="btntype seperatetype">
                <i className="fal fa-border-bottom"></i>
              </div>
            </label>
            <input
              type="radio"
              name="typeindiv"
              id="left"
              checked={typeborder === "left"}
              onChange={() => settype("left")}
              value="left"
              className="RadioInput"
            />
            <label htmlFor="left" className="RadioLabel me-1">
              <div className="btntype seperatetype">
                <i className="fal fa-border-left"></i>
              </div>
            </label>
            <input
              type="radio"
              name="typeindiv"
              id="right"
              checked={typeborder === "right"}
              onChange={() => settype("right")}
              value="right"
              className="RadioInput"
            />
            <label htmlFor="right" className="RadioLabel me-1">
              <div className="btntype seperatetype">
                <i className="fal fa-border-right"></i>
              </div>
            </label>
            {/* <div className="blockTitle ms-2">
                            {type == "top"
                              ? "Supérieur"
                              : type == "bottom"
                              ? "Inférieur"
                              : type == "left"
                              ? "Gauche"
                              : "Droit"}
                          </div> */}

            <input
              type="range"
              min="0"
              max="10"
              step="1"
              className="rangeInput me-2"
              value={size[typeborder]}
              onChange={(e) =>
                setsize({
                  ...size,
                  [typeborder]: e.target.value ,
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
                value={size[typeborder]}
                onChange={(e) =>
                  setsize({
                    ...size,
                    [typeborder]: e.target.value ,
                  })
                }
              />
            </div>
          </div>
        )}
          
      </div>
    </div>
    <div className="d-flex justify-content-between align-items-center mb-2">
    <div className="blockTitle m-2">Couleur & type de bordure</div>
    <div className="inputColor ms-2">
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
              <div className="borderType">
                <select
                  id="borderStyle"
                  name="borderStyle"
                  className="form-select form-select-sm borderSelect"
                  aria-label="Default select example"
                  value={style.style}
                  onChange={(e) =>
                    setstyle(e.target.value,)
                  }
                >
                  <option value="solid">______________</option>
                  <option value="dashed">---------------</option>
                  <option value="dotted">............................</option>
                </select>
              </div>
              </div>
    </>
  );
}
