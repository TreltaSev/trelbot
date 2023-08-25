import React from "react";
import OnBan from "@lib/element/dashboard/pages/automations/OnBan";
import OnJoin from "@lib/element/dashboard/pages/automations/OnJoin";
import OnLeave from "@lib/element/dashboard/pages/automations/OnLeave";
import { loader, register_parent } from "@lib/element/dashboard/loader";
import FlexColumn from "@root/lib/element/FlexColumn";

const Automations: React.FC = () => {
  return (
    <FlexColumn>
      <OnJoin/>
      <OnLeave/>
      <OnBan/>
    </FlexColumn>
  )
}

register_parent("Automations", undefined);
loader("automations", <Automations />, "Automations", 1);

