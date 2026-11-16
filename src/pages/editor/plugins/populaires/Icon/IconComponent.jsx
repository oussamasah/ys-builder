import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import ReactDOM from "react-dom/client";
import ModalIcon from "./ModalIcon";
export default (editor, opts = {}) => {
  const dc = editor.DomComponents;
  dc.addType("IconType", {
    model: {
      defaults: {
        activeOnRender: 1,
        toolbar: [
          // these are the default toolbar elements
          {
            attributes: { class: "fa fa-arrow-up" },
            command: "select-parent",
          },
          {
            attributes: { class: "fa fa-arrows" },
            command: "tlb-move",
          },
          {
            attributes: { class: "fa fa-clone" },
            command: "tlb-clone",
          },
          {
            attributes: { class: "fa fa-trash" },
            command: "tlb-delete",
          },
          // this is my new toolbar element with my custom command
          {
            attributes: { class: "fa fa-gear" },
            command: "iconConfig",
          },
        ],
      },
    },

    view: {
      init({ model }) {
        this.listenTo(model, "active", this.doStuff);
        editor.Commands.add("iconConfig", {
          run(editor, sender) {
            const container = document.getElementById("icon-modal");
            if (container) {
              container.remove();
            }
            const modalContainer = document
              .createRange()
              .createContextualFragment(`<div id="icon-modal"></div>`);
            document.body.append(modalContainer);
            const root = ReactDOM.createRoot(
              document.getElementById("icon-modal")
            );
            root.render(<ModalIcon editor={editor} siteId={opts.site} />);
          },
        });
        setTimeout(() => {
          model.view.updateScript();
        }, 3000);
      },
      async doStuff() {
        const container = document.getElementById("icon-modal");
        if (container) {
          container.remove();
        }
        const modalContainer = document
          .createRange()
          .createContextualFragment(`<div id="icon-modal"></div>`);
        document.body.append(modalContainer);
        const root = ReactDOM.createRoot(modalContainer);

        root.render(<ModalIcon editor={editor} siteId={opts.site} />);
      },

      async onRender({ el, model }) {
        // this.model.set("copyable", false);
      },
    },
    isComponent: (el) => {
      if (el.classList && el.classList.contains("icon-gjs")) {
        return {
          type: "IconType"
        };
      }
    },
  });
};
