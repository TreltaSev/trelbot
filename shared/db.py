"""
shared.db
~~~~~~~~~
Access local databases with sqlite3 package
"""
import json
import sqlite3
import typing
import logging

from . import config, connections, types

logging.basicConfig(level=logging.DEBUG)

class Settings:
    """
    Reads, Writes and Saves data within discord.guild.settings.db
    takes in a guild_id
    """

    _template: dict = {
        "banner": """background:color("#fff");pfp:true;pfp_location:[center, center];pfp_border_color:color("#fff");pfp_border_width:20;main_text:Welcome to the sever;main_text_size: 64;sub_text:Leave and all cry;sub_text_size:12;display_name:true;display_member_count:true;"""
    }
    
    def __init__(self, guild_id: str):
        self.guild_id = guild_id
        self.cursor: sqlite3.Cursor = connections.settings.cursor()

        if not isinstance(guild_id, types.GuildID):
            logging.error("Not a valid guild id")
            return

        self._create_if_not_exists()

    def get(self) -> dict: 
        logging.debug(f"Getting Guild: {self.guild_id}")
        if not self._table_exists():
            logging.debug("Guild Doesnt exist")
            return {}
        
        self.cursor.execute(f"SELECT data FROM '{self.guild_id}'")
        return json.loads(self.cursor.fetchone()[0])
        

    def _table_exists(self) -> bool:
        """Returns a bool representing if self.guild_id exists inside of the database"""
        self.cursor.execute(f"SELECT name FROM sqlite_master WHERE type='table' AND name='{self.guild_id}'")
        return self.cursor.fetchone() is not None

    def _create_if_not_exists(self):
        """
        Creates a table containing the guilds settings in discord.guild.settings.db
        """

        if self._table_exists():
            logging.debug("In Create If Not Exists Check: Table Exists")
            return        
        
        self.cursor.execute(f"CREATE TABLE IF NOT EXISTS '{self.guild_id}' (data TEXT)")
        self.cursor.execute(f"INSERT INTO '{self.guild_id}' (data) VALUES (?)", (json.dumps(Settings._template), ))
        connections.settings.commit()

        logging.debug(f"Created new table: {self.guild_id}")



        
