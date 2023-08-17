"""
shared.types
~~~~~~~~~~~~

Contains used custom types throughout the program
"""

import re
from typing import Any, Union, Optional

class Guild_IDMetaClass(type):

    @staticmethod
    def is_valid_guild_id(guild_id: str):
        pattern = r'^[0-9]+$'
        return bool(re.match(pattern, guild_id))
    
    def __instancecheck__(self, __instance: Any) -> bool:
        return self.is_valid_guild_id(__instance)
    
class GuildID(int, metaclass=Guild_IDMetaClass):
    """
    Custom type to check if a guildid is valid
    """    
    pass

class user:
    """
    User class, contains simple variables such as id, name, avatar, and discriminator
    """
    def __init__(self, __values: dict) -> None:
        self.id: Union[str, int]
        self.name: str = __values["username"]
        self.discriminator: str
        self.avatar: Optional[Any]        
        self.__dict__.update(__values)
        self.avatar_url = f"https://cdn.discordapp.com/avatars/{self.id}/{self.avatar}" if self.avatar is not None else "https://cdn.discordapp.com/attachments/964527554159607819/1087529162371248179/discordblue.png"

class guild:
    """
    Guild class, contains simple variables
    """
    def __init__(self, __values: dict) -> None:
        self.id: Union[str, int]
        self.name: str
        self.icon: str
        self.owner: bool
        self.permissions: Union[str, int]
        self.approximate_member_count: int
        self.approximate_presence_count: int
        self.__dict__.update(__values)

