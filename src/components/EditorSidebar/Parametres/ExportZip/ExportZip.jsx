import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { useParams } from "react-router-dom";
import "./ExportZip.css";
import { v4 as uuidv4 } from "uuid";
import FileSaver from "file-saver";
export default function ExportZip(props) {
  let { siteId } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const ExportZip = async () => {
    setIsLoading(true);
    await axios
      .get(process.env.REACT_APP_API_URL + "/sites/exportsite/" + siteId, {
        responseType: "blob",
      })
      .then((response) => {
        setIsLoading(false);
        FileSaver.saveAs(response.data, siteId + ".zip");
      })
      .catch((error) => {});
  };

  return (
    <div id="InfoExportZip">
      <div className="form-group ">
        <span className="test-aide mt-3">
          Téléchargez un fichier zip contenant le contenu du site (HTML,
          Javascript, CSS, images et fichiers téléchargés).
        </span>

        <button
          className="btn  btn-rounded btn btn-outline-secondary export  mt-3"
          onClick={(e) => ExportZip()}
        >
        <i class="fa-solid fa-download me-2"></i>
            Exporter le site
        </button>
        <div className={isLoading == true ? "loader" : ""}>
          <div className="loader__fill-glow"></div>
          <div className="loader__fill"></div>
          <div className="loader__middle"></div>
        </div>
      </div>
    </div>
  );
}
