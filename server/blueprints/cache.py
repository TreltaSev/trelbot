import quart
from server.exts.constants.App import Connection

config = {
    "ignore": False
}

blueprint = quart.Blueprint("api:test", __name__, subdomain="cache")

@blueprint.route("/")
async def root():
    _https_connection = Connection(quart.request)

    if not _https_connection.local_validated:
        return quart.json.jsonify(validated=False)

    return quart.json.jsonify(validated=True)