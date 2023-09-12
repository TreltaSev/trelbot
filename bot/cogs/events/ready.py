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
    
    initial: bool = True
    
    def __init__(self, client: commands.Bot) -> None:
        self.client = client

    @commands.Cog.listener()
    async def on_ready(self):
        
        if on_ready.initial:            
            bcolors.console.info(f"{bcolors.colors.cvlGreen}Bot is Loaded and Ready")
            bcolors.console.info(self._create_ln("bot:name", self.client.user.name))
            bcolors.console.info(self._create_ln("bot:id", self.client.user.id))
            bcolors.console.info(self._create_ln("bot:v", version.__version__))
            bcolors.console.info(self._create_ln("discord:v", discord.__version__))
            bcolors.console.info(self._create_ln("amt:guilds", len(self.client.guilds)))
            on_ready.initial = False
            return
        
        bcolors.console.info("{bcolors.colors.cvlRedvl}Reconnected.")

        
        

    def _create_ln(self, name, val):
        """
        Creates a ln for on ready
        """
        return f"{bcolors.colors.cvlOrange}[{name}] {bcolors.colors.cvBlue}{val}"

@Setup.basic(on_ready, "Event:on_ready")
async def setup(client: commands.Bot):
    pass