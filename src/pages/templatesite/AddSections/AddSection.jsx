import axios from "axios";
import { fromBlob } from "image-resize-compress";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";
import { MultiSelect } from "react-multi-select-component";
import Select from "react-select";
import fontsList from "../../../assets/fonts/fonts.json";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";
import "./AddSection.css";
import { v4 as uuidv4 } from "uuid";
export default function AddSection() {
  const [show, setShow] = useState(false);
  const [isValid, setValid] = useState(false);
  const [fonts, setFonts] = useState([]);
  const [HtmlError, setHTMLerror] = useState([]);
  const [CssError, setCSSerror] = useState([]);
  const [JsError, setJSerror] = useState([]);
  const [cdnJs, setCdnJs] = useState([]);
  const [cdnCss, setCdnCss] = useState([]);
  const [ref, setRef] = useState();

  const optionsCategories = [
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
    { value: "autres", label: "AUTRES" },
    { value: "breadcrumb", label: "FIL D'ARIANE" },
  ]

  const [Section, setSection] = useState({
    title: "",
    category: null,
    fonts: [],
    screenshot: null,
    scripts: "",
    css: "",
    html: "",
    images: [],
  });
  const handleClose = () => {
    setShow(false);
    setSection({
      title: "",
      category: null,
      fonts: [],
      screenshot: null,
      scripts: "",
      css: "",
      html: "",
      images: [],
    });
  };
  const handleFileChange = (e) => {
    if (e.target.files) {
      let imgs = Array.from(e.target.files);
      const accepted = imgs.filter((img) =>
        [
          "image/png",
          "image/jpg",
          "image/jpeg",
          "image/webp",
          "image/svg+xml",
        ].includes(img.type)
      );
      setSection({ ...Section, screenshot: accepted[0] });
    }
  };
  const handleFileChangeImages = (e) => {
    if (e.target.files) {
      let imgs = Array.from(e.target.files);
      const accepted = imgs.filter((img) =>
        [
          "image/png",
          "image/jpg",
          "image/jpeg",
          "image/webp",
          "image/svg+xml",
        ].includes(img.type)
      );
      setSection({ ...Section, images: accepted });
    }
  };
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
  const Create = async () => {
    const Notif = toast.loading("Création en cours...");
    let formData = new FormData();
    if (Section.screenshot) {
      if (Section.screenshot.type != "image/svg+xml") {
        const originalName = Section.screenshot.name;
        const file = await handleBlob(Section.screenshot);

        formData.append("screenshot", file, originalName);
      } else {
        const originalName = Section.screenshot.name;
        formData.append("screenshot", Section.screenshot, originalName);
      }
    }

    let imgs = [];
    if (Section.images.length > 0) {
      await Promise.all(
        Section.images.map(async (img, index) => {
          if (img.type != "image/svg+xml") {
            const originalName = Section.images[index].name;
            const file = await handleBlob(img);
            formData.append("images", file, originalName);
          } else {
            const originalName = Section.images[index].name;
            formData.append("images", img, originalName);
          }
        })
      );
    }
    formData.append("title", Section.title);
    formData.append("category", JSON.stringify(Section.category));
    formData.append("fonts", JSON.stringify(Section.fonts));
    formData.append("scripts", Section.scripts);
    formData.append("css", Section.css);
    formData.append("html", Section.html);
    formData.append("libjs", JSON.stringify(cdnJs));
    formData.append("libcss", JSON.stringify(cdnCss));
    formData.append("ref", ref);

    await axios
      .post(process.env.REACT_APP_API_URL + "yarn   /create/", formData)
      .then((response, error) => {
        toast.dismiss();
        setHTMLerror([]);
        setCSSerror([]);
        setJSerror([]);
        toast.success(Notif, response.data.message);
        setShow(false);
        setSection({
          title: "",
          category: null,
          fonts: [],
          screenshot: null,
          scripts: "",
          css: "",
          html: "",
          images: [],
        });
      })
      .catch((err) => {
        toast.dismiss();
        toast.error("Merci de vérifier votre données");
        if (err.response.data.html) {
          setHTMLerror(err.response.data.html);
        } else if (err.response.data.css) {
          setCSSerror(err.response.data.css);
        } else if (err.response.data.js) {
          setJSerror(err.response.data.js);
        }
      });
  };
  const updateCdn = (type, index, value) => {
    if (type == "js") {
      const newItems = [...cdnJs];
      newItems[index] = { value: value };
      setCdnJs(newItems);
    }
    if (type == "css") {
      const newItems = [...cdnCss];
      newItems[index] = { value: value };
      setCdnCss(newItems);
    }
  };
  const addCdn = (type) => {
    if (type == "js") {
      setCdnJs([...cdnJs, { value: "" }]);
    }
    if (type == "css") {
      setCdnCss([...cdnCss, { value: "" }]);
    }
  };
  const removeCdn = (type, index) => {
    if (type == "css") {
      const newItems = [...cdnCss];
      delete newItems[index];
      var filtered = newItems.filter(function (el) {
        return el;
      });
      setCdnCss(filtered);
    }
    if (type == "js") {
      const newItems = [...cdnJs];
      delete newItems[index];
      var filtered = newItems.filter(function (el) {
        return el;
      });
      setCdnJs(filtered);
    }
  };
  useEffect(() => {
    setHTMLerror([]);
    setCSSerror([]);
    setJSerror([]);
    if (
      Section.title.length > 3 &&
      Section.category != null &&
      Section.screenshot != null
    ) {
      setValid(true);
    } else {
      setValid(false);
    }
  }, [Section]);

  useEffect(() => {
  }, [fonts, CssError, JsError, cdnJs, cdnCss, HtmlError, isValid, ref]);
  useEffect(() => {
    let list = fontsList.items.map((font) => {
      return { value: font.family.replaceAll(" ", "+"), label: font.family };
    });

    setFonts(list);
    setRef(`section-${uuidv4()}`);
  }, []);
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  return (
    <div id="AddSection">
      <button
        type="button"
        className="btn btn-primary addTemplate"
        onClick={() => setShow(true)}
      >
        <i class="fad fa-layer-plus"></i> Ajouter section
      </button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        style={{ background: "rgb(0 0 0 / 65%)" }}
        keyboard={false}
        id="ModalAddSection"
        fullscreen={true}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Ajouter une section{" "}
            <span className="d-block sectioID fs-4 text-muted">
              <small>#{ref}</small>
            </span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex justify-content-between align-content-center">
            <div className="infoSection">
              <input
                className="form-control mb-3"
                type="text"
                placeholder="Titre du section minimum 4 caractère"
                aria-label="Title"
                data-error="L'adresse e-mail doit être unique"
                value={Section.title}
                onChange={(e) => {
                  setSection({ ...Section, title: e.target.value });
                }}
              />
             
              <Select
                className="mb-3"
                value={Section.category}
                placeholder="Catégorie du section"
                onChange={(e) => setSection({ ...Section, category: e })}
                options={optionsCategories}
              />

              {/* <MultiSelect
                id="fontSelect"
                options={fonts}
                value={Section.fonts}
                isCreatable={false}
                overrideStrings={{
                  allItemsAreSelected: "Tout les font sont sélectionés",
                  clearSearch: "vider la recherche",
                  clearSelected: "vider la sélection",
                  noOptions: "Aucune font trouvé",
                  search: "Chercher un font",
                  selectAll: "Selectioner tout",
                  selectSomeItems: "Utilise le font par defaut",
                }}
                className="mb-3"
                onChange={(e) =>
                  setSection({
                    ...Section,
                    fonts: e,
                  })
                }
                hasSelectAll={false}
              />*/}
            </div>
            <div className=" files mb-3">
              <input
                type="file"
                id="screenshot"
                accept=".png,.jpeg,.jpg,.webp,.svg"
                onChange={(e) => handleFileChange(e)}
              />
              <label for="screenshot" className="btn-2">
                Upload
              </label>
              {Section.screenshot == null ? (
                <span className="text-center d-block mt-4">
                  Insérer une vigniette
                </span>
              ) : (
                <span className="text-center d-block mt-4">
                  <img
                    className="imgPreview"
                    src={URL.createObjectURL(Section.screenshot)}
                  />
                </span>
              )}
            </div>
          </div>

{/*            <div class="form-floating">
            <textarea
              class="form-control"
              style={{"min-height":"200px"}}
              placeholder="Leave a comment here"
              id="floatingTextarea2"
              onChange={(e) => setSection({ ...Section, html: e.target.value })}
            ></textarea>
            <label
              for="floatingTextarea2"
              className="d-flex justify-content-start align-items-center"
            >
              <i class="fab fa-html5 me-2"></i> <span>HTML</span>
            </label>
          </div>  */}
<div className="m-2 fw-bold">
  Ecrire votre HTML :
</div>
          <AceEditor
        placeholder="Ecrire votre HTML  code..."
        mode="html"
        theme="monokai"
        name="blah2"
        width={"100%"}
        onChange={(e) => setSection({ ...Section, html: e})}
        fontSize={14}
        showPrintMargin={false}
        showGutter={true}
        highlightActiveLine={true}
        value={Section.html}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
          showLineNumbers: true,
          tabSize: 2,
        }}
      />
    
          <div
            className={
              HtmlError.length > 0
                ? "text-danger fw-light fst-italic mt-2"
                : "d-none"
            }
          >
            {HtmlError.map((err) => {
              return (
                <>
                  <small>* {err.message} </small> <br />
                </>
              );
            })}
          </div>

