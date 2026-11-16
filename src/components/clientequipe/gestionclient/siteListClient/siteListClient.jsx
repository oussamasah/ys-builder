import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import "./siteListClient.css";
import toast, { Toaster } from "react-hot-toast";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import imgSite from "../../../../assets/imgSites/imgSite.svg";
import iconOption from "../../../../assets/imgSites/iconOption.svg";
import iconVoir from "../../../../assets/imgSites/iconVoir.svg";
import iconEdit from "../../../../assets/imgSites/iconEdit.svg";
import iconStatistique from "../../../../assets/imgSites/iconStatistique.png";
import Etat from "../../../../assets/imgSites/Etat.svg";
import Renommer from "../../../../assets/imgSites/Renommer.svg";
import Pagination from "../../../Paginations/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { setcurrentSite } from "../../../../redux/features/site";
import { setStyleElement } from "../../../../redux/features/editor";
import HasPermission from "../../../../pages/Authentification/AuthGard/HasPermission";
import { loginClient} from "../../../../redux/features/client";
import { logout } from "../../../../redux/features/user";
import Cookies from "universal-cookie";
import TopbarsClient from "../../../StatistiqueClient/TopbarsClient/TopbarsClient";

export default function SiteListClient() {

  const cookies = new Cookies();
  const storeClient = useSelector((state) => state.client.value);

  const dispatch = useDispatch();

  const closeEdit = () => setshowEdit(false);
  const [showEdit, setshowEdit] = useState(false);
  const [sites, setSites] = useState([]);

  const [checkedEtat, setcheckedEtat] = useState([]);
  const [show, setShow] = useState(false);
  const [site, setSite] = useState({});
  const [nom, setNom] = useState();
  const [search, setSearch] = useState();

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

  /* FIN DELETE LIST WEBSITE */
  /* DEBUT GET LIST  WEBSITE */
  const getSites = async () => {
   
    await axios
      .get(
        process.env.REACT_APP_API_URL +
          "/clients/getbyidclient/" +
          storeClient.client.client
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
      })
      .catch((error) => {
        navigate("/login")
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


  const connectToSite = async (token) => {
    try {
      await axios
        .post(process.env.REACT_APP_API_URL  + "/auth/loginclient", {
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
          .get(process.env.REACT_APP_API_URL + "/sites/get/" + response.data.data.client.site)
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
  const editSite = async (item) => {
   
    connectToSite(item)
    
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
            {
              replace: true,
              state: { details: item },
            },
            "_blank",
            "noreferrer"
          );
        } catch (error) {
          // console.log(error);
        }
      })
      .catch((error) => {});
  };
  /* FIN  EDIT   WEBSITE */

  const stats = async (token) => {

    try {
      await axios
        .post(process.env.REACT_APP_API_URL  + "/auth/loginclient", {
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
      .get(process.env.REACT_APP_API_URL + "/sites/get/" + response.data.data.client.site)
      .then((response) => {
        try {

          navigate("/StatistiqueClient",{ state: { clientData: response.data.data.site } });
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






  /*FIN  FILTER  DUABLE VALUE WITH CHEKBOX */
  const handleInputChange = (event) => {
    setSearch(event.target.value);
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
  useEffect(() => {
    if (checkedEtat == false) {
      getSites();
    }
  }, [checkedEtat]);

  return (
  <> 
  <TopbarsClient/>
   <div className="  container mt-4" id="listsite">
      <div className="row">
        <div className="col-md-12">
          <div className="title-liste-site">
            <div className="title-border"></div>
            <span>Liste des sites</span>
          </div>
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
                  // onClick={fiterSearsh}
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
              </th>

              <th scope="col" colSpan={3} className="Actions">
                <span>Actions</span>
              </th>

              <th scope="col" className="Etat">
            
                  <span
              
                 
                    id="dropdownMenuButton"
                
       
                  >
                    Etat
                    <img src={Etat} className="Etatimg" alt="Edit"/>
                  </span>

                
              </th>

              <th colSpan={3} className="Etiq"></th>
            </tr>
          </thead>

          <tbody>
            {sites.length > 0 ? (
              sites
                .slice(indexOfFirstRecord, indexOfLastRecord)

                .map((item, index) => {
                  let token = item.token
                  item =  item.site;
                  return (
                    <tr key={index} className="solid">
                      {/* <td>{item._id}</td> */}
                      <td className="tableNameSite">
                        <div className="client">
                          
                          {item.screenshot != "" ? (
                            <img src={item.screenshot} className="img" />
                          ) : (
                            <img src={imgSite} className="img s" />
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
                          <button onClick={(e) => editSite(token)} title="Edit">
                            <img src={iconEdit} className="img" alt="Edit" />
                          </button>
                          <button
                            onClick={(e) => stats(token)}
                            title="Statistique"
                          >
                            <img
                              src={iconStatistique}
                              className="img"
                              alt="Statistique"
                            />
                          </button>
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
                            <HasPermission permission={["modifier_le_site"]}>
                              <li onClick={() => ModalRename(item)}>
                                <img src={Renommer} className="dropdownImge" />
                                Renommer le site
                              </li>
                            </HasPermission>
    
                          
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
            // onClick={deleteSite}
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
 
    </div>
    </>
  );
}
