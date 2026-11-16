import axios from "axios";

import { v4 as uuidv4 } from "uuid";
import react from "react";
import ReactDOM from "react-dom/client";
import ModalNavigation from "./ModalButton";
import ModalButton from "./ModalButton";

export default (editor, opts = {}) => {
  const dc = editor.DomComponents;
  const defaultType = dc.getType("default");
  const defaultView = defaultType.view;
  const { Modal } = editor;
  dc.addType("Button", {
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
            command: "buttonConfig",
          },
        ],
      },
      init() {
        this.set("draggable", true);
        this.set("removable", true);
        this.set("copyable", true);
        this.set("droppable", false);
        this.set("selectable", true);
      },
    },
    view: {
      getAllChildComponents(component) {
        const children = [];

        // Iterate through the children of the component
        component.components().each((childComponent) => {
          children.push(childComponent);

          // Recursively get children of the child component
          const nestedChildren =
            this.model.view.getAllChildComponents(childComponent);
          children.push(...nestedChildren);
        });

        return children;
      },
      init({ el, model }) {
        editor.Commands.add("buttonConfig", {
          run(editor, sender, model) {
            let cmp = editor.getSelected();

            const container = document.getElementById("button-modal");
            if (container) {
              container.remove();
            }
            const modalContainer = document
              .createRange()
              .createContextualFragment(`<div id="button-modal"></div>`);
            document.body.append(modalContainer);
            const root = ReactDOM.createRoot(
              document.getElementById("button-modal")
            );

            root.render(
              <ModalButton
                key="btnconfig"
                editor={editor}
                component={cmp}
                siteId={opts.site}
              />
            );
            let cssStyles = editor.getCss();
            console.log(cssStyles);
            editor.select(cmp);
          },
        });
        this.listenTo(model, "active", this.doStuff);
      },
      async doStuff() {
        /*         const container = document.getElementById("button-modal");
        if (container) {
          container.remove();
        }
        const modalContainer = document
          .createRange()
          .createContextualFragment(`<div id="button-modal"></div>`);
        document.body.append(modalContainer);
        const root = ReactDOM.createRoot(
          document.getElementById("button-modal")
        );

        setTimeout(() => {
          root.render(
            <ModalButton
              editor={editor}
              component={this.model}
              siteId={opts.site}
            />
          );
        }, 500); */
      },

      async onRender({ el, model }) {
        let children = this.model.view.getAllChildComponents(this.model);
        children.map((c) => {
          c.set("draggable", true);
          c.set("removable", true);
          c.set("copyable", true);
          c.set("resizable", false);
          c.set("droppable", false);
          c.set("editable", false);
          c.set("selectable", true);
          c.set("toolbar", [
            {
              attributes: { class: "fa fa-gear" },
              command: "buttonConfig",
            },
          ]);
        });
      },
    },
    isComponent: (el) => {
      if (el.classList && el.classList.contains("gjs-btn")) {
        return {
          type: "Button",
        };
      }
    },
  });
};
