
import accordion from "../../../../../assets/imgEditorBlocks/accordion.svg";
import { v4 as uuidv4 } from "uuid";
export default (editor, opts = {}) => {
  const bm = editor.BlockManager;
  bm.add("Accordion", {
    label: `<div class="d-flex flex-column align-self-center"><img src=${accordion} class="imgTitreWidget"/><span class="titreWidget mt-3">Accordion</span></div>`,
    category: "POPULAIRES",
    attributes: {
      class: "populaires accordion-gjs",
    },
    content: 
    `<div class="accordion accordion-gjs AccordionModelThree"  id="accordionExample-${uuidv4()}">
    <div class="accordionss"> 
    <div class="accordion-item"> 
      <h3 class="accordion-header" id="headingOne">
        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
        <div class="iconAccordion me-2 "></div>
          Accordion Item #1
        </button>
      
      </h3>
      <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample-${uuidv4()}">
        <div class="accordion-body">
          <p>This is the first item's accordion body.</p>
        </div>
      </div>
     </div>
    </div>
    </div>
  </div>
  

  `
    ,
  });
}