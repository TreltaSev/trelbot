import Cookies from "js-cookie";
import config from "@assets/config";
import nli_transfer from "./nli_transfer";

const fetch_guild = async () => {
  let session = Cookies.get("session");
  nli_transfer(session);
  
  const _request: RequestInit = { method: "get", headers: { Session: session as string } };
  const guild_id = 102361928736
  const guild_response = await fetch(`${config.backendUrl}/guilds/${guild_id}`, _request);

  const _guild = await guild_response.json()

  console.log(_guild)
  
}

export default fetch_guild;