"""
---
cog: on_command_error
"""

import os
import sys
import traceback
import discord
from discord.ext import commands
from pyucc import console, colors

class on_command_error(commands.Cog):

    def __init__(self, client: commands.Bot) -> None:
        self.client = client

    @commands.Cog.listener()
    async def on_command_error(self, arg, error):
        print(arg, type(arg))
        console.fail("Major Exception Detected")
        traceback.print_exc(type(error), error, error.__traceback__, file=sys.stderr)