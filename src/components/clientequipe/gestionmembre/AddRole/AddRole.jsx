import React, { useEffect, useState } from "react";
import ColorConfig from "../../../../pages/editor/compoments/Color/ColorConfig";
import axios from "axios";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import "./AddRole.css";
export default function AddRole(props) {
  const storeUser = useSelector((state) => state.user.value);

  const [groupeName, setGroupeName] = useState("");
  const [permissions, setPermissions] = useState([]);
  // const [listMembre, setListMembre] = useState([]);
  const [selectedPermisions, setSelectedPermisions] = useState([]);
  const rgbtoJson = (rgbString) => {
    var s = rgbString;
    s = s.replace("rgb(", "");
    s = s.replace(")", "");
    let c = s.split(",");
    return { r: c[0], g: c[1], b: c[2], a: c[3] };
  };
  const [blockPickerColor, setBlockPickerColor] = useState({
    rgbTxt: "rgb(0,0,0)",
    rgb: rgbtoJson("rgb(0,0,0)"),
  });
  const changeColor = (color) => {
    setBlockPickerColor(color);
  };
  const AddGroupe = async () => {
    await axios
      .post(process.env.REACT_APP_API_URL + "/roles/create/", {
        name: groupeName,
        color: blockPickerColor.rgbTxt,
        Permission: selectedPermisions,
        CompteSchema: storeUser.user.CompteSchema._id,
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
        props.changeView("ListRole");
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
  const changeSelectedPermission = (checked, value) => {
    if (checked == "true") {
      let p = [...selectedPermisions];
      p.push(value._id);
      setSelectedPermisions(p);
    } else {
      let p = selectedPermisions.filter((item) => item != value._id);
      setSelectedPermisions(p);
    }
  };
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL + "/roles/listpermession")
      .then((res) => {
        setPermissions(res.data.data);
      });
  }, []);

  useEffect(() => {}, [permissions, selectedPermisions, groupeName]);

  return (
    <div>
      <div className="tilte d-flex justify-content-between align-align-items-center mt-3 mb-3">
        <span className="cursor" onClick={(e) => props.changeView("ListRole")}>
          <i className="fa-solid fa-arrow-left-long"></i> Retour{" "}
        </span>
        <span className="fw-bold">CRÉER UN GROUPE D'ÉQUIPE</span>
        <span className="cursor">
          <i className="fa-solid fa-circle-question"></i>
        </span>
      </div>
      <div className="text-start m-2">
        Donnez un nom et une couleur à ce groupe.
      </div>
      <div className="d-flex justify-content-start align-items-center gap-3">
        <ColorConfig
          key={"team"}
          label=""
          config={blockPickerColor}
          setConfig={changeColor}
        />

        <input
          className="form-control mb-3 w-25"
          type="text"
          placeholder="Nom du groupe"
          value={groupeName}
          onChange={(e) => setGroupeName(e.target.value)}
        />
      </div>
      <hr></hr>
      <p className="fw-bold mb-3">
        Choisissez les fonctionnalités auxquelles les utilisateurs de ce groupe
        auront accès. S'applique aux sites web mobiles et réactifs.
      </p>
      <div className="Allpermission">
        {permissions.map((p) => {
          return (
            <>
              <div className=" d-flex justify-content-start align-items-center mb-3 mt-3 gap-3 border-bottom  pb-3">
                <div className="form-check form-switch d-flex gap-2  w-25 ">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={"isActivetablet"}
                    name={"isActivetablet"}
                    checked={selectedPermisions.includes(p._id)}
                    onChange={(e) => {
                      changeSelectedPermission(e.target.checked.toString(), p);
                    }}
                  />
                  <span className="d-block text-start">{p.label}</span>
                </div>

                <span className="d-block w-75 text-start">{p.description}</span>
              </div>
            </>
          );
        })}
        <div className="input-group-append  d-flex justify-content-end">
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={(e) => {
              AddGroupe(e);
            }}
            disabled={groupeName == "" || selectedPermisions.length == 0}
          >
            Ajouter un groupe personnalisé
          </button>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
