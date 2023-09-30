from typing import Any


class va_pair:
  """
  Value Active pair contains two values, value and active.
  used to subport values and actives in banners.

  :param value: The value that would be used
  :param active: if the value should be used
  :type value: Any
  :type active: bool
  :return: Nothing
  :rtype: Nothing
  """
  def __init__(self, value, active: bool = True) -> None:
    self.value: Any = value
    self.active: bool = active