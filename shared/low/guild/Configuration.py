from typing import Optional, Union

from shared.low import guild
from shared.types import hex_color, snowflake

possible = {
    "other_option": 1,
    "automations": {
        "on_join": {
            "active": False,
            "channel": "391876398265123",
            "channel_text": {
                "value": "Some formattable text",
                "active": False
            },
            "image_css": {
                "value": "background:pog",
                "active": True
            }
        }
    }
}


class Configuration:
  """
  A guild configuration class
  that holds methods and values that allow
  you to format to and from a json serializable string, 
  dictionary, and this object.  

  :param configuruation: A Optional Initial Paramter which can form the object automatically depending on what is inserted.
  :type configuuration: Optional[Union[str, dict, None]] = None
  :return: Nothing
  :rtype: None  
  """

  def __init__(self, configuration: Optional[Union[str, dict, None, int]] = None):
    self._base_level_configuration = configuration
    self.banners: Banners = Banners()

    # # Guild ID Of the server
    # self.guild: snowflake

    # self.background_color: hex_color = hex_color("#fff")


class Banners:
  """
  Class which contains banner information such as `on_join`, `on_leave`, and `on_ban`.
  """

  def __init__(self) -> None:
    self.on_join: guild.BannerHead = guild.BannerHead()
    self.on_leave: guild.BannerHead = guild.BannerHead()
    self.on_ban: guild.BannerHead = guild.BannerHead()
