"""
Anything above this line is ignored by the loader.
This is purely so that the user knows what this specific cog is for.
Everything under this triple dash is chugged through to the loader so it knows what to load
in which context.
---
Cog: Hello
"""


import discord
from discord.ext import commands


class Hello(commands.GroupCog, name="hello"):

    def __init__(self, client) -> None:
        self.client = client

    @discord.app_commands.command()
    async def edit(self, interaction: discord.Interaction):
        await interaction.response.send_message(content="Hi There :wave:")

