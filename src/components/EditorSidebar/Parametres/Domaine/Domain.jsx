import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import "./Domain.css";
import { useParams } from "react-router-dom";
import isValidDomain from "is-valid-domain";

export default function Domain() {
  let { siteId } = useParams();
  const [valid, setValid] = useState(false);
  const [domain, setDomain] = useState();
  const checkdomain = async (value) => {
    setDomain(value);
    setValid(
      isValidDomain(value, {
        subdomain: true,
        topLevel: false,
        wildcard: false,
      })
    );
  };

  const createDomaine = async () => {
    toast.loading("Creation du nom du domaine ");
    let formData = new FormData();
    formData.append("domain", domain);
    formData.append("siteId", siteId);


    await axios
      .post(
        process.env.REACT_APP_API_URL + "/sites/publier/" + siteId,
        {
          domain: domain,
        },
        {
          withCredentials: true,
        }
      )
      .then(async (responsePublier) => {
        toast.dismiss();
        setValid(true);
        toast.success("Nom de domaine est crée", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        //window.location.reload(false);
      })
      .catch((err) => {
        toast.dismiss();
        toast.error(err.response.data.message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  const DomainduSite = () => {
    axios
      .get(process.env.REACT_APP_API_URL + "/sites/get/" + siteId)
      .then((response) => {
        setDomain(response.data.data.site.domaine);
      });
  }
  const hasMediaEffectRun = useRef(false);
  useEffect(() => {
    const fetchData = async () => {
      if (!hasMediaEffectRun.current) {
        hasMediaEffectRun.current = true;
        await DomainduSite();
      }
    };
  
    fetchData();
  }, [siteId])
  return (
    <div id="InfoDomaine">
      <div className="form-group mt-3">
        <span className="test-aide  mb-3">
          {" "}
          Il s'agit du nom de domaine que les visiteurs voient quand ils
          consultent votre site. Vous pouvez configurer votre URL ici après
          avoir
        </span>
      </div>
      <div class="input-group mb-3">
        <span class="input-group-text" id="basic-addon1">
          www.
        </span>
        <input
          type="text"
          id="domain"
          value={domain}
          className={valid ? "form-control valid" : "form-control invalid "}
          placeholder="name.example.com"
          onChange={(e) => checkdomain(e.target.value)}
        />
      </div>
      <div class="form-group mt-3 d-flex justify-content-end">
        <button
          className="btn  btn-rounded btn btn-outline-secondary send "
          id="send"
          disabled={!valid}
          onClick={(e) => createDomaine()}
        >
          Enregistrer
        </button>
      </div>
    </div>
  );
}
