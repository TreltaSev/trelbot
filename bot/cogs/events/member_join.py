"""
bot.cogs.events.member_join
~~~~~~~~~~~~~~~~~~~~~
event: `on_member_join`

Displays a custom "banner" on member join
"""
import discord
from discord.ext import commands
from exts.constants.cogs import Setup
from shared.core_tools import banner_tools

class on_member_join(commands.Cog):
    
    def __init__(self, client: commands.Bot) -> None:
        self.client = client

    @commands.Cog.listener()
    async def on_member_join(self, member: discord.Member):

        join = 0

        if member.guild.id == 964323076089208843:
            join = 964526484217794590

        if member.guild.id == 802799445476769822:
            join = 821215729047175179

        await self.client.get_channel(join).send(file=banner_tools.UserBanner("join", member=member)._get_file())

@Setup.basic(on_member_join, "Event:on_member_join")
async def setup(client: commands.Bot):
    pass