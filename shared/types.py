"""
shared.types
~~~~~~~~~~~~

Contains used custom types throughout the program
"""

import re
import typing
from typing import Any

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