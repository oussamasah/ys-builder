
import RecentPost from "../../../../../assets/ImgBlog/RecentPost.png";
import { v4 as uuidv4 } from "uuid";

// import { v4 as uuidv4 } from "uuid";
export default (editor, opts = {}) => {
  const bm = editor.BlockManager;
  bm.add("Catgegory", {
    label: `<div class="d-flex flex-column align-self-center"><img src=${RecentPost} class="imgTitreWidget"/><span class="titreWidget mt-3">Tous les articles</span></div>`,
    category: "BLOGS",
    attributes: {
      class: "populaires accordion-gjs",
    },
    content: `<div class="gjs-blog-catgegory grid-view"  id="blog-${uuidv4()}" data-params='{&quot;nbr&quot;:5,&quot;postBtnTxt&quot;:&quot;Lire plus&quot;,&quot;postBtn&quot;:&quot;true&quot;,&quot;postDate&quot;:&quot;true&quot;,&quot;postCategory&quot;:&quot;true&quot;,&quot;postThumb&quot;:&quot;true&quot;,&quot;carrousel&quot;:&quot;true&quot;,&quot;category&quot;:&quot;tous&quot;}'>

  </div>`,
  });
};
