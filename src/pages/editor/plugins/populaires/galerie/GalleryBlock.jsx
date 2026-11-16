import { v4 as uuidv4 } from "uuid";
import gallery from "../../../../../assets/imgEditorBlocks/gallery.svg";
export default (editor, opts = {}) => {
  const bm = editor.BlockManager;

  bm.add("Gallery", {
    label: `<div class="d-flex flex-column align-self-center"><img src=${gallery} class="imgTitreWidget"/><span class="titreWidget mt-3">Galerie</span></div>`,

    category: "BASICS",
    attributes: {
      class: "populaires navigation",
    },
    type: "Gallery",
    activeOnRender: 1,
    content: `	<div class="gjs-gallery"></div>`,
  });
};
