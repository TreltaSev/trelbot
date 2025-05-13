from typing import Any, List
from utils.exception.HighLevelException import HighLevelException
from utils.types import Severity
from utils.types.Severity import SeverityChild

class RequirementUnfulfilledError(HighLevelException):

    def __init__(self, name: str | None = None, status: int = 400, missing: List[str] = [], *args: Any, **kwargs: Any) -> None:
        kwargs.update({"status": status})
        kwargs.update({"missing": missing})
        super().__init__("Missing Required Keys", "Error", name, *args, **kwargs)