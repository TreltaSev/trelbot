"""
# Ransom Command
Sets up the basic functionality for ransom
---
cog: ransom
"""
import os
from pathlib import Path
import discord
from discord.ext import commands, tasks 
from pyucc import console, colors
from tinydb import TinyDB, Query


class ransom(commands.Cog):
    
    def __init__(self, client: commands.Bot) -> None:
        self.client = client       

        # --- Tiny Db --- #
        db_path = Path(os.environ.get("_root")) / "bot/data/ransom.json"
        db_path.parent.mkdir(parents=True, exist_ok=True)
        
        self.db = TinyDB(db_path)
        self.db_table = self.db.table('ransom')
        self.ransom_clock.start()        
        
    
    @tasks.loop(seconds=10)
    async def ransom_clock(self):
        console.info("Ping, Clock")
        
        
    @property
    def doc_exists(self) -> bool:
        """
        Checks if the next document exists.
        """
        query = Query()
        return self.db_table.contains(query.name == "next")
    
    async def set_next(self):
        pass
    
    async def clear_next(self):
        pass
    
        
    @ransom_clock.before_loop
    async def held_ransom_clock(self):
        """
        Make sure the ransom clock doesn't start until the bot is running
        """
        await self.client.wait_until_ready()
    