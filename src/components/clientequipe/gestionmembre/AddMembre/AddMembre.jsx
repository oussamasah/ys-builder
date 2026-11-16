import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import "./AddMembre.css";
export default function AddMembre(props) {
  const storeUser = useSelector((state) => state.user.value);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [courier, setCourier] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [listMembre, setListMembre] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [password, setPassword] = useState("");
  const clearInput = () => {
    setCourier("");
    setLastName("");
    setLastName("");
    setPassword("");
  };
  const AddMembre = async () => {
    await axios
      .post(process.env.REACT_APP_API_URL + "/users/create", {
        nom: firstName,
        prenom: lastName,
        email: courier,
        password: password,
        CompteSchema: storeUser.user.CompteSchema._id,
        RoleSchema: selectedGroup,
      })

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
        clearInput();
      })
      .catch((error) => {
        toast.error(
          error.response.data.message
            ? error.response.data.message.code &&
              error.response.data.message.code == "11000"
              ? "Ce groupe est déja exist"
              : error.response.data.message
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
  const [showPassword, setShowPassword] = useState(false);
const ALLMembre = () => {
  axios
      .get(
        process.env.REACT_APP_API_URL +
          "/roles/getbycompte/" +
          storeUser.user.CompteSchema._id
      )
      .then((res) => {
        setListMembre(res.data.data);
      });
}
const hasMediaEffectRun = useRef(false);
  useEffect(() => {
    const fetchData = async () => {
      if (!hasMediaEffectRun.current) {
        hasMediaEffectRun.current = true;
        await ALLMembre();
      }
    };

    fetchData();
  }, []);
 
  useEffect(() => {}, [listMembre, selectedGroup, courier]);

  return (
    <div id="addmembre">
      <div className="tilte d-flex justify-content-between align-align-items-center mt-3 mb-3">
        <span className="cursor" onClick={(e) => props.changeView("ListRole")}>
          <i className="fa-solid fa-arrow-left-long"></i> Retour{" "}
        </span>
        <span className="fw-bold">AJOUTER UN MEMBRE DE L'ÉQUIPE</span>
        <span className="cursor">
          <i className="fa-solid fa-circle-question"></i>
        </span>
      </div>
      <div className="text-start m-2">
        Ajoutez un membre de l'équipe à tous les sites de ce compte et
        affectez-le à l'un des groupes ci-dessous. Une fois ajoutés, les membres
        de l'équipe recevront un courriel les invitant à créer leur compte.
      </div>
      <div className="text-start m-2">Informations sur l'utilisateur </div>
      <div className="d-flex justify-content-start align-items-center gap-3">
        <input
          className={`form-control mb-3 ${isEmailValid ? "" : "is-invalid"}`}
          type="email"
          placeholder="Courier"
          value={courier}
          onChange={(e) => {
            setCourier(e.target.value);
            setIsEmailValid(emailRegex.test(e.target.value));
          }}
        />
        <input
          className="form-control mb-3 "
          type="text"
          placeholder="Nom"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <input
          className="form-control mb-3 "
          type="text"
          placeholder="Prénom"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />

        <input
          className="form-control mb-3"
          type={showPassword ? "text" : "password"}
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <i
          className={
            showPassword ? "fa-solid fa-eye mb-3" : "fa-solid fa-eye-slash mb-3"
          }
          onClick={() => setShowPassword(!showPassword)}
        ></i>
      </div>
      <hr></hr>
      <p className="fw-bold mb-3">Choisissez l'un des groupes ci-dessous :</p>
      <div className="AllGroupe container">
        <div className="row">
          {listMembre.map((list,index) => {
            return (
              <div className="col-md-4 col-sm-12" key={index}>
                <div
                  className="itemGroupe"
                  style={{
                    border:
                      selectedGroup === list._id
                        ? `2px solid ${list.color}`
                        : "#eee",
                    borderRadius: selectedGroup === list._id ? "10px" : "0", // Apply border-radius conditionally
                  }}
                  onClick={() => setSelectedGroup(list._id)}
                >
                  <div
                    className="IconGroupe w-25"
                    style={{ background: list.color }}
                  >
                    <span>
                      <i
                        className="fa-solid fa-user-tie"
                        style={{ color: list.color }}
                      ></i>
                    </span>
                  </div>
                  <div className="contentGroupe w-75 suite">
                    <div>
                      <span className="titlegroupe">{list.name}</span>
                      {list.Permission &&
                        list.Permission.map((te, index) => (
                          <>
                            {" "}
                            <span>{te.label}</span>
                          </>
                        ))}
                    </div>
                    <div className="plus">
                      <span className="titlegroupe">{list.name}</span>
                      {list.Permission &&
                        list.Permission.map((te, index) => (
                          <>
                            {" "}
                            <span>{te.label}</span>
                          </>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="note d-flex justify-content-between">
          <div className="textNote  text-start w-75">
            NOTE : Les groupes prédéfinis seront automatiquement mis à jour
            lorsque de nouvelles fonctionnalités seront disponibles.
          </div>
          <div className=" mb-3">
            <button
              className="updatebtn"
              type="button"
              onClick={(e) => AddMembre()}
              disabled={!courier || !firstName || !password}
            >
              {" "}
              Ajouter un membre
            </button>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
