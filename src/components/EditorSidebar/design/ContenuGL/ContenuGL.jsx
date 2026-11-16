import React, { useEffect, useState } from "react";
import * as ReactDOM from "react-dom";
import Select from "react-select";
import "./ContenuGL.css";
import fontsList from "../../../../assets/fonts/fonts.json";
import { SketchPicker } from "react-color";
import { useDispatch, useSelector } from "react-redux";
import { updateStyle } from "../../../../redux/features/site";
import axios from "axios";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
function ContenuGL(props) {
  let { siteId, pageId } = useParams();
  const dispatch = useDispatch();
  const storeSite = useSelector((state) => state.site.value);
  const [styleBody, setStyleBody] = useState(storeSite.site.styleglobal.body);
  const [styleBodyMobile, setStyleBodyMobile] = useState(
    storeSite.site.styleglobal["body:mobile"]? storeSite.site.styleglobal["body:mobile"]:"14"
  );

  const [styleLink, setStyleLink] = useState(storeSite.site.styleglobal.a);
  const [breadcrumb, setBreadcrumb] = useState(storeSite.site.styleglobal.a);
  const [styleLinkhover, setStyleLinkhover] = useState(
    storeSite.site.styleglobal["a:hover"]
  );
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
  const [blockPickerColor3, setBlockPickerColor3] = useState({
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
  const [isActivePalette3, setActivepalette3] = useState(false);
  const [selectedOption, setSelectedOption] = useState({
    font: {
      value: storeSite.site.styleglobal.body["font-family"],
      label: storeSite.site.styleglobal.body["font-family"],
    },
    style: {
      value: storeSite.site.styleglobal.body["font-weight"],
      label:
        storeSite.site.styleglobal.body["font-weight"] == "normal"
          ? "Medium"
          : storeSite.site.styleglobal.body["font-weight"] == "100"
          ? "Light"
          : "Gras",
    },
    link: {
      value: storeSite.site.styleglobal.a["font-weight"],
      label:
        storeSite.site.styleglobal.a["font-weight"] == "normal"
          ? "Medium"
          : storeSite.site.styleglobal.a["font-weight"] == "100"
          ? "Light"
          : "Gras",
    },
    linkhover: {
      value: storeSite.site.styleglobal["a:hover"]["font-weight"],
      label:
        storeSite.site.styleglobal["a:hover"]["font-weight"] == "normal"
          ? "Medium"
          : storeSite.site.styleglobal["a:hover"]["font-weight"] == "100"
          ? "Light"
          : "Gras",
    },
  });
  const SelectWeightStylesLink = {
    container: (provided, state) => ({
      ...provided,
      width: "120px",
    }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        fontWeight: data.value,
        fontFamily: selectedOption.font.value,
        /*   cursor: "pointer",
        backgroundColor:
          selectedOption.link.value == data.value ? "#353535" : "white", */
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
    if (isActivePalette === true) {
      setActivepalette2(false);
    } else {
      setActivepalette2(true);
    }
  };
  const getPrimaryColor3 = () => {
    if (isActivePalette3 === true) {
      setActivepalette3(false);
    } else {
      setActivepalette3(true);
    }
  };
  const handleClose = () => {
    setActivepalette(false);
    setActivepalette2(false);
    setActivepalette3(false);
  };
  const ChangeBreadcrumb = (file) => {
    const formData = new FormData();
    formData.append("files", file);
    axios
      .post(
        process.env.REACT_APP_API_URL + "/sites/uploadbreadcrumb/" + siteId,
        formData
      )
      .then((response) => {
        setBreadcrumb(response.data.data.breadcrumb + "?v=logo-" + uuidv4());
        if (props.editor()) {
          props.editor().getWrapper().view.render();
        }
      });
  };
  const changeFont = (font) => {
    setStyleBody({ ...styleBody, "font-family": font.value });
    setSelectedOption({ selectedOption, font: font });
  };
  const changeVariant = (variant) => {
    setSelectedOption({ ...selectedOption, style: variant });
    setStyleBody({ ...styleBody, "font-weight": variant.value });
  };
  const changeVariantLink = (variant) => {
    setSelectedOption({ ...selectedOption, link: variant });
    setStyleLink({ ...styleLink, "font-weight": variant.value });
  };
  const changeVariantLinkhover = (variant) => {
    setSelectedOption({ ...selectedOption, linkhover: variant });
    setStyleLinkhover({ ...styleLinkhover, "font-weight": variant.value });
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
    setStyleBody({
      ...styleBody,
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
    });
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
    setStyleLink({
      ...styleLink,
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
    });
  };
  const changeColor3 = (color) => {
    setBlockPickerColor3({
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
    setStyleLinkhover({
      ...styleLinkhover,
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
    });
  };
  const changeTaille = (value) => {
    setStyleBody({ ...styleBody, "font-size": value + "px" });
  };
  const changeTaillemobile = (value) => {
    setStyleBodyMobile({ ...styleBodyMobile, "font-size": value + "px" });
  };

  const changeLinehight = (value) => {
    setStyleBody({ ...styleBody, "line-height": value + "px" });
  };
  const changeLinehightMobile = (value) => {
    setStyleBodyMobile({ ...styleBodyMobile, "line-height": value + "px" });
  };
  const changeAlign = (value) => {
    setStyleBody({ ...styleBody, "text-align": value });
  };
  const changeUnderline = (e) => {
    let underline = e == true ? "underline" : "none";

    setStyleLink({ ...styleLink, "text-decoration": underline });
  };
  const changeUnderlinehover = (e) => {
    let underline = e == true ? "underline" : "none";

    setStyleLinkhover({ ...styleLinkhover, "text-decoration": underline });
  };

  useEffect(() => {}, [blockPickerColor]);

  useEffect(() => {
    const result = fontsList.items.map((item) => {
      return {
        value: item.family,
        label: item.family,
      };
    });

    setFonts(result);
    setBreadcrumb(storeSite.site.breadcrumb);

    setBlockPickerColor({
      rgbTxt: storeSite.site.styleglobal.body.color,
      rgb: rgbtoJson(storeSite.site.styleglobal.body.color),
    });
    setBlockPickerColor2({
      rgbTxt: storeSite.site.styleglobal.a.color,
      rgb: rgbtoJson(storeSite.site.styleglobal.a.color),
    });
    setBlockPickerColor3({
      rgbTxt: storeSite.site.styleglobal["a:hover"].color,
      rgb: rgbtoJson(storeSite.site.styleglobal["a:hover"].color),
    });
  }, []);
  const saveStyleBody = async () => {
    dispatch(updateStyle({ body: styleBody, "body:mobile": styleBodyMobile }));

    await axios
      .post(process.env.REACT_APP_API_URL + "/sites/styleglobal/" + siteId, {
        styleglobal: {
          body: styleBody,
          "body:mobile": styleBodyMobile,
        },
      })
      .then((response) => {
        const previewText = document.getElementById("preview");
        Object.assign(previewText.style, styleBody);
        // Object.assign(previewText.style,styleBodyMobile);
        let head = props.editor().Canvas.getDocument().head;
        props.editor().Canvas.getDocument().head.replaceWith(head);
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  const saveStyleLink = async () => {
    dispatch(updateStyle({ a: styleLink }));

    await axios
      .post(process.env.REACT_APP_API_URL + "/sites/styleglobal/" + siteId, {
        styleglobal: {
          a: styleLink,
        },
      })
      .then((response) => {
        let head = props.editor().Canvas.getDocument().head;
        props.editor().Canvas.getDocument().head.replaceWith(head);
      })
      .catch((error) => {
        // console.log(error);
      });
  };
  const saveStyleLinkhover = async () => {
    dispatch(updateStyle({ "a:hover": styleLinkhover }));

    await axios
      .post(process.env.REACT_APP_API_URL + "/sites/styleglobal/" + siteId, {
        styleglobal: {
          "a:hover": styleLinkhover,
        },
      })
      .then((response) => {
        let head = props.editor().Canvas.getDocument().head;
        props.editor().Canvas.getDocument().head.replaceWith(head);
      })
      .catch((error) => {
        // console.log(error);
      });
  };
  useEffect(() => {
    saveStyleBody();
  }, [styleBody, styleBodyMobile]);

  useEffect(() => {
    saveStyleLink();
  }, [styleLink]);
  useEffect(() => {
    saveStyleLinkhover();
  }, [styleLinkhover]);

  return (
    <div id="ContentGl">
      <div className="previewTitle mb-3 ms-4">Aperçu</div>
      <div id="preview" className="border-bottom pb-3 mb-4 ms-4  me-4 ps-3">
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

        <div className="d-flex justify-content-between  align-items-center mb-3">
          <div className="panelTitle ms-4 ">Taille de la police</div>
          <div className="panelContnet d-flex align-items-center">
            <i class="fas fa-desktop me-1"></i>
            <i class="fas fa-tablet me-1"></i>
            <div className="input-with-label-pixel">
              <span className="pixel-label">px</span>
              <input
                value={styleBody["font-size"].replace("px", "")}
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
                value={styleBodyMobile["font-size"].replace("px", "")}
                onChange={(e) => changeTaillemobile(e.target.value)}
                min="5"
                max="80"
                className="form-control form-control-sm input-small-pixel"
                type="number"
              />
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="panelTitle ms-4 me-5">Interligne</div>
          <div className="panelContnet d-flex align-items-center">
            <i class="fas fa-desktop me-1"></i>
            <i class="fas fa-tablet me-1"></i>
            <div className="input-with-label-pixel">
              <span className="pixel-label">px</span>
              <input
                value={styleBody["line-height"].replace("px", "")}
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
                value={styleBodyMobile["line-height"].replace("px", "")}
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
                checked={styleBody["text-align"] == "left" ? "checked" : false}
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
                  styleBody["text-align"] == "center" ? "checked" : false
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
                checked={styleBody["text-align"] == "right" ? "checked" : false}
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
                  styleBody["text-align"] == "justify" ? "checked" : false
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
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="panelTitle ms-4">Lien hypertexte</div>
          <div className="panelContnet d-flex align-items-center me-4">
            <Select
              defaultValue={selectedOption.link}
              classNamePrefix="select"
              closeMenuOnSelect={true}
              isDisabled={false}
              isLoading={false}
              isClearable={false}
              isRtl={false}
              isMulti={false}
              isSearchable={false}
              styles={SelectWeightStylesLink}
              name="variants"
              onChange={(e) => {
                changeVariantLink(e);
              }}
              options={variants}
            />
            <input
              type="checkbox"
              name={"underline"}
              id={"underline"}
              checked={
                styleLink["text-decoration"] == "underline" ? "checked" : false
              }
              value="underline"
              className="RadioInput"
              onChange={(e) => changeUnderline(e.target.checked)}
            />
            <label htmlFor={"underline"} className="RadioLabel ms-1">
              <i className="fal fa-underline"></i>
            </label>
            <div className="inputColor  ms-1">
              <div className="colorPreview" onClick={getPrimaryColor2}>
                <span
                  className="color-value"
                  style={{
                    background: blockPickerColor2.rgbTxt,
                  }}
                ></span>
              </div>

              {isActivePalette2 ? (
                <div className="sketch-popeover">
                  <div
                    className="sketch-cover"
                    onClick={(e) => handleClose()}
                  />
                  <SketchPicker
                    color={blockPickerColor2.rgb}
                    onChangeComplete={(color) => changeColor2(color)}
                  />
                </div>
              ) : null}
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="panelTitle ms-4">Survol lien hypertexte</div>
          <div className="panelContnet d-flex align-items-center me-4">
            <Select
              defaultValue={selectedOption.linkhover}
              classNamePrefix="select"
              closeMenuOnSelect={true}
              isDisabled={false}
              isLoading={false}
              isClearable={false}
              isRtl={false}
              isMulti={false}
              isSearchable={false}
              styles={SelectWeightStylesLink}
              name="variants"
              onChange={(e) => {
                changeVariantLinkhover(e);
              }}
              options={variants}
            />
            <input
              type="checkbox"
              name={"underlinehover"}
              id={"underlinehover"}
              checked={
                styleLinkhover["text-decoration"] == "underline"
                  ? "checked"
                  : false
              }
              value="underline"
              className="RadioInput"
              onChange={(e) => changeUnderlinehover(e.target.checked)}
            />
            <label htmlFor={"underlinehover"} className="RadioLabel ms-1">
              <i className="fal fa-underline"></i>
            </label>
            <div className="inputColor  ms-1">
              <div className="colorPreview" onClick={getPrimaryColor3}>
                <span
                  className="color-value"
                  style={{
                    background: blockPickerColor3.rgbTxt,
                  }}
                ></span>
              </div>

              {isActivePalette3 ? (
                <div className="sketch-popeover">
                  <div
                    className="sketch-cover"
                    onClick={(e) => handleClose()}
                  />
                  <SketchPicker
                    color={blockPickerColor3.rgb}
                    onChangeComplete={(color) => changeColor3(color)}
                  />
                </div>
              ) : null}
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="panelTitle ms-4">
            <span> Fil d'ariane icon : </span>
          </div>
          <div className="addIcon">
            <input
              type="file"
              name="file"
              id="file"
              className="inputfile d-none"
              onChange={(e) => ChangeBreadcrumb(e.target.files[0])}
            />

            <label for="file">
              {breadcrumb != null ? (
                <div className="p-3">
                  <img src={breadcrumb} className="logo-img" />
                </div>
              ) : (
                <div className="p-3">
                  <i className="fa-light fa-image"></i>
                  <span className="text-center">Ajouter</span>
                </div>
              )}
            </label>

            {/*  <MediaLibrary siteId={siteId} changeImage={updateLogo} /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContenuGL;
