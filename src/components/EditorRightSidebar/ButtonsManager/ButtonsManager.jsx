import React, { useEffect, useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import "./ButtonsManager.css";
import iconClose from "../../../assets/imgEditorSidebar/iconClose.png";
import { SketchPicker } from "react-color";
import { useDispatch, useSelector } from "react-redux";
import { setStyleElement, removeStyle } from "../../../redux/features/editor";
import Ombre from "../../EditorSidebar/ombre/ombre";
import Border from "../../border/border";
import ButtonsManagerText from "./ButtonsManagerText/ButtonsManagerText";
import Ombrerightsidebar from "./ombre/Ombrerightsidebar";
import BorderButton from "./border/BorderButton";

function ButtonsManager(props) {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [isActivePalette, setActivepalette] = useState(false);
  const [isActivePalette2, setActivepalette2] = useState(false);

  const handleCloseBtn = () => setShow(false);
  const storeStyle = useSelector((state) => state.editor.value);
  useEffect(() => {
    if (show) {
      props.editor().getSelected().setStyle(storeStyle.btn);

      if (storeStyle["btn:hover"]) {
        let it = storeStyle["btn:hover"];
        let hover = "{";
        Object.keys(it).map((key) => {
          hover += key + ":" + it[key] + ";";
        });
        hover += "}";
        const css = props.editor().Css;
        let elId = props.editor().getSelected().getId();
        let sti = `#${elId}:hover${JSON.stringify(
          storeStyle["btn:hover"]
        ).replaceAll('"', "")}`;

        css.addRules(`#${elId}:hover${hover}`);
      }
    }
  }, [storeStyle]);

  const [blockPickerColor, setBlockPickerColor] = useState({});
  const [blockPickerColor2, setBlockPickerColor2] = useState({});
  const handleClose = () => {
    setActivepalette(false);
    setActivepalette2(false);
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
  const getEditor = () => {
    return props.editor();
  };
  const rgbtoJson = (rgbString) => {
    var s = rgbString;
    s = s.replace("rgb(", "");
    s = s.replace(")", "");
    let c = s.split(",");
    return { r: c[0], g: c[1], b: c[2], a: c[3] };
  };
  useEffect(() => {
    if (props.editor()) {
      props.editor().on("component:selected", (component) => {
        const domElement = component.getEl();
        if (domElement.classList.contains("btn") || domElement.tagName == "A") {
          dispatch(removeStyle({}));
          dispatch(setStyleElement({ btn: component.getStyle() }));

          setShow(true);
          const st = props.editor().getSelected().getStyle();
          if (typeof st["background-color"] !== "undefined") {
            setBlockPickerColor({
              rgbTxt: st["background-color"].substring(
                st["background-color"].indexOf("rgb"),
                st["background-color"].indexOf(")") + 1
              ),
              rgb: rgbtoJson(
                st["background-color"].substring(
                  st["background-color"].indexOf("rgb"),
                  st["background-color"].indexOf(")") + 1
                )
              ),
            });
          }
        } else {
          setShow(false);
        }
      });
    }
  }, [props.editor()]);

  useEffect(() => {
    dispatch(
      setStyleElement({ btn: { "background-color": blockPickerColor.rgbTxt } })
    );

    dispatch(
      setStyleElement({
        "btn:hover": { "background-color": blockPickerColor2.rgbTxt },
      })
    );
  }, [blockPickerColor, blockPickerColor2]);

  return (
    <div id="btnManager" className="ps-3 pe-3 pt-3">
      <Offcanvas
        show={show}
        onHide={handleCloseBtn}
        placement={"end"}
        className="offcanvas offcanvas-end "
        id="offcanvasImg"
        aria-labelledby="offcanvasRightLabel"
      >
        <div className="offcanvas-header">
          <div
            className="close"
            onClick={(e) => handleCloseBtn()}
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          >
            <img src={iconClose} alt="close" />
          </div>
        </div>
        <div className="offcanvas-body">
          <div id="btnManager" className="">
            <nav>
              <div className="nav nav-tabs" id="nav-tab" role="tablist">
                <button
                  className="nav-link active "
                  id="nav-text-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-text"
                  type="button"
                  role="tab"
                  aria-controls="nav-text"
                  aria-selected="true"
                >
                  Texte
                </button>
                <button
                  className="nav-link "
                  id="nav-format-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-format"
                  type="button"
                  role="tab"
                  aria-controls="nav-format"
                  aria-selected="false"
                >
                  Format
                </button>
              </div>
            </nav>
            <div className="tab-content" id="nav-tabContent">
              <div
                className="tab-pane fade show active"
                id="nav-text"
                role="tabpanel"
                aria-labelledby="nav-text-tab"
              >
                <div className="btn_manager ">
                  <ButtonsManagerText editor={getEditor} />
                </div>
              </div>
              <div
                className="tab-pane fade  "
                id="nav-format"
                role="tabpanel"
                aria-labelledby="nav-format-tab"
              >
                <div className="btn_manager ">
                  <div className="d-flex justify-content-between align-items-center mb-3 ">
                    <div className="panelTitle">Couleur du fond </div>
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

                  <div className="d-flex justify-content-between align-items-center mb-3 mt-4">
                    <div className="panelTitle">Couleur du survol </div>
                    <div className="inputColor  ms-1">
                      <div
                        className="colorPreview"
                        onClick={(e) => getPrimaryColor2()}
                      >
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
                  <Ombrerightsidebar
                    editor={getEditor}
                    title={"Gestion d'ombre"}
                  />
                  <BorderButton editor={getEditor} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Offcanvas>
    </div>
  );
}

export default ButtonsManager;
