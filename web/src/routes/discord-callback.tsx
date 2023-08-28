/**
 * Path: www.local.xyz/discord-callback
 * Description: Discord callback handler, handles the code from the discord fallback link
 */
import React, { useEffect } from "react";
import jsonform from "@lib/form/jsonform";
import config from "@assets/config";
import Cookies from "js-cookie";
import loginAction from "@root/lib/method/loginAction";
import FlexRow from "@root/lib/element/FlexRow";
import styling from "@assets/styling.module.css";
import LoadingAnimated from "@root/lib/element/LoadingAnimated";

const attempt_discord_callback = async (): Promise<void> => {
  const discord_code: string | null = new URLSearchParams(window.location.search).get("code");
  let _session: any = undefined;
  try {
    const _sessionResponse = await fetch(`${config.backendUrl}/discord-callback`, jsonform("post", { code: discord_code }));
    _session = await _sessionResponse.json();
  } catch (e) {
    new loginAction().setError("error", "Failed to login", "1020");
    window.close();
  }

  if ("session" in _session) {
    Cookies.set("session", _session["session"], { expires: _session["expires_in"] });
    new loginAction().setAction("refresh");
  }
  window.close();
};

const DiscordCallback: React.FC = () => {
  useEffect(() => {
    attempt_discord_callback();
  }, []);

  return (
    <FlexRow className={`${styling.fill_all} ${styling.align_items_center} ${styling.justify_content_center} ${styling.dark}`}>
      <LoadingAnimated size={30} gap={15} heightoffset={20} />
    </FlexRow>
  );
};

export default DiscordCallback;
