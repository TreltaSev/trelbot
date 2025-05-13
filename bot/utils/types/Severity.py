from pyucc import console, colors, symbols
from typing import Tuple, Optional, List, Any, Union
import datetime


class SeverityChild(tuple):

  def __init__(self, name: str, level: int, name_short: Optional[str] = None, background: Optional[str] = None, foreground: Optional[str] = "#fff") -> None:
    self.name: str = name
    self.level: int = level
    self.name_short: str | None = name_short
    self.background: hex | str | None = background
    self.foreground: hex | str | None = foreground

  def __new__(cls, name: str, level: int, *args, **kwargs) -> None:
    return super(SeverityChild, cls).__new__(cls, tuple((name, level,)))

  def check_y(function):
    def wrapper(*args, **kwargs):
      _, y = args
      if not hasattr(y, "level"):
        return NotImplemented
      return function(*args, **kwargs)
    return wrapper

  def handle(self, context: Union[object, str, Any], override_timestamp: bool = True) -> None:
    out_buff: list[str] = []

    out_buff.append(self.event_bar)

    if override_timestamp:
      out_buff.append(self.current_time_formatted)

    out_buff.append(context)
    console.cprint(*out_buff)

  @check_y
  def __lt__(self, y):
    return self.level < y.level

  # x <= y
  @check_y
  def __le__(self, y):
    return self.level <= y.level

  # x == y
  @check_y
  def __eq__(self, y):
    return self.level == y.level

  # x != y
  @check_y
  def __ne__(self, y):
    return self.level != y.level

  # x > y
  @check_y
  def __gt__(self, y):
    return self.level > y.level

  # x >= y
  @check_y
  def __ge__(self, y):
    return self.level >= y.level

  @property
  def event_bar(self) -> str:
    out_buff: list[str] = []
    out_buff.append(str(colors.chex(self.background, "background")))
    out_buff.append(f"  {self.name_short}  ")
    out_buff.append(symbols.reset)
    return console.format(*out_buff, sep="")

  @property
  def current_time_formatted(self) -> str:
    out_buff: list[str] = []
    out_buff.append(str(colors.chex("#aaa")))
    out_buff.append(datetime.datetime.now().strftime("%m/%d/%Y %I:%M:%S %p"))
    out_buff.append(symbols.reset)
    return console.format(*out_buff, sep="")


class Severity:
  """
  Severity Object, contains Tuples that relate to the name and level
  of a severity dignified
  """

  # Levels Type Hinting
  Info: Tuple[str, int] = SeverityChild("Info", 0, name_short="INFO", background="#305EFF")
  Warning: Tuple[str, int] = SeverityChild("Warning", 1, name_short="WARN", background="#FF7300")
  Error: Tuple[str, int] = SeverityChild("Error", 2, name_short="FAIL", background="#FF3F30")
  Fatal: Tuple[str, int] = SeverityChild("Fatal", 3, name_short="FATAL", background="#FF3F30")

  @classmethod
  def __level__(cls, name: str, level: int):
    """
    Convert arguments into a tuple
    :arg name: str: String descriptor of severity level
    :arg level: int: severity level
    """
    setattr(cls, name, tuple((name, level,)))

  @classmethod
  def __gather__(cls) -> List[SeverityChild]:
    """
    "Gathers" all SeverityChild values in self.__dict__ and returns a list
    containing the search response.
    :returns: List[SeverityChild]
    """
    buff: List[SeverityChild] = []
    for _, v in cls.__dict__.items():
      if isinstance(v, SeverityChild):
        buff.append(v)
    return buff

  @classmethod
  def __isvalid__(cls, value: Any):
    """
    Checks if a value is of type None, returns False if thats the case.
    :returns: Literal[True, False]
    """
    if isinstance(value, type(None)):
      return False
    return True

  @classmethod
  def __search__(cls, name: Optional[str] = None, level: Optional[int] = None) -> SeverityChild | None:
    """
    Checks if a SeverityChild exists by searching for a name or level, returns
    the child found or None. checks name first then level.
    :arg name: Optional[str] = None: Name of severity object
    :arg level: Optional[int] = None: Level of severity object
    :returns: Union[SeverityChild, None]
    """
    for child in cls.__gather__():
      if (cls.__isvalid__(name) and child.name == name) or (cls.__isvalid__(level) and child.level == level):
        return child
    return None
  
  @classmethod
  def __parse_severity__(cls, severity: Union[str, int, SeverityChild]) -> SeverityChild:
    """
    Takes in a string, integer or SeverityChild and attempts to convert the input into a valid
    Severity object,
    :arg severity: Union[str, int, :class:`SeverityChild`]: Object in question
    """
    # Convert Input Severity to Localized
    localized_severity: Optional[SeverityChild] = None
    if isinstance(severity, str):
      localized_severity = Severity.__search__(name=severity)
    elif isinstance(severity, int):
      localized_severity = Severity.__search__(level=severity)
    elif isinstance(severity, SeverityChild):
      localized_severity = severity
    return localized_severity