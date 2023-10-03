import React from "react";
import guild_selector from "@root/lib/types/guild@selector";
import FlexRow from "@root/lib/component/FlexRow";
import FlexColumn from "@root/lib/component/FlexColumn";
import Text from "@root/lib/component/Text";
import Spacer from "@root/lib/component/Spacer";
import styling from "@assets/styling.module.css";
import custom from "@assets/custom.module.css";

type typeGuildChip = {
  guild: guild_selector;
};

const GuildChip: React.FC<typeGuildChip> = ({ guild }) => {
  const ModalText: "Select" | "Invite" = guild.present ? "Select" : "Invite";
  const InviteUrl = `https://discord.com/api/oauth2/authorize?client_id=932999965498834954&permissions=20919645613303&response_type=code&redirect_uri=https%3A%2F%2Ftrelbot.xyz%2Fguild-oauth&scope=bot+applications.commands&guild_id=${guild.id}`;

  const Click = () => {
    switch (ModalText) {
      case "Select":
        window.location.href = `/dashboard/${guild.id}`;
        break;
      case "Invite":
        window.open(InviteUrl, "_blank", "width=500, height=700");
        break;
    }
  };

  return (
    <FlexRow style={{ minHeight: 80, padding: 20, gap: 10, borderRadius: 5 }} className={`${styling.align_items_center} ${styling.border_box} ${styling.darksub} ${custom.dashboard_select_guild_chip}`}>
      {/**
       * Icon Image
       */}
      <img alt='' src={guild.icon_url} width={40} height={40} style={{ borderRadius: "50%" }} className={styling.no_shrink} />

      {/**
       * Text Group
       */}
      <FlexColumn style={{ gap: 5 }} className={`${styling.justify_content_center} ${styling.align_items_start}`}>
        <Text preset='normal' style={{ fontSize: 14 }} className={`${styling.white_space_nowrap} ${styling.text_overflow_ellipsis} ${styling.overflow_hidden}`}>
          {guild.name}
        </Text>
        <Text preset='normal' style={{ opacity: "0.5" }}>
          {guild.display}
        </Text>
      </FlexColumn>

      <Spacer />

      {/**
       * Invite/Select Button
       */}
      <FlexColumn onClick={() => Click()} style={{ cursor: "pointer", padding: "0 10px", height: 35, borderRadius: 5 }} className={`${custom.button} ${styling.flex_col} ${styling.justify_content_center} ${styling.align_items_center} ${guild.present ? custom.selectbtn : custom.invitebtn}`}>
        <Text preset='1em-normal'>{ModalText}</Text>
      </FlexColumn>
    </FlexRow>
  );
};

export default GuildChip;
