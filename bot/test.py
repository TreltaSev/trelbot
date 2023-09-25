import json
import os
import sys

# Prevent program from creating __pycache__ dirs
sys.dont_write_bytecode = True
sys.path.append(os.path.abspath(f"{os.getcwd()}/../"))

from shared.low import Match  # nopep8

print(Match.hex_color("#fff", dump_value=True))
