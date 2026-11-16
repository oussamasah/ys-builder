import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./TemplatePreview.css";
import logo from "../../assets/imgEditor/EditorLogo.svg";
import { useSelector } from "react-redux";
import { DeviceFrameset } from "react-device-frameset";
export default function TemplatePreview({ className = "hide" }) {
  let { Id } = useParams();
  const [data, setData] = useState();
  const navigate = useNavigate();
  const storeSite = useSelector((state) => state.site.value);
  const setDevice = (device) => {
    Array.from(document.querySelectorAll(".devices .boutton")).forEach(
      function (el) {
        el.classList.remove("active");
      }
    );

    let elbtn = null;
    let elbtn2 = null;
    switch (device) {
      case "mobile":
        //  props.perview(false);
        // deviceManager.select("mobileLandscape");
        elbtn = document.getElementsByClassName("mobile");
        elbtn2 = document.getElementsByClassName("mobile-preiew");

        elbtn[0].classList.add("active");
        elbtn2[0].classList.add("active");
        changePreview();
        break;
      case "tablet":
        // props.perview(false);
        // deviceManager.select("tablet");
        elbtn = document.getElementsByClassName("tablet");
        elbtn2 = document.getElementsByClassName("tablette-preiew");

        elbtn[0].classList.add("active");
        elbtn2[0].classList.add("active");

        break;
      case "desktop":
        elbtn = document.getElementsByClassName("desktop");
        elbtn2 = document.getElementsByClassName("desktop-preiew");

        elbtn[0].classList.add("active");
        elbtn2[0].classList.add("active");

        break;
      case "all":
        elbtn = document.getElementsByClassName("all");
        elbtn2 = document.getElementsByClassName("all-preiew");
        elbtn[0].classList.add("active");
        elbtn2[0].classList.add("active");
        break;
      default:
        elbtn = document.getElementsByClassName("all");
        elbtn2[0].classList.add("active");
        break;
    }
  };
  const [showPreview, setshowPreview] = useState(false);

  const changePreview = (e) => {
    setshowPreview(e);
  };
  useEffect(() => {
    if (className == "hide") {
      setData(null);
    } else {
      if (document.getElementById("EditorRightSidebar")) {
        document
          .getElementById("EditorRightSidebar")
          .classList.remove("active");
      }
    }
  }, [className]);
  useEffect(() => {
    setDevice("all");
  }, [data]);

  return (
    <div id="previewSingle">
      <div id="EditorTopbar">
        <div className="d-flex  justify-content-center w-100 divicess">
          <div className="logo">
            <a href="/sites/templates" title="YellowSmith">
              <img src={logo} alt="YellowSmith" />
            </a>
          </div>

          <div>
            <div className="devices">
              <div
                className="all boutton"
                onClick={(e) => {
                  setDevice("all");
                }}
              >
                <a
                  href="javascript:void(0)"
                  title="Affichage sur tous les appareils"
                >
                  <i className="fal fa-phone-laptop"></i>
                </a>
              </div>
              <div
                className="desktop boutton"
                onClick={(e) => {
                  setDevice("desktop");
                }}
              >
                <a
                  href="javascript:void(0)"
                  title="Afficher/Modifier sur ordinatuer"
                >
                  <i className="fal fa-desktop"></i>
                </a>
              </div>
              <div
                className="tablet boutton"
                onClick={(e) => {
                  setDevice("tablet");
                }}
              >
                <a
                  href="javascript:void(0)"
                  title="Afficher/Modifier sur tablette"
                >
                  <i className="fal fa-tablet"></i>
                </a>
              </div>
              <div
                className="mobile boutton"
                onClick={(e) => {
                  setDevice("mobile");
                }}
              >
                <a
                  href="javascript:void(0)"
                  title="Afficher/Modifier sur mobile"
                >
                  <i className="fal fa-mobile"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="EditorComponent ">
          <div id="PreviewClient" className="devices">
            <div className="all-preiew boutton">
              <DeviceFrameset
                device="MacBook Pro"
                id="desktop-device"
                color="black"
                zoom={0.7}
                width={1500}
              >
                <iframe
                  height={"100%"}
                  src={process.env.REACT_APP_MEDIA_URL + "template/" + Id}
                  width="992"
                ></iframe>
              </DeviceFrameset>

              <DeviceFrameset
                device="iPad Mini"
                id="tablet-device"
                color="black"
                width={768}
                zoom={0.6}
                height={970}
              >
                <iframe
                  height={"100%"}
                  src={process.env.REACT_APP_MEDIA_URL + "template/" + Id}
                  width="768"
                ></iframe>
              </DeviceFrameset>

              <DeviceFrameset
                device="Samsung Galaxy S5"
                id="mobile-device"
                color="black"
                width={400}
                height={780}
                zoom={0.7}
              >
                <iframe
                  height={"100%"}
                  src={process.env.REACT_APP_MEDIA_URL + "template/" + Id}
                  width="400"
                ></iframe>
              </DeviceFrameset>

              <DeviceFrameset
                device="iPhone 8"
                id="mobile-device-ios"
                color="silver"
              >
                <iframe
                  height={"100%"}
                  src={process.env.REACT_APP_MEDIA_URL + "template/" + Id}
                  width="100%"
                ></iframe>
              </DeviceFrameset>

              <DeviceFrameset
                device="iPhone 8"
                id="mobile-device-ios-land"
                color="silver"
                landscape
              >
                <iframe
                  height={"100%"}
                  src={process.env.REACT_APP_MEDIA_URL + "template/" + Id}
                  width="100%"
                ></iframe>
              </DeviceFrameset>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
