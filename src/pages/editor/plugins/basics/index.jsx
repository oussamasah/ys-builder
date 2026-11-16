import grapesjs from "grapesjs";
import Component from "./component";
import Blocks from "./blocks";

import vignietteComponent from "./vigniette/vignietteComponent";

import FormulaireBlocks from "./formulaire/blockformulaire";
import SocialMediaBlock from "./ResauSocial/block";
//import RowBlock from "./Row/blockrow";
import SocialMediaComponent from "./ResauSocial/ResauSocialComponent";
import headerComponent from "./header/headerComponent";
import FormulaireComponent from "./formulaire/FormulaireComponent";
//import RowComponent from "./Row/RowComponent";
export default grapesjs.plugins.add("basicsBlocks", (editor, opts) => {

  let options = {
    label: "BASICS",
    name: "basic",
    category: "BASICS",
  };
  for (let name in options) {
    if (!(name in opts)) opts[name] = options[name];
  }
  Blocks(editor, opts);
  Component(editor, opts);
  FormulaireBlocks(editor, opts);
  SocialMediaBlock(editor, opts);
  //RowBlock(editor, opts);
  //RowComponent(editor, opts);
  FormulaireComponent(editor, opts);
  SocialMediaComponent(editor, opts);
  vignietteComponent(editor, opts);
  headerComponent(editor, opts);
});
