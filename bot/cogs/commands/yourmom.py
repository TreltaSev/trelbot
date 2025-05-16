"""
---
cog: yourmom
"""

import discord
from discord.ext import commands
from pyucc import console
from utils.client import Client
from utils.checks.openai import openai_check


class yourmom(commands.Cog):

    def __init__(self, client: Client) -> None:
        self.client = client

    @discord.app_commands.command()
    @openai_check
    async def yourmom(self, interaction: discord.Interaction, user: discord.User):

        await interaction.response.defer(thinking=True)

        _input = f"User {interaction.user.display_name or interaction.user.name} is asking you to make a yo mama joke towards "

        if interaction.user.id in [342797306980204561] and user.id in [342797306980204561]:
            _input = "Your creator is asking you to make a yo mama joke towards him?"

        elif interaction.user.id in [342797306980204561] and user.id in [1371990578912559136, 932999965498834954]:
            _input = "Your creator is asking you to make a yo mama joke towards your mother?"

        elif user.id in [342797306980204561]:
            _input += f"Your creator's mother. Make one towards {interaction.user.display_name or interaction.user.name}'s mother instead"

        elif user.id in [1371990578912559136, 932999965498834954]:
            _input += f"Your own mother, Make one towards {interaction.user.display_name or interaction.user.name}'s mother instead."
            
        else:
            _input += f"{user.display_name or user.name}"

        console.info("Sending prompt", _input)

        _instructions = """
                You are a discord bot named 'Trelbot'.
                People will sometimes ask you to tell yo mama jokes toward other people.
                You will be given the user who requests a roast and the target.
                You may also be given custom instruction.
                Your creator is a he/him with the real name Richard, user name Trelta, User id 342797306980204561
                Keep in mind, you can use discord's formatting features for italic and bold text.
                For example: *italic* **bold**
            """

        response = self.client.openai.responses.create(
            model="gpt-4.1-nano",
            instructions=_instructions,
            input=_input
        )

        await interaction.followup.send(content=response.output_text)
