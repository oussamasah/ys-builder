import axios from "axios";

import { v4 as uuidv4 } from "uuid";
import react from "react";
import ReactDOM from "react-dom/client";
import ModalGallery from "./ModalGallery";

export default (editor, opts = {}) => {
  const dc = editor.DomComponents;
  const defaultType = dc.getType("default");
  const defaultView = defaultType.view;
  const { Modal } = editor;
  dc.addType("Gallery", {
    model: {
      defaults: {
        activeOnRender: 1,
        //styles: `.gjs-gallery { display: none }`,
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
            attributes: { class: "fa fa-trash" },
            command: "tlb-delete",
          },
          {
            attributes: { class: "fa fa-gear" },
            command: "galleryConfig",
          },
        ],
      },
      init() {
        this.set("draggable", true);
        this.set("removable", true);
        this.set("copyable", false);
        this.set("droppable", false);
        this.set("selectable", true);
        this.set("editable", true);
      },
    },
    view: {
      init({ el, model }) {
        this.listenTo(model, "change:activeOnRender", this.doStuff);
        editor.Commands.add("galleryConfig", {
          run(editor, sender, model) {
            let cmp = editor.getSelected();
            if (!cmp.getClasses().includes("gjs-gallery")) {
              do {
                cmp = cmp.parent();
              } while (!cmp.getClasses().includes("gjs-gallery"));
            }
            editor.select(cmp);
            const container = document.getElementById("gallery-modal");
            if (container) {
              container.remove();
            }
            const modalContainer = document
              .createRange()
              .createContextualFragment(`<div id="gallery-modal"></div>`);
            document.body.append(modalContainer);
            const root = ReactDOM.createRoot(
              document.getElementById("gallery-modal")
            );
            root.render(
              <ModalGallery
                editor={editor}
                component={cmp}
                siteId={opts.site}
              />
            );

            editor.select(cmp);
          },
        });
      },
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
      doStuff() {
        const container = document.getElementById("gallery-modal");
        if (container) {
          container.remove();
        }
        const modalContainer = document
          .createRange()
          .createContextualFragment(`<div id="gallery-modal"></div>`);
        document.body.append(modalContainer);
        const root = ReactDOM.createRoot(
          document.getElementById("gallery-modal")
        );

        setTimeout(() => {
          root.render(
            <ModalGallery
              editor={editor}
              component={this.model}
              siteId={opts.site}
            />
          );
        }, 500);
      },
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
      async onRender({ el, model }) {
        let attr = this.model.getAttributes();

        let children = this.model.view.getAllChildComponents(this.model);
        children.map((c) => {
          if (!c.getClasses().includes("gjs-Gallery")) {
            c.set("draggable", false);
            c.set("removable", false);
            c.set("copyable", false);
            c.set("resizable", false);
            c.set("droppable", false);
            c.set("editable", true);
            c.set("selectable", true);
            c.set("toolbar", [
              {
                attributes: { class: "fa fa-arrow-up" },
                command: "select-parent",
              },
              {
                attributes: { class: "fa fa-gear" },
                command: "galleryConfig",
              },
            ]);
          }
        });
      },
    },
    isComponent: (el) => {
      if (el.classList && el.classList.contains("gjs-gallery")) {
        return {
          type: "Gallery",
        };
      }
    },
  });
};
