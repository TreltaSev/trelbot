import React from "react";
import FlexRow from "@lib/component/FlexRow";
import styling from "@assets/styling.module.css";
import custom from "@assets/custom.module.css";
import DiscordLogo from "@lib/svg/DiscordLogo";
import Text from "@lib/component/Text";

/**
 * A login button for the login page, when clicked,
 * opens a new window that goes to the redirect authorize url.
 * The authorize url once logged in will go to the /discord-callback end point, at
 * which point /discord-callback component will be used.
 * @usedin : @path : www.domain.tld/login
 */
const LoginButton: React.FC = () => {
  return (
    <FlexRow style={{ borderRadius: 10, gap: 10, padding: "10px 20px" }} className={`${custom.button} ${custom.discordlogin} ${styling.justify_content_center} ${styling.align_items_center} ${styling.border_box}`}>
      <DiscordLogo />
      <Text preset='1em-normal'>Login with Discord</Text>
    </FlexRow>
  );
};

export default LoginButton;
