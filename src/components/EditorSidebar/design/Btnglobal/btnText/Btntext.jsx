import React, { useEffect, useState } from "react";
// import * as ReactDOM from "react-dom";
import Select from "react-select";
import fontsList from "../../../../../assets/fonts/fonts.json";
import { SketchPicker } from "react-color";
import { useDispatch, useSelector } from "react-redux";
import {
  updateIndependanteStyle,
  updateStyle,
} from "../../../../../redux/features/site";
// import axios from "axios";
// import { useParams } from "react-router-dom";
function Btntext(props) {
  // let { siteId, pageId } = useParams();
  const dispatch = useDispatch();
  const el = props.element;

  const storeSite = useSelector((state) => state.site.value);
  const elDesktopStyle = storeSite.site.styleglobal[el];
  const Lineheighdesk =
    elDesktopStyle && elDesktopStyle["line-height"]
      ? elDesktopStyle["line-height"].replace("px", "")
      : "24";

  const [linetxtDesk, setLinetxtDesk] = useState(Lineheighdesk);
  const elMobileStyle = storeSite.site.styleglobal[el + "mobile"];
  const fontSize =
    elMobileStyle && elMobileStyle["font-size"]
      ? elMobileStyle["font-size"].replace("px", "")
      : "16";

  const [sizetxt, setSizetxt] = useState(fontSize);

  const LineHeight =
    elMobileStyle && elMobileStyle["line-height"]
      ? elMobileStyle["line-height"].replace("px", "")
      : "24";

  const [linetxt, setLinetxt] = useState(LineHeight);
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
  const [blockPickerColor2, setBlockPickerColor2] = useState({
    rgbTxt: "",
    rgb: {
      r: 51,
      g: 51,
      b: 51,
      a: 1,
    },
  });
  const [isActivePalette, setActivepalette] = useState(false);
  const [isActivePalette2, setActivepalette2] = useState(false);
  const [selectedOption, setSelectedOption] = useState({
    font: {
      value: storeSite.site.styleglobal[props.element]["font-family"],
      label: storeSite.site.styleglobal[props.element]["font-family"],
    },
    style: {
      value: storeSite.site.styleglobal[props.element]["font-weight"],
      label:
        storeSite.site.styleglobal[props.element]["font-weight"] == "normal"
          ? "Medium"
          : storeSite.site.styleglobal[props.element]["font-weight"] == "100"
          ? "Light"
          : "Gras",
    },
  });
  // const SelectWeightStylesLink = {
  //   container: (provided, state) => ({
  //     ...provided,
  //     width: "120px",
  //   }),
  //   option: (styles, { data, isDisabled, isFocused, isSelected }) => {
  //     return {
  //       ...styles,
  //       fontWeight: data.value,
  //       fontFamily: selectedOption.font.value,
  //       /*   cursor: "pointer",
  //       backgroundColor:
  //         selectedOption.link.value == data.value ? "#353535" : "white", */
  //     };
  //   },

  //   control: (provided, state) => ({
  //     ...provided,
  //     background: "#fff",
  //     borderColor: "#ced4da",

  //     minHeight: "30px",
  //     height: "30px",
  //     borderRadius: "10px",
  //     boxShadow: state.isFocused ? null : null,
  //   }),

  //   valueContainer: (provided, state) => ({
  //     ...provided,
  //     height: "30px",
  //     padding: "0 6px",
  //   }),

  //   input: (provided, state) => ({
  //     ...provided,
  //     margin: "0px",
  //   }),

  //   indicatorSeparator: (state) => ({
  //     display: "none",
  //   }),
  //   indicatorsContainer: (provided, state) => ({
  //     ...provided,
  //     height: "30px",
  //   }),
  // };
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
  const getPrimaryColor2 = () => {
    if (isActivePalette2 === true) {
      setActivepalette2(false);
    } else {
      setActivepalette2(true);
    }
  };

  const handleClose = () => {
    setActivepalette(false);
  };
  const handleClose2 = () => {
    setActivepalette2(false);
  };
  const changeFont = (font) => {
    dispatch(
      updateIndependanteStyle({
        [el]: {
          "font-family": font.value,
        },
      })
    );
    setSelectedOption({ selectedOption, font: font });
  };
  const changeVariant = (variant) => {
    setSelectedOption({ ...selectedOption, style: variant });
    dispatch(
      updateIndependanteStyle({
        [el]: {
          "font-weight": variant.value,
        },
      })
    );
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
        [el]: {
          color:
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
        [el + ":hover"]: {
          color:
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
  const changeTaille = (value) => {
    dispatch(
      updateIndependanteStyle({
        [el]: {
          "font-size": value + "px",
        },
      })
    );
  };

  const changeTaillemobile = () => {
    dispatch(
      updateStyle({
        [el + ":mobile"]: {
          "font-size": sizetxt + "px",
        },
      })
    );
  };

  useEffect(() => {
    changeLinehight();
  }, [linetxtDesk]);

  const changeLinehight = () => {
    dispatch(
      updateIndependanteStyle({
        [el]: {
          "line-height": linetxtDesk + "px",
        },
      })
    );
  };
  const changeLinehightMobile = (value) => {
    dispatch(
      updateIndependanteStyle({
        [el + ":mobile"]: {
          "line-height": linetxt + "px",
        },
      })
    );
  };
  useEffect(() => {
    changeTaillemobile();
  }, [sizetxt]);
  useEffect(() => {
    changeLinehight();
  }, [sizetxt]);
  const changeAlign = (value) => {
    dispatch(
      updateIndependanteStyle({
        [el]: {
          "text-align": value,
        },
      })
    );
  };
  useEffect(() => {
    const result = fontsList.items.map((item) => {
      return {
        value: item.family,
        label: item.family,
      };
    });

    setFonts(result);

    setBlockPickerColor({
      rgbTxt: storeSite.site.styleglobal[props.element].color,
      rgb: rgbtoJson(storeSite.site.styleglobal[props.element].color),
    });
    setBlockPickerColor2({
      rgbTxt: storeSite.site.styleglobal[props.element + ":hover"].color,
      rgb: rgbtoJson(
        storeSite.site.styleglobal[props.element + ":hover"].color
      ),
    });
  }, []);
  useEffect(() => {}, [storeSite]);

  return (
    <div id="ContentGl">
      <div id="ConentPanel">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="panelTitle ">Police</div>
          <div className="panelContnet d-flex align-items-center me-4">
            <Select
              styles={SelectFontStyles}
              classNamePrefix="select"
              defaultValue={selectedOption.font}
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
          <div className="panelTitle ">Couleur du survol texte </div>
          <div className="inputColor  ms-1 me-4">
            <div className="colorPreview" onClick={(e) => getPrimaryColor2()}>
              <span
                className="color-value"
                style={{
                  background: blockPickerColor2.rgbTxt,
                }}
              ></span>
            </div>
            {isActivePalette2 ? (
              <div className="sketch-popeover2">
                <div
                  className="sketch-cover2"
                  onClick={(e) => handleClose2()}
                />
                <SketchPicker
                  color={blockPickerColor2.rgb}
                  onChangeComplete={(color) => changeColor2(color)}
                />
              </div>
            ) : null}
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="panelTitle ">Style</div>
          <div className="panelContnet d-flex align-items-center me-4">
            <Select
              defaultValue={selectedOption.style}
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

        <div className="d-flex justify-content-between  mb-3">
          <div className="panelTitle ">Taille de la police</div>
          <div className="panelContnet d-flex align-items-center">
            <i class="fas fa-desktop me-1"></i>
            <i class="fas fa-tablet me-1"></i>
            <div className="input-with-label-pixel">
              <span className="pixel-label">px</span>
              <input
                value={storeSite.site.styleglobal[el]["font-size"].replace(
                  "px",
                  ""
                )}
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
                value={sizetxt}
                onChange={(e) => {
                  setSizetxt(e.target.value);
                }}
                min="5"
                max="80"
                className="form-control form-control-sm input-small-pixel"
                type="number"
              />
            </div>
          </div>
        </div>
        {/* <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="panelTitle  ">Taille de la police</div>
          <select
            value={storeSite.site.styleglobal[el]["font-size"].replace(
              "px",
              ""
            )}
            onChange={(e) => changeTaille(e.target.value)}
            className="form-select w-25"
            aria-label="Default select example"
          >
            <option value="14">14 </option>
            <option value="16">16 </option>
            <option value="18">18</option>
            <option value="20">20</option>
            <option value="22">22</option>
            <option value="24">24</option>
            <option value="26">26</option>
            <option value="28">28</option>
            <option value="30">30</option>
            <option value="32">32</option>
            <option value="34">34</option>
            <option value="36">36</option>
            <option value="48">48</option>
            <option value="60">60</option>
            <option value="72">72</option>
            <option value="90">90</option>
          </select>
        </div> */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="panelTitle">Interligne</div>

          <div className="panelContnet d-flex align-items-center">
            <i class="fas fa-desktop me-1"></i>
            <i class="fas fa-tablet me-1"></i>
            <div className="input-with-label-pixel">
              <span className="pixel-label">px</span>
              <input
                value={linetxtDesk}
                onChange={(e) => setLinetxtDesk(e.target.value)}
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
                value={linetxt}
                onChange={(e) => setLinetxt(e.target.value)}
                min="5"
                max="80"
                className="form-control form-control-sm input-small-pixel"
                type="number"
              />
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="panelTitle ">Orientation du texte</div>
          <div className="panelContnet d-flex align-items-center me-4">
            <div className="radio-btns-group">
              <input
                type="radio"
                name={"alignement"}
                id={"left"}
                checked={
                  storeSite.site.styleglobal[el]["text-align"] == "left"
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
                  storeSite.site.styleglobal[el]["text-align"] == "center"
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
                  storeSite.site.styleglobal[el]["text-align"] == "right"
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
                  storeSite.site.styleglobal[el]["text-align"] == "justify"
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

export default Btntext;
