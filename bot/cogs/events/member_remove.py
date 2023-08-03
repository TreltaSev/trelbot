"""
bot.cogs.events.member_leave
~~~~~~~~~~~~~~~~~~~~~
event: `on_member_leave`

Displays a custom "banner" on member leave
"""

import discord
from discord.ext import commands
from exts.constants.cogs import Setup
from exts.constants import banner_tools

class on_member_remove(commands.Cog):
    
    def __init__(self, client: commands.Bot) -> None:
        self.client = client

    @commands.Cog.listener()
    async def on_member_remove(self, member: discord.Member):

        leave = 0

        if member.guild.id == 964323076089208843:
            leave = 964527554159607819

        if member.guild.id == 802799445476769822:
            leave = 821215762307219466

        await self.client.get_channel(leave).send(file=banner_tools.UserBanner("leave", member=member)._get_file())

@Setup.basic(on_member_remove, "Event:on_member_leave")
async def setup(client: commands.Bot):
    pass