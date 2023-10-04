import React, { useEffect, useState } from "react";
import styling from "@assets/styling.module.css";
import custom from "@assets/custom.module.css";
import FlexColumn from "@root/lib/component/FlexColumn";
import guild_selector from "@root/lib/types/guild@selector";
import mutgl from "@root/lib/vars/mutgl";
import Text from "@root/lib/component/Text";
import AlternativeIf from "@root/lib/component/AlternativeIf";
import action from "@root/lib/method/action";
import LoadingAnimated from "@root/lib/component/LoadingAnimated";
import SortGuildsAsMutable from "./SortGuildsAsMutable";
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
    const iGuild = setInterval(() => {
      const [_action, _redirect] = new action().bulk_get(["gSelectorAction", "gSelectorRedirect"]);
      switch (_action) {
        case "redirect":
          new action().bulk_remove(["gSelectorAction", "gSelectorRedirect"]);
          window.location.href = _redirect;
          clearInterval(iGuild);
      }
    }, 500);
  }, []);

  if (guilds) {
    // Sort the guilds, prioritizing invitable and owned guilds.
    SortGuildsAsMutable(guilds);
  } else {
    return (
      <FlexColumn style={{ padding: 20 }} className={`${styling.fill_all} ${styling.align_items_center} ${styling.border_box}`}>
        <LoadingAnimated size={30} gap={15} heightoffset={20} />
      </FlexColumn>
    );
  }

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

      {/**
       * Guilds list.
       */}
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
