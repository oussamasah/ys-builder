/* eslint-disable no-undef */
/* eslint-disable import/no-anonymous-default-export */

import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import ReactDOM from "react-dom/client";
import ModalTab from "./ModalTab";
export default (editor, opts = {}) => {
  const dc = editor.DomComponents;
  const defaultType = dc.getType("default");
  const defaultView = defaultType.view;
  const { Modal } = editor;

  dc.addType("Tabs", {
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
            command: "TabConfig",
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
      async remove() {},
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
        editor.Commands.add("TabConfig", {
          run(editor, sender, model) {
            let cmp = editor.getSelected();
            if (!cmp.getClasses().includes("gjs-tab")) {
              do {
                cmp = cmp.parent();
              } while (!cmp.getClasses().includes("gjs-tab"));
            }

            const container = document.getElementById("Tab-modal");
            if (container) {
              container.remove();
            }
            const modalContainer = document
              .createRange()
              .createContextualFragment(`<div id="Tab-modal"></div>`);
            document.body.append(modalContainer);
            const root = ReactDOM.createRoot(
              document.getElementById("Tab-modal")
            );
            root.render(
              <ModalTab editor={editor} component={cmp} siteId={opts.site} />
            );

            editor.select(cmp);
          },
        });
        this.listenTo(model, "active", this.doStuff);
      },
      async doStuff() {
        const container = document.getElementById("Tab-modal");
        if (container) {
          container.remove();
        }
        const modalContainer = document
          .createRange()
          .createContextualFragment(`<div id="Tab-modal"></div>`);
        document.body.append(modalContainer);
        const root = ReactDOM.createRoot(document.getElementById("Tab-modal"));

        setTimeout(() => {
          root.render(
            <ModalTab
              editor={editor}
              component={this.model}
              siteId={opts.site}
            />
          );
        }, 500);
      },

      async onRender({ el, model }) {
        let children = this.model.view.getAllChildComponents(this.model);
        children.map((c) => {
          if (!c.getClasses().includes("btn")) {
            c.set("draggable", false);
            c.set("removable", false);
            c.set("copyable", false);
            c.set("resizable", false);
            c.set("droppable", false);
            c.set("editable", false);
            c.set("selectable", false);
            c.set("toolbar", [
              {
                attributes: { class: "fa fa-gear" },
                command: "TabConfig",
              },
            ]);
          }
        });
        model.set("draggable", true);
        model.set("removable", true);
        model.set("copyable", true);
        model.set("resizable", false);
        model.set("droppable", false);
        model.set("editable", false);
        model.set("selectable", true);
      },
    },
    isComponent: (el) => {
      if (el.classList && el.classList.contains("gjs-tab")) {
        return {
          type: "Tabs",
        };
      }
    },
  });
};
