import config from "@root/config";
import Cookies from "js-cookie";

/**
 * Mutable Global Variables, holds user information
 * as well as guild data, settings data, etc.
 */

class _mutgl {
  public db = {};
  public guilds = {};
  public user = {};

  /**
   * This method sends a request to the backend api, asking for the users information like
   * avatar urls, usernames and the like and has an optional parameter for automating "caching" which
   * saves this data to this classes public value: `user`
   */
  public rc_user = async (_cache: boolean = false): Promise<any> => {
    const _session = Cookies.get("session");

    // No session means, not logged in
    if (!_session) {
      console.error(`Not logged in, session: ${_session}`);
      return;
    }

    let _me: any = undefined;
    try {
      const _fetchme = await fetch(`${config.backendUrl}/@me`, { method: "get", headers: { Session: _session as string } });
      _me = await _fetchme.json();
    } catch (e) {
      console.error(`Failed in fetching ${e}`);
      return;
    }

    if (_cache) {
      this.user = _me;
    }

    console.log(_me);
    return _me;
  };
}

const mutgl = new _mutgl();

export default mutgl;
