import quart
import json
from quart_cors import cors
from . import JsonConnection
from shared.core_tools import errors

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
    except Exception as e:
        if hasattr(e, "jsonstr"):
            return e.jsontr
        return {"code": errors.Codes.Fatal, "message": "Fatal error cause unknown."}
    
    


    
    print(_https_connection.code)
    
    return quart.json.jsonify({"pog": True})

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