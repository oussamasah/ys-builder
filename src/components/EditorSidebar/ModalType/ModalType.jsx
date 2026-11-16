import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import "./ModalType.css";
import OptionItem from "../../../assets/imgMenuSort/OptionItem.svg";
import iconClose from "../../../assets/imgEditorSidebar/iconClose.png";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { MultiSelect } from "react-multi-select-component";
import { useDispatch, useSelector } from "react-redux";
// import { updatePages } from "../../../redux/features/site";
import { Button, Modal } from "react-bootstrap";
import { prop } from "dom7";
function ModalType() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const handleClose = () => setShowDelete(false);
  const handleSingleClose = () => setShowSingleDelete(false);
  const [pageHiddenId, setPageHiddenId] = useState(false);
  const closeEdit = () => setshowEdit(false);
  const [showDelete, setShowDelete] = useState(false);
  const [Namepopup, setNamepopup] = useState();

  const [showSingleDelete, setShowSingleDelete] = useState(false);
  const [showEdit, setshowEdit] = useState(false);
  const dispatch = useDispatch();
  const storeSite = useSelector((state) => state.site.value);
  let { siteId, pageId } = useParams();
  const [TypeModal, setTypeModal] = useState([
    { value: "default", name: "Popup par default" },
    { value: "plan", name: "Plan du site" },
    { value: "legales", name: "Mentions légales" },
  ]);
  const [deletedModal, setdeletedModal] = useState(false);
  const [deletedSingleModal, setdeletedSingleModal] = useState(false);

  const [isValid, setIsValid] = useState(false);

  const [duree, setDuree] = useState();
  const [pageHidden, setPageHidden] = useState({
    id: "",
    desktop: false,
    tablet: false,
    mobile: false,
  });
  const handleDelete = (node) => {
    setShowDelete(true);
    setdeletedModal(node);
  };
  const handleSingleDelete = (node) => {
    setShowSingleDelete(true);
    setdeletedSingleModal(node);
  };
  const [Popup, setPopup] = useState([]);

  const [animation, setAnimation] = useState(false);
  const [editPopup, seteditPopup] = useState({
    title: "",
    type: "modal-xl",
    animation: false,
    pages: [],
    duree: 5000,
  });

  const changePopup = async (e) => {
    navigate("/editor/" + siteId + "/popup/" + e._id);
  };

  const AddPopup = async () => {
    try {
      await axios
        .post(process.env.REACT_APP_API_URL + "/popups/create", {
          SiteSchema: siteId,
          title: editPopup.title,
          type: editPopup.type,
          annimation: editPopup.animation,
          pages: editPopup.pages,
          duree: editPopup.duree,
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
          getModal();
        })
        .catch(function (error) {
          toast.error("Popup non crée", {
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
      toast.error("Popup non crée!", {
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
  const EditPopup = (e) => {
    seteditPopup(e);
    setshowEdit(true);
  };
  const DupliqueModal = async (e) => {
    console.log(e);
    const newModal = {
      content: e.content,
      title: e.title + "-copie",
      type: e.type + "-copie",
      annimation: e.animation + "-copie",
      pages: e.selected + "-copie",
      duree: e.duree + "-copie",
      SiteSchema: e.SiteSchema,
    };
    await axios
      .post(process.env.REACT_APP_API_URL + "/popups/duplicate/" + e._id, {
        data: newModal,
      })
      .then((response) => {
        setPopup(response.data.data);
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
  const customValueRenderer = (selected, _options) => {
    return selected.length
      ? selected.map(({ label }) => "✔️ " + label)
      : "Acune page sélectioné";
  };
  const SaveEditModal = async () => {
    setshowEdit(false);
    await axios
      .post(
        process.env.REACT_APP_API_URL + "/popups/updatepopup/" + editPopup._id,
        {
          title: editPopup.title,
          type: editPopup.type,
          annimation: editPopup.animation,
          pages: editPopup.pages,
          duree: editPopup.duree,
        }
      )
      .then((response) => {
        setPopup(response.data.data);
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
  const SupprimerPopup = async (e) => {
    try {
      await axios
        .delete(process.env.REACT_APP_API_URL + "/popups/delete/" + e._id)
        .then((response) => {
          // getModal( response.data.data );
          toast.success(response.data.message, {
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });

          setPopup(response.data.data);
        })
        .catch(function (error) {});
    } catch (e) {
      toast.error("Impossible de supprimer cette popup", {
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
  const getModal = async () => {
    await axios
      .get(process.env.REACT_APP_API_URL + "/popups/getAll/" + siteId)
      .then((response) => {
        setPopup(response.data.data);
      })
      .catch((error) => {});
  };
  useEffect(() => {
    if (editPopup.animation) {
      if (
        editPopup.title != "" &&
        editPopup.type != "" &&
        editPopup.pages.length > 0 &&
        editPopup.duree != "" &&
        editPopup.duree > 1000
      ) {
        setIsValid(true);
      } else {
        setIsValid(false);
      }
    } else {
      if (editPopup.title.length > 3 && editPopup.type != "") {
        setIsValid(true);
      } else {
        setIsValid(false);
      }
    }
  }, [editPopup]);
  useEffect(() => {}, [isValid]);
  useEffect(() => {
    getModal();
  }, []);
  const [pages, setPages] = useState([]);

  const getPages = async () => {
    await axios
      .get(process.env.REACT_APP_API_URL + "/pages/getAll/" + siteId)
      .then(async (response) => {
        const data = response.data.data;
        let datapages = await Promise.all(
          data.map((p) => {
            return { label: p.title, value: p._id };
          })
        );
        setPages(datapages);
      })
      .catch((error) => {});
  };
  const [selected, setSelected] = useState([]);
  useEffect(() => {
    getPages();
  }, []);

  return (
    <div id="Popup">
      <div className="SectionAdd">
        <button
          type="button"
          className="btnpage "
          data-bs-toggle="modal"
          data-bs-target="#exampleModals"
          onClick={(e) => getPages()}
        >
          Créer une nouvelle popup
        </button>
      </div>
      <div
        className="modal fade"
        id="exampleModals"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <span className="modal-title " id="exampleModalLabel">
                Création d'un nouvel modal
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
              <div className="form-group m-form__group group_text">
                <input
                  required
                  type="text"
                  className="form-control namePage"
                  id="exampleInputPage"
                  aria-describedby="textHelp"
                  placeholder="Nom du popup"
                  value={Namepopup}
                  onChange={(e) => {
                    seteditPopup({
                      ...editPopup,
                      title: e.target.value,
                    });
                  }}
                />
                {/* <select
                  className="form-select title-selects" 
                  aria-label="Type du  popup"
                  onChange={onChangeTypePages}
                >
                  {pages.map((page) => {
                    return <option value={page.value}>{page.title} </option>;
                  })}
                </select> */}

                <select
                  className="form-select title-selects"
                  aria-label="Type du  popup"
                  onChange={(e) =>
                    seteditPopup({
                      ...editPopup,
                      type: e.target.value,
                    })
                  }
                >
                  {TypeModal.map((type) => {
                    return <option value={type.value}>{type.name} </option>;
                  })}
                </select>

                <div className="form-check">
                  <input
                    className="form-check-input toggle-box"
                    type="checkbox"
                    id="identifier-1"
                    value={animation}
                    onChange={(e) =>
                      seteditPopup({
                        ...editPopup,
                        animation: e.target.checked,
                      })
                    }
                    checked={editPopup.animation}
                  />
                  <label for="identifier-1" className="form-check-label">
                    Animation hors d'ouverture
                  </label>
                </div>
                <div
                  id="divcheck"
                  className={editPopup.animation ? "d-block" : "d-none"}
                >
                  <MultiSelect
                    options={pages}
                    value={editPopup.pages}
                    isCreatable={false}
                    valueRenderer={customValueRenderer}
                    overrideStrings={{
                      allItemsAreSelected: "Tout les page sont sélectionés",
                      clearSearch: "vider la recherche",
                      clearSelected: "vider la sélection",
                      noOptions: "Aucune page trouvé",
                      search: "Chercher",
                      selectAll: "Selectioner tout",
                      selectSomeItems: "selectioner...",
                    }}
                    onChange={(e) =>
                      seteditPopup({
                        ...editPopup,
                        pages: e,
                      })
                    }
                    hasSelectAll={false}
                  />
                  <div className="form-group m-form__group group_text mt-3">
                    <input
                      required
                      type="number"
                      className="form-control namePage hidden-input"
                      id="exampleInputPage"
                      aria-describedby="textHelp"
                      placeholder="Durée en ms"
                      step={1000}
                      min={1000}
                      max={10000}
                      value={editPopup.duree}
                      onChange={(e) =>
                        seteditPopup({
                          ...editPopup,
                          duree: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer btnFooter text-center d-block">
              <button
                type="button"
                className="btn btn-primary"
                onClick={(e) => AddPopup()}
                data-bs-dismiss="modal"
                disabled={!isValid}
              >
                {" "}
                CREER
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                ANULLER
              </button>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
      {Popup.length == 0 ? (
        <div className="d-block text-center m-2">
          <span className="messageMpdal">Pas de popup crée</span>
        </div>
      ) : (
        <div class="nestable-item-name">
          {Popup.map((pop) => {
            return (
              <div className="listPopup">
                <div
                  id="PopupItem"
                  class="PopupItem d-flex  justify-content-between     align-items-center"
                >
                  <div className="d-flex justify-content-between  pops   align-items-center">
                    <i class="fa-solid fa-pager"></i>
                    <span className="Parent">{pop.title}</span>
                    {pop.annimation == true ? (
                      <div>
                        <span className="badge rounded-pill text-bg-warning d-inline me-2">
                          Auto
                        </span>
                      </div>
                    ) : (
                      <span className="badge rounded-pill text-bg-secondary d-inline">
                        Clic
                      </span>
                    )}
                  </div>
                  <div className="btnLbel ">
                    <button
                      className="btn-option"
                      type="button"
                      id={pop._id}
                      data-bs-toggle="dropdown"
                      aria-expanded="true"
                      onClick={(e) => [
                        setPageHiddenId(pop._id),
                        setPageHidden(pop.hidden),
                      ]}
                    >
                      <img src={OptionItem} alt="OptionItem" />
                    </button>
                    <ul
                      className="dropdown-menu optionmodal"
                      aria-labelledby={pop._id}
                    >
                      {/* <li
              onClick={
                (e) => {
                    changePopup(pop._id);
                } 
              }
            >
              Editer pop-up
            </li> */}
                      <li
                        onClick={(e) => {
                          changePopup(pop);
                        }}
                      >
                        Edit content pop-up
                      </li>
                      <li
                        onClick={(e) => {
                          DupliqueModal(pop);
                        }}
                      >
                        Dupliquer pop-up
                      </li>
                      <li
                        onClick={(e) => {
                          EditPopup(pop);
                        }}
                      >
                        Editer pop-up
                      </li>
                      <li
                        data-bs-toggle="modal"
                        data-bs-target="#ModalSupprimer"
                        onClick={
                          (e) => {
                            handleDelete(pop);
                          }
                          /*  */
                        }
                      >
                        Supprimer pop-up
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
          <Modal
            show={showEdit}
            onHide={closeEdit}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Renommer pop-up</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="form-group mt-3">
                <input
                  type="text"
                  name="label"
                  value={editPopup.title}
                  onChange={(e) =>
                    seteditPopup({
                      ...editPopup,
                      title: e.target.value,
                    })
                  }
                  required
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Saisissez le nom de votre popup"
                />
              </div>
              <div className="form-group mt-3">
                <select
                  className="form-select title-selects"
                  aria-label="Type du  popup"
                  value={editPopup.type}
                  onChange={(e) =>
                    seteditPopup({
                      ...editPopup,
                      type: e.target.value,
                    })
                  }
                >
                  {TypeModal.map((type) => {
                    return <option value={type.value}>{type.name} </option>;
                  })}
                </select>
              </div>
              <div className="form-group mt-3">
                <div className="form-check">
                  <input
                    className="form-check-input toggle-box"
                    type="checkbox"
                    id="identifier-1"
                    value={editPopup.titleanimation}
                    onChange={(e) =>
                      seteditPopup({
                        ...editPopup,
                        animation: e.target,
                      })
                    }
                    checked={editPopup.animation}
                  />
                  <label for="identifier-1" className="form-check-label">
                    Animation hors d'ouverture
                  </label>
                </div>
                {editPopup.animation}
                <div
                  id="divchecks"
                  className={editPopup.animation == true ? "d-block" : "d-none"}
                >
                  <MultiSelect
                    options={pages}
                    value={selected}
                    onChange={setSelected}
                    hasSelectAll={false}
                  />
                  <div className="form-group m-form__group group_text mt-3">
                    <input
                      required
                      type="number"
                      className="form-control namePage hidden-input"
                      id="exampleInputPage"
                      aria-describedby="textHelp"
                      placeholder="Durée en ms"
                      value={duree}
                      onChange={(e) => {
                        setDuree(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={closeEdit}>
                Fermer
              </Button>
              <Button variant="primary" onClick={SaveEditModal}>
                Editer
              </Button>
            </Modal.Footer>
          </Modal>
          <Modal
            show={showDelete}
            onHide={handleDelete}
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
                  <div className="titre_popup_add_page"> Supprimer pop-pup</div>

                  <i
                    className="fa-solid fa-xmark closeSideBar"
                    onClick={handleClose}
                  ></i>
                </div>
              </div>
            </Modal.Header>
            <Modal.Body>
              <div className="add_page_modal_content ">
                <div className="addPageOptions">
                  <div className="add_Page_Options_title">
                    Vous êtes sur de supprimer pop-pup{" "}
                    <b>{deletedModal.title}!</b>
                    <br />
                    Cette action ne peut pas être annulée.
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
                onClick={(e) => [
                  setShowDelete(false),
                  SupprimerPopup(deletedModal),
                ]}
              >
                Oui
              </button>
            </Modal.Footer>
          </Modal>
        </div>
      )}
    </div>
  );
}
export default ModalType;
