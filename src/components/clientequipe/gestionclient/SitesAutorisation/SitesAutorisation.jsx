import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import "./SitesAutorisation.css";

import imgSite from "../../../../assets/imgSites/imgSite.svg";
import { useParams } from "react-router-dom";
// import { useLocation } from "react-router-dom";
export default function SitesAutorisation(props) {
  const storeUser = useSelector((state) => state.user.value);
  let { id } = useParams();
  const [siteAttibuted, setSiteAttributed] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [teamView, setTeamView] = useState();
  const [selectedPermisions, setSelectedPermisions] = useState([]);
  // const location = useLocation();

  const [clientData, setClientdata] = useState();
  const [sites, setSites] = useState([]);
  const [search, setSearch] = useState();
  const [selectedSite, setSelectedSite] = useState(null);
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
  const GetClient = async () => {
    await axios
      .get(process.env.REACT_APP_API_URL + "/clients/getbyid/" + id)
      .then((response) => {
        setClientdata(response.data.data[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    GetClient()
  }, [])
  
  const attribuerSite = async (siteId) => {
    toast.loading("Opération en cours...");
    await axios
      .post(process.env.REACT_APP_API_URL + "/clients/attributsite/" + id, {
        idSite: siteId,
        CompteSchema: clientData.CompteSchema,
      })
      .then((response) => {
        toast.dismiss();
        setSelectedPermisions([]);

        getAttribuedSites();
        GetClient()
        restInput();
        toast.success(response.data.message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
        });

        //setDetalisSite(response.data.data);
      })
      .catch((error) => {
        getAttribuedSites();
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
        GetClient()
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
  const addNewSite = () => {
    let s = siteAttibuted.filter((s) => s._id != "new");
    s.push({ _id: "new", site: { nom: "Attribuer un nouveau site" } });
    setSiteAttributed(s);
  };
  const changeView = (item) => {
    // Set the selected site
    setSelectedSite(item);
  };
  useEffect(() => {}, [selectedSite, siteAttibuted]);
  useEffect(() => {
    listPermession();
    getAttribuedSites();
    if (siteAttibuted.length > 0) {
      setSelectedSite(siteAttibuted[0]._id);
    }
  }, []);
  return (
    <>
      {/* <span className="attribuerBtn" onClick={(e) => addNewSite()}>Attribuer un site</span> */}
      <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
        {siteAttibuted.map((s, index) => {
          return (
            <>
              <li
                className="nav-item  position-relative"
                role="presentation"
                onClick={(e) => changeCurrentSite(s._id)}
              >
                <button
                  class={s._id == selectedSite ? "nav-link active" : "nav-link"}
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
            </>
          );
        })}
      </ul>
      <div class="tab-content" id="sitesAttr">
        {siteAttibuted.map((s, index) => {
          return (
            <>
              {s._id != "new" ? (
                <div
                  class={
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
                      style={{ background: "url(" + s.site.screenshot + ")" }}
                    ></div>

                    <div className="siteInfo text-start ms-3 d-flex flex-column justify-content-between">
                      <h3>{s.site.nom}</h3>
                      <a
                        href={
                          s.site.domaine.includes("http")
                            ? s.site.domaine
                            : "https://" + s.site.domaine
                        }
                        class="text-decoration-none"
                        target="_blank"
                      >
                        <i class="fa-solid fa-link me-2"></i>
                        {s.site.domaine}
                      </a>
                      <span className="state">{s.site.etat}</span>
                      <a
                        href={
                          s.site.domaine.includes("http")
                            ? s.site.domaine
                            : "https://" + s.site.domaine
                        }
                        class="text-decoration-none apercu"
                        target="_blank"
                      >
                        <i class="fa-solid fa-eye me-2"></i>Aperçu
                      </a>
                    </div>
                  </div>
                  <div
                    className="cursor btndelete"
                    onClick={() => deleteattrsite(s._id)}
                  >
                    <span>
                      <i className="fa-solid fa-trash"></i> Supprimer site
                      attribué
                    </span>
                  </div>
                </div>
              ) : (
                <div
                  class={
                    s._id == selectedSite
                      ? "tab-pane fade  active show"
                      : "tab-pane fade "
                  }
                  id={"pills-new"}
                  role="tabpanel"
                  aria-labelledby={"pills-new-tab"}
                >
                  <div className="detailscontenu p-2" id="autorisatiocleint">
                    <div className="search">
                      <span className="titleinfo m-3">
                        {" "}
                        <b>
                          <i class="fa-solid fa-earth-americas"></i> Site
                          attribué
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
                                    onClick={(e) => attribuerSite(item._id)}
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
                                          <img src={imgSite} className="img" />
                                        )}
                                        <span className="clients">
                                          {item.etat == "Actif" ? (
                                            <>
                                              <b>{item.domaine} </b>

                                              <Toaster />
                                            </>
                                          ) : (
                                            <>
                                              <span class="text-decoration-none">
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
            </>
          );
        })}
      </div>

      <div className="detailscontenu p-2 mt-3" id="permissions">
        <span className="titleinfo m-3">
          <i class="fa-solid fa-key"></i> Autorisations{" "}
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
        {permissions.map((p) => {
          return (
            <>
              <div className=" d-flex justify-content-start align-items-center mb-3 mt-3 gap-3 border-bottom  pb-3">
                <div className="form-check form-switch d-flex gap-2  w-25 ">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={"isActivetablet"}
                    name={"isActivetablet"}
                    checked={selectedPermisions.includes(p._id)}
                    onChange={(e) => {
                      changeSelectedPermission(e.target.checked.toString(), p);
                    }}
                  />
                  <span className="d-block text-start">{p.label}</span>
                </div>

                <span className="d-block w-75 text-start">{p.description}</span>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}