{/*           <div class="form-floating  mb-3">
            <textarea
              class="form-control"
              placeholder="Leave a comment here"
              id="floatingTextarea2"
              style={{"min-height":"200px"}}
              onChange={(e) => setSection({ ...Section, css: e.target.value })}
            ></textarea>

            <label
              for="floatingTextarea2"
              className="d-flex justify-content-start align-items-center"
            >
              <i class="fab fa-css3-alt me-2"></i> <span>CSS</span>
            </label>
          </div> */}
          <div className="m-2 fw-bold">
  Ecrire votre CSS :
</div>
          <AceEditor
        placeholder="Ecrire votre CSS  code..."
        mode="css"
        theme="monokai"
        name="blah2"
        width={"100%"}
        onChange={(e) => setSection({ ...Section, css: e})}
        fontSize={14}
        showPrintMargin={false}
        showGutter={true}
        highlightActiveLine={true}
        value={Section.css}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
          showLineNumbers: true,
          tabSize: 2,
        }}
      />
          <div
            className={
              CssError.length > 0
                ? "text-danger fw-light fst-italic mt-3 mb-3"
                : "d-none"
            }
          >
            {CssError.map((err) => {
              return (
                <>
                  <small>* {err.message} </small> <br />
                </>
              );
            })}
          </div>
{/*           <div class="form-floating mb-3">
            <textarea
              class="form-control"
              placeholder="Leave a comment here"
              id="floatingTextarea2"
              style={{"min-height":"200px"}}
              onChange={(e) =>
                setSection({ ...Section, scripts: e.target.value })
              }
            ></textarea>
            <label for="floatingTextarea2">
              <i class="fab fa-js me-2"></i> Scripts
            </label>
          </div> */}
                    <div className="m-2 fw-bold">
  Ecrire votre JS :
