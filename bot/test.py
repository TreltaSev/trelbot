import os
import sys
import json
# Prevent program from creating __pycache__ dirs
sys.dont_write_bytecode = True
sys.path.append(os.path.abspath(f"{os.getcwd()}/../"))

from shared.core_tools import bcolors

bcolors.console.fail("test")
print("\u001B[48;2;210;0;0m\u001B[38;2;0;255;0mHello, colorful world!\u001B[0m\n")