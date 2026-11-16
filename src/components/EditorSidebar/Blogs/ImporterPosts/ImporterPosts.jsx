import React, { useState } from 'react'
import './ImporterPosts.css'
import isValidDomain from "is-valid-domain";
export default function ImporterPosts() {
    const [valid, setValid] = useState(false);
    const [domain, setDomain] = useState();
      const rssDomainRegex = /^www\.votredomaine\.com\/[a-zA-Z0-9-]+(?:\?.*format=rss)?$/;

    const [isUrlValid, setIsUrlValid] = useState(true);
  return (
    <div id="importerPosts">
    <div className="d-flex  justify-content-between mb-3">
      <h1>Importer les posts</h1>
      </div>
      <div className="notice">
        <span className='mb-3'>
        Importez les posts d'un flux RSS externe directement dans ce blog.
        Avant de procéder à l'importation, nous vous recommandons de valider le flux via le service Feed <a href="https://validator.w3.org/feed/" target='_blank'>Validation de W3C.</a>
        </span>
        <span><i>Vous pouvez importer jusqu'à 300 posts. Pour en savoir plus, <b>ecrire  url sans https://</b></i></span>
      </div>
      <div class="input-group mb-3">
      <input
          className={`form-control mb-3 ${isUrlValid ? "" : "is-invalid"}`}
          type="text"
          placeholder="https://www.votredomaine.com/slugpage?format=rss"
          value={domain}
          onChange={(e) => {
            setDomain(e.target.value);
            setIsUrlValid(rssDomainRegex.test(e.target.value));
          }}
        />
    
      </div>
      </div>
  )
}
