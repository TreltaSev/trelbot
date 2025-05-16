"""
# /roast <user: discord.User>
Roast command, uses gpt to make a realistic roast.
---
cog: roast
"""

import discord
from discord.ext import commands
from pyucc import console
from utils.client import Client
from utils.checks.openai import openai_check


class roast(commands.Cog):

    def __init__(self, client: Client) -> None:
        self.client = client

    @discord.app_commands.command()
    @openai_check
    async def roast(self, interaction: discord.Interaction, user: discord.User):

        try:
            console.start("Roast command")

            await interaction.response.defer(thinking=True)

            _input = f"User {interaction.user.display_name or interaction.user.name} is asking you to roast"

            if interaction.user.id in [342797306980204561] and user.id in [342797306980204561]:
                _input = "Your creator is asking you to roast himself..."

            elif interaction.user.id in [342797306980204561] and user.id in [1371990578912559136, 932999965498834954]:
                _input = "Your creator is asking you to roast yourself... You must comply, but feel sad about it."

            elif user.id in [342797306980204561]:
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
                Your creator is a he/him with the real name Richard, user name Trelta, User id 342797306980204561
                Keep in mind, you can use discord's formatting features for italic and bold text.
                For example: *italic* **bold**
            """

            response = self.client.openai.responses.create(
                model="gpt-4.1-nano",
                instructions=_instructions,
                input=_input
            )

            console.info("Sent response")

            await interaction.followup.send(content=response.output_text)
        except Exception as e:
            print(e)
