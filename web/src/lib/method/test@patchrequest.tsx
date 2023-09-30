import Cookies from "js-cookie";
import config from "@assets/config";
import guild from "@lib/types/guild";
import nli_transfer from "@lib/method/nli_transfer";

/**
 * Sends a patch request to the backend server endpoint for testing...
 * @param guild_id The guild id in question
 * @returns A promise in json format
 */
const patch_request = async (guild_id: string | number | undefined): Promise<guild> => {
  let session = Cookies.get("session");
  nli_transfer(session);

  const _patch_request: RequestInit = { method: "PATCH", headers: { "Content-Type": "application/json" }, body: "Heheheha?" };
  const _patch_response = await fetch(`${config.backendUrl}/guilds/${guild_id}/banner`, _patch_request);
  const _json = await _patch_response.json();
  return _json;
};

export default patch_request;
