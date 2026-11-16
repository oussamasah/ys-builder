// import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
// import * as ReactDOM from "react-dom";
import { useParams } from "react-router-dom";
import "./Sitepreview.css";
import { DeviceFrameset } from "react-device-frameset";
import "react-device-frameset/styles/marvel-devices.min.css";
import "react-device-frameset/styles/device-emulator.min.css";
export default function Sitepreview({ className = "hide" }) {
  let { siteId } = useParams();
  let [content, setContent] = useState(null);

  useEffect(() => {
    if (className == "hide") {
      setContent(null);
    } else {
      if (document.getElementById("EditorRightSidebar")) {
        document
          .getElementById("EditorRightSidebar")
          .classList.remove("active");
      }

      setContent(process.env.REACT_APP_MEDIA_URL + "previewsite/all/" + siteId);
    }
  }, [className]);
  useEffect(() => {}, [content]);

  return (
    <div id="Preview" class={className}>
              <DeviceFrameset
                device="MacBook Pro"
                id="desktop-device-e"
                color="black"
                zoom={0.7}
                width={1500}
               

              >
                <iframe height={"100%"} src={content} width="1500"></iframe>
              </DeviceFrameset>

              <DeviceFrameset
                device="iPad Mini"
                id="tablet-device-e"
                color="black"
                width={768}
                zoom={0.6}
                height={970}

              >
                <iframe
                  height={"100%"}
                  src={
                    content
                      ? content?.replace("all", "tablet")
                      : content
                  }
                  width="768"
                  
                ></iframe>
              </DeviceFrameset>
              <div>
                <DeviceFrameset
                  device="Samsung Galaxy S5"
                  id="mobile-device-e"
                  color="black"
                  width={400}
                  height={780}
                  zoom={0.7}
                >
                  <iframe
                    height={"100%"}
                    src={
                      content
                        ? content?.replace("all", "mobile")
                        : content
                    }
                    width="400"
                  ></iframe>
                </DeviceFrameset>
              </div>
    </div>
  );
}
