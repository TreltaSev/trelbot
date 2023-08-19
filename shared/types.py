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


class permissions:
    """
    Permissions class, takes in a discord integer permission type
    and converts that into every possible dicsord permission.
    """

    raw = {
        "CREATE_INSTANT_INVITE":       0x0000000000000001,
        "KICK_MEMBERS":                0x0000000000000002,
        "BAN_MEMBERS":                 0x0000000000000004,
        "ADMINISTRATOR":               0x0000000000000008,
        "MANAGE_CHANNELS":             0x0000000000000010,
        "MANAGE_GUILD":                0x0000000000000020,
        "ADD_REACTIONS":               0x0000000000000040,
        "VIEW_AUDIT_LOG":              0x0000000000000080,
        "PRIORITY_SPEAKER":            0x0000000000000100,
        "STREAM":                      0x0000000000000200,
        "VIEW_CHANNEL":                0x0000000000000400,
        "SEND_MESSAGES":               0x0000000000000800,
        "SEND_TTS_MESSAGES":           0x0000000000001000,
        "MANAGE_MESSAGES":             0x0000000000002000,
        "EMBED_LINKS":                 0x0000000000004000,
        "ATTACH_FILES":                0x0000000000008000,
        "READ_MESSAGE_HISTORY":        0x0000000000010000,
        "MENTION_EVERYONE":            0x0000000000020000,
        "USE_EXTERNAL_EMOJIS":         0x0000000000040000,
        "VIEW_GUILD_INSIGHTS":         0x0000000000080000,
        "CONNECT":                     0x0000000000100000,
        "SPEAK":                       0x0000000000200000,
        "MUTE_MEMBERS":                0x0000000000400000,
        "DEAFEN_MEMBERS":              0x0000000000800000,
        "MOVE_MEMBERS":                0x0000000001000000,
        "USE_VAD":                     0x0000000002000000,
        "CHANGE_NICKNAME":             0x0000000004000000,
        "MANAGE_NICKNAMES":            0x0000000008000000,
        "MANAGE_ROLES":                0x0000000010000000,
        "MANAGE_WEBHOOKS":             0x0000000020000000,
        "MANAGE_EMOJIS_AND_STICKERS":  0x0000000040000000,
        "USE_APPLICATION_COMMANDS":    0x0000000080000000,
        "REQUEST_TO_SPEAK":            0x0000000100000000,
        "MANAGE_EVENTS":               0x0000000200000000,
        "MANAGE_THREADS":              0x0000000400000000,
        "CREATE_PUBLIC_THREADS":       0x0000000800000000,
        "CREATE_PRIVATE_THREADS":      0x0000001000000000,
        "USE_EXTERNAL_STICKERS":       0x0000002000000000,
        "SEND_MESSAGES_IN_THREADS":    0x0000004000000000,
        "USE_EMBEDDED_ACTIVITIES":     0x0000008000000000,
        "MODERATE_MEMBERS":            0x0000010000000000
    }

    def __init__(self, discord_permission: int) -> None:
        self.CREATE_INSTANT_INVITE: bool = False
        self.KICK_MEMBERS: bool = False
        self.BAN_MEMBERS: bool = False
        self.ADMINISTRATOR: bool = False
        self.MANAGE_CHANNELS: bool = False
        self.MANAGE_GUILD: bool = False
        self.ADD_REACTIONS: bool = False
        self.VIEW_AUDIT_LOG: bool = False
        self.PRIORITY_SPEAKER: bool = False
        self.STREAM: bool = False
        self.VIEW_CHANNEL: bool = False
        self.SEND_MESSAGES: bool = False
        self.SEND_TTS_MESSAGES: bool = False
        self.MANAGE_MESSAGES: bool = False
        self.EMBED_LINKS: bool = False
        self.ATTACH_FILES: bool = False
        self.READ_MESSAGE_HISTORY: bool = False
        self.MENTION_EVERYONE: bool = False
        self.USE_EXTERNAL_EMOJIS: bool = False
        self.VIEW_GUILD_INSIGHTS: bool = False
        self.CONNECT: bool = False
        self.SPEAK: bool = False
        self.MUTE_MEMBERS: bool = False
        self.DEAFEN_MEMBERS: bool = False
        self.MOVE_MEMBERS: bool = False
        self.USE_VAD: bool = False
        self.CHANGE_NICKNAME: bool = False
        self.MANAGE_NICKNAMES: bool = False
        self.MANAGE_ROLES: bool = False
        self.MANAGE_WEBHOOKS: bool = False
        self.MANAGE_EMOJIS_AND_STICKERS: bool = False
        self.USE_APPLICATION_COMMANDS: bool = False
        self.REQUEST_TO_SPEAK: bool = False
        self.MANAGE_EVENTS: bool = False
        self.MANAGE_THREADS: bool = False
        self.CREATE_PUBLIC_THREADS: bool = False
        self.CREATE_PRIVATE_THREADS: bool = False
        self.USE_EXTERNAL_STICKERS: bool = False
        self.SEND_MESSAGES_IN_THREADS: bool = False
        self.USE_EMBEDDED_ACTIVITIES: bool = False
        self.MODERATE_MEMBERS: bool = False

        for permission in permissions.raw:
            setattr(self, permission, (discord_permission & permissions.raw[permission]) == permissions.raw[permission])
