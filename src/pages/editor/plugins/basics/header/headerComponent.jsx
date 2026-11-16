import axios from "axios";

import { v4 as uuidv4 } from "uuid";
import react from "react";
import ReactDOM from "react-dom/client";
import ModalHeader from "./ModalHeader";
import ModalSidebar from "./ModalSidebar";

export default (editor, opts = {}) => {
  const dc = editor.DomComponents;
  const defaultType = dc.getType("default");
  const defaultView = defaultType.view;
  const { Modal } = editor;
  dc.addType("Header", {
    model: {
      defaults: {
        activeOnRender: 1,
        toolbar: [
          // these are the default toolbar elements
          {
            attributes: { class: "fa fa-arrow-up" },
            command: "select-parent",
          },
          // this is my new toolbar element with my custom command
          {
            attributes: { class: "fa fa-gear" },
            command: "headerConfig",
          },
        ],
      },
      init() {
        this.set("draggable", false);
        this.set("removable", false);
        this.set("copyable", false);
        this.set("droppable", true);
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
        editor.Commands.add("headerConfig", {
          run(editor, sender, model) {
            let cmp = editor.getSelected();
            if (!cmp.getEl().tagName == "HEADER") {
              do {
                cmp = cmp.parent();
              } while (!cmp.getEl().tagName == "HEADER");
            }
            editor.select(cmp);

            const container = document.getElementById("header-modal");
            if (container) {
              container.remove();
            }
            const modalContainer = document
              .createRange()
              .createContextualFragment(`<div id="header-modal"></div>`);
            document.body.append(modalContainer);
            const root = ReactDOM.createRoot(
              document.getElementById("header-modal")
            );
            root.render(
              <ModalHeader editor={editor} component={cmp} siteId={opts.site} />
            );

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

      async onRender({ el, model }) {},
    },
    isComponent: (el) => {
      if (el && el.tagName == "HEADER") {
        return {
          type: "Header",
        };
      }
    },
  });
  dc.addType("Sidebar", {
    model: {
      defaults: {
        activeOnRender: 1,
        toolbar: [
          // these are the default toolbar elements
          {
            attributes: { class: "fa fa-arrow-up" },
            command: "select-parent",
          },
          // this is my new toolbar element with my custom command
          {
            attributes: { class: "fa fa-gear" },
            command: "sidebarConfig",
          },
        ],
      },
      init() {
        this.set("draggable", false);
        this.set("removable", false);
        this.set("copyable", false);
        this.set("droppable", true);
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
        editor.Commands.add("sidebarConfig", {
          run(editor, sender, model) {
            let cmp = editor.getSelected();
            if (!cmp.getClasses().includes("sidebar-menu")) {
              do {
                cmp = cmp.parent();
              } while (!cmp.getEl().tagName == "sidebar-menu");
            }
            editor.select(cmp);

            const container = document.getElementById("sidebar-modal");
            if (container) {
              container.remove();
            }
            const modalContainer = document
              .createRange()
              .createContextualFragment(`<div id="sidebar-modal"></div>`);
            document.body.append(modalContainer);
            const root = ReactDOM.createRoot(
              document.getElementById("sidebar-modal")
            );
            root.render(
              <ModalSidebar
                editor={editor}
                component={cmp}
                siteId={opts.site}
              />
            );

            editor.select(cmp);
            let cls = cmp.getClasses();
            cls.push("active");
            cmp.setClass(cls);
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
        let cls = model.getClasses();

        model.setClass(cls.filter((x) => x !== "active"));
      },
    },
    isComponent: (el) => {
      if (el.classList && el.classList.contains("sidebar-menu")) {
        return {
          type: "Sidebar",
        };
      }
    },
  });
  dc.addType("SidebarMenuButton", {
    model: {
      defaults: {
        activeOnRender: 1,
        toolbar: [
          // these are the default toolbar elements
          {
            attributes: { class: "fa fa-arrow-up" },
            command: "select-parent",
          },
          // this is my new toolbar element with my custom command
          {
            attributes: { class: "fa fa-gear" },
            command: "headerConfig",
          },
        ],
      },
      init() {
        this.set("draggable", false);
        this.set("removable", false);
        this.set("copyable", false);
        this.set("droppable", false);
        this.set("selectable", false);
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
              command: "headerConfig",
            },
          ]);
        });
      },
    },
    isComponent: (el) => {
      if (el.classList && el.classList.contains("sidebar-menu-toggle")) {
        return {
          type: "SidebarMenuButton",
        };
      }
    },
  });
  dc.addType("SidebarMenuButtonClose", {
    model: {
      defaults: {
        activeOnRender: 1,
        toolbar: [
          // these are the default toolbar elements
          {
            attributes: { class: "fa fa-arrow-up" },
            command: "select-parent",
          },
          // this is my new toolbar element with my custom command
          {
            attributes: { class: "fa fa-gear" },
            command: "sidebarConfig",
          },
        ],
      },
      init() {
        this.set("draggable", false);
        this.set("removable", false);
        this.set("copyable", false);
        this.set("droppable", false);
        this.set("selectable", false);
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
              command: "sidebarConfig",
            },
          ]);
        });
      },
    },
    isComponent: (el) => {
      if (el.classList && el.classList.contains("sidebar-menu-close")) {
        return {
          type: "SidebarMenuButtonClose",
        };
      }
    },
  });
};
