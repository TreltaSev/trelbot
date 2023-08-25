import React from "react";
import DepracatedText from "@root/lib/element/DepracatedText";
import Spacer from "@lib/element/Spacer";
import styling from "@assets/styling.module.css";
import custom from "@assets/custom.module.css";

interface GuildChipProperties {
  name: string;
  image?: string;
  display?: string;
  present?: boolean;
  id?: number | string;
}

const GuildChip: React.FC<GuildChipProperties> = ({ name, image, display, present, id }) => {
  const button_text: "Select" | "Invite" = present ? "Select" : "Invite";
  const _guild_oauth_invite_url = `https://discord.com/api/oauth2/authorize?client_id=932999965498834954&permissions=20919645613303&response_type=code&redirect_uri=https%3A%2F%2Ftrelbot.xyz%2Fguild-oauth&scope=bot+applications.commands&guild_id=${id}`;

  const click = () => {
    switch (button_text) {
      case "Select":
        window.location.href = `/dashboard/${id}`;
        break;
      case "Invite":
        const width: number = 500;
        const height: number = 700;
        window.open(_guild_oauth_invite_url, "_blank", `width=${width}, height=${height}`);
        break;
    }
  };

  return (
    <div
      style={{ minHeight: 80, padding: 20, gap: 10, borderRadius: 5 }}
      className={`${styling.flex_row} ${styling.align_items_center} ${styling.border_box} ${styling.darksub} ${custom.dashboard_select_guild_chip}`}>
      <img alt='' src={image} width={40} height={40} style={{ borderRadius: "50%" }} className={`${styling.no_shrink}`} />

      <div style={{ gap: 5 }} className={`${styling.flex_col} ${styling.justify_content_center} ${styling.align_items_start}`}>
        <DepracatedText size={14} classNames={`${styling.white_space_nowrap} ${styling.text_overflow_ellipsis} ${styling.overflow_hidden}`}>
          {name}
        </DepracatedText>
        <DepracatedText size={14} opacity='0.5'>
          {display}
        </DepracatedText>
      </div>

      <Spacer />

      <div
        onClick={() => click()}
        style={{ cursor: "pointer", padding: "0px 10px 0px 10px", height: 35, borderRadius: 5 }}
        className={`${custom.button} ${styling.flex_col} ${styling.justify_content_center} ${styling.align_items_center} ${present ? custom.selectbtn : custom.invitebtn}`}>
        <DepracatedText size={16}>{button_text}</DepracatedText>
      </div>
    </div>
  );
};

export default GuildChip;
