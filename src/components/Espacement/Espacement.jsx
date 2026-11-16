import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Espacement.css";
import {
  updateIndependanteStyle,
  updateStyle,
} from "../../redux/features/site";
function Espacement(props) {
  const el = props.element;
  const dispatch = useDispatch();
  const storeSite = useSelector((state) => state.site.value);
  useEffect(() => {}, [storeSite]);
  const [padding, setPadding] = useState({
    top: storeSite.site.styleglobal[props.element]["padding-top"],
    left: storeSite.site.styleglobal[props.element]["padding-left"],
    right: storeSite.site.styleglobal[props.element]["padding-right"],
    bottom: storeSite.site.styleglobal[props.element]["padding-bottom"],
  });
  const [margin, setMargin] = useState({
    top: storeSite.site.styleglobal[props.element]["margin-top"],
    left: storeSite.site.styleglobal[props.element]["margin-left"],
    right: storeSite.site.styleglobal[props.element]["margin-right"],
    bottom: storeSite.site.styleglobal[props.element]["margin-bottom"],
  });
  useEffect(() => {
    dispatch(
      updateIndependanteStyle({
        [el]: {
          "margin-top": margin.top,
          "margin-left": margin.left,
          "margin-right": margin.right,
          "margin-bottom": margin.bottom,
          "padding-top": padding.top,
          "padding-left": padding.left,
          "padding-right": padding.right,
          "padding-bottom": padding.bottom,
        },
      })
    );
  }, [margin, padding]);

  return (
    <div id="Espacement" className="d-block  mt-5">
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

export default Espacement;
