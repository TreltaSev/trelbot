"""
# On ready event
Syncs all the app commands.
---
cog: on_ready
"""

import discord
from discord.ext import commands
from pyucc import console, colors

class on_ready(commands.Cog):

    def __init__(self, client: commands.Bot) -> None:
        self.client = client

    @commands.Cog.listener()
    async def on_ready(self):

        console.start(f"Syncing App Commands {colors.chex('#111111')}This might take a while...")

        await self.client.tree.sync(guild=discord.Object(id=1336405782153003061))
        await self.client.tree.sync(guild=discord.Object(id=1290387318133489836))

        console.done("Synced :)")