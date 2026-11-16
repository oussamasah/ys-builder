import React, { useState, useEffect } from "react";
import logo from "../../../assets/img/logo.png";
import picture from "../../../assets/img/picture.svg";
import { useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
/* import { GoogleLogin, GoogleLogout } from "react-google-login"; */
import "./Login.css";
import { useDispatch, useSelector } from "react-redux";
import { loginClient, logoutClient } from "../../../redux/features/client";
import { logout } from "../../../redux/features/user";
import axios from "axios";
import { useJwt } from "react-jwt";
import Cookies from "universal-cookie";
const baseURL = process.env.REACT_APP_API_URL;

export default function LoginClient() {
  let { token } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cookies = new Cookies();





  const connect = async () => {
    try {
      await axios
        .post(baseURL + "/auth/loginclient", {
          token: token,
        })
        .then(async (response) => {
          console.log(response)
          cookies.set("authorization", response.data.data.token, {
            path: "/",
          });
          cookies.set("refresh", response.data.data.refreshtoken, {
            path: "/",
          });
       
          await dispatch(logout());
          await dispatch(loginClient(response.data.data));
   
          setTimeout(() => {
            navigate("/accueil");
          }, 200);

 
          //this.props.navigation.navigate('Dashbord')
        })
        .catch(function (error) {
          navigate("/login")
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
  useEffect(()=>{
    connect()
  },[])
  return (
    <div></div>
  );
}
