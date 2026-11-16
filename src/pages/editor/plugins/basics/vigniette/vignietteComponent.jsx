/* eslint-disable no-undef */
/* eslint-disable import/no-anonymous-default-export */

import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import ModalVigniette from "./ModalVigniette";
import ReactDOM from "react-dom/client";
export default (editor, opts = {}) => {
  const dc = editor.DomComponents;
  const defaultType = dc.getType("default");
  const defaultView = defaultType.view;
  const { Modal } = editor;

  dc.addType("Vigniette", {
    model: {
      defaults: {
        activeOnRender: 1,
        selectable: true,
        droppable: false,
        draggable: false,
        editable: false,
        /*         traits: [
          {
            type: "button",
            name: "add",
            full: true,
            text: "Sélectioner l'image",
            command: (editor) => {
              let cmp = editor.getSelected();
              let imgs = cmp.find("img");
              if (imgs.length > 0) {
                editor.select(imgs[0]);
                editor.select(imgs[0]);
                console.log(imgs[0].view);
                imgs[0].view.onActive();
              }
            },
          },
          {
            type: "select",
            name: "class",
            label: "Effet",
            options: [
              { value: "effect-lily", name: "Lily" },
              { value: "effect-sadie", name: "Sadie" },
              { value: "effect-honey", name: "Honey" },
              { value: "effect-layla", name: "Layla" },
              { value: "effect-zoe", name: "Zoe" },
              { value: "effect-oscar", name: "Oscar" },
              { value: "effect-marley", name: "Marley" },
              { value: "effect-marley", name: "Marley" },
              { value: "effect-ruby", name: "Ruby" },
              { value: "effect-roxy", name: "Roxy" },
              { value: "effect-bubba", name: "Bubba" },
              { value: "effect-romeo", name: "Romeo" },
              { value: "effect-dexter", name: "Dexter" },
              { value: "effect-sarah", name: "Sarah" },
              { value: "effect-chico", name: "Chico" },
              { value: "effect-milo", name: "Milo" },
              { value: "effect-julia", name: "Julia" },
              { value: "effect-goliath", name: "Goliath" },
              { value: "effect-selena", name: "Selena" },
              { value: "effect-apollo", name: "Apollo" },
              { value: "effect-phoebe", name: "Phoebe" },
              { value: "effect-steve", name: "Steve" },
              { value: "effect-moses", name: "Moses" },
              { value: "effect-jazz", name: "Jazz" },
              { value: "effect-duke", name: "Duke" },
              { value: "effect-ming", name: "Ming" },
              { value: "effect-lexi", name: "Lexi" },
            ],
          },
        ], */
        traits: [
          {
            type: "button",
            name: "add",
            full: true,
            text: "Modifier vigniette",
            command: (editor) => {
              const container = document.getElementById("vigniette-modal");
              if (container) {
                container.remove();
              }
              const modalContainer = document
                .createRange()
                .createContextualFragment(`<div id="vigniette-modal"></div>`);
              document.body.append(modalContainer);
              const root = ReactDOM.createRoot(
                document.getElementById("vigniette-modal")
              );
              root.render(
                <ModalVigniette editor={editor} siteId={opts.site} />
              );
            },
          },
        ],
      },
      async init() {},
    },
    view: {
      init({ model }) {
        this.listenTo(model, "change:activeOnRender", this.doStuff);
      },
      events: {
        dblclick: "innerElClick",
      },
      innerElClick() {
        const container = document.getElementById("vigniette-modal");
        if (container) {
          container.remove();
        }
        const modalContainer = document
          .createRange()
          .createContextualFragment(`<div id="vigniette-modal"></div>`);
        document.body.append(modalContainer);
        const root = ReactDOM.createRoot(
          document.getElementById("vigniette-modal")
        );
        root.render(<ModalVigniette editor={editor} siteId={opts.site} />);
        editor.select(this.model);
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
              .createContextualFragment(`<div id="vigniette-modal"></div>`);
            document.body.append(modalContainer);
            const root = ReactDOM.createRoot(
              document.getElementById("vigniette-modal")
            );
            root.render(<ModalVigniette editor={editor} siteId={opts.site} />);
          });
      },

      async onRender({ el, model }) {},
    },
    isComponent: (el) => {
      if (el.classList && el.classList.contains("gjs-vigniette")) {
        return {
          type: "Vigniette",
        };
      }
    },
  });
  dc.addType("FIGCAPTION", {
    model: {
      defaults: {
        activeOnRender: 1,
        selectable: true,
        droppable: false,
        draggable: false,
        editable: false,
        traits: [
          {
            type: "button",
            name: "add",
            full: true,
            text: "Modifier vigniette",
            command: (editor) => {
              let fig = editor
                .getSelected()
                .parent()
                .parent()
                .parent()
                .parent();
              console.log(fig);
              editor.select(fig);
              const container = document.getElementById("vigniette-modal");
              if (container) {
                container.remove();
              }
              const modalContainer = document
                .createRange()
                .createContextualFragment(`<div id="vigniette-modal"></div>`);
              document.body.append(modalContainer);
              const root = ReactDOM.createRoot(
                document.getElementById("vigniette-modal")
              );
              root.render(
                <ModalVigniette editor={editor} siteId={opts.site} />
              );
            },
          },
        ],
      },
      async init() {},
    },
    view: {
      async onRender({ el, model }) {},
    },
    isComponent: (el) => {
      if (el && el.tagName == "FIGCAPTION") {
        return {
          type: "FIGCAPTION",
        };
      }
    },
  });
};
