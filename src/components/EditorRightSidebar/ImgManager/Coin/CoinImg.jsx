import React, { useEffect, useState } from "react";
import {
  setStyleElement,
  removeStyle,
} from "../../../../redux/features/editor";
import { useDispatch, useSelector } from "react-redux";
import "./CoinImg.css";
export default function CoinImg(props) {
  const storeStyle = useSelector((state) => state.editor.value);

  const dispatch = useDispatch();
  const [size, setSize] = useState({
    all: "",
    topLeft: "",
    topRight: "",
    bottomLeft: "",
    bottomRight: "",
  });
  const [type, setType] = useState("all");
  const changeType = (value) => {
    setType(value);
    switch (value) {
      case "all":
        dispatch(
          setStyleElement({
            img: {
              "border-top-left-radius": size.all,
              "border-top-right-radius": size.all,
              "border-bottom-left-radius": size.all,
              "border-bottom-right-radius": size.all,
            },
          })
        );
        break;
      case "indiv":
        dispatch(
          setStyleElement({
            img: {
              "border-top-left-radius": size.topLeft,
              "border-top-right-radius": size.topRight,
              "border-bottom-left-radius": size.bottomLeft,
              "border-bottom-right-radius": size.bottomRight,
            },
          })
        );
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    const cmp = props.editor().getSelected();
    const style = cmp.getStyle();
    if (
      typeof style["border-top-left-radius"] !== "undefined" &&
      style["border-top-left-radius"] == style["border-top-right-radius"] &&
      style["border-bottom-left-radius"] ==
        style["border-bottom-right-radius"] &&
      style["border-top-right-radius"] == style["border-bottom-right-radius"]
    ) {
      setType("all");
    } else {
      setType("indiv");
    }
    setSize({
      all:
        typeof style["border-top-left-radius"] !== "undefined"
          ? style["border-top-left-radius"]
          : "0px",
      topLeft:
        typeof style["border-top-left-radius"] !== "undefined"
          ? style["border-top-left-radius"]
          : "0px",
      topRight:
        typeof style["border-top-right-radius"] !== "undefined"
          ? style["border-top-right-radius"]
          : "0px",
      bottomLeft:
        typeof style["border-bottom-left-radius"] !== "undefined"
          ? style["border-bottom-left-radius"]
          : "0px",
      bottomRight:
        typeof style["border-bottom-right-radius"] !== "undefined"
          ? style["border-bottom-right-radius"]
          : "0px",
    });
  }, [props.editor()]);
  const changeSize = (sizeValue, typeChanged) => {
    let el = props.element;
    sizeValue = sizeValue == 0 ? "" : sizeValue + "px";

    switch (typeChanged) {
      case "all":
        setSize({ ...size, all: sizeValue });
        dispatch(
          setStyleElement({
            img: {
              "border-top-left-radius": sizeValue,
              "border-top-right-radius": sizeValue,
              "border-bottom-left-radius": sizeValue,
              "border-bottom-right-radius": sizeValue,
            },
          })
        );
        break;
      case "top-left":
        setSize({ ...size, topLeft: sizeValue });
        dispatch(
          setStyleElement({
            img: {
              "border-top-left-radius": sizeValue,
            },
          })
        );
        break;
      case "top-right":
        setSize({ ...size, topRight: sizeValue });

        dispatch(
          setStyleElement({
            img: {
              "border-top-right-radius": sizeValue,
            },
          })
        );
        break;
      case "bottom-left":
        setSize({ ...size, bottomLeft: sizeValue });
        dispatch(
          setStyleElement({
            img: {
              "border-bottom-left-radius": sizeValue,
            },
          })
        );
        break;
      case "bottom-right":
        setSize({ ...size, bottomRight: sizeValue });
        dispatch(
          setStyleElement({
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
  return (
    <div id="coinImg">
      <div className="d-flex justify-content-start align-items-center mt-4 mb-3">
        <div className="d-flex typeBorder">
          <input
            type="radio"
            name={"typeborder"}
            id={"all"}
            checked={type == "all" ? "checked" : false}
            onChange={(e) => changeType(e.target.value)}
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
            onChange={(e) => changeType(e.target.value)}
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
    </div>
  );
}
