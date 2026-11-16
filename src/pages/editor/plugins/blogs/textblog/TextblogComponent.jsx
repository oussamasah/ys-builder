import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import ReactDOM from "react-dom/client";
import Modaltextblog from "./Modaltextblog";
export default (editor, opts = {}) => {
  const dc = editor.DomComponents;
  const defaultType = dc.getType("default");
  const defaultView = defaultType.view;
  const { Modal } = editor;

  dc.addType("TextblogType", {
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
            command: "textblogConfig",
          },
        ],
      },
      init() {
        this.set("draggable", true);
        this.set("removable", true);
        this.set("copyable", true);
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
        editor.Commands.add("textblogConfig", {
          run(editor, sender, model) {
            let cmp = editor.getSelected();
            if (!cmp.getClasses().includes("post-element")) {
              do {
                cmp = cmp.parent();
              } while (!cmp.getClasses().includes("post-element"));
            }

            const container = document.getElementById("textblog-modal");
            if (container) {
              container.remove();
            }
            const modalContainer = document
              .createRange()
              .createContextualFragment(`<div id="textblog-modal"></div>`);
            document.body.append(modalContainer);
            const root = ReactDOM.createRoot(
              document.getElementById("textblog-modal")
            );
            root.render(
              <Modaltextblog
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
        const container = document.getElementById("textblog-modal");
        if (container) {
          container.remove();
        }
        const modalContainer = document
          .createRange()
          .createContextualFragment(`<div id="textblog-modal"></div>`);
        document.body.append(modalContainer);
        const root = ReactDOM.createRoot(
          document.getElementById("textblog-modal")
        );

        setTimeout(() => {
          root.render(
            <Modaltextblog
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
              attributes: { class: "fa fa-arrow-up" },
              command: "select-parent",
            },
            {
              attributes: { class: "fa fa-gear" },
              command: "textblogConfig",
            },
          ]);
        });
      },
    },
    isComponent: (el) => {
      if (el.classList && el.classList.contains("post-element")) {
        return {
          type: "TextblogType",
        };
      }
    },
  });
 
};
