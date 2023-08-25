import React from "react";
import styling from "@assets/styling.module.css";
import FlexColumn from "@lib/element/FlexColumn";
import { get } from "@lib/element/dashboard/loader";
import guild from "@lib/types/guild";
import GuildContainer from "@lib/element/dashboard/specific/GuildContainer";
import SettingContainer from "./SettingContainer";

type type_LeftNavigationBar = {
  guild: guild | undefined
}

const LeftNavigationBar: React.FC<type_LeftNavigationBar> = ({ guild }) => {
  console.log(get())
  return (
    <FlexColumn style={{width: 250, gap:10, padding: "0 10px 0 10px", flexShrink: 0}} className={`${styling.fill_height} ${styling.align_items_center} ${styling.border_box} ${styling.dark}`}>
      <GuildContainer guild={guild}/>
      <SettingContainer name="Automations"/>
    </FlexColumn>
  );
}

export default LeftNavigationBar;