import Cookies from "js-cookie";
import guild from "@lib/types/guild";
import config from "@assets/config";
import errorCatcher from "@lib/method/errorCatcher";
import nli_transfer from "@lib/method/nli_transfer";

const cache_guilds = async (set?: (guilds: guild[]) => void): Promise<guild[]> => {
  const session = Cookies.get("session");
  nli_transfer(session);

  const _request: RequestInit = { method: "get", headers: { Session: session as string } };
  const _guildsResponse = await fetch(`${config.backendUrl}/@me/guilds`, _request);
  const _guilds = await _guildsResponse.json();

  if (errorCatcher(_guilds)) {
    throw new Error(`Response contains error for @me/guilds in json ${_guilds}`);
  }

  if (set) {
    set(_guilds);
  }

  return _guilds;
};

export default cache_guilds;
