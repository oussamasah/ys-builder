import { v4 as uuidv4 } from "uuid";
import Link from "../../../../../assets/imgEditorBlocks/link-solid.png";
export default (editor, opts = {}) => {
  const bm = editor.BlockManager;

  bm.add("Lien", {
    label: `<div class="d-flex flex-column align-self-center"><img src=${Link} class="imgTitreWidget"/></i><span class="titreWidget mt-3">Lien hypertext</span></div>`,
    category: "BASICS",
    type: "Lien",
    attributes: {
      class: "basic",
    },
    content: `<a data-gjs-draggable=".gjs-cell,.gjs-row div,.container,main,footer,header" data-type-droppabe="true" id="link-${uuidv4()}" href="#" class="gjs-lien" data-gjs-droppable="true" >Text du Lien</a>`,
  });
};
