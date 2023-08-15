import os
import sys
import uvicorn
import asyncio

# Prevent program from creating __pycache__ dirs
sys.dont_write_bytecode = True
sys.path.append(os.path.abspath(f"{os.getcwd()}/../"))
from exts.constants.App import App, BlueprintsManager


_Application = App(__name__)

_Application.config["SERVER_NAME"] = "localhost:1090"

# Blueprints

# Variables
_LocalIp = "localhost"
_LocalPort = 1090
_Secure: bool = False
_SSLKey = "../.cert/server.key"
_SSLCert = "../.cert/server.cert"
_UvicornConfig = {
    "host": _LocalIp,
    "port": _LocalPort,    
    "log_level": "info"
}
if _Secure:
    _UvicornConfig["ssl_keyfile"] = _SSLKey
    _UvicornConfig["ssl_certfile"] = _SSLCert

def run():    
    BlueprintsManager.apply_app(_Application)
    for blueprint in BlueprintsManager.find_all(f"{os.getcwd()}/blueprints", ".py"):
        BlueprintsManager.load(blueprint)    
    uvicorn.run(_Application, **_UvicornConfig)


if __name__ == "__main__":
    run()
    