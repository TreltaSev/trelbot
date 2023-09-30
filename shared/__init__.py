import os
import sqlite3
import typing

import pyucc
from pyucc import colors, console, symbols


class register_pyucc:

  @pyucc.console.register(identifier="db")
  def _(*values, **optional):
    console.cprint(f"{colors.chex('#1582C9', 'background')} DATAB {symbols.reset} {colors.chex('#aaaaaa')}{optional.get('time')}{symbols.reset}", *values)

  @console.register("quart")
  def _(*values, **optional):
    console.cprint(f"{colors.chex('#f1aa00', 'background')} QUART {symbols.reset} {colors.chex('#aaaaaa')}{optional.get('time')}{symbols.reset}", *values)


class config:
  """|class|

  Configuration for database reading and writing,

  Properties
  ~~~
  `haltifnotexists : bool`
      Should the code be stopped if a key is not found?
  """

  haltifnotexists: typing.Literal[True, False] = False


class connections:
  """|class|

  Holds all the sqlite3 connections for easier use

  Properties
  ~~~
  `settings : sqlite3.Connection`
      settings db in shared/discord.guild.settings.db
  """

  @classmethod
  def settings(cls):
    return sqlite3.connect(f"{os.getcwd()}/../shared/discord.guild.settings.db")
