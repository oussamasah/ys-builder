import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import "./Listeclient.css";
import toast, { Toaster } from "react-hot-toast";
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import PaginationClient from "../../../Paginations/PaginationClient";
import Etat from "../../../../assets/imgSites/Etat.svg";
import iconOption from "../../../../assets/imgSites/iconOption.svg";
import { useNavigate } from "react-router-dom";

export default function Listeclient() {
  const navigate = useNavigate();
  const storeUser = useSelector((state) => state.user.value);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [nomEntreprise, setNomEntreprise] = useState();
  const [adresse, setAdresse] = useState();
  const [phone, setPhone] = useState();
  const [search, setSearch] = useState();
  const [client, setClient] = useState([]);
  const [deletemodal, setShowDeleteModal] = useState(false);
  const [addmodal, setShowAddModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const nPages = Math.ceil((client && client.length) || 0 / recordsPerPage);

  const handleCloseDelete = () => {
    getClients()
  setShowDeleteModal(false);
}
  const handleCloseAdd = () => setShowAddModal(false);
  const handleInputChange = (event) => {
    setSearch(event.target.value);
  };
  const restInput = () => {
    setSearch("");
    getClients();
  };
;
  const supModal = (item) => {
    setClient(item);
    setShowDeleteModal(true);
  };
  const addModal = (item) => {
    //setClient(item);
    setShowAddModal(true);
  };
  const fiterSearsh = async (event) => {
  
    await axios
      .post(
        process.env.REACT_APP_API_URL +
          "/clients/filter/" +
          storeUser.user.CompteSchema._id,
        {
          search: search,
        }
      )

      .then((response) => {
  
   
        toast.success(response.data.message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
        });
        setClient(response.data.data || [])
      })
      .catch((error) => {
        console.log('**************',error)
        toast.error(

          error.response.data.message
            ? error.response.data.message
            : error.message,
          {
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
          }
        );
      });
  };
  
  
  const CreateClient = async () => {
    await axios
      .post(process.env.REACT_APP_API_URL + "/clients/create", {
        nom: firstName,
        prenom: lastName,
        email: email,
        entreprise: nomEntreprise,
        adresse: adresse,
        phone: phone,
        CompteSchema: storeUser.user.CompteSchema._id,
      })
      .then((response) => {
        getClients();
        setShowAddModal(false);
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
  const getClients = async () => {
    await axios
      .get(
        process.env.REACT_APP_API_URL +
          "/clients/getbycompte/" +
          storeUser.user.CompteSchema._id
      )
      .then((response) => {

        toast.success(response.data.message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
        });

        setClient(response.data.data);
      })
      .catch((error) => {
        console.log("-----------",error)
        toast.error(
          error.response.data.message
            ? error.response.data.message
            : error.message,
          {
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
          }
        );
      });
  };
  const Voir = async (item) => {
    navigate("/clientequipe/gestionclient/detailclient/"+item._id);
  };

  const hasMediaEffectRun = useRef(false);
  useEffect(() => {
    const fetchData = async () => {
      if (!hasMediaEffectRun.current) {
        hasMediaEffectRun.current = true;
        await getClients();
      }
    };

    fetchData();
  }, []);
  const deleteClient = async () => {
    await axios
      .delete(
        process.env.REACT_APP_API_URL + "/clients/deleteclient/" + client._id
      )
      .then((response) => {
        getClients();
        setShowDeleteModal(false);
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
  return (
    <div className="  container mt-4" id="listclient">
      <div className="row">
        <div className="col-md-6">
          <div className="title-liste-site">
            <div className="title-border"></div>
            <span>Liste de clients</span>
          </div>
        </div>
        <div className="col-md-6">
          <a className="create-btn cursor" onClick={addModal}>
            {" "}
            <i className="fa-solid fa-plus"></i> Créer un client
          </a>
        </div>
      </div>
      <div className="bodySite">
        <div className="row">
          <div className="col-md-4">
            <div className="input-group mb-3 serash-sites">
              <input
                type="text"
                value={search}
                className="form-control"
                placeholder="Rechercher par client"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                onChange={handleInputChange}
              />
              <button onClick={restInput} className="iclosed" type="reset">
                &times;
              </button>
              <div className="input-group-append">
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={fiterSearsh}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
        <table className="table table-borderless tablesite">
          <thead>
            <tr>
              <th scope="col" className="Actions">
                <span>COORDONNÉES</span>
              </th>
              <th scope="col" className="Actions">
                <span>SITE</span>
              </th>

              <th scope="col" className="Actions">
                <span>AUTORISATIONS</span>
              </th>

              <th scope="col" className="Etat" colSpan={3}>
                <span>
                  {" "}
                  ETAT
                  <img src={Etat} className="Etatimg" alt="Edit" />
                </span>
              </th>

              <th scope="col" className="Etat">
                {" "}
              </th>
            </tr>
          </thead>

          <tbody>
            {client.length > 0 ? (
              client
                .slice(indexOfFirstRecord, indexOfLastRecord)

                .map((item, index) => {
                  return (
                    <tr key={index} className="solid">
                      {/* <td>{item._id}</td> */}
                      <td className="tableNameSite">
                        <div className="client ">
                          <div className="iconNom">
                          {item && item.nom?.charAt(0)} {item && item.prenom?.charAt(0)}
                          </div>
                          <span className="clients cursor ">
                            <span
                              className=" text-capitalize"
                              onClick={() => Voir(item)}
                            >
                              <b>{item.nom} </b>
                            </span>

                            <Toaster />
                            <span className="name"> {item.email}</span>
                          </span>
                        </div>
                      </td>
                      <td>
                        <div id="listesites">
                          {item.clientToken == undefined ? (
                            <span className="name">URL non disponible </span>
                          ) : (
                            <>
                              {item.clientToken &&
                                item.clientToken.map((c, index) => (
                                  <div key={index} className="listesdomaine">
                                    <span className="name">
                                      <b>  {c.site && c.site.nom}</b>
                                    </span>
                                    <span className="name">
                                       {c.site && c.site.domaine}
                                    </span>
                                  </div>
                                ))}
                            </>
                          )}
                        </div>
                      </td>
                      <td>
                        <div id="listesites">
                          {item.clientToken == undefined ? (
                            <span className="name">Aucun permission </span>
                          ) : (
                            <>
                              {item.clientToken &&
                                item.clientToken.map((c, index) => (
                                  <div key={index}>
                                    {/* Display permissions for the site */}
                                    {c.permission && (
                                      <div>
                                        {c.permission.length === 0 ? (
                                          <span className="name">
                                            Aucun permission{" "}
                                          </span>
                                        ) : (
                                          c.permission.map((perm, i) => (
                                            <div key={i}>
                                              <span className="name">
                                                {perm.label}
                                              </span>
                                            </div>
                                          ))
                                        )}
                                      </div>
                                    )}
                                  </div>
                                ))}
                            </>
                          )}
                        </div>
                      </td>

                      <td className="d-flex justify-content-center align-items-center">
                        <div
                          className={
                            item.clientToken == undefined
                              ? "etatclient  inactif"
                              : "etatclient  demo"
                          }
                        >
                          {item.clientToken == undefined ? (
                            <span className=" type"> Invité</span>
                          ) : (
                            <span className="  type"> Attribué</span>
                          )}
                        </div>
                      </td>
                      <td>
                        <div className="btn-group dropstart">
                          <button
                            className="dropdown-toggle "
                            type="button"
                            id="dropdownMenuButton2"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            title="Option"
                          >
                            <img src={iconOption} className="edit" />
                          </button>
                          <ul
                            className="dropdown-menu"
                            aria-labelledby="dropdownMenuButton2"
                          >
                            <li className=" d-flex align-items-center">
                              <i className="fa-solid fa-key"></i>

                              <span onClick={() => Voir(item)}>
                                Sites et autorisations
                              </span>
                            </li>
                            <li className="redd d-flex align-items-center">
                              <i className="fal fa-trash-alt"></i>

                              <span onClick={() => supModal(item)}>
                                Supprimer client
                              </span>
                            </li>
                          </ul>
                        </div>
                      </td>
                    </tr>
                  );
                })
            ) : (
              <tr>
                <td colSpan="4">Aucun client disponible</td>
              </tr>
            )}
          </tbody>
        </table>

        {client.length > recordsPerPage ? (
          <PaginationClient
            nPages={nPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        ) : (
          <div> </div>
        )}
        <Toaster />
      </div>
      <Modal
        show={addmodal}
        onHide={handleCloseAdd}
        backdrop="static"
        keyboard={false}
        className="modalCreer"
        size="md"
        id="addPageModal"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className="add_page_modal_header">
          <div className="titre_popup_page">
            <div className="modal_header_add_page ">
              <div className="titre_popup_add_page"> Créer un client</div>

              <i
                className="fa-solid fa-xmark closeSideBar"
                onClick={handleCloseAdd}
              ></i>
            </div>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="add_page_modal_content ">
            <div className="addPageOptions">
              <div className="add_Page_Options_title">
                <div className="d-flex justify-content-between ">
                  <input
                    className="form-control mb-3 me-2 "
                    type="text"
                    placeholder="Saisissez le nom"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />

                  <input
                    className="form-control mb-3  me-2"
                    type="text"
                    placeholder="Saisissez le prénom"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
                <input
                  className={`form-control mb-3 ${
                    isEmailValid ? "" : "is-invalid"
                  }`}
                  type="email"
                  placeholder="Entrer l'adresse e-mail"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setIsEmailValid(emailRegex.test(e.target.value));
                  }}
                />
                <div className="d-flex justify-content-between ">
                  <input
                    className="form-control mb-3 me-2 "
                    type="text"
                    placeholder="Nom d'entreprise"
                    value={nomEntreprise}
                    onChange={(e) => setNomEntreprise(e.target.value)}
                  />

                  <input
                    className="form-control mb-3  me-2"
                    type="text"
                    placeholder="Adresse"
                    value={adresse}
                    onChange={(e) => setAdresse(e.target.value)}
                  />
                </div>
                <div className="d-flex justify-content-between ">
                  <input
                    className="form-control mb-3 me-2 "
                    type="number"
                    placeholder="0101010101"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-rounded  btn-outline-secondary"
            onClick={handleCloseAdd}
          >
            Annuler
          </button>
          <button
            className="btn  btn-rounded btn btn-outline-secondary  create"
            disabled={
              !firstName || !firstName || !nomEntreprise || !adresse || !phone
            }
            onClick={CreateClient}
          >
            Ajouter
          </button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={deletemodal}
        onHide={handleCloseDelete}
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
              <div className="titre_popup_add_page"> Supprimer client</div>

              <i
                className="fa-solid fa-xmark closeSideBar"
                onClick={handleCloseDelete}
              ></i>
            </div>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="add_page_modal_content ">
            <div className="addPageOptions">
              <div className="add_Page_Options_title">
                Voulez-vous vraiment supprimer le client<b> {client.nom} ? </b>
                <br />
                Cette action ne peut pas être annulée.
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-rounded  btn-outline-secondary"
            onClick={handleCloseDelete}
          >
            Annuler
          </button>
          <button
            className="btn  btn-rounded btn btn-outline-secondary delete"
            onClick={deleteClient}
          >
            Supprimer
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
