import React, { useEffect } from "react";
import "./Piedpage.css";

export default function Piedpage(props) {
  useEffect(() => {
    if (props) {
      const container = document.getElementById("widgetsPanel");
      container.innerHTML = "";
      const blockManager = props.editor().Blocks;
      const blocks = blockManager.getAll();
      const filtered = blocks.filter((block) => {
        return block.get("category").id == "pied_de_page";
      });
      const newBlocksEl = blockManager.render(filtered, { external: true });
      container.append(newBlocksEl);
    }
  }, [props]);
  return (
    <div
      className="Piedpage"
      id="widgetsPanel"
      onDragStartCapture={(e) =>
        setTimeout(() => {
          props.close();
        }, 300)
      }
    ></div>
  );
}
