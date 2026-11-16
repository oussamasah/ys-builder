import react from "react";
import ReactDOM from "react-dom/client";
import ModalImage from "./ModalImage";
export default (editor, opts = {}) => {
  const dc = editor.DomComponents;
  dc.addType("IMG", {
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
            command: "imgConfig",
          },
        ],
      },
    },

    view: {
      init({ model }) {
        this.listenTo(model, "active", this.doStuff);
        editor.Commands.add("imgConfig", {
          run(editor, sender) {
            const container = document.getElementById("image-modal");
            if (container) {
              container.remove();
            }
            const modalContainer = document
              .createRange()
              .createContextualFragment(`<div id="image-modal"></div>`);
            document.body.append(modalContainer);
            const root = ReactDOM.createRoot(
              document.getElementById("image-modal")
            );
            root.render(<ModalImage editor={editor} siteId={opts.site} />);
          },
        });
        setTimeout(() => {
          model.view.updateScript();
        }, 3000);
      },
      async doStuff() {
        const container = document.getElementById("image-modal");
        if (container) {
          container.remove();
        }
        const modalContainer = document
          .createRange()
          .createContextualFragment(`<div id="image-modal"></div>`);
        document.body.append(modalContainer);
        const root = ReactDOM.createRoot(modalContainer);

        root.render(<ModalImage editor={editor} siteId={opts.site} />);
      },

      async onRender({ el, model }) {
        // this.model.set("copyable", false);
      },
    },
    isComponent: (el) => {
      if (el.classList && el.classList.contains("img")) {
        return {
          type: "IMG",
        };
      }
    },
  });
};
