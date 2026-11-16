import axios from "axios";

//import { toCSS, toJSON } from "cssjson";
import { v4 as uuidv4 } from "uuid";
import Model from "../../../../components/Models/Model";
import ReactDOM from "react-dom/client";
export default (editor, opts = {}) => {
  const dc = editor.DomComponents;
  dc.addType("Section", {
    model: {
      defaults: {
        activeOnRender: 1,
        draggable: "main,footer,header",
        attributes: {
          "data-ref": "Section-" + uuidv4(),
          "data-isglobal": false,
        },
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
          // this is my new toolbar element with my custom command
          {
            attributes: { class: "fas fa-download" },
            command: "tlb-save",
          },
        ],

        // traits: [
        //   {
        //     type: "checkbox",
        //     name: "conteneur",
        //     label: "Ajouter conteneur ",
        //     valueTrue: "YES", // Value to assign when is checked, default: `true`
        //     valueFalse: "NO", // Value to assign when is unchecked, default: `false`
        //   },
        //   {
        //     type: "checkbox",
        //     name: "inverse",
        //     label: "inversé la  section ",
        //     valueTrue: "YES", // Value to assign when is checked, default: `true`
        //     valueFalse: "NO", // Value to assign when is unchecked, default: `false`
        //   },
        //   {
        //     type: "button",
        //     name: "add",
        //     full: true,
        //     text: "Sauvegarder",
        //     command: (editor) => {
        //       const container = document.getElementById("model-modal");
        //       if (container) {
        //         container.remove();
        //       }
        //       const modalContainer = document
        //         .createRange()
        //         .createContextualFragment(`<div id="model-modal"></div>`);
        //       document.body.append(modalContainer);
        //       const root = ReactDOM.createRoot(
        //         document.getElementById("model-modal")
        //       );
        //       root.render(<Model editor={editor} siteId={opts.site} />);
        //     },
        //   },
        // ],
      },
      updated() {
        // alert("Global");
      },
    },

    view: {
      async init({ model }) {
        editor.Commands.add("tlb-save", {
          run(editor, sender) {
            const container = document.getElementById("model-modal");
            if (container) {
              container.remove();
            }
            const modalContainer = document
              .createRange()
              .createContextualFragment(`<div id="model-modal"></div>`);
            document.body.append(modalContainer);
            const root = ReactDOM.createRoot(
              document.getElementById("model-modal")
            );
            root.render(<Model editor={editor} siteId={opts.site} compteSchema={opts.CompteSchema}/>);
          },
        });
        setTimeout(() => {
          model.view.updateScript();
        }, 3000);
        // this.listenTo(model, "change:activeOnRender", this.doStuff);
      },

      // async doStuff() {
      //   let id = "Section-" + uuidv4();
      //   this.model.setAttributes({ id: id, "data-ref": id });
      // },
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
          if (model.get("tagName") == "SECTION" ) {
            let cmp = editor.getSelected();
            let attr = cmp.getAttributes();
            let newattr = model.getAttributes();
            let configcolor = newattr["data-color-link"];
            let confighover = newattr["data-hover-link"];
            let configposition = newattr["ta-position-lien"];
          

            const css = this.getAllClassesAndIDs(cmp);
            let filteredArray = css.filter((str) => str !== "");
            let cssstring = filteredArray.join(" ");

            cssstring = cssstring.replaceAll(
              `#${attr.id}`,
              `#${model.getAttributes().id}`
            );
         
            editor.Css.addRules(cssstring);

          
            newattr["data-color-link"] = configcolor;
            newattr["data-hover-link"] = confighover;
            newattr["data-position-lien"] = configposition;


            model.setAttributes(newattr);

            }
        });
        let attr = model.getAttributes();
        let global = attr["data-isglobal"];
        let ref = attr["data-ref"];

        if (global == "true") {
          await axios
            .get(process.env.REACT_APP_API_URL + "/models/getbyref/" + ref)
            .then(async (response) => {
              // console.log(response);
              if (response.data.data) {
                let content = response.data.data.content;
                let html = content.html;
                // Create a DOMParser instance and parse the HTML string
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, "text/html");

                // Find the <section> element within the parsed DOM
                const sectionElement = doc.querySelector("section");

                // Extract the child elements of the <section> element

                // Now, 'childElements' contains an array of child elements within the <section>
                const childStrings = Array.from(sectionElement.children).map(
                  (childElement) => childElement.outerHTML
                );
                let css = content.css;
                this.model.components(childStrings + `<style>${css}</style>`);
              }
            });
        }
        // console.log(model.getAttributes()["data-isglobal"])
        if (model.getAttributes()["data-isglobal"] == "true"){
          model.set("toolbar", [
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
            // this is my new toolbar element with my custom command
            {
              attributes: { class: "fas fa-download" },
              command: "tlb-save",
            },
          ]);
         
          this.model.set("copyable", false);
        }else{
          model.set("toolbar", [
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
              attributes: { class: "fa fa-clone" },
              command: "tlb-clone",
            },
            // this is my new toolbar element with my custom command
            {
              attributes: { class: "fas fa-download" },
              command: "tlb-save",
            },
          ]);
          this.model.set("copyable", true);
        }
      },

    },
    isComponent: (el) => {
      if (el.tagName == "SECTION") {
        return {
          type: "Section",
        };
      }
    },
  });
};
