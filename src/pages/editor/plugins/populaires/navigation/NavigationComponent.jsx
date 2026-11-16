import axios from "axios";

import { v4 as uuidv4 } from "uuid";
import react from "react";
import ReactDOM from "react-dom/client";
import ModalNavigation from "./ModalNavigation";
const requestCache = {};
export default (editor, opts = {}) => {
  const dc = editor.DomComponents;
  const defaultType = dc.getType("default");
  const defaultView = defaultType.view;
  const { Modal } = editor;
  dc.addType("Navigation", {
    model: {
      defaults: {
        activeOnRender: 1,
        components: `<nav class="gjs-nav d-flex justify-content-center align-items-center"></nav>`,
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
            command: "navigationConfig",
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
        editor.Commands.add("navigationConfig", {
          run(editor, sender, model) {
            let cmp = editor.getSelected();
            if (!cmp.getClasses().includes("gjs-navigation")) {
              do {
                cmp = cmp.parent();
              } while (!cmp.getClasses().includes("gjs-navigation"));
            }
            editor.select(cmp);
            const container = document.getElementById("navigation-modal");
            if (container) {
              container.remove();
            }
            const modalContainer = document
              .createRange()
              .createContextualFragment(`<div id="navigation-modal"></div>`);
            document.body.append(modalContainer);
            const root = ReactDOM.createRoot(
              document.getElementById("navigation-modal")
            );
            root.render(
              <ModalNavigation
                editor={editor}
                component={cmp}
                siteId={opts.site}
              />
            );

            editor.select(cmp);
          },
        });
        this.listenTo(model, "active", this.doStuff);
      },
      async doStuff() {
        /*         const container = document.getElementById("navigation-modal");
        if (container) {
          container.remove();
        }
        const modalContainer = document
          .createRange()
          .createContextualFragment(`<div id="navigation-modal"></div>`);
        document.body.append(modalContainer);
        const root = ReactDOM.createRoot(
          document.getElementById("navigation-modal")
        );

        setTimeout(() => {
          root.render(
            <ModalNavigation
              editor={editor}
              component={this.model}
              siteId={opts.site}
            />
          );
        }, 500); */
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

        console.log("render navvvvvvvvvvvvvvvvvvvvvvvvvv")
        let attr = this.model.getAttributes();
        const getMenu = async () => {

         return await axios
            .get(
              `${process.env.REACT_APP_API_URL}/pages/getmenu/${opts.site}/${attr["data-model"]}`
            )
            .then((response) => { return response.data.menu; })
            .catch((error) => {
              console.error("Error fetching menu:", error);
              throw error;
            })
            .finally(() => {
              //delete requestCache[attr["data-model"]];
            });
        }
        try {

          const menu = await getMenu();
          console.log(menu)
          let nav = this.model.components().find(component => component.get('classes').some(c => c.get('name') === 'gjs-nav'))

          console.log(nav)
          nav.components(menu);
          let children = this.model.view.getAllChildComponents(this.model);

          children.map((c) => {
            if (!c.getClasses().includes("gjs-navigation")) {
              c.set("draggable", false);
              c.set("removable", false);
              c.set("copyable", false);
              c.set("resizable", false);
              c.set("droppable", false);
              c.set("editable", false);
              c.set("selectable", false);
              c.set("toolbar", [
                {
                  attributes: { class: "fa fa-arrow-up" },
                  command: "select-parent",
                },
                {
                  attributes: { class: "fa fa-gear" },
                  command: "navigationConfig",
                },
              ]);
            }
          });
        } catch (error) {
          console.error("Error rendering menu:", error);
        }
      },
    },
    isComponent: (el) => {
      if (el.classList && el.classList.contains("gjs-navigation")) {

        return {
          type: "Navigation",
        };
      }
    },
  });
};
