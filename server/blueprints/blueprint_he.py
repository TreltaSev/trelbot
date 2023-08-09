import quart
from exts.constants.App import BlueprintsManager

blueprint = quart.Blueprint("api:test", __name__, subdomain="test")

@blueprint.route("/test")
async def test_route():
    return "Test indeed"