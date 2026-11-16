import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import preview from "../../../../assets/imgGlobal/preview.svg";
import FormOne from "../../../../assets/imgGlobal/imgformtwo.svg";
import FormTwo from "../../../../assets/imgGlobal/imgformone.svg";
import FormThree from "../../../../assets/imgGlobal/imgformthree.svg";
import { updateIndependanteStyle } from "../../../../redux/features/site";
import "./ImageGlobal.css";
import axios from "axios";
import Border from "../../../border/border";
import Espacement from "../../../Espacement/Espacement";
import Ombre from "../../ombre/ombre";
export default function ImageGlobal(props) {
  let { siteId } = useParams();

  const dispatch = useDispatch();
  const storeSite = useSelector((state) => state.site.value);
  const [type, setType] = useState("all");
  const [size, setSize] = useState({
    all: storeSite.site.styleglobal.img["border-radius"],
    topLeft: storeSite.site.styleglobal.img["border-top-left-radius"],
    topRight: storeSite.site.styleglobal.img["border-top-right-radius"],
    bottomLeft: storeSite.site.styleglobal.img["border-bottom-left-radius"],
    bottomRight: storeSite.site.styleglobal.img["border-bottom-right-radius"],
  });
  const getStyle = async () => {
    await axios
      .post(process.env.REACT_APP_API_URL + "/sites/styleglobal/" + siteId, {
        styleglobal: {
          img: storeSite.site.styleglobal.img,
        },
      })
      .then((response) => {
        let head = props.editor().Canvas.getDocument().head;
        props.editor().Canvas.getDocument().head.replaceWith(head);
        const previewText = document.querySelectorAll("img.img.preview");

        var styleCss = document.createElement("style");

        let sbtn = "";
        Object.keys(storeSite.site.styleglobal.img).forEach(function (
          key,
          index
        ) {
          sbtn += key + ":" + storeSite.site.styleglobal.img[key] + ";";
        });
        var cssBtn = "img.preview{" + sbtn + "}";
        styleCss.appendChild(document.createTextNode(cssBtn));
        Object.keys(previewText).map((key) => {
          if (previewText[key].querySelector("style") != null) {
            previewText[key].querySelector("style").remove();
          }
          previewText[key].appendChild(styleCss);
        });
      })
      .catch((error) => {
        // console.log(error);
      });
  };
  useEffect(() => {
    getStyle();
  }, [storeSite]);

  const changeSize = (sizeValue, typeChanged) => {
    let el = props.element;
    sizeValue = sizeValue == 0 ? "" : sizeValue + "px";

    switch (typeChanged) {
      case "all":
        setSize({ ...size, all: sizeValue });
        dispatch(
          updateIndependanteStyle({
            img: {
              "border-radius": sizeValue,
              "border-top-left-radius": "",
              "border-top-right-radius": "",
              "border-bottom-left-radius": "",
              "border-bottom-right-radius": "",
            },
          })
        );
        break;
      case "top-left":
        setSize({ ...size, topLeft: sizeValue });
        dispatch(
          updateIndependanteStyle({
            img: {
              "border-top-left-radius": sizeValue,
            },
          })
        );
        break;
      case "top-right":
        setSize({ ...size, topRight: sizeValue });

        dispatch(
          updateIndependanteStyle({
            img: {
              "border-top-right-radius": sizeValue,
            },
          })
        );
        break;
      case "bottom-left":
        setSize({ ...size, bottomLeft: sizeValue });
        dispatch(
          updateIndependanteStyle({
            img: {
              "border-bottom-left-radius": sizeValue,
            },
          })
        );
        break;
      case "bottom-right":
        setSize({ ...size, bottomRight: sizeValue });
        dispatch(
          updateIndependanteStyle({
            img: {
              "border-bottom-right-radius": sizeValue,
            },
          })
        );
        break;
      default:
        break;
    }
  };
  const changeForm = (type) => {
    switch (type) {
      case "square":
        dispatch(
          updateIndependanteStyle({
            img: {
              "border-radius": "0px",
            },
          })
        );
        break;
      case "rounded":
        dispatch(
          updateIndependanteStyle({
            img: {
              "border-radius": "7px",
            },
          })
        );
        break;
      case "pill":
        dispatch(
          updateIndependanteStyle({
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
  return (
    <div id="imgGlobal" className="ps-3 pe-3 pt-3">
      <div className="previewTitle mb-5 mt-3">Aperçu</div>
      <div className="preview-block">
        <img src={preview} className="img preview" />

        <div className="btn-group dropend">
          <i
            className="dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          ></i>
          <ul className="dropdown-menu preview-options pt-3 pb-3">
            <li className="mb-3">
              <img
                src={FormThree}
                className="img imgpreview  ms-3 me-3 rounded-0"
                onClick={(e) => {
                  changeForm("square");
                }}
              />
            </li>
            <li className="mb-3">
              <img
                src={FormOne}
                className="img imgpreview  ms-3 me-3 rounded-0"
                onClick={(e) => {
                  changeForm("rounded");
                }}
              />
            </li>
            <li>
              <img
                src={FormTwo}
                className="img imgpreview  ms-3 me-3 rounded-0"
                onClick={(e) => {
                  changeForm("pill");
                }}
              />
            </li>
          </ul>
        </div>
      </div>
      <div className="btn_manager ">
        <Border element={"img"} />

        <div className="d-flex justify-content-start align-items-center mt-4 mb-3">
          <div className="d-flex typeBorder">
            <input
              type="radio"
              name={"typeborder"}
              id={"all"}
              checked={type == "all" ? "checked" : false}
              onChange={(e) => setType(e.target.value)}
              value="all"
              className="RadioInput"
            />
            <label htmlFor={"all"} className="RadioLabel me-1">
              <div className="btntype alltype">
                <i className="fal fa-border-outer"></i>
              </div>
            </label>
            <input
              type="radio"
              name={"typeborder"}
              id={"indiv"}
              checked={type == "indiv" ? "checked" : false}
              onChange={(e) => setType(e.target.value)}
              value="indiv"
              className="RadioInput"
            />
            <label htmlFor={"indiv"} className={"RadioLabel me-1"}>
              <div className="btntype alltype">
                <i className="fal fa-border-none"></i>
              </div>
            </label>
          </div>
          <div className="blockTitle ms-2 me-2">Coins arrondis</div>
          <div className="d-flex align-items-center">
            <input
              type="number"
              name={"radius-all"}
              onChange={(e) => changeSize(e.target.value, "all")}
              value={size.all.replace("px", "")}
              min="0"
              step="1"
              className={
                type == "all" ? "radius-input d-block text-center" : "d-none"
              }
            />
          </div>
          <div className="d-flex align-items-center">
            <input
              type="number"
              name={"radius-top"}
              min="0"
              step="1"
              onChange={(e) => changeSize(e.target.value, "top-left")}
              value={size.topLeft.replace("px", "")}
              className={type == "indiv" ? "radius-input d-block" : "d-none"}
            />
            <input
              type="number"
              name={"radius-bottom"}
              min="0"
              step="1"
              onChange={(e) => changeSize(e.target.value, "top-right")}
              value={size.topRight.replace("px", "")}
              className={type == "indiv" ? "radius-input d-block" : "d-none"}
            />

            <input
              type="number"
              name={"radius-left"}
              min="0"
              step="1"
              onChange={(e) => changeSize(e.target.value, "bottom-left")}
              value={size.bottomLeft.replace("px", "")}
              className={type == "indiv" ? "radius-input d-block" : "d-none"}
            />
            <input
              type="number"
              name={"radius-right"}
              min="0"
              step="1"
              onChange={(e) => changeSize(e.target.value, "bottom-right")}
              value={size.bottomRight.replace("px", "")}
              className={type == "indiv" ? "radius-input d-block" : "d-none"}
            />
          </div>
        </div>

        <Espacement element={"img"} />
        <Ombre element={"img"} title="Ombre d'image" />
      </div>
    </div>
  );
}
