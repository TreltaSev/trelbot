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
    self.active: bool = kwargs.get("active", False)
    self.channel: snowflake = kwargs.get("channel", None)
    self.enable_text: bool = kwargs.get("enable_text", False)
    self.text_content: str = kwargs.get("text_content", None)
    self.use_custom_image: bool = kwargs.get("use_custom_image", False)
    self.custom_image_data: str = kwargs.get("custom_image_data", None)
