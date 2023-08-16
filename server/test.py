import os
import sys
# Prevent program from creating __pycache__ dirs
sys.dont_write_bytecode = True
sys.path.append(os.path.abspath(f"{os.getcwd()}/../"))
from exts.constants import oauth2



try:
    print(oauth2.Oauth2.retrieveAccessToken(code="5EnFjI1QeDmmJwQ16YfszFoRDuDCbi"))
except Exception as e:
    if hasattr(e, "jsonstr"):
        print(e.json)
    else:
        raise e