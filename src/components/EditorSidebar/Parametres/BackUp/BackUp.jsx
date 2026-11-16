import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import "./BackUp.css";
import { Modal } from "react-bootstrap";
export default function BackUp(props) {
  let { siteId } = useParams();
  const [title, setTitle] = useState("");
  const [Sites, setSites] = useState("");
  const [Getsites, setGetsites] = useState([]);
  const [show, setShow] = useState(false);
  const [Detete, setDetete] = useState(false);
  const handleRes = () => setShow(true);
  const handleCloseRestauration = () => setShow(false);
  const handleDeteteShow = () => setDetete(true);
  const handleCloseDetete = () => setDetete(false);
  const [deletedSingleRes, setdeletedSingleRes] = useState(false);
  const handleSingleDelete = (node) => {
    setDetete(true);
    setdeletedSingleRes(node);
  };
  const [backSingleRes, setBackSingleRes] = useState(false);
  const handleSingleBackup = (node) => {
    setShow(true);
    setBackSingleRes(node);
  };

  const BackupSave = async () => {
    try {
      await axios
        .post(process.env.REACT_APP_API_URL + "/backupsite/create/" + siteId, {
          title: title,
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
        
          getBackup();
        })
        .catch(function (error) {
          toast.error("Page non crée", {
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
      toast.error("Page non crée!", {
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

  const Restauration = async (item) => {
    try {
      await axios
        .post(
          process.env.REACT_APP_API_URL + "/backupsite/restaurer/" + item._id
        )
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
          window.location.reload();
          let content = props.editor().getWrapper();
          content.view.render();
        });
    } catch (e) {
      toast.error("Restauration non crée!", {
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

  const BackupDelete = async (item) => {
    axios
      .delete(process.env.REACT_APP_API_URL + "/backupsite/delete/" + item._id)
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
        getBackup();
      });
  };
  const getBackup = async () => {
    axios
      .get(process.env.REACT_APP_API_URL + "/backupsite/get/" + siteId)
      .then((response) => {
        setGetsites(response.data.data);
      })
      .catch((error) => {});
  };
  const getSites = async () => {
    axios
    .get(process.env.REACT_APP_API_URL + "/sites/get/" + siteId)
    .then((response) => {
      setSites(response.data.data.site.nom);
    });
  }


  const hasMediaEffectRun = useRef(false);
  useEffect(() => {
    const fetchData = async () => {
      if (!hasMediaEffectRun.current) {
        hasMediaEffectRun.current = true;
        await getBackup();
        await getSites();
      }
    };

    fetchData();
  }, []);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (title != "") {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [title]);
  const ResetAnalytics = () => {
    setTitle("");
  };

  return (
    <div id="InfoBackUp">
      <div className="form-group mt-3">
        <span>
          {" "}
          Sauvegarde <b>{Sites}</b>
        </span>
        <span className="test-aide">
          Enregistrez une version de votre site pour pouvoir la restaurer si
          nécessaire. Remarque : chaque fois que votre site est publié, nous le
          sauvegardons automatiquement pour vous.
        </span>
      </div>
      <div className="newversion mt-3 ">
        <div className="form-group ">
          <label>Nom de la nouvelle version</label>
          <input
            type="text"
            name="label"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Nom du version"
          />
        </div>
        <div className="form-group d-flex justify-content-end align-items-end ">
          <button
            className="btn  btn-rounded btn btn-outline-secondary rest  me-2"
            onClick={(e) => ResetAnalytics()}
          >
            Annuler
          </button>
          <button
            className="btn  btn-rounded btn btn-outline-secondary send"
            disabled={!isValid}
            onClick={(e) => BackupSave()}
          >
            Enregistrer
          </button>
        </div>
        <div className="d-block ">
          <span>
            {" "}
            <b>{Sites} </b>versions{" "}
          </span>
          <span className="test-aide">
            Pour restaurer une version précédente de votre site, cliquez sur «
            restaurer » en choisissant la version voulue. Une fois restaurée, la
            version actuelle sera automatiquement enregistrée comme la plus
            récente.
            <b className="text-secondary d-block">Remarque: Seules trois versions sont enregistrables</b>
          </span>
        </div>
        <div id="table-wrapper">
         <div id="table-scroll">
        <table class="table table table-sm  backs ">
          <thead>
            <tr>
              <th>Nom du version </th>
              <th>Date du version </th>
              <th>Actions </th>
            </tr>
          </thead>
          <tbody>
            {Getsites.map((back) => {
              return (
                <tr>
                  <td>
                    {" "}
                    <span
                      data-toggle="tooltip"
                      data-placement="top"
                      title={back.title}
                    >
                      {back.title}{" "}
                    </span>
                  </td>
                  <td>
                    <span>
                      {format(
                        new Date(back.date_creation),
                        "yyyy/MM/dd kk:mm:ss"
                      )}
                    </span>
                  </td>
                  <td>
                    <div className="d-flex justify-content-between"></div>
                    <button
                      className="btn  btn-rounded btn btn-outline-secondary redirectionAction "
                      placeholder="Restaurer"
                      onClick={(e) => [
                        handleRes(back),
                        handleSingleBackup(back),
                      ]}
                    >
                      <i
                        class="fa-solid fa-clock-rotate-left"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Restaurer"
                      ></i>
                    </button>
                    <button
                      className="btn  btn-rounded btn btn-outline-secondary redirectionAction delete "
                      onClick={(e) => [
                        handleDeteteShow(back),
                        handleSingleDelete(back),
                      ]}
                    >
                      <i
                        class="fa-solid fa-trash"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Supprimer"
                      ></i>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div> </div> </div>
      <Modal
        show={Detete}
        onHide={handleCloseDetete}
        backdrop="static"
        keyboard={false}
        size="lg"
        className="modalRestauration"
        id="delateBackup"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className="add_page_modal_header">
        <Modal.Title>
          <div className="titre_popup_page">
            <div className="modal_header_add_page ">
              <div className="titre_popup_add_page">
                Supprimer la version enregistrée
              </div>

              
            </div>
          </div>
          </Modal.Title>
          <div className="btns-action">
            <button
              type="button"
              className="btn-closes"
              aria-label="Close"
              onClick={handleCloseDetete}
            >
              {" "}
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="add_page_modal_content d-flex justify-content-center  bg-white">
            <div className="addPageOptions">
              <div>
                <span className="d-block mb-2">
                  Êtes-vous sûr de vouloir supprimer cette version du site ?
                  <b>{deletedSingleRes.title} ?</b>
                </span>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-rounded  btn-outline-secondary"
            onClick={(e) => handleCloseDetete(false)}
          >
            Annuler
          </button>
          <button
            className="btn  btn-rounded btn btn-outline-secondary delete"
            onClick={(e) => [
              handleCloseDetete(false),
              BackupDelete(deletedSingleRes),
            ]}
          >
            Supprimer la version du site
          </button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={show}
        onHide={handleCloseRestauration}
        backdrop="static"
        keyboard={false}
        size="lg"
        className="modalRestauration"
        id="addPageModal"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className="add_page_modal_header">
          <div className="titre_popup_page">
            <div className="modal_header_add_page ">
              <div className="titre_popup_add_page">
                Restore la version du site{" "}
              </div>

              <i
                className="fa-solid fa-xmark closeSideBar"
                onClick={handleCloseRestauration}
              ></i>
            </div>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="add_page_modal_content d-flex justify-content-center  bg-white">
            <div className="addPageOptions">
              <div className="add_Page_Options_title ">
                Suprimer la redirection
              </div>
              <div>
                <span className="d-block mb-2">
                  Voulez-vous vraiment restaure <b>{backSingleRes.title} ?</b>
                </span>
                <span className="d-block mb-2 font-weight-bold">
                  {" "}
                  Remarque :
                </span>
                <span className="d-block">
                  La version en ligne de ce site ne sera modifiée que lorsque
                  vous republierez la version restaurée. - En restaurant cette
                  version, vous rétablirez certains anciens paramètres du site
                  comme les paramètres SEO, les scripts, les définitions de
                  synchronisation et d'autres éléments.{" "}
                </span>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-rounded  btn-outline-secondary"
            onClick={(e) => handleCloseRestauration(false)}
          >
            Annuler
          </button>
          <button
            className="btn  btn-rounded btn btn-outline-secondary restaurer"
            onClick={(e) => [
              handleCloseRestauration(false),
              Restauration(backSingleRes),
            ]}
          >
            Restaurer
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
