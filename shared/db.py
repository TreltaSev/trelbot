"""
shared.db
~~~~~~~~~
Access local databases with sqlite3 package
"""
import os
import json
import sqlite3
import logging

from . import types, interpreter

logging.basicConfig(level=logging.CRITICAL)

class Settings:
    """
    Reads, Writes and Saves data within discord.guild.settings.db
    takes in a guild_id
    """

    _template: dict = {
        "banner": """background:#fff;pfp:true;pfp_location:[center,50];pfp_border_color:#fff;pfp_border_width:20;join_main_text:Welcome to the sever;leave_main_text:GoodBye..?;main_text_size:64;join_sub_text:Leave and all cry;leave_sub_text:You left now me cry;sub_text_size:20;display_name:true;display_member_count:true;"""
    }

    connection = sqlite3.connect(f"{os.getcwd()}/../shared/discord.guild.settings.db")
    
    def __init__(self, guild_id: str):
        self.guild_id = guild_id
        self.cursor: sqlite3.Cursor = Settings.connection.cursor()

        if not isinstance(guild_id, types.GuildID):
            logging.error("Not a valid guild id")
            return

        self._create_if_not_exists()

    def get(self) -> dict: 
        """Returns current settings from a specific guild in a json format as a dictionary"""
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
        print(json.dumps(Settings._template))
        Settings.connection.commit()

        logging.debug(f"Created new table: {self.guild_id}")

    def update(self, _new_settings: str) -> None:
        """Updates a specific guilds settings for banners"""

        if not self._table_exists():
            logging.error(f"During Update: {self.guild_id} table doesn't exist... File corruption?")
            return 
        
        # Get the current settings
        _current_settings = self.get()
        
        # Convert the new settings to a viable format, replacing inputted values as needed  
        _new_config = interpreter.ConfigInterperter(_new_settings)

        # Update the settings in the current database

        # Commit changes
        



        
