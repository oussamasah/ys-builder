/* eslint-disable no-undef */
/* eslint-disable import/no-anonymous-default-export */

import react from "react";
import ReactDOM from "react-dom/client";
import ModalForme from "./ModalForme";
import { v4 as uuidv4 } from "uuid";
export default (editor, opts = {}) => {
  const dc = editor.DomComponents;
  const defaultType = dc.getType("default");
  const defaultView = defaultType.view;
  
  const { Modal } = editor;

  dc.addType("FormeContainer", {
    extend:defaultView,
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
            command: "formeConfig",
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
        editor.Commands.add("formeConfig", {
          run(editor, sender, model) {

            let cmp = editor.getSelected();
            if (!cmp.getClasses().includes("gjs-forme")) {
              do {
                cmp = cmp.parent();
              } while (!cmp.getClasses().includes("gjs-forme"));
            }
              editor.select(cmp)

            const container = document.getElementById("forme-modal");
            if (container) {
              container.remove();
            }
            const modalContainer = document
              .createRange()
              .createContextualFragment(`<div id="forme-modal"></div>`);
            document.body.append(modalContainer);
            const root = ReactDOM.createRoot(
              document.getElementById("forme-modal")
            );
            root.render(
              <ModalForme key={'forme-'+uuidv4()} editor={editor} component={cmp} siteId={opts.site} />
            );
          },
        });
        this.listenTo(model, "active", this.doStuff);
      },

      async doStuff() {
        let cmp = editor.getSelected();
        const container = document.getElementById("forme-modal");
        if (container) {
          container.remove();
        }
        const modalContainer = document
          .createRange()
          .createContextualFragment(`<div id="forme-modal"></div>`);
        document.body.append(modalContainer);
        const root = ReactDOM.createRoot(modalContainer);

        root.render(<ModalForme key={'forme-'+uuidv4()} editor={editor} component={cmp} siteId={opts.site} />);
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
        // editor.on("component:clone", (model) => {
        //   if (model.get("type") == "Forme") {
        //     let cmp = editor.getSelected();
        //     let attr = cmp.getAttributes();
        //     let newattr = model.getAttributes();
        //     let items = newattr["data-items"];
        //     let config = newattr["data-config"];
        //     let configSize = newattr["data-icon-size"];
        //     let configcolor = newattr["data-icon-color"];

        //     const css = this.getAllClassesAndIDs(cmp);
        //     let filteredArray = css.filter((str) => str !== "");
        //     let cssstring = filteredArray.join(" ");

        //     cssstring = cssstring.replaceAll(
        //       `#${attr.id}`,
        //       `#${model.getAttributes().id}`
        //     );
        //     editor.Css.addRules(cssstring);

        //     newattr["data-items"] = items;
        //     newattr["data-config"] = config;
        //     newattr["data-icon-size"] = configSize;
        //     newattr["data-icon-color"] = configcolor;

        //     model.setAttributes(newattr);
        //   }
        // });
        let children = this.model.view.getAllChildComponents(this.model);
        children.map((c) => {
          c.set("draggable", true);
          c.set("removable", true);
          c.set("copyable", true);
          c.set("resizable", false);
          c.set("droppable", false);
          c.set("editable", true);
          c.set("selectable", true);
          c.set("toolbar", [
            {
              attributes: { class: "fa fa-gear" },
              command: "formeConfig",
            },
          ]);
        });
      },
    },
    isComponent: (el) => {
      if (el.classList && el.classList.contains("gjs-forme")) {     
        return {
          type: "FormeContainer",
        };
      }
    },
  });
};
