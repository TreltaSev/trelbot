import json
import requests

requests.post(url="https://cache.localhost:1090/read", json=json.dumps({"value": True}))