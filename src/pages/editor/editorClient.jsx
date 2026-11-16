import React, { useEffect, useState } from "react";
import EditorSidebar from "../../components/EditorSidebar/EditorSidebar";
import EditorTopbar from "../../components/EditorTopbar/EditorTopbar";
// import { setOffCanvas } from "../../redux/features/editor";
import grapesjs from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";
import customCodePlugin from "grapesjs-custom-code";
import "grapesjs-component-code-editor/dist/grapesjs-component-code-editor.min.css";
import gjsTabs from "grapesjs-tabs";
import grapesjscomponentcodeeditor from "grapesjs-component-code-editor";
import grapesjsrteextensions from "grapesjs-rte-extensions/src/index";
import "grapesjs-rte-extensions/dist/grapesjs-rte-extensions.min.css";
// import InlineEditor from "@ckeditor/ckeditor5-build-inline";
import pluginGradien from "grapesjs-style-bg";
import lienPlugin from "./plugins/basics/lien/index";
import ImageBlock from "./plugins/basics/image/index";
import buttonPlugin from "./plugins/basics/button/index";
import FormeBlock from "./plugins/basics/forme/index";
import $ from "jquery";
// import tabulation from "../../assets/imgEditorBlocks/tabulation.svg";
import "grapesjs/dist/css/grapes.min.css";
import "grapick/dist/grapick.min.css";
import fontsList from "../../assets/fonts/fonts.json";
import basicplugin from "grapesjs-blocks-basic";
import { fromBlob } from "image-resize-compress";
import { v4 as uuidv4 } from "uuid";
import fr from "grapesjs/locale/fr";
import {useSelector } from "react-redux";
import {  useParams } from "react-router-dom";
import BasicBlocks from "./plugins/basics/index";
import PopulairesBlocks from "./plugins/populaires/index";
import SectionsBlocks from "./plugins/sections/index";
import styleFilter from "grapesjs-style-filter";
import axios from "axios";
import EditorRightSidebar from "../../components/EditorRightSidebar/EditorRightSidebar";

import { toast, Toaster } from "react-hot-toast";
import col1 from "../../assets/imgEditorBlocks/container.png";
import grid_2 from "../../assets/imgEditorBlocks/grid2.svg";
import grid_3 from "../../assets/imgEditorBlocks/grid3.svg";
// import column37 from "../../assets/imgEditorBlocks/column3-7.png";
//import pluginCountdown from 'grapesjs-component-countdown';
import "./editor.css";
import Joyride from "react-joyride";

