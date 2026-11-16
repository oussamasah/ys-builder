import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setcurrentSite,
  removecurrentSite,
} from "../../../../redux/features/site";
import { useParams } from "react-router-dom";
import Espacement from "../../../Espacement/Espacement";

import "./Cellules.css";
import ColorConfig from "../../../../pages/editor/compoments/Color/ColorConfig";
export default function Cellules(props) {
  const dispatch = useDispatch();
  let { siteId, pageId } = useParams();
  const storeSites = useSelector((state) => state.site.value);
  let [storeSite, setStoreSite] = useState();
  useEffect(() => {
    getSite();
  }, []);
  const getSite = async (item) => {
    await axios
      .get(process.env.REACT_APP_API_URL + "/sites/get/" + siteId)
      .then((response) => {
        try {
          setStoreSite(response.data.data);
          dispatch(setcurrentSite(response.data.data));
          // console.log("--------------", response.data.data);
        } catch (error) {
          // console.log(error);
        }
      })
      .catch((error) => {
        // console.log(error.message);
      });
  };
  const saveStyle = async () => {
    await axios
      .post(process.env.REACT_APP_API_URL + "/sites/styleglobal/" + siteId, {
        styleglobal: {
          section: storeSites.site.styleglobal.section,
          "section:mobile": storeSites.site.styleglobal["section:mobile"]
            ? storeSites.site.styleglobal["section:mobile"]
            : "10",
        },
      })
      .then((response) => {
        let head = props.editor().Canvas.getDocument().head;
        props.editor().Canvas.getDocument().head.replaceWith(head);
        const previewText = document.querySelectorAll("div.preview");

        var styleCss = document.createElement("style");

        let ssection = "";
        Object.keys(storeSites.site.styleglobal.section).forEach(function (
          key,
          index
        ) {
          ssection +=
            key + ":" + storeSites.site.styleglobal.section[key] + ";";
        });
        var csssection = "div.preview{" + ssection + "}";
        styleCss.appendChild(document.createTextNode(csssection));

        Object.keys(previewText).map((key) => {
          if (previewText[key].querySelector("style") != null) {
            previewText[key].querySelector("style").remove();
          }
          previewText[key].appendChild(styleCss);
        });
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  const rgbtoJson = (rgbString) => {
    var s = rgbString;
    s = s.replace("rgb(", "");
    s = s.replace(")", "");
    let c = s.split(",");
    return { r: c[0], g: c[1], b: c[2], a: c[3] };
  };
  const [blockPickerColor, setBlockPickerColor] = useState({
    rgbTxt: storeSite
      ? storeSite.site.styleglobal.body.background.replace("!important", "")
      : "#fff",
    rgb: storeSite
      ? rgbtoJson(
          storeSite.site.styleglobal.body.background.replace("!important", "")
        )
      : "#fff",
  });

  const [blockPickerColorMobile, setBlockPickerColorMobile] = useState({
    rgbTxt:
      storeSite && storeSite.site.styleglobal["body:mobile"].background
        ? storeSite.site.styleglobal["body:mobile"].background
        : "#fff",
    rgb:
      storeSite && storeSite.site.styleglobal["body:mobile"].background
        ? rgbtoJson(storeSite.site.styleglobal["body:mobile"].background)
        : "#fff",
  });
  useEffect(() => {
    console.log(blockPickerColor);
  }, [blockPickerColorMobile, blockPickerColor]);

  const changeColor = async (color) => {
    setBlockPickerColor(color);

    await axios
      .post(process.env.REACT_APP_API_URL + "/sites/styleglobal/" + siteId, {
        styleglobal: {
          body: { background: color.rgbTxt + "!important" },
        },
      })
      .then((response) => {
        getSite();
        // props.editor().Canvas.getWindow().render();
      });
  };
  const changeColorMobile = async (color) => {
    setBlockPickerColorMobile(color);

    await axios
      .post(process.env.REACT_APP_API_URL + "/sites/styleglobal/" + siteId, {
        styleglobal: {
          "body:mobile": { background: color.rgbTxt + "!important" },
        },
      })
      .then((response) => {
        getSite();

        //props.editor().Canvas.getWindow().render();
      });
  };

  useEffect(() => {
    setBlockPickerColorMobile({
      rgbTxt:
        storeSite && storeSite.site.styleglobal["body:mobile"].background
          ? storeSite.site.styleglobal["body:mobile"].background
          : "#fff",
      rgb:
        storeSite && storeSite.site.styleglobal["body:mobile"].background
          ? rgbtoJson(storeSite.site.styleglobal["body:mobile"].background)
          : "#fff",
    });
    setBlockPickerColor({
      rgbTxt: storeSite
        ? storeSite.site.styleglobal.body.background.replace("!important", "")
        : "#fff",
      rgb: storeSite
        ? rgbtoJson(
            storeSite.site.styleglobal.body.background.replace("!important", "")
          )
        : "#fff",
    });
  }, [storeSite]);
  useEffect(() => {
    saveStyle();
  }, [storeSites]);

  return (
    <div id="cellules" className="d-block m-4">
      <div className="previewTitle mb-5 mt-3">Aperçu</div>
      <div className="GlobalCelulle ">
        <div className="preview">
          <div className="bg-section">
            <div className="section"></div>
          </div>
        </div>
      </div>

      <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
        <li class="nav-item" role="presentation">
          <button
            class="nav-link active"
            id="pills-home-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-home"
            type="button"
            role="tab"
            aria-controls="pills-home"
            aria-selected="true"
          >
            <i class="fas fa-desktop me-1"></i>
            <i class="fas fa-tablet me-1"></i>
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button
            class="nav-link"
            id="pills-profile-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-profile"
            type="button"
            role="tab"
            aria-controls="pills-profile"
            aria-selected="false"
          >
            <i class="fas fa-mobile me-1"></i>
          </button>
        </li>
      </ul>
      <div class="tab-content" id="pills-tabContent">
        <div
          class="tab-pane fade show active"
          id="pills-home"
          role="tabpanel"
          aria-labelledby="pills-home-tab"
        >
          <div class="titleEspacement s">
            <span>
              {" "}
              <i class="fa-solid fa-bell"></i> Gestion des espacements desktop &
              tablette{" "}
            </span>
          </div>
          <ColorConfig
            key={"body-desktop"}
            label="Couleur du fond des pages"
            config={blockPickerColor}
            setConfig={changeColor}
          />
          <Espacement element={"section"} />
        </div>
        <div
          class="tab-pane fade"
          id="pills-profile"
          role="tabpanel"
          aria-labelledby="pills-profile-tab"
        >
          <div class="titleEspacement s">
            <span>
              {" "}
              <i class="fa-solid fa-bell"></i> Gestion des espacements mobile{" "}
            </span>
          </div>
          <ColorConfig
            key={"body-mobile"}
            label="Couleur du fond des pages"
            config={blockPickerColorMobile}
            setConfig={changeColorMobile}
          />
          <Espacement element={"section:mobile"} />
        </div>
      </div>
    </div>
  );
}
