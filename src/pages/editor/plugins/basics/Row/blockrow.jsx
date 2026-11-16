
import accordion from "../../../../../assets/imgEditorBlocks/accordion.svg";
import { v4 as uuidv4 } from "uuid";
export default (editor, opts = {}) => {
  const bm = editor.BlockManager;
  bm.add("Row", {
    label: `<div class="d-flex flex-column align-self-center"><img src=${accordion} class="imgTitreWidget"/><span class="titreWidget mt-3">Row</span></div>`,
    category: "BASICS",
    attributes: {
      class: "basics gjs-row",
    },
    content: 
    `  <div  id="row-${uuidv4()}"
    data-gjs-type="Row" draggable="true" 
    class="gjs-row rows" >
    <div data-gjs-type="Colonne" draggable="true" class="gjs-cell"></div>
</div>
  `
    ,
  });
}