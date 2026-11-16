import axios from "axios";

import { toCSS, toJSON } from "cssjson";
import { v4 as uuidv4 } from "uuid";
import breadcrumbs from "../../../../assets/imgEditorBlocks/breadcrumbs.svg";
import { optionsGallery } from "./gallery//nanogalleryoptions.jsx";
import { toast, Toaster } from "react-hot-toast";

export default (editor, opts = {}) => {
  const regexPattern = /^\[.*]$/;
  // Each new type extends the default Trait
  editor.TraitManager.addType("textarea", {
    events: {
      keyup: "onChange", // trigger parent onChange method on keyup
    },
    /**
     * Returns the input element
     * @return {HTMLElement}
     */
    createInput({ trait }) {
      const traits = trait;

      var input = document.createElement("textarea");

      const name = traits.attributes.id;
      const v = this.target.getAttributes()[name] || "";
      input.value = v;

      return input;
    },
    /**
     * Returns the input element
     * @return {HTMLElement}
     */
    getInputEl() {},
  });
  editor.TraitManager.addType("label", {
    events: {
      keyup: "onChange", // trigger parent onChange method on keyup
    },
    /**
     * Returns the input element
     * @return {HTMLElement}
     */
    createInput({ trait }) {
      const traits = trait;

      var input = document.createElement("label");

      const name = traits.attributes["data-label"];
      const v = this.target.getAttributes()[name] || "";
      input.value = v;

      return input;
    },
    /**
     * Returns the input element
     * @return {HTMLElement}
     */
    getInputEl() {},
  });
  const dc = editor.DomComponents;

  // dc.addType("accordionType", {
  //   model: {
  //     defaults: {
  //       activeOnRender: 1,
  //       copyable: false,
  //       click: 0,
  //       attributes: {
  //         "data-color": "#000000",
  //         "data-coloractive": "#2c2727",
  //         "data-colorfont": "#fff",
  //         "data-bgbody": "#fff",
  //         "data-sizebodydesktop": "14",
  //         "data-sizebodytablette": "14",
  //         "data-sizebodymobile": "12",
  //         "data-sizetitredesk": "16",
  //         "data-sizetitrelinedesk": "18",
  //         "data-sizetitretablette": "16",
  //         "data-sizetitrelinetablette": "18",
  //         "data-sizetitremobile": "14",
  //         "data-sizetitrelinemobile": "16",
  //         "data-sizebodylinedesktop": "18",
  //         "data-sizebodylinetablette": "18",
  //         "data-sizebodylinemobile": "16",
  //         "data-positionicon": "droite",
  //         "data-colorbodytitle": "#000",
  //       },
  //       traits: [
  //         {
  //           type: "button",
  //           label: "Ajouter une tab ",
  //           text: "Ajouter",
  //           full: true, // Full width button
  //           command: (editor, model) => {
  //             const idHeading =
  //               "block-" + uuidv4().replaceAll("-", "").substring(0, 5);
  //             const id =
  //               "block-" + uuidv4().replaceAll("-", "").substring(0, 5);
  //             const selected = editor.getSelected();
  //             let idBlock = selected.getAttributes().id;
  //             let count = selected.get("components").length;

  //             selected.append(`<div class="accordion-item">
  //               <p class="accordion-header" id="${idHeading}" >
  //                 <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#${id}" aria-expanded="true" aria-controls="collapseOne">
  //                 <i class="fas fa-chevron-down me-2"></i>  Accordion Item #${
  //                   count + 1
  //                 }
  //                 </button>
  //               </p>
  //               <div id="${id}" class="accordion-collapse collapse" aria-labelledby="${idHeading}" data-bs-parent="#${idBlock}" >
  //                 <div class="accordion-body">
  //                   <p><strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.</p>
  //                 </div>
  //               </div>
  //             </div>

  //             <style>
  //             .accordion-button i {
  //               transition: transform 0.2s ease-in-out;
  //               -webkit-transform: rotate(0deg);
  //               -moz-transform: rotate(0deg);
  //               transform: rotate(0deg);
  //           }
  //           .accordion-button.collapsed {
  //             border: 1px solid #eee;
  //             outline:0px solid #e1e1e1;
  //             outline-offset: 0px;
  //         }
  //           .accordion-button.collapsed i {
  //             transition: transform 0.2s ease-in-out;
  //               -webkit-transform: rotate(180deg);
  //               -moz-transform: rotate(180deg);
  //               transform: rotate(180deg);
  //           }

  //           .accordion-button:not(.collapsed)::after {
  //          display:none
  //         }
  //         .accordion-button::after {
  //           display:none
  //         }
  //           </style>
  //             `);

  //             selected.toHTML();
  //             editor.refresh();
  //           },
  //         },
  //         {
  //           type: "color",
  //           name: "data-color",
  //           label: "Couleur du  titre  active ",
  //         },
  //         {
  //           type: "color",
  //           name: "data-coloractive",
  //           label: "Couleur du  titre",
  //         },
  //         {
  //           type: "number",
  //           name: "data-sizetitredesk",
  //           label: "Taille du  titre desktop",
  //         },
  //         {
  //           type: "number",
  //           name: "data-sizetitrelinedesk",
  //           label: "Internligne titre desktop",
  //         },
  //         {
  //           type: "number",
  //           name: "data-sizetitretablette",
  //           label: "Taille du  titre tablette",
  //         },
  //         {
  //           type: "number",
  //           name: "data-sizetitrelinetablette",
  //           label: "Internligne titre tablette ",
  //         },
  //         {
  //           type: "number",
  //           name: "data-sizetitremobile",
  //           label: "taille du  titre mobile",
  //         },
  //         {
  //           type: "number",
  //           name: "data-sizetitrelinemobile",
  //           label: "Internligne   titre mobile",
  //         },
  //         {
  //           type: "color",
  //           name: "data-colorfont",
  //           label: "Arrière-plan du  titre",
  //         },
  //         {
  //           type: "color",
  //           name: "data-bgbody",
  //           label: "Arrière-plan du  corp",
  //         },
  //         {
  //           type: "number",
  //           name: "data-sizebodydesktop",
  //           label: "taille  contenu desktop",
  //         },
  //         {
  //           type: "number",
  //           name: "data-sizebodylinedesktop",
  //           label: "Internligne contenu desktop",
  //         },
  //         {
  //           type: "number",
  //           name: "data-sizebodytablette",
  //           label: "taille contenu tablette",
  //         },
  //         {
  //           type: "number",
  //           name: "data-sizebodylinetablette",
  //           label: "Internligne contenu tablette",
  //         },
  //         {
  //           type: "number",
  //           name: "data-sizebodymobile",
  //           label: "taille contenu mobile",
  //         },
  //         {
  //           type: "number",
  //           name: "data-sizebodylinemobile",
  //           label: "Internligne contenu mobile",
  //         },
  //         {
  //           type: "color",
  //           name: "data-colorbodytitle",
  //           label: "Couleur titre du  corp",
  //         },
  //         {
  //           type: "select",
  //           name: "data-positionicon",
  //           label: "Position icon ",
  //           options: [
  //             { value: "gauche", name: "Gauche" },
  //             { value: "droite", name: "Droite" },
  //           ],
  //         },
  //       ],
  //     },

  //     async init() {
  //       this.listenTo(
  //         this,
  //         "change:attributes:data-color",
  //         this.changecolorStyle
  //       );
  //       this.listenTo(
  //         this,
  //         "change:attributes:data-sizebodydesktop",
  //         this.changesizebdesk
  //       );
  //       this.listenTo(
  //         this,
  //         "change:attributes:data-sizebodylinedesktop",
  //         this.changelinebdesk
  //       );
  //       this.listenTo(
  //         this,
  //         "change:attributes:data-sizebodytablette",
  //         this.changesizebtab
  //       );
  //       this.listenTo(
  //         this,
  //         "change:attributes:data-sizebodylinetablette",
  //         this.changelinebtab
  //       );
  //       this.listenTo(
  //         this,
  //         "change:attributes:data-sizebodymobile",
  //         this.changesizebmobile
  //       );
  //       this.listenTo(
  //         this,
  //         "change:attributes:data-sizebodylinemobile",
  //         this.changelinebmobile
  //       );
  //       this.listenTo(
  //         this,
  //         "change:attributes:data-sizetitredesk",
  //         this.changesizetdesk
  //       );
  //       this.listenTo(
  //         this,
  //         "change:attributes:data-sizetitrelinedesk",
  //         this.changelinetdesk
  //       );
  //       this.listenTo(
  //         this,
  //         "change:attributes:data-sizetitretablette",
  //         this.changesizettab
  //       );
  //       this.listenTo(
  //         this,
  //         "change:attributes:data-sizetitrelinetablette",
  //         this.changelinettab
  //       );
  //       this.listenTo(
  //         this,
  //         "change:attributes:data-sizetitremobile",
  //         this.changesizetmobile
  //       );
  //       this.listenTo(
  //         this,
  //         "change:attributes:data-sizetitrelinemobile",
  //         this.changelinetmobile
  //       );
  //       this.listenTo(
  //         this,
  //         "change:attributes:data-colorfont",
  //         this.changebackgroundStyle
  //       );
  //       this.listenTo(
  //         this,
  //         "change:attributes:data-coloractive",
  //         this.changeActiveStyle
  //       );
  //       this.listenTo(
  //         this,
  //         "change:attributes:data-bgbody",
  //         this.changeBackgroundCorps
  //       );
  //       this.listenTo(
  //         this,
  //         "change:attributes:data-colorbodytitle",
  //         this.changetitleCorps
  //       );
  //       this.listenTo(
  //         this,
  //         "change:attributes:data-positionicon",
  //         this.changePosition
  //       );
  //       this.listenTo(
  //         this,
  //         "change:attributes:data-modelaccor",
  //         this.changeModels
  //       );
  //     },
  //     changesizetdesk() {
  //       const sizetitredesk = this.getAttributes()["data-sizetitredesk"];
  //       editor.addStyle(
  //         `@media(min-width:1200px){` +
  //           `#` +
  //           this.ccid +
  //           ` .accordion-button  {
  //             font-size: ${sizetitredesk}px
  //         }}`
  //       );

  //       // this.view.render();
  //       editor.refresh();
  //     },
  //     changelinetdesk() {
  //       const sizetitrelinedesk =
  //         this.getAttributes()["data-sizetitrelinedesk"];
  //       editor.addStyle(
  //         `@media(min-width:1200px){` +
  //           `#` +
  //           this.ccid +
  //           ` .accordion-button  {
  //             line-height: ${sizetitrelinedesk}px
  //         }}`
  //       );

  //       // this.view.render();
  //       editor.refresh();
  //     },
  //     changesizebdesk() {
  //       const sizebodydesktop = this.getAttributes()["data-sizebodydesktop"];
  //       editor.addStyle(
  //         `@media(min-width:1200px){` +
  //           `#` +
  //           this.ccid +
  //           ` .accordion-body  {
  //          font-size: ${sizebodydesktop}px
  //         }}`
  //       );

  //       // this.view.render();
  //       editor.refresh();
  //     },
  //     changelinebdesk() {
  //       const sizebodylinedesktop =
  //         this.getAttributes()["data-sizebodylinedesktop"];
  //       editor.addStyle(
  //         `@media(min-width:1200px){` +
  //           `#` +
  //           this.ccid +
  //           ` .accordion-body  {
  //          line-height: ${sizebodylinedesktop}px
  //         }}`
  //       );

  //       // this.view.render();
  //       editor.refresh();
  //     },
  //     changesizettab() {
  //       const sizetalette = this.getAttributes()["data-sizetitretablette"];
  //       editor.addStyle(
  //         `@media(max-width:1199px){` +
  //           `#` +
  //           this.ccid +
  //           ` .accordion-button  {
  //             font-size: ${sizetalette}px
  //         }}`
  //       );

  //       // this.view.render();
  //       editor.refresh();
  //     },

  //     changelinettab() {
  //       const sizetitrelinetablette =
  //         this.getAttributes()["data-sizetitrelinetablette"];
  //       editor.addStyle(
  //         `@media(max-width:1199px){` +
  //           `#` +
  //           this.ccid +
  //           ` .accordion-button  {
  //             line-height: ${sizetitrelinetablette}px
  //         }}`
  //       );

  //       // this.view.render();
  //       editor.refresh();
  //     },
  //     changesizebtab() {
  //       const sizebodytablette = this.getAttributes()["data-sizebodytablette"];
  //       editor.addStyle(
  //         `@media(max-width:1199px){` +
  //           `#` +
  //           this.ccid +
  //           ` .accordion-body  {
  //             font-size: ${sizebodytablette}px
  //         }}`
  //       );

  //       // this.view.render();
  //       editor.refresh();
  //     },
  //     changelinebtab() {
  //       const sizebodylinetablette =
  //         this.getAttributes()["data-sizebodylinetablette"];
  //       editor.addStyle(
  //         `@media(max-width:1199px){` +
  //           `#` +
  //           this.ccid +
  //           ` .accordion-body  {
  //          line-height: ${sizebodylinetablette}px
  //         }}`
  //       );

  //       // this.view.render();
  //       editor.refresh();
  //     },
  //     changesizetmobile() {
  //       const sizemoile = this.getAttributes()["data-sizetitremobile"];
  //       editor.addStyle(
  //         `@media(max-width:991px){` +
  //           `#` +
  //           this.ccid +
  //           ` .accordion-button  {
  //             font-size: ${sizemoile}px
  //         }}`
  //       );

  //       // this.view.render();
  //       editor.refresh();
  //     },
  //     changelinetmobile() {
  //       const sizemoile = this.getAttributes()["data-sizetitrelinemobile"];
  //       editor.addStyle(
  //         `@media(max-width:991px){` +
  //           `#` +
  //           this.ccid +
  //           ` .accordion-button  {
  //             line-height: ${sizemoile}px
  //         }}`
  //       );

  //       // this.view.render();
  //       editor.refresh();
  //     },
  //     changesizebmobile() {
  //       const sizebodymobile = this.getAttributes()["data-sizebodymobile"];
  //       editor.addStyle(
  //         `@media(max-width:991px){` +
  //           `#` +
  //           this.ccid +
  //           ` .accordion-body  {
  //             font-size: ${sizebodymobile}px
  //         }}`
  //       );

  //       // this.view.render();
  //       editor.refresh();
  //     },
  //     changelinebmobile() {
  //       const sizebodylinemobile =
  //         this.getAttributes()["data-sizebodylinemobile"];
  //       editor.addStyle(
  //         `@media(max-width:991px){` +
  //           `#` +
  //           this.ccid +
  //           ` .accordion-body  {
  //          line-height: ${sizebodylinemobile}px
  //         }}`
  //       );

  //       // this.view.render();
  //       editor.refresh();
  //     },
  //     changecolorStyle() {
  //       const color = this.getAttributes()["data-color"];
  //       const ths = this.find("a");
  //       editor.addStyle(
  //         `#` +
  //           this.ccid +
  //           ` .accordion-button:not(.collapsed)  {
  //          color: ${color}
  //         }`
  //       );

  //       // this.view.render();
  //       editor.refresh();
  //     },
  //     changeActiveStyle() {
  //       const coloractive = this.getAttributes()["data-coloractive"];
  //       const ths = this.find("a");
  //       editor.addStyle(
  //         `#` +
  //           this.ccid +
  //           ` .accordion-header button  {
  //          color: ${coloractive}
  //         }`
  //       );

  //       // this.view.render();
  //       editor.refresh();
  //     },
  //     changetitleCorps() {
  //       const colorbodytitle = this.getAttributes()["data-colorbodytitle"];
  //       const ths = this.find("a");
  //       editor.addStyle(
  //         `#` +
  //           this.ccid +
  //           ` .accordion-body {
  //          color: ${colorbodytitle}
  //         }`
  //       );

  //       // this.view.render();
  //       editor.refresh();
  //     },

  //     changebackgroundStyle() {
  //       const colorfont = this.getAttributes()["data-colorfont"];
  //       const ths = this.find("a");
  //       editor.addStyle(
  //         `#` +
  //           this.ccid +
  //           ` .accordion-header button {
  //             background: ${colorfont}
  //         }`
  //       );

  //       // this.view.render();
  //       editor.refresh();
  //     },
  //     changeBackgroundCorps() {
  //       const bgbody = this.getAttributes()["data-bgbody"];
  //       const ths = this.find("a");
  //       editor.addStyle(
  //         `#` +
  //           this.ccid +
  //           ` .accordion-item {
  //             background: ${bgbody}
  //         }`
  //       );

  //       // this.view.render();
  //       editor.refresh();
  //     },
  //     changePosition() {
  //       if (this.getAttributes()["data-positionicon"] == "gauche") {
  //         editor.addStyle(
  //           `#` +
  //             this.ccid +
  //             `  .accordion-button i {   float: right }
  //                .accordion-button {   display: block }`
  //         );

  //         this.view.render();
  //         editor.refresh();
  //       } else {
  //         editor.addStyle(
  //           `#` + this.ccid + `  .accordion-button i {   float: none }`
  //         );
  //         editor.refresh();
  //       }
  //     },

  //     changeModels() {
  //       // const dataModelaccor = this.getAttributes()["data-modelaccor"];
  //       // if (dataModelaccor === "model1") {
  //       //   this.addClass("accordion-collapse show"); // Add the class
  //       //   console.log('model1')
  //       //   editor.refresh(); // Refresh the editor if needed
  //       // } else {
  //       //   this.removeClass("accordion-collapse show"); // Remove the class
  //       //   console.log('model2')
  //       //   editor.refresh(); // Refresh the editor if needed
  //       // }
  //     },
  //   },

  //   view: {
  //     init({ el, model }) {
  //       this.listenTo(model, "active", this.doStuff);

  //       // listen for active event
  //     },

  //     doStuff() {},

  //     async onRender({ el, model }) {},
  //   },
  //   isComponent: (el) => {
  //     if (el.classList && el.classList.contains("accordion-gjs")) {
  //       return {
  //         type: "accordionType",
  //       };
  //     }
  //   },
  // });

  /************Map********* */
  /*dc.addType("mapType", {
    model: {
      defaults: {
        changed: 1,
        activeOnRender: 1,
        removable: true,
        draggable: true,
        droppable: false,
        badgable: true,
        stylable: true,
        highlightable: true,
        copyable: false,
        resizable: true,
        editable: true,
        traits: [
          {
            type: "button",
            name: "add",
            full: true,
            text: "Ajouter un  marqueur",
            command: (editor) => {
              const cmp = editor.getSelected();

              let marker =
                "data-marker" + Object.keys(cmp.getAttributes()).length;
              let radius =
                "data-marker" +
                Object.keys(cmp.getAttributes()).length +
                "radius";
              cmp.addAttributes({ [marker]: "" });
              cmp.addAttributes({ [radius]: "" });
              cmp.addTrait(
                {
                  type: "text",
                  name: marker,
                  label: "Marqueur :",
                },
                { at: 1 }
              );
              cmp.addTrait(
                {
                  type: "number",
                  name: radius,
                  label: "Zone en KM :",
                },
                { at: 2 }
              );
            },
          },

          { type: "text", name: "data-marker", label: "Marqueur :" },
          { type: "number", name: "markerradius", label: "Zone en KM :" },

          { type: "text", name: "data-center", label: "Centre :" },
          {
            type: "range",
            name: "data-zoom",
            label: "zoom :",
            min: 1,
            max: 20,
          },
          {
            type: "checkbox",
            name: "data-filter",
            label: "Map grisé :",
            valueTrue: "YES", // Value to assign when is checked, default: `true`
            valueFalse: "NO", // Value to assign when is unchecked, default: `false`
          },
          {
            type: "button",
            full: true,
            name: "update",
            text: "Mettre à jour",
            command: async (editor) => {
              let cmp = editor.getSelected();
              let attr = cmp.getAttributes();

              Object.keys(attr).map((key) => {
                if (key.indexOf("marker") > -1 && key.indexOf("radius") == -1) {
                  if (attr[key] == "") {
                    cmp.removeAttributes(key);
                    cmp.removeTrait(key);
                    cmp.removeAttributes(key + "radius");
                    cmp.removeTrait(key + "radius");
                  }
                }
              });
              cmp = editor.getSelected();
              let newAttr = cmp.getAttributes();

              let Markers = [];
              let geo;
              await Promise.all(
                (Markers = Object.keys(newAttr).map(async (key) => {
                  if (newAttr[key].length > 0) {
                    if (
                      key.indexOf("marker") > -1 &&
                      key.indexOf("radius") == -1
                    ) {
                      const response = await fetch(
                        `https://maps.googleapis.com/maps/api/geocode/json?address=${newAttr[key]}&key=${process.env.REACT_APP_GOOGLE_KEY}`
                      );
                      const area = await fetch(
                        `google.maps.geometry.spherical.computeDistanceBetween(location1, location2);&key=${process.env.REACT_APP_GOOGLE_KEY}`
                      );
                      geo = await response.json();

                      Markers.push({
                        lat: geo.results[0].geometry.location.lat,
                        lng: geo.results[0].geometry.location.lng,
                        title: newAttr[key],
                        radius: newAttr[key + "radius"]
                          ? newAttr[key + "radius"] * 1000
                          : newAttr[key + "radius"],
                      });
                    }
                  }
                }))
              ).then(async () => {
                const MarkersNew = Markers.filter((element) => {
                  if (Object.keys(element).length !== 0) {
                    return true;
                  }

                  return false;
                });
                var point;
                if (newAttr["data-center"]) {
                  const response = await fetch(
                    `https://maps.googleapis.com/maps/api/geocode/json?address=${newAttr["data-center"]}&key=${process.env.REACT_APP_GOOGLE_KEY}`
                  );
                  let geo = await response.json();

                  point = {
                    lat: geo.results[0].geometry.location.lat,
                    lng: geo.results[0].geometry.location.lng,
                  };
                } else {
                  point = {
                    lat: MarkersNew[0].lat,
                    lng: MarkersNew[0].lng,
                  };
                }
                await axios
                  .post(
                    process.env.REACT_APP_API_URL + "/plugins/updateoption/",
                    {
                      PageSchema: opts.pages,
                      ref: newAttr.id,
                      options: { items: MarkersNew },
                      function: {
                        center: point,
                        zoom: newAttr["data-zoom"]
                          ? parseInt(newAttr["data-zoom"])
                          : 8,
                      },
                    }
                  )
                  .then(async (response) => {
                    editor.refresh();
                    var wrapper = editor.DomComponents.getWrapper();
                    wrapper.view.render();
                  });
              });
            },
          },
        ],
        attributes: {
          "data-marker": "Paris france",
          "data-center": "Paris france",
          "data-zoom": "8",
        },
      },
      changed() {
        this.set("change", 1);
      },

      async init() {
        this.on("change:attributes:data-filter", this.handleFilterChange);
      },

      async handleFilterChange() {
        let filter = this.get("attributes")["data-filter"];
        let id = this.get("attributes").id;
        const css = editor.Css;
        const rules = css.getRule(`#${id}`);
        let ruleCss = rules.toCSS();
        const json = toJSON(ruleCss);
        const cssprops = json.children[`#${id}`].attributes;

        if (filter == "YES") {
          json.children[`#${id}`].attributes.filter = "grayscale(1)";
          const cssString = toCSS(json);
          css.setRule(`#${id}`, json.children[`#${id}`].attributes);
          // Check rules
        } else {
          delete json.children[`#${id}`].attributes.filter;
          const cssString = toCSS(json);
          css.setRule(`#${id}`, json.children[`#${id}`].attributes);
        }
      },
    },

    view: {
      events: {
        click: "clickOnElement",
      },
      clickOnElement() {
        document.getElementById("EditorRightSidebar").classList.add("active");
      },
      init({ el, model }) {
        editor.Commands.add("selectMap", (editor) => {
          editor.select(model);
        });

        this.listenTo(model, "active", this.doStuff);

        // listen for active event
      },

      async doStuff() {
        this.model.append(
          `<script defer src="${
            process.env.REACT_APP_API_URL +
            "/plugins/functionbyref/" +
            this.model.getAttributes().id
          }"></script>`
        );
        let cmp = this.model.find("#map");
        cmp[0].setAttributes({
          id: "wrapper-" + this.model.getAttributes().id,
        });

        cmp[0].setStyle({ height: "400px" });
        let maptype = "";
        const css = editor.Css;
        const cssRule = {
          position: "relative",
          height: "400px",
          padding: "10px 0px",
          overflow: "hidden",
        };
        css.setRule(`#${this.model.getAttributes().id}`, cssRule);
        await axios
          .get(process.env.REACT_APP_API_URL + "/plugins/getbytype/map")
          .then(async (response) => {
            maptype = response.data.data[0]._id;
            await axios
              .post(process.env.REACT_APP_API_URL + "/plugins/updateoption/", {
                ref: this.model.getAttributes().id,
                options: {
                  items: [
                    { lat: 48.8588897, lng: 2.320041, title: "Paris france" },
                  ],
                },
                function: {
                  center: { lat: 48.8588897, lng: 2.320041 },
                  zoom: 8,
                },
                PluginSchema: maptype,
                PageSchema: opts.page,
              })
              .then((response) => {});
          });
      },
      async onRender({ el, model }) {
        let attr = model.get("attributes");
        let trts = model.getTraits();
        let filtredtrts = [];
        for (let tr in trts) {
          filtredtrts.push(trts[tr].id);
        }
        Object.keys(attr).map((key) => {
          if (key.indexOf("marker") > -1) {
            if (
              key !== "marker" &&
              !filtredtrts.includes(key) &&
              key.indexOf("radius") == -1
            ) {
              model.addTrait(
                { type: "text", name: key, label: "Marqueur :" },
                { at: 1 }
              );
              let r = key + "radius";
              model.addTrait(
                { type: "number", name: r, label: "Zone :" },
                { at: 2 }
              );
            }
          }
        });
      },
    },
    isComponent: (el) => {
      if (el.classList && el.classList.contains("map-gjs")) {
        return {
          type: "mapType",
        };
      }
    },
  });*/

  // *************menu**********
  /*   dc.addType("Map", {
    model: {
      defaults: {
        activeOnRender: 1,
        attributes: {
          adresse: "Paris france",
        },
        traits: [
          {
            type: "text",
            name: "adresse",
            label: "Adresse",
          },
          {
            type: "button",
            label: "Mettre à jours l'adresse",
            text: "Appliquer",
            full: true, // Full width button
            command: (editor) => {
              editor.getSelected().updateAdresse();
            },
          },
        ],
      },

      async init() {},
      updateAdresse() {
        let attr = this.getAttributes();
        console.log(attr.src);
      },
    },

    view: {
      init({ el, model }) {
        this.listenTo(model, "active", this.doStuff);

        // listen for active event
      },

      async doStuff() {
        let attr = this.model.getAttributes();
        await axios
          .get(process.env.REACT_APP_API_URL + "/sites/get/" + opts.site)
          .then(async (response) => {
            const address = response.data.data.site.adresse.text
              ? response.data.data.site.adresse.text
              : "Paris france";

            attr.adresse = address;
            this.model.setAttributes(attr);
            this.model.view.render();
          });
      },
      async onRender({ el, model }) {
        let attr = this.model.getAttributes();
        const res = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${attr.adresse}&key=${process.env.REACT_APP_GOOGLE_KEY}`
        );
        let geo = await res.json();
        let lat = geo.results[0].geometry.location.lat;
        let lng = geo.results[0].geometry.location.lng;
        let src = `https://www.google.com/maps?q=${lat},${lng}&z=15&output=embed`;

        console.log(attr);
        this.model.setAttributes(attr);
        this.model.replaceWith(`<iframe
            width="100%"
            height="400"
            style="border:0"
            loading="lazy"
            allowfullscreen
            frameborder="0"
            referrerpolicy="no-referrer-when-downgrade"
            src="${src}">
          </iframe>`);
      },
    },
    isComponent: (el) => {
      if (el.classList && el.classList.contains("map-gjs")) {
        return {
          type: "Map",
        };
      }
    },
  }); */

  dc.addType("breadcrumb", {
    model: {
      defaults: {
        activeOnRender: 1,
        resizable: true,
        editable: true,
        droppable: true,
        //  traits: [  {
        //   type: "color",
        //   name: "colorbread",
        //   label: "Couleur ",
        // },
        // ]
      },

      updated() {
        this.toHTML();
        editor.refresh();
      },
      async init() {
        //  this.on("change:attributes:colorbread", this.changeColor);
      },

      //  changeColor() {
      //   const colorbread = this.getAttributes().colorbread;
      //    editor.addStyle(`.breadcrumb li a i{  color: ${colorbread};!important }`);
      //    this.view.render();
      //    editor.refresh();
      // },
    },

    view: {
      init({ el, model }) {
        this.listenTo(model, "active", this.doStuff);
      },
      async doStuff() {
        const id = "logo-" + uuidv4();
        const att = this.model.getAttributes();
        att.logo = id;
        this.model.setAttributes(att);
        editor.select(this.model);
      },
      async onRender({ el, model }) {
        await axios
          .get(process.env.REACT_APP_API_URL + "/sites/get/" + opts.site)
          .then(async (response) => {
            editor.Css.addRules(`.breadcrumb li {
              display: inline-block;
              background: url(${
                response.data.data.site.breadcrumb
              }?v=${uuidv4()});
              background-size: contain;
              background-repeat: no-repeat;
              background-position: center right;
              padding-right: 40px;
              margin: 5px;
          }`);
          });
        axios
          .post(
            process.env.REACT_APP_API_URL + "/pages/breadcrumb/" + opts.site,
            { page: opts.page }
          )
          .then(async (response) => {
            let pages = response.data.data;
            var html = "";

            if (pages.url != "/") {
              var cls =
                pages.url ==
                window.location.href.substring(
                  window.location.href.lastIndexOf("/")
                )
                  ? "breadcrumb-item active"
                  : "breadcrumb-item";
              html +=
                '<li class="' +
                cls +
                '"><a href="/" class="linBreadcrumbs"><i class="fas fa-home "></i></a> </li>';
            }
            if (pages.url == "/") {
              var cls =
                pages.url ==
                window.location.href.substring(
                  window.location.href.lastIndexOf("/")
                )
                  ? "breadcrumb-item active"
                  : "breadcrumb-item";
              html +=
                '<li class="' +
                cls +
                '"><a href="/" class="linBreadcrumbs"><i class="fas fa-home "></i></a> </li>';
            } else {
              var cls =
                pages.url ==
                window.location.href.substring(
                  window.location.href.lastIndexOf("/")
                )
                  ? "breadcrumb-item active"
                  : "breadcrumb-item";
              html +=
                '<li  class="' +
                cls +
                '"><a href="' +
                pages.url +
                '" class="linBreadcrumbs">' +
                pages.label +
                "</a> </li>";
            }
            if (pages.children != null) {
              var cls =
                pages.children.url ==
                window.location.href.substring(
                  window.location.href.lastIndexOf("/")
                )
                  ? "breadcrumb-item active"
                  : "breadcrumb-item";
              html +=
                '<li  class="' +
                cls +
                '"><a href="' +
                pages.children.url +
                '" class="linBreadcrumbs">' +
                pages.children.label +
                "</a> </li>";

              if (pages.children.children != null) {
                var cls =
                  pages.children.children.url ==
                  window.location.href.substring(
                    window.location.href.lastIndexOf("/")
                  )
                    ? "breadcrumb-item active"
                    : "breadcrumb-item";
                html +=
                  '<li  class="' +
                  cls +
                  '"><a href="' +
                  pages.children.children.url +
                  '" class="linBreadcrumbs">' +
                  pages.children.children.label +
                  "</a> </li>";
              }
            }
            model.components(html);
          });
      },
    },
    isComponent: (el) => {
      if (el.classList && el.classList.contains("breadcrumb")) {
        return {
          type: "breadcrumb",
        };
      }
    },
  });

  dc.addType("tabulationType", {
    model: {
      defaults: {
        activeOnRender: 1,
        copyable: false,
        click: 0,
        traits: [
          {
            type: "button",
            label: "Ajouter une tab   ",
            text: "Ajouter",
            full: true, // Full width button
          },
          {
            type: "color",
            name: "color",
            label: "Couleur du  titre  active ",
          },
          {
            type: "color",
            name: "coloractive",
            label: "Couleur du  titre",
          },
          {
            type: "color",
            name: "colorfont",
            label: "Arrière-plan du  titre",
          },
          {
            type: "color",
            name: "bgbody",
            label: "Arrière-plan du  corp",
          },
          {
            type: "color",
            name: "colorbodytitle",
            label: "Couleur titre du  corp",
          },
          {
            type: "select",
            name: "positionicon",
            label: "Position icon ",
            options: [
              { value: "gauche", name: "Gauche" },
              { value: "droite", name: "Droite" },
            ],
          },
        ],
      },

      async init() {
        this.listenTo(this, "change:attributes:color", this.changecolorStyle);
        this.listenTo(
          this,
          "change:attributes:colorfont",
          this.changebackgroundStyle
        );
        this.listenTo(
          this,
          "change:attributes:coloractive",
          this.changeActiveStyle
        );
        this.listenTo(
          this,
          "change:attributes:bgbody",
          this.changeBackgroundCorps
        );
        this.listenTo(
          this,
          "change:attributes:colorbodytitle",
          this.changetitleCorps
        );
        this.listenTo(
          this,
          "change:attributes:positionicon",
          this.changePosition
        );
      },
      changecolorStyle() {
        const color = this.getAttributes().color;
        const ths = this.find("a");
        editor.addStyle(
          `#` +
            this.ccid +
            ` .accordion-button:not(.collapsed)  {
           color: ${color}
          }`
        );

        // this.view.render();
        editor.refresh();
      },
      changeActiveStyle() {
        const coloractive = this.getAttributes().coloractive;
        const ths = this.find("a");
        editor.addStyle(
          `#` +
            this.ccid +
            ` .accordion-header button  {
           color: ${coloractive}
          }`
        );

        // this.view.render();
        editor.refresh();
      },
      changetitleCorps() {
        const colorbodytitle = this.getAttributes().colorbodytitle;
        const ths = this.find("a");
        editor.addStyle(
          `#` +
            this.ccid +
            ` .accordion-body {
           color: ${colorbodytitle}
          }`
        );

        // this.view.render();
        editor.refresh();
      },

      changebackgroundStyle() {
        const colorfont = this.getAttributes().colorfont;
        const ths = this.find("a");
        editor.addStyle(
          `#` +
            this.ccid +
            ` .accordion-header button {
              background: ${colorfont}
          }`
        );

        // this.view.render();
        editor.refresh();
      },
      changeBackgroundCorps() {
        const bgbody = this.getAttributes().bgbody;
        const ths = this.find("a");
        editor.addStyle(
          `#` +
            this.ccid +
            ` .accordion-item {
              background: ${bgbody}
          }`
        );

        // this.view.render();
        editor.refresh();
      },
      changePosition() {
        if (this.getAttributes().positionicon == "gauche") {
          editor.addStyle(
            `#` +
              this.ccid +
              `  .accordion-button i {   float: right }
                 .accordion-button {   display: block }`
          );

          this.view.render();
          editor.refresh();
        } else {
          editor.addStyle(
            `#` + this.ccid + `  .accordion-button i {   float: none }`
          );
          editor.refresh();
        }
      },
    },

    view: {
      init({ el, model }) {
        this.listenTo(model, "active", this.doStuff);

        // listen for active event
      },

      doStuff() {},

      async onRender({ el, model }) {},
    },
    isComponent: (el) => {
      if (el.classList && el.classList.contains("tabs-gjs")) {
        return {
          type: "tabulationType",
        };
      }
    },
  });

  dc.addType("menufooter", {
    model: {
      defaults: {
        activeOnRender: 1,
        "data-resizable": true,
        "data-editable": true,
        "data-droppable": true,
        attributes: {
          "data-sizemenu": "intial",
          "data-orientation": "Vertical",
          "data-colormenu": "rgb(0 0 0 / 52%)",
          "data-colormenuhover": "#000",
          "data-bgsubmenu": "#fff",
        },
        traits: [
          {
            type: "number",
            name: "data-sizemenu",
            label: "taille des  liens",
          },
          {
            type: "color",
            name: "data-colormenu",
            label: "Couleur menu",
          },
          {
            type: "color",
            name: "data-colormenuhover",
            label: "Couleur survol",
          },
          {
            type: "color",
            name: "data-bgsubmenu",
            label: "Arrière plan sous menu",
          },
          {
            type: "select",
            name: "data-orientation",
            label: "Orientation : ",
            options: [
              { value: "Horizontal", name: "Horizontal" },
              { value: "Vertical", name: "Vertical" },
            ],
          },
        ],
      },

      updated() {
        this.toHTML();
        editor.refresh();
      },
      async init() {
        this.listenTo(
          this,
          "change:attributes:data-sizemenu",
          this.changeMenuSize
        );

        this.listenTo(
          this,
          "change:attributes:data-colormenu",
          this.changeMenuStyle
        );
        this.listenTo(
          this,
          "change:attributes:data-colormenuhover",
          this.changeMenuStyleHover
        );
        this.listenTo(
          this,
          "change:attributes:data-bgsubmenu",
          this.changesSubMenuStyleActive
        );

        this.on("change:attributes:data-orientation", this.changeOrientation);
      },
      changeMenuSize() {
        const sizemenu = this.getAttributes()["data-sizemenu"];
        const ths = this.find("a");
        editor.addStyle(
          `#` +
            this.ccid +
            ` ul li a{
           font-size: ${sizemenu}px
          }`
        );

        // this.view.render();
        editor.refresh();
      },
      changeMenuStyle() {
        const colorsubmenu = this.getAttributes()["data-colormenu"];
        const ths = this.find("a");
        editor.addStyle(
          `#` +
            this.ccid +
            ` ul li a{
           color: ${colorsubmenu}
          }`
        );

        // this.view.render();
        editor.refresh();
      },

      changesSubMenuStyleActive() {
        const couleursubmenu = this.getAttributes()["data-couleursubmenu"];
        const ths = this.find("a");
        editor.addStyle(
          `#` +
            this.ccid +
            ` .dropdown-menu.show  {
           background: ${couleursubmenu}
          }
       
        `
        );

        // this.view.render();
        editor.refresh();
      },
      /* Debut fuction change  menu  hover */
      changeMenuStyleHover() {
        const colormenuhover = this.getAttributes()["data-colormenuhover"];

        editor.addStyle(
          `#` +
            this.ccid +
            ` ul li a:hover  {
           color: ${colormenuhover} }`
        );
        //this.view.render();
        editor.refresh();
      },

      /* Debut fuction type  orientation  */
      changeOrientation() {
        if (this.getAttributes()["data-orientation"] == "Vertical") {
          editor.addStyle(
            `#` +
              this.ccid +
              ` ul.navbar-nav { flex-direction: column;!important }`
          );
          this.view.render();
          editor.refresh();
          // this.setRule()
        } else {
          editor.addStyle(
            `#` +
              this.ccid +
              ` ul.navbar-nav {  flex-direction: row;!important }`
          );
          //this.view.render();
          editor.refresh();
        }
      },
      /* Fin fuction type  orientation  */
    },

    view: {
      init({ el, model }) {
        this.listenTo(model, "active", this.doStuff);
      },
      async doStuff() {
        const att = this.model.getAttributes();

        this.model.setAttributes(att);
        editor.select(this.model);
      },
      async onRender({ el, model }) {
        const id = "navbar-" + uuidv4();
        let scripts = model.find("script");
        await axios
          .get(process.env.REACT_APP_API_URL + "/pages/getlist/" + opts.site)
          .then(async (response) => {
            let content = `
            <script>
            $(document).ready(function(){
              var page = window.location.href.substring(window.location.href.lastIndexOf('/'));
          
        
              $(".menufooter-gjs a").removeClass("active")
         
              if($(".menufooter-gjs a[href$='"+page+"']").hasClass("dropdown-item")){
                $(".menufooter-gjs a[href$='"+page+"']").parent().parent().parent().find("a.dropdown-toggle.footers").addClass("active")
              }
              $(".menufooter-gjs a[href$='"+page+"']").addClass("active")
             })
            </script>
            <ul class="navbar-nav   demo p-2" id="${id}">`;
            let pages = response.data.data;

            await Promise.all(
              pages.map((item) => {
                if (item.children.length > 0) {
                  content += `
                <li class="nav-item dropdown"> <a class="nav-link dropdown-toggle footers" href="#" id="sub-${item._id}"  aria-expanded="false" role="button" data-bs-toggle="dropdown">${item.title}</a>
                  <ul class="dropdown-menu" aria-labelledby="sub-${item._id}"> `;
                  item.children?.map((child) => {
                    if (child.children.length > 0) {
                      content += `
                          <li class="nav-item dropdown"> 
                          <a class="nav-link dropdown-toggle footers" href="#" id="sub-${child._id}"  aria-expanded="false" role="button" data-bs-toggle="dropdown">${child.title}</a>
                          <ul class="dropdown-menu" aria-labelledby="sub-${child._id}">`;
                      child.children?.map((subchild) => {
                        content += `<li class="nav-item"><a class="dropdown-item f"  href="${subchild.url}" title="${subchild.title}"> 
                              ${subchild.title} </a> </li>
                              `;
                      });
                      content += "</ul></li>";
                    } else {
                      content += ` <li class="nav-item"><a class="dropdown-item f"  href="${child.url}" title="${child.title}"> 
                    ${child.title} </a> </li>`;
                    }
                  });

                  content += `</ul>    </li>`;
                } else {
                  content += `<li class="nav-item"><a class="${
                    item.url == "/" ? "nav-link active" : "nav-link"
                  }"  id=${item._id} href="${item.url}" title="${
                    item.title
                  }"> ${item.title}</a></li>`;
                }
              })
            );

            model.components(content);
            model.toHTML();
            model.addClass(["navbar"]);
          });
      },
    },
    isComponent: (el) => {
      if (el.classList && el.classList.contains("menufooter-gjs")) {
        // if (el.classList && el.classList.contains("menu")) {
        return {
          type: "menufooter",
        };
      }
    },
  });
};
