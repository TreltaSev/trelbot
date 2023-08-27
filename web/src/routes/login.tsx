/**
 * Path: www.local.xyz/login
 * Description: Its a login page that always displays if the user isn't logged in.
 */
import React, { useEffect, useState } from "react";

/* Assets */
import styling from "@assets/styling.module.css";
import custom from "@assets/custom.module.css";

/* Lib Templates */
import DefaultTemplate from "@lib/templates/DefaultTemplate";

/* Lib Svg */
import PartialLogo from "@lib/svg/PartialLogo";
import DiscordLogo from "@lib/svg/DiscordLogo";

/* Lib Element */
import Text from "@root/lib/element/Text";
import loginAction from "@root/lib/method/loginAction";

const DiscordLoginButton = () => {
  const redirectLogin = () => {
    const width: number = 500;
    const height: number = 700;
    const authorize_url = "https://discord.com/api/oauth2/authorize?client_id=932999965498834954&redirect_uri=https%3A%2F%2Ftrelbot.xyz%2Fdiscord-callback&response_type=code&scope=identify%20guilds";
    window.open(authorize_url, "_blank", `width=${width}, height=${height}`);
  };
  return (
    <div onClick={() => redirectLogin()} style={{ borderRadius: 10, gap: 10, padding: "10px 20px" }} className={`${custom.button} ${custom.discordlogin} ${custom.discordbutton} ${styling.flex_row} ${styling.justify_content_center} ${styling.align_items_center} ${styling.border_box}`}>
      <DiscordLogo />
      <Text preset='1em-normal'>Login with Discord</Text>
    </div>
  );
};

type errorTypes = {
  active: boolean;
  message?: string | null;
  code?: string | null;
};

const Error: React.FC<errorTypes> = ({ active, message, code }) => {
  return (
    <div style={{ maxWidth: 200, minWidth: 100, padding: 10, position: "absolute", bottom: 50, right: 50 }} className={`${styling.flex_col} ${styling.border_box} ${styling.justify_content_center} ${styling.align_items_center}`}>
      <div style={{ borderBottom: "1px solid rgba(255,255,255,0.5)", padding: "2px 0px" }} className={`${styling.flex_row} ${styling.align_items_start} ${styling.fill_width}`}>
        <Text preset='normal' style={{ fontSize: 10 }}>
          Notice
        </Text>
      </div>
      <Text preset='normal' style={{ fontSize: 10, opacity: "0.5" }}>
        {message} #{code}
      </Text>
    </div>
  );
};

const Login: React.FC = () => {
  const [error, setError] = useState<errorTypes>({ active: false });

  useEffect(() => {
    const refreshInterval = setInterval(() => {
      const login_action: string | null = new loginAction().getAction();

      if (login_action === "refresh") {
        sessionStorage.removeItem("login_action?");
        clearInterval(refreshInterval);
        location.href = "/dashboard";
      }

      if (login_action === "error") {
        // Display an error
        const _error = new loginAction().getError();

        setError({ active: true, message: _error.login_error_message, code: _error.login_error_code });
        const _timeout = setTimeout(() => {
          setError({ active: false });
          clearTimeout(_timeout);
        }, 50 * 1000);

        // Clear sessionStorage of errors
        new loginAction().removeError();
      }
    }, 500);
  }, []);

  return (
    <DefaultTemplate classNames={`${styling.dark} ${styling.flex_col} ${styling.justify_content_center} ${styling.align_items_center}`}>
      {/* Container */}

      <div style={{ gap: 15, padding: 30 }} className={`${styling.fill_width} ${styling.flex_col} ${styling.justify_content_center} ${styling.align_items_center} ${styling.border_box}`}>
        {/* Logo from global.tsx */}
        <PartialLogo />

        {/* Text under logo */}
        <Text preset='1em-normal'>Welcome to Trelbot</Text>
        <Text preset='1em-normal' style={{ opacity: "0.5" }} className={`${custom.login_text}`}>
          A discord bot with a (soon to be) small variety of games, automation messages, multiple commands for moderation and some funnies ;)
        </Text>

        {/* Login Button */}
        <DiscordLoginButton />
      </div>

      {error.active === false ? <></> : <Error active={true} message={error.message} code={error.code} />}
    </DefaultTemplate>
  );
};

export default Login;
