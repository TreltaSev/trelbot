import requests
from shared.core_tools import errors

class BaseFetch:
    """
    Class that should be inherited from,
    runs a fetch with requests.get then raises an error
    if code is present inside the contents of the response
    """

    def __init__(self, url: str, headers: dict):
        
        self.response = requests.get(url=url, headers=headers).json()

        if "code" in self.response:
            raise errors.BaseServerRouteException(f"Error attempting to fetch url \"{url}\": {self.response['message']}", code=1020)
        
class FetchCurrentUserGuilds(BaseFetch):
    """
    Fetches the current users guilds, 
    returns a dict as the response, 
    access resposne with self.response.
    Sends a get request to `https://discord.com/api/users/@me/guilds`
    """

    def __init__(self, headers: dict):
        super().__init__("https://discord.com/api/users/@me/guilds", headers)

class FetchCurrentBotGuilds(BaseFetch):
    """
    Fetches the current bots guilds,
    returns a dict as the response,
    access response with self.response.
    sends a get request to `https://discord.com/api/users/@me/guilds
    """

    def __init__(self, headers: dict):
        super().__init__("https://discord.com/api/users/@me/guilds", headers)
        
