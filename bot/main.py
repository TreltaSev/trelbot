import sys
# Prevent program from creating __pycache__ dirs
sys.dont_write_bytecode = True

from exts.constants.client import Client, SpionereToken

import asyncio

# Start Client
async def run():
    async with client:
        await client.start(SpionereToken, reconnect=True)


try:
    client = Client()
    asyncio.run(run())
except (KeyboardInterrupt, SystemExit) as error:
    print("Stopping Trelbot")
    pass