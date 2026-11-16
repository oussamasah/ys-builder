import axios from "axios";
import el from "date-fns/esm/locale/el/index.js";

import { v4 as uuidv4 } from "uuid";
import Model from "../../../../components/Models/Model";
import ReactDOM from "react-dom/client";
import { useEffect, useRef } from "react";

export default (editor, opts = {}) => {

  const dc = editor.DomComponents;
  // const hasMediaEffectRun = { current: false };

  // const getSite = () => {
  //   return axios.get(process.env.REACT_APP_API_URL + "/sites/get/" + opts.site);
  // };

  dc.addType("sliderType", {
    model: {
      defaults: {
        activeOnRender: 1,
        test: "",

        content: `<div class="slider-gjs pt-5 pb-5 text-center" data-gjs-editable="true" >Slider</div>`,
      },

      async init() {},
    },

    view: {
      init({ el, model }) {
        this.listenTo(model, "active", this.doStuff);

        // listen for active event
      },

      doStuff() {
        const id = uuidv4();
        this.model.set("attributes", { id });
        editor.select(this.model);
      },
      async onRender({ el, model }) {
        const script =
          process.env.REACT_APP_API_URL +
          "/plugins/functionbyref/" +
          model.get("attributes").id;
        let elemntScript = editor.Canvas.getDocument().querySelector(
          `script[src^="${script}"]`
        );

        if (elemntScript == null) {
          const nodeScript = document
            .createRange()
            .createContextualFragment(
              `<script src="${script + "?v=" + uuidv4()}"/>`
            );
          const nodeStyle = document.createRange()
            .createContextualFragment(`<style>.slider-gjs .caption {
                  position: absolute;
                  top: 0;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  width: 100%;
                  height: 100%;
                  background: rgb(0 0 0 / 37%);
                  color: white;
                }</style>`);

          editor.Canvas.getDocument().body.appendChild(nodeScript);
          editor.Canvas.getDocument().body.appendChild(nodeStyle);
        }
      },
    },
    isComponent: (el) => {
      if (el.classList && el.classList.contains("slider-gjs")) {
        return {
          type: "sliderType",
        };
      }
    },
  });

  /*   dc.addType("link", {
    model: {
      defaults: {
        droppable: true,
        activeOnRender: 1,
      },

      async init() {},
    },

    view: {
      onRender({ el, model }) {},
    },
    isComponent: (el) => {
      if (el.tagName == "A") {
        return {
          type: "link",
        };
      }
    },
  }); */
  /*dc.addType("Container", {
    model: {
      defaults: {
        "data-resizable": false,
        "data-editable": false,
        traits: [
          {
            type: "checkbox",
            name: "data-carousel",
            label: "Carousel : ",
            valueTrue: "YES", // Value to assign when is checked, default: `true`
            valueFalse: "NO", // Value to assign when is unchecked, default: `false`
          },

          {
            type: "number",
            name: "data-nb_desktop",
            label: "items Desktop : ",
            default: 4,
          },
          {
            type: "number",
            name: "data-nb_tablette",
            label: "items Tablette : ",
            default: 2,
          },
          {
            type: "number",
            name: "data-nb_mobile",
            label: "items Mobile : ",
            default: 1,
          },
        ],
      },
      updated() {
        this.toHTML();
        editor.refresh();
      },
      async init() {
        this.on("change:attributes:data-carousel", this.handleCarouselChange);
      },

      handleCarouselChange() {
        let id = this.getAttributes().id;

        let nb_desktop = this.getAttributes()["data-nb_desktop"];
        let nb_tablette = this.getAttributes()["data-nb_tablett"];
        let nb_mobile = this.getAttributes()["data-nb_mobile"];
        let scr = "";
        let content = "";
        let cmps = this.components();
        let childContent = "";
        cmps.forEach((cmp) => {
          childContent += cmp.toHTML();
        });
        if (this.getAttributes()["data-carousel"] == "YES") {
          content = `<div class='owl-carousel owl-theme owl-carousel-${id}'>`;
          content += childContent;
          content += "</div>";
          scr += `<script>$(document).ready(function(){`;
          scr += `
              $(".owl-carousel-${id}").owlCarousel({
                loop:true,
                margin:10,
                nav: false,
                dots: true,
                responsive:{
                    0:{
                        items:1
                    },
                    768:{
                        items:${nb_mobile}
                    },
                    992:{
                        items:${nb_tablette}
                    },
                    1500:{
                        items:${nb_desktop}
                    }
                }
            })
          `;
          scr += `})</script>`;
          content += scr;
        } else {
          let grid = editor.getSelected();
          let script = grid.find("script")[0];
          script.remove();
          content = "";

          let ow = grid.find(".owl-carousel")[0];

          ow.components().forEach((element) => {
            content += element.toHTML();
          });
        }
        let css = editor.getCss();
        this.components(content);
        editor.setStyle(css);
        this.view.render();
      },
    },
    view: {
      async onRender({ el, model }) {},
    },
    isComponent: (el) => {
      if (
        el.tagName == "DIV" &&
        el.classList &&
        !el.classList.contains("owl-carousel")
      ) {
        return {
          type: "Container",
        };
      }
    },
  });*/
  dc.addType("Row", {
    model: {
      defaults: {
        activeOnRender: 1,
        "data-gjs-draggable": "section",
        "data-gjs-droppable": "section",

        attributes: {
          ref: "Section-" + uuidv4(),
          id: "row-" + uuidv4(),
          "data-auto": "true",
          "data-dot": "false",
          "data-nav": "true",
          "data-colordots": "#000000",
          "data-colordotshover": "#000000",
          "data-next": '<i class="fa-solid fa-circle-chevron-right"></i>',
          "data-prev": '<i class="fa-solid fa-circle-chevron-left"></i>',
          "data-margin": "20",
        },

        traits: [
          {
            type: "checkbox",
            name: "conteneur",
            label: "Ajouter conteneur ",
            valueTrue: "YES", // Value to assign when is checked, default: `true`
            valueFalse: "NO", // Value to assign when is unchecked, default: `false`
          },
          {
            type: "checkbox",
            name: "data-carousel",
            label: "Carousel  ",
            valueTrue: "YES", // Value to assign when is checked, default: `true`
            valueFalse: "NO", // Value to assign when is unchecked, default: `false`
          },

          {
            type: "number",
            name: "data-nb_desktop",
            label: "items Desktop  ",
            default: 4,
          },
          {
            type: "number",
            name: "data-nb_tablette",
            label: "items Tablette  ",
            default: 2,
          },
          {
            type: "number",
            name: "data-nb_mobile",
            label: "items Mobile  ",
            default: 1,
          },
          {
            type: "number",
            name: "data-margin",
            label: "Espacement",
          },
          {
            type: "checkbox",
            name: "data-auto",
            label: "Automatique",
            valueTrue: "true", // Value to assign when is checked, default: `true`
            valueFalse: "false", // Value to assign when is unchecked, default: `false`
          },

          {
            type: "checkbox",
            name: "data-nav",
            label: "navigation",
            valueTrue: "true", // Value to assign when is checked, default: `true`
            valueFalse: "false",
          },

          {
            type: "checkbox",
            name: "data-dot",
            label: "points",
            valueTrue: "true", // Value to assign when is checked, default: `true`
            valueFalse: "false",
          },
          {
            type: "color",
            name: "data-colordots",
            label: "nav ",
          },
          {
            type: "color",
            name: "data-colordotshover",
            label: "active / survol",
          },
          {
            type: "text",
            name: "data-next",
            label: "bouton suivant",
          },
          {
            type: "text",
            name: "data-prev",
            label: "button précédent",
          },
        ],
      },

      async init() {
        this.listenTo(
          this,
          "change:attributes:conteneur",
          this.handleContainerChange
        );
        this.listenTo(
          this,
          "change:attributes:data-carousel",
          this.handleCarouselChange
        );
        this.listenTo(
          this,
          "change:attributes:data-nb_desktop",
          this.handleCarouselScriptChange
        );
        this.listenTo(
          this,
          "change:attributes:data-nb_tablette",
          this.handleCarouselScriptChange
        );
        this.listenTo(
          this,
          "change:attributes:data-nb_mobile",
          this.handleCarouselScriptChange
        );
        this.listenTo(
          this,
          "change:attributes:data-prev",
          this.handleCarouselScriptChange
        );
        this.listenTo(
          this,
          "change:attributes:data-next",
          this.handleCarouselScriptChange
        );
        this.listenTo(
          this,
          "change:attributes:data-auto",
          this.handleCarouselScriptChange
        );
        this.listenTo(
          this,
          "change:attributes:data-nav",
          this.handleCarouselScriptChange
        );
        this.listenTo(
          this,
          "change:attributes:data-dot",
          this.handleCarouselScriptChange
        );
        this.listenTo(
          this,
          "change:attributes:data-margin",
          this.handleCarouselScriptChange
        );
        this.listenTo(
          this,
          "change:attributes:data-colordots",
          this.handleDotsChange
        );
        this.listenTo(
          this,
          "change:attributes:data-colordotshover",
          this.handleDotsHoverChange
        );
      },
      handleDotsChange() {
        const colordots = this.getAttributes()["data-colordots"];
        const ths = this.find("a");

        let r = editor.Css.getRule(
          `#${this.getAttributes().ccid} .owl-theme .owl-dots .owl-dot span`
        );
        let css = [];
        if (r) css = r.attributes.style;
        if (css) {
          css["background"] = colordots;
        }
        editor.Css.setRule(
          `#${this.getAttributes().ccid} .owl-theme .owl-dots .owl-dot span`,
          css
        );

        editor.setStyle(editor.getCss());
      },
      handleDotsHoverChange() {
        const colordotshover = this.getAttributes()["data-colordotshover"];
        const ths = this.find("a");

        let r = editor.Css.getRule(
          `#${
            this.getAttributes().ccid
          } .owl-theme .owl-dots .owl-dot.active span, .owl-theme .owl-dots .owl-dot:hover span`
        );
        let css = [];
        if (r) css = r.attributes.style;
        if (css) {
          css["background"] = colordotshover;
        }
        editor.Css.setRule(
          `#${
            this.getAttributes().ccid
          } .owl-theme .owl-dots .owl-dot.active span, .owl-theme .owl-dots .owl-dot:hover span`,
          css
        );

        // this.view.render();
        editor.refresh();
      },
      handleContainerChange() {
        if (this.getAttributes().conteneur == "YES") {
          this.addClass("container mx-auto");
          this.view.render();
          editor.refresh();
        } else {
          this.removeClass("container mx-auto");

          //this.view.render();
          editor.refresh();
        }
      },

      handleCarouselScriptChange() {
        const m = editor.getSelected();
        // console.log(m);
        let script = this.find("script");
        let id = this.getAttributes().id;
        let src = "";
        if (
          this.getAttributes()["data-carousel"] == "YES" &&
          script.length > 0
        ) {
          let nb_desktop = this.getAttributes()["data-nb_desktop"];
          let nb_tablette = this.getAttributes()["data-nb_tablette"];
          let nb_mobile = this.getAttributes()["data-nb_mobile"];
          let auto = this.getAttributes()["data-auto"];
          let dot = this.getAttributes()["data-dot"];
          let nav = this.getAttributes()["data-nav"];
          let next = this.getAttributes()["data-next"];
          let prev = this.getAttributes()["data-prev"];
          let margin = this.getAttributes()["data-margin"];
          // console.log(nb_desktop);
          src += `<script>$(document).ready(function(){`;
          src += `
              $(".owl-carousel-${id}").owlCarousel({
                loop:true,
                autoplay:${auto},
                autoplayHoverPause:true,
                nav: ${nav},
                navText: ['${prev}','${next}'],
                dots: ${dot},
                margin:${margin},
                responsive:{
                    0:{
                      items:${nb_mobile}
                    },
                    768:{
                      items:${nb_tablette}
                    },
                    992:{
                      items:${nb_desktop}
                    }
                }
            })
          `;
          src += `})</script>`;
          script[0].replaceWith(src);

          setTimeout(() => {
            let html = editor.getHtml();
            let css = editor.getCss();
            editor.setComponents(html);
            editor.setStyle(css);
            editor.refresh();
            this.view.render();
            editor.select(editor.getWrapper());
            this.selectCurrentModel();
          }, 1000);
        }
      },
      selectCurrentModel() {
        let id = this.getAttributes().id;
        let m = editor.getWrapper().find(`#${id}`);
        // console.log(m);
        editor.select(m);
      },
      getAllClassesAndIDs(component) {
        let arrCss = [];
        const allRules = editor.Css.getRules();
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
      },
      handleCarouselChange() {
        let id = this.getAttributes().id;
        let nb_desktop = this.getAttributes()["data-nb_desktop"];
        let nb_tablette = this.getAttributes()["data-nb_tablette"];
        let nb_mobile = this.getAttributes()["data-nb_mobile"];
        let auto = this.getAttributes()["data-auto"];
        let nav = this.getAttributes()["data-nav"];
        let next = this.getAttributes()["data-next"];
        let dot = this.getAttributes()["data-dot"];
        let margin = this.getAttributes()["data-margin"];
        let prev = this.getAttributes()["data-prev"];
        let scr = "";
        let content = "";
        let cmps = this.components();
        let childContent = "";
        // console.log(cmps);
        cmps.forEach((cmp) => {
          childContent += cmp.toHTML();
          const cssCmp = this.getAllClassesAndIDs(cmp);
          let filteredArray = cssCmp.filter((str) => str !== "");
          let cssCmpString = filteredArray.join(" ");
          // console.log("============", cssCmpString);
          childContent += `<style>${cssCmpString}</style>`;
        });
        if (this.getAttributes()["data-carousel"] == "YES") {
          this.setStyle({ display: "table", "table-layout": "fixed" });
          content = `<div class='owl-carousel owl-theme owl-carousel-${id}'>`;
          content += childContent;
          content += "</div>";
          scr += `<script>$(document).ready(function(){`;
          scr += `
              $(".owl-carousel-${id}").owlCarousel({
                loop:true,
                autoplay:${auto},
                autoplayHoverPause:true,
                nav: ${nav},
                navText: ['${prev}','${next}'],
                dots: ${dot},
                margin:${margin},
                responsive:{
                    0:{
                      items:${nb_mobile}
                    },
                    768:{
                      items:${nb_tablette}
                    },
                    992:{
                      items:${nb_desktop}
                    }
                }
            })
          `;
          scr += `})</script>`;
          content += scr;
          this.view.render();
          let r = editor.Css.getRule(
            `#${this.getAttributes().id} .owl-item .gjs-cell`
          );
          let cssCol = [];
          if (r) cssCol = r.attributes.style;
          if (cssCol) {
            cssCol["display"] = "block";
            cssCol["width"] = "100%!important";
          }
          editor.Css.setRule(
            `#${this.getAttributes().id} .owl-item .gjs-cell`,
            cssCol
          );

          let css = editor.getCss();
          editor.setStyle(css);
        } else {
          this.setStyle({ display: "table" });
          let grid = editor.getSelected();
          let script = this.find("script")[0];
          script.remove();
          content = "";

          let ow = this.find(".owl-carousel")[0];

          ow.components().forEach((element) => {
            content += element.toHTML();
            const cssCmp = this.getAllClassesAndIDs(element);
            let filteredArray = cssCmp.filter((str) => str !== "");
            let cssCmpString = filteredArray.join(" ");
            // console.log("============", cssCmpString);
            content += `<style>${cssCmpString}</style>`;
          });
          let r = editor.Css.getRule(
            `#${this.getAttributes().id} .owl-item .gjs-cell`
          );
          let rstage = editor.Css.getRule(
            `#${this.getAttributes().id} .owl-stage`
          );

          editor.Css.remove(r);
          editor.Css.remove(rstage);
          let css = editor.getCss();
          editor.setStyle(css);
        }

        this.components(content);

        this.view.render();
        editor.refresh();
      },
      /*       updated() {
        let attr = this.getAttributes();
        let cmps = this.components();
        let col = cmps.filter((x) => {
          let arr = x.getClasses();
          console.log(arr);
          if (arr && arr.length > 0 && arr.includes("row-cell")) {
            return x;
          }
        });

        if (col && col.length > 0) {
          let colWidth = 100 / col.length + "%";
          col.map((c) => {
            console.log("---------", c);
            let id = c.ccid;
            editor.Css.setRule(`#${id}`, { width: colWidth });
            editor.Css.setRule(
              `#${id}`,
              { width: "100%!important" },
              {
                atRuleType: "media",
                atRuleParams: "(max-width: 767px)",
              }
            );
          });
        }
      }, */
    },
    view: {
      init({ el, model }) {
        this.listenTo(this.model, "active", this.doStuff);
      },
      doStuff() {
        let attr = this.model.getAttributes();
        attr.id = "row-" + uuidv4();
        this.model.setAttributes(attr);
      },
      async onRender({ el, model }) {
        /*  let attr = this.model.getAttributes();
        let cmps = this.model.components();
        let col = cmps.filter((x) => {
          let arr = x.getClasses();
          console.log(arr);
          if (arr && arr.length > 0 && arr.includes("row-cell")) {
            return x;
          }
        });

        if (col && col.length > 0) {
          let colWidth = 100 / col.length + "%";
          col.map((c) => {
            console.log("---------", c);

            let id = c.ccid;
            editor.Css.setRule(`#${id}`, { width: colWidth });
            editor.Css.setRule(
              `#${id}`,
              { width: "100%!important" },
              {
                atRuleType: "media",
                atRuleParams: "(max-width: 767px)",
              }
            );
          });
        } */
      },
    },
    isComponent: (el) => {
      if (el.classList) {
        if (el.classList.contains("row") || el.classList.contains("gjs-row")) {
          return {
            type: "Row",
          };
        }
      }
    },
  });

  dc.addType("Main", {
    model: {
      defaults: {},
      init() {
        this.set("draggable", false);
        this.set("removable", false);
        this.set("copyable", false);
        this.set("droppable", true);
        this.set("selectable", true);
      },
    },
    view: {
      async onRender({ el, model }) {},
    },
    isComponent: (el) => {
      if (el.tagName && el.tagName == "MAIN") {
        return {
          type: "Main",
        };
      }
    },
  });
  dc.addType("Footer", {
    model: {
      defaults: {},
      init() {
        this.set("draggable", false);
        this.set("removable", false);
        this.set("copyable", false);
        this.set("droppable", true);
        this.set("selectable", true);
      },
    },
    view: {
      async onRender({ el, model }) {},
    },
    isComponent: (el) => {
      if (el.tagName && el.tagName == "FOOTER") {
        return {
          type: "Footer",
        };
      }
    },
  });

  dc.addType("adresse", {
    model: {
      defaults: {
        editable: true,
      },
      async init() {},
    },

    view: {
      async onRender({ el, model }) {
        axios
          .get(process.env.REACT_APP_API_URL + "/sites/get/" + opts.site)
          .then(async (response) => {
            let adresse = response.data.data.site.adresse.text;
            let name = response.data.data.site.nom;
            if (adresse !== "undefined") {
              const attr = model.get("attributes");
              attr.title = name;
              model.setAttributes(attr);
              let adr_text = model.find(".gjs-adress-text");

              if (adr_text && adr_text.length > 0) {
                adr_text[0].components(adresse);
              }

              editor.refresh();
            }
          });
      },
    },
    isComponent: (el) => {
      if (el.classList && el.classList.contains("adresse-gjs")) {
        return {
          type: "adresse",
        };
      }
    },
  });
  dc.addType("Appel", {
    model: {
      defaults: {},
      async init() {},
    },
    view: {
      async onRender({ el, model }) {
        axios
          .get(process.env.REACT_APP_API_URL + "/sites/get/" + opts.site)
          .then(async (response) => {
            let tel = response.data.data.site.phone;
            let name = response.data.data.site.nom;
            console.log(tel);
            if (tel && tel.length > 0) {
              const attr = model.getAttributes();
              attr.href = "tel:" + tel;
              attr.title = name;

              model.setAttributes(attr);

              let tel_text = this.model.find(".gjs-appel-phone");
              console.log(tel_text);
              if (tel_text && tel_text.length > 0) {
                tel_text[0].components(tel);
                model.toHTML();
                editor.refresh();
              }
            }
          });
      },
    },
    isComponent: (el) => {
      if (el.classList && el.classList.contains("appel-gjs")) {
        return {
          type: "Appel",
        };
      }
    },
  });
  dc.addType("logo", {
    extend: "link",
    model: {
      defaults: {
        activeOnRender: 1,
        components: `<img src="" class="logo-img"  data-gjs-type="logoIMG" data-gjs-copyable=false  data-gjs-removable=false"/>`,
        attributes: { title: "Logo" },
      },

      async init() {},
    },

    view: {
      init({ el, model }) {
        this.listenTo(model, "active", this.doStuff);
        editor.Commands.add("delete-parent", (editor) => {
          this.model.remove();
        });

        // listen for active event
      },
      getAllChildComponents(component) {
        const children = [];

        // Iterate through the children of the component
        component.components().each((childComponent) => {
          children.push(childComponent);

          // Recursively get children of the child component
          const nestedChildren =
            this.model.view.getAllChildComponents(childComponent);
          children.push(...nestedChildren);
        });

        return children;
      },
      events: {
        "dblclick .logo-img": "openAssets",
      },
      openAssets(e) {
        editor.AssetManager.close();
      },
      getAllClassesAndIDs(component) {
        let arrCss = [];
        const allRules = editor.Css.getRules();
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
      },
      async doStuff() {
        const id = "logo-" + uuidv4();
        this.model.setAttributes({ id: id });
        let cmp = this.model.find("img");
        cmp[0].setAttributes({ src: "#", alt: "Logo", id: "img-" + id });
      },
      async onRender({ el, model }) {
        let imglogos = this.model.find("img")[0];

        let imgId = imglogos.getAttributes().id;

        await axios
          .get(process.env.REACT_APP_API_URL + "/sites/get/" + opts.site)
          .then(async (response) => {
            let logo = response.data.data.site?.logo
              ? response.data.data.site?.logo + "?v=" + uuidv4()
              : `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIHZpZXdCb3g9IjAgMCAyNCAyNCIgc3R5bGU9ImZpbGw6IHJnYmEoMCwwLDAsMC4xNSk7IHRyYW5zZm9ybTogc2NhbGUoMC43NSkiPgogICAgICAgIDxwYXRoIGQ9Ik04LjUgMTMuNWwyLjUgMyAzLjUtNC41IDQuNSA2SDVtMTYgMVY1YTIgMiAwIDAgMC0yLTJINWMtMS4xIDAtMiAuOS0yIDJ2MTRjMCAxLjEuOSAyIDIgMmgxNGMxLjEgMCAyLS45IDItMnoiPjwvcGF0aD4KICAgICAgPC9zdmc+`;
            let name = response.data.data.site.nom;
            let attr = this.model.getAttributes();
            attr.title = name;
            attr.href = "/";
            this.model.set("attributes", attr);
            const cssLogo = this.getAllClassesAndIDs(this.model);
            let filteredArray = cssLogo.filter((str) => str !== "");
            let cssLogoString = filteredArray.join(" ");
            this.model.components(
              `<img src="${logo}" alt="${name}" id="${imgId}" class="img logo-img"/><style>${cssLogoString}</style>`
            );
          });

        let children = this.model.view.getAllChildComponents(this.model);
        children.map((c) => {
          if (!c.getClasses().includes("logo-gjs")) {
            c.set("draggable", false);
            c.set("removable", false);
            c.set("copyable", false);
            c.set("resizable", false);
            c.set("droppable", false);
            c.set("editable", false);
            c.set("selectable", false);
            c.set("toolbar", [
              {
                attributes: { class: "fa fa-arrow-up" },
                command: "select-parent",
              },
            ]);
          }
        });
        model.set("draggable", false);
        model.set("removable", true);
        model.set("copyable", false);
        model.set("resizable", false);
        model.set("droppable", false);
        model.set("editable", false);
        model.set("selectable", true);
        model.set("toolbar", [
          {
            attributes: { class: "fa fa-trash" },
            command: "tlb-delete",
          },
        ]);
      },
    },
    isComponent: (el) => {
      if (el.classList && el.classList.contains("logo-gjs")) {
        return {
          type: "logo",
        };
      }
    },
  });
  dc.addType("Titre H1", {
    extend: "text",
    model: {
      defaults: {
        contentEditable: true,
      },
    },

    view: {},
    isComponent: (el) => {
      if (el.tagName == "H1") {
        return {
          type: "Titre H1",
        };
      }
    },
  });

  dc.addType("Titre H2", {
    extend: "text",
    model: {
      defaults: {
        editable: true,
      },
    },

    view: {
      init({ el, model }) {},
    },
    isComponent: (el) => {
      if (el.tagName == "H2") {
        return {
          type: "Titre H2",
        };
      }
    },
  });

  dc.addType("Titre H3", {
    extend: "text",
    model: {
      defaults: {
        editable: true,
      },
    },

    view: {
      init({ el, model }) {},
    },
    isComponent: (el) => {
      if (el.tagName == "H3") {
        return {
          type: "Titre H3",
        };
      }
    },
  });
  dc.addType("Titre H4", {
    extend: "text",
    model: {
      defaults: {
        editable: true,
      },
    },

    view: {
      init({ el, model }) {},
    },
    isComponent: (el) => {
      if (el.tagName == "H4") {
        return {
          type: "Titre H4",
        };
      }
    },
  });
  dc.addType("Titre H5", {
    extend: "text",
    model: {
      defaults: {
        editable: true,
      },
    },

    view: {
      init({ el, model }) {},
    },
    isComponent: (el) => {
      if (el.tagName == "H5") {
        return {
          type: "Titre H5",
        };
      }
    },
  });
  dc.addType("Titre H6", {
    extend: "text",
    model: {
      defaults: {
        editable: true,
      },
    },

    view: {
      init({ el, model }) {},
    },
    isComponent: (el) => {
      if (el.tagName == "H6") {
        return {
          type: "Titre H6",
        };
      }
    },
  });
  dc.addType("table", {
    model: {
      defaults: {
        resizable: true,
        editable: true,
        droppable: true,
        activeOnRender: 1,

        traits: [
          {
            type: "checkbox",
            name: "border",
            label: "Bordure : ",
            valueTrue: "YES", // Value to assign when is checked, default: `true`
            valueFalse: "NO", // Value to assign when is unchecked, default: `false`
          },
          {
            type: "number",
            name: "taille",
            label: "taile en px: ",
          },
          {
            type: "select",
            name: "borderstyle",
            label: "Border style: ",
            options: [
              { id: "solid", name: "Solid" },
              { id: "dashed", name: "Dashed" },
              { id: "dotted", name: "Dotted" },
              { id: "double", name: "Double" },
            ],
          },
          {
            type: "color",
            name: "color",
            label: "Bordure : ",
          },

          {
            type: "button",
            text: "Ajouter une colonne",
            command: (editor) => {
              let cmp = editor.getSelected();
              let el = cmp.getEl();

              let thead = cmp.find("thead > tr")[0];
              let thCount = cmp.find("thead > tr")[0].find("th").length;

              thead.append({
                tagName: "th",
                type: "cell",
                editable: true,

                components: `<div class="d-block p-3 " id="cell-${uuidv4()}"  ><p>Colonne ${
                  thCount + 1
                }</p></div>`,
              });
              let tbody = cmp.find("tbody  > tr");
              tbody.forEach((element) => {
                element.append({
                  tagName: "td",
                  editable: true,
                  type: "cell",
                  components: `<div class="d-block p-3" id="cell-${uuidv4()}" ><p>${
                    thCount + 1
                  }</p></div>`,
                });
              });
              cmp.toHTML();
              let html = editor.clearDirtyCount();
              editor.refresh();
              cmp.changeBorderStyle();
            },
          },
          {
            type: "button",
            text: "Ajouter une ligne",
            command: (editor) => {
              let cmp = editor.getSelected();
              let el = cmp.getEl();

              let thead = cmp.find("thead > tr > th").length;
              let tdList = [];
              for (var i = 0; i < thead; i++) {
                tdList.push({
                  tagName: "td",
                  type: "cell",
                  editable: true,
                  components: `<div class="d-block p-3 " id="cell-${uuidv4()}"><p>${
                    i + 1
                  }</p></div>`,
                });
              }
              let tbody = cmp.find("tbody")[0];
              tbody.append({
                tagName: "tr",
                type: "row",
                editable: true,
                components: tdList,
              });

              editor.getSelected().toHTML();

              editor.refresh();
              cmp.changeBorderStyle();
            },
          },
        ],
      },
      updated() {
        this.toHTML();
        editor.refresh();
      },

      async init() {
        this.listenTo(this, "change:attributes:border", this.changeBorder);
        this.listenTo(this, "change:attributes:taille", this.changeBorderStyle);
        this.listenTo(this, "change:attributes:color", this.changeBorderStyle);
        this.listenTo(
          this,
          "change:attributes:borderstyle",
          this.changeBorderStyle
        );
      },

      changeBorderStyle() {
        const color = this.getAttributes().color;
        let taille = this.getAttributes().taille;
        const borderstyle = this.getAttributes().borderstyle;
        taille = !taille || taille == "" ? 0 : taille;
        const tds = this.find("td");
        const ths = this.find("th");
        ths.forEach((th) => {
          th.setStyle({
            "border-width": taille + "px",
            "border-color": color,
            "border-style": borderstyle,
          });
        });
        tds.forEach((td) => {
          td.setStyle({
            "border-width": taille + "px",
            "border-color": color,
            "border-style": borderstyle,
          });
        });
      },
      changeBorder() {
        if (this.getAttributes().border == "YES") {
          const color = this.getAttributes().color;
          const borderstyle = this.getAttributes().borderstyle;
          const tds = this.find("td");
          const ths = this.find("th");
          let taille = this.getAttributes().taille;
          taille = !taille || taille == "" ? 1 : taille;
          ths.forEach((th) => {
            th.setStyle({
              "border-width": taille + "px",
              "border-color": color,
              "border-style": borderstyle,
            });
          });
          tds.forEach((td) => {
            td.setStyle({
              "border-width": taille + "px",
              "border-color": color,
              "border-style": borderstyle,
            });
          });
        } else {
          const tds = this.find("td");
          const ths = this.find("th");
          ths.forEach((th) => {
            th.setStyle({ "border-width": "0px", "border-style": "none" });
          });
          tds.forEach((td) => {
            td.setStyle({ "border-width": "0px", "border-style": "none" });
          });
        }
      },
    },

    view: {
      init({ el, model }) {
        this.listenTo(model, "active", this.doStuff);
      },

      async doStuff() {
        const id = uuidv4();
        this.model.set("attributes", { id });
      },
      async onRender({ el, model }) {},
    },
    isComponent: (el) => {
      if (el.tagName == "TABLE" || el.tagName == "TD") {
        return {
          type: "table",
        };
      }
    },
  });
  const text = dc.getType("text");
  dc.addType("cell", {
    model: {
      defaults: {
        toolbar: [
          {
            attributes: { class: "fa fa-gear" },
            command: "selectTable",
          },
          {
            attributes: { class: "fa fa-trash" },
            command: "tlb-delete",
          },
        ],
      },
    },

    view: {
      init({ el, model }) {
        editor.Commands.add("selectTable", (editor) => {
          const cmp = model.closest("table");
          editor.select(model.closest("table"));
        });

        // listen for active event
      },
    },
    isComponent(el) {
      let result;
      const tag = el.tagName;
      if (tag == "TD" || tag == "TH") {
        result = {
          type: "cell",
          tagName: tag.toLowerCase(),
        };
      }
      return result;
    },
  });


  dc.addType("Colonne", {
    model: {
      defaults: {
        traits: [
          {
            type: "select", // Type of the trait
            label: "Annimation", // The label you will see in Settings
            name: "data-aos", // The name of the attribute/property to use on component
            options: [
              { id: "aucun", name: "Aucun" },
              { id: "fade-up", name: "Fade up" },
              { id: "fade-down", name: "Fade down" },
              { id: "fade-right", name: "Fade right" },
              { id: "fade-left", name: "Fade left" },
              { id: "fade-up-left", name: "Fade up left" },
              { id: "fade-down-right", name: "Fade down right" },
              { id: "fade-down-left", name: "Fade down left" },
              { id: "flip-left", name: "Flip left" },
              { id: "flip-right", name: "Flip right" },
              { id: "flip-up", name: "Flip up" },
              { id: "flip-down", name: "Flip down" },
              { id: "zoom-in", name: "Zoom in" },
              { id: "zoom-in-up", name: "Zoom in up" },
              { id: "zoom-in-down", name: "Zoom in down" },
              { id: "zoom-in-left", name: "Zoom in left" },
              { id: "zoom-in-tight", name: "Zoom in right" },
              { id: "zoom-out", name: "Zoom out" },
              { id: "zoom-out-up", name: "Zoom out up" },
              { id: "zoom-out-down", name: "Zoom out down" },
              { id: "zoom-out-left", name: "Zoom out left" },
            ],
          },
        ],
      },
      async init() {},
    },

    view: {
      init({ el, model }) {
        // listen for active event
      },
    },
    isComponent(el) {
      let result;
      const tag = el.tagName;

      if (
        el.classList &&
        (el.classList.contains("gjs-cell") || el.classList.contains("col"))
      ) {
        result = {
          type: "Colonne",
          tagName: tag.toLowerCase(),
        };
      }
      return result;
    },
  });
  
};
