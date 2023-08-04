import os
import typing
import sqlite3

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

    settings = sqlite3.connect(f"{os.getcwd()}/../shared/discord.guild.settings.db")

from . import (
    db as db
)