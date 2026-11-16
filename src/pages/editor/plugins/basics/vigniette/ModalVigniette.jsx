import axios from "axios";
import { fromBlob } from "image-resize-compress";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import Dropzone from "react-dropzone";
import { toast } from "react-hot-toast";

import "./ModalVigniette.css";
import { v4 as uuidv4 } from "uuid";
import { SketchPicker } from "react-color";
export default function ModalVigniette(props) {
  const [show, setShow] = useState(true);
  const [items, setItems] = useState([]);
  const [effet, setEffet] = useState("effect-lily");
  const [link, setLink] = useState("#");
  const [isActivePalette, setActivepalette] = useState(false);
  const [isActivePalette2, setActivepalette2] = useState(false);
  const [isActivePalette3, setActivepalette3] = useState(false);
  const [blockPickerColor, setBlockPickerColor] = useState({
    rgbTxt: "",
    rgb: {
      r: 51,
      g: 51,
      b: 51,
      a: 1,
    },
  });
  const [blockPickerColor2, setBlockPickerColor2] = useState({
    rgbTxt: "",
    rgb: {
      r: 51,
      g: 51,
      b: 51,
      a: 1,
    },
  });
  const [blockPickerColor3, setBlockPickerColor3] = useState({
    rgbTxt: "",
    rgb: {
      r: 51,
      g: 51,
      b: 51,
      a: 1,
    },
  });
  const getPrimaryColor = () => {
    if (isActivePalette === true) {
      setActivepalette(false);
    } else {
      setActivepalette(true);
    }
  };
  const getPrimaryColor2 = () => {
    if (isActivePalette2 === true) {
      setActivepalette2(false);
    } else {
      setActivepalette2(true);
    }
  };
  const getPrimaryColor3 = () => {
    if (isActivePalette3 === true) {
      setActivepalette3(false);
    } else {
      setActivepalette3(true);
    }
  };
  const changeColor = (color) => {
    setBlockPickerColor({
      rgbTxt:
        "rgb(" +
        color.rgb.r +
        ", " +
        color.rgb.g +
        ", " +
        color.rgb.b +
        "," +
        color.rgb.a +
        ")",
      rgb: color.rgb,
    });
  };
  const changeColor2 = (color) => {
    setBlockPickerColor2({
      rgbTxt:
        "rgb(" +
        color.rgb.r +
        ", " +
        color.rgb.g +
        ", " +
        color.rgb.b +
        "," +
        color.rgb.a +
        ")",
      rgb: color.rgb,
    });
  };
  const changeColor3 = (color) => {
    setBlockPickerColor3({
      rgbTxt:
        "rgb(" +
        color.rgb.r +
        ", " +
        color.rgb.g +
        ", " +
        color.rgb.b +
        "," +
        color.rgb.a +
        ")",
      rgb: color.rgb,
    });
  };
  const rgbtoJson = (rgbString) => {
    var s = rgbString;
    s = s.replace("rgb(", "");
    s = s.replace(")", "");
    let c = s.split(",");
    return { r: c[0], g: c[1], b: c[2], a: c[3] };
  };
  const openModal = () => {
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
  };
  const handleClosePalette = () => {
    setActivepalette(false);
  };
  const handleClosePalette2 = () => {
    setActivepalette2(false);
  };
  const handleClosePalette3 = () => {
    setActivepalette3(false);
  };
  const [media, setMedia] = useState([]);
  const [imageDimensions, setImageDimensions] = useState({
    height: "?",
    width: "?",
  });
  const [selected, setSelected] = useState(null);
  const optionsList = [
    { value: "effect-lily", name: "Lily" },
    { value: "effect-sadie", name: "Sadie" },
    { value: "effect-honey", name: "Honey" },
    { value: "effect-layla", name: "Layla" },
    { value: "effect-zoe", name: "Zoe" },
    { value: "effect-oscar", name: "Oscar" },
    { value: "effect-marley", name: "Marley" },
    { value: "effect-marley", name: "Marley" },
    { value: "effect-ruby", name: "Ruby" },
    { value: "effect-roxy", name: "Roxy" },
    { value: "effect-bubba", name: "Bubba" },
    { value: "effect-romeo", name: "Romeo" },
    { value: "effect-dexter", name: "Dexter" },
    { value: "effect-sarah", name: "Sarah" },
    { value: "effect-chico", name: "Chico" },
    { value: "effect-milo", name: "Milo" },
    { value: "effect-julia", name: "Julia" },
    { value: "effect-goliath", name: "Goliath" },
    { value: "effect-selena", name: "Selena" },
    { value: "effect-apollo", name: "Apollo" },
    { value: "effect-phoebe", name: "Phoebe" },
    { value: "effect-steve", name: "Steve" },
    { value: "effect-moses", name: "Moses" },
    { value: "effect-jazz", name: "Jazz" },
    { value: "effect-duke", name: "Duke" },
    { value: "effect-ming", name: "Ming" },
    { value: "effect-lexi", name: "Lexi" },
  ];
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
      console.error(err);
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
  const updateImg = async () => {
    toast.loading("Mise à jour en cours");
    let id = props.editor.getSelected().getAttributes()["data-ref"];
    let s = selected;
    s["effet"] = effet;
    s["link"] = link;
    s["background"] = blockPickerColor.rgbTxt;
    s["colorTitre"] = blockPickerColor2.rgbTxt;
    s["colorDesc"] = blockPickerColor3.rgbTxt;
    // console.log(effet);
    // console.log(s);
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
        let itms = response.data.data.options.items;
        toast.dismiss();
        toast.success("Mise à jour est terminé");
      });
  };

  const getItems = async () => {
    let id = props.editor.getSelected().getAttributes()["data-ref"];
    await axios
      .get(process.env.REACT_APP_API_URL + "/plugins/getbyref/" + id)
      .then((response) => {
        if (
          response.data.data.options &&
          response.data.data.options.items.length > 0
        ) {
          setItems(response.data.data.options.items);
        }
        if (
          response.data.data.options.items &&
          response.data.data.options.items.length > 0 &&
          response.data.data.options.items[0].effet
        ) {
          setEffet(response.data.data.options.items[0].effet);
        }
        if (
          response.data.data.options.items &&
          response.data.data.options.items.length > 0 &&
          response.data.data.options.items[0].link
        ) {
          setEffet(response.data.data.options.items[0].link);
        }
        if (
          response.data.data.options.items &&
          response.data.data.options.items.length > 0 &&
          response.data.data.options.items[0].background
        ) {
          setBlockPickerColor({
            rgbTxt: response.data.data.options.items[0].background,
            rgb: rgbtoJson(response.data.data.options.items[0].background),
          });
        }
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
    toast.loading("Téléchargement en cours");
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
        toast.dismiss();
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
        toast.dismiss();
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
    let s = [];
    file["effet"] = effet;
    file["link"] = link;
    file["background"] = blockPickerColor.rgbTxt;
    file["colorTitre"] = blockPickerColor2.rgbTxt;
    file["colorDesc"] = blockPickerColor3.rgbTxt;

    const x = items.filter((x) => x._id == file._id);
    if (x.length == 0) {
      setItems([file]);
      s.push(file);
    }
    updateItems(s);
  };
  const updateItems = async (it) => {
    it["effet"] = effet;
    it["link"] = link;
    it["background"] = blockPickerColor.rgbTxt;
    it["colorTitre"] = blockPickerColor2.rgbTxt;
    it["colorDesc"] = blockPickerColor3.rgbTxt;
    console.log(it);
    const el = props.editor.getSelected().getAttributes()["data-ref"];
    await axios
      .post(
        process.env.REACT_APP_API_URL + "/plugins/updateoptionbyref/" + el,
        {
          items: it,
        }
      )
      .then(async (response) => {});
  };

  useEffect(() => {
    const cmp = props.editor.getSelected();

    let mediaList = items.map((i) => {
      return {
        url: i.src,
        titulo: i.title,
        description: i.description,
      };
    });
    let attr = cmp.getAttributes();

    if (items.length != 0) {
      axios
        .post(process.env.REACT_APP_API_URL + "/plugins/updateoption/", {
          ref: cmp.get("attributes")["data-ref"],
          options: {
            items: items,
          },
        })
        .then((response) => {
          let html = `<div class="grid" data-gjs-removable="false" data-gjs-draggable="false" data-gjs-droppable="false" data-gjs-copyable="false" >
          <a  data-gjs-removable="false" data-gjs-draggable="false" data-gjs-droppable="false" data-gjs-copyable="false" href="${response.data.data.options.items[0].link}">
					<figure data-gjs-removable="false" data-gjs-draggable="false" data-gjs-droppable="false" data-gjs-copyable="false" class="${response.data.data.options.items[0].effet}">
         
						<img  data-gjs-removable="false" data-gjs-draggable="false" data-gjs-droppable="false" data-gjs-copyable="false" src="${response.data.data.options.items[0].src}" alt="${response.data.data.options.items[0].title}">
						<figcaption data-gjs-removable="false" data-gjs-draggable="false" data-gjs-droppable="false" data-gjs-copyable="false">
         
							<div data-gjs-removable="false" data-gjs-draggable="false" data-gjs-droppable="false" data-gjs-copyable="false">
								<span  data-gjs-removable="false" data-gjs-draggable="false" data-gjs-droppable="false" data-gjs-copyable="false" class="caption-title">${response.data.data.options.items[0].title}</span>
								<p  data-gjs-removable="false" data-gjs-draggable="false" data-gjs-droppable="false" data-gjs-copyable="false">${response.data.data.options.items[0].description}</p>
							</div>
              
						</figcaption>		
           
					</figure>
          </a>	
				</div>`;
          cmp.components(html);
          let fig = cmp.find("figure");
          if (fig && fig.length > 0) {
            fig[0].setStyle({
              background: response.data.data.options.items[0].background,
            });
          }
          let spn = cmp.find("span");
          if (spn && spn.length > 0) {
            spn[0].setStyle({
              color: response.data.data.options.items[0].colorTitre,
            });
          }
          let p = cmp.find("p");
          if (p && p.length > 0) {
            p[0].setStyle({
              color: response.data.data.options.items[0].colorDesc,
            });
          }
          props.editor.setStyle(props.editor.getCss());
          cmp.view.render();
        });
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
    <div id="modalgallery">
      <Modal
        show={show}
        onHide={handleClose}
        id="ModalAddImg"
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Gallerie medias</Modal.Title>
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
                        className="position-relative gallery-item"
                        key={file._id}
                      >
                        <img
                          src={file.src + "?v=" + uuidv4()}
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
                Galerie d'images ( {items ? items.length : 0} )
              </span>
              {items && items.length > 0 ? (
                <div className="d-flex justify-content-center align-align-items-center flex-wrap gallery_list">
                  {items.map((file) => {
                    return (
                      <div
                        className="position-relative gallery-item"
                        key={file._id}
                      >
                        <img
                          src={file.src + "?v=" + uuidv4()}
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
                  <div class="form-group mb-2">
                    <label for="exampleFormControlInput1">Link :</label>
                    <input
                      type="text"
                      value={link}
                      onChange={(e) => setLink(e.target.value)}
                      class="form-control"
                      id="tite"
                      placeholder="Title"
                    />
                  </div>
                  <div class="d-flex align-items-end">
                    <div class="form-group mb-2 w-75">
                      <label for="exampleFormControlInput1">Effet :</label>
                      <select
                        onChange={(e) => setEffet(e.target.value)}
                        value={effet}
                        class="form-select form-control form-select-sm"
                        aria-label=".form-select-sm example"
                      >
                        {optionsList.map((op) => {
                          return <option value={op.value}>{op.name}</option>;
                        })}
                      </select>
                    </div>
                    <div class="form-group mt-3 w25">
                      <label for="exampleFormControlInput1">Background :</label>
                      <div className="inputColor  ms-1">
                        <div className="colorPreview" onClick={getPrimaryColor}>
                          <span
                            className="color-value"
                            style={{
                              background: blockPickerColor.rgbTxt,
                            }}
                          ></span>
                        </div>

                        {isActivePalette ? (
                          <div className="sketch-popeover">
                            <div
                              className="sketch-cover"
                              onClick={(e) => handleClosePalette()}
                            />
                            <SketchPicker
                              color={blockPickerColor.rgb}
                              onChangeComplete={(color) => changeColor(color)}
                            />
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <div class="d-flex align-items-end">
                    <div class="form-group w-75">
                      <label for="exampleFormControlInput1">
                        Titre d'élément :
                      </label>
                      <input
                        type="text"
                        value={selected.title ? selected.title : " "}
                        onChange={(e) =>
                          setSelected({ ...selected, title: e.target.value })
                        }
                        class="form-control"
                        id="tite"
                        placeholder="Title"
                      />
                    </div>
                    <div class="form-group mt-3 w-25">
                      <label for="exampleFormControlInput1">
                        Couleur de titre :
                      </label>
                      <div className="inputColor  ms-1">
                        <div
                          className="colorPreview"
                          onClick={getPrimaryColor2}
                        >
                          <span
                            className="color-value"
                            style={{
                              background: blockPickerColor2.rgbTxt,
                            }}
                          ></span>
                        </div>

                        {isActivePalette2 ? (
                          <div className="sketch-popeover">
                            <div
                              className="sketch-cover"
                              onClick={(e) => handleClosePalette2()}
                            />
                            <SketchPicker
                              color={blockPickerColor.rgb}
                              onChangeComplete={(color) => changeColor2(color)}
                            />
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <div class="d-flex align-items-end">
                    <div class="form-group mt-3 w-75 ">
                      <label for="exampleFormControlInput1">
                        Description :
                      </label>
                      <textarea
                        class="form-control"
                        id="exampleFormControlTextarea1"
                        rows="3"
                        value={
                          selected.description ? selected.description : " "
                        }
                        onChange={(e) =>
                          setSelected({
                            ...selected,
                            description: e.target.value,
                          })
                        }
                      ></textarea>
                    </div>
                    <div class="form-group mt-3 w-25">
                      <label for="exampleFormControlInput1">
                        Couleur du description :
                      </label>
                      <div className="inputColor  ms-1">
                        <div
                          className="colorPreview"
                          onClick={getPrimaryColor3}
                        >
                          <span
                            className="color-value"
                            style={{
                              background: blockPickerColor3.rgbTxt,
                            }}
                          ></span>
                        </div>

                        {isActivePalette3 ? (
                          <div className="sketch-popeover">
                            <div
                              className="sketch-cover"
                              onClick={(e) => handleClosePalette3()}
                            />
                            <SketchPicker
                              color={blockPickerColor3.rgb}
                              onChangeComplete={(color) => changeColor3(color)}
                            />
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>

                  <div class="form-group mt-3 ">
                    <button
                      class="btn btn-success"
                      onClick={(e) => updateImg()}
                    >
                      Mise à jour
                    </button>
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
