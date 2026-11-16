import React, { useEffect } from "react";
import "./TemplateVide.css";
import section1 from "../../../../assets/imgTemplateVide/section1.svg";
import section2 from "../../../../assets/imgTemplateVide/section2.svg";
import section3 from "../../../../assets/imgTemplateVide/section3.svg";
import section4 from "../../../../assets/imgTemplateVide/section4.svg";
function TemplateVide(props) {
  useEffect(() => {
    if (props) {
      const container = document.getElementById("widgetsPanel");
      container.innerHTML = "";
      const blockManager = props.editor().Blocks;
      const blocks = blockManager.getAll();
      const filtered = blocks.filter((block) => {
        return block.get("category").id == "vide";
      });
      const newBlocksEl = blockManager.render(filtered, { external: true });
      container.append(newBlocksEl);
    }
  }, [props]);
  return (
    <div
      className="TemplateVide"
      id="widgetsPanel"
      onDragStartCapture={(e) =>
        setTimeout(() => {
          props.close();
        }, 300)
      }
    ></div>
  );
}

export default TemplateVide;
