import json
import os
import sys

# Prevent program from creating __pycache__ dirs
sys.dont_write_bytecode = True
sys.path.append(os.path.abspath(f"{os.getcwd()}/../"))

from shared.low import guild  # nopep8

conf = guild.Configuration()
print(conf.background_color, type(conf.background_color))
