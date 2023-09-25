import re
from typing import Any, Tuple, Union


class Match:
  """
  A class containing inheritable
  methods that can be used to check a values
  authenticity. Like `hex_color(str)` can be used to check
  if a string is a valid hex color. returns a boolean in this case.  
  """

  def return_check(func):
    """
    Used as a decorator, when used with a check method
    it can return the string or value inputed within a list
    which also contains if the check passed or not.
    The first value is always used to be represented as
    inV, while the values after that are ignored and passed onto
    the child `function`.
    """
    def wrapper(*args, **kwargs) -> Union[Tuple[bool, Any], bool, Any]:
      bMatch: bool = func(*args, **kwargs)
      if kwargs.get('dump_value', None):

        if kwargs.get("inV", None):
          return [bMatch, kwargs.get("inV")]

        if len(args) >= 1:
          return [bMatch, args[0]]
        raise IndexError("Failed in Return Check, length of args is 0 and kwargs has no inV")
      return bMatch
    return wrapper

  @staticmethod
  @return_check
  def hex_color(inV: str, *_, **__) -> bool:
    """
    Set `dump_value` to `True` in order to have this return Tuple[bool, Any]. The Any is the inputed value.
    :param inV: The `String` to check if its a hex or not.
    :return: `True` or `False`.
    :rtype: bool
    """
    pattern = re.compile(r'^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9A-fA-F]{8})$')
    if pattern.search(inV):
      return True
    return False
