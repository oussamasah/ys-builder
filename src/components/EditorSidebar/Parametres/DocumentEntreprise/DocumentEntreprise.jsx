import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useParams } from "react-router-dom";
import formatpdf from "../../../../assets/DocEntreprise/formatpdf.png";
import word from "../../../../assets/DocEntreprise/word.png";
import csv from "../../../../assets/DocEntreprise/csv.png";
import "./DocumentEntreprise.css";
import Dropzone from "react-dropzone";
export default function DocumentEntreprise(props) {
  let { siteId } = useParams();
  const [document, setdocument] = useState([]);
  const [selected, setSelected] = useState(null);
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [Suggestiontags, setSuggestiontags] = useState([]);
  const [imageDimensions, setImageDimensions] = useState({
    height: "?",
    width: "?",
  });
  const getdocument = async () => {
    await axios
      .get(process.env.REACT_APP_API_URL + "/medias/getdocument/" + siteId)
      .then((response) => {
        setdocument(response.data.data);
      });
  };
  const Uploaddocument = async (data) => {
    let formData = new FormData();

    await Promise.all(
      data.map(async (element) => {
        const file = await element;

        formData.append("document", file);
      })
    );

    await axios
      .post(
        process.env.REACT_APP_API_URL + "/medias/uploaddocument/" + siteId,
        formData
      )

      .then((response) => {
        // console.log(response.data)
        setdocument(response.data.data);
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
      .delete(
        process.env.REACT_APP_API_URL + "/medias/deletedocument/" + item._id
      )
      .then((response) => {
        setdocument(response.data.data);
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
    const filteredData = document.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    setdocument(filteredData);
  };

  const restInput = () => {
    setSearchQuery("");
    getdocument();
  };

  const hasMediaEffectRun = useRef(false);
  useEffect(() => {
    const fetchData = async () => {
      if (!hasMediaEffectRun.current) {
        hasMediaEffectRun.current = true;
        await getdocument();
      }
    };

    fetchData();
  }, [siteId]);
  return (
    <div id="DocEntreprise">
      <div className="form-group mt-3">
        <span className="test-aide"></span>
      </div>
      <div className="col-12">
        <Dropzone onDrop={(acceptedFiles) => Uploaddocument(acceptedFiles)}>
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps()} className="drop-zone">
                <input {...getInputProps()} name="document" />

                <p>Déposez votre document ici</p>
              </div>
            </section>
          )}
        </Dropzone>
        <span className="d-block text-bold mb-3">
          Bibliotheque documents ( {document ? document.length : 0} )
        </span>

        <div className="input-group serash-document mb-3">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Recherche document..."
            className="form-control "
          />
          <button onClick={restInput} className="iclosed" type="reset">
            &times;
          </button>
        </div>
        {document && document.length > 0 ? (
          <div className="d-flex justify-content-center align-align-items-center flex-wrap biblio_list dropdown">
            {document.map((file) => {
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
                    <div className="pdf">
                      <a href={file.src}>
                        {file.extension == "csv" ? (
                          <img src={csv} className="thumbnails" />
                        ) : file.extension == "pdf" ? (
                          <img src={formatpdf} className="thumbnails" />
                        ) : (
                          <img src={word} className="thumbnails" />
                        )}
                      </a>
                    </div>

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
          <p className="">Aucune document disponible</p>
        )}
      </div>

      {selected ? (
        <div class="collapse" id="collapseExample">
          <div className="d-flex justify-content-center align-items-center mb-2">
            <div className="me-3 mt-3">
              {selected.extension == "csv" ? (
                <img src={csv} className="thumbnails info" />
              ) : selected.extension == "pdf" ? (
                <img src={formatpdf} className="thumbnails info" />
              ) : (
                <img src={word} className="thumbnails" />
              )}
            </div>
          </div>
          <div className="infationdoc">
            <div className="d-flex  mb-2">
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
            <div className="d-flex mb-2">
              <div className="me-3 titleInfo">Extension : </div>
              <div className="me-3 valueInfo"> {" " + selected.extension}</div>
            </div>
            <div className="d-flex mb-2">
              <div className="me-3 titleInfo">Url : </div>
              <div className="me-3 valueInfo"> /media/{selected.name} </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
