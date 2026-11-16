import RecentPost from "../../../../../assets/ImgBlog/RecentPost.png";
import { v4 as uuidv4 } from "uuid";
export default (editor, opts = {}) => {
  const bm = editor.BlockManager;
  bm.add("textblog", {
    label: `<div class="d-flex flex-column align-self-center "><img src=${RecentPost} class="imgTitreWidget"/><span class="titreWidget mt-3">Text blog</span></div>`,
    category: "POPULAIRES",
    attributes: {
      class: "textblog-gjs",
    },
    content: `<div  class=" p-2 post-element"  id="recent-${uuidv4()}">

</div>
  `,
  });
};
