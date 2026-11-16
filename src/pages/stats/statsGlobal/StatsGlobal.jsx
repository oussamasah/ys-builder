import React from "react";
import "../statsClient/StatsClient.css"
import Topbars from "../../../components/Topbars/Topbars";
import StatistiqueGlobal from "../../../components/StatistiqueGlobal/StatistiqueGlobal";

export default function StatsGlobal() {
  return (
    <div className="bodys">
    <Topbars/>
       <StatistiqueGlobal />
    </div>
  );
}
