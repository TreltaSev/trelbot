"""
bot.cogs.events.member_leave
~~~~~~~~~~~~~~~~~~~~~
event: `on_member_leave`

Displays a custom "banner" on member leave
"""

import discord
from discord.ext import commands
from exts.constants.cogs import Setup

class on_member_remove(commands.Cog):
    
    def __init__(self, client: commands.Bot) -> None:
        self.client = client

    @commands.Cog.listener()
    async def on_member_remove(self, member: discord.Member):
        pass

@Setup.basic(on_member_remove, "Event:on_member_leave")
async def setup(client: commands.Bot):
    pass