import React from "react";
import SiteList from "../../components/siteList/siteList";
//import Topbar from "../../components/Topbar/Topbar";
import "./sites.css";
import Topbars from "../../components/Topbars/Topbars";

export default function sites() {
  return (
    <div className="bodys">
    <Topbars/>
      <SiteList />
    </div>
  );
}
