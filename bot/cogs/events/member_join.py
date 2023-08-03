"""
bot.cogs.events.member_join
~~~~~~~~~~~~~~~~~~~~~
event: `on_member_join`

Displays a custom "banner" on member join
"""

from discord.ext import commands
from exts.constants.cogs import Setup

class on_member_join(commands.Cog):
    
    def __init__(self, client: commands.Bot) -> None:
        self.client = client

    @commands.Cog.listener()
    async def on_member_join(self):
        pass

@Setup.basic(on_member_join, "Event:on_member_join")
async def setup(client: commands.Bot):
    pass