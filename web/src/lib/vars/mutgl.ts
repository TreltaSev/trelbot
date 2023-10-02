import Cookies from "js-cookie";
import user from "@lib/types/user";
import config from "@root/config";

/**
 * Mutable Global Variables, holds user information
 * as well as guild data, settings data, etc.
 */

class _mutgl {
  public db = {};
  public guilds = {};
  public user: user = {};

  /**
   * This method sends a request to the backend api, asking for the users information like
   * avatar urls, usernames and the like and has an optional parameter for automating "caching" which
   * saves this data to this classes public value: `user`
   *
   * @param _cache `Literal[True, False]` If set to true, caches the data to this.user, Defaults to false
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

    if (this.error_c(_me)) {
      return;
    }

    if (_cache) {
      this.user = _me;
    }

    return _me;
  };

  /**
   * Private method that checks an object for error codes
   * that would be given from backend api
   * @param input the value you want to check
   * @returns A boolean, if its true theres an error, if not there isn't
   */
  private error_c = (input: any): boolean => {
    if (input.hasOwnProperty("code")) {
      switch (input.code) {
        case 1020:
        case 1028:
          // Error found 1020/1028
          break;
        default:
          console.error(`Error, Stack: ${input}`);
          return true;
      }
    }
    return false;
  };
}

const mutgl = new _mutgl();

export default mutgl;
