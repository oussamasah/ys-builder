import { v4 as uuidv4 } from "uuid";
export default (editor, opts = {}) => {
  const bm = editor.BlockManager;

  bm.add("Navigation", {
    label: `<div class="d-flex flex-column align-self-center"><i class="fa fa-bars"></i><span class="titreWidget mt-3">navigation</span></div>`,
    category: "BASICS",
    attributes: {
      class: "populaires navigation",
    },
    type: "Navigation",
    activeOnRender: 1,
    content: `<div class="gjs-navigation fill-effect" data-model="horizontal" data-gjs-draggable=".gjs-cell,.gjs-row div,.container,main,footer,header"><nav class="gjs-nav d-flex  align-items-center"></nav></div>`,
  });
};
