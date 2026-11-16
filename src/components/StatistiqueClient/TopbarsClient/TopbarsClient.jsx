import React from "react";
import "./TopbarsClient.css";
// import { Link } from "react-router-dom";
import logo from "../../../assets/imgSites/logoNab.svg";
import iconSite from "../../../assets/imgSites/iconSite.png";

// import iconAide from "../../assets/imgSites/iconAide.svg";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
// import { logout } from "../../../redux/features/user";
import { useNavigate } from "react-router-dom/dist";
// import axios from "axios";


export default function TopbarsClient(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const baseURL = process.env.REACT_APP_API_URL;
  // const signout = async () => {
  //   await axios
  //     .post(baseURL + "/auth/logout", {
  //       user: storeUser.user._id,
  //     })
  //     .then(async (response) => {
  //       navigate("/login");
  //       dispatch(logout());
  //     });
  // };
  // const storeUser = useSelector((state) => state.user.value);

  return (
    <div className="topBar ">
      <div className="containers">
        <div className="row ">
          <div className="col-md-4">
            <a href="#" onClick={(e) => navigate("/accueil")} titre="Yellow smith">
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
                      to="/accueil"
                      className={({ isActive }) =>
                        isActive ? "active" : "not-active-class"
                      }
                    >
                      <img src={iconSite} className="icon" /> SITES
                    </NavLink>
                  </li>
                  {/* <li>
                    <div className="dropdown">
                    <a
          className="dropdown-toggle"
          href="#"
          id="title"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {storeUser && storeUser.user && (
            // Add checks for storeUser.user and its properties
            storeUser.user.prenom.charAt(0).toUpperCase() +
            "." +
            storeUser.user.nom.toUpperCase()
          )}
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
                  </li> */}
                 
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
