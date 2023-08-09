import quart
from . import Connection
config = {
    "ignore": False
}

blueprint = quart.Blueprint("api:test", __name__, subdomain="cache")

@blueprint.websocket("/")
async def root():
    pass

# @blueprint.route("/")
# async def root():
#     _https_connection = Connection(quart.request)

#     if not _https_connection.validated:
#         return _https_connection.response

#     return _https_connection.response

# @blueprint.route("/read", methods=["POST"])
# async def read():
#     """Reads from the cache and returns results"""
#     _https_connection = Connection(quart.request)

#     if not _https_connection.validated:
#         return _https_connection.response
    
#     print(await _https_connection.client_input)
#     return "..."