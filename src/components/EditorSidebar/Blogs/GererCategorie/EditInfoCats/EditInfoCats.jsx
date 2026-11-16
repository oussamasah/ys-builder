import React from "react";
import { useState } from "react";
import "./EditInfoCats.css";
export default function EditInfoCats(props) {
  const [state, setstate] = useState(props.dataIem);
  const [namecat, setNameCat] = useState(state.name);
  const [identifiant, setIdentifiant] = useState(state.idetifiant);
  const [metatitle, setMetaTitle] = useState(state.metatitle);
  const [datecat, setDatecat] = useState(Date);
  const [metadecription, setDecription] = useState(state.metadescription);
  const txtTolink = (txt) => {
    return txt
      .replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, "")
      .replace(/\é/g, "e")
      .replace(/\è/g, "e")
      .replace(/\ê/g, "e")
      .replace(/\ë/g, "e")
      .replace(/\à/g, "a")
      .replace(/\â/g, "a")
      .replace(/\ä/g, "a")
      .replace(/\û/g, "u")
      .replace(/\ü/g, "u")

      .replace(/\s/g, "-")
      .toLowerCase();
  };
  return (
    <div>
      <div className="form-group m-form__group group_text">
        <label className="m-2 titlecontent">
          {" "}
          <b>Nom </b>
        </label>
        <input
          required
          type="text"
          className="form-control namePage"
          id="exampleInputPage"
          aria-describedby="textHelp"
          placeholder="Titre du post"
          value={namecat}
          onChange={(e) => {
            setNameCat(e.target.value);
          }}
        />
      </div>
      <div className="form-group m-form__group group_text">
        <label className="m-2 titlecontent">
          {" "}
          <b>Identifiant ( url ) </b>
        </label>
        <input
          required
          type="text"
          className="form-control namePage"
          id="exampleInputPage"
          aria-describedby="textHelp"
          placeholder="Identifiant du post"
          value={identifiant}
          onChange={(e) => {
            setIdentifiant("/" + txtTolink(e.target.value));
          }}
        />
      </div>
      <div className="form-group m-form__group group_text">
        <label className="m-2 titlecontent">
          {" "}
          <b>Date Enregistrement </b>
        </label>
        <input
          required
          type="text"
          className="form-control namePage"
          id="exampleInputPage"
          aria-describedby="textHelp"
          placeholder="Identifiant du post"
          value={datecat}
        />
      </div>
      <div className="form-group m-form__group group_text">
        <label className="m-2 titlecontent">
          {" "}
          <b>Meta title </b>
        </label>
        <input
          required
          type="text"
          className="form-control namePage"
          id="exampleInputPage"
          aria-describedby="textHelp"
          placeholder="Meta title"
          value={metatitle}
          onChange={(e) => {
            setMetaTitle(e.target.value);
          }}
        />
      </div>
      <div className="form-group m-form__group group_text">
        <label className="m-2 titlecontent">
          {" "}
          <b>Meta description </b>
        </label>
        <input
          required
          type="text"
          className="form-control namePage"
          id="exampleInputPage"
          aria-describedby="textHelp"
          placeholder="Meta description "
          value={metadecription}
          onChange={(e) => {
            setDecription(e.target.value);
          }}
        />
      </div>
    </div>
  );
}
