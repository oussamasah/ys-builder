import React, { useEffect, useState } from "react";
import "./Slider.css";
import slider1 from "../../../../assets/imgSliders/slider1.svg";
import slider2 from "../../../../assets/imgSliders/slider2.svg";
import slider3 from "../../../../assets/imgSliders/slider3.svg";
import slider4 from "../../../../assets/imgSliders/slider4.png";

export default function Slider(props) {
  useEffect(() => {
    if (props) {
      const container = document.getElementById("widgetsPanel");
      container.innerHTML = "";
      const blockManager = props.editor().Blocks;
      const blocks = blockManager.getAll();
      const filtered = blocks.filter((block) => {
        return block.get("category").id == "slider";
      });
      const newBlocksEl = blockManager.render(filtered, { external: true });

      container.append(newBlocksEl);
    }
  }, [props]);

  return (
    <div
      className="Slider"
      id="widgetsPanel"
      onDragStartCapture={(e) =>
        setTimeout(() => {
          props.close();
        }, 300)
      }
    ></div>
  );
}
