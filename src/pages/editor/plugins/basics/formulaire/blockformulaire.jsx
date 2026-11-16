import form from "../../../../../assets/imgEditorBlocks/form.png";
import { v4 as uuidv4 } from "uuid";
export default (editor, opts = {}) => {
  const bm = editor.BlockManager;
  bm.add("Formulaire", {
    label: `<div class="d-flex flex-column align-self-center "><img src=${form} class="imgTitreWidget"/><span class="titreWidget mt-3">Formulaire du contact</span></div>`,
    category: "FORMULAIRES",
    attributes: {
      class: "FORMULAIRES formulaire-gjs",
    },
    content: `<form method="POST"  class="formulaire p-2  FormModelOne formulaire-gjs" name="Formulaire Contact" id="form-${uuidv4()}" data-gjs-type="FormulaireType" draggable="true" method="POST" name="Formulaire Contact" data-border-size="{&quot;all&quot;:&quot;1&quot;,&quot;top&quot;:&quot;1&quot;,&quot;left&quot;:&quot;1&quot;,&quot;right&quot;:&quot;1&quot;,&quot;bottom&quot;:&quot;1&quot;}" data-border-style="solid" data-border-color="#eee" data-border-type="all" data-border-sizechrd="{&quot;topLeft&quot;:&quot;1&quot;,&quot;topRight&quot;:&quot;1&quot;,&quot;bottomLeft&quot;:&quot;1&quot;,&quot;bottomRight&quot;:&quot;1&quot;}" data-input-bg="#fff" data-border-sizebn="{&quot;all&quot;:&quot;1&quot;,&quot;top&quot;:&quot;1&quot;,&quot;left&quot;:&quot;1&quot;,&quot;right&quot;:&quot;1&quot;,&quot;bottom&quot;:&quot;1&quot;}" data-border-stylebn="solid" data-border-colorbn="#eee" data-border-typebn="undefined" data-btn-bg="rgb(255, 255, 255,1)" data-border-sizebnrd="{&quot;topLeft&quot;:&quot;1&quot;,&quot;topRight&quot;:&quot;1&quot;,&quot;bottomLeft&quot;:&quot;1&quot;,&quot;bottomRight&quot;:&quot;1&quot;}" data-title="Contactez-nous" data-submit="Envoyer" data-captcha="true" data-items="[{&quot;id&quot;:&quot;input-b714f55f-c141-42c2-8c14-71df21073f0c&quot;,&quot;title&quot;:&quot;Nom&quot;,&quot;type&quot;:&quot;texte&quot;,&quot;placeholder&quot;:&quot;Nom&quot;,&quot;options&quot;:[],&quot;required&quot;:&quot;true&quot;,&quot;activelabel&quot;:&quot;true&quot;,&quot;size&quot;:&quot;100&quot;,&quot;position&quot;:&quot;false&quot;},{&quot;id&quot;:&quot;input-2cddfbd8-442a-410a-970e-18f6d46e6610&quot;,&quot;title&quot;:&quot;Prénom&quot;,&quot;type&quot;:&quot;texte&quot;,&quot;placeholder&quot;:&quot;Prénom&quot;,&quot;options&quot;:[],&quot;required&quot;:&quot;true&quot;,&quot;activelabel&quot;:&quot;true&quot;,&quot;size&quot;:&quot;100&quot;,&quot;position&quot;:&quot;false&quot;},{&quot;id&quot;:&quot;input-fca7bd4a-d6a0-4d1b-8a97-a03dc1b6b0ef&quot;,&quot;title&quot;:&quot;Téléphone&quot;,&quot;type&quot;:&quot;numero&quot;,&quot;placeholder&quot;:&quot;Téléphone&quot;,&quot;options&quot;:[],&quot;required&quot;:&quot;false&quot;,&quot;activelabel&quot;:&quot;true&quot;,&quot;size&quot;:&quot;100&quot;,&quot;position&quot;:&quot;false&quot;},{&quot;id&quot;:&quot;input-f9d2c610-968e-43e2-9156-316aa168cefc&quot;,&quot;title&quot;:&quot;Email&quot;,&quot;type&quot;:&quot;email&quot;,&quot;placeholder&quot;:&quot;Email&quot;,&quot;options&quot;:[],&quot;required&quot;:&quot;true&quot;,&quot;activelabel&quot;:&quot;true&quot;,&quot;size&quot;:&quot;100&quot;,&quot;position&quot;:&quot;false&quot;},{&quot;id&quot;:&quot;input-c5408960-621e-4a98-8c80-a5bf29a65f9c&quot;,&quot;title&quot;:&quot;Message&quot;,&quot;type&quot;:&quot;textarea&quot;,&quot;placeholder&quot;:&quot;Message&quot;,&quot;options&quot;:[],&quot;required&quot;:&quot;false&quot;,&quot;activelabel&quot;:&quot;true&quot;,&quot;size&quot;:&quot;100&quot;,&quot;position&quot;:&quot;false&quot;},{&quot;id&quot;:&quot;input-1ca6ef30-ca82-4a96-ad62-5c35a7458cf2&quot;,&quot;title&quot;:&quot;Title or question 6&quot;,&quot;type&quot;:&quot;checkbox&quot;,&quot;placeholder&quot;:&quot;Contenu du item&quot;,&quot;options&quot;:[{&quot;id&quot;:&quot;input-cbffeceb-4a3c-4b50-a249-fcce7464c409&quot;,&quot;value&quot;:&quot;option&quot;,&quot;label&quot;:&quot;label 0&quot;}],&quot;required&quot;:&quot;false&quot;,&quot;activelabel&quot;:&quot;false&quot;,&quot;activeInputP&quot;:&quot;false&quot;,&quot;size&quot;:&quot;100&quot;,&quot;position&quot;:&quot;false&quot;}]" data-input-sa="#000" data-input-et="#000" data-input-selectcolor="#000" data-input-selectbg="#000" data-btn-bgh="#000" data-btn-text-hover="#000" data-btn-padding="{&quot;top&quot;:&quot;15&quot;,&quot;left&quot;:&quot;15&quot;,&quot;right&quot;:&quot;15&quot;,&quot;bottom&quot;:&quot;15&quot;}" data-btn-margin="{&quot;top&quot;:&quot;0&quot;,&quot;left&quot;:&quot;0&quot;,&quot;right&quot;:&quot;0&quot;,&quot;bottom&quot;:&quot;0&quot;}" data-activeborder="false" data-title-padding="{&quot;top&quot;:&quot;5&quot;,&quot;left&quot;:&quot;5&quot;,&quot;right&quot;:&quot;5&quot;,&quot;bottom&quot;:&quot;5&quot;}" data-title-margin="{&quot;top&quot;:&quot;0&quot;,&quot;left&quot;:&quot;0&quot;,&quot;right&quot;:&quot;0&quot;,&quot;bottom&quot;:&quot;0&quot;}" data-ch-padding="{&quot;top&quot;:&quot;5&quot;,&quot;left&quot;:&quot;5&quot;,&quot;right&quot;:&quot;5&quot;,&quot;bottom&quot;:&quot;5&quot;}" data-ch-margin="{&quot;top&quot;:&quot;0&quot;,&quot;left&quot;:&quot;0&quot;,&quot;right&quot;:&quot;0&quot;,&quot;bottom&quot;:&quot;0&quot;}" data-activesizeinput="false" class="formulaire formulaire-gjs FormModelOne">

 <div class="formulairess">
 <div class="mb-3">
  <input class="form-control" type="text" placeholder="Nom" aria-label="default input example" id="nom" name="nom">
  </div>
  <div class=" iputs mb-3" >
  <input class="form-control" type="text" placeholder="Prénom" aria-label="default input example" id="prenom" name="prenom">
  </div>
  <div class="iputs mb-3">
  <input class="form-control" type="email" placeholder="E-mail" aria-label="default input example" id="email" name="email">
  </div>
  <div class="iputs mb-3">
  <input class="form-control" type="tel" placeholder="Téléphone" aria-label="default input example" id="tel" name="tel">
  </div>
  <div class="mb-3">
  <textarea  name="message" class="form-control"type="textarea" id="exampleFormControlTextarea1" placeholder="Message" rows="3" ></textarea>
  </div>
  </div>
  <div class="mb-3 form-check">
    <input type="checkbox" class="form-check-input" id="exampleCheck1">
    <label class="form-check-label" for="exampleCheck1">Check me out</label>
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
  `,
  });
};
