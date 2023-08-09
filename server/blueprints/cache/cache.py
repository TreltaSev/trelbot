import quart
from . import Connection
config = {
    "ignore": False
}

blueprint = quart.Blueprint("api:test", __name__, subdomain="cache")

@blueprint.route("/")
async def root():
    _https_connection = Connection(quart.request)

    if not _https_connection.validated:
        return _https_connection.response

    return _https_connection.response