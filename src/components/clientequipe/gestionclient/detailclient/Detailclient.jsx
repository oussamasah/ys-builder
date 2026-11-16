import React, { useEffect, useRef, useState } from "react";
import "./Detailclient.css";
import Topbars from "../../../Topbars/Topbars";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
// import SitesAutorisation from "../SitesAutorisation/SitesAutorisation";
import axios from "axios";
// import AccesClient from "../AccesClient/AccesClient";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import imgSite from "../../../../assets/imgSites/imgSite.svg";
export default function Detailclient() {
  let { id } = useParams();
  const [urlclient, setUrlClient] = useState([]);
  const [token, setToken] = useState("");
  const [deletemodal, setShowDeleteModal] = useState(false);
  const [updatemodal, setShowUpdateModal] = useState(false);
  const [infomodal, setShowInfoModal] = useState(false);
  const handleCloseDelete = () => setShowDeleteModal(false);
  const handleCloseinfo = () => setShowInfoModal(false);
  const handleCloseUpdate = () => setShowUpdateModal(false);

  const [clientData, setClientdata] = useState({});
  const storeUser = useSelector((state) => state.user.value);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [siteAttibuted, setSiteAttributed] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [teamView, setTeamView] = useState();
  const [selectedPermisions, setSelectedPermisions] = useState([]);

  const [sites, setSites] = useState([]);
  const [search, setSearch] = useState();
  const [selectedSite, setSelectedSite] = useState(null);
  const navigate = useNavigate();
  const Retour = async () => {
    navigate("/clientequipe/gestionclient");
  };

  const UpdateModal = () => {
    setShowUpdateModal(true);
  };
  const Modalinformation = () => {
    setShowInfoModal(true);
  };
  const deleteClient = () => {};

  const GetClient = async () => {
    toast.loading("Opération en cours ...");
    await axios
      .get(process.env.REACT_APP_API_URL + "/clients/getbyid/" + id)
      .then((response) => {
        toast.dismiss();
        setClientdata(response.data.data[0]);

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

  const copieid = (event) => {
    navigator.clipboard.writeText(event._id);
    toast.success(event, navigator.clipboard.writeText(event));
  };

  const handleInputChange = (event) => {
    setSearch(event.target.value);
  };

  const listPermession = () => {
    axios
      .get(process.env.REACT_APP_API_URL + "/roles/listpermession")
      .then((res) => {
        setPermissions(res.data.data);
      });
  };

  const changeSelectedPermission = async (checked, value) => {
    let p = [];
    if (checked == "true") {
      p = [...selectedPermisions];
      p.push(value._id);
      setSelectedPermisions(p);
    } else {
      p = selectedPermisions.filter((item) => item != value._id);
      setSelectedPermisions(p);
    }
    toast.loading("Opération en cours ...");
    await axios
      .post(
        process.env.REACT_APP_API_URL +
          "/clients/setpermissionclient/" +
          selectedSite,
        {
          permission: p,
        }
      )

      .then((response) => {
        toast.dismiss();
        toast.success("Permission est attribué");
        getAttribuedSites();
      });
  };
  const fiterSearsh = async (event) => {
    toast.loading("Recherche en cours ...");

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
        toast.dismiss();
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
        toast.dismiss();

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
  const getAttribuedSites = async () => {
    await axios
      .get(process.env.REACT_APP_API_URL + "/clients/getsiteattribue/" + id)
      .then((response) => {
        let s = response.data.data;

        s.push({ _id: "new", site: { nom: "Attribuer un nouveau site" } });
        setSiteAttributed(s);
        if (response.data.data.length > 1) {
          setSelectedSite(
            response.data.data[response.data.data.length - 2]._id
          );
          setSelectedPermisions(
            response.data.data[response.data.data.length - 2].permission
          );
        } else {
          setSelectedSite(response.data.data[0]._id);
          setSelectedPermisions([]);
        }
      });
  };

  const attribuerSite = async (siteId) => {
    // Display a loading toast while the operation is in progress
    toast.loading("Opération en cours...");

    try {
      // Make a POST request using Axios to the specified API endpoint
      const response = await axios.post(
        process.env.REACT_APP_API_URL + "/clients/attributsite/" + id,
        {
          idSite: siteId,
          CompteSchema: clientData.CompteSchema,
        }
      );

      // Dismiss the loading toast
      toast.dismiss();

      // Reset selected permissions
      setSelectedPermisions([]);

      // Fetch updated data after the operation
      getAttribuedSites();
      GetClient();
      restInput();

      // Display a success toast with a message from the response data
      toast.success(response.data.message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });

      // Optionally, set details for the site using data from the response
      // setDetalisSite(response.data.data);
    } catch (error) {
      // Handle errors
      getAttribuedSites();
      toast.dismiss();

      // Display an error toast with a message from the error response or default message
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

  const restInput = () => {
    setSearch("");
    setSites("");
    setTeamView("");
  };
  const deleteattrsite = async (item) => {
    await axios
      .delete(process.env.REACT_APP_API_URL + `/clients/deleteattrsite/${item}`)
      .then((response) => {
        getAttribuedSites();
        GetClient();
        //setShowDeleteModal(false);
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
  const changeCurrentSite = (id) => {
    setSelectedSite(id);
    let current = siteAttibuted.filter((s) => s._id == id)[0];
    setSelectedPermisions(current.permission ? current.permission : []);
  };
  // const addNewSite = () => {
  //   let s = siteAttibuted.filter((s) => s._id != "new");
  //   s.push({ _id: "new", site: { nom: "Attribuer un nouveau site" } });
  //   setSiteAttributed(s);
  // };
  const changeView = (item) => {
    // Set the selected site
    setSelectedSite(item);
  };

  useEffect(() => {}, [selectedSite, siteAttibuted]);
  const hasMediaEffectRun = useRef(false);
  useEffect(() => {
    const fetchData = async () => {
      if (!hasMediaEffectRun.current) {
        hasMediaEffectRun.current = true;
        await listPermession();
        await getAttribuedSites();
        if (siteAttibuted.length > 0) {
          setSelectedSite(siteAttibuted[0]._id);
        }
        await GetClient()
        if (clientData.clientToken) {
          setUrlClient(clientData.clientToken);
          if (urlclient.length > 0) {
            setToken(urlclient[0].token);
          }
        }
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (clientData.clientToken) {
      setUrlClient(clientData.clientToken);
      if (urlclient.length > 0) {
        setToken(urlclient[0].token);
      }
    }
  }, [clientData]);
  const UpdateClient = async () => {
    // alert("sdsssssssss");
    await axios
      .post(process.env.REACT_APP_API_URL + "/clients/update/" + id, {
        nom: clientData.nom,
        prenom: clientData.prenom,
        email: clientData.email,
        entreprise: clientData.entreprise,
        adresse: clientData.adresse,
        phone: clientData.phone,
        CompteSchema: storeUser.user.CompteSchema._id,
      })
      .then((response) => {
        setClientdata(response.data.data);
        setShowUpdateModal(false);
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
        // yarn start.log(error);
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
  const sendEmail = async () => {
    await axios
      .post(process.env.REACT_APP_API_URL + "/clients/envoyertoken/" + id)

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
        getAttribuedSites();
      })
      .catch((error) => {
        toast.error(error);
      });
  };
  return (
    <div id="detailclient">
      <Topbars />
      <div className="d-flex align-items-start justify-content-between w-100">
        <div className="sibebarclient">
          <div className="retour  m-4">
            <span className="cursor " onClick={Retour}>
              <i className="fa-solid fa-angle-left"></i> Accéder à Liste de
              clients
            </span>
          </div>
          <div className="iconNom m-3">
            {clientData && clientData.nom && clientData.prenom && (
              <>
                {clientData.nom.charAt(0)} {clientData.prenom.charAt(0)}
              </>
            )}
          </div>
          <div className="nomClient m-3">
            <span className="fw-bold  text-capitalize">
              {clientData.nom} {clientData.prenom}
            </span>
            <span className="emailclient"> {clientData.email} </span>
          </div>

          <div
            className={
              clientData.clientToken == undefined
                ? "etatclient m-3 inactif"
                : "etatclient m-3 demo"
            }
          >
            {clientData.clientToken == undefined ? (
              <span className=" type"> Invité</span>
            ) : (
              <span className="  type"> Attribué</span>
            )}
          </div>

          <div
            className="nav flex-column m-3 nav-pills "
            id="v-pills-tab"
            role="tablist"
            aria-orientation="vertical"
          >
            <button
              className="nav-link active"
              id="v-pills-home-tab"
              data-bs-toggle="pill"
              data-bs-target="#v-pills-home"
              type="button"
              role="tab"
              aria-controls="v-pills-home"
              aria-selected="true"
            >
              Informations personnelles
            </button>

            <button
              className="nav-link"
              id="v-pills-profile-tab"
              data-bs-toggle="pill"
              data-bs-target="#v-pills-profile"
              type="button"
              role="tab"
              aria-controls="v-pills-profile"
              aria-selected="false"
            >
              Sites et autorisations
            </button>
            {clientData.clientToken == undefined ? (
              <button
                className="nav-link"
                type="button"
                role="tab"
                onClick={Modalinformation}
              >
                Accès
              </button>
            ) : (
              <button
                className="nav-link"
                id="v-pills-messages-tab"
                data-bs-toggle="pill"
                data-bs-target="#v-pills-messages"
                type="button"
                role="tab"
                aria-controls="v-pills-messages"
                aria-selected="false"
                onClick={GetClient}
              >
                Accès
              </button>
            )}
          </div>
        </div>
        <div className="tab-content" id="v-pills-tabContent">
          <div
            className="tab-pane fade show active"
            id="v-pills-home"
            role="tabpanel"
            aria-labelledby="v-pills-home-tab"
          >
            <div className="titlecontent">
              <h2 className="">
                Informations personnelles{" "}
                <i className="fa-solid fa-circle-question"></i>
              </h2>
              <span>
                Gardez une trace des coordonnées de ce client et d'autres
                informations qui vous aideront à communiquer avec lui.
              </span>
            </div>
            <div className="detailscontenu">
              <span className="titleinfo m-3">
                {" "}
                <b>
                  <i className="fa-regular fa-file-lines"></i> Détails du client{" "}
                </b>
              </span>
              <div className="formclient m-4">
                <div className="d-flex justify-content-between">
                  <div className="w-100">
                    <label className="mb-2"> Nom</label>
                    <input
                      className="form-control mb-3"
                      type="text"
                      placeholder="Saisissez le nom"
                      value={clientData.nom}
                      onChange={(e) =>
                        setClientdata({ ...clientData, nom: e.target.value })
                      }
                    />
                  </div>
                  <div className="w-100 ">
                    <label className="mb-2"> Prénom</label>
                    <input
                      className="form-control mb-3  ms-2"
                      type="text"
                      placeholder="Saisissez le prénom"
                      value={clientData.prenom}
                      onChange={(e) =>
                        setClientdata({ ...clientData, prenom: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="d-flex justify-content-between ">
                  <div className="w-100">
                    <label className="mb-2"> Nom d'entreprise</label>
                    <input
                      className="form-control mb-3  "
                      type="text"
                      placeholder="Nom d'entreprise"
                      value={clientData.entreprise}
                      onChange={(e) =>
                        setClientdata({
                          ...clientData,
                          entreprise: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="w-100">
                    <label className="mb-2"> Adresse</label>
                    <input
                      className="form-control mb-3 ms-2"
                      type="text"
                      placeholder="Saisissez l'adresse"
                      value={clientData.adresse}
                      onChange={(e) =>
                        setClientdata({
                          ...clientData,
                          adresse: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="d-flex justify-content-between ">
                  <div className="w-100">
                    <label className="mb-2"> Email</label>
                    <input
                      className={`form-control mb-3 ${
                        isEmailValid ? "" : "is-invalid"
                      }`}
                      type="email"
                      placeholder="Entrer l'adresse e-mail"
                      value={clientData.email}
                      onChange={(e) => {
                        setClientdata({ ...clientData, email: e.target.value });
                        setIsEmailValid(emailRegex.test(e.target.value));
                      }}
                    />
                  </div>
                  <div className="w-100">
                    <label className="mb-2"> Téléphone</label>
                    <input
                      className="form-control mb-3 ms-2 "
                      type="number"
                      placeholder="0101010101"
                      value={clientData.phone}
                      onChange={(e) =>
                        setClientdata({ ...clientData, phone: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="detailscontenu mt-4 ">
              <div className="formclient m-4">
                <span>
                  <i className="fa-solid fa-map-pin"></i> <b>Remarques </b>
                </span>
                <hr></hr>
                <div className="mb-3 remarque">
                  <span>
                    Vous souhaitez conserver des informations au sujet de ce
                    client ? Voici l'endroit où prendre des notes sur le projet,
                    suivre vos communications, etc.
                  </span>
                </div>
              </div>
            </div>

            <div className=" actions">
              <a className="create-btn cursor ms-2" onClick={UpdateModal}>
                {" "}
                Enregistrer
              </a>
              {/* <a className="create-btn cursor">Enregistrer et continuer</a> */}
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="v-pills-profile"
            role="tabpanel"
            aria-labelledby="v-pills-profile-tab"
          >
            <div className="titlecontent">
              <h2 className="">
                Sites et autorisations{" "}
                <i className="fa-solid fa-circle-question"></i>
              </h2>
              <span>
                Définissez les sites auxquels votre client peut accéder et gérez
                ses autorisations.
              </span>
            </div>
            {/* <SitesAutorisation clientData={clientData} update={updateDataclient} /> */}
            <>
              {/* <span className="attribuerBtn" onClick={(e) => addNewSite()}>Attribuer un site</span> */}
              <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                {siteAttibuted.map((s, index) => {
                  return (
                    <div key={index}>
                      <li
                        className="nav-item  position-relative"
                        role="presentation"
                        onClick={(e) => changeCurrentSite(s._id)}
                      >
                        <button
                          className={
                            s._id == selectedSite
                              ? "nav-link active"
                              : "nav-link"
                          }
                          id={"pills-tab" + s._id}
                          data-bs-toggle="pill"
                          data-bs-target={"#pills-" + s._id}
                          type="button"
                          role="tab"
                          aria-controls={"pills-" + s._id}
                          aria-selected="true"
                        >
                          {" "}
                          {s.site.nom}
                        </button>
                      </li>
                    </div>
                  );
                })}
              </ul>
              <div className="tab-content" id="sitesAttr">
                {siteAttibuted.map((s, index) => {
                  return (
                    <div key={index}>
                      {s._id != "new" ? (
                        <div
                          className={
                            s._id == selectedSite
                              ? "tab-pane fade  active show"
                              : "tab-pane fade "
                          }
                          id={"pills-" + s._id}
                          role="tabpanel"
                          aria-labelledby={"pills-" + s._id + "-tab"}
                        >
                          <div className="d-flex justify-content-start aslign-items-center ">
                            <div
                              className="thumbnail"
                              style={{
                                background: "url(" + s.site.screenshot + ")",
                              }}
                            ></div>

                            <div className="siteInfo text-start ms-3 d-flex flex-column justify-content-between">
                              <h3>{s.site.nom}</h3>
                              <a
                                href={
                                  s.site.domaine.includes("http")
                                    ? s.site.domaine
                                    : "https://" + s.site.domaine
                                }
                                className="text-decoration-none"
                                target="_blank"
                              >
                                <i className="fa-solid fa-link me-2"></i>
                                {s.site.domaine}
                              </a>
                              <span className="state">{s.site.etat}</span>
                              <a
                                href={
                                  s.site.domaine.includes("http")
                                    ? s.site.domaine
                                    : "https://" + s.site.domaine
                                }
                                className="text-decoration-none apercu"
                                target="_blank"
                              >
                                <i className="fa-solid fa-eye me-2"></i>Aperçu
                              </a>
                            </div>
                          </div>
                          <div
                            className="cursor btndelete"
                            onClick={() => deleteattrsite(s._id)}
                          >
                            <span>
                              <i className="fa-solid fa-trash"></i> Supprimer
                              site attribué
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div
                          className={
                            s._id == selectedSite
                              ? "tab-pane fade  active show"
                              : "tab-pane fade "
                          }
                          id={"pills-new"}
                          role="tabpanel"
                          aria-labelledby={"pills-new-tab"}
                        >
                          <div
                            className="detailscontenu p-2"
                            id="autorisatiocleint"
                          >
                            <div className="search">
                              <span className="titleinfo m-3">
                                {" "}
                                <b>
                                  <i className="fa-solid fa-earth-americas"></i>{" "}
                                  Site attribué
                                </b>
                              </span>
                              <div className="input-group mb-3 p-2 serash-sites">
                                <input
                                  onKeyDown={(e) =>
                                    e.key == "Enter" ? fiterSearsh() : null
                                  }
                                  type="text"
                                  value={search}
                                  className="form-control"
                                  placeholder="Rechercher par  site ou par  client"
                                  aria-label="Recipient's username"
                                  aria-describedby="basic-addon2"
                                  onChange={handleInputChange}
                                />
                                <button
                                  onClick={restInput}
                                  className="iclosed"
                                  type="reset"
                                >
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
                              <div
                                className={
                                  sites.length > 0
                                    ? "table table-borderless tablesite "
                                    : "d-none"
                                }
                              >
                                <>
                                  {sites.length > 0
                                    ? sites.map((item, index) => {
                                        return (
                                          <div
                                            key={index}
                                            className="solid"
                                            onClick={(e) =>
                                              attribuerSite(item._id)
                                            }
                                          >
                                            {/* <td>{item._id}</td> */}
                                            <div className="tableNameSite">
                                              <div
                                                className="client cursor"
                                                onClick={(e) =>
                                                  changeView("Siteattribue")
                                                }
                                              >
                                                {item.screenshot != "" ? (
                                                  <img
                                                    src={item.screenshot}
                                                    className="img"
                                                  />
                                                ) : (
                                                  <img
                                                    src={imgSite}
                                                    className="img"
                                                  />
                                                )}
                                                <span className="clients">
                                                  {item.etat == "Actif" ? (
                                                    <>
                                                      <b>{item.domaine} </b>

                                                      <Toaster />
                                                    </>
                                                  ) : (
                                                    <>
                                                      <span className="text-decoration-none">
                                                        <b>{item._id}</b>
                                                      </span>

                                                      <Toaster />
                                                    </>
                                                  )}
                                                  <span className="name">
                                                    {" "}
                                                    {item.nom}
                                                  </span>
                                                </span>
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
                                                  <span className="type">
                                                    {" "}
                                                    {item.etat}
                                                  </span>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        );
                                      })
                                    : ""}
                                </>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="detailscontenu p-2 mt-3" id="permissions">
                <span className="titleinfo m-3">
                  <i className="fa-solid fa-key"></i> Autorisations{" "}
                  <span className="text-muted">
                    {selectedPermisions.length} Sélectionnée
                    {selectedPermisions.length > 1 ? "s" : ""}
                  </span>
                </span>
              </div>
              <div
                className={
                  selectedSite != null && selectedSite != "new"
                    ? "Allpermission"
                    : "d-none"
                }
              >
                {permissions.map((p, i) => {
                  return (
                    <div key={i}>
                      <div className=" d-flex justify-content-start align-items-center mb-3 mt-3 gap-3 border-bottom  pb-3">
                        <div className="form-check form-switch d-flex gap-2  w-25 ">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id={"isActivetablet"}
                            name={"isActivetablet"}
                            checked={selectedPermisions.includes(p._id)}
                            onChange={(e) => {
                              changeSelectedPermission(
                                e.target.checked.toString(),
                                p
                              );
                            }}
                          />
                          <span className="d-block text-start">{p.label}</span>
                        </div>

                        <span className="d-block w-75 text-start">
                          {p.description}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          </div>
          <div
            className="tab-pane fade"
            id="v-pills-messages"
            role="tabpanel"
            aria-labelledby="v-pills-messages-tab"
          >
            <div className="titlecontent">
              <h2 className="">
                Accès <i className="fa-solid fa-circle-question"></i>
              </h2>
              <span>Autorisez votre client à accéder à la plateforme.</span>
            </div>
            <div className="contents" id="acces">
              <div className="detailscontenu">
                <span className="titleinfo m-3">
                  {" "}
                  <b>
                    <i className="fa-solid fa-share-nodes"></i> Accès du  client
                  </b>
                </span>
                <span className="m-3">
                  Informez votre client que son site est prêt à être vérifié.
                  Pour ce faire, envoyez l'URL de configuration ou envoyez un
                  e-mail d'invitation auquel sont automatiquement jointes les
                  informations dont il a besoin pour se connecter à la
                  plateforme. <br></br>
                </span>
                <div className="generurl p-3 w-50">
                  <span>URL de configuration</span>
                  <div className="input-group mb-3 serash-sites ">
                    <input
                      type="text"
                      value={`${window.location.origin}/loginclient/${token}`}
                      className="form-control"
                      placeholder="URL de configuration"
                      aria-label="Recipient's username"
                      aria-describedby="basic-addon2"
                      disabled
                    />
                    <div className="input-group-append">
                      <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={() => {
                          copieid(
                            `${window.location.origin}/loginclient/${token}`
                          );
                        }}
                      >
                        Copier
                      </button>
                      <Toaster />
                    </div>
                  </div>
                </div>

                <div className="generurl p-3 w-50">
                  <span>E-mail d'invitation</span>
                  <div className="input-group mb-3 serash-sites ">
                    <input
                      type="email"
                      value={clientData.email}
                      disabled
                      className="form-control "
                      placeholder="URL de configuration"
                      aria-label="Recipient's username"
                      aria-describedby="basic-addon2"
                    />
                    <div className="input-group-append">
                      <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={sendEmail}
                      >
                        Envoyer
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <AccesClient clientData={clientData} /> */}
          </div>
        </div>
      </div>
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
                Voulez-vous vraiment supprimer le client
                <b> {clientData.nom} ? </b>
                <br />
                Si vous supprimez ce client, il ne pourra plus accéder à la
                plateforme.
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
      <Modal
        show={infomodal}
        onHide={handleCloseinfo}
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
              <div className="titre_popup_add_page"> Attribué un site</div>

              <i
                className="fa-solid fa-xmark closeSideBar"
                onClick={handleCloseinfo}
              ></i>
            </div>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="add_page_modal_content ">
            <div className="addPageOptions">
              <div className="add_Page_Options_title">
                Merci d'attribuer un site pour voir url d'accès site client
                <br></br>
                <b>
                  Cliquer sur le sites et autorisations pour attribuer un site
                </b>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-rounded  btn-outline-secondary"
            onClick={handleCloseinfo}
          >
            Fermer
          </button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={updatemodal}
        onHide={handleCloseUpdate}
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
              <div className="titre_popup_add_page"> Mettre à jour client</div>

              <i
                className="fa-solid fa-xmark closeSideBar"
                onClick={handleCloseUpdate}
              ></i>
            </div>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="add_page_modal_content ">
            <div className="addPageOptions">
              <div className="add_Page_Options_title">
                Voulez-vous vraiment métre à jour les informations du client
                <b> {clientData.nom} ? </b>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-rounded  btn-outline-secondary"
            onClick={handleCloseUpdate}
          >
            Annuler
          </button>
          <button
            className="btn  btn-rounded btn btn-outline-secondary  create"
            onClick={UpdateClient}
          >
            Mettre à jour
          </button>
        </Modal.Footer>
      </Modal>
      <Toaster />
    </div>
  );
}
