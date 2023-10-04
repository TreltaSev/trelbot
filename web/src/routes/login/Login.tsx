import React, { useEffect } from "react";
import action from "@lib/method/action";
import defaultValue from "@lib/method/defaultValue";
import styling from "@assets/styling.module.css";
import custom from "@assets/custom.module.css";
import FlexColumn from "@lib/component/FlexColumn";
import PartialLogo from "@lib/svg/PartialLogo";
import Text from "@lib/component/Text";
import LoginButton from "@root/routes/login/LoginButton";
/**
 * @path : www.domain.tld/login
 * @description : Login page that allows entry to the backend api with a discord oauth integration.
 *
 */
const Login: React.FC = () => {
  /**
   * Loops every so often to check for "actions"
   * Actions allow a different route or site to communicate with this component via
   * the local storage api.
   */
  useEffect(() => {
    const action_check_interval = setInterval(() => {
      switch (defaultValue(new action().get("/login"), null, null)) {
        // If the action is "refresh", go back to previous page or /dashboard
        case "refresh":
          clearInterval(action_check_interval);
          const _href = new action().get("/login-path");
          new action().remove("/login");
          new action().remove("/login-path");
          location.href = _href === null ? "/dashboard" : _href;
          break;
        case "error":
          console.error("Error has been had");
          break;
        case null:
          break;
      }
    }, 500);
  }, []);

  return (
    <FlexColumn className={`${styling.dark} ${styling.justify_content_center} ${styling.align_items_center} ${styling.fill_height}`}>
      <FlexColumn style={{ gap: 15 }} className={`${styling.justify_content_center} ${styling.align_items_center}`}>
        <PartialLogo />
        <Text preset='1em-normal'>Welcome to Trelbot</Text>
        <Text preset='1em-normal' style={{ opacity: "0.5", textAlign: "center" }} className={custom.login_text}>
          A discord bot with a (soon to be) small variety of games, automation messages, multiple commands for moderation and some funnies ;)
        </Text>
        <LoginButton />
      </FlexColumn>
    </FlexColumn>
  );
};

export default Login;
