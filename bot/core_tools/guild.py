"""
bot.types.guild
~~~~~~~~~~~~~~~

Holds all the classes used to differentiate and access
guild values.
"""
import typing



class PartialGuild:
    """
    Converts a partial guild id and name into an object to be read.
    used for development guild inhabitance.

    Arguuments
    ~~~~~~~~~~

    `REQUIRED` id: typing.Union[str, int]
        id of a guild in an int format or str format, will be converted to an integer.

    `REQUIRED` name: str
        Name of a guild for logging purposes.    
    """

    def __init__(self, id: typing.Union[str, int], name: str):
        if isinstance(id, str):
            id = int(id)
        self.id: int = id
        self.name: str = name
