import React from "react";
import "./Topbars.css";
// import { Link } from "react-router-dom";
import logo from "../../assets/imgSites/logoNab.svg";
import iconSite from "../../assets/imgSites/iconSite.png";
import iconClient from "../../assets/imgSites/iconClient.png";
import iconStatistique from "../../assets/imgSites/iconStatistique.png";
import iconProfil from "../../assets/imgSites/iconProfil.svg";
// import iconAide from "../../assets/imgSites/iconAide.svg";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/features/user";
import { Navigate, useNavigate } from "react-router-dom/dist";
import axios from "axios";
import HasPermission from "../../pages/Authentification/AuthGard/HasPermission";

export default function Topbars(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const baseURL = process.env.REACT_APP_API_URL;
  const signout = async () => {
    await axios
      .post(baseURL + "/auth/logout", {
        user: storeUser.user._id,
      })
      .then(async (response) => {
        navigate("/login");
        dispatch(logout());
      });
  };
  const storeUser = useSelector((state) => state.user.value);

  return (
    <div className="topBar ">
      <div className="containers">
        <div className="row ">
          <div className="col-md-4">
            <a href="#" onClick={(e) => navigate("/")} titre="Yellow smith">
              <img src={logo} className="logo tobBar" alt="Yellow smith" />
            </a>
          </div>
          <div className="col-md-8">
            <div className="nav-2">
              <nav>
                <ul className="  SidebarList">
                  <li>
                    <NavLink
                      id="title"
                      to="/sites"
                      className={({ isActive }) =>
                        isActive ? "active" : "not-active-class"
                      }
                    >
                      <img src={iconSite} className="icon" /> SITES
                    </NavLink>
                  </li>
                  <li className="sub">
                    <NavLink
                      id="title"
                      to="/clientequipe/gestionclient"
                      className={({ isActive }) =>
                        isActive ? "active " : "not-active-class "
                      }
                    >
                         <img src={iconClient} className="icon" /> Clients et équipe
                    </NavLink>
                    <ul className="sou-menu">
                    <li>
                    <HasPermission  permission={["gerer_les_clients"]} >
                      <NavLink to="/clientequipe/gestionclient"    className={({ isActive }) =>
                                      isActive ? "active " : "not-active-class "
                                    }>
                        Gestion des clients
                      </NavLink>
                      </HasPermission>
                    </li>
                    <li>
                     
                      <HasPermission  permission={["gerer_les_membres_de_l_equipe"]} >
                      <NavLink to="/clientequipe/autorisation"    className={({ isActive }) =>
                                      isActive ? "active" : "not-active-class"
                                    }>
                        Autorisation  d'équipe
                      </NavLink>
                      </HasPermission>
                    </li>
                  </ul>
                  </li>
                  {/* <li>
                    <NavLink
                      id="title"
                      //to="/Clients"
                      className={({ isActive }) =>
                        isActive ? "active" : "not-active-class"
                      }
                    >
                      {" "}
                      <img src={iconClient} className="icon" /> CLIENTS
                    </NavLink>
                  </li> */}
                  {/* <li>
                    <NavLink
                      id="title"
                     to="/StatistiqueGlobal"
                      className={({ isActive }) =>
                        isActive ? "active" : "not-active-class"
                      }
                    >
                      {" "}
                      <img src={iconStatistique} className="icon" />
                      STATISTIQUES
                    </NavLink>
                  </li> */}
                          <li>
                          <HasPermission  permission={["gerer_une_section_comme_modele"]} >
                    <NavLink
                      id="title"
                     to="/modelpersonalise"
                      className={({ isActive }) =>
                        isActive ? "active" : "not-active-class"
                      }
                    >
                      {" "}
                      <img src={iconProfil} className="icon" />
                      MODELES PERSONALISÈES
                    </NavLink>
                    </HasPermission>
                  </li>
                  <li>
                    <div className="dropdown">
                      <a
                        className="dropdown-toggle"
                        href="#"
                        id="title"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <img src={iconProfil} className="icon" />
                        {storeUser.user.prenom.charAt(0).toUpperCase() +
                          "." +
                          storeUser.user.nom.toUpperCase()}
                      </a>
                      <ul className="dropdown-menu">
                        <li>
                          <a
                            className="dropdown-item"
                            id="title"
                            href="#"
                            onClick={(e) => {
                              signout();
                            }}
                          >
                            <i className="fal fa-sign-out-alt"></i> Déconnect
                          </a>
                        </li>
                      </ul>
                    </div>
                  </li>
          
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
