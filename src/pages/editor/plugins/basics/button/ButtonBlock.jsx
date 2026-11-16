import { v4 as uuidv4 } from "uuid";
import btn from "../../../../../assets/imgEditorBlocks/button.svg";
export default (editor, opts = {}) => {
  const bm = editor.BlockManager;

  bm.add("Button", {
    label: `<div class="d-flex flex-column align-self-center"><img src=${btn} class="imgTitreWidget"/></i><span class="titreWidget mt-3">Bouton</span></div>`,
    category: "BASICS",
    type: "Button",
    attributes: {
      class: "basic",
    },
    content: `<a data-gjs-draggable=".gjs-cell,.gjs-row div,.container,main,footer,header" data-type-droppabel="true"  href="#" class="gjs-btn btn" data-gjs-droppable="true" role="button">Text du boutton</a>`,
  });
};
