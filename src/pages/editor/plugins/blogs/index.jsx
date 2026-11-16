import grapesjs from "grapesjs";
import RecentBloks from "./recentblog/blockrecentblog";
import TextBloks from "./textblog/blocktextblog";
import TextBloksComponent from "./textblog/TextblogComponent";
import RecentblogComponent from "./recentblog/RecentblogComponent";
import blockCatgegory from "./blog/blockCatgegory";
import CatgegoryComponent from "./blog/CatgegoryComponent";

export default grapesjs.plugins.add("blogsBlocks", (editor, opts) => {
  let options = {
    label: "BLOGS",
    name: "blogs",
    category: "BLOGS",
  };
  for (let name in options) {
    if (!(name in opts)) opts[name] = options[name];
  }
  CatgegoryComponent(editor, opts);
  //blockCatgegory(editor, opts);
  RecentBloks(editor, opts);
  TextBloksComponent(editor, opts);
  TextBloks(editor, opts);
  RecentblogComponent(editor, opts);
});
