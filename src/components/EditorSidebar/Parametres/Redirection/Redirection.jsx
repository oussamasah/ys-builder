import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { Button, Modal } from "react-bootstrap";
import { useParams } from "react-router-dom";
import "./Redirection.css";
import { v4 as uuidv4 } from "uuid";
import Select from "react-select";

export default function Redirection(props) {
  let { siteId } = useParams();

  const [redirections, setRedirections] = useState([]);
  const [pages, setPages] = useState([]);
  const [selectedPage, setSelectedPage] = useState("");
  const [destination, setDestination] = useState("");
  const [redirectionPage, setRedirectionPage] = useState({
    source: "",
    destination: "",
    type: "301",
  });
  const [showDelete, setShowDelete] = useState(false);
  const handleClose = () => setShowDelete(false);
  const [deletedredirection, setDeletedRedirection] = useState(false);
  const [isValid, setValid] = useState(false);
  const [selectedOption, setSelectedOption] = useState('option1');
  const handleDelete = async (node) => {
    await axios
    .delete(process.env.REACT_APP_API_URL + "/redirections/" + node._id)
    .then((response) => {
      toast.dismiss();
      toast.success(response.data.message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setRedirections(response.data.data);
      updatePlesk()
    })
    .catch((error) => {
      toast.dismiss();
      toast.error(error.response.data.message);
    });
  };

  const [ShowRedirection, setShowRedirection] = useState(false);
  const handleRedurectionShow = () => setShowRedirection(true);
  const handleRedurectionhide = () => setShowRedirection(false);

  const RedirectionUrl = async () => {
   let sources =  redirections.map((r)=>{return r.source})
     if(sources.includes(redirectionPage.source)){
      toast.dismiss();
      toast.error("Url source est déja exist");
     }else{
      await axios
      .post(process.env.REACT_APP_API_URL + "/redirections/create/" + siteId, redirectionPage)
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
        getRedirections()
        updatePlesk()
        
      })
      .catch((err) => {
        toast.dismiss();
        toast.error(err.response.data.message);
      });
     }
     
  };


  const updatePlesk = async ()=>{
   let redirect =  await axios
      .get(process.env.REACT_APP_API_URL + "/redirections/get/" + siteId);
    let response = await axios.get(process.env.REACT_APP_API_URL +"/sites/get/"+siteId);
        let f = new FormData();
        f.append("redirections",JSON.stringify(redirect.data.data))
        f.append("domain",response.data.data.site.domaine)
       
        await axios
        .post(process.env.REACT_APP_API_URL + "/redirections/updatePlesk/",f);
  }
  const changeDestination = async (e) => {
    setRedirectionPage({
      ...redirectionPage,
      destination: e,
    });
    setDestination(e)
  }
  const changePage = async (e) => {

    setRedirectionPage({
      ...redirectionPage,
      destination: e,
    });
    setSelectedPage(e)
  }
  const changeOption = async (e) => {
   
    setSelectedOption(e)
if(e =="option1"){
  setRedirectionPage({
    ...redirectionPage,
    destination: selectedPage,
  });
}
if(e =="option2"){
  setRedirectionPage({
    ...redirectionPage,
    destination: destination,
  });
}
  }
  const getPages = async () => {
    await axios
      .get(process.env.REACT_APP_API_URL + "/pages/getlist/" + siteId)
      .then((response) => {
        setPages(response.data.data);
        setSelectedPage(response.data.data[0]);
      })
      .catch((error) => {});
  };
  const getRedirections = async () => {
    await axios
      .get(process.env.REACT_APP_API_URL + "/redirections/get/" + siteId)
      .then((response) => {
        setRedirections(response.data.data);
      })
      .catch((error) => {});
  };

  const hasMediaEffectRun = useRef(false);
  useEffect(() => {
    const fetchData = async () => {
      if (!hasMediaEffectRun.current) {
        hasMediaEffectRun.current = true;
        await getPages();
        await getRedirections();
      }
    };

    fetchData();
  }, [siteId]);
  useEffect(() => {

    let sources = []
    if (redirections.length> 0 ){
       sources = redirections.map((r)=>{return r.source})
    }

  
  
    if (
      redirectionPage.source.length > 0 && !sources.includes(redirectionPage.source) &&
      redirectionPage.destination.length > 0 &&  redirectionPage.source.indexOf("/") == 0) {
      setValid(true);
    } else {
      setValid(false);
    }
  }, [redirectionPage]);
  useEffect(() => {
  }, [ isValid]);
 
  
  return (
    <div id="InfoRedirection">
      <div className="form-group ">
        <span className="test-aide mt-3">
          Veillez à ce que les visiteurs arrivent sur la bonne page de votre
          site et évitez ainsi les chutes dans les classements des moteurs de
          recherche existants. Sont aussi pris en charge les métacaractères, les
          variables, les pages, etc.
        </span>

        <button
          className="btn  btn-rounded btn btn-outline-secondary redirection  mt-3"
          onClick={(e) => handleRedurectionShow()}
        >
         <i class="fa-sharp fa-solid fa-plus"></i>  Ajouter une  redirection
        </button>
      </div>
      <div className={ShowRedirection == true ? "d-none" : "d-block mt-3"}>
        <table class="table  table-sm ">
          <thead>
            <tr>
              <th scope="col">Ancienne Url </th>
              <th scope="col">Url de destination </th>
              <th scope="col">Type de </th>
              <th scope="col">Action </th>
            </tr>
          </thead>
          <tbody>
            {
              redirections.map((r)=>{
                return(
                  <tr>
                  <td>{r.source}</td>
                  <td>{r.destination}</td>
                  <td>{r.type}</td>
                  <td>
                    <div className="d-flex justify-content-between"></div>
                    <button
                      className="btn  btn-rounded btn btn-outline-danger tablebtn "
                      onClick={(e) => handleDelete(r)}>
                      <i class="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
                )
              })
            }

          </tbody>
        </table>
      </div>
      <div className={ShowRedirection == true ? "d-block shows" : "d-none"}>
        {/* <div class="closeRetour " onClick={(e) => handleRedurectionhide()}>
          <i class="fa fa-chevron-right" aria-hidden="true"></i>
          <span>Retours</span>
        </div> */}
    
        <div className="form-group mt-3 ">
       
          <div className="titreSource ">
          <span>URL source</span>
        <button
          className="btn  btn-rounded btn btn-outline-secondary redirection  mt-3"
          onClick={(e) => handleRedurectionhide()}
        >
          <i class="fa fa-chevron-left" aria-hidden="true"></i>  Retours     
        </button>
        </div>
          <input
            type="url"
            value={redirectionPage.source}
            onChange={(e) => 
              setRedirectionPage({
                ...redirectionPage,
                source: e.target.value,
              })
            }
            required
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Saisissez l'URL source de redirection"
          />
        </div>
        <div className="form-group mt-3 ">
        <input
              class="form-check-input"
              type="radio"
              name="destination"
              id="flexRadioDefault1"
              value="option1"
              checked={selectedOption === "option1"}
            onChange={(e) => changeOption(e.target.value)}
            />
          <label className="labelIput">Page de destination</label>

          <div class="form-check  mt-3 ">
      
          <select
              class="form-select mt-1"
              aria-label="Default select example"
              onChange={(e) => {
                changePage(e.target.value)
              }}
            >
 <option  value="" disabled selected>
                  Sélectionez une page
                </option>
              {pages.map((page, i) => (
              
                <option key={i} value={page.url}>
                  {page.title}
                
                </option>
              ))}
            </select>
        
          </div>
          <div className="form-group mt-3 ">
          
            <input
              class="form-check-input"
              type="radio"
              name="redirectionPer"
              id="flexRadioDefault2"
              value="option2"
              checked={selectedOption === "option2"}
            onChange={(e) => changeOption(e.target.value)}
            />
              <label className="labelIput">Destination – URL personnalisée</label>
          </div>
          <div class="form-check   mt-3 ">
      

            <span className="test-aide mb-2" for="flexRadioDefault2">
              Il peut s'agir d'une URL externe ou d'un chemin relatif au sein du
              site (par exemple, /blog/post-1). Si vous utilisez une variable
              ci-dessus, assurez-vous d'utiliser exactement la même ici.
            </span>

            <input
              type="url"
              name="redirectionPer"
              value={(selectedOption == "option2")?destination:""}
              onChange={(e) => changeDestination(e.target.value)}
              required
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="Saisissez l'URL source de redirection"
            />
          </div>
        </div>
        <div class="form-group mt-3 ">
          <label className="mb-3">Type de redirection </label>
          <select
            class="form-select mt-1"
            aria-label="Type de redirection"
            onChange={(e) => {
              setRedirectionPage({ ...redirectionPage, type: e.target.value });
            }}
          >
          <option value="301">
              Redirection 301
              </option>
              <option  value="302">
              Redirection 302
              </option>
          </select>
        </div>

        <div class="form-group mt-3 ">
          <button
            className="btn  btn-rounded btn btn-outline-secondary redirection  mt-3"
       
            onClick={(e) => RedirectionUrl()}
          >
            Valider la  redirection
          </button>
        </div>


        <Modal
        show={showDelete}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
        className="modalDelete"
        id="addPageModal"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className="add_page_modal_header">
          <div className="titre_popup_page">
            <div className="modal_header_add_page ">
              <div className="titre_popup_add_page">Supprimer la redirection</div>

              <i
                className="fa-solid fa-xmark closeSideBar"
                onClick={handleClose}
              ></i>
            </div>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="add_page_modal_content d-flex justify-content-center  bg-white">
            <div className="addPageOptions">
              <div className="add_Page_Options_title">Suprimer la redirection</div>
              <div>
                Voulez-vous vraiment procéder à la
                suppression ?
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-rounded  btn-outline-secondary"
            onClick={(e) => setShowDelete(false)}
          >
            Non
          </button>
          <button
            className="btn  btn-rounded btn btn-outline-secondary delete"
           // onClick={(e) => [setShowDelete(false), SupprimerPage(deletedPage)]}
          >
            Oui
          </button>
        </Modal.Footer>
      </Modal>
      </div>
    </div>
  );
}
