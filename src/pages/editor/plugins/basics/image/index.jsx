import grapesjs from "grapesjs";

import BlockImgForm from "./BlockImgForm";
import ComponentImage from "./ComponentImage";

export default grapesjs.plugins.add("ImageBlocks", (editor, opts) => {
  let options = {
    label: "BASICS",
    name: "basic",
    category: "BASICS",
  };
  for (let name in options) {
    if (!(name in opts)) opts[name] = options[name];
  }
  BlockImgForm(editor, opts);
  ComponentImage(editor, opts);
});
