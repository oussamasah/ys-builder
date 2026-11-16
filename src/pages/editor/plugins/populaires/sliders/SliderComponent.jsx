/* eslint-disable no-undef */
/* eslint-disable import/no-anonymous-default-export */

import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import react from "react";
import ReactDOM from "react-dom/client";
import Modalslider from "./Modalslider";

export default (editor, opts = {}) => {
  const dc = editor.DomComponents;
  const defaultType = dc.getType("default");
  const defaultView = defaultType.view;
  const { Modal } = editor;

  dc.addType("sliderItemType", {
    view: {
      events: {
        dblclick: "innerElClick",
      },
      innerElClick() {
        const container = document.getElementById("sliders-modal");

        if (container) {
          container.remove();
        }
        const modalContainer = document
          .createRange()
          .createContextualFragment(`<div id="sliders-modal"></div>`);
        document.body.append(modalContainer);
        const root = ReactDOM.createRoot(
          document.getElementById("sliders-modal")
        );
        root.render(<Modalslider editor={editor} siteId={opts.site} />);
      },

      onRender({ el, model }) {},
    },
    isComponent: (el) => {
      if (el.classList && el.classList.contains("slider-item")) {
        return {
          type: "sliderItemType",
        };
      }
    },
  });
  dc.addType("captionsliderType", {
    model: {
      defaults: {
        toolbar: [
          // these are the default toolbar elements
          {
            attributes: { class: "fa fa-gear" },
            command: "selectparent",
          },
        ],
      },
    },
    view: {
      init({ el, model }) {
        editor.Commands.add("selectparent", (editor) => {
          const cmp = model.closest(".sliders-gjs");
          editor.select(cmp);
        });
      },

      onRender({ el, model }) {},
    },
    isComponent: (el) => {
      if (el.classList && el.classList.contains("captionslider")) {
        return {
          type: "captionsliderType",
        };
      }
    },
  });
  dc.addType("slidersType", {
    model: {
      defaults: {
        activeOnRender: 1,
        draggable: true,
        editable: true,
        droppable: true,
        resizable: true,

        traits: [
          {
            type: "checkbox",
            name: "conteneur",
            label: "Ajouter conteneur  ",
            valueTrue: "YES", // Value to assign when is checked, default: `true`
            valueFalse: "NO", // Value to assign when is unchecked, default: `false`
          },
          {
            type: "checkbox",
            name: "navigation",
            label: " Navigation",
            valueTrue: "nav", // Value to assign when is checked, default: `true`
            valueFalse: "notnav", // Value to assign when is unchecked, default: `false`
          },
          {
            type: "checkbox",
            name: "data-bs-ride",
            label: " Auto play",
            valueTrue: "carousel", // Value to assign when is checked, default: `true`
            valueFalse: "", // Value to assign when is unchecked, default: `false`
          },
          {
            type: "checkbox",
            name: "indicators",
            label: " Indicateur",
            valueTrue: "YES", // Value to assign when is checked, default: `true`
            valueFalse: "NO", // Value to assign when is unchecked, default: `false`
          },
          {
            type: "checkbox",
            name: "addsections",
            label: " Ajouter section",
            valueTrue: "section", // Value to assign when is checked, default: `true`
            valueFalse: "notsection", // Value to assign when is unchecked, default: `false`
          },
          {
            type: "color",
            name: "colorind",
            label: "couleur indicator ",
          },
          {
            type: "button",
            label: "Slider d'images ",
            name: "add",
            full: true,
            text: "Modifier",
            command: (editor) => {
              const container = document.getElementById("sliders-modal");
              if (container) {
                container.remove();
              }
              const modalContainer = document
                .createRange()
                .createContextualFragment(`<div id="sliders-modal"></div>`);
              document.body.append(modalContainer);
              const root = ReactDOM.createRoot(
                document.getElementById("sliders-modal")
              );
              root.render(<Modalslider editor={editor} siteId={opts.site} />);
            },
          },
        ],
        attributes: {
          colorind: "#ffffff",
        },
      },
      init() {
        this.on("change:attributes:conteneur", this.handleContainerChange);
        this.on("change:attributes:indicators", this.handleIndicatorChange);
        this.on("change:attributes:navigation", this.handleNavigationChange);
        this.on("change:attributes:colorind", this.changeColorIndicators);
        this.on("change:attributes:addsections", this.changeSections);
      },
      script: function () {
        const id = this.id;
        let initLib;
        initLib = function () {
          $(`#${id}`).carousel({
            interval: 2000,
          });
        };

        if (typeof carousel == "undefined") {
          const script = document.createElement("script");
          script.onload = initLib;
          script.id = "script-" + id;
          script.src =
            "https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js";

          document.body.appendChild(style);
          document.body.appendChild(script);
        } else {
          initLib();
        }
      },

      storeFunction() {},
      changeSections() {
        const addsections = this.getAttributes().addsections;

        if (addsections == "section") {
          let ind = this.find("div.captionslider");

          if (ind.length == 0) {
            let innerItems = this.find("div.carousel-item");
            let btn = `  <div class="captionslider" style="position:absolute;
            background: rgb(0 0 0 / 20%);
            right: 0;
            left: 0;
            top:0;
            bottom:0;
            margin:auto;
            display:flex;
            flex-wrap:wrap;
            align-items:center;
            justify-content: center;">
            <div style="
                        padding-top: 50px;
                        padding-bottom: 50px; color:white; 
                          width:50%;
                        min-width:200px;text-align:center">
                  <p  id="text-${uuidv4()}" draggable="true">Lorem ipsum</p>
                  <a   id="link-${uuidv4()}" data-gjs-type="link"  href="#" role="button" class="btn" >Text du boutton</a>
                  </div>
               </div>`;
            innerItems.forEach((element) => {
              element.append(`<div   class="captionslider">
          ${btn}
         </div>`);
            });
          }
        }
        if (addsections == "notsection") {
          let innerItems = this.find("div.carousel-item");

          innerItems.forEach((element) => {
            let caption = element.find("div.captionslider");
            if (caption.length > 0) {
              caption[0].remove();
            }
          });
          this.view.render();
          editor.refresh();
        }
      },
      handleContainerChange() {
        if (this.getAttributes().conteneur == "YES") {
          this.addClass("container mx-auto");
          this.view.render();
          editor.refresh();
        } else {
          this.removeClass("container mx-auto");

          //this.view.render();
          editor.refresh();
        }
      },
      handleIndicatorChange() {
        let id = this.getAttributes().id;
        let indicators = this.getAttributes().indicators;
        if (indicators == "YES") {
          let ind = this.find("div.carousel-indicators");
          if (ind.length == 0) {
            let innerItems = this.find("div.carousel-item");

            let btn = ``;
            for (let i in innerItems) {
              if (i == 0) {
                btn += `<button type='button'  class="active" data-bs-target="#${id}" data-bs-slide-to="${i}" class="active" aria-current="true" aria-label="Slide ${i}"></button>`;
              } else {
                btn += `<button type='button'  data-bs-target="#${id}" data-bs-slide-to="${i}" aria-label="Slide ${i}"></button>`;
              }
            }
            this.append(`<div class="carousel-indicators">
         ${btn}
        </div>`);
          }
        }
        if (indicators == "NO") {
          let ind = this.find("div.carousel-indicators");
          if (ind.length > 0) {
            ind[0].remove();
          }
        }
      },

      handleNavigationChange() {
        let id = this.getAttributes().id;
        let navigation = this.getAttributes().navigation;
        if (navigation == "nav") {
          let ind = this.find("div.carouselcontrol");
          if (ind.length == 0) {
            let innerItems = this.find("div.carousel-item");
            let btn = ``;
            for (let i in innerItems) {
              if (i == 0) {
                btn += `<div class="carouselcontrol"> <button class="carousel-control-prev " type="button" data-bs-target="#${id}"  style="font-size:45px" data-bs-slide="prev">
              <i  data-gjs-type="IconType" draggable="true" aria-hidden="true" class="  fas fa-angle-left"></i>
              <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next " type="button" data-bs-target="#${id}"  style="font-size:45px" data-bs-slide="next">
            <i  data-gjs-type="IconType" draggable="true" aria-hidden="true" class="  fas fa-angle-right"></i>
              <span class="visually-hidden">Next</span>
            </button></div>`;
              }
            }
            this.append(`<div   class="carouselcontrol">
          ${btn}
         </div>`);
          }
        }
        if (navigation == "notnav") {
          let ind = this.find("div.carouselcontrol");
          if (ind.length > 0) {
            ind[0].remove();
          }
        }
      },

      changeColorIndicators() {
        const colorind = this.getAttributes().colorind;
        editor.addStyle(
          `.carousel-indicators [data-bs-target]{  background-color: ${colorind}!important;}`
        );

        editor.refresh();
      },
    },

    view: {
      init({ model }) {
        this.listenTo(model, "change:activeOnRender", this.doStuff);
      },

      async doStuff() {
        const id = "sliders-" + uuidv4();
        this.model.set("attributes", { id });
        editor.select(this.model);
        let cmp = this.model.find("button.carouselcontrol");
        // cmp[0].setAttributes({
        //   "data-bs-target": "#" + id,
        //   "data-bs-slide": "prev",
        // });
        // cmp[1].setAttributes({
        //   "data-bs-target": "#" + id,
        //   "data-bs-slide": "next",
        // });
        await axios
          .get(process.env.REACT_APP_API_URL + "/plugins/getbytype/slider")
          .then(async (response) => {
            let slidertype = response.data.data[0]._id;
            await axios
              .post(process.env.REACT_APP_API_URL + "/plugins/createoption/", {
                ref: id,
                PluginSchema: slidertype,
                PageSchema: opts.page,
                function: "",
                options: { items: [] },
              })
              .then((response) => {
                const modalContainer = document
                  .createRange()
                  .createContextualFragment(`<div id="sliders-modal"></div>`);
                document.body.append(modalContainer);
                const root = ReactDOM.createRoot(
                  document.getElementById("sliders-modal")
                );
                root.render(<Modalslider editor={editor} siteId={opts.site} />);
              });
          });
      },
      onRender({ el, model }) {},
    },
    isComponent: (el) => {
      if (el.classList && el.classList.contains("sliders-gjs")) {
        return {
          type: "slidersType",
        };
      }
    },
  });
};
