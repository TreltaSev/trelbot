import quart
from blueprints import get_access, handle_error
from exts.constants import oauth2
from pyucc import colors, console, symbols
from quart_cors import cors

from shared import types

# File Config
config = {
    "ignore": False
}

blueprint = quart.Blueprint("api:guild", __name__)
cors(blueprint, allow_origin="https://trelbot.xyz", allow_credentials=True, allow_methods=["GET", "PATCH", "PUT", "OPTIONS", "POST"])


class dict_form:

  def __init__(self, in_object: dict):
    self.in_object: dict = in_object

    print(in_object.keys())

  
@blueprint.route("/api/guilds/<string:guild_id>", methods=["GET", "PATCH"])
@handle_error
@get_access
async def API_GUILD(guild_id, **kwargs):
  """
  :allowed: [`GET`, `PATCH`]

  :when GET:
  When a get request is sent to this route with a session header,
  the server responds with guild information like images, users the likes.

  :when PATCH:
  When a patch request is sent to this route with a session header and some
  json inside the request, the server looks at the json data, figures out the
  logic to complete and responds accordingly

  :param guild_id: The accessed guild id
  """
  access_token: str = kwargs.get("token")

  operations = quart.request.headers.get("Operations", "none")

  match quart.request.method:
    case "GET":
      guild: types.guild = oauth2.Oauth2.GetGuild(access_token, guild_id)

      if "settings" in operations:
        guild.get_settings()

      return quart.json.jsonify(guild.__dict__)

    case "PATCH":
      console.quart(f"{colors.chex('#8C52FF')}/api/guilds/{guild_id}{symbols.reset} ::: {operations}")

      # Get Inputed Data
      
      # Parse the data
      # Update server information

  return ":)"
