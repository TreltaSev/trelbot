"""
shared.bot_overlay
~~~~~~~~~~~~~~~~~~
A custom client class that overlays discord Client class, adding a fre custom methods
"""
import discord
import requests
from typing import Any
from bot.exts.constants.client import Setup


class Client(discord.Client):    
    """
    Inherits from discord.Client
    """

    authorization_headers = {"Authorization": F"Bot {Setup.get_token()}"}    
    def __init__(self, *, intents: discord.flags.Intents, **options: Any) -> None:
        super().__init__(intents=intents, **options)

    class get:
        """
        Get certain values primaraly by requests
        """

        @classmethod
        def guilds(cls):
            """
            Returns all guilds of the bot in a json format
            """

            return requests.get("https://discord.com/api/users/@me/guilds", headers=Client.authorization_headers).json()