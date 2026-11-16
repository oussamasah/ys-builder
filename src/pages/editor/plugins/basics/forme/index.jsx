import grapesjs from "grapesjs";


import blockForme from "./blockForme";
import FormeComponent from "./FormeComponent";

export default grapesjs.plugins.add("FormeBlock", (editor, opts) => {
  let options = {
    label: "BASICS",
    name: "basic",
    category: "BASICS",
  };
  for (let name in options) {
    if (!(name in opts)) opts[name] = options[name];
  }
  blockForme(editor, opts);
  FormeComponent(editor, opts);
});
