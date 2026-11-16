import grapesjs from "grapesjs";
import Component from "./component";
//import SwiperComponent from "./swiperComponent";

import IconComponent from "./Icon/IconComponent";
import Blocks from "./blocks";
import SliderComponent from "./sliders/SliderComponent";
// import PopupComponent from "./Popup/PopupComponent";
import TabComponent from "./tab/TabComponent";
import TabBlock from "./tab/blockTab";
import AccordionBlock from "./accordion/blockaccordions";
import AccordionComponent from "./accordion/AccordionComponent";
import navigationComponent from "./navigation/NavigationComponent";
import NavigationBlocks from "./navigation/NavigationBlock";
import GalleryBlock from "./galerie/GalleryBlock";
import GalleryComponent from "./galerie/GalleryComponent";
// import blockCatgegory from "./blog/blockCatgegory";

// import RecentBloks from "./recentblog/blockrecentblog";
// import TextBloks from "./textblog/blocktextblog";
// import TextBloksComponent from "./textblog/TextblogComponent";
// import RecentblogComponent from "./recentblog/RecentblogComponent";
//import BreadcrumbComponent from "./Breadcrumb/BreadcrumbComponent";

export default grapesjs.plugins.add("populairesBlocks", (editor, opts) => {
  let options = {
    label: "POPULAIRES",
    name: "populaires",
    category: "POPULAIRES",
  };
  for (let name in options) {
    if (!(name in opts)) opts[name] = options[name];
  }
  Blocks(editor, opts);
  TabBlock(editor, opts);
  AccordionBlock(editor, opts);
  Component(editor, opts);
  // BreadcrumbComponent(editor, opts);

  IconComponent(editor, opts);
  SliderComponent(editor, opts);
  // PopupComponent(editor, opts);
  NavigationBlocks(editor, opts);
  GalleryBlock(editor, opts);
  // RecentBloks(editor, opts);
  // TextBloksComponent(editor, opts);
  // TextBloks(editor, opts);
  // RecentblogComponent(editor, opts);
  GalleryComponent(editor, opts);
  navigationComponent(editor, opts);
  AccordionComponent(editor, opts);
  TabComponent(editor, opts);
  // blockCatgegory(editor, opts);

});
