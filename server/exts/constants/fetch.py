import requests
from shared.core_tools import errors
import time


class BaseFetch:
    """
    Class that should be inherited from,
    runs a fetch with requests.get then raises an error
    if code is present inside the contents of the response
    """

    def __init__(self, url: str, headers: dict):

        self.response = requests.get(url=url, headers=headers).json()

        if "message" in self.response and "retry_after" in self.response:
            raise errors.ServerRouteDiscordApiRateLimit()

        if "code" in self.response:
            raise errors.BaseServerRouteException(
                f"Error attempting to fetch url \"{url}\": {self.response['message']}", code=1020)


class UpperLevelFetch(BaseFetch):
    def __init__(self, url: str, headers: dict):
        max_retries: int = 10

        for _ in range(max_retries):
            try:
                super().__init__(url, headers)
                break
            except errors.ServerRouteDiscordApiRateLimit:
                print("Rate limit, waiting 0.5s")
                time.sleep(0.5)


class FetchCurrentUserGuilds(UpperLevelFetch):
    """
    Fetches the current users guilds, 
    returns a dict as the response, 
    access resposne with self.response.
    Sends a get request to `https://discord.com/api/users/@me/guilds`
    """

    def __init__(self, headers: dict):
        super().__init__("https://discord.com/api/users/@me/guilds", headers)


class FetchCurrentBotGuilds(UpperLevelFetch):
    """
    Fetches the current bots guilds,
    returns a dict as the response,
    access response with self.response.
    sends a get request to `https://discord.com/api/users/@me/guilds
    """

    def __init__(self, headers: dict):
        super().__init__("https://discord.com/api/users/@me/guilds", headers)

class FetchGuild(UpperLevelFetch):
    """
    Fetches a guild from the guild id
    returns a dict as the response
    access response with self.response.
    sends a get request to `https://discord.com/api/guilds/{guild.id}`
    """

    def __init__(self, headers: dict, guild_id: str | int):
        super().__init__(f"https://discord.com/api/guilds/{guild_id}", headers)