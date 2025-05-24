"""
Anything above this line is ignored by the loader.
This is purely so that the user knows what this specific cog is for.
Everything under this triple dash is chugged through to the loader so it knows what to load
in which context.
---
cog: Subcommand
"""

import os
import discord
from discord.ext import commands


class Subcommand(commands.GroupCog, name="subcommand"):

    def __init__(self, client: commands.Bot) -> None:
        self.client = client

    @discord.app_commands.command()
    async def one(self, interaction: discord.Interaction):
        await interaction.response.send_message(content="This is subcommand one!")

    @discord.app_commands.command()
    async def two(self, interaction: discord.Interaction):
        await interaction.response.send_message(content="This is subcommand two!")

    @discord.app_commands.command()
    async def three(self, interaction: discord.Interaction):
        await interaction.response.send_message(content="This is subcommand three!")
