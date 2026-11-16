import grapesjs from "grapesjs";

import ButtonComponent from "./ButtonComponent";
import ButtonBlocks from "./ButtonBlock";
export default grapesjs.plugins.add("ButtonBlocks", (editor, opts) => {
  let options = {
    label: "BASICS",
    name: "basic",
    category: "BASICS",
  };
  for (let name in options) {
    if (!(name in opts)) opts[name] = options[name];
  }
  ButtonBlocks(editor, opts);
  ButtonComponent(editor, opts);
});
