"""
# /hello
Contains one single command, the hello command.
---
cog: hello
"""

import discord
from discord.ext import commands
import random


class hello(commands.Cog):

    def __init__(self, client: commands.Bot) -> None:
        self.client = client

    @discord.app_commands.command()
    async def hello(self, interaction: discord.Interaction):

        messages = [
            "You suck.",
            "Hi there, we're here to speak to you about your car's extended warranty",
            "Hi there :) :wave:",
            "Did you know, one in 3 kids.... deserve your life insurance more than you do?"
        ]
        

        await interaction.response.send_message(content=random.choice(messages))
