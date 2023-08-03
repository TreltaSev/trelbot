"""
bot
~~~

A Basic Bot which utilizes discord.py
"""

__title__ = "trelbot"
__author__ = "trelta"
__version__ = "1.0.0p"
import typing




from . import (
    exts as exts
)

class VersionDescriptor(typing.NamedTuple):
    major: int
    minor: int
    patch: int
    level: typing.Literal["alpha", "beta", "production"]

version_description: VersionDescriptor = VersionDescriptor(major=1, minor=0, patch=0, level='production')

del typing
