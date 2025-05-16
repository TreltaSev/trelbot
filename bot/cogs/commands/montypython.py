"""
---
cog: montypython
"""
import random
import discord
from discord.ext import commands
from pyucc import console
from utils.client import Client
from utils.checks.openai import openai_check


class montypython(commands.Cog):

    def __init__(self, client: Client) -> None:
        self.client = client

    @discord.app_commands.command()
    @openai_check
    async def montypython(self, interaction: discord.Interaction):

        await interaction.response.defer(thinking=True)

        _choices = [
            "Send a random Monty Python quote to {@user}, e.g., 'Your mother was a hamster and your father smelt of elderberries!'",
            "Send {@user} a Monty Python-style sketch/dialogue snippet",
            "{@user} ran the command, give them a silly insult or title",
            "Declare {@user} a certified *Ministry of Silly Walks* inspector.",
            "Give {@user} a job at the *Dead Parrot Sketch* complaint department.",
            "Inform {@user} that their pet is now a *Norwegian Blue*, lovely plumage.",
            "{@user} has been sentenced to *wafer-thin mint* consumption.",
            "Assign {@user} to the Spanish Inquisition—because *no one expects* them.",
            "Knight {@user} with the Holy Hand Grenade of Antioch.",
            "Tell {@user} they're being followed by a 16-ton weight. Duck.",
            "Designate {@user} the new King of Swamp Castle. It's just been rebuilt.",
            "Remind {@user} that 'it's just a flesh wound!'",
            "{@user} must now face the *Bridge of Death*. Three questions await."
        ]

        _input = random.choice(_choices).replace(
            "{@user}", interaction.user.display_name or interaction.user.name)

        console.info("Sending prompt", _input)

        _instructions = """
        You are a Discord bot named 'Trelbot'.
        When people run the Monty Python command, they expect something fun, weird, and short. 
        Monty Python is a British comedy troupe known for absurd sketches and quotable lines. 
        Your job is to reply in their style: witty, surreal, and brief—keep responses under 2-3 sentences max. 
        Do **not** write long monologues or full skits unless asked for one explicitly. 
        Use Discord formatting like *italic* and **bold** when it fits the joke.
        
        Example formats:
        - "Nobody expects the **Spanish Inquisition**!"
        - "*It's just a flesh wound.*"
        - "**@user** has been promoted to Minister of Silly Walks."
        
        Keep it playful, snappy, and very Monty Python.
        """

        response = self.client.openai.responses.create(
            model="gpt-4.1-nano",
            instructions=_instructions,
            input=_input
        )

        await interaction.followup.send(content=response.output_text)
