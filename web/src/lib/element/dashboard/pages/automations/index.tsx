import React, { useEffect, useState } from "react";
import OnBan from "@lib/element/dashboard/pages/automations/OnBan";
import OnJoin from "@lib/element/dashboard/pages/automations/OnJoin";
import OnLeave from "@lib/element/dashboard/pages/automations/OnLeave";
import { loader, register_parent } from "@lib/element/dashboard/loader";
import FlexColumn from "@root/lib/element/FlexColumn";
import styling from "@assets/styling.module.css";
import cache_channels from "@root/lib/method/cache@channels";
import channel from "@lib/types/channel";
import { useParams } from "react-router-dom";

export const channels = React.createContext<channel[] | undefined>(undefined);
export const roles = React.createContext<null>(null);

const Automations: React.FC = () => {
  let { guildId } = useParams();
  const [v_channels, setChannels] = useState<channel[] | undefined>(undefined);

  useEffect(() => {
    cache_channels(guildId, setChannels)
  }, []);

  return (
    <channels.Provider value={v_channels}>
      <FlexColumn style={{ width: 800, padding: 30, gap: 25, borderRadius: 5 }} className={`${styling.align_items_flex_start} ${styling.darksub} ${styling.border_box}`}>
        <OnJoin />
        <OnLeave />
        <OnBan />
      </FlexColumn>
    </channels.Provider>
  );
};

register_parent("Automations", undefined);
loader("automations", <Automations />, "Automations", 1);
