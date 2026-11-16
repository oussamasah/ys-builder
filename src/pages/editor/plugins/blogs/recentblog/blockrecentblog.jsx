import RecentPosts from "../../../../../assets/ImgBlog/RecentPosts.png";
import { v4 as uuidv4 } from "uuid";
export default (editor, opts = {}) => {
  const bm = editor.BlockManager;
  bm.add("Recent", {
    label: `<div class="d-flex flex-column align-self-center "><img src=${RecentPosts} class="imgTitreWidget"/><span class="titreWidget mt-3">Articles récents</span></div>`,
    category: "BLOGS",
    attributes: {
      class: "recent-gjs",
    },
    content: `<div  class="recentblog p-2  BlogModelOne  recent"  id="recent-${uuidv4()}" data-params="{&quot;nbr&quot;:3,&quot;postBtnTxt&quot;:&quot;Lire plus&quot;,&quot;postBtn&quot;:&quot;true&quot;,&quot;postDate&quot;:&quot;true&quot;,&quot;postCategory&quot;:&quot;true&quot;,&quot;postThumb&quot;:&quot;true&quot;,&quot;carrousel&quot;:&quot;false&quot;}">

   </div>
  `,
  });
};
