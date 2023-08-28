import Cookies from "js-cookie";
import config from "@assets/config";
import errorCatcher from "@lib/method/errorCatcher";
import nli_transfer from "@lib/method/nli_transfer";
import user from "@lib/types/user";
import userSession from "@lib/method/userSession";
import loginAction from "./loginAction";

const cache_me = async (set: (user: user) => void): Promise<user> => {
  const session = Cookies.get("session");
  nli_transfer(session);

  const _request: RequestInit = { method: "get", headers: { Session: session as string } };
  let _me: any = undefined;
  try{
    const _meResponse = await fetch(`${config.backendUrl}/@me`, _request);
    _me = await _meResponse.json();
  } catch (e) {
    new userSession().remove()
    new loginAction().setError("error", "Error Fetching Backend", "1020", "/login")
    throw new Error(`Response contains error for @me in json ${_me}`);
  }
  

  if (errorCatcher(_me)) {
    new userSession().remove()
    new loginAction().setError("error", "Error Parsing Backend Response", "1020", "/login")
    throw new Error(`Response contains error for @me in json ${_me}`);
  }

  const me: user = {
    id: _me.id,
    name: _me.username,
    discriminator: _me.discriminator,
    avatar: _me.avatar_url,
  };

  new userSession().set(_me.username, _me.id, _me.discriminator as string, _me.avatar_url)

  set(me);

  return me;
};

export default cache_me;