export default function EditorClient() {
  const storeUser = useSelector((state) => state.user.value);

  const state = {
    run: window.localStorage.getItem("tutoState")
      ? JSON.parse(window.localStorage.getItem("tutoState"))["siteEditor"] ==
        true
        ? false
        : true
      : true,
    steps: [
      {
        target: "#v-pills-parametres-tab",
        disableBeacon: true,
        content:
          "Pour commencer, veuillez renseigner les informations essentielles de votre site telles que le logo, l'adresse, le téléphone, etc. Ensuite, explorez les autres paramètres tels que le répertoire d'images, les paramètres SEO, les analytics, les redirections, les backups, et bien plus encore.",
      },
      {
        target: "#v-pills-design-tab",
        disableBeacon: true,
        content:
          "Ensuite, veuillez configurer le design global de votre site, y compris les textes, les titres, les images, les boutons, etc. Cela accélérera le processus de création de votre site. Vous pouvez effectuer ces configurations ici.",
      },
      {
        target: "#v-pills-pages-tab",
        disableBeacon: true,
        content:
          "Créez de nouvelles pages et des popups en utilisant cette section. Personnalisez votre contenu et améliorez l'expérience utilisateur de votre site.",
      },
      {
        target: "#v-pills-widgets-tab",
        disableBeacon: true,
        content:
          "Explorez les widgets disponibles ici et simplifiez la construction de votre site en les glissant et en les déposant. Personnalisez votre mise en page de manière intuitive",
      },
      {
        target: "#v-pills-sections-tab",
        disableBeacon: true,
        content:
          "Optimisez la création de votre site en utilisant les sections pré-construites par YellowSmith ou celles que vous avez enregistrées ici. Il vous suffit de les faire glisser et de les déposer pour personnaliser votre site selon vos préférences.",
      },
      {
        target: ".SelectPage",
        disableBeacon: true,
        content: "Accédez à votre page déjà créée en un clic à partir d'ici.",
      },
      {
        target: ".devices",
        disableBeacon: true,
        content:
          "Modifiez les paramètres d'affichage pour adapter votre site à différents appareils en utilisant cette fonctionnalité. Assurez-vous que votre site est optimisé pour une expérience utilisateur fluide sur divers supports.",
      },
      {
        target: ".actions-btns",
        disableBeacon: true,
        content:
          "Utilisez la barre d'actions pour rafraîchir l'éditeur, basculer en mode développeur pour modifier le code source de la page, afficher la grille, vider le contenu de la page, sauvegarder les modifications, annuler, refaire et afficher le code source",
      },
      {
        target: ".gjs-cv-canvas__frames",
        disableBeacon: true,
        content:
          "Explorez cet espace interactif, où vous pouvez organiser les éléments de votre page de manière intuitive en utilisant la fonction glisser-déposer. Personnalisez également le style de chaque élément en temps réel. Cette approche conviviale vous offre une liberté créative, vous permettant de donner vie à votre vision web en ajustant la disposition et le design de manière visuelle et efficace.",
      },
    ],
  };
  // const location = useLocation();
  let { siteId, type, pageId } = useParams();
  const [modalClose, setModalCloser] = useState(false);
  const handleClosed = () => {
    setModalCloser(false);
  };
  // const dispatch = useDispatch();
  const [font, setFont] = useState(null);
  const [media, setmedia] = useState(null);
  const [compte, setcompte] = useState(null);
  const [storeSite, setSite] = useState();
  // const storeCurrentSite = useSelector((state) => state.site.value);
  // const storeEditor = useSelector((state) => state.editor.value);
  const storeClient = useSelector((state) => state.client.value);
  const [editor, setEditor] = useState(null);
  // const [rightSidebar, setrightSidebar] = useState(null);
  // const [canvasStyle, setCanvasStyle] = useState([]);
  // const [canvasScript, setCanvasScript] = useState([]);

  const [showPreview, setshowPreview] = useState(false);
  const getEditor = () => {
    return editor;
  };
  const changePreview = (e) => {
    setshowPreview(e);
  };

  useEffect(() => {
    getSite();
    const result = fontsList.items.map((item) => {
      return item.family;
    });
    setFont(result);
  }, []);

  useEffect(() => {}, [editor]);
  useEffect(() => {
    // console.log(storeSite);
  }, [media, storeSite]);

  const result = fontsList.items.map((item) => {
    return item.family;
  });
  useEffect(() => {
    getSite();
  }, [siteId]);
  const getSite = async () => {

    await axios
      .get(process.env.REACT_APP_API_URL + "/sites/get/" + siteId)
      .then((response) => {
        try {
          let EditorOfSite = response.data.data.site.current_users;
          if (EditorOfSite && EditorOfSite.length > 1) {
            setModalCloser(true);
          }
          setSite(response.data.data);
          setcompte(storeSite.site.CompteSchema);
        } catch (error) {
          // console.log(error);
        }
      })
      .catch((error) => {
        // console.log(error.message);
      });
  };
  let gjs;
  useEffect(() => {
    // const el_editor = document.getElementById("gjs");
    const el_style = document.getElementById("stylepanel");
    const el_selector = document.getElementById("selectorManager");
    const el_traits = document.getElementById("traitManager");
    if (el_style) {
      el_style.innerHTML = "";
    }

    if (el_selector) {
      el_selector.innerHTML = "";
    }
    if (el_traits) {
      el_traits.innerHTML = "";
    }

    gjs = grapesjs.init({
      protectedCss: "",
      forceClass: false,
      colorPicker: {
        color: "#3777B4",
        showAlpha: true,
        showPalette: true,
        showInput: true,
        allowEmpty: true,
        preferredFormat: ["rgb", "hex"],
      },
      allowScripts: 1,
      jsInHtml: 1,
      avoidInlineStyle: true,
      // Indicate where to init the editor. You can also pass an HTMLElement
      container: "#gjs",

      blockDrag: {
        scrollOffset: true, // or a number value
        snapDistance: 50,
        snapOffset: 20, // or a different value
      },

      fromElement: false,
      // Size of the editor
      height: "91.5vh",
      width: "100%",
      plugins: [
        grapesjsrteextensions,
        FormeBlock,
        ImageBlock,
        basicplugin,
        SectionsBlocks,
        lienPlugin,
        buttonPlugin,

        BasicBlocks,

        PopulairesBlocks,
        customCodePlugin,
        gjsTabs,
        pluginGradien,
        styleFilter,
        grapesjscomponentcodeeditor,
        //pluginCountdown
      ],

      pluginsOpts: {
        [grapesjscomponentcodeeditor]: {
          appendTo: "#editCode",
          preserveWidth: true,
          editJs: true,
        },
        // [gjsTabs]: {
        //   tabsBlock: {
        //     category: "POPULAIRES",
        //     media: `<img src=${tabulation} class="imgTitreWidget"/>`,
        //     label: `  <span class="annotation">
        //     <span class="annotation-text">Merci d'ajouter une section avant de  mettre la  widget tab</span>
        //     <span class="titreWidget  mt-3">Tabulation</span> </span></span>`,
        //   },
        // },
        [basicplugin]: {
          blocks: ["column1", "column2", "column3"],
          labelColumn1: `<div class="d-flex flex-column align-self-center"><img src=${col1} class="imgTitreWidget"/><span class="titreWidget mt-3"> 1 Colonne </span></div>`,
          labelColumn2: `<div class="d-flex flex-column align-self-center"><img src=${grid_2} class="imgTitreWidget"/><span class="titreWidget mt-3"> 2 Colonne </span></div>`,
          labelColumn3: `<div class="d-flex flex-column align-self-center"><img src=${grid_3} class="imgTitreWidget"/><span class="titreWidget mt-3"> 3 Colonne </span></div>`,
          category: "BASICS",
          /*  flexGrid: 1, */
        },

        [customCodePlugin]: {
          blockCustomCode: {
            category: "POPULAIRES",
            label: "Code",
            draggable: ".gjs-cell,main,header,footer",

            // label: `<div class="d-flex flex-column align-self-center"><img src=${tabs} class="imgTitreWidget"/><span class="titreWidget mt-3">Slider d'images</span></div>`,
          },
        },

        [ImageBlock]: {
          site: siteId,
          page: pageId,
        },
        [FormeBlock]: {
          site: siteId,
          page: pageId,
        },
        [lienPlugin]: {
          site: siteId,
          page: pageId,
        },

        [buttonPlugin]: {
          site: siteId,
          page: pageId,
        },
        [BasicBlocks]: {
          site: siteId,
          page: pageId,
        },
        [PopulairesBlocks]: {
          site: siteId,
          page: pageId,
        },
        [SectionsBlocks]: {
          site: siteId,
          page: pageId,
        },
      },
      canvas: {
        dropzoneClass: "rect-dropzone",
        dropzone: "#dropzone",
        styles: [
          "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css",
          "https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css",
          "https://fonts.googleapis.com/css?family=Roboto:wght@100,100italic,300,300italic,regular,italic,500,500italic,700,700italic,900,900italic|Open+Sans:wght@300,regular,500,600,700,800,300italic,italic,500italic,600italic,700italic,800italic|Noto+Sans+JP:wght@100,300,regular,500,700,900|Montserrat:wght@100,200,300,regular,500,600,700,800,900,100italic,200italic,300italic,italic,500italic,600italic,700italic,800italic,900italic|Lato:wght@100,100italic,300,300italic,regular,italic,700,700italic,900,900italic|Poppins:wght@100,100italic,200,200italic,300,300italic,regular,italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic|Source+Sans+Pro:wght@200,200italic,300,300italic,regular,italic,600,600italic,700,700italic,900,900italic|Roboto+Condensed:wght@300,300italic,regular,italic,700,700italic|Oswald:wght@200,300,regular,500,600,700|Roboto+Mono:wght@100,200,300,regular,500,600,700,100italic,200italic,300italic,italic,500italic,600italic,700italic|Raleway:wght@100,200,300,regular,500,600,700,800,900,100italic,200italic,300italic,italic,500italic,600italic,700italic,800italic,900italic|Inter:wght@100,200,300,regular,500,600,700,800,900|Noto+Sans:wght@100,100italic,200,200italic,300,300italic,regular,italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic|Nunito+Sans:wght@200,200italic,300,300italic,regular,italic,600,600italic,700,700italic,800,800italic,900,900italic|Ubuntu:wght@300,300italic,regular,italic,500,500italic,700,700italic|Roboto+Slab:wght@100,200,300,regular,500,600,700,800,900|Nunito:wght@200,300,regular,500,600,700,800,900,200italic,300italic,italic,500italic,600italic,700italic,800italic,900italic|Playfair+Display:wght@regular,500,600,700,800,900,italic,500italic,600italic,700italic,800italic,900italic|Merriweather:wght@300,300italic,regular,italic,700,700italic,900,900italic|PT+Sans:wght@regular,italic,700,700italic|Rubik:wght@300,regular,500,600,700,800,900,300italic,italic,500italic,600italic,700italic,800italic,900italic|Kanit:wght@100,100italic,200,200italic,300,300italic,regular,italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic|Noto+Sans+KR:wght@100,300,regular,500,700,900|Work+Sans:wght@100,200,300,regular,500,600,700,800,900,100italic,200italic,300italic,italic,500italic,600italic,700italic,800italic,900italic|Mukta:wght@200,300,regular,500,600,700,800|Lora:wght@regular,500,600,700,italic,500italic,600italic,700italic|Fira+Sans:wght@100,100italic,200,200italic,300,300italic,regular,italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic|Nanum+Gothic:wght@regular,700,800|Barlow:wght@100,100italic,200,200italic,300,300italic,regular,italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic|Mulish:wght@200,300,regular,500,600,700,800,900,200italic,300italic,italic,500italic,600italic,700italic,800italic,900italic|Quicksand:wght@300,regular,500,600,700|Noto+Sans+TC:wght@100,300,regular,500,700,900|PT+Serif:wght@regular,italic,700,700italic|Titillium+Web:wght@200,200italic,300,300italic,regular,italic,600,600italic,700,700italic,900|Inconsolata:wght@200,300,regular,500,600,700,800,900|Heebo:wght@100,200,300,regular,500,600,700,800,900|Noto+Serif:wght@regular,italic,700,700italic|Libre+Franklin:wght@100,200,300,regular,500,600,700,800,900,100italic,200italic,300italic,italic,500italic,600italic,700italic,800italic,900italic|IBM+Plex+Sans:wght@100,100italic,200,200italic,300,300italic,regular,italic,500,500italic,600,600italic,700,700italic|DM+Sans:wght@regular,italic,500,500italic,700,700italic|Karla:wght@200,300,regular,500,600,700,800,200italic,300italic,italic,500italic,600italic,700italic,800italic|Hind+Siliguri:wght@300,regular,500,600,700|Josefin+Sans:wght@100,200,300,regular,500,600,700,100italic,200italic,300italic,italic,500italic,600italic,700italic|Dosis:wght@200,300,regular,500,600,700,800|Libre+Baskerville:wght@regular,italic,700|Bebas+Neue:wght@regular|Manrope:wght@200,300,regular,500,600,700,800|Arimo:wght@regular,500,600,700,italic,500italic,600italic,700italic|Source+Code+Pro:wght@200,300,regular,500,600,700,800,900,200italic,300italic,italic,500italic,600italic,700italic,800italic,900italic|Anton:wght@regular|Oxygen:wght@300,regular,700|Bitter:wght@100,200,300,regular,500,600,700,800,900,100italic,200italic,300italic,italic,500italic,600italic,700italic,800italic,900italic|Cabin:wght@regular,500,600,700,italic,500italic,600italic,700italic|Secular+One:wght@regular|Source+Serif+Pro:wght@200,200italic,300,300italic,regular,italic,600,600italic,700,700italic,900,900italic|PT+Sans+Narrow:wght@regular,700|Cairo:wght@200,300,regular,500,600,700,800,900|Barlow+Condensed:wght@100,100italic,200,200italic,300,300italic,regular,italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic|Dancing+Script:wght@regular,500,600,700|Lobster:wght@regular|EB+Garamond:wght@regular,500,600,700,800,italic,500italic,600italic,700italic,800italic|Hind:wght@300,regular,500,600,700|Prompt:wght@100,100italic,200,200italic,300,300italic,regular,italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic|Abel:wght@regular|Comfortaa:wght@300,regular,500,600,700|Varela+Round:wght@regular|Signika+Negative:wght@300,regular,500,600,700|Pacifico:wght@regular|Crimson+Text:wght@regular,italic,600,600italic,700,700italic|Exo+2:wght@100,200,300,regular,500,600,700,800,900,100italic,200italic,300italic,italic,500italic,600italic,700italic,800italic,900italic|Fjalla+One:wght@regular|Noto+Sans+SC:wght@100,300,regular,500,700,900|Arvo:wght@regular,italic,700,700italic|Maven+Pro:wght@regular,500,600,700,800,900|Space+Grotesk:wght@300,regular,500,600,700|Teko:wght@300,regular,500,600,700|Asap:wght@100,200,300,regular,500,600,700,800,900,100italic,200italic,300italic,italic,500italic,600italic,700italic,800italic,900italic|Caveat:wght@regular,500,600,700|Merriweather+Sans:wght@300,regular,500,600,700,800,300italic,italic,500italic,600italic,700italic,800italic|Slabo+27px:wght@regular|Noto+Serif+JP:wght@200,300,regular,500,600,700,900|Overpass:wght@100,200,300,regular,500,600,700,800,900,100italic,200italic,300italic,italic,500italic,600italic,700italic,800italic,900italic|Jost:wght@100,200,300,regular,500,600,700,800,900,100italic,200italic,300italic,italic,500italic,600italic,700italic,800italic,900italic|Abril+Fatface:wght@regular|Shadows+Into+Light:wght@regular|Archivo:wght@100,200,300,regular,500,600,700,800,900,100italic,200italic,300italic,italic,500italic,600italic,700italic,800italic,900italic|Assistant:wght@200,300,regular,500,600,700,800|Public+Sans:wght@100,200,300,regular,500,600,700,800,900,100italic,200italic,300italic,italic,500italic,600italic,700italic,800italic,900italic|Rajdhani:wght@300,regular,500,600,700|Indie+Flower:wght@regular|Yanone+Kaffeesatz:wght@200,300,regular,500,600,700|Barlow+Semi+Condensed:wght@100,100italic,200,200italic,300,300italic,regular,italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic|Cormorant+Garamond:wght@300,300italic,regular,italic,500,500italic,600,600italic,700,700italic|Red+Hat+Display:wght@300,regular,500,600,700,800,900,300italic,italic,500italic,600italic,700italic,800italic,900italic|M+PLUS+Rounded+1c:wght@100,300,regular,500,700,800,900|Questrial:wght@regular|Satisfy:wght@regular|Tajawal:wght@200,300,regular,500,700,800,900|Catamaran:wght@100,200,300,regular,500,600,700,800,900|Fira+Sans+Condensed:wght@100,100italic,200,200italic,300,300italic,regular,italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic|Hind+Madurai:wght@300,regular,500,600,700|Permanent+Marker:wght@regular|Signika:wght@300,regular,500,600,700|Zilla+Slab:wght@300,300italic,regular,italic,500,500italic,600,600italic,700,700italic|IBM+Plex+Serif:wght@100,100italic,200,200italic,300,300italic,regular,italic,500,500italic,600,600italic,700,700italic|Exo:wght@100,200,300,regular,500,600,700,800,900,100italic,200italic,300italic,italic,500italic,600italic,700italic,800italic,900italic|IBM+Plex+Mono:wght@100,100italic,200,200italic,300,300italic,regular,italic,500,500italic,600,600italic,700,700italic|Noto+Sans+Arabic:wght@100,200,300,regular,500,600,700,800,900|Bree+Serif:wght@regular|Amatic+SC:wght@regular,700|Noto+Sans+HK:wght@100,300,regular,500,700,900|Nanum+Myeongjo:wght@regular,700,800|Fredoka+One:wght@regular|Archivo+Narrow:wght@regular,500,600,700,italic,500italic,600italic,700italic|Play:wght@regular,700|Sarabun:wght@100,100italic,200,200italic,300,300italic,regular,italic,500,500italic,600,600italic,700,700italic,800,800italic|ABeeZee:wght@regular,italic|Domine:wght@regular,500,600,700|Acme:wght@regular|Chakra+Petch:wght@300,300italic,regular,italic,500,500italic,600,600italic,700,700italic|Vollkorn:wght@regular,500,600,700,800,900,italic,500italic,600italic,700italic,800italic,900italic|Saira+Condensed:wght@100,200,300,regular,500,600,700,800,900|Alfa+Slab+One:wght@regular|M+PLUS+1p:wght@100,300,regular,500,700,800,900|Alegreya+Sans:wght@100,100italic,300,300italic,regular,italic,500,500italic,700,700italic,800,800italic,900,900italic|Didact+Gothic:wght@regular|Russo+One:wght@regular|Asap+Condensed:wght@200,200italic,300,300italic,regular,italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic|Alegreya:wght@regular,500,600,700,800,900,italic,500italic,600italic,700italic,800italic,900italic|Archivo+Black:wght@regular|Cinzel:wght@regular,500,600,700,800,900|Righteous:wght@regular|Covered+By+Your+Grace:wght@regular|Frank+Ruhl+Libre:wght@300,regular,500,700,900|Orbitron:wght@regular,500,600,700,800,900|DM+Serif+Display:wght@regular,italic|Ubuntu+Condensed:wght@regular|Space+Mono:wght@regular,italic,700,700italic|IBM+Plex+Sans+Arabic:wght@100,200,300,regular,500,600,700|Tinos:wght@regular,italic,700,700italic|Crete+Round:wght@regular,italic|Kalam:wght@300,regular,700|Amiri:wght@regular,italic,700,700italic|Noto+Serif+TC:wght@200,300,regular,500,600,700,900|Courgette:wght@regular|Rokkitt:wght@100,200,300,regular,500,600,700,800,900|Yantramanav:wght@100,300,regular,500,700,900|Changa:wght@200,300,regular,500,600,700,800|Martel:wght@200,300,regular,600,700,800,900|Lobster+Two:wght@regular,italic,700,700italic|Spectral:wght@200,200italic,300,300italic,regular,italic,500,500italic,600,600italic,700,700italic,800,800italic|Great+Vibes:wght@regular|Almarai:wght@300,regular,700,800|Prata:wght@regular|Patua+One:wght@regular|Cormorant:wght@300,regular,500,600,700,300italic,italic,500italic,600italic,700italic|Montserrat+Alternates:wght@100,100italic,200,200italic,300,300italic,regular,italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic|Alata:wght@regular|Encode+Sans:wght@100,200,300,regular,500,600,700,800,900|Baloo+2:wght@regular,500,600,700,800|Noticia+Text:wght@regular,italic,700,700italic|Faustina:wght@300,regular,500,600,700,800,300italic,italic,500italic,600italic,700italic,800italic|Paytone+One:wght@regular|Francois+One:wght@regular|Noto+Kufi+Arabic:wght@100,200,300,regular,500,600,700,800,900|Sora:wght@100,200,300,regular,500,600,700,800|Old+Standard+TT:wght@regular,italic,700|PT+Sans+Caption:wght@regular,700|Cardo:wght@regular,italic,700|Fira+Sans+Extra+Condensed:wght@100,100italic,200,200italic,300,300italic,regular,italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic|Kaushan+Script:wght@regular|Passion+One:wght@regular,700,900|Quattrocento+Sans:wght@regular,italic,700,700italic|Cookie:wght@regular|Gothic+A1:wght@100,200,300,regular,500,600,700,800,900|Noto+Sans+Display:wght@100,200,300,regular,500,600,700,800,900,100italic,200italic,300italic,italic,500italic,600italic,700italic,800italic,900italic|Lexend:wght@100,200,300,regular,500,600,700,800,900|Staatliches:wght@regular|Urbanist:wght@100,200,300,regular,500,600,700,800,900,100italic,200italic,300italic,italic,500italic,600italic,700italic,800italic,900italic|Antic+Slab:wght@regular|Saira:wght@100,200,300,regular,500,600,700,800,900,100italic,200italic,300italic,italic,500italic,600italic,700italic,800italic,900italic|Patrick+Hand:wght@regular|Michroma:wght@regular|PT+Mono:wght@regular|Commissioner:wght@100,200,300,regular,500,600,700,800,900|Gloria+Hallelujah:wght@regular|Unna:wght@regular,italic,700,700italic|Concert+One:wght@regular|Marcellus:wght@regular|Yellowtail:wght@regular|Pathway+Gothic+One:wght@regular|Titan+One:wght@regular|Lexend+Deca:wght@100,200,300,regular,500,600,700,800,900|Sawarabi+Mincho:wght@regular|Chivo:wght@100,200,300,regular,500,600,700,800,900,100italic,200italic,300italic,italic,500italic,600italic,700italic,800italic,900italic|Sacramento:wght@regular|Mali:wght@200,200italic,300,300italic,regular,italic,500,500italic,600,600italic,700,700italic|Gelasio:wght@regular,italic,500,500italic,600,600italic,700,700italic|Be+Vietnam+Pro:wght@100,100italic,200,200italic,300,300italic,regular,italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic|Philosopher:wght@regular,italic,700,700italic|Outfit:wght@100,200,300,regular,500,600,700,800,900|News+Cycle:wght@regular,700|Crimson+Pro:wght@200,300,regular,500,600,700,800,900,200italic,300italic,italic,500italic,600italic,700italic,800italic,900italic|Josefin+Slab:wght@100,200,300,regular,500,600,700,100italic,200italic,300italic,italic,500italic,600italic,700italic|Luckiest+Guy:wght@regular|Playfair+Display+SC:wght@regular,italic,700,700italic,900,900italic|Noto+Serif+KR:wght@200,300,regular,500,600,700,900|Quattrocento:wght@regular,700|Press+Start+2P:wght@regular|Advent+Pro:wght@100,200,300,regular,500,600,700|Sen:wght@regular,700,800|Cantarell:wght@regular,italic,700,700italic|Ultra:wght@regular|Carter+One:wght@regular|IBM+Plex+Sans+Condensed:wght@100,100italic,200,200italic,300,300italic,regular,italic,500,500italic,600,600italic,700,700italic|Yeseva+One:wght@regular|Vidaloka:wght@regular|Taviraj:wght@100,100italic,200,200italic,300,300italic,regular,italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic|Eczar:wght@regular,500,600,700,800|Cuprum:wght@regular,500,600,700,italic,500italic,600italic,700italic|Sawarabi+Gothic:wght@regular|Poiret+One:wght@regular|Ropa+Sans:wght@regular,italic|Alice:wght@regular|El+Messiri:wght@regular,500,600,700|Handlee:wght@regular|Bodoni+Moda:wght@regular,500,600,700,800,900,italic,500italic,600italic,700italic,800italic,900italic|Neucha:wght@regular|Lilita+One:wght@regular|Aleo:wght@300,300italic,regular,italic,700,700italic|Macondo:wght@regular|Kosugi+Maru:wght@regular|Special+Elite:wght@regular|Rubik+Mono+One:wght@regular|Ubuntu+Mono:wght@regular,italic,700,700italic|Antonio:wght@100,200,300,regular,500,600,700|Red+Hat+Text:wght@300,regular,500,600,700,300italic,italic,500italic,600italic,700italic|Mitr:wght@200,300,regular,500,600,700|Neuton:wght@200,300,regular,italic,700,800|Bangers:wght@regular|Plus+Jakarta+Sans:wght@200,300,regular,500,600,700,800,200italic,300italic,italic,500italic,600italic,700italic,800italic|Mukta+Malar:wght@200,300,regular,500,600,700,800|Khand:wght@300,regular,500,600,700|Marck+Script:wght@regular|Creepster:wght@regular|Architects+Daughter:wght@regular|Noto+Serif+SC:wght@200,300,regular,500,600,700,900|DM+Serif+Text:wght@regular,italic|Encode+Sans+Condensed:wght@100,200,300,regular,500,600,700,800,900|Volkhov:wght@regular,italic,700,700italic|Parisienne:wght@regular|Nanum+Gothic+Coding:wght@regular,700|Blinker:wght@100,200,300,regular,600,700,800,900|Bungee:wght@regular|Tangerine:wght@regular,700|Mr+Dafoe:wght@regular|Merienda:wght@300,regular,500,600,700,800,900|Allura:wght@regular|Quantico:wght@regular,italic,700,700italic|Saira+Semi+Condensed:wght@100,200,300,regular,500,600,700,800,900|Homemade+Apple:wght@regular|Gruppo:wght@regular|Viga:wght@regular|Playball:wght@regular|Bai+Jamjuree:wght@200,200italic,300,300italic,regular,italic,500,500italic,600,600italic,700,700italic|Arsenal:wght@regular,italic,700,700italic|Unica+One:wght@regular|Oleo+Script:wght@regular,700|Roboto+Flex:wght@regular|Sanchez:wght@regular,italic|Lusitana:wght@regular,700|Alegreya+Sans+SC:wght@100,100italic,300,300italic,regular,italic,500,500italic,700,700italic,800,800italic,900,900italic|Sarala:wght@regular,700|Amaranth:wght@regular,italic,700,700italic|Istok+Web:wght@regular,italic,700,700italic|Hammersmith+One:wght@regular",
          //"https://fonts.googleapis.com/css?family=ABeeZee|Abel|Abhaya+Libre|Abril+Fatface|Aclonica|Acme|Actor|Adamina|Advent+Pro|Aguafina+Script|Akaya+Kanadaka|Akaya+Telivigala|Akronim|Aladin|Alata|Alatsi|Aldrich|Alef|Alegreya|Alegreya+SC|Alegreya+Sans|Alegreya+Sans+SC|Aleo|Alex+Brush|Alfa+Slab+One|Alice|Alike|Alike+Angular|Allan|Allerta|Allerta+Stencil|Allura|Almarai|Almendra|Almendra+Display|Almendra+SC|Amarante|Amaranth|Amatic+SC|Amethysta|Amiko|Amiri|Amita|Anaheim|Andada|Andika|Andika+New+Basic|Angkor|Annie+Use+Your+Telescope|Anonymous+Pro|Antic|Antic+Didone|Antic+Slab|Anton|Antonio|Arapey|Arbutus|Arbutus+Slab|Architects+Daughter|Archivo|Archivo+Black|Archivo+Narrow|Aref+Ruqaa|Arima+Madurai|Arimo|Arizonia|Armata|Arsenal|Artifika|Arvo|Arya|Asap|Asap+Condensed|Asar|Asset|Assistant|Astloch|Asul|Athiti|Atma|Atomic+Age|Aubrey|Audiowide|Autour+One|Average|Average+Sans|Averia+Gruesa+Libre|Averia+Libre|Averia+Sans+Libre|Averia+Serif+Libre|B612|B612+Mono|Bad+Script|Bahiana|Bahianita|Bai+Jamjuree|Ballet|Baloo+2|Baloo+Bhai+2|Baloo+Bhaina+2|Baloo+Chettan+2|Baloo+Da+2|Baloo+Paaji+2|Baloo+Tamma+2|Baloo+Tammudu+2|Baloo+Thambi+2|Balsamiq+Sans|Balthazar|Bangers|Barlow|Barlow+Condensed|Barlow+Semi+Condensed|Barriecito|Barrio|Basic|Baskervville|Battambang|Baumans|Bayon|Be+Vietnam|Bebas+Neue|Belgrano|Bellefair|Belleza|Bellota|Bellota+Text|BenchNine|Benne|Bentham|Berkshire+Swash|Beth+Ellen|Bevan|Big+Shoulders+Display|Big+Shoulders+Inline+Display|Big+Shoulders+Inline+Text|Big+Shoulders+Stencil+Display|Big+Shoulders+Stencil+Text|Big+Shoulders+Text|Bigelow+Rules|Bigshot+One|Bilbo|Bilbo+Swash+Caps|BioRhyme|BioRhyme+Expanded|Biryani|Bitter|Black+And+White+Picture|Black+Han+Sans|Black+Ops+One|Blinker|Bodoni+Moda|Bokor|Bonbon|Boogaloo|Bowlby+One|Bowlby+One+SC|Brawler|Bree+Serif|Brygada+1918|Bubblegum+Sans|Bubbler+One|Buda|Buenard|Bungee|Bungee+Hairline|Bungee+Inline|Bungee+Outline|Bungee+Shade|Butcherman|Butterfly+Kids|Cabin|Cabin+Condensed|Cabin+Sketch|Caesar+Dressing|Cagliostro|Cairo|Caladea|Calistoga|Calligraffitti|Cambay|Cambo|Candal|Cantarell|Cantata+One|Cantora+One|Capriola|Cardo|Carme|Carrois+Gothic|Carrois+Gothic+SC|Carter+One|Castoro|Catamaran|Caudex|Caveat|Caveat+Brush|Cedarville+Cursive|Ceviche+One|Chakra+Petch|Changa|Changa+One|Chango|Charm|Charmonman|Chathura|Chau+Philomene+One|Chela+One|Chelsea+Market|Chenla|Cherry+Cream+Soda|Cherry+Swash|Chewy|Chicle|Chilanka|Chivo|Chonburi|Cinzel|Cinzel+Decorative|Clicker+Script|Coda|Coda+Caption|Codystar|Coiny|Combo|Comfortaa|Comic+Neue|Coming+Soon|Commissioner|Concert+One|Condiment|Content|Contrail+One|Convergence|Cookie|Copse|Corben|Cormorant|Cormorant+Garamond|Cormorant+Infant|Cormorant+SC|Cormorant+Unicase|Cormorant+Upright|Courgette|Courier+Prime|Cousine|Coustard|Covered+By+Your+Grace|Crafty+Girls|Creepster|Crete+Round|Crimson+Pro|Crimson+Text|Croissant+One|Crushed|Cuprum|Cute+Font|Cutive|Cutive+Mono|DM+Mono|DM+Sans|DM+Serif+Display|DM+Serif+Text|Damion|Dancing+Script|Dangrek|Darker+Grotesque|David+Libre|Dawning+of+a+New+Day|Days+One|Dekko|Dela+Gothic+One|Delius|Delius+Swash+Caps|Delius+Unicase|Della+Respira|Denk+One|Devonshire|Dhurjati|Didact+Gothic|Diplomata|Diplomata+SC|Do+Hyeon|Dokdo|Domine|Donegal+One|Doppio+One|Dorsa|Dosis|DotGothic16|Dr+Sugiyama|Duru+Sans|Dynalight|EB+Garamond|Eagle+Lake|East+Sea+Dokdo|Eater|Economica|Eczar|El+Messiri|Electrolize|Elsie|Elsie+Swash+Caps|Emblema+One|Emilys+Candy|Encode+Sans|Encode+Sans+Condensed|Encode+Sans+Expanded|Encode+Sans+Semi+Condensed|Encode+Sans+Semi+Expanded|Engagement|Englebert|Enriqueta|Epilogue|Erica+One|Esteban|Euphoria+Script|Ewert|Exo|Exo+2|Expletus+Sans|Fahkwang|Fanwood+Text|Farro|Farsan|Fascinate|Fascinate+Inline|Faster+One|Fasthand|Fauna+One|Faustina|Federant|Federo|Felipa|Fenix|Finger+Paint|Fira+Code|Fira+Mono|Fira+Sans|Fira+Sans+Condensed|Fira+Sans+Extra+Condensed|Fjalla+One|Fjord+One|Flamenco|Flavors|Fondamento|Fontdiner+Swanky|Forum|Francois+One|Frank+Ruhl+Libre|Fraunces|Freckle+Face|Fredericka+the+Great|Fredoka+One|Freehand|Fresca|Frijole|Fruktur|Fugaz+One|GFS+Didot|GFS+Neohellenic|Gabriela|Gaegu|Gafata|Galada|Galdeano|Galindo|Gamja+Flower|Gayathri|Gelasio|Gentium+Basic|Gentium+Book+Basic|Geo|Geostar|Geostar+Fill|Germania+One|Gidugu|Gilda+Display|Girassol|Give+You+Glory|Glass+Antiqua|Glegoo|Gloria+Hallelujah|Goblin+One|Gochi+Hand|Goldman|Gorditas|Gothic+A1|Gotu|Goudy+Bookletter+1911|Graduate|Grand+Hotel|Grandstander|Gravitas+One|Great+Vibes|Grenze|Grenze+Gotisch|Griffy|Gruppo|Gudea|Gugi|Gupter|Gurajada|Habibi|Hachi+Maru+Pop|Halant|Hammersmith+One|Hanalei|Hanalei+Fill|Handlee|Hanuman|Happy+Monkey|Harmattan|Headland+One|Heebo|Henny+Penny|Hepta+Slab|Herr+Von+Muellerhoff|Hi+Melody|Hind|Hind+Guntur|Hind+Madurai|Hind+Siliguri|Hind+Vadodara|Holtwood+One+SC|Homemade+Apple|Homenaje|IBM+Plex+Mono|IBM+Plex+Sans|IBM+Plex+Sans+Condensed|IBM+Plex+Serif|IM+Fell+DW+Pica|IM+Fell+DW+Pica+SC|IM+Fell+Double+Pica|IM+Fell+Double+Pica+SC|IM+Fell+English|IM+Fell+English+SC|IM+Fell+French+Canon|IM+Fell+French+Canon+SC|IM+Fell+Great+Primer|IM+Fell+Great+Primer+SC|Ibarra+Real+Nova|Iceberg|Iceland|Imbue|Imprima|Inconsolata|Inder|Indie+Flower|Inika|Inknut+Antiqua|Inria+Sans|Inria+Serif|Inter|Irish+Grover|Istok+Web|Italiana|Italianno|Itim|Jacques+Francois|Jacques+Francois+Shadow|Jaldi|JetBrains+Mono|Jim+Nightshade|Jockey+One|Jolly+Lodger|Jomhuria|Jomolhari|Josefin+Sans|Josefin+Slab|Jost|Joti+One|Jua|Judson|Julee|Julius+Sans+One|Junge|Jura|Just+Another+Hand|Just+Me+Again+Down+Here|K2D|Kadwa|Kalam|Kameron|Kanit|Kantumruy|Karantina|Karla|Karma|Katibeh|Kaushan+Script|Kavivanar|Kavoon|Kdam+Thmor|Keania+One|Kelly+Slab|Kenia|Khand|Khmer|Khula|Kirang+Haerang|Kite+One|Kiwi+Maru|Knewave|KoHo|Kodchasan|Kosugi|Kosugi+Maru|Kotta+One|Koulen|Kranky|Kreon|Kristi|Krona+One|Krub|Kufam|Kulim+Park|Kumar+One|Kumar+One+Outline|Kumbh+Sans|Kurale|La+Belle+Aurore|Lacquer|Laila|Lakki+Reddy|Lalezar|Lancelot|Langar|Lateef|Lato|League+Script|Leckerli+One|Ledger|Lekton|Lemon|Lemonada|Lexend|Lexend+Deca|Lexend+Exa|Lexend+Giga|Lexend+Mega|Lexend+Peta|Lexend+Tera|Lexend+Zetta|Libre+Barcode+128|Libre+Barcode+128+Text|Libre+Barcode+39|Libre+Barcode+39+Extended|Libre+Barcode+39+Extended+Text|Libre+Barcode+39+Text|Libre+Barcode+EAN13+Text|Libre+Baskerville|Libre+Caslon+Display|Libre+Caslon+Text|Libre+Franklin|Life+Savers|Lilita+One|Lily+Script+One|Limelight|Linden+Hill|Literata|Liu+Jian+Mao+Cao|Livvic|Lobster|Lobster+Two|Londrina+Outline|Londrina+Shadow|Londrina+Sketch|Londrina+Solid|Long+Cang|Lora|Love+Ya+Like+A+Sister|Loved+by+the+King|Lovers+Quarrel|Luckiest+Guy|Lusitana|Lustria|M+PLUS+1p|M+PLUS+Rounded+1c|Ma+Shan+Zheng|Macondo|Macondo+Swash+Caps|Mada|Magra|Maiden+Orange|Maitree|Major+Mono+Display|Mako|Mali|Mallanna|Mandali|Manjari|Manrope|Mansalva|Manuale|Marcellus|Marcellus+SC|Marck+Script|Margarine|Markazi+Text|Marko+One|Marmelad|Martel|Martel+Sans|Marvel|Mate|Mate+SC|Maven+Pro|McLaren|Meddon|MedievalSharp|Medula+One|Meera+Inimai|Megrim|Meie+Script|Merienda|Merienda+One|Merriweather|Merriweather+Sans|Metal|Metal+Mania|Metamorphous|Metrophobic|Michroma|Milonga|Miltonian|Miltonian+Tattoo|Mina|Miniver|Miriam+Libre|Mirza|Miss+Fajardose|Mitr|Modak|Modern+Antiqua|Mogra|Molengo|Molle|Monda|Monofett|Monoton|Monsieur+La+Doulaise|Montaga|Montez|Montserrat|Montserrat+Alternates|Montserrat+Subrayada|Moul|Moulpali|Mountains+of+Christmas|Mouse+Memoirs|Mr+Bedfort|Mr+Dafoe|Mr+De+Haviland|Mrs+Saint+Delafield|Mrs+Sheppards|Mukta|Mukta+Mahee|Mukta+Malar|Mukta+Vaani|Mulish|MuseoModerno|Mystery+Quest|NTR|Nanum+Brush+Script|Nanum+Gothic|Nanum+Gothic+Coding|Nanum+Myeongjo|Nanum+Pen+Script|Nerko+One|Neucha|Neuton|New+Rocker|New+Tegomin|News+Cycle|Newsreader|Niconne|Niramit|Nixie+One|Nobile|Nokora|Norican|Nosifer|Notable|Nothing+You+Could+Do|Noticia+Text|Noto+Sans|Noto+Sans+HK|Noto+Sans+JP|Noto+Sans+KR|Noto+Sans+SC|Noto+Sans+TC|Noto+Serif|Noto+Serif+JP|Noto+Serif+KR|Noto+Serif+SC|Noto+Serif+TC|Nova+Cut|Nova+Flat|Nova+Mono|Nova+Oval|Nova+Round|Nova+Script|Nova+Slim|Nova+Square|Numans|Nunito|Nunito+Sans|Odibee+Sans|Odor+Mean+Chey|Offside|Oi|Old+Standard+TT|Oldenburg|Oleo+Script|Oleo+Script+Swash+Caps|Open+Sans|Open+Sans+Condensed|Oranienbaum|Orbitron|Oregano|Orelega+One|Orienta|Original+Surfer|Oswald|Over+the+Rainbow|Overlock|Overlock+SC|Overpass|Overpass+Mono|Ovo|Oxanium|Oxygen|Oxygen+Mono|PT+Mono|PT+Sans|PT+Sans+Caption|PT+Sans+Narrow|PT+Serif|PT+Serif+Caption|Pacifico|Padauk|Palanquin|Palanquin+Dark|Pangolin|Paprika|Parisienne|Passero+One|Passion+One|Pathway+Gothic+One|Patrick+Hand|Patrick+Hand+SC|Pattaya|Patua+One|Pavanam|Paytone+One|Peddana|Peralta|Permanent+Marker|Petit+Formal+Script|Petrona|Philosopher|Piazzolla|Piedra|Pinyon+Script|Pirata+One|Plaster|Play|Playball|Playfair+Display|Playfair+Display+SC|Podkova|Poiret+One|Poller+One|Poly|Pompiere|Pontano+Sans|Poor+Story|Poppins|Port+Lligat+Sans|Port+Lligat+Slab|Potta+One|Pragati+Narrow|Prata|Preahvihear|Press+Start+2P|Pridi|Princess+Sofia|Prociono|Prompt|Prosto+One|Proza+Libre|Public+Sans|Puritan|Purple+Purse|Quando|Quantico|Quattrocento|Quattrocento+Sans|Questrial|Quicksand|Quintessential|Qwigley|Racing+Sans+One|Radley|Rajdhani|Rakkas|Raleway|Raleway+Dots|Ramabhadra|Ramaraja|Rambla|Rammetto+One|Ranchers|Rancho|Ranga|Rasa|Rationale|Ravi+Prakash|Recursive|Red+Hat+Display|Red+Hat+Text|Red+Rose|Redressed|Reem+Kufi|Reenie+Beanie|Reggae+One|Revalia|Rhodium+Libre|Ribeye|Ribeye+Marrow|Righteous|Risque|Roboto|Roboto+Condensed|Roboto+Mono|Roboto+Slab|Rochester|Rock+Salt|RocknRoll+One|Rokkitt|Romanesco|Ropa+Sans|Rosario|Rosarivo|Rouge+Script|Rowdies|Rozha+One|Rubik|Rubik+Mono+One|Ruda|Rufina|Ruge+Boogie|Ruluko|Rum+Raisin|Ruslan+Display|Russo+One|Ruthie|Rye|Sacramento|Sahitya|Sail|Saira|Saira+Condensed|Saira+Extra+Condensed|Saira+Semi+Condensed|Saira+Stencil+One|Salsa|Sanchez|Sancreek|Sansita|Sansita+Swashed|Sarabun|Sarala|Sarina|Sarpanch|Satisfy|Sawarabi+Gothic|Sawarabi+Mincho|Scada|Scheherazade|Schoolbell|Scope+One|Seaweed+Script|Secular+One|Sedgwick+Ave|Sedgwick+Ave+Display|Sen|Sevillana|Seymour+One|Shadows+Into+Light|Shadows+Into+Light+Two|Shanti|Share|Share+Tech|Share+Tech+Mono|Shippori+Mincho|Shippori+Mincho+B1|Shojumaru|Short+Stack|Shrikhand|Siemreap|Sigmar+One|Signika|Signika+Negative|Simonetta|Single+Day|Sintony|Sirin+Stencil|Six+Caps|Skranji|Slabo+13px|Slabo+27px|Slackey|Smokum|Smythe|Sniglet|Snippet|Snowburst+One|Sofadi+One|Sofia|Solway|Song+Myung|Sonsie+One|Sora|Sorts+Mill+Goudy|Source+Code+Pro|Source+Sans+Pro|Source+Serif+Pro|Space+Grotesk|Space+Mono|Spartan|Special+Elite|Spectral|Spectral+SC|Spicy+Rice|Spinnaker|Spirax|Squada+One|Sree+Krushnadevaraya|Sriracha|Srisakdi|Staatliches|Stalemate|Stalinist+One|Stardos+Stencil|Stick|Stint+Ultra+Condensed|Stint+Ultra+Expanded|Stoke|Strait|Stylish|Sue+Ellen+Francisco|Suez+One|Sulphur+Point|Sumana|Sunflower|Sunshiney|Supermercado+One|Sura|Suranna|Suravaram|Suwannaphum|Swanky+and+Moo+Moo|Syncopate|Syne|Syne+Mono|Syne+Tactile|Tajawal|Tangerine|Taprom|Tauri|Taviraj|Teko|Telex|Tenali+Ramakrishna|Tenor+Sans|Text+Me+One|Texturina|Thasadith|The+Girl+Next+Door|Tienne|Tillana|Timmana|Tinos|Titan+One|Titillium+Web|Tomorrow|Trade+Winds|Train+One|Trirong|Trispace|Trocchi|Trochut|Truculenta|Trykker|Tulpen+One|Turret+Road|Ubuntu|Ubuntu+Condensed|Ubuntu+Mono|Ultra|Uncial+Antiqua|Underdog|Unica+One|UnifrakturCook|UnifrakturMaguntia|Unkempt|Unlock|Unna|VT323|Vampiro+One|Varela|Varela+Round|Varta|Vast+Shadow|Vesper+Libre|Viaoda+Libre|Vibes|Vibur|Vidaloka|Viga|Voces|Volkhov|Vollkorn|Vollkorn+SC|Voltaire|Waiting+for+the+Sunrise|Wallpoet|Walter+Turncoat|Warnes|Wellfleet|Wendy+One|Wire+One|Work+Sans|Xanh+Mono|Yanone+Kaffeesatz|Yantramanav|Yatra+One|Yellowtail|Yeon+Sung|Yeseva+One|Yesteryear|Yrsa|Yusei+Magic|ZCOOL+KuaiLe|ZCOOL+QingKe+HuangYou|ZCOOL+XiaoWei|Zen+Dots|Zeyada|Zhi+Mang+Xing|Zilla+Slab|Zilla+Slab+Highlight",
          "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css",
          "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css",
          "https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css",
          "https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.carousel.min.css",
          "https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.theme.green.min.css",
          "https://cdnjs.cloudflare.com/ajax/libs/unitegallery/1.7.40/css/unite-gallery.min.css",
          "https://cdnjs.cloudflare.com/ajax/libs/unitegallery/1.7.40/themes/default/ug-theme-default.min.css",
          //"https://cdnjs.cloudflare.com/ajax/libs/unitegallery/1.7.40/skins/alexis/alexis.css",

          // process.env.REACT_APP_MEDIA_URL +
          //   "assets/fontawesome6.1/css/all.min.css",
          process.env.REACT_APP_MEDIA_URL +
            "sites/" +
            siteId +
            "/styleglobal.css?v=" +
            uuidv4(),
          process.env.REACT_APP_MEDIA_URL +
            "assets/hoverEffectOne.css?v=" +
            uuidv4(),
          process.env.REACT_APP_MEDIA_URL + "assets/custom.css?v=" + uuidv4(),
        ],
        scripts: [
          "https://code.jquery.com/jquery-3.7.0.min.js",
          "https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js",
          "https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js",
          "https://www.google.com/recaptcha/api.js",
          "https://cdnjs.cloudflare.com/ajax/libs/unitegallery/1.7.40/js/unitegallery.min.js",
          "https://cdnjs.cloudflare.com/ajax/libs/unitegallery/1.7.40/themes/default/ug-theme-default.min.js",
          "https://cdnjs.cloudflare.com/ajax/libs/unitegallery/1.7.40/themes/carousel/ug-theme-carousel.min.js",
          "https://cdnjs.cloudflare.com/ajax/libs/unitegallery/1.7.40/themes/tiles/ug-theme-tiles.min.js",
          "https://cdnjs.cloudflare.com/ajax/libs/unitegallery/1.7.40/themes/grid/ug-theme-grid.min.js",
          "https://cdnjs.cloudflare.com/ajax/libs/unitegallery/1.7.40/themes/slider/ug-theme-slider.min.js",
          "https://cdnjs.cloudflare.com/ajax/libs/unitegallery/1.7.40/themes/tilesgrid/ug-theme-tilesgrid.min.js",
          "https://cdnjs.cloudflare.com/ajax/libs/unitegallery/1.7.40/themes/compact/ug-theme-compact.min.js",
        ],
      },
      head: {
        style: `
          /* Your custom CSS styles here */
        `,
        scripts: [
          {
            type: "text/javascript",
            innerHTML: `
  
            `,
          },
        ],
      },
      // Avoid any default panel
      panels: { defaults: [] },

      blockManager: {
        appendTo: "#widgetsPanel",
      },

      selectorManager: {
        appendTo: "#selectorManager",
        componentFirst: true,
      },
      styleManager: {
        clearProperties: true,
        appendTo: "#stylepanel",
      },
      traitManager: {
        appendTo: "#traitManager",
      },
      assetManager: {
        embedAsBase64: true,
        multiUpload: true,
        assets: process.env.REACT_APP_API_URL + "/medias/getmediasrc/" + siteId,
        // upload: process.env.REACT_APP_API_URL + "/medias/upload/" + siteId,
        //  upload :"../../assets/img",
        upload: true,
        uploadFile: function (e) {
          var files = e.dataTransfer ? e.dataTransfer.files : e.target.files;
          UploadMedia(files);
        },
        // The name used in POST to pass uploaded files, default: `'files'`
        uploadName: "files",
      },
      i18n: {
        locale: "fr",
        localeFallback: "fr",
        detectLocale: false,
        messages: { fr },
      },
      storageManager: {
        type: "remote",
        contentTypeJson: false,
        // Storage type. Available: local | remote
        autosave: false, // Store data automatically
        stepsBeforeSave: 80, // If autosave is enabled, indicates how many changes are necessary before the store method is triggered
      },
    });
    gjs.Storage.add("remote", {
      async load() {
        // ...
      },
      async store(data) {
        let dataS =
          type == "popup"
            ? {
                id: pageId,
                siteSchema: siteId,
                content: {
                  html: gjs.getHtml(),
                  css: gjs.getCss(),
                  assets: gjs.AssetManager.getAll(),
                },
                head: gjs.Canvas.getDocument()
                  ? gjs.Canvas.getDocument().head
                  : "",
              }
            : await storePage();
        //console.log(dataS);
        return await axios.post(
          type == "page"
            ? process.env.REACT_APP_API_URL + "/pages/update"
            : process.env.REACT_APP_API_URL + "/popups/update",
          dataS
        );
      },
    });
    gjs.CssComposer.getAll().reset();
    var pfx = gjs.getConfig().stylePrefix;
    var modal = gjs.Modal;
    // var cmdm = gjs.Commands;
    var htmlCodeViewer = gjs.CodeManager.getViewer("CodeMirror").clone();
    var cssCodeViewer = gjs.CodeManager.getViewer("CodeMirror").clone();
    // var pnm = gjs.Panels;
    // var container = document.createElement("div");
    var btnEdit = document.createElement("button");

    htmlCodeViewer.set({
      codeName: "htmlmixed",
      readOnly: 0,
      theme: "hopscotch",
      autoBeautify: true,
      autoCloseTags: true,
      autoCloseBrackets: true,
      lineWrapping: true,
      styleActiveLine: true,
      smartIndent: true,
      indentWithTabs: true,
    });

    cssCodeViewer.set({
      codeName: "css",
      readOnly: 0,
      theme: "hopscotch",
      autoBeautify: true,
      autoCloseTags: true,
      autoCloseBrackets: true,
      lineWrapping: true,
      styleActiveLine: true,
      smartIndent: true,
      indentWithTabs: true,
    });

    btnEdit.innerHTML = "Enregistrer";
    btnEdit.className = pfx + "btn-prim " + pfx + "btn-import";
    btnEdit.onclick = function (editor) {
      var html = htmlCodeViewer.editor.getValue();
      var css = cssCodeViewer.editor.getValue();
      gjs.DomComponents.getWrapper().set("content", "");
      gjs.setComponents(html.trim());
      gjs.setStyle(css);
      modal.close();
    };
    function getAllClassesAndIDs(component) {
      let arrCss = [];
      const allRules = gjs.Css.getRules();
      // console.log(allRules);
      function getAllUsedCSS(component) {
        allRules.map((r) => {
          const originRule = r.toCSS();
          const id = component.getAttributes().id;
          const classes = component.getClasses();
          classes.map((x) => {
            if (originRule.startsWith(`.${x}`)) {
              if (arrCss.includes(originRule) == false) {
                arrCss.push(originRule);
              }
            } else if (originRule.startsWith(`@media`)) {
              if (originRule.indexOf(`.${x}`) > -1) {
                if (arrCss.includes(originRule) == false) {
                  arrCss.push(originRule);
                }
              }
            }
          });

          if (originRule.startsWith(`#${id}`)) {
            if (arrCss.includes(originRule) == false) {
              arrCss.push(originRule);
            }
          } else if (originRule.startsWith(`@media`)) {
            if (originRule.indexOf(`#${id}`) > -1) {
              if (arrCss.includes(originRule) == false) {
                arrCss.push(originRule);
              }
            }
          }
        });
        if (component.components()) {
          component.components().forEach(getAllUsedCSS);
        }
      }
      getAllUsedCSS(component);

      return arrCss;
    }
    const getAllCss = (component) => {
      let arrCss = [];
      const allRules = gjs.Css.getRules();

      function getAllUsedCSS(component) {
        allRules.map((r) => {
          const originRule = r.toCSS();
          const id = component.getAttributes().id;
          const classes = component.getClasses();
          classes.map((x) => {
            if (originRule.startsWith(`.${x}`)) {
              if (arrCss.includes(originRule) == false) {
                arrCss.push(originRule);
              }
            } else if (originRule.startsWith(`@media`)) {
              if (originRule.indexOf(`.${x}`) > -1) {
                if (arrCss.includes(originRule) == false) {
                  arrCss.push(originRule);
                }
              }
            }
          });

          if (originRule.startsWith(`#${id}`)) {
            if (arrCss.includes(originRule) == false) {
              arrCss.push(originRule);
            }
          } else if (originRule.startsWith(`@media`)) {
            if (originRule.indexOf(`#${id}`) > -1) {
              if (arrCss.includes(originRule) == false) {
                arrCss.push(originRule);
              }
            }
          }
        });
        if (component.components()) {
          component.components().forEach(getAllUsedCSS);
        }
      }
      getAllUsedCSS(component);

      return arrCss;
    };
    const storePage = async () => {

      let cssMainString = "";
      let cssHeaderString = "";
      let cssFooterString = "";

      let header = gjs.DomComponents.getWrapper().find("header")[0];
      let device = gjs.Devices.getSelected().id;
      if (header) {
        const cssHeader = getAllClassesAndIDs(header);
        let filteredArray = cssHeader.filter((str) => str !== "");
        cssHeaderString = filteredArray.join(" ");
      }

      let footer = gjs.DomComponents.getWrapper().find("footer")[0];
      if (footer) {
        const cssFooter = getAllClassesAndIDs(footer);
        let FooterfilteredArray = cssFooter.filter((str) => str !== "");
        cssFooterString = FooterfilteredArray.join(" ");
      }
      let main = gjs.DomComponents.getWrapper().find("main")[0];
      if (main) {
        const cssMain = getAllClassesAndIDs(main);
        let MainfilteredArray = cssMain.filter((str) => str !== "");
        cssMainString = MainfilteredArray.join(" ");
      }

      let globalcmp = gjs.DomComponents.getWrapper().find("section");

      globalcmp.forEach((element) => {
        let attr = element.getAttributes();
        if (attr["data-isglobal"] == "true") {
          let formData = new FormData();
          let css = getAllCss(element);
          let filteredArray = css.filter((str) => str !== "");
          let componentCss = filteredArray.join(" ");
          formData.append("ref", attr["data-ref"]);
          formData.append("css", componentCss);
          formData.append("html", element.toHTML());
          axios
            .post(
              process.env.REACT_APP_API_URL + "/models/updateglobalmodel/",
              formData
            )
            .then(async (response) => {
              toast.success("Modèle global est a jour");
            });
        }
      });

      let site = await axios.get(
        process.env.REACT_APP_API_URL + "/sites/get/" + siteId
      );

      if (device == "mobile2") {
        return {
          id: pageId,
          siteSchema: siteId,
          headerMobile: {
            html: header ? header.toHTML() : "",
            css: cssHeaderString ? cssHeaderString : "",
          },
          footer: {
            html: footer ? footer.toHTML() : "",
            css: cssFooterString ? cssFooterString : "",
          },
          main: {
            html: main.toHTML(),
            css: cssMainString,
          },

          head: gjs.Canvas.getDocument() ? gjs.Canvas.getDocument().head : "",
        };
      }
      if (device == "tablet2" && site.data.data.site.syncHeader == false) {
        return {
          id: pageId,
          siteSchema: siteId,
          headerTablet: {
            html: header ? header.toHTML() : "",
            css: cssHeaderString ? cssHeaderString : "",
          },
          footer: {
            html: footer ? footer.toHTML() : "",
            css: cssFooterString ? cssFooterString : "",
          },
          main: {
            html: main.toHTML(),
            css: cssMainString,
          },

          head: gjs.Canvas.getDocument() ? gjs.Canvas.getDocument().head : "",
        };
      } else {
        return {
          id: pageId,
          siteSchema: siteId,
          header: {
            html: header ? header.toHTML() : "",
            css: cssHeaderString ? cssHeaderString : "",
          },
          footer: {
            html: footer ? footer.toHTML() : "",
            css: cssFooterString ? cssFooterString : "",
          },
          main: {
            html: main.toHTML(),
            css: cssMainString,
          },

          head: gjs.Canvas.getDocument() ? gjs.Canvas.getDocument().head : "",
        };
      }
    };

    gjs.on(`component:drag:end`, (cmp) => {
      if (
        cmp.parent &&
        ["Main", "Header", "Footer"].includes(cmp.parent.get("type")) &&
        cmp.target.getEl().tagName != "SECTION" &&
        cmp.target.getEl().tagName != "HR" &&
        !cmp.target.getEl().classList.contains("espaceur") &&
        !cmp.target.getEl().classList.contains("fixeicon-gjs")
      ) {
        let content = "";
        if (
          cmp.target.getEl().classList &&
          cmp.target.getEl().classList.contains("gjs-row")
        ) {
          content = `<section id="${"section-" + uuidv4()}" data-ref="${
            "section-" + uuidv4()
          }">${cmp.target.toHTML()}<style>${cmp.target.getStyle()}</style></section>`;
        } else {
          content = `<section id="${"section-" + uuidv4()}" data-ref="${
            "section-" + uuidv4()
          }">
          <div class="gjs-row"  data-gjs-droppable=".gjs-cell,[class^='col']" id="row-${uuidv4()}" data-gjs-draggable="section,main,footer,header">
    <div class="gjs-cell" data-gjs-draggable=".gjs-row" > ${cmp.target.toHTML()} <style>${cmp.target.getStyle()}</style></div>
  </div>

         </section>`;
        }
        //component.remove()

        cmp.target.replaceWith(content);
      }
    });

    gjs.on(`block:drag:start`, (block) => {
      if (block) {
        //console.log(
         // typeof block.get("content") == "string",
         // block.get("content")
        //);
        if (
          typeof block.get("content") == "string" &&
          block.get("content").indexOf("section") > -1
        ) {
          // let attr = block.getAttributes();
          // let ref = attr["data-ref"];
          let section = gjs.getWrapper().find("section");
          section.forEach((s) => {
            let attrs = s.getAttributes();
            let refs = attrs["data-ref"];
            if (block.getContent().indexOf(refs) > -1) {
              alert(
                "Section global doit être utiliser une seul fois dans la même page"
              );
              return;
            }
          });
        }
      }
    });
    gjs.on(`block:drag:stop`, (component, block) => {
      if (component) {
        let type = component.get("type");
        if (component) {
          const parent = component.parent();

          if (
            parent &&
            ["Main", "Header", "Footer"].includes(parent.get("type")) &&
            component.getEl().tagName != "SECTION" &&
            component.getEl().tagName != "HR" &&
            !component.getEl().classList.contains("espaceur") &&
            !component.getEl().classList.contains("fixeicon-gjs")
          ) {
            let content = "";
            if (
              component.getEl().classList &&
              component.getEl().classList.contains("gjs-row")
            ) {
              content = `<section  id="${"section-" + uuidv4()}" data-ref="${
                "section-" + uuidv4()
              }">${component.toHTML()}<style>${component.getStyle()}</style></section>`;
            } else {
              content = `<section  id="${"section-" + uuidv4()}" data-ref="${
                "section-" + uuidv4()
              }">
          <div class="gjs-row"  data-gjs-droppable=".gjs-cell,[class^='col']" id="row-${uuidv4()}" data-gjs-draggable="section,main,footer,header">
    <div class="gjs-cell" data-gjs-draggable=".gjs-row" > ${component.toHTML()} <style>${component.getStyle()}</style></div>
  </div>

         </section>`;
            }
            //component.remove()

            let nvcmp = component.replaceWith(content);
            let row = nvcmp.findType(type);
            if (type == "mapType") {
              row[0].setStyle({
                width: "100%",
                height: "300px",
                overflow: "hidden",
                position: "relative",
              });
            }

            gjs.select(row[0]);
          }
        }
      }
      gjs.Css.remove(".gjs-cell");
    });

    gjs.on("load", async () => {
      await axios
        .get(
          process.env.REACT_APP_API_URL + "/models/getbytypeandsite/" + siteId + "/" + storeClient.client.compte
          )
        .then(async (response) => {
          let models = response.data.data;

          await Promise.all(
            Object.values(models).map(async (model) => {
              await Promise.all(
                model.map((m) => {
                  let content = m.content.html;
                  if (m.type == "Global") {
                    content = m.content.html.replace(
                      `<section`,
                      `<section data-isglobal=true `
                    );
                  } else {
                    content = m.content.html.replace(
                      `<section`,
                      `<section data-isglobal=false `
                    );
                  }
                  try {
   
                    let cat = m.category
                    typeof cat != "object" ? (cat = JSON.parse(cat)) : (cat = cat);
                    gjs.BlockManager.add(m.ref, {
                      label: `<div class="sectionBlocks" data-type="model" data-ref="${m.ref}" style="background:url('${m.capture}')"><div class="supcategorytp ${m.type}"><span><b>${m.type}</b></span></div></div>`,
                      category: cat.value,
                      attributes: {
                        class: "SLIDER menu-gjs",
                      },
                      activate: 1,
                      content: content + "<style>" + m.content.css + "</style>",
                    });
                  } catch (error) {}
                })
              );
            })
          );
        });
      gjs.Css.remove(".gjs-cell");
      gjs.Devices.add("tablet2", "768px", {
        widthMedia: "991px) and (min-width:768px",
      });
      gjs.Devices.add({
        // Without an explicit ID, the `name` will be taken. In case of missing `name`, a random ID will be created.
        id: "mobile2",
        name: "Mobile",
        width: "340px",
        widthMedia: "767px",
        // This width will be applied on the canvas frame and for the CSS media
      });
      gjs.Devices.add({
        // Without an explicit ID, the `name` will be taken. In case of missing `name`, a random ID will be created.
        id: "desktop2",
        name: "Desktop",
        width: "1200px",
        // This width will be applied on the canvas frame and for the CSS media
      });
      gjs.StyleManager.removeProperty("typography", "font-family");
      /* 
      const ListFonts = fontsList.items;
      let list = ListFonts.map((font) => {
        return {
          id: font.family.replaceAll(" ", " "),
          label: font.family,
        };
      });
      const sortedList = list.sort((a, b) => a.id.localeCompare(b.id)); */

      gjs.getWrapper().set("droppable", false);
      var head = gjs.Canvas.getDocument().head;

      head.insertAdjacentHTML(
        "beforeend",

        ` <style>
        .gjs-dashed *[data-gjs-highlightable] {
          outline: 1px dashed rgb(255 255 255 / 0%)!important;
          outline-offset: -2px;
      }
    .gjs-dashed footer, .gjs-dashed header {
      border: 2px solid #f6c344!important;
      position:relative;
      
    }
      .gjs-dashed .gjs-cell{
        outline: 1px solid #c1c1c1!important;
    }
    .gjs-selected-parent{
        background:#cde1ff;
        outline:1px solid #0d6efd!important
    }
    section.gjs-selected[data-gjs-highlightable],section.gjs-hovered[data-gjs-highlightable] {
      outline: 1px solid #ce3fff!important;
  }
  section.gjs-selected[data-gjs-highlightable][data-isglobal="true"],section.gjs-hovered[data-gjs-highlightable][data-isglobal="true"] {
    outline: 1px solid #f6c344!important;
}
  section.gjs-selected[data-gjs-highlightable][data-isprive="true"],section.gjs-hovered[data-gjs-highlightable][data-isprive="true"] {
    outline: 1px solid green!important;
}
  .gjs-selected[data-gjs-highlightable] {
    outline: 1px solid #73a8f6!important;
  }
  section.gjs-selected[data-gjs-highlightable] {
    outline: 1px solid #ce3fff!important;
}

.gjs-plh-image {

  outline: none!important;

}

      footer:hover:before {
        content: "pied de page";
        position: absolute;
        top: -13px;
        left: 0;
        right: 0;
        display: inline;
        margin: 0 auto;
        text-align: center;
        width: 127px;
        font-weight: bold;
        font-size: 18px;
        color: #f6c344;
        background: white;
        text-transform: uppercase;
    }
    header:hover:before {
      content: "entête de page";
      position: absolute;
      bottom: -13px;
      left: 0;
      right: 0;
      display: inline;
      margin: 0 auto;
      text-align: center;
      width: 145px;
      font-weight: bold;
      font-size: 18px;
      text-transform: uppercase;
      color: #f6c344;
      background: white;
  }

    
      header,footer,section {
        min-height: 40px!important;
    }
    main {
      min-height: 70vh;
    }
    .gjs-row {
      display: table;
      width: 100%;
  }
  .fullPreview{
    z-index:99999!important;
  }
  .gjs-cell {
    padding:20px 5px;
    vertical-align: top;
    display: table-cell;

}
      @media (min-width:768px) and (max-width:991px) {

        .gjs-cell {

          height: 100%!important;
   
        }
      }
      @media (max-width: 767px) {

        .gjs-cell {
          width: 100%!important;
          max-width: 100%!important;
          display: block;
          height: 100%!important;
   
        }
      }
      section{
        width:100%;
      }
      .owl-stage {
  
        display:flex!important;
  }
      .owl-carousel .owl-item {
      display: flex;
        padding: 0px 3px;
  }
      section.sidebar-menu {
        z-index: 999999;
    }
      header.sticky{
        position: fixed!important;
        top:0;
        left:0;
        width:100%;
        z-index:999;
      }  
      </style>

      `
      );
      const el = document.getElementsByClassName("divide");
      gjs.runCommand("sw-visibility");
      el[0].classList.add("active");
    });

    gjs.on("component:selected", (model) => {
      const cmp = gjs.getSelected();
      document.getElementById("EditorRightSidebar").classList.add("active");
      const el = document.getElementById("tabContant");
      el.classList.add("d-none");

      if (document.body.clientWidth > 1500) {
        gjs.Canvas.setZoom(80);
        gjs.Canvas.setCoords(-170, 0);
      } else if (document.body.clientWidth > 1400) {
        gjs.Canvas.setZoom(70);
        gjs.Canvas.setCoords(-180, 0);
      } else if (document.body.clientWidth > 1200) {
        gjs.Canvas.setZoom(65);
        gjs.Canvas.setCoords(-170, 0);
      }
    });

    gjs.on("asset:open", async () => {
      await axios
        .get(process.env.REACT_APP_API_URL + "/medias/getmediasrc/" + siteId)
        .then((response) => {
          setmedia(response.data.data);
          const am = gjs.AssetManager;
          am.render(response.data.data);
        })
        .catch((error) => {});
    });
    const property = gjs.StyleManager.addProperty(
      "extra",
      {
        label: "z-index",
        property: "z-index",
        type: "number",
        default: "0",
      },
      { at: 0 }
    );
    const property2 = gjs.StyleManager.addProperty(
      "typography",
      {
        label: "Transformation texte",
        property: "text-transform",
        type: "select",
        default: "none",
        options: [
          { id: "none", label: "none" },
          { id: "uppercase", label: "Majuscule" },
          { id: "lowercase", label: "Minuscule" },
          { id: "capitalize", label: "Capitaliser" },
          { id: "full-width", label: "Pleine largeur" },
        ],
      },
      { at: 0 }
    );

    const propertyContent = gjs.StyleManager.addProperty(
      "extra",
      {
        label: "Content",
        property: "content",
        type: "select",
        default: "none",
        options: [
          { id: "none", label: "Aucun" },
          { id: "''", label: "Vide" },
        ],
      },

      { at: 0 }
    );
    const states = gjs.SelectorManager.setStates([
      { name: "hover", label: "Survol" },
      { name: "nth-of-type(2n)", label: "Paire/Impaire" },
      { name: "first-child", label: "Premier enfant" },
      { name: "last-child", label: "Dernier enfant" },
      { name: "active", label: "Active" },
      { name: ":after", label: "Après" },
      { name: ":before", label: "Avant" },
    ]);
    const propertyBorderright = gjs.StyleManager.addProperty("decorations", {
      name: "Bordure droite",
      property: "border-right",
      type: "composite",
      properties: [
        {
          name: "Taille",
          type: "integer",
          units: ["px", "em", "rem"],
          property: "border-right-width",
        },
        {
          name: "Style",
          type: "select",
          property: "border-right-style",
          options: [
            { value: "none" },
            { value: "solid" },
            { value: "dotted" },
            { value: "dashed" },
            { value: "double" },
            { value: "groove" },
            { value: "ridge" },
            { value: "inset" },
            { value: "outset" },
          ],
        },
        {
          name: "Color",
          type: "color",
          property: "border-right-color",
        },
      ],
    });

    const propertyBorderleft = gjs.StyleManager.addProperty("decorations", {
      name: "Bordure gauche",
      property: "border-left",
      type: "composite",
      properties: [
        {
          name: "Taille",
          type: "integer",
          units: ["px", "em", "rem"],
          property: "border-left-width",
        },
        {
          name: "Style",
          type: "select",
          property: "border-left-style",
          options: [
            { value: "none" },
            { value: "solid" },
            { value: "dotted" },
            { value: "dashed" },
            { value: "double" },
            { value: "groove" },
            { value: "ridge" },
            { value: "inset" },
            { value: "outset" },
          ],
        },
        {
          name: "Color",
          type: "color",
          property: "border-left-color",
        },
      ],
    });

    const propertyBorderbottom = gjs.StyleManager.addProperty("decorations", {
      name: "Bordure bas",
      property: "border-bottom",
      type: "composite",
      properties: [
        {
          name: "Taille",
          type: "integer",
          units: ["px", "em", "rem"],
          property: "border-bottom-width",
        },
        {
          name: "Style",
          type: "select",
          property: "border-bottom-style",
          options: [
            { value: "none" },
            { value: "solid" },
            { value: "dotted" },
            { value: "dashed" },
            { value: "double" },
            { value: "groove" },
            { value: "ridge" },
            { value: "inset" },
            { value: "outset" },
          ],
        },
        {
          name: "Color",
          type: "color",
          property: "border-bottom-color",
        },
      ],
    });

    const propertyBordertop = gjs.StyleManager.addProperty("decorations", {
      name: "Bordure haut",
      property: "border-top",
      type: "composite",
      properties: [
        {
          name: "Taille",
          type: "integer",
          units: ["px", "em", "rem"],
          property: "border-top-width",
        },
        {
          name: "Style",
          type: "select",
          property: "border-top-style",
          options: [
            { value: "none" },
            { value: "solid" },
            { value: "dotted" },
            { value: "dashed" },
            { value: "double" },
            { value: "groove" },
            { value: "ridge" },
            { value: "inset" },
            { value: "outset" },
          ],
        },
        {
          name: "Color",
          type: "color",
          property: "border-top-color",
        },
      ],
    });
    const propertyDecoration = gjs.StyleManager.addProperty(
      "typography",
      {
        label: "Text décoration",
        property: "text-decoration",
        type: "select",
        default: "none",
        options: [
          { id: "none", label: "Aucun" },
          { id: "underline", label: "Souligner" },
          { id: "overline", label: "Surligner" },
          { id: "line-through", label: "Ligne à travers" },
          { id: "initial", label: "Initial" },
          { id: "inherit", label: "Hériter" },
        ],
      },

      { at: 0 }
    );
    const propertyalign = gjs.StyleManager.addProperty(
      "typography",
      {
        label: "Text alignement ",
        property: "vertical-align",
        type: "select",
        default: "none",
        options: [
          { id: "none", label: "Aucun" },
          { id: "baseline", label: "Ligne de bas" },
          { id: "top", label: "Haut" },
          { id: "middle", label: "Milieu" },
          { id: "bottom", label: "Bas" },
          { id: "sub", label: "Sous" },
          { id: "text-top", label: "Dessus de texte" },
        ],
      },

      { at: 0 }
    );
    grapesjsrteextensions(gjs, {
      base: {
        bold: true,
        italic: true,
        underline: true,
        ///  strikethrough: true,
        link: true,
      },

      fonts: {
        fontName: result,
        fontSize: true,
        fontColor: false,
        hilite: false,
      },
      format: {
        heading1: false,
        heading2: false,
        heading3: false,
        heading4: false,
        heading5: false,
        heading6: false,
        paragraph: false,
        quote: false,
        clearFormatting: false,
      },
      subscriptSuperscript: false, //|true
      indentOutdent: false, //|true
      list: true, //|true
      align: true, //|true
      actions: {
        copy: false,
        cut: false,
        paste: false,
        delete: false,
      },
      actions: false, //|true
      undoredo: false, //|true
      extra: false, //|true
      darkColorPicker: false, //|false
      //maxWidth: "900px",
    });

    setEditor(gjs);
    if (type == "page") {
      getPageContent(gjs);
    }
    if (type == "popup") {
      getPopupContent(gjs);
    }
    const blockManager = gjs.Blocks;
    const blocks = blockManager.getAll();

    gjs.on("block:drag:stop", (block) => {
      const selected = gjs.getSelected();
      if (selected && selected !== block) {
      }
    });
    //console.log(console.log(JSON.stringify(blocks)));
  }, [pageId]);

  const handleBlob = async (blobFile) => {
    // quality value for webp and jpeg formats.
    const quality = 80;
    // output width. 0 will keep its original width and 'auto' will calculate its scale from height.
    const width = 0;
    // output height. 0 will keep its original height and 'auto' will calculate its scale from width.
    const height = 0;
    // file format: png, jpeg, bmp, gif, webp. If null, original format will be used.
    const format = "webp";

    return await fromBlob(blobFile, quality, width, height, format).then(
      (blob) => {
        // will output the converted blob file

        return blob;
      }
    );

    // note only the blobFile argument is required
  };
  const UploadMedia = async (data) => {
    toast.dismiss();
    toast.loading("Téléchargment en cours...");
    let formData = new FormData();

    await Promise.all(
      Object.keys(data).map(async (index) => {
        let element = data[index];
        const file = await handleBlob(element);

        formData.append("files[]", file);
      })
    );

    await axios
      .post(
        process.env.REACT_APP_API_URL + "/medias/upload/" + siteId,
        formData
      )
      .then(async (response) => {
        toast.dismiss();
        toast.success("Téléchargemrnt est terminé ");
        await axios
          .get(process.env.REACT_APP_API_URL + "/medias/getmediasrc/" + siteId)
          .then((response) => {
            setmedia(response.data.data);
            const am = gjs.AssetManager;
            am.render(response.data.data);
            // alert("sdqsdsqdqsdsq")
          })
          .catch((error) => {
            toast.error("Téléchargemrnt est échoué ");
          });
      })
      .catch((error) => {});
  };

  const getPageContent = async (editor) => {
    toast.dismiss();
    const toastId = toast.loading("Chargement en cours...");
    await axios
      .get(process.env.REACT_APP_API_URL + "/pages/get/" + pageId)
      .then((response) => {
        const header =
          response.data.data.Page.SiteSchema.header != ""
            ? response.data.data.Page.SiteSchema.header
            : `<header data-gjs-removable="false" data-gjs-resizable="false" data-gjs-type="Header"
        data-gjs-droppable="true" data-gjs-draggable="false" data-gjs-selectable="true" data-gjs-highlightable="true"
        data-gjs-copyable="false" data-gjs-editable="false"></header>`;
        const footer =
          response.data.data.Page.SiteSchema.footer != ""
            ? response.data.data.Page.SiteSchema.footer
            : `
        <footer data-gjs-removable="false" data-gjs-resizable="false" data-gjs-type="Footer" data-gjs-droppable="true" data-gjs-draggable="false"
        data-gjs-selectable="true"    data-gjs-highlightable="true" data-gjs-copyable="false" data-gjs-editable="false"></footer>`;
        const content = response.data.data.Page.content;

        /*         let scriptHead = response.data.data.site.scriptHead;
 
        let scriptFooter = response.data.data.site.scriptFooter;
        const nodeFooter = document
          .createRange()
          .createContextualFragment(scriptFooter);

        var head = editor.Canvas.getDocument().head;
        head.append(nodeHead);
        head.append(nodeFooter); */
        /*         response.data.data.Page.footer_scripts.map((s) => {
          var script = document.createElement("script");
          script.type = "text/javascript";
          script.src = s;
          head.append(script);
        }); */
        /*         response.data.data.Page.head_scripts.map((st) => {
          var link = document.createElement("link");
          link.rel = "stylesheet";
          link.href = st;
          head.append(link);
        }); */
        const nodeHead = document.createRange()
          .createContextualFragment(`<script> 
          
          $(document).ready(function(){
 
          
           
                $.ajax({url: "${process.env.REACT_APP_API_URL}/popups/getAll/${siteId}" } ).done(function(data) {
           
                    $.each( data.data, function( index, p ) {
                  const css =p.content.css
                  const html = p.content.html.replaceAll("show", "").replaceAll("display: block;","");
          
                    $("body").append(html);
                    $("body").append("<style>"+css.replaceAll("display:block;","").replaceAll("display: block;","")+"</style>")
                  
                })
                })
            
       
          })


          $(window).scroll(function() {
            if ($(this).scrollTop() > 1) {
                $('header').addClass('sticky'); 
            } else {
                $('header').removeClass('sticky'); 
            } })
            $(document).ready(function () {
              setTimeout(function () {
                $("nav li a").each(function () {
             
                  const url = window.location.pathname;
                 const path = url.substring(url.lastIndexOf('/')+1)
           
                  $(this).removeClass("active");
                  if ($(this).attr('id') == "page-"+path) {
                    $(this).addClass("active");
                    console.log($(this).parent().parent().parent());
                    if ($(this).attr("class").indexOf("child") > -1) {
                      $(this)
                        .parent()
                        .parent()
                        .parent()
                        .find(".dropdown-toggle")
                        .addClass("active");
                    }
                    if ($(this).attr("class").indexOf("subchild") > -1) {
                      $(this)
                        .parent()
                        .parent()
                        .parent()
                        .parent()
                        .parent()
                        .find(".dropdown-toggle")
                        .addClass("active");
                    }
                  }
                });
      
              }, 3000);
            });
            
          </script>`);

        setTimeout(() => {
          var head = gjs.Canvas.getDocument().head;
          head.append(nodeHead);
          let contenu =
            content.html.indexOf("<main") < 0
              ? "<main>" + content.html + "</main>"
              : content.html;
          let hdr =
            header.html.length > 5
              ? header.html
              : `<header data-gjs-removable="false" data-gjs-resizable="false" data-gjs-type="Header"
              data-gjs-droppable="true" data-gjs-draggable="false" data-gjs-selectable="true" data-gjs-highlightable="true"
              data-gjs-copyable="false" data-gjs-editable="false"></header>`;
          let ftr =
            footer.html.length > 5
              ? footer.html
              : `<footer data-gjs-removable="false" data-gjs-resizable="false" data-gjs-type="Footer" data-gjs-droppable="true" data-gjs-draggable="false"
              data-gjs-selectable="true"    data-gjs-highlightable="true" data-gjs-copyable="false" data-gjs-editable="false"></footer>`;
          gjs.setComponents(hdr + contenu + ftr);

          toast.dismiss();
          toast.success("Chargement est terminé ", {
            id: toastId,
          });
          /*  */
          gjs.setStyle(
            header.css.replace("<style>", "").replace("</style>", "") +
              content.css.replace("<style>", "").replace("</style>", "") +
              footer.css.replace("<style>", "").replace("</style>", "")
          );
          // console.log("samirrrrr",header.css.replace("<style>", "").replace("</style>", ""))
          gjs.Css.remove(".gjs-cell");
          $(gjs.Canvas.getBody()).on(
            "paste",
            '[contenteditable="true"]',
            function (e) {
              e.preventDefault();
              var text = (e.originalEvent || e).clipboardData.getData(
                "text/plain"
              );
              e.target.ownerDocument.execCommand("insertHTML", false, text);
            }
          );
        }, 3000);
      })
      .catch((error) => {
        //console.log(error);
      });
    
    gjs.on("component:selected", (c) => {

      if(storeClient.client.permission.findIndex((p)=>p.index=='modification_de_contenu') > -1){
      if (["H1", "H2", "P", "FONT"].includes(c.getEl().tagName)) {
        c.set("draggable", false);
        c.set("removable", false);
        c.set("copyable", false);
        c.set("resizable", false);
        c.set("droppable", false);
        c.set("editable", true);
        c.set("selectable", false);
        c.set("toolbar", []);
      } else {
        c.set("draggable", false);
        c.set("removable", false);
        c.set("copyable", false);
        c.set("resizable", false);
        c.set("droppable", false);
        c.set("editable", false);
        c.set("selectable", false);
        c.set("toolbar", []);
        gjs.select()
      }
      }else if(storeClient.client.permission.findIndex((p)=> p.index == 'modifier_le_site' ) > -1){
        c.set("draggable", true);
        c.set("removable", true);
        c.set("copyable", true);
        c.set("resizable", true);
        c.set("droppable", true);
        c.set("editable", true);
        c.set("selectable", true);
       
      }else{
        c.set("draggable", false);
        c.set("removable", false);
        c.set("copyable", false);
        c.set("resizable", false);
        c.set("droppable", false);
        c.set("editable", false);
        c.set("selectable", false);
        c.set("toolbar", []);
        gjs.select()
      }

    }); 
  };

  const getPopupContent = async (editor) => {
    toast.dismiss();
    const toastId = toast.loading("Chargement en cours...");
    await axios
      .get(process.env.REACT_APP_API_URL + "/popups/get/" + pageId)
      .then((response) => {
        const content = response.data.data.content;
        const cmp = editor.Components.getWrapper();
        cmp.set("data-droppable", false);
        cmp.set("data-removable", false);
        editor.setComponents(content.html);
        editor.setStyle(content.css);
        editor.Canvas.getDocument().addEventListener("paste", function (e) {
          e.preventDefault();
          var text = (e.originalEvent || e).clipboardData.getData("text/plain");
          e.target.ownerDocument.execCommand("insertHTML", false, text);
        });
        toast.success("Chargement est terminé ", {
          id: toastId,
        });
      })
      .catch((error) => {});
  };

  return (
    <div>
      <EditorTopbar editor={getEditor} perview={changePreview} />
      <div
        className={
          modalClose == true
            ? "alert alert-danger d-flex align-items-center TwoUsersAlert"
            : "d-none"
        }
        role="alert"
      >
        <i className="fas fa-exclamation-triangle"></i>
        <div>
          {storeSite
            ? storeSite.site.current_users.map((u) => {
                return (
                  <>
                    <span>
                      {u.user.nom} {u.user.prenom}
                      {storeSite.site.current_users.length > 3
                        ? " sont "
                        : " est "}{" "}
                      <b>en train de modifier</b> ce site.
                    </span>
                  </>
                );
              })
            : ""}
        </div>
        <button
          type="button"
          className="btn-close"
          onClick={handleClosed}
          aria-label="Close"
        ></button>
      </div>
      <div className="Editor d-flex active" id="showSidbar">
        <div className="sideBar">
          <EditorSidebar editor={getEditor} />
        </div>

        <div className="EditorComponent m-3">
          <div id="gjs" className={showPreview ? "hide" : "active"}></div>
          {/*  <Sitepreview className={showPreview ? "active" : "hide"} /> */}
        </div>

        {<EditorRightSidebar editor={getEditor} />}
      </div>

      <Toaster />
      <Joyride
        steps={state.steps}
        continuous={true}
        run={state.run}
        locale={{
          back: "Retour",
          close: "Fermer",
          last: "Terminer",
          next: "Suivant",
          open: "Ouvrir le guide",
          skip: "Annuler",
        }}
        hideCloseButton={true}
        showProgress={true}
        showSkipButton={true}
        disableOverlayClose={true}
        disableCloseOnEsc={true}
        styles={{
          options: {
            overlayColor: "rgba(0, 0, 0, 0.6)",
            primaryColor: "#F6C344",
            textColor: "black",
            zIndex: 1000,
          },
        }}
        callback={({ status }) => {
          if (status == "finished" || status == "skipped") {
            let tutoState = window.localStorage.getItem("tutoState");
            if (!tutoState) {
              tutoState = {};
            } else {
              tutoState = JSON.parse(tutoState);
            }
            tutoState["siteEditor"] = true;
            window.localStorage.setItem("tutoState", JSON.stringify(tutoState));
          }
        }}
      />
    </div>
  );
}
