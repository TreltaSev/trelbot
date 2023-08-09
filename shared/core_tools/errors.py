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

class BlueprintFailedInSetup(BaseBlueprintException):
    """Raised when a blueprint fails in the setup method"""
    def __init__(self, name: str) -> None:
        super().__init__(f"Blueprint {name!r} failed during setup.", name=name)