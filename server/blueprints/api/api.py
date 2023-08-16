import quart
from quart_cors import cors
from . import JsonConnection
from shared.core_tools import errors
from exts.constants import oauth2

config = {
    "ignore": False
}

blueprint = quart.Blueprint("api:cache", __name__, subdomain="api")
cors(blueprint, allow_origin="http://localhost:3000")

@blueprint.route("/discord-callback", methods=["POST"])
async def root():    
   
    _https_connection = JsonConnection(quart.request)

    # Checks if the request is json
    try:
        await _https_connection.checkValidated()
        await _https_connection.checkValue("code")
        await _https_connection.cacheValue("code")
        access_token: str = oauth2.Oauth2.retrieveAccessToken(code=_https_connection.code)
        await _https_connection.cacheValue("access_token", access_token)
    except Exception as error:
        if hasattr(error, "jsonstr"):
            return error.jsontr
        return errors.BaseServerRouteException(f"Unregistered Error: {error}", code=1020)
    
    session: str = oauth2.Session.add(access_token)    
    return quart.json.jsonify({"session": session})
