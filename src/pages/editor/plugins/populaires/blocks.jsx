import slider from "../../../../assets/imgEditorBlocks/slider.svg";
import video from "../../../../assets/imgEditorBlocks/video.svg";
import cartMaps from "../../../../assets/imgEditorBlocks/cartMaps.png";
import breadcrumb from "../../../../assets/ImgBreadcrumbs/breadcrumbw.png";

// import reseau from "../../../../assets/imgEditorBlocks/reseau.png";
import { v4 as uuidv4 } from "uuid";
export default (editor, opts = {}) => {
  const id = uuidv4();
  const bm = editor.BlockManager;

  /*   bm.add("navigation", {
    label: `<div class="d-flex flex-column align-self-center"><i class="fa fa-bars"></i><span class="titreWidget mt-3">navigation</span></div>`,
    category: "POPULAIRES",
    attributes: {
      class: "populaires navigation-gjs",
    },
    type: "navigation",
    activeOnRender: 1,
    content: `<div class="navigation-gjs" data-gjs-draggable=".gjs-cell,.gjs-row div,.container,main,footer,header"></div>`,
  }); */

  bm.add("icon", {
    label: `<div class="d-flex flex-column align-self-center"><i class="fal fa-heart-circle"></i><span class="titreWidget mt-3">Icon</span></div>`,
    category: "POPULAIRES",
    attributes: {
      class: "populaires icon-gjs",
    },
    content: `<i class="fas fa-image icon-gjs" id="icon-${uuidv4()}"data-gjs-draggable=".gjs-cell,.gjs-row div,.container,main,footer,header"></i>`,
  });

  bm.add("breadcrumb", {
    label: `<div class="d-flex flex-column align-self-center"><img src=${breadcrumb} class="imgTitreWidget"/><span class="titreWidget mt-3">Fil d'ariane</span></div>`,
    category: "POPULAIRES",
    attributes: {
      class: "populaires breadcrumb-gjs",
    },
    content: `<nav  aria-label="breadcrumb" class="gjs-breadcrumb" data-gjs-draggable=".gjs-cell,.gjs-row div,.container,main,footer,header">
    <ol class="breadcrumb">
        <li  class="breadcrumb-item">
            <a href="#" class="linBreadcrumbs"> <i class="fas fa-home "></i>
               </a>
        </li>
        <li  class="breadcrumb-item">
            <a href="#" class="linBreadcrumbs"> 
             Galerie</a>
        </li>
        <li  class="breadcrumb-item">
            <a href="#" class="linBreadcrumbs">
              Web</a>
        </li>

    </ol>
    <style>
    .breadcrumb {
      background-color: #cccccc;
      padding: 11px 10px 12px 10px;
  }

  
.breadcrumb li:last-child {
  background: none;
}
.breadcrumb-item+.breadcrumb-item::before {
  display: none;
}
  </style>
  <script>
    $("document").ready(function(){
   
        $.ajax("${process.env.REACT_APP_API_URL}/pages/breadcrumb/${opts.site}",{url:window.location.href.substring(window.location.href.lastIndexOf('/'))}).done(function(data){
    var pages = data.data;
    var html = "";

    if(pages.url !="/"){
      var cls = (pages.url ==window.location.href.substring(window.location.href.lastIndexOf('/')) )?"breadcrumb-item active":"breadcrumb-item"
      html+='<li class="'+cls+'"><a href="/" class="linBreadcrumbs"><i class="fas fa-home "></i></a> </li>'
  }
  if(pages.url =="/"){
    var cls = (pages.url ==window.location.href.substring(window.location.href.lastIndexOf('/')) )?"breadcrumb-item active":"breadcrumb-item"
    html+='<li class="'+cls+'"><a href="/" class="linBreadcrumbs"><i class="fas fa-home "></i></a> </li>'
  }else{
    var cls = (pages.url ==window.location.href.substring(window.location.href.lastIndexOf('/')) )?"breadcrumb-item active":"breadcrumb-item"
    html+='<li  class="'+cls+'"><a href="'+pages.url+'" class="linBreadcrumbs">'+pages.label+'</a> </li>'
  }
  if(pages.children != null){
    var cls = (pages.children .url ==window.location.href.substring(window.location.href.lastIndexOf('/')) )?"breadcrumb-item active":"breadcrumb-item"
    html+='<li  class="'+cls+'"><a href="'+pages.children.url+'" class="linBreadcrumbs">'+pages.children.label+'</a> </li>'

  if(pages.children.children != null){
    var cls = (pages.children.children.url ==window.location.href.substring(window.location.href.lastIndexOf('/')) )?"breadcrumb-item active":"breadcrumb-item"
    html+='<li  class="'+cls+'"><a href="'+pages.children.children.url+'" class="linBreadcrumbs">'+pages.children.children.label+'</a> </li>'
  }
}
    $("ol.breadcrumb").html(html)
})})
  </script>
</nav>`,
  });

  bm.add("map", {
    label: `<div class="d-flex flex-column align-self-center"><img src=${cartMaps} class="imgTitreWidget"/><span class="titreWidget mt-3">Map</span></div>`,
    category: "POPULAIRES",
    attributes: {
      class: "populaires map-gjs",
    },
    type: "map",

    content: `<iframe data-gjs-draggable=".gjs-cell,.gjs-row div,.container,main,footer,header" data-gjs-type="map" class="gjs-frame" data-gjs-selectable="true" data-gjs-editable="true"></iframe>

`,
  });

  bm.add("video", {
    label: `<div class="d-flex flex-column align-self-center"><img src=${video} class="imgTitreWidget"/><span class="titreWidget mt-3">Video</span></div>`,
    category: "POPULAIRES",
    attributes: {
      class: "populaires video-gjs",
    },

    content: `
    <video controls muted data-gjs-draggable=".gjs-cell,.gjs-row div,.container,main,footer,header">
    <source src="https://www.w3schools.com/tags/movie.mp4" type="video/mp4"/>
    <source src="https://www.w3schools.com/tags/movie.mp4" type="video/ogg"/>
  </video>`,
  });

  bm.add("sliders", {
    label: `<div class="d-flex flex-column align-self-center"><img src=${slider} class="imgTitreWidget"/><span class="titreWidget mt-3">Sliders d'images </span></div>`,
    category: "POPULAIRES",
    attributes: {
      class: "populaires sliders-gjs",
    },
    content: `<div id="slider-${Date.now()}" data-gjs-draggable=".gjs-cell,.gjs-row div,.container,main,footer,header" data-bs-ride="carousel" class="carousel slide sliders-gjs " >

    <div class="carousel-inner" data-gjs-editable="true">

    <div id="item-${uuidv4()}" class="carousel-item active " data-gjs-editable="true"  >
      <img  id="img-${uuidv4()}"  class="d-none w-100 slider-item"  src="https://source.unsplash.com/random/1900x900?sig=1"alt="First slide">
    </div>
    <div id="item-${uuidv4()}" class="carousel-item" data-gjs-editable="true">
      <img id="img-${uuidv4()}"   class="d-none w-100 slider-item"  src="https://source.unsplash.com/random/1900x900?sig=2" alt="Second slide">
    </div>
    <div id="item-${uuidv4()}"  class="carousel-item"  data-gjs-editable="true">
      <img  id="img-${uuidv4()}"  class="d-none w-100 slider-item"  src="https://source.unsplash.com/random/1900x900?sig=3" alt="Third slide">
    </div>
  </div>
 
</div>
   `,
  });

  // bm.add("accordion", {
  //   label: `<div class="d-flex flex-column align-self-center"><img src=${accordion} class="imgTitreWidget"/><span class="titreWidget mt-3">Accordion</span></div>`,
  //   category: "POPULAIRES",
  //   attributes: {
  //     class: "populaires accordion-gjs",
  //   },
  //   content: `<div data-gjs-draggable=".gjs-cell,.gjs-row div,.container,main,footer,header" class="accordion accordion-flush accordion-gjs"></div>`,
  // });

  bm.add("menufooter", {
    label: `<div class="d-flex flex-column align-self-center"><i class="fa-brands fa-creative-commons-nd"></i><span class="titreWidget mt-3">Simple navigation</span></div>`,
    category: "POPULAIRES",
    attributes: {
      class: "populaires menufooter-gjs",
    },
    type: "menufooter",

    content: `<div  class="navbar menufooter-gjs"  data-gjs-draggable=".gjs-cell,.gjs-row div,.container,main,footer,header" ></div>
  
    `,
  });
};
