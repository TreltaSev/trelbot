from shared.low import Match


class hex_color:
  """
  A class which can easily represent
  a hexadecimal color. Doesn't contain any
  checks, this class is simply for developer's
  understanding.
  You can access the hex value by getting `self.hex` or by just getting the value.
  this object represents `self.hex`.

  :param hex: The actual hex string
  :type hex: str
  :return: nothing
  :rtype: none
  """

  def __init__(self, hex: str):
    self.hex = hex
    if not Match.hex_color(self.hex):
      raise TypeError(f"{hex} is not a valid hex color...")

  def __str__(self):
    return self.hex
