import quart
from quart_cors import cors
from . import JsonConnection
from shared.core_tools import errors
from exts.constants import oauth2
from http.cookies import SimpleCookie

config = {
    "ignore": False
}

blueprint = quart.Blueprint("api:cache", __name__, subdomain="api")
cors(blueprint, allow_origin="https://trelbot.xyz", allow_credentials=True)

@blueprint.route("/discord-callback", methods=["POST"])
async def root():    
   
    _https_connection = JsonConnection(quart.request)

    try:
        await _https_connection.checkValidated()
        await _https_connection.checkValue("code")
        await _https_connection.cacheValue("code")
        access_token, expires_in = oauth2.Oauth2.retrieveAccessToken(code=_https_connection.code)
        await _https_connection.cacheValue("access_token", access_token)
    except Exception as error:
        if hasattr(error, "jsonstr"):
            return error.jsonstr
        return errors.BaseServerRouteException(f"Unregistered Error: {error}", code=1020)
    
    session: str = oauth2.Session.add(access_token, expires_in)    
    return quart.json.jsonify({"session": session, "expires_in": expires_in})


@blueprint.route("/@me")
async def me():
    print(quart.request.access_control_request_headers)
    return quart.json.jsonify({"hehehea": True})