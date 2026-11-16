import React, { useState, useEffect } from "react";
import logo from "../../../assets/img/logo.png";
import picture from "../../../assets/img/picture.svg";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
/* import { GoogleLogin, GoogleLogout } from "react-google-login"; */
import "./Login.css";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../../../redux/features/user";
import {logoutClient } from "../../../redux/features/client";
import axios from "axios";
import { useJwt } from "react-jwt";
import Cookies from "universal-cookie";
const baseURL = process.env.REACT_APP_API_URL;

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cookies = new Cookies();
  const clientId = process.env.REACT_APP_Google_OAuth_Client_ID;
  const [loading, setLoading] = useState("Chargement...");
  const [google, setGoogle] = useState();
  const [user, setUser] = useState(null);
  const handleLoginSuccess = (response) => {
    setUser(response.profileObj);
    setLoading();
  };

  const handleLoginFailure = (error) => {
    setLoading();
  };

  const handleRequest = () => {
    setLoading("Chargement...");
  };

  const handleAutoLoadFinished = () => {
    setLoading();
  };
  /* Fin connection avec  google  */

  const [email, setEmail] = useState("");
  const [isEmail, setIsEmail] = useState(false);
  const [message, setMessage] = useState({ email: "", passwordType: "" });
  const [passwordType, setPasswordType] = useState("password");
  const [passwordInput, setPasswordInput] = useState("");
  const handlePasswordChange = (evnt) => {
    setPasswordInput(evnt.target.value);
  };
  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };
  const OublierMotDePass = () => {
    navigate("/OublierMotDePass");
  };
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  useEffect(() => {
    const validateEmail = () => {
      if (emailRegex.test(email)) {
        setIsEmail(true);
        setMessage({ email: "" });
      } else {
        setIsEmail(false);
        setMessage({ email: "Email format est invalide!" });
      }
    };

    validateEmail();
  }, [email]);

  const connect = async () => {
    try {
      await axios
        .post(baseURL + "/auth/login", {
          email: email,
          password: passwordInput,
        })
        .then(async (response) => {
          cookies.remove("authorization", { path: "/" });
          cookies.remove("refresh", { path: "/" });
          cookies.set("authorization", response.data.data.data.token, {
            path: "/",
          });
          cookies.set("refresh", response.data.data.data.refreshtoken, {
            path: "/",
          });
          await dispatch(logoutClient());
          await dispatch(login(response.data.data.data));
          setTimeout(() => {
            navigate("/");
          }, 5000);

          toast.success(response.data.data.message, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });

          //this.props.navigation.navigate('Dashbord')
        })
        .catch(function (error) {
          toast.error(error.response.data.errors[0].message, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
    } catch (e) {
      //console.log(e);
      toast.error("Identfiant incorrect!", {
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
  return (
    <div className="sestion-login ">
      <div className="sestion-login-1 ">
        <div className="row">
          <div className="col-xl-7  col-md-7 col-xs-12">
            <img className="auth signin animate fadeInRight" src={logo} />
            <img className="auth picture" src={picture} />
          </div>
          <div className="col-xl-5 col-md-5 col-xs-12">
            <div className="authentification  ">
              <div className=" fadeInUp  animate">
                <div className="title-auth">
                  <span>Bienvenue sur votre BUILDER TEMPLATE</span>
                </div>
                <div className="bg-transparent">
                  <div className="text-center">
                    {/*                   <GoogleLogin
                      clientId={clientId}
                      buttonText={loading}
                      className="btn btn-google btn-danger my-4"
                      onSuccess={handleLoginSuccess}
                      onFailure={handleLoginFailure}
                      onRequest={handleRequest}
                      onAutoLoadFinished={handleAutoLoadFinished}
                      isSignedIn={true}
                      disabled={false}
                    >
                      <span className="navig"> Continuer avec Google</span>
                    </GoogleLogin> */}
                  </div>
                </div>
                <div className="form-group m-form__group group_password">
                  <input
                    required
                    type="email"
                    className="form-control transparent-input no-autofill-bkg"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Identifiant"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <div className="valid-feedback">{!isEmail}</div>
                </div>
                <div className="form-group m-form__group group_password">
                  <input
                    required
                    type={passwordType}
                    id="exampleInputPassword"
                    onChange={handlePasswordChange}
                    value={passwordInput}
                    name="password"
                    className="form-control transparent-input"
                    placeholder="Mot de passe"
                  />
                  <div className="valid-feedback">Looks good!</div>
                  <div className="input-group-btn">
                    <button
                      className="btn btn-outline-primary"
                      onClick={togglePassword}
                    >
                      {passwordType === "password" ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-eye-slash-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z" />
                          <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z" />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-eye-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                          <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
                <button
                  type="button"
                  className="connecter"
                  onClick={(e) => connect()}
                  disabled={!isEmail}
                >
                  Se connecter
                </button>

                <span className="oublier" onClick={OublierMotDePass}>
                  Mot de passe oublié ?
                </span>
              </div>
            </div>
            <span className="footers">
              <b> Yellow Smith Builder</b> <br /> By <b>Bforbiz </b>
              <br /> Version 0.0.0
            </span>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
