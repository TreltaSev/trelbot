import functools
from typing import Callable

import discord
from utils.client import Client


class CommandDisabled(discord.Embed):
    def __init__(self, interaction: discord.Interaction, reason: str = "No reason given"):
        __description: str = f"Command **/{interaction.command.name}** is currently disabled\nReason: *{reason}*"
        super().__init__(color=discord.Color.red(),
                         title=f"/{interaction.command.name} Disabled", type="rich", description=__description)


def openai_check(func: Callable):
    """
    Checks if openai api calls are available, if not, it sends out a error embed message
    """
    @functools.wraps(func)
    async def wrapper(*args, **kwargs):
        class_instance = args[0]
        interaction: discord.Interaction = args[1]

        client: Client = interaction.client

        if not client.openai.active:
            await interaction.response.send_message(embed=CommandDisabled(interaction, "OpenAI key invalid/dne"))
            return

        return await func(class_instance, interaction, **kwargs)

    return wrapper
