/**
 * Path: www.local.xyz/dashboard
 * Description: Dashboard, look in github
 */
import React from "react";
import { useParams } from "react-router-dom";
import styling from "@assets/styling.module.css";
import NavigationTemplate from "@lib/templates/NavigationTemplate";
import DashboardSelector from "@lib/element/dashboard/DashboardSelector";
import DashboardEditor from "@lib/element/dashboard/DashboardEditor";

import "@lib/element/dashboard/pages/automations"
import { get } from "@root/lib/element/dashboard/loader";



type DashType = "selector" | "editor";

const Dashboard: React.FC = () => {
  let { guildId } = useParams();

  const DashType: DashType = guildId === undefined ? "selector" : "editor";

  switch (DashType) {
    case "selector":
      return (
        <NavigationTemplate classNames={`${styling.dark} ${styling.fill_all} ${styling.flex_col} ${styling.align_items_center}`}>
          <DashboardSelector />
        </NavigationTemplate>
      );

    case "editor":
      return (
        <NavigationTemplate classNames={`${styling.dark}`}>
          <DashboardEditor guild_id={guildId}/>
        </NavigationTemplate>
      );
  }
};

export default Dashboard;
