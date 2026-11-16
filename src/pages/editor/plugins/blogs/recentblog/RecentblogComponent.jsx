import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import ReactDOM from "react-dom/client";
import Modalrecentblog from "./Modalrecentblog";
export default (editor, opts = {}) => {
  const dc = editor.DomComponents;
  const defaultType = dc.getType("default");
  const defaultView = defaultType.view;
  const { Modal } = editor;

  dc.addType("RecentblogType", {
    model: {
      defaults: {
        activeOnRender: 1,
        toolbar: [
          // these are the default toolbar elements
          {
            attributes: { class: "fa fa-arrow-up" },
            command: "select-parent",
          },
          {
            attributes: { class: "fa fa-arrows" },
            command: "tlb-move",
          },
          {
            attributes: { class: "fa fa-clone" },
            command: "tlb-clone",
          },
          {
            attributes: { class: "fa fa-trash" },
            command: "tlb-delete",
          },
          // this is my new toolbar element with my custom command
          {
            attributes: { class: "fa fa-gear" },
            command: "recentConfig",
          },
        ],
      },
      init() {
        this.set("draggable", true);
        this.set("removable", true);
        this.set("copyable", true);
        this.set("droppable", false);
        this.set("selectable", true);
      },
    },
    view: {
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
      init({ el, model }) {
        editor.Commands.add("recentConfig", {
          run(editor, sender, model) {
            let cmp = editor.getSelected();
            if (!cmp.getClasses().includes("recent")) {
              do {
                cmp = cmp.parent();
              } while (!cmp.getClasses().includes("recent"));
            }

            const container = document.getElementById("recent-modal");
            if (container) {
              container.remove();
            }
            const modalContainer = document
              .createRange()
              .createContextualFragment(`<div id="recent-modal"></div>`);
            document.body.append(modalContainer);
            const root = ReactDOM.createRoot(
              document.getElementById("recent-modal")
            );
            root.render(
              <Modalrecentblog
                editor={editor}
                component={cmp}
                siteId={opts.site}
              />
            );

            editor.select(cmp);
          },
        });
        // this.listenTo(model, "active", this.doStuff);
      },
      async doStuff() {
        const container = document.getElementById("recent-modal");
        if (container) {
          container.remove();
        }
        const modalContainer = document
          .createRange()
          .createContextualFragment(`<div id="recent-modal"></div>`);
        document.body.append(modalContainer);
        const root = ReactDOM.createRoot(
          document.getElementById("recent-modal")
        );

        setTimeout(() => {
          root.render(
            <Modalrecentblog
              editor={editor}
              component={this.model}
              siteId={opts.site}
            />
          );
        }, 500);
      },

      getAllClassesAndIDs(component) {
        let arrCss = [];
        const allRules = editor.Css.getRules();
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
      async onRender({ el, model }) {
        editor.on("component:clone", (model) => {
          if (model.get("type") == "RecentblogType") {
            let cmp = editor.getSelected();
            let attr = cmp.getAttributes();
            let newattr = model.getAttributes();
            let items = newattr["data-items"];
            items = JSON.parse(items);

            const css = this.getAllClassesAndIDs(cmp);
            let filteredArray = css.filter((str) => str !== "");
            let cssstring = filteredArray.join(" ");

            cssstring = cssstring.replaceAll(
              `#${attr.id}`,
              `#${model.getAttributes().id}`
            );
            editor.Css.addRules(cssstring);

            model.components().forEach((cmpParent) => {
              if (cmpParent.getClasses().includes("recent")) {
                cmpParent.components().forEach((item, i) => {
                  let btn = item.components().models[0].components().models[0];
                  let body = item.components().models[1];
                  let btnAttr = btn.getAttributes();
                  let bodyAttr = body.getAttributes();
                  btnAttr["data-bs-target"] = `#${body.ccid}`;
                  btnAttr["aria-controls"] = `${body.ccid}`;
                  items[i]["id"] = `${body.ccid}`;
                  bodyAttr["data-bs-parent"] = `#${newattr.id}`;
                  btn.setAttributes(btnAttr);
                  body.setAttributes(bodyAttr);
                });
              }
            });
            newattr["data-items"] = JSON.stringify(items);
            model.setAttributes(newattr);
          }
        });

        let attr = model.getAttributes();

        this.model.components(`
        <div class="recents recents_posts gjs-row ${
          JSON.parse(attr["data-params"])["carrousel"] == "true"
            ? "owl-carousel owl-theme"
            : ""
        }" id="listItem-${attr["id"]}">
       </div>
    
       <script>
       $(document).ready(function(){
       

   
        $("#listItem-${attr["id"]}").html('')
        $.ajax({
          type: "GET",
          url: "${process.env.REACT_APP_API_URL}/blogposts/getbysite/${
          opts.site
        }",
          contentType: "application/json", // Set content type to JSON
          processData: false,
        }).done(async function(response) {
         $(".recent").each(function(){
      
            var params = ${attr["data-params"]}
    
        
          var data = response.data.slice(0, params.nbr);
         httmlContent=""
          data.forEach(function(p) {
            var date = new Date(p.date_creation); // Convert the date string to a Date object
  var formattedDate = date.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  }); // F
            var c = p.categorie;
           
              httmlContent += '<div class="column gjs-cell"><div class="post-module">'
              if(params.postThumb =="true"){
                httmlContent+='  <div style="background:url(' + p.thumbnail + ');background-size:cover" class="thumbnail" >'
                
                if(params.postCategory =="true"){
                  httmlContent+='<div class="category">' +p.categorie.name + '</div>'
                }
                httmlContent+=' </div>'
              }
              httmlContent+= '<div class="post-content">';

              httmlContent+='<b class="titleblog">' + p.title + '</b>'
              if(params.postDate =="true"){
                httmlContent+='<div class="post-meta"><span class="timestamp">' +formattedDate  + '</span></div>'
              }
              httmlContent+='<p class="description">' + p.resume + '</p>'

              if(params.postBtn =="true"){
                httmlContent+='<a href="/actualites' + c.url + p.url + '" class="btn btn-primary savoirplus">'+params.postBtnTxt+' →</a>'
              }

              httmlContent+='</div></div></div>'
              $("#listItem-${attr["id"]}").html(httmlContent);
          
          });
          console.log(httmlContent)
          if(params.carrousel =="true"){
            setTimeout(function(){
      
             $("#listItem-${attr["id"]}").owlCarousel({
            
              autoplay:true,
              autoplayHoverPause:true,
              autoplayTimeout:3000,
              nav: false,
              dots: true,
              margin:20,
              responsive: {
            0: { items: 1 },
            768: { items: 2 },
            992: { items: 3 },
            1500: { items: 3 }
        }
          })
          },1000)
          }
        })
        });
    
      });
  
       </script>
       <style>
       #listItem-${attr["id"]}.owl-loaded{
       display:grid!important;
       }
       .thumbnail{
        width:100%;
        height:200px;
       }
       </style>
    `);
        let children = this.model.view.getAllChildComponents(this.model);
        children.map((c) => {
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
            {
              attributes: { class: "fa fa-gear" },
              command: "recentConfig",
            },
          ]);
        });
      },
    },
    isComponent: (el) => {
      if (el.classList && el.classList.contains("recent")) {
        return {
          type: "RecentblogType",
        };
      }
    },
  });
};
