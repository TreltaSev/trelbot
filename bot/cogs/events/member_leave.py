"""
bot.cogs.events.member_leave
~~~~~~~~~~~~~~~~~~~~~
event: `on_member_leave`

Displays a custom "banner" on member leave
"""

from discord.ext import commands
from exts.constants.cogs import Setup

class on_member_leave(commands.Cog):
    
    def __init__(self, client: commands.Bot) -> None:
        self.client = client

    @commands.Cog.listener()
    async def on_member_leave(self):
        pass

@Setup.basic(on_member_leave, "Event:on_member_leave")
async def setup(client: commands.Bot):
    pass