import sys
# Prevent program from creating __pycache__ dirs
sys.dont_write_bytecode = True

from exts.constants.client import Client, SpionereToken
from core_tools import bcolors, time
import asyncio

# Start Client
async def run():
    async with client:
        await client.start(SpionereToken, reconnect=True)


try:
    client = Client()
    asyncio.run(run())
except (KeyboardInterrupt, SystemExit) as error:
    EndReason = ""

    if isinstance(error, KeyboardInterrupt):
        EndReason = "Exited with `Ctrl+C`"
    
    if isinstance(error, SystemExit):
        EndReason = "System Exist"

    bcolors.console(f"{bcolors.colors.cvlPurple}[{time.current()}] {bcolors.colors.cvlOrange}[Info] {bcolors.colors.cvlRed}Bot Ended Abruptly: {EndReason}")
    