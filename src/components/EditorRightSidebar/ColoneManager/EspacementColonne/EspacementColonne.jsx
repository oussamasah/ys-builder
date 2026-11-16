import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./EspacementColonne.css";
import { setStyleElement } from "../../../../redux/features/editor";
function EspacementColonne(props) {
  const el = props.element;
  const dispatch = useDispatch();
  const storeStyle = useSelector((state) => state.editor.value);
  useEffect(() => {}, [storeStyle]);
  const [padding, setPadding] = useState({
    top: "0px",
    left: "0px",
    right: "0px",
    bottom: "0px",
  });
  const [margin, setMargin] = useState({
    top: "0px",
    left: "0px",
    right: "0px",
    bottom: "0px",
  });
  useEffect(() => {
    dispatch(
      setStyleElement({
        div: {
          "margin-top": margin.top + "!important",
          "margin-left": margin.left + "!important",
          "margin-right": margin.right + "!important",
          "margin-bottom": margin.bottom + "!important",
          "padding-top": padding.top + "!important",
          "padding-left": padding.left + "!important",
          "padding-right": padding.right + "!important",
          "padding-bottom": padding.bottom + "!important",
        },
      })
    );
  }, [margin, padding]);
  useEffect(() => {
    const cmp = props.editor().getSelected();
    const style = cmp.getStyle();

    setMargin({
      top:
        typeof style["margin-top"] !== "undefined"
          ? style["margin-top"]
          : "0px",
      left:
        typeof style["margin-left"] !== "undefined"
          ? style["margin-left"]
          : "0px",
      right:
        typeof style["margin-right"] !== "undefined"
          ? style["margin-right"]
          : "0px",
      bottom:
        typeof style["margin-bottom"] !== "undefined"
          ? style["margin-bottom"]
          : "0px",
    });
    setPadding({
      top:
        typeof style["padding-top"] !== "undefined"
          ? style["padding-top"].replace("!important", "")
          : "0px",
      left:
        typeof style["padding-left"] !== "undefined"
          ? style["padding-left"].replace("!important", "")
          : "0px",
      right:
        typeof style["padding-right"] !== "undefined"
          ? style["padding-right"].replace("!important", "")
          : "0px",
      bottom:
        typeof style["padding-bottom"] !== "undefined"
          ? style["padding-bottom"].replace("!important", "")
          : "0px",
    });
  }, [props.editor()]);
  return (
    <div id="EspacementColonne" className="d-block  mt-5">
      <div className="titleEspacement">
        <span>Gestion des espacements </span>
      </div>
      <div className="espacement_inputs mt-4">
        <span className="margin">Margin</span>
        <div className=" d-flex align-items-center" id="marginblock">
          <div className="left-spacing">
            <input
              className="spacintInput"
              type="number"
              name="marginleft"
              id="marginleft"
              placeholder="0"
              value={margin.left.replace("px", "")}
              onChange={(e) => {
                setMargin({ ...margin, left: e.target.value + "px" });
              }}
            />
          </div>
          <div className="center-spacing">
            <div className="spacing-center-top text-center">
              <input
                className="spacintInput"
                type="number"
                name="margintop"
                id="margintop"
                placeholder="0"
                value={margin.top.replace("px", "")}
                onChange={(e) => {
                  setMargin({ ...margin, top: e.target.value + "px" });
                }}
              />
            </div>
            <div className="spacing-center-center">
              <div className="paddingstype">
                <span className="padding">Padding</span>
                <div
                  className="spacing d-flex align-items-center justify-content-center"
                  id="paddingblock"
                >
                  <div className="left-spacing">
                    <input
                      className="spacintInput "
                      type="number"
                      name="paddingleft"
                      id="paddingleft"
                      placeholder="0"
                      min="0"
                      step="1"
                      value={padding.left.replace("px", "")}
                      onChange={(e) => {
                        setPadding({ ...padding, left: e.target.value + "px" });
                      }}
                    />
                  </div>
                  <div className="center-spacing">
                    <div className="spacing-center-top mt-2">
                      <input
                        className="spacintInput "
                        type="number"
                        name="paddingtop"
                        id="paddingtop"
                        min="0"
                        step="1"
                        placeholder="0"
                        value={padding.top.replace("px", "")}
                        onChange={(e) => {
                          setPadding({
                            ...padding,
                            top: e.target.value + "px",
                          });
                        }}
                      />
                    </div>
                    <div className="spacing-center-center mt-2"></div>
                    <div className="spacing-center-bottom mt-2">
                      <input
                        className="spacintInput "
                        type="number"
                        name="paddingbottom"
                        id="paddingbottom"
                        placeholder="0"
                        min="0"
                        step="1"
                        value={padding.bottom.replace("px", "")}
                        onChange={(e) => {
                          setPadding({
                            ...padding,
                            bottom: e.target.value + "px",
                          });
                        }}
                      />
                    </div>
                  </div>
                  <div className="right-spacing">
                    <input
                      className="spacintInput"
                      type="number"
                      name="paddingright"
                      id="paddingright"
                      min="0"
                      step="1"
                      placeholder="0"
                      value={padding.right.replace("px", "")}
                      onChange={(e) => {
                        setPadding({
                          ...padding,
                          right: e.target.value + "px",
                        });
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="spacing-center-bottom text-center">
              <input
                className="spacintInput"
                type="number"
                name="marginbottom"
                id="marginbottom"
                placeholder="0"
                value={margin.bottom.replace("px", "")}
                onChange={(e) => {
                  setMargin({ ...margin, bottom: e.target.value + "px" });
                }}
              />
            </div>
          </div>
          <div className="right-spacing">
            <input
              className="spacintInput"
              type="number"
              name="marginright"
              id="marginright"
              placeholder="0"
              value={margin.right.replace("px", "")}
              onChange={(e) => {
                setMargin({ ...margin, right: e.target.value + "px" });
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EspacementColonne;
