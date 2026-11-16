import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import DropZone from "react-drop-zone";

import { blobToURL, urlToBlob, fromBlob, fromURL } from "image-resize-compress";
import imgUpload from "../../assets/MediaLibrary/upload.gif";
import "./MediaLibrarys.css";
import toast, { Toaster } from "react-hot-toast";
function MediaLibrarys(props) {
  const handleClose = () => setShow(false);
  const [show, setShow] = useState(false);
  const supModal = () => {
    setShow(true);
  };
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [media, setMedia] = useState({ local: [], free: [], premium: [] });

  const DeleteImg = async (item) => {
    if (item.path == selected) setSelected(null);
    await axios
      .delete(process.env.REACT_APP_API_URL + "/medias/delete/" + item._id)
      .then((response) => {
        setMedia(response.data.data);
      });
  };
  const getMedia = async () => {
    await axios
      .get(process.env.REACT_APP_API_URL + "/medias/getmedia/" + props.siteId)
      .then((response) => {
        setMedia(response.data.data);
      });
  };
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
  const UploadMedia = async (data, type, elmnt) => {
    if (elmnt) {
      elmnt.innerHTML = `
      <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
      En cours...
    `;
    }
    const file = await handleBlob(data, type);

    const formData = new FormData();

    formData.append("files[]", file);
    if (type != "file") {
      formData.append("ref", data._id);
    }

    await axios
      .post(
        process.env.REACT_APP_API_URL + "/medias/upload/" + props.siteId,
        formData
      )
      .then((response) => {
        if (elmnt) {
          elmnt.innerHTML = `
          <i class="fal fa-badge-check"></i>
          Exist déja
        `;
        }
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
  useEffect(() => {}, [media, selected]);
  useEffect(() => {
    getMedia();
  }, []);
  return (
    <>
      <span className="btnAddImg" id="btnAddImg" onClick={(e) => supModal()}>
        Charger une image
      </span>

      <Modal
        show={show}
        onHide={handleClose}
        id="ModalAddImg"
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Bibliothèque media</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-4 position-relative">
              <div className="addImge">
                <DropZone
                  onDrop={(file, text) => UploadMedia(file, "file", null)}
                  multiple={false}
                >
                  {({ over, overDocument }) => (
                    <div className="drop-zone">
                      <span>Déposez vos fichiers média ici</span>
                    </div>
                  )}
                </DropZone>
              </div>
            </div>
            <div className="col-8 ">
              <ul
                class="nav nav-pills mb-3 image-tabs"
                id="pills-tab"
                role="tablist"
              >
                <li class="nav-item" role="presentation">
                  <button
                    class="nav-link active"
                    id="pills-image-du-site-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-image-du-site"
                    type="button"
                    role="tab"
                    aria-controls="pills-image-du-site"
                    aria-selected="true"
                  >
                    Images du site
                  </button>
                </li>
                <li class="nav-item" role="presentation">
                  <button
                    class="nav-link"
                    id="pills-gratuit-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-gratuit"
                    type="button"
                    role="tab"
                    aria-controls="pills-gratuit"
                    aria-selected="false"
                  >
                    Images gratuits
                  </button>
                </li>
                <li class="nav-item" role="presentation">
                  <button
                    class="nav-link"
                    id="pills-premium-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-premium"
                    type="button"
                    role="tab"
                    aria-controls="pills-premium"
                    aria-selected="false"
                  >
                    Images premium
                  </button>
                </li>
              </ul>
              <input
                class="form-control form-control-sm searchImage"
                name={"search"}
                type="text"
                placeholder="Chercher une image ..."
                aria-label=".form-control-sm example"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <div class="tab-content listImage" id="pills-tabContent">
                <div
                  class="tab-pane active  show "
                  id="pills-image-du-site"
                  role="tabpanel"
                  aria-labelledby="pills-image-du-site-tab"
                >
                  <div className=" ListeImage">
                    {media.local.map((item, index) => {
                      return (
                        <>
                          <div
                            key={item._id + props.from}
                            className={
                              search != "" && item.name.indexOf(search) > -1
                                ? "detailleImg"
                                : search == ""
                                ? "detailleImg"
                                : "d-none"
                            }
                          >
                            <input
                              type={"radio"}
                              value={item.path}
                              name="file"
                              className="MediaInput"
                              id={"image-" + index}
                              checked={selected == item.path}
                              onChange={(e) => {
                                setSelected(e.target.value);
                              }}
                            />
                            <label
                              className="labelImg"
                              htmlFor={"image-" + index}
                              style={{
                                backgroundImage: `url("${
                                  process.env.REACT_APP_MEDIA_URL + item.path
                                }")`,
                                backgroundSize: "contain",
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                              }}
                            >
                              <div
                                className={
                                  selected == item.path
                                    ? "checkedImg"
                                    : "d-none"
                                }
                              >
                                <i class="fal fa-check-circle"></i>
                              </div>
                            </label>
                            <div
                              className="deleteImg"
                              onClick={(e) => DeleteImg(item)}
                            >
                              <i class="fa fa-trash" aria-hidden="true"></i>
                            </div>
                          </div>
                        </>
                      );
                    })}
                  </div>
                </div>
                <div
                  class="tab-pane"
                  id="pills-gratuit"
                  role="tabpanel"
                  aria-labelledby="pills-gratuit-tab"
                >
                  <div className=" ListeImage">
                    {media.free.map((item, index1) => (
                      <div
                        key={item._id}
                        htmlFor={"image-" + index1}
                        className={
                          search != "" && item.name.indexOf(search) > -1
                            ? "detailleImg"
                            : search == ""
                            ? "detailleImg"
                            : "d-none"
                        }
                        style={{
                          backgroundImage: `url("${
                            process.env.REACT_APP_MEDIA_URL + item.path
                          }")`,
                          backgroundSize: "contain",
                          backgroundPosition: "center",
                        }}
                      >
                        <div className="downloadOverlay">
                          {media.local.find((x) => x.ref == item._id) ==
                          undefined ? (
                            <button
                              className="btn btn-outline-warning "
                              type="button"
                              onClick={(e) => {
                                UploadMedia(item, "url", e.target);
                              }}
                            >
                              <i class="fal fa-cloud-download"></i> Télécharger
                            </button>
                          ) : (
                            <button
                              className="btn btn-outline-warning "
                              type="button"
                              disabled={true}
                            >
                              <i class="fal fa-badge-check"></i> Existe Déja
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div
                  class="tab-pane"
                  id="pills-premium"
                  role="tabpanel"
                  aria-labelledby="pills-premium-tab"
                >
                  <div className=" ListeImage">
                    {media.premium.map((item, index2) => (
                      <div
                        key={item._id + props.from}
                        htmlFor={"image-" + index2}
                        className={
                          search != "" && item.name.indexOf(search) > -1
                            ? "detailleImg"
                            : search == ""
                            ? "detailleImg"
                            : "d-none"
                        }
                        style={{
                          backgroundImage: `url("${
                            process.env.REACT_APP_MEDIA_URL + item.path
                          }")`,
                          backgroundSize: "contain",
                          backgroundPosition: "center",
                        }}
                      >
                        <div className="downloadOverlay">
                          {media.local.find((x) => x.ref == item._id) ==
                          undefined ? (
                            <button
                              className="btn btn-outline-warning "
                              type="button"
                              onClick={(e) => {
                                UploadMedia(item, "url", e.target);
                              }}
                            >
                              <i class="fal fa-cloud-download"></i> Télécharger
                            </button>
                          ) : (
                            <button
                              className="btn btn-outline-warning "
                              type="button"
                              disabled={true}
                            >
                              <i class="fal fa-badge-check"></i> Existe Déja
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fermer
          </Button>
          <Button
            variant="primary"
            onClick={(e) => {
              props.changeImage(selected);
              handleClose();
            }}
            disabled={selected == null ? true : false}
          >
            Valider
          </Button>
        </Modal.Footer>
      </Modal>
      <Toaster />
    </>
  );
}

export default MediaLibrarys;
