"""
bot.exts.constants.client
~~~~~~~~~~~~~~~~~~~~~~~~~

Holds Client Class, Spine of Bot
"""

import os
import discord
from typing import List, Literal
from discord.ext import commands
from core_tools.guild import PartialGuild
from exts.constants.cogs import Cogs



SpionereToken = "OTY0MDA5NDc2NzIwMDUwMjA2.YleZyQ.x8wE9l63AuqAgwczfUY9Ph1F2Qs"
TrelbotToken = "OTMyOTk5OTY1NDk4ODM0OTU0.GJoDm0.hnXOxg7Wm83MFCQcKNFun0x6Bw12I79Y043AN0"
Developers = [342797306980204561]


class Setup:
    """
    Setup class for program
    """
    
    token: str

    @classmethod
    def set_token(cls, token: str):
        cls.token = token

    @classmethod
    def get_token(cls):
        return cls.token


# If Trelbot should be used in all guilds globally
isGlobal: Literal[True, False] = False

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

        if isGlobal:
            await self.tree.sync()
        else:
            for guild in Client.DevelopmentGuilds()():
                print("Syncing with", guild.id)
                await self.tree.sync(guild=discord.Object(id=guild.id))

    
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
            # self.add_guild(802799445476769822, "BTB")

        
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

        def __call__(self):
            return self.guilds



        