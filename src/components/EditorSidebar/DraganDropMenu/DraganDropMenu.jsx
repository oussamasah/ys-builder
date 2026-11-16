import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Nestable from "react-nestable";
import "react-nestable/dist/styles/index.css";
import "./DraganDropMenu.css";
import SubFile from "../../../assets/imgMenuSort/SubFile.svg";
import File from "../../../assets/imgMenuSort/File.svg";
import OptionItem from "../../../assets/imgMenuSort/OptionItem.svg";
import iconClose from "../../../assets/imgEditorSidebar/iconClose.png";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updatePages } from "../../../redux/features/site";
import { Button, Modal } from "react-bootstrap";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";
import HasPermission from "../../../pages/Authentification/AuthGard/HasPermission";
function DraganDropMenu(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShowDelete(false);
  const handleSingleClose = () => setShowSingleDelete(false);
  const handleSeoClose = () => setShowSingleSeo(false);
  const [JsError, setJSerror] = useState([]);
  const [pageHidden, setPageHidden] = useState({
    id: "",
    desktop: false,
    tablet: false,
    mobile: false,
  });
  const closeEdit = () => setshowEdit(false);
  const [oldLink, setOldLink] = useState();
  const [redirection, setRedirection] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [pageHiddenId, setPageHiddenId] = useState(false);
  const [showSingleDelete, setShowSingleDelete] = useState(false);
  const [showSingleSeo, setShowSingleSeo] = useState(false);
  const [deletedPage, setdeletedPage] = useState(false);
  const [deletedSinglePage, setdeletedSinglePage] = useState(false);
  const [deletedSingleSeo, setdeletedSingleSeo] = useState(false);
  const [showEdit, setshowEdit] = useState(false);
  const [editPage, seteditPage] = useState({ title: "", url: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const storeSite = useSelector((state) => state.site.value);
  let { siteId, pageId } = useParams();
  const [Namepage, setNamepage] = useState();
  const [links, setLinks] = useState({
    exetrieur: false,
    type: "page",
  });
  const [Urlpage, setUrlpage] = useState();
  const [Urllien, setUrlien] = useState(links);
  const txtTolink = (txt) => {
    return txt
      .replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, "")
      .replace(/\é/g, "e")
      .replace(/\è/g, "e")
      .replace(/\ê/g, "e")
      .replace(/\ë/g, "e")
      .replace(/\à/g, "a")
      .replace(/\â/g, "a")
      .replace(/\ä/g, "a")
      .replace(/\û/g, "u")
      .replace(/\ü/g, "u")

      .replace(/\s/g, "-")
      .toLowerCase();
  };
  const [pages, setPages] = useState({
    treeData: [],
  });
  const items = [
    { id: 0, title: "Andy" },
    {
      id: 1,
      title: "Harry",
      children: [{ id: 2, title: "David" }],
    },
    { id: 3, title: "Lisa" },
  ];
  const renderItem = ({ item }) => {
    return (
      <div
        id="MenuItem"
        className="MenuItem d-flex justify-content-between align-items-center"
      >
        <div
          className="actionclikpage"
          onClick={(e) => {
            item._id ? changePage(item._id) : changePage(item.children._id);
          }}
        >
          {item.children.length > 0 ? (
            <img src={SubFile} alt={SubFile} className="me-2" />
          ) : (
            <img src={File} alt={SubFile} className="me-2" />
          )}

          <span
            className="Parent"
            data-toggle="tooltip"
            data-placement="bottom"
            title={item.title}
          >
            {item.title}
          </span>
          <span
            className="Children"
            data-placement="bottom"
            title={item.children.title}
          >
            {item.children.title}
          </span>
        </div>
        <div className="btnLbel ">
          <button
            className="btn-option"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="true"
            onClick={(e) => [
              setPageHiddenId(item._id),
              setPageHidden(item.hidden),
            ]}
          >
            <img src={OptionItem} alt="OptionItem" />
          </button>
          <ul
            className={
              item.type == "lien"
                ? "dropdown-menu optionpages links"
                : "dropdown-menu optionpages"
            }
            aria-labelledby="dropdownMenuButton1"
          >
            <li
              className={item.type == "lien" ? "d-none" : "b-block"}
              onClick={
                (e) => {
                  changePage(item._id);
                } /* changePage(node._id) */
              }
            >
              Editer la page
            </li>
            {item.type!="blog" ?
            <li className="masquerBtn" onClick={(e) => [e.stopPropagation()]}>
              Masquer/Afficher
              <ul className="masquerOptions">
                <li className="checkBox">
                  <div className="form-group">
                    <div className="d-flex justify-content-start align-align-items-center">
                      <input
                        type="checkbox"
                        id="desktop"
                        name="hidden-desktop"
                        value="desktop"
                        checked={item.hidden.desktop.toString() == "true"}
                        onChange={(e) => {
                          setPageHidden({
                            ...pageHidden,
                            desktop: !item.hidden.desktop,
                          });
                          changePageHidden(
                            "desktop",
                            item.hidden.desktop.toString()
                          );
                        }}
                      />
                      <label
                        htmlFor="desktop"
                        className={
                          item.hidden.desktop.toString() == "true"
                            ? "jaune"
                            : "grise"
                        }
                      >
                        <i className="fa-light fa-laptop"></i>
                        Masquer sur Ordinateur
                      </label>
                    </div>
                    <div className="d-flex justify-content-start align-align-items-center">
                      <input
                        type="checkbox"
                        checked={item.hidden.tablet.toString() == "true"}
                        id="tabletHidden"
                        name="hidden-tablet"
                        value="tablet"
                        onChange={(e) => {
                          setPageHidden({
                            ...pageHidden,
                            tablet: !item.hidden.tablet,
                          });
                          changePageHidden(
                            "tablet",
                            item.hidden.tablet.toString()
                          );
                        }}
                      />

                      <label
                        htmlFor="tabletHidden"
                        className={
                          item.hidden.tablet.toString() == "true"
                            ? "jaune"
                            : "grise"
                        }
                      >
                        <i className="fa-light fa-tablet"></i>
                        Masquer sur Tablette
                      </label>
                    </div>
                    <div className="d-flex justify-content-start align-align-items-center">
                      <input
                        type="checkbox"
                        id="mobileMobile"
                        checked={item.hidden.mobile.toString() == "true"}
                        name="hidden-mobile"
                        value="mobile"
                        onChange={(e) => {
                          setPageHidden({
                            ...pageHidden,
                            mobile: !item.hidden.mobile,
                          });
                          changePageHidden(
                            "mobile",
                            item.hidden.mobile.toString()
                          );
                        }}
                      />
                      <label
                        htmlFor="mobileMobile"
                        className={
                          item.hidden.mobile.toString() == "true"
                            ? "jaune"
                            : "grise"
                        }
                      >
                        <i className="fa-light fa-mobile"></i>
                        Masquer sur Mobile
                      </label>
                    </div>
                  </div>
                </li>
              </ul>
            </li>:""}
            {item.type!="blog" ?
            <li
              className={item.type == "lien" ? "d-none" : "b-block"}
              onClick={
                (e) => {
                  DupliquePage(item);
                } /* DupliquePage(node) */
              }
            >
              Dupliquer la page
            </li>:""}
          
            <li
              onClick={
                (e) => {
                  EditPage(item);
                } /*  EditPage(node) */
              }
            >
              Renommer
            </li>:
            {item.type == "lien" ? (
              ""
            ) : (
              <HasPermission  permission={["balise_meta_des_pages"]} >
              <li
                onClick={(e) => {
                  handleSingleSeo(item);
                }}
                className={
                  item.index == "false" &&
                  item.meta_title == "" &&
                  item.meta_desc == ""
                    ? "red"
                    : (item.index == "true" && item.meta_title == "") ||
                      item.meta_desc == ""
                    ? "orange"
                    : item.index == "false" &&
                      item.meta_title != "" &&
                      item.meta_desc != ""
                    ? "orange"
                    : "green"
                }
              >
                <span> Seo</span>
              </li>
              </HasPermission>
            )}
            {item.type!="blog" ?
            <li
              onClick={
                (e) => {
                  item.children.length > 0
                    ? handleDelete(item)
                    : handleSingleDelete(item);
                }
                /*  */
              }
            >
           
              
              {item.type == "lien" ? "Supprimer lien" : "Supprimer la  page "}
            </li> 
            :""}
          </ul>
        </div>
      </div>
    );
  };

  const handleCloseModalCreate = () => setShow(false);

  const changePageHidden = async (device, value) => {
    switch (value) {
      case "true":
        value = "false";
        break;
      case "false":
        value = "true";
        break;

      default:
        value = "false";
        break;
    }

    // console.log("hidenfirst", value);
    await axios
      .post(process.env.REACT_APP_API_URL + "/pages/hidemenu", {
        id: pageHiddenId,
        hidden: { [device]: value },
      })
      .then((response) => {
        getPages();
      })
      .catch((error) => {});
  };

  useEffect(() => {}, [pageHiddenId]);
  useEffect(() => {}, [pageHidden]);
  const EditPage = (e) => {
    seteditPage(e);
    setOldLink(e.url);
    setshowEdit(true);
  };
  const changePage = async (id) => {
    window.location.href = "/editor/" + siteId + "/page/" + id;
  };

  const SaveEditPage = async () => {
    setshowEdit(false);
    if (
      editPage.isHome == false &&
      editPage.url != oldLink &&
      redirection == true
    ) {
      await axios
        .post(
          process.env.REACT_APP_API_URL + "/redirections/create/" + siteId,
          { source: oldLink, destination: editPage.url, type: "301" }
        )
        .then(async (response) => {
          await axios
            .get(process.env.REACT_APP_API_URL + "/redirections/get/" + siteId)
            .then(async (response) => {
              let redirection = response.data.data;
              let responseSite = await axios.get(
                process.env.REACT_APP_API_URL + "/sites/get/" + siteId
              );

              let f = new FormData();
              f.append("redirections", JSON.stringify(redirection));
              f.append("domain", responseSite.data.data.site.domaine);

              await axios
                .post(
                  process.env.REACT_APP_API_URL + "/redirections/updatePlesk/",
                  f
                )
                .then((response) => {
                  toast.dismiss();
                  toast.success(response.data.message, {
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  });
                })
                .catch((err) => {
                  toast.dismiss();
                  toast.error(err.response.data.message, {
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  });
                });
            });
        });
    }
    await axios
      .post(
        process.env.REACT_APP_API_URL + "/pages/updatepage/" + editPage._id,
        {
          title: editPage.title,
          url: editPage.url,
        }
      )
      .then((response) => {
        getPages();
        let content = props.editor().getWrapper();
        content.view.render();
        toast.success(response.data.message, {
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((error) => {});
  };
  const DupliquePage = async (e) => {
    const newPage = {
      content: e.content,
      isHome: false,
      title: e.title + "-copie",
      url: e.url + "-copie",
      order: storeSite.pages.length,
      level: 0,
      SiteSchema: e.SiteSchema,
    };

    await axios
      .post(process.env.REACT_APP_API_URL + "/pages/dupliquer/" + e._id, {
        data: newPage,
      })
      .then(async (response) => {
        getPages();

        toast.success(response.data.message, {
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })

      .catch((error) => {});
  };
  const setHomePage = (item) => {
    toast.dismiss();
    const Notif = toast.loading("page d'accueil est en cours...");
    axios
      .get(
        process.env.REACT_APP_API_URL +
          "/pages/ishome/" +
          siteId +
          "/" +
          item._id
      )
      .then((response) => {
        toast.update(Notif, {
          render: response.data.message,
          type: "success",
          isLoading: false,
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        getPages();
      })
      .catch((error) => {
        toast.update(Notif, {
          render: error.response.data.message
            ? error.response.data.message
            : error.message,
          type: "error",
          isLoading: false,
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };
  const SupprimerPage = async (e) => {
    if (e.isHome == false) {
      await axios
        .delete(process.env.REACT_APP_API_URL + "/pages/delete/" + e._id)
        .then(async (response) => {
          getPages();

          toast.success(response.data.message, {
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          if (e._id == pageId) {
            const pagess = storeSite.pages;
            var result = pagess.filter((page) => {
              return page.isHome === true;
            });

            changePage(result[0]._id);
          }
          getPages();
        })
        .catch((error) => {});
    } else {
      toast.error("Impossible de supprimer cette page", {
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  const getPages = async () => {
    await axios
      .get(process.env.REACT_APP_API_URL + "/pages/getlist/" + siteId)
      .then(async (response) => {
        setPages({ treeData: response.data.data });
        dispatch(updatePages(response.data.data));
        await axios
          .post(
            process.env.REACT_APP_API_URL +
              "/sections/updateMenuBySite/" +
              siteId,
            {}
          )
          .then((response) => {
            let content = props.editor().getWrapper();
            content.view.render();
          });
        let content = props.editor().getWrapper();
        content.view.render();
      })
      .catch((error) => {});
  };
  useEffect(() => {
    getPages();
  }, []);
  const updateMenu = async (data) => {
    setPages({ treeData: data });
    await axios
      .post(process.env.REACT_APP_API_URL + "/pages/updatemenu/" + siteId, {
        pages: data,
      })
      .then(() => {
        getPages();
      });
  };
  useEffect(() => {}, [pages]);
  const handleDelete = (node) => {
    setShowDelete(true);
    setdeletedPage(node);
  };
  const handleSingleDelete = (node) => {
    setShowSingleDelete(true);
    setdeletedSinglePage(node);
  };
  const [idSeo, setIdeSeo] = useState();
  const handleSingleSeo = (node) => {
    setIdeSeo(node._id);
    setScriptSeo(node.text_scripts);
    setTitleSeo(node.meta_title);
    setDescriptionSeo(node.meta_desc);
    setIndexSeo(node.index === "true" ? true : false);
    setShowSingleSeo(true);
    setdeletedSingleSeo(node);
  };

  const AddPageModal = () => {
    setShow(true);
  };
  const Clear = () => {
    setLinks("");
    setNamepage("");
    setUrlpage("");
  };
  const AddPage = async () => {
    try {
      await axios
        .post(process.env.REACT_APP_API_URL + "/pages/create", {
          title: Namepage,
          link: links.exetrieur,
          type: links.type,
          SiteSchema: siteId,
          url: Urlpage,
          order: storeSite.pages.length,
          level: 0,
        })
        .then(async (response) => {
          toast.success(response.data.message, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setShowDelete(false);
          getPages();
          setNamepage("");
          setLinks({
            exetrieur: false,
            type: "page",
          });
          setUrlpage("");
        })
        .catch(function (error) {
          toast.error("Page non crée", {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
    } catch (e) {
      toast.error("Page non crée!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const [isValid, setIsValid] = useState(false);

  const [indexSeo, setIndexSeo] = useState(false);
  const [titleSeo, setTitleSeo] = useState("");
  const [descriptionSeo, setDescriptionSeo] = useState("");
  const [scriptSeo, setScriptSeo] = useState("");
  const [HtmlError, setHTMLerror] = useState([]);
  const changeActiveIndex = (e) => {
    setIndexSeo(!indexSeo);
  };
  const SeoPage = async () => {
    setHTMLerror([]);

    await axios
      .post(process.env.REACT_APP_API_URL + "/pages/updatedataseo/" + idSeo, {
        index: indexSeo,
        meta_title: titleSeo,
        meta_desc: descriptionSeo,
        text_scripts: scriptSeo,
      })
      .then(async (response) => {
        toast.success(response.data.message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setIndexSeo(!indexSeo);
        setShowSingleSeo(false);
        getPages();
      })
      .catch((err) => {
        toast.dismiss();
        toast.error("Merci de vérifier votre données");
        if (err.response.data.html) {
          setHTMLerror(err.response.data.html);
        }
      });
  };

  useEffect(() => {
    if (titleSeo != "" && descriptionSeo != "") {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
    setHTMLerror([]);
  }, [titleSeo, descriptionSeo, scriptSeo]);
  return (
    <div id="Menu">
      <div className="SectionAdd">
        <button
          type="button"
          className="btnpage "
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Créer une nouvelle page
        </button>
      </div>
      <div
        className="modal fade"
        id="exampleModal"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <span className="modal-title " id="exampleModalLabel">
                Création d'un nouvel item
              </span>

              <img
                src={iconClose}
                alt="close"
                className="btn-closeModal"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleClose}
              />
            </div>
            <div className="modal-body p-4">
              <div className="form-check mt-3">
                <input
                  className="form-check-input toggle-box"
                  type="checkbox"
                  id="identifier-1"
                  value={links}
                  onChange={(e) =>
                    setLinks({
                      exetrieur: e.target.checked,
                      type: e.target.checked ? "lien" : "page",
                    })
                  }
                  checked={links.exetrieur}
                />
                <label for="identifier-1" className="form-check-label">
                  Lien externe
                </label>
              </div>
              <div className="form-group m-form__group group_text">
                <input
                  required
                  type="text"
                  className="form-control namePage"
                  id="exampleInputPage"
                  aria-describedby="textHelp"
                  placeholder={links.exetrieur ? "Nom d'url" : "Nom du page"}
                  value={Namepage}
                  onChange={(e) => {
                    setNamepage(e.target.value);
                    setUrlpage("/" + txtTolink(e.target.value));
                  }}
                />
                <input
                  required
                  type="url"
                  className="form-control namePage"
                  id="exampleInputPage"
                  aria-describedby="textHelp"
                  placeholder={
                    links.exetrieur ? " Url du  lien" : "Url du  page"
                  }
                  value={Urlpage}
                  onChange={(e) =>
                    links.exetrieur
                      ? setUrlpage(e.target.value)
                      : setUrlpage("/" + txtTolink(e.target.value))
                  }
                />
              </div>
            </div>

            <div className="modal-footer btnFooter text-center d-block">
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={(e) => AddPage()}
              >
                {" "}
                CREER
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={(e) => Clear()}
              >
                ANULLER
              </button>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
      <Nestable
        className={"nestable-one"}
        items={pages.treeData}
        renderItem={renderItem}
        idProp={"_id"}
        maxDepth={3}
        onChange={({ items }) => updateMenu(items)}
      />
      <Modal
        show={showEdit}
        onHide={closeEdit}
        backdrop="static"
        keyboard={false}
        id="RenamePage"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {" "}
            {editPage.type == "lien" ? "Renommer lien" : "Renommer page"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-2">
          <div className="form-group mt-3">
            <label>
              {" "}
              {editPage.type == "lien" ? "Label du lien : " : "Label de page :"}
            </label>
            <input
              type="text"
              name="label"
              value={editPage.title}
              onChange={(e) =>
                seteditPage({
                  ...editPage,
                  title: e.target.value,
                })
              }
              required
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="Saisissez le nom de votre page"
            />
          </div>
          <div className="form-group mt-3">
            <label>
              {editPage.type == "lien" ? "Url du lien : " : "Url de page :"}
            </label>
            {editPage.type == "lien" ? (
              <input
                type="text"
                name="label"
                value={editPage.url}
                onChange={(e) =>
                  seteditPage({
                    ...editPage,
                    url: e.target.value,
                  })
                }
                required
                className="form-control"
                id="exampleFormControlInput2"
                placeholder="Saisissez le nom de votre lien"
              />
            ) : (
              <input
                type="text"
                name="label"
                value={editPage.url}
                onChange={(e) =>
                  seteditPage({
                    ...editPage,
                    url: "/" + txtTolink(e.target.value),
                  })
                }
                required
                className="form-control"
                id="exampleFormControlInput2"
                placeholder="Saisissez le nom de votre page"
              />
            )}
          </div>

          <div
            className={
              editPage.isHome == false && oldLink != editPage.url
                ? "form-check mt-3"
                : "d-none"
            }
          >
            <input
              class="form-check-input"
              type="checkbox"
              value=""
              id="flexCheckDefault"
              onChange={(e) => setRedirection(e.target.checked)}
            />
            <label class="form-check-label" for="flexCheckDefault">
              Activer la redirection 301 automaitquement
            </label>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeEdit}>
            Fermer
          </Button>
          <Button variant="primary" onClick={SaveEditPage}>
            Editer
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={showDelete}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
        className="modalDelete"
        id="addPageModal"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className="add_page_modal_header">
          <div className="titre_popup_page">
            <div className="modal_header_add_page ">
              <div className="titre_popup_add_page">Supprimer la page</div>

              <i
                className="fa-solid fa-xmark closeSideBar"
                onClick={handleClose}
              ></i>
            </div>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="add_page_modal_content d-flex justify-content-center  bg-white">
            <div className="addPageOptions">
              <div className="add_Page_Options_title">Suprimer les pages</div>
              <div>
                Si vous supprimez Empty Page, toutes ses sous-pages seront
                également effacées. Voulez-vous vraiment procéder à la
                suppression ?
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-rounded  btn-outline-secondary"
            onClick={(e) => setShowDelete(false)}
          >
            Non
          </button>
          <button
            className="btn  btn-rounded btn btn-outline-secondary delete"
            onClick={(e) => [setShowDelete(false), SupprimerPage(deletedPage)]}
          >
            Oui, supprimer les sous page aussi
          </button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={showSingleDelete}
        onHide={handleSingleClose}
        backdrop="static"
        keyboard={false}
        className="modalDelete"
        size="md"
        id="addPageModal"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className="add_page_modal_header">
          <div className="titre_popup_page">
            <div className="modal_header_add_page ">
              <div className="titre_popup_add_page">
                {deletedSinglePage.type == "lien"
                  ? "Supprimer lien"
                  : "Supprimer la page"}{" "}
              </div>

              <i
                className="fa-solid fa-xmark closeSideBar"
                onClick={handleSingleClose}
              ></i>
            </div>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="add_page_modal_content ">
            <div className="addPageOptions">
              <div className="add_Page_Options_title">
                Vous êtes sur de supprimer cette page {deletedSinglePage.title}!
                <br />
                Cette action ne peut pas être annulée.
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-rounded  btn-outline-secondary"
            onClick={(e) => setShowSingleDelete(false)}
          >
            Non
          </button>
          <button
            className="btn  btn-rounded btn btn-outline-secondary delete"
            onClick={(e) => [
              setShowSingleDelete(false),
              SupprimerPage(deletedSinglePage),
            ]}
          >
            {deletedSinglePage.type == "lien"
              ? "Oui"
              : "Oui, supprimer les sous page aussi"}
          </button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showSingleSeo}
        onHide={handleSeoClose}
        backdrop="static"
        keyboard={false}
        className="modalSeo"
        size="lg"
        id="addPageModal"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className="add_page_modal_header">
          <div className="titre_popup_page">
            <div className="modal_header_add_page ">
              <div className="titre_popup_add_page">
                {" "}
                Paramétre seo du la page{" "}
                <span className="NameSiteSeo">{deletedSingleSeo.title}</span>
              </div>

              <i
                className="fa-solid fa-xmark closeSideBar"
                onClick={handleSeoClose}
              ></i>
            </div>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div class="form-check form-switch mt-3 indexationtitre d-flex justify-content-between">
            <label className="form-check-label" htmlFor="isActiveShadow">
              Bloquez l'activité des bots <b>d'indexation sur cette page </b>de
              façon à ce qu'elle n'apparaisse pas dans les résultats de
              recherche.
            </label>

            <input
              className="form-check-input"
              type="checkbox"
              id={"isActiveShadow-"}
              name={"isActiveShadow-"}
              value={indexSeo}
              checked={indexSeo === true}
              onChange={changeActiveIndex}
            />
          </div>
          <div className="form-group mt-3">
            <label>Meta title:</label>
            <input
              type="text"
              name="label"
              value={titleSeo}
              onChange={(e) => setTitleSeo(e.target.value)}
              required
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="Saisissez titre du votre page"
            />
          </div>
          <div className="form-group mt-3 mb-3">
            <label>Meta description :</label>
            <input
              type="text"
              name="label"
              value={descriptionSeo}
              onChange={(e) => setDescriptionSeo(e.target.value)}
              required
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="Saisissez description  du votre page"
            />
          </div>
          <div
            className={
              HtmlError.length > 0
                ? "text-danger fw-light fst-italic"
                : "d-none"
            }
          >
            {HtmlError.map((err) => {
              return (
                <>
                  <small>* {err.message} </small> <br />
                </>
              );
            })}
          </div>
          <AceEditor
            placeholder="Ecrire votre html/javascript code..."
            mode="html"
            theme="monokai"
            name="blah2"
            width={"100%"}
            onChange={setScriptSeo}
            fontSize={14}
            showPrintMargin={false}
            showGutter={true}
            highlightActiveLine={true}
            value={scriptSeo}
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: true,
              showLineNumbers: true,
              tabSize: 2,
            }}
          />
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-rounded  btn-outline-secondary"
            onClick={(e) => setShowSingleSeo(false)}
          >
            Annuler
          </button>
          <button
            className="btn  btn-rounded btn btn-outline-secondary delete"
            // disabled={!isValid}
            onClick={(e) => SeoPage()}
          >
            Enregistrer
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
export default DraganDropMenu;
