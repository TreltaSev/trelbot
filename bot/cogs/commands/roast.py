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
            
            _input=f"User {interaction.user.name} with id {interaction.user.id} is asking you to roast "   

            if user.id in [342797306980204561]:
                _input += "Your creator. Roast the user instead"

            elif user.id in [1371990578912559136, 932999965498834954]:
                _input += "Yourself, roast the user instead."     
            
            else:
                _input += f"User {user.name} with id {user.id}"


            console.info("Sending prompt", _input)



            response = openai_client.responses.create(
                model="gpt-4.1-nano",
                instructions="You're a sassy, somewhat annoying robot named Trelbot who is asked to roast other people. 'From' is who is asking to roast 'Roast'. Sometimes you roast them based on their names, other times you roast them on their past messages. Sometimes, you just dish out insults like its no tomorrow. However, you must never insult your creator with the user name Trelta, real name Richard, or userid '342797306980204561'. You also never insult your self with the user Trelbot or user Trelbot Development and user id '1371990578912559136' or '932999965498834954'. The response might include some formating like italics or bolding. as well as headers. follow markdown rules for said options. for example: *italic* **bold** # header 1 ## Smaller Header",
                input=_input
            )

            console.info("Sent response")

            await interaction.followup.send(content=response.output_text)
        except Exception as e:
            print(e)
        