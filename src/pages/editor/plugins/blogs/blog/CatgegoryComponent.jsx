/* eslint-disable no-undef */
/* eslint-disable import/no-anonymous-default-export */

//import axios from "axios";
//import { v4 as uuidv4 } from "uuid";
import ReactDOM from "react-dom/client";

import ModalCatgegory from "./ModalCatgegory";
export default (editor, opts = {}) => {
  const dc = editor.DomComponents;
  //const defaultType = dc.getType("default");
  //const defaultView = defaultType.view;
  //const { Modal } = editor;

  dc.addType("Category", {
    model: {
      defaults: {
        activeOnRender: 1,
        toolbar: [
          // // these are the default toolbar elements
          // {
          //   attributes: { class: "fa fa-arrow-up" },
          //   command: "select-parent",
          // },
          // {
          //   attributes: { class: "fa fa-arrows" },
          //   command: "tlb-move",
          // },
          // {
          //   attributes: { class: "fa fa-clone" },
          //   command: "tlb-clone",
          // },
          // {
          //   attributes: { class: "fa fa-trash" },
          //   command: "tlb-delete",
          // },
          // // this is my new toolbar element with my custom command
          // {
          //   attributes: { class: "fa fa-gear" },
          //   command: "CatgegoryConfig",
          // },
        ],
      },
      init() {
        this.set("draggable", false);
        this.set("removable", false);
        this.set("copyable", false);
        this.set("droppable", false);
        this.set("selectable", false);
        this.set("hoverable", false);
      },
      remove(){
        
      }
    
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
        editor.Commands.add("CatgegoryConfig", {
          run(editor, sender, model) {
            let cmp = editor.getSelected();
            if (!cmp.getClasses().includes("gjs-blog-catgegory")) {
              do {
                cmp = cmp.parent();
              } while (!cmp.getClasses().includes("gjs-blog-catgegory"));
            }

            const container = document.getElementById("Catgegory-modal");
            if (container) {
              container.remove();
            }
            const modalContainer = document
              .createRange()
              .createContextualFragment(`<div id="Catgegory-modal"></div>`);
            document.body.append(modalContainer);
            const root = ReactDOM.createRoot(
              document.getElementById("Catgegory-modal")
            );
            root.render(
              <ModalCatgegory editor={editor} component={cmp} siteId={opts.site} />
            );

            editor.select(cmp);
          },
        });
       // this.listenTo(model, "active", this.doStuff);
      },
      async doStuff() {
        const container = document.getElementById("Catgegory-modal");
        if (container) {
          container.remove();
        }
        const modalContainer = document
          .createRange()
          .createContextualFragment(`<div id="Catgegory-modal"></div>`);
        document.body.append(modalContainer);
        const root = ReactDOM.createRoot(document.getElementById("Catgegory-modal"));

        setTimeout(() => {
          root.render(
            <ModalCatgegory
              editor={editor}
              component={this.model}
              siteId={opts.site}
            />
          );
        }, 500);
      },

      async onRender({ el, model }) {
        

        let attr = model.getAttributes()
        console.log(attr["data-params"]);
        model.components(`<div id="articles" data-gjs-selectable="false">
          <p data-gjs-type="artciles" id="text-reserve">Zone réservée pour afficher la liste des articles
          </p>
          </div>
    `) 
setTimeout(function(){
    let children = model.view.getAllChildComponents(model);

        children.map((c) => {
            c.set("draggable", false);
            c.set("removable", false);
            c.set("copyable", false);
            c.set("resizable", false);
            c.set("droppable", false);
            c.set("editable", false);
            c.set("selectable", false);
            c.set("hoverable", false);
          
        });
        model.set("draggable", false);
        model.set("removable", false);
        model.set("copyable", false);
        model.set("resizable", false);
        model.set("droppable", false);
        model.set("editable", false);
        model.set("selectable", false);
        model.set("hoverable", false);
      },500)
      },
      
    
    },
    isComponent: (el) => {
      if (el.classList && el.classList.contains("gjs-blog-catgegory")) {
        return {
          type: "Category",
        };
      }
    },
  });

  dc.addType("Article", {
    model: {
      
      defaults: {
        activeOnRender: 1,

       
      },
      init() {

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
       
      },
      async doStuff() {

      },

      async onRender({ el, model }) {
        if(opts.type == "model"){
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
             
            ]);
          });
         model.set("draggable", false);
         model.set("removable", false);
         model.set("copyable", false);
         model.set("resizable", false);
         model.set("droppable", false);
         model.set("editable", false);
         model.set("selectable", false);
        }else if(opts.type=="article"){
         let cmp =  editor.getWrapper()
          let allcmp = this.model.view.getAllChildComponents(cmp);
          allcmp.map((c) => {
            c.set("draggable", false);
            c.set("removable", false);
            c.set("copyable", false);
            c.set("resizable", false);
            c.set("droppable", false);
            c.set("editable", false);
            c.set("selectable", false);
 
          });

          let children = this.model.view.getAllChildComponents(this.model);
          children.map((c) => {
            c.set("draggable", true);
            c.set("removable", true);
            c.set("copyable", true);
            c.set("resizable", true);
            c.set("droppable", true);
            c.set("editable", true);
            c.set("selectable", true);

          });
          model.set("draggable", true);
          model.set("removable", true);
          model.set("copyable", false);
          model.set("resizable", true);
          model.set("droppable", true);
          model.set("editable", true);
          model.set("selectable", true);
        }

      },
    },
    isComponent: (el) => {
      if (el  && el.tagName ==="ARTICLE") {
        return {
          type: "Article",
        };
      }
    },
  });
  dc.addType("blogCategories", {
    model: {
      
      defaults: {
        activeOnRender: 1,

       
      },
      init() {

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
       
      },
      async doStuff() {

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
            c.set("selectable", true);
            
          })
          model.set("draggable", false);
          model.set("removable", false);
          model.set("copyable", false);
          model.set("resizable", false);
          model.set("droppable", false);
          model.set("editable", false);
          model.set("selectable", true);
          model.set("toolbar", [
            {
              attributes: { class: "fa fa-arrow-up" },
              command: "select-parent",
            },
            {
              attributes: { class: "fa fa-arrows" },
              command: "tlb-move",
            },
            
          ]);
        

      },
    },
    isComponent: (el) => {
      if (el && el.classList && el.classList.contains("blogcategorie")) {
        return {
          type: "blogCategories",
        };
      }
    },
  });
};
