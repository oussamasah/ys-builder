import React, { useState, useEffect } from "react";
import "./OublierMotDePass.css";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/img/logoOublier.png";
import toast, { Toaster } from "react-hot-toast";
import padlock from "../../../assets/img/padlock.PNG";
import axios from "axios";
const baseURL = process.env.REACT_APP_API_URL;

export default function OublierMotDePass(items) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isEmail, setIsEmail] = useState(false);
  const [message, setMessage] = useState("");
  const submitHandler = async (e) => {
    e.preventDefault();

    await axios
      .post(baseURL + "/auth/resetpasswordmailing", {
        email: email,
      })
      .then((response) => {
        //console.log(response)
        toast.success(response.data.message, {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        navigate("/MessageEnvoyer", {
          replace: true,
          state: { email: email },
        });
      })
      .catch(function (error) {
        toast.error(error.response.data.message, {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };
  const Annuler = () => {
    navigate("/");
  };
  useEffect(() => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const validateEmail = (e) => {
      if (emailRegex.test(email)) {
        setIsEmail(true);
        setMessage("Entrer vote email pour réinitialiser votre mot de passe");
      } else {
        setIsEmail(false);
        setMessage(
          <>
            Email non reconnu <br /> veuillez contacter administrateur
          </>
        );
      }
    };
    validateEmail();
  }, [email]);

  return (
    <div className="container sestion-login ">
      <div className="sestion-login-1 ob ">
        <img className="auth signin ob animate fadeInLeft " src={logo} />
        <img className="auth padlock" src={padlock} />
        <div className="row Oubiler animate fadeInDown">
          <div className="col-xl-12  col-md-12 col-xs-12">
            <span
              className={
                !isEmail ? "red text-oublier" : isEmail ? "text-oublier" : ""
              }
            >
              {email == "" ? (
                <span className="text-oublier first">
                  Entrer vote email pour réinitialiser votre mot de passe
                </span>
              ) : (
                message
              )}
            </span>

            <div className="form-group m-form__group group_password ">
              <input
                required
                type="email"
                id="Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                name="Email"
                className="form-control transparent-input"
                placeholder="Email"
              />
            </div>
            <button
              type="button"
              className="connecter"
              disabled={!isEmail}
              onClick={(e) => submitHandler(e, "clicked")}
            >
              Envoyer
            </button>
            <button type="button" className="annuler oublier" onClick={Annuler}>
              Annuler
            </button>
          </div>
        </div>
        <span className="footers">
          <b> Yellow Smith Builder</b> <br /> By <b>Bforbiz </b>
          <br /> Version 0.0.0{" "}
        </span>
      </div>
      <Toaster />
    </div>
  );
}
