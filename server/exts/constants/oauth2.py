"""
    server.exts.constants.oauth2
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    Contains methods that work with discords oauth api
"""
import secrets
import requests
from shared.core_tools import errors

class Session:
    sessions: dict = {}

    @classmethod
    def add(cls, secret_code) -> str:
        """Adds a secret code to the session cache and returns the session id that was just created."""
        session_id: str = secrets.token_hex(64)
        cls.sessions[session_id] = secret_code
        return session_id
        

    @classmethod
    def replace(cls, session_id: str, new_access_token: str) -> None:
        """Replaces the access token of a session with a new one"""
        cls.sessions[session_id] = new_access_token
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

class Oauth2:
    client_id = "932999965498834954"
    client_secret = "l_4WyFqfOxxDIBnyuGVgBP1dtjP2GXGl"
    redirect_uri = "http://localhost:3000/discord-callback"

    @classmethod
    def retrieveAccessToken(cls, code) -> str:
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

        return response["access_token"]