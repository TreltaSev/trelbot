"""
shared.db
~~~~~~~~~
Access local databases with sqlite3 package
"""
import json
import logging
import os
import sqlite3
import typing
from pathlib import Path
from typing import Optional

from pyucc import colors, console, symbols

from . import interpreter, types

logging.basicConfig(level=logging.CRITICAL)


class Entry:
  """
  Should be used as inheritance, contains the variable `cursor` which will be used as an integration
  with sqlite3.  
  """

  def __init__(self, guild_id: str, database_location: Optional[str] = None, database_name: Optional[str] = "database.db") -> None:
    self.guild_id = guild_id
    print(__file__)
    if not database_location:
      database_location = f"{str(Path(__file__).parent)}\\{database_name}"

    print(database_location)

    self.cursor: sqlite3.Cursor = sqlite3.connect(database_location).cursor()

  def table_exists(self, name: Optional[str] = None) -> bool:
    """
    Checks if a name exists within the database.
    :param name: The name of the table to check within the database
    :return: A boolean representing if the table exists
    :rtype: bool
    """

    if not name:
      name = self.guild_id

    self.cursor.execute(f"SELECT name FROM sqlite_master WHERE type='table' AND name='{name}'")
    return self.cursor.fetchone() is not None

  def create_if_not_exists(self, data: any, name: Optional[str] = None) -> None:
    """
    Creates a table within the database if it doesn't exist,
    :param name: Name of the table
    :param data: Data of the table to be inserted
    """

    if not name:
      name = self.guild_id

    if not self.table_exists():
      console.db(f"{colors.vibrant_orange}Table not exist: {colors.vibrant_yellow}{name}")

    self.cursor.execute(f"CREATE TABLE IF NOT EXISTS '{name}' (data TEXT)")
    self.cursor.execute(f"INSERT INTO '{name}' (data) VALUES (?)", (data, ))
    self.cursor.connection.commit()

    console.db(f"{colors.vibrant_violet}CIFE {colors.vibrant_green}Ran Through: {colors.vibrant_violet}{name}")

  @property
  def database_template(self):
    """
    Using an up-to-date template, this property when "got" returns a dictionary containing key value pairs pertaining to default
    values and keys of the database.
    """
    return {
        "automations:onjoin:channel": None
    }


class Access(Entry):
  """
  Updated version of settings class, contains methods that can read, write, and edit database entries.
  :param guild_id: The guild id of the guild you want to access.

  """

  def __init__(self, guild_id: typing.Optional[typing.Union[str, int]] = None) -> None:
    super().__init__(guild_id=guild_id)
    if not guild_id:
      pass

    self.guild_id: str = str(guild_id)

    # Check if guild is valid and that it exists

    # Check if the user has the required permissions to update this information

    # Change class status code to reflect the current state wether its all passed or if there is some issue.

  def verify_guild(self):
    """
    Checks if the attempted accessed guild actually exists and that it's valid.
    A guild should only contain numbers so this method checks if a guild is only numbers
    in its id.
    """
    pass

  def get_settings(self):
    """
    Gets a guilds settings in the database in a json format.
    """
    console.db(f"Getting Guild: {self.guild_id}")

    if not self.table_exists(self.guild_id):
      console.error(f"Guild Doesn't exist within Database: {self.guild_id}")
      raise ValueError(f"Guild Doesn't exist within Database: {self.guild_id}")

    self.cursor.execute(f"SELECT data FROM '{self.guild_id}'")

    response: any = self.cursor.fetchone()[0]

    try:
      response = json.loads(response)
    except:
      console.error(f"Response isn't json serializable, ignoring.")

    return response


# class Settings:
#   """
#   Reads, Writes and Saves data within discord.guild.settings.db
#   takes in a guild_id
#   """

#   __base: str = "background:#181818;pfp:true;pfp_location:[center,50];pfp_border_color:#fff;pfp_border_width:20;main_text_size:64;sub_text_size:20;display_name:true;display_member_count:true;"

#   interpreter.ConfigInterperter(__base)
#   _template: dict = {
#       "banners": {
#          "on_join": interpreter.ConfigInterperter(f"{__base}main_text:Welcome to the server;sub_text:Ahoy!;").values,
#           "on_leave": interpreter.ConfigInterperter(f"{__base}main_text:Goodbye;sub_text:Good luck on your travels;").values,
#           "on_ban": interpreter.ConfigInterperter(f"{__base}main_text:Get Banished;sub_text:You have violated the law!;").values,
#       }
#   }

#   connection = sqlite3.connect(f"{os.getcwd()}/../shared/discord.guild.settings.db")

#   def __init__(self, guild_id: typing.Union[str, int]):
#     self.guild_id = str(guild_id)
#     self.cursor: sqlite3.Cursor = Settings.connection.cursor()

#     self._create_if_not_exists()

#   def get(self) -> dict:
#     """Returns current settings from a specific guild in a json format as a dictionary"""
#     console.db(f"{colors.vibrant_blue}Getting Guild: {symbols.reset}{colors.vibrant_yellow}{self.guild_id}")
#     if not self._table_exists():
#       console.db(f"{colors.vibrant_red}Guild Doesn't Exist: {symbols.reset}{colors.vibrant_yellow}{self.guild_id}")
#       return {}

#     self.cursor.execute(f"SELECT data FROM '{self.guild_id}'")
#     return json.loads(self.cursor.fetchone()[0])

#   def _table_exists(self) -> bool:
#     """Returns a bool representing if self.guild_id exists inside of the database"""
#     self.cursor.execute(f"SELECT name FROM sqlite_master WHERE type='table' AND name='{self.guild_id}'")
#     return self.cursor.fetchone() is not None

#   def _create_if_not_exists(self):
#     """
#     Creates a table containing the guilds settings in discord.guild.settings.db
#     """

#     if not self._table_exists():
#       console.db(f"{colors.vibrant_orange}Table not exist: {colors.vibrant_yellow}{self.guild_id}")

#     self.cursor.execute(f"CREATE TABLE IF NOT EXISTS '{self.guild_id}' (data TEXT)")
#     self.cursor.execute(f"INSERT INTO '{self.guild_id}' (data) VALUES (?)", (json.dumps(Settings._template), ))
#     Settings.connection.commit()

#     console.db(f"Created new table: {colors.vibrant_yellow}{self.guild_id}")

#   def _update_banner(self, type: typing.Literal["on_join", "on_leave", "on_ban"], _in: str) -> None:
#     """
#     ~Added

#     Updates banner settings, takes in a type which can take in
#     `on_join` &or
#     `on_leave` &or
#     `on_ban`
#     as a string

#     the _in is a css like format of banner settings which will be validated before updation.
#     """
#     if type not in ["on_join", "on_leave", "on_ban"]:
#       print("Failed xx1")
#       return

#     # Get Current settings from db
#     _current = self.get()

#     # modify seleted type
#     _current["banners"][type] = interpreter.ConfigInterperter(_current["banners"][type]).update_self_with(_in).values

#     # save values
#     self.cursor.execute(f"UPDATE '{self.guild_id}' SET data = ?", (json.dumps(_current),))

#     Settings.connection.commit()
