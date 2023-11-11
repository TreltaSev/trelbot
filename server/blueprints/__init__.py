import quart
from exts.constants import oauth2

from shared.core_tools import errors

from .api import ApiConnection


def handle_error(func):
  """:use: as decorator, when an exception occurs, this decorator will override the child
  function and return a json serializable string containing the failure information.
  if the exception contains `.jsonstr` which is available to all error classes
  within this program, its custom message will be returned with its code. if the exception
  doesn't contain this `key`, the error name will show up as unregistered.
  """

  async def wrap(*args, **kwargs):
    try:
      return await func(*args, **kwargs)
    except Exception as error:
      if hasattr(error, "jsonstr"):
        return error.jsonstr
      return errors.BaseServerRouteException(f"Unregistered Error within `{func.__name__}` : {error}", code=1020).jsonstr

  return wrap


def api_connect(func):
  """:use: as decorator, when called, saves an `ApiConnection` object within the functions kwargs if applicable.
  """
  async def wrap(*args, **kwargs):
    kwargs["connection"] = ApiConnection(quart.request)
    return await func(*args, **kwargs)

  return wrap


def get_access(func):
  """:use: as decorator, when called, gets the ApiConnection object from either kwargs.get("connection") or
  it runs the same logic as `@api_connect`. saves "token" which is the saved token responding to the session and also saves
  "session" which is just `ApiConnection.session`
  """
  async def wrap(*args, **kwargs):
    Connection: ApiConnection = kwargs.get("connection", ApiConnection(quart.request))
    kwargs["token"] = oauth2.Session.get(Connection.session)
    kwargs["session"] = Connection.session
    return await func(*args, **kwargs)

  return wrap
