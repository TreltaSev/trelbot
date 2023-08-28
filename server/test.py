
import os
import sys
import asyncio
import requests
import signal
import json
import random
import time
from websockets.sync.client import connect, ClientConnection
# Prevent program from creating __pycache__ dirs
sys.dont_write_bytecode = True
sys.path.append(os.path.abspath(f"{os.getcwd()}/../"))

from exts.constants import fetch, oauth2

signal.signal(signal.SIGINT, signal.SIG_DFL)


# _C = "hLY4f6L9BNC6gaqGHGREvYMX5o2WOT"
# _v = oauth2.Oauth2.GetChannels(_C, 344872383452151808)
# print(_v)

requests.get("https://discord.com/api/gateway/bot")

v = fetch.FetchBotGateway(oauth2.Oauth2.formAuthorization("OTMyOTk5OTY1NDk4ODM0OTU0.GJoDm0.hnXOxg7Wm83MFCQcKNFun0x6Bw12I79Y043AN0", "Bot"))


def gateway():
    """
    [docs](https://discord.com/developers/docs/topics/gateway)
    """
    print("connecting")
    websocket: ClientConnection = connect(f"{v.response['url']}/?v=10&encoding=json")
    print("connected")
    msg = json.loads(websocket.recv())
    delay = round((msg["d"]["heartbeat_interval"] / 1000) * random.uniform(0.0, 1.0), 2)
    print(f"delay: {delay}s")
    time.sleep(delay)
    heartbeat = {"op": 1, "d": None}
    print("sending", heartbeat)
    websocket.send(json.dumps(heartbeat))
    msg = json.loads(websocket.recv())
    print(msg)



gateway()
