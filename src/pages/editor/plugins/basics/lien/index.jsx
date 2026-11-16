import grapesjs from "grapesjs";

import LienComponent from "./LienComponent";
import LienBlock from "./LienBlock";
export default grapesjs.plugins.add("LienBlock", (editor, opts) => {
  let options = {
    label: "BASICS",
    name: "basic",
    category: "BASICS",
  };
  for (let name in options) {
    if (!(name in opts)) opts[name] = options[name];
  }
  LienBlock(editor, opts);
  LienComponent(editor, opts);
});
