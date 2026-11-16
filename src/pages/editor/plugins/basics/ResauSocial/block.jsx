import reseau from "../../../../../assets/imgEditorBlocks/reseau.png";

import { v4 as uuidv4 } from "uuid";
export default (editor, opts = {}) => {
  const bm = editor.BlockManager;
  bm.add("social", {
    label: ` <div class="gjs-block-label" bis_skin_checked="1"><img src=${reseau} class="imgTitreWidget"/><span class="titreWidget mt-3">Social</span></div></div>`,
    category: "BASICS",
    attributes: {
      class: "BASICS social-gjs",
    },
    content: `<div data-gjs-highlightable="true" id="social-${uuidv4()}" data-gjs-type="Social" draggable="true" data-config="0,aucun" data-items="facebook,instagram" data-model-key="model_six" data-item-padding="{&quot;top&quot;:&quot;15&quot;,&quot;left&quot;:&quot;15&quot;,&quot;right&quot;:&quot;15&quot;,&quot;bottom&quot;:&quot;15&quot;}" data-item-margin="{&quot;top&quot;:&quot;0&quot;,&quot;left&quot;:&quot;0&quot;,&quot;right&quot;:&quot;0&quot;,&quot;bottom&quot;:&quot;0&quot;}" class="social-gjs annimation-undefined">
    <a href="#" title="facebook"  target="_blank" class="facebookLink">
    <svg class="lights" enable-background="new 0 0 56.693 56.693" id="Layer_1" version="1.1" viewBox="0 0 56.693 56.693" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <path d="M40.43,21.739h-7.645v-5.014c0-1.883,1.248-2.322,2.127-2.322c0.877,0,5.395,0,5.395,0V6.125l-7.43-0.029  c-8.248,0-10.125,6.174-10.125,10.125v5.518h-4.77v8.53h4.77c0,10.947,0,24.137,0,24.137h10.033c0,0,0-13.32,0-24.137h6.77  L40.43,21.739z"/>
    </svg>
      </a>
      <a href="#" title="instagram"  target="_blank" class="instagramLink">
      <svg class="lights" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
      viewBox="0 0 56.7 56.7" enable-background="new 0 0 56.7 56.7" xml:space="preserve">
 <g>
     <path d="M28.2,16.7c-7,0-12.8,5.7-12.8,12.8s5.7,12.8,12.8,12.8S41,36.5,41,29.5S35.2,16.7,28.2,16.7z M28.2,37.7
         c-4.5,0-8.2-3.7-8.2-8.2s3.7-8.2,8.2-8.2s8.2,3.7,8.2,8.2S32.7,37.7,28.2,37.7z"/>
     <circle cx="41.5" cy="16.4" r="2.9"/>
     <path d="M49,8.9c-2.6-2.7-6.3-4.1-10.5-4.1H17.9c-8.7,0-14.5,5.8-14.5,14.5v20.5c0,4.3,1.4,8,4.2,10.7c2.7,2.6,6.3,3.9,10.4,3.9
         h20.4c4.3,0,7.9-1.4,10.5-3.9c2.7-2.6,4.1-6.3,4.1-10.6V19.3C53,15.1,51.6,11.5,49,8.9z M48.6,39.9c0,3.1-1.1,5.6-2.9,7.3
         s-4.3,2.6-7.3,2.6H18c-3,0-5.5-0.9-7.3-2.6C8.9,45.4,8,42.9,8,39.8V19.3c0-3,0.9-5.5,2.7-7.3c1.7-1.7,4.3-2.6,7.3-2.6h20.6
         c3,0,5.5,0.9,7.3,2.7c1.7,1.8,2.7,4.3,2.7,7.2V39.9L48.6,39.9z"/>
 </g>
 </svg>
      </a>
    
</div>
    <style>
    .fb-square{
      fill: #1976D2;
    }
    .fb-font,.instagram-font{
      fill: #fff;
    }
    .instagram-square{
      fill: url(#radial-gradient);
  }
    </style>
    </div>
    
    `,
  });
};
