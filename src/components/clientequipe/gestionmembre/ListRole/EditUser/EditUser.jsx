import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import "./EditUser.css";
export default function EditUser(props) {
  const storeUser = useSelector((state) => state.user.value);
  const [courier, setCourier] = useState(props.teamItem.email);
  const [firstName, setFirstName] = useState(props.teamItem.nom);
  const [lastName, setLastName] = useState(props.teamItem.prenom);
  const [listRoles, setlistRoles] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(props.teamItem.RoleSchema);
  //const [showPassword, setShowPassword] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const EditMembre = async (item) => {
    await axios
      .post(
        process.env.REACT_APP_API_URL + "/users/update/" + props.teamItem._id,
        {
          nom: firstName,
          prenom: lastName,
          email: courier,
          // password: password,
          CompteSchema: storeUser.user.CompteSchema._id,
          RoleSchema: selectedGroup,
        }
      )

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

  useEffect(() => {
    axios
      .get(
        process.env.REACT_APP_API_URL +
          "/roles/getbycompte/" +
          storeUser.user.CompteSchema._id
      )
      .then((res) => {
        setlistRoles(res.data.data);
      });
  }, []);

  return (
    <div id="EditUser">
      <div className="tilte d-flex justify-content-between align-align-items-center mt-3 mb-3">
        <span className="cursor" onClick={(e) => props.changeView("ListRole")}>
          <i className="fa-solid fa-arrow-left-long"></i> Retour{" "}
        </span>
        <span className="fw-bold">EDITER UN MEMBRE DE L'ÉQUIPE</span>
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

        {/* <input
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
        ></i> */}
      </div>
      <hr></hr>
      <p className="fw-bold mb-3">Choisissez l'un des groupes ci-dessous :</p>
      <div className="AllGroupe container">
        <div className="row">
          {listRoles.map((list) => {
            return (
              <div className="col-md-4 col-sm-12">
                <div
                  className="itemGroupe"
                  style={{
                    border:
                      selectedGroup._id == list._id
                        ? `1px solid ${list.color}`
                        : "1px solid #eee",
                    borderRadius:
                      selectedGroup._id === list._id ? "10px" : "10px", // Apply border-radius conditionally
                  }}
                  onClick={() => {
                    setSelectedGroup(list);
                  }}
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
          <div className="note d-flex justify-content-between">
            <div className="textNote  text-start w-75">
              NOTE : Les groupes prédéfinis seront automatiquement mis à jour
              lorsque de nouvelles fonctionnalités seront disponibles
            </div>
            <div className=" mb-3">
              <button className="updatebtn" type="button" onClick={EditMembre}>
                Mettre à jour
              </button>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
