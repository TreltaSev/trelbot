import os
import sys
# Prevent program from creating __pycache__ dirs
sys.dont_write_bytecode = True
sys.path.append(os.path.abspath(f"{os.getcwd()}/../"))

from exts.constants import fetch, oauth2

_C = "hLY4f6L9BNC6gaqGHGREvYMX5o2WOT"
_v = oauth2.Oauth2.GetChannels(_C, 344872383452151808)
print(_v)