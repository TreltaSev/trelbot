import React, { useEffect, useState } from "react";
import styling from "@assets/styling.module.css";
import Text from "@lib/element/Text";
import GuildChip from "@lib/element/GuildChip";
import sortGuildsAsMutable from "@lib/method/sortGuildsAsMutable";
import { form } from "@lib/types/sizes";
import guild from "@lib/types/guild";
import custom from "@assets/custom.module.css";
import cache_guilds from "@lib/method/cache@guilds";
import LoadingAnimated from "@lib/element/LoadingAnimated";
import FlexColumn from "@lib/element/FlexColumn";

const DashboardSelector: React.FC = () => {
  const [guilds, setGuilds] = useState<guild[] | undefined>(undefined);

  /*
  This use effects loops every 500 ms checking if /guild-oauth created an entry to refresh to. 
  */
  useEffect(() => {
    cache_guilds().then((get_guilds: guild[]) => {
      setGuilds(get_guilds);
    });
    const refreshInterval = setInterval(() => {
      const selector_action: string | null = localStorage.getItem("selector_action?");
      const selector_redirect: string | null = localStorage.getItem("selector_redirect?");
      if (selector_action === "redirect" && selector_redirect !== null) {
        localStorage.removeItem("selector_action?");
        localStorage.removeItem("selector_redirect?");
        window.location.href = selector_redirect;
        clearInterval(refreshInterval);
      }
    }, 500);
  }, []);

  if (guilds === undefined) {
    return (
      <FlexColumn className={`${styling.fill_all} ${styling.align_items_center} ${styling.justify_content_center}`}>
        <LoadingAnimated size={30} gap={15} heightoffset={20}/>
      </FlexColumn>
    );
  }

  sortGuildsAsMutable(guilds);

  return (
    <div style={{ gap: 40 }} className={`${styling.flex_col} ${styling.justify_content_center} ${styling.align_items_center}`}>
      {/* Text Group */}
      <div style={{ gap: 5 }} className={`${styling.flex_col} ${styling.align_items_center} ${custom.dashboard_select_text_padding}`}>
        <Text preset='normal' style={{ fontSize: form(30, 24), fontWeight: "700" }}>
          Select a Server
        </Text>
        <Text preset='normal' style={{ fontSize: form(30, 24), opacity: "0.5" }} className={styling.text_align_center}>
          Choose a server by hitting the select or invite buttons!
        </Text>
      </div>

      {/* Guilds */}
      <div style={{ gap: 10 }} className={`${styling.flex_col}`}>
        {guilds === undefined ? <></> : guilds.map((guild) => <GuildChip name={guild.name} image={guild.icon_url} display={guild.display} present={guild.present} id={guild.id} key={`${guild.id}/select`} />)}
        <div style={{ height: 40, width: 40, content: "", background: "transparent" }} />
      </div>
    </div>
  );
};

export default DashboardSelector;
