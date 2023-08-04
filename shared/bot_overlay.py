"""
shared.bot_overlay
~~~~~~~~~~~~~~~~~~
A custom client class that overlays discord Client class, adding a fre custom methods
"""
import discord
import requests
import typing
from bot.exts.constants.client import Setup


class Client(discord.Client):    
    """
    Inherits from discord.Client
    """

    authorization_headers = {"Authorization": F"Bot {Setup.get_token()}"}    
    def __init__(self, *, intents: discord.flags.Intents, **options: typing.Any) -> None:
        super().__init__(intents=intents, **options)

    class get:
        """
        Get certain values primaraly by requests
        """
        
        class guilds:
            """
            get values in guilds
            """

            def __new__(cls, *args, **kwargs):
                return requests.get("https://discord.com/api/users/@me/guilds", headers=Client.authorization_headers).json()
            
        
    class check:
        """
        ClassMethods that check if values exist
        """

        @classmethod
        def has_access_to_guild(cls, guild_id: typing.Union[str, int], guilds: typing.Union[list, None] = None) -> typing.Union[None, bool]:
            """
            Checks if the bot has access to a guild via guild id by running Client.get.guilds() and checking if the
            inputed guild_id is inside the json response, if the guilds argument is populated with a dictionary
            it checks that instead, dict must be a list with multiple dicts inside each dict having an id attribute.
            """                

            if isinstance(guilds, type(None)):
                guilds = Client.get.guilds()

            return any(str(guild_id) == str(_guild.get("id")) for _guild in guilds)
