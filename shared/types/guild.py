from typing import Union

from shared import db


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
    self.settings: dict
    self.__dict__.update(__values)
    self.icon_url = f"https://cdn.discordapp.com/icons/{self.id}/{self.icon}.png" if self.icon is not None else "https://cdn.discordapp.com/attachments/964527554159607819/1087529162371248179/discordblue.png"

  def get_settings(self) -> None:
    self.settings = db.Access(guild_id=str(self.id)).get_settings()
