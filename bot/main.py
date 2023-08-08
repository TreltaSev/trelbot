import os
import sys
import asyncio

# Prevent program from creating __pycache__ dirs
sys.dont_write_bytecode = True
sys.path.append(os.path.abspath(f"{os.getcwd()}/../"))


from shared.core_tools import bcolors, time
from exts.constants.client import Client, SpionereToken, TrelbotToken, Setup

Setup.set_token(SpionereToken)

# Start Client
async def run():
    async with client:
        await client.start(Setup.token, reconnect=True)


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
    