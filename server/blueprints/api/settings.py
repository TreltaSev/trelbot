import quart
from exts.constants import oauth2
from pyucc import console
from quart_cors import cors

from shared import types
from shared.core_tools import errors

from . import ApiConnection, JsonConnection

# File Config
config = {
    "ignore": False
}

blueprint = quart.Blueprint("api:settings", __name__)
cors(blueprint, allow_origin="https://trelbot.xyz", allow_credentials=True, allow_methods=["GET", "PATCH", "PUT", "OPTIONS", "POST"])


def handle_error(func):

  def wrap(*args, **kwargs):
    try:
      return func(*args, **kwargs)
    except Exception as error:
      if hasattr(error, "jsonstr"):
        return error.jsonstr
      return errors.BaseServerRouteException(f"Unregistered Error in /api/@me: {error}", code=1020).jsonstr

  return wrap


@handle_error
def api_connect(func):
  def wrap(*args, **kwargs):
    kwargs["connection"] = ApiConnection(quart.request)
    return func(*args, **kwargs)

  return wrap


@handle_error
def get_access(func):

  def wrap(*args, **kwargs):
    kwargs["token"] = oauth2.Session.get(kwargs.get("connection").session)
    return func(*args, **kwargs)

  return wrap


@blueprint.route("/api/guilds/<string:guild_id>/settings", methods=["GET", "PATCH", "PUT", "OPTIONS"])
@api_connect
@get_access
async def API_GUILD_SETTINGS(guild_id, **kwargs):
  """
  Path used to update relevant guild settings
  :param guild_id: The accessed guild id
  """
  print(kwargs)
  match quart.request.method:
    case "PATCH":
      console.quart(f"Patch Request")

    case "GET":
      pass

  access_token: str = kwargs.get("token")
  user: types.user = oauth2.Oauth2.GetCurrentUser(access_token)

  console.quart(f"Connection {access_token}, user: {user.__dict__}")

  # get user data

  # sanitize user, make sure user has required permissions to modify this guild

  # run user input data through the database assigner
  return {"settings?": "yes", "id": guild_id}
