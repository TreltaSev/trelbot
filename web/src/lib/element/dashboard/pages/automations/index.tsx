import React from "react";
import OnBan from "@lib/element/dashboard/pages/automations/OnBan";
import OnJoin from "@lib/element/dashboard/pages/automations/OnJoin";
import OnLeave from "@lib/element/dashboard/pages/automations/OnLeave";
import { loader, register_parent } from "@lib/element/dashboard/loader";
import FlexColumn from "@root/lib/element/FlexColumn";
import styling from "@assets/styling.module.css";

export const channels = React.createContext<null>(null);
export const roles = React.createContext<null>(null);

const Automations: React.FC = () => {
  return (
    <FlexColumn style={{width: 800, padding: 30, gap: 25, borderRadius: 5}} className={`${styling.align_items_flex_start} ${styling.darksub} ${styling.border_box}`}>
      <OnJoin/>
      <OnLeave/>
      <OnBan/>
    </FlexColumn>
  )
}

register_parent("Automations", undefined);
loader("automations", <Automations />, "Automations", 1);

