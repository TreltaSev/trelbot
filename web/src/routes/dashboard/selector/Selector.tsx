import FlexColumn from "@root/lib/component/FlexColumn";
import styling from "@assets/styling.module.css";
import custom from "@assets/custom.module.css";

import guild_selector from "@root/lib/types/guild@selector";
import mutgl from "@root/lib/vars/mutgl";
import React, { useEffect, useState } from "react";
import Text from "@root/lib/component/Text";
import AlternativeIf from "@root/lib/component/AlternativeIf";
import GuildChip from "./GuildChip";

const Selector: React.FC = () => {
  const [guilds, setGuilds] = useState<guild_selector[] | undefined>(undefined);
  {
    /**
     * This useEffect should loop every 500ms to check if the user has invited the
     * bot to a guild, if they have then transfer the user to that guild's dashbaord url.
     */
  }
  useEffect(() => {
    mutgl.rc_guild(true).then((fgResponse) => {
      setGuilds(fgResponse);
    });
  }, []);
  return (
    <FlexColumn style={{ gap: 40 }} className={`${styling.justify_content_center} ${styling.align_items_center}`}>
      {/**
       * Text Group Containing Select and Choose Information
       */}
      <FlexColumn style={{ gap: 5 }} className={`${styling.align_items_center} ${custom.dashboard_select_text_padding}`}>
        <Text preset='normal' style={{ fontSize: 24, fontWeight: "700" }}>
          Select a Server
        </Text>
        <Text preset='normal' style={{ fontSize: 24, opacity: "0.5" }} className={styling.text_align_center}>
          Choose a server by hitting the select or invite buttons!
        </Text>
      </FlexColumn>

      <FlexColumn style={{ gap: 10 }}>
        <AlternativeIf input_value={guilds} alternative={<></>} to_check={undefined}>
          {guilds?.map((guild) => (
            <GuildChip guild={guild} key={`${guild.id}/select`} />
          ))}
        </AlternativeIf>
      </FlexColumn>
    </FlexColumn>
  );
};

export default Selector;
