import json
import quart
from typing import Union, Any
from shared.core_tools import errors

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
    
    """
    Checks if self.validated is true, 
    if it isn't it raises a ServerRouteRequestNotJson error
    """
    async def checkValidated(self) -> None:
        if not await self.validated:
            self.error = errors.ServerRouteRequestNotJson
            raise errors.ServerRouteRequestNotJson 
    
    """
    Checks if a value exists within self.request as a json request
    raises an error if that value is not found.
    """
    async def checkValue(self, value):

        if value not in await self.json:
            raise errors.ServerRouteJsonRequestMissingValue(value)
    
    """
    Caches a value to this object with setattr,
    make sure this value doesn't overwrite anything!
    """
    async def cacheValue(self, key, value: Union[None, Any] = None):
        if isinstance(value, type(None)):
            value = (await self.json)[key]
        setattr(self, key, value)

    @property
    async def validated(self) -> bool:
        return isinstance(await quart.request.json, dict)
    
    
    @property
    async def json(self) -> dict:    
        return dict(await quart.request.json)
