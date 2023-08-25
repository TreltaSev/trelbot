import React, { useContext } from "react";
import styling from "@assets/styling.module.css";
import FlexColumn from "@lib/element/FlexColumn";
import { dashboardPage, get, parent } from "@lib/element/dashboard/loader";
import guild from "@lib/types/guild";
import GuildContainer from "@lib/element/dashboard/specific/GuildContainer";
import SettingContainer from "./SettingContainer";
import { update } from "../DashboardEditor";
import {  } from "@lib/element/dashboard/loader";

type type_LeftNavigationBar = {
  guild: guild | undefined
}

const LeftNavigationBar: React.FC<type_LeftNavigationBar> = ({ guild }) => {
  const setmethod: (((parent: parent) => void) | null) = useContext(update)
  const change = (parent: parent) => {
    if (!setmethod) {
      return
    }
    setmethod(parent);
  }
  return (
    <FlexColumn style={{width: 250, gap:10, padding: "0 10px 0 10px", flexShrink: 0}} className={`${styling.fill_height} ${styling.align_items_center} ${styling.border_box} ${styling.dark}`}>
      <GuildContainer guild={guild}/>
      {
        get().map((child) => (
          <SettingContainer onClick={() => change(child)} name={child.name} key={`${child.name}--container`}/>
        ))
      }
    </FlexColumn>
  );
}

export default LeftNavigationBar;