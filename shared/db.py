"""
shared.db
~~~~~~~~~
Access local databases with sqlite3 package
"""
import os
import json
import sqlite3
import logging
import typing

from . import types, interpreter

logging.basicConfig(level=logging.CRITICAL)

class Settings:
    """
    Reads, Writes and Saves data within discord.guild.settings.db
    takes in a guild_id
    """

    __base: str = "background:#181818;pfp:true;pfp_location:[center,50];pfp_border_color:#fff;pfp_border_width:20;main_text_size:64;sub_text_size:20;display_name:true;display_member_count:true;"

    interpreter.ConfigInterperter(__base)
    _template: dict = {
        "banners": {
          "on_join": interpreter.ConfigInterperter(f"{__base}main_text:Welcome to the server;sub_text:Ahoy!;").values,
          "on_leave": interpreter.ConfigInterperter(f"{__base}main_text:Goodbye;sub_text:Good luck on your travels;").values,
          "on_ban": interpreter.ConfigInterperter(f"{__base}main_text:Get Banished;sub_text:You have violated the law!;").values,            
        }
    }    

    connection = sqlite3.connect(f"{os.getcwd()}/../shared/discord.guild.settings.db")
    
    def __init__(self, guild_id: typing.Union[str, int]):        
        self.guild_id = str(guild_id)
        self.cursor: sqlite3.Cursor = Settings.connection.cursor()

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
        Settings.connection.commit()

        logging.debug(f"Created new table: {self.guild_id}")

    def _update_banner(self, type: typing.Literal["on_join", "on_leave", "on_ban"], _in: str) -> None:
        """
        ~Added

        Updates banner settings, takes in a type which can take in
        `on_join` &or
        `on_leave` &or
        `on_ban`
        as a string

        the _in is a css like format of banner settings which will be validated before updation.
        """
        if type not in ["on_join", "on_leave", "on_ban"]:
            print("Failed xx1")
            return
        
        # Get Current settings from db
        _current = self.get()

        # modify seleted type
        _current["banners"][type] = interpreter.ConfigInterperter(_current["banners"][type]).update_self_with(_in).values

        # save values
        self.cursor.execute(f"UPDATE '{self.guild_id}' SET data = ?", (json.dumps(_current),))

        Settings.connection.commit()



    


        



        
