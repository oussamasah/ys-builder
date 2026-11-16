import React, { useEffect, useState } from "react";
import Topbars from "../../Topbars/Topbars";
import "./Autorisation.css";

import AddRole from "./AddRole/AddRole";

import ListRole from "./ListRole/ListRole";
import AddMembre from "./AddMembre/AddMembre";
import EditRole from "./ListRole/EditRole/EditRole";
import EditUser from "./ListRole/EditUser/EditUser";
import SearshUser from "./ListRole/SearshUser/SearshUser";
import axios from "axios";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
export default function Autorisation() { 
  const storeUser = useSelector((state) => state.user.value);

  const [searchResults, setSearchResults] = useState([]);
  const changeView = async (value, data) => {
    if (value === "ListRole") {
      setTeamView(<ListRole changeView={changeView} />);
    } else if (value === "EditRole") {
      setTeamView(<EditRole changeView={changeView} role={data} />);
    } else if (value === "EditUser") {
      setTeamView(<EditUser changeView={changeView} teamItem={data} />);
    } else if (value === "SearshUser") {
      // Call the API to get search results
      try {


        // const Results = response.data.data;

        // Pass both the search term and search results to SearshUser
        setTeamView(
          <SearshUser
            changeView={changeView}
            searchInput={data}
            // searchResults={Results}
          />
        );

        // setSearchResults(searchResults); // Update searchResults state in Autorisation
      } catch (error) {
        // Handle error
        console.error("Error fetching search results:", error);
      }
    } else if (value === "AddMembre") {
      setTeamView(<AddMembre changeView={changeView} />);
    } else {
      setTeamView(<AddRole changeView={changeView} />);
    }
  };

  const [teamView, setTeamView] = useState(
    <ListRole changeView={changeView} />
  );

  const restInput = () => {
    setSearchResults("");
    setTeamView(<ListRole changeView={changeView} />);
  };
  const handleInputChange = (event) => {
    setSearchResults(event.target.value);
  };
  const SearchtUser = async () => {
    changeView("SearshUser", searchResults); // Passez les résultats de la recherche
    await axios
      .post(
        process.env.REACT_APP_API_URL +
          "/users/filter/" +
          storeUser.user.CompteSchema._id,
        {
          search: searchResults,
        }
      )
      .then((response) => {
        setSearchResults(searchResults); // Mettez à jour les résultats de la recherche
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
  useEffect(() => {}, [teamView]);
  return (
    <>
      {" "}
      <Topbars />
      <div className="container">
        <div id="Autorisation" className="row">
          <div className="col-md-8">
            <div className="title-liste-site">
              <span> Autorisation d'équipe</span>
              <p>
                Contrôlez le niveau d'accès à la plateforme dont disposent les
                membres de votre équipe en définissant leurs autorisations ici.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="input-group mt-3 serash-sites">
              <input
                type="text"
                value={searchResults}
                className="form-control"
                placeholder="Recherche un  membre"
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
                  onClick={() => SearchtUser(searchResults)}
                >
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>
              </div>
            </div>
          </div>
          <div className="title-liste-site mt-4">
            <span>
              {" "}
              <i className="fa-solid fa-user"></i>Equipe
            </span>
          </div>

          <div className="col-md-12">{teamView}</div>
        </div>
      </div>
    </>
  );
}


