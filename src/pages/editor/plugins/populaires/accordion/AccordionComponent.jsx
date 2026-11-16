/* eslint-disable no-undef */
/* eslint-disable import/no-anonymous-default-export */

import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import ReactDOM from "react-dom/client";
import ModalAccordion from "./ModalAccordion";
export default (editor, opts = {}) => {
  const dc = editor.DomComponents;
  const defaultType = dc.getType("default");
  const defaultView = defaultType.view;
  const { Modal } = editor;

  dc.addType("Accordion", {
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
            command: "accordionConfig",
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
        editor.Commands.add("accordionConfig", {
          run(editor, sender, model) {
            let cmp = editor.getSelected();
            if (!cmp.getClasses().includes("accordion")) {
              do {
                cmp = cmp.parent();
              } while (!cmp.getClasses().includes("accordion"));
            }

            const container = document.getElementById("accordion-modal");
            if (container) {
              container.remove();
            }
            const modalContainer = document
              .createRange()
              .createContextualFragment(`<div id="accordion-modal"></div>`);
            document.body.append(modalContainer);
            const root = ReactDOM.createRoot(
              document.getElementById("accordion-modal")
            );
            root.render(
              <ModalAccordion
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
        const container = document.getElementById("accordion-modal");
        if (container) {
          container.remove();
        }
        const modalContainer = document
          .createRange()
          .createContextualFragment(`<div id="accordion-modal"></div>`);
        document.body.append(modalContainer);
        const root = ReactDOM.createRoot(
          document.getElementById("accordion-modal")
        );

        setTimeout(() => {
          root.render(
            <ModalAccordion
              editor={editor}
              component={this.model}
              siteId={opts.site}
            />
          );
        }, 500);
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
          if (model.get("type") == "Accordion") {
            let cmp = editor.getSelected();
            let attr = cmp.getAttributes();
            let newattr = model.getAttributes();
            let items = newattr["data-items"];
            items = JSON.parse(items);

            const css = this.getAllClassesAndIDs(cmp);
            let filteredArray = css.filter((str) => str !== "");
            let cssstring = filteredArray.join(" ");

            cssstring = cssstring.replaceAll(
              `#${attr.id}`,
              `#${model.ccid}`
            );
            // console.log(cssstring)
            editor.Css.addRules(cssstring);

            model.components().forEach((cmpParent) => {
              if (cmpParent.getClasses().includes("accordionss")) {
                cmpParent.components().forEach((item, i) => {
                  let btn = item.components().models[0].components().models[0];
                  let body = item.components().models[1];
                  let btnAttr = btn.getAttributes();
                  let bodyAttr = body.getAttributes();
                  btnAttr["data-bs-target"] = `#${body.ccid}`;
                  btnAttr["aria-controls"] = `${body.ccid}`;
                  items[i]["id"] = `${body.ccid}`;
                  bodyAttr["data-bs-parent"] = `#${newattr.id}`;
                  bodyAttr["id"] = `${body.ccid}`;
                  btn.setAttributes(btnAttr);
                  body.setAttributes(bodyAttr);
                });
              }
            });
            newattr["data-items"] = JSON.stringify(items);
            model.setAttributes(newattr);
          }
        });
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
              command: "accordionConfig",
            },
          ]);
        });
      },
    },
    isComponent: (el) => {
      if (el.classList && el.classList.contains("accordion")) {
        return {
          type: "Accordion",
        };
      }
    },
  });
};
