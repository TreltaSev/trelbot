import Cookies from "js-cookie";
import config from "@assets/config";
import errorCatcher from "@lib/method/errorCatcher";
import nli_transfer from "@lib/method/nli_transfer";
import channel from "@lib/types/channel";
import { strnum } from "@lib/types/sizes";

const cache_channels = async (guild_id: strnum, set?: (channels: channel[]) => void): Promise<channel[]> => {
  const session = Cookies.get("session");
  nli_transfer(session);

  const _request: RequestInit = { method: "get", headers: { Session: session as string} };
  const _channelsResponse = await fetch(`${config.backendUrl}/guilds/${guild_id}/channels`, _request)
  const _channels = await _channelsResponse.json();

  if (errorCatcher(_channels)) {
    throw new Error(`Response contains error for /guilds/${guild_id}/channels in json ${_channels}`);
  }  

  if (set) {
    set(_channels)
  }

  const parsed: channel[] = []

  _channels.map((value: channel) => {
    parsed.push(value)
  })

  console.log(_channels)
  return parsed
}

export default cache_channels;
