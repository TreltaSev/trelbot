import json
import quart
from typing import Union
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
    
    async def check_validated(self) -> None:
        if not await self.validated:
            self.error = errors.ServerRouteRequestNotJson
            raise errors.ServerRouteRequestNotJson 

    @property
    async def validated(self) -> bool:
        try:
            json.loads(await quart.request.json)
            return True
        except ValueError:
            return False

    
    @property
    async def json(self) -> Union[None, dict]:        
        return await quart.request.get_json() if await self.validated is True else None
