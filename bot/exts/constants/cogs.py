"""
bot.exts.constants.cogs
~~~~~~~~~~~~~~~~~~~~~~~~~

Holds Cogs Class used to locate and use cogs
"""

import functools
import os
from typing import List, Union

from discord.ext import commands

from . import client as packageClient


class Cogs:
  """
  Class which holds methods that have to do with locating and using cog files.
  """
  @classmethod
  def FindAll(cls, directory: str, extension: str = ".py", exclusions: Union[List[str], str] = ["__init__.py"]) -> list:
    """
    Finds all possible Discord "Cogs" within a specified directory.

    :param directory: The path of the parent directory containing the cog files 
    :param extension: The extension of the cog files, defaults to ".py"
    :param exclusions: Files to skip, defaults to ["__init__.py"]
    :return: a list containing all cog paths using separators as "."
    :rtype: List[str]           
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
    A Basic level setup method to be used as a decorator whenever setting up a cog.
    This should be placed above a method named "setup" in your cog.

    ```
    @Setup.basic(CommandClass, CommandName)
    async def setup():
      pass
    ```
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
