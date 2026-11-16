import React, { useRef, useState } from "react";
import "./ListRole.css";
import axios from "axios";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { Modal } from "react-bootstrap";
import { useEffect } from "react";
export default function ListRole(props) {
  const storeUser = useSelector((state) => state.user.value);
  const [deleteId, setDeleteId] = useState("");
  const [listMembre, setListMembre] = useState([]);
  const [listusers, setListUsers] = useState([]);
  const [show, setShow] = useState(false);
  const [showgroupe, setShowGroupe] = useState(false);
  const handleClose = () => setShow(false);
  const handleCloseGroupe = () => setShowGroupe(false);
  const supModal = (item) => {
    setListUsers(item);
    setShow(true);
  };
  const supModalGroupe = (item) => {
    setDeleteId(item);
    setShowGroupe(true);
  };

  const deleteTeamItem = async () => {
    await axios
      .delete(process.env.REACT_APP_API_URL + "/users/delete/" + listusers._id)
      .then((response) => {
        getRoles();
        setShow(false);
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
        toast({
          render: error.response.data.message
            ? error.response.data.message
            : error.message,
          type: "error",
          isLoading: false,
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
        });
      });
  };

  const deleteGroupe = async () => {
    await axios
      .delete(process.env.REACT_APP_API_URL + "/roles/delete/" + deleteId._id)
      .then((response) => {
        getRoles();
        setShowGroupe(false);
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
        toast({
          render: error.response.data.message
            ? error.response.data.message
            : error.message,
          type: "error",
          isLoading: false,
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
        });
      });
  };
  const getRoles = async () => {
    axios
      .get(
        process.env.REACT_APP_API_URL +
          "/roles/getgroupes/" +
          storeUser.user.CompteSchema._id
      )
      .then((res) => {
        setListMembre(res.data.data);
      });
  };
  const EditGroupe = async (value) => {
    props.changeView("EditRole", value);
    // props.setRole(value)
  };
  const EditUser = async (value) => {
    props.changeView("EditUser", value);
    // props.setRole(value)
  };

  const hasMediaEffectRun = useRef(false);
  useEffect(() => {
    const fetchData = async () => {
      if (!hasMediaEffectRun.current) {
        hasMediaEffectRun.current = true;
        await getRoles();
      }
    };

    fetchData();
  }, []);
  useEffect(() => {}, [listMembre]);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <div className="title-liste-site">
          <p>
            Team ont accès à tous les sites de ce compte. Les groupes de
            permissions qui leur sont attribués ici s'appliquent à tous les
            sites. <br />
            REMARQUE : les membres de Team recevront des communications telles
            que les notes de mise à jour des produits.
          </p>
        </div>
        <button
          className="btn-add-membre"
          type="button"
          onClick={(e) => props.changeView("AddMembre")}
        >
          <i className="fa-solid fa-user-plus"></i> Ajouter membre
        </button>
      </div>
      <div className="input-group-append  d-flex justify-content-end mb-3">
        <button
          className="btn btn-outline-secondary addm"
          type="button"
          onClick={(e) => props.changeView("addRole")}
        >
          Ajouter un groupe personnalisé
        </button>
      </div>

      {listMembre.map((list, index) => {
        return (
          <div id="alllist" key={index}>
            <div
              className="accordion accordion-flush mb-2"
              id="accordionFlushExample"
            >
              <div className="accordion-item mb-2 ">
                {list.type != "default" ? (
                 <> <div className="removeuser">
                    {" "}
                    <i
                      className="fa-solid fa-trash  cursor"
                      onClick={() => supModalGroupe(list)}
                    ></i>{" "}
                  </div>
                  <Modal
                        show={showgroupe}
                        onHide={handleCloseGroupe}
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
                                {" "}
                                Supprimer groupe
                              </div>

                              <i
                                className="fa-solid fa-xmark closeSideBar"
                                onClick={handleCloseGroupe}
                              ></i>
                            </div>
                          </div>
                        </Modal.Header>
                        <Modal.Body>
                          <div className="add_page_modal_content ">
                            <div className="addPageOptions">
                              <div className="add_Page_Options_title">
                                Voulez-vous vraiment supprimer cette groupe{" "}
                                <b> {deleteId && deleteId.name}</b> ?
                                <br />
                                Cette action ne peut pas être annulée.
                              </div>
                            </div>
                          </div>
                        </Modal.Body>
                        <Modal.Footer>
                          <button
                            className="btn btn-rounded  btn-outline-secondary"
                            onClick={handleCloseGroupe}
                          >
                            Annuler
                          </button>
                          <button
                            className="btn  btn-rounded btn btn-outline-secondary delete"
                            onClick={deleteGroupe}
                          >
                            Supprimer groupe
                          </button>
                        </Modal.Footer>
                      </Modal>
</>
                ) : (
                  ""
                )}
                <h2
                  className="accordion-header"
                  id={"flush-heading" + list._id}
                >
                  
                  <button
                    className={list.type != "default"?"accordion-button collapsed update":"accordion-button collapsed"}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={"#flush-collapse" + list._id}
                    aria-expanded="false"
                    aria-controls={"flush-collapse" + list._id}
                  >
                    <div className="d-flex justify-content-between w-100 ms-4">
                      <div
                        className="iconteams"
                        style={{ background: list.color }}
                      >
                        <i className="fa-solid fa-user-tie"></i>
                      </div>
                      <div className="nameGroupe ms-2">
                        {list.name} (
                        {list.users && Array.isArray(list.users)
                          ? list.users.length
                          : 0}
                        ){" "}
                      </div>

                      <div className="etatGroupe me-4" d>
                        {list.type == "default" ? (
                          <div>
                            <span
                              onClick={(e) => {
                                EditGroupe(list);
                              }}
                            >
                              <b>Vue</b>
                            </span>
                          </div>
                        ) : (
                          <div className="d-flex justify-content-between">
                            <span
                              className=" me-2"
                              onClick={(e) => {
                                EditGroupe(list);
                              }}
                            >
                              <b>Modifier</b>
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </button>
                </h2>
                <div
                  id={"flush-collapse" + list._id}
                  className="accordion-collapse collapse"
                  aria-labelledby={"flush-heading" + list._id}
                  data-bs-parent="#accordionFlushExample"
                >
                  {list.users && list.users.length !== 0 ? (
                    <div className="accordion-body">
                      <div className="row">
                        {list.users &&
                          list.users.map((te, index) => (
                            <div className=" col-md-6 mb-4" key={index}>
                              <div className="teamitem">
                                <div className="d-flex justify-content-between  align-items-center">
                                  <div className="actionteam text-start">
                                    <span className="d-block">{te.name}</span>
                                    <span className="d-block">{te.email}</span>
                                  </div>
                                  <div className="actionteam">
                                    <i
                                      className="fa-solid fa-pen cursor p-2"
                                      onClick={(e) => {
                                        EditUser(te);
                                      }}
                                    ></i>
                                    <i
                                      className="fa-solid fa-xmark  cursor p-2"
                                      onClick={() => supModal(te)}
                                    ></i>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                   

                      <Modal
                        show={show}
                        onHide={handleClose}
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
                                {" "}
                                Supprimer membre
                              </div>

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
                                Voulez-vous vraiment supprimer cette membre
                                <b> {listusers && listusers.email} ? </b>
                                <br />
                                Cette action ne peut pas être annulée.
                              </div>
                            </div>
                          </div>
                        </Modal.Body>
                        <Modal.Footer>
                          <button
                            className="btn btn-rounded  btn-outline-secondary"
                            onClick={handleClose}
                          >
                            Annuler
                          </button>
                          <button
                            className="btn  btn-rounded btn btn-outline-secondary delete"
                            onClick={deleteTeamItem}
                          >
                            Supprimer utilisateur
                          </button>
                        </Modal.Footer>
                      </Modal>
                    </div>
                  ) : (
                    <span
                      className="d-block p-2 cursor"
                      onClick={(e) => props.changeView("AddMembre")}
                    >
                      <u>
                        {" "}
                        Ce groupe est vide. Cliquez pour ajouter des membres.
                      </u>
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
