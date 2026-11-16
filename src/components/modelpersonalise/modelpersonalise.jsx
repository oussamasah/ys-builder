import React, { useEffect, useRef, useState } from "react";
import "./modelpersonalise.css";
import { Modal, Button } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import drapRed from "../../assets/imgTemplate/drapRed.svg";
import { useDispatch, useSelector } from "react-redux";
import EtoileLight from "../../assets/imgTemplate/EtoileLight.svg";
import Topbars from "../../components/Topbars/Topbars";
import Joyride from "react-joyride";
import Select from "react-select";
export default function Mdelpersonalise() {
  const state = {
    run: window.localStorage.getItem("tutoState")
      ? JSON.parse(window.localStorage.getItem("tutoState"))["listModels"] ==
        true
        ? false
        : true
      : true,
    steps: [
      {
        target: ".Modelssites",
        disableBeacon: true,
        content: "Filtrez la liste des model par ici par type  ou catégorie",
      },
      {
        target: ".item",
        disableBeacon: true,
        content: "Modifier à partir  button modéle ",
      },
      {
        target: ".not",
        disableBeacon: true,
        content: "Supprimer ou affichier type de catégorie  ",
      },
    ],
  };

  const storeUser = useSelector((state) => state.user.value);
  const optionsCategories = [
    { value: "historique", label: "HISTORIQUE" },
    { value: "vide", label: "VIDE" },
    { value: "slider", label: "SLIDER" },
    { value: "blocs_de_texte", label: "BLOCS DE TEXTE" },
    { value: "images_et_texte", label: "BLOCS ET IMAGES" },
    { value: "onglets", label: "ONGLETS" },
    { value: "menu_et_tarifs", label: "MENU ET TARIFS" },
    { value: "galerie", label: "GALERIE" },
    { value: "faq", label: "FAQ" },
    { value: "contact", label: "CONTACT" },
    { value: "entete_de_page", label: "ENTÊTE DE PAGE" },
    { value: "pied_de_page", label: "PIED DE PAGE" },
    { value: "breadcrumb", label: "Fil D'ARIANE" },
    { value: "socialType", label: "RESEAUX SOCIAUX" },
    { value: "autres", label: "AUTRES" },
  ];
  const optionsType = [
    { value: "Prive", label: "PRIVE" },
    { value: "Global", label: "GLOBAL" },
    { value: "Public", label: "PUBLIC" },
  ];
  const [ModelP, setModelP] = useState();
  const [filterModeType, setFilterModeType] = useState("");
  const [filterModeCat, setFilterModeCat] = useState("");
  const [showdelete, setShowdelete] = useState(false);
  const [CheckedCat, setCheckedCat] = useState(false);
  const [show, setShow] = useState(false);
  const [SelectedCategorie, setSelectedCategorie] = useState({});
  const [SelectedType, setSelectedType] = useState('');

  const [modelId, setmodelId] = useState("");
  const [sectionId, setSectionIdId] = useState("");
  const handleShow = (item) => {
    //console.log(item._id)
    setShow(true);
    setSelectedCategorie(item.category); // Mettre à jour SelectedCategorie avec la catégorie de l'
    //console.log(item)
    setSelectedType(item.type)
    setSectionIdId(item._id)
  };
  const handleClosedel = () => setShowdelete(false);
  const handleClose = () => setShow(false);

  const supModal = (e) => {
    setShowdelete(true);
    setmodelId(e);
  };

  const handleCategorieChange = (selectedOption) => {
    setSelectedCategorie(selectedOption);
    // console.log(`Option selected:`, selectedOption);
  };
  const FilterType = async (type) => {
    await axios
      .post(
        process.env.REACT_APP_API_URL +
          "/models/filterbytype/" +
          storeUser.user.CompteSchema._id,
        {
          search: type.value,
        }
      )

      .then((response) => {
        setModelP(response.data.data);
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
  const FilterCategorie = async (category) => {
    await axios
      .post(
        process.env.REACT_APP_API_URL +
          "/models/filterbycategory/" +
          storeUser.user.CompteSchema._id,
        {
          search: category.value,
        }
      )

      .then((response) => {
        setModelP(response.data.data);
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
  const getAllModels = async () => {
    await axios
      .get(
        process.env.REACT_APP_API_URL +
          "/models/get/" +
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

        setModelP(response.data.data);
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
  const deleteModel = async () => {
    await axios
      .delete(process.env.REACT_APP_API_URL + "/models/delete/" + modelId.ref)
      .then((response) => {
        getAllModels();
        setShowdelete(false);
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
  const EditSectionCategorie = async (sectionId) => {
    sectionId = sectionId
 
    try {
      let postData = {
        category: SelectedCategorie,
      };
  
      if (CheckedCat) {
        postData.etat = CheckedCat;
      }
 
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/models/updateetatmodel/${sectionId}`,
        postData
      );
  
      getAllModels();
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
    } catch (error) {
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
    }
  };
  
  const hasMediaEffectRun = useRef(false);
  useEffect(() => {
    const fetchData = async () => {
      if (!hasMediaEffectRun.current) {
        hasMediaEffectRun.current = true;
        await getAllModels();
      }
    };

    fetchData();
  }, []);

  useEffect(() => {}, [ModelP, filterModeType, filterModeCat]);

  return (
    <div id="Modelpernoalise">
      <Topbars />
      <div className="d-flex align-items-stretch templatePane">
        <div className="col-xl-2 col-md-5 col-12 ">
          <div className="tmpSidebar">
            <div className="titreSidebar">
              <span>MODÈLES</span>
            </div>
            <div className="Modelssites">
              <div className="actiSidebar">
                <div className="d-flex justify-content-between">
                  <span>TYPE</span>{" "}
                </div>
                <ul>
                  <li
                    className="pointer"
                    onClick={() => {
                      getAllModels();
                    }}
                  >
                    <span>
                      <img src={EtoileLight} /> TOUS
                    </span>
                  </li>
                </ul>
                <ul>
                  {optionsType.map((act) => {
                    return (
                      <>
                        <li
                          className="pointer"
                          onClick={() => {
                            FilterType(act);
                          }}
                        >
                          <span>
                            <img src={EtoileLight} /> {act.label}
                          </span>
                        </li>
                      </>
                    );
                  })}
                </ul>
              </div>
              <div className="actiSidebar">
                <div className="d-flex justify-content-between">
                  <span>CATÈGORIE</span>{" "}
                </div>

                <ul>
                  {optionsCategories.map((act) => {
                    return (
                      <>
                        <li
                          className="pointer"
                          onClick={() => {
                            FilterCategorie(act);
                          }}
                        >
                          <span>
                            <img src={EtoileLight} /> {act.label}
                          </span>
                        </li>
                      </>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-10 col-md-7 col-12 ">
          <div className="templateContent">
            <div className="tempList">
              {ModelP && ModelP.length > 0
                ? ModelP.map((item, index) => {
                    return (
                      <>
                        <div key={index} className="item not blank">
                          <div
                            className="capturetemplate"
                            style={{
                              backgroundImage: `url("${item.capture}")`,
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
                                  <span className="title-ac">Type</span>
                                  <div className="title-ac-1">
                                    <img src={drapRed} alt="" /> {item.type}
                                  </div>
                                  <span className="title-ac">Catégorie</span>
                                  <div className="title-ac-1">
                                    <img src={drapRed} alt="" /> {item.category.label}
                                  </div>
                                </div>
                              </div>
                            </div>
                            {item.type==='Public'?   <button
                              className="btns img-right  "
                              onClick={() => supModal(item)}
                            >
                              <i
                                class="fas fa-trash-alt"
                                style={{ color: "#f6c344", padding: "5px" }}
                              ></i>
                            </button>:""}
                         
                          </div>
                          <div className="show-action">
                            <button
                              className="btns "
                              onClick={() => handleShow(item)}
                            >
                              Editer modèle
                            </button>
                          </div>
                        </div>
            
                      </>
                    );
                    
                  })
                : "Aucun modéle"}
            </div>
          </div>
        </div>

        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          id="modalcreateT"
        >
          <Modal.Header>
            <Modal.Title>Modifier catégorie section</Modal.Title>
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
          
  {SelectedType == "Public" ? (
    <div class="form-check form-switch mb-3 p-3">
      <label class="form-check-label" for={"stwitchcat"}>
        Etat
      </label>
      <input
        class="form-check-input"
        checked={CheckedCat == "true"}
        type="checkbox"
        role="switch"
        id={"stwitchcat"}
        onChange={(e) => setCheckedCat(e.target.checked.toString())}
      />
    </div>
  ) : (
    ""
  )}
<div className="form-group mt-3">
  Catégorie  {}
  <Select
  defaultValue={SelectedCategorie.label }
  value={SelectedCategorie}
  options={optionsCategories}
  onChange={handleCategorieChange}
/>
</div>
</Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Fermer
            </Button>
            <Button variant="primary" onClick={(e) => EditSectionCategorie(sectionId)}>
              Modifier
            </Button>
          </Modal.Footer>
        </Modal>
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
                <div className="titre_popup_add_page">
                  {" "}
                  Supprimer model section
                </div>

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
                  Voulez-vous vraiment supprimer cette model ?
                </div>
                <img
                  src={modelId.capture}
                  alt="capture"
                  className="captureModel"
                />
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
              onClick={(item) => deleteModel(item)}
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
            tutoState["listModels"] = true;
            window.localStorage.setItem("tutoState", JSON.stringify(tutoState));
          }
        }}
      />
    </div>
  );
}
