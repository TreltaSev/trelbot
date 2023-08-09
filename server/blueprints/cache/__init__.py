import quart

class Connection:
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
        