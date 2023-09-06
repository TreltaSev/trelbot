import Cookies from "js-cookie";
import config from "@assets/config";
import errorCatcher from "@lib/method/errorCatcher";
import nli_transfer from "@lib/method/nli_transfer";
import channel from "@lib/types/channel";

const cache_channels = async (set?: (channels: channel[]) => void): Promise<channel[]> => {
  const session = Cookies.get("session");
  nli_transfer(session);

  const _request: RequestInit = { method: "get", headers: { Session: session as string} };
  const _channelsResponse = await fetch(`${config.backendUrl}/guilds/{guild_id}/channels`)
  const _channels = await _channelsResponse.json();

  console.log(_channels)
  return _channels;
}
