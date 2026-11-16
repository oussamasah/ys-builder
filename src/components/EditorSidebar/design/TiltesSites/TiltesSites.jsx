import React, { useEffect, useState } from "react";
import * as ReactDOM from "react-dom";
import Select from "react-select";
import "./TiltesSites.css";
import fontsList from "../../../../assets/fonts/fonts.json";
import { SketchPicker } from "react-color";
import { useDispatch, useSelector } from "react-redux";
import { updateStyle } from "../../../../redux/features/site";
import axios from "axios";
import { useParams } from "react-router-dom";
function TiltesSites(props) {
  let { siteId, pageId } = useParams();
  const dispatch = useDispatch();
  const storeSite = useSelector((state) => state.site.value);
  const [selectedTitle, setSelectedTitle] = useState("h1");
  const [styleTitle, setStyleTitle] = useState({
    h1: storeSite.site.styleglobal["h1"],
    h2: storeSite.site.styleglobal["h2"],
    h3: storeSite.site.styleglobal["h3"],
    h4: storeSite.site.styleglobal["h4"],
    h5: storeSite.site.styleglobal["h5"],
    h6: storeSite.site.styleglobal["h6"],
  });  
  const [styleTitlemobile, setStyleTitlemobile] = useState({
    h1: storeSite.site.styleglobal["h1:mobile"]?storeSite.site.styleglobal["h1:mobile"]:"20",
    h2: storeSite.site.styleglobal["h2:mobile"]?storeSite.site.styleglobal["h2:mobile"]:"18",
    h3: storeSite.site.styleglobal["h3:mobile"]?storeSite.site.styleglobal["h3:mobile"]:"16",
    h4: storeSite.site.styleglobal["h4:mobile"]?storeSite.site.styleglobal["h4:mobile"]:"16",
    h5: storeSite.site.styleglobal["h5:mobile"]?storeSite.site.styleglobal["h5:mobile"]:"16",
    h6: storeSite.site.styleglobal["h6:mobile"]?storeSite.site.styleglobal["h6:mobile"]:"16",
  });
  const [fonts, setFonts] = useState([{}]);
  const variants = [
    { value: "100", label: "Light" },
    { value: "normal", label: "Medium" },
    { value: "900", label: "Gras" },
  ];
  const [blockPickerColor, setBlockPickerColor] = useState({
    rgbTxt: "",
    rgb: {
      r: 51,
      g: 51,
      b: 51,
      a: 1,
    },
  });

  const [isActivePalette, setActivepalette] = useState(false);

  const [selectedOption, setSelectedOption] = useState({
    font: {
      value: storeSite.site.styleglobal[selectedTitle]["font-family"],
      label: storeSite.site.styleglobal[selectedTitle]["font-family"],
    },
    style: {
      value: storeSite.site.styleglobal[selectedTitle]["font-weight"],
      label:
        storeSite.site.styleglobal[selectedTitle]["font-weight"] == "normal"
          ? "Medium"
          : storeSite.site.styleglobal[selectedTitle]["font-weight"] == "100"
          ? "Light"
          : "Gras",
    },
  });

  const SelectWeightStyles = {
    container: (provided, state) => ({
      ...provided,
      width: "120px",
    }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        fontWeight: data.value,
        fontFamily: selectedOption.font.value,
        /*  cursor: "pointer",
        backgroundColor:
          selectedOption.style.value == data.value ? "#353535" : "white", */
      };
    },

    control: (provided, state) => ({
      ...provided,
      background: "#fff",
      borderColor: "#ced4da",

      minHeight: "30px",
      height: "30px",
      borderRadius: "10px",
      boxShadow: state.isFocused ? null : null,
    }),

    valueContainer: (provided, state) => ({
      ...provided,
      height: "30px",
      padding: "0 6px",
    }),

    input: (provided, state) => ({
      ...provided,
      margin: "0px",
    }),

    indicatorSeparator: (state) => ({
      display: "none",
    }),
    indicatorsContainer: (provided, state) => ({
      ...provided,
      height: "30px",
    }),
  };
  const SelectFontStyles = {
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        fontFamily: data.value,
        cursor: "pointer",
        /* color: selectedOption.font.value != data.value ? "#353535" : "white",
         backgroundColor:
          selectedOption.font.value == data.value
            ? "#353535"
            : isFocused
            ? "gey"
            : "white", */
      };
    },
    container: (provided, state) => ({
      ...provided,
      width: "180px",
    }),
    control: (provided, state) => ({
      ...provided,
      background: "#fff",
      borderColor: "#ced4da",
      minHeight: "30px",
      height: "30px",
      borderRadius: "10px",
      width: "100%",
      boxShadow: state.isFocused ? null : null,
    }),

    valueContainer: (provided, state) => ({
      ...provided,
      height: "30px",
      padding: "0 6px",
    }),

    input: (provided, state) => ({
      ...provided,
      margin: "0px",
    }),
    indicatorSeparator: (state) => ({
      display: "none",
    }),
    indicatorsContainer: (provided, state) => ({
      ...provided,
      height: "30px",
    }),
  };
  const rgbtoJson = (rgbString) => {
    var s = rgbString;
    s = s.replace("rgb(", "");
    s = s.replace(")", "");
    let c = s.split(",");
    return { r: c[0], g: c[1], b: c[2], a: c[3] };
  };
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
  const changeSelectedTitle = (value) => {
    setSelectedTitle(value);
  };
  const changeFont = (font) => {
    const state = { ...styleTitle[selectedTitle] };
    state["font-family"] = font.value;
    setStyleTitle({ ...styleTitle, [selectedTitle]: state });
    setSelectedOption({ ...selectedOption, font: font });
  };
  const changeVariant = (variant) => {
    setSelectedOption({ ...selectedOption, style: variant });
    const state = { ...styleTitle[selectedTitle] };
    state["font-weight"] = variant.value;
    setStyleTitle({ ...styleTitle, [selectedTitle]: state });
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

    const state = { ...styleTitle[selectedTitle] };
    state["color"] =
      "rgb(" +
      color.rgb.r +
      ", " +
      color.rgb.g +
      ", " +
      color.rgb.b +
      "," +
      color.rgb.a +
      ")";
    setStyleTitle({ ...styleTitle, [selectedTitle]: state });
  };

  const changeTaille = (value) => {
    const state = { ...styleTitle[selectedTitle] };
    state["font-size"] = value + "px";
    setStyleTitle({ ...styleTitle, [selectedTitle]: state });
  };

  const changeTailleMobile = (value) => {
    const state = { ...styleTitlemobile[selectedTitle] };
    state["font-size"] = value + "px";
    setStyleTitlemobile({ ...styleTitlemobile, [selectedTitle]: state });
  };
  const changeLinehight = (value) => {
    const state = { ...styleTitle[selectedTitle] };
    state["line-height"] = value + "px";
    setStyleTitle({ ...styleTitle, [selectedTitle]: state });
  };
  const changeLinehightMobile = (value) => {
    const state = { ...styleTitlemobile[selectedTitle] };
    state["line-height"] = value + "px";
    setStyleTitlemobile({ ...styleTitlemobile, [selectedTitle]: state });
  };
  const changeAlign = (value) => {
    const state = { ...styleTitle[selectedTitle] };
    state["text-align"] = value;
    setStyleTitle({ ...styleTitle, [selectedTitle]: state });
  };

  useEffect(() => {}, [blockPickerColor]);
  useEffect(() => {
    const f = styleTitle[selectedTitle]["font-family"];
    const w = styleTitle[selectedTitle]["font-weight"];
    const c = styleTitle[selectedTitle]["color"];
    setSelectedOption({
      ...selectedOption,
      font: { value: f, label: f },
      style: {
        value: w,
        label: w == "100" ? "Light" : w == "normal" ? "Medium" : "Gras",
      },
    });
    setBlockPickerColor({
      rgbTxt: c,
      rgb: rgbtoJson(c),
    });
    const previewText = document.getElementById("preview");
    Object.assign(
      previewText.style,
      styleTitle[selectedTitle],
      styleTitlemobile[selectedTitle]
    );
  }, [selectedTitle]);

  useEffect(() => {
    const result = fontsList.items.map((item) => {
      return {
        value: item.family,
        label: item.family,
      };
    });

    setFonts(result);

    setBlockPickerColor({
      rgbTxt: storeSite.site.styleglobal.h1.color,
      rgb: rgbtoJson(storeSite.site.styleglobal.h1.color),
    });
  }, []);
  const saveStyle = async () => {
    dispatch(
      updateStyle({
        [selectedTitle]: styleTitle[selectedTitle],
        [`${selectedTitle}:mobile`]: styleTitlemobile[selectedTitle],
      })
    );
    console.log([selectedTitle]);
    await axios
      .post(process.env.REACT_APP_API_URL + "/sites/styleglobal/" + siteId, {
        styleglobal: {
          [selectedTitle]: styleTitle[selectedTitle],
          [`${selectedTitle}:mobile`]: styleTitlemobile[selectedTitle],
        },
      })
      .then((response) => {
        const previewText = document.getElementById("preview");
        Object.assign(previewText.style, styleTitle[selectedTitle]);
        Object.assign(previewText.style, styleTitlemobile[selectedTitle]);
        let head = props.editor().Canvas.getDocument().head;
        props.editor().Canvas.getDocument().head.replaceWith(head);
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  useEffect(() => {
    saveStyle();
  }, [styleTitle, styleTitlemobile]);

  return (
    <div id="Titles">
      <select
        className="form-control title-select mb-3"
        onChange={(e) => {
          changeSelectedTitle(e.target.value);
        }}
        value={selectedTitle}
      >
        <option value={"h1"}>TITRE H1</option>
        <option value={"h2"}>TITRE H2</option>
        <option value={"h3"}>TITRE H3</option>
        <option value={"h4"}>TITRE H4</option>
        <option value={"h5"}>TITRE H5</option>
        <option value={"h6"}>TITRE H6</option>
      </select>
      <div className="previewTitle mb-3 ms-4">Aperçu</div>
      <div id="preview" className="border-bottom pb-3 mb-4 ms-4 ps-3 ">
        Rendu du texte de contenu
      </div>
      <div id="ConentPanel">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="panelTitle ms-4">Police</div>
          <div className="panelContnet d-flex align-items-center me-4">
            <Select
              styles={SelectFontStyles}
              classNamePrefix="select"
              defaultValue={selectedOption.font}
              value={selectedOption.font}
              closeMenuOnSelect={true}
              isDisabled={false}
              isLoading={false}
              isClearable={false}
              isRtl={false}
              isMulti={false}
              isSearchable={true}
              name="font"
              onChange={(e) => {
                changeFont(e);
              }}
              options={fonts}
            />
            <div className="inputColor  ms-1">
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
        </div>

        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="panelTitle ms-4">Style</div>
          <div className="panelContnet d-flex align-items-center me-4">
            <Select
              defaultValue={selectedOption.style}
              value={selectedOption.style}
              classNamePrefix="select"
              closeMenuOnSelect={true}
              isDisabled={false}
              isLoading={false}
              isClearable={false}
              isRtl={false}
              isMulti={false}
              isSearchable={false}
              styles={SelectWeightStyles}
              name="variants"
              onChange={(e) => {
                changeVariant(e);
              }}
              options={variants}
            />
          </div>
        </div>

        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="panelTitle ms-4">Taille de la police</div>
          <div className="panelContnet d-flex align-items-center me-4">
            <i class="fas fa-desktop me-1"></i>
            <i class="fas fa-tablet me-1"></i>
            <div className="input-with-label-pixel">
              <span className="pixel-label">px</span>
              <input
                value={styleTitle[selectedTitle]["font-size"].replace("px", "")}
                onChange={(e) => changeTaille(e.target.value)}
                min="5"
                max="80"
                className="form-control form-control-sm input-small-pixel"
                type="number"
              />
            </div>
          </div>
          <div className="panelContnet d-flex align-items-center me-4">
            <i class="fas fa-mobile me-1"></i>
            <div className="input-with-label-pixel">
              <span className="pixel-label">px</span>
              <input
                value={styleTitlemobile[selectedTitle]["font-size"].replace(
                  "px",
                  ""
                )}
                onChange={(e) => changeTailleMobile(e.target.value)}
                min="5"
                max="80"
                className="form-control form-control-sm input-small-pixel"
                type="number"
              />
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="panelTitle ms-4">Interlignage</div>
          <div className="panelContnet d-flex align-items-center ">
            <i class="fas fa-desktop me-1"></i>
            <i class="fas fa-tablet me-1"></i>
            <div className="input-with-label-pixel">
              <span className="pixel-label">px</span>
              <input
                value={styleTitle[selectedTitle]["line-height"].replace(
                  "px",
                  ""
                )}
                onChange={(e) => changeLinehight(e.target.value)}
                min="1"
                max="80"
                className="form-control form-control-sm input-small-pixel"
                type="number"
              />
            </div>
          </div>
          <div className="panelContnet d-flex align-items-center me-4">
            <i class="fas fa-mobile me-1"></i>
            <div className="input-with-label-pixel">
              <span className="pixel-label">px</span>
              <input
                value={styleTitlemobile[selectedTitle]["line-height"].replace(
                  "px",
                  ""
                )}
                onChange={(e) => changeLinehightMobile(e.target.value)}
                min="1"
                max="80"
                className="form-control form-control-sm input-small-pixel"
                type="number"
              />
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="panelTitle ms-4">Orientation du texte</div>
          <div className="panelContnet d-flex align-items-center me-4">
            <div className="radio-btns-group">
              <input
                type="radio"
                name={"alignement"}
                id={"left"}
                checked={
                  styleTitle[selectedTitle]["text-align"] == "left"
                    ? "checked"
                    : false
                }
                value="left"
                className="RadioInput"
                onChange={(e) => changeAlign(e.target.value)}
              />
              <label htmlFor={"left"} className="RadioLabel">
                <i className="fal fa-align-left"></i>
              </label>
              <input
                type="radio"
                name={"alignement"}
                id={"center"}
                checked={
                  styleTitle[selectedTitle]["text-align"] == "center"
                    ? "checked"
                    : false
                }
                value="center"
                className="RadioInput"
                onChange={(e) => changeAlign(e.target.value)}
              />
              <label htmlFor={"center"} className="RadioLabel">
                <i className="fal fa-align-center"></i>
              </label>
              <input
                type="radio"
                name={"alignement"}
                id={"right"}
                checked={
                  styleTitle[selectedTitle]["text-align"] == "right"
                    ? "checked"
                    : false
                }
                value="right"
                className="RadioInput"
                onChange={(e) => changeAlign(e.target.value)}
              />
              <label htmlFor={"right"} className="RadioLabel">
                <i className="fal fa-align-right"></i>
              </label>
              <input
                type="radio"
                name={"alignement"}
                id={"justify"}
                checked={
                  styleTitle[selectedTitle]["text-align"] == "justify"
                    ? "checked"
                    : false
                }
                onChange={(e) => changeAlign(e.target.value)}
                value="justify"
                className="RadioInput"
              />
              <label htmlFor={"justify"} className="RadioLabel">
                <i className="fal fa-align-justify"></i>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TiltesSites;
