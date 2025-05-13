import os
import sys
import discord
from pathlib import Path
from typing import List
from discord.ext import commands
from utils.types.spec.Spec import Spec


class Client(commands.Bot):
    """
    # Client
    Main Backbone of Trelbot (or testing bots).
    Holds commands for initial setup of the bot, including syncing hooks.
    """

    def __init__(self):
        super().__init__(command_prefix="t:", intents=discord.Intents.all())

    async def setup(self) -> None:
        """
        ## Setup 
        Hook used during setup, initializes all cogs and plugins (events/commands)
        """

        # Only register hello as a test
        spec = Spec("bot.cogs.hello")
        project_root = Path(os.path.abspath(sys.argv[0]))
        await self.find_cogs((project_root.parent / "cogs").absolute().as_posix())

    async def find_cogs(self, roots: List[str] | str, exclusions: List[str] | str = "__init__.py") -> List[Spec]:
        """
        Finds all possible Cogs within a specified directory

        Parameters
        ----------
        roots: :class:`List[str]` | :class:`str`
            List or string representation of the root of all the cog paths.
        exclusions: :class:`List[str]`
            List of files to exclude from potential cogs
        """

        if isinstance(roots, str):
            roots = [roots]

        if isinstance(exclusions, str):
            exclusions = [exclusions]

        potential_cogs: List[Spec] = []
        for root_path in roots:
            for root, _, files in os.walk(root_path):
                for file in files:
                    file: str

                    if not isinstance(file, str):
                        continue

                    if not file.endswith(".py") or file in exclusions:
                        continue

                    rel_path = Path(os.path.join(root, file)
                                    ).relative_to(Path.cwd())
                    cog_path = ".".join(rel_path.with_suffix("").parts)
                    potential_cogs.append(Spec(cog_path))

        return potential_cogs

    async def start(self, token: str | None = None, *, reconnect: bool = True) -> None:
        """
        A shorthand coroutine for :meth:`login` + :meth:`connect`.
        Does exactly what discord.client.Client().start() does but passes the token
        specified in :file:`.env`

        Parameters
        ----------
        token: :class:`str`
            The authentication token. Defaults to :value:`None`.
            If this is none, uses the token provided in the .env file.
        reconnect: :class:`bool`
            If the bot should attempt reconnecting. Either due to internet failure or
            a specific failure on Discord's part. Certain disconnects that lead to bad 
            state will not be handled (such as invalid sharding payloads or bad tokens).

        Raises
        ------
        TypeError
            An unexpected keyword argument was received
        KeyError
            Bot token key not specified and not found.
        """

        token = token or os.environ.get("BOT_TOKEN", None)
        if token is None:
            raise KeyError(f"Bot Token Key Not Found")

        await self.login(token)
        await self.connect(reconnect=reconnect)
