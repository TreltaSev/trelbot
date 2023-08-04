import os
import sys
# Prevent program from creating __pycache__ dirs
sys.dont_write_bytecode = True
sys.path.append(os.path.abspath(f"{os.getcwd()}/../"))

from shared import db, interpreter

print(interpreter.ConfigInterperter(db.Settings("0").get()["banner"]))
