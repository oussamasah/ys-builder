import React, { useEffect, useState } from "react";
import { Collapse, Modal, ModalDialog } from "react-bootstrap";
import Draggable from "react-draggable";
import Nestable from "react-nestable";
import "./Modaltextblog.css";
import { v4 as uuidv4 } from "uuid";
import TextStylingComponent from "../../../compoments/TextStyling/TextStylingComponent";

class DraggableModalDialog extends React.Component {
  render() {
    return (
      <Draggable handle=".handleDrag">
        <ModalDialog {...this.props} />
      </Draggable>
    );
  }
}
export default function Modaltextblog(props) {
  const [confugText, setConfigText] = useState({
    font: "",
    variant: "normal",
    color: "#ffffff",
    align: "left",
    size: { desktop: "16", tablet: "16", mobile: "16" },
  });
  const [show, setShow] = useState(true);

  const [selectedValue, setSelectedValue] = useState("title");


  const changeTextConfig = (e) => {
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    attr["data-font"] = e.font;
    attr["data-variant"] = e.variant;
    attr["data-size"] = JSON.stringify(e.size);
    attr["data-color"] = e.color;
    attr["data-align"] = e.align;
    cmp.setAttributes(attr);
    let target="h1"
    switch (selectedValue) {
      case "title":
        target="h1"
        break;
    
      default:
        target="p"

        break;
    }
    props.editor.Css.setRule(`#${attr.id} > *`, {
      "font-family": e.font,
      color: e.color,
      "text-align": e.align,
      "font-weight": e.variant,
      "font-size": e.size.desktop + "px",
      "line-height": e.size.desktop + "px",
    });
    props.editor.Css.setRule(
      `#${attr.id} > *`,
      {
        "font-size": `${e.size.tablet}px`,
        "line-height": `${e.size.tablet}px`,
      },
      {
        atRuleType: "media",
        atRuleParams: "(min-width: 768px) and (max-width:991px)",
      }
    );
    props.editor.Css.setRule(
      `#${attr.id} > *`,
      {
        "font-size": `${e.size.mobile}px`,
        "line-height": `${e.size.mobile}px`,
      },
      {
        atRuleType: "media",
        atRuleParams: "(max-width:767px)",
      }
    );
    setConfigText(e);
  };
 
  const handleClose = () => {
    setShow(false);
  };

  useEffect(() => {
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    setSelectedValue(attr['data-target']);
 
    const config = {
      font: attr["data-font"] ? attr["data-font"] : "",
      variant: attr["data-variant"]
        ? attr["data-variant"]
        : "normal",
      size: attr["data-size"]
        ? JSON.parse(attr["data-size"])
        : { desktop: "16", tablet: "16", mobile: "16" },

      color: attr["data-color"] ? attr["data-color"] : "#000000",
      align: attr["data-align"] ? attr["data-align"] : "left",
    };
    setConfigText(config);
  }, []);
  const handleStructureAppend = (selectedValue) => {
    setSelectedValue(selectedValue)
    let structure = `<h1>${selectedValue}</h1>`;
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();

    switch (selectedValue) {
      case "title":
     structure = `<h1>${selectedValue}</h1>`;
        
        break;    
      default:
        structure = `<p>${selectedValue}</p>`;
        break;
    }
    // Create your structure based on the selected value

    attr["data-target"]=selectedValue
    cmp.setAttributes(attr)
    cmp.components(structure);
    cmp.view.render()
  };
  useEffect(() => {
   
  }, [selectedValue]);

  return (
    <div id="modalgallery">
      <Modal
        dialogAs={DraggableModalDialog}
        show={show}
        backdrop="static"
        onHide={handleClose}
        id="ModalFormulaire"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className="handleDrag">
          <Modal.Title>
            <nav>
              <div class="nav nav-tabs" id="nav-tab" role="tablist">
                <button
                  className="nav-link tt active"
                  id="nav-contenu-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-contenu"
                  type="button"
                  role="tab"
                  aria-controls="nav-contenu"
                  aria-selected="true"
                >
                  Contenu
                </button>
                {<button
                  className="nav-link tt"
                  id="nav-desgine-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-desgine"
                  type="button"
                  role="tab"
                  aria-controls="nav-desgine"
                  aria-selected="false"
                >
                  Desgin
                </button> }
              </div>
            </nav>
          </Modal.Title>
          <div className="btns-action">
            <button
              type="button"
              className="btn-closes"
              aria-label="Close"
              onClick={handleClose}
            >
              {" "}
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div class="tab-content" id="nav-tabContent">
            <div
              class="tab-pane fade show active"
              id="nav-contenu"
              role="tabpanel"
              aria-labelledby="nav-contenu-tab"
              tabindex="0"
            >
              <span className="title-popups">
                Connecter
              </span>

              <div className="structmodals">
                <div class="mb-3 p-3">
                  <span>
                    En connectant les données, vous activez une synchronisation
                    automatique entre ce widget et la bibliothèque de contenu.
                  </span>
                </div>
                <div class="mb-3 p-3">
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    onChange={(e) => handleStructureAppend(e.target.value)}
                  >
                    <option selected disabled>
                      Choose an option
                    </option>
                    <option value="title">Titre</option>
                    <option value="created_date">Creér date</option>
                    <option value="resume">Résume</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div
              class="tab-pane fade show active"
              id="nav-desgine"
              role="tabpanel"
              aria-labelledby="nav-desgine-tab"
              tabindex="0"
            >
                                       <TextStylingComponent
                              key={"post-element"}
                              for={"post-element"}
                              editor={props.editor}
                              siteId={props.siteId}
                              config={confugText}
                              setConfig={changeTextConfig}
                            />
            </div>
            
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
