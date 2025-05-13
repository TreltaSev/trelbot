from utils.exception import HighLevelException
from utils.types import Severity

class RouterException(HighLevelException):
    """
    Raised whenever router has an existential crisis.    

    Parameters
    ----------
    `message : str | None`
        Message of error
    """

    def __init__(self, message=None, *args, **kwargs):
        buff: str = f"{self.__class__.__module__}.{self.__class__.__name__}\n"
        buff += message
        super().__init__(buff, Severity.Error, "Router Error", *args, **kwargs)