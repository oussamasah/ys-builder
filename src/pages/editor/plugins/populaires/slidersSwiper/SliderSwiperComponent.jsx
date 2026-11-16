/* eslint-disable no-undef */
/* eslint-disable import/no-anonymous-default-export */

import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import react from "react";
import ReactDOM from "react-dom/client";
import ModalsliderSwiper from "./ModalsliderSwiper";

export default (editor, opts = {}) => {
  const dc = editor.DomComponents;
  const defaultType = dc.getType("default");
  const defaultView = defaultType.view;
  const { Modal } = editor;

  dc.addType("swiperSlide", {
    extend: "text",
    model: {
      defaults: {
        contentEditable: true,
        traits: [
          {
            type: "button",
            label: "Slider d'images ",
            name: "add",
            full: true,
            attributes: { style: "flex-grow: 0 " },
            text: "Modifier",
            command: (editor) => {
              const container = document.getElementById("swiper-modal");
              if (container) {
                container.remove();
              }
              const modalContainer = document
                .createRange()
                .createContextualFragment(`<div id="swiper-modal"></div>`);
              document.body.append(modalContainer);
              const root = ReactDOM.createRoot(
                document.getElementById("swiper-modal")
              );
              root.render(
                <ModalsliderSwiper editor={editor} siteId={opts.site} />
              );
            },
          },
        ],
      },
      init() {},
    },

    view: {
      init({ el, model }) {
        editor.Commands.add("selectSwiper", (editor) => {
          editor.select(model);
        });
        let dc = editor.DomComponents.getComponents();
        var parentId = model.getAttributes().id;

        var children = dc.map(function (component) {
          return component.parent().id === parentId;
        });

      },
    },
    isComponent: (el) => {
      if (el.classList && el.classList.contains("swiper")) {
        return {
          type: "swiperSlide",
        };
      }
    },
  });
};
