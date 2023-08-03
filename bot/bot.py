import sys
from bot.exts.constants.client import Client

# Prevent program from creating __pycache__ dirs
sys.dont_write_bytecode = True

import asyncio

# Start Client
async def run():
    async with client:
        await client.start()


try:
    client: Client()
    asyncio.run(run())
except (KeyboardInterrupt, SystemExit) as error:
    print("Stopping Trelbot")
    pass