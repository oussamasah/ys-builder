import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { fromBlob } from "image-resize-compress";
import multimedia from "../../../../assets/MediaEntreprise/multimedia.png";

import { useParams } from "react-router-dom";
import "./ImgEntreprise.css";
import Dropzone from "react-dropzone";
import { v4 as uuidv4 } from "uuid";
import Select from "react-select";
export default function ImgEntreprise(props) {
  let { siteId } = useParams();
  const [media, setMedia] = useState([]);
  const [selected, setSelected] = useState(null);
  const [items, setItems] = useState([]);
  const [Suggestiontags, setSuggestiontags] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  
  const [imageDimensions, setImageDimensions] = useState({
    height: "?",
    width: "?",
  });
  const getMedia = async () => {
    await axios
      .get(process.env.REACT_APP_API_URL + "/medias/getmedia/" + siteId)
      .then((response) => {
        setMedia(response.data.data);
      });
  };
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

  const handleBlob = async (blobFile, file) => {
    if (blobFile.type == "video/mp4") {
      return blobFile;
    } else {
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
    }
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
        process.env.REACT_APP_API_URL + "/medias/upload/" + siteId,
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
  const DeleteImg = async (item) => {
    if (selected != null && item.src == selected.src) setSelected(null);
    await axios
      .delete(process.env.REACT_APP_API_URL + "/medias/delete/" + item._id)
      .then((response) => {
        setMedia(response.data.data);
      });
  };
  const updateItems = async (it) => {
    const el = props.editor.getSelected().getAttributes().id;
    await axios
      .post(
        process.env.REACT_APP_API_URL + "/plugins/updateoptionbyref/" + el,
        {
          items: it,
        }
      )
      .then(async (response) => {
        let itms = response.data.data.options.items;
        itms?.map((item) => {
          if (item.tags) {
            item.tags.map((tag) => {
              let t = Suggestiontags;
              t.push(tag);
              setSuggestiontags(t);
            });
          }
        });
      });
  };

  const handleSearchChange = (event) => {
    const { value } = event.target;
    setSearchQuery(value);

    // Perform the search and update the searchResults state
    const filteredData = media.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    setMedia(filteredData);
  };

  const restInput = () => {
    setSearchQuery("");
    getMedia();
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
  const hasMediaEffectRun = useRef(false);
  useEffect(() => {
    const fetchData = async () => {
      if (!hasMediaEffectRun.current) {
        hasMediaEffectRun.current = true;
        await getMedia();
      }
    };
  
    fetchData();
  }, [siteId]);
  useEffect(() => {
    if (selected != null) {
      loadImage(selected.src);
    }
  }, [selected]);
  return (
    <div id="ImgEntreprise">
      <div className="form-group mt-3">
        <span className="test-aide"></span>
      </div>
      <div className="col-12">
        <Dropzone onDrop={(acceptedFiles) => UploadMedia(acceptedFiles)}>
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps()} className="drop-zone">
                <input {...getInputProps()} />

                <p>Déposez votre image ici</p>
              </div>
            </section>
          )}
        </Dropzone>
        <span className="d-block text-bold mb-3">
          Bibliotheque d'images & video ( {media ? media.length : 0} )
        </span>
        <div className="input-group serash-media mb-3">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Recherche media..."
            className="form-control "
          />
          <button onClick={restInput} className="iclosed" type="reset">
            &times;
          </button>
        </div>
        {media && media.length > 0 ? (
          <div className="d-flex justify-content-center align-align-items-center flex-wrap biblio_list dropdown">
            {media.map((file) => {
              return (
                <div
                  className="position-relative gallery-item "
                  onClick={(e) => setSelected(file)}
                  key={file._id}
                >
                  <a
                    class=""
                    data-bs-toggle="collapse"
                    href="#collapseExample"
                    role="button"
                    aria-expanded="false"
                    aria-controls="collapseExample"
                  >
                    {file.extension == "mp4" ? (
                      <img src={multimedia} className="thumbnails" />
                    ) : (
                      <img src={file.src} className="thumbnails" />
                    )}

                    <i
                      className={
                        selected != null && file._id == selected._id
                          ? "fal fa-check-circle"
                          : "d-none"
                      }
                    ></i>
                  </a>
                  <div
                    className="position-relative gallery-item"
                    key={file._id}
                  ></div>

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

      {selected ? (
        <div class="collapse" id="collapseExample">
          <div className="d-flex justify-content-center align-items-center mb-2">
            <div className="me-3 mt-3">
              {" "}
              {selected.extension == "mp4" ? (
                <img src={multimedia} className="thumbnails info" />
              ) : (
                <img src={selected.src} className="thumbnails info" />
              )}
            </div>
          </div>
          <div className="infationmedia">
            <div className="d-flex mb-2">
              <div className="me-3 titleInfo">Titre : </div>
              <div className="me-3 valueInfo">
                <span
                  data-toggle="tooltip"
                  data-placement="top"
                  title={" " + selected.name}
                >
                  {" " + selected.name}{" "}
                </span>
              </div>
            </div>
            <div className=" d-flex mb-2">
              <div className="me-3 titleInfo">Extension : </div>
              <div className="me-3 valueInfo"> {" " + selected.extension}</div>
            </div>
            {selected.categorie == "video" ? (
              ""
            ) : (
              <>
                <div className=" d-flex mb-2">
                  <div className="me-3 titleInfo">Largeur : </div>
                  <div className="me-3 valueInfo">
                    {" "}
                    {" " + imageDimensions.width} px
                  </div>
                </div>
                <div className=" d-flex mb-2">
                  <div className="me-3 titleInfo">Hauteur : </div>
                  <div className="me-3 valueInfo">
                    {" "}
                    {" " + imageDimensions.height} px
                  </div>
                </div>
              </>
            )}

            <div className=" d-flex mb-2">
              <div className="me-3 titleInfo">Url : </div>
              <div className="me-3 valueInfo"> {" " + selected.src} </div>
            </div>
          </div>{" "}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
