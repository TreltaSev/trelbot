import Cookies from "js-cookie";
import user from "@lib/types/user";
import guild from "@lib/types/guild";
import config from "@root/config";

/**
 * Mutable Global Variables, holds user information
 * as well as guild data, settings data, etc.
 */

class _mutgl {
  // Placeholder value
  public db = {};

  // Used to hold mutiple guilds, really useful in `/dashboard`
  public guilds: guild[] = [];

  // User information such as id, name, and avatar url.
  public user: user = {};

  // Current Guild, Holds relevent information when guild is accessed. Must be saved first.
  public cGuild: guild = {};

  /**
   * This method sends a request to the backend api, asking for the users information like
   * avatar urls, usernames and the like and has an optional parameter for automating "caching" which
   * saves this data to this classes public value: `user`
   *
   * @param _cache `Literal[True, False]` If set to true, caches the data to this.user, Defaults to false
   */
  public rc_user = async (_cache: boolean = false): Promise<any> => {
    const _session = this.chSession();

    if (_session === undefined) {
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
   * This method sends a get request to backend.com/@me/guilds to get the guilds of the current user,
   * the response of this request should be an object containing a list which contains all the guilds.
   * Type annotations have been added
   *
   * @param bCache `Literal[True, False]` If set to true, caches the data to this.guilds, Defaults to false
   */
  public rc_guilds = async (bCache: boolean = false): Promise<any> => {
    const _session = this.chSession();

    if (_session === undefined) {
      return;
    }

    let _guilds: any = undefined;
    try {
      const _fetchguilds = await fetch(`${config.backendUrl}/@me/guilds`, { method: "get", headers: { Session: _session as string } });
      _guilds = await _fetchguilds.json();
    } catch (e) {
      console.error(`Failed in fetching ${e}`);
    }

    if (this.error_c(_guilds)) {
      return;
    }

    if (bCache) {
      this.guilds = _guilds;
    }

    return _guilds;
  };

  /**
   * This method sends a get request to backend.com/guilds/{guild.id} to get the basic guild information
   * like id, name, permissions that the current user has, icon url, etc.
   * Response type should be of type guild, if looking for `guild.settings` access the mGuild which is
   * a super set of guild which has accessible settings types.
   * @param idGuild `Union[str, int]`The id of the guild
   * @param bCache `Literal[true, false]` Wether or not this value should be automatically cached into this.cGuild, defaults to false.
   */
  public rc_guild = async (idGuild: string | number, bCache: boolean = false): Promise<any> => {
    const _session = this.chSession();

    if (_session === undefined) {
      return;
    }

    let _guild: any = undefined;
    try {
      const _fetchguild = await fetch(`${config.backendUrl}/guilds/${idGuild}`, { method: "get", headers: { Session: _session as string } });
      _guild = await _fetchguild.json();
    } catch (e) {
      console.error(`Failed in fetching ${e}`);
    }

    if (this.error_c(_guild)) {
      return;
    }

    if (bCache) {
      this.cGuild = _guild;
    }

    return _guild;
  };

  /**
   * Private method that checks an object for error codes
   * that would be given from backend api
   * @param input the value you want to check
   * @returns A boolean, if its true theres an error, if not there isn't
   */
  private error_c = (input: any): boolean => {
    if (!input) {
      console.error(`Error, Stack: Value is Undefined. ${input}`);
      return true;
    }
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

  /**
   *
   * @returns The session or undefined.
   */
  private chSession = (): undefined | string => {
    const _session = Cookies.get("session");
    // No session means, not logged in
    if (!_session) {
      console.error(`Empty Session, session: ${_session}`);
      return undefined;
    }
    return _session;
  };
}

const mutgl = new _mutgl();

export default mutgl;
