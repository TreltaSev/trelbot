import React, { useEffect } from "react";
import action from "@lib/method/action";
import defaultValue from "@lib/method/defaultValue";
import styling from "@assets/styling.module.css";
import custom from "@assets/custom.module.css";
import FlexColumn from "@lib/component/FlexColumn";
import PartialLogo from "@lib/svg/PartialLogo";
import Text from "@lib/component/Text";
import LoginButton from "@root/routes/login/LoginButton";
import FlexRow from "@root/lib/component/FlexRow";
import LoadingAnimated from "@root/lib/component/LoadingAnimated";
import post_discord_callback from "./post_discord_callback";
/**
 * @path : www.domain.tld/discord-callback
 * @description : Handles post request to backend api to access session token
 *
 */
const DiscordCallback: React.FC = () => {
  /**
   * Attempts to send a post request to the backend api, then refreshses origional
   * page if everything goes ok.
   */
  useEffect(() => {
    post_discord_callback();
  }, []);

  return (
    <FlexRow className={`${styling.fill_all} ${styling.align_items_center} ${styling.justify_content_center} ${styling.dark}`}>
      <LoadingAnimated size={30} gap={15} heightoffset={20} />
    </FlexRow>
  );
};

export default DiscordCallback;
