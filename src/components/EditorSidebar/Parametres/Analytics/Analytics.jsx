import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { useParams } from "react-router-dom";
import "./Analytics.css";
import { v4 as uuidv4 } from "uuid";
import Select from "react-select";
export default function Analytics(props) {
  let { siteId } = useParams();
  const [analytics, setAnalytics] = useState("");

  const getSite = async () => {
    await axios
      .get(process.env.REACT_APP_API_URL + "/sites/get/" + siteId)
      .then((response) => {
        setAnalytics(response.data.data.site.analytics);
      });
  };
  const ParametreAnalytics = async () => {
    await axios
      .post(
        process.env.REACT_APP_API_URL + "/sites/updateanalytics/" + siteId,
        {
          analytics: analytics,
        }
      )
      .then(async (response) => {
        toast.success(response.data.message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((err) => {
        toast.dismiss();
        toast.error(err.response.data.message);
      });
  };

  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (analytics != "") {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [analytics]);
  const ResetAnalytics = () => {
    setAnalytics("");
  };

  const hasMediaEffectRun = useRef(false);
  useEffect(() => {
    const fetchData = async () => {
      if (!hasMediaEffectRun.current) {
        hasMediaEffectRun.current = true;
        await getSite();
      }
    };

    fetchData();
  }, [siteId]);
  return (
    <div id="InfoAnalitycs">
      <div className="form-group mt-3">
        <span className="test-aide">
          Saisissez ci-dessous votre identifiant Google Tag. L'intégration
          Google Tag prend en charge Google Analytics et Google Ads.
          L'intégration enverra automatiquement les pages vues et les événements
          de conversion à Google en votre nom.
        </span>

        <input
          type="text"
          name="label"
          value={analytics}
          onChange={(e) => setAnalytics(e.target.value)}
          required
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="Exemple: G-XXXXXXXXXX"
        />
      </div>

      <div className="form-group mt-3 d-flex justify-content-end">
        <button
          className="btn btn-rounded  btn-outline-secondary reset me-2"
          disabled={!isValid}
          onClick={(e) => ResetAnalytics(false)}
        >
          Annuler
        </button>
        <button
          className="btn  btn-rounded btn btn-outline-secondary send"
          disabled={!isValid}
          onClick={(e) => ParametreAnalytics()}
        >
          Enregistrer
        </button>
      </div>
    </div>
  );
}
