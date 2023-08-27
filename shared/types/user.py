from typing import Union, Optional, Any

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
