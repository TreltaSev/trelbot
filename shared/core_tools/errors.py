"""
shared.core_tools.errors
~~~~~~~~~~~~~~~~~~~~~~~~

Holds errors
"""
import typing

class BaseBlueprintException(Exception):
    def __init__(self, message: typing.Optional[str] = None, *args: typing.Any, name: str) -> None:
        self.name: str = name
        message = message or f'Blueprint {name!r} had an error.'
        super().__init__(message, *args)

class BlueprintAlreadyLoadedException(BaseBlueprintException):
    """Raised when a blueprint is already loaded and is being loaded again."""
    def __init__(self, name: str) -> None:
        super().__init__(f"Blueprint {name!r} has already been loaded.", name=name)
        
class BlueprintHasNoBlueprintVariable(BaseBlueprintException):
    """Raised from server.exts.constants.App.BlueprintManager"""
    def __init__(self, name: str) -> None:
        super().__init__(f"Blueprint {name!r} has no blueprint variable.", name=name)

class BlueprintHasWrongBlueprintType(BaseBlueprintException):
    """Raised from server.exts.constants.App.BlueprintManager"""
    def __init__(self, name: str) -> None:
        super().__init__(f"Blueprint {name!r}'s blueprint variable is not quart.Blueprint", name=name)