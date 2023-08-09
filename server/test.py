import os
import sys
import uvicorn
import asyncio

# Prevent program from creating __pycache__ dirs
sys.dont_write_bytecode = True
sys.path.append(os.path.abspath(f"{os.getcwd()}/../"))
from exts.constants.App import BlueprintsManager

async def run():    
    for blueprint in BlueprintsManager.find_all(f"{os.getcwd()}/blueprints", ".py"):
        await BlueprintsManager.load(blueprint)

asyncio.run(run())