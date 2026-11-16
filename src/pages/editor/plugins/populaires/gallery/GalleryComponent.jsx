/* eslint-disable no-undef */
/* eslint-disable import/no-anonymous-default-export */

import axios from "axios";

import { v4 as uuidv4 } from "uuid";
import react from "react";
import ReactDOM from "react-dom/client";
import ModalGallery from "./Modalgallery";
import { optionsGallery } from "./nanogalleryoptions.jsx";

export default (editor, opts = {}) => {
  const dc = editor.DomComponents;
  const defaultType = dc.getType("default");
  const defaultView = defaultType.view;
  const { Modal } = editor;

  dc.addType("galleryType", {
    model: {
      defaults: {
        activeOnRender: 1,
        "data-gjs-draggable": true,
        attributes: {
          ["data-optiongallery"]: "default",
          ["data-oldoption"]: "null",
        },
        traits: [
          {
            type: "button",
            name: "add",
            full: true,
            text: "Modify gallerie",
            command: (editor) => {
              const container = document.getElementById("gallery-modal");
              if (container) {
                container.remove();
              }
              const modalContainer = document
                .createRange()
                .createContextualFragment(`<div id="gallery-modal"></div>`);
              document.body.append(modalContainer);
              const root = ReactDOM.createRoot(
                document.getElementById("gallery-modal")
              );
              root.render(<ModalGallery editor={editor} siteId={opts.site} />);
            },
          },
        ],
      },
    },

    view: {
      events: {
        dblclick: "innerElClick",
      },
      innerElClick() {
        const container = document.getElementById("gallery-modal");
        if (container) {
          container.remove();
        }
        const modalContainer = document
          .createRange()
          .createContextualFragment(`<div id="gallery-modal"></div>`);
        document.body.append(modalContainer);
        const root = ReactDOM.createRoot(
          document.getElementById("gallery-modal")
        );
        root.render(<ModalGallery editor={editor} siteId={opts.site} />);
        editor.select(this.model);
      },
      init({ model }) {
        this.listenTo(model, "change:activeOnRender", this.doStuff);
        editor.Commands.add("galleryConfig", {
          run(editor, sender, model) {
            let cmp = editor.getSelected();
            if (!cmp.getClasses().includes("gallery-gjs")) {
              do {
                cmp = cmp.parent();
              } while (!cmp.getClasses().includes("gallery-gjs"));
            }

            const container = document.getElementById("gallery-modal");
            if (container) {
              container.remove();
            }
            const modalContainer = document
              .createRange()
              .createContextualFragment(`<div id="gallery-modal"></div>`);
            document.body.append(modalContainer);
            const root = ReactDOM.createRoot(
              document.getElementById("gallery-modal")
            );
            root.render(
              <ModalGallery
                editor={editor}
                component={cmp}
                siteId={opts.site}
              />
            );

            editor.select(cmp);
          },
        });
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
      async doStuff() {
        let attr = this.model.getAttributes();
        attr["data-ref"] = "gallery-" + uuidv4();
        this.model.setAttributes(attr);
        await axios
          .post(process.env.REACT_APP_API_URL + "/plugins/createoption/", {
            ref: attr["data-ref"],
            PageSchema: opts.page,
            function: "",
            css: "",
            options: { items: [] },
          })
          .then((response) => {
            const modalContainer = document
              .createRange()
              .createContextualFragment(`<div id="gallery-modal"></div>`);
            document.body.append(modalContainer);
            const root = ReactDOM.createRoot(
              document.getElementById("gallery-modal")
            );
            root.render(<ModalGallery editor={editor} siteId={opts.site} />);
          });
      },

      async onRender({ el, model }) {

        let attr = this.model.getAttributes();
        let content = `<div class="galeria">
        <div class="container">
          <div class="contenedorImgs"></div>
        </div>
      </div>`;

        content += `<script>
          $(document).ready(function(){
       $.ajax({
        type: "POST",
        url: "${process.env.REACT_APP_API_URL}/plugins/getbyref/${attr["data-ref"]}",
        type: 'GET',
        contentType: false,
        processData: false,
      }).done( async function (response) {
       
        $("body").append(response.data.function.replaceAll("\\n","").replaceAll('\\"',"'") + response.data.css.replaceAll("\\n","").replaceAll('\\"',"'"))
      }).fail(function (jqXHR, textStatus, errorThrown) {
   
  console.log(errorThrown)
      })})</script>
       `;

        this.model.components(content);
        let children = this.model.view.getAllChildComponents(this.model);
        children.map((c) => {
          if (!c.getClasses().includes("gjs-navigation")) {
            c.set("draggable", false);
            c.set("removable", false);
            c.set("copyable", false);
            c.set("resizable", false);
            c.set("droppable", false);
            c.set("editable", true);
            c.set("selectable", true);
            c.set("toolbar", [
              {
                attributes: { class: "fa fa-arrow-up" },
                command: "select-parent",
              },
              {
                attributes: { class: "fa fa-gear" },
                command: "galleryConfig",
              },
            ]);
          }
        });
      },
    },
    isComponent: (el) => {
      if (el.classList && el.classList.contains("gallery-gjs")) {
        return {
          type: "galleryType",
        };
      }
    },
  });
};
