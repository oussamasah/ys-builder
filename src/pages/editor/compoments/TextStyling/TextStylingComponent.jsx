import React, { useEffect, useState } from "react";
import fontsList from "../../../../assets/fonts/fonts.json";
import Select from "react-select";
import { SketchPicker } from "react-color";
export default function TextStylingComponent(props) {
  const [fonts, setFonts] = useState([{}]);

  const [selectedFont, setSelectedFont] = useState({
    label: props.config.font,
    value: props.config.font,
  });
  const [fontVariant, setFontVariant] = useState(props.config.variant);
  const [textAlign, setTextAlign] = useState(props.config.align);
  const [fontSize, setFontSize] = useState(props.config.size);
  const [LineHeight, setLineHeight] = useState(props.config.line);
  const rgbtoJson = (rgbString) => {
    var s = rgbString;
    s = s.replace("rgb(", "");
    s = s.replace(")", "");
    let c = s.split(",");
    return { r: c[0], g: c[1], b: c[2], a: c[3] };
  };
  const [isActivePalette, setActivepalette] = useState(false);
  const [blockPickerColor, setBlockPickerColor] = useState({
    rgbTxt: props.config.color,
    rgb: rgbtoJson(props.config.color),
  });

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
    let config = props.config;
    config.color =
      "rgb(" +
      color.rgb.r +
      ", " +
      color.rgb.g +
      ", " +
      color.rgb.b +
      "," +
      color.rgb.a +
      ")";
    props.setConfig(config);
  };
  useEffect(() => {
    const result = fontsList.items.map((item) => {
      return {
        value: item.family,
        label: item.family,
      };
    });
    setFonts(result);
  }, []);

  const changeFont = (value) => {
    setSelectedFont(value);
    let config = props.config;
    config.font = value.value;
    props.setConfig(config);
  };
  const changeAlign = (value) => {
    setTextAlign(value);
    let config = props.config;
    config.align = value;
    props.setConfig(config);
  };

  const changeVariant = (value) => {
    setFontVariant(value);
    let config = props.config;
    config.variant = value;
    props.setConfig(config);
  };
  const changeSize = (value, type) => {
    setFontSize({ ...fontSize, [type]: value });
    let config = props.config;
    config.size[type] = value;
    props.setConfig(config);
  };
  const changeLine = (value, type) => {
    setLineHeight({ ...LineHeight, [type]: value });
    let config = props.config;
    config.line[type] = value;
    props.setConfig(config);
  };
  useEffect(() => {
    setSelectedFont({ label: props.config.font, value: props.config.font });
    setFontVariant(props.config.variant);
    setFontSize(props.config.size);
    setLineHeight(props.config.line)
    setTextAlign(props.config.align);
    setBlockPickerColor({
      rgbTxt: props.config.color,
      rgb: props.config.color,
    });
  }, [props]);

  useEffect(() => {}, [
    selectedFont,
    fontVariant,
    fontSize,
    LineHeight,
    textAlign,
    blockPickerColor,
  ]);
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
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3 Police">
        <span>Police</span>
        <div>
          <Select
            styles={SelectFontStyles}
            classNamePrefix="select"
            defaultValue={selectedFont}
            value={selectedFont}
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
        </div>
      </div>
      <div className="d-flex justify-content-between align-items-center mb-3 Epaisseur">
        <div className="w-75">Epaisseur de la police</div>

        <select
          value={fontVariant}
          onChange={(e) => changeVariant(e.target.value)}
          className="form-select w-25"
          aria-label="Default select example"
        >
          <option value="100">light </option>
          <option value="500">Normal </option>
          <option value="900">Gras</option>
        </select>
      </div>
      <div className="d-flex justify-content-between align-items-center mb-3 Size">
        <div className="w-75">Taille de la police</div>
        <i class="fas fa-desktop me-1"></i>
        <select
          value={fontSize.desktop}
          onChange={(e) => changeSize(e.target.value, "desktop")}
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
        <i class="fas fa-tablet-alt ms-1 me-1"></i>
        <select
          value={fontSize.tablet}
          onChange={(e) => changeSize(e.target.value, "tablet")}
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
        <i class="fas fa-mobile-alt ms-1 me-1"></i>
        <select
          value={fontSize.mobile}
          onChange={(e) => changeSize(e.target.value, "mobile")}
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
      </div>
      {LineHeight!=undefined? 
      <div className="d-flex justify-content-between align-items-center mb-3 Heigth">
        <div className="w-75">Epaisseur du  police</div>
        <i class="fas fa-desktop me-1"></i>
        <select
          value={LineHeight.desktop}
          onChange={(e) => changeLine(e.target.value, "desktop")}
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
        <i class="fas fa-tablet-alt ms-1 me-1"></i>
        <select
          value={LineHeight.tablet}
          onChange={(e) => changeLine(e.target.value, "tablet")}
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
        <i class="fas fa-mobile-alt ms-1 me-1"></i>
        <select
          value={LineHeight.mobile}
          onChange={(e) => changeLine(e.target.value, "mobile")}
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
      </div>:""}
     
      <div className="d-flex justify-content-between align-items-center mb-3 Color">
        <span>Couleur de texte </span>
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
                color={blockPickerColor.rgb}
                onChangeComplete={(color) => changeColor(color)}
              />
            </div>
          ) : null}
        </div>
      </div>
      <div className="d-flex justify-content-between align-items-center mb-3 orientation">
        <div className="panelTitle">Orientation du texte</div>
        <div className="panelContnet d-flex align-items-center">
          <div className="radio-btns-group">
            <input
              type="radio"
              name={"alignement-" + props.for}
              id={"left-" + props.for}
              checked={textAlign == "left"}
              value="left"
              className="RadioInput"
              onChange={(e) => changeAlign(e.target.value)}
            />
            <label htmlFor={"left-" + props.for} className="RadioLabel">
              <i className="fal fa-align-left"></i>
            </label>
            <input
              type="radio"
              name={"alignement-" + props.for}
              id={"center-" + props.for}
              checked={textAlign == "center"}
              value="center"
              className="RadioInput"
              onChange={(e) => changeAlign(e.target.value)}
            />
            <label htmlFor={"center-" + props.for} className="RadioLabel">
              <i className="fal fa-align-center"></i>
            </label>
            <input
              type="radio"
              name={"alignement-" + props.for}
              id={"right-" + props.for}
              checked={textAlign == "right"}
              value="right"
              className="RadioInput"
              onChange={(e) => changeAlign(e.target.value)}
            />
            <label htmlFor={"right-" + props.for} className="RadioLabel">
              <i className="fal fa-align-right"></i>
            </label>
            <input
              type="radio"
              name={"alignement-" + props.for}
              id={"justify-" + props.for}
              checked={textAlign == "justify"}
              onChange={(e) => changeAlign(e.target.value)}
              value="justify"
              className="RadioInput"
            />
            <label htmlFor={"justify-" + props.for} className="RadioLabel">
              <i className="fal fa-align-justify"></i>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
