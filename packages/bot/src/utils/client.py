from turtle import reset

import discord
from discord.ext import commands
from discord.ext.commands.cog import Cog

from pathlib import Path
from typing import Any, List

import openai
from openai import OpenAI, OpenAIError
from utils.types.spec.spec import Spec

from shared.console import console
from shared.config import config
from shared.project import project

cfg = config.parsed

class Client(commands.Bot):
    """
    # Client
    Main Backbone of Trelbot (or testing bots).
    Holds commands for initial setup of the bot, including syncing hooks.
    """

    def __init__(self):
        super().__init__(command_prefix="t:", intents=discord.Intents.all())

        self.openai = OpenAIWrapper()

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
        
        console.debug("Start of setup")

        # Only register hello as a test
        cogs_path = project.root / "bot/src/cogs"
        
        cogs: List[Spec] = await self.find_cogs(cogs_path)
        
        for cog in cogs:            
            
            if not cog.body:
                return

            setup_function = getattr(cog.body.module, "setup", None)
            
            if not setup_function:
                console.warn(f"[dim]Missing setup function for {cog.cog_string}[/]")
                continue
            
            setup_result = setup_function(self)
            
            if not isinstance(setup_result, Cog):
                console.warn(f"Cog {cog.cog_string} doesn't return [green]Cog[/], instead returns [green]{type(setup_result)}[/]")
                continue
            
            console.info(f"Adding Cog [green]{setup_result.__cog_name__}[/]")
            
            await self.add_cog(setup_result)

        await self.start(cfg.bot.token)

    async def find_cogs(self, roots: List[str] | str | List[Path] | Path, exclusions: List[str] | str = "__init__.py") -> List[Spec]:
        """
        Finds all possible Cogs within a specified directory

        Parameters
        ----------
        roots: :class:`List[str]` | :class:`str`
            List or string representation of the root of all the cog paths.
        exclusions: :class:`List[str]`
            List of files to exclude from potential cogs
        """
        
        if isinstance(roots, Path):
            roots = [roots]

        if isinstance(roots, str):
            roots = [Path(roots)]

        if isinstance(exclusions, str):
            exclusions = [exclusions]
            
        potential_cogs: List[Spec] = []
            
        for seed_path in roots:
            if isinstance(seed_path, str):
                seed_path = Path(seed_path)
                
            for file in seed_path.rglob("*.py"):
                cog_path = ".".join(file.with_suffix("").relative_to(project.root / "bot/src").parts)
                potential_cogs.append(Spec(cog_string=cog_path))

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

        token = token or cfg.bot.token
        
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

        console.log("Loading OpenAPI Client")

        api_key = api_key or cfg.openai.token

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

        console.log('OpenAI connection success')

        # Raise Flag
        self.active = True
