import React, { useEffect, useRef, useState } from "react";
import "./EditorSidebar.css";
import iconClose from "../../assets/imgEditorSidebar/iconClose.png";
import Layout from "./design/Layout/Layout";

import Sections from "./Sections/Sections";
import Parametres from "./Parametres/Parametres";
import Widgets from "./Widgets/Widgets";
import DraganDropMenu from "./DraganDropMenu/DraganDropMenu";
import ModalType from "./ModalType/ModalType";
import Blogs from "./Blogs/Blogs";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setcurrentSite } from "../../redux/features/site";
import { setStyleElement } from "../../redux/features/editor";
import { useParams } from "react-router-dom";
import HasPermission from "../../pages/Authentification/AuthGard/HasPermission";
export default function EditorSidebar(props) {
  const dispatch = useDispatch();
  const getEditor = () => {
    return props.editor();
  };
  let { siteId, type, pageId } = useParams();

  const [tab, setTab] = useState();

  const OpenTab = (value) => {
    let btns = document.querySelectorAll(".EditorWidgets");
    let btn = null;
    document.getElementById("EditorRightSidebar").classList.remove("active");
    document.getElementById("tabContant").classList.remove("d-none");
    props.editor().Canvas.setZoom(100);
    props.editor().Canvas.setCoords(0, 0);
    switch (value) {
      case "design":
        setTab(<Layout editor={getEditor} close={CloseTab} />);

        Object.keys(btns).map((key) => {
          btns[key].classList.remove("active");
        });
        btn = document.getElementById("v-pills-design-tab");
        btn.classList.add("active");
        break;
      case "pages":
        let t = (
          <div id="typePages">
            <div className="close" onClick={(e) => CloseTab()}>
              <img src={iconClose} alt="close" />
            </div>
            <ul class="nav nav-tabs pt-1" id="PagesPopupsTab" role="tablist">
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link active"
                  id="pages-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#pages"
                  type="button"
                  role="tab"
                  aria-controls="pages"
                  aria-selected="true"
                >
                  Pages
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link"
                  id="popup-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#popup"
                  type="button"
                  role="tab"
                  aria-controls="popup"
                  aria-selected="false"
                >
                  Popup
                </button>
              </li>
            </ul>
            <div class="tab-content" id="myTabContentPages">
              <div
                class="tab-pane fade show active"
                id="pages"
                role="tabpanel"
                aria-labelledby="pages-tab"
              >
                <DraganDropMenu editor={getEditor} close={CloseTab} />
              </div>
              <div
                class="tab-pane fade"
                id="popup"
                role="tabpanel"
                aria-labelledby="popup-tab"
              >
                <ModalType editor={getEditor} close={CloseTab} />
              </div>
            </div>
          </div>
        );
        setTab(t);

        Object.keys(btns).map((key) => {
          btns[key].classList.remove("active");
        });
        btn = document.getElementById("v-pills-pages-tab");
        btn.classList.add("active");
        break;
      case "widgets":
        setTab(
          <div id="Allwidgets">
            <Widgets editor={getEditor} close={CloseTab} />
          </div>
        );
        Object.keys(btns).map((key) => {
          btns[key].classList.remove("active");
        });
        btn = document.getElementById("v-pills-widgets-tab");
        btn.classList.add("active");
        break;

      case "sections":
        setTab(
          <div id="AllsectionsModel">
            {" "}
            <div className="closeRetour " onClick={(e) => CloseTab()}>
              <i className="fa fa-chevron-right" aria-hidden="true"></i>
              <span>Retours</span>
            </div>
            <Sections editor={getEditor} close={CloseTab} />
          </div>
        );
        Object.keys(btns).map((key) => {
          btns[key].classList.remove("active");
        });
        btn = document.getElementById("v-pills-sections-tab");
        btn.classList.add("active");
        break;
      case "blogs":
        setTab(
          <div id="AllBlogs">
            <Blogs editor={getEditor} close={CloseTab} />
          </div>
        );
        Object.keys(btns).map((key) => {
          btns[key].classList.remove("active");
        });
        btn = document.getElementById("v-pills-blog-tab");
        btn.classList.add("active");

        break;
      case "parametres":
        setTab(
          <div id="setting">
            <div className="closeRetour " onClick={(e) => CloseTab()}>
              <i className="fa fa-chevron-right" aria-hidden="true"></i>
              <span>Retours</span>
            </div>
            <Parametres editor={getEditor} close={CloseTab} />
          </div>
        );
        Object.keys(btns).map((key) => {
          btns[key].classList.remove("active");
        });
        btn = document.getElementById("v-pills-parametres-tab");
        btn.classList.add("active");
        break;

      default:
        break;
    }
  };

  const CloseTab = () => {
    setTab(null);
    let btns = document.querySelectorAll(".EditorWidgets");
    Object.keys(btns).map((key) => {
      btns[key].classList.remove("active");
    });
  };

  const [selectedTab, setSelectedTab] = useState(null);
  useEffect(() => {
    /*  const widgetList = ["BASICS", "POPULAIRES"];
    if (props.editor()) {
      let cats = props.editor().Blocks.getCategories();
      if (cats.models && cats.models.length > 0) {
        cats.models.forEach((b) => {
          console.log(b);
          if (!widgetList.includes(b.id)) b.view.el.style.display = "none";
        });
      }
    } */
  }, [props]);
  const editSite = async (item) => {
    await axios
      .get(process.env.REACT_APP_API_URL + "/sites/get/" + siteId)
      .then((response) => {
        try {
          dispatch(setcurrentSite(response.data.data));
          dispatch(setStyleElement({}));
        } catch (error) {
          //  console.log(error);
        }
      })
      .catch((error) => {
        // console.log(error.message);
      });
  };
  useEffect(() => {}, [tab]);

  const hasMediaEffectRun = useRef(false);
  useEffect(() => {
    const fetchData = async () => {
      if (!hasMediaEffectRun.current) {
        hasMediaEffectRun.current = true;
        await editSite();
      }
    };

    fetchData();
  }, [siteId]);
  useEffect(() => {
    let btns = document.querySelectorAll(".EditorWidgets");
    setTab(null);
    Object.keys(btns).map((key) => {
      btns[key].classList.remove("active");
    });
  }, [pageId]);
  return (
    <div className="SidebarWidgets d-flex align-items-start" id="dashbord">
      <div
        className="nav flex-column nav-pills"
        id="v-pills-tab"
        role="tablist"
        aria-orientation="vertical"
      >
        <HasPermission permission={["modifier_le_site"]}>
          <button
            className="nav-link EditorWidgets "
            id="v-pills-design-tab"
            type="button"
            onClick={(e) => OpenTab("design")}
          >
            <span className="Design"></span>
            <span>Design</span>
          </button>
        </HasPermission>
        <HasPermission permission={["gestion_list_page"]}>
          <button
            className="nav-link EditorWidgets"
            id="v-pills-pages-tab"
            type="button"
            onClick={(e) => OpenTab("pages")}
          >
            <span className="Page"></span>
            <span>Pages</span>
          </button>
        </HasPermission>
        <HasPermission permission={["modifier_le_site"]}>
          <button
            className="nav-link EditorWidgets"
            id="v-pills-widgets-tab"
            type="button"
            onClick={(e) => OpenTab("widgets")}
          >
            <span className="Widgets"></span>
            <span>Widgets</span>
          </button>
        </HasPermission>
        <HasPermission permission={["gerer_une_section_comme_modele"]}>
          <button
            className="nav-link EditorWidgets"
            id="v-pills-sections-tab"
            type="button"
            onClick={(e) => OpenTab("sections")}
          >
            <span className="Sections"></span>
            <span>Sections</span>
          </button>
        </HasPermission>
        <HasPermission permission={["blog"]}>
        <button
          className="nav-link EditorWidgets"
          id="v-pills-blog-tab"
          type="button"
          onClick={(e) => OpenTab("blogs")}
        >
          <span className="Blog"></span>
          <span>Blog</span>
        </button>
        </HasPermission>
        <button
          className="nav-link EditorWidgets"
          id="v-pills-parametres-tab"
          type="button"
          onClick={(e) => OpenTab("parametres")}
        >
          <span className="Parametres"></span>
          <span>Paramètres</span>
        </button>
      </div>
      <div id="tabContant" className={tab != null ? "tabContant" : "d-none"}>
        {tab}
      </div>
      {/* <div className="tab-content" id="tabSideBar">
        <div
          className="tab-pane fade v-pills"
          id="v-pills-design"
          role="tabpanel"
          aria-labelledby="v-pills-design-tab"
        >
          <Layout editor={getEditor} />
        </div>
        <div
          className="tab-pane fade v-pills"
          id="v-pills-pages"
          role="tabpanel"
          aria-labelledby="v-pills-pages-tab"
        >
          <div className="close" onClick={(e) => CloseTab()}>
            <img src={iconClose} alt="close" />
          </div>
          <div className="titleDesign">
            <ul class="nav nav-tabs" id="PagesPopupsTab" role="tablist">
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link active"
                  id="pages-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#pages"
                  type="button"
                  role="tab"
                  aria-controls="pages"
                  aria-selected="true"
                >
                  Pages
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link"
                  id="popup-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#popup"
                  type="button"
                  role="tab"
                  aria-controls="popup"
                  aria-selected="false"
                >
                  Popup
                </button>
              </li>
            </ul>
            <div class="tab-content" id="myTabContentPages">
              <div
                class="tab-pane fade show active"
                id="pages"
                role="tabpanel"
                aria-labelledby="pages-tab"
              >
                <DraganDropMenu />
              </div>
              <div
                class="tab-pane fade"
                id="popup"
                role="tabpanel"
                aria-labelledby="popup-tab"
              >
                <ModalType />
              </div>
            </div>
          </div>
        </div>
        <div
          className="tab-pane fade v-pills"
          id="v-pills-widgets"
          role="tabpanel"
          aria-labelledby="v-pills-widgets-tab"
        >
          <div className="close" onClick={(e) => CloseTab()}>
            <img src={iconClose} alt="close" />
          </div>
          <div className="titleDesign">
            <span> WIDGETS</span>
            <Widgets editor={getEditor} />
          </div>
        </div>
        <div
          className="tab-pane fade v-pills"
          id="v-pills-sections"
          role="tabpanel"
          aria-labelledby="v-pills-sections-tab"
        >
          <div className="closeRetour " onClick={(e) => CloseTab()}>
            <i className="fa fa-chevron-right" aria-hidden="true"></i>
            <span>Retours</span>
          </div>
          <div className="titleDesign">
            <Sections editor={getEditor} />
          </div>
        </div>
        <div
          className="tab-pane fade v-pills"
          id="v-pills-blog"
          role="tabpanel"
          aria-labelledby="v-pills-blog-tab"
        >
          <div className="close" onClick={(e) => CloseTab()}>
            <img src={iconClose} alt="close" />
          </div>
          <div className="titleDesign">
            <span>BLOG</span>
          </div>
        </div>
        <div
          className="tab-pane fade v-pills"
          id="v-pills-parametres"
          role="tabpanel"
          aria-labelledby="v-pills-parametres-tab"
        >
          <div className="closeRetour " onClick={(e) => CloseTab()}>
            <i className="fa fa-chevron-right" aria-hidden="true"></i>
            <span>Retours</span>
          </div>
          <div className="titleDesign">
            <Parametres editor={getEditor} />
          </div>
        </div>
      </div> */}
    </div>
  );
}
