import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import * as ReactDOM from "react-dom";
import { DeviceFrameset, DeviceEmulator } from "react-device-frameset";
/* import "react-device-frameset/styles/marvel-devices.min.css"; */
/* import "react-device-frameset/styles/device-emulator.min.css"; */
import logo from "../../assets/imgEditor/EditorLogo.svg";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./SitePreviewClient.css";
export default function SitePreviewClient({ className = "hide" }) {
  const navigate = useNavigate();
  const storeSite = useSelector((state) => state.site.value);
  let { siteId } = useParams();
  let [content, setContent] = useState(null);
  const [mobile, setMobile] = useState("");
  const [typeDevice, setTypeDevice] = useState("all");
  const [selectedMobile, setSelectedMobile] = useState("android");
  const setDevice = (device) => {
    Array.from(document.querySelectorAll(".devices .boutton")).forEach(
      function (el) {
        el.classList.remove("active");
      }
    );
    var el = document.getElementsByClassName(device)[0];
    el.classList.add("active");
    let elbtn = null;
    let elbtn2 = null;
    setTypeDevice(device);
    var desk = document.getElementById("desktop-device");
    var tablet = document.getElementById("tablet-device");
    var mobile = document.getElementById("mobile-device");
    var mobileios = document.getElementById("mobile-device-ios");
    var mobileiosland = document.getElementById("mobile-device-ios-land");
    switch (device) {
      case "mobile":
        setMobile("mobile");

        changePreview();
        setContent(
          process.env.REACT_APP_MEDIA_URL + "previewsite/mobile/" + siteId
        );
        desk.style.display = "none";
        tablet.style.display = "none";
        mobileios.style.display = "none";
        mobileiosland.style.display = "none";
        mobile.style.display = "block";
        mobile.style.transform = "none";
        desk.classList.remove("active")
        tablet.classList.remove("active")
        mobileios.classList.add("active")
        mobileiosland.classList.add("active")
        mobile.classList.add("active")
      
        break;
      case "tablet":
        // props.perview(false);

        setMobile("");
        setContent(
          process.env.REACT_APP_MEDIA_URL + "previewsite/tablet/" + siteId
        );
        desk.style.display = "none";
        tablet.style.display = "block";
        tablet.style.transform = "none";
        mobile.style.display = "none";
        mobileios.style.display = "none";
        mobileiosland.style.display = "none";
        desk.classList.remove("active")
        tablet.classList.add("active")
        mobileios.classList.remove("active")
        mobileiosland.classList.remove("active")
        mobile.classList.remove("active")

        break;
      case "desktop":
        setMobile("");
        setContent(
          process.env.REACT_APP_MEDIA_URL + "previewsite/desktop/" + siteId
        );
        desk.style.display = "block";
        desk.style.transform = "none";
        tablet.style.display = "none";
        mobile.style.display = "none";
        mobileios.style.display = "none";
        mobileiosland.style.display = "none";

        desk.classList.add("active")
        tablet.classList.remove("active")
        mobileios.classList.remove("active")
        mobileiosland.classList.remove("active")
        mobile.classList.remove("active")
        break;
      case "all":
        setMobile("");
        setContent(
          process.env.REACT_APP_MEDIA_URL + "previewsite/all/" + siteId
        );

        desk.style.display = "block";
        tablet.style.display = "block";
        mobile.style.display = "block";
        mobileios.style.display = "none";
        mobileiosland.style.display = "none";

        desk.classList.remove("active")
        tablet.classList.remove("active")
        mobileios.classList.remove("active")
        mobileiosland.classList.remove("active")
        mobile.classList.remove("active")

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
      setContent(null);
    } else {
      if (document.getElementById("EditorRightSidebar")) {
        document
          .getElementById("EditorRightSidebar")
          .classList.remove("active");
      }

      setContent(
        process.env.REACT_APP_MEDIA_URL +
          "previewsite/" +
          typeDevice +
          "/" +
          siteId
      );
    }
  }, [className]);
  useEffect(() => {
  }, [content]);
  useEffect(() => {
  }, [typeDevice]);

  const changeMobile = (e) => {
    setSelectedMobile(e);
  };
  useEffect(() => {
    var desk = document.getElementById("desktop-device");
    var tablet = document.getElementById("tablet-device");
    var mobile = document.getElementById("mobile-device");
    var mobileios = document.getElementById("mobile-device-ios");
    var mobileiosland = document.getElementById("mobile-device-ios-land");
    switch (selectedMobile) {
      case "android":
        desk.style.display = "none";
        tablet.style.display = "none";
        mobile.style.display = "block";
        mobileios.style.display = "none";
        mobileiosland.style.display = "none";
        break;

      case "ios":
        desk.style.display = "none";
        tablet.style.display = "none";
        mobile.style.display = "none";
        mobileios.style.display = "block";
        mobileiosland.style.display = "none";
        break;
      case "portrait":
        desk.style.display = "none";
        tablet.style.display = "none";
        mobile.style.display = "none";
        mobileios.style.display = "none";
        mobileiosland.style.display = "block";
        break;

      default:
        break;
    }
  }, [selectedMobile]);
  useEffect(() => {
    var desk = document.getElementById("desktop-device");
    var tablet = document.getElementById("tablet-device");
    var mobile = document.getElementById("mobile-device");
    var mobileios = document.getElementById("mobile-device-ios");
    var mobileiosland = document.getElementById("mobile-device-ios-land");
    desk.style.display = "block";
    tablet.style.display = "block";
    mobile.style.display = "block";
    mobileios.style.display = "none";
    mobileiosland.style.display = "none";

    var el = document.getElementsByClassName(typeDevice)[0];
    el.classList.add("active");
  }, []);
  return (
    <div id="previewSingle">
      <div id="EditorTopbar">
        <div className="d-flex  justify-content-center w-100 divicess">
          <div className="logo">
            <a href="/" title="YellowSmith">
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
              <div className={mobile == "mobile" ? "d-flex" : "d-none"}>
                <div
                  className={
                    selectedMobile == "ios"
                      ? "typeMobile selected"
                      : "typeMobile"
                  }
                  onClick={(e) => changeMobile("ios")}
                >
                  <i class="fab fa-apple"></i>
                </div>
                <div
                  className={
                    selectedMobile == "android"
                      ? "typeMobile selected"
                      : "typeMobile"
                  }
                  onClick={(e) => changeMobile("android")}
                >
                  <i class="fab fa-android"></i>
                </div>
                <div
                  className={
                    selectedMobile == "portrait"
                      ? "typeMobile selected"
                      : "typeMobile"
                  }
                  onClick={(e) => changeMobile("portrait")}
                >
                  <i class="fas fa-undo-alt"></i>
                </div>
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
                <iframe height={"100%"} src={content} width="992"></iframe>
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
                  src={
                    typeDevice == "all"
                      ? content?.replace("all", "tablet")
                      : content
                  }
                  width="768"
                  
                ></iframe>
              </DeviceFrameset>
              <div>
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
                    src={
                      typeDevice == "all"
                        ? content?.replace("all", "mobile")
                        : content
                    }
                    width="400"
                  ></iframe>
                </DeviceFrameset>
              </div>

              <DeviceFrameset
                device="iPhone 8"
                id="mobile-device-ios"
                color="silver"
              >
                <iframe
                  height={"100%"}
                  src={
                    typeDevice == "all"
                      ? content?.replace("all", "mobile")
                      : content
                  }
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
                  src={
                    typeDevice == "all"
                      ? content?.replace("all", "mobile")
                      : content
                  }
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
