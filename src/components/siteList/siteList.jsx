import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import "./siteList.css";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import imgSite from "../../assets/imgSites/imgSite.svg";

import iconOption from "../../assets/imgSites/iconOption.svg";
import iconVoir from "../../assets/imgSites/iconVoir.svg";
import iconEdit from "../../assets/imgSites/iconEdit.svg";
import iconStatistique from "../../assets/imgSites/iconStatistique.png"
import Etat from "../../assets/imgSites/Etat.svg";
import Renommer from "../../assets/imgSites/Renommer.svg";
import Model from "../../assets/imgSites/Model.svg";
import Pagination from "../Paginations/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { setcurrentSite, removecurrentSite } from "../../redux/features/site";
import { setStyleElement } from "../../redux/features/editor";
import Joyride from "react-joyride";
import HasPermission from "../../pages/Authentification/AuthGard/HasPermission";

export default function SiteList() {

  const state = {
    run: window.localStorage.getItem("tutoState")
      ? JSON.parse(window.localStorage.getItem("tutoState"))["listSite"] == true
        ? false
        : true
      : true,
    steps: [
      {
        title: "Bienvenue sur YellowSmith",
        target: ".topBar",
        placement: "auto",
        disableBeacon: true,
        content:
          "Nous sommes ravis de vous accueillir. Explorez, créez et profitez de tout ce que notre plateforme a à offrir.",
      },
      {
        target: ".create-btn",
        disableBeacon: true,
        content:
          "Appuyez sur ce bouton pour donner vie à votre tout nouveau site.",
      },
      {
        target: ".serash-sites",
        disableBeacon: true,
        content: "Utilisez cette barre de recherche pour trouver votre site.",
      },
      {
        target: ".demo",
        disableBeacon: true,
        content: "Cliquez sur ces raccourcis pour filtrer la liste des sites",
      },
      {
        target: ".clients",
        disableBeacon: true,
        content:
          "Vous pouvez copier le domaine et consulter le site en cliquant sur celui-ci, ou simplement l'icon copier.",
      },
      {
        target: ".btnactions",
        disableBeacon: true,
        content:
          "Visualisez votre site sur tous les supports ou apportez des modifications en accédant à l'option d'édition.",
      },
      {
        target: ".edit",
        disableBeacon: true,
        content:
          "En plus, vous pouvez effectuer d'autres actions telles que renommer, enregistrer comme modèle et supprimer.",
      },
    ],
  };

  const dispatch = useDispatch();

  const storeUser = useSelector((state) => state.user.value);
  const storeSite = useSelector((state) => state.site.value);
  const closeEdit = () => setshowEdit(false);
  const [showEdit, setshowEdit] = useState(false);
  const [sites, setSites] = useState([]);
  const [detalisSite, setDetalisSite] = useState([]);
  const [checkedEtat, setCheckedEtat] = useState([]);
  const [show, setShow] = useState(false);
  const [site, setSite] = useState({});
  const [nom, setNom] = useState();
  const [search, setSearch] = useState();
  const [shows, setShows] = useState(false);
  const handleSearch = (event) => {
    setSearch(event.target.value);
  };
  const target = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const nPages = Math.ceil(sites.length / recordsPerPage);
  const handleClose = () => setShow(false);
  const navigate = useNavigate();

  const supModal = (item) => {
    setSite(item);
    setShow(true);
  };
  const ModalRename = (item) => {
    setSite(item);
    setshowEdit(true);
  };
  /*DEBUT  DELETE LIST WEBSITE */
  const deleteSite = async () => {
    await axios
      .delete(process.env.REACT_APP_API_URL + "/sites/delete/" + site._id)
      .then((response) => {
        getSites();
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
  /* FIN DELETE LIST WEBSITE */
  /* DEBUT GET LIST  WEBSITE */
  const getSites = async () => {
    await axios
      .get(
        process.env.REACT_APP_API_URL +
          "/sites/getsitesbycompte/" +
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

        setSites(response.data.data);
        setDetalisSite(response.data.detail);
      })
      .catch((error) => {
        console.log(error)
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
  /* FIN GET LIST WEBSITE */

  /* DEBUT EDIT   WEBSITE */
  const editSite = async (item) => {
    await axios
      .get(process.env.REACT_APP_API_URL + "/sites/get/" + item._id)
      .then((response) => {
        try {
          dispatch(setcurrentSite(response.data.data));
          dispatch(setStyleElement({}));

          navigate(
            "/editor/" +
              response.data.data.site._id +
              "/page/" +
              response.data.data.pages[0]._id
          );
        } catch (error) {
          // console.log(error);
        }
      })
      .catch((error) => {});
  };
  const VoirSite = async (item) => {
    await axios
      .get(process.env.REACT_APP_API_URL + "/sites/get/" + item._id)
      .then((response) => {
        try {
          dispatch(setcurrentSite(response.data.data));
          dispatch(setStyleElement({}));
          window.open(
            "/previewclient/" + response.data.data.site._id,
            "_blank",
            
          );
        } catch (error) {
          // console.log(error);
        }
      })
      .catch((error) => {});
  };
  /* FIN  EDIT   WEBSITE */
  const stats = async (item) => {
    
    await axios
      .get(process.env.REACT_APP_API_URL + "/sites/get/" + item._id)
      .then((response) => {
        try {
          dispatch(setcurrentSite(response.data.data));
          dispatch(setStyleElement({}));

          navigate("/statistiqueclient",{ state: { clientData: item } });
        } catch (error) {
          // console.log(error);
        }
      })
      .catch((error) => {});
  };
  /* DEBUT RENAME   TEMPLATE */
  const RenamerSite = async (e) => {
    await axios
      .post(process.env.REACT_APP_API_URL + "/sites/updatesite/" + site._id, {
        nom: nom,
      })
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
        getSites();
        setshowEdit(false);
      })
      .catch((error) => {
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
  /* FIN RENAME   TEMPLATE */
  useEffect(() => {}, [storeSite, sites]);

  /* DEBUT SAVE   TEMPLATE */
  const CommeModel = async (e) => {
    await axios
      .post(process.env.REACT_APP_API_URL + "/templates/savetemplate/" + e, {
        isTemplate: true,
      })
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
      })
      .catch((error) => {
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
  /* FIN  SAVE   TEMPLATE */

  /* DEBUT FILTER   VALUE WITH ETAT */
  const fiterEtat = async (etat) => {
    await axios
      .post(
        process.env.REACT_APP_API_URL +
          "/sites/filterbyetat/" +
          storeUser.user.CompteSchema._id,
        {
          etat: etat,
        }
      )

      .then((response) => {
        setSites(response.data.data);
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
  /* FIN FILTER   VALUE WITH ETAT */

  /* DEBUT FILTER  DUABLE VALUE WITH CHEKBOX */
  const filterEtatMutiple = async (checked, value) => {
    setCheckedEtat((prevCheckedEtat) => {
      let list = [];
      if (checked === true) {
        list = [...prevCheckedEtat, value];
      } else {
        list = prevCheckedEtat.filter((item) => item !== value);
      }
  
      axios
        .post(
          process.env.REACT_APP_API_URL +
            "/sites/filterbyetat/" +
            storeUser.user.CompteSchema._id,
          {
            etat: list,
          }
        )
        .then((response) => {
          setSites(response.data.data);
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
  
      return list;
    });
  };
  /*FIN  FILTER  DUABLE VALUE WITH CHEKBOX */
  const handleInputChange = (event) => {
    setSearch(event.target.value);
  };
  const fiterSearsh = async (event) => {
    await axios
      .post(
        process.env.REACT_APP_API_URL +
          "/sites/filter/" +
          storeUser.user.CompteSchema._id,
        {
          search: search,
        }
      )

      .then((response) => {
        //console.log(sites);
        setSites(response.data.data);
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
  /*DEBUT  PASTE ID  WEBSITE */
  const copieid = (event) => {
    navigator.clipboard.writeText(event._id);
    toast.success(event, navigator.clipboard.writeText(event));
  };
  /* FIN PASTE ID  WEBSITE */

  /* DEBUT CLEAR LIST  WEBSITE*/
  const restInput = () => {
    setSearch("");
    getSites();
  };
  /* FIN CLEAR LIST  WEBSITE */
  const hasEffectRun = useRef(false);

  useEffect(() => {
    if (!hasEffectRun.current && checkedEtat.length === 0) {
      hasEffectRun.current = true;
      getSites();
    }
  }, [checkedEtat]);

  return (
    <div className="  container mt-4" id="listsite">
      <div className="row">
        <div className="col-md-6">
          <div className="title-liste-site">
            <div className="title-border"></div>
            <span>Liste des sites</span>
          </div>
        </div>
        <div className="col-md-6">
        
        <HasPermission permission={["creer_des_sites"]}>
          <a onClick={(e)=>navigate("/sites/templates")}  className="create-btn">
            Créer un nouveau site
          </a>
        </HasPermission>
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
                placeholder="Rechercher par  site ou par  client"
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
          {/* <div className="col-md-8 col-xs-8 rights">
            <div className="dates">
              <div className="piker">
                <img src={datecrection} className="pictoDatepincker" />
                <DatePickerSite />
              </div>
            </div>
          </div> */}
        </div>

        <table className="table table-borderless tablesite">
          <thead>
            <tr>
              <th scope="col" className="demo">
                <span>
                  <b onClick={() => getSites()}>Sites : {sites.length}</b>
                </span>
                <>
                  {detalisSite.map((etat, i) => (
                    <span
                      key={i}
                      style={{ color: etat.color }}
                      className="typeSite"
                      onClick={() => fiterEtat(etat.name)}
                    >
                      {etat.name} ({etat.total})
                    </span>
                  ))}
                </>
              </th>

              <th scope="col" colSpan={3} className="Actions">
                <span>Actions</span>
              </th>

              <th scope="col" className="Etat">
                <div className="dropdown">
                  <span
                    className="dropdown-toggle  "
                    type="button"
                    id="dropdownMenuButton"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Etat
                    <img src={Etat} className="Etatimg" alt="Edit" />
                  </span>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <ul>
                      {detalisSite.map((item, index) => (
                        <li
                          key={index}
                          className={
                            item.name == "Indexé" || item.name == "Non Indexé"
                              ? "d-none"
                              : "d-block type"
                          }
                        >
                          <div className="checkbox checkbox-circle checkbox-color-scheme">
                            <input
                              type="checkbox"
                              value={item.name}
                              // checked={item.name}
                              onChange={(e) =>
                                filterEtatMutiple(e.target.checked, item.name)
                              }
                            />
                            <span
                              className="type"
                              style={{ background: item.color }}
                            >
                              {item.name}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </th>
              {/*     <th scope="col" colSpan={3} className="Etiq">
                <div className="dropdown">
                  <span> Etiquettes </span>
                  <button
                    className="dropdown-toggle etiq "
                    type="button"
                    id="dropdownMenuButton2"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <img src={Menuetiq} className="edit" /> <b>2</b>
                  </button>
                  <div
                    className="dropdown-menu etiqs"
                    onClick={(e) => [e.stopPropagation()]}
                    aria-labelledby="dropdownMenuButton"
                  >
                    <div className="row">
                      <div className="col-xl-4">
                        <span className="actitvite">Activités</span>
                        <Activites />
                      </div>
                      <div className="col-xl-4">
                        <div className="row">
                          <div className="col-xl-6">
                            <span className="agences">Agences</span>
                            <Agences />
                          </div>

                          <div className="col-xl-6">
                            <span className="offres">Offres</span>
                            <Offres />
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-4">
                        <div className="row">
                          <div className="col-xl-6">
                            <span className="engagements">Engagements</span>
                            <Engagements />
                          </div>

                          <div className="col-xl-6">
                            <span className="financement">Financement</span>
                            <Financement />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </th> */}
              <th colSpan={3} className="Etiq"></th>
            </tr>
          </thead>

          <tbody>
            {sites.length > 0 ? (
              sites
                .slice(indexOfFirstRecord, indexOfLastRecord)

                .map((item, index) => {
                  return (
                    <tr key={index} className="solid">
                      {/* <td>{item._id}</td> */}
                      <td className="tableNameSite">
                        <div className="client">
                          {item.screenshot != "" ? (
                            <img src={item.screenshot} className="img" />
                          ) : (
                            <img src={imgSite} className="img" />
                          )}
                          <span className="clients">
                            {item.etat == "Actif" ? (
                              <>
                                <a
                                  href={"https://" + item.domaine}
                                  title={item.domaine}
                                  target="_blanc"
                                  className="text-decoration-none"
                                >
                                  <b>{item.domaine} </b>
                                </a>
                                <button
                                  onClick={() => {
                                    copieid(item.domaine);
                                  }}
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title="Copier domaine site "
                                >
                                  <i className="fa-light fa-copy"></i>{" "}
                                  {item.index == false ? (
                                    <sup className="textsup">Non indexé</sup>
                                  ) : (
                                    <sup className="textsup s">indexé</sup>
                                  )}
                                </button>
                                <Toaster />
                              </>
                            ) : (
                              <>
                                <a
                                  href={
                                    process.env.REACT_APP_MEDIA_URL +
                                    "site/" +
                                    item._id
                                  }
                                  title={item._id}
                                  target="_blanc"
                                  className="text-decoration-none"
                                >
                                  <b>{item._id}</b>
                                </a>
                                <button
                                  onClick={() => {
                                    copieid(item._id);
                                  }}
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title="Copier  id site"
                                >
                                  <i className="fa-light fa-copy"></i>
                                </button>
                                <Toaster />
                              </>
                            )}
                            <span className="name"> {item.nom}</span>
                          </span>
                        </div>
                      </td>
                      <td className="icon" colSpan={3}>
                        <div className="btnactions">
                          <button onClick={(e) => editSite(item)} title="Edit">
                            <img src={iconEdit} className="img" alt="Edit" />
                          </button>
                          {/* <button
                            onClick={(e) => stats(item)}
                            title="Statistique"
                          >
                            <img
                              src={iconStatistique}
                              className="img"
                              alt="Statistique"
                            />
                          </button> */}
                          <button
                            onClick={(e) => VoirSite(item)}
                            title="Voir site"
                          >
                            <img
                              src={iconVoir}
                              className="img"
                              alt="Voir site"
                            />
                          </button>
                        </div>
                      </td>

                      <td>
                        <div
                          className={
                            item.etat == "Démo"
                              ? "eteSite demo"
                              : item.etat == "Actif"
                              ? "eteSite actif"
                              : item.etat == "suspendu"
                              ? "eteSite suspendu"
                              : "eteSite inactif"
                          }
                        >
                          <span className="type"> {item.etat}</span>
                        </div>
                      </td>
                      {/* <td>{item.domaine}</td> */}
                      {/*                       <td>
                        <ul className="Activitetable">
                          <li className="os">
                            <span> Ostéo</span>
                          </li>
                          <li className="st">
                            <span> Start 24</span>
                          </li>
                          <li className="ai">
                            <span> Aix</span>
                          </li>
                          <li className="ge">
                            <span> Grenke</span>
                          </li>
                        </ul>
                      </td> */}
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
                             <HasPermission  permission={["modifier_le_site"]} >
                            <li onClick={() => ModalRename(item)}>
                              <img src={Renommer} className="dropdownImge" />
                              Renommer le site
                            </li>
                            </HasPermission>
                            {/* <li>
                              <img src={Dupliquer} className="dropdownImge" />
                              Dupliquer le site
                            </li> */}

                            {
                            <HasPermission  permission={["gerer_un_site_comme_modele"]} >
                              <li onClick={() => CommeModel(item._id)}>
                                <img src={Model} className="dropdownImge" />
                                Enregistrer comme modéle
                              </li>
                              </HasPermission>
                            }
                            {/* <li>
                              <img src={Gerer} className="dropdownImge" />
                              Gérer les étiquettes
                            </li> */}
                          
                            <li className="redd d-flex align-items-center">
                              <i className="fal fa-trash-alt"></i>
                              <HasPermission
                                permission={["supprimer_des_sites"]}
                              >
                                <span onClick={() => supModal(item)}>
                                  Supprimer site
                                </span>
                              </HasPermission>
                            </li>
                        
                          </ul>
                        </div>
                        {/* <button onClick={() => supModal(item)}>
                        <i
                          className="fa-solid fa-trash"
                          style={{ color: "red" }}
                        ></i>
                      </button> */}
                      </td>
                    </tr>
                  );
                })
            ) : (
              <tr>
                <td colSpan="4">Acune site disponible</td>
              </tr>
            )}
          </tbody>
        </table>

        {sites.length > recordsPerPage ? (
          <Pagination
            nPages={nPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        ) : (
          <div> </div>
        )}
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
              <div className="titre_popup_add_page"> Supprimer le site</div>

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
                Voulez-vous vraiment supprimer le site<b> {site.nom} ? </b>
                Cette action supprimera le site ainsi que l'ensemble du contenu
                qui lui est associé.
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
            onClick={deleteSite}
          >
            Supprimer le site
          </button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={showEdit}
        onHide={closeEdit}
        backdrop="static"
        keyboard={false}
        id="allmodal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Renommer Site</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group mt-3">
            <label>Nom de site : {site.nom}</label>
            <input
              type="text"
              name="label"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              required
              className="form-control"
              id="exampleFormControlInput2"
              placeholder="Saisissez le nom de votre page"
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeEdit}>
            Fermer
          </Button>
          <Button
            variant="primary"
            onClick={(e) => {
              RenamerSite(e);
            }}
          >
            Renamer
          </Button>
        </Modal.Footer>
      </Modal>
      <Toaster />
      <Joyride
        steps={state.steps}
        continuous={true}
        run={state.run}
        locale={{
          back: "Retour",
          close: "Fermer",
          last: "Terminer",
          next: "Suivant",
          open: "Ouvrir le guide",
          skip: "Annuler",
        }}
        hideCloseButton={true}
        showProgress={true}
        showSkipButton={true}
        disableOverlayClose={true}
        disableCloseOnEsc={true}
        styles={{
          options: {
            overlayColor: "rgba(0, 0, 0, 0.6)",
            primaryColor: "#F6C344",
            textColor: "black",
            zIndex: 1000,
          },
        }}
        callback={({ status }) => {
          if (status == "finished" || status == "skipped") {
            let tutoState = window.localStorage.getItem("tutoState");
            if (!tutoState) {
              tutoState = {};
            } else {
              tutoState = JSON.parse(tutoState);
            }
            tutoState["listSite"] = true;
            window.localStorage.setItem("tutoState", JSON.stringify(tutoState));
          }
        }}
      />
    </div>
  );
}
