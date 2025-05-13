"""
# On ready event
Syncs all the app commands.
---
cog: on_ready
"""

import os
import discord
from discord.ext import commands
from pyucc import console, colors

class on_ready(commands.Cog):

    def __init__(self, client: commands.Bot) -> None:
        self.client = client

    @commands.Cog.listener()
    async def on_ready(self):
        console.start(f"Syncing App Commands {colors.chex('#111111')}This might take a while...")
        
        mode = os.environ.get("MODE", "development")
    
        console.start("Global Sync")
        await self.client.tree.sync()
        console.done("Finished Global Sync")
        
        if mode == "production":
            return
        
        guilds = [int(os.environ.get("GUILD"))]
        
        for guild in guilds:
            console.start(f"Handling {guild}")
            guild_object = discord.Object(id=guild)
            self.client.tree.clear_commands(guild=guild_object)
            console.done(f"Cleared commands for {guild}")
            self.client.tree.copy_global_to(guild=guild_object)
            console.done(f"Copied global commands to {guild}")

        console.done("Synced all commands to all guilds")