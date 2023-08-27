from typing import Optional
from . import snowflake

class channel:
    """
    Discords channel class, contains variables that `correspond` 
    to discords [channel-object](https://discord.com/developers/docs/resources/channel#channel-object)
    Must pass in a dictionary from a json response of discord, should contain the values in discords docs.
    """

    def __init__(self, __values: dict) -> None:
        self.id: snowflake
        self.type: int
        self.guild_id: Optional[snowflake] 
        self.position: int
        self.name: Optional[str]
        self.topic: Optional[str]
        self.nsfw: Optional[bool]
        self.last_message_id: Optional[snowflake]
        self.bitrate: Optional[snowflake]
        self.user_limit: Optional[int]
        self.rate_limit_per_user: Optional[int]
        self.__dict__.update(__values)
