import json
from typing import Optional, Any, Union, Union
from utils.types import SeverityChild, Severity
import sys


class HighLevelException(Exception):
  """
  Common Base for all server exceptions, should be inherited by a class in order to be used...
  :arg message: Optional[str]: text message that is to be displayed, defaults to None
  :arg severity: Literal["Warning", "Error", "Fatal", "Info"]: Severity of the issue, depending on the severity inputted, the color of the error text will be different. Defaults to "Error"
  :arg name: Optional[str]: The `"Class Name"` that will be displayed within the error, if this value is None which is the default, this class will attempt to use self.__class__
  """

  def __init__(self, message: Optional[str] = None, severity: Union[str, int, SeverityChild] = Severity.Error, name: Optional[str] = None, *args: Any, **kwargs: Any) -> None:
    self.message: Optional[str] = message or f"Exception Raised"
    self.severity: SeverityChild = Severity.__parse_severity__(severity=severity)
    self.name: Optional[str] = name or self.__class__.__name__
    self.body: str = str(sys.exc_info()[1])

    self.__dict__.update(kwargs)
    super().__init__(self.__str__(), *args)

  @property
  def json(self):
    """
    Returns dictionary object containing error information such as `name`, `message`, and `severity`.
    """
    return self.__dict__

  @property
  def json_string(self):
    """
    Returns a `Json Serializable String`, mostly used for `web based applications`, converts the response from `self.json` into a string
    """
    return json.dumps(self.json)

  def __str__(self):
    """
    String representation of exception, colorized.
    """
    log_buff: list[str] = []
    log_buff.append("Exception Occurred")
    log_buff.append(self.name)
    log_buff.append(str(self.severity))
    log_buff.append(self.message)
    return "/".join(log_buff)