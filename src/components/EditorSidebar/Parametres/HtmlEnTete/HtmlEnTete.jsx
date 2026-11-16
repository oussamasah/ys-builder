import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useParams } from "react-router-dom";
import "./HtmlEnTete.css";
import ace from "ace-builds";
import "ace-builds/webpack-resolver";
import AceEditor from "react-ace";
import "brace/mode/html.js";
import "brace/mode/css.js";
import "brace/theme/monokai.js";
export default function HtmlEnTete(props) {
  let { siteId } = useParams();
  const [scriptHead, setScriptHead] = useState();
  const [scriptCorps, setScriptCorps] = useState();
  const [HtmlErrorHead, setHTMLerrorHead] = useState([]);
  const [HtmlErrorFooter, setHTMLerrorFooter] = useState([]);
  const updateScriptHead = async () => {
    setHTMLerrorHead([]);
    await axios
      .post(
        process.env.REACT_APP_API_URL + "/sites/updatescriptHead/" + siteId,
        {
          scriptHead: scriptHead,
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
        toast.error("Merci de vérifier votre données");
        if (err.response.data.html) {
          setHTMLerrorHead(err.response.data.html);
        }
      });
  };
  const updateScriptFooter = async () => {
    setHTMLerrorFooter([]);
    await axios
      .post(
        process.env.REACT_APP_API_URL + "/sites/updatescriptFooter/" + siteId,
        {
          scriptFooter: scriptCorps,
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
        toast.error("Merci de vérifier votre données");
        if (err.response.data.html) {
          setHTMLerrorFooter(err.response.data.html);
        }
      });
  };
  const getSite = async () => {
    await axios
      .get(process.env.REACT_APP_API_URL + "/sites/get/" + siteId)
      .then((response) => {
        setScriptCorps(response.data.data.site.scriptFooter);
        setScriptHead(response.data.data.site.scriptHead);
      });
  };
  useEffect(() => {
    setHTMLerrorHead([]);
    setHTMLerrorFooter([]);
  }, [scriptHead, scriptCorps]);
  const ResetCorps = () => {
    setScriptCorps("");
  };
  const ResetHead = () => {
    setScriptHead("");
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
    <div id="InfoHtlml">
      <div className="form-group mt-3">
        <label>HTML fin du corps</label>
        <span className="test-aide">
          Saisissez votre propre code HTML/​JavaScript personnalisé juste avant
          la balise de fermeture de l'élément <b className="aideHtml">body</b>{" "}
          de chaque page du site. Pour des raisons de performance, il est
          conseillé de l'utiliser pour ajouter des scripts personnalisés plutôt
          que la section d'en-tête.
        </span>
      </div>
      <div
        className={
          HtmlErrorFooter.length > 0
            ? "text-danger fw-light fst-italic"
            : "d-none"
        }
      >
        {HtmlErrorFooter.map((err) => {
          return (
            <>
              <small>* {err.message} </small> <br />
            </>
          );
        })}
      </div>
      <AceEditor
        placeholder="Ecrire votre html/javascript code..."
        mode="html"
        theme="monokai"
        name="blah2"
        width={"100%"}
        onChange={setScriptCorps}
        fontSize={14}
        showPrintMargin={false}
        showGutter={true}
        highlightActiveLine={true}
        value={scriptCorps}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
          showLineNumbers: true,
          tabSize: 2,
          useWorker: false,
        }}
      />

      <div className="form-group mt-3 d-flex justify-content-end">
        <button
          className="btn btn-rounded  btn-outline-secondary reset me-2"
          onClick={(e) => ResetCorps(false)}
        >
          Annuler
        </button>
        <button
          className="btn  btn-rounded btn btn-outline-secondary send"
          onClick={(e) => updateScriptFooter()}
        >
          Enregistrer
        </button>
      </div>
      <div className="form-group mt-3">
        <label>Head HTML</label>
        <span className="test-aide">
          Ajoutez du JavaScript/HTML personnalisé à la balise{" "}
          <b className="aideHtml"> head</b> de chaque page. Pour améliorer les
          performances du site, nous vous recommandons de l'ajouter à la balise{" "}
          <b>body</b>.
        </span>
      </div>
      <div
        className={
          HtmlErrorHead.length > 0
            ? "text-danger fw-light fst-italic"
            : "d-none"
        }
      >
        {HtmlErrorHead.map((err) => {
          return (
            <>
              <small>* {err.message} </small> <br />
            </>
          );
        })}
      </div>
      <AceEditor
        placeholder="Ecrire votre html/javascript code..."
        mode="html"
        theme="monokai"
        name="blah3"
        width={"100%"}
        onChange={setScriptHead}
        fontSize={14}
        showPrintMargin={false}
        showGutter={true}
        highlightActiveLine={true}
        value={scriptHead}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
          showLineNumbers: true,
          tabSize: 2,
          useWorker: false,
        }}
      />

      <div className="form-group mt-3 d-flex justify-content-end">
        <button
          className="btn btn-rounded  btn-outline-secondary reset me-2"
          onClick={(e) => ResetHead(false)}
        >
          Annuler
        </button>
        <button
          className="btn  btn-rounded btn btn-outline-secondary send"
          onClick={(e) => updateScriptHead()}
        >
          Enregistrer
        </button>
      </div>
    </div>
  );
}
