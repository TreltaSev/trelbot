import Cookies from "js-cookie";
import config from "@assets/config";
import guild from "@lib/types/guild";
import nli_transfer from "@lib/method/nli_transfer";

const fetch_guild = async (guild_id: string | number | undefined): Promise<guild> => {
  let session = Cookies.get("session");
  nli_transfer(session);

  const _request: RequestInit = { method: "get", headers: { Session: session as string } };
  const guild_response = await fetch(`${config.backendUrl}/guilds/${guild_id}`, _request);
  const _guild = await guild_response.json();
  return _guild;
};

export default fetch_guild;
