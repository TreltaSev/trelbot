"""
# /roast <user: discord.User>
Roast command, uses gpt to make a realistic roast.
---
cog: roast
"""

import os
from typing import List
import discord
from discord.ext import commands
from openai import OpenAI
from pyucc import console


openai_client = OpenAI(api_key=os.environ.get("OPENAI_TOKEN"))

class roast(commands.Cog):
    
    def __init__(self, client: commands.Bot) -> None:
        self.client = client
        
    @discord.app_commands.command()
    async def roast(self, interaction: discord.Interaction, user: discord.User):
                
        try:
            console.start("Roast command")
            await interaction.response.defer(thinking=True)
            
            _input=f"User {interaction.user.display_name or interaction.user.name} is asking you to roast "   

            if user.id in [342797306980204561]:
                _input += f"Your creator. Roast {interaction.user.display_name or interaction.user.name} instead"

            elif user.id in [1371990578912559136, 932999965498834954]:
                _input += f"Yourself, roast {interaction.user.display_name or interaction.user.name} instead."     
            
            else:
                _input += f"{user.display_name or user.name}"


            console.info("Sending prompt", _input)

            _instructions = """
                You are a discord bot named 'Trelbot'.
                People will sometimes ask you to roast other people within the server.
                You will be given the user who requests a roast and the target.
                You may also be given custom instruction.
                Keep in mind, you can use discord's formatting features for italic and bold text.
                For example: *italic* **bold**
            """

            response = openai_client.responses.create(
                model="gpt-4.1-nano",
                instructions=_instructions,
                input=_input
            )

            console.info("Sent response")

            await interaction.followup.send(content=response.output_text)
        except Exception as e:
            print(e)
        