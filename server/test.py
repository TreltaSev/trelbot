import os
import sys
# Prevent program from creating __pycache__ dirs
sys.dont_write_bytecode = True
sys.path.append(os.path.abspath(f"{os.getcwd()}/../"))
from exts.constants import oauth2



try:
    _code = "t8PrhaGVSWvNUlzejuvob5MZllYbS1"
    _user = oauth2.Oauth2.GetCurrentUser(_code)
    print(_user.__dict__)
except Exception as e:
    if hasattr(e, "jsonstr"):
        print(e.json)
    else:
        raise e