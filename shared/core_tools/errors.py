"""
shared.core_tools.errors
~~~~~~~~~~~~~~~~~~~~~~~~

Holds errors
"""
import typing


"""|server/blueprints|
Blueprint exceptions caused in server blueprint loading, modifying, viewing etc.
"""
class BaseBlueprintException(Exception):
    """Blueprint exception to be inherited from"""
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

"""|bot/banner|
Banner errors when parsing, creating, or getting banners for guilds.
"""
class BaseBannerException(Exception):
    """Banner Exception to be inherited from"""
    def __init__(self, message: typing.Optional[str] = None, *args: typing.Any, name: str) -> None:
        self.name: str = name
        message = message or f'Banner error: {name!r}'
        super().__init__(message, *args)

class BannerMissingPermissions(BaseBannerException):
    """Raised when a user attempts to modify a banner and that user is missing credentials such as administrator"""
    def __init__(self, permission: str):
        super().__init__(f"You seem to be missing the permission: {permission!r}", name="BannerParseError")

class BannerParseError(BaseBannerException):
    """Raised when parsing a key or value while editing banners and its wrong in some way and it fails to parse."""
    def __init__(self, parse_key: str, attempted_value: str, estimated_failed_reason: str, possible_solution: typing.Optional[str] = None):
        self.key: str = parse_key
        self.value: str = attempted_value
        self.failed_reason: str = estimated_failed_reason
        self.solution: str = possible_solution 
        _message: str = f"Failed to set value for `{parse_key!r}` to `{attempted_value}` because `{estimated_failed_reason}`"
        if possible_solution is not None:
            _message += f", {possible_solution}"            
        super().__init__(_message, name="BannerParseError")