"""
---
cog: compliment
"""
import random
import discord
from discord.ext import commands
from pyucc import console
from utils.client import Client
from utils.checks.openai import openai_check


class compliment(commands.Cog):

    def __init__(self, client: Client) -> None:
        self.client = client

    @discord.app_commands.command()
    @openai_check
    async def compliment(self, interaction: discord.Interaction, user: discord.User):

        await interaction.response.defer(thinking=True)

        _choices = [
            "Send a random Monty Python quote, e.g., 'Your mother was a hamster and your father smelt of elderberries!'",
            "Send a Monty Python-style sketch/dialogue snippet",
            "Give {@user} a silly insult or title",
        ]

        _input = random.choice(_choices).replace(
            "{@user}", interaction.user.display_name or interaction.user.name)

        console.info("Sending prompt", _input)

        _instructions = """
                You are a discord bot named 'Trelbot'.
                People will sometimes ask you to give them something related to Monty Python 'Monty Python, also known as the Pythons, were a British comedy troupe formed in 1969 consisting of Graham Chapman, John Cleese, Terry Gilliam, Eric Idle, Terry Jones and Michael Palin. The group came to prominence for the sketch comedy series Monty Python's Flying Circus, which aired on the BBC from 1969 to 1974',
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
