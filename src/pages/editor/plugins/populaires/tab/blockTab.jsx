import tabulation from "../../../../../assets/imgEditorBlocks/tabulation.svg";
// import { v4 as uuidv4 } from "uuid";
export default (editor, opts = {}) => {
  const bm = editor.BlockManager;
  bm.add("Tab", {
    label: `<div class="d-flex flex-column align-self-center"><img src=${tabulation} class="imgTitreWidget"/><span class="titreWidget mt-3">Tabulation</span></div>`,
    category: "POPULAIRES",
    attributes: {
      class: "populaires accordion-gjs",
    },
    content: `<div class="gjs-tab TabModelOne">
    <ul class="nav nav-tabs" id="myTab" role="tablist">
    <li class="nav-item" role="presentation">
      <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Home</button>
    </li>
    <li class="nav-item" role="presentation">
      <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Profile</button>
    </li>
    <li class="nav-item" role="presentation">
      <button class="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button" role="tab" aria-controls="contact" aria-selected="false">Contact</button>
    </li>
  </ul>
  <div class="tab-content" id="myTabContent">
    <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">...</div>
    <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">...</div>
    <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">...</div>
  </div>
  </div>`,
  });
};
