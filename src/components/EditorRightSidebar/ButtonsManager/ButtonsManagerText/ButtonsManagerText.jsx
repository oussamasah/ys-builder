import React, { useEffect, useState } from "react";
import * as ReactDOM from "react-dom";
import "./ButtonsManagerText.css";
import Select from "react-select";
import fontsList from "../../../../assets/fonts/fonts.json";
import { SketchPicker } from "react-color";
import { useDispatch, useSelector } from "react-redux";
import { setStyleElement } from "../../../../redux/features/editor";
import axios from "axios";
import { useParams } from "react-router-dom";
function ButtonsManagerText(props) {
  let { siteId, pageId } = useParams();
  const dispatch = useDispatch();
  const el = props.element;
  const storeStyle = useSelector((state) => state.editor.value.btn);
  useEffect(() => {}, [storeStyle]);

  const [selectedFont, setselectedFont] = useState({ label: "", value: "" });
  const [selectedFontWeight, setselectedFontWeight] = useState({
    label: "",
    value: "",
  });
  const [content, setContent] = useState({ text: "", link: "" });
  const [taille, setTaille] = useState();
  const [lineheigt, setLine] = useState();

  const [fonts, setFonts] = useState([{}]);
  const [target, setTarget] = useState();
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
  const [Style, setStyle] = useState({});
  const [isActivePalette, setActivepalette] = useState(false);
  const [selectedOption, setSelectedOption] = useState({});
  const changeTarget = (value) => {
    const cmp = props.editor().getSelected();
    const attr = cmp.get("attributes");
    attr.target = value;
    cmp.setAttributes(attr);
    cmp.toHTML();
    props.editor().store();
  };
  useEffect(() => {
    const cmp = props.editor().getSelected();
    if (cmp.getEl().classList.contains("btn") || cmp.getEl().tagName == "A") {
      const attr = cmp.get("attributes");
      setTarget(attr.target);
    }
  }, [props.editor()]);
  const SelectFontStyles = {
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        fontFamily: data.value,
        cursor: "pointer",
        fontSize: 12,

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
      fontSize: 12,
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
  const changeFont = (font) => {
    setselectedFont(font);
    dispatch(
      setStyleElement({
        btn: {
          "font-family": font.value,
        },
      })
    );
  };
  const changeVariant = (variant) => {
    setselectedFontWeight(variant);
    dispatch(
      setStyleElement({
        btn: {
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
      setStyleElement({
        btn: {
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
    setTaille(value);
    let param = {
      btn: {
        "font-size": value + "px",
      },
    };
    dispatch(setStyleElement(param));
  };
  const changeLineHight = (value) => {
    setLine(value);
    dispatch(
      setStyleElement({
        btn: {
          "line-height": value + "px",
        },
      })
    );
  };

  const chnageText = (value) => {
    setContent({ ...content, text: value });
    const cmp = props.editor().getSelected();
    if (cmp.get("components").length > 1) {
      cmp.get("components").map((child) => {
        if (child.get("type") == "textnode") {
          child.getEl().nodeValue = value;
          child.set("content", value);
          child.getEl().innerHTML = value;
          child.toHTML();
          child.view.render();
          cmp.toHTML();
          cmp.view.render();
          props.editor().refresh();
        }
      });
    } else {
      if (cmp.get("type") == "textnode") {

        cmp.set("content", value);
        cmp.getEl().nodeValue = value;
        cmp.toHTML();
        cmp.view.render();
        props.editor().refresh();
      }
      if (cmp.get("type") == "link") {

        cmp.components(value);
        cmp.toHTML();
        cmp.view.render();
        props.editor().refresh();
      }
    }
  };
  const chnageLink = (value) => {
    setContent({ ...content, link: value });
    const cmp = props.editor().getSelected();
    const attr = cmp.get("attributes");
    attr.href = value;
    cmp.setAttributes(attr);
    cmp.toHTML();
    cmp.view.render();
    props.editor().store();
  };

  useEffect(() => {
    const cmp = props.editor().getSelected();
    const attr = cmp.get("attributes");
    const text = cmp.getEl().text;
    setContent({ link: attr.href, text: text });
    const st = cmp.getStyle();
    if (typeof st["font-family"] !== "undefined") {
      setselectedFont({
        value: st["font-family"],
        label: st["font-family"],
      });
    }
    if (typeof st["font-weight"] !== "undefined") {
      setselectedFontWeight({
        value:
          st["font-weight"] == 100
            ? "Light"
            : st["font-weight"] == "normal"
            ? "Medium"
            : "Gras",
        label:
          st["font-weight"] == 100
            ? "Light"
            : st["font-weight"] == "normal"
            ? "Medium"
            : "Gras",
      });
    }
    /*if (typeof st["font-weight"] !== "undefined") {
      setselectedFont({
        ...selectedFont,
        style: {
          value:
            storeStyle["font-weight"] == 100
              ? "Light"
              : storeStyle["font-weight"] == "normal"
              ? "Medium"
              : "Bold",
          label:
            storeStyle["font-weight"] == 100
              ? "Light"
              : storeStyle["font-weight"] == "normal"
              ? "Medium"
              : "Bold",
        },
      });
    } */
    if (typeof st["font-size"] !== "undefined") {
      setTaille(st["font-size"].replace("px", ""));
    }
    if (typeof st["line-height"] !== "undefined") {
      setLine(st["line-height"].replace("px", ""));
    }
    if (typeof st["color"] !== "undefined") {
      setBlockPickerColor({
        rgbTxt: st["color"].substring(
          st["color"].indexOf("rgb"),
          st["color"].indexOf(")") + 1
        ),
        rgb: rgbtoJson(
          st["color"].substring(
            st["color"].indexOf("rgb"),
            st["color"].indexOf(")") + 1
          )
        ),
      });
    }
  }, [props.editor()]);
  useEffect(() => {
    const result = fontsList.items.map((item) => {
      return {
        value: item.family,
        label: item.family,
      };
    });

    setFonts(result);
  }, []);
  useEffect(() => {
  }, [selectedOption]);

  return (
    <div id="btnManagertext">
      <div id="ConentPanel">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="panelTitle ms-4 me-2 w-50">Text</div>
          <input
            placeholder="text du buton"
            className="form-control  me-4 "
            type="text"
            id="text"
            value={content.text}
            onChange={(e) => chnageText(e.target.value)}
          />
        </div>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="panelTitle ms-4 me-2 w-50">Lien</div>
          <input
            placeholder="Lien du buton"
            className="form-control  me-4 "
            type="url"
            id="url"
            value={content.link}
            onChange={(e) => chnageLink(e.target.value)}
          />
        </div>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="panelTitle ms-4 me-2 w-50 text-light">
            Type de lien
          </div>
          <select
            className="form-select me-4"
            aria-label="Default select example"
            onChange={(e) => changeTarget(e.target.value)}
          >
            <option
              value="_blank"
              selected={target == "_blank" ? "selected" : false}
            >
              Lien externe
            </option>
            <option
              value="_self"
              selected={target == "_self" ? "selected" : false}
            >
              Lien interne
            </option>
          </select>
        </div>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="panelTitle ms-4">Police</div>
          <div className="panelContnet d-flex align-items-center me-4">
            <Select
              styles={SelectFontStyles}
              classNamePrefix="select"
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
              // defaultValue={selectedFont.style}
              classNamePrefix="select"
              styles={SelectFontStyles}
              value={selectedFontWeight}
              closeMenuOnSelect={true}
              isDisabled={false}
              isLoading={false}
              isClearable={false}
              isRtl={false}
              isMulti={false}
              isSearchable={false}
              // styles={SelectWeightStyles}
              name="variants"
              onChange={(e) => {
                changeVariant(e);
              }}
              options={variants}
            />
          </div>
        </div>

        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="panelTitle ms-4 ">Taille de la police</div>
          <div className="panelContnet d-flex align-items-center me-4">
            <div className="input-with-label-pixel">
              <span className="pixel-label">px</span>
              <input
                min="5"
                max="80"
                className="form-control input-small-pixel"
                type="number"
                value={taille}
                onChange={(e) => changeTaille(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="panelTitle ms-4">Interligne</div>
          <div className="panelContnet d-flex align-items-center me-4">
            <div className="input-with-label-pixel">
              <span className="pixel-label">px</span>
              <input
                min="1"
                max="80"
                className="form-control  input-small-pixel"
                type="number"
                value={lineheigt}
                onChange={(e) => changeLineHight(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ButtonsManagerText;
