import icon_h1 from "../../../../assets/imgEditorBlocks/title_h1.png";
import icon_h2 from "../../../../assets/imgEditorBlocks/title_h2.png";
import icon_h3 from "../../../../assets/imgEditorBlocks/title_h3.png";
import separator from "../../../../assets/imgEditorBlocks/separator.png";
import espaceur from "../../../../assets/imgEditorBlocks/espaceur.png";
import image from "../../../../assets/imgEditorBlocks/image.svg";

import imgLink from "../../../../assets/imgEditorBlocks/imgLink.png";
import text from "../../../../assets/imgEditorBlocks/text.svg";
import adr from "../../../../assets/imgEditorBlocks/adresse.png";
import phone from "../../../../assets/imgEditorBlocks/phonecall.png";
import logo from "../../../../assets/imgEditorBlocks/logowidget.png";

import tables from "../../../../assets/imgEditorBlocks/tables.svg";
import section from "../../../../assets/imgEditorBlocks/section.png";
import vignietteOne from "../../../../assets/imgEditorBlocks/vignietteOne.png";
import btnFixedMobile from "../../../../assets/imgEditorBlocks/btnFixedMobile.png";

import { v4 as uuidv4 } from "uuid";
export default (editor, opts = {}) => {
  const bm = editor.BlockManager;

  bm.add("Texte", {
    label: `<div class="d-flex flex-column align-self-center "><img src=${text} class="imgTitreWidget"/><span class="titreWidget mt-3">Texte</span></div>`,
    category: "BASICS",
    attributes: {
      class: "basic",
    },
    content: `<p data-gjs-draggable=".gjs-cell,.gjs-row div,.container,main,footer,header" id="text-${uuidv4()}"  data-gjs-editable="true" >Ecrire votre texte</p>`,
  });

  bm.add("Image", {
    label: `<div class="d-flex flex-column align-self-center"><img src=${image} class="imgTitreWidget"/><span class="titreWidget mt-3">Image</span></div>`,
    category: "BASICS",
    attributes: {
      class: "basic",
    },
    content: `<img data-gjs-draggable=".gjs-cell,.gjs-row div,.container,main,footer,header" src="" id="img-${uuidv4()}" style="width:100%;" alt="" class="img" />`,
  });

  bm.add("h1", {
    label: `<div class="d-flex flex-column align-self-center"><img src=${icon_h1} class="imgTitreWidget"/><span class="titreWidget mt-3">Grand titre H1 </span></div>`,
    category: "BASICS",
    attributes: {
      class: "basic",
    },
    content: `<h1 data-gjs-draggable=".gjs-cell,.gjs-row div,.container,main,footer,header"  >Titre H1 </h1>`,
  });
  bm.add("h2", {
    label: `<div class="d-flex flex-column align-self-center"><img src=${icon_h2} class="imgTitreWidget"/><span class="titreWidget mt-3">Moyen titre H2</span></div>`,
    category: "BASICS",
    attributes: {
      class: "basic",
    },
    content: `<h2 data-gjs-draggable=".gjs-cell,.gjs-row div,.container,main,footer,header" >Titre H2</h2>`,
  });
  bm.add("h3", {
    label: `<div class="d-flex flex-column align-self-center"><img src=${icon_h3} class="imgTitreWidget" /><span class="titreWidget mt-3">Petit titre H3</span></div>`,

    category: "BASICS",
    attributes: {
      class: "basic",
    },
    content: `<h3   data-gjs-draggable=".gjs-cell,.gjs-row div,.container,main,footer,header">Titre H3</h3>`,
  });
  bm.add("h4", {
    label: `<div class="d-flex flex-column align-self-center"><img src=${icon_h3} class="imgTitreWidget" /><span class="titreWidget mt-3">Petit titre H4</span></div>`,

    category: "BASICS",
    attributes: {
      class: "basic",
    },
    content: `<h4   data-gjs-draggable=".gjs-cell,.gjs-row div,.container,main,footer,header">Titre H4</h4>`,
  });
  bm.add("h5", {
    label: `<div class="d-flex flex-column align-self-center"><img src=${icon_h3} class="imgTitreWidget" /><span class="titreWidget mt-3">Petit titre H5</span></div>`,

    category: "BASICS",
    attributes: {
      class: "basic",
    },
    content: `<h5   data-gjs-draggable=".gjs-cell,.gjs-row div,.container,main,footer,header">Titre H5</h5>`,
  });
  bm.add("h6", {
    label: `<div class="d-flex flex-column align-self-center"><img src=${icon_h3} class="imgTitreWidget" /><span class="titreWidget mt-3">Petit titre H5</span></div>`,

    category: "BASICS",
    attributes: {
      class: "basic",
    },
    content: `<h6   data-gjs-draggable=".gjs-cell,.gjs-row div,.container,main,footer,header">Titre H6</h6>`,
  });
  /*   bm.add("section", {
    label: `<div class="d-flex flex-column align-self-center"><img src=${section} class="imgTitreWidget"/><span class="titreWidget mt-3">Section</span></div>`,
    category: "BASICS",
    attributes: {
      class: "basic",
    },

    content: `<section><div class="gjs-row"  data-gjs-type="Row" data-gjs-droppable=".gjs-cell,[class^='col']" id="row-${uuidv4()}" data-gjs-draggable="section,main,footer,header">
    <div class="gjs-cell" data-gjs-type="Colonne" data-gjs-draggable=".gjs-row,main,footer,header" ></div>
    <div class="gjs-cell" data-gjs-type="Colonne" data-gjs-draggable=".gjs-row,main,footer,header" ></div>
  </div>
 </section>`,
  }); */
  /*   bm.add("col1", {
    label: `<div class="d-flex flex-column align-self-center"><img src=${container} class="imgTitreWidget"/><span class="titreWidget mt-3">1 Colonne</span></div>`,
    category: "BASICS",
    attributes: {
      class: "basic",
    },

    content: `<div class="row"  data-gjs-droppable=".gjs-cell,[class^='col']" id="row-${uuidv4()}" data-gjs-draggable=".gjs-cell,section,form,main,footer,header">
    <div class="gjs-cell" data-gjs-draggable=".gjs-row" ></div>
  </div>
 
  `,
  });
  bm.add("col2", {
    label: `<div class="d-flex flex-column align-self-center"><img src=${grid_2} class="imgTitreWidget"/><span class="titreWidget mt-3">2 Colonne</span></div>`,
    category: "BASICS",
    attributes: {
      class: "basic",
    },
    content: `<div class="row"  data-gjs-droppable=".gjs-cell,[class^='col']"  data-gjs-draggable=".gjs-cell,section,form,main,footer,header" id="row-${uuidv4()}" >
    <div class="gjs-cell" data-gjs-draggable=".gjs-row" ></div>
    <div class="gjs-cell" data-gjs-draggable=".gjs-row" ></div>
  </div>

  `,
  });
  bm.add("col3", {
    label: `<div class="d-flex flex-column align-self-center"><img src=${grid_3} class="imgTitreWidget"/><span class="titreWidget mt-3">3 Colonnes</span></div>`,
    category: "BASICS",
    attributes: {
      class: "basic",
    },
    content: `
    <div class="row" data-gjs-droppable=".gjs-cell,[class^='col']" id="row-${uuidv4()}" data-gjs-draggable=".gjs-cell,section,form,main,footer,header" >
    <div class="gjs-cell" data-gjs-draggable=".gjs-row,main,footer,header" ></div>
    <div class="gjs-cell" data-gjs-draggable=".gjs-row,main,footer,header" ></div>
    <div class="gjs-cell" data-gjs-draggable=".gjs-row,main,footer,header" ></div>
  </div>
 
  `,
  });
  bm.add("col4", {
    label: `<div class="d-flex flex-column align-self-center"><img src=${grid_4} class="imgTitreWidget"/><span class="titreWidget mt-3">4 Colonnes</span></div>`,
    category: "BASICS",
    attributes: {
      class: "basic",
    },
    content: `
    <div class="gjs-row"  data-gjs-droppable=".gjs-cell,[class^='col']" id="row-${uuidv4()}"  data-gjs-draggable=".gjs-cell,section,form,main,footer,header">
    <div class="gjs-cell" data-gjs-draggable=".gjs-row,main,footer,header" ></div>
    <div class="gjs-cell" data-gjs-draggable=".gjs-row,main,footer,header" ></div>
    <div class="gjs-cell" data-gjs-draggable=".gjs-row,main,footer,header" ></div>
    <div class="gjs-cell" data-gjs-draggable=".gjs-row,main,footer,header" ></div>
  </div>

  `,
  }); */

  //   bm.add("column3-7", {
  //     label: `<div class="d-flex flex-column align-self-center"><img src=${column37} class="imgTitreWidget"/><span class="titreWidget mt-3"> 3-7 Colonne</span></div>`,
  //     category: "BASICS",
  //     attributes: {
  //       class: "basic",
  //     },
  //     content: `
  //     <div class="row"  data-gjs-droppable=".gjs-cell,[class^='col']" id="row-${uuidv4()}" data-gjs-draggable=".gjs-cell,section,form,main,footer,header">
  //     <div class="gjs-cell styleClm30 " data-gjs-draggable=".gjs-row,main,footer,header" ></div>
  //     <div class="gjs-cell styleClm70 " data-gjs-draggable=".gjs-row,main,footer,header" ></div>

  //   </div>
  //   <style>
  //   .gjs-row {
  //     display: flex;
  //     justify-content: space-between;
  //     align-items: stretch;
  //     flex-wrap: wrap;
  //     width:100%;
  //     margin:auto;

  //   }

  //   .gjs-cell.styleClm70 {
  //     width: 70%;
  //   }
  //    .gjs-cell.styleClm30 {
  //     flex-grow: 1;
  //     flex-shrink: 1;
  //     flex-basis: 0%;
  //     width: 30%;
  //     max-width: 30%;
  //   }
  //   @media (max-width: 768px) {
  //     .gjs-row {
  //       flex-wrap: wrap;
  //     }
  //   }
  //   .gjs-row {
  //     display: flex;
  //     justify-content: space-between;
  //     align-items: stretch;
  //     flex-wrap: wrap;
  //     width:100%;
  //     margin:auto;

  //   }
  //   @media (max-width: 992px) {
  //     .gjs-cell.styleClm70 {
  //       width: 70%;
  //       max-width: 70%;
  //   }
  //   gjs-cell.styleClm30 {
  //     width: 30%;
  //     max-width: 30%;
  // }
  //   }

  //   </style>
  //   `,
  //   });
  // bm.add("column2-6-2", {
  //   label: `<div class="d-flex flex-column align-self-center"><img src=${column37} class="imgTitreWidget"/><span class="titreWidget mt-3"> 2-6-2 Colonne</span></div>`,
  //   category: "BASICS",
  //   attributes: {
  //     class: "basic",
  //   },
  //   content: `
  //   <div class="row"  data-gjs-droppable=".gjs-cell,[class^='col']" id="row-${uuidv4()}" data-gjs-draggable=".gjs-cell,section,form,main,footer,header">
  //   <div class="gjs-cell styleClm20 " data-gjs-draggable=".gjs-row,main,footer,header" ></div>
  //   <div class="gjs-cell styleClm60 " data-gjs-draggable=".gjs-row,main,footer,header" ></div>
  //   <div class="gjs-cell styleClm20 " data-gjs-draggable=".gjs-row,main,footer,header" ></div>
  // </div>

  // `,
  // });

  // bm.add("col2", {
  //   label: `<div class="d-flex flex-column align-self-center"><img src=${grid_2} class="imgTitreWidget"/><span class="titreWidget mt-3">2 Colonne</span></div>`,
  //   category: "BASICS",
  //   attributes: {
  //     class: "basic",
  //   },

  //   content: `<div class="container-fluid" id="container-${uuidv4()}"><div class="row" id="row-${uuidv4()}"><div class="col-xl-6 col-md-6 col-12" id="col-${uuidv4()}" data-gjs-droppable="true" data-gjs-type="default" data-gjs-resizable="true" style="padding:15px 5px"> </div> <div class="col-xl-6 col-md-6 col-12" id="col-${uuidv4()}"  style="padding:15px 5px" data-gjs-droppable="true" data-gjs-type="default" data-gjs-resizable="true"></div></div></div>`,
  // });
  // bm.add("col3", {
  //   label: `<div class="d-flex flex-column align-self-center"><img src=${grid_3} class="imgTitreWidget"/><span class="titreWidget mt-3">3 Colonnes</span></div>`,
  //   category: "BASICS",
  //   attributes: {
  //     class: "basic",
  //   },
  //   content: `<div class="container-fluid" id="container-${uuidv4()}"><div class="row" id="row-${uuidv4()}"><div class="col-xl-4 col-md-4 col-12" id="col-${uuidv4()}" data-gjs-droppable="true" data-gjs-type="default" data-gjs-resizable="true" style="padding:15px 5px"> </div> <div class="col-xl-4 col-md-4 col-12" id="col-${uuidv4()}"  style="padding:15px 5px" data-gjs-droppable="true" data-gjs-type="default" data-gjs-resizable="true"></div><div class="col-xl-4 col-md-4 col-12" id="col-${uuidv4()}"  style="padding:15px 5px" data-gjs-droppable="true" data-gjs-type="default" data-gjs-resizable="true"></div></div></div>`,
  // });
  // bm.add("col4", {
  //   label: `<div class="d-flex flex-column align-self-center"><img src=${grid_4} class="imgTitreWidget"/><span class="titreWidget mt-3">4 Colonnes</span></div>`,
  //   category: "BASICS",
  //   attributes: {
  //     class: "basic",
  //   },
  //   content: `<div class="container-fluid" id="container-${uuidv4()}"><div class="row" id="row-${uuidv4()}"><div class="col-xl-3 col-md-3 col-12" id="col-${uuidv4()}" data-gjs-droppable="true" data-gjs-type="default" data-gjs-resizable="true" style="padding:15px 5px"> </div> <div class="col-xl-3 col-md-3 col-12" id="col-${uuidv4()}"  style="padding:15px 5px" data-gjs-droppable="true" data-gjs-type="default" data-gjs-resizable="true"></div><div class="col-xl-3 col-md-3 col-12" id="col-${uuidv4()}"  style="padding:15px 5px" data-gjs-droppable="true" data-gjs-type="default" data-gjs-resizable="true"></div><div class="col-xl-3 col-md-3 col-12" id="col-${uuidv4()}"  style="padding:15px 5px" data-gjs-droppable="true" data-gjs-type="default" data-gjs-resizable="true"></div></div></div>`,
  // });
  // bm.add("col22", {
  //   label: `<div class="d-flex flex-column align-self-center"><img src=${grid_2} class="imgTitreWidget"/><span class="titreWidget mt-3">2 Columns 3/9</span></div>`,
  //   category: "BASICS",
  //   attributes: {
  //     class: "basic",
  //   },
  //   content: `<div class="container-fluid" id="container-${uuidv4()}">
  //   <div class="row" id="row-${uuidv4()}">
  //     <div
  //       class="col-xl-3 col-md-3 col-12"
  //       id="col-${uuidv4()}"
  //       data-gjs-droppable="true"
  //       data-gjs-type="default"
  //       data-gjs-resizable="true"
  //       style="padding:15px 5px"
  //     >
  //     </div>
  //     <div
  //       class="col-xl-9 col-md-9 col-12"
  //       id="col-${uuidv4()}"
  //       style="padding:15px 5px"
  //       data-gjs-droppable="true"
  //       data-gjs-type="default"
  //       data-gjs-resizable="true"
  //     ></div>

  //   </div>
  // </div>;
  // `,
  // });
  // bm.add("col23", {
  //   label: `<div class="d-flex flex-column align-self-center"><img src=${grid_3} class="imgTitreWidget"/><span class="titreWidget mt-3">3 Columns 3/6/3</span></div>`,
  //   category: "BASICS",
  //   attributes: {
  //     class: "basic",
  //   },
  //   content: `<div class="container-fluid" id="container-${uuidv4()}">
  //   <div class="row" id="row-${uuidv4()}">
  //     <div
  //       class="col-xl-3 col-md-3 col-12"
  //       id="col-${uuidv4()}"
  //       data-gjs-droppable="true"
  //       data-gjs-type="default"
  //       data-gjs-resizable="true"
  //       style="padding:15px 5px"
  //     >
  //     </div>
  //     <div
  //       class="col-xl-6 col-md-6 col-12"
  //       id="col-${uuidv4()}"
  //       style="padding:15px 5px"
  //       data-gjs-droppable="true"
  //       data-gjs-type="default"
  //       data-gjs-resizable="true"
  //     ></div>
  //     <div
  //     class="col-xl-3 col-md-3 col-12 "
  //     id="col-${uuidv4()}"
  //     data-gjs-droppable="true"
  //     data-gjs-type="default"
  //     data-gjs-resizable="true"
  //     style="padding:15px 5px"
  //   >
  //   </div>
  //   </div>
  // </div>;
  // `,
  // });
  bm.add("Separateur", {
    label: `<div class="d-flex flex-column align-self-center"><img src=${separator} class="imgTitreWidget"/><span class="titreWidget mt-3">Diviseur</span></div>`,
    category: "BASICS",
    attributes: {
      class: "basic",
    },
    content: `<hr data-gjs-draggable="main,footer,header,.gjs-cell" class="gjs-separator" />`,
  });
  bm.add("spacer", {
    label: `<div class="d-flex flex-column align-self-center"><img src=${espaceur} class="imgTitreWidget"/><span class="titreWidget mt-3">Espaceur</span></div>`,
    category: "BASICS",
    attributes: {
      class: "basic",
    },
    content: `<div  class="espaceur" style="display:block;width:100%;height:150px;" data-gjs-resizable="true" data-gjs-droppable="false" data-gjs-draggable="main,footer,header,.gjs-cell"></div>`,
  });

  bm.add("Click to call", {
    label: `<div class="d-flex flex-column align-self-center"><img src=${phone} class="imgTitreWidget"/></i>
    <span class="titreWidget mt-3">Click to call</span></div>`,
    category: "BASICS",
    attributes: {
      class: "BASICS appel-gjs",
    },
    content: `
        <a class='appel-gjs' data-gjs-type="Appel" data-gjs-draggable=".gjs-cell,.gjs-row div,.container,main,footer,header">     <i class="fas fa-mobile-alt icon-gjs"></i><span class="gjs-appel-phone" ></span> </a>
   
    <style>
    .appel-gjs{
      display: flex;
      align-items: center;
      text-decoration: none;
    }
    .appel-gjs i{
      margin-right:10px;
    }
    </style>`,
  });
  bm.add("Adresse", {
    label: `<div class="d-flex flex-column align-self-center"><img src=${adr} class="imgTitreWidget"/>
    <span class="titreWidget mt-3">Adresse</span></div>`,
    category: "BASICS",
    attributes: {
      class: "BASICS adresse-gjs",
    },
    content: `<div class="adresse-gjs" data-gjs-draggable=".gjs-cell,.gjs-row div,.container,main,footer,header">
    <i class="fas fa-map-marker-alt icon-gjs"  id="icon-${uuidv4()}"></i><span class="gjs-adress-text" ></span>
    </div>
    <style>
    .adresse-gjs i {
      font-size: 25px;
  }
    .textadresse{
    color:#000;
    font-size:22px;
    font-weight:600;
     }  
    </style>
    `,
  });
  bm.add("logo", {
    label: ` <div class="gjs-block-label" bis_skin_checked="1"><img src=${logo} class="imgTitreWidget"/><span class="titreWidget mt-3">Logo</span></div></div>`,
    category: "BASICS",
    content: `<a href="/" style="position:relative;width:auto;height:auto;" data-gjs-type="logo" class='logo-gjs' data-gjs-draggable=".gjs-cell,.gjs-row div,.container,main,footer,header"></a>

    `,
    attributes: {
      class: "BASICS logo-gjs",
    },
  });

  bm.add("table", {
    label: ` <div class="gjs-block-label" bis_skin_checked="1"><img src=${tables} class="imgTitreWidget"/><span class="titreWidget mt-3">Table</span></div></div>`,
    category: "BASICS",
    content: `<table data-gjs-type="table" class="table table-striped  table-gjs pt-3 pb-3 ps-3 pe-3" data-gjs-draggable="main,footer,header,.gjs-cell,.gjs-row div,.container" >
    <thead>
    <tr>
    <th data-gjs-type="cell"><div class="d-block p-3"><p>Colonne 1</p></div></th>
    <th data-gjs-type="cell"><div class="d-block p-3"><p>Colonne 2</p></div></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-gjs-type="cell"><div class="d-block p-3"> <p>1</p></div></td>
      <td data-gjs-type="cell"><div class="d-block p-3"> <p>2</p></div></td>
    </tr>
  </tbody>
    </table>`,
    attributes: {
      class: "BASICS table-gjs",
    },
  });
  bm.add("fixeicon", {
    label: `<div class="d-flex flex-column align-self-center"><img src=${btnFixedMobile} class="imgTitreWidget"/><span class="titreWidget mt-3">Btn mobile</span></div>`,
    category: "POPULAIRES",
    attributes: {
      class: "populaires fixeicon-gjs",
    },
    content: `<section class="gjs-fixed-btn"><div data-gjs-draggable="main,footer,header" data-gjs-type="fixedicons" class="fixeicon-gjs p-4">
    <a class='appel-gjs' data-gjs-type="Appel" data-gjs-draggable=".gjs-cell,.gjs-row div,.container,main,footer,header">
         <i class="fas fa-mobile-alt mb-2"></i><span class="gjs-appel-phone"></span> </a>
    <a href="/contact" title="Contact"><i class="icon-gjs fas fa-envelope "></i></a>
    </div>
    </section>
    <style>
.gjs-fixed-btn{
  min-height:5px;
}
    .fixeicon-gjs {
      position: fixed;
      float: right;
      right: 0;
      bottom: 0;
      width: auto;
      margin: 0 1%;
  }
  .fixeicon-gjs .gjs-appel-phone {
 display :none
}
  .fixeicon-gjs a {
    text-decoration: none;
    text-align:center;
}
    .fixeicon-gjs i {
      display: block;
      font-size: 24px;
      padding: 15px;
      text-align: center;
  }
    </style>
    
    `,
  });
  bm.add("Vigniette", {
    label: `<div class="d-flex flex-column align-self-center"><img src=${vignietteOne} class="imgTitreWidget"/><span class="titreWidget mt-3">Vigniette 1</span></div>`,
    category: "BASICS",
    type: "Vigniette",
    attributes: {
      class: "BASICS vigniete-gjs",
    },
    content: `<div data-gjs-draggable=".gjs-cell,.gjs-row div,.container,main,footer,header" data-gjs-type="Vigniette" class="gjs-vigniette"></div>`,
  });

  //   bm.add("coupon", {
  //     label: `<div class="d-flex flex-column align-self-center"><img src=${vignietteOne} class="imgTitreWidget"/><span class="titreWidget mt-3">coupon</span></div>`,
  //     category: "BASICS",
  //     attributes: {
  //       class: "BASICS coupon-gjs",
  //     },
  //     content: `
  //     <div data-gjs-draggable=".gjs-cell,.gjs-row div,.container,main,footer,header" class="coupon-gjs coupon-container"></div>

  // <style>
  // .coupon-container {
  //   background: #fff;
  //   display: flex;
  //   flex-direction: column;
  //   align-items: center;
  //   padding: 70px 125px 50px;
  //   border: 1px solid #eee;
  //   box-shadow: 0 8px 6px -6px #333;
  // }
  // .coupon-container h2 {
  //   font-size: 72px;
  //   margin: 0;
  //   padding: 0;
  // }
  // .coupon-container .subtext {
  //   font-size: 22px;
  //   position: relative;
  // }

  // .coupon-container .redeem-btn {
  //   background-color: #2383f6;
  //   border-radius: 26.5px;
  //   border: 1px solid #2383f6;
  //   box-shadow: 0 16px 22px -14px #03153b;
  //   color: white;
  //   cursor: pointer;
  //   font-size: 16px;
  //   line-height: 20px;
  //   padding: 12px 20px;
  //   width: 200px;
  //   transition: 0.5s;
  // }
  // .coupon-container .redeem-btn:hover {
  //   background-color: #fff;
  //   color: #2383f6;
  // }
  // .coupon-container .redeem-btn:focus {
  //   outline: none;
  // }
  // .coupon-container .valid-until {
  //   font-size: 14px;
  //   color: #888;
  // }
  // @media print {
  //   .no-print, section *
  //   {
  //     display: none !important;
  //   }
  //   section{
  //     page-break-after: always;
  //     display: block !important;
  //   }
  // }
  // </style>
  // <script>
  // $('#btnPrint').on('click', function() {
  //   window.print();

  // })

  // </script>

  // `
  // });
};
