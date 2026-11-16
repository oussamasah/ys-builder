import React, { useEffect, useRef, useState } from "react";
import "./templates.css";
import addTemplate from "../../assets/imgTemplate/addTemplate.svg";
import { Modal, Button } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Eyes from "../../assets/imgTemplate/Eyes.svg";
import drapRed from "../../assets/imgTemplate/drapRed.svg";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { setcurrentSite, removecurrentSite } from "../../redux/features/site";
import Etoile from "../../assets/imgTemplate/Etoile.svg";
import EtoileLight from "../../assets/imgTemplate/EtoileLight.svg";
import Topbars from "../../components/Topbars/Topbars";
import Joyride from "react-joyride";

export default function Templates() {
  const state = {
    run: window.localStorage.getItem("tutoState")
      ? JSON.parse(window.localStorage.getItem("tutoState"))["listTemplate"] ==
        true
        ? false
        : true
      : true,
    steps: [
      {
        target: ".Modelssites",
        disableBeacon: true,
        content: "Filtrez la liste des template par ici",
      },
      {
        target: ".item",
        disableBeacon: true,
        content: "Créez votre site à partir de zéro",
      },
      {
        target: ".not",
        disableBeacon: true,
        content: "choisissez parmi nos modèles préconçus",
      },
    ],
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const storeUser = useSelector((state) => state.user.value);

  const [Template, setTemplate] = useState();
  const [filterTemplate, setFilterTemplate] = useState([]);
  const [show, setShow] = useState(false);
  const [filter, setFilter] = useState({ activite: [], color: [] });
  const [showdelete, setShowdelete] = useState(false);
  const [file, setFile] = useState([]);
  const [ListActivities, setListActivities] = useState([
    { value: "", label: "" },
  ]);

  const [SelectedActivite, setSelectedActivite] = useState({
    value: "",
    label: "",
  });

  const [couleur, setCouleur] = useState([]);
  const [activities, setActivities] = useState([]);

  const [name, setName] = useState("");

  const [templateId, settemplateId] = useState("");
  const handleClose = () => setShow(false);

  const handleClosedel = () => setShowdelete(false);
  const handleShow = (e) => {
    setShow(true);
    settemplateId(e);
  };

  const supModal = (e) => {
    setShowdelete(true);
    settemplateId(e);
  };

  const createSite = async () => {
    // console.log({
    //   nom: name,
    //   activite: SelectedActivite.label,
    //   CompteSchema: storeUser.user.CompteSchema._id,
    // });
    await axios
      .post(process.env.REACT_APP_API_URL + "/sites/create/" + templateId, {
        nom: name,
        activite: SelectedActivite.value,
        CompteSchema: storeUser.user.CompteSchema._id,
      })
      .then((response) => {
        dispatch(setcurrentSite(response.data.data));
        navigate(
          "/editor/" +
            response.data.data.site._id +
            "/page/" +
            response.data.data.pages[0]._id
        );
      })
      .catch((error) => {
        toast.error({
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
  const handleActiviteChange = (selectedOption) => {
    setSelectedActivite(selectedOption);
    console.log(`Option selected:`, selectedOption);
  };
  const deleteTemplate = async (e) => {
    await axios
      .delete(process.env.REACT_APP_API_URL + "/templates/delete/" + templateId)
      .then((response) => {
        GetTemplate();
        handleClosedel();
      })
      .catch((error) => {
        toast.error({
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

  const preview = (e) => {
    window.open("/template/" + e, "_blank");
  };
  const GetTemplate = async () => {
    await axios
      .get(process.env.REACT_APP_API_URL + "/templates/getAll")
      .then((response) => {
        let tmps = response.data.data;
        let colorList = [];
        let activityList = [];
        tmps.map((tmp) => {
          if (tmp.activite) {
            activityList.push(tmp.activite);
          }

          tmp.color.map((c) => colorList.push(c));
        });
        colorList = [...new Set(colorList)];

        const uniqueActivities = activityList.filter(
          (value, index, self) =>
            index === self.findIndex((t) => t._id === value._id)
        );
        setActivities(uniqueActivities);
        setCouleur(colorList);
        setTemplate(response.data.data);
      })
      .catch((error) => {});
  };
  const GetActivities = async () => {
    await axios
      .get(process.env.REACT_APP_API_URL + "/activites/get")
      .then((response) => {
        let list = response.data.data.map((a) => {
          return { value: a._id, label: a.label };
        });
        setListActivities(list);
      })
      .catch((error) => {});
  };

  const hasMediaEffectRun = useRef(false);
  useEffect(() => {
    const fetchData = async () => {
      if (!hasMediaEffectRun.current) {
        hasMediaEffectRun.current = true;
        await GetActivities();
        await GetTemplate();
      }
    };

    fetchData();
  }, []);

  useEffect(() => {}, [
    Template,
    ListActivities,
    couleur,
    activities,
    filterTemplate,
  ]);
  useEffect(() => {
    let fTemplates = [];
    if (filter.activite.length > 0) {
      Template.filter((t) => {
        console.log("--------------", t.activite);
        if (filter.activite.includes(t.activite._id)) {
          fTemplates.push(t);
        }
      });
    }
    if (filter.color.length > 0) {
      Template.filter((t) => {
        filter.color.map((c) => {
          console.log(c);
          if (t.color.includes(c)) {
            fTemplates.push(t);
          }
        });
      });
    }
    fTemplates = [...new Set(fTemplates)];
    setFilterTemplate(fTemplates);
  }, [filter]);

  const changeFilter = (type, value) => {
    let f = { ...filter };
    console.log(value);
    if (type == "color") {
      let exist = f.color.filter((x) => x == value);

      if (exist.length == 0) {
        f.color.push(value);
      } else {
        let newF = f.color.filter((x) => x != value);
        f.color = newF;
      }

      console.log(f);
    }
    if (type == "activity") {
      let exist = f.activite.filter((x) => x == value);

      if (exist.length == 0) {
        f.activite.push(value);
      } else {
        let newF = f.activite.filter((x) => x != value);
        f.activite = newF;
      }
    }
    setFilter(f);
    console.log(f);
  };
  return (
    <div>
      <Topbars />
      <div className="d-flex align-items-stretch templatePane">
        <div className="col-xl-2 col-md-5 col-12 ">
          <div className="tmpSidebar">
            <div className="titreSidebar">
              <span>MODÈLES DE SITES</span>
            </div>
            <div className="Modelssites">
              <div className="Models">
                <ul>
                  <li>
                    <span>Tous les modèles</span>
                  </li>
                  <li>
                    <span className="text-muted">Modèles enregistrés</span>
                  </li>
                  <li>
                    <span className="text-muted">Modèles Studio</span>
                  </li>
                </ul>
              </div>
              <div className="borders"></div>
              <div className="actiSidebar">
                <div className="d-flex justify-content-between">
                  <span>ACTIVITÉS</span>{" "}
                  <span
                    class={
                      filter.activite.length > 0 || filter.color.length > 0
                        ? "d-block pointer"
                        : "d-none"
                    }
                    onClick={(e) => {
                      setFilter({ activite: [], color: [] });
                    }}
                  >
                    Annuler
                  </span>
                </div>

                <ul>
                  {activities.map((act) => {
                    return (
                      <>
                        <li
                          className="pointer"
                          onClick={(e) =>
                            changeFilter("activity", act._id.toString())
                          }
                        >
                          <span>
                            <img
                              src={
                                filter.activite.includes(act._id)
                                  ? Etoile
                                  : EtoileLight
                              }
                            />{" "}
                            {act.label}
                          </span>
                        </li>
                      </>
                    );
                  })}
                </ul>
              </div>
              <div className="actiSidebar">
                <span>COULEURS</span>
              </div>

              <div className="ListColeur">
                {couleur.map((col, i) => (
                  <span
                    key={i}
                    style={{ backgroundColor: col }}
                    onClick={(e) => changeFilter("color", col)}
                  >
                    <span
                      className={
                        filter.color.includes(col)
                          ? "ListColeur-1 color pointer active"
                          : "ListColeur-1 color pointer"
                      }
                    ></span>
                  </span>
                ))}
              </div>
            </div>
            {/* <button onClick={() => navigate(-1)}>
        <i
          className="fa-solid fa-arrow-turn-down-left iconArrow"
          color="#617379"
          size="1x"
        ></i>
      </button>
      <input type="text" placeholder="Recherche un modèle" name="searchModel" /> */}
          </div>
        </div>

        <div className="col-xl-10 col-md-7 col-12 ">
          <div className="templateContent">
            <div className="tempList">
              <div className="item blank" onClick={() => handleShow("")}>
                {/* <FaPlusCircle style={{ color: "red", fontSize: "50px" }} /> */}
                <img src={addTemplate} alt="ajouter  template" />
              </div>

              {filterTemplate && filterTemplate.length > 0
                ? filterTemplate.map((item, index) => {
                    return (
                      <>
                        <div key={index} className="item not blank">
                          <div
                            className="capturetemplate"
                            style={{
                              backgroundImage: `url("${
                                process.env.REACT_APP_MEDIA_URL +
                                "templates/" +
                                item.ref +
                                "/capture-desktop.png"
                              }")`,
                            }}
                          ></div>
                          <div className="optiontemp">
                            <div className="dropup">
                              <button
                                type="button"
                                className=" btns img-left dropdown-toggle"
                                data-bs-toggle="dropdown"
                              >
                                <div data-bs-toggle="dropdown"> </div>
                              </button>
                              <div className="dropdown-menu">
                                <div className="Activitees">
                                  <span className="title-ac">Activités</span>
                                  <div className="title-ac-1">
                                    <img src={drapRed} alt="" /> {item.title} (
                                    {item.activity})
                                  </div>
                                </div>

                                <button
                                  className="btns  commencer"
                                  onClick={() => handleShow(item._id)}
                                >
                                  {" "}
                                  COMMENCER{" "}
                                </button>
                              </div>
                            </div>
                            <button
                              className="btns img-right  "
                              // onClick={() => deleteTemplate(item._id)}
                              onClick={() => supModal(item._id)}
                            >
                              <i
                                class="fas fa-trash-alt"
                                style={{ color: "#f6c344", padding: "5px" }}
                              ></i>
                            </button>
                            <button
                              className="btns img-right  "
                              onClick={() => preview(item._id)}
                            >
                              <img src={Eyes} />
                            </button>
                          </div>
                          <div className="show-action">
                            <button
                              className="btns "
                              onClick={() => handleShow(item._id)}
                            >
                              Choisir ce modèle
                            </button>
                          </div>
                        </div>
                      </>
                    );
                  })
                : Template
                ? Template.map((item, index) => {
                    return (
                      <>
                        <div key={index} className="item not blank">
                          <div
                            className="capturetemplate"
                            style={{
                              backgroundImage: `url("${
                                process.env.REACT_APP_MEDIA_URL +
                                "templates/" +
                                item.ref +
                                "/capture-desktop.png"
                              }")`,
                            }}
                          ></div>
                          <div className="optiontemp">
                            <div className="dropup">
                              <button
                                type="button"
                                className=" btns img-left dropdown-toggle"
                                data-bs-toggle="dropdown"
                              >
                                <div data-bs-toggle="dropdown"> </div>
                              </button>
                              <div className="dropdown-menu">
                                <div className="Activitees">
                                  <span className="title-ac">Activités</span>
                                  <div className="title-ac-1">
                                    <img src={drapRed} alt="" /> {item.title} (
                                    {item.activity})
                                  </div>
                                </div>

                                <button
                                  className="btns  commencer"
                                  onClick={() => handleShow(item._id)}
                                >
                                  {" "}
                                  COMMENCER{" "}
                                </button>
                              </div>
                            </div>
                            <button
                              className="btns img-right  "
                              // onClick={() => deleteTemplate(item._id)}
                              onClick={() => supModal(item._id)}
                            >
                              <i
                                class="fas fa-trash-alt"
                                style={{ color: "#f6c344", padding: "5px" }}
                              ></i>
                            </button>
                            <button
                              className="btns img-right  "
                              onClick={() => preview(item._id)}
                            >
                              <img src={Eyes} />
                            </button>
                          </div>
                          <div className="show-action">
                            <button
                              className="btns "
                              onClick={() => handleShow(item._id)}
                            >
                              Choisir ce modèle
                            </button>
                          </div>
                        </div>
                      </>
                    );
                  })
                : ""}
            </div>
          </div>
        </div>
        {/* Modal pour ajouter  Template vide   */}
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          id="modalcreateT"
        >
          <Modal.Header>
            <Modal.Title>Créez votre site web</Modal.Title>
            <div className="btns-action">
              <button
                type="button"
                className="btn-closes"
                aria-label="Close"
                onClick={handleClose}
              >
                {" "}
                <i class="fa-solid fa-xmark"></i>
              </button>
            </div>
          </Modal.Header>
          <Modal.Body>
            <div className="form-group mt-3">
              Nom du site (pour pouvoir trouver votre site facilement)
              <input
                type="text"
                name="name"
                onChange={(e) => setName(e.target.value)}
                required
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Saisissez le nom de votre site"
              />
            </div>
            <div className="form-group mt-3">
              Acitivté (pour pouvoir trouver votre site facilement)
              <Select
                value={SelectedActivite}
                options={ListActivities}
                onChange={(e) => handleActiviteChange(e)}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Fermer
            </Button>
            <Button
              variant="primary"
              disabled={name == "" || SelectedActivite.value == ""}
              onClick={createSite}
            >
              Commencer à créer
            </Button>
          </Modal.Footer>
        </Modal>
        {/*Fin Modal pour ajouter  Template vide */}

        {/* Modal pour ajouter  Template Complete */}

        {/*Fin Modal pour ajouter  Template Complete */}

        <Modal
          show={showdelete}
          onHide={handleClosedel}
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
                <div className="titre_popup_add_page"> Supprimer template</div>

                <i
                  className="fa-solid fa-xmark closeSideBar"
                  onClick={handleClosedel}
                ></i>
              </div>
            </div>
          </Modal.Header>
          <Modal.Body>
            <div className="add_page_modal_content ">
              <div className="addPageOptions">
                <div className="add_Page_Options_title">
                  Voulez-vous vraiment supprimer cette template ?
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button
              className="btn btn-rounded  btn-outline-secondary"
              onClick={handleClosedel}
            >
              Annuler
            </button>
            <button
              className="btn  btn-rounded btn btn-outline-secondary delete"
              onClick={(item) => deleteTemplate(item)}
            >
              Supprimer
            </button>
          </Modal.Footer>
        </Modal>
        <Toaster />
      </div>
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
            tutoState["listTemplate"] = true;
            window.localStorage.setItem("tutoState", JSON.stringify(tutoState));
          }
        }}
      />
    </div>
  );
}
