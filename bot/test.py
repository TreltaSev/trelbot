import os
import sys
import json
# Prevent program from creating __pycache__ dirs
sys.dont_write_bytecode = True
sys.path.append(os.path.abspath(f"{os.getcwd()}/../"))

from shared.low import guild

guild.Configuration()