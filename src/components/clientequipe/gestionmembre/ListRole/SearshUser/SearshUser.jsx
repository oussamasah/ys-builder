import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { Modal } from "react-bootstrap";
import { useEffect } from "react";
import "./SearshUser.css";
export default function SearshUser(props) {
  const storeUser = useSelector((state) => state.user.value);

  const [show, setShow] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const handleClose = () => setShow(false);
  const [getrecherche, setGetRecherche] = useState([]);

  const EditUser = async (value) => {
    props.changeView("EditUser", value);
  };

  const supModal = (item) => {
    //   console.log(item);
    setDeleteId(item._id);
    setShow(true);
  };

  const deleteTeamItem = async () => {
    await axios
      .delete(process.env.REACT_APP_API_URL + "/users/delete/" + deleteId) // This line needs to be corrected
      .then((response) => {
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
        filter(props.searchInput);
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

  const filter = (search) => {
    axios
      .post(
        process.env.REACT_APP_API_URL +
          "/users/filter/" +
          storeUser.user.CompteSchema._id,
        {
          search: search,
        }
      )
      .then((response) => {
        setGetRecherche(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    filter(props.searchInput);
  }, [props.searchInput]);

  return (
    <div>
     {getrecherche.length === 0 ?<b style={{textAlign:"center"}}>Aucun résultat trouvé</b>:  <div className="alluser">
        {getrecherche.map((result) => (
          <div className="w-75 p-2 mx-auto" id="searchlist" key={result._id}>
            
            <div className="d-flex justify-content-between align-items-center">
              {result.RoleSchema && (
                <>
                  <div
                    className="iconteams"
                    style={{ background: result.RoleSchema.color }}
                  >
                    <i className="fa-solid fa-user-tie"></i>
                  </div>
                </>
              )}
              <span> {result.nom}</span>
              <span> {result.prenom}</span>
              <span> {result.email}</span>
              {result.RoleSchema && <b>{result.RoleSchema.name}</b>}

              <div className="actionteam">
                <i
                  className="fa-solid fa-pen cursor p-2"
                  onClick={(e) => {
                    EditUser(result);
                  }}
                ></i>
                <i
                  className="fa-solid fa-xmark  cursor p-2"
                  onClick={() => supModal(result)}
                ></i>
              </div>
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
                      Supprimer le site
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
                      Voulez-vous vraiment supprimer cette utilisateur
                      <b>
                        {" "}
                        {result.nom} {result.prenom}?{" "}
                      </b>
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
        ))}
      </div>}
    
    </div>
  );
}
