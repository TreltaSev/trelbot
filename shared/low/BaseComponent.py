from typing import Literal

from shared.types import undefined


class BaseComponent:
  """
  A Banner component containing location coordinates, types
  and the such. this is a base level component which should be inherited from by
  other classes such as :class:`ImageComponent` and :class:`TextComponent`
  """

  def __init__(self, *_, **kwargs):
    self.width: int = kwargs.get("width", undefined())
    self.height: int = kwargs.get("height", undefined())
    self.x: int = kwargs.get("x", undefined())
    self.y: int = kwargs.get("y", undefined())
    self.center: Literal["v", "h", "b"] = kwargs.get("center", undefined())
    self.radius: int = kwargs.get("radius", undefined())
