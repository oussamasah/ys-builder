import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./Informations.css";
import { v4 as uuidv4 } from "uuid";

export default function Informations(props) {
  let { siteId } = useParams();
  const storeSite = useSelector((state) => state.site.value);
  const [logo, setLogo] = useState();
  const [favicon, setFavicon] = useState();
  const [telephone, setTelephone] = useState(storeSite.site.phone);
  const [AdressText, setAdressText] = useState(storeSite.site.adresse.text);
  const [Email, setEmail] = useState(storeSite.site.email);
  const [Social, setSocial] = useState(
    storeSite.site.social ? storeSite.site.social : "#"
  );
  const hasMediaEffectRun = useRef(false);
  const getInformationsSites = () => {
    axios
    .get(process.env.REACT_APP_API_URL + "/sites/get/" + siteId)
    .then((response) => {
      setAdressText(response.data.data.site.adresse.text);
      setTelephone(response.data.data.site.phone);
      setEmail(response.data.data.site.email);
      setLogo(response.data.data.site.logo);
      setFavicon(response.data.data.site.favicon);
      setSocial(response.data.data.site.social);
    });
  }
  useEffect(() => {
    const fetchData = async () => {
      if (!hasMediaEffectRun.current) {
        hasMediaEffectRun.current = true;
        await getInformationsSites();
      }
    };
  
    fetchData();
  }, [siteId])



  const changeTel = (telephone) => {
    setTelephone(telephone);
    axios
      .post(process.env.REACT_APP_API_URL + "/sites/updatesite/" + siteId, {
        phone: telephone,
      })
      .then((response) => {
        if (props.editor()) {
          props.editor().getWrapper().view.render();
        }
      });
  };
  const changeAdresse = (value) => {
    setAdressText(value);
    axios
      .post(process.env.REACT_APP_API_URL + "/sites/updateadresse/" + siteId, {
        adresse: { text: value },
      })
      .then((response) => {
        if (props.editor()) {
          props.editor().getWrapper().view.render();
        }
      });
  };

  const changeEmail = (value) => {
    setEmail(value);
    axios
      .post(process.env.REACT_APP_API_URL + "/sites/updatesite/" + siteId, {
        email: value,
      })
      .then((response) => {
        if (props.editor()) {
          props.editor().getWrapper().view.render();
        }
      });
  };

  const ChangeLogo = (file) => {
    const formData = new FormData();
    formData.append("files", file);
    axios
      .post(
        process.env.REACT_APP_API_URL + "/sites/uploadlogo/" + siteId,
        formData
      )
      .then((response) => {
        setLogo(response.data.data.logo + "?v=logo-" + uuidv4());
        if (props.editor()) {
          props.editor().getWrapper().view.render();
        }
      });
  };
  const ChangeFavicon = (fav) => {
    const formDataFavicon = new FormData();
    formDataFavicon.append("favicons", fav);
    axios
      .post(
        process.env.REACT_APP_API_URL + "/sites/updatefavicon/" + siteId,
        formDataFavicon
      )
      .then((response) => {
        setFavicon(response.data.data.favicon + "?v=favion-" + uuidv4());
        // if (props.editor()) {
        //   props.editor().getWrapper().view.render();
        // }
      });
  };
  // const changeSocial = async (type, value) => {

  //   console.log("sdsdsdsds",{ ...Social, facebook: value })

  //   switch (type) {
  //     case "facebook":
  //       setSocial({ ...Social, facebook: value });
  //       break;
  //     case "instagram":
  //       setSocial({ ...Social, instagram: value });
  //       break;
  //     case "twitter":
  //       setSocial({ ...Social, twitter: value });
  //       break;
  //     case "vimeo":
  //       setSocial({ ...Social, vimeo: value });
  //       break;
  //     case "whatsapp":
  //       setSocial({ ...Social, whatsapp: value });
  //       break;
  //     case "youtube":
  //       setSocial({ ...Social, youtube: value });
  //       break;
  //     case "pinterest":
  //       setSocial({ ...Social, pinterest: value });
  //       break;
  //     case "linkedin":
  //       setSocial({ ...Social, linkedin: value });
  //       break;
  //     case "snapchat":
  //       setSocial({ ...Social, snapchat: value });
  //       break;
  //     case "rss":
  //       setSocial({ ...Social, rss: value });
  //       break;

  //     default:
  //       break;
  //   }
  //   axios
  //     .post(process.env.REACT_APP_API_URL + "/sites/updatesite/" + siteId, {
  //       social: value,
  //     })
  //     .then((response) => {
  //       if (props.editor()) {
  //         props.editor().getWrapper().view.render();
  //       }
  //     });
  // };

  const changeSocial = async (type, value) => {
    setSocial({ ...Social, [type]: value }); // [type] est une syntaxe pour accéder à la propriété dynamiquement
    axios
      .post(process.env.REACT_APP_API_URL + "/sites/updatesite/" + siteId, {
        social: { ...Social, [type]: value },
      })
      .then((response) => {
        if (props.editor()) {
          props.editor().getWrapper().view.render();
        }
      });
  };
  useEffect(() => {
    // console.log(Social);
  }, [AdressText, telephone, Social]);
  useEffect(() => {}, [logo]);
  useEffect(() => {}, [favicon]);

  return (
    <div>
      <div id="InfoParams">
        <div className="d-flex justify-content-between w-100 mb-3 align-items-center">
          <div className="w-100">
            <span> Logo de l'entreprise : </span>
          </div>
          <div className="addIcon">
            <input
              type="file"
              name="file"
              id="file"
              className="inputfile d-none"
              onChange={(e) => ChangeLogo(e.target.files[0])}
            />

            <label for="file">
              {logo != null ? (
                <div className="p-3">
                  {" "}
                  <img src={logo} className="logo-img" />
                </div>
              ) : (
                <div className="p-3">
                  <i className="fa-light fa-image"></i>
                  <span className="text-center">Ajouter</span>
                </div>
              )}
            </label>

            {/*  <MediaLibrary siteId={siteId} changeImage={updateLogo} /> */}
          </div>
        </div>
        <div className="d-flex justify-content-between w-100 mb-3 align-items-center">
          <div className="w-100">
            <span>Favicon :</span>
            <span>
              {" "}
              L'icône qui apparaît à côté du titre de la page dans l'onglet du
              navigateur et sur les résultats de recherche mobile de Google.{" "}
            </span>
          </div>
          <div className="addIcon">
            <input
              type="file"
              name="fav"
              id="fav"
              className="inputfile d-none"
              onChange={(e) => ChangeFavicon(e.target.files[0])}
            />

            <label for="fav">
              {favicon != null ? (
                <div className="p-3">
                  {" "}
                  <img src={favicon} className="logo-img" />
                </div>
              ) : (
                <div className="p-3">
                  <i className="fa-light fa-image"></i>
                  <span className="text-center">Ajouter </span>
                </div>
              )}
            </label>

            {/*  <MediaLibrary siteId={siteId} changeImage={updateLogo} /> */}
          </div>
        </div>
        <div className="d-flex justify-content-between w-100 mb-3">
          <div className=" w-100">
            <span> Adresse :</span>
          </div>
        </div>

        <div className="input-group input-group-sm mb-3">
          <input
            className="form-control"
            type="text"
            value={AdressText}
            placeholder="Adresse de l'entreprise"
            aria-label="Adresse"
            onChange={(e) => changeAdresse(e.target.value)}
          />
        </div>
        <div>
          <div className="d-flex justify-content-between w-100 mb-3">
            <div className="w-100 ">
              <span> Téléphone : </span>{" "}
            </div>
            {/* <div className="addIcon" onClick={(e) => addTelephone()}>
              <i className="fas fa-plus-circle"></i>
            </div> */}
          </div>

          <div className="input-group input-group-sm mb-3">
            <input
              className="form-control"
              type="text"
              value={telephone}
              placeholder="Télphone de l'entreprise"
              aria-label="Telephone"
              onChange={(e) => changeTel(e.target.value)}
            />
          </div>
        </div>
        <div>
          <div className="d-flex justify-content-between w-100 mb-3">
            <div className="w-100 ">
              <span> Email : </span>{" "}
            </div>
            {/* <div className="addIcon" onClick={(e) => addTelephone()}>
              <i className="fas fa-plus-circle"></i>
            </div> */}
          </div>

          <div className="input-group input-group-sm mb-3">
            <input
              className="form-control"
              type="email"
              value={Email}
              placeholder="Email de l'entreprise"
              aria-label="Email"
              onChange={(e) => changeEmail(e.target.value)}
            />
          </div>
          <div className="d-flex justify-content-between w-100 mb-3">
            <div className="w-100 ">
              <span> Réseau sociaux :</span>
            </div>
          </div>
          <div className="ingroupSocail">
            <div className="add-new-field d-flex justify-content-center align-content-center mb-2">
              <span className="ms-2">Ajouter réseau sociaux </span>{" "}
            </div>

            <div id="navSocial">
              <nav>
                <div class="nav nav-tabs" id="nav-tab" role="tablist">
                  <button
                    class="nav-link active"
                    id="nav-facebook-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-facebook"
                    type="button"
                    role="tab"
                    aria-controls="nav-facebook"
                    aria-selected="true"
                  >
                    <i class="fab fa-facebook-f  fb"></i>
                  </button>
                  <button
                    class="nav-link"
                    id="nav-instagram-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-instagram"
                    type="button"
                    role="tab"
                    aria-controls="nav-instagram"
                    aria-selected="false"
                  >
                    <i class="fab fa-instagram insta"></i>
                  </button>
                  <button
                    class="nav-link"
                    id="nav-linkedin-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-linkedin"
                    type="button"
                    role="tab"
                    aria-controls="nav-linkedin"
                    aria-selected="false"
                  >
                    <i class="fab fa-linkedin-in linkdin"></i>
                  </button>
                  <button
                    class="nav-link"
                    id="nav-whatsapp-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-whatsapp"
                    type="button"
                    role="tab"
                    aria-controls="nav-whatsapp"
                    aria-selected="false"
                  >
                    <i class="fab fa-whatsapp whatsapp"></i>
                  </button>
                  <button
                    class="nav-link"
                    id="nav-pinterest-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-pinterest"
                    type="button"
                    role="tab"
                    aria-controls="nav-pinterest"
                    aria-selected="false"
                  >
                    <i class="fab fa-pinterest pin"></i>
                  </button>
                  <button
                    class="nav-link"
                    id="nav-twitter-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-twitter"
                    type="button"
                    role="tab"
                    aria-controls="nav-twitter"
                    aria-selected="false"
                  >
                    <i class="fab fa-twitter tw"></i>
                  </button>
                  <button
                    class="nav-link"
                    id="nav-vimeo-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-vimeo"
                    type="button"
                    role="tab"
                    aria-controls="nav-vimeo"
                    aria-selected="false"
                  >
                    <i class="fab fa-vimeo-v vi"></i>
                  </button>
                  <button
                    class="nav-link"
                    id="nav-snapchat-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-snapchat"
                    type="button"
                    role="tab"
                    aria-controls="nav-snapchat"
                    aria-selected="false"
                  >
                    <i class="fab fa-snapchat snap"></i>
                  </button>
                  <button
                    class="nav-link"
                    id="nav-rss-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-rss"
                    type="button"
                    role="tab"
                    aria-controls="nav-rss"
                    aria-selected="false"
                  >
                    <i class="fas fa-rss rss"></i>
                  </button>
                  <button
                    class="nav-link"
                    id="nav-youtube-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-youtube"
                    type="button"
                    role="tab"
                    aria-controls="nav-youtube"
                    aria-selected="false"
                  >
                    <i class=" fab fa-youtube youtube"></i>
                  </button>
                </div>
              </nav>
              <div className="tab-content" id="nav-tabContent">
                <div
                  className="tab-pane fade show active"
                  id="nav-facebook"
                  role="tabpanel"
                  aria-labelledby="nav-facebook-tab"
                  tabindex="0"
                >
                  <input
                    className="form-control me-2 rounded-1"
                    type="url"
                    placeholder="https://www.facebook.com"
                    aria-label="Réseau sociaux"
                    value={Social.facebook || ""}
                    onChange={(e) => changeSocial("facebook", e.target.value)}
                  />
                </div>
                <div
                  className="tab-pane fade"
                  id="nav-instagram"
                  role="tabpanel"
                  aria-labelledby="nav-instagram-tab"
                  tabindex="0"
                >
                  <input
                    className="form-control me-2 rounded-1"
                    type="url"
                    name="url"
                    value={Social.instagram || ""}
                    placeholder="https://www.instagram.com"
                    aria-label="Réseau sociaux"
                    onChange={(e) => changeSocial("instagram", e.target.value)}
                  />
                </div>
                <div
                  className="tab-pane fade"
                  id="nav-linkedin"
                  role="tabpanel"
                  aria-labelledby="nav-linkedin-tab"
                  tabindex="0"
                >
                  <input
                    className="form-control me-2 rounded-1"
                    type="url"
                    name="url"
                    value={Social.linkedin || ""}
                    placeholder="https://www.linkedin.com"
                    aria-label="Réseau sociaux"
                    onChange={(e) => changeSocial("linkedin", e.target.value)}
                  />
                </div>
                <div
                  className="tab-pane fade"
                  id="nav-whatsapp"
                  role="tabpanel"
                  aria-labelledby="nav-whatsapp-tab"
                  tabindex="0"
                >
                  <input
                    className="form-control me-2 rounded-1"
                    type="url"
                    name="url"
                    value={Social.whatsapp || ""}
                    placeholder="https://www.whatsapp.com"
                    aria-label="Réseau sociaux"
                    onChange={(e) => changeSocial("whatsapp", e.target.value)}
                  />
                </div>
                <div
                  className="tab-pane fade"
                  id="nav-pinterest"
                  role="tabpanel"
                  aria-labelledby="nav-pinterest-tab"
                  tabindex="0"
                >
                  <input
                    className="form-control me-2 rounded-1"
                    type="url"
                    name="url"
                    value={Social.pinterest || ""}
                    placeholder="https://www.pinterest.com"
                    aria-label="Réseau sociaux"
                    onChange={(e) => changeSocial("pinterest", e.target.value)}
                  />
                </div>
                <div
                  className="tab-pane fade"
                  id="nav-twitter"
                  role="tabpanel"
                  aria-labelledby="nav-twitter-tab"
                  tabindex="0"
                >
                  <input
                    className="form-control me-2 rounded-1"
                    type="url"
                    name="url"
                    value={Social.twitter || ""}
                    placeholder="https://www.twitter.com"
                    aria-label="Réseau sociaux"
                    onChange={(e) => changeSocial("twitter", e.target.value)}
                  />
                </div>
                <div
                  className="tab-pane fade"
                  id="nav-vimeo"
                  role="tabpanel"
                  aria-labelledby="nav-vimeo-tab"
                  tabindex="0"
                >
                  <input
                    className="form-control me-2 rounded-1"
                    type="url"
                    name="url"
                    value={Social.vimeo || ""}
                    placeholder="https://www.vimeo.com"
                    aria-label="Réseau sociaux"
                    onChange={(e) => changeSocial("vimeo", e.target.value)}
                  />
                </div>
                <div
                  className="tab-pane fade"
                  id="nav-snapchat"
                  role="tabpanel"
                  aria-labelledby="nav-snapchat-tab"
                  tabindex="0"
                >
                  <input
                    className="form-control me-2 rounded-1"
                    type="url"
                    name="url"
                    value={Social.snapchat || ""}
                    placeholder="https://www.snapchat.com"
                    aria-label="Réseau sociaux"
                    onChange={(e) => changeSocial("snapchat", e.target.value)}
                  />
                </div>
                <div
                  className="tab-pane fade"
                  id="nav-rss"
                  role="tabpanel"
                  aria-labelledby="nav-rss-tab"
                  tabindex="0"
                >
                  <input
                    className="form-control me-2 rounded-1"
                    type="url"
                    name="url"
                    value={Social.rss || ""}
                    placeholder="https://www.rss.com"
                    aria-label="Réseau sociaux"
                    onChange={(e) => changeSocial("rss", e.target.value)}
                  />
                </div>
                <div
                  className="tab-pane fade"
                  id="nav-youtube"
                  role="tabpanel"
                  aria-labelledby="nav-youtube-tab"
                  tabindex="0"
                >
                  <input
                    className="form-control me-2 rounded-1"
                    type="url"
                    name="url"
                    value={Social.youtube || ""}
                    placeholder="https://www.youtube.com"
                    aria-label="Réseau sociaux"
                    onChange={(e) => changeSocial("youtube", e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
