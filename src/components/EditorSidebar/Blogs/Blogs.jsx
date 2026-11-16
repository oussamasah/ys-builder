import React, { useEffect, useState } from "react";
import iconClose from "../../../assets/imgEditorSidebar/iconClose.png";
import "./Blogs.css";

import toast, { Toaster } from "react-hot-toast";
import ImgEntreprise from "../Parametres/ImgEntreprise/ImgEntreprise";
import GererPosts from "./GererPosts/GererPosts";
import ImporterPosts from "./ImporterPosts/ImporterPosts";
import GererCategorie from "./GererCategorie/GererCategorie";
import { useParams } from "react-router-dom";
import axios from "axios";
export default function Blogs(props) {
  let { siteId, pageId } = useParams();
  const [showBloks, setShowBloks] = useState(false);
  const [showBloksMedia, setShowBloksMedia] = useState(false);

  const [isActive, setIsActive] = useState("false");
  const [namepost, setNamepost] = useState("");
  const getEditor = () => {
    return props.editor();
  };
  const changeView = (data) => {
    setCurrentView(data);
  };
  const [currentView, setCurrentView] = useState(
    <GererCategorie changeView={changeView} editor={getEditor} />
  );
  const activateBlog = async (value) => {
    setIsActive(value.toString());
    changeView("");
    await axios
      .post(process.env.REACT_APP_API_URL + "/sites/activeblog/" + siteId, {
        blog: value,
      })
      .then((response) => {
        console.log(response);
        changeView(
          <GererCategorie changeView={changeView} editor={getEditor} />
        );
      })
      .catch((error) => {});
  };
  const getblog = async () => {
    //setIsActive(value.toString())
    await axios
      .get(process.env.REACT_APP_API_URL + "/sites/getmodules/" + siteId)
      .then((response) => {
        console.log("---------get", response);
        const blog = response.data.data.modules.filter(
          (x) => x.title == "Blog"
        );
        if (blog.length > 0) {
          setIsActive("true");
        } else {
          setIsActive("false");
        }
      })
      .catch((error) => {});
  };
  const CloseTab = () => {
    props.close();
  };
  const Clear = () => {};
  const ShowMedias = () => {
    setShowBloksMedia(!showBloksMedia);
  };

  const AddBloks = () => {};
  const handleCloseBloks = () => setShowBloks(false);
  useEffect(() => {
    getblog();
  }, []);

  return (
    <div id="blogsItem">
      <div className="close " onClick={(e) => CloseTab()}>
        <img src={iconClose} alt="close" />
      </div>
      <div class="titleDesign">
        <span>GÉRER LE BLOG</span>
      </div>
      <div class="form-check form-switch mt-3 indexationtitre  d-flex justify-content-center">
        <label className="form-check-label me-5 mb-3" htmlFor="isActiveShadow">
          Module blog
        </label>

        <input
          className="form-check-input"
          type="checkbox"
          id={"isActiveShadow-"}
          name={"isActiveShadow-"}
          checked={isActive == "true"}
          onChange={(e) => {
            activateBlog(e.target.checked);
          }}
        />
      </div>
      <div className={isActive == "false" ? "d-block" : "d-none"}>
        Pour consulter les paramètres et le contenu du blog, veuillez activer le
        module Une fois activé, vous pourrez facilement gérer et personnaliser
        votre blog selon vos besoins
      </div>
      <div
        className={isActive == "false" ? "d-none" : "d-flex align-items-start"}
      >
        <div
          class="nav flex-column nav-pills me-3 border-end"
          id="v-pills-tab"
          role="tablist"
          aria-orientation="vertical"
        >
          <button
            class="nav-link active p-0 m-3"
            id="v-pills-gerer-tab"
            data-bs-toggle="pill"
            data-bs-target="#v-pills-gerer"
            type="button"
            role="tab"
            aria-controls="v-pills-gerer"
            aria-selected="true"
          >
            Catégories
          </button>
          <a
            href={"/editor/" + siteId + "/model"}
            title="modele"
            class="nav-link p-0 m-3"
          >
            Modifier la modele
          </a>
          {/* <button class="nav-link" id="v-pills-importer-tab" data-bs-toggle="pill" data-bs-target="#v-pills-importer" type="button" role="tab" aria-controls="v-pills-importer" aria-selected="false">Importer les posts</button> */}
        </div>
        <div class="tab-content" id="v-pills-tabContent">
          <div
            class="tab-pane fade show active"
            id="v-pills-gerer"
            role="tabpanel"
            aria-labelledby="v-pills-gerer-tab"
          >
            {currentView}
          </div>

          {/* <div class="tab-pane fade" id="v-pills-importer" role="tabpanel" aria-labelledby="v-pills-importer-tab"><ImporterPosts/></div> */}
        </div>
      </div>
    </div>
  );
}
