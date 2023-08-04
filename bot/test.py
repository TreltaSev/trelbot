import os
import sys
# Prevent program from creating __pycache__ dirs
sys.dont_write_bytecode = True
sys.path.append(os.path.abspath(f"{os.getcwd()}/../"))

from shared import client as SharedClient

print(SharedClient.get.guild.guilds())
print(SharedClient.get.guild.roles(344872383452151808))
print(SharedClient.check.has_access_to_guild(344872383452151808))
