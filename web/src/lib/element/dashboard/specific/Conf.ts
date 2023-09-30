import Cookies from "js-cookie";
import config from "@assets/config";
let session = Cookies.get("session");

class Conf {
  public obj: any = {};

  /**
   * Constructor
   */
  Conf() {}

  /**
   * Sends the current obj to a url using a patch request
   * @param path the path of the url
   * @param headers The headers of the request
   * @param json The json data used
   */
  async send(path: string, headers?: HeadersInit | any, session?: boolean, json?: any) {
    // If headers aren't present, create empty dict
    if (!headers) {
      headers = {};
    }

    // If session is true, send with cookie
    if (session) {
      let session = Cookies.get("session");
      headers["Session"] = session as string;
    }

    // If json is present, set Content-Type to application/json
    if (json != undefined) {
      headers["Content-Type"] = "application/json";
    }

    const _req: RequestInit = { method: "PATCH", headers: headers };
    const _rep = await fetch(path, _req);
    return await _rep.json();
  }

  /**
   * Sets a key value pair
   * @param key The name of the key you want to set
   * @param value The value of the key you want to set
   */
  set(key: any, value: any) {
    this.obj[key] = value;
  }

  /**
   * Gets the value of a key
   * @param key The name of the key you want to get
   * @returns The value of said key
   */
  get(key: any): any {
    return this.obj[key];
  }

  /**
   * Run this if you want to get `this.obj`
   * @returns This.obj
   */
  self(): any {
    return this.obj;
  }
}

let conf: Conf = new Conf();
export { conf };
export default Conf;
