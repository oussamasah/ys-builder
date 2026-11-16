/* eslint-disable no-undef */
/* eslint-disable import/no-anonymous-default-export */

import react from "react";
import ReactDOM from "react-dom/client";
import ModalResauSocial from "./ModalResauSocial";
export default (editor, opts = {}) => {
  const dc = editor.DomComponents;
  const defaultType = dc.getType("default");
  const defaultView = defaultType.view;
  const { Modal } = editor;

  dc.addType("Social", {
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
            command: "socialConfig",
          },
        ],
        /* __symbol: "if5s0j", */
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
        editor.Commands.add("socialConfig", {
          run(editor, sender, model) {
            let cmp = editor.getSelected();
            if (!cmp.getClasses().includes("social-gjs")) {
              cmp = cmp.parent();
              editor.select(cmp);
            }

            const container = document.getElementById("social-modal");
            if (container) {
              container.remove();
            }
            const modalContainer = document
              .createRange()
              .createContextualFragment(`<div id="social-modal"></div>`);
            document.body.append(modalContainer);
            const root = ReactDOM.createRoot(
              document.getElementById("social-modal")
            );
            root.render(
              <ModalResauSocial
                editor={editor}
                component={cmp}
                siteId={opts.site}
              />
            );
          },
        });
        this.listenTo(model, "active", this.doStuff);
      },

      async doStuff() {
        const container = document.getElementById("social-modal");
      },
      getAllClassesAndIDs(component) {
        let arrCss = [];
        const allRules = editor.Css.getRules();
        function getAllUsedCSS(component) {
          allRules.map((r) => {
            const originRule = r.toCSS();
            const id = component.getAttributes().id;
            const classes = component.getClasses();
            classes.map((x) => {
              if (originRule.startsWith(`.${x}`)) {
                if (arrCss.includes(originRule) == false) {
                  arrCss.push(originRule);
                }
              } else if (originRule.startsWith(`@media`)) {
                if (originRule.indexOf(`.${x}`) > -1) {
                  if (arrCss.includes(originRule) == false) {
                    arrCss.push(originRule);
                  }
                }
              }
            });

            if (originRule.startsWith(`#${id}`)) {
              if (arrCss.includes(originRule) == false) {
                arrCss.push(originRule);
              }
            } else if (originRule.startsWith(`@media`)) {
              if (originRule.indexOf(`#${id}`) > -1) {
                if (arrCss.includes(originRule) == false) {
                  arrCss.push(originRule);
                }
              }
            }
          });
          if (component.components()) {
            component.components().forEach(getAllUsedCSS);
          }
        }
        getAllUsedCSS(component);

        return arrCss;
      },

      async onRender({ el, model }) {
        editor.on("component:clone", (model) => {
          if (model.get("type") == "Social") {
            let cmp = editor.getSelected();
            let attr = cmp.getAttributes();
            let newattr = model.getAttributes();
            let items = newattr["data-items"];
            let config = newattr["data-config"];
            let configSize = newattr["data-icon-size"];
            let configcolor = newattr["data-icon-color"];
            let configbg = newattr["data-social-bg"];

            const css = this.getAllClassesAndIDs(cmp);
            let filteredArray = css.filter((str) => str !== "");
            let cssstring = filteredArray.join(" ");

            cssstring = cssstring.replaceAll(
              `#${attr.id}`,
              `#${model.getAttributes().id}`
            );
            editor.Css.addRules(cssstring);

            newattr["data-items"] = items;
            newattr["data-config"] = config;
            newattr["data-icon-size"] = configSize;
            newattr["data-icon-color"] = configcolor;
            newattr["data-social-bg"] = configbg;

            model.setAttributes(newattr);
          }
        });
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
              command: "socialConfig",
            },
          ]);
        });
      },
    },
    isComponent: (el) => {
      if (el.classList && el.classList.contains("social-gjs")) {
        return {
          type: "Social",
        };
      }
    },
  });
};
