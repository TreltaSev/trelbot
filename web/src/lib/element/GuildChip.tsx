import React from "react";
import Text from "@lib/element/Text";
import Spacer from "@lib/element/Spacer";
import styling from "@assets/styling.module.css";

interface GuildChipProperties {
  name: string;
  image?: string;
  display?: string;
  present?: boolean;
  id?: number | string;
}

const GuildChip: React.FC<GuildChipProperties> = ({ name, image, display, present, id }) => {
  const button_color = present ? "#8C52FF" : "rgba(255,255,255,0.2)";
  const button_text: "Select" | "Invite" = present ? "Select" : "Invite";
  const _staged_url = `https://discord.com/api/oauth2/authorize?client_id=932999965498834954&permissions=20919645613303&redirect_uri=https%3A%2F%2Ftrelbot.xyz%2Fdiscord-callback&scope=bot%20applications.commands&guild_id=${id}`;

  const click = () => {
    switch (button_text) {
      case "Select":
        break;
      case "Invite":
        break;
    }
  };

  return (
    <div style={{ width: 800, minHeight: 80, padding: 20, gap: 10, borderRadius: 5 }} className={`${styling.flex_row} ${styling.align_items_center} ${styling.border_box} ${styling.darksub}`}>
      <img alt='' src={image} width={40} height={40} style={{ borderRadius: "50%" }} className={`${styling.no_shrink}`} />

      <div style={{ gap: 5 }} className={`${styling.flex_col} ${styling.justify_content_center} ${styling.align_items_start}`}>
        <Text size={14} classNames={`${styling.white_space_nowrap} ${styling.text_overflow_ellipsis} ${styling.overflow_hidden}`}>
          {name}
        </Text>
        <Text size={14} opacity='0.5'>
          {display}
        </Text>
      </div>

      <Spacer />

      <div
        style={{ cursor: "pointer", padding: "0px 10px 0px 10px", height: 35, background: button_color, borderRadius: 5 }}
        className={`${styling.flex_col} ${styling.justify_content_center} ${styling.align_items_center}`}>
        <Text size={16}>{button_text}</Text>
      </div>
    </div>
  );
};

export default GuildChip;
