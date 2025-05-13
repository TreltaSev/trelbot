from typing import Any
from utils.exception.HighLevelException import HighLevelException
from utils.types import Severity
from utils.types.Severity import SeverityChild

class ConfigError(HighLevelException):

    def __init__(self, message: str | None = None, severity: str | int | SeverityChild = Severity.Error, name: str | None = None, status: int = 400, *args: Any, **kwargs: Any) -> None:
        kwargs.update({"status": status})
        super().__init__(message, severity, name, *args, **kwargs)