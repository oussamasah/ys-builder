import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import ModalDialog from "react-bootstrap/ModalDialog";
import Draggable from "react-draggable";
import "./ModalGallery.css";
import { fromBlob } from "image-resize-compress";
import Dropzone from "react-dropzone";
import axios from "axios";
import toast from "react-hot-toast";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import ColorConfig from "../../../compoments/Color/ColorConfig";
import TextStylingComponent from "../../../compoments/TextStyling/TextStylingComponent";
import IconConfig from "../../../compoments/Icon/IconConfig";
class DraggableModalDialog extends React.Component {
  render() {
    return (
      <Draggable handle=".handleDrag">
        <ModalDialog {...this.props} />
      </Draggable>
    );
  }
}
export default function ModalGallery(props) {
  const [show, setShow] = useState(true);
  const [pages, setPages] = useState([]);
  const [mediaLibrary, setMediaLibrary] = useState(true);
  const [selected, setSelected] = useState(null);
  const [config, setConfig] = useState(
    props.editor.getSelected().getAttributes()["data-config"]
      ? JSON.parse(props.editor.getSelected().getAttributes()["data-config"])
      : {
          gallery_theme: "tiles",
          tile_as_link: "false",
          tile_enable_icons: "true",
          tile_enable_textpanel: "false",
          tile_textpanel_position: "inside_bottom",
          tile_textpanel_bg_color: "#000",

          tile_textpanel_title_color: "#000",
          tile_textpanel_padding_top: 8,
          tile_textpanel_padding_bottom: 8,
          tile_textpanel_padding_right: 5,
          tile_textpanel_padding_left: 5,
          tile_textpanel_bg_opacity: 1,

          tile_textpanel_title_font_family: "",
          tile_textpanel_title_text_align: "left",
          tile_textpanel_title_font_size: "16",
        }
  );

  const [IconRight, setIconRight] = useState(
    props.editor.getSelected().getAttributes()["data-icon-right"] &&
      props.editor
        .getSelected()
        .getAttributes()
        ["data-icon-right"].indexOf("{") > -1
      ? JSON.parse(
          props.editor.getSelected().getAttributes()["data-icon-right"]
        )
      : {
          type: "icon",
          icon: props.editor.getSelected().getAttributes()["data-icon-right"]
            ? props.editor.getSelected().getAttributes()["data-icon-right"]
            : "fas fa-user",
          unicode: props.editor.getSelected().getAttributes()[
            "data-icon-right-unicode"
          ]
            ? props.editor.getSelected().getAttributes()[
                "data-icon-right-unicode"
              ]
            : "\f007",
          size: 30,
          color: "#000",
        }
  );

  const [IconLeft, setIconLeft] = useState(
    props.editor.getSelected().getAttributes()["data-icon-left"] &&
      props.editor
        .getSelected()
        .getAttributes()
        ["data-icon-left"].indexOf("{") > -1
      ? JSON.parse(props.editor.getSelected().getAttributes()["data-icon-left"])
      : {
          type: "icon",
          icon: props.editor.getSelected().getAttributes()["data-icon-left"]
            ? props.editor.getSelected().getAttributes()["data-icon-left"]
            : "fas fa-user",
          unicode: props.editor.getSelected().getAttributes()[
            "data-icon-left-unicode"
          ]
            ? props.editor.getSelected().getAttributes()[
                "data-icon-left-unicode"
              ]
            : "\f007",
          size: 30,
          color: "#000",
        }
  );
  const rgbtoJson = (rgbString) => {
    var s = rgbString;
    s = s.replace("rgb(", "");
    s = s.replace(")", "");
    let c = s.split(",");
    return { r: c[0], g: c[1], b: c[2], a: c[3] };
  };
  const [configTitlBgColor, setConfigTitlBgColor] = useState({
    rgbTxt:
      props.editor.getSelected().getAttributes()["data-config"] &&
      JSON.parse(props.editor.getSelected().getAttributes()["data-config"])[
        "tile_textpanel_bg_color"
      ]
        ? JSON.parse(props.editor.getSelected().getAttributes()["data-config"])[
            "tile_textpanel_bg_color"
          ]
        : "#000",
    rgb:
      props.editor.getSelected().getAttributes()["data-config"] &&
      JSON.parse(props.editor.getSelected().getAttributes()["data-config"])[
        "tile_textpanel_bg_color"
      ]
        ? JSON.parse(props.editor.getSelected().getAttributes()["data-config"])[
            "tile_textpanel_bg_color"
          ]
        : "#000",
  });
  const [configTitleText, setConfigTitleText] = useState({
    font:
      props.editor.getSelected().getAttributes()["data-config"] &&
      JSON.parse(props.editor.getSelected().getAttributes()["data-config"])[
        "tile_textpanel_title_font_family"
      ]
        ? JSON.parse(props.editor.getSelected().getAttributes()["data-config"])[
            "tile_textpanel_title_font_family"
          ]
        : "",
    variant:
      props.editor.getSelected().getAttributes()["data-config"] &&
      JSON.parse(props.editor.getSelected().getAttributes()["data-config"])[
        "tile_textpanel_title_bold"
      ]
        ? JSON.parse(props.editor.getSelected().getAttributes()["data-config"])[
            "tile_textpanel_title_bold"
          ]
        : "normal",
    color:
      props.editor.getSelected().getAttributes()["data-config"] &&
      JSON.parse(props.editor.getSelected().getAttributes()["data-config"])[
        "tile_textpanel_title_color"
      ]
        ? JSON.parse(props.editor.getSelected().getAttributes()["data-config"])[
            "tile_textpanel_title_color"
          ]
        : "#fff",
    align:
      props.editor.getSelected().getAttributes()["data-config"] &&
      JSON.parse(props.editor.getSelected().getAttributes()["data-config"])[
        "tile_textpanel_title_text_align"
      ]
        ? JSON.parse(props.editor.getSelected().getAttributes()["data-config"])[
            "tile_textpanel_title_text_align"
          ]
        : "center",
    size:
      props.editor.getSelected().getAttributes()["data-config"] &&
      JSON.parse(props.editor.getSelected().getAttributes()["data-config"])[
        "tile_textpanel_title_font_size"
      ]
        ? JSON.parse(props.editor.getSelected().getAttributes()["data-config"])[
            "tile_textpanel_title_font_size"
          ]
        : { desktop: "16", tablet: "16", mobile: "16" },
  });
  const [items, setItems] = useState(
    props.editor.getSelected().getAttributes()["data-items"]
      ? JSON.parse(props.editor.getSelected().getAttributes()["data-items"])
      : []
  );

  const handleClose = () => {
    setShow(false);
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

  const changeTitleBgColor = (e) => {
    let cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    let itms = JSON.parse(attr["data-items"]);
    let cfg = attr["data-config"] ? JSON.parse(attr["data-config"]) : config;
    cfg["tile_textpanel_bg_color"] = e.rgbTxt;

    setConfig(cfg);
    cmp.setAttributes(attr);
    cfg["tile_textpanel_bg_color"] = e.rgbTxt;
    attr["data-config"] = JSON.stringify(cfg);
    setConfig(cfg);
    cmp.setAttributes(attr);
    updateGallery();

    setConfigTitlBgColor(e);
  };

  const changeIconRight = (e) => {
    const cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    props.editor.Css.remove(
      `#${attr.id} .ug-button-tile-navigation.ug-button-tile-right:before`
    );
    props.editor.Css.remove(
      `#${attr.id} .ug-button-tile-navigation.ug-button-tile-right::before`
    );
    attr["data-icon-right"] = JSON.stringify(e);

    cmp.setAttributes(attr);
    let r = props.editor.Css.getRule(
      `#${attr.id} .ug-button-tile-navigation.ug-button-tile-right:before`
    );
    let css = {};
    if (r) css = r.attributes.style;
    delete css["content"];
    delete css["background-image"];
    delete css["background"];
    delete css["background-size"];
    delete css["background-repeat"];
    delete css["background-position"];
    delete css["font-size"];
    delete css["color"];
    if (e.type == "icon") {
      console.log(e.unicode);
      css["content"] = `'\\${e.unicode.substring(1)}'`;
      css["color"] = e.color;
      css["font-size"] = e.size + "px";
      css["font-family"] = "Font Awesome 5 Free";
      css["background-image"] = "none";
      css["width"] = "auto";
      css["height"] = "auto";
    } else if (e.type == "image") {
      css["content"] = `' '`;
      css["background"] = "url(" + e.icon + ")";
      css["background-size"] = e.size + "px";
      css["width"] = e.size + "px";
      css["height"] = e.size + "px";
      css["background-repeat"] = "no-repeat";
      css["background-position"] = "center";
    }

    props.editor.Css.setRule(
      `#${attr.id} .ug-button-tile-navigation.ug-button-tile-right`,
      { background: "none" }
    );
    props.editor.Css.setRule(
      `#${attr.id} .ug-button-tile-navigation.ug-button-tile-right:before`,
      css
    );

    props.editor.setStyle(props.editor.getCss());
  };

  const changeTextConfig = (e) => {
    let cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    let itms = JSON.parse(attr["data-items"]);
    let cfg = attr["data-config"] ? JSON.parse(attr["data-config"]) : config;
    cfg["tile_textpanel_title_color"] = e.color;
    cfg["tile_textpanel_title_font_family"] = e.font;
    cfg["tile_textpanel_title_text_align"] = e.align;
    cfg["tile_textpanel_title_font_size"] = e.size;
    cfg["tile_textpanel_title_bold"] = e.variant;
    setConfig(cfg);
    setConfigTitleText(e);
    attr["data-config"] = JSON.stringify(cfg);
    cmp.setAttributes(attr);
    updateGallery();
  };

  const changeTitleColor = (e) => {
    let cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    let itms = JSON.parse(attr["data-items"]);
    let cfg = attr["data-config"] ? JSON.parse(attr["data-config"]) : config;
    cfg["tile_textpanel_title_color"] = e.rgbTxt;

    setConfig(cfg);
    cmp.setAttributes(attr);
    cfg["tile_textpanel_title_color"] = e.rgbTxt;
    attr["data-config"] = JSON.stringify(cfg);
    setConfig(cfg);
    cmp.setAttributes(attr);
    updateGallery();

    setConfigTitlBgColor(e);
  };
  const UploadMedia = async (data) => {
    let formData = new FormData();

    await Promise.all(
      data.map(async (element) => {
        const file = await handleBlob(element);

        formData.append("files[]", file);
      })
    );

    await axios
      .post(
        process.env.REACT_APP_API_URL + "/medias/upload/" + props.siteId,
        formData
      )
      .then((response) => {
        setMediaLibrary(response.data.data);
        toast.success(response.data.message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
        });
      })
      .catch((error) => {
        toast.error(error.response.data.message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          draggable: false,
          progress: undefined,
        });
      });
  };
  const getMedia = async () => {
    await axios
      .get(process.env.REACT_APP_API_URL + "/medias/getmedia/" + props.siteId)
      .then((response) => {
        setMediaLibrary(response.data.data);
      });
  };

  const DeleteImg = async (item) => {
    if (selected != null && item.src == selected.src) setSelected(null);
    await axios
      .delete(process.env.REACT_APP_API_URL + "/medias/delete/" + item._id)
      .then((response) => {
        setMediaLibrary(response.data.data);
      });
  };
  const updateItem = (target, data, value) => {
    let cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    let itms = JSON.parse(attr["data-items"]);
    const index = itms.findIndex((i) => i._id == target);
    setSelected({ ...selected, [data]: value });
    if (index > -1) {
      itms[index][data] = value;

      setItems(itms);
      attr["data-items"] = JSON.stringify(itms);
      cmp.setAttributes(attr);
      updateGallery();
    }
  };
  const updateGallery = () => {
    let cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    let itms = JSON.parse(attr["data-items"]);
    let cfg = attr["data-config"] ? JSON.parse(attr["data-config"]) : config;
    let content = `<div id="gallery-${attr.id}">`;
    itms.map((img, index) => {
      content += `<a href="${
        img.url ? img.url : "javascript:void(0)"
      }" title="${img.title}" target="_self"> <img class="item"  alt="${
        img.title
      }"  data-description='${img.description}'  src='${img.src}' data-image='${
        img.src
      }'  title="${img.title}" /> </a>`;
    });
    content += `</div><script>	
  $(function(){	
    if($(window).width() > 600){
    $("#gallery-${attr.id}").unitegallery({
      gallery_theme: "${cfg["gallery_theme"]}", 
      gallery_width:"100%",
      ${cfg["gallery_theme"] == "tiles" ? "tiles_type: 'justified'," : ""}
      tile_enable_action: true,
      tile_as_link: ${cfg["tile_as_link"]},
      tile_enable_icons: ${cfg["tile_enable_icons"]},
      tile_enable_textpanel: ${cfg["tile_enable_textpanel"]},
      tile_textpanel_position: "${cfg["tile_textpanel_position"]}",
      tile_textpanel_bg_color: "${cfg["tile_textpanel_bg_color"]}",
      tile_textpanel_title_color: "${cfg["tile_textpanel_title_color"]}",
      tile_textpanel_padding_top: ${cfg["tile_textpanel_padding_top"]},
      tile_textpanel_padding_bottom: ${cfg["tile_textpanel_padding_bottom"]},
      tile_textpanel_padding_right: ${cfg["tile_textpanel_padding_right"]},
      tile_textpanel_padding_left: ${cfg["tile_textpanel_padding_left"]},
      tile_textpanel_bg_opacity: 1,	
      tile_textpanel_title_color: "${cfg["tile_textpanel_title_color"]}",	
      tile_textpanel_title_font_family: "${
        cfg["tile_textpanel_title_font_family"]
      }",	
      tile_textpanel_title_text_align: "${
        cfg["tile_textpanel_title_text_align"]
      }",	
      tile_textpanel_title_font_size: "${
        cfg["tile_textpanel_title_font_size"]["desktop"]
      }",	
      ${
        cfg["tile_textpanel_title_bold"] == "900"
          ? "tile_textpanel_title_bold: null,"
          : ""
      }

    });
  }else{
    $("#gallery-${attr.id}").unitegallery({
      gallery_theme: "carousel", 
      gallery_width:"100%",
     
      tile_enable_action: true,
      tile_as_link: ${cfg["tile_as_link"]},
      tile_enable_icons: ${cfg["tile_enable_icons"]},
      tile_enable_textpanel: ${cfg["tile_enable_textpanel"]},
      tile_textpanel_position: "${cfg["tile_textpanel_position"]}",
      tile_textpanel_bg_color: "${cfg["tile_textpanel_bg_color"]}",
      tile_textpanel_title_color: "${cfg["tile_textpanel_title_color"]}",
      tile_textpanel_padding_top: ${cfg["tile_textpanel_padding_top"]},
      tile_textpanel_padding_bottom: ${cfg["tile_textpanel_padding_bottom"]},
      tile_textpanel_padding_right: ${cfg["tile_textpanel_padding_right"]},
      tile_textpanel_padding_left: ${cfg["tile_textpanel_padding_left"]},
      tile_textpanel_bg_opacity: 1,	
      tile_textpanel_title_color: "${cfg["tile_textpanel_title_color"]}",	
      tile_textpanel_title_font_family: "${
        cfg["tile_textpanel_title_font_family"]
      }",	
      tile_textpanel_title_text_align: "${
        cfg["tile_textpanel_title_text_align"]
      }",	
      tile_textpanel_title_font_size: "${
        cfg["tile_textpanel_title_font_size"]["desktop"]
      }",	
      ${
        cfg["tile_textpanel_title_bold"] == "900"
          ? "tile_textpanel_title_bold: null,"
          : ""
      }

    });
  }
  });
  </script>`;
    // console.log(cfg["tile_textpanel_title_text_align"] == "900");
    // console.log(cfg["tile_textpanel_title_text_align"] == 900);
    // console.log(cfg["tile_textpanel_title_text_align"]);
    cmp.components(content);
    cmp.view.render();
  };
  const addItem = async (file) => {
    let cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    let s = items;
    const x = items.filter((x) => x._id == file._id);
    if (x.length == 0) {
      setItems([...items, file]);
      s.push(file);
    }
    attr["data-items"] = JSON.stringify(s);
    cmp.setAttributes(attr);
    updateGallery();
  };
  const changeTheme = (thm) => {
    let cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    let cfg = { ...config };
    cfg["gallery_theme"] = thm;
    attr["data-config"] = JSON.stringify(cfg);
    setConfig(cfg);
    cmp.setAttributes(attr);
    updateGallery();
  };
  const updateConfig = (data, value) => {
    let cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    let cfg = { ...config };

    cfg[data] = value;

    attr["data-config"] = JSON.stringify(cfg);
    setConfig(cfg);
    cmp.setAttributes(attr);
    updateGallery();
  };

  const removeItem = async (file) => {
    let cmp = props.editor.getSelected();
    let attr = cmp.getAttributes();
    let n = items;
    const objWithIdIndex = n.findIndex((x) => x._id == file._id);

    if (objWithIdIndex > -1) {
      delete n[objWithIdIndex];
      var filtered = n.filter(function (el) {
        return el != null;
      });

      setItems(filtered);
      attr["data-items"] = JSON.stringify(filtered);
      cmp.setAttributes(attr);
      updateGallery();
    }
  };
  useEffect(() => {
    getMedia();
    axios
      .get(process.env.REACT_APP_API_URL + "/pages/getAll/" + props.siteId)
      .then((res) => {
        setPages(res.data.data);
      });
  }, []);

  useEffect(() => {}, [items, selected]);

  return (
    <Modal
      dialogAs={DraggableModalDialog}
      show={show}
      backdrop="static"
      onHide={handleClose}
      centered
      id="ModalGallery"
    >
      <Modal.Header closeButton className="handleDrag">
        <Modal.Title>Design Galerie</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="galleryConfig">
          <div className="row">
            <div className="mediaLib col-4 ">
              <Dropzone onDrop={(acceptedFiles) => UploadMedia(acceptedFiles)}>
                {({ getRootProps, getInputProps }) => (
                  <section className="dropzone">
                    <div {...getRootProps()} className="drop-zone">
                      <input {...getInputProps()} name="document" />

                      <p>Déposez votre image ici</p>
                    </div>
                  </section>
                )}
              </Dropzone>
              <span className="d-block text-bold mt-3 mb-3">
                Bibliotheque d'images ({" "}
                {mediaLibrary.length > 0 ? mediaLibrary.length : 0} )
              </span>
              {mediaLibrary && mediaLibrary.length > 0 ? (
                <div className="d-flex justify-content-center align-align-items-center flex-wrap biblio_list">
                  {mediaLibrary.map((file) => {
                    return (
                      <div
                        className="position-relative sliders-item"
                        key={file._id}
                      >
                        <div
                          style={{ background: `${"url('" + file.src + "')"}` }}
                          className="thumbnails"
                          onClick={(e) => addItem(file)}
                        ></div>
                        <i
                          className={
                            selected != null && file._id == selected._id
                              ? "fal fa-check-circle"
                              : "d-none"
                          }
                        ></i>
                        <i
                          class="fal fa-trash-alt"
                          onClick={(e) => DeleteImg(file)}
                        ></i>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="">Aucune image disponible</p>
              )}
            </div>

            <div className="col-4 border p-2">
              <span className="d-block text-bold mb-3">
                Galerie d'images ( {items ? items.length : 0} )
              </span>
              {items && items.length > 0 ? (
                <div className="d-flex justify-content-center align-align-items-center flex-wrap slider_list">
                  {items.map((file) => {
                    return (
                      <div
                        className="position-relative sliders-item"
                        key={file._id}
                      >
                        <div
                          style={{ background: `${"url('" + file.src + "')"}` }}
                          className="thumbnails"
                          onClick={(e) => {
                            setSelected(null);
                            setSelected(file);
                          }}
                        ></div>
                        <i
                          className={
                            selected != null && file._id == selected._id
                              ? "fal fa-check-circle"
                              : "d-none"
                          }
                        ></i>
                        <i
                          class="fal fa-trash-alt"
                          onClick={(e) => removeItem(file)}
                        ></i>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="">Aucune image disponible</p>
              )}
            </div>
            <div
              className={
                items && items.length > 0 && selected == null
                  ? "col-4 p2"
                  : "d-none"
              }
            >
              <ul class="nav nav-tabs" id="myTab" role="tablist">
                <li class="nav-item" role="presentation">
                  <button
                    class="nav-link active"
                    id="home-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#home"
                    type="button"
                    role="tab"
                    aria-controls="home"
                    aria-selected="true"
                  >
                    Default
                  </button>
                </li>
                <li class="nav-item" role="presentation">
                  <button
                    class="nav-link"
                    id="profile-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#profile"
                    type="button"
                    role="tab"
                    aria-controls="profile"
                    aria-selected="false"
                  >
                    Mobile
                  </button>
                </li>
              </ul>
              <div class="tab-content" id="myTabContent">
                <div
                  class="tab-pane fade show active"
                  id="home"
                  role="tabpanel"
                  aria-labelledby="home-tab"
                >
                  <span className="d-block fw-bold mt-2 mb-3">
                    Configuration de galerie
                  </span>
                  <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">
                      Theme
                    </label>
                    <select
                      class="form-select"
                      aria-label="Default select example"
                      value={config["gallery_theme"]}
                      onChange={(e) => {
                        changeTheme(e.target.value);
                      }}
                    >
                      <option value="slider">Slider</option>
                      <option value="carousel">Carrousel</option>
                      <option value="tiles">Carrelage</option>
                      <option value="tilesgrid">Carrelage grid</option>
                      <option value="grid">Grid</option>
                      <option value="compact">Compact</option>
                    </select>
                  </div>
                  <div
                    className={
                      " d-flex justify-content-between align-items-center mb-3 mt-3 ombreConfig"
                    }
                  >
                    <label
                      className="form-check-label w-75"
                      htmlFor="isActivetablet"
                    >
                      Afficher les icons
                    </label>
                    <div className="form-check form-switch w-25 justify-content-end p-0">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={"isActivetablet"}
                        name={"isActivetablet"}
                        checked={config["tile_enable_icons"] == "true"}
                        onChange={(e) => {
                          updateConfig(
                            "tile_enable_icons",
                            e.target.checked.toString()
                          );
                        }}
                      />
                    </div>
                  </div>
                  <div
                    className={
                      " d-flex justify-content-between align-items-center mb-3 mt-3 ombreConfig"
                    }
                  >
                    <label
                      className="form-check-label w-75"
                      htmlFor="isActivetablet"
                    >
                      Lien d'image
                    </label>
                    <div className="form-check form-switch w-25 justify-content-end p-0">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={"isActivetablet"}
                        name={"isActivetablet"}
                        checked={config["tile_as_link"] == "true"}
                        onChange={(e) => {
                          updateConfig(
                            "tile_as_link",
                            e.target.checked.toString()
                          );
                        }}
                      />
                    </div>
                  </div>
                  <div
                    className={
                      " d-flex justify-content-between align-items-center mb-3 mt-3 ombreConfig"
                    }
                  >
                    <label
                      className="form-check-label w-75"
                      htmlFor="isActivetablet"
                    >
                      Afficher le titre
                    </label>
                    <div className="form-check form-switch w-25 justify-content-end p-0">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={"isActivetablet"}
                        name={"isActivetablet"}
                        checked={config["tile_enable_textpanel"] == "true"}
                        onChange={(e) => {
                          updateConfig(
                            "tile_enable_textpanel",
                            e.target.checked.toString()
                          );
                        }}
                      />
                    </div>
                  </div>
                  <div
                    className={
                      config["tile_enable_textpanel"] == "true"
                        ? " d-block"
                        : "d-none"
                    }
                  >
                    <div className="d-flex justify-content-between align-items-center mb-3 mt-3 ombreConfig">
                      <label
                        className="form-check-label w-75"
                        htmlFor="isActivetablet"
                      >
                        Position de titre
                      </label>
                      <select
                        class="form-select"
                        aria-label="Default select example"
                        value={config["tile_textpanel_position"]}
                        onChange={(e) => {
                          updateConfig(
                            "tile_textpanel_position",
                            e.target.value.toString()
                          );
                        }}
                      >
                        <option value="inside_bottom">intérieur en bas</option>
                        <option value="inside_top">intérieur en haut</option>
                        <option value="bottom">en bas</option>
                        <option value="top"> en haut</option>
                      </select>
                    </div>
                    <TextStylingComponent
                      key={"galerietext"}
                      for={"galerietext"}
                      editor={props.editor}
                      siteId={props.siteId}
                      config={configTitleText}
                      setConfig={changeTextConfig}
                    />

                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <div className="blockTitle m-2">
                        Couleur d'arrière-plan
                      </div>
                      <ColorConfig
                        key={"galeriebg"}
                        for={"galeriebg"}
                        editor={props.editor}
                        siteId={props.siteId}
                        config={configTitlBgColor}
                        setConfig={changeTitleBgColor}
                      />
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <div className="blockTitle m-2">Padding de titre</div>
                      <div className="d-flex justify-content-end align-items-center">
                        <div className="input-with-label-pixel">
                          <input
                            type="number"
                            min="0"
                            step="1"
                            value={config["tile_textpanel_padding_top"]}
                            onChange={(e) => {
                              updateConfig(
                                "tile_textpanel_padding_top",
                                e.target.value
                              );
                            }}
                            className="radius-input d-block"
                          />
                        </div>
                        <div className="input-with-label-pixel">
                          <input
                            type="number"
                            min="0"
                            step="1"
                            value={config["tile_textpanel_padding_bottom"]}
                            onChange={(e) => {
                              updateConfig(
                                "tile_textpanel_padding_bottom",
                                e.target.value
                              );
                            }}
                            className="radius-input d-block"
                          />
                        </div>
                        <div className="input-with-label-pixel">
                          <input
                            type="number"
                            min="0"
                            step="1"
                            value={config["tile_textpanel_padding_right"]}
                            onChange={(e) => {
                              updateConfig(
                                "tile_textpanel_padding_right",
                                e.target.value
                              );
                            }}
                            className="radius-input d-block"
                          />
                        </div>
                        <div className="input-with-label-pixel">
                          <input
                            type="number"
                            min="0"
                            step="1"
                            value={config["tile_textpanel_padding_left"]}
                            onChange={(e) => {
                              updateConfig(
                                "tile_textpanel_padding_left",
                                e.target.value
                              );
                            }}
                            className="radius-input d-block"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="tab-pane fade"
                  id="profile"
                  role="tabpanel"
                  aria-labelledby="profile-tab"
                >
                  <IconConfig
                    key={"btnIcongallery"}
                    label=" Changer l'icon du navigation"
                    siteId={props.siteId}
                    config={IconRight}
                    setConfig={changeIconRight}
                  />
                </div>
              </div>
            </div>
            <div
              className={
                items && items.length > 0 && selected != null
                  ? "col-4 p2"
                  : "d-none"
              }
            >
              <span className="d-flex align-items-center fw-bold mb-3">
                <i
                  class="fas fa-arrow-circle-left back-icon"
                  onClick={(e) => {
                    setSelected(null);
                  }}
                ></i>{" "}
                Configuration d'image
              </span>

              <div class="mb-3">
                <div
                  class={
                    config["tile_as_link"] == "true"
                      ? "form-group mb-3"
                      : "d-none"
                  }
                >
                  <label for="exampleFormControlInput1">Lien d'élément :</label>

                  <select
                    className="form-select"
                    aria-label="Default select example"
                    value={selected && "url" in selected ? selected.url : ""}
                    onChange={(e) =>
                      updateItem(selected._id, "url", e.target.value)
                    }
                  >
                    <option value="">Vide</option>
                    {pages.map((p) => {
                      return <option value={p.url}>{p.title}</option>;
                    })}
                  </select>
                </div>
                <div class="form-group mb-3">
                  <label for="exampleFormControlInput1">
                    Titre d'élément :
                  </label>
                  <input
                    type="text"
                    value={selected?.title}
                    onChange={(e) =>
                      updateItem(selected._id, "title", e.target.value)
                    }
                    class="form-control"
                    id="tite"
                    placeholder="Title"
                  />
                </div>
                {/*                 <div class="form-group mb-3">
                  <label for="exampleFormControlInput1">
                    Description d'élément :
                  </label>
                  <textarea
                    class="form-control"
                    id="exampleFormControlTextarea1"
                    rows="5"
                    value={selected?.description}
                    onChange={(e) =>
                      updateItem(selected._id, "description", e.target.value)
                    }
                  ></textarea>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
