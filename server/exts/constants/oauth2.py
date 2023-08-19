"""
    server.exts.constants.oauth2
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    Contains methods that work with discords oauth api
"""
import secrets
import requests
from shared.core_tools import errors
from shared import types
from typing import List
from exts.constants import fetch

class Session:
    sessions: dict = {}

    @classmethod
    def add(cls, discord_code, expires_in: int) -> str:
        """Adds a secret code to the session cache and returns the session id that was just created."""
        session_id: str = secrets.token_hex(64)
        cls.sessions[session_id] = {"access_token": discord_code, "expires_in": expires_in}
        return session_id
        

    @classmethod
    def replace(cls, session_id: str, access_token: str, expires_in: int) -> None:
        """Replaces the access token of a session with a new one"""
        cls.sessions[session_id] = {"access_token": access_token, "expires_in": expires_in}
        return None

    @classmethod
    def expired(cls, access_token: str) -> bool:
        """Checks if a access token is expired returns a boolean"""
        pass

    @classmethod
    def remove(cls, session_id: str) -> None:
        """Removes a session from the sessions dictionary"""
        if session_id in cls.sessions:
            del cls.sessions[session_id]

    @classmethod
    def exists(cls, session_id: str) -> bool:
        """Returns a bool representing if the inputed `session_id` is inside Session.sessions"""
        return session_id in cls.sessions
    
    @classmethod
    def get(cls, session_id: str) -> str:
        """
        Returns the access_token of an inputed session_id, 
        raises a nf error if the session id is not found inside Session.sessions
        """
        if not cls.exists(session_id):
            raise errors.BaseServerRouteException("SessionID not found", code=1028)
        
        return cls.sessions[session_id]["access_token"]

class Oauth2:
    client_id = "932999965498834954"
    client_secret = "l_4WyFqfOxxDIBnyuGVgBP1dtjP2GXGl"
    redirect_uri = "https://trelbot.xyz/discord-callback"
    token = "OTMyOTk5OTY1NDk4ODM0OTU0.GJoDm0.hnXOxg7Wm83MFCQcKNFun0x6Bw12I79Y043AN0"

    @classmethod
    def __formAuthorization(cls, access_token: str, TYPE: str = "Bearer") -> dict:
        """
        Creates a dictionary which contains the key Authorization, the value of this key
        will always be "Bearer {access_token}", this method is `private` by default
        """
        return {"Authorization": f"{TYPE} {access_token}"}
    
    

    @classmethod
    def retrieveAccessToken(cls, code: str) -> str:
        """Attempts to get an access token from a code"""
        
        _request_payload = {
            "client_id": cls.client_id,
            "client_secret": cls.client_secret,
            "grant_type": "authorization_code",
            "code": code,
            "redirect_uri": cls.redirect_uri,
            "scope": "identify%20email%20guilds"
        }

        response = requests.post(url="https://discord.com/api/oauth2/token", data=_request_payload).json()

        if "error" in response:
            raise errors.BaseServerRouteException(f"Error while getting accesstoken: {response['error_description']}", code=1020)

        return [response["access_token"], response["expires_in"]]
    
    @classmethod
    def GetCurrentUser(cls, access_token: str) -> types.user:
        """
        Gets the user through an `access_token: str`, sends a get request to
        `discord.com/api/users/@me`, the return object is of `user` contains values such as 
        id, username, discriminator, avatar
        """
        response = requests.get(url="https://discord.com/api/users/@me", headers=cls.__formAuthorization(access_token)).json()
        
        if "code" in response:
            raise errors.BaseServerRouteException(f"Error while getting current user: {response['message']}", code=1028)
        
        return types.user(response)
    
    @classmethod
    def GetCurrentUserGuilds(cls, access_token: str) -> List[types.guild]:
        """
        Gets the user's guilds by sending a request with `access_token: str` directly to
        `discord.com/api/users/@me/guilds`, the return object is a `typing.List[types.guild]`,
        its just an array of the guilds returned.
        """

        CurrentUserGuilds: dict = fetch.FetchCurrentUserGuilds(headers=cls.__formAuthorization(access_token)).response
        CurrentBotGuilds: dict = fetch.FetchCurrentBotGuilds(headers=cls.__formAuthorization(access_token, "Bot")).response

        response = requests.get(url="https://discord.com/api/users/@me/guilds", headers=cls.__formAuthorization(access_token)).json()

        return_guilds = []

        if "code" in response:
            raise errors.BaseServerRouteException(f"Error while getting users guilds: {response['message']}", code=1028)        
        
        for guild in CurrentBotGuilds:

            # Check if bot has guild
            if not cls.__in(CurrentBotGuilds, guild.get("id")):
                continue

            guild_permissions: types.permissions = types.permissions(guild["permissions"])
            is_owner: bool = guild["owner"]
            is_admin: bool = guild_permissions.ADMINISTRATOR

            if is_owner:
                guild["display"] = "Owner"
                continue

            if is_admin:
                guild["display"] = "Administrator"
                continue

            guild["display"] = "None"
        
        return response

    @classmethod
    def __in(cls, _guilds: list, _check: int) -> bool:
        """
        A method that returns true if _check which is a int
        is present in guilds by checking guilds["id"] returns true 
        if present else false
        """
        for guild in _guilds:
            if guild["id"] == str(_check):
                return True
        return False
                
        