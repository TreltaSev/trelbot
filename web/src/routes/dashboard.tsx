/**
 * Path: www.local.xyz/dashboard
 * Description: Dashboard, look in github
 */

import NavigationTemplate from "@lib/templates/NavigationTemplate";
import React from "react";
import { useParams } from "react-router-dom";
import styling from "@assets/styling.module.css";
import { useMe } from "@components/Global";
import me from "@root/lib/types/me";

type DashType = "selector" | "editor";

const Selector: React.FC = () => {
  const meData: me = useMe();
  
  if (meData.attempted == false) {
    return <div>Loading</div>
  }

  return <div>Selector</div>;
};

const Editor: React.FC = () => {
  return <div>Editor</div>;
};

const Dashboard: React.FC = () => {
  let { guildId } = useParams();

  const DashType: DashType = guildId === undefined ? "selector" : "editor";

  switch (DashType) {
    case "selector":
      return (
        <NavigationTemplate classNames={`${styling.dark}`}>
          <Selector />
        </NavigationTemplate>
      );

    case "editor":
      return (
        <NavigationTemplate classNames={`${styling.dark}`}>
          <Editor />
        </NavigationTemplate>
      );
  }
};

export default Dashboard;
