from typing import Any, Callable, Optional, Union
from utils.exception import HighLevelException
from utils.logger import Logger
import inspect


class ExceptionHandler:
  def __init__(self, is_async: Optional[bool] = False) -> None:
    """
    Exception handler for routes and basic methods, allows for async and sync methods to be modified.
    this class is meant to be used as a decorator in order to allow for logging, debugging, and error handling.

    :arg is_async: Optional[bool] = False: determines wether or not to run the method with await or without await, basically async or sync.
    """
    self.is_async = is_async

  def __log__(self, error: HighLevelException):
    """
    Pointer method to `Logger.__log__`
    :arg error: HighLevelException: HighLevelException object which contains a SeverityChild like object
    """
    severity = error.severity
    Logger.__log__(str(error), severity=severity, log_in_file=True)

  def __on_error__(self, error: Exception, function: Callable) -> None:
    """
    Logic when error is raised, handles return data and possible logging and debugging data.
    uses self variables to determine what to do when and where with the data inputted,


    :arg error: Exception: The error passed in which inherits from `Exception` if this variable 
    contains a "json" class variable which should be 
    visible if the Exception class derives from the HighLevelException class, 
    then this class will return a dictionary object containing important information.
    """
    if not hasattr(error, "severity"):
      error = HighLevelException(f"Unregistered Error Within `{function.__name__}`: {error}", severity="Fatal", name="ExceptionHandler.py")
    self.__log__(error)

  async def __async_run_call__(self, function: Callable, *args, **kwargs) -> Any:
    """ Async run block """
    return await function(*args, **kwargs)

  def __sync_run_call__(self, function: Callable, *args, **kwargs) -> Any:
    """ Sync run block """
    return function(*args, **kwargs)

  def __call__(self, function) -> Any:
    """
    Magic Method __call__ method is run whenever the method this decorator encompasses is called.
    :arg function: Callable: Callable method, the method under this decorator.
    """

    self.is_async = inspect.iscoroutinefunction(function)

    # Sync Handling
    def sync_wrap(*args, **kwargs):
      try:
        return self.__sync_run_call__(function, *args, **kwargs)
      except Exception as error:
        self.__on_error__(error, function)

    # Async Handling
    async def async_wrap(*args, **kwargs):
      try:
        return await self.__async_run_call__(function, *args, **kwargs)
      except Exception as error:
        self.__on_error__(error, function)

    # Conditional
    if self.is_async:
      return async_wrap
    else:
      return sync_wrap