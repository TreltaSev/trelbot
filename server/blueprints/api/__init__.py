import json
import quart
from typing import Union, Any
from shared.core_tools import errors
from exts.constants import oauth2

class SecuredConnection:
    """|Class|"""
    def __init__(self, request: quart.Request):
        self.request = request
        self.validated: bool = self.request.remote_addr in ["127.0.0.1", "::1"]
    
    @property
    def response(self):
        _response_object = {
            "validated": self.validated
        }
        return quart.json.jsonify(_response_object)
    
    @property
    async def client_input(self):
        print(quart.request.is_json)
        return await quart.request.get_json() if quart.request.is_json else await quart.request.get_data()

class JsonConnection:
    """|Class|"""
    def __init__(self, request: quart.Request):
        self.request = request
        self.error = None    
    
    
    async def checkValidated(self) -> None:
        """
        Checks if self.validated is true, 
        if it isn't it raises a ServerRouteRequestNotJson error
        """
        
        if not await self.validated:
            self.error = errors.ServerRouteRequestNotJson
            raise errors.ServerRouteRequestNotJson     
    
    async def checkValue(self, value):
        """
        Checks if a value exists within self.request as a json request
        raises an error if that value is not found.
        """

        if value not in await self.json:
            raise errors.ServerRouteJsonRequestMissingValue(value)    
   
    async def cacheValue(self, key, value: Union[None, Any] = None):
        """
        Caches a value to this object with setattr,
        make sure this value doesn't overwrite anything!
        """
        
        if isinstance(value, type(None)):
            value = (await self.json)[key]
        setattr(self, key, value)

    @property
    async def validated(self) -> bool:
        return isinstance(await quart.request.json, dict)
    
    
    @property
    async def json(self) -> dict:    
        return dict(await quart.request.json)


class ApiConnection:
    """|Class|"""

    def __init__(self, request: quart.Request):
        self.request = request

        self.__checkSession()

    
    def __checkSession(self) -> None:
        """
        Checks if a session value is present in the headers if `quart.request.headers`,
        and if it is present, if its even valid. Raises errors for when the session header is "none" meaning
        the user isn't signed in, and also raises errors if the session id given is not inside the cached sessions,
        also meaning that either the user isn't logged in or the session is invalid.
        """

        sessionHeader = self.request.headers.get("Session")
        
        if sessionHeader == "none":
            raise errors.BaseServerRouteException("No session found, login.", code=1020)
        
        if sessionHeader not in oauth2.Session.sessions:
            raise errors.BaseServerRouteException("Session not valid, relogin", code=1020)
        
        self.session = sessionHeader
    
