/**
 * Path: www.local.xyz/discord-callback
 * Description: Discord callback handler, handles the code from the discord fallback link
 */
import React, { useEffect } from "react";
import jsonform from "@lib/form/jsonform";
import config from "@assets/config";
import Cookies from "js-cookie";
import loginAction from "@root/lib/method/loginAction";

const DiscordCallback: React.FC = () => {
  useEffect(() => {
    const discord_code: string | null = new URLSearchParams(window.location.search).get("code");
    fetch(`${config.backendUrl}/discord-callback`, jsonform("post", { code: discord_code }))
      .then((data) => data.json())
      .then((_d) => {
        if ("session" in _d) {
          Cookies.set("session", _d["session"], { expires: _d["expires_in"] });
          new loginAction().setAction("refresh");
        }
        window.close();
      });
  }, []);

  return <></>;
};

export default DiscordCallback;
