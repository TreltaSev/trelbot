from typing import Literal

from shared.low import BaseComponent
from shared.types import hex_color, undefined


class TextComponent(BaseComponent):
  """
  A TextComponent which inherits from `BaseComponent` and contains
  extra values such as `text`, `font`, `fontsize`, `color`
  :param width: Width of Component
  :param height: Height of Component
  :param x: Horizontal Position of the Component
  :param y: Vertical Position of the Component
  :param center: Should it center vertically, horizontally, or both?
  :param text: The text value
  :param font: The font used
  :param fontsize: the size of the font
  :param color: the color of the text
  :type width: int
  :type height: int
  :type x: int
  :type y: int
  :type center: Literal[v, h, b] | undefined()  
  """

  def __init__(self, *args, **kwargs):
    super(TextComponent, self).__init__(*args, **kwargs)
    self.text: str = kwargs.get("text", undefined())
    self.font: str = kwargs.get("font", undefined())
    self.fontsize: int = kwargs.get("fontsize", undefined())
    self.color: hex_color = kwargs.get("hex_color", undefined())
