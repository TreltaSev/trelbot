"""
bot.cogs.events.ready
~~~~~~~~~~~~~~~~~~~~~
On ready event that logs information to console
"""

import discord
from discord.ext import commands
from exts.constants.cogs import Setup
from exts.constants import version
from shared.core_tools import bcolors, time

class on_ready(commands.Cog):
    
    def __init__(self, client: commands.Bot) -> None:
        self.client = client

    @commands.Cog.listener()
    async def on_ready(self):
        bcolors.console(f"{bcolors.colors.cvlPurple}[{time.current()}] {bcolors.colors.cvlOrange}[Info] {bcolors.colors.cvlGreen}Bot Loaded and Ready")
        bcolors.console(self._create_ln("bot:name", self.client.user.name))
        bcolors.console(self._create_ln("bot:id", self.client.user.id))
        bcolors.console(self._create_ln("bot:v", version.__version__))
        bcolors.console(self._create_ln("discord:v", discord.__version__))
        bcolors.console(self._create_ln("amt:guilds", len(self.client.guilds)))

    def _create_ln(self, name, val):
        """
        Creates a ln for on ready
        """
        return f"{' ' * (len(f'[{time.current()}] [Info]') - len(f'[{name}]') - 1)} {bcolors.colors.cvlOrange}[{name}] {bcolors.colors.cvBlue}{val}"

@Setup.basic(on_ready, "Event:on_ready")
async def setup(client: commands.Bot):
    pass