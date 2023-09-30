import config from "@root/config";
import action from "@root/lib/method/action";
import jsonform from "@root/lib/method/jsonform";
import Cookies from "js-cookie";
/**
 * Gets the "code" param from the search bar and sends that to the backend
 * server for processing at backend/discord-callback, uses the fetch api and sends
 * data trough json. If a session is valid, meaning you got a valid respnose
 * from the backend server, then it saves that session to your cookies. If its a failure
 * it designates a error action to be used in /login.
 */
const post_discord_callback = async (): Promise<void> => {
  const _code: string | null = new URLSearchParams(window.location.search).get("code");
  let _session: any = undefined;

  // Try to get json response
  try {
    const _rep = await fetch(`${config.backendUrl}/discord-callback`, jsonform("post", { code: _code }));
    _session = await _rep.json();
  } catch (e) {
    // Display Error
    console.error(e);
  }

  // Save Session
  if ("session" in _session) {
    Cookies.set("session", _session["session"], { expires: _session["expires_in"] });
    new action().set("/login-path", "/dashboard");
    new action().set("/login", "refresh");
    window.close();
  }
};

export default post_discord_callback;
