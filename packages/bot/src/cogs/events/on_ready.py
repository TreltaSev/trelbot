"""
# On ready event
Syncs all the app commands.
---
cog: on_ready
"""

import os
import discord
from discord.ext import commands
from shared.config import config
from shared.console import console
from utils.client import Client

class on_ready(commands.Cog):

    def __init__(self, client: commands.Bot) -> None:
        self.client = client

    @commands.Cog.listener()
    async def on_ready(self):
        console.debug(f"Syncing App Commands [gray]This might take a while...[/]")
        
        mode = os.environ.get("MODE", "development")

        if mode == "production":
            console.debug("Sync Mode: [bold]Global[/]")
            await self.client.tree.sync()
            console.debug("Synced all commands to all guilds")            
        else:            
            console.debug("Sync Mode: [bold]Targeted[/]")
            
            guilds = config.parsed.guilds or []
            
            for guild in guilds:
                console.debug(f"Handling {guild}")
                guild_object = discord.Object(id=guild)
                self.client.tree.clear_commands(guild=guild_object)
                console.debug(f"Cleared commands for {guild}")
                self.client.tree.copy_global_to(guild=guild_object)
                console.debug(f"Copied global commands to {guild}")


        if not self.client.user:
            console.error("Not logged in?")
            return

        started_info = f"""
        [bold green]Bot Started[/]        
        [bold]Bot Information[/]
        [purple]\uf061[/purple] [dim]Name: {self.client.user.name}[/dim]
        [purple]\uf061[/purple] [dim]ID: {self.client.user.id}[/dim]
        """
        console.print(started_info)
        
def setup(client: Client) -> commands.Cog:
    return on_ready(client)