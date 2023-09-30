from typing import Any, List

from shared.low import BaseComponent, TextComponent
from shared.types import snowflake, undefined, va_pair


class BannerHead:
  """
  A banner type that is used
  to hold relevant information of banners
  and its creation.
  """

  def __init__(self, *_, **kwargs):
    self.active: bool = kwargs.get("active", undefined())
    self.channel: snowflake = kwargs.get("channel", undefined())
    self.channel_text: va_pair = kwargs.get("channel_text", undefined())
    self.image_css: va_pair = kwargs.get("image_css", undefined())
    self.components: List[TextComponent, BaseComponent] = kwargs.get("components", undefined())
