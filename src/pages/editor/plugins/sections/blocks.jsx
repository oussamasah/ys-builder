// import slider from "../../../../assets/imgEditorBlocks/slider.svg";
// import form from "../../../../assets/imgEditorBlocks/form.png";
// import video from "../../../../assets/imgEditorBlocks/video.svg";
// import Link from "../../../../assets/imgEditorBlocks/link-solid.png";
// import accordion from "../../../../assets/imgEditorBlocks/accordion.svg";
// import gallery from "../../../../assets/imgEditorBlocks/gallery.svg";
// import cartMaps from "../../../../assets/imgEditorBlocks/cartMaps.png";
// import groupeSocial from "../../../../assets/imgEditorBlocks/groupeSocial.png";
// import reseau from "../../../../assets/imgEditorBlocks/reseau.png";
// import { v4 as uuidv4 } from "uuid";
// import $ from "jquery";
// import axios from "axios";
export default async (editor, opts = {}) => {
  // console.log("sssssssssss");
  // console.log(opts.site);
  // const id = uuidv4();
  // const bm = editor.BlockManager;
  // let section = [];
  // let models = [];
  // await axios
  //   .get(process.env.REACT_APP_API_URL + "/models/get/")
  //   .then((response) => {
  //     models = response.data.data;
  //   });

  /*   await Promise.all(
    section.map((sec) => {
      let script = sec.content.js;
      let css = sec.content.css;
      let html = sec.content.html;

      html = html.replace("</section>", `<style>${css}</style></section> `);
      if (script && script.length > 5) {
        html = html.replace(
          "</section>",
          `<script>${sec.content.js}</script></section> `
        );
      }
      bm.add(sec.ref, {
        label: `<div class="sectionBlocks" data-type="section" data-ref="${sec.ref}" style="background:url('${sec.capture}')"><div>`,
        category: sec.categorie.value,
        attributes: {
          class: "SLIDER menu-gjs",
        },
        activate: 1,
        content: `${html} `,
      });
    })
  ); */
};
