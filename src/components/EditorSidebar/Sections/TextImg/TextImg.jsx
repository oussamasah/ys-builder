import React, { useEffect } from "react";
import "./TextImg.css";
import blocimg1 from "../../../../assets/imgTextImg/blocimg1.png";
import blocimg2 from "../../../../assets/imgTextImg/blocimg2.png";
import blocimg3 from "../../../../assets/imgTextImg/blocimg3.png";
import blocimg4 from "../../../../assets/imgTextImg/blocimg4.png";
import blocimg5 from "../../../../assets/imgTextImg/blocimg5.png";
import blocimg6 from "../../../../assets/imgTextImg/blocimg6.png";
export default function TextImg(props) {
  useEffect(() => {
    if (props) {
      const container = document.getElementById("widgetsPanel");
      container.innerHTML = "";
      const blockManager = props.editor().Blocks;
      const blocks = blockManager.getAll();
      const filtered = blocks.filter(
        (block) => block.get("category").id == "images_et_texte"
      );
      const newBlocksEl = blockManager.render(filtered, { external: true });
      container.append(newBlocksEl);
    }
  }, [props]);
  return (
    <div
      className="TextImg"
      id="widgetsPanel"
      onDragStartCapture={(e) =>
        setTimeout(() => {
          props.close();
        }, 300)
      }
    ></div>
  );
}
