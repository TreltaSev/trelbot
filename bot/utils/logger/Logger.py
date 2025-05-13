import inspect
from typing import Optional, Union, Any
from utils.types import SeverityChild, Severity
from pathlib import Path
import datetime
import secrets


class Logger:

  # Global Variables... Sue me
  severity: Optional[SeverityChild] = Severity.Fatal
  show_timestamp_by_default: Optional[bool] = False

  def __init__(self, defined_level: Union[str, int, SeverityChild], **conf: Optional[dict]) -> None:
    self.__class__.severity = self.__parse_severity__(severity=defined_level)
    self.__class__.show_timestamp_by_default = conf.get("show_timestamp_by_default", True)

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

  @classmethod
  def __create_file__(cls, path: Path) -> None:
    """
    Just creates an empty File, nothing too advanced happening here.
    :arg path: :class:`pathlib.Path`: Path Object
    """
    with path.open(mode="w") as _:
      return

  @classmethod
  def __file_log__(cls, context: Union[object, str, Any], severity: Optional[Union[str, int, SeverityChild]] = Severity.Fatal, max_bytes: int = int(2.56*1024**2)) -> None:
    """
    Logs contents of the log object into a file, contains backup logic which allows for automatic file creation, modification, and deletion whenever
    the size of the server.log file becomes too large. By default, this size is 2.56mB not counted for compression.

    :arg context: Union[object, str, Any]: The object which will be appended into the file, this must be a object which contains a valid `__str__()` magic method.

    :arg severity: Optional[Union[str, int, SeverityChild]] = :class:`Severity.Fatal`: This variable will be converted to be used with the Severity methods of this package, the severity determines what will be the second argument in the append statement.

    :arg max_bytes: int = 2.56MB: Integer representing the maximum size the log file can get to before it is reset and its previous contents is backed up into a file within a newly created `/log` directory.
    """
    *_, stack = inspect.stack()
    stack_parent_directory: str = Path(stack.filename).parent.name
    stack_file_name: str = Path(stack.filename).stem
    stack_file_line: int = stack.lineno
    time: str = datetime.datetime.now().strftime("%I:%M:%S")
    time_extra: str = datetime.datetime.now().strftime("%m-%d-%Y--%H-%M-%S")
    xidentifier: str = secrets.token_hex(8)

    out = f"({xidentifier}) [{time}] [{severity.name_short}] [{stack_parent_directory}/{stack_file_name}] <{stack_file_line}> {context}\n"

    root_dir = Path("./")
    log_dir = root_dir / ".log/"
    log_file = root_dir / "server.log"

    if not log_dir.exists:
      log_dir.mkdir()

    if not log_file.exists():
      cls.__create_file__(log_file)

    if log_file.stat().st_size >= max_bytes:
      # Flush to new file
      new_log = log_dir / f"{time_extra}-server.log"
      if not new_log.exists():
        cls.__create_file__(new_log)
        new_log.write_text(log_file.read_text(), newline="\n")
        log_file.write_text("")

    with log_file.open(mode="a+") as log_open:
      log_open.write(out)

  @classmethod
  def __log__(cls, context: Union[object, str, Any], severity: Optional[Union[str, int, SeverityChild]] = Severity.Info, log_in_file: bool = True) -> Union[None]:
    """
    Classmethod, handle logging and debugging functionality through inheritance, severity recognition, and context.

    :arg context: Union[HighLevelException, str, Any]: A string, Exception class, 
    basically anything that can be represented as a string, if the context has a severity 
    class variable like the High Level Exception class, this value will be substituted and used. 
    If the value is a string and no severity value is set within this method, it will default to Info.

    :arg severity: Optional[Union[str, int, SeverityChild]] = None: Severity level input, depending on the level, the log will
    be displayed in console. This value can be a string, the name of the Severity class, a int, the level of the severity class, or a SeverityChild.

    :arg log_in_file: bool = True: This is a boolean argument that determines whether or not a log statement is saved to `./server.log` Defaults to True.
    """
    if log_in_file:
      cls.__file_log__(context, severity=severity)

    # Convert Input Severity to Localized
    localized_severity: SeverityChild = cls.__parse_severity__(severity=severity)

    if not localized_severity:
      raise TypeError("Localized Severity is Undefined, None, or Unusable...")

    if cls.severity > severity:
      return NotImplemented
    return severity.handle(context, override_timestamp=cls.show_timestamp_by_default)