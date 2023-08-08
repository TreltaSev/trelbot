"""
bot.exts.constants.cogs
~~~~~~~~~~~~~~~~~~~~~~~~~

Holds Cogs Class used to locate and use cogs
"""

import os
import functools
from typing import Union, List
from discord.ext import commands
from . import client as packageClient


class Cogs:
    """
    Class which holds methods that have to do with locating and using cog files.
    """
    @classmethod
    def FindAll(cls, directory: str, extension: str = ".py", exclusions: Union[List[str], str] = ["__init__.py"]) -> list:
        """
        Finds all cogs within a certain directory, excluding everything that matches exclusions

        Arguments
        ~~~~~~~~~

        `REQUIRED` directory: str
            Location to look for cog files

        `OPTIONAL` extension: str
            Ending of a file to be considered a cog
            (defaults to `.py`)

        `OPTIONAL` exclusions: Union[List[str], str]
            exlusions that will be ignored as cog files
            (defaults to ["__init__.py"])
           
        """

        # Convert Exclusions to a list if its a string.
        if isinstance(exclusions, str):
            exclusions = [exclusions]

        cog_locations = []
        for root, _, files in os.walk(directory):
            for file in files:
                file: str

                if not isinstance(file, str):
                    continue

                if not file.endswith(extension) or file in exclusions:
                    continue

                cog_locations.append(os.path.relpath(os.path.join(root, file), os.getcwd()).replace("\\", ".").replace(extension, "").replace("/", "."))

        return cog_locations

class Setup:
    """
    Setup classes for cogs
    """

    @classmethod
    def basic(client: commands.Bot, method, name: str):
        """
        A setup decorater to be used whenever formulating a cog which can be a slash command or event

        Arguments
        ~~~~~~~~~

        `REQUIRED` client: commands.Bot

        """

        def decorator(func):
            @functools.wraps(func)            
            async def wrapper(*args, **kwargs):
                client: commands.Bot = args[0]
                if packageClient.isGlobal:
                    await client.add_cog(method(client))                
                else:
                    await client.add_cog(method(client), guilds=packageClient.Client.DevelopmentGuilds()())
                return await func(*args, **kwargs)
            return wrapper
        return decorator


                
