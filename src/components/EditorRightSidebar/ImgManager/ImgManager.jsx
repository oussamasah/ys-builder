import React, { useEffect, useState } from "react";
import ImgThree from "../../../assets/imgManager/ImgThree.svg";
import ImgTow from "../../../assets/imgManager/ImgTow.svg";
import ImgOne from "../../../assets/imgManager/ImgOne.svg";
import preview from "../../../assets/imgManager/preview.png";
import iconClose from "../../../assets/imgEditorSidebar/iconClose.png";
import { setStyleElement, removeStyle } from "../../../redux/features/editor";

import "./ImgManager.css";
import picture from "../../../assets/imgManager/picture.svg";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useParams } from "react-router-dom";

import EspacementImg from "./EspacementImg/EspacementImg";
//import MediaLibrary from "../../MediaLibrary/MediaLibrary";
import Offcanvas from "react-bootstrap/Offcanvas";
import BorderImg from "./border/BorderImg";
import CoinImg from "./Coin/CoinImg";
import OmbreImg from "./OmbreImg/OmbreImg";
import MediaLibrarys from "../../MediaLibrarys/MediaLibrarys";
export default function ImgManger(props) {
  let { siteId } = useParams();

  const storeStyle = useSelector((state) => state.editor.value);
  useEffect(() => {
    if (show) {
      props.editor().getSelected().setStyle(storeStyle.img);

      if (storeStyle["img:hover"]) {
        let it = storeStyle["img:hover"];
        let hover = "{";
        Object.keys(it).map((key) => {
          hover += key + ":" + it[key] + ";";
        });
        hover += "}";
        const css = props.editor().Css;
        let elId = props.editor().getSelected().getId();
        let sti = `#${elId}:hover${JSON.stringify(
          storeStyle["img:hover"]
        ).replaceAll('"', "")}`;
        css.addRules(`#${elId}:hover${hover}`);
      }
    }
  }, [storeStyle]);
  const [editor, setEditor] = useState(props.editor());
  const [element, setElement] = useState();
  const [image, setImage] = useState(null);
  const [form, setForm] = useState("square");
  const [alt, setAlt] = useState("");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true);

  const dispatch = useDispatch();
  useEffect(() => {}, [alt]);
  const changeAlt = (value) => {
    setAlt(value);
    const cmp = props.editor().getSelected();
    const attr = cmp.get("attributes");
    attr.alt = value;
    cmp.setAttributes(attr);
    cmp.toHTML();
    cmp.view.render();
    props.editor().store();
  };
  const changeImage = (path) => {
    element.set("src", process.env.REACT_APP_MEDIA_URL + path);
    setImage(process.env.REACT_APP_MEDIA_URL + path);
  };
  const getEditor = () => {
    return props.editor();
  };
  const changeForm = (type) => {
    switch (type) {
      case "square":
        setForm("square");
        dispatch(
          setStyleElement({
            img: {
              "border-radius": "0px",
            },
          })
        );
        break;
      case "rounded":
        setForm("rounded");
        dispatch(
          setStyleElement({
            img: {
              "border-radius": "7px",
            },
          })
        );
        break;
      case "pill":
        setForm("rounded-circle");
        dispatch(
          setStyleElement({
            img: {
              "border-radius": "50%",
            },
          })
        );
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    if (props.editor()) {
      props.editor().on("component:selected", (component) => {
        const domElement = component.getEl();

        if (domElement.tagName == "IMG") {
          dispatch(removeStyle({}));
          dispatch(setStyleElement({ img: component.getStyle() }));
          let s = component.getStyle();

          setAlt(domElement.getAttribute("alt"));
          setForm(
            s["border-radius"] == "7px"
              ? "rounded"
              : s["border-radius"] == "0px"
              ? "square"
              : "rounded-circle"
          );
          setElement(props.editor().getSelected());
          setImage(props.editor().getSelected().get("src"));

          setShow(true);
        } else {
          setShow(false);
        }
      });
    }
  }, [props.editor(), element, image]);

  return (
    <div>
      <Offcanvas
        show={show}
        onHide={handleClose}
        placement={"end"}
        className="offcanvas offcanvas-end "
        id="offcanvasImg"
        aria-labelledby="offcanvasRightLabel"
      >
        <div className="offcanvas-header">
          <div
            className="close"
            onClick={(e) => handleClose()}
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          >
            <img src={iconClose} alt="close" />
          </div>
        </div>
        <div className="offcanvas-body">
          <div className="">
            <span className="titleImg">
              {" "}
              <img src={picture} alt="picture" /> Module Image
            </span>
          </div>
          <div className="p-4 ">
            <span className="sourceImg ">Source</span>
          </div>
          <div className="ModalChabgeImg">
            <div className="ModShowImg pt-3">
              <img src={image} alt="" className=" img d-block" />
              <span className="d-block titleimg mt-1">
                {image != null ? image.replace(/^.*[\\\/]/, "") : ""}
              </span>
            </div>
            <div className="footerDrop">
              <MediaLibrarys
                from={"imgManager"}
                siteId={siteId}
                changeImage={changeImage}
              />
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center mt-3 mb-3">
            <div className="text-light titleAlt ms-2">Alt du l'image</div>
            <div>
              <input
                type="text"
                value={alt}
                className="form-control form-control-sm"
                onChange={(e) => changeAlt(e.target.value)}
              />
            </div>
          </div>
          <div className="p-4 ">
            <span className="sourceImg mt-2">Apparence</span>
          </div>
          <div className="preview-block">
            <img src={image} className={" img preview " + form} />
            <div className="btn-group dropstart">
              <i
                className="dropdown-toggle-btn"
                data-bs-toggle="dropdown"
                aria-expanded="true"
              ></i>
              <ul className="dropdown-menu preview-options pt-3 pb-3">
                <li className="mb-3">
                  <img
                    src={ImgOne}
                    className="img imgpreview  ms-3 me-3 rounded-0"
                    onClick={(e) => {
                      changeForm("square");
                    }}
                  />
                </li>
                <li className="mb-3">
                  <img
                    src={ImgTow}
                    className="img imgpreview  ms-3 me-3 rounded-0"
                    onClick={(e) => {        
                      changeForm("rounded");
                    }}
                  />
                </li>
                <li>
                  <img
                    src={ImgThree}
                    className="img imgpreview  ms-3 me-3 rounded-0"
                    onClick={(e) => {
                      changeForm("pill");
                    }}
                  />
                </li>
              </ul>
            </div>
          </div>

          <div className="managerBlock">
            <BorderImg editor={getEditor} />
            <CoinImg editor={getEditor} />
            <OmbreImg editor={getEditor} title={"Gestion d'ombre"} />
            <EspacementImg editor={getEditor} />
          </div>
        </div>
      </Offcanvas>
    </div>
  );
}
