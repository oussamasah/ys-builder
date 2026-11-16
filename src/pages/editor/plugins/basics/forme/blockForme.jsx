import { v4 as uuidv4 } from "uuid";
export default (editor, opts = {}) => {
  const bm = editor.BlockManager;
  bm.add("forme", {
    label: ` <div class="gjs-block-label" bis_skin_checked="1"><svg width="50" height="50">
    <circle cx="25" cy="25" r="20" stroke="transparent" stroke-width="4" fill="gray"></circle>
  </svg><span class="titreWidget mt-3">Forme</span></div></div>`,
    category: "BASICS",
    attributes: {
      class: "BASICS forme-gjs",
    },
    content: `
    <div data-gjs-highlightable="true" id="forme-${uuidv4()}" data-gjs-type="FormeContainer" draggable="true"
    data-forme="forme1" data-text="" data-description="" class="gjs-forme"><a data-gjs-highlightable="true"
         data-gjs-type="link" draggable="true" href="#" title="forme" class="forme-link"><svg id="i4edv"
            data-gjs-type="svg" draggable="true" class="svg">
            <clipPath id="my-clip-path" data-gjs-type="svg-in" draggable="true" clipPathUnits="objectBoundingBox">
                <path  data-gjs-type="svg-in" draggable="true" d="M0.5,0 L1,1 H0"></path>
            </clipPath>
        </svg>
        <div data-gjs-type="default" draggable="true" class="clipped"></div>
    </a>
</div>
    `,
  });
};
