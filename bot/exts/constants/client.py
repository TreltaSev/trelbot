"""
bot.exts.constants.client
~~~~~~~~~~~~~~~~~~~~~~~~~

Holds Client Class, Spine of Bot
"""

import os
import discord
from typing import List
from discord.ext import commands
from exts.constants.cogs import Cogs
from bot.types.guild import PartialGuild

SpionereToken = "OTY0MDA5NDc2NzIwMDUwMjA2.YleZyQ.x8wE9l63AuqAgwczfUY9Ph1F2Qs"
Developers = [342797306980204561]

class Client(commands.Bot):
    """
    Backbone of Bot
    """
    def __init__(self):
        super().__init__(command_prefix="t:", intents=discord.Intents.all())
    
    
    async def setup_hook(self) -> None:
        """
        Hook used during setup, initializes all cogs and plugins
        """
        
        for extension in Cogs.FindAll(f"{os.getcwd()}/cogs"):
            await self.load_extension(extension)

    
    class DevelopmentGuilds:
        """
        Development guilds used for testing, holds valid testing developemtn guilds to be used in developmer mode of trelbot.

        to get all the guilds in a list call
        ```
        DevelopmentGuilds()()
        ```
        """

        def __init__(self):
            self.guilds: List[PartialGuild] = []
            self.add_guild(964323076089208843, "Spionere")

        
        def add_guild(self, guild_id: int, guild_name: str):
            """
            Adds a :class:`bot.types.guild.PartialGuild` into :self.attribute:`guilds: list`
            
            Arguments
            ~~~~~~~~~

            `REQUIRED` guild_id: int
                Id of the guild

            `REQUIRED` guild_name: str
                Name of the guild
            """
            self.guilds.append(PartialGuild(id=guild_id, name=guild_name))



        