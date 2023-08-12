import os
import sys
# Prevent program from creating __pycache__ dirs
sys.dont_write_bytecode = True
sys.path.append(os.path.abspath(f"{os.getcwd()}/../"))

from shared import db, interpreter

v = interpreter.ConfigInterperter("pfp:true;pfp_border_color:#f00;").cache_results()
print(v)