import React, { useEffect } from "react";
import { useState } from "react";

import "./EspacementConfig.css";

function EspacementConfig(props) {
  const [padding, setPadding] = useState(props.config.padding);
  const [margin, setMargin] = useState(props.config.margin);
  useEffect(() => {
    props.setConfig({ padding: padding, margin: margin });
  }, [margin, padding]);
useEffect(() => {
console.log(props.config)
}, [])

  return (
    <div id="EspacementAR" className="d-block  mt-5">
      <div className="espacement_inputs mt-4">
        <span className="margin">Margin</span>
        <div className=" d-flex align-items-center" id="marginblock">
          <div className="left-spacing">
            <input
              className="spacintInput"
              type="number"
              name={"marginleft-"+props.for}
              id={"marginleft-"+props.for}
              placeholder="0"
              value={margin.left}
              onChange={(e) => {
                setMargin({ ...margin, left: e.target.value });
              }}
            />
          </div>
          <div className="center-spacing">
            <div className="spacing-center-top text-center">
              <input
                className="spacintInput"
                type="number"
                name={"margintop-"+props.for}
                id={"margintop-"+props.for}
                placeholder="0"
                value={margin.top}
                onChange={(e) => {
                  setMargin({ ...margin, top: e.target.value });
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
                      name={"paddingleft-"+props.for}
                      id={"paddingleft-"+props.for}
                      placeholder="0"
                      min="0"
                      step="1"
                      value={padding.left}
                      onChange={(e) => {
                        setPadding({ ...padding, left: e.target.value });
                      }}
                    />
                  </div>
                  <div className="center-spacing">
                    <div className="spacing-center-top mt-2">
                      <input
                        className="spacintInput "
                        type="number"
                        name={"paddingtop-"+props.for}
                        id={"paddingtop-"+props.for}
                        min="0"
                        step="1"
                        placeholder="0"
                        value={padding.top}
                        onChange={(e) => {
                          setPadding({
                            ...padding,
                            top: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="spacing-center-center mt-2"></div>
                    <div className="spacing-center-bottom mt-2">
                      <input
                        className="spacintInput "
                        type="number"
                        name={"paddingbottom-"+props.for}
                        id={"paddingbottom-"+props.for}
                        placeholder="0"
                        min="0"
                        step="1"
                        value={padding.bottom}
                        onChange={(e) => {
                          setPadding({
                            ...padding,
                            bottom: e.target.value,
                          });
                        }}
                      />
                    </div>
                  </div>
                  <div className="right-spacing">
                    <input
                      className="spacintInput"
                      type="number"
                      name={"paddingright-"+props.for}
                      id={"paddingright-"+props.for}
                      min="0"
                      step="1"
                      placeholder="0"
                      value={padding.right}
                      onChange={(e) => {
                        setPadding({
                          ...padding,
                          right: e.target.value,
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
                name={"marginbottom-"+props.for}
                id={"marginbottom-"+props.for}
                placeholder="0"
                value={margin.bottom}
                onChange={(e) => {
                  setMargin({ ...margin, bottom: e.target.value });
                }}
              />
            </div>
          </div>
          <div className="right-spacing">
            <input
              className="spacintInput"
              type="number"
              name={"marginright-"+props.for}
              id={"marginright-"+props.for}
              placeholder="0"
              value={margin.right}
              onChange={(e) => {
                setMargin({ ...margin, right: e.target.value });
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EspacementConfig;
