import image from "../../../../../assets/imgEditorBlocks/image.svg";
import { v4 as uuidv4 } from "uuid";

export default (editor, opts = {}) => {
  const bm = editor.BlockManager;

  bm.add("Image", {
    label: `<div class="d-flex flex-column align-self-center "><img src=${image} class="imgTitreWidget"/><span class="titreWidget mt-3">Image</span></div>`,
    category: "BASICS",
    type: "IMG",
    attributes: {
      class: "basic",
    },
    content: `<img  data-gjs-type="IMG" id="image-${uuidv4()}" class="gjs-img img" draggable="true" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIHZpZXdCb3g9IjAgMCAyNCAyNCIgc3R5bGU9ImZpbGw6IHJnYmEoMCwwLDAsMC4xNSk7IHRyYW5zZm9ybTogc2NhbGUoMC43NSkiPgogICAgICAgIDxwYXRoIGQ9Ik04LjUgMTMuNWwyLjUgMyAzLjUtNC41IDQuNSA2SDVtMTYgMVY1YTIgMiAwIDAgMC0yLTJINWMtMS4xIDAtMiAuOS0yIDJ2MTRjMCAxLjEuOSAyIDIgMmgxNGMxLjEgMCAyLS45IDItMnoiPjwvcGF0aD4KICAgICAgPC9zdmc+" alt="">`,
  });
};
