import React, { useEffect, useState } from "react";
import OnBan from "@lib/element/dashboard/pages/automations/OnBan";
import OnJoin from "@lib/element/dashboard/pages/automations/OnJoin";
import OnLeave from "@lib/element/dashboard/pages/automations/OnLeave";
import { loader, register_parent } from "@lib/element/dashboard/loader";
import FlexColumn from "@lib/element/FlexColumn";
import styling from "@assets/styling.module.css";
import cache_channels from "@lib/method/cache@channels";
import channel from "@lib/types/channel";
import { useParams } from "react-router-dom";

export type type_channels_context = {
  value_channels?: channel[];
  get?: () => channel[];
};

export const channels = React.createContext<type_channels_context>({});
export const roles = React.createContext<null>(null);

const Automations: React.FC = () => {
  let { guildId } = useParams();
  const [v_channels, setChannels] = useState<channel[]>([]);

  useEffect(() => {
    cache_channels(guildId).then((cached_channels: channel[]) => {
      setChannels(cached_channels);
    });
  }, []);

  const get_channels = () => {
    return v_channels;
  };

  return (
    <channels.Provider value={{ value_channels: v_channels, get: get_channels }}>
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
