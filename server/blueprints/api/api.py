import quart
from quart_cors import cors
from . import JsonConnection, ApiConnection
from shared.core_tools import errors
from exts.constants import oauth2
import traceback

config = {
    "ignore": False
}

blueprint = quart.Blueprint("api:cache", __name__)
cors(blueprint, allow_origin="https://trelbot.xyz", allow_credentials=True)


@blueprint.route("/api/discord-callback", methods=["POST"])
async def root():

    try:
        _https_connection = JsonConnection(quart.request)
        await _https_connection.checkValidated()
        await _https_connection.checkValue("code")
        await _https_connection.cacheValue("code")
        access_token, expires_in = oauth2.Oauth2.retrieveAccessToken(
            code=_https_connection.code)
        await _https_connection.cacheValue("access_token", access_token)
    except Exception as error:
        if hasattr(error, "jsonstr"):
            return error.jsonstr
        return errors.BaseServerRouteException(f"Unregistered Error in /api/discord-callback: {error}", code=1020).jsonstr

    session: str = oauth2.Session.add(access_token, expires_in)
    return quart.json.jsonify({"session": session, "expires_in": expires_in})


@blueprint.route("/api/@me", methods=["GET"])
async def me():

    try:
        _https_connection = ApiConnection(quart.request)
        _access_token = oauth2.Session.get(_https_connection.session)
        _user = oauth2.Oauth2.GetCurrentUser(_access_token)
    except Exception as error:
        if hasattr(error, "jsonstr"):
            return error.jsonstr
        return errors.BaseServerRouteException(f"Unregistered Error in /api/@me: {error}", code=1020).jsonstr

    return quart.json.jsonify(_user.__dict__)


@blueprint.route("/api/@me/guilds", methods=["GET"])
async def guilds():

    try:
        _https_connection = ApiConnection(quart.request)
        _access_token = oauth2.Session.get(_https_connection.session)
        _guilds = oauth2.Oauth2.GetCurrentUserGuilds(_access_token)
    except Exception as error:
        if hasattr(error, "jsonstr"):
            return error.jsonstr
        return errors.BaseServerRouteException(f"Unregistered Error in /api/@me/guilds: {error}", code=1020).jsonstr

    return quart.json.jsonify(_guilds)


@blueprint.route("/api/guilds/<string:guild_id>")
async def guild(guild_id: str):

    try:
        _https_connection = ApiConnection(quart.request)
        _access_token = oauth2.Session.get(_https_connection.session)
        _guild = oauth2.Oauth2.GetGuild(_access_token, guild_id)
    except Exception as error:
        if hasattr(error, "jsonstr"):
            return error.jsonstr
        return errors.BaseServerRouteException(f"Unregistered Error in /api/guilds/{guild_id}: {error}", code=1020).jsonstr

    return quart.json.jsonify(_guild.__dict__)


@blueprint.route("/api/guilds/<string:guild_id>/channels")
async def guild_channels(guild_id: str):

    try:
        _https_connection = ApiConnection(quart.request)
        _access_token = oauth2.Session.get(_https_connection.session)
        _channels = oauth2.Oauth2.GetChannels(_access_token, guild_id)
    except Exception as error:
        if hasattr(error, "jsonstr"):
            return error.jsonstr
        return errors.BaseServerRouteException(f"Unregistered Error in /api/guilds/{guild_id}/channels: {error}", code=1020).jsonstr

    return quart.json.jsonify(_channels)
