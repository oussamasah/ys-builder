import React, { useEffect } from "react";
import { useState } from "react";
import "./EditInfoPosts.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import ImgEntreprise from "../../Parametres/ImgEntreprise/ImgEntreprise";
import imgSite from "../../../../assets/imgSites/imgSite.svg";
export default function EditInfoPosts(props) {
  const [state, setstate] = useState(props.dataIem);
  const [urlcat, setUrlCat] = useState(props.dataIem.slog);
  const [namepost, setNamepost] = useState(props.dataIem.title);
  const [showBloksMedia, setShowBloksMedia] = useState(false);
  const [metatitle, setMetaTitle] = useState(props.dataIem.metatitle);
  const [metadecription, setMetaDecription] = useState(
    props.dataIem.metadecription
  );
  const [indexSeo, setIndexSeo] = useState(props.dataIem.indexation === "true");

  const changeActiveIndex = (e) => {
    setIndexSeo(e.target.checked);
  };
  const ShowMedias = () => {
    setShowBloksMedia(!showBloksMedia);
  };
  const deleteImg = () => {};
  return (
    <div id="EditInfoPosts">
      <nav>
        <div class="nav nav-tabs" id="nav-tab" role="tablist">
          <button
            class="nav-link active"
            id="nav-statut-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-statut"
            type="button"
            role="tab"
            aria-controls="nav-statut"
            aria-selected="true"
          >
            Statut du post
          </button>
          <button
            class="nav-link"
            id="nav-details-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-details"
            type="button"
            role="tab"
            aria-controls="nav-details"
            aria-selected="false"
          >
            Détails du post
          </button>
          <button
            class="nav-link"
            id="nav-parametre-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-parametre"
            type="button"
            role="tab"
            aria-controls="nav-parametre"
            aria-selected="false"
          >
            Paramètres SEO du post
          </button>
        </div>
      </nav>
      <div class="tab-content" id="nav-tabContent">
        <div
          class="tab-pane fade show active"
          id="nav-statut"
          role="tabpanel"
          aria-labelledby="nav-statut-tab"
        >
          <div className="statue p-2 mt-3">
            <div className="entete  mb-3">
              <span>Statut du l'arcticle </span>
              <span className="etats">{state.etat}</span>
            </div>
            <div className="d-flex  form-group m-form__group group_text">
              <input
                required
                type="url"
                className="form-control namePage disabled"
                id="exampleInputPage"
                aria-describedby="textHelp"
                value={process.env.REACT_APP_API_URL}
              />
              <input
                required
                type="url"
                className="form-control slugpost"
                id="exampleInputPage"
                aria-describedby="textHelp"
                value={"/" + urlcat}
                onChange={(e) => {
                  setUrlCat(e.target.value);
                }}
              />
            </div>
          </div>
        </div>
        <div
          class="tab-pane fade"
          id="nav-details"
          role="tabpanel"
          aria-labelledby="nav-details-tab"
        >
          <div className="form-group m-form__group group_text">
            <label className="m-2 titlecontent">
              {" "}
              <b>Nom d'arcticle </b>
            </label>
            <input
              required
              type="text"
              className="form-control namePage"
              id="exampleInputPage"
              aria-describedby="textHelp"
              placeholder="Titre du post"
              value={namepost}
              onChange={(e) => {
                setNamepost(e.target.value);
              }}
            />
          </div>
          <select class="form-select mb-3" aria-label="Default select example">
            <option selected>List catégorie</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
          <div className="form-group m-form__group group_text mt-3">
            <label className="mb-2 titlecontent">
              {" "}
              <b>Contenu d'arcticle </b>
            </label>
            <CKEditor editor={ClassicEditor} data={state.description} />
          </div>
          <div>
            <label className="mt-2 titlecontent">
              {" "}
              <b>Image d'arcticle </b>
            </label>
            <div className="form-group m-form__group group_text d-flex  justify-content-between mt-2">
              {state.picture == "" ? (
                <img src={imgSite} className="imgEditpost" />
              ) : (
                <img src={state.picture} className="imgEditpost" />
              )}
              <div className="actionsedit">
                <div className=" cursor" onClick={ShowMedias} type="button">
                  <span>
                    <i class="fa-solid fa-pen-to-square"></i> Modifier image
                  </span>
                </div>
                <div className=" cursor" onClick={deleteImg} type="button">
                  <span>
                    <span>
                      <i class="fa-solid fa-trash"></i> Supprimer image
                    </span>
                  </span>
                </div>
              </div>
            </div>

            <div className={showBloksMedia ? "show" : "hide"}>
              <ImgEntreprise />
            </div>
          </div>
        </div>
        <div
          class="tab-pane fade"
          id="nav-parametre"
          role="tabpanel"
          aria-labelledby="nav-parametre-tab"
        >
          <div className="form-group m-form__group group_text">
            <label className="m-2 titlecontent d-block">
              Métatitre du post
            </label>
            <span className="inf m-2">
              {" "}
              <i>
                La longueur de métatitre optimale se situe entre 45 et 65
                caractères (512 px).
              </i>
            </span>

            <input
              required
              type="text"
              className="form-control namePage"
              id="exampleInputPage"
              aria-describedby="textHelp"
              placeholder="Meta title"
              value={metatitle}
              onChange={(e) => {
                setMetaTitle(e.target.value);
              }}
            />
          </div>
          <div className="form-group m-form__group group_text">
            <label className="m-2 titlecontent d-block">
              Métadecription du post
            </label>
            <span className="inf m-2">
              {" "}
              <i>
                Saisissez le résumé de cet article. Si vous laissez ce champ
                vide, nous utiliserons les phrases d'ouverture de l'article..
              </i>
            </span>

            <input
              required
              type="text"
              className="form-control namePage"
              id="exampleInputPage"
              aria-describedby="textHelp"
              placeholder="Meta description"
              value={metadecription}
              onChange={(e) => {
                setMetaDecription(e.target.value);
              }}
            />
          </div>
          <div class="form-check form-switch mt-3 indexationtitre d-flex justify-content-between">
            <label className="form-check-label" htmlFor="isActiveShadow">
              Bloquez l'activité des bots <b>d'indexation sur cette article </b>de
              façon à ce qu'elle n'apparaisse pas dans les résultats de
              recherche.
            </label>

            <input
              className="form-check-input"
              type="checkbox"
              id="isActiveShadow"
              name="isActiveShadow"
              checked={indexSeo}
              onChange={changeActiveIndex}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
