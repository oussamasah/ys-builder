import React from "react";
import "../statsClient/StatsClient.css"
import Topbars from "../../../components/Topbars/Topbars";
import StatistiqueClient from "../../../components/StatistiqueClient/StatistiqueClient";

export default function StatsClient() {
  return (
    <div className="bodys">
    <Topbars/>
       <StatistiqueClient />
    </div>
  );
}
