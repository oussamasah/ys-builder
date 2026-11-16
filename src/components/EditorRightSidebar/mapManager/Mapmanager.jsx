import axios from "axios";
import React, { useEffect, useState } from "react";
import { Offcanvas } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./Mapmanager.css";
export default function Mapmanager(props) {
  const storeSite = useSelector((state) => state.site.value.site);
  let { siteId, pageId } = useParams();
  const [show, setShow] = useState(false);
  const [Element, setElement] = useState(null);
  const [currentAdress, setCurrentAdress] = useState({});
  const [currentAdressKey, setCurrentAdressKey] = useState({});
  const [Adresses, setAdresses] = useState([]);
  const [AvailbleMaps, setAvailbleMaps] = useState([]);
  const [SelectedMapType, setSelectedMapType] = useState();
  const handleClose = () => {
    setShow(false);
    updateMap();
    let head = props.editor().Canvas.getDocument().head;
    props.editor().Canvas.getDocument().head.replaceWith(head);
  };
  const addAdress = () => {
    setAdresses([
      ...Adresses,
      { text: "", marker: "", lat: "", lang: "", zone: "" },
    ]);
  };
  const updateMap = async () => {
    await axios
      .post(process.env.REACT_APP_API_URL + "/plugins/updateoption", {
        ref: Element.getAttribute("id"),
        options: {
          items: Adresses,
        },
        function: config,
        PluginSchema: SelectedMapType,
        PageSchema: pageId,
      })
      .then((response) => {
        getAdress();
      });
  };
  const [config, setConfig] = useState({
    backgroundColor: "",
    center: {},
    mapTypeId: "ROADMAP",
    controlSize: "12px",
    disableDefaultUI: false,
    disableDoubleClickZoom: false,
    fullscreenControl: false,
    keyboardShortcuts: false,
    maxZoom: 18,
    zoom: 8,
    minZoom: 2,
    panControl: false,
    scaleControl: false,
    rotateControl: false,
    scrollwheel: false,
    streetView: false,
    zoomControl: false,
  });
  const changeAdresse = (index, value) => {
    let adr = Adresses;
    adr[currentAdressKey] = currentAdress;
    setAdresses(adr);
  };

  const getAdress = (x = true) => {
    setTimeout(async () => {
      await axios
        .get(
          process.env.REACT_APP_API_URL +
            "/plugins/getbyref/" +
            Element.getAttribute("id")
        )
        .then((response) => {
          setAdresses(
            response.data.data != null ? response.data.data.options.items : []
          );
          setConfig(response.data.data.function);
        })
        .catch((err) => {
         // console.log(err);
        });
    }, 2000);
  };
  useEffect(() => {
    if (props.editor()) {
      props.editor().on("component:selected", (component) => {
        const domElement = component.getEl();

        if (domElement.dataset.gjsType == "mapType") {
          setElement(domElement);

          setShow(true);
        } else {
          setShow(false);
        }
      });
    }
  }, [props.editor()]);

  const getMapType = async () => {
    await axios
      .get(process.env.REACT_APP_API_URL + "/plugins/getbytype/map")
      .then((response) => {
        setAvailbleMaps(response.data.data);
        setSelectedMapType(response.data.data[0]._id);
      })
      .catch((err) => {
       // console.log(err);
      });
  };
  useEffect(() => {
    if (Element) {
      getAdress();
    }

    //  getMapType();
  }, [Element]);
  useEffect(() => {
    console.log(Adresses);
  }, [Adresses, currentAdress, currentAdressKey, config]);

  return (
    <div>
      <Offcanvas
        show={show}
        onHide={handleClose}
        placement={"end"}
        className="offcanvas offcanvas-end "
        id="offcanvasImg"
        aria-labelledby="offcanvasRightLabel"
      >
        <div className="offcanvas-header">
          <button
            type="button"
            className="btn-close text-reset"
            onClick={(e) => handleClose()}
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body text-light">
          <select
            className={"form-select form-select-sm"}
            aria-label=".form-select-sm example"
            value={SelectedMapType}
            onChange={(e) => setSelectedMapType(e.target.value)}
          >
            {AvailbleMaps?.map((typeMap, index) => {
              return (
                <option key={index} value={typeMap._id}>
                  {typeMap.name}
                </option>
              );
            })}
          </select>

          <div className="d-flex justify-content-between align-items-center mt-3">
            <div>Zoom :</div>
            <div className="form-group">
              <input
                className="form-control"
                type="number"
                value={config.zoom}
                onChange={(e) => [
                  setCurrentAdress({
                    ...setConfig({ ...config, zoom: e.target.value }),
                  }),
                ]}
              />
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center mt-3">
            <div>Controle Zoom</div>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                checked={config.zoomControl}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    zoomControl: e.target.checked,
                  })
                }
              />
            </div>
          </div>
          <div
            className={
              config.zoomControl
                ? "d-flex justify-content-between align-items-center mt-3"
                : "d-none"
            }
          >
            <div>Max Zoom :</div>
            <div className="form-group">
              <input
                className="form-control"
                type="number"
                value={config.maxZoom}
                onChange={(e) => [
                  setCurrentAdress({
                    ...setConfig({ ...config, maxZoom: e.target.value }),
                  }),
                ]}
              />
            </div>
          </div>
          <div
            className={
              config.zoomControl
                ? "d-flex justify-content-between align-items-center mt-3"
                : "d-none"
            }
          >
            <div>Min Zoom :</div>
            <div className="form-group">
              <input
                className="form-control"
                type="number"
                value={config.minZoom}
                onChange={(e) => [
                  setCurrentAdress({
                    ...setConfig({ ...config, minZoom: e.target.value }),
                  }),
                ]}
              />
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center mt-3">
            <div>Scroll Roulette</div>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                checked={config.scrollwheel}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    scrollwheel: e.target.checked,
                  })
                }
              />
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center mt-3">
            <div>Vue du rue</div>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                checked={config.streetView}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    streetView: e.target.checked,
                  })
                }
              />
            </div>
          </div>
          <div className="d-flex justify-content-between w-100 mb-3">
            <div className="w-100">Adresse :</div>
            <div className="addIcon" onClick={(e) => addAdress()}>
              <i className="fas fa-plus-circle"></i>
            </div>
          </div>
          {Adresses?.map((adr, key) => {
            return (
              <div key={key}>
                <div className="marker-options mt-3">Marker {key + 1} </div>
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <div>Adresse :</div>
                  <div className="form-group">
                    <input
                      className="form-control"
                      type="text"
                      value={
                        currentAdressKey == key ? currentAdress.text : adr.text
                      }
                      onFocus={(e) => [
                        setCurrentAdressKey(key),
                        setCurrentAdress(adr),
                      ]}
                      onChange={(e) => [
                        setCurrentAdress({
                          ...currentAdress,
                          text: e.target.value,
                        }),
                        changeAdresse(),
                      ]}
                    />
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <div>Latitude :</div>
                  <div className="form-group">
                    <input
                      className="form-control"
                      type="number"
                      value={
                        currentAdressKey == key ? currentAdress.lat : adr.lat
                      }
                      onFocus={(e) => [
                        setCurrentAdressKey(key),
                        setCurrentAdress(adr),
                      ]}
                      onChange={(e) => [
                        setCurrentAdress({
                          ...currentAdress,
                          lat: e.target.value,
                        }),
                        changeAdresse(),
                      ]}
                    />
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <div>Longitude :</div>
                  <div className="form-group">
                    <input
                      className="form-control"
                      type="number"
                      value={
                        currentAdressKey == key ? currentAdress.lang : adr.lang
                      }
                      onFocus={(e) => [
                        setCurrentAdressKey(key),
                        setCurrentAdress(adr),
                      ]}
                      onChange={(e) => [
                        setCurrentAdress({
                          ...currentAdress,
                          lang: e.target.value,
                        }),
                        changeAdresse(),
                      ]}
                    />
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <div>Zone :</div>
                  <div className="form-group">
                    <input
                      className="form-control"
                      type="number"
                      value={
                        currentAdressKey == key ? currentAdress.zone : adr.zone
                      }
                      onFocus={(e) => [
                        setCurrentAdressKey(key),
                        setCurrentAdress(adr),
                      ]}
                      onChange={(e) => [
                        setCurrentAdress({
                          ...currentAdress,
                          zone: e.target.value,
                        }),
                        changeAdresse(),
                      ]}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Offcanvas>
    </div>
  );
}
