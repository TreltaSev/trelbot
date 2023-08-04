"""
shared.db
~~~~~~~~~
Access local databases with sqlite3 package
"""
import sqlite3
import typing
import logging

from . import config, connections

logging.basicConfig(level=logging.DEBUG)

class Settings:
    """
    Reads, Writes and Saves data within discord.guild.settings.db
    takes in a guild_id
    """
    
    def __init__(self, guild_id: typing.Union[str, int]):
        self.guild_id = guild_id
        self.cursor: sqlite3.Cursor = connections.settings.cursor()
