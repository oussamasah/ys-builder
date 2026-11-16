import React, { useEffect, useState } from "react";
import "./StatistiqueClient.css";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import imgSite from "../../assets/imgSites/imgSite.svg";
import { setcurrentSite, removecurrentSite } from "../../redux/features/site";
import { setStyleElement } from "../../redux/features/editor";
// import Etat from "../../assets/imgSites/Etat.svg";
// import iconOption from "../../assets/imgSites/iconOption.svg";
import axios from "axios";
import Visite from "./Visite/Visite";
import { loginClient, logoutClient } from "../../redux/features/client";
import { login, logout } from "../../redux/features/user";
import { Modal, Pagination } from "react-bootstrap";

import HasPermission from "../../pages/Authentification/AuthGard/HasPermission";
import Cookies from "universal-cookie";
import TopbarsClient from "./TopbarsClient/TopbarsClient";
export default function StatistiqueClient() {
  const cookies = new Cookies();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const storeClient = useSelector((state) => state.client.value);

  const location = useLocation();
  const clientData = location.state?.clientData || {};
  const [activeTab, setActiveTab] = useState("v-pills-apercu");
  const [activeTabplus, setActiveTabplus] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataInretour, setDataInretour] = useState([]);
  // const [etat, setEtat] = useState("");
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showdeteleModal, setShowdeteleModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const itemsPerPage = 8;
  const handleCloseDetail = () => {
    setShowDetailModal(false);
  };
  const handleCloseDelete = () => {
    setShowdeteleModal(false);
  };
  const detailModal = async (item) => {
    try {
      // Update the state to mark the item as read
      setSelectedItem(item);
      setShowDetailModal(true);

      // Make an API call to mark the item as read
      const response = await axios.post(
        process.env.REACT_APP_API_URL + "/messages/vu/" + item._id
      );

      toast.success(response.data.message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });

      // Fetch updated data after marking the item as read
      getRetourFormulaire();
    } catch (error) {
      toast.error(error.response?.data.message || error.message, {
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
    }
  };
  const handlePageChange = (page) => {
    // console.log(page);
    setCurrentPage(page);
  };

  const getPaginatedData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return (
      dataInretour?.[activeTabplus]?.results.slice(startIndex, endIndex) || []
    );
  };
  const nextPage = () => {
    if (currentPage !== itemsPerPage) setCurrentPage(currentPage + 1);
  };

  const handleTabClick = (index) => {
    setActiveTab(index);
  };
  const handleTabClickplus = (index) => {
    setActiveTabplus(index);
  };
  const supModal = (item) => {
    // console.log(item);
    setSelectedItem(item);
    setShowdeteleModal(true);
  };

  const deleteReponse = async () => {
    // console.log(selectedItem._id);
    await axios
      .delete(
        process.env.REACT_APP_API_URL + "/messages/delete/" + selectedItem._id
      )
      .then((response) => {
        getRetourFormulaire();
        setShowdeteleModal(false);
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
        // console.log(error);
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
  // const downloadFile = ({ data, fileName, fileType }) => {
  //   const blob = new Blob([data], { type: fileType });
  //   const a = document.createElement("a");
  //   a.download = fileName;
  //   a.href = window.URL.createObjectURL(blob);
  //   const clickEvt = new MouseEvent("click", {
  //     view: window,
  //     bubbles: true,
  //     cancelable: true,
  //   });
  //   a.dispatchEvent(clickEvt);
  //   a.remove();
  // };

  const CloseTab = () => {
    navigate("/accueil");
  };

  const connectToSite = async (token) => {
    try {
      await axios
        .post(process.env.REACT_APP_API_URL + "/auth/loginclient", {
          token: token,
        })
        .then(async (response) => {
          cookies.set("authorization", response.data.data.token, {
            path: "/",
          });
          cookies.set("refresh", response.data.data.refreshtoken, {
            path: "/",
          });

          await dispatch(logout());
          await dispatch(loginClient(response.data.data));

          await axios
            .get(
              process.env.REACT_APP_API_URL +
                "/sites/get/" +
                response.data.data.client.site
            )
            .then((response) => {
              try {
                dispatch(setcurrentSite(response.data.data));
                dispatch(setStyleElement({}));

                navigate(
                  "/editorclient/" +
                    response.data.data.site._id +
                    "/page/" +
                    response.data.data.pages[0]._id
                );
              } catch (error) {
                // console.log(error);
              }
            })
            .catch((error) => {});

          //this.props.navigation.navigate('Dashbord')
        })
        .catch(function (error) {
          toast.error(error.response.data.errors[0].message, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
    } catch (e) {
      //console.log(e);
      toast.error("Identfiant incorrect!", {
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
  /* DEBUT EDIT   WEBSITE */
  const getRetourFormulaire = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_URL +
          "/messages/get/" +
          storeClient.client.site
      );

      setDataInretour(response.data.data);
      toast.success(response.data.message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
    } catch (error) {
      toast.error(error.response?.data.message || error.message, {
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
    }
  };
  const editSite = async (item) => {
    connectToSite(item);
  };
  const previewSite = async () => {
    navigate("../previewclient/" + clientData._id);
  };

  const renderContent = () => {
    // Implement your logic to determine which content to show based on the activeTab
    if (activeTab === "v-pills-apercu") {
      return (
        <div
          // className="tab-pane fade show p-3 active"
          id="v-pills-apercu"
          role="tabpanel"
          aria-labelledby="v-pills-apercu-tab"
        >
          <span className="titreStat   mt-3 mb-3">
            Site aperçu <i className="fa-solid fa-question"></i>{" "}
          </span>

          <div className="listeStat">
            <div className="encartStat infogeneral d-flex">
              <>
                <div className=" client ">
                  {clientData.screenshot != "" ? (
                    <img src={clientData.screenshot} className="img" />
                  ) : (
                    <img src={imgSite} className="img" />
                  )}
                </div>
                <div className="infos">
                  <span className="clients mb-3">
                    <b>Url :</b>{" "}
                    {clientData.etat == "Actif" ? (
                      <a
                        href={clientData.domaine}
                        title={clientData.domaine}
                        target="_blanc"
                        className="text-decoration-none mb-3"
                      >
                        <b>{clientData.domaine}</b>
                      </a>
                    ) : (
                      <a
                        href={
                          process.env.REACT_APP_MEDIA_URL +
                          "site/" +
                          (clientData ? clientData._id : "")
                        }
                        title={clientData._id}
                        target="_blanc"
                        className="text-decoration-none "
                      >
                        <b>{clientData._id}</b>
                      </a>
                    )}
                    <span className="name mb-3">
                      {" "}
                      <b>Nom :</b> {clientData.nom}
                    </span>
                    {clientData.etat == "Actif" ? (
                      <>
                        <span className="d-block">
                          {" "}
                          <b>Date de créaction :</b>{" "}
                          {new Date(
                            clientData.date_creation
                          ).toLocaleDateString()}
                        </span>
                        <span className="d-block">
                          {" "}
                          <b>Date de publication :</b>{" "}
                          {new Date(
                            clientData.date_creation
                          ).toLocaleDateString()}
                        </span>
                      </>
                    ) : (
                      <span className="d-block">
                        {" "}
                        <b>Date de créaction :</b>{" "}
                        {new Date(
                          clientData.date_creation
                        ).toLocaleDateString()}{" "}
                      </span>
                    )}
                  </span>
                  <div className="d-flex clients mb-3">
                    <span className="fw-bold">
                      <b>Etat :</b>
                    </span>
                    <span
                      className={
                        clientData.etat == "Démo"
                          ? "type eteSite demo"
                          : clientData.etat == "Actif"
                          ? "type eteSite actif"
                          : clientData.etat == "suspendu"
                          ? "type eteSite suspendu"
                          : "type eteSite inactif"
                      }
                    >
                      {clientData.etat}
                    </span>
                  </div>
                  <div className="d-flex clients">
                    <button
                      type="button"
                      className="btn btn-primary stats me-2"
                      onClick={(e) => editSite(storeClient.client.token)}
                    >
                      {" "}
                      <i className="fa-regular fa-pen-to-square me-2"></i> Edit
                      site
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary stats me-2"
                      onClick={(e) => previewSite(e)}
                    >
                      {" "}
                      <i className="fa-regular fa-solid fa-play me-2"></i>{" "}
                      Preview site
                    </button>
                  </div>
                </div>

                <div className="logoClient">
                  {clientData.logo != "" ? (
                    <img src={clientData.logo} alt={clientData.nom} />
                  ) : (
                    <span> pas de logo</span>
                  )}
                </div>
              </>
            </div>
          </div>
        </div>
      );
    } else if (activeTab === "v-pills-stats") {
      return (
        <div
          className="tab-pane fade p-3"
          id="v-pills-stats"
          role="tabpanel"
          aria-labelledby="v-pills-stats-tab"
          tabindex="0"
        >
          <span className="titreStat">
            Statistique <i className="fa-solid fa-question"></i>{" "}
          </span>
          <div class="listeStatChart">
            <div className="encartStat d-block">
              <nav id="statistique">
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                  <button
                    className="nav-link active"
                    id="nav-visits-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-visits"
                    type="button"
                    role="tab"
                    aria-controls="nav-visits"
                    aria-selected="true"
                  >
                    Site Visits
                  </button>
                  <button
                    className="nav-link"
                    id="nav-profile-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-profile"
                    type="button"
                    role="tab"
                    aria-controls="nav-profile"
                    aria-selected="false"
                  >
                    Engagement
                  </button>
                </div>
              </nav>
              <div className="tab-content" id="nav-tabContent">
                <div
                  className="tab-pane fade show active"
                  id="nav-visits"
                  role="tabpanel"
                  aria-labelledby="nav-visits-tab"
                  tabindex="0"
                >
                  <div className="Visite">
                    <Visite sites={clientData} />
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="nav-profile"
                  role="tabpanel"
                  aria-labelledby="nav-profile-tab"
                  tabindex="0"
                >
                  <div className="Engagement">
                    <div className="row">
                      <div className="col-4 bor">
                        <div className="d-flex justify-content-center align-items-center">
                          <i className="fa-solid fa-phone  me-4"></i>
                          <span className="count">0</span>
                        </div>
                        <span className="titlecount">Nombre de click tel</span>
                      </div>
                      <div className="col-4 bor">
                        <div className="d-flex justify-content-center align-items-center">
                          <i className="fa-solid fa-arrow-up-right-from-square  me-4"></i>
                          <span className="count">0</span>
                        </div>
                        <span className="titlecount">
                          {" "}
                          Soumission du formulaire
                        </span>
                      </div>
                      <div className="col-4 bor">
                        <div className="d-flex justify-content-center align-items-center">
                          <i className="fa-solid fa-envelope  me-4"></i>

                          <span className="count">0</span>
                        </div>
                        <span className="titlecount">Nombre de click mail</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div
          className="tab-pane fade p-3"
          id="v-pills-reponse"
          role="tabpanel"
          aria-labelledby="v-pills-reponse-tab"
        >
          <div className="actionBtns d-flex align-items-center justify-content-between">
            <div>
              <span className="titreStat mb-2 justif">
                {" "}
                Réponses formulaire Contactez-nous{" "}
                <i className="fa-solid fa-question"></i>
              </span>
            </div>
          </div>

          <div id="listeStatChart">
            <div className="encartStat d-block">
              <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                {dataInretour?.map((item, index) => (
                  <li className="nav-item" role="presentation" key={index}>
                    <button
                      className={`nav-link ${
                        index === activeTabplus ? "active" : ""
                      }`}
                      id={`pills-${item.titre}-tab`}
                      data-bs-toggle="pill"
                      data-bs-target={`#pills-${item.titre}`}
                      type="button"
                      role="tab"
                      aria-controls={`pills-${item.titre}`}
                      aria-selected={index === activeTabplus}
                      onClick={() => handleTabClickplus(index)}
                    >
                      {item.titre}
                    </button>
                  </li>
                ))}
              </ul>
              <div className="tab-content" id="pills-tabContents">
                {dataInretour && dataInretour.length > 0 ? (
                  <div id="tabitemform">
                    {" "}
                    {dataInretour?.map((item, index) => (
                      <div
                        key={index}
                        className={`tab-pane fade ${
                          index === activeTabplus ? "show active" : ""
                        }`}
                        id={`pills-${item.titre}`}
                        role="tabpanel"
                        aria-labelledby={`pills-${item.titre}-tab`}
                      >
                        <table className="table table-bordered">
                          <thead>
                            <tr>
                              <th>Nom</th>
                              <th>Email contact</th>
                              <th>Date & Heure</th>
                              <th>État</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {getPaginatedData().map((d, i) => (
                              <tr key={i}>
                                <td>
                                  {d.data.map((res, index) => (
                                    <React.Fragment key={index}>
                                      {res.name.toLowerCase() == "nom" ? (
                                        <span className="widthname">
                                          {res.value}
                                        </span>
                                      ) : (
                                        ""
                                      )}
                                    </React.Fragment>
                                  ))}
                                </td>
                                <td>
                                  {d.data.map((res, index) => (
                                    <React.Fragment key={index}>
                                      {res.name.toLowerCase() == "email" ? (
                                        <span>{res.value}</span>
                                      ) : (
                                        ""
                                      )}
                                    </React.Fragment>
                                  ))}
                                </td>

                                <td>
                                  {new Date(d.date_creation).toLocaleString(
                                    "fr-FR"
                                  )}
                                </td>
                                <td>
                                  {d.seen !== "true" ? (
                                    <span className="etatnonlu">Non lu</span>
                                  ) : (
                                    <span className="etatlu">lu</span>
                                  )}
                                </td>
                                <td>
                                  <div className="actions">
                                    <span>
                                      <i
                                        className="fa-solid fa-eye cursor"
                                        onClick={() => detailModal(d)}
                                      ></i>
                                    </span>
                                    <span className="red">
                                      <i
                                        class="fa-solid fa-trash cursor "
                                        onClick={() => supModal(d)}
                                      ></i>
                                    </span>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>

                        <nav className="paginationSite">
                          <ul className="pagination justify-content-center">
                            <li className="page-item next"></li>
                            {Array.from({
                              length: Math.ceil(
                                item.results.length / itemsPerPage
                              ),
                            }).map((_, index) => (
                              <li
                                key={index}
                                className={`page-item ${
                                  currentPage === index + 1 ? "active" : ""
                                }`}
                              >
                                <button
                                  className="page-link"
                                  onClick={() => handlePageChange(index + 1)}
                                >
                                  {index + 1}
                                </button>
                              </li>
                            ))}
                            <li className="page-item prev"></li>
                          </ul>
                        </nav>
                      </div>
                    ))}
                  </div>
                ) : (
                  <span>Aucun reponse disponible</span>
                )}
                <Modal
                  show={showDetailModal}
                  onHide={handleCloseDetail}
                  backdrop="static"
                  keyboard={false}
                  className="modalDelete formaulaires"
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
                          Details formulaire
                        </div>
                        <i
                          className="fa-solid fa-xmark closeSideBar"
                          onClick={handleCloseDetail}
                        ></i>
                      </div>
                    </div>
                  </Modal.Header>
                  <Modal.Body>
                    <div className="add_page_modal_content">
                      <div className="addPageOptions contents">
                        <div className="add_Page_Options_title">
                          {/* Display details from the selected item */}
                          <span>
                            <b>Date d'envoi: </b>
                            {selectedItem && selectedItem.date_creation
                              ? new Date(
                                  selectedItem.date_creation
                                ).toLocaleString("fr-FR")
                              : "N/A"}
                          </span>

                          <br></br>
                          {selectedItem &&
                            selectedItem.data.map((d, i) => (
                              <div key={i}>
                                {d.name !== "g-recaptcha-response" ? (
                                  <span>
                                    <b>{d.name}: </b>
                                    {d.value}
                                  </span>
                                ) : (
                                  ""
                                )}
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <button
                      className="btn btn-rounded btn-outline-secondary"
                      onClick={handleCloseDetail}
                    >
                      Annuler
                    </button>
                  </Modal.Footer>
                </Modal>

                <Modal
                  show={showdeteleModal}
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
                        <div className="titre_popup_add_page">
                          {" "}
                          Supprimer le retour
                        </div>

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
                          Voulez-vous vraiment supprimer le retour message{" "}
                          {selectedItem &&
                            selectedItem.data.map((d, i) => (
                              <div key={i}>
                                {d.name !== "g-recaptcha-response" ? (
                                  <span>
                                    <b>{d.name}: </b>
                                    {d.value}
                                  </span>
                                ) : (
                                  ""
                                )}
                              </div>
                            ))}
                          <b> </b>
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
                      onClick={deleteReponse}
                    >
                      Supprimer le message
                    </button>
                  </Modal.Footer>
                </Modal>
              </div>
            </div>
          </div>
        </div>
      );
    }
    // Add more conditions for other tabs if needed
  };
  useEffect(() => {
    getRetourFormulaire();
  }, []);
  return (
    <>
      <TopbarsClient />
      <div className="d-flex align-items-start" id="statsclients">
        <div className="Statistique  d-flex align-items-start">
          <div
            className="nav flex-column nav-pills"
            id="v-pills-tab"
            role="tablist"
            aria-orientation="vertical"
          >
            <button
              className={`nav-link EditorWidgets ${
                activeTab === "v-pills-apercu" ? "active" : ""
              }`}
              id="v-pills-apercu-tab"
              onClick={() => handleTabClick("v-pills-apercu")}
              type="button"
              role="tab"
              aria-controls="v-pills-apercu"
              aria-selected={activeTab === "v-pills-apercu"}
            >
              <span className="Apercu"></span>
              <span>Aperçu</span>
            </button>
            <HasPermission permission={["statistiques"]}>
              <button
                className={`nav-link EditorWidgets ${
                  activeTab === "v-pills-stats" ? "active" : "disabled"
                }`}
                id="v-pills-stats-tab"
                onClick={() => handleTabClick("v-pills-stats")}
                type="button"
                role="tab"
                aria-controls="v-pills-stats"
                aria-selected={activeTab === "v-pills-stats"}
              >
                <span className="Stats">
                  {" "}
                  <sup className="encours">
                    {" "}
                    <i className="fa-solid fa-wrench"></i>
                  </sup>
                </span>
                <span>Stats </span>
              </button>
            </HasPermission>

            <button
              className={`nav-link EditorWidgets ${
                activeTab === "v-pills-reponse" ? "active" : ""
              }`}
              id="v-pills-reponse-tab"
              onClick={() => {
                handleTabClick("v-pills-reponse");
                getRetourFormulaire();
              }}
              type="button"
              role="tab"
              aria-controls="v-pills-reponse"
              aria-selected={activeTab === "v-pills-reponse"}
            >
              <span className="Reponse"></span>
              <span> Réponses formulaire</span>
            </button>
          </div>
        </div>
        <div className="tab-content container" id="v-pills-tabContent">
          {renderContent()}
        </div>
      </div>
    </>
  );
}
