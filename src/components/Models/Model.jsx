import axios from "axios";
import { fromBlob, fromURL } from "image-resize-compress";
// import domtoimage from "dom-to-image";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { toast, Toaster } from "react-hot-toast";
// import { Navigate, useNavigate, useParams } from "react-router-dom/dist";
import Select from "react-select";
import "./Model.css";

import html2canvas from "html2canvas";
import { useDispatch, useSelector } from "react-redux";
import { v4 } from "uuid";

export default function Model(props) {
 
  const [show, setShow] = useState(true);
  const [capture, setCapture] = useState();
  const [textDescription, setTextDescription] = useState("");
  const [Category, setCategory] = useState({
    value: "autres",
    label: "AUTRES",
  });
  const [counter, setCounter] = useState(4);

  const [Visibilite, setVisibilite] = useState("");

  const handleClose = () => {
    setShow(false);
  };

  useEffect(() => {
  }, [Category, Visibilite]);
  useEffect(() => {}, [capture]);


  const optionsCategories = [
    { value: "historique", label: "HISTORIQUE" },
    { value: "vide", label: "VIDE" },
    { value: "slider", label: "SLIDER" },
    { value: "blocs_de_texte", label: "BLOCS DE TEXTE" },
    { value: "images_et_texte", label: "BLOCS ET IMAGES" },
    { value: "onglets", label: "ONGLETS" },
    { value: "menu_et_tarifs", label: "MENU ET TARIFS" },
    { value: "galerie", label: "GALERIE" },
    { value: "faq", label: "FAQ" },
    { value: "contact", label: "CONTACT" },
    { value: "entete_de_page", label: "ENTÊTE DE PAGE" },
    { value: "pied_de_page", label: "PIED DE PAGE" },
    { value: "breadcrumb", label: "Fil D'ARIANE" },
    { value: "socialType", label: "RESEAUX SOCIAUX" },
    { value: "autres", label: "AUTRES" },
  ];

  const handleBlob = async (blobFile, type) => {
    // quality value for webp and jpeg formats.
    const quality = 80;
    // output width. 0 will keep its original width and 'auto' will calculate its scale from height.
    const width = 0;
    // output height. 0 will keep its original height and 'auto' will calculate its scale from width.
    const height = 0;
    // file format: png, jpeg, bmp, gif, webp. If null, original format will be used.
    const format = "webp";
    if (type == "file") {
      return await fromBlob(blobFile, quality, width, height, format).then(
        (blob) => {
          // will output the converted blob file

          return blob;
        }
      );
    } else {
      return await fromURL(
        process.env.REACT_APP_MEDIA_URL + blobFile.path,
        quality,
        width,
        height,
        format
      ).then((blob) => {
        // will output the converted blob file
        return blob;
      });
    }
    // note only the blobFile argument is required
  };

  function dataURItoBlob(dataURI) {
    var byteString = atob(dataURI.split(",")[1]);
    var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);

    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    var blob = new Blob([ab], { type: mimeString });

    return blob;
  }
  const getAllNestedComponents = (component) => {
    let result = [];
    const children = component.components();
    result.push(...children);
    children.forEach((child) => {
      result.push(...getAllNestedComponents(child));
    });
    return result;
  };

  const create = async () => {
    const el = props.editor.getSelected();
    const attr = el.getAttributes();
    switch (Visibilite) {
      case "Prive":
        attr["data-isprive"] = "true";
        break;
      case "Global":
        attr["data-isglobal"] = "true";
        break;
      default:
        attr["data-ispublic"] = "true";
        break;
    }
    attr["data-ref"] = "section-"+v4();

    el.setAttributes(attr);
    const Notif = toast.loading("Création en cours...");
    let formData = new FormData();

    const file = await handleBlob(capture, "file");
    let css = getAllCss(el);

    let filteredArray = css.filter((str) => str !== "");
    let componentCss = filteredArray.join(" ");

    formData.append("screenshot", file);
    formData.append("CompteSchema", props.compteSchema);
    formData.append("ref", el.attributes.attributes["data-ref"]);
    formData.append("SiteSchema", props.siteId);
    formData.append("type", Visibilite);
    // formData.append("category", JSON.stringify(Category));
    if (Visibilite == "Public") {
      formData.append("category", JSON.stringify(Category));
    } else {
      formData.append(
        "category",
        JSON.stringify({ value: "historique", label: "HISTORIQUE" })
      );
    }

    formData.append("css", componentCss);
    formData.append("html", el.toHTML());
    //console.log(props.compteSchema)
    await axios
      .post(process.env.REACT_APP_API_URL + "/models/create", formData)
      .then((response, error) => {
        toast.dismiss();
        props.editor.store();
        toast.success(Notif, response.data.message);
        setShow(false);
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      })
      .catch((err) => {
       // console.log(err);
        toast.dismiss();
        toast.error("Merci de vérifier votre données");
      });
  };

  const getAllCss = (component) => {
    let arrCss = [];
    const allRules = props.editor.Css.getRules();

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

  async function getBase64ImageFromUrl(imageUrl) {
    let link = imageUrl.replace("https://", "").split("/");
    const site = link[2];
    const imgName = link[4];
    var res = await fetch(
      process.env.REACT_APP_API_URL + "/images/" + site + "/" + imgName
    );
    var blob = await res.blob();
    return new Promise((resolve, reject) => {
      var reader = new FileReader();
      reader.addEventListener(
        "load",
        function () {
          resolve(reader.result);
        },
        false
      );

      reader.onerror = () => {
        return reject(this);
      };
      reader.readAsDataURL(blob);
    });
  }
  useEffect(() => {
    const el = props.editor.getSelected();
    let css = getAllCss(el);

    let filteredArray = css.filter((str) => str !== "");
    let componentCss = filteredArray.join(" ");
    const htmlString = el.toHTML();
    // console.log(htmlString);
    const cssString = componentCss;

    let div = document.createRange().createContextualFragment(htmlString);
    // console.log(div);
    const style = document.createElement("style");
    style.textContent = cssString;
    div.append(style);
    let preview = document.getElementById("preview");
    preview.append(div);
    let imgs = preview.querySelectorAll("img");

    new Promise(async (resolve, reject) => {
      if (imgs.length > 0) {
        await imgs.forEach(async (img) => {
          await getBase64ImageFromUrl(img.src).then((result) => {
            img.src = result;
            resolve("ok");
          });
        });
      } else {
        resolve("ok");
      }
    }).then((value) => {
      setTimeout(() => {
        html2canvas(document.getElementById("preview"), { useCORS: true }).then(
          (canvas) => {
            canvas.toBlob((blob) => {
              setCapture(blob); // Base64 encoded image
            });
          }
        );
      }, 3000);
    });
    const interval = setInterval(() => {
      setCounter((counter) => counter - 1);
    }, 1000);
    /*   */
  }, []);
  useEffect(() => {
    switch (Visibilite) {
      case "Prive":
        setTextDescription("Cette section visibile seulement pour ce Site");
        break;
      case "Public":
        setTextDescription(
          "Cette section est visibile sur touts les autes sites"
        );
        break;
      case "Global":
        setTextDescription(
          "Cette section est visible uniquement sur ce site. Toute modification apportée à cette section s'applique à toutes les pages qui contiennent cette section"
        );
        break;
      default:
        break;
    }
  }, [Visibilite]);

  return (
    <div>
      <body></body>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        style={{ background: "rgb(0 0 0 / 65%)" }}
        keyboard={false}
        id="ModalAddSection"
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Enregistrer en tant que modél</Modal.Title>
        </Modal.Header>
        <Modal.Body className="pt-2 pb-2 ps-3 pe-3">
          <div className="d-flex visibilite justify-content-center align-items-center mb-5">
            <input
              type="radio"
              value="Prive"
              name="model"
              checked={Visibilite == "Prive"}
              onChange={(e) => setVisibilite(e.target.value)}
              id="prive"
            />

            <label
              className="ps-5 pt-2 pb-2  pe-5 border rounded-pill"
              htmlFor="prive"
            >
              Privé{" "}
            </label>

            <input
              type="radio"
              value="Global"
              id="global"
              name="model"
              checked={Visibilite == "Global"}
              onChange={(e) => setVisibilite(e.target.value)}
            />
            <label
              className="ps-5 pt-2 pb-2 pe-5 border rounded-pill"
              htmlFor="global"
            >
              Global
            </label>
                        <input
              type="radio"
              value="Public"
              name="model"
              checked={Visibilite == "Public"}
              id="public"
              onChange={(e) => setVisibilite(e.target.value)}
            />

            <label
              className="ps-5 pt-2 pb-2  pe-5 border rounded-pill"
              htmlFor="public"
            >
              {" "}
              Public
            </label>
          </div>
          <span className="mb-2 d-block">{textDescription}</span>
          <div
            className={
              Visibilite == "Public"
                ? "d-flex align-items-center  ms-2 typeBorder"
                : "d-none"
            }
          >
            {/* 
            <Select
              className="mb-3 typeSection"
              value={Visibilite}
              placeholder="Type du section"
              onChange={(e) => setVisibilite(e)}
              options={optionsVisibilite}
              styles={{
                menu: (provided) => ({ ...provided, zIndex: 999999 }),
              }}
              menuContainerStyle={{ zIndex: 999999 }}
            /> */}
            <Select
              className="mb-3 categorySection w-100"
              value={Category}
              placeholder="Catégorie du section"
              onChange={(e) => setCategory(e)}
              options={optionsCategories}
              styles={{ menuPortal: (base) => ({ ...base, zIndex: 10 }) }}
            />
          </div>

          <span className="d-block mb-3 fw-bold"> Capture :</span>
          <div id="preview"></div>
          <canvas id="canvas" />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fermer
          </Button>
          <Button
            variant="primary"
            disabled={!capture || !Visibilite || !Category}
            onClick={(e) => create()}
          >
            Ajouter{" "}
            <span className={counter > 0 ? "d-inline" : "d-none"}>
              ({counter})
            </span>
          </Button>
        </Modal.Footer>
      </Modal>
      <Toaster />
    </div>
  );
}
