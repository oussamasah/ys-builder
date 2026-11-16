import React, { useEffect } from "react";
import "./Social.css";

export default function Social(props) {
  useEffect(() => {
    if (props) {
      const container = document.getElementById("widgetsPanel");
      container.innerHTML = "";
      const blockManager = props.editor().Blocks;
      const blocks = blockManager.getAll();
      const filtered = blocks.filter((block) => {
        return block.get("category").id == "socialType";
      });
      const newBlocksEl = blockManager.render(filtered, { external: true });
      container.append(newBlocksEl);
    }
  }, [props]);
  return (
    <div
      className="Social"
      id="widgetsPanel"
      onDragStartCapture={(e) =>
        setTimeout(() => {
          props.close();
        }, 300)
      }
    ></div>
  );
}
