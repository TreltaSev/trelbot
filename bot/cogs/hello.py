"""
Anything above this line is ignored by the loader.
This is purely so that the user knows what this specific cog is for.
Everything under this triple dash is chugged through to the loader so it knows what to load
in which context.
---
cog: Hello
"""

import os
import discord
from discord.ext import commands
import random




class Hello(commands.GroupCog, name="hello"):

    def __init__(self, client: commands.Bot) -> None:
        self.client = client

    @discord.app_commands.command()
    async def root(self, interaction: discord.Interaction):
        
        messages = [
            "You suck.",
            "Hi there, we're here to speak to you about your car's extended warranty",
            "Hi there :) :wave:",
            "Did you know, one in 3 kids.... deserve your life insurance more than you do?"
        ]
        
        await interaction.response.send_message(content=random.choice(messages))
        
        
    @discord.app_commands.command()
    async def edit(self, interaction: discord.Interaction):
        
        messages = [
            "You suck.",
            "Hi there, we're here to speak to you about your car's extended warranty",
            "Hi there :) :wave:",
            "Did you know, one in 3 kids.... deserve your life insurance more than you do?"
        ]
        
        await interaction.response.send_message(content=random.choice(messages))
        
    @commands.Cog.listener()
    async def on_ready(self):
        print("Syncing App Commands... This might take a while")
        await self.client.tree.sync(guild=discord.Object(id=1336405782153003061))
        
        
        

