// /* eslint-disable no-undef */
// /* eslint-disable import/no-anonymous-default-export */

// import axios from "axios";

// // import { v4 as uuidv4 } from "uuid";
// // import react from "react";
// // import ReactDOM from "react-dom/client";
// // import ModalPopup from "./ModalPopup";

// export default (editor, opts = {}) => {
//   const dc = editor.DomComponents;
//   const defaultType = dc.getType("default");
//   // const defaultView = defaultType.view;
//   // const { Modal } = editor;
//   dc.addType("modal-dialog", {
//     model: {
//       defaults: {
//         activeOnRender: 1,
//         resizable: true,
//         copyable: false,
//         droppable: false,
//         draggable: false,
//         editable: false,
//         removable: false,
//         selectable: true,
//       },
//       init() {},
//     },
//     view: {
//       init({ model }) {
//         // this.listenTo(model, "change:activeOnRender", this.doStuff);
//         // this.listenTo(model, "change:attributes:option", model.updateScript);
//       },

//       async onRender({ el, model }) {},
//     },
//     isComponent: (el) => {
//       if (el.classList && el.classList.contains("modal-dialog")) {
    
//         return {
//           type: "modal-dialog",
//         };
//       }
//     },
//   });
//   dc.addType("ModalType", {
//     model: {
//       defaults: {
//         activeOnRender: 1,
//         resizable: false,
//         copyable: false,
//         droppable: false,
//         draggable: false,
//         removable: false,
//         editable: false,
//         selectable: false,
//       },
//       init() {},
//     },
//     view: {
//       init({ model }) {
//         // this.listenTo(model, "change:activeOnRender", this.doStuff);
//         // this.listenTo(model, "change:attributes:option", model.updateScript);
//       },

//       onRender({ el, model }) {},
//     },
//     isComponent: (el) => {
//       if (el.classList && el.classList[0] == "modal") {
//         return {
//           type: "ModalType",
//         };
//       }
//     },
//   });

//   dc.addType("modal-content", {
//     model: {
//       defaults: {
//         activeOnRender: 1,
//         resizable: false,
//         copyable: false,
//         droppable: false,
//         draggable: false,
//         editable: false,
//         removable: false,
//         selectable: false,
//       },
//       init() {},
//     },
//     view: {
//       init({ model }) {
//         // this.listenTo(model, "change:activeOnRender", this.doStuff);
//         // this.listenTo(model, "change:attributes:option", model.updateScript);
//       },

//       onRender({ el, model }) {},
//     },
//     isComponent: (el) => {
//       if (el.classList && el.classList[0] == "modal-content") {
//         return {
//           type: "modal-content",
//         };
//       }
//     },
//   });
//   dc.addType("modal-body", {
//     model: {
//       defaults: {
//         activeOnRender: 1,
//         resizable: false,
//         copyable: false,
//         droppable: true,
//         draggable: false,
//         editable: true,
//         removable: false,
//         selectable: false,
//       },
//       init() {},
//     },
//     view: {
//       init({ model }) {
//         // this.listenTo(model, "change:activeOnRender", this.doStuff);
//         // this.listenTo(model, "change:attributes:option", model.updateScript);
//       },

//       onRender({ el, model }) {},
//     },
//     isComponent: (el) => {
//       if (el.classList && el.classList[0] == "modal-body") {
//         return {
//           type: "modal-body",
//         };
//       }
//     },
//   });
//   dc.addType("modal-header", {
//     model: {
//       defaults: {
//         activeOnRender: 1,
//         resizable: false,
//         copyable: false,
//         droppable: true,
//         draggable: false,
//       editable: true,
//         removable: false,
//         selectable: false,
//       },
//       init() {},
//     },
//     view: {
//       init({ model }) {
//         // this.listenTo(model, "change:activeOnRender", this.doStuff);
//         // this.listenTo(model, "change:attributes:option", model.updateScript);
//       },

//       onRender({ el, model }) {},
//     },
//     isComponent: (el) => {
//       if (el.classList && el.classList[0] == "modal-header") {
//         return {
//           type: "modal-header",
//         };
//       }
//     },
//   });
//   dc.addType("modal-button", {
//     model: {
//       defaults: {
//         activeOnRender: 1,
//         attributes: {
//           modal: "",
//         },
//       },
//       init() {},
//     },
//     view: {
//       init({ el, model }) {
//         this.listenTo(model, "change:attributes", this.update);
//       },
//       update() {
//         this.render();
//       },
//       events: {
//         click: "innerElClick",
//       },
//       innerElClick(ev) {
//         ev.preventDefault();
//       },
//       async onRender({ el, model }) {
//         const parentComponent = model.parent();
//         let collection;
//         if (parentComponent) {
//           collection = parentComponent.find("div.modal");
//         }

//         /* var componentsToRemove = parentComponent
//           .components()
//           .filter(function (component) {
//             return (
//               component &&
//               component.getEl() &&
//               component.getEl().classList &&
//               component.getEl().classList.contains("modal")
//             );
//           });
//         parentComponent.get("components").remove(componentsToRemove);*/
//         /*         let pops = parent.components().models;

//         pops.map((p) => {
//           const classes = p.getClasses();
//           if (classes && classes.contains("modal")) {
//             p.remove();
//           }
//         }); */

//         if (model.getAttributes().modal != "") {
//           await axios
//             .get(
//               process.env.REACT_APP_API_URL +
//                 "/popups/getByRef/" +
//                 model.getAttributes().modal
//             )
//             .then(async (response) => {
//               const content = response.data.data[0].content;
//               parentComponent.append(content.html.replace("show", ""));
//               editor.Css.addRules(content.css);
//               editor.Css.addRules(
//                 `#${model.getAttributes().modal}{display:none;}`
//               );
//             });
//         }
//         model.addAttributes({
//           "data-bs-target": "#" + model.getAttributes().modal,
//         });
//         await axios
//           .get(process.env.REACT_APP_API_URL + "/popups/getAll/" + opts.site)
//           .then(async (response) => {
//             const popups = response.data.data;
//             let popupObj = await Promise.all(
//               popups.map((p) => {
//                 return { id: p.ref, name: p.title };
//               })
//             );
//             model.removeTrait("modal");

//             model.addTrait({
//               type: "select",
//               name: "modal",
//               label: "Popup",
//               options: popupObj,
//             });
//           });
//       },
//     },
//     isComponent: (el) => {
//       if (el.classList && el.classList.contains("modal-button")) {
//         return {
//           type: "modal-button",
//         };
//       }
//     },
//   });
// };
