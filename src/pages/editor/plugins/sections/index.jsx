import grapesjs from "grapesjs";
import Component from "./component";
import Blocks from "./blocks";
// import axios from "axios";

export default grapesjs.plugins.add("SectionsBlocks", async (editor, opts) => {

  let options = {
    label: "BLOCS DE TEXTE",
    name: "block_de_text",
    category: "BLOCS DE TEXTE",
  };

  for (let name in options) {
    if (!(name in opts)) opts[name] = options[name];
  }

  Blocks(editor, opts);
  Component(editor, opts);
});
