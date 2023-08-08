import os
import sys
import uvicorn

# Prevent program from creating __pycache__ dirs
sys.dont_write_bytecode = True
sys.path.append(os.path.abspath(f"{os.getcwd()}/../"))
from exts.constants.App import App


_Application = App(__name__)

# Blueprints

# Variables
_LocalIp = "192.168.1.152"
_LocalPort = 1090
_SSLKey = "../.cert/server.key"
_SSLCert = "../.cert/server.cert"
_UvicornConfig = {
    "host": _LocalIp,
    "port": _LocalPort,
    "ssl_keyfile": _SSLKey,
    "ssl_certfile": _SSLCert,
    "log_level": "critical"
}

if __name__ == "__main__":
    uvicorn.run(_Application, **_UvicornConfig)