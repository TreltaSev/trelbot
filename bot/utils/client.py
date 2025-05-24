import os
import sys
from pathlib import Path
from typing import Any, Callable, Coroutine, List, TypeVar

import discord
from discord.ext import commands
from discord.utils import MISSING

import openai
from openai import OpenAI, OpenAIError

from pyucc import console

from utils.types.spec.Spec import Spec

_func = Callable[..., Coroutine[Any, Any, Any]]
LF = TypeVar('LF', bound=_func)


class Client(commands.Bot):
    """
    # Client
    Main Backbone of Trelbot (or testing bots).
    Holds commands for initial setup of the bot, including syncing hooks.
    """

    def __init__(self):
        super().__init__(command_prefix="t:", intents=discord.Intents.all())

        self.openai = OpenAIWrapper()

        # Type Hinting
        self.root: Path = Path(os.environ.get("_root"))

    async def setup(self) -> None:
        """
        Hook used during setup, initializes all cogs and plugins (events/commands)

        Raises
        ------
        TypeError
            Failed to load Cog meta. Got {cog.body.cog}, which wasn't found.
            Failed to parse cog {cog.body.spec.name}, No cog found.
            For some reason, the loaded cog string isn't of type `commands.CogMeta`
            Loaded Cog isn't of type Cog
        """

        # Only register hello as a test
        project_root = Path(os.path.abspath(sys.argv[0]))
        cogs: List[Spec] = await self.find_cogs((project_root.parent / "cogs").absolute().as_posix())
        for cog in cogs:

            # Check for cog in doc
            if not hasattr(cog.body, 'cog'):
                raise TypeError(
                    f"Failed to parse cog \"{cog.body.spec.name}\", No cog found")

            # Check if cog is multiple
            cog_names = cog.body.cog
            if isinstance(cog_names, str) and ',' in cog_names:
                cog_names = [name.strip() for name in cog_names.split(",")]
            else:
                cog_names = [cog_names]

            for cog_name in cog_names:

                # Check if the cog even exists
                cog_meta: commands.CogMeta = getattr(
                    cog.body.module, cog_name, None)
                if not cog_meta:
                    raise TypeError(
                        f"Failed to load Cog meta. Got \"{cog_name}\", which wasn't found.")

                _cog: commands.Cog | Any = cog_meta(self)

                if not isinstance(_cog, commands.Cog):
                    TypeError(f"Loaded Cog isn't of type cog")

                console.info(f"Adding Cog {_cog.__cog_name__}")
                await self.add_cog(_cog)

        await self.start(os.environ.get("BOT_TOKEN"))

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


class OpenAIWrapper(OpenAI):

    """
    OpenAI client wrapper that's used in conjunction with event and command checkers
    to make sure that a client is active. If an openai client isn't active or valid, 
    these commands should not run.
    """

    def __init__(self, *, api_key=None, organization=None, project=None, base_url=None, websocket_base_url=None, timeout=None, max_retries=5, default_headers=None, default_query=None, http_client=None, _strict_response_validation=False):
        # Type Annotation
        self.active: bool = False

        console.start("Loading OpenAPI Client")

        api_key = api_key or os.environ.get("OPENAI_TOKEN", None)

        # Check if API key was given
        try:
            super().__init__(api_key=api_key, organization=organization, project=project, base_url=base_url, websocket_base_url=websocket_base_url, timeout=timeout,
                             max_retries=max_retries, default_headers=default_headers, default_query=default_query, http_client=http_client, _strict_response_validation=_strict_response_validation)
        except OpenAIError as _:
            console.error('No API_KEY found for openai, flag still false.')
            return

        # Check if API key is valid
        try:
            self.models.list()
        except openai.AuthenticationError:
            console.error('OpenAI key given is invalid')
            return

        console.done('OpenAI connection success')

        # Raise Flag
        self.active = True
