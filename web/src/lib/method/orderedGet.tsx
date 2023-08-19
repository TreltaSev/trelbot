import Cookies from "js-cookie";
import config from "@assets/config";
import loginError from "@lib/method/loginError";
import errorCatcher from "@lib/method/errorCatcher";
import me from "@lib/types/me";

const orderedGet = async (setMethod: (me: me) => void) => {
  let session = Cookies.get("session");
  if (session === undefined) {
    loginError("error", "You dont seem to be logged in, or maybe you cleared your cookies.", "1020", "/login");
    return;
  }

  const _apiIn: RequestInit = { method: "get", headers: { Session: session } };
  const meResponse = await fetch(`${config.backendUrl}/@me`, _apiIn);
  const guildsResponse = await fetch(`${config.backendUrl}/@me/guilds`, _apiIn);

  const _me = await meResponse.json();
  const _guilds = await guildsResponse.json();

  if (errorCatcher(_me) || errorCatcher(_guilds)) {
    throw new Error("response contains error in `json`");
  }

  const orderedMe: me = {
    attempted: true,
    user: {
      id: _me.id,
      name: _me.username,
      discriminator: _me.discriminator,
      avatar: _me.avatar_url,
    },
    guilds: _guilds,
  };

  setMethod(orderedMe);

  console.log(orderedMe, _guilds)

  console.log(":::")
  setTimeout(() => {
    console.log("lll")
    console.log(orderedMe, _guilds)
  }, 1000)

  console.log("ywa")

  return orderedMe;
};


export default orderedGet;