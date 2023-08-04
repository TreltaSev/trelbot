"""
shared.bot_overlay
~~~~~~~~~~~~~~~~~~
A custom client class that overlays discord Client class, adding a fre custom methods
"""
import discord
from typing import Any


class Client(discord.Client):    
    """
    Inherits from discord.Client
    """
    def __init__(self, *, intents: discord.flags.Intents, **options: Any) -> None:
        super().__init__(intents=intents, **options)
