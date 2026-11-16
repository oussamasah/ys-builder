import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import ReactDOM from "react-dom/client";
import ModalFormulaire from "./ModalFormulaire";
export default (editor, opts = {}) => {
  const dc = editor.DomComponents;
  const defaultType = dc.getType("default");
  const defaultView = defaultType.view;
  const { Modal } = editor;

  dc.addType("FormulaireType", {
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
            command: "formulaireConfig",
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
        editor.Commands.add("formulaireConfig", {
          run(editor, sender, model) {
            let cmp = editor.getSelected();
            if (!cmp.getClasses().includes("formulaire")) {
              do {
                cmp = cmp.parent();
              } while (!cmp.getClasses().includes("formulaire"));
            }

            const container = document.getElementById("formulaire-modal");
            if (container) {
              container.remove();
            }
            const modalContainer = document
              .createRange()
              .createContextualFragment(`<div id="formulaire-modal"></div>`);
            document.body.append(modalContainer);
            const root = ReactDOM.createRoot(
              document.getElementById("formulaire-modal")
            );
            root.render(
              <ModalFormulaire
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
        const container = document.getElementById("formulaire-modal");
        if (container) {
          container.remove();
        }
        const modalContainer = document
          .createRange()
          .createContextualFragment(`<div id="formulaire-modal"></div>`);
        document.body.append(modalContainer);
        const root = ReactDOM.createRoot(
          document.getElementById("formulaire-modal")
        );

        setTimeout(() => {
          root.render(
            <ModalFormulaire
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
          if (model.get("type") == "FormulaireType") {
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
              `#${model.getAttributes().id}`
            );
            editor.Css.addRules(cssstring);

            model.components().forEach((cmpParent) => {
              if (cmpParent.getClasses().includes("formulairess")) {
                cmpParent.components().forEach((item, i) => {
                  let btn = item.components().models[0].components().models[0];
                  let body = item.components().models[1];
                  let btnAttr = btn.getAttributes();
                  let bodyAttr = body.getAttributes();
                  btnAttr["data-bs-target"] = `#${body.ccid}`;
                  btnAttr["aria-controls"] = `${body.ccid}`;
                  items[i]["id"] = `${body.ccid}`;
                  bodyAttr["data-bs-parent"] = `#${newattr.id}`;
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
          c.set("draggable", false);
          c.set("removable", false);
          c.set("copyable", false);
          c.set("resizable", false);
          c.set("droppable", false);
          c.set("editable", false);
          c.set("selectable", true);
          c.set("toolbar", [
            {
              attributes: { class: "fa fa-arrow-up" },
              command: "select-parent",
            },
            {
              attributes: { class: "fa fa-gear" },
              command: "formulaireConfig",
            },
          ]);
        });
      },
    },
    isComponent: (el) => {
      if (el.classList && el.classList.contains("formulaire")) {
        return {
          type: "FormulaireType",
        };
      }
    },
  });
  dc.addType("Label", {
    extend: "text",
    model: {
      defaults: {
        "data-gjs-draggable": "form,form div",
        "data-gjs-droppable": false,
        traits: [
          {
            type: "text",
            name: "id",
            label: "ID : ",
          },
          {
            type: "text",
            name: "for",
            label: "For : ",
          },
        ],
      },
      init() {},
    },

    view: {
      init({ el, model }) {
        this.listenTo(model, "change:attributes", this.update);
      },
      update() {
        this.render();
      },
      onRender({ el, model }) {},
    },
    isComponent(el) {
      let result;
      const tag = el.tagName;
      if (tag == "LABEL") {
        result = {
          type: "Label",
        };
      }
      return result;
    },
  });
};
