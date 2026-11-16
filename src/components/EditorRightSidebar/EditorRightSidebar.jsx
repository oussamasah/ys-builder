import React, { useState } from "react";
import { Offcanvas } from "react-bootstrap";
import ButtonsManager from "./ButtonsManager/ButtonsManager";
import ColoneManager from "./ColoneManager/ColoneManager";
import DivManager from "./DivManager/DivManager";
import ImgManager from "./ImgManager/ImgManager";
import Mapmanager from "./mapManager/Mapmanager";
import SliderManager from "./SliderManager/SliderManager";
import "./EditorRightSidebar.css";
export default function EditorRightSidebar(props) {
  const [show, setShow] = useState(true);
  const getEditor = () => {
    return props.editor();
  };
  const handleClose = () => {
    document.getElementById("EditorRightSidebar").classList.remove("active");
    props.editor().Canvas.setZoom(100);
    props.editor().Canvas.setCoords(0, 0);
  };
  return (
    <div id="EditorRightSidebar" className="">
      <div
        className="d-flex justify-content-end  align-items-center text-light p-3 close"
        onClick={(e) => handleClose()}
      >
        <i class="fal fa-times-circle me-3"></i>
      </div>
      <div className="manager">
        <div className="mt-4 mb-4   text-start titleSidebar">Selection</div>
        <div id="selectorManager" className="mb-4"></div>
        <div className="mt-4 mb-4   text-start titleSidebar">Configuration</div>
        <div id="traitManager" className="mb-4"></div>
        <div className="mt-4 mb-4   text-start titleSidebar">Style</div>
        <div id="stylepanel"></div>
      </div>

      {/*  <ImgManager editor={getEditor} />
      <DivManager editor={getEditor} />
      <SliderManager editor={getEditor} />
      <Mapmanager editor={getEditor} />
      <ButtonsManager editor={getEditor} />
      <ColoneManager editor={getEditor} /> */}
    </div>
  );
}
