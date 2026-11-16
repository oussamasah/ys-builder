import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import iconClose from "../../../../assets/imgEditorSidebar/iconClose.png";
import { Button, Modal } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";
import "./GererCategorie.css";
import { v4 as uuidv4 } from "uuid";
import EditInfoCats from "./EditInfoCats/EditInfoCats";
import axios from "axios";
import { useParams } from "react-router-dom";
// import moment from "moment/moment";
import GererPosts from "../GererPosts/GererPosts";
export default function GererCategorie(props) {
  const [search, setSearch] = useState("");
  const getEditor = () => {
    return props.editor();
  };
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [Category, setCategory] = useState({
    name: "",
    url: "",
    SiteSchema: "",
  });
  let { siteId, pageId } = useParams();
  const [CategorieList, setCategorieList] = useState([]);
  const txtTolink = (txt) => {
    return txt
      .replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, "")
      .replace(/\é/g, "e")
      .replace(/\è/g, "e")
      .replace(/\ê/g, "e")
      .replace(/\ë/g, "e")
      .replace(/\à/g, "a")
      .replace(/\â/g, "a")
      .replace(/\ä/g, "a")
      .replace(/\û/g, "u")
      .replace(/\ü/g, "u")

      .replace(/\s/g, "-")
      .toLowerCase();
  };
  const restInput = () => {
    setSearch("");
    getCategories()
  };
  const handleSearchChange = async (event) => {
    const searchTerm = event.target.value; // Get the value from the input field
    setSearch(searchTerm); // Update the search state with the new value
    Category.SiteSchema = siteId;
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/blogcategories/filtercategory/${Category.SiteSchema}`,
        {
          search: searchTerm, // Send the search term to the server
        }
      );
      setCategorieList(response.data.data);
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
      toast.error(
        error.response.data.message || error.message,
        {
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
        }
      );
    }
  }
  const AddBloksCat = async (e) => {
    toast.loading("Opération est en cours...");

    Category.SiteSchema = siteId;
    await axios
      .post(process.env.REACT_APP_API_URL + "/blogcategories/create", Category)
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
        setCategory({ name: "", url: "", SiteSchema: "" });

        getCategories();
        setShowAdd(false)
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
  const EditInfoModal = (item) => {
    setCategory(item);
    setShowEdit(true);
  };
  const EditBloksCat = async (e) => {
    toast.loading("Opération est en cours...");

    await axios
      .post(
        process.env.REACT_APP_API_URL +
          "/blogcategories/update/" +
          Category._id,
        Category
      )
      .then((response) => {
        props.editor().render()
        let content = props.editor().getWrapper();
        console.log("content--------------",content)
        content.view.render();
        toast.success(response.data.message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
        });
        getCategories();
        setShowEdit(false)
     
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
  const DeleteBloksCat = async (e) => {
    toast.loading("Opération est en cours...");

    await axios
      .delete(process.env.REACT_APP_API_URL + "/blogcategories/delete/" + e)
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
        setDeleteCat(false);
        getCategories();
        let content = props.editor().getWrapper();
        content.view.render();
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

  const getCategories = async (e) => {
    await axios
      .get(
        process.env.REACT_APP_API_URL + "/blogcategories/getbysite/" + siteId
      )
      .then((response) => {
        //console.log(response.data.data);
        setCategorieList(response.data.data);
        let content = props.editor().getWrapper();
        content.view.render();        
        toast.dismiss();
        toast.success(response.data.message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
        });
        // getSites();
        // setshowEdit(false);
      })
      .catch((error) => {

        toast.dismiss();
        
      });
  };

  const handleCloseEdit = () => setShowEdit(false);
  const handleCloseAdd = () => setShowAdd(false);
  const handleCloseDetele = () => setDeleteCat(false);

  const [deletecat, setDeleteCat] = useState(false);

  const [editedItem, setEditedItem] = useState("");

  const getPosts = () => {};

  const DublicateBlog = async (item) => {
    toast.loading("Opération est en cours...");

    delete item["_id"];
    item["url"] += "-"+uuidv4();
    await axios
      .post(process.env.REACT_APP_API_URL + "/blogcategories/create", item)
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
        setCategory({ name: "", url: "", SiteSchema: "" });

        getCategories();
        let content = props.editor().getWrapper();
        content.view.render();
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
  const formatDate = (dateString) => {
    const dateObject = new Date(dateString);
    return `${dateObject.getDate()}/${
      dateObject.getMonth() + 1
    }/${dateObject.getFullYear()}`;
  };
  const DeleteBlog = (item) => {
    setEditedItem(item);
    setDeleteCat(true);
  };

  useEffect(() => {
    getCategories();
  }, []);



  return (
    <div id="GererCategoerie">
      <div className="d-flex  justify-content-between mb-3">
        <div className="SectionAdd">
          <button
            type="button"
            className="btnblogs width-100 "
            onClick={(e) => setShowAdd(true)}
          >
            Nouvelle page d'articles
          </button>
        </div>

        <div className="input-group serash-document">
        <input
      type="text"
      value={search}
      onChange={handleSearchChange}
      placeholder="Recherche catégorie..."
      className="form-control"
    />
          <button
         onClick={restInput}
            className="iclosed"
            type="reset"
          >
            &times;
          </button>
        </div>
      </div>

      <table class="table table  w-100">
        <thead>
          <tr>
            <th style={{ width: "25%" }}>Nom catégorie </th>
            <th style={{ width: "25%" }}>url catégorie</th>
            <th style={{ width: "20%" }}>Date creation </th>
            {/* <th style={{width:"10%"}}>Meta Seo </th> */}
            <th style={{ width: "20%" }}>Actions </th>
          </tr>
        </thead>
        <tbody>
          {CategorieList.map((item, index) => (
            <tr key={index}>
              <td style={{ width: "25%" }}>{item.name}</td>
              <td style={{ width: "25%" }}>{item.url}</td>
              <td style={{ width: "20%" }}>
                {" "}
                {formatDate(item.date_creation)}
              </td>
              {/* <td  style={{width:"10%"}}
                className={
                  item.meta_title === "" && item.meta_description === ""
                    ? "text-danger"
                    : item.meta_title === "" && item.meta_description !== ""
                      ? "text-warning"
                      : item.meta_title !== "" && item.meta_description === ""
                        ? "text-warning"
                        : "text-success"
                }
              >
                <span className="meta">Seo</span>
              </td> */}
              <td style={{ width: "20%" }}>
                <div class="btnactions">
                  <button
                    onClick={() => EditInfoModal(item)}
                    title="Edit informaion catégorie"
                  >
                    <i class="fa-solid fa-gear"></i>
                  </button>

                  <button
                    onClick={(e) =>
                      props.changeView(
                        <GererPosts changeView={props.changeView} data={item} editor={getEditor} />
                      )
                    }
                    title="Voir les articles"
                  >
                    <i class="far fa-newspaper"></i>
                  </button>
                  <button
                    onClick={(e) => DeleteBlog(item)}
                    title="Supprimer catégorie"
                  >
                    <i class="fa-solid fa-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        show={showAdd}
        onHide={(e) => setShowAdd(true)}
        backdrop="static"
        keyboard={false}
        className="modalAdd"
        size="md"
        id="addPageModal"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <div className="w-100 text-light d-flex justify-content-between align-items-center">
            <div>Ajoutez une catégorie</div>

            <i
              className="fa-solid fa-xmark closeSideBar"
              onClick={(e) => {
                handleCloseAdd();
              }}
            ></i>
          </div>
        </Modal.Header>
        <Modal.Body className="p-3">
          <div className="form-group m-form__group group_text  mb-3">
          <label htmlFor="titre">Titre :</label>

            <input
              required
              type="text"
              className="form-control namePage"
              id="titre"
              aria-describedby="textHelp"
              placeholder="Titre du catégorie"
              value={Category.name}
              onChange={(e) => [
                setCategory({ ...Category, name: e.target.value ,    url:"/" + txtTolink(e.target.value)}),
              ]}
            />
          </div>
          <div className="form-group m-form__group group_text  mb-3">
            <label htmlFor="url">Url :</label>
            <input
              required
              type="text"
              className="form-control namePage"
              id="url"
              aria-describedby="textHelp"
              placeholder="Identifiant du catégorie"
              value={Category.url}
              onChange={(e) => {
                setCategory({
                  ...Category,
                  url:  "/" +txtTolink(e.target.value.replace("blog","")),
                });
              }}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="modal-footer btnFooter text-center d-block">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={(e) => [
                setCategory({
                  name: "",
                  url: "",
                  SiteSchema: "",
                }),
                setShowAdd(false),
              ]}
            >
              Annuler
            </button>
            <button
              type="button"
              className="btn btn-primary"
              data-bs-dismiss="modal"
              onClick={(e) => AddBloksCat()}
            >
              {" "}
              Creér
            </button>
          </div>
        </Modal.Footer>
      </Modal>
      <Modal
        show={showEdit}
        onHide={(e) => setShowEdit(false)}
        backdrop="true"
        keyboard={false}
        className="modalAdd"
        size="md"
        id="addPageModal"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <div className="w-100 text-light d-flex justify-content-between align-items-center">
            <div>Editez cette categorie</div>

            <i
              className="fa-solid fa-xmark closeSideBar"
              onClick={(e) => {
                handleCloseEdit();
              }}
            ></i>
          </div>
        </Modal.Header>
        <Modal.Body className="p-3">
          <div className="form-group m-form__group group_text  mb-3">
            <input
              required
              type="text"
              className="form-control namePage"
              id="exampleInputPage"
              aria-describedby="textHelp"
              placeholder="Titre du catégorie"
              value={Category.name}
              onChange={(e) => [
                setCategory({ ...Category, name: e.target.value }),
              ]}
            />
          </div>
          <div className="form-group m-form__group group_text  mb-3">
            <input
              required
              type="text"
              className="form-control namePage"
              id="exampleInputPage"
              aria-describedby="textHelp"
              placeholder="Identifiant du catégorie"
              value={Category.url}
              onChange={(e) => {
                setCategory({
                  ...Category,
                  url: "/" + txtTolink(e.target.value),
                });
              }}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="modal-footer btnFooter text-center d-block">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={(e) => [
                setCategory({
                  name: "",
                  url: "",
                  SiteSchema: "",
                }),
                setShowEdit(false),
              ]}
            >
              Annuler
            </button>
            <button
              type="button"
              className="btn btn-primary"
              data-bs-dismiss="modal"
              onClick={(e) => EditBloksCat()}
            >
              Editer
            </button>
          </div>
        </Modal.Footer>
      </Modal>
      <Toaster />

      <Modal
        show={deletecat}
        onHide={handleCloseDetele}
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
              <div className="titre_popup_add_page"> Supprimer categorie</div>

              <i
                className="fa-solid fa-xmark closeSideBar"
                onClick={(e) => {
                  handleCloseDetele();
                }}
              ></i>
            </div>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="add_page_modal_content ">
            <div className="addPageOptions">
              <div className="add_Page_Options_title">
                Vous êtes sur de supprimer cette Catégorie{" "}
                <b>{editedItem.name}</b> <br></br>
                Cette action supprime tous les articles attachés du cette
                catégorie
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-rounded  btn-outline-secondary"
            onClick={(e) => {
              handleCloseDetele();
            }}
          >
            Non
          </button>
          <button
            className="btn  btn-rounded btn btn-outline-secondary delete"
            onClick={(e) => {
              DeleteBloksCat(editedItem._id);
            }}
          >
            Oui
          </button>
        </Modal.Footer>
      </Modal>
    
    </div>
  );
}
