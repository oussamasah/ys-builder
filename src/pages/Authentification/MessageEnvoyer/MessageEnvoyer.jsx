import React, { useState, useEffect } from "react";
import "./MessageEnvoyer.css";
import { Route, useLocation, useNavigate } from "react-router-dom";
import logo from "../../../assets/imgauth/logo.png";

import padlock from "../../../assets/imgauth/message.PNG";

export default function MessageEnvoyer() {
  const { state } = useLocation();
  //  console.log(state.email)
  const navigate = useNavigate();

  const Annuler = () => {
    navigate("/");
  };

  return (
    <div className="container sestion-login ">
      <div className="sestion-login-1 success ">
        <img className="auth signin ob animate fadeInLeft " src={logo} />
        <img className="auth padlock" src={padlock} />
        <div className="row Oubiler animate fadeInDown">
          <div className="col-xl-12  col-md-12 col-xs-12">
            <span className="text-oublier success">
              Votre nouveau mot de passe
              <br /> vous a été envoyé à l'adresse
              <br /> <span>{state.email}</span>
            </span>
            <button type="button" className="connecter" onClick={Annuler}>
              Retour
            </button>
          </div>
        </div>
        <span className="footers">
          <b> Yellow Smith Builder</b> <br /> By <b>Bforbiz </b>
          <br /> Version 0.0.0{" "}
        </span>
      </div>
    </div>
  );
}
