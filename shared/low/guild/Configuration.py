import json
from typing import Optional, Union

from shared.low import guild
from shared.types import hex_color, snowflake, undefined

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

  :param configuration: A Optional Initial Parameter which can form the object automatically depending on what is inserted.
  :type configuration: Optional[Union[str, dict, None]] = None
  :return: Nothing
  :rtype: None  
  """

  def __init__(self, configuration: Optional[Union[str, dict, None, int]] = None):
    self._base_level_configuration = configuration
    self.automations: automations = automations()

  @classmethod
  def __unpack(cls, obj):
    """
    takes this class, "unpacks" all the values inside of it so it can be used in `cls.obj` or `cls.json`

    :param obj: Its just some form of `self`
    :return: A dictionary containing all the values of this class that's human readable, make sure to sanitize this data because it may or may not hold very sensitive information :)
    :rtype: dict
    """
    vals = {}
    for key, value in vars(obj).items():
      key: str
      if key.startswith("_"):
        continue
      if isinstance(value, type(undefined())):
        vals[key] = undefined().__str__()
        continue
      if isinstance(value, (str, int, list)):
        vals[key] = value
        continue
      if hasattr(value, "__dict__"):
        vals[key] = cls.__unpack(value)
      else:
        vals[key] = value
    return vals

  @property
  def obj(self) -> dict:
    """
    Unpacks and returns a dictionary, basically just `self.__unpack(self)`

    :return: A Unpacked Self Object
    :rtype: dict
    """
    return self.__unpack(self)

  @property
  def json(self) -> str:
    """
    Unpacks self to a dictionary and turns it into a json serializable string.

    :return: A json serializable string representing self
    :rtype: str
    """
    return json.dumps(self.__unpack(self))


class automations:
  """
  Class which contains banner information such as `on_join`, `on_leave`.
  """

  def __init__(self) -> None:
    self.on_join: guild.BannerHead = guild.BannerHead()
    self.on_leave: guild.BannerHead = guild.BannerHead()
