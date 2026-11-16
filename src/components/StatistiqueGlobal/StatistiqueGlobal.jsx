import React, { useEffect, useState } from "react";
import "./StatistiqueGlobal.css";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import imgSite from "../../assets/imgSites/imgSite.svg";
import { setcurrentSite, removecurrentSite } from "../../redux/features/site";
import { setStyleElement } from "../../redux/features/editor";
import Etat from "../../assets/imgSites/Etat.svg";
import iconOption from "../../assets/imgSites/iconOption.svg";
import axios from "axios";
import Visite from "./Visite/Visite";
export default function StatistiqueGlobal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const storeUser = useSelector((state) => state.user.value);
  const storeSite = useSelector((state) => state.site.value?.site);
  const [currentPage, setCurrentPage] = useState(1);
  const [client, setClient] = useState([]);
  const [recordsPerPage] = useState(10);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const nPages = Math.ceil(client.length / recordsPerPage);
  const [sites, setSites] = useState([]);
 
  const [search, setSearch] = useState('');
  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const [dataInretour, setDataInretour] = useState([{
    date:'19/05/2023',name:'tes',prename:'ted',email:'testt@gmail.com',msg:'TEST',num:'01 80 86 48 62'
  }]);
  const downloadFile = ({ data, fileName, fileType }) => {
    // const blob = new Blob([data], { type: fileType })
  
    // const a = document.createElement('a')
    // a.download = fileName
    // a.href = window.URL.createObjectURL(blob)
    // const clickEvt = new MouseEvent('click', {
    //   view: window,
    //   bubbles: true,
    //   cancelable: true,
    // })
    // a.dispatchEvent(clickEvt)
    // a.remove()
  }
  
  const exportToCsv = e => {
    e.preventDefault()
  
    // Headers for each column
    let headers = ['Submission date,Nom,Prénom,E-mail','Message','Numéro de téléphone']
  
    // Convert users data to a csv
    let usersCsv = dataInretour.reduce((acc, user) => {
      const { date, name, prename, email,msg,num } = user
      acc.push([date, name, prename, email,msg,num].join(','))
      return acc
    }, [])
  
    downloadFile({
      data: [...headers, ...usersCsv].join('\n'),
      fileName: 'reponse.csv',
      fileType: 'text/csv',
    })
  }
  const CloseTab = () =>{
    navigate('/sites');
  }



  const editSite = async (item) => {

    await axios
      .get(process.env.REACT_APP_API_URL + "/sites/get/" + sites[0]._id)
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
  }
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


 
  const previewSite = async () => {
    navigate("../previewclient/" +  sites[0]._id);
  };

  const restInput = () => {
    setSearch("");
    setSites(['']);

  };
  
