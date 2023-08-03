"""
bot.cogs.events.ready
~~~~~~~~~~~~~~~~~~~~~
On ready event that logs information to console
"""

from discord.ext import commands
from exts.constants.cogs import Setup

class on_ready(commands.Cog):
    
    def __init__(self, client: commands.Bot) -> None:
        self.client = client

    @commands.Cog.listener()
    async def on_ready(self):
        print("Discord bot loaded")

@Setup.basic(on_ready, "Event:on_ready")
async def setup(client: commands.Bot):
    pass