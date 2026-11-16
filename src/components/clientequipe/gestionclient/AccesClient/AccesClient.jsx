import React, { useEffect, useState } from "react";
import "./AccesClient.css";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import {  useParams } from "react-router-dom";

export default function AccesClient(props) {
  let { id } = useParams();
  const [urlclient, setUrlClient] = useState([]);
  const [clientData , setClientdata] = useState(props.clientData || [])
  const copieid = (event) => {
    navigator.clipboard.writeText(event._id);
    toast.success(event, navigator.clipboard.writeText(event));
    
  };

 

  const getAttribuedSites = async () => {
    await axios
      .get(
        process.env.REACT_APP_API_URL +
          "/clients/getsiteattribue/" +
          id
      )
      .then((response) => {

        setUrlClient(response.data.data);
      });
  };

  useEffect(() => {

    getAttribuedSites();
  }, []);
  return (
    <div className="contents" id="acces">
      <div className="detailscontenu">
        <span className="titleinfo m-3">
          {" "}
          <b>
            <i className="fa-solid fa-share-nodes"></i> Url client
          </b>
        </span>
        <span className="m-3">
          Informez votre client que son site est prêt à être vérifié. Pour ce
          faire, envoyez l'URL de configuration ou envoyez un e-mail
          d'invitation auquel sont automatiquement jointes les informations dont
          il a besoin pour se connecter à la plateforme. <br></br>
        </span>

              <div className="generurl p-3 w-50">
              <span>URL de configuration</span>
              <div className="input-group mb-3 serash-sites ">
                <input
                  type="text"
                  value={`${window.location.origin}/loginclient/${
                    clientData.clientToken[0]?.token || ""
                  }`}
                  className="form-control"
                  placeholder="URL de configuration"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  disabled
                />
                <div className="input-group-append">
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={() => {
                      copieid(
                        `${window.location.origin}/loginclient/${
                          urlclient[0]?.token || ""
                        }`
                      );
                    }}
                  >
                    Copier
                  </button>
                  <Toaster />
                </div>
              </div>
            </div>
        
        <div className="generurl p-3 w-50">
          <span>E-mail d'invitation</span>
          <div className="input-group mb-3 serash-sites ">
            <input
              type="email"
              // value={clientData.email}
              disabled
              className="form-control "
              placeholder="URL de configuration"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                //   onClick={() => {
                //     copieid(storeSite.site.domaine);
                //   }}
              >
                Envoyer
              </button>
            </div>
          </div>
        </div>
       
      </div>
    </div>
  );
}