</div>
          <AceEditor
        placeholder="Ecrire votre JS  code..."
        mode="javascript"
        theme="monokai"
        name="blah2"
        width={"100%"}
        onChange={(e) => setSection({ ...Section, scripts: e})}
        fontSize={14}
        showPrintMargin={false}
        showGutter={true}
        highlightActiveLine={true}
        value={Section.scripts}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
          showLineNumbers: true,
          tabSize: 2,
        }}
      />
          <div
            className={
              JsError.length > 0
                ? "text-danger fw-light fst-italic  mb-3"
                : "d-none"
            }
          >
            {JsError.map((err) => {
              return (
                <>
                  <small>* {err.message} </small> <br />
                </>
              );
            })}
          </div>
          <div className=" filesImages mt-3 mb-3">
            <input
              type="file"
              id="images"
              multiple
              accept=".png,.jpeg,.jpg,.webp,.svg"
              onChange={(e) => handleFileChangeImages(e)}
            />
            <label for="images" className="btn-2">
              Upload
            </label>
            {Section.images.length == 0 ? (
              <span className="text-center d-block mt-4">
                Insérer les images utilisés
              </span>
            ) : (
              <div>
                <span className="d-block text-center mt-2 fw-bold">
                  Total : {Section.images.length}
                </span>
                <span className="d-flex justify-content-center align-items-center flex-wrap mt-2">
                  {Section.images.map((img) => {
                    return (
                      <img
                        className="imgPreview"
                        src={URL.createObjectURL(img)}
                      />
                    );
                  })}
                </span>
              </div>
            )}
          </div>
          <div className="d-flex justify-content-between align-items-start">
            <div className="cdn">
              <div className="addCdnBtn" onClick={(e) => addCdn("js")}>
                <i class="fal fa-plus-square"></i> Ajouter nouveau JS CDN
              </div>
              {cdnJs.map((cdn, index) => {
                return (
                  <>
                    <div key={index} class="input-group mb-3">
                      <input
                        value={cdn.value}
                        type="url"
                        class="form-control"
                        placeholder="CDN JS"
                        onChange={(e) => updateCdn("js", index, e.target.value)}
                      />
                      <i
                        class="fas fa-trash-alt"
                        onClick={(e) => removeCdn("js", index)}
                      ></i>
                    </div>
                  </>
                );
              })}
            </div>
            <div className="cdn">
              <div className="addCdnBtn" onClick={(e) => addCdn("css")}>
                <i class="fal fa-plus-square"></i> Ajouter nouveau CSS CDN
              </div>
              {cdnCss.map((cdn, index) => {
                return (
                  <>
                    <div key={index} class="input-group mb-3">
                      <input
                        value={cdn.value}
                        type="url"
                        class="form-control"
                        placeholder="CDN CSS"
                        onChange={(e) =>
                          updateCdn("css", index, e.target.value)
                        }
                      />
                      <i
                        class="fas fa-trash-alt"
                        onClick={(e) => removeCdn("css", index)}
                      ></i>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fermer
          </Button>
          <Button
            variant="primary"
            disabled={!isValid}
            onClick={(e) => Create()}
          >
            Ajouter
          </Button>
        </Modal.Footer>
      </Modal>
      <Toaster />
    </div>
  );
}
