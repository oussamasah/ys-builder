import React, { useEffect, useState } from "react";
import "./IconConfig.css";
import fsList from "../../../../assets/fonts/fs.json";
import ColorConfig from "../Color/ColorConfig";
import axios from "axios";
import Dropzone from "react-dropzone";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
export default function IconConfig(props) {
  const [showStylesIconsList, setShowStylesIconsList] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(props.config);
  let { siteId, type, pageId } = useParams();
  const [icons, setIcons] = useState([{}]);
  const handleCloseStylesIconsList = () => {
    setShowStylesIconsList(false);
  };
  const filtre = (value) => {
    let filtred;
    if (value != "") {
      filtred = Object.values(icons).filter((item) =>
        item.name.toLowerCase().match(value.toLowerCase())
      );

      setIcons(filtred);
    } else {
      setIcons(fsList);
    }
  };
  const rgbtoJson = (rgbString) => {
    var s = rgbString;
    s = s.replace("rgb(", "");
    s = s.replace(")", "");
    let c = s.split(",");
    return { r: c[0], g: c[1], b: c[2], a: c[3] };
  };
  const [blockPickerColor, setBlockPickerColor] = useState({
    rgbTxt: props.config.color,
    rgb: rgbtoJson(props.config.color),
  });

  useEffect(() => {
    props.setConfig(selectedIcon);
  }, [icons, selectedIcon]);
  useEffect(() => {
    setIcons(fsList);
    // console.log("-----------", selectedIcon);
  }, []);
  const changeIcon = (type, icon, uni) => {
    if (type == "icon") {
      setSelectedIcon({
        ...selectedIcon,
        type: type,
        icon: icon,
        unicode: uni,
      });
    } else {
      setSelectedIcon({ ...selectedIcon, type: "image", icon: icon });
    }
  };
  const changeColor = (color) => {
    setBlockPickerColor(color);
    setSelectedIcon({ ...selectedIcon, color: color.rgbTxt });
  };

  const Uploaddocument = async (data) => {
    let formData = new FormData();

    await Promise.all(
      data.map(async (element) => {
        const file = await element;

        formData.append("document", file);
      })
    );

    await axios
      .post(
        process.env.REACT_APP_API_URL +
          "/medias/uploaddocument/" +
          props.siteId,
        formData
      )

      .then((response) => {
        let data = response.data.data;

        let lastSrc = data[0].src;
        setSelectedIcon({ ...selectedIcon, type: "image", icon: lastSrc });
        toast.success(response.data.message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
        });
      })
      .catch((error) => {
        console.log(error);
        toast.error(error?.response?.data.message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
        });
      });
  };

  return (
    <div id="IconConfig">
      <div>{props.label}</div>
      <nav>
        <div class="nav nav-tabs tabIconType" id="nav-tab" role="tablist">
          <button
            className={
              props.config.type == "icon"
                ? "nav-link tt active"
                : "nav-link tt "
            }
            id="nav-Icon-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-Icon"
            type="button"
            role="tab"
            aria-controls="nav-Icon"
            aria-selected="true"
          >
            Icon
          </button>
          <button
            className={
              props.config.type == "image"
                ? "nav-link tt active"
                : "nav-link tt"
            }
            id="nav-image-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-image"
            type="button"
            role="tab"
            aria-controls="nav-image"
            aria-selected="false"
          >
            Image
          </button>
        </div>
      </nav>
      <div class="tab-content" id="nav-tabContent">
        <div
          class={
            props.config.type == "icon"
              ? "tab-pane fade show active"
              : "tab-pane fade "
          }
          id="nav-Icon"
          role="tabpanel"
          aria-labelledby="nav-Icon-tab"
          tabindex="0"
        >
          <div className="d-flex justify-content-between align-items-center mb-3">
            <span className="d-block">Choisir l'icône</span>
            <div onClick={(e) => setShowStylesIconsList(true)}>
              <div className={selectedIcon.icon + " iconPreview"}></div>
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <span>Taille du l'icon</span>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <input
                type="range"
                min="10"
                max="50"
                class="rangeInput me-2"
                value={selectedIcon.size}
                onChange={(e) =>
                  setSelectedIcon({ ...selectedIcon, size: e.target.value })
                }
              />
              <div class="input-with-label-pixel">
                <span class="pixel-label">px</span>
                <input
                  min="10"
                  max="50"
                  value={selectedIcon.size}
                  onChange={(e) =>
                    setSelectedIcon({ ...selectedIcon, size: e.target.value })
                  }
                  class="form-control form-control-sm input-small-pixel"
                  type="number"
                />
              </div>
            </div>
          </div>

          <ColorConfig
            label="Couleur du L'icon"
            config={blockPickerColor}
            setConfig={changeColor}
          />
        </div>
        <div
          class={
            props.config.type == "image"
              ? "tab-pane fade show active"
              : "tab-pane fade "
          }
          id="nav-image"
          role="tabpanel"
          aria-labelledby="nav-image-tab"
          tabindex="0"
        >
          <Dropzone onDrop={(acceptedFiles) => Uploaddocument(acceptedFiles)}>
            {({ getRootProps, getInputProps }) => (
              <section className="dropzone">
                <div {...getRootProps()} className="drop-zone">
                  <input {...getInputProps()} name="document" />
                  <img class="previewIcon" src={selectedIcon.icon} />
                  <p>Déposez votre image ici</p>
                </div>
              </section>
            )}
          </Dropzone>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <span>Taille du l'image</span>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <input
                type="range"
                min="10"
                max="50"
                class="rangeInput me-2"
                value={selectedIcon.size}
                onChange={(e) =>
                  setSelectedIcon({ ...selectedIcon, size: e.target.value })
                }
              />
              <div class="input-with-label-pixel">
                <span class="pixel-label">px</span>
                <input
                  min="10"
                  max="50"
                  value={selectedIcon.size}
                  onChange={(e) =>
                    setSelectedIcon({ ...selectedIcon, size: e.target.value })
                  }
                  class="form-control form-control-sm input-small-pixel"
                  type="number"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={showStylesIconsList ? "d-block icon-list" : "d-none"}>
        <div class="text-end mb-3">
          <button
            type="button"
            onClick={handleCloseStylesIconsList}
            class="btn-close"
            aria-label="Close"
          ></button>
          <span className="title-popups">Changer l'icon </span>
          <div class="form-group mb-3">
            <input
              class="form-control icp icp-auto"
              type="text"
              onChange={(e) => filtre(e.target.value)}
              placeholder="Chercher votre icon ici..."
            />
          </div>
          <div className="iconsList">
            <div className="d-flex justify-content-around align-items-center flex-wrap gap-3 mt-3">
              {Object.values(icons)?.map((icon) => {
                return (
                  <i
                    onClick={(e) => {
                      changeIcon(
                        "icon",
                        icon.type + " fa-" + icon.name,
                        icon.unicode
                      );
                    }}
                    className={icon.type + " fa-" + icon.name + " icon"}
                  ></i>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
