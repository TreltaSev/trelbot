import asyncio

from shared.console import console
from shared.config import config

# import discord

from utils.client import Client



async def run():
    await Client().setup()

try:
    asyncio.run(run())
except Exception as error:
    _end_reason: str = ""
    
    if isinstance(error, KeyboardInterrupt):
        _end_reason = "Exited with [red]Ctrl+C[/]"
    
    elif isinstance(error, SystemExit):
        _end_reason = "System Exit"

    else:
        _end_reason = f"Unexpected Error: [red]{error}[/]"
        
    console.error(_end_reason)

    raise error