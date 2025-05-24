"""
# Ransom Command
Sets up the basic functionality for ransom
---
cog: ransom
"""
from typing import Union
from tinydb import TinyDB, Query

from discord.ext import commands

from utils.client import Client
from utils.types import Struct
from utils.loop import loop


class ransom(commands.Cog):

    def __init__(self, client: Client) -> None:
        self.client = client

        # --- Tiny Db --- #
        db_path = client.root / "bot/data/ransom.json"
        db_path.parent.mkdir(parents=True, exist_ok=True)

        self.db = TinyDB(db_path)
        self.db_table = self.db.table('ransom')
        self.ransom_clock.start()

    def ensure_config(self, guild_id: Union[str, int]):
        """
        Makes sure that the command config actively exists,
        if it doesn't create it and return the saved value.

        Parameters
        ----------
        guild_id: :class:`Union[str, int]`
            Guild id of the config to check
        """

        guild_id: int = int(guild_id)

        query = Query()

        if not self.db_table.contains(query.id == guild_id):
            self.db_table.insert(RansomConfig(id=guild_id).unwrap)

        return self.db_table.get(query.id == guild_id)

    @loop(seconds=60, name="Ransom Clock")
    async def ransom_clock(self):
        for guild in self.client.guilds:

            # Get Guild Config
            config: RansomConfig = RansomConfig(self.ensure_config(guild.id))

            # Skip guild if command isn't enabled
            if not config.enabled:
                continue

            if config.next is None:
                # Create new next time
                pass

    @ransom_clock.before_loop
    async def held_ransom_clock(self):
        """
        Make sure the ransom clock doesn't start until the bot is running
        """
        await self.client.wait_until_ready()


class RansomConfig(Struct):
    """
    Configuration for the Ransom Command

    Parameters
    ----------
    id: :class:`int`
        ID of the respective guild for `this` specific config
    enabled: :class:`boolean`
        Determines whether or not the command should be able to be used
    next: :class:`Union[str, None]`
        Next time the ransom command activates for `this` guild
    """

    def __init__(self, obj=None, **kwargs):
        # Type Annotation
        self.id: int
        self.enabled: bool
        self.next: Union[str, None]

        super().__init__(obj, **kwargs)

        # Create Defaults
        self.__defaults()

    def __defaults(self):
        """
        Sets defaults for :class:`RansomConfig`
        """
        self.dict.setdefault("id", 0)
        self.dict.setdefault("enabled", False)
        self.dict.setdefault("next", None)
