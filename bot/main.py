import os
import pathlib
import sys
import discord
from siblink import Config
from dotenv import dotenv_values
import asyncio

from utils.client import Client

# Prevent program from creating __pycache__ dirs
sys.dont_write_bytecode = True


intents = discord.Intents.default()
intents.message_content = True

client = discord.Client(intents=intents)


@Config.load_predetermined
def _load_env():
    """
    Ensures that everything from within the env file is loaded
    """

    project_root: pathlib.Path = pathlib.Path(Config.root)
    Config.env = {
        **dotenv_values(project_root / ".env")
    }
    os.environ.update(Config.env)

_load_env()

# Make sure bot secret exists
if not os.environ.get("BOT_SECRET", None):
    raise KeyError(f"Missing Bot Secret from .env")

# Make sure bot token exists
if not os.environ.get("BOT_TOKEN", None):
    raise KeyError(f"Missing Bot Token from .env")

async def run():
    await Client().setup()

try:
    asyncio.run(run())
except Exception as error:
    _er: str = ""  # End Reason

    # User hitting Ctrl + C
    if isinstance(error, KeyboardInterrupt):
        _er = "Exited with `Ctrl+C`"

    # System deciding to Sudoku
    elif isinstance(error, SystemExit):
        _er = "System Exit"

    # All else failed
    else:
        _er = f"Unexpected Error: ${error}"

    # For now, print is fine but should use own logging system
    # TODO: Update Logging system
    print(_er)
    
    raise error
