import axios from "axios";
import { fromBlob } from "image-resize-compress";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import Dropzone from "react-dropzone";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import "./Modaslider.css";
import { v4 as uuidv4 } from "uuid";
import editor from "../../../../../redux/features/editor";
export default function Modaslider(props) {
  const [show, setShow] = useState(true);
  const [items, setItems] = useState([]);
  const openModal = () => {
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
  };
  const [media, setMedia] = useState([]);
  const [imageDimensions, setImageDimensions] = useState({
    height: "?",
    width: "?",
  });
  const [selected, setSelected] = useState(null);

  const loadImage = (imageUrl) => {
    const img = new Image();
    img.src = imageUrl;

    img.onload = () => {
      setImageDimensions({
        height: img.height,
        width: img.width,
      });
    };
    img.onerror = (err) => {
      setImageDimensions({
        height: "?",
        width: "?",
      });
    };
  };
  const DeleteImg = async (item) => {
    if (selected != null && item.src == selected.src) setSelected(null);
    await axios
      .delete(process.env.REACT_APP_API_URL + "/medias/delete/" + item._id)
      .then((response) => {
        setMedia(response.data.data);
      });
  };
  const updateImg = async (type, value) => {
    let cmp = props.editor.getSelected();
    if (cmp.get("type") != "slidersType") {
      cmp = cmp.closest("div.sliders-gjs");
    }
    const id = cmp.getAttributes().id;
    let s = selected;
    if (type == "title") {
      s.title = value;
    }
    if (type == "tags") {
      s.tags = value;
    }
    setSelected(s);
    let itemsList = items;
    const objWithIdIndex = itemsList.findIndex((x) => x._id == s._id);
    if (objWithIdIndex > -1) {
      itemsList[objWithIdIndex] = s;
    }
    setItems(itemsList);
    await axios
      .post(
        process.env.REACT_APP_API_URL + "/plugins/updateoptionbyref/" + id,
        {
          items: itemsList,
        }
      )
      .then(async (response) => {
        setItems(response.data.data.options.items);
      });
  };

  const getItems = async () => {
    let cmp = props.editor.getSelected();
    if (cmp.get("type") != "slidersType") {
      cmp = cmp.closest("div.sliders-gjs");
    }
    const id = cmp.getAttributes().id;
    await axios
      .get(process.env.REACT_APP_API_URL + "/plugins/getbyref/" + id)
      .then((response) => {
        setItems(response.data.data.options.items);
      });
  };
  const getMedia = async () => {
    await axios
      .get(process.env.REACT_APP_API_URL + "/medias/getmedia/" + props.siteId)
      .then((response) => {
        setMedia(response.data.data);
      });
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
        setMedia(response.data.data);
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
          progress: undefined,
        });
      });
  };
  const removeItem = async (file) => {
    let n = items;
    const objWithIdIndex = n.findIndex((x) => x._id == file._id);

    if (objWithIdIndex > -1) {
      delete n[objWithIdIndex];
      var filtered = n.filter(function (el) {
        return el != null;
      });

      setItems(filtered);
    }
  };
  const addItem = async (file) => {
    let s = items;
    const x = items.filter((x) => x._id == file._id);
    if (x.length == 0) {
      setItems([...items, file]);
      s.push(file);
    }
    updateItems(s);
  };
  const updateItems = async (it) => {
    let cmp = props.editor.getSelected();
    if (cmp.get("type") != "slidersType") {
      cmp = cmp.closest("div.sliders-gjs");
    }
    const id = cmp.getAttributes().id;
    await axios
      .post(
        process.env.REACT_APP_API_URL + "/plugins/updateoptionbyref/" + id,
        {
          items: it,
        }
      )
      .then(async (response) => {});
  };

  useEffect(() => {
    let cmp = props.editor.getSelected();
    if (cmp.get("type") != "slidersType") {
      cmp = cmp.closest("div.sliders-gjs");
      props.editor.select(cmp);
    }
    const id = cmp.getAttributes().id;

    let content = ``;
    if (items.length != 0) {
      axios
        .post(process.env.REACT_APP_API_URL + "/plugins/updateoption/", {
          ref: id,
          options: {
            items: items,
          },
        })
        .then((response) => {});
      let inner = cmp.find("div.carousel-inner")[0];
      let itemslist = cmp.find("div.carousel-item");

      items.map((item, i) => {
        let cap = [];
        if (itemslist[i]) {
          cap = itemslist[i].find("div.captionslider");
        }

        let caption = ``;
        if (cap.length > 0) {
          caption = cap[0].toHTML();
          let Css = props.editor.CodeManager.getCode(cap[0], "css", {
            cssc: props.editor.CssComposer,
          });
          caption += `<style>${Css}</style>`;
        }
        let classess = "";
        if (i == 0) {
          classess = "carousel-item  active";
        } else {
          classess = "carousel-item ";
        }
        content += `<div id="item-${uuidv4()}" class="${classess}" data-gjs-editable="true"  > 
        <div class="slider-item" style="background:url(${
          item.src
        })no-repeat; background-size: cover;    background-position:center center;   background-repeat: no-repeat;   min-height: 730px;" ></div>
      ${caption}
        </div>`;
      });

      inner.components(content);
      cmp.view.updateScript();
      cmp.view.render();
    }
  }, [items]);
  useEffect(() => {
    if (selected != null) {
      loadImage(selected.src);
    }
  }, [selected]);
  useEffect(() => {
    getMedia();
    getItems();
  }, []);
  return (
    <div id="modalsliders">
      <Modal
        show={show}
        onHide={handleClose}
        id="ModalAddSlid"
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Slider medias</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-4">
              <Dropzone onDrop={(acceptedFiles) => UploadMedia(acceptedFiles)}>
                {({ getRootProps, getInputProps }) => (
                  <section>
                    <div {...getRootProps()} className="drop-zone">
                      <input {...getInputProps()} />

                      <p>Déposez votre fichiers ici</p>
                    </div>
                  </section>
                )}
              </Dropzone>
              <span className="d-block text-bold mb-3">
                Bibliotheque d'images ( {media ? media.length : 0} )
              </span>
              {media && media.length > 0 ? (
                <div className="d-flex justify-content-center align-align-items-center flex-wrap biblio_list">
                  {media.map((file) => {
                    return (
                      <div
                        className="position-relative sliders-item"
                        key={file._id}
                      >
                        <img
                          src={file.src}
                          className="thumbnails"
                          onClick={(e) => addItem(file)}
                        />
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
                Slider d'images ( {items ? items.length : 0} )
              </span>
              {items && items.length > 0 ? (
                <div className="d-flex justify-content-center align-align-items-center flex-wrap slider_list">
                  {items.map((file) => {
                    return (
                      <div
                        className="position-relative sliders-item"
                        key={file._id}
                      >
                        <img
                          src={file.src}
                          className="thumbnails"
                          onClick={(e) => setSelected(file)}
                        />
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
            <div className="col-4 ">
              {selected ? (
                <div>
                  <div className="fs-3 fw-bold mb-3">Info</div>
                  <div className="d-flex justify-content-start align-items-center mb-3">
                    <div className="me-3">Extension : </div>
                    <div> {" " + selected.extension}</div>
                  </div>
                  <div className="d-flex justify-content-start align-items-center mb-3">
                    <div className="me-3">Largeur : </div>
                    <div> {" " + imageDimensions.width} px</div>
                  </div>
                  <div className="d-flex justify-content-start align-items-center mb-3">
                    <div className="me-3">Hauteur : </div>
                    <div> {" " + imageDimensions.height} px</div>
                  </div>
                  <div className="d-flex justify-content-start align-items-center mb-3">
                    <div className="me-3">Taille : </div>
                    <div> {" " + selected.size} MB</div>
                  </div>
                  <div className="fs-3 fw-bold mb-3">Edit</div>
                  <div class="form-group">
                    <label for="exampleFormControlInput1">
                      Titre d'élément :
                    </label>
                    <input
                      type="text"
                      value={selected.title}
                      onChange={(e) => updateImg("title", e.target.value)}
                      class="form-control"
                      id="tite"
                      placeholder="Title"
                    />
                  </div>
                </div>
              ) : (
                <p className="">Acune élément est sélectioné</p>
              )}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