useEffect(() => {
  restInput()
}, []);
useEffect(() => {}, [sites]);

  return (
    <div className="d-flex align-items-start" id="statsGlobal">
        
      <div className="Statistique  d-flex align-items-start">
        
        <div
          className="nav flex-column nav-pills"
          id="v-pills-tab"
          role="tablist"
          aria-orientation="vertical"
        >
          <button
            className="nav-link  EditorWidgets active"
            id="v-pills-apercu-tab"
            data-bs-toggle="pill"
            data-bs-target="#v-pills-apercu"
            type="button"
            role="tab"
            aria-controls="v-pills-apercu"
            aria-selected="true"
          >
            <span className="Apercu"></span>
            <span>Aperçu</span>
          </button>
          <button
            className="nav-link EditorWidgets"
            id="v-pills-stats-tab"
            data-bs-toggle="pill"
            data-bs-target="#v-pills-stats"
            type="button"
            role="tab"
            aria-controls="v-pills-stats"
            aria-selected="false"
          >
            <span className="Stats"></span>
            <span>Stats</span>
          </button>
          <button
            className="nav-link EditorWidgets"
            id="v-pills-reponse-tab"
            data-bs-toggle="pill"
            data-bs-target="#v-pills-reponse"
            type="button"
            role="tab"
            aria-controls="v-pills-reponse"
            aria-selected="false"
          >
            <span className="Reponse"></span>
            <span> Réponses formulaire</span>
          </button>
          <button
            className="nav-link EditorWidgets"
            id="v-pills-client-tab"
            data-bs-toggle="pill"
            data-bs-target="#v-pills-client"
            type="button"
            role="tab"
            aria-controls="v-pills-client"
            aria-selected="false"
          >
            <span className="Reponse"></span>
            <span> Client</span>
          </button>
        </div>
      </div>

      <div className="tab-content container" id="v-pills-tabContent">
        
        <div
          // className="tab-pane fade show p-3 active"
          id="v-pills-apercu"
          role="tabpanel"
          aria-labelledby="v-pills-apercu-tab"
          tabindex="0"
        >
           <div className="row">
            <div className="col-md-6">
            <div className="closeRetour " onClick={(e) => CloseTab()}>
            <i className="fa fa-chevron-right" aria-hidden="true"></i>
            <span>Retours</span>
          </div>
          </div>
          <div className="col-md-6 mt-4">
          <div className="input-group mb-3 serash-sites">
              <input
                type="text"
                value={search}
                className="form-control"
                placeholder="Rechercher par  site ou par  client"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                onChange={handleSearch}
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
          </div>
          <span className="titreStat   mt-3 mb-3">
            Site aperçu <i className="fa-solid fa-question"></i>{" "}
          </span>
       
          <div className="listeStat">
          {sites.map(site=>{       
            return(<div  className="encartStat infogeneral d-flex">
          {search==""?<span className="text-center">Aucun statistique</span>:
          <>
          <div className=" client ">
              {site.screenshot != "" ? (
                <img src={site.screenshot} className="img" />
              ) : (
                <img src={imgSite} className="img" />
              )}
            </div>
            <div className="infos">
              <span className="clients mb-3">
                <b>Url :</b>{" "}
                {site.etat == "Actif" ? (
                  <a
                    href={site.domaine}
                    title={site.domaine}
                    target="_blanc"
                    className="text-decoration-none mb-3"
                  >
                    <b>{site.domaine}</b>
                  </a>
                ) : (
                  <a
                    href={
                      process.env.REACT_APP_MEDIA_URL +
                      "site/" +
                      (storeSite ? storeSite._id : "")
                    }
                    title={site._id}
                    target="_blanc"
                    className="text-decoration-none "
                  >
                    <b>{site._id}</b>
                  </a>
                )}
                <span className="name mb-3">  <b>Nom :</b> {site.nom}</span>
                {site.etat == "Actif" ? (
                  <>
                    <span className="d-block">
                      {" "}
                      <b>Date de créaction :</b>{" "}
                      {new Date(site.date_creation).toLocaleDateString()}
                    </span>
                    <span className="d-block">
                      {" "}
                      <b>Date de publication :</b>{" "}
                      {new Date(site.date_creation).toLocaleDateString()}
                    </span>
                  </>
                ) : (
                  <span className="d-block">
                    {" "}
                    <b>Date de créaction :</b>{" "}
                    {new Date(site.date_creation).toLocaleDateString()}{" "}
                  </span>
                )}
              </span>
              <div className="d-flex clients mb-3">
                <span className="fw-bold">
                  <b>Etat :</b>
                </span>
                <span
                  className={
                    site.etat == "Démo"
                      ? "type eteSite demo"
                      : site.etat == "Actif"
                      ? "type eteSite actif"
                      : site.etat == "suspendu"
                      ? "type eteSite suspendu"
                      : "type eteSite inactif"
                  }
                >
                  {site.etat}
                </span>
              </div>
              <div className="d-flex clients">
                <button
                  type="button"
                  className="btn btn-primary stats me-2"
                  onClick={(e) => editSite(e)}
                >
                  {" "}
                  <i className="fa-regular fa-pen-to-square me-2"></i> Edit site
                </button>
                <button
                  type="button"
                  className="btn btn-primary stats me-2"
                  onClick={(e) => previewSite(e)}
                >
                  {" "}
                  <i className="fa-regular fa-solid fa-play me-2"></i> Preview site
                </button>
              </div>
            </div>
         
          <div className="logoClient">
            {site.logo!='' ?<img src={site.logo} alt={site.nom}/> :<span> pas de  logo</span> } 
          </div>
          </>
          }
        </div>)
           
          })}
         </div>
        </div>
        <div
          className="tab-pane fade p-3"
          id="v-pills-stats"
          role="tabpanel"
          aria-labelledby="v-pills-stats-tab"
          tabindex="0"
        >
            
          <span className="titreStat">
            Statistique <i className="fa-solid fa-question"></i>{" "}
          </span>
          <div class="listeStatChart">
          {sites.map(site=>{
         return(  <div className="encartStat d-block">
             {search==""?<span>Aucun statistique</span>:
          <>
          <nav id="statistique">
            <div className="nav nav-tabs" id="nav-tab" role="tablist">
              <button
                className="nav-link active"
                id="nav-visits-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-visits"
                type="button"
                role="tab"
                aria-controls="nav-visits"
                aria-selected="true"
              >
              Site Visits
              </button>
              <button
                className="nav-link"
                id="nav-profile-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-profile"
                type="button"
                role="tab"
                aria-controls="nav-profile"
                aria-selected="false"
              >
                Engagement  
              </button>
            </div>
          </nav>
          <div className="tab-content" id="nav-tabContent">
            <div
              className="tab-pane fade show active"
              id="nav-visits"
              role="tabpanel"
              aria-labelledby="nav-visits-tab"
              tabindex="0"
            >
          <div className="Visite">
              <Visite  sites={site}/>
            </div>
            </div>
            <div
              className="tab-pane fade"
              id="nav-profile"
              role="tabpanel"
              aria-labelledby="nav-profile-tab"
              tabindex="0"
            >
            <div className="Engagement">
              <div className="row">
              <div className="col-4 bor">
              <div className="d-flex justify-content-center align-items-center">
               <i className="fa-solid fa-phone  me-4"></i>
               <span className="count">0</span>
               </div>
               <span className="titlecount">Nombre de click tel</span>

              </div>
              <div className="col-4 bor">
              <div className="d-flex justify-content-center align-items-center">
              <i className="fa-solid fa-arrow-up-right-from-square  me-4"></i>
              <span className="count">0</span>
              </div>
              <span className="titlecount"> Soumission du formulaire</span>
              </div>
              <div className="col-4 bor">
              <div className="d-flex justify-content-center align-items-center">
              <i className="fa-solid fa-envelope  me-4"></i>
             
              <span className="count">0</span>
              </div>
              <span className="titlecount">Nombre de click mail</span>
        
              </div>
              </div>
            </div>
            </div>
          </div>
          </>
          }
          </div>)
           
          })}
        </div>
        </div>
        <div
          className="tab-pane fade p-3"
          id="v-pills-reponse"
          role="tabpanel"
          aria-labelledby="v-pills-reponse-tab"
          tabindex="0"
        >
       
          <div className='actionBtns d-flex align-items-center justify-content-between'>
         <div>
          <span className="titreStat mb-2 justif">
            {" "}
            Réponses formulaire Contactez-nous{" "}
            <i className="fa-solid fa-question"></i>
          </span>
          </div>
          <div>  
        <button type='button' onClick={exportToCsv} >
        <i class="fa-solid fa-download"></i>  Export to CSV
        </button>
        </div> 
      </div>
      <div class="listeStatChart">
          {sites.map(site=>{
          return( <div className="encartStat d-block">
             {search==""?<span>Aucun statistique</span>:
          <>
          <table className="table table-bordered ">
            <thead>
              <tr>
                <th>Submission date </th>
                <th>Nom</th>
                <th>Prénom</th>
                <th>E-mail</th>
                <th>Message</th>
                <th>Numéro de téléphone</th>
              </tr>
            </thead>
            <tbody>
          {dataInretour.map((item, index) => {
                  return (
              <tr key={index}>
                <td>{item.date}</td>
                <td>{item.name}</td>
                <td>{item.prename}</td>
                <td>{item.email}</td>
                <td>{item.msg}</td>
                <td>{item.num}</td>
              </tr>
          );
          })
        }
            </tbody>
          </table>
          </>}
          </div>)
            })}
        </div>
        </div>


        <div
          className="tab-pane fade p-3"
          id="v-pills-client"
          role="tabpanel"
          aria-labelledby="v-pills-client-tab"
          tabindex="0"
        >
       
          <div className='actionBtns d-flex align-items-center justify-content-between'>
         <div>
          <span className="titreStat mb-2 justif">
            {" "}
           Clients
            <i className="fa-solid fa-question"></i>
          </span>
          </div>
          <div>  
        <button type='button' onClick={exportToCsv} >
        <i class="fa-solid fa-download"></i>  Export to CSV
        </button>
        </div> 
      </div>
      <table className="table table-borderless tablesite">
          <thead>
            <tr>
              <th scope="col" className="Actions">
                <span>COORDONNÉES</span>
              </th>
              <th scope="col" className="Actions">
                <span>SITE</span>
              </th>

              <th scope="col" className="Actions">
                <span>AUTORISATIONS</span>
              </th>

              <th scope="col" className="Etat" colSpan={3}>
                <span>
                  {" "}
                  ETAT
                  <img src={Etat} className="Etatimg" alt="Edit" />
                </span>
              </th>

              <th scope="col" className="Etat">
                {" "}
              </th>
            </tr>
          </thead>

          <tbody>
            {client.length > 0 ? (
              client
                .slice(indexOfFirstRecord, indexOfLastRecord)

                .map((item, index) => {
                  return (
                    <tr key={index} className="solid">
                      {/* <td>{item._id}</td> */}
                      <td className="tableNameSite">
                        <div className="client ">
                        <div className="iconNom">
                        {item.nom.charAt(0)} {item.prenom.charAt(0)}
                        </div>
                          <span className="clients cursor">
                          <span 
                          // onClick={() => Voir(item)}
                          >
                          <b>{item.nom} </b>
                              </span>
                         

                            <Toaster />
                            <span className="name"> {item.email}</span>
                          </span>
                        </div>
                      </td>

                      <td ><span className="clients"> SITE</span></td>
                      <td className="clients"> <span className="clients">AUTORISATIONS</span></td>
                      <td>
                        <div
                          className={
                            item.etat == "Démo"
                              ? "eteClient demo"
                              : item.etat == "Actif"
                              ? "eteClient actif"
                              : item.etat == "suspendu"
                              ? "eteClient suspendu"
                              : "eteClient inactif"
                          }
                        >
                          <span className="type"> Invité</span>
                        </div>
                      </td>
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
                            <li className=" d-flex align-items-center">
                            <i className="fa-solid fa-key"></i>

                              <span 
                              // onClick={() => Voir(item)}
                              >
                                Sites et autorisations
                              </span>
                            </li>
                            <li className="redd d-flex align-items-center">
                              <i className="fal fa-trash-alt"></i>

                              <span 
                              // onClick={() => supModal(item)}
                              >
                                Supprimer client
                              </span>
                            </li>
                          </ul>
                        </div>
                      </td>
                    </tr>
                  );
                })
            ) : (
              <tr>
                <td colSpan="4">Aucun client disponible</td>
              </tr>
            )}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}
