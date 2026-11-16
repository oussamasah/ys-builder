import React, { useEffect, useState } from "react";
import "./BlocText.css";
import bloctext1 from "../../../../assets/imgBlocText/bloctext1.png";
import bloctext2 from "../../../../assets/imgBlocText/bloctext2.png";
import bloctext3 from "../../../../assets/imgBlocText/bloctext3.png";
import bloctext4 from "../../../../assets/imgBlocText/bloctext4.png";

export default function BlocText(props) {
  const b = null;
  const CloseTab = () => {
    props.close();
  };

  useEffect(() => {
    if (props) {
      const container = document.getElementById("widgetsPanel");
      container.innerHTML = "";
      const blockManager = props.editor().Blocks;
      const blocks = blockManager.getAll();
      const filtered = blocks.filter((block) => {
        return block.get("category").id == "blocs_de_texte";
      });
      const newBlocksEl = blockManager.render(filtered, { external: true });
      container.append(newBlocksEl);
    }
  }, [props]);
  return (
    <div
      className="BlocText"
      id="widgetsPanel"
      onDragStartCapture={(e) =>
        setTimeout(() => {
          props.close();
        }, 300)
      }
    ></div>
  );
}
