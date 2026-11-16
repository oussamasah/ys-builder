import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { useParams } from "react-router-dom";
import "./Seo.css";
import { v4 as uuidv4 } from "uuid";
import Select from "react-select";
export default function Seo(props) {
  let { siteId } = useParams();
  const [indexSeo, setIndexSeo] = useState(false);
  const [titleSeo, setTitleSeo] = useState("");
  const [descriptionSeo, setDescriptionSeo] = useState("");
  const [listesPage, setListesPage] = useState([]);
  
  const getSite = async () => {
    await axios
      .get(process.env.REACT_APP_API_URL + "/sites/get/" + siteId)
      .then((response) => {
        setListesPage(response.data.data.pages);
        // setDescriptionSeo(response.data.data.site.meta_desc_site);
        setIndexSeo(response.data.data.site.index);
        
      });
  };
  const SeoParametre = async () => {
    setIndexSeo(!indexSeo);
    try {
      // Use the updated value of indexSeo directly in the API call
      await axios.post(process.env.REACT_APP_API_URL + "/sites/indexation/" + siteId, {
        index: !indexSeo, // Use the opposite value here
        // meta_title_site: titleSeo,
        // meta_desc_site: descriptionSeo,
      });
      getSite()
      // Update the state after the API call
   
  
      toast.success("Indexation paramètre updated successfully", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (err) {
      toast.dismiss();
      toast.error(err.response.data.message[0].message);
    }
  };




  useEffect(() => {
  }, [indexSeo]);
 ;
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
    <div id="InfoSeoSite">
      <div class="form-check form-switch mt-3 indexationtitre d-flex justify-content-between">
        <label className="form-check-label" htmlFor="isActiveShadow">
          Indexation du site
        </label>

        <input
    className="form-check-input"
    type="checkbox"
    id={"isActiveShadow-"}
    name={"isActiveShadow-"}
    value={indexSeo}
    checked={indexSeo === true}
    onChange={SeoParametre}
  />

      </div>
      <table  class="table">
      <thead>
    <tr>
      <th scope="col"> Listes des pages </th>
      <th scope="col"> Indexation</th>
    </tr>
    </thead>
    <tbody>
    {listesPage.map(list=>{
        return(
    <tr>
   
          <td>{list.title}</td>
          <td>{list.index=="true"?"Indexe":"Non-indexe"}</td>
       
  
     
    </tr>
     )
        })}
    </tbody>
   </table>
      {/* <div className="form-group mt-3">
        <label>Meta title site:</label>
        <textarea
          name="label"
          value={titleSeo}
          onChange={(e) => setTitleSeo(e.target.value)}
          required
          className="form-control"
          id="metatitle"
          placeholder="Saisissez meta titre du votre page"
        />
      </div>
      <div className="form-group mt-3">
        <label>Meta description site :</label>
        <textarea
          name="label"
          value={descriptionSeo}
          onChange={(e) => setDescriptionSeo(e.target.value)}
          required
          className="form-control"
          id="metadesc"
          placeholder="Saisissez  meta description  du votre page"
        />
      </div> */}
      {/* <div className="form-group mt-3 d-flex justify-content-end">
        <button
          className="btn btn-rounded me-2 btn-outline-secondary reset"
          disabled={!isValid}
          onClick={(e) => ResetSeo(false)}
        >
          Annuler
        </button>
        <button
          className="btn  btn-rounded btn btn-outline-secondary send"
          // disabled={!isValid}
          onClick={(e) => SeoParametre()}
        >
          Enregistrer
        </button>
      </div> */}
    </div>
  );
}
